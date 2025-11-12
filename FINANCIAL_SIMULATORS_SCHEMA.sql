-- =====================================================
-- BIZEN Financial Simulators - Database Schema
-- =====================================================
-- Purpose: Tables for financial simulator catalog and saved runs
-- Features: RLS policies for user data isolation
-- =====================================================

-- Drop existing tables if recreating
DROP TABLE IF EXISTS public.sim_runs CASCADE;
DROP TABLE IF EXISTS public.simulators CASCADE;

-- =====================================================
-- Table: simulators
-- Description: Catalog of available financial simulators
-- =====================================================
CREATE TABLE public.simulators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL, -- 'budgeting', 'savings', 'credit', 'investment', 'inflation'
    icon TEXT, -- emoji or icon name
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- Table: sim_runs
-- Description: User's saved simulator runs (inputs + outputs)
-- =====================================================
CREATE TABLE public.sim_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    simulator_slug TEXT NOT NULL REFERENCES public.simulators(slug) ON DELETE CASCADE,
    run_name TEXT, -- Optional user-provided name for the run
    inputs JSONB NOT NULL, -- All input parameters
    outputs JSONB NOT NULL, -- Computed results
    notes TEXT, -- Optional user notes
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- Indexes for Performance
-- =====================================================
CREATE INDEX idx_sim_runs_user_id ON public.sim_runs(user_id);
CREATE INDEX idx_sim_runs_simulator_slug ON public.sim_runs(simulator_slug);
CREATE INDEX idx_sim_runs_user_slug_created ON public.sim_runs(user_id, simulator_slug, created_at DESC);
CREATE INDEX idx_sim_runs_created_at ON public.sim_runs(created_at DESC);
CREATE INDEX idx_simulators_slug ON public.simulators(slug);
CREATE INDEX idx_simulators_active_sort ON public.simulators(is_active, sort_order);

-- =====================================================
-- Row Level Security (RLS) Setup
-- =====================================================

-- Enable RLS on sim_runs
ALTER TABLE public.sim_runs ENABLE ROW LEVEL SECURITY;

-- Enable RLS on simulators (public read)
ALTER TABLE public.simulators ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS Policies for simulators table
-- =====================================================

-- Policy: Anyone can read active simulators
CREATE POLICY "simulators_select_public"
ON public.simulators
FOR SELECT
USING (is_active = true);

-- Policy: Only admins can insert simulators
CREATE POLICY "simulators_insert_admin"
ON public.simulators
FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
);

-- Policy: Only admins can update simulators
CREATE POLICY "simulators_update_admin"
ON public.simulators
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
);

-- Policy: Only admins can delete simulators
CREATE POLICY "simulators_delete_admin"
ON public.simulators
FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
);

-- =====================================================
-- RLS Policies for sim_runs table
-- =====================================================

-- Policy: Users can only insert their own runs
CREATE POLICY "sim_runs_insert_own"
ON public.sim_runs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only select their own runs
CREATE POLICY "sim_runs_select_own"
ON public.sim_runs
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can only update their own runs
CREATE POLICY "sim_runs_update_own"
ON public.sim_runs
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only delete their own runs
CREATE POLICY "sim_runs_delete_own"
ON public.sim_runs
FOR DELETE
USING (auth.uid() = user_id);

-- Policy: Admins can select all runs (for analytics/support)
CREATE POLICY "sim_runs_select_admin"
ON public.sim_runs
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
);

-- =====================================================
-- Seed Data: Financial Simulators Catalog
-- =====================================================

INSERT INTO public.simulators (slug, name, description, category, icon, sort_order, is_active) VALUES
(
    'monthly-budget',
    'Presupuesto Mensual 50/30/20',
    'Organiza tus ingresos en necesidades, deseos y ahorro usando la regla 50/30/20 o un modo personalizado.',
    'budgeting',
    '💰',
    1,
    true
),
(
    'savings-goal',
    'Meta de Ahorro e Interés Compuesto',
    'Calcula cuánto crecerán tus ahorros con aportaciones mensuales y rendimientos, o cuánto tiempo te tomará alcanzar una meta.',
    'savings',
    '🎯',
    2,
    true
),
(
    'credit-card-payoff',
    'Liquidación de Tarjeta de Crédito',
    'Compara cuánto tardarás y pagarás si haces pagos mínimos vs. pagos fijos mayores.',
    'credit',
    '💳',
    3,
    true
),
(
    'simple-loan',
    'Préstamo Simple / Microcrédito',
    'Calcula tu pago mensual, tabla de amortización y CAT aproximado para un préstamo con comisiones.',
    'credit',
    '🏦',
    4,
    true
),
(
    'investment-comparison',
    'Comparación de Inversiones',
    'Compara tres opciones de inversión (ahorro tradicional, CETES, fondo) y ve cuál da mejores resultados.',
    'investment',
    '📈',
    5,
    true
),
(
    'inflation-calculator',
    'Inflación y Poder Adquisitivo',
    'Descubre cuánto costará un producto en el futuro y cuánto necesitas ganar para mantener tu poder de compra.',
    'inflation',
    '📊',
    6,
    true
);

-- =====================================================
-- Functions for automatic timestamp updates
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for simulators
CREATE TRIGGER update_simulators_updated_at
    BEFORE UPDATE ON public.simulators
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for sim_runs
CREATE TRIGGER update_sim_runs_updated_at
    BEFORE UPDATE ON public.sim_runs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Verification Queries
-- =====================================================

-- Check simulators catalog
-- SELECT * FROM public.simulators ORDER BY sort_order;

-- Check RLS policies
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
-- FROM pg_policies
-- WHERE tablename IN ('simulators', 'sim_runs');

-- =====================================================
-- Notes:
-- - All monetary values stored in JSONB as numbers (MXN)
-- - Rates stored as percentages (e.g., 8.5 for 8.5%)
-- - RLS ensures users only see their own runs
-- - Admins can view all data for support/analytics
-- - Educational disclaimer should be shown in UI
-- =====================================================


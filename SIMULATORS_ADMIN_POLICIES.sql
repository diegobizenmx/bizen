-- =====================================================
-- OPTIONAL: Admin-Only Policies for Simulators
-- =====================================================
-- Only run this if you have a user_roles table and want
-- to restrict simulator management to admins only.
--
-- Prerequisites:
-- 1. You must have a public.user_roles table
-- 2. The table should have columns: user_id, role
-- 3. Admin users should have role = 'admin'
-- =====================================================

-- First, create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, role)
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can view their own roles
CREATE POLICY "user_roles_select_own" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id);

-- Only admins can manage roles (this is a chicken-egg situation,
-- so you'll need to manually insert the first admin)
CREATE POLICY "user_roles_admin_all" ON public.user_roles
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);

-- =====================================================
-- Drop existing simulator policies
-- =====================================================
DROP POLICY IF EXISTS "simulators_insert_authenticated" ON public.simulators;
DROP POLICY IF EXISTS "simulators_update_authenticated" ON public.simulators;
DROP POLICY IF EXISTS "simulators_delete_authenticated" ON public.simulators;

-- =====================================================
-- Create admin-only policies for simulators
-- =====================================================

-- Only admins can insert simulators
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

-- Only admins can update simulators
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

-- Only admins can delete simulators
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
-- Optional: Admin can view all simulation runs
-- =====================================================
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
-- Add your first admin (CHANGE THIS UUID!)
-- =====================================================
-- Get your user ID from:
-- SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';
--
-- Then insert:
-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('YOUR-USER-UUID-HERE', 'admin');
--
-- =====================================================

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, cmd
FROM pg_policies
WHERE tablename IN ('simulators', 'sim_runs', 'user_roles')
ORDER BY tablename, policyname;

-- =====================================================
-- ✅ ADMIN POLICIES INSTALLED!
-- =====================================================
-- Remember to add your first admin user using the
-- INSERT statement above.
-- =====================================================


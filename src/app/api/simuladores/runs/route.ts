/**
 * API Routes: Simulator Runs
 * GET /api/simuladores/runs?slug=... - Get user's saved runs
 * POST /api/simuladores/runs - Save a new run
 */

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';
import { simulatorRunSchema } from '@/lib/simulators/schemas';

// GET: Fetch user's saved runs
export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServer();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    let query = supabase
      .from('sim_runs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (slug) {
      query = query.eq('simulator_slug', slug);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching runs:', error);
      return NextResponse.json(
        { error: 'Error al cargar simulaciones' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ runs: data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error inesperado' },
      { status: 500 }
    );
  }
}

// POST: Save a new run
export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServer();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validate input
    const validation = simulatorRunSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.errors },
        { status: 400 }
      );
    }
    
    const { simulator_slug, run_name, inputs, outputs, notes } = validation.data;
    
    // Insert into database
    const { data, error } = await supabase
      .from('sim_runs')
      .insert({
        user_id: user.id,
        simulator_slug,
        run_name,
        inputs,
        outputs,
        notes,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error saving run:', error);
      return NextResponse.json(
        { error: 'Error al guardar simulación' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ run: data }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error inesperado' },
      { status: 500 }
    );
  }
}


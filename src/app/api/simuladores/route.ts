/**
 * API Route: GET /api/simuladores
 * Returns catalog of available simulators
 */

import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createSupabaseServer();
    
    const { data, error } = await supabase
      .from('simulators')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching simulators:', error);
      return NextResponse.json(
        { error: 'Error al cargar simuladores' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ simulators: data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error inesperado' },
      { status: 500 }
    );
  }
}


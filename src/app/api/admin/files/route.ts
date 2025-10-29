import { NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    console.log('🔍 Starting GET /api/admin/files...');
    
    // Get authenticated user (for admin verification)
    const supabase = await createSupabaseServer();
    console.log('✅ Supabase client created');
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log('✅ Auth check complete, user:', user?.email, 'error:', userError?.message);

    if (userError || !user) {
      console.log('❌ Not authenticated');
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    console.log('🔍 Fetching files from database...');
    
    // Fetch all file uploads using Prisma
    const files = await prisma.fileUpload.findMany({
      orderBy: {
        uploadedAt: 'desc'
      }
    });

    console.log('✅ Files fetched:', files.length);
    
    // Check if there are files before trying to log the first one
    if (files.length > 0) {
      console.log('📄 First file sample:', JSON.stringify(files[0], null, 2));
      console.log('📄 userName:', files[0].userName);
      console.log('📄 userEmail:', files[0].userEmail);
    }

    console.log('✅ Returning success response');
    
    // Ensure we're returning the correct format
    const formattedFiles = files.map(file => ({
      id: file.id,
      userId: file.userId,
      userName: file.userName,
      userEmail: file.userEmail,
      originalName: file.originalName,
      filename: file.filename,
      title: file.title,
      notes: file.notes,
      size: file.size,
      type: file.type,
      path: file.path,
      uploadedAt: file.uploadedAt.toISOString()
    }));
    
    return NextResponse.json({
      success: true,
      files: formattedFiles
    });

  } catch (error) {
    console.error('❌ Error fetching files:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error details:', {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return NextResponse.json(
      { error: 'Error al obtener los archivos: ' + errorMessage },
      { status: 500 }
    );
  }
}

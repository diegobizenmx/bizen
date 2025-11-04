import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { createSupabaseServer } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const userName = formData.get('userName') as string | null
    const userEmail = formData.get('userEmail') as string | null
    const title = formData.get('title') as string | null
    const notes = formData.get('notes') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Get current user
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name
    const ext = path.extname(originalName)
    const baseName = path.basename(originalName, ext)
    const fileName = `${baseName}_${timestamp}${ext}`
    const filePath = path.join(uploadsDir, fileName)

    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save file
    await writeFile(filePath, buffer)

    // Save metadata to database
    await prisma.fileUpload.create({
      data: {
        userId: user.id,
        userName: userName || userEmail || 'Usuario',
        userEmail: userEmail || user.email || '',
        originalName: originalName,
        filename: fileName,
        title: title || null,
        notes: notes || null,
        size: file.size,
        type: file.type,
        path: `/uploads/${fileName}`
      }
    })

    // Return success response
    return NextResponse.json({ 
      success: true,
      message: 'File uploaded successfully',
      fileName: fileName,
      url: `/uploads/${fileName}`,
      metadata: {
        originalName,
        size: file.size,
        type: file.type,
        userName,
        userEmail,
        title,
        notes
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ 
      error: 'File upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Return 405 for unsupported methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}


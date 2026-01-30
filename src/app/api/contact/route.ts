import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Por favor completa todos los campos requeridos.',
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Por favor ingresa un email válido.',
        },
        { status: 400 }
      )
    }

    // Insert message into database using Prisma
    const newMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      },
    })

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: '¡Gracias por contactarnos! Te responderemos pronto.',
        data: {
          id: newMessage.id,
        },
      },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('Error saving contact message:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error al enviar el mensaje. Por favor intenta de nuevo más tarde.',
      },
      { status: 500 }
    )
  }
}



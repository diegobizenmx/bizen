import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      )
    }

    // Build conversation context
    const systemMessage = {
      role: "system" as const,
      content: `Eres BIZEN Assistant, un asistente virtual especializado en educación financiera para la plataforma BIZEN.

Tu propósito es ayudar a los usuarios con:

📚 **Educación Financiera:**
- Conceptos básicos de finanzas personales
- Presupuestos y ahorro
- Inversiones y créditos
- Planificación financiera
- Identidad digital y seguridad financiera

🎓 **Plataforma BIZEN:**
- Navegación por módulos y cursos
- Explicación de contenido educativo
- Ayuda con quizzes y evaluaciones
- Progreso y certificaciones
- Problemas técnicos básicos

💡 **Características de tu personalidad:**
- Responde siempre en español
- Sé amigable, profesional y motivador
- Usa un tono educativo pero accesible
- Proporciona ejemplos prácticos cuando sea posible
- Si no sabes algo, admítelo y sugiere contactar soporte
- Mantén las respuestas concisas pero informativas

🔒 **Límites:**
- No proporciones consejos financieros específicos de inversión
- No hagas recomendaciones de productos financieros específicos
- Si la pregunta es muy técnica o específica, sugiere contactar a un asesor financiero profesional

Recuerda: Tu objetivo es educar y empoderar a los usuarios para que tomen mejores decisiones financieras.`
    }

    // Convert conversation history to OpenAI format
    const historyMessages = conversationHistory.map((msg: any) => ({
      role: msg.role,
      content: msg.content
    }))

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...historyMessages,
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    })

    const response = completion.choices[0].message.content

    if (!response) {
      throw new Error('No se recibió respuesta del modelo')
    }

    return NextResponse.json({ 
      response: response.trim()
    })

  } catch (error) {
    console.error('OpenAI API error:', error)
    
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Error de configuración del servicio' },
          { status: 500 }
        )
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Servicio temporalmente ocupado. Inténtalo en unos minutos.' },
          { status: 429 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Error procesando tu pregunta. Por favor, inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}


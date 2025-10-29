import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    console.log("📥 [diagnostic-quiz POST] API called")
    
    const supabase = await createSupabaseServer()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    console.log("👤 [diagnostic-quiz POST] User:", user?.id || "none")

    if (!user) {
      console.log("❌ [diagnostic-quiz POST] No user - returning 401")
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const body = await request.json()
    console.log("📦 [diagnostic-quiz POST] Request body:", body)
    
    const { score, totalQuestions, scorePct, answers, studentName, evaluatorNotes } = body

    // Check if already exists (shouldn't happen, but safeguard)
    try {
      const existing = await prisma.diagnosticQuiz.findUnique({
        where: { userId: user.id },
      })

      console.log("🔍 [diagnostic-quiz POST] Existing quiz:", !!existing)

      if (existing) {
        console.log("⚠️ [diagnostic-quiz POST] Quiz already exists - returning success anyway")
        return NextResponse.json({ 
          success: true,
          message: "Quiz ya completado", 
          alreadyExists: true 
        })
      }
    } catch (dbError) {
      console.error("⚠️ [diagnostic-quiz POST] Database check failed, attempting to save anyway:", dbError)
    }

    // Save quiz results
    try {
      const quizResult = await prisma.diagnosticQuiz.create({
        data: {
          userId: user.id,
          score,
          totalQuestions,
          scorePct,
          studentName: studentName || null,
          evaluatorNotes: evaluatorNotes || null,
          answersData: JSON.stringify(answers),
        },
      })

      console.log("✅ [diagnostic-quiz POST] Quiz saved successfully:", quizResult.id)

      return NextResponse.json({ 
        success: true, 
        quizId: quizResult.id,
        message: "Resultados guardados correctamente" 
      })
    } catch (saveError) {
      console.error("❌ [diagnostic-quiz POST] Failed to save to database:", saveError)
      // Return success anyway to allow user to continue
      // The quiz answers are already in the client
      return NextResponse.json({ 
        success: true,
        warning: "Database unavailable - quiz completed but not saved",
        message: "Quiz completado (base de datos temporalmente no disponible)" 
      })
    }
  } catch (error) {
    console.error("❌ [diagnostic-quiz POST] Unexpected error:", error)
    return NextResponse.json(
      { error: "Error al guardar los resultados del quiz" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = await createSupabaseServer()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Check if user has completed the diagnostic quiz
    const quizResult = await prisma.diagnosticQuiz.findUnique({
      where: { userId: user.id },
    })

    return NextResponse.json({ 
      completed: !!quizResult,
      result: quizResult 
    })
  } catch (error) {
    console.error("Error checking diagnostic quiz:", error)
    // Return "not completed" on database error to allow quiz access
    return NextResponse.json({ 
      completed: false,
      error: "Database unavailable, allowing quiz access" 
    })
  }
}


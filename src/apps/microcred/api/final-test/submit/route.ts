import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { answers, score, totalQuestions } = await request.json()

    // Get current user
    const supabase = await createSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Save the final test results
    const quizAttempt = await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        moduleId: 6, // Module 6 is the final test
        sectionId: 1,
        pageNumber: 1,
        quizType: 'final_test',
        score: score,
        totalQuestions: totalQuestions,
      },
      include: {
        answers: true
      }
    })

    // Save individual answers
    if (answers && Array.isArray(answers)) {
      await Promise.all(
        answers.map((answer: any) =>
          prisma.quizAnswer.create({
            data: {
              quizAttemptId: quizAttempt.id,
              questionIndex: answer.questionIndex || answer.qid || 0,
              questionText: answer.questionText || '',
              userAnswer: String(answer.userAnswer || answer.choiceIndex || ''),
              correctAnswer: String(answer.correctAnswer || ''),
              isCorrect: answer.isCorrect || false,
            }
          })
        )
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Final test results saved successfully',
      quizAttemptId: quizAttempt.id
    })

  } catch (error) {
    console.error('Error saving final test:', error)
    return NextResponse.json({
      error: 'Failed to save final test results',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}


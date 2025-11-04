import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server-microcred'
import { cookies } from 'next/headers'

// GET /api/attempts - Get quiz attempts
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const quizId = searchParams.get('quizId')

    const attempts = await prisma.attempt.findMany({
      where: {
        userId: user.id,
        ...(quizId && { quizId })
      },
      include: {
        quiz: {
          include: {
            lesson: {
              include: {
                unit: {
                  include: {
                    course: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        completedAt: 'desc'
      }
    })

    return NextResponse.json(attempts)
  } catch (error) {
    console.error('Error fetching attempts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attempts' },
      { status: 500 }
    )
  }
}

// POST /api/attempts - Submit quiz attempt
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { quizId, score } = body

    if (!quizId || score === undefined) {
      return NextResponse.json(
        { error: 'quizId and score are required' },
        { status: 400 }
      )
    }

    const attempt = await prisma.attempt.create({
      data: {
        userId: user.id,
        quizId,
        score
      },
      include: {
        quiz: {
          include: {
            lesson: true
          }
        }
      }
    })

    return NextResponse.json(attempt, { status: 201 })
  } catch (error) {
    console.error('Error creating attempt:', error)
    return NextResponse.json(
      { error: 'Failed to submit quiz attempt' },
      { status: 500 }
    )
  }
}

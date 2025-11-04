import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/units/[id] - Get unit by ID with lessons
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const unit = await prisma.unit.findUnique({
      where: { id: params.id },
      include: {
        course: {
          select: {
            id: true,
            title: true
          }
        },
        lessons: {
          include: {
            quizzes: true,
            _count: {
              select: {
                progress: true
              }
            }
          },
          orderBy: {
            order: 'asc'
          }
        },
        assignments: true,
        prerequisites: {
          include: {
            requiresUnit: {
              select: {
                id: true,
                title: true
              }
            }
          }
        }
      }
    })

    if (!unit) {
      return NextResponse.json(
        { error: 'Unit not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(unit)
  } catch (error) {
    console.error('Error fetching unit:', error)
    return NextResponse.json(
      { error: 'Failed to fetch unit' },
      { status: 500 }
    )
  }
}


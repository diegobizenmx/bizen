import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/courses - List all courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const schoolId = searchParams.get('schoolId')

    let courses

    if (schoolId) {
      // Filter by school's enabled courses
      courses = await prisma.course.findMany({
        where: {
          schoolCourses: {
            some: {
              schoolId,
              isEnabled: true
            }
          }
        },
        include: {
          units: {
            include: {
              _count: {
                select: {
                  lessons: true
                }
              }
            },
            orderBy: {
              order: 'asc'
            }
          },
          _count: {
            select: {
              units: true,
              enrollments: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      // Get all courses
      courses = await prisma.course.findMany({
        include: {
          _count: {
            select: {
              units: true,
              enrollments: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

// POST /api/courses - Create a new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, level, isActive } = body

    if (!title || !level) {
      return NextResponse.json(
        { error: 'Title and level are required' },
        { status: 400 }
      )
    }

    const course = await prisma.course.create({
      data: {
        title,
        description: description || '',
        level,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}

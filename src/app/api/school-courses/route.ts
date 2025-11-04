import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/school-courses - Enable a course for a school
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { schoolId, courseId, isEnabled } = body

    if (!schoolId || !courseId) {
      return NextResponse.json(
        { error: 'schoolId and courseId are required' },
        { status: 400 }
      )
    }

    const schoolCourse = await prisma.schoolCourse.upsert({
      where: {
        schoolId_courseId: {
          schoolId,
          courseId
        }
      },
      update: {
        isEnabled: isEnabled !== undefined ? isEnabled : true
      },
      create: {
        schoolId,
        courseId,
        isEnabled: isEnabled !== undefined ? isEnabled : true
      },
      include: {
        school: {
          select: {
            id: true,
            name: true
          }
        },
        course: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    return NextResponse.json(schoolCourse)
  } catch (error) {
    console.error('Error toggling school course:', error)
    return NextResponse.json(
      { error: 'Failed to toggle school course' },
      { status: 500 }
    )
  }
}

// DELETE /api/school-courses - Disable a course for a school
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const schoolId = searchParams.get('schoolId')
    const courseId = searchParams.get('courseId')

    if (!schoolId || !courseId) {
      return NextResponse.json(
        { error: 'schoolId and courseId are required' },
        { status: 400 }
      )
    }

    await prisma.schoolCourse.delete({
      where: {
        schoolId_courseId: {
          schoolId,
          courseId
        }
      }
    })

    return NextResponse.json({ message: 'Course disabled for school' })
  } catch (error) {
    console.error('Error deleting school course:', error)
    return NextResponse.json(
      { error: 'Failed to delete school course' },
      { status: 500 }
    )
  }
}


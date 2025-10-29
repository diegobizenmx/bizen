import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const curriculum = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            sections: true
          },
          orderBy: {
            order: 'asc'
          }
        }
      },
      orderBy: {
        id: 'asc'
      }
    })

    // Transform the data to match the expected format
    const rows = curriculum.flatMap(course =>
      course.modules.flatMap(module =>
        module.sections.map(section => ({
          course_title: course.title,
          module_title: module.title,
          grade_level: module.gradeLevel,
          section_id: section.id.toString(),
          section_title: section.title
        }))
      )
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching curriculum:', error)
    return NextResponse.json(
      { error: 'Failed to fetch curriculum' },
      { status: 500 }
    )
  }
}

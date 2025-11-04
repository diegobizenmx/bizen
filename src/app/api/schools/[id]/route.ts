import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/schools/[id] - Get school by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const school = await prisma.school.findUnique({
      where: { id: params.id },
      include: {
        licenses: true,
        profiles: {
          select: {
            userId: true,
            fullName: true,
            role: true,
            createdAt: true
          }
        },
        schoolCourses: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                level: true
              }
            }
          }
        },
        _count: {
          select: {
            profiles: true,
            schoolCourses: true
          }
        }
      }
    })

    if (!school) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(school)
  } catch (error) {
    console.error('Error fetching school:', error)
    return NextResponse.json(
      { error: 'Failed to fetch school' },
      { status: 500 }
    )
  }
}

// PATCH /api/schools/[id] - Update school
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, region, contactEmail } = body

    const school = await prisma.school.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(region !== undefined && { region }),
        ...(contactEmail && { contactEmail })
      }
    })

    return NextResponse.json(school)
  } catch (error) {
    console.error('Error updating school:', error)
    return NextResponse.json(
      { error: 'Failed to update school' },
      { status: 500 }
    )
  }
}

// DELETE /api/schools/[id] - Delete school
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.school.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'School deleted successfully' })
  } catch (error) {
    console.error('Error deleting school:', error)
    return NextResponse.json(
      { error: 'Failed to delete school' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/units - List units (optionally by courseId)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

    const units = await prisma.unit.findMany({
      where: courseId ? { courseId } : undefined,
      include: {
        _count: {
          select: {
            lessons: true,
            assignments: true
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    })

    return NextResponse.json(units)
  } catch (error) {
    console.error('Error fetching units:', error)
    return NextResponse.json(
      { error: 'Failed to fetch units' },
      { status: 500 }
    )
  }
}

// POST /api/units - Create a new unit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { courseId, title, order, isLocked } = body

    if (!courseId || !title) {
      return NextResponse.json(
        { error: 'courseId and title are required' },
        { status: 400 }
      )
    }

    const unit = await prisma.unit.create({
      data: {
        courseId,
        title,
        order: order || 1,
        isLocked: isLocked !== undefined ? isLocked : false
      }
    })

    return NextResponse.json(unit, { status: 201 })
  } catch (error) {
    console.error('Error creating unit:', error)
    return NextResponse.json(
      { error: 'Failed to create unit' },
      { status: 500 }
    )
  }
}

// PATCH /api/units - Update unit (requires unitId in body)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { unitId, title, order, isLocked } = body

    if (!unitId) {
      return NextResponse.json(
        { error: 'unitId is required' },
        { status: 400 }
      )
    }

    const unit = await prisma.unit.update({
      where: { id: unitId },
      data: {
        ...(title && { title }),
        ...(order !== undefined && { order }),
        ...(isLocked !== undefined && { isLocked })
      }
    })

    return NextResponse.json(unit)
  } catch (error) {
    console.error('Error updating unit:', error)
    return NextResponse.json(
      { error: 'Failed to update unit' },
      { status: 500 }
    )
  }
}

// DELETE /api/units - Delete unit (requires unitId query param)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const unitId = searchParams.get('unitId')

    if (!unitId) {
      return NextResponse.json(
        { error: 'unitId is required' },
        { status: 400 }
      )
    }

    await prisma.unit.delete({
      where: { id: unitId }
    })

    return NextResponse.json({ message: 'Unit deleted successfully' })
  } catch (error) {
    console.error('Error deleting unit:', error)
    return NextResponse.json(
      { error: 'Failed to delete unit' },
      { status: 500 }
    )
  }
}

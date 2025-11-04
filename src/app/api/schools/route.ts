import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/schools - List all schools
export async function GET(request: NextRequest) {
  try {
    const schools = await prisma.school.findMany({
      include: {
        licenses: true,
        profiles: {
          select: {
            userId: true,
            fullName: true,
            role: true
          }
        },
        _count: {
          select: {
            profiles: true,
            schoolCourses: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(schools)
  } catch (error) {
    console.error('Error fetching schools:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    )
  }
}

// POST /api/schools - Create a new school
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, region, contactEmail } = body

    if (!name || !contactEmail) {
      return NextResponse.json(
        { error: 'Name and contactEmail are required' },
        { status: 400 }
      )
    }

    const school = await prisma.school.create({
      data: {
        name,
        region: region || '',
        contactEmail
      }
    })

    return NextResponse.json(school, { status: 201 })
  } catch (error) {
    console.error('Error creating school:', error)
    return NextResponse.json(
      { error: 'Failed to create school' },
      { status: 500 }
    )
  }
}

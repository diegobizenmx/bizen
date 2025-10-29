// Simple section completion API - marks section as complete when user reaches last page
import { NextRequest, NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServer()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "not_authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const moduleId = Number(body.moduleId)
    const sectionNumber = Number(body.sectionNumber)

    if (!Number.isFinite(moduleId) || !Number.isFinite(sectionNumber)) {
      return NextResponse.json(
        { error: "bad_request", message: "moduleId and sectionNumber are required" },
        { status: 400 }
      )
    }

    console.log(`[SIMPLE_COMPLETE] Completing M${moduleId}S${sectionNumber} for user ${user.id}`)

    // Get or create section completion
    const sectionCompletion = await prisma.sectionCompletion.upsert({
      where: {
        userId_moduleId_sectionId: {
          userId: user.id,
          moduleId: moduleId,
          sectionId: sectionNumber,
        },
      },
      update: {
        isComplete: true,
        completedAt: new Date(),
      },
      create: {
        userId: user.id,
        moduleId: moduleId,
        sectionId: sectionNumber,
        totalPages: 10, // Default value
        pagesVisited: 10, // Mark all as visited
        quizzesTotal: 2, // Default value
        quizzesCompleted: 2, // Mark all as completed
        isComplete: true,
        completedAt: new Date(),
      },
    })

    console.log(`[SIMPLE_COMPLETE] Section completion updated:`, sectionCompletion)

    // Unlock next section in user_module_progress
    const nextSection = sectionNumber + 1
    // Module 6 only has 1 section, all others have 3 sections
    const totalSections = moduleId === 6 ? 1 : 3

    const moduleProgress = await prisma.userModuleProgress.upsert({
      where: {
        userId_moduleId: {
          userId: user.id,
          moduleId: moduleId,
        },
      },
      update: {
        unlockedSection: Math.min(nextSection, totalSections),
        completed: nextSection > totalSections,
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        moduleId: moduleId,
        unlockedSection: Math.min(nextSection, totalSections),
        completed: nextSection > totalSections,
      },
    })

    console.log(`[SIMPLE_COMPLETE] Module progress updated:`, moduleProgress)

    return NextResponse.json({
      success: true,
      moduleId,
      completedSection: sectionNumber,
      unlockedSection: moduleProgress.unlockedSection,
      moduleCompleted: moduleProgress.completed,
    })
  } catch (error) {
    console.error("[SIMPLE_COMPLETE] Error:", error)
    return NextResponse.json(
      { error: "internal_error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

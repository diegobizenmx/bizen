import { createSupabaseServer } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { moduleId, sectionId, totalPages, quizzesTotal } =
      await request.json();

    if (!moduleId || !sectionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get current section completion
    const sectionCompletion = await prisma.sectionCompletion.findUnique({
      where: {
        userId_moduleId_sectionId: {
          userId: user.id,
          moduleId: parseInt(moduleId),
          sectionId: parseInt(sectionId),
        },
      },
    });

    if (!sectionCompletion) {
      return NextResponse.json(
        { error: "Section not started yet" },
        { status: 400 }
      );
    }

    // Check if all requirements are met
    const allPagesVisited =
      sectionCompletion.pagesVisited >= (totalPages || sectionCompletion.totalPages);
    const allQuizzesCompleted =
      sectionCompletion.quizzesCompleted >= (quizzesTotal || sectionCompletion.quizzesTotal);

    const isComplete = allPagesVisited && allQuizzesCompleted;

    // Update section completion
    const updatedCompletion = await prisma.sectionCompletion.update({
      where: {
        userId_moduleId_sectionId: {
          userId: user.id,
          moduleId: parseInt(moduleId),
          sectionId: parseInt(sectionId),
        },
      },
      data: {
        totalPages: totalPages || sectionCompletion.totalPages,
        quizzesTotal: quizzesTotal || sectionCompletion.quizzesTotal,
        isComplete,
        completedAt: isComplete ? new Date() : sectionCompletion.completedAt,
      },
    });

    // If section is complete, unlock the next section
    if (isComplete) {
      console.log(`✅ Section M${moduleId}S${sectionId} completed! Unlocking next section...`);
      
      // Get or create module progress
      const moduleProgress = await prisma.userModuleProgress.upsert({
        where: {
          userId_moduleId: {
            userId: user.id,
            moduleId: parseInt(moduleId),
          },
        },
        update: {
          // Unlock next section (but don't go backwards)
          unlockedSection: {
            set: Math.max(parseInt(sectionId) + 1, sectionCompletion.userId ? parseInt(sectionId) + 1 : 1),
          },
          updatedAt: new Date(),
        },
        create: {
          userId: user.id,
          moduleId: parseInt(moduleId),
          unlockedSection: parseInt(sectionId) + 1,
          completed: false,
        },
      });

      console.log(`🔓 Unlocked section ${moduleProgress.unlockedSection} for module ${moduleId}`);
    }

    return NextResponse.json({
      success: true,
      sectionCompletion: updatedCompletion,
      isComplete,
      nextSectionUnlocked: isComplete,
    });
  } catch (error) {
    console.error("Error marking section complete:", error);
    return NextResponse.json(
      { error: "Failed to mark section complete" },
      { status: 500 }
    );
  }
}


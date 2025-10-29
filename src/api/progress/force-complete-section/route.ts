import { createSupabaseServer } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
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

    const { moduleId, sectionId } = await request.json();

    if (!moduleId || !sectionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check how many quizzes user has completed in this section
    const quizCount = await prisma.quizAttempt.count({
      where: {
        userId: user.id,
        moduleId: parseInt(moduleId),
        sectionId: parseInt(sectionId),
      },
    });

    // Mark section as complete
    const result = await prisma.sectionCompletion.upsert({
      where: {
        userId_moduleId_sectionId: {
          userId: user.id,
          moduleId: parseInt(moduleId),
          sectionId: parseInt(sectionId),
        },
      },
      update: {
        isComplete: true,
        completedAt: new Date(),
        quizzesCompleted: quizCount,
        quizzesTotal: 2,
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        moduleId: parseInt(moduleId),
        sectionId: parseInt(sectionId),
        totalPages: 0,
        pagesVisited: 0,
        quizzesTotal: 2,
        quizzesCompleted: quizCount,
        isComplete: true,
        completedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Section ${sectionId} of Module ${moduleId} marked as complete`,
      quizCount,
      result,
    });
  } catch (error) {
    console.error("Error marking section complete:", error);
    return NextResponse.json(
      { error: "Failed to mark section complete" },
      { status: 500 }
    );
  }
}


import { createSupabaseServer } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all section completions for the user
    const sectionCompletions = await prisma.sectionCompletion.findMany({
      where: {
        userId: user.id,
      },
      orderBy: [
        { moduleId: "asc" },
        { sectionId: "asc" },
      ],
    });

    // Get all quiz attempts
    const quizAttempts = await prisma.quizAttempt.findMany({
      where: {
        userId: user.id,
      },
      include: {
        answers: true,
      },
      orderBy: {
        completedAt: "desc",
      },
    });

    // Calculate overall progress
    // Modules 1-5 have 3 sections each, Module 6 has 1 section
    const totalSections = (5 * 3) + 1; // 16 total sections
    const completedSections = sectionCompletions.filter(
      (sc) => sc.isComplete
    ).length;
    const overallProgress = Math.round(
      (completedSections / totalSections) * 100
    );

    return NextResponse.json({
      success: true,
      sectionCompletions,
      quizAttempts,
      overallProgress,
      completedSections,
      totalSections,
    });
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}


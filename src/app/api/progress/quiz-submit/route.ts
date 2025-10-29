import { createSupabaseServer } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Quiz configuration - matches the QUIZ_PAGES from page.tsx
const QUIZ_PAGES: Record<number, Record<number, Record<number, { type: string }>>> = {
  1: { // Module 1
    1: { 4: { type: "true_false" }, 5: { type: "multiple_choice" } }, // M1S1: pages 4, 5
    2: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M1S2: pages 3, 4
    3: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M1S3: pages 3, 4
  },
  2: { // Module 2
    1: { 3: { type: "true_false" }, 4: { type: "true_false" } }, // M2S1: pages 3, 4
    2: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M2S2: pages 3, 4
    3: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M2S3: pages 3, 4
  },
  3: { // Module 3
    1: { 4: { type: "multiple_choice" } }, // M3S1: page 4 only (1 quiz) ✅ FIXED
    2: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M3S2: pages 3, 4
    3: { 3: { type: "true_false" } }, // M3S3: page 3 only (1 quiz - page 4 is form, page 5 is activity)
  },
  4: { // Module 4
    1: { 4: { type: "true_false" }, 5: { type: "multiple_choice" } }, // M4S1: pages 4, 5
    2: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M4S2: pages 3, 4
    3: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M4S3: pages 3, 4
  },
  5: { // Module 5
    1: { 4: { type: "true_false" }, 5: { type: "multiple_choice" } }, // M5S1: pages 4, 5
    2: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M5S2: pages 3, 4
    3: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M5S3: pages 3, 4
  },
  6: { // Module 6
    1: {}, // No quizzes
  },
};

// Helper function to get the actual number of quizzes for a section
function getQuizCount(moduleId: number, sectionId: number): number {
  const moduleQuizzes = QUIZ_PAGES[moduleId];
  if (!moduleQuizzes) return 0;
  
  const sectionQuizzes = moduleQuizzes[sectionId];
  if (!sectionQuizzes) return 0;
  
  return Object.keys(sectionQuizzes).length;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      moduleId,
      sectionId,
      pageNumber,
      quizType,
      score,
      totalQuestions,
      answers,
    } = await request.json();

    console.log("📥 [QUIZ_SUBMIT] Received request:", {
      moduleId,
      sectionId,
      pageNumber,
      quizType,
      score,
      totalQuestions,
      answersLength: answers?.length || 0,
      answers
    });

    if (
      !moduleId ||
      !sectionId ||
      pageNumber === undefined ||
      !quizType ||
      score === undefined ||
      !totalQuestions ||
      !answers
    ) {
      console.error("❌ [QUIZ_SUBMIT] Missing required fields:", {
        hasModuleId: !!moduleId,
        hasSectionId: !!sectionId,
        hasPageNumber: pageNumber !== undefined,
        hasQuizType: !!quizType,
        hasScore: score !== undefined,
        hasTotalQuestions: !!totalQuestions,
        hasAnswers: !!answers
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if quiz already attempted (no retakes)
    const existingAttempt = await prisma.quizAttempt.findUnique({
      where: {
        userId_moduleId_sectionId_pageNumber: {
          userId: user.id,
          moduleId: parseInt(moduleId),
          sectionId: parseInt(sectionId),
          pageNumber: parseInt(pageNumber),
        },
      },
    });

    if (existingAttempt) {
      return NextResponse.json(
        { error: "Quiz already completed. Retakes not allowed." },
        { status: 400 }
      );
    }

    // Create quiz attempt with all answers in a transaction
    console.log("🔄 [QUIZ_SUBMIT] Starting database transaction...");
    const quizAttempt = await prisma.$transaction(async (tx) => {
      // Create the quiz attempt
      const attempt = await tx.quizAttempt.create({
        data: {
          userId: user.id,
          moduleId: parseInt(moduleId),
          sectionId: parseInt(sectionId),
          pageNumber: parseInt(pageNumber),
          quizType,
          score: parseInt(score),
          totalQuestions: parseInt(totalQuestions),
        },
      });

      // Create all quiz answers
      await tx.quizAnswer.createMany({
        data: answers.map((answer: any, index: number) => ({
          quizAttemptId: attempt.id,
          questionIndex: index,
          questionText: answer.questionText,
          userAnswer: JSON.stringify(answer.userAnswer),
          correctAnswer: JSON.stringify(answer.correctAnswer),
          isCorrect: answer.isCorrect,
        })),
      });

      // Update section completion
      const sectionCompletion = await tx.sectionCompletion.upsert({
        where: {
          userId_moduleId_sectionId: {
            userId: user.id,
            moduleId: parseInt(moduleId),
            sectionId: parseInt(sectionId),
          },
        },
        update: {
          quizzesCompleted: {
            increment: 1,
          },
          updatedAt: new Date(),
        },
        create: {
          userId: user.id,
          moduleId: parseInt(moduleId),
          sectionId: parseInt(sectionId),
          totalPages: 0,
          pagesVisited: 0,
          quizzesTotal: getQuizCount(parseInt(moduleId), parseInt(sectionId)),
          quizzesCompleted: 1,
          isComplete: false,
        },
      });

      // Count total quizzes completed for this section
      const quizCount = await tx.quizAttempt.count({
        where: {
          userId: user.id,
          moduleId: parseInt(moduleId),
          sectionId: parseInt(sectionId),
        },
      });

      // Get expected number of quizzes for this section
      const expectedQuizzes = getQuizCount(parseInt(moduleId), parseInt(sectionId));
      
      console.log(`📊 [QUIZ_SUBMIT] Quiz count for M${moduleId}S${sectionId}: ${quizCount}/${expectedQuizzes}`)

      // If all quizzes are completed, mark section as complete and unlock next
      if (quizCount >= expectedQuizzes) {
        console.log(`🎯 [QUIZ_SUBMIT] All quizzes done! Completing section...`)
        
        // Mark section as complete (use upsert in case record doesn't exist)
        await tx.sectionCompletion.upsert({
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
            quizzesTotal: expectedQuizzes,
            quizzesCompleted: quizCount,
          },
          create: {
            userId: user.id,
            moduleId: parseInt(moduleId),
            sectionId: parseInt(sectionId),
            totalPages: 0,
            pagesVisited: 0,
            quizzesTotal: expectedQuizzes,
            quizzesCompleted: quizCount,
            isComplete: true,
            completedAt: new Date(),
          },
        });

        // Unlock next section
        const nextSection = parseInt(sectionId) + 1
        const moduleCompleted = nextSection > 3 // 3 sections per module
        
        await tx.userModuleProgress.upsert({
          where: {
            userId_moduleId: {
              userId: user.id,
              moduleId: parseInt(moduleId),
            },
          },
          update: {
            unlockedSection: nextSection,
            completed: moduleCompleted,
            updatedAt: new Date(),
          },
          create: {
            userId: user.id,
            moduleId: parseInt(moduleId),
            unlockedSection: nextSection,
            completed: moduleCompleted,
          },
        });

        console.log(`🔓 [QUIZ_SUBMIT] ✅ Section completed! Unlocked section ${nextSection}`)
        if (moduleCompleted) {
          console.log(`🎉 [QUIZ_SUBMIT] Module ${moduleId} completed!`)
        }
      }

      return attempt;
    });

    console.log("✅ [QUIZ_SUBMIT] Transaction completed successfully:", quizAttempt.id);
    
    return NextResponse.json({
      success: true,
      quizAttempt,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Failed to submit quiz" },
      { status: 500 }
    );
  }
}


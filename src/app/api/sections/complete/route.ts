// API endpoint to mark a section as completed and unlock the next section
import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import type { Database } from "@/types/supabase"
import prisma from "@/lib/prisma"

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
    1: { 4: { type: "multiple_choice" } }, // M3S1: page 4 only (1 quiz)
    2: { 4: { type: "multiple_choice" } }, // M3S2: page 4 only (1 quiz - page 3 is tips)
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
  const supabase = createServerClient<Database, "public">(
    (process.env.NEXT_PUBLIC_SUPABASE_URL_BIZEN || process.env.NEXT_PUBLIC_SUPABASE_URL)!,
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_BIZEN || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
          })
        },
      },
    }
  )

  // Get current user
  const { data: { user }, error: userErr } = await supabase.auth.getUser()
  if (userErr || !user) {
    return NextResponse.json(
      { error: "not_authenticated" },
      { status: 401 }
    )
  }

  // Parse request body
  const body = await request.json().catch(() => ({}))
  const moduleId = Number(body.moduleId)
  const sectionNumber = Number(body.sectionNumber)

  if (!Number.isFinite(moduleId) || !Number.isFinite(sectionNumber)) {
    return NextResponse.json(
      { error: "bad_request", message: "moduleId and sectionNumber are required" },
      { status: 400 }
    )
  }

  try {
    console.log(`🎯 Starting section completion for M${moduleId}S${sectionNumber}`);
    
    // 1. Check if section requirements are met (pages + quizzes)
    let sectionCompletion
    try {
      console.log(`🔍 Checking section completion for user ${user.id}...`);
      sectionCompletion = await prisma.sectionCompletion.findUnique({
        where: {
          userId_moduleId_sectionId: {
            userId: user.id,
            moduleId: moduleId,
            sectionId: sectionNumber,
          },
        },
      })
      console.log(`📊 Section completion found:`, sectionCompletion);
    } catch (prismaError) {
      console.error("❌ Prisma error in sectionCompletion.findUnique:", prismaError)
      return NextResponse.json(
        { 
          error: "database_error", 
          message: "Error de conexión con la base de datos. Por favor, reinicia el servidor.",
          details: prismaError instanceof Error ? prismaError.message : String(prismaError)
        },
        { status: 503 }
      )
    }

    // If section completion doesn't exist, check actual quiz attempts
    if (!sectionCompletion) {
      console.log(`Creating new sectionCompletion record for M${moduleId}S${sectionNumber}`);
      
      // Check how many quizzes were actually completed for this section
      const quizAttempts = await prisma.quizAttempt.findMany({
        where: {
          userId: user.id,
          moduleId: moduleId,
          sectionId: sectionNumber,
        },
      });
      
      // Get the actual number of quizzes for this section from configuration
      const actualQuizCount = getQuizCount(moduleId, sectionNumber);
      
      console.log(`Found ${quizAttempts.length} quiz attempts for M${moduleId}S${sectionNumber} (expected: ${actualQuizCount})`);
      
      sectionCompletion = await prisma.sectionCompletion.create({
        data: {
          userId: user.id,
          moduleId: moduleId,
          sectionId: sectionNumber,
          totalPages: 6, // Default for most sections
          pagesVisited: 6, // Assume all visited if they reached last page
          quizzesTotal: actualQuizCount, // Use actual quiz count from configuration
          quizzesCompleted: quizAttempts.length, // Use actual count from database
          isComplete: false,
        },
      });
    }

    // Check if all pages visited and all quizzes completed
    const allPagesVisited = sectionCompletion.pagesVisited >= sectionCompletion.totalPages
    const allQuizzesCompleted = sectionCompletion.quizzesCompleted >= sectionCompletion.quizzesTotal
    const canComplete = allPagesVisited && allQuizzesCompleted
    
    console.log(`Section requirements check:`, {
      pagesVisited: sectionCompletion.pagesVisited,
      totalPages: sectionCompletion.totalPages,
      allPagesVisited,
      quizzesCompleted: sectionCompletion.quizzesCompleted,
      quizzesTotal: sectionCompletion.quizzesTotal,
      allQuizzesCompleted,
      canComplete
    });

    if (!canComplete) {
      const missingPages = sectionCompletion.totalPages - sectionCompletion.pagesVisited
      const missingQuizzes = sectionCompletion.quizzesTotal - sectionCompletion.quizzesCompleted
      
      let message = "Para completar esta sección necesitas: "
      if (!allPagesVisited) message += `visitar ${missingPages} página(s) más`
      if (!allPagesVisited && !allQuizzesCompleted) message += " y "
      if (!allQuizzesCompleted) message += `completar ${missingQuizzes} quiz(zes) más`
      
      return NextResponse.json(
        { 
          error: "requirements_not_met", 
          message,
          pagesVisited: sectionCompletion.pagesVisited,
          totalPages: sectionCompletion.totalPages,
          quizzesCompleted: sectionCompletion.quizzesCompleted,
          quizzesTotal: sectionCompletion.quizzesTotal,
        },
        { status: 400 }
      )
    }

    // 2. Mark section as completed in Prisma
    console.log("✅ Marking section as completed in database...");
    try {
      await prisma.sectionCompletion.update({
        where: {
          userId_moduleId_sectionId: {
            userId: user.id,
            moduleId: moduleId,
            sectionId: sectionNumber,
          },
        },
        data: {
          isComplete: true,
          completedAt: new Date(),
        },
      })
      console.log("✅ Section marked as completed");
    } catch (updateError) {
      console.error("❌ Error updating section completion:", updateError);
      throw updateError;
    }

    // 3. Unlock next section using Prisma
    console.log("🔓 Unlocking next section...");
    const nextSection = sectionNumber + 1
    // Module 6 only has 1 section, all others have 3 sections
    const totalSections = moduleId === 6 ? 1 : 3

    // Get existing module progress or create new one
    console.log("🔍 Getting module progress...");
    let moduleProgress = await prisma.userModuleProgress.findUnique({
      where: {
        userId_moduleId: {
          userId: user.id,
          moduleId: moduleId,
        },
      },
    })
    console.log("📊 Module progress found:", moduleProgress);

    if (!moduleProgress) {
      console.log("📝 Creating new module progress record...");
      moduleProgress = await prisma.userModuleProgress.create({
        data: {
          userId: user.id,
          moduleId: moduleId,
          unlockedSection: Math.min(nextSection, totalSections),
          completed: nextSection > totalSections,
        },
      })
      console.log("✅ Module progress created:", moduleProgress);
    }

    const currentUnlocked = moduleProgress.unlockedSection
    const newUnlocked = Math.max(currentUnlocked, nextSection)
    const moduleCompleted = nextSection > totalSections

    console.log("📈 Updating module progress:", {
      currentUnlocked,
      newUnlocked,
      moduleCompleted,
    });

    // Update module progress with the calculated values
    const updatedProgress = await prisma.userModuleProgress.update({
      where: {
        userId_moduleId: {
          userId: user.id,
          moduleId: moduleId,
        },
      },
      data: {
        unlockedSection: Math.min(newUnlocked, totalSections),
        completed: moduleCompleted,
      },
    })

    console.log("✅ Module progress updated:", {
      unlockedSection: updatedProgress.unlockedSection,
      completed: updatedProgress.completed,
    })

    return NextResponse.json(
      {
        success: true,
        moduleId,
        completedSection: sectionNumber,
        unlockedSection: Math.min(newUnlocked, totalSections),
        moduleCompleted,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("❌ Section completion error:", error)
    console.error("Error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack',
    });
    
    return NextResponse.json(
      { 
        error: "internal_error", 
        message: "Error interno del servidor",
        details: error instanceof Error ? error.message : String(error),
        moduleId,
        sectionNumber
      },
      { status: 500 }
    )
  }
}

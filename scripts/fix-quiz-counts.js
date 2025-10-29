/**
 * Fix Quiz Counts - Migration Script
 * 
 * This script updates existing section_completions records to have the correct
 * quizzesTotal values based on the actual QUIZ_PAGES configuration.
 * 
 * Run this to fix the M3S1 unlocking issue where users completed the only quiz
 * but the system expected 2 quizzes.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Quiz configuration - matches the QUIZ_PAGES from page.tsx
const QUIZ_PAGES = {
  1: { // Module 1
    1: { 4: { type: "true_false" }, 5: { type: "multiple_choice" } }, // M1S1: pages 4, 5 (2 quizzes)
    2: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M1S2: pages 3, 4 (2 quizzes)
    3: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M1S3: pages 3, 4 (2 quizzes)
  },
  2: { // Module 2
    1: { 3: { type: "true_false" }, 4: { type: "true_false" } }, // M2S1: pages 3, 4 (2 quizzes)
    2: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M2S2: pages 3, 4 (2 quizzes)
    3: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M2S3: pages 3, 4 (2 quizzes)
  },
  3: { // Module 3
    1: { 4: { type: "multiple_choice" } }, // M3S1: page 4 only (1 quiz) ✅ THIS WAS THE BUG
    2: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M3S2: pages 3, 4 (2 quizzes)
    3: { 3: { type: "true_false" } }, // M3S3: page 3 only (1 quiz - page 4 is form, page 5 is activity)
  },
  4: { // Module 4
    1: { 4: { type: "true_false" }, 5: { type: "multiple_choice" } }, // M4S1: pages 4, 5 (2 quizzes)
    2: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M4S2: pages 3, 4 (2 quizzes)
    3: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M4S3: pages 3, 4 (2 quizzes)
  },
  5: { // Module 5
    1: { 4: { type: "true_false" }, 5: { type: "multiple_choice" } }, // M5S1: pages 4, 5 (2 quizzes)
    2: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M5S2: pages 3, 4 (2 quizzes)
    3: { 3: { type: "true_false" }, 4: { type: "multiple_choice" } }, // M5S3: pages 3, 4 (2 quizzes)
  },
  6: { // Module 6
    1: {}, // No quizzes (0 quizzes)
  },
};

// Helper function to get the actual number of quizzes for a section
function getQuizCount(moduleId, sectionId) {
  const moduleQuizzes = QUIZ_PAGES[moduleId];
  if (!moduleQuizzes) return 0;
  
  const sectionQuizzes = moduleQuizzes[sectionId];
  if (!sectionQuizzes) return 0;
  
  return Object.keys(sectionQuizzes).length;
}

async function fixQuizCounts() {
  console.log('🔧 Starting quiz count fix...\n');
  
  try {
    // Get all section completions
    const allCompletions = await prisma.sectionCompletion.findMany({
      orderBy: [
        { moduleId: 'asc' },
        { sectionId: 'asc' },
      ],
    });

    console.log(`📊 Found ${allCompletions.length} section completion records\n`);

    let fixedCount = 0;
    let unlockedCount = 0;

    for (const completion of allCompletions) {
      const correctQuizCount = getQuizCount(completion.moduleId, completion.sectionId);
      
      // Skip if already correct
      if (completion.quizzesTotal === correctQuizCount) {
        continue;
      }

      console.log(`\n🔍 Found incorrect record:`);
      console.log(`   User: ${completion.userId}`);
      console.log(`   Module ${completion.moduleId}, Section ${completion.sectionId}`);
      console.log(`   Current quizzesTotal: ${completion.quizzesTotal} (incorrect)`);
      console.log(`   Correct quizzesTotal: ${correctQuizCount}`);
      console.log(`   Quizzes completed: ${completion.quizzesCompleted}`);

      // Check if this fix would complete the section
      const wasComplete = completion.isComplete;
      const allPagesVisited = completion.pagesVisited >= completion.totalPages;
      const willBeComplete = allPagesVisited && (completion.quizzesCompleted >= correctQuizCount);

      // Update the record
      await prisma.sectionCompletion.update({
        where: {
          userId_moduleId_sectionId: {
            userId: completion.userId,
            moduleId: completion.moduleId,
            sectionId: completion.sectionId,
          },
        },
        data: {
          quizzesTotal: correctQuizCount,
          isComplete: willBeComplete,
          completedAt: willBeComplete && !wasComplete ? new Date() : completion.completedAt,
        },
      });

      console.log(`   ✅ Updated quizzesTotal to ${correctQuizCount}`);
      fixedCount++;

      // If this fix completes the section, unlock the next section
      if (willBeComplete && !wasComplete) {
        console.log(`   🎉 Section is now complete!`);
        
        const nextSection = completion.sectionId + 1;
        const moduleCompleted = nextSection > 3; // 3 sections per module

        // Get current module progress
        const currentProgress = await prisma.userModuleProgress.findUnique({
          where: {
            userId_moduleId: {
              userId: completion.userId,
              moduleId: completion.moduleId,
            },
          },
        });

        const currentUnlocked = currentProgress?.unlockedSection || 1;
        const newUnlocked = Math.max(currentUnlocked, nextSection);

        // Update module progress to unlock next section
        await prisma.userModuleProgress.upsert({
          where: {
            userId_moduleId: {
              userId: completion.userId,
              moduleId: completion.moduleId,
            },
          },
          update: {
            unlockedSection: Math.min(newUnlocked, 3), // Max 3 sections
            completed: moduleCompleted,
            updatedAt: new Date(),
          },
          create: {
            userId: completion.userId,
            moduleId: completion.moduleId,
            unlockedSection: Math.min(newUnlocked, 3),
            completed: moduleCompleted,
          },
        });

        console.log(`   🔓 Unlocked section ${Math.min(nextSection, 3)}`);
        unlockedCount++;
      }
    }

    console.log(`\n\n✅ Fix complete!`);
    console.log(`   📝 Updated ${fixedCount} records`);
    console.log(`   🔓 Unlocked ${unlockedCount} new sections`);
    
    if (fixedCount === 0) {
      console.log(`   ℹ️  All records were already correct!`);
    }

  } catch (error) {
    console.error('❌ Error fixing quiz counts:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the fix
fixQuizCounts()
  .then(() => {
    console.log('\n🎉 Migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Migration failed:', error);
    process.exit(1);
  });


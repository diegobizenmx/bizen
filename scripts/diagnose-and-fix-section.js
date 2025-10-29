// Script to diagnose and fix section unlocking issues
// Usage: node scripts/diagnose-and-fix-section.js <userId> <moduleId> <sectionId>

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function diagnoseSectionIssue(userId, moduleId, sectionId) {
  console.log(`\n🔍 Diagnosing M${moduleId}S${sectionId} for user: ${userId}\n`);
  
  try {
    // 1. Check quiz attempts
    const quizAttempts = await prisma.quizAttempt.findMany({
      where: {
        userId: userId,
        moduleId: moduleId,
        sectionId: sectionId,
      },
      orderBy: { pageNumber: 'asc' },
    });
    
    console.log(`📊 Quiz Attempts Found: ${quizAttempts.length}`);
    quizAttempts.forEach(attempt => {
      console.log(`  - Page ${attempt.pageNumber}: ${attempt.score}/${attempt.totalQuestions} (${attempt.quizType})`);
    });
    
    // 2. Check section completion
    const sectionCompletion = await prisma.sectionCompletion.findUnique({
      where: {
        userId_moduleId_sectionId: {
          userId: userId,
          moduleId: moduleId,
          sectionId: sectionId,
        },
      },
    });
    
    console.log(`\n📋 Section Completion Record:`);
    if (sectionCompletion) {
      console.log(`  - Pages: ${sectionCompletion.pagesVisited}/${sectionCompletion.totalPages}`);
      console.log(`  - Quizzes: ${sectionCompletion.quizzesCompleted}/${sectionCompletion.quizzesTotal}`);
      console.log(`  - Complete: ${sectionCompletion.isComplete ? '✅ YES' : '❌ NO'}`);
      console.log(`  - Completed At: ${sectionCompletion.completedAt || 'N/A'}`);
    } else {
      console.log(`  ⚠️  NO SECTION COMPLETION RECORD FOUND`);
      console.log(`  This is the problem! Quizzes were saved but section wasn't marked complete.`);
    }
    
    // 3. Check module progress (unlocked sections)
    const moduleProgress = await prisma.userModuleProgress.findUnique({
      where: {
        userId_moduleId: {
          userId: userId,
          moduleId: moduleId,
        },
      },
    });
    
    console.log(`\n🎯 Module Progress:`);
    if (moduleProgress) {
      console.log(`  - Unlocked Section: ${moduleProgress.unlockedSection}`);
      console.log(`  - Module Complete: ${moduleProgress.completed ? 'YES' : 'NO'}`);
    } else {
      console.log(`  ⚠️  NO MODULE PROGRESS RECORD (default: section 1 unlocked)`);
    }
    
    // 4. Determine if fix is needed
    const expectedQuizzes = 2; // M2S1 has 2 quizzes
    const needsFix = quizAttempts.length >= expectedQuizzes && (!sectionCompletion || !sectionCompletion.isComplete);
    
    console.log(`\n🔧 Fix Required: ${needsFix ? '✅ YES' : '❌ NO'}`);
    
    if (needsFix) {
      console.log(`\n💡 Problem: You completed ${quizAttempts.length} quizzes but section wasn't marked complete.`);
      console.log(`   This happened because the sectionCompletion.update() failed (record didn't exist).`);
      console.log(`\n   Run with --fix flag to repair this.`);
    }
    
    return { needsFix, quizAttempts, sectionCompletion, moduleProgress };
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

async function fixSection(userId, moduleId, sectionId) {
  console.log(`\n🔧 Fixing M${moduleId}S${sectionId} for user: ${userId}\n`);
  
  try {
    // Count quiz attempts
    const quizCount = await prisma.quizAttempt.count({
      where: {
        userId: userId,
        moduleId: moduleId,
        sectionId: sectionId,
      },
    });
    
    const expectedQuizzes = 2; // M2S1 has 2 quizzes
    
    if (quizCount < expectedQuizzes) {
      console.log(`❌ Cannot fix: Only ${quizCount}/${expectedQuizzes} quizzes completed.`);
      return;
    }
    
    // Fix section completion
    await prisma.sectionCompletion.upsert({
      where: {
        userId_moduleId_sectionId: {
          userId: userId,
          moduleId: moduleId,
          sectionId: sectionId,
        },
      },
      update: {
        isComplete: true,
        completedAt: new Date(),
        quizzesTotal: expectedQuizzes,
        quizzesCompleted: quizCount,
      },
      create: {
        userId: userId,
        moduleId: moduleId,
        sectionId: sectionId,
        totalPages: 5,
        pagesVisited: 5,
        quizzesTotal: expectedQuizzes,
        quizzesCompleted: quizCount,
        isComplete: true,
        completedAt: new Date(),
      },
    });
    
    console.log(`✅ Section completion fixed!`);
    
    // Unlock next section
    const nextSection = sectionId + 1;
    const moduleCompleted = nextSection > 3;
    
    await prisma.userModuleProgress.upsert({
      where: {
        userId_moduleId: {
          userId: userId,
          moduleId: moduleId,
        },
      },
      update: {
        unlockedSection: nextSection,
        completed: moduleCompleted,
        updatedAt: new Date(),
      },
      create: {
        userId: userId,
        moduleId: moduleId,
        unlockedSection: nextSection,
        completed: moduleCompleted,
      },
    });
    
    console.log(`✅ Unlocked section ${nextSection}!`);
    console.log(`\n🎉 All fixed! You can now access M${moduleId}S${nextSection}.`);
    
  } catch (error) {
    console.error('❌ Error fixing section:', error);
    throw error;
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log(`
Usage: node scripts/diagnose-and-fix-section.js <userId> <moduleId> <sectionId> [--fix]

Examples:
  # Diagnose only
  node scripts/diagnose-and-fix-section.js YOUR_USER_ID 2 1
  
  # Diagnose and fix
  node scripts/diagnose-and-fix-section.js YOUR_USER_ID 2 1 --fix
`);
    process.exit(1);
  }
  
  const userId = args[0];
  const moduleId = parseInt(args[1]);
  const sectionId = parseInt(args[2]);
  const shouldFix = args.includes('--fix');
  
  const diagnosis = await diagnoseSectionIssue(userId, moduleId, sectionId);
  
  if (shouldFix && diagnosis.needsFix) {
    await fixSection(userId, moduleId, sectionId);
    
    // Re-diagnose to confirm fix
    console.log(`\n📊 Re-checking after fix...`);
    await diagnoseSectionIssue(userId, moduleId, sectionId);
  }
  
  await prisma.$disconnect();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});


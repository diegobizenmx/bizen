# Adding a Quiz - Quick Reference

## TL;DR

To add a quiz to an existing section (e.g., adding page 3 quiz to M3S1):

### 1. Create Quiz Content
Add quiz to your content component with `QuizTracker`.

### 2. Update QUIZ_PAGES in 3 Files

**⚠️ IMPORTANT:** Update all three files or quizzes won't count correctly!

#### File 1: `src/app/module/[moduleId]/section/[section]/page/[page]/page.tsx`
```typescript
3: { // Module 3
  1: { 
    3: { type: "true_false" },        // ⬅️ ADD THIS
    4: { type: "multiple_choice" }
  },
  // ...
}
```

#### File 2: `src/app/api/sections/complete/route.ts`
```typescript
3: { // Module 3
  1: { 
    3: { type: "true_false" },        // ⬅️ ADD THIS
    4: { type: "multiple_choice" }
  },
  // ...
}
```

#### File 3: `src/app/api/progress/quiz-submit/route.ts`
```typescript
3: { // Module 3
  1: { 
    3: { type: "true_false" },        // ⬅️ ADD THIS
    4: { type: "multiple_choice" }
  },
  // ...
}
```

### 3. Handle Existing Users

**Option A: Grandfather them (keep completed)**
```bash
# Create script to keep existing users as complete
node scripts/grandfather-m3s1-completions.js
```

**Option B: Require new quiz**
```bash
# Create script to reset completion for all users
node scripts/reset-m3s1-for-new-quiz.js
```

### 4. Validate Configuration

```bash
# Run this to check all 3 files match
node scripts/validate-quiz-config.js
```

Should show: `✅ SUCCESS! All quiz configurations match perfectly! 🎉`

## Current Quiz Counts (After Fix)

```
Module 1:
  S1: 2 quizzes (pages 4, 5)
  S2: 2 quizzes (pages 3, 4)
  S3: 2 quizzes (pages 3, 4)

Module 2:
  S1: 2 quizzes (pages 3, 4)
  S2: 2 quizzes (pages 3, 4)
  S3: 2 quizzes (pages 3, 4)

Module 3:
  S1: 1 quiz (page 4) ⬅️ This is why M3S2 wasn't unlocking
  S2: 2 quizzes (pages 3, 4)
  S3: 2 quizzes (pages 3, 4)

Module 4:
  S1: 2 quizzes (pages 4, 5)
  S2: 2 quizzes (pages 3, 4)
  S3: 2 quizzes (pages 3, 4)

Module 5:
  S1: 2 quizzes (pages 4, 5)
  S2: 2 quizzes (pages 3, 4)
  S3: 2 quizzes (pages 3, 4)

Module 6:
  S1: 0 quizzes
```

## Example Migration Scripts

### Grandfather Script (Keep Users Complete)

```javascript
// scripts/grandfather-m3s1-completions.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function grandfatherUsers() {
  await prisma.sectionCompletion.updateMany({
    where: {
      moduleId: 3,
      sectionId: 1,
      isComplete: true,
    },
    data: {
      quizzesTotal: 2, // New count (was 1)
      // Keep isComplete: true - they stay completed
    },
  });
  
  console.log('✅ Grandfathered existing M3S1 completions');
  await prisma.$disconnect();
}

grandfatherUsers();
```

Run: `node scripts/grandfather-m3s1-completions.js`

### Reset Script (Require New Quiz)

```javascript
// scripts/reset-m3s1-for-new-quiz.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetM3S1() {
  await prisma.sectionCompletion.updateMany({
    where: {
      moduleId: 3,
      sectionId: 1,
    },
    data: {
      quizzesTotal: 2,     // New count
      isComplete: false,   // Reset completion
      completedAt: null,
    },
  });
  
  console.log('✅ Reset M3S1 - users must complete new quiz');
  await prisma.$disconnect();
}

resetM3S1();
```

Run: `node scripts/reset-m3s1-for-new-quiz.js`

## Testing Checklist

After adding a quiz:

- [ ] Create quiz content with `QuizTracker`
- [ ] Update `QUIZ_PAGES` in all 3 files
- [ ] Run `node scripts/validate-quiz-config.js` ✅
- [ ] Decide: grandfather OR reset existing users
- [ ] Create and run migration script
- [ ] Test as NEW user - complete both quizzes, section unlocks
- [ ] Test as EXISTING user - verify expected behavior
- [ ] Check console logs for errors
- [ ] Verify database: `SELECT * FROM section_completions WHERE module_id = 3 AND section_id = 1;`

## Common Issues

### Issue: Quiz completes but section doesn't unlock
**Cause:** QUIZ_PAGES not updated in all 3 files
**Fix:** Update all 3 files, run validation script

### Issue: Existing users can't progress
**Cause:** `quizzesTotal` doesn't match actual quiz count
**Fix:** Run fix-quiz-counts.js or create custom migration

### Issue: New quiz doesn't save
**Cause:** Missing `QuizTracker` wrapper
**Fix:** Wrap quiz component with `QuizTracker`

## See Also

- **HOW_TO_ADD_QUIZ.md** - Detailed guide with examples
- **QUIZ_COUNT_FIX.md** - Technical details about the M3S2 unlock fix
- **scripts/validate-quiz-config.js** - Configuration validation tool
- **scripts/fix-quiz-counts.js** - Database migration reference


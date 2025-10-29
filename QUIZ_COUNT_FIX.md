# Quiz Count Fix - M3S2 Not Unlocking Issue

## 🐛 The Problem

Users reported that after completing M3S1 (Module 3, Section 1), M3S2 was not unlocking. This was caused by a hardcoded quiz count mismatch.

### Root Cause

The section completion API was hardcoded to expect **2 quizzes per section**, but:
- **M3S1 only has 1 quiz** (on page 4 only)
- M4S1 and M5S1 also have 2 quizzes but they're on different pages

When users completed M3S1:
- They finished the only quiz available (1/1 quizzes complete) ✅
- But the system expected 2 quizzes (1/2 quizzes complete) ❌
- Section was never marked as complete 🔒
- M3S2 remained locked 🔒

### Affected Sections

The following sections had incorrect quiz counts:
- **M3S1**: Expected 2, actually has 1
- All other sections were expecting 2, which was correct for most but not verified against the actual quiz pages

## ✅ The Fix

### Code Changes

Updated two API endpoints to use dynamic quiz counts based on the actual `QUIZ_PAGES` configuration:

1. **`/src/app/api/sections/complete/route.ts`**
   - Added `QUIZ_PAGES` configuration
   - Added `getQuizCount()` helper function
   - Changed from hardcoded `quizzesTotal: 2` to `quizzesTotal: getQuizCount(moduleId, sectionNumber)`

2. **`/src/app/api/progress/quiz-submit/route.ts`**
   - Replaced `EXPECTED_QUIZZES` with full `QUIZ_PAGES` configuration
   - Updated `getQuizCount()` function
   - Changed all references to use the dynamic count

### Quiz Configuration (Actual Counts)

```javascript
Module 1:
  S1: 2 quizzes (pages 4, 5)
  S2: 2 quizzes (pages 3, 4)
  S3: 2 quizzes (pages 3, 4)

Module 2:
  S1: 2 quizzes (pages 3, 4)
  S2: 2 quizzes (pages 3, 4)
  S3: 2 quizzes (pages 3, 4)

Module 3:
  S1: 1 quiz (page 4 only) ⚠️ THIS WAS THE ISSUE
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
  S1: 0 quizzes (no quizzes)
```

## 🔧 Database Migration

For existing users who are stuck (already completed M3S1 but M3S2 is locked), run the migration script:

```bash
node scripts/fix-quiz-counts.js
```

This script will:
1. Find all `section_completions` records with incorrect `quizzesTotal` values
2. Update them to the correct count based on `QUIZ_PAGES`
3. Mark sections as complete if all requirements are now met
4. Unlock next sections for affected users
5. Print a summary of all changes

### What the Script Does

For each section completion record:
- Compares `quizzesTotal` with the actual count from configuration
- If incorrect:
  - Updates `quizzesTotal` to the correct value
  - Checks if section should now be complete
  - If complete: marks it complete and unlocks next section
  - Logs all changes

### Example Output

```
🔧 Starting quiz count fix...

📊 Found 15 section completion records

🔍 Found incorrect record:
   User: abc123
   Module 3, Section 1
   Current quizzesTotal: 2 (incorrect)
   Correct quizzesTotal: 1
   Quizzes completed: 1
   ✅ Updated quizzesTotal to 1
   🎉 Section is now complete!
   🔓 Unlocked section 2

✅ Fix complete!
   📝 Updated 1 records
   🔓 Unlocked 1 new sections
```

## 🧪 Testing

After applying the fix, test the following:

### 1. New Users (Fresh Start)
1. Sign up as a new user
2. Complete M3S1 (finish page 4 quiz)
3. Navigate to last page of M3S1
4. Verify M3S2 unlocks automatically ✅

### 2. Existing Users (Already Stuck)
1. Run the migration script
2. Log in as affected user
3. Go to Module 3 sections page
4. Verify M3S2 is now unlocked ✅

### 3. Other Modules
1. Test M1S1 (2 quizzes) → M1S2 unlocks
2. Test M4S1 (2 quizzes) → M4S2 unlocks
3. Test M5S1 (2 quizzes) → M5S2 unlocks

## 📝 Prevention

To prevent this issue in the future:

1. **Single Source of Truth**: The `QUIZ_PAGES` configuration in `/src/app/module/[moduleId]/section/[section]/page/[page]/page.tsx` is the authoritative source
2. **Keep in Sync**: Both API files now import the same configuration structure
3. **Add Tests**: Consider adding unit tests to verify quiz counts match between files

## 🔄 Future Improvements

Consider these improvements:

1. **Extract Configuration**: Move `QUIZ_PAGES` to a shared config file (e.g., `/src/config/quiz-config.ts`)
2. **Validation Script**: Create a script to verify all three files have matching quiz counts
3. **Type Safety**: Add TypeScript types to ensure configuration consistency
4. **Admin Dashboard**: Show which sections are complete/locked in admin panel

## 📚 Related Files

- `/src/app/module/[moduleId]/section/[section]/page/[page]/page.tsx` - Main quiz configuration
- `/src/app/api/sections/complete/route.ts` - Section completion logic
- `/src/app/api/progress/quiz-submit/route.ts` - Quiz submission logic
- `/scripts/fix-quiz-counts.js` - Database migration script


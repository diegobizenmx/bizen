# Progress Tracking & Gating System - Integration Guide

## Overview

This system tracks user progress, prevents quiz retakes, and gates sections so users must complete sections in order.

## 🗄️ Database Setup

### Step 1: Run Prisma Migration

```bash
npx prisma migrate dev --name add_progress_tracking
npx prisma generate
```

This creates these tables:
- `page_visits` - Tracks every page view
- `quiz_attempts` - Stores quiz completions (prevents retakes)
- `quiz_answers` - Stores every individual answer
- `section_completions` - Tracks section progress

## 📦 Components Created

### 1. `useProgress` Hook
Location: `/src/hooks/useProgress.ts`

Provides functions for:
- `trackPageVisit()` - Log page views
- `submitQuiz()` - Save quiz results
- `checkAccess()` - Verify section access
- `markSectionComplete()` - Mark sections done
- `fetchProgress()` - Get user progress
- `isQuizCompleted()` - Check if quiz taken

### 2. `QuizTracker` Component
Location: `/src/components/QuizTracker.tsx`

Wraps quizzes to:
- Prevent retakes
- Track all answers
- Auto-submit when complete

### 3. `PageTracker` Component
Location: `/src/components/PageTracker.tsx`

Auto-tracks page visits

### 4. `SectionGate` Component
Location: `/src/components/SectionGate.tsx`

Blocks access to locked sections

### 5. Progress Dashboard
Location: `/src/app/progress/page.tsx`

Shows completion status for all modules/sections

## 🔌 Integration Examples

### Example 1: Wrap a Quiz Page (True/False)

```tsx
// In your quiz page component
import { QuizTracker } from "@/components/QuizTracker";
import { BSMXSection1Page3 } from "@/components/bizen/m2s1/Section1Pages";

export default function QuizPage() {
  const QUESTIONS = [...]; // Your questions array
  
  return (
    <QuizTracker
      moduleId={2}
      sectionId={1}
      pageNumber={3}
      quizType="true_false"
      questions={QUESTIONS}
    >
      {({ onAnswerSubmit, onQuizComplete, isAlreadyCompleted, completedScore }) => (
        <ModifiedQuizComponent
          onAnswerSubmit={onAnswerSubmit}
          onQuizComplete={onQuizComplete}
          isAlreadyCompleted={isAlreadyCompleted}
          completedScore={completedScore}
        />
      )}
    </QuizTracker>
  );
}
```

### Example 2: Update Quiz Component to Track Answers

Modify your quiz component's `handleSelect` function:

```tsx
// OLD CODE (before tracking)
const handleSelect = (val: boolean) => {
  if (checked[idx]) return;
  const next = [...selection]
  next[idx] = val
  setSelection(next)
  const isCorrect = val === q.answer
  // ... check answer logic
  setTimeout(() => {
    if (idx < total - 1) setIdx(idx + 1);
  }, 800);
}

// NEW CODE (with tracking)
const handleSelect = (val: boolean, onAnswerSubmit: Function) => {
  if (checked[idx]) return;
  const next = [...selection]
  next[idx] = val
  setSelection(next)
  const isCorrect = val === q.answer
  
  // Track this answer
  onAnswerSubmit(
    idx,
    q.text,
    val,
    q.answer,
    isCorrect
  );
  
  // ... rest of check answer logic
  
  // When all questions answered, submit quiz
  if (idx === total - 1) {
    onQuizComplete(score);
  }
  
  setTimeout(() => {
    if (idx < total - 1) setIdx(idx + 1);
  }, 800);
}
```

### Example 3: Add Page Tracking

```tsx
// In any page component
import { PageTracker } from "@/components/PageTracker";

export default function SomePage() {
  return (
    <PageTracker moduleId={2} sectionId={1} pageNumber={1}>
      {/* Your page content */}
      <div>
        <h1>Page Content</h1>
      </div>
    </PageTracker>
  );
}
```

### Example 4: Add Section Gating

```tsx
// In section entry point (e.g., /module/2/section/2/page.tsx)
import { SectionGate } from "@/components/SectionGate";

export default function SectionPage() {
  return (
    <SectionGate moduleId={2} sectionId={2}>
      {/* This content only shows if previous section is complete */}
      <YourSectionContent />
    </SectionGate>
  );
}
```

### Example 5: Show Progress in Navigation

```tsx
// In your navigation/header
import { useProgress } from "@/hooks/useProgress";
import { useEffect } from "react";

function Navigation() {
  const { progress, fetchProgress } = useProgress();
  
  useEffect(() => {
    fetchProgress();
  }, []);
  
  return (
    <nav>
      <Link href="/progress">
        Progreso: {progress?.overallProgress || 0}%
      </Link>
    </nav>
  );
}
```

## 🎯 Complete Integration Checklist

### For Each Quiz Page:

1. ✅ Wrap with `QuizTracker`
2. ✅ Add `onAnswerSubmit()` calls in answer selection
3. ✅ Add `onQuizComplete()` call when quiz finishes
4. ✅ Show "Already Completed" message if `isAlreadyCompleted === true`
5. ✅ Display previous score with `completedScore`

### For Each Regular Page:

1. ✅ Wrap with `PageTracker` 
2. ✅ Provide correct `moduleId`, `sectionId`, `pageNumber`

### For Each Section Entry Point:

1. ✅ Wrap with `SectionGate`
2. ✅ Provide correct `moduleId`, `sectionId`

### Global:

1. ✅ Add link to `/progress` dashboard in navigation
2. ✅ Run database migrations
3. ✅ Test section locking
4. ✅ Test quiz retake prevention

## 📊 Course Structure Reference

```
Module 1: Marketing de Influencia (3 sections)
Module 2: Identidad Digital (3 sections)
Module 3: Creación de Contenido (3 sections)
Module 4: Plataformas (3 sections)
Module 5: Estrategia (3 sections)
Module 6: Monetización (3 sections)
```

## 🔐 Section Completion Logic

A section is marked complete when:
1. All pages have been visited
2. All quizzes have been completed (regardless of score)

## 🚫 Quiz Retake Prevention

- Each quiz can only be attempted once
- If user tries to retake, they see their previous score
- No "reset quiz" option
- Answers are permanently saved in database

## API Endpoints

- `POST /api/progress/page-visit` - Log page view
- `POST /api/progress/quiz-submit` - Submit quiz
- `POST /api/progress/check-access` - Verify section access
- `POST /api/progress/mark-complete` - Mark section complete
- `GET /api/progress/user-progress` - Get all progress

## 🎨 Customization

### Change Primary Color

In components, update the `primaryColor` prop:

```tsx
<SectionGate moduleId={2} sectionId={2} primaryColor="#FF5733">
```

### Adjust Section/Module Counts

Update in `/src/app/api/progress/user-progress/route.ts`:

```tsx
const totalSections = 18; // Change this
```

And in `/src/app/progress/page.tsx`:

```tsx
const COURSE_STRUCTURE = [
  // Update this array
];
```

## 🐛 Troubleshooting

**Quiz not submitting?**
- Check browser console for errors
- Verify `moduleId`, `sectionId`, `pageNumber` are correct
- Ensure user is authenticated

**Section still locked?**
- Check previous section completion in database
- Verify `checkAccess` API is working
- Check browser console

**Page visits not tracking?**
- Ensure `PageTracker` is wrapping content
- Check network tab for API calls
- Verify Supabase auth is working

## 📈 Analytics Queries

Get user progress:
```sql
SELECT * FROM section_completions WHERE user_id = 'xxx';
```

Get quiz performance:
```sql
SELECT 
  module_id,
  section_id,
  AVG(score * 100.0 / total_questions) as avg_score
FROM quiz_attempts
GROUP BY module_id, section_id;
```

See which questions are hardest:
```sql
SELECT 
  question_text,
  COUNT(*) FILTER (WHERE is_correct = false) as wrong_count,
  COUNT(*) as total
FROM quiz_answers
GROUP BY question_text
ORDER BY wrong_count DESC;
```

## ✅ Next Steps

1. Run the Prisma migration
2. Start integrating components page by page
3. Test section gating
4. Test quiz prevention
5. Check the progress dashboard

Need help? Check the component source code for inline documentation!



# 🚀 Diagnostic Quiz - Quick Start

## What Was Implemented

A **mandatory one-time diagnostic quiz** that users must complete before accessing the course modules.

## 📋 Setup Steps

### 1. Create Database Table

Go to your **Supabase SQL Editor** and run:

```sql
CREATE TABLE IF NOT EXISTS diagnostic_quiz (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  score_pct INTEGER NOT NULL,
  student_name TEXT,
  evaluator_notes TEXT,
  answers_data TEXT NOT NULL,
  completed_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_diagnostic_quiz_user_id ON diagnostic_quiz(user_id);
```

### 2. Update Prisma Client

After running the SQL, update your Prisma client:

```bash
npx prisma generate
```

### 3. Test the Flow

1. **Logout** (if logged in)
2. **Login** with a test account
3. **Click** "Ir a Microcredencial Mondragón" on landing page
4. **You should be redirected** to `/diagnostic-quiz`
5. **Complete** the 20 questions
6. **Click** "Guardar y Continuar a Módulos"
7. **Verify** you're redirected to `/modules/menu`
8. **Try again** - you should now go directly to modules (quiz already completed)

## 🎯 How It Works

### User Journey:

```
Landing Page
    ↓ (Click "Ir a Microcredencial")
    ↓
Quiz Completed? → YES → Modules Menu
    ↓ NO
Diagnostic Quiz (20 questions)
    ↓ (Complete & Save)
    ↓
Modules Menu ✓
```

### Protection Logic:

**Landing Page Button:**
- Checks `/api/diagnostic-quiz` (GET)
- Redirects to `/diagnostic-quiz` or `/modules/menu` based on completion

**Modules Menu Page:**
- Checks quiz completion on load
- Redirects to `/diagnostic-quiz` if not completed
- Shows modules if completed

**Diagnostic Quiz Page:**
- Checks if already completed
- Redirects to `/modules/menu` if completed
- Shows quiz if not completed

## 📝 Quiz Details

- **20 Questions Total**
  - 18 Multiple Choice
  - 2 True/False
- **Auto-advance**: Moves to next question after selection
- **Instant feedback**: Shows correct/incorrect immediately
- **Results page**: Score, percentage, review all answers
- **Optional fields**: Student name, instructor notes
- **Print/PDF**: Export results for records

## 🔍 Verify Setup

### Check if Table Exists:

```sql
SELECT * FROM diagnostic_quiz LIMIT 5;
```

### Check User Quiz Status:

```sql
SELECT user_id, score, score_pct, completed_at 
FROM diagnostic_quiz 
WHERE user_id = 'YOUR_USER_ID';
```

### View All Results:

```sql
SELECT 
  student_name,
  score,
  total_questions,
  score_pct,
  completed_at
FROM diagnostic_quiz
ORDER BY completed_at DESC;
```

## 🛠️ Admin/Instructor Features

### View All Quiz Results (Future Enhancement):

You can create an admin page to view all results:

```typescript
// /app/admin/quiz-results/page.tsx
const results = await prisma.diagnosticQuiz.findMany({
  orderBy: { completedAt: 'desc' }
})
```

### Export to CSV (Manual):

```sql
COPY (
  SELECT 
    student_name,
    score,
    total_questions,
    score_pct,
    evaluator_notes,
    completed_at
  FROM diagnostic_quiz
  ORDER BY completed_at DESC
) TO STDOUT WITH CSV HEADER;
```

## ⚠️ Important Notes

### One-Time Only:
- The quiz can only be taken **once per user**
- `user_id` has a UNIQUE constraint
- If you need to allow retakes, you'll need to delete the record first

### Cannot Skip:
- Users **cannot access modules** without completing the quiz
- The modules menu page actively checks and redirects
- Direct URL access to modules is also protected

### Database Persistence:
- Results are stored **permanently** in PostgreSQL
- Answers are saved as JSON for detailed review
- Timestamps track when quiz was completed

## 🐛 Troubleshooting

### "Quiz already completed" but user didn't finish:

```sql
-- Check the record
SELECT * FROM diagnostic_quiz WHERE user_id = 'USER_ID';

-- If needed, delete to allow retake
DELETE FROM diagnostic_quiz WHERE user_id = 'USER_ID';
```

### User stuck in redirect loop:

- Check browser console for errors
- Verify API route is accessible: visit `/api/diagnostic-quiz` directly
- Check if user is properly authenticated

### Quiz results not saving:

- Check server logs
- Verify database connection
- Test API route: `POST /api/diagnostic-quiz` with test data

## 📊 Monitoring

### Track Completion Rate:

```sql
SELECT 
  COUNT(*) as total_completions,
  AVG(score_pct) as average_score,
  MIN(score_pct) as lowest_score,
  MAX(score_pct) as highest_score
FROM diagnostic_quiz;
```

### Recent Completions:

```sql
SELECT 
  student_name,
  score_pct,
  completed_at
FROM diagnostic_quiz
ORDER BY completed_at DESC
LIMIT 10;
```

## ✅ Setup Complete!

Your diagnostic quiz is now fully integrated and ready to use. Users will automatically be prompted to take it on their first visit to the course.



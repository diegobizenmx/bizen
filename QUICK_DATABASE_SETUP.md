# ⚡ Quick Database Setup - Just Copy & Paste

## 🎯 Fastest Way: Use Supabase SQL Editor

Since Prisma can't connect right now, let's create the tables directly in Supabase.

### Step 1: Go to Supabase SQL Editor

1. Open [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **"SQL Editor"** in left sidebar
4. Click **"New Query"**

### Step 2: Copy This SQL

Copy this entire block:

```sql
-- Page visits tracking
CREATE TABLE IF NOT EXISTS page_visits (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  section_id INTEGER NOT NULL,
  page_number INTEGER NOT NULL,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS page_visits_user_module_section_idx 
  ON page_visits(user_id, module_id, section_id);

-- Quiz attempts (prevents retakes)
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  section_id INTEGER NOT NULL,
  page_number INTEGER NOT NULL,
  quiz_type TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT quiz_attempts_unique 
    UNIQUE (user_id, module_id, section_id, page_number)
);

CREATE INDEX IF NOT EXISTS quiz_attempts_user_idx ON quiz_attempts(user_id);

-- Individual quiz answers
CREATE TABLE IF NOT EXISTS quiz_answers (
  id SERIAL PRIMARY KEY,
  quiz_attempt_id INTEGER NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_index INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  user_answer TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS quiz_answers_attempt_idx ON quiz_answers(quiz_attempt_id);

-- Section completion tracking
CREATE TABLE IF NOT EXISTS section_completions (
  user_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  section_id INTEGER NOT NULL,
  total_pages INTEGER NOT NULL,
  pages_visited INTEGER NOT NULL,
  quizzes_total INTEGER NOT NULL,
  quizzes_completed INTEGER NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, module_id, section_id)
);

CREATE INDEX IF NOT EXISTS section_completions_user_idx ON section_completions(user_id);
```

### Step 3: Run It

1. Paste the SQL into the editor
2. Click **"Run"** (or press Cmd+Enter)
3. Should see "Success" message

### Step 4: Verify

In Supabase, click **"Table Editor"** - you should see 4 new tables:
- `page_visits` ✓
- `quiz_attempts` ✓
- `quiz_answers` ✓
- `section_completions` ✓

### Step 5: Enable Row Level Security (RLS) 🔒

Copy and run this SQL to secure your tables:

```sql
-- Enable RLS on all tables
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_completions ENABLE ROW LEVEL SECURITY;

-- Page Visits Policies
-- Users can only read their own page visits
CREATE POLICY "Users can view own page visits"
  ON page_visits FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can insert their own page visits
CREATE POLICY "Users can insert own page visits"
  ON page_visits FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Quiz Attempts Policies
-- Users can only read their own quiz attempts
CREATE POLICY "Users can view own quiz attempts"
  ON quiz_attempts FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can insert their own quiz attempts (no updates - no retakes!)
CREATE POLICY "Users can insert own quiz attempts"
  ON quiz_attempts FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Quiz Answers Policies
-- Users can view quiz answers for their own attempts
CREATE POLICY "Users can view own quiz answers"
  ON quiz_answers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM quiz_attempts
      WHERE quiz_attempts.id = quiz_answers.quiz_attempt_id
      AND quiz_attempts.user_id = auth.uid()::text
    )
  );

-- Users can insert quiz answers for their own attempts
CREATE POLICY "Users can insert own quiz answers"
  ON quiz_answers FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM quiz_attempts
      WHERE quiz_attempts.id = quiz_answers.quiz_attempt_id
      AND quiz_attempts.user_id = auth.uid()::text
    )
  );

-- Section Completion Policies
-- Users can view their own section completions
CREATE POLICY "Users can view own section completions"
  ON section_completions FOR SELECT
  USING (auth.uid()::text = user_id);

-- Users can insert their own section completions
CREATE POLICY "Users can insert own section completions"
  ON section_completions FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Users can update their own section completions
CREATE POLICY "Users can update own section completions"
  ON section_completions FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);
```

After running this, the "unrestricted" warning will disappear! ✅

### Step 6: Done! 🎉

Everything is ready! Now just:

```bash
npm run dev
```

Then go to a quiz and test it!

---

## 🧪 Test Your Setup

1. **Start your app:**
   ```bash
   npm run dev
   ```

2. **Go to a quiz:**
   - Navigate to Module 2 → Section 1 → Page 3

3. **Complete the quiz:**
   - Answer all questions
   - Wait for auto-advance

4. **Refresh the page:**
   - Should show "Quiz Ya Completado"
   - Should display your score

5. **Check Supabase:**
   - Go to Table Editor → `quiz_attempts`
   - Should see your completed quiz!

---

## 🎊 What's Ready

✅ All quiz components integrated  
✅ Progress link in navigation  
✅ Progress dashboard at `/progress`  
✅ No retakes allowed  
✅ All answers tracked  

**Just run that SQL and you're live!** 🚀

---

## 📊 View Your Data

After running the SQL and completing a quiz:

**In Supabase Table Editor:**
- `quiz_attempts` - See all quiz completions
- `quiz_answers` - See every answer
- `section_completions` - See section progress
- `page_visits` - See page tracking (when you add PageTracker)

**Or use Prisma Studio:**
```bash
npx prisma studio
```

---

## Need Help?

If you see errors when testing:
1. Check browser console (F12)
2. Check Network tab for API calls
3. Make sure you're logged in
4. Verify tables were created in Supabase

Otherwise, you're all set! 🎉


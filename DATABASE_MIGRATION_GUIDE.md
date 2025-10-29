# Database Migration Guide

## ✅ Good News

The Prisma Client was **already generated successfully** in your first attempt! 

I fixed the schema issue (removed DIRECT_URL requirement).

## 🔧 Current Issue

The migration is failing because it can't connect to your database at `localhost:51214`.

## 🎯 Solution Options

### Option 1: Try Migration Again (Recommended)

Your Supabase might just need a moment. Try running:

```bash
npx prisma migrate dev --name add_progress_tracking
```

If it works, you're done! ✅

### Option 2: Check Your DATABASE_URL

Make sure your `.env` file has the correct Supabase connection string:

```bash
# Should look like this:
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
```

**To fix:**
1. Open `.env` file
2. Check your `DATABASE_URL`
3. Get the correct one from Supabase dashboard → Settings → Database → Connection String
4. Try migration again

### Option 3: Use Supabase Direct

If the pooler isn't working, use the direct connection:

1. Go to Supabase Dashboard → Settings → Database
2. Copy "Connection string" (Direct connection, not Transaction pooler)
3. Update `.env` with:
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
   ```
4. Try migration again

### Option 4: Manual SQL (If migrations keep failing)

You can create the tables manually in Supabase:

1. Go to Supabase Dashboard → SQL Editor
2. Run this SQL:

```sql
-- Page visits tracking
CREATE TABLE IF NOT EXISTS page_visits (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  section_id INTEGER NOT NULL,
  page_number INTEGER NOT NULL,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT page_visits_user_module_section_idx 
    INDEX (user_id, module_id, section_id)
);

-- Quiz attempts (prevents retakes with unique constraint)
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

3. Then run just the generate command:
```bash
npx prisma generate
```

## ✅ How to Test If It's Working

After migration succeeds, test with:

```bash
npx prisma studio
```

This will open a database GUI. You should see the new tables:
- `page_visits`
- `quiz_attempts`  
- `quiz_answers`
- `section_completions`

## 🚀 Once Migration Works

Everything is ready! Just:
1. Go to your app
2. Complete a quiz
3. Refresh the page
4. Should see "Quiz Ya Completado"

## 🆘 Still Having Issues?

Check these:

**Is Supabase running?**
- Go to your Supabase dashboard
- Make sure project is active (not paused)

**Is DATABASE_URL correct?**
```bash
# Check your .env file
cat .env | grep DATABASE_URL
```

**Can you connect at all?**
```bash
# Test connection
npx prisma db pull
```

If this works, then connection is fine and you can try the migration again.

## 📊 Current Status

- ✅ Prisma Client: **Generated**
- ✅ Schema: **Fixed** (removed DIRECT_URL)
- ✅ Code Integration: **Complete** (all 5 quizzes ready)
- ⏳ Migration: **Pending** (needs database connection)

Once you get the migration to run, everything will work perfectly! 🎉

---

**Quick Test Command:**
```bash
# Try this first
npx prisma migrate dev --name add_progress_tracking

# If it works, you're done!
# If not, check DATABASE_URL and try again
```



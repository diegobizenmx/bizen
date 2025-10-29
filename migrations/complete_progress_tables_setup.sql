-- ===================================================================
-- COMPLETE PROGRESS TRACKING TABLES SETUP
-- ===================================================================
-- This ensures all tables needed for progress tracking exist
-- Run this SQL in your Supabase Dashboard → SQL Editor
-- ===================================================================

-- 1. Page visits tracking
CREATE TABLE IF NOT EXISTS page_visits (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  section_id INTEGER NOT NULL,
  page_number INTEGER NOT NULL,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_page_visits_user_module_section 
  ON page_visits(user_id, module_id, section_id);

-- 2. Quiz attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  section_id INTEGER NOT NULL,
  page_number INTEGER NOT NULL,
  quiz_type TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  UNIQUE(user_id, module_id, section_id, page_number)
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user 
  ON quiz_attempts(user_id);

-- 3. Quiz answers (details of each answer)
CREATE TABLE IF NOT EXISTS quiz_answers (
  id SERIAL PRIMARY KEY,
  quiz_attempt_id INTEGER NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_index INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  user_answer TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_quiz_answers_attempt 
  ON quiz_answers(quiz_attempt_id);

-- 4. Section completions
CREATE TABLE IF NOT EXISTS section_completions (
  user_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  section_id INTEGER NOT NULL,
  total_pages INTEGER NOT NULL,
  pages_visited INTEGER NOT NULL,
  quizzes_total INTEGER NOT NULL,
  quizzes_completed INTEGER NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  PRIMARY KEY (user_id, module_id, section_id)
);

CREATE INDEX IF NOT EXISTS idx_section_completions_user 
  ON section_completions(user_id);

-- 5. User module progress (already exists from previous setup, but ensure it's here)
CREATE TABLE IF NOT EXISTS user_module_progress (
  user_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  unlocked_section INTEGER DEFAULT 1 NOT NULL,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  PRIMARY KEY (user_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_user_module_progress_user 
  ON user_module_progress(user_id);

-- 6. User section completion (already exists, ensure it's here)
CREATE TABLE IF NOT EXISTS user_section_completion (
  user_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  section_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  PRIMARY KEY (user_id, module_id, section_number)
);

CREATE INDEX IF NOT EXISTS idx_user_section_completion_user_module 
  ON user_section_completion(user_id, module_id);

-- 7. Progress (for dashboard)
CREATE TABLE IF NOT EXISTS progress (
  user_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  status TEXT NOT NULL,
  percent INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  PRIMARY KEY (user_id, section_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user 
  ON progress(user_id);

-- ===================================================================
-- ENABLE RLS ON ALL TABLES
-- ===================================================================

ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_section_completion ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- ===================================================================
-- CREATE BYPASS POLICIES FOR SERVER-SIDE ACCESS
-- ===================================================================

-- Drop existing bypass policies if they exist
DROP POLICY IF EXISTS "Service role bypass for page_visits" ON page_visits;
DROP POLICY IF EXISTS "Service role bypass for quiz_attempts" ON quiz_attempts;
DROP POLICY IF EXISTS "Service role bypass for quiz_answers" ON quiz_answers;
DROP POLICY IF EXISTS "Service role bypass for section_completions" ON section_completions;
DROP POLICY IF EXISTS "Service role bypass for user_module_progress" ON user_module_progress;
DROP POLICY IF EXISTS "Service role bypass for user_section_completion" ON user_section_completion;
DROP POLICY IF EXISTS "Service role bypass for progress" ON progress;

-- Create new bypass policies
CREATE POLICY "Service role bypass for page_visits"
  ON page_visits FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role bypass for quiz_attempts"
  ON quiz_attempts FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role bypass for quiz_answers"
  ON quiz_answers FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role bypass for section_completions"
  ON section_completions FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role bypass for user_module_progress"
  ON user_module_progress FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role bypass for user_section_completion"
  ON user_section_completion FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role bypass for progress"
  ON progress FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- ===================================================================
-- VERIFICATION
-- ===================================================================

-- Check if all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'page_visits',
    'quiz_attempts',
    'quiz_answers',
    'section_completions',
    'user_module_progress',
    'user_section_completion',
    'progress'
  )
ORDER BY table_name;

-- Check if RLS is enabled on all tables
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN (
    'page_visits',
    'quiz_attempts',
    'quiz_answers',
    'section_completions',
    'user_module_progress',
    'user_section_completion',
    'progress'
  )
ORDER BY tablename;

-- Check that bypass policies exist
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE policyname LIKE '%Service role bypass%'
ORDER BY tablename, policyname;

-- ===================================================================
-- DONE! 
-- All progress tracking tables are now set up with proper RLS policies
-- ===================================================================


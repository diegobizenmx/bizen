-- ===================================================================
-- SUPABASE DATABASE SETUP FOR PROGRESS TRACKING
-- ===================================================================
-- Run this SQL in your Supabase Dashboard → SQL Editor
-- This creates all the tables needed for the progress tracking system
-- ===================================================================

-- 1. User section completion tracking
-- Tracks which sections each user has completed
CREATE TABLE IF NOT EXISTS user_section_completion (
  user_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  section_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  PRIMARY KEY (user_id, module_id, section_number)
);

-- 2. User module progress tracking
-- Tracks the highest unlocked section for each module per user
CREATE TABLE IF NOT EXISTS user_module_progress (
  user_id TEXT NOT NULL,
  module_id INTEGER NOT NULL,
  unlocked_section INTEGER DEFAULT 1 NOT NULL,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  PRIMARY KEY (user_id, module_id)
);

-- 3. Progress tracking (for dashboard)
-- More detailed progress tracking per section
CREATE TABLE IF NOT EXISTS progress (
  user_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  status TEXT NOT NULL,
  percent INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  PRIMARY KEY (user_id, section_id)
);

-- ===================================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- This ensures users can only see/modify their own data
-- ===================================================================

ALTER TABLE user_section_completion ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- ===================================================================
-- SECURITY POLICIES
-- Users can only access their own progress data
-- ===================================================================

-- Policies for user_section_completion
DROP POLICY IF EXISTS "Users can view their own section completions" ON user_section_completion;
CREATE POLICY "Users can view their own section completions"
  ON user_section_completion FOR SELECT
  USING (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can insert their own section completions" ON user_section_completion;
CREATE POLICY "Users can insert their own section completions"
  ON user_section_completion FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can update their own section completions" ON user_section_completion;
CREATE POLICY "Users can update their own section completions"
  ON user_section_completion FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can delete their own section completions" ON user_section_completion;
CREATE POLICY "Users can delete their own section completions"
  ON user_section_completion FOR DELETE
  USING (auth.uid()::text = user_id);

-- Policies for user_module_progress
DROP POLICY IF EXISTS "Users can view their own module progress" ON user_module_progress;
CREATE POLICY "Users can view their own module progress"
  ON user_module_progress FOR SELECT
  USING (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can manage their own module progress" ON user_module_progress;
CREATE POLICY "Users can manage their own module progress"
  ON user_module_progress FOR ALL
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- Policies for progress
DROP POLICY IF EXISTS "Users can view their own progress" ON progress;
CREATE POLICY "Users can view their own progress"
  ON progress FOR SELECT
  USING (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can manage their own progress" ON progress;
CREATE POLICY "Users can manage their own progress"
  ON progress FOR ALL
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ===================================================================
-- INDEXES FOR PERFORMANCE
-- ===================================================================

CREATE INDEX IF NOT EXISTS idx_user_section_completion_user_module 
  ON user_section_completion(user_id, module_id);

CREATE INDEX IF NOT EXISTS idx_user_module_progress_user 
  ON user_module_progress(user_id);

CREATE INDEX IF NOT EXISTS idx_progress_user 
  ON progress(user_id);

-- ===================================================================
-- VERIFICATION QUERIES
-- Run these to verify everything was created correctly
-- ===================================================================

-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('user_section_completion', 'user_module_progress', 'progress')
ORDER BY table_name;

-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('user_section_completion', 'user_module_progress', 'progress')
ORDER BY tablename;

-- Check policies
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename IN ('user_section_completion', 'user_module_progress', 'progress')
ORDER BY tablename, policyname;

-- ===================================================================
-- DONE! 
-- Your progress tracking system is now ready to use.
-- ===================================================================


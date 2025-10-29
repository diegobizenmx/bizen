-- ===================================================================
-- FIX RLS FOR PRISMA ACCESS
-- ===================================================================
-- This allows Prisma (server-side) to bypass RLS restrictions
-- Run this SQL in your Supabase Dashboard → SQL Editor
-- ===================================================================

-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Service role bypass for user_module_progress" ON user_module_progress;
DROP POLICY IF EXISTS "Service role bypass for user_section_completion" ON user_section_completion;
DROP POLICY IF EXISTS "Service role bypass for progress" ON progress;
DROP POLICY IF EXISTS "Service role bypass for page_visits" ON page_visits;
DROP POLICY IF EXISTS "Service role bypass for quiz_attempts" ON quiz_attempts;
DROP POLICY IF EXISTS "Service role bypass for quiz_answers" ON quiz_answers;
DROP POLICY IF EXISTS "Service role bypass for section_completions" ON section_completions;

-- Create bypass policies for service role (used by Prisma)
-- These allow the server to access all data regardless of user

-- user_module_progress
CREATE POLICY "Service role bypass for user_module_progress"
  ON user_module_progress
  FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- user_section_completion
CREATE POLICY "Service role bypass for user_section_completion"
  ON user_section_completion
  FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- progress
CREATE POLICY "Service role bypass for progress"
  ON progress
  FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- page_visits
CREATE POLICY "Service role bypass for page_visits"
  ON page_visits
  FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- quiz_attempts
CREATE POLICY "Service role bypass for quiz_attempts"
  ON quiz_attempts
  FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- quiz_answers
CREATE POLICY "Service role bypass for quiz_answers"
  ON quiz_answers
  FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- section_completions
CREATE POLICY "Service role bypass for section_completions"
  ON section_completions
  FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- ===================================================================
-- VERIFICATION
-- ===================================================================

-- Check that policies were created
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE policyname LIKE '%Service role bypass%'
ORDER BY tablename, policyname;

-- ===================================================================
-- DONE! 
-- Prisma should now be able to access the tables
-- ===================================================================



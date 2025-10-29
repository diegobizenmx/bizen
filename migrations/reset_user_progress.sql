-- ===================================================================
-- RESET USER PROGRESS FOR TESTING
-- ===================================================================
-- Use this to reset your progress and test like a fresh user
-- ===================================================================

-- First, find your user ID
-- Run this to see all users:
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC;

-- Copy your user ID from above, then replace 'YOUR_USER_ID' below
-- Example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

-- ===================================================================
-- DELETE ALL PROGRESS FOR ONE USER
-- ===================================================================

-- Replace YOUR_USER_ID in ALL queries below!

-- 1. Delete page visits
DELETE FROM page_visits WHERE user_id = 'YOUR_USER_ID';

-- 2. Delete quiz answers (must delete before quiz_attempts due to foreign key)
DELETE FROM quiz_answers 
WHERE quiz_attempt_id IN (
  SELECT id FROM quiz_attempts WHERE user_id = 'YOUR_USER_ID'
);

-- 3. Delete quiz attempts
DELETE FROM quiz_attempts WHERE user_id = 'YOUR_USER_ID';

-- 4. Delete section completions
DELETE FROM section_completions WHERE user_id = 'YOUR_USER_ID';

-- 5. Delete module progress (this controls what sections are unlocked)
DELETE FROM user_module_progress WHERE user_id = 'YOUR_USER_ID';

-- 6. Delete old section completion table (if it exists)
DELETE FROM user_section_completion WHERE user_id = 'YOUR_USER_ID';

-- 7. Delete from progress table (if it exists)
DELETE FROM progress WHERE user_id = 'YOUR_USER_ID';

-- ===================================================================
-- VERIFY CLEAN STATE
-- ===================================================================

-- These should all return 0 rows:
SELECT COUNT(*) as page_visits_count FROM page_visits WHERE user_id = 'YOUR_USER_ID';
SELECT COUNT(*) as quiz_attempts_count FROM quiz_attempts WHERE user_id = 'YOUR_USER_ID';
SELECT COUNT(*) as section_completions_count FROM section_completions WHERE user_id = 'YOUR_USER_ID';
SELECT COUNT(*) as module_progress_count FROM user_module_progress WHERE user_id = 'YOUR_USER_ID';

-- ===================================================================
-- OPTIONAL: RESET ALL USERS (USE WITH CAUTION!)
-- ===================================================================

-- Uncomment these ONLY if you want to reset EVERYONE's progress
-- This is useful for development but NEVER run in production!

/*
TRUNCATE page_visits CASCADE;
TRUNCATE quiz_attempts CASCADE;
TRUNCATE quiz_answers CASCADE;
TRUNCATE section_completions CASCADE;
TRUNCATE user_module_progress CASCADE;
TRUNCATE user_section_completion CASCADE;
TRUNCATE progress CASCADE;
*/

-- ===================================================================
-- DONE!
-- After running this:
-- 1. Clear your browser localStorage (F12 → Console → localStorage.clear())
-- 2. Refresh your browser (Ctrl+R or Cmd+R)
-- 3. You'll start fresh with only M1S1 unlocked
-- ===================================================================



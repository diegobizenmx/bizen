-- Migration: Add diagnostic_quiz table
-- Run this in your Supabase SQL Editor

-- Create diagnostic_quiz table
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

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_diagnostic_quiz_user_id ON diagnostic_quiz(user_id);

-- Add comment
COMMENT ON TABLE diagnostic_quiz IS 'One-time diagnostic assessment before accessing course modules';
COMMENT ON COLUMN diagnostic_quiz.user_id IS 'Supabase auth user ID';
COMMENT ON COLUMN diagnostic_quiz.score IS 'Number of correct answers';
COMMENT ON COLUMN diagnostic_quiz.total_questions IS 'Total number of questions (20)';
COMMENT ON COLUMN diagnostic_quiz.score_pct IS 'Percentage score';
COMMENT ON COLUMN diagnostic_quiz.student_name IS 'Optional student name for instructor records';
COMMENT ON COLUMN diagnostic_quiz.evaluator_notes IS 'Optional instructor notes/observations';
COMMENT ON COLUMN diagnostic_quiz.answers_data IS 'JSON string containing all answers';
COMMENT ON COLUMN diagnostic_quiz.completed_at IS 'Timestamp when quiz was completed';



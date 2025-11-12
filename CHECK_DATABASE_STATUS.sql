-- =====================================================
-- DATABASE STATUS CHECK
-- Run this to see what tables exist and what data you have
-- =====================================================

-- Check Cash Flow tables exist
SELECT 
  'professions' as table_name,
  COUNT(*) as row_count,
  'Cash Flow' as feature
FROM professions
UNION ALL
SELECT 
  'game_sessions',
  COUNT(*),
  'Cash Flow'
FROM game_sessions
UNION ALL
SELECT 
  'opportunity_cards',
  COUNT(*),
  'Cash Flow'
FROM opportunity_cards
UNION ALL
SELECT 
  'doodads',
  COUNT(*),
  'Cash Flow'
FROM doodads
UNION ALL
-- Check Business Lab tables
SELECT 
  'lab_tracks',
  COUNT(*),
  'Business Lab'
FROM lab_tracks
UNION ALL
SELECT 
  'lab_steps',
  COUNT(*),
  'Business Lab'
FROM lab_steps
UNION ALL
SELECT 
  'lab_templates',
  COUNT(*),
  'Business Lab'
FROM lab_templates;

-- Expected Results:
-- professions: 6-9 rows
-- opportunity_cards: 30+ rows
-- doodads: 50+ rows
-- lab_tracks: 6 rows
-- lab_steps: 30 rows
-- lab_templates: 8 rows


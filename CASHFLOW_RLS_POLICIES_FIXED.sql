-- =====================================================
-- CASHFLOW GAME - RLS POLICIES (FIXED)
-- Enable Row Level Security for Cash Flow tables
-- =====================================================
-- Fixed: Removed unnecessary ::text casting that caused
-- "operator does not exist: uuid = text" error
-- =====================================================

-- Enable RLS on Cash Flow tables
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_liabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_doodads ENABLE ROW LEVEL SECURITY;

-- Professions, OpportunityCards, MarketCards, Doodads are public read
ALTER TABLE professions ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunity_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE doodads ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES FOR GAME SESSIONS
-- =====================================================

-- Drop existing policies if they exist (in case of re-run)
DROP POLICY IF EXISTS "Users can view own game sessions" ON game_sessions;
DROP POLICY IF EXISTS "Users can create own game sessions" ON game_sessions;
DROP POLICY IF EXISTS "Users can update own game sessions" ON game_sessions;
DROP POLICY IF EXISTS "Users can delete own game sessions" ON game_sessions;

CREATE POLICY "Users can view own game sessions"
  ON game_sessions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own game sessions"
  ON game_sessions FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own game sessions"
  ON game_sessions FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own game sessions"
  ON game_sessions FOR DELETE
  USING (user_id = auth.uid());

-- =====================================================
-- POLICIES FOR PLAYERS
-- =====================================================

DROP POLICY IF EXISTS "Users can view own players" ON players;
DROP POLICY IF EXISTS "Users can create own players" ON players;
DROP POLICY IF EXISTS "Users can update own players" ON players;
DROP POLICY IF EXISTS "Users can delete own players" ON players;

CREATE POLICY "Users can view own players"
  ON players FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own players"
  ON players FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own players"
  ON players FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own players"
  ON players FOR DELETE
  USING (user_id = auth.uid());

-- =====================================================
-- POLICIES FOR GAME EVENTS
-- =====================================================

DROP POLICY IF EXISTS "Users can view events from own games" ON game_events;
DROP POLICY IF EXISTS "Users can create events for own games" ON game_events;

CREATE POLICY "Users can view events from own games"
  ON game_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM game_sessions
      WHERE game_sessions.id = game_events.game_session_id
      AND game_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create events for own games"
  ON game_events FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM game_sessions
      WHERE game_sessions.id = game_session_id
      AND game_sessions.user_id = auth.uid()
    )
  );

-- =====================================================
-- POLICIES FOR PLAYER INVESTMENTS
-- =====================================================

DROP POLICY IF EXISTS "Users can view own player investments" ON player_investments;
DROP POLICY IF EXISTS "Users can create own player investments" ON player_investments;
DROP POLICY IF EXISTS "Users can update own player investments" ON player_investments;

CREATE POLICY "Users can view own player investments"
  ON player_investments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM players
      WHERE players.id = player_investments.player_id
      AND players.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own player investments"
  ON player_investments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM players
      WHERE players.id = player_id
      AND players.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own player investments"
  ON player_investments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM players
      WHERE players.id = player_investments.player_id
      AND players.user_id = auth.uid()
    )
  );

-- =====================================================
-- POLICIES FOR PLAYER LIABILITIES
-- =====================================================

DROP POLICY IF EXISTS "Users can view own player liabilities" ON player_liabilities;
DROP POLICY IF EXISTS "Users can create own player liabilities" ON player_liabilities;
DROP POLICY IF EXISTS "Users can update own player liabilities" ON player_liabilities;

CREATE POLICY "Users can view own player liabilities"
  ON player_liabilities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM players
      WHERE players.id = player_liabilities.player_id
      AND players.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own player liabilities"
  ON player_liabilities FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM players
      WHERE players.id = player_id
      AND players.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own player liabilities"
  ON player_liabilities FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM players
      WHERE players.id = player_liabilities.player_id
      AND players.user_id = auth.uid()
    )
  );

-- =====================================================
-- POLICIES FOR PLAYER DOODADS
-- =====================================================

DROP POLICY IF EXISTS "Users can view own player doodads" ON player_doodads;
DROP POLICY IF EXISTS "Users can create own player doodads" ON player_doodads;

CREATE POLICY "Users can view own player doodads"
  ON player_doodads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM players
      WHERE players.id = player_doodads.player_id
      AND players.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own player doodads"
  ON player_doodads FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM players
      WHERE players.id = player_id
      AND players.user_id = auth.uid()
    )
  );

-- =====================================================
-- PUBLIC READ POLICIES (Reference Data)
-- =====================================================

DROP POLICY IF EXISTS "Anyone can view professions" ON professions;
DROP POLICY IF EXISTS "Anyone can view opportunity cards" ON opportunity_cards;
DROP POLICY IF EXISTS "Anyone can view market cards" ON market_cards;
DROP POLICY IF EXISTS "Anyone can view doodads" ON doodads;

CREATE POLICY "Anyone can view professions"
  ON professions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view opportunity cards"
  ON opportunity_cards FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view market cards"
  ON market_cards FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view doodads"
  ON doodads FOR SELECT
  USING (true);

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Cash Flow RLS policies created successfully!';
  RAISE NOTICE '✅ Users can now create and manage their own games.';
  RAISE NOTICE '✅ UUID comparison fixed (removed ::text casting)';
END $$;


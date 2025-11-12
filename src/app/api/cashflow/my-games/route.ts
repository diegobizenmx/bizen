import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createSupabaseServer()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get all game sessions for this user with joins
    const { data: games, error } = await supabase
      .from('game_sessions')
      .select(`
        *,
        players (
          *,
          professions (name),
          player_investments!inner (
            id
          )
        )
      `)
      .eq('user_id', user.id)
      .order('last_activity_at', { ascending: false })

    if (error) {
      console.error("Supabase query error:", error)
      throw error
    }

    // Transform data for frontend
    const gamesData = games?.map((game: any) => {
      const player = game.players?.[0]
      const activeInvestments = player?.player_investments?.filter((inv: any) => !inv.is_sold) || []
      
      return {
        id: game.id,
        status: game.status,
        currentPhase: game.current_phase,
        startedAt: game.started_at,
        completedAt: game.completed_at,
        lastActivityAt: game.last_activity_at,
        totalTurns: game.total_turns,
        player: player ? {
          id: player.id,
          profession: player.professions?.name || 'Unknown',
          currentTurn: player.current_turn,
          cashOnHand: player.cash_on_hand,
          passiveIncome: player.passive_income,
          hasEscapedRatRace: player.has_escaped_rat_race,
          numInvestments: activeInvestments.length
        } : null
      }
    }) || []

    return NextResponse.json(gamesData)

  } catch (error) {
    console.error("Error fetching games:", error)
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    )
  }
}


import { NextRequest, NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const supabase = await createSupabaseServer()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const gameId = parseInt(params.gameId)

    // Get game session
    const { data: gameSession, error: gameError } = await supabase
      .from('game_sessions')
      .select('*')
      .eq('id', gameId)
      .eq('user_id', user.id)
      .single()

    if (gameError || !gameSession) {
      return NextResponse.json(
        { error: "Game not found" },
        { status: 404 }
      )
    }

    // Get player with profession
    const { data: players, error: playerError } = await supabase
      .from('players')
      .select('*, professions(*)')
      .eq('game_session_id', gameId)
      .eq('user_id', user.id)

    if (playerError || !players || players.length === 0) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 }
      )
    }

    const player = players[0]

    // Get active investments
    const { data: investments } = await supabase
      .from('player_investments')
      .select('*, opportunity_cards(*)')
      .eq('player_id', player.id)
      .eq('is_sold', false)

    // Get unpaid liabilities
    const { data: liabilities } = await supabase
      .from('player_liabilities')
      .select('*')
      .eq('player_id', player.id)
      .eq('is_paid_off', false)

    // Get doodads
    const { data: doodads } = await supabase
      .from('player_doodads')
      .select('*')
      .eq('player_id', player.id)

    // Transform to camelCase for frontend
    const profession = player.professions
    
    return NextResponse.json({
      id: gameSession.id,
      status: gameSession.status,
      currentPhase: gameSession.current_phase,
      totalTurns: gameSession.total_turns,
      player: {
        id: player.id,
        cashOnHand: player.cash_on_hand,
        savings: player.savings,
        numChildren: player.num_children,
        currentTurn: player.current_turn,
        passiveIncome: player.passive_income,
        totalIncome: player.total_income,
        totalExpenses: player.total_expenses,
        cashFlow: player.cash_flow,
        hasEscapedRatRace: player.has_escaped_rat_race,
        isOnFastTrack: player.is_on_fast_track,
        profession: {
          id: profession.id,
          name: profession.name,
          description: profession.description,
          salary: profession.salary,
          taxes: profession.taxes,
          homeMortgagePayment: profession.home_mortgage_payment,
          schoolLoanPayment: profession.school_loan_payment,
          carLoanPayment: profession.car_loan_payment,
          creditCardPayment: profession.credit_card_payment,
          retailPayment: profession.retail_payment,
          otherExpenses: profession.other_expenses,
          childExpense: profession.child_expense,
          homeMortgage: profession.home_mortgage,
          schoolLoans: profession.school_loans,
          carLoans: profession.car_loans,
          creditCards: profession.credit_cards,
          retailDebt: profession.retail_debt,
          startingCash: profession.starting_cash,
          startingSavings: profession.starting_savings
        },
        investments: investments || [],
        liabilities: liabilities || [],
        doodads: doodads || []
      }
    })

  } catch (error) {
    console.error("Error fetching game state:", error)
    return NextResponse.json(
      { error: "Failed to fetch game state" },
      { status: 500 }
    )
  }
}


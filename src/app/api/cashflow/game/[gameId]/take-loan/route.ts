import { NextRequest, NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"

export async function POST(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const supabase = await createSupabaseServer()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount, type, description, interestRate } = await request.json()
    const gameId = parseInt(params.gameId)

    // Get player
    const { data: player } = await supabase
      .from('players')
      .select('*')
      .eq('game_session_id', gameId)
      .eq('user_id', user.id)
      .single()

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    // Calculate monthly payment (simplified: 10% of principal per month for 10 months)
    const monthlyPayment = Math.ceil(amount * 0.1)

    // Create liability
    const { data: liability } = await supabase
      .from('player_liabilities')
      .insert({
        player_id: player.id,
        type: type || 'personal_loan',
        description: description || 'Personal loan',
        principal_amount: amount,
        remaining_balance: amount,
        interest_rate: interestRate || 10,
        monthly_payment: monthlyPayment
      })
      .select()
      .single()

    // Update player cash
    await supabase
      .from('players')
      .update({ cash_on_hand: player.cash_on_hand + amount })
      .eq('id', player.id)

    // Log loan event
    await supabase.from('game_events').insert({
      game_session_id: gameId,
      player_id: player.id,
      event_type: "loan_taken",
      event_data: {
        amount,
        type,
        monthlyPayment
      },
      cash_change: amount,
      turn_number: player.current_turn
    })

    return NextResponse.json({
      message: "Loan taken successfully",
      liability,
      newCash: player.cash_on_hand + amount
    })

  } catch (error) {
    console.error("Error taking loan:", error)
    return NextResponse.json({ error: "Failed to take loan" }, { status: 500 })
  }
}

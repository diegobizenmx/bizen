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
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const gameId = parseInt(params.gameId)

    // Verify game belongs to user and get player
    const { data: gameSession } = await supabase
      .from('game_sessions')
      .select('*')
      .eq('id', gameId)
      .eq('user_id', user.id)
      .single()

    if (!gameSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { data: players } = await supabase
      .from('players')
      .select('*, professions(*)')
      .eq('game_session_id', gameId)
      .eq('user_id', user.id)

    const player = players?.[0]
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    // Random card type: 15% doodad, 20% market event, 65% opportunity
    const rand = Math.random()
    const isDoodad = rand < 0.15
    const isMarketEvent = rand >= 0.15 && rand < 0.35

    if (isDoodad) {
      // Get random doodad
      const { data: doodads, count } = await supabase
        .from('doodads')
        .select('*', { count: 'exact' })
        .eq('is_active', true)

      if (doodads && doodads.length > 0) {
        const randomDoodad = doodads[Math.floor(Math.random() * doodads.length)]

        // Log doodad drawn
        await supabase.from('game_events').insert({
          game_session_id: gameId,
          player_id: player.id,
          event_type: "opportunity_drawn",
          event_data: {
            doodadId: randomDoodad.id,
            doodadName: randomDoodad.name,
            type: "doodad"
          },
          turn_number: player.current_turn
        })

        return NextResponse.json({
          isDoodad: true,
          doodad: randomDoodad
        })
      }
    }

    if (isMarketEvent) {
      // Get random market event
      const { data: marketCards } = await supabase
        .from('market_cards')
        .select('*')
        .eq('is_active', true)

      if (marketCards && marketCards.length > 0) {
        const marketEvent = marketCards[Math.floor(Math.random() * marketCards.length)]
        let cashChange = 0
        let message = ""
        const profession = player.professions

        // Apply market event effects
        switch (marketEvent.type) {
          case "baby":
            await supabase
              .from('players')
              .update({ num_children: player.num_children + 1 })
              .eq('id', player.id)
            message = `¡Nació un bebé! Ahora tienes ${player.num_children + 1} hijo(s). Tus gastos mensuales aumentan $${profession.child_expense}.`
            break

          case "downsized":
            cashChange = -(profession.salary * 2)
            await supabase
              .from('players')
              .update({ cash_on_hand: player.cash_on_hand + cashChange })
              .eq('id', player.id)
            message = `¡Te despidieron! Pierdes 2 turnos de salario (-$${Math.abs(cashChange).toLocaleString()}).`
            break

          case "charity":
            const donation = Math.floor(profession.salary * 0.1)
            cashChange = -donation
            await supabase
              .from('players')
              .update({ cash_on_hand: player.cash_on_hand + cashChange })
              .eq('id', player.id)
            message = `Donas a caridad. Contribuyes $${Math.abs(cashChange).toLocaleString()} y recibes beneficios fiscales.`
            break

          case "paycheck":
            cashChange = profession.salary
            await supabase
              .from('players')
              .update({ cash_on_hand: player.cash_on_hand + cashChange })
              .eq('id', player.id)
            message = `¡Día de pago extra! Recibes tu salario mensual de $${cashChange.toLocaleString()}.`
            break

          default:
            message = marketEvent.description
        }

        // Get updated player
        const { data: updatedPlayers } = await supabase
          .from('players')
          .select('num_children')
          .eq('id', player.id)
          .single()

        // Log market event
        await supabase.from('game_events').insert({
          game_session_id: gameId,
          player_id: player.id,
          event_type: "market_event",
          event_data: {
            eventId: marketEvent.id,
            eventName: marketEvent.name,
            eventType: marketEvent.type
          },
          cash_change: cashChange,
          turn_number: player.current_turn
        })

        return NextResponse.json({
          isMarketEvent: true,
          marketEvent: {
            ...marketEvent,
            message
          },
          cashChange,
          newChildren: updatedPlayers?.num_children
        })
      }
    }

    // Get random opportunity card (filter by phase)
    const isOnFastTrack = player.is_on_fast_track
    
    const { data: cards } = await supabase
      .from('opportunity_cards')
      .select('*')
      .eq('is_active', true)
      .eq('is_fast_track', isOnFastTrack)

    if (!cards || cards.length === 0) {
      return NextResponse.json({ error: "No cards available" }, { status: 404 })
    }

    const card = cards[Math.floor(Math.random() * cards.length)]

    // Log the draw event
    await supabase.from('game_events').insert({
      game_session_id: gameId,
      player_id: player.id,
      event_type: "opportunity_drawn",
      event_data: {
        cardId: card.id,
        cardName: card.name,
        cardType: card.type
      },
      turn_number: player.current_turn
    })

    return NextResponse.json({ isMarketEvent: false, card })

  } catch (error) {
    console.error("Error drawing card:", error)
    return NextResponse.json(
      { error: "Failed to draw card" },
      { status: 500 }
    )
  }
}

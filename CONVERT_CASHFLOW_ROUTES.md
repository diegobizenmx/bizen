# Converting Cash Flow API Routes: Prisma → Supabase

## Status of Conversions:

### ✅ Completed:
1. `/api/cashflow/professions` ✅
2. `/api/cashflow/my-games` ✅
3. `/api/cashflow/start-game` ✅
4. `/api/cashflow/game/[gameId]` (GET) ✅
5. `/api/cashflow/game/[gameId]/draw-card` ✅

### 🔄 In Progress:
6. `/api/cashflow/game/[gameId]/purchase` - Converting now
7. `/api/cashflow/game/[gameId]/sell`
8. `/api/cashflow/game/[gameId]/end-turn`
9. `/api/cashflow/game/[gameId]/delete`
10. `/api/cashflow/game/[gameId]/take-loan`
11. `/api/cashflow/game/[gameId]/pay-loan`
12. `/api/cashflow/game/[gameId]/buy-doodad`
13. `/api/cashflow/game/[gameId]/market-event`

## Key Patterns for Conversion:

### Prisma → Supabase Mapping:

```typescript
// FIND UNIQUE
prisma.model.findUnique({ where: { id } })
→ supabase.from('table').select('*').eq('id', id).single()

// FIND MANY  
prisma.model.findMany({ where: {...}, include: {...} })
→ supabase.from('table').select('*, related(*)').eq('field', value)

// CREATE
prisma.model.create({ data: {...} })
→ supabase.from('table').insert({...}).select().single()

// UPDATE
prisma.model.update({ where: { id }, data: {...} })
→ supabase.from('table').update({...}).eq('id', id).select().single()

// DELETE
prisma.model.delete({ where: { id } })
→ supabase.from('table').delete().eq('id', id)

// COUNT
prisma.model.count()
→ supabase.from('table').select('*', { count: 'exact', head: true })
```

### Field Name Conversions:
- `userId` → `user_id`
- `gameSessionId` → `game_session_id`
- `playerId` → `player_id`
- `cashOnHand` → `cash_on_hand`
- `passiveIncome` → `passive_income`
- `numChildren` → `num_children`
- `currentTurn` → `current_turn`
- etc.

Working on it...


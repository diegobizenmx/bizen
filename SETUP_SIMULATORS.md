# BIZEN Financial Simulators - Setup Instructions

Follow these steps to set up the Financial Simulators module in your BIZEN application.

## Prerequisites

- Supabase project set up
- Node.js and npm installed
- Access to Supabase SQL Editor or CLI

## Step-by-Step Setup

### 1. Install Required Dependencies

```bash
npm install react-hook-form @hookform/resolvers zod recharts @supabase/supabase-js
```

If not already installed:
```bash
npm install @supabase/ssr @supabase/auth-helpers-nextjs
```

### 2. Run Database Schema

#### Option A: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `FINANCIAL_SIMULATORS_SCHEMA.sql`
4. Paste and run the SQL

#### Option B: Using Supabase CLI

```bash
supabase db push
# Or if you have the SQL file:
supabase db execute -f FINANCIAL_SIMULATORS_SCHEMA.sql
```

### 3. Seed the Simulators Catalog

```bash
npx tsx scripts/seed-simulators.ts
```

You should see output like:
```
🌱 Starting seed process...
✅ Inserted "Presupuesto Mensual 50/30/20"
✅ Inserted "Meta de Ahorro e Interés Compuesto"
...
✨ Seed process completed successfully!
```

### 4. Update TypeScript Types (IMPORTANT)

After running the database schema, regenerate your TypeScript types:

#### If using Supabase CLI:

```bash
supabase gen types typescript --local > src/types/supabase.ts
```

Or for remote database:

```bash
supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts
```

#### Manual TypeScript Fix (Temporary)

If you can't regenerate types yet, you can temporarily add type assertions to avoid TypeScript errors:

In files like `src/app/api/simulators/route.ts`, use:

```typescript
const { data, error } = await (supabase as any)
  .from('simulators')
  .select('*')
  .eq('is_active', true)
  .order('sort_order', { ascending: true });
```

**Note:** This is a temporary workaround. Always regenerate proper types in production.

### 5. Verify Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit: http://localhost:3004/simulators

3. You should see the simulator catalog with 6 cards

4. Click any simulator to test it

5. Try the "Load Test Values" button to explore functionality

### 6. Test User Authentication

The simulators work without authentication for calculations, but you need to be logged in to:
- Save simulator runs
- View history at `/simulators/history`
- Delete saved runs

Make sure your authentication flow is working properly.

## Troubleshooting

### "Table 'simulators' doesn't exist"

**Problem:** Database schema hasn't been run.

**Solution:** Run the SQL schema (Step 2 above).

---

### "No overload matches this call" TypeScript errors

**Problem:** TypeScript types don't include the new tables.

**Solution:** Regenerate types (Step 4 above) or use type assertions temporarily.

---

### "Missing environment variables" in seed script

**Problem:** Environment variables not set.

**Solution:** Ensure `.env.local` has:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

### "No autenticado" when saving runs

**Problem:** User not authenticated.

**Solution:** 
1. Check that user is logged in
2. Verify `createSupabaseServer()` is correctly getting the user session
3. Check browser cookies for Supabase auth tokens

---

### Charts not rendering

**Problem:** `recharts` not installed or SSR issues.

**Solution:**
1. Install recharts: `npm install recharts`
2. Ensure simulator components have `'use client'` directive at the top
3. Clear `.next` cache: `rm -rf .next && npm run dev`

---

### RLS Policy Errors

**Problem:** Row Level Security blocking queries.

**Solution:** 
1. Check policies in `FINANCIAL_SIMULATORS_SCHEMA.sql`
2. Verify user has valid session
3. For testing, temporarily disable RLS (NOT for production):
   ```sql
   ALTER TABLE sim_runs DISABLE ROW LEVEL SECURITY;
   ```

---

## Verification Checklist

- [ ] Database tables created (simulators, sim_runs)
- [ ] RLS policies enabled and working
- [ ] Seed script ran successfully (6 simulators in DB)
- [ ] TypeScript types regenerated
- [ ] All dependencies installed
- [ ] Development server running without errors
- [ ] Can view simulator catalog at `/simulators`
- [ ] Can open and use individual simulators
- [ ] Can save runs (when logged in)
- [ ] Can view saved runs at `/simulators/history`
- [ ] Can delete saved runs
- [ ] Charts rendering properly
- [ ] Number formatting shows MXN currency
- [ ] Test values button works

## Testing

### Run Unit Tests

```bash
npm test -- src/lib/simulators/__tests__
```

Expected: All tests pass.

### Manual Testing Checklist

1. **Monthly Budget**
   - Load test values
   - Add/remove expenses
   - Toggle between 50/30/20 and custom modes
   - Verify recommendations appear

2. **Savings Goal**
   - Test Forecast mode
   - Test Time-to-Goal mode
   - Verify chart shows growth
   - Check calculations match expectations

3. **Credit Card Payoff**
   - Compare minimum vs. fixed payments
   - Verify savings calculation
   - Check chart shows both strategies

4. **Simple Loan**
   - Verify monthly payment calculation
   - Check CAT calculation
   - Review amortization table

5. **Investment Comparison**
   - Test all three options
   - Use preset buttons (Conservative, Balanced, Optimistic)
   - Verify winner is highlighted

6. **Inflation Calculator**
   - Calculate future price
   - Add optional income
   - Verify purchasing power calculation

## Next Steps

Once everything is working:

1. **Customize**: Adjust colors, text, and presets in component files
2. **Extend**: Add more simulators following the same pattern
3. **Integrate**: Link simulators from your main navigation
4. **Analytics**: Track which simulators are most popular
5. **Content**: Add educational content around each simulator

## Support

For issues or questions, refer to:
- `SIMULATORS_README.md` - Full documentation
- `FINANCIAL_SIMULATORS_SCHEMA.sql` - Database schema
- Inline code comments

## Production Deployment

Before deploying to production:

1. ✅ Regenerate proper TypeScript types (no `any` casts)
2. ✅ Run all unit tests
3. ✅ Test on multiple devices (mobile, tablet, desktop)
4. ✅ Verify RLS policies are strict
5. ✅ Enable production error tracking
6. ✅ Add rate limiting to API routes
7. ✅ Test with real user accounts
8. ✅ Review educational disclaimers are prominent

---

**Built with ❤️ for BIZEN**


# Financial Simulators - Troubleshooting Guide

## Common Issues & Solutions

---

## ❌ Error: "relation public.user_roles does not exist"

### Problem
When running `SIMULATORS_QUICKSTART.sql`, you get:
```
ERROR: 42P01: relation "public.user_roles" does not exist
```

### Solution
This error has been **FIXED** in the updated `SIMULATORS_QUICKSTART.sql` file.

**What happened:** The original SQL script referenced a `user_roles` table that doesn't exist in your database for admin-only policies.

**What was fixed:** The script now uses simpler policies that allow any authenticated user to manage simulators. This is fine for development and initial deployment.

### If You Want Admin-Only Access
If you want to restrict simulator management to admins only:
1. Run `SIMULATORS_ADMIN_POLICIES.sql` after the main setup
2. This creates a `user_roles` table
3. Manually add your first admin user (instructions in the file)

---

## ❌ Recharts Not Found

### Problem
```
Module not found: Can't resolve 'recharts'
```

### Solution
```bash
npm install recharts
```

Or reinstall all dependencies:
```bash
npm install
```

---

## ❌ Simulators Not Showing on Catalog Page

### Problem
The `/simulators` page loads but shows no simulator cards.

### Possible Causes & Solutions

**1. Database not seeded**
```sql
-- Check if simulators exist
SELECT * FROM simulators;

-- If empty, the INSERT statements didn't run
-- Re-run SIMULATORS_QUICKSTART.sql
```

**2. All simulators are inactive**
```sql
-- Check active status
SELECT slug, name, is_active FROM simulators;

-- If all are false, update them:
UPDATE simulators SET is_active = true;
```

**3. RLS blocking reads**
```sql
-- Check if RLS is preventing reads
-- Verify the select policy exists:
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'simulators' AND cmd = 'SELECT';

-- Should show: simulators_select_public
```

---

## ❌ Can't Save Simulations

### Problem
Click "Guardar Simulación" but nothing happens or get error.

### Possible Causes & Solutions

**1. User not authenticated**
- Verify user is logged in
- Check browser console for auth errors
- Test: `supabase.auth.getUser()`

**2. RLS policies blocking insert**
```sql
-- Check policies on sim_runs
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'sim_runs';

-- Should include: sim_runs_insert_own
```

**3. Missing user_id**
Check the API request includes user_id matching auth.uid()

**4. Foreign key constraint**
```sql
-- Verify the simulator exists
SELECT slug FROM simulators WHERE slug = 'monthly-budget';

-- Verify your user exists
SELECT id FROM auth.users WHERE id = 'YOUR-USER-ID';
```

---

## ❌ API Routes Return 500 Error

### Problem
API calls to `/api/simulators/*` fail with 500 Internal Server Error.

### Solutions

**1. Check server logs**
```bash
# In your terminal where dev server is running
# Look for error stack traces
```

**2. Verify Supabase connection**
```typescript
// Test in API route
const supabase = await createSupabaseServer();
const { data, error } = await supabase.from('simulators').select('*');
console.log({ data, error });
```

**3. Check environment variables**
```bash
# Verify these are set:
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=... (if using service role)
```

---

## ❌ Charts Not Rendering

### Problem
Simulators work but charts don't display.

### Solutions

**1. Recharts not installed**
```bash
npm install recharts
```

**2. Data format issue**
Check console for errors. Recharts expects specific data format:
```typescript
// Correct format
const data = [
  { month: 1, balance: 1000 },
  { month: 2, balance: 1500 },
];

// Wrong format
const data = { month: [1, 2], balance: [1000, 1500] };
```

**3. Chart component errors**
- Verify `Chart.tsx` component exists
- Check imports are correct
- Look for TypeScript errors

---

## ❌ Numbers Not Formatting Correctly

### Problem
Currency shows as plain numbers (12345.67 instead of $12,345.67 MXN)

### Solution
Verify formatters are imported correctly:
```typescript
import { currencyMXN } from '@/lib/simulators';

// Usage
const formatted = currencyMXN(12345.67);
// Output: $12,345.67 MXN
```

---

## ❌ Database Connection Errors

### Problem
```
Failed to fetch data from Supabase
```

### Solutions

**1. Verify Supabase URL**
```bash
# In .env.local
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
```

**2. Check network access**
- Supabase project is active
- No firewall blocking requests
- API keys are valid

**3. Verify RLS isn't blocking**
```sql
-- Temporarily disable RLS to test (DON'T DO IN PRODUCTION)
ALTER TABLE simulators DISABLE ROW LEVEL SECURITY;
-- Test your query
-- Then re-enable
ALTER TABLE simulators ENABLE ROW LEVEL SECURITY;
```

---

## ❌ TypeScript Errors

### Problem
```
Type 'X' is not assignable to type 'Y'
```

### Solution
Regenerate types from Supabase:
```bash
npx supabase gen types typescript --project-id YOUR-PROJECT-ID > src/types/supabase.ts
```

Or check your Zod schemas match the actual inputs/outputs.

---

## ❌ Build Errors

### Problem
```
npm run build
```
fails with errors.

### Solutions

**1. Fix TypeScript errors first**
```bash
npx tsc --noEmit
```

**2. Check for import issues**
- All components properly exported
- No circular dependencies
- All paths correct

**3. Verify all dependencies**
```bash
npm install
```

---

## ❌ Mobile Responsive Issues

### Problem
Simulators don't look good on mobile.

### Solution
Check Tailwind classes:
- Use responsive prefixes: `md:`, `lg:`
- Test with browser dev tools mobile view
- Verify viewport meta tag in layout

---

## ❌ Calculation Results Wrong

### Problem
Financial calculations return unexpected results.

### Solutions

**1. Check input values**
- Rates should be percentages (e.g., 8 for 8%, not 0.08)
- Amounts in MXN (not cents)
- Months as integers

**2. Review calculation functions**
```typescript
// Check calculations.ts
// Verify formulas match expected behavior
```

**3. Run unit tests**
```bash
npm test
```

---

## 🔍 Debugging Tips

### Check Browser Console
```javascript
// Open browser console (F12)
// Look for:
- Red error messages
- Failed network requests
- Unhandled promise rejections
```

### Check Network Tab
```
1. Open Dev Tools > Network
2. Filter by "Fetch/XHR"
3. Look for failed requests (red)
4. Click to see request/response details
```

### Check Database Directly
```sql
-- Verify data exists
SELECT COUNT(*) FROM simulators;
SELECT COUNT(*) FROM sim_runs;

-- Check recent saves
SELECT * FROM sim_runs 
ORDER BY created_at DESC 
LIMIT 5;
```

### Enable Verbose Logging
```typescript
// In your API routes
console.log('Request received:', await request.json());
console.log('Supabase response:', { data, error });
```

---

## 🆘 Still Stuck?

### Checklist
- [ ] Database schema created (run SIMULATORS_QUICKSTART.sql)
- [ ] Simulators seeded (6 rows in table)
- [ ] RLS policies active
- [ ] Recharts installed
- [ ] User authenticated (for save feature)
- [ ] Environment variables set
- [ ] Dev server running
- [ ] No console errors

### Get More Help
1. Check error messages in:
   - Browser console
   - Terminal (server logs)
   - Supabase logs
2. Review documentation:
   - SIMULATORS_README.md
   - SIMULATORS_SETUP_GUIDE.md
3. Test with preset values (Load Test Values button)
4. Verify one simulator works before testing others

---

## 📞 Quick Fixes Summary

| Problem | Quick Fix |
|---------|-----------|
| user_roles error | Use updated SIMULATORS_QUICKSTART.sql |
| Recharts missing | `npm install recharts` |
| No simulators showing | Re-run seed SQL |
| Can't save | Check authentication |
| 500 errors | Check server logs & env vars |
| Charts missing | Install recharts, check data format |
| TypeScript errors | Verify schemas match |
| Build fails | Run `npx tsc --noEmit` |

---

**Most issues can be solved by:**
1. Running the correct SQL file (SIMULATORS_QUICKSTART.sql)
2. Installing dependencies (`npm install`)
3. Checking authentication
4. Reviewing browser console errors

Happy debugging! 🐛🔧


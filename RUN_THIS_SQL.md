# 🚀 Quick Database Setup

## Just run this one SQL file in your Supabase SQL Editor:

### File to run:
```
SIMULATORS_QUICKSTART.sql
```

### Steps:
1. Open your Supabase project
2. Go to SQL Editor
3. Click "New Query"
4. Copy and paste the ENTIRE contents of `SIMULATORS_QUICKSTART.sql`
5. Click "Run"
6. ✅ Done!

---

## What this creates:

✅ **simulators** table (with 6 simulators seeded)  
✅ **sim_runs** table (for saving user runs)  
✅ All indexes (for performance)  
✅ RLS policies (for security)  
✅ Triggers (for timestamps)  

---

## Verify it worked:

Run this query:
```sql
SELECT slug, name, is_active 
FROM simulators 
ORDER BY sort_order;
```

You should see 6 rows:
1. monthly-budget
2. savings-goal
3. credit-card-payoff
4. simple-loan
5. investment-comparison
6. inflation-calculator

---

## Then:

```bash
npm run dev
```

Visit: http://localhost:3004/simulators

🎉 **You're done!**


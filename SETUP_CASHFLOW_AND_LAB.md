# 🚀 Setup Cash Flow Game & Business Lab

## Quick Fix for Current Errors

You need to run SQL migrations in **Supabase SQL Editor** in this order:

### Step 1: Setup Cash Flow Game Tables

Open Supabase SQL Editor and run these files:

```sql
-- 1. Create Cash Flow game tables
-- File: CASHFLOW_GAME_SCHEMA.sql
-- This creates: professions, game_sessions, players, opportunity_cards, etc.

-- 2. Seed professions with Spanish translations
-- File: CASHFLOW_UPDATE_PROFESSIONS_SPANISH.sql

-- 3. Add doodads (optional items)
-- File: CASHFLOW_DOODADS.sql

-- 4. Add opportunity cards
-- File: CASHFLOW_OPPORTUNITY_CARDS.sql

-- 5. Add fast track cards
-- File: CASHFLOW_FAST_TRACK_CARDS.sql
```

### Step 2: Setup Business Lab Tables (ALREADY DONE ✅)

You already ran:
- ✅ `migrations/business_lab_schema.sql`
- ✅ `seed/business-lab-seed.sql`

---

## 🔧 Run in Supabase (5 minutes)

### Open Supabase Dashboard:
1. Go to your project → SQL Editor
2. Click "New Query"

### Run Each File:

#### 1. Cash Flow Schema (Required)
Copy & paste contents of:
```
CASHFLOW_GAME_SCHEMA.sql
```
Click **Run**

#### 2. Spanish Professions (Required)
Copy & paste contents of:
```
CASHFLOW_UPDATE_PROFESSIONS_SPANISH.sql
```
Click **Run**

#### 3. Doodads (Optional)
Copy & paste contents of:
```
CASHFLOW_DOODADS.sql
```
Click **Run**

#### 4. Opportunity Cards (Required)
Copy & paste contents of:
```
CASHFLOW_OPPORTUNITY_CARDS.sql
```
Click **Run**

#### 5. Fast Track Cards (Optional)
Copy & paste contents of:
```
CASHFLOW_FAST_TRACK_CARDS.sql
```
Click **Run**

---

## ✅ After Running:

### Test Cash Flow:
Visit: http://localhost:3004/cash-flow

You should see:
- ✅ Professions load (no 500 error)
- ✅ Full width cards across screen
- ✅ Can select a profession
- ✅ Can start a game

### Test Business Lab:
Visit: http://localhost:3004/business-lab

You should see:
- ✅ 6 tracks displayed
- ✅ Full width layout
- ✅ Progress tracking works

---

## 📊 Quick Verification SQL

After running migrations, verify in Supabase:

```sql
-- Should return professions (6+)
SELECT COUNT(*) FROM professions;

-- Should return opportunity cards (30+)
SELECT COUNT(*) FROM opportunity_cards;

-- Should return lab tracks (6)
SELECT COUNT(*) FROM lab_tracks;

-- Should return lab steps (30)
SELECT COUNT(*) FROM lab_steps;
```

---

## 🐛 Current Error Explained

**Error**: `/api/cashflow/my-games` returns 500  
**Cause**: Prisma trying to query `professions` table that doesn't exist yet  
**Fix**: Run `CASHFLOW_GAME_SCHEMA.sql` to create the table

---

## 🎯 Summary

**For Cash Flow to work:**
1. Run `CASHFLOW_GAME_SCHEMA.sql` (creates tables)
2. Run `CASHFLOW_UPDATE_PROFESSIONS_SPANISH.sql` (adds professions)
3. Run `CASHFLOW_OPPORTUNITY_CARDS.sql` (adds investment cards)

**Business Lab is already working!** ✅
- Tables created ✅
- Data seeded ✅
- Full width layout ✅

---

Run the Cash Flow migrations and both features will be fully functional! 🚀


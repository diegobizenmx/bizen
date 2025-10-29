# Quick Fix for Progress Tracking Errors

## What's Happening?
You're seeing console errors like:
- ❌ Failed to track page visit
- ❌ Check access failed
- POST /api/progress/check-access 500 (Internal Server Error)

## Why?
Row Level Security (RLS) in Supabase is blocking Prisma from accessing the database tables.

## Fix It Now (3 Steps)

### Step 1: Run SQL in Supabase (5 minutes)

1. **Open Supabase Dashboard**: https://app.supabase.com
2. Go to **SQL Editor** (left sidebar)
3. **Copy the entire contents** of this file:
   ```
   /migrations/complete_progress_tables_setup.sql
   ```
4. **Paste it** into the SQL Editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. **Verify**: You should see a success message and the verification queries at the bottom showing all 7 tables

### Step 2: Verify DATABASE_URL (1 minute)

Check your `.env.local` file in the project root:

```bash
# Should look like this (with your actual credentials):
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Where to find these values:**
- Go to Supabase Dashboard → Project Settings → Database
- Copy the "Connection Pooling" string
- Replace `[YOUR-PASSWORD]` with your database password

### Step 3: Restart Dev Server (30 seconds)

```bash
# Stop your current dev server (Ctrl+C)
npm run dev
```

## Test It

1. Navigate to any module page (e.g., `/module/1/1`)
2. Open browser console (F12)
3. Errors should be gone! ✅

## Still Having Issues?

### Check Server Logs
Look at your terminal where `npm run dev` is running. You should now see detailed error logs:

```
❌ [check-access] Full error object: {...}
```

### Common Issues

**Problem**: Still getting 500 errors
- **Solution**: Make sure you ran the COMPLETE SQL file, not just parts of it
- Check that all 7 tables exist in Supabase Dashboard → Table Editor

**Problem**: "Can't reach database server"
- **Solution**: Your DATABASE_URL is wrong or database password is incorrect
- Go to Supabase → Project Settings → Database → Reset Database Password

**Problem**: Tables exist but still getting errors
- **Solution**: RLS policies might not have been created
- Re-run the SQL file (it's safe to run multiple times)

## What the Fix Does

1. ✅ Creates all 7 required tables:
   - `page_visits`
   - `quiz_attempts`
   - `quiz_answers`
   - `section_completions`
   - `user_module_progress`
   - `user_section_completion`
   - `progress`

2. ✅ Enables RLS on all tables (security)

3. ✅ Creates bypass policies so Prisma can access data from server-side

4. ✅ Maintains security (only authenticated users can access)

## Need More Help?

Check these files:
- `FIX_RLS_PRISMA_ERROR.md` - Detailed explanation
- `migrations/complete_progress_tables_setup.sql` - The SQL you need to run



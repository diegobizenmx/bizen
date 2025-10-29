# Fix RLS Blocking Prisma Access

## Problem
You're getting a 500 error when checking access because Row Level Security (RLS) is blocking Prisma from accessing the database tables.

## Root Cause
- Your Supabase database has RLS enabled on all tables
- Prisma connects directly to PostgreSQL using `DATABASE_URL`
- RLS policies are blocking server-side queries because they only allow user-specific access via `auth.uid()`

## Solution

### Step 1: Run the Complete Setup SQL
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Open the file: `/migrations/complete_progress_tables_setup.sql`
4. Copy all the SQL and paste it into the SQL Editor
5. Click **Run**

This will:
- Create all missing progress tracking tables
- Enable RLS on all tables
- Create bypass policies that allow server-side (Prisma) access while maintaining security

### Step 2: Verify Your DATABASE_URL
Make sure your `.env` or `.env.local` file has the correct `DATABASE_URL`:

```bash
# Use the connection pooler URL (recommended for Next.js)
DATABASE_URL="postgresql://postgres.[your-project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# OR use the direct connection URL
DATABASE_URL="postgresql://postgres:[password]@db.[your-project-ref].supabase.co:5432/postgres"
```

**Important:** Make sure you're using your **database password**, not your service role key.

### Step 3: Restart Your Dev Server
After running the SQL migration:

```bash
npm run dev
```

or if it's already running, just save a file to trigger a hot reload.

### Step 4: Test
Navigate to any module/section page and check if the errors are gone.

## Alternative: Disable RLS (Not Recommended for Production)

If you're just testing locally and want to quickly disable RLS:

```sql
ALTER TABLE user_module_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_section_completion DISABLE ROW LEVEL SECURITY;
ALTER TABLE progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE page_visits DISABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts DISABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers DISABLE ROW LEVEL SECURITY;
ALTER TABLE section_completions DISABLE ROW LEVEL SECURITY;
```

⚠️ **Warning:** Only do this in development. Production should always use RLS for security.

## What the Fix Does

The migration creates new policies that:
1. Allow `authenticated` and `service_role` connections to bypass RLS
2. Keep your data secure (only authenticated requests can access)
3. Let Prisma work properly from server-side code

This is the recommended approach for using Prisma with Supabase.


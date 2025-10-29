# 🔄 BIZEN & Microcredential Apps - Complete Separation

## Overview

Your project now has **TWO COMPLETELY SEPARATE APPS**:
1. **BIZEN** - Public app (anyone can sign up)
2. **Microcredential** - Student-only app (Mondragon emails only)

Each app will use its **OWN Supabase project** with completely separate:
- User databases
- Authentication systems  
- Data storage

## 📋 Setup Instructions

### Step 1: Create BIZEN Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Name it: **"bizen-app"** or **"bizen-production"**
4. Save the credentials:
   - URL: `https://xxxxx.supabase.co`
   - Anon Key: `eyJhbGc...`
   - Service Role Key: `eyJhbGc...`

### Step 2: Update Environment Variables

Add these to your `.env.local` file:

```env
# ==========================================
# MICROCREDENTIAL APP (Mondragon Students)
# ==========================================
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co  # Your existing Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...  # Your existing Anon Key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # Your existing Service Key

# ==========================================
# BIZEN APP (Public App)
# ==========================================
NEXT_PUBLIC_SUPABASE_URL_BIZEN=https://yyyyy.supabase.co  # NEW BIZEN Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY_BIZEN=eyJhbGc...  # NEW BIZEN Anon Key
SUPABASE_SERVICE_ROLE_KEY_BIZEN=eyJhbGc...  # NEW BIZEN Service Key
```

### Step 3: Set Up BIZEN Database Tables

In your BIZEN Supabase project, create these tables:

```sql
-- Users table (if you want to track BIZEN-specific data)
CREATE TABLE bizen_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add any other tables you need for BIZEN content
-- Example: Progress tracking, submissions, etc.
```

## 🔀 How They Work Together

### Microcredential App (`/module/*`, `/dashboard`, `/welcome`)
- **Database**: Uses main Supabase (NEXT_PUBLIC_SUPABASE_URL)
- **Users**: Only Mondragon emails (@mondragonmexico.edu.mx)
- **Access**: Protected by middleware + email validation
- **Files**: All existing files in `src/app/`

### BIZEN App (`/bizen/*`)
- **Database**: Uses BIZEN Supabase (NEXT_PUBLIC_SUPABASE_URL_BIZEN)  
- **Users**: Anyone can sign up
- **Access**: Public, no email restrictions
- **Files**: All files in `src/app/bizen/`

## 🚀 Migration Strategy

### Option A: Keep Single Supabase (Current Setup)
**Pros**: No additional setup  
**Cons**: Users mixed in one database

**To manage users:**
1. Go to your Supabase Dashboard
2. Navigate to Authentication > Users
3. Use filters or search to find users
4. You can see all users together but they sign up from different pages

### Option B: Use Two Supabase Projects (Recommended for Production)
**Pros**: Complete separation, easier to manage, better security  
**Cons**: Need to set up second Supabase project

**To manage users:**
1. **BIZEN users**: Log into BIZEN Supabase Dashboard
2. **Microcredential users**: Log into Main Supabase Dashboard
3. Each dashboard shows only users from that specific app

## 📊 Viewing Users

### Current Setup (Single Supabase)
- Dashboard: `http://localhost:3000/admin/users`
- Or go to [Supabase Dashboard](https://supabase.com/dashboard) > Authentication > Users

### With Two Supabase Projects
- BIZEN users: Log into BIZEN Supabase Dashboard
- Microcredential users: Log into Main Supabase Dashboard

## 🔧 Code Structure

```
src/
├── app/
│   ├── bizen/                    # BIZEN app routes
│   │   ├── login/page.tsx        # Uses client-bizen
│   │   ├── signup/page.tsx       # Uses client-bizen
│   │   └── auth/callback/        # BIZEN auth callback
│   ├── login/page.tsx             # Microcredential login
│   ├── signup/page.tsx            # Microcredential signup
│   └── dashboard/page.tsx         # Microcredential dashboard
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Main Supabase (Microcredential)
│   │   ├── client-bizen.ts        # BIZEN Supabase
│   │   └── server.ts              # Server-side Supabase
│   └── emailValidation.ts         # Email domain checks
│
└── middleware.ts                   # Route protection
```

## ✅ Checklist

- [x] BIZEN signup/login use separate Supabase client
- [x] Middleware blocks BIZEN users from Microcredential routes
- [x] Middleware blocks non-Mondragon users from Microcredential
- [x] Login pages check email domains
- [x] Separate user databases
- [ ] Set up BIZEN Supabase project (if using two projects)
- [ ] Update environment variables

## 🎯 Recommendation

**For Development**: Keep using single Supabase (easier)  
**For Production**: Use two separate Supabase projects (better security & management)


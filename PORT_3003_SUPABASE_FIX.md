# 🔧 Fix Login Issue on Port 3003

## Problem
You're getting "Error de autenticación" when trying to login on `localhost:3003` with your Mondragón email.

## Root Cause
Supabase requires **redirect URLs to be explicitly whitelisted**. If `localhost:3003` isn't in your Supabase redirect URL list, authentication will fail even if your credentials are correct.

## ✅ Solution: Add Port 3003 to Supabase

### Step 1: Go to Supabase Dashboard
1. Open your Supabase project dashboard
2. Go to **Authentication** → **URL Configuration**

### Step 2: Add Redirect URLs
In the **Redirect URLs** section, add these lines (one per line):

```
http://localhost:3000/auth/callback
http://localhost:3003/auth/callback
http://localhost:3000/*
http://localhost:3003/*
```

### Step 3: Update Site URL (if needed)
Make sure the **Site URL** includes:
```
http://localhost:3003
```
(You can have multiple, or use the one you're currently using)

### Step 4: Save Changes
Click **Save** at the bottom of the page.

### Step 5: Wait a Few Seconds
Supabase needs a moment to propagate the changes (usually 5-10 seconds).

### Step 6: Try Login Again
Go back to `http://localhost:3003/login` and try logging in again.

---

## 🎯 Alternative: Use Port 3000

If you don't want to configure port 3003, you can:

1. Stop your current dev server (Ctrl+C)
2. Start it on port 3000:
   ```bash
   npm run dev
   ```
3. Access at `http://localhost:3000/login`

Port 3000 is already configured in Supabase by default.

---

## 📝 Quick Fix: Update .env.local

If you want to keep using port 3003, you can also add this to your `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3003
```

But you **still need** to add the redirect URLs in Supabase Dashboard for authentication to work.

---

## 🔍 Debugging

If it still doesn't work after adding the redirect URLs:

1. **Open browser DevTools** (F12)
2. **Go to Console tab**
3. **Try logging in again**
4. **Look for errors** - they'll show the actual Supabase error

Common errors:
- `redirect_to is not whitelisted` → Redirect URL not added to Supabase
- `Email not confirmed` → Need to verify your email first
- `Invalid login credentials` → Wrong email/password, or account doesn't exist in this Supabase project

---

## ✅ After Fix

Once you've added `localhost:3003` to Supabase redirect URLs:
- ✅ Login should work
- ✅ Email verification links will work
- ✅ Password reset links will work


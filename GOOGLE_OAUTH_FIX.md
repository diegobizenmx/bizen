# 🔧 Google OAuth Sign-In Fix

## The Problem
When users sign in with Google, they're being redirected to auth pages instead of logging into the app.

## Root Cause
The issue is likely one of these:
1. Google OAuth redirect URL not configured in Supabase
2. Auth callback not properly handling the session
3. Client-side redirect loop

---

## ✅ Solution: Fix Supabase OAuth Configuration

### Step 1: Configure Redirect URLs in Supabase

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to: **Authentication** → **URL Configuration**
4. Add these to **Redirect URLs**:

```
http://localhost:3004/auth/callback
https://bizen.mx/auth/callback
https://www.bizen.mx/auth/callback
https://yourvercelapp.vercel.app/auth/callback
```

**Important:** Add BOTH your local (localhost:3004) AND production URLs!

### Step 2: Enable Google Provider

1. Still in Supabase Dashboard
2. Go to: **Authentication** → **Providers**
3. Find **Google**
4. Click **Enable**
5. Add your Google OAuth credentials:
   - **Client ID** (from Google Cloud Console)
   - **Client Secret** (from Google Cloud Console)

### Step 3: Configure Google Cloud Console

1. Go to: https://console.cloud.google.com
2. Select your project (or create one)
3. Go to: **APIs & Services** → **Credentials**
4. Create **OAuth 2.0 Client ID** (or edit existing)
5. Add **Authorized redirect URIs**:

```
https://[your-project-ref].supabase.co/auth/v1/callback
```

Example: `https://abcdefghijklmnop.supabase.co/auth/v1/callback`

**Where to find your project ref:**
- In Supabase dashboard URL: `https://supabase.com/dashboard/project/[PROJECT_REF]`
- Or in Settings → General → Reference ID

---

## 🧪 Test the Fix

After configuration:

1. Clear browser cookies/cache
2. Go to: http://localhost:3004/login
3. Click "Continuar con Google"
4. Authorize
5. Should redirect to `/dashboard` ✅

---

## 🐛 If Still Not Working

### Check 1: Console Errors
Open browser DevTools → Console tab
Look for errors like:
- `Invalid redirect URL`
- `Unauthorized`
- `Invalid client`

### Check 2: Network Tab
1. DevTools → Network tab
2. Click Google sign-in
3. Watch the redirects:
   - Should go to Google
   - Then to `/auth/callback`
   - Then to `/dashboard`

If it's redirecting back to `/login` or showing errors, note the error message.

### Check 3: Supabase Logs
1. Supabase Dashboard → Logs
2. Look for authentication errors
3. Note any `invalid_grant` or `redirect_uri_mismatch` errors

---

## 📋 Quick Checklist

- [ ] Redirect URLs added in Supabase (local + production)
- [ ] Google provider enabled in Supabase
- [ ] Google OAuth credentials added (Client ID + Secret)
- [ ] Google Cloud Console has correct redirect URI
- [ ] Tested in incognito window (fresh cookies)
- [ ] No console errors
- [ ] Auth callback route exists at `/auth/callback`

---

## 🆘 Common Errors & Fixes

### Error: "redirect_uri_mismatch"
**Fix:** The Google Cloud Console redirect URI must EXACTLY match:
```
https://[your-supabase-project].supabase.co/auth/v1/callback
```

### Error: "Invalid redirect URL"
**Fix:** Add your app's callback URL to Supabase's allowed redirect URLs

### Error: Stuck in redirect loop
**Fix:** Clear cookies, ensure `/dashboard` doesn't redirect unauthenticated users back to `/login`

---

## 📝 Current Configuration

Your app is configured to redirect to:
- **After Google OAuth:** `/auth/callback` → `/dashboard`
- **After Email Login:** `/courses`

This is correct! Just need to ensure Supabase configuration matches.

---

## Need Help?

If you're still having issues, share:
1. The exact error message from console
2. Your Supabase project reference ID
3. What happens after clicking Google sign-in

We'll debug together! 🚀


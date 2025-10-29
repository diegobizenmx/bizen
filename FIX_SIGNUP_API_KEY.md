# 🔧 Fix "Invalid API key" Error for Signup

## Why This Happens

The "Invalid API key" error is **NOT** because you're on localhost. API keys work the same everywhere. The issue is usually:

1. **API key doesn't match your Supabase project**
2. **Supabase redirect URLs not configured**
3. **Environment variable not loaded correctly**

## ✅ Check These Things

### 1. Verify API Key in Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Select your project: `jbodeaqxjaezzjwewvrg`
3. Go to **Settings → API**
4. Copy the **"anon public"** key
5. Open your `.env.local` file
6. Compare it character-by-character with `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Make sure:**
- No extra spaces
- No quotes around the key
- The key matches exactly

### 2. Configure Supabase Redirect URLs

1. Go to: **Authentication → URL Configuration**
2. Make sure you have these redirect URLs:
   ```
   http://localhost:3000/auth/callback
   http://localhost:3003/auth/callback (if you're using port 3003)
   https://bizen.mx/auth/callback (for production)
   ```

3. **Site URL** should be:
   ```
   http://localhost:3000 (for development)
   ```

### 3. Restart Dev Server

After changing `.env.local`:
```bash
# Stop server completely (Ctrl+C)
npm run dev
```

### 4. Check Port Mismatch

I noticed you're using `localhost:3003` but code defaults to `3000`. Either:
- Run on port 3000: `PORT=3000 npm run dev`
- Or add to `.env.local`: `NEXT_PUBLIC_SITE_URL=http://localhost:3003`

## 🌐 For Production Deployment

When you deploy to production, you'll need:

### In Vercel/Deployment Platform:
Add these environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://jbodeaqxjaezzjwewvrg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[same key as in .env.local]
NEXT_PUBLIC_SITE_URL=https://bizen.mx
```

### In Supabase Dashboard:
1. **Authentication → URL Configuration**
2. Add redirect URLs:
   ```
   https://bizen.mx/auth/callback
   https://bizen.mx/**
   ```
3. Set Site URL: `https://bizen.mx`

## 🔍 Debugging Steps

1. **Check server console logs** when signing up - look for:
   - "🔧 Supabase Key (first 30):"
   - "🔧 Key length:"
   
2. **Compare with Supabase Dashboard:**
   - The key in logs should match your Supabase dashboard

3. **Test with verification script:**
   ```bash
   node scripts/verify-supabase-key.js
   ```
   This should show ✅ if the key is valid

## ❓ Still Not Working?

If it still fails after checking all above:

1. **Generate new API key** (optional last resort):
   - Supabase Dashboard → Settings → API
   - Click "Reset" on the anon key
   - Copy the new key
   - Update `.env.local`
   - Restart server

2. **Check Supabase project is active:**
   - Make sure your Supabase project isn't paused
   - Check project status in dashboard

## ✅ Expected Behavior

- **Localhost**: Should work with correct API key and redirect URLs
- **Production**: Will work with same API key + production redirect URLs

The API key is the same for both environments - you just need different redirect URLs configured in Supabase.


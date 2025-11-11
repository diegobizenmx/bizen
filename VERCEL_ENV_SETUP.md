# 🚀 Vercel Environment Variables Setup

## ⚠️ IMPORTANT: Add to Vercel Dashboard

Your Resend API key is configured locally but needs to be added to Vercel for production.

### Step 1: Go to Vercel Dashboard

1. Visit: https://vercel.com/dashboard
2. Select your project: **bizen**
3. Go to: **Settings** → **Environment Variables**

### Step 2: Add RESEND_API_KEY

Click **"Add New"** and enter:

**Name:**
```
RESEND_API_KEY
```

**Value:**
```
re_YUVZTfqu_8b7WKpwfshQ8FzGbDRFT7L9o
```

**Environment:** Select all three:
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 3: Redeploy (if needed)

If your app is already deployed:
1. Go to **Deployments** tab
2. Click the **︙** (three dots) on the latest deployment
3. Select **Redeploy**

Or just push any new commit and it will redeploy automatically with the new env var.

---

## ✅ Current Local Configuration

Your `.env.local` file already has:

```bash
RESEND_API_KEY=re_YUVZTfqu_8b7WKpwfshQ8FzGbDRFT7L9o
```

✅ This file is in `.gitignore` (secure - won't be committed)

---

## 🧪 Test Locally

Your API key is ready! Test it:

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Visit: http://localhost:3004/test-email

3. Send a test email to yourself

---

## 📋 Other Environment Variables in Vercel

Make sure you also have these in Vercel:

### Required:
- ✅ `DATABASE_URL` (Supabase database)
- ✅ `DIRECT_URL` (Supabase direct connection)
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `NEXT_PUBLIC_SITE_URL`

### Optional:
- ✅ `RESEND_API_KEY` (for emails - you just added this!)
- ✅ `OPENAI_API_KEY` (if using AI features)

---

## 🔒 Security Best Practices

✅ **DO:**
- Keep API keys in `.env.local` (gitignored)
- Add them to Vercel dashboard manually
- Rotate keys if they're exposed

❌ **DON'T:**
- Commit `.env.local` to git
- Share API keys in Slack/Discord
- Hardcode keys in your code

---

## 🆘 If Build Fails

If Vercel build fails with "RESEND_API_KEY not found":

1. Double-check the env var is added in Vercel Settings
2. Make sure you selected all environments (Production, Preview, Development)
3. Trigger a new deployment
4. Check build logs for any typos

---

**You're all set!** 🎉

Next steps:
1. Add RESEND_API_KEY to Vercel (see Step 2 above)
2. Test locally at `/test-email`
3. Deploy and test in production


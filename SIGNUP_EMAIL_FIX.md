# 🔧 Signup Email Verification - Complete Fix Guide

## ✅ What I Just Fixed

1. **Created `.env.local` file** with your Supabase configuration
2. Added proper environment variables for email callbacks

---

## 🚨 CRITICAL: Get Your Service Role Key

You need to add your **Service Role Key** to `.env.local`:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg/settings/api)
2. Copy the **`service_role`** key (NOT the anon key)
3. Open `/Users/diegopenasanchez/bsmx/.env.local`
4. Replace `YOUR_SERVICE_ROLE_KEY_HERE` with your actual service role key

```bash
# Example - replace with your actual key:
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

---

## 🔍 Why Emails Aren't Being Sent

There are 3 main reasons why signup emails fail:

### **1. Email Confirmation is Disabled in Supabase**
   - Go to: [Auth Providers](https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg/auth/providers)
   - Find **Email** provider
   - Make sure **"Confirm email"** is **ENABLED** ✅
   - If disabled, users are auto-confirmed and no email is sent

### **2. Email Rate Limits (Supabase Free Tier)**
   - **Max 3 emails per hour** per email address
   - **Max 30 emails per hour** total across your project
   - If you've been testing a lot, you hit the limit
   - **Solution:** Wait 1 hour or use different email addresses

### **3. No Custom SMTP Configured**
   - Supabase's default email service is unreliable
   - Emails often go to spam
   - Not recommended for production
   - **Solution:** Set up custom SMTP (see below)

---

## 🧪 Quick Test - Check Your Current Setup

### **Step 1: Verify Environment Variables**

Restart your dev server to pick up the new `.env.local`:

```bash
# Stop your current dev server (Ctrl+C if running)
npm run dev
```

### **Step 2: Test Signup**

1. Go to `http://localhost:3000/signup`
2. Fill out the form with a **NEW email** (one you haven't used before)
3. Submit the form
4. Check the browser console (F12) for any errors
5. Check your email inbox AND spam folder

### **Step 3: Check Supabase Logs**

1. Go to [Supabase Logs](https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg/logs/auth-logs)
2. Look for recent signup events
3. Check for any error messages

---

## 🔧 QUICK FIX: Use Dev Confirmation Button

If you just want to test your app without waiting for emails:

1. Sign up with any email
2. Click the green button: **"🔧 DEV: Confirmar cuenta sin email"**
3. Your account will be instantly confirmed
4. Go to `/login` and sign in

**Note:** This only works in development mode!

---

## 📧 Setting Up Custom SMTP (Recommended for Production)

For reliable email delivery, configure custom SMTP in Supabase:

### **Option A: Resend (Easiest)**

1. Go to [resend.com](https://resend.com) and sign up
2. Get your API key
3. In Supabase Dashboard:
   - Go to: **Project Settings** → **Auth** → **SMTP Settings**
   - Enable custom SMTP
   - Use these settings:
     - **Host:** `smtp.resend.com`
     - **Port:** `465` or `587`
     - **Username:** `resend`
     - **Password:** Your Resend API key
     - **Sender email:** Your verified domain email
     - **Sender name:** BIZEN

### **Option B: SendGrid**

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Configure in Supabase SMTP settings:
   - **Host:** `smtp.sendgrid.net`
   - **Port:** `587`
   - **Username:** `apikey`
   - **Password:** Your SendGrid API key

### **Option C: AWS SES** (Cheapest at scale)

1. Set up AWS SES
2. Get SMTP credentials
3. Configure in Supabase

---

## 🎯 Common Issues & Solutions

### **Issue: "Correo ya registrado"**

**Solution:**
1. Go to [Supabase Users](https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg/auth/users)
2. Find and delete the user
3. Try signing up again

### **Issue: Email goes to spam**

**Solutions:**
- **For development:** Just check your spam folder
- **For production:** Set up custom SMTP with proper SPF/DKIM records

### **Issue: "Email rate limit exceeded"**

**Solution:** Wait 1 hour or:
1. Use different email addresses for testing
2. Set up custom SMTP (no rate limits)
3. Or disable email confirmation temporarily (see below)

### **Issue: No email received at all**

**Try these in order:**
1. ✅ Check spam folder
2. ✅ Check Supabase Auth Logs for errors
3. ✅ Verify email confirmation is enabled
4. ✅ Try the resend button on signup page
5. ✅ Check if you hit rate limits (use different email)
6. ✅ Try a different email provider (Gmail, Outlook, etc.)
7. ✅ Set up custom SMTP

---

## 🚀 Disable Email Confirmation (Development Only)

If you just want to test without emails:

1. Go to: [Auth Providers](https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg/auth/providers)
2. Click on **Email** provider
3. **DISABLE** "Confirm email" ❌
4. Save changes
5. New signups will be auto-confirmed

**⚠️ Remember to re-enable before production!**

---

## 📋 Checklist: What to Check Right Now

- [ ] `.env.local` file exists in project root
- [ ] Added Service Role Key to `.env.local`
- [ ] Restarted dev server (`npm run dev`)
- [ ] Supabase "Confirm email" is enabled (or disabled for testing)
- [ ] Tried signing up with a NEW email address
- [ ] Checked spam folder
- [ ] Checked Supabase Auth Logs for errors
- [ ] Waited at least 2-3 minutes for email to arrive

---

## 🆘 Still Not Working?

If you've tried everything above and still no emails:

### **Temporary Solution:**
Use the dev confirmation button (green button on signup page)

### **Permanent Solution:**
Set up custom SMTP - Supabase's default email service is unreliable for production use.

---

## 📊 Your Current Configuration

- **Supabase URL:** `https://jbodeaqxjaezzjwewvrg.supabase.co`
- **Callback URL:** `http://localhost:3000/auth/callback`
- **Email Provider:** Supabase default (unreliable)

**Recommendation:** Set up Resend or SendGrid SMTP before deploying to production.

---

## 🔐 Before Deploying to Production

1. **Remove dev confirmation endpoint:**
   ```bash
   rm src/app/api/auth/admin-confirm/route.ts
   ```

2. **Set up custom SMTP** (Resend recommended)

3. **Update environment variables:**
   - Change `NEXT_PUBLIC_SITE_URL` to your production domain
   - Add SMTP credentials if using custom provider

4. **Enable email confirmation** in Supabase

5. **Test with real email addresses**

---

Need help? Check the browser console and Supabase Auth Logs for detailed error messages!



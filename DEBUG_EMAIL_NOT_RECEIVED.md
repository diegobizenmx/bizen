# 🔍 Debug: Email Not Received - Quick Checklist

## ✅ Immediate Checks (Do These First)

### 1. Check Spam Folder
- **Gmail:** Check Spam, Promotions, Updates tabs
- **Outlook:** Check Junk folder
- **Other:** Check all filtered folders

### 2. Check Resend Dashboard
1. Go to: https://resend.com/emails
2. Login to your account
3. Click on **"Emails"** tab
4. You should see recent sends
5. Click on the email to see status:
   - ✅ **Delivered** - Email was sent
   - ⚠️ **Pending** - Still in queue
   - ❌ **Bounced** - Delivery failed
   - ❌ **Failed** - Error occurred

**What do you see in Resend?**

---

## 🔧 Common Issues & Solutions

### Issue 1: Domain Not Verified
**Check:**
- Resend Dashboard → Domains
- Is `bizen.mx` showing as "Verified" ✅ ?

**Fix:**
If not verified:
1. Copy the DNS records from Resend
2. Add them to your domain provider (GoDaddy, Namecheap, etc.)
3. Wait 10-15 minutes
4. Resend will auto-verify

---

### Issue 2: SMTP Settings Wrong
**Check in Supabase:**
1. Go to: Project Settings → Auth → SMTP Settings
2. Verify these exact settings:

```
SMTP Host: smtp.resend.com
SMTP Port: 465
SMTP User: resend
SMTP Password: [your-resend-api-key] ← Make sure this is correct!
Sender Name: BIZEN
Sender Email: noreply@bizen.mx (or whatever domain you verified)
```

**Common mistake:** Using the wrong password - it MUST be your Resend API key

---

### Issue 3: Email Templates Issue
**Check in Supabase:**
1. Go to: Authentication → Email Templates
2. Click **"Confirm signup"** template
3. Does it contain `{{ .ConfirmationURL }}` ?
4. Click "Preview" to test

---

### Issue 4: Using Resend Free Domain for Testing
If you're using `onboarding@resend.dev` (Resend's free domain):
- **This only works for testing** - won't work in production
- You might not see emails delivered
- **Solution:** Add and verify your own domain

---

## 🧪 Quick Test

### Step 1: Send Test Email from Resend
1. Go to Resend Dashboard
2. Click **"Send Email"**
3. Send a test email to yourself
4. Check if it arrives

**Does the test email arrive?** 
- ✅ Yes → Issue is with Supabase configuration
- ❌ No → Issue is with Resend/domain setup

---

### Step 2: Check Supabase Logs
1. Go to Supabase Dashboard
2. Navigate to **Logs** → **Auth Logs**
3. Look for recent "signup" events
4. Check for errors

**What errors do you see?**

---

### Step 3: Check Email Configuration in Supabase
1. Go to: **Authentication** → **Providers** → **Email**
2. Verify:
   - ✅ **"Enable email"** is ON
   - ✅ **"Confirm email"** is ON
   - ✅ **"Secure email change"** is ON

---

## 🚀 Quick Fix: Use Another Email Provider

If Resend isn't working, try **SendGrid** (also free):

1. **Sign up:** https://sendgrid.com (free tier: 100 emails/day)
2. **Get API key**
3. **In Supabase SMTP Settings:**
```
SMTP Host: smtp.sendgrid.net
SMTP Port: 587
SMTP User: apikey
SMTP Password: [your-sendgrid-api-key]
Sender Name: BIZEN
Sender Email: noreply@bizen.mx
```

---

## 📧 Test Email Right Now

Try sending a test email:

1. Go to: http://localhost:3006/resend-email-test (if you have a test route)
2. OR: Use Supabase Dashboard → Email Templates → Send Test Email

---

## ❓ Answer These Questions

1. **Is your domain verified in Resend?** Yes / No
2. **What do you see in Resend "Emails" tab?** (Screenshot would help)
3. **What port did you use in SMTP?** (Should be 465 or 587)
4. **What email did you try to send to?** (Share if comfortable)
5. **Do you see any errors in Resend logs?** Yes / No

---

## 🆘 Still Not Working?

Share with me:
1. Screenshot of Resend Dashboard → Emails tab
2. Screenshot of Supabase SMTP Settings (blur out API key)
3. What email service you're using (Resend/SendGrid/Other)
4. If domain is verified

I'll help you debug further! 🔍


# 🚀 Resend Email Setup - Quick Guide

## Step 1: Get Your API Key

1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Sign up or log in
3. Click "Create API Key"
4. Give it a name (e.g., "BIZEN Production")
5. Copy the key (starts with `re_`)

## Step 2: Add to Your Project

Create or update `.env.local` in your project root:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important:** Never commit this file to git! (It's already in `.gitignore`)

## Step 3: Restart Your Server

```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Test It!

1. Visit: http://localhost:3004/test-email
2. Enter your email
3. Enter your name
4. Click "Email de Bienvenida"
5. Check your inbox! 📬

---

## 📧 Using the Same Resend Account for Multiple Apps

### Yes! You have 3 options:

### Option 1: Same API Key (Easiest)
- Use the same key in both apps
- All emails tracked in one dashboard
- Perfect for small projects

```bash
# App 1 (.env.local)
RESEND_API_KEY=re_your_key_here

# App 2 (.env.local)  
RESEND_API_KEY=re_your_key_here  # Same key!
```

### Option 2: Multiple API Keys (Recommended)
- Create separate keys for each app
- Better organization and tracking
- Can revoke individually if needed

1. In Resend Dashboard → Create API Key
2. Name it: "App1 Production"
3. Create another: "App2 Production"
4. Use different keys in each app

```bash
# App 1 (.env.local)
RESEND_API_KEY=re_key_for_app1

# App 2 (.env.local)
RESEND_API_KEY=re_key_for_app2
```

### Option 3: Multiple Domains (Professional)
- Verify multiple domains in Resend
- Each app sends from its own domain
- Most professional approach

```bash
# App 1 sends from: notifications@app1.com
# App 2 sends from: support@app2.com
```

---

## 🎨 Customizing Your Emails

### Change the "From" Address

**Default:** `onboarding@resend.dev` (Resend's testing domain)

**To use your domain:**

1. **Verify your domain in Resend:**
   - Go to Resend Dashboard → Domains
   - Add your domain (e.g., `bizen.mx`)
   - Add the DNS records they provide
   - Wait for verification (usually 5-10 minutes)

2. **Update your email templates:**

```typescript
// src/lib/emails/welcome-email.tsx
// Change line 256 from:
from: 'BIZEN <onboarding@resend.dev>'

// To your verified domain:
from: 'BIZEN <hola@bizen.mx>'
```

3. **Also update:**
   - `src/app/api/send-email/route.ts` (line 36)

---

## 📊 Free Tier Limits

- **3,000 emails/month**
- **100 emails/day**
- Perfect for development and small apps

If you have 2 apps, they'll share these limits.

---

## 🔧 Available Email Templates

You already have 3 templates ready:

1. **Welcome Email** (`welcome-email.tsx`)
   - Beautiful branded template
   - Sent when users sign up
   - ✅ Ready to use!

2. **Password Reset** (`password-reset-email.tsx`)
   - For forgot password flow
   - With secure reset link

3. **Course Completion** (`course-completion-email.tsx`)
   - Congratulates users
   - Shows certificate

---

## ✅ Testing Checklist

- [ ] API Key added to `.env.local`
- [ ] Server restarted
- [ ] Test page working: `/test-email`
- [ ] Welcome email received
- [ ] Simple test email received
- [ ] No errors in console

---

## 🐛 Troubleshooting

### "Failed to send email"
- ✓ Check API key is correct
- ✓ Check `.env.local` exists in project root
- ✓ Restart your server after adding key

### "Email not arriving"
- ✓ Check spam folder
- ✓ Verify email address is correct
- ✓ Check Resend dashboard for delivery logs

### "Invalid API key"
- ✓ Make sure key starts with `re_`
- ✓ No spaces before/after the key
- ✓ Check you copied the full key

---

## 📝 Next Steps

1. **Test the email functionality** at `/test-email`
2. **Verify your domain** in Resend (optional but recommended)
3. **Customize email templates** with your branding
4. **Set up for your second app** (use same account!)

---

## 🆘 Need Help?

- **Resend Docs:** https://resend.com/docs
- **Email Template Docs:** https://resend.com/docs/send-with-react
- **BIZEN Support:** diego@bizen.mx

---

**You're all set!** 🎉


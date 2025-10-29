# ⚡ ACTION REQUIRED - Signup Email Fix

## 🎯 What I Fixed

✅ Created `.env.local` with Supabase configuration  
✅ Relaxed password validation (was too strict)  
✅ Verified Supabase API connection working  
✅ Created diagnostic tools  

---

## 🚀 DO THIS NOW (3 minutes)

### **1. Get Service Role Key** ⏱️ 1 min

1. Open: https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg/settings/api
2. Scroll to **"service_role"** key
3. Click "Reveal" → Copy the key
4. Open `.env.local` in project root
5. Replace `YOUR_SERVICE_ROLE_KEY_HERE` with your actual key

### **2. Enable Email Confirmation** ⏱️ 1 min

1. Open: https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg/auth/providers
2. Click on **"Email"** provider
3. Make sure **"Confirm email"** is **ON** ✅
4. Save if needed

### **3. Restart Dev Server** ⏱️ 30 sec

```bash
# Press Ctrl+C to stop current server
npm run dev
```

### **4. Test Signup** ⏱️ 30 sec

1. Go to: http://localhost:3000/signup
2. Sign up with a **new email** (use a simple password like `test123`)
3. Check email inbox **and spam folder**

---

## 🔧 If No Email Arrives (Development Workaround)

**Quick Fix:**
1. After signing up, click the green button: **"🔧 DEV: Confirmar cuenta sin email"**
2. Account will be instantly confirmed
3. Go to `/login` and sign in

---

## 📊 Run Diagnostic

Check everything is working:

```bash
node test-email-setup.js
```

---

## 💡 Why Emails May Not Arrive

### **Most Common Issues:**

1. **Rate Limits** (Supabase free tier)
   - 3 emails/hour per email address
   - 30 emails/hour total
   - **Solution:** Use different emails or wait 1 hour

2. **Goes to Spam**
   - Supabase default emails often marked as spam
   - **Solution:** Check spam folder

3. **Email Confirmation Disabled**
   - If disabled, users auto-confirm (no email sent)
   - **Check:** Auth Providers in Supabase Dashboard

4. **No Custom SMTP**
   - Supabase default email service is unreliable
   - **Solution:** Set up Resend or SendGrid (see below)

---

## 📧 Set Up Custom SMTP (Recommended)

For reliable email delivery in production:

### **Resend (Easiest)**

1. Sign up: https://resend.com (free 100 emails/day)
2. Get API key
3. Supabase → **Project Settings** → **Auth** → **SMTP Settings**
4. Configure:
   - Host: `smtp.resend.com`
   - Port: `587`
   - Username: `resend`
   - Password: Your Resend API key

---

## 🔗 Important Links

- **Auth Providers:** https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg/auth/providers
- **API Settings:** https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg/settings/api
- **Auth Logs:** https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg/logs/auth-logs
- **Users:** https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg/auth/users

---

## ✅ Verification Checklist

After completing steps above:

- [ ] Service Role Key added to `.env.local`
- [ ] Email confirmation enabled in Supabase
- [ ] Dev server restarted
- [ ] Tested signup with new email
- [ ] Checked spam folder OR used dev confirmation button
- [ ] Successfully logged in

---

## 📚 More Details

For complete documentation, see:
- `SIGNUP_FIX_SUMMARY.md` - Comprehensive guide
- `SIGNUP_EMAIL_FIX.md` - Detailed troubleshooting
- `test-email-setup.js` - Diagnostic script

---

**Next:** Once signup works, you can remove the dev confirmation endpoint before production!



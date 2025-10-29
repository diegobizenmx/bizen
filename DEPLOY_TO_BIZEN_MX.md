# 🚀 Deploy to bizen.mx - Simple Guide

## ⚡ 5-Step Deployment

### **1️⃣ Create Database Tables (5 min)**

```
1. Open: SUPABASE_DATABASE_SETUP.sql
2. Copy all SQL
3. Go to: https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg
4. Click: SQL Editor → Paste → Run
5. ✅ Done!
```

### **2️⃣ Deploy to Vercel (10 min)**

```
1. Push code to GitHub
2. Go to: https://vercel.com
3. Import your repository
4. Add environment variables:
   - NEXT_PUBLIC_SUPABASE_URL=https://jbodeaqxjaezzjwewvrg.supabase.co
   - NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-key]
   - SUPABASE_SERVICE_ROLE_KEY=[your-key]
   - NEXT_PUBLIC_SITE_URL=https://bizen.mx
   - AUTH_REDIRECT_URL=https://bizen.mx/auth/callback
5. Click "Deploy"
6. ✅ Done! (You'll get a vercel.app URL)
```

### **3️⃣ Connect Domain (10 min)**

```
1. Vercel: Settings → Domains → Add "bizen.mx"
2. Go to your domain registrar (GoDaddy, etc.)
3. Add DNS record:
   - Type: A
   - Name: @
   - Value: 76.76.21.21
4. Wait 10-60 minutes for DNS
5. ✅ Done! Vercel will auto-verify
```

### **4️⃣ Configure Supabase (5 min)**

```
1. Supabase: Authentication → URL Configuration
2. Site URL: https://bizen.mx
3. Redirect URLs:
   - https://bizen.mx/**
   - https://bizen.mx/auth/callback
4. ✅ Done!
```

### **5️⃣ Set Up Email (10 min)**

```
1. Create account: https://resend.com
2. Get API key
3. Supabase: Settings → Auth → SMTP Settings
   - Host: smtp.resend.com
   - Port: 465
   - Username: resend
   - Password: [your-api-key]
   - Sender: noreply@bizen.mx
4. ✅ Done!
```

---

## 🧪 Test It

Visit these URLs after deployment:

- ✅ `https://bizen.mx` - Landing
- ✅ `https://bizen.mx/signup` - Create account
- ✅ `https://bizen.mx/login` - Login
- ✅ `https://bizen.mx/modules/menu` - Modules
- ✅ `https://bizen.mx/module/1/sections` - Section 1

---

## 🎉 That's It!

**Total time:** ~40 minutes + DNS wait

**What works:**
- ✅ Custom domain (bizen.mx)
- ✅ SSL/HTTPS automatic
- ✅ Email verification
- ✅ Progress tracking
- ✅ Section unlocking
- ✅ User authentication

---

## 📚 Detailed Guides

- **`DEPLOYMENT_GUIDE.md`** - Complete deployment instructions
- **`DEPLOYMENT_CHECKLIST.md`** - 60-item production checklist
- **`QUICK_SETUP.md`** - 10-minute local setup
- **`PROGRESS_TRACKING_SETUP.md`** - Progress system docs

---

## 🆘 Common Issues

**"Domain not working"**
→ Wait for DNS (up to 60 min)

**"No emails"**
→ Set up SMTP (can't skip this)

**"Sections not unlocking"**
→ Run the database SQL

**"Build failed"**
→ Check Vercel logs, fix errors, redeploy

---

**Need help?** Check `DEPLOYMENT_GUIDE.md` for troubleshooting!

🚀 **Ready to launch!**


# ⚡ Quick Setup Guide - Get Everything Working in 10 Minutes

## 📧 Step 1: Fix Email Verification (2 min)

**Problem:** Not receiving verification emails?

**Solution:** Use the development bypass button

1. Go to `http://localhost:3000/signup`
2. Fill out the form and click "Registrarme"
3. Click the green button: **"🔧 DEV: Confirmar cuenta sin email"**
4. Go to `/login` and sign in

✅ **Done!** You're now authenticated.

**For production:** See `SUPABASE_EMAIL_SETUP.md` for SMTP setup.

---

## 🔓 Step 2: Enable Progress Tracking (5 min)

**What:** Unlock sections automatically as users complete them

**How:**

1. **Go to Supabase Dashboard:**
   - https://supabase.com/dashboard/project/jbodeaqxjaezzjwewvrg
   - Click **SQL Editor**

2. **Run the SQL:**
   - Open `SUPABASE_DATABASE_SETUP.sql` in this project
   - Copy ALL the SQL
   - Paste into Supabase SQL Editor
   - Click **"Run"**

3. **Verify:**
   - You should see success message
   - Tables created: ✅
   - Policies created: ✅

✅ **Done!** Progress tracking is now active.

---

## 🎮 Step 3: Test Everything (3 min)

1. **Go to modules menu:**
   - `http://localhost:3000/modules/menu`

2. **Click "Módulo 1":**
   - Only Section 1 should be unlocked
   - Sections 2 & 3 locked 🔒

3. **Complete Section 1:**
   - Go through all 5 pages
   - Click "Continuar →" on page 5

4. **Verify Section 2 unlocked:**
   - Go back to `/module/1/sections`
   - Section 2 should now be unlocked! 🎉

5. **Check database:**
   - Supabase → Table Editor → `user_module_progress`
   - You should see a row with `unlocked_section: 2`

✅ **Done!** System is working!

---

## 📂 Files I Created

| File | Purpose |
|------|---------|
| `SUPABASE_DATABASE_SETUP.sql` | SQL to create all tables |
| `PROGRESS_TRACKING_SETUP.md` | Detailed documentation |
| `SUPABASE_EMAIL_SETUP.md` | Email verification guide |
| `/api/sections/complete/route.ts` | Section completion API |
| `/api/auth/admin-confirm/route.ts` | Dev email bypass |

---

## 🎯 What Works Now

✅ **Section unlocking** - Automatic when completing sections  
✅ **Progress persistence** - Saved to Supabase database  
✅ **User isolation** - Each user has their own progress  
✅ **Email bypass** - Green button for development  
✅ **Navigation** - "Regresar" buttons on all auth pages  
✅ **Module completion** - Celebration page after finishing  

---

## 🚨 Before Production

Remember to:

- [ ] Remove `/api/auth/admin-confirm/route.ts` (dev bypass)
- [ ] Set up custom SMTP for emails (not Supabase default)
- [ ] Test with real users
- [ ] Set up proper environment variables
- [ ] Deploy database schema

---

## 💡 Pro Tips

**Development:**
- Use the green "DEV: Confirmar cuenta" button
- Check browser console for progress logs
- Use Supabase Table Editor to view data

**Testing:**
- Test with multiple user accounts
- Verify sections lock/unlock correctly
- Check progress survives page refresh

**Production:**
- Set up custom SMTP (Resend, SendGrid)
- Remove dev bypass endpoints
- Monitor Supabase logs

---

Need help? Check the detailed guides:
- `PROGRESS_TRACKING_SETUP.md` - Complete progress system docs
- `SUPABASE_EMAIL_SETUP.md` - Email configuration
- `SUPABASE_DATABASE_SETUP.sql` - Database setup SQL

---

**Total setup time: ~10 minutes**  
**Current status: 95% ready** ✨


# Supabase Auto-Login Setup

This guide explains how to configure Supabase so users are automatically logged in after signup without email confirmation.

## Current Behavior
- User signs up → Gets email verification link → Must verify → Must login
- ❌ Not ideal: Too many steps

## Desired Behavior
- User signs up → **Automatically logged in** → Redirected to diagnostic quiz
- ✅ Better UX: Seamless onboarding

---

## Option 1: Disable Email Confirmation (Simple & Fast)

### Steps:

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard

2. **Select your project** (the one for BSMX)

3. **Navigate to**: Authentication → Providers → Email

4. **Find "Confirm email" setting** (scroll down)

5. **Uncheck** the "Confirm email" checkbox

6. **Click "Save"**

### Result:
- ✅ Users sign up and are **immediately logged in**
- ✅ No email verification required
- ✅ Session is created automatically
- ✅ User is redirected to `/diagnostic-quiz`

### Security Note:
This is fine for a controlled environment (like a university course) where you're restricting signups to `@mondragonmexico.edu.mx` emails only.

---

## Option 2: Auto-Confirm Only Mondragón Emails (More Secure)

If you want to keep email confirmation for other domains but auto-confirm Mondragón emails:

### Steps:

1. **Go to Supabase Dashboard** → Your Project → **Database** → **Functions**

2. **Create a new function** called `auto_confirm_mondragon`

3. **Add this SQL**:

\`\`\`sql
CREATE OR REPLACE FUNCTION auto_confirm_mondragon()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-confirm emails from @mondragonmexico.edu.mx
  IF NEW.email LIKE '%@mondragonmexico.edu.mx' THEN
    NEW.email_confirmed_at = NOW();
    NEW.confirmed_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
\`\`\`

4. **Create a trigger**:

\`\`\`sql
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auto_confirm_mondragon();
\`\`\`

5. **Test by signing up** with a Mondragón email

### Result:
- ✅ Mondragón emails are **auto-confirmed** (no email verification needed)
- ✅ Users are automatically logged in
- ✅ Other email domains still require verification (if you allow them)

---

## Option 3: Disable Email Confirmation via Environment Variable

In your Supabase project settings:

1. Go to **Project Settings** → **Authentication**
2. Look for **"Email Confirmation"** settings
3. Or add to your `.env.local`:
   \`\`\`
   SUPABASE_AUTH_EMAIL_CONFIRM=false
   \`\`\`

---

## Testing the Auto-Login Flow

After configuring Supabase:

1. **Go to**: http://localhost:3000/signup
2. **Sign up** with a new @mondragonmexico.edu.mx email
3. **Expected flow**:
   - ✅ Form submits
   - ✅ Account created
   - ✅ User automatically logged in
   - ✅ Redirected to `/diagnostic-quiz` in 0.5 seconds

4. **Check browser console** for:
   \`\`\`
   ✅ User signed up and session created - auto-login successful
   🚀 Auto-login successful - redirecting to diagnostic quiz...
   \`\`\`

---

## What I Changed in Your Code

### `/src/app/signup/actions.ts`:
- Added check for `data?.session` after signup
- If session exists → return `'AUTO_LOGIN_SUCCESS'` message

### `/src/app/signup/page.tsx`:
- Added `useRouter` hook
- Added `useEffect` to detect `'AUTO_LOGIN_SUCCESS'`
- Automatically redirects to `/diagnostic-quiz` when detected

---

## Recommendation

For your use case (university course with Mondragón emails only), I recommend **Option 1** (Disable Email Confirmation entirely). It's:
- ✅ Simple to set up
- ✅ Works immediately
- ✅ Good UX for students
- ✅ Secure enough (you're already restricting to @mondragonmexico.edu.mx)

---

## Troubleshooting

### If auto-login doesn't work:

1. **Check Supabase logs**: Dashboard → Logs → Auth Logs
2. **Check browser console** for errors
3. **Verify**: Go to Supabase Dashboard → Authentication → Users → Check if users are created with `email_confirmed_at` set

### If you see "Check your email" message:

- Email confirmation is still enabled in Supabase
- Follow Option 1 or Option 2 above to disable it

---

## Current Status

✅ Code is ready for auto-login
⏳ Waiting for Supabase configuration (choose Option 1 or 2)

Once you configure Supabase, the auto-login will work immediately!



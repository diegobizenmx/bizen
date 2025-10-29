# Supabase Authentication Setup Guide

This project now includes complete Supabase authentication with login, signup, email verification, and password reset functionality.

## 🚀 Features Implemented

### ✅ Authentication Features
- **User Registration** with email verification
- **User Login** with email/password
- **Email Verification** via magic links
- **Password Reset** functionality
- **Protected Routes** with automatic redirects
- **Session Management** with persistent login
- **Error Handling** with user-friendly messages

### ✅ Pages Created/Updated
- `/login` - User login page
- `/signup` - User registration page
- `/reset-password` - Password reset page
- `/auth/callback` - Email verification callback
- `/dashboard` - Protected dashboard (requires authentication)

## 🔧 Configuration Required

### 1. Supabase Dashboard Setup

1. **Go to your Supabase project dashboard**
2. **Navigate to Authentication > Settings**
3. **Configure the following:**

#### Site URL
```
http://localhost:3000 (for development)
https://yourdomain.com (for production)
```

#### Redirect URLs
```
http://localhost:3000/auth/callback
https://yourdomain.com/auth/callback
```

#### Email Templates
- Customize the email verification template
- Customize the password reset template
- Set your app name and branding

### 2. Environment Variables

Make sure your `.env.local` file contains:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Prisma Database Configuration
DATABASE_URL="postgresql://postgres:[password]@[host]:[port]/[database]?schema=public"
DIRECT_URL="postgresql://postgres:[password]@[host]:[port]/[database]?schema=public"
```

### 3. Database Setup

Run the following commands to set up your database:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

## 📱 How It Works

### Authentication Flow

1. **Registration:**
   - User fills out signup form
   - Account created with email verification required
   - Verification email sent automatically
   - User clicks link in email → redirected to `/auth/callback`
   - Email verified → redirected to dashboard

2. **Login:**
   - User enters email/password
   - Session created if credentials valid
   - Redirected to dashboard

3. **Password Reset:**
   - User clicks "Forgot password" on login page
   - Reset email sent with magic link
   - User clicks link → redirected to reset password page
   - New password set → redirected to dashboard

4. **Protected Routes:**
   - Dashboard requires authentication
   - Unauthenticated users redirected to login
   - Loading state shown during auth check

## 🛠️ Components Created

### AuthContext (`src/contexts/AuthContext.tsx`)
- Centralized authentication state management
- Provides auth methods: `signUp`, `signIn`, `signOut`, `resetPassword`
- Handles session persistence and auth state changes

### ProtectedRoute (`src/components/ProtectedRoute.tsx`)
- Higher-order component for protecting routes
- Shows loading state during auth check
- Redirects unauthenticated users to login

### Updated Pages
- **Login Page:** Uses AuthContext, handles error messages
- **Signup Page:** Email verification flow, password strength indicator
- **Dashboard:** Protected route with user info and logout
- **Reset Password:** Password update form (requires verification)

## 🔒 Security Features

- **Email Verification:** Required for new accounts
- **Secure Password Reset:** Via email magic links
- **Session Management:** Automatic token refresh
- **Protected Routes:** Server-side and client-side protection
- **Error Handling:** No sensitive information exposed

## 🧪 Testing the Authentication

### 1. Test Registration
1. Go to `/signup`
2. Fill out the form with a valid email
3. Check your email for verification link
4. Click the link to verify your account
5. You should be redirected to the dashboard

### 2. Test Login
1. Go to `/login`
2. Enter your verified email and password
3. You should be redirected to the dashboard

### 3. Test Password Reset
1. Go to `/login`
2. Click "Forgot password"
3. Enter your email
4. Check your email for reset link
5. Click the link to reset your password

### 4. Test Protected Routes
1. Try accessing `/dashboard` without being logged in
2. You should be redirected to `/login`
3. After logging in, you should be able to access the dashboard

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid login credentials"**
   - Check if email is verified
   - Verify password is correct
   - Check Supabase logs for more details

2. **Email not received**
   - Check spam folder
   - Verify email configuration in Supabase
   - Check if email domain is blocked

3. **Redirect loops**
   - Verify Site URL and Redirect URLs in Supabase settings
   - Check environment variables are correct

4. **Database connection issues**
   - Verify DATABASE_URL is correct
   - Check if Prisma schema matches your database
   - Run `npx prisma db push` to sync schema

### Debug Mode

To enable debug logging, add this to your environment:

```env
NEXT_PUBLIC_SUPABASE_DEBUG=true
```

## 📚 Next Steps

1. **Customize Email Templates** in Supabase dashboard
2. **Add User Profile Management** (update profile, change password)
3. **Implement Role-Based Access Control** if needed
4. **Add Social Login** (Google, GitHub, etc.)
5. **Set up Email Templates** with your branding

## 🔗 Useful Links

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Authentication Patterns](https://nextjs.org/docs/authentication)
- [Prisma with Supabase](https://supabase.com/docs/guides/integrations/prisma)

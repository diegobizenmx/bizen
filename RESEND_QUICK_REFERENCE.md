# 🚀 Resend Quick Reference Card

## ⚡ Setup (One Time)

```bash
# 1. Create .env.local
echo 'RESEND_API_KEY=your_resend_api_key_here' > .env.local

# 2. Restart dev server
npm run dev
```

---

## 📧 Send Emails (Copy & Paste)

### Welcome Email
```typescript
import { sendBizenWelcomeEmail } from '@/lib/emails/welcome-email';

await sendBizenWelcomeEmail(
  'user@email.com',
  'User Name',
  'https://yourdomain.com/dashboard'
);
```

### Password Reset Email
```typescript
import { sendPasswordResetEmail } from '@/lib/emails/password-reset-email';

await sendPasswordResetEmail(
  'user@email.com',
  'User Name',
  'https://yourdomain.com/reset-password?token=abc123'
);
```

### Course Completion Email
```typescript
import { sendCourseCompletionEmail } from '@/lib/emails/course-completion-email';

await sendCourseCompletionEmail(
  'user@email.com',
  'User Name',
  'Module Name',
  new Date().toLocaleDateString('es-MX'),
  'https://yourdomain.com/dashboard',
  'https://yourdomain.com/next-module' // optional
);
```

### Custom Email (Direct)
```typescript
import { resend } from '@/lib/resend';

await resend.emails.send({
  from: 'BIZEN <onboarding@resend.dev>',
  to: 'user@email.com',
  subject: 'Subject',
  html: '<h1>Content</h1>',
});
```

---

## 🔗 API Endpoints

### Welcome Email
```bash
POST /api/send-welcome-email
{
  "email": "user@email.com",
  "name": "User Name",
  "dashboardUrl": "https://yourdomain.com/dashboard"
}
```

### Generic Email
```bash
POST /api/send-email
{
  "to": "user@email.com",
  "subject": "Subject",
  "html": "<h1>Content</h1>",
  "from": "BIZEN <sender@resend.dev>"  // optional
}
```

---

## 🧪 Quick Test

### Test via curl
```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"your@email.com","subject":"Test","html":"<h1>Works!</h1>"}'
```

### Test via Browser Console
```javascript
fetch('/api/send-email', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    to: 'your@email.com',
    subject: 'Test',
    html: '<h1>It works!</h1>'
  })
}).then(r => r.json()).then(console.log);
```

---

## 📁 File Locations

```
Email Templates:
  src/lib/emails/welcome-email.tsx
  src/lib/emails/password-reset-email.tsx
  src/lib/emails/course-completion-email.tsx

API Routes:
  src/app/api/send-welcome-email/route.ts
  src/app/api/send-email/route.ts

Config:
  src/lib/resend.ts
  .env.local

Docs:
  RESEND_SETUP.md              (Full guide)
  RESEND_TEST_GUIDE.md         (Testing)
  RESEND_INTEGRATION_SUMMARY.md (Overview)
```

---

## ✅ Status Check

- [ ] Created `.env.local`
- [ ] Restarted dev server
- [ ] Tested signup → welcome email
- [ ] Emails arriving in inbox
- [ ] Checked Resend dashboard

---

## 🔧 Troubleshooting One-Liners

```bash
# Check if .env.local exists
ls -la .env.local

# View .env.local contents (verify API key)
cat .env.local

# Test if env var is loaded (run after server starts)
# In your code: console.log(process.env.RESEND_API_KEY)

# Tail server logs for email activity
# Look for: "Welcome email sent successfully"
```

---

## 🎯 What's Already Working

✅ **Automatic welcome emails** on signup verification  
✅ **3 email templates** ready to use  
✅ **2 API endpoints** for sending emails  
✅ **Full documentation** available  

---

## 🌐 Production Checklist

- [ ] Verify domain in Resend dashboard
- [ ] Update `from:` addresses to your domain
- [ ] Add auth to `/api/send-email`
- [ ] Add rate limiting
- [ ] Test deliverability (Gmail, Outlook, etc.)
- [ ] Monitor email stats in Resend dashboard

---

## 📊 Current Limits (Free Tier)

- 100 emails/day
- 3,000 emails/month
- Test domain: `@resend.dev`

---

## 🔗 Quick Links

- [Resend Dashboard](https://resend.com/emails)
- [Resend Docs](https://resend.com/docs)
- [View Email Logs](https://resend.com/emails)
- [Upgrade Plan](https://resend.com/pricing)

---

## 💡 Pro Tips

1. **Test with your own email** - Don't use random emails
2. **Check spam folder** - Emails from `@resend.dev` often land there
3. **Monitor Resend dashboard** - See delivery status in real-time
4. **Save this file** - Keep it handy for quick reference!

---

**Need help?** See `RESEND_SETUP.md` for detailed instructions.

**Ready to test?** See `RESEND_TEST_GUIDE.md` for step-by-step testing.


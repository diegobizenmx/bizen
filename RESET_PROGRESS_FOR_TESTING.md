# 🔄 Reset Your Progress for Testing

## What I Just Fixed

✅ **Removed temporary workarounds** - Real database checks are now active
✅ **Fixed section unlocking** - Completing a section now unlocks the next one
✅ **Proper gating restored** - Sections are locked until you complete previous ones

## How to Test Like a Real User

### Step 1: Clear Browser Data

**Option A - Clear Everything (Recommended):**
1. Open your browser's DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Clear storage** or **Clear site data**
4. Check all boxes
5. Click **Clear** or **Clear site data**

**Option B - Clear Just localStorage:**
1. Open DevTools (F12)
2. Go to **Console** tab
3. Run this command:
   ```javascript
   localStorage.clear()
   location.reload()
   ```

### Step 2: Reset Database Progress

**Option A - Use SQL (Clean Slate):**

Run this in Supabase SQL Editor:

```sql
-- Replace YOUR_USER_ID with your actual user ID
-- Find your user ID: SELECT id, email FROM auth.users;

DELETE FROM page_visits WHERE user_id = 'YOUR_USER_ID';
DELETE FROM quiz_attempts WHERE user_id = 'YOUR_USER_ID';
DELETE FROM quiz_answers WHERE quiz_attempt_id IN (
  SELECT id FROM quiz_attempts WHERE user_id = 'YOUR_USER_ID'
);
DELETE FROM section_completions WHERE user_id = 'YOUR_USER_ID';
DELETE FROM user_module_progress WHERE user_id = 'YOUR_USER_ID';
DELETE FROM user_section_completion WHERE user_id = 'YOUR_USER_ID';

-- Verify it's clean
SELECT * FROM user_module_progress WHERE user_id = 'YOUR_USER_ID';
```

**Option B - Use the Reset API (If you have it):**
```bash
curl -X POST http://localhost:3000/api/progress/reset \
  -H "Content-Type: application/json"
```

### Step 3: Restart Your Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 4: Login Again

1. Go to http://localhost:3000
2. Login with your account
3. Start from Module 1, Section 1

## Expected Behavior (Real User Experience)

### ✅ Module 1, Section 1 (M1S1)
- **Status:** Unlocked (always accessible)
- **Can access:** Yes
- **Reason:** First section is always available

### 🔒 Module 1, Section 2 (M1S2)  
- **Status:** Locked (until M1S1 complete)
- **Can access:** No
- **Should see:** Lock screen with message

### After Completing M1S1:
- **M1S1:** Completed ✅
- **M1S2:** Unlocked 🔓
- **M1S3:** Still locked 🔒

### After Completing M1S2:
- **M1S1:** Completed ✅
- **M1S2:** Completed ✅
- **M1S3:** Unlocked 🔓
- **M1S4:** Still locked 🔒

## How Section Unlocking Works Now

```
User completes M1S1
  ↓
Clicks "Mark Complete" button
  ↓
API marks section complete
  ↓
API updates user_module_progress
  ↓
Sets unlockedSection = 2
  ↓
M1S2 is now accessible! 🔓
```

## Testing Checklist

Test these scenarios:

1. ✅ Try accessing M1S2 before completing M1S1 → Should see lock screen
2. ✅ Complete all pages in M1S1
3. ✅ Complete all quizzes in M1S1
4. ✅ Click "Mark Complete" (or similar button)
5. ✅ Try accessing M1S2 → Should now work!
6. ✅ Try accessing M1S3 → Should still be locked
7. ✅ Complete M1S2
8. ✅ Try accessing M1S3 → Should now work!

## Finding Your User ID

Run this in Supabase SQL Editor:

```sql
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 10;
```

Copy your user ID (it looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

## Quick Reset Script

Save this as a bookmark in your browser:

```javascript
javascript:(function(){if(confirm('Clear all progress and reload?')){localStorage.clear();location.reload();}})();
```

Click it anytime to clear localStorage and reload!

## Troubleshooting

**M1S3 is still unlocked after reset:**
- Clear localStorage again
- Check database progress (run the DELETE queries)
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

**Can't access any sections:**
- Check console for errors
- Verify SQL migration ran successfully
- Make sure dev server restarted

**Progress not saving:**
- Check console for API errors
- Verify database connection
- Check RLS policies are properly set

## Console Messages to Look For

When working correctly:
```
🔍 Checking access for M1S2
📊 Module 1 progress: { unlockedSection: 1 }
✨ Section 2 LOCKED (unlocked up to: 1)
```

After completing M1S1:
```
✅ Section M1S1 completed! Unlocking next section...
🔓 Unlocked section 2 for module 1
```



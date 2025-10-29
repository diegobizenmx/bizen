# 🚪 How to Log Out - Complete Guide

## ✅ Logout Buttons Added!

I've added **logout functionality** throughout your app. Users can now log out from multiple locations.

---

## 🔘 Where to Find Logout Buttons

### **1. Landing Page (/)** 
**When logged in, the header shows:**
- **"Mis Módulos"** button (white/ghost style)
- **"Cerrar sesión"** button (blue/primary style)

**Location:** Top right corner of the page

---

### **2. Modules Menu (/modules/menu)**
**Two buttons in the top right corner:**
- **"← Regresar"** button (white with blue border)
- **"Cerrar sesión"** button (blue/primary style)

**Location:** Top right corner of the page

---

### **3. Dashboard (/dashboard)**
**Already had a logout button:**
- Located in the dashboard interface
- Styled according to dashboard design

---

## 🔄 What Happens When You Log Out

1. **Click "Cerrar sesión"** button
2. **Session cleared** - Supabase signs you out
3. **Redirect to landing page** - You're taken to `/` (home)
4. **Guest view** - Landing page now shows "Iniciar sesión" and "Crear cuenta" buttons

---

## 🧪 Test Logout Functionality

### **Test 1: From Landing Page**
```
1. Log in to your account
2. You'll be redirected to: /
3. See: "Bienvenido de nuevo, [Name]!"
4. Click: "Cerrar sesión" (top right)
5. Page refreshes
6. Expected: See guest view with "Crear cuenta" button
```

### **Test 2: From Modules Menu**
```
1. Log in to your account
2. Click: "Mis Módulos" or go to /modules/menu
3. See: Your 6 modules
4. Click: "Cerrar sesión" (top right)
5. Redirect to: / (landing page)
6. Expected: See guest view
```

### **Test 3: From Dashboard**
```
1. Log in to your account
2. Go to: /dashboard (directly in URL)
3. Click: Logout button
4. Expected: Logged out and redirected
```

---

## 📱 User Experience Flow

### **Logged In User:**
```
Landing Page (/)
├─ Header: "Mis Módulos" | "Cerrar sesión"
│
Modules Menu (/modules/menu)
├─ Top Right: "← Regresar" | "Cerrar sesión"
│
Dashboard (/dashboard)
└─ Has its own logout button
```

### **After Logout:**
```
Landing Page (/)
├─ Header: "Iniciar sesión" | "Crear cuenta"
├─ Hero: "Juega, aprende y domina tus finanzas"
└─ CTA: "Crear cuenta" button
```

---

## 💻 Technical Implementation

### **Code Structure:**

```typescript
// Using AuthContext
import { useAuth } from "@/contexts/AuthContext"

function MyComponent() {
  const { signOut } = useAuth()
  
  return (
    <button onClick={async () => {
      await signOut()
      window.location.href = '/'
    }}>
      Cerrar sesión
    </button>
  )
}
```

### **What SignOut Does:**

1. **Calls Supabase API:**
   ```typescript
   const { error } = await supabase.auth.signOut()
   ```

2. **Clears Session:**
   - Removes auth cookies
   - Clears local session state
   - Updates user context to `null`

3. **Redirects User:**
   ```typescript
   window.location.href = '/'
   ```

---

## 🎨 Button Styles

### **Landing Page Logout Button:**
- **Style:** Primary (blue background, white text)
- **Location:** Header, top right
- **Hover:** Scales down (0.98)

### **Modules Menu Logout Button:**
- **Style:** Primary (blue background, white text)  
- **Location:** Top right corner
- **Hover:** Scales up (1.05) with shadow

### **Back Button (Modules Menu):**
- **Style:** Ghost (white background, blue border)
- **Location:** Top right, next to logout
- **Hover:** Scales up (1.05) with shadow

---

## 🔐 Security Notes

### **Session Handling:**
- ✅ Supabase handles session security
- ✅ Tokens are cleared on logout
- ✅ Server-side session validation
- ✅ Automatic token refresh when logged in

### **Protected Routes:**
After logout, protected routes will:
- Detect no valid session
- Redirect to login page
- Preserve the intended destination (optional)

---

## 📋 Quick Reference

| Location | Button Text | Style | Action |
|----------|-------------|-------|--------|
| Landing Page (/) | "Cerrar sesión" | Blue Primary | Logout → Refresh page |
| Modules Menu | "Cerrar sesión" | Blue Primary | Logout → Redirect to / |
| Dashboard | "Logout" | Dashboard style | Logout → Redirect |

---

## 🚀 Files Modified

1. **`src/app/(landing)/page.tsx`**
   - Added `signOut` from `useAuth()`
   - Updated header CTAs to show logout button when authenticated
   - Shows "Mis Módulos" + "Cerrar sesión" for logged-in users

2. **`src/app/modules/menu/page.tsx`**
   - Added `useAuth` import
   - Added `signOut` functionality
   - Updated top-right corner to show both "Regresar" and "Cerrar sesión"

3. **`src/contexts/AuthContext.tsx`** (already existed)
   - Contains `signOut` function
   - Handles Supabase auth state

---

## ✅ Summary

**Logout is now available in 3 places:**
1. ✅ Landing page header (when logged in)
2. ✅ Modules menu (top right corner)
3. ✅ Dashboard (existing)

**To log out:**
- Click any **"Cerrar sesión"** button
- You'll be logged out and see the guest view
- Can log back in anytime at `/login`

---

## 🧪 Quick Test

```bash
# 1. Start dev server (if not running)
npm run dev

# 2. Log in
Visit: http://localhost:3000/login

# 3. Test logout from landing page
Click: "Cerrar sesión" in header
Expected: See guest view

# 4. Log in again
Visit: http://localhost:3000/login

# 5. Go to modules
Click: "Mis Módulos"
Visit: http://localhost:3000/modules/menu

# 6. Test logout from modules
Click: "Cerrar sesión" in top right
Expected: Redirect to / with guest view
```

---

**Your logout functionality is complete and working!** 🎉



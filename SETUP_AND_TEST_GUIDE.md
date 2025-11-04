# 🚀 BIZEN Platform - Complete Setup & Test Guide

## ✅ What's Ready

- ✅ Database schema (19 tables)
- ✅ All pages built (student/teacher/admin)
- ✅ 38 API endpoints
- ✅ Monopoly-board learning path
- ✅ Role-based security
- ✅ Auto-profile creation on signup
- ✅ Demo seed script ready

---

## 📋 Step-by-Step Setup (15 minutes)

### **Step 1: Run Database Migration** (2 min)

Open terminal and run:

```bash
cd /Users/diegopenasanchez/BIZEN

# Create all 19 tables in your database
npx prisma migrate dev --name init_bizen_platform

# Generate Prisma client
npx prisma generate
```

**You'll see:**
```
✔ Created migration: 20250103_init_bizen_platform
✔ Applied migration successfully
✔ Generated Prisma Client
```

---

### **Step 2: Seed Demo Data** (1 min)

Run the seed script to create test content:

```bash
npm run seed:demo
```

**This creates:**
- ✅ 1 Demo School ("Demo High School")
- ✅ 1 License (100 seats, annual plan)
- ✅ 1 Course ("Fundamentos de Finanzas Personales")
- ✅ 1 Unit ("Introducción a las Finanzas")
- ✅ **12 Lessons** (for monopoly board!)
- ✅ 6 Quizzes (with 18 questions total)
- ✅ 2 Assignments

---

### **Step 3: Start Development Server** (30 sec)

```bash
npm run dev
```

**Server starts at:** http://localhost:3000

---

### **Step 4: Create Your Account** (2 min)

1. Visit: http://localhost:3000
2. Click **"Empieza Ahora"**
3. Redirects to http://localhost:3000/login
4. Click **"Crear cuenta"**
5. Fill form:
   - Name: Your Name
   - Email: your@email.com
   - Password: (at least 6 chars)
   - Check "Acepto términos"
6. Click **"Registrarme"**
7. Check email → Click verification link
8. **Profile auto-creates** as "student" ✨

---

### **Step 5: Test the Monopoly Board!** (5 min)

After login, you'll see:

#### Dashboard (`/dashboard`)
- Stats cards (courses, lessons, streak, points)
- "Siguiente Lección" card
- Click **"Ver Mapa de Unidad"** or **"Mapa de Aprendizaje"**

#### Path View (`/path`)
- Vertical list of units (Duolingo-style)
- Click **"Unidad 1: Introducción a las Finanzas"** card

#### **🎲 Monopoly Board** (`/unit/demo-unit-1`)
- **YOU'LL SEE:**
  - Game board with 12 lesson squares arranged in a path
  - Squares have icons (📖 📝 ✏️ 🎥)
  - Blue squares = available
  - Gray squares = locked (complete previous first)
  - SVG connectors between lessons

- **CLICK ANY BLUE SQUARE:**
  - Beautiful modal pops up
  - Shows lesson details
  - Lists quiz/assignment if included
  - Click **"Comenzar Lección →"**

#### Lesson Player (`/learn/...`)
- Sample lesson content
- Navigation buttons
- Click **"Ir al Quiz →"**

#### Quiz Interface (`/quiz/...`)
- 3 sample questions
- Multiple choice
- Submit → See score
- Returns to monopoly board

#### Back to Board
- Completed lesson turns **GREEN** ✓
- Next lesson **UNLOCKS** (blue)
- Progress bar updates!

---

## 🎯 Full Test Flow (10 min walkthrough)

### **Test Journey:**

```
1. Homepage (/)
   ↓ Click "Empieza Ahora"
   
2. Login (/login)
   ↓ Click "Crear cuenta"
   
3. Signup (/signup)
   ↓ Fill form → Submit
   ↓ Verify email
   
4. Welcome (/welcome)
   ↓ Billy says "¡Bienvenidos a BIZEN!"
   ↓ Auto-redirects
   
5. Dashboard (/dashboard)
   ↓ See stats, next lesson
   ↓ Click "Mapa de Aprendizaje"
   
6. Path (/path)
   ↓ See "Unidad 1" card
   ↓ Click card
   
7. 🎲 MONOPOLY BOARD (/unit/demo-unit-1)
   ↓ See 12 lesson squares in game board layout
   ↓ Click Lesson 1 square
   ↓ Modal opens with details
   ↓ Click "Comenzar Lección"
   
8. Lesson Player (/learn/...)
   ↓ Read lesson content
   ↓ Click "Ir al Quiz"
   
9. Quiz (/quiz/...)
   ↓ Answer 3 questions
   ↓ Submit
   ↓ See score (85%)
   ↓ Click "Continuar"
   
10. Back to Monopoly Board
    ✅ Lesson 1 now GREEN ✓
    ✅ Lesson 2 UNLOCKED (blue)
    ✅ Progress bar updated
    ↓ Click Lesson 2
    ↓ Repeat!
```

---

## 🎨 Visual Features to Test

### Monopoly Board:
- ✅ Hover over squares (they grow and lift)
- ✅ Click square (modal slides up with blur)
- ✅ Completed lessons show ✓ badge
- ✅ Locked lessons show 🔒 icon
- ✅ Path connectors animate
- ✅ Legend at bottom explains colors

### Modal:
- ✅ Smooth entrance animation
- ✅ Gradient header
- ✅ Content preview cards
- ✅ Multiple action buttons
- ✅ Click outside to close
- ✅ Close button (×)

### Responsive:
- ✅ Try on mobile (board scales)
- ✅ Squares remain tappable
- ✅ Modal adapts to screen

---

## 🔧 Useful Commands

### View Database (Visual UI):
```bash
npx prisma studio
```
Opens: http://localhost:5555
- Browse all tables
- Edit test data
- Delete/add records

### Reset Demo Data:
```bash
# Run migration (clears data)
npx prisma migrate reset

# Re-seed
npm run seed:demo
```

### Check Database:
```bash
# See all tables
npx prisma db pull

# Format schema
npx prisma format
```

---

## 🎯 After Testing - Replace Demo Content

### Option 1: Delete and Re-seed (Easiest)
```bash
# I'll create a new seed script with YOUR content
# You provide lessons/quizzes
# Run: npm run seed:production
```

### Option 2: Edit in Prisma Studio (Visual)
```bash
npx prisma studio
# Click "lessons" table
# Edit titles, content, order
# Save
```

### Option 3: Bulk Replace via Script
```typescript
// I can create a script that:
// 1. Reads your content from JSON/CSV
// 2. Deletes demo lessons
// 3. Creates your real lessons
```

### Option 4: Use Teacher UI (Gradual)
- Login as teacher (change your profile.role to "teacher")
- Visit `/teacher/courses`
- Create courses/units/lessons via UI
- (I can enhance the teacher UI to make this easier)

---

## 🐛 Troubleshooting

### "Profile not found" error?
```bash
# Check if profile exists:
npx prisma studio
# Go to "profiles" table
# Add row:
#   - userId: <your-auth-user-id>
#   - fullName: "Your Name"
#   - role: "student"
#   - schoolId: null
```

### Migration fails?
```bash
# Reset and try again:
npx prisma migrate reset
npx prisma migrate dev --name init_bizen_platform
npm run seed:demo
```

### Can't see monopoly board?
- Make sure seed ran successfully
- Check unit ID in URL matches 'demo-unit-1'
- Check browser console for errors

---

## 📊 Demo Data Details

### School:
- **ID:** `demo-school-1`
- **Name:** Demo High School
- **Seats:** 100

### Course:
- **ID:** `demo-course-1`
- **Title:** Fundamentos de Finanzas Personales
- **Level:** Beginner

### Unit:
- **ID:** `demo-unit-1`
- **Title:** Unidad 1: Introducción a las Finanzas
- **Lessons:** 12 (arranged on monopoly board)

### Lessons (in order on board):
1. ¿Qué es el Dinero? (📖 Reading + Quiz)
2. Historia del Dinero (🎥 Video + Quiz)
3. Tipos de Moneda (📖 Reading)
4. Sistemas Financieros (✏️ Exercise + Quiz)
5. Bancos Centrales (📖 Reading)
6. Inflación y Deflación (🎥 Video + Quiz)
7. Política Monetaria (📖 Reading)
8. Mercados Financieros (✏️ Exercise)
9. Tasas de Interés (📖 Reading + Quiz)
10. Proyecto Final Unidad 1 (✏️ Exercise)
11. Repaso General (📖 Reading)
12. Examen Unidad 1 (✏️ Exercise + Quiz)

**6 Quizzes** - Each with 3 multiple-choice questions

**2 Assignments:**
- Ensayo: La Importancia del Dinero (due in 7 days)
- Proyecto Final: Plan Financiero Personal (due in 14 days)

---

## 🎉 Success Checklist

After setup, you should be able to:

- [ ] Login with your account
- [ ] See dashboard with stats
- [ ] Navigate to `/path`
- [ ] Click Unit 1 card
- [ ] **See monopoly board with 12 lesson squares**
- [ ] Click a lesson square
- [ ] Modal opens with lesson details
- [ ] Start lesson
- [ ] Complete quiz
- [ ] Return to board
- [ ] See lesson marked as completed (green)
- [ ] Next lesson unlocked

**If all checked:** Platform is working perfectly! ✅

---

## 🚀 What's Next?

### You Decide:

**A. Love it? Add your content:**
- I build bulk upload system
- You paste 500+ lessons
- Platform ready for students

**B. Want changes? Tell me:**
- Different board layout
- More animations
- Custom themes
- New features

**C. Need help?**
- Ask me anything
- I can enhance any part
- Or build new features

---

## 💡 Pro Tips

### Testing Different Roles:
```bash
# In Prisma Studio:
# Change your profile.role to:
#   - "teacher" → Access /teacher/courses
#   - "school_admin" → Access /admin/licenses
#   - "student" → Access /dashboard, /path
```

### Adding More Content:
- Create more units (seed or API)
- Each unit gets its own monopoly board
- Add 20+ lessons per unit (board adapts!)

### Customization:
- Edit colors in component files
- Change icons (emoji or custom SVG)
- Adjust board size (currently 800×800)
- Add inner ring for 30+ lessons

---

## 📞 Ready to Test?

Run these 3 commands:

```bash
npx prisma migrate dev --name init_bizen_platform
npx prisma generate
npm run seed:demo
npm run dev
```

Then visit: http://localhost:3000

**You'll see your monopoly board in action!** 🎲🎉


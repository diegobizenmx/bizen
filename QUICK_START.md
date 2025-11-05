# ⚡ BIZEN Platform - Quick Start (5 Minutes)

## 🎯 What You'll Get

After following these steps, you'll have:
- ✅ Working BIZEN platform
- ✅ Monopoly-board learning path with 12 lessons
- ✅ Fully functional student experience
- ✅ Demo content you can test immediately

---

## 🚀 Setup (Run These Commands)

### 1. Create Database Tables
```bash
cd /Users/diegopenasanchez/BIZEN
npx prisma migrate dev --name init_bizen_platform
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. Seed Demo Content
```bash
npm run seed:demo
```

**This creates:**
- 1 Demo school
- 1 Course: "Fundamentos de Finanzas Personales"  
- 1 Unit: "Introducción a las Finanzas"
- **12 Lessons** (monopoly board layout!)
- 6 Quizzes with questions
- 2 Assignments

### 4. Start Server
```bash
npm run dev
```

**Visit:** http://localhost:3000

---

## 🎮 Test The Platform (5-min Tour)

### **Step 1: Signup**
1. Visit http://localhost:3000
2. Click **"Empieza Ahora"**
3. Click **"Crear cuenta"** 
4. Fill form and submit
5. Check email → Click verification link

### **Step 2: Welcome**
- Billy says **"¡Bienvenidos a BIZEN!"**
- Auto-redirects to dashboard in 5 seconds (or click "Continuar")

### **Step 3: Dashboard**
- See stats (courses, lessons, streak, points)
- See **"Siguiente Lección"** card
- Click **"Mapa de Aprendizaje"**

### **Step 4: Path View**
- See vertical list of units (Duolingo-style)
- **Click "Unidad 1: Introducción a las Finanzas"** card

### **Step 5: 🎲 MONOPOLY BOARD!**

**YOU'LL SEE:**
- Game board with **12 lesson squares**
- Squares arranged in a path around the board
- Icons showing content type (📖 reading, 🎥 video, ✏️ exercise)
- Blue squares = available to start
- Gray squares = locked (complete previous lessons first)
- SVG lines connecting the lessons

**CLICK LESSON 1 SQUARE:**
- Beautiful modal pops up
- Shows:
  - Lesson title: "¿Qué es el Dinero?"
  - Content type: Reading
  - Has quiz included
- Click **"Comenzar Lección →"**

### **Step 6: Lesson Player**
- See lesson content
- Read through it
- Click **"Ir al Quiz →"**

### **Step 7: Quiz**
- Answer 3 multiple-choice questions
- Click through with "Siguiente →"
- Submit quiz
- **See your score!**
- Click **"Continuar"**

### **Step 8: Back to Board**
**MAGIC HAPPENS:**
- ✅ Lesson 1 square turns **GREEN** with ✓ badge
- ✅ Lesson 2 **UNLOCKS** (turns blue)
- ✅ Progress bar updates
- Click Lesson 2 and repeat!

---

## 🎨 What to Notice

### Visual Features:
- Hover over lesson squares (they grow and lift)
- Smooth animations everywhere
- Progress updates in real-time
- Color-coded states (blue/green/gray)
- Professional UI with gradients

### Functional Features:
- Lessons unlock sequentially
- Progress tracked automatically
- Quiz scores saved
- Can revisit completed lessons
- Modal shows what's included before starting

---

## 🔄 Login Flow Fixed

**Before:** Login → `/bizen/dashboard` (placeholder page)
**Now:** Login → `/welcome` (Billy) → `/dashboard` (new platform)

All paths lead to your new monopoly-board platform! ✅

---

## 📊 Demo Content Included

### School: "Demo High School"
- 100 seats
- Annual license
- Active status

### Course: "Fundamentos de Finanzas Personales"
- Level: Beginner
- 1 Unit with 12 lessons

### 12 Lessons on Monopoly Board:
1. ¿Qué es el Dinero? (📖 + Quiz)
2. Historia del Dinero (🎥 + Quiz)
3. Tipos de Moneda (📖)
4. Sistemas Financieros (✏️ + Quiz)
5. Bancos Centrales (📖)
6. Inflación y Deflación (🎥 + Quiz)
7. Política Monetaria (📖)
8. Mercados Financieros (✏️)
9. Tasas de Interés (📖 + Quiz)
10. Proyecto Final Unidad 1 (✏️)
11. Repaso General (📖)
12. Examen Unidad 1 (✏️ + Quiz)

### 6 Quizzes:
- Each with 3 multiple-choice questions
- 4 options per question
- Pass score: 70%

---

## ✅ Success Checklist

After testing, you should have:
- [ ] Signed up and verified email
- [ ] Saw Billy welcome screen
- [ ] Navigated to dashboard
- [ ] Clicked "Mapa de Aprendizaje"
- [ ] Saw "Unidad 1" card on /path
- [ ] **Clicked unit → Saw monopoly board with 12 squares**
- [ ] Clicked Lesson 1 square → Modal opened
- [ ] Started lesson → Completed
- [ ] Took quiz → Got score
- [ ] Returned to board → Lesson 1 green, Lesson 2 unlocked

**All checked?** Platform working perfectly! 🎉

---

## 🎯 What's Next?

### **Demo content is just for TESTING!**

You can:

### Option A: Replace with Your Content (Bulk)
```bash
# I create a new seed script
# You paste your 500+ lessons
# Run: npm run seed:production
# Demo content replaced with yours
```

### Option B: Edit Demo Content
```bash
npx prisma studio
# Edit lesson titles, content
# Change quizzes, questions
# Keep structure, update text
```

### Option C: Add More Demo Units
- I can expand the seed to create 5-10 units
- Each with its own monopoly board
- Test with more content

---

## 🐛 If Something Goes Wrong

### Can't login?
- Make sure you verified your email
- Check Supabase dashboard for user

### Don't see monopoly board?
- Make sure seed ran: `npm run seed:demo`
- Check unit ID in URL: should be `demo-unit-1`
- Check browser console for errors

### No lessons showing?
```bash
# Re-run seed:
npm run seed:demo
```

### Database errors?
```bash
# Reset everything:
npx prisma migrate reset
npx prisma migrate dev --name init_bizen_platform
npx prisma generate
npm run seed:demo
```

---

## 🎉 You're Ready!

Run these 4 commands:
```bash
npx prisma migrate dev --name init_bizen_platform
npx prisma generate
npm run seed:demo
npm run dev
```

**Then visit:** http://localhost:3000

**See your monopoly board come to life!** 🎲✨




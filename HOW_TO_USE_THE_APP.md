# 🎓 How to Use BIZEN - Simple Flow Guide

## 📱 The App Has 3 Main Sections

### 1. **Student Area** (Learning)
- Dashboard
- Course catalog
- Learning paths
- Quizzes
- Assignments

### 2. **Teacher Area** (Content management)
- Create/edit courses
- View student analytics

### 3. **Admin Area** (School management)
- Manage licenses
- Enable/disable courses

---

## 🎯 STUDENT FLOW (The Main Experience)

This is what 99% of users will do:

### **🏠 Start: Dashboard** 
**URL:** `/dashboard`

**What you see:**
- 4 stat cards (courses, lessons, streak, points)
- "Siguiente Lección" card
- 4 quick action tiles

**What to do:**
- Click **"🗺️ Mapa de Aprendizaje"** tile

---

### **📍 Step 2: Path View**
**URL:** `/path`

**What you see:**
- Vertical list of units (like Duolingo)
- Each unit is a colored card showing:
  - Unit number badge
  - Unit title
  - Progress bar
  - Locked/unlocked status

**What to do:**
- Click any **unlocked unit card** (blue/green ones)
- **Locked units** (gray) = complete previous units first

---

### **🎲 Step 3: Monopoly Board (THE MAIN FEATURE!)**
**URL:** `/unit/[unitId]`

**What you see:**
- **Game board** with lesson squares arranged around the edges
- Each square shows:
  - Number (lesson order)
  - Icon (📖 reading, 🎥 video, ✏️ exercise)
  - Color (blue=available, green=done, gray=locked)

**What to do:**
1. **Click any blue square** (available lesson)
2. Modal opens showing:
   - Lesson title
   - What's included (content, quiz, assignment)
   - Action buttons
3. **Click "Comenzar Lección →"**

---

### **📖 Step 4: Lesson Player**
**URL:** `/learn/[courseId]/[unitId]/[lessonId]`

**What you see:**
- Lesson content (text, video, or exercise)
- Navigation buttons at bottom

**What to do:**
1. Read/watch the lesson content
2. Click **"Ir al Quiz →"** (if lesson has quiz)
3. OR click **"Siguiente Lección →"** (if no quiz)

---

### **📝 Step 5: Quiz**
**URL:** `/quiz/[quizId]`

**What you see:**
- One question at a time
- Multiple choice options
- Progress bar showing question X of Y

**What to do:**
1. Select an answer (click the option)
2. Click **"Siguiente →"** to go to next question
3. After last question, click **"Enviar Quiz ✓"**
4. See your score
5. Click **"Continuar →"**

**Result:**
- Automatically returns to monopoly board
- Lesson square turns **green** ✓
- Next lesson **unlocks** (turns blue)

---

### **🔁 Step 6: Repeat!**

Back on monopoly board:
- Click next unlocked lesson
- Complete it
- Take quiz
- Return to board
- Progress updates
- Keep going until all 12 lessons done!

---

## 🎯 SIMPLIFIED VISUAL FLOW

```
Dashboard
   ↓ Click "Mapa de Aprendizaje"
   
Path (Unit List)
   ↓ Click "Unidad 1"
   
🎲 MONOPOLY BOARD ← YOU SPEND MOST TIME HERE
   ↓ Click Lesson Square → Modal
   ↓ Click "Comenzar Lección"
   
Lesson Player
   ↓ Read content
   ↓ Click "Ir al Quiz"
   
Quiz
   ↓ Answer questions
   ↓ Submit
   
→ BACK TO MONOPOLY BOARD (lesson turns green, next unlocks)
   ↓ Click next lesson
   ↓ REPEAT LOOP
```

---

## 🧭 Navigation Tips

### **Always Available:**
- **Top left:** "← Volver" buttons (go back)
- **Dashboard:** Home base (see all stats)

### **From Dashboard, you can go to:**
- 🗺️ **Path** - See all units
- 📚 **Courses** - Browse course catalog
- 📝 **Assignments** - View/submit tasks
- 🏆 **Progress** - See certificates

### **The Core Loop:**
```
Dashboard → Path → Unit Board → Lesson → Quiz → Back to Board
                     ↑__________________________|
                          (This is the cycle)
```

---

## 📊 Pages Explained (Simple)

### Student Pages (What you use):

| Page | URL | Purpose |
|------|-----|---------|
| **Dashboard** | `/dashboard` | Home - see stats, start learning |
| **Path** | `/path` | List of all units (Duolingo-style) |
| **Monopoly Board** | `/unit/[id]` | See all lessons in a unit (game board) |
| **Lesson** | `/learn/...` | Read/watch lesson content |
| **Quiz** | `/quiz/[id]` | Take quiz after lesson |
| **Courses** | `/courses` | Browse available courses |
| **Assignments** | `/assignments` | See tasks due/submitted |
| **Progress** | `/progress` | View certificates & achievements |

### Teacher Pages (For content creators):

| Page | URL | Purpose |
|------|-----|---------|
| **My Courses** | `/teacher/courses` | Manage your courses |
| **Course Editor** | `/teacher/courses/[id]` | Edit units/lessons |
| **Analytics** | `/teacher/analytics` | Student performance data |

### Admin Pages (For school admins):

| Page | URL | Purpose |
|------|-----|---------|
| **School** | `/admin/schools/[id]` | School overview |
| **Licenses** | `/admin/licenses` | Manage seats/billing |
| **Courses** | `/admin/courses` | Enable/disable courses |

---

## 🎮 Think of It Like This:

### **Dashboard** = Main Menu
Your home base. See everything at a glance.

### **Path** = World Map
List of all units (like Duolingo's skill tree).

### **Monopoly Board** = Level Map
One board per unit. Shows all lessons in that unit.

### **Lesson** = Playing the Level
Actually learning the content.

### **Quiz** = Boss Fight
Test your knowledge after each lesson.

---

## 🎯 What Most Users Do (90% of time):

```
1. Login
2. Go to Dashboard
3. Click "Mapa de Aprendizaje"
4. Pick a unit
5. STAY ON MONOPOLY BOARD
   - Click lesson
   - Complete it
   - Take quiz
   - Return to board
   - Click next lesson
   - Repeat until unit done
6. Go back to Path
7. Pick next unit
8. Repeat
```

**The monopoly board is where the magic happens!** 🎲

---

## 🔑 Key Concept

### **Hierarchy:**
```
Course (e.g., "Financial Fundamentals")
  ↓
Units (e.g., "Unit 1", "Unit 2", "Unit 3"...)
  ↓
Lessons (e.g., Lesson 1, 2, 3... up to 12+ per unit)
  ↓
Content + Quiz + Assignment
```

**Each UNIT gets its own monopoly board** with all its lessons!

---

## 💡 Pro Tips

### **Lost? Go to Dashboard**
- Click logo or type `/dashboard`
- Reorient yourself
- See next lesson recommendation

### **Want overview? Go to Path**
- See all units
- Check which are locked/unlocked
- See overall progress

### **Ready to learn? Go to Unit Board**
- See all lessons visually
- Pick any unlocked lesson
- Complete in any order (if all unlocked)

### **Just want to browse? Go to Courses**
- See all available courses
- Enroll in new courses
- Check course descriptions

---

## 🎬 Try This Right Now

**5-Minute Test:**

1. **Go to:** http://localhost:3001/dashboard
2. **Click:** "🗺️ Mapa de Aprendizaje"
3. **You'll see:** "Unidad 1: Introducción a las Finanzas" card
4. **Click it**
5. **MONOPOLY BOARD APPEARS!** 🎲
6. **Click the first blue square** (Lesson 1)
7. Modal opens
8. **Click "Comenzar Lección →"**
9. Read content
10. **Click "Ir al Quiz →"**
11. Answer questions
12. Submit
13. **Back to board → Lesson 1 is now GREEN!**

**That's the full loop!** ✨

---

## 🤔 Still Confused?

Think of it as **3 zoom levels:**

### **Zoom Out (Path)** - Bird's eye view
See all units in the course (vertical list)

### **Zoom Medium (Monopoly Board)** - Unit view
See all 12 lessons in one unit (game board)

### **Zoom In (Lesson)** - Focused learning
One lesson at a time with content/quiz

**Most time spent:** Monopoly board level (completing lessons one by one)

---

## 🎯 Simple Mental Model

**Duolingo = vertical path of circles**
**BIZEN = Same, but each circle opens to a monopoly board!**

- Duolingo: Click circle → Do lesson
- BIZEN: Click unit → See board → Click square → Do lesson

**Extra layer = More lessons per unit (12 vs 1-3)**

---

## ✅ Quick Reference

**Just learning?** → Dashboard → Path → Unit Board → Lessons
**Browse courses?** → Dashboard → Courses
**Check assignments?** → Dashboard → Assignments  
**See progress?** → Dashboard → Progress

**Most used page:** The monopoly board! 🎲

**Does this help?** Tell me what's still confusing! 🚀



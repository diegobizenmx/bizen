# 🚀 Seed Script - Quick Start

## ⚡ 3 Steps to Add Content

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Edit Content

Open `seed/content.json` and add your courses:

```json
{
  "courses": [
    {
      "title": "Your Course Name",
      "description": "Course description here",
      "level": "Beginner",
      "isActive": true,
      "units": [
        {
          "title": "Module 1: Introduction",
          "order": 1,
          "isLocked": false,
          "lessons": [
            {
              "title": "Lesson 1: Getting Started",
              "contentType": "video",
              "order": 1
            }
          ]
        }
      ]
    }
  ]
}
```

### 3️⃣ Run Seed

```bash
npm run seed
```

**Done!** ✨ Your content is now in the database.

---

## 📝 What You Can Add

### Lessons
```json
{
  "title": "Lesson Title",
  "contentType": "video",  // or "reading" or "exercise"
  "order": 1
}
```

### Quizzes
```json
{
  "title": "Quiz Title",
  "passScore": 70,
  "totalPoints": 100,
  "questions": [
    {
      "type": "mcq",  // or "truefalse"
      "prompt": "Your question here?",
      "order": 1,
      "options": [
        { "text": "Answer A", "isCorrect": true },
        { "text": "Answer B", "isCorrect": false }
      ]
    }
  ]
}
```

### Assignments
```json
{
  "title": "Assignment Title",
  "type": "file",  // or "link" or "text"
  "points": 100
}
```

---

## 🔧 Commands

| Command | Description |
|---------|-------------|
| `npm run seed` | Add content to database |
| `npm run seed my-file.json` | Seed from specific file |
| `npm run seed:clear` | Delete all content (⚠️ careful!) |

---

## 📚 Full Documentation

See **SEED_SCRIPT_GUIDE.md** for complete documentation including:
- All available fields
- Full examples
- Troubleshooting
- Best practices

---

## 💡 Pro Tips

1. **Start small** - Create 1 course with 1-2 lessons first
2. **Use the template** - Copy `seed/content-template.json` as reference
3. **Validate JSON** - Use jsonlint.com if you get errors
4. **Version control** - Commit your content.json to Git
5. **Test often** - Run seed after each major change

---

## 🎯 Example: Add 5 Lessons in 30 Seconds

```json
{
  "courses": [{
    "title": "Quick Course",
    "level": "Beginner",
    "isActive": true,
    "units": [{
      "title": "Module 1",
      "order": 1,
      "isLocked": false,
      "lessons": [
        { "title": "Lesson 1", "contentType": "video", "order": 1 },
        { "title": "Lesson 2", "contentType": "reading", "order": 2 },
        { "title": "Lesson 3", "contentType": "video", "order": 3 },
        { "title": "Lesson 4", "contentType": "exercise", "order": 4 },
        { "title": "Lesson 5", "contentType": "reading", "order": 5 }
      ]
    }]
  }]
}
```

Then run:
```bash
npm run seed
```

**Boom!** 💥 5 lessons added instantly.

---

**Ready?** Edit `seed/content.json` and run `npm run seed`! 🚀


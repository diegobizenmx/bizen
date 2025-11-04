# 🌱 BIZEN Seed Script Guide

## What is This?

A **seed script** is an automated tool that populates your database with course content. Instead of manually creating courses, modules, lessons, and quizzes one-by-one, you define everything in a JSON file and run one command to create it all.

### Benefits

✅ **Speed**: Add 100+ lessons in seconds  
✅ **Version Control**: Your content lives in code (track changes with Git)  
✅ **Reusable**: Reset database? Just re-run the seed  
✅ **Team Friendly**: Others can review content changes  
✅ **Bulk Updates**: Change 50 lessons at once by editing JSON  

---

## 📁 File Structure

```
seed/
├── content.json           # 👈 YOUR CONTENT GOES HERE
├── content-template.json  # Example/reference template
├── seed.ts               # Main seed script (don't edit)
└── clear-content.ts      # Database wipe script (don't edit)
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Edit Your Content

Open `seed/content.json` and add your courses. See the template below for the structure.

### 3. Run the Seed Script

```bash
npm run seed
```

That's it! Your content is now in the database.

---

## 📝 Content Structure

### Basic Example

```json
{
  "courses": [
    {
      "title": "Business Fundamentals",
      "description": "Learn the basics of business",
      "level": "Beginner",
      "isActive": true,
      "units": [
        {
          "title": "Module 1: Introduction",
          "order": 1,
          "isLocked": false,
          "lessons": [
            {
              "title": "Lesson 1: What is Business?",
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

### Full Example with Everything

```json
{
  "courses": [
    {
      "title": "Business Fundamentals",
      "description": "Learn essential business concepts",
      "level": "Beginner",
      "isActive": true,
      "units": [
        {
          "title": "Module 1: Introduction to Business",
          "order": 1,
          "isLocked": false,
          "lessons": [
            {
              "title": "What is Business?",
              "contentType": "video",
              "order": 1,
              "objectives": [
                {
                  "title": "Understand business basics",
                  "description": "Learn what business is and why it matters"
                }
              ],
              "quizzes": [
                {
                  "title": "Business Basics Quiz",
                  "passScore": 70,
                  "totalPoints": 100,
                  "questions": [
                    {
                      "type": "mcq",
                      "prompt": "What is the primary goal of a business?",
                      "order": 1,
                      "options": [
                        { "text": "To make a profit", "isCorrect": true },
                        { "text": "To help people", "isCorrect": false },
                        { "text": "To create jobs", "isCorrect": false },
                        { "text": "To pay taxes", "isCorrect": false }
                      ]
                    },
                    {
                      "type": "truefalse",
                      "prompt": "All businesses need investors to start.",
                      "order": 2,
                      "options": [
                        { "text": "True", "isCorrect": false },
                        { "text": "False", "isCorrect": true }
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          "assignments": [
            {
              "title": "Business Plan Draft",
              "type": "file",
              "points": 100,
              "dueAt": null
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 📖 Field Reference

### Course Fields

| Field | Type | Required | Options | Description |
|-------|------|----------|---------|-------------|
| `title` | string | ✅ | - | Course name |
| `description` | string | ❌ | - | Course description |
| `level` | string | ✅ | Beginner, Intermediate, Advanced | Difficulty level |
| `isActive` | boolean | ✅ | true, false | Whether course is visible |
| `units` | array | ✅ | - | List of units (modules) |

### Unit Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Unit/module name |
| `order` | number | ✅ | Display order (1, 2, 3...) |
| `isLocked` | boolean | ✅ | Whether unit requires prerequisites |
| `lessons` | array | ✅ | List of lessons |
| `assignments` | array | ❌ | List of assignments (optional) |

### Lesson Fields

| Field | Type | Required | Options | Description |
|-------|------|----------|---------|-------------|
| `title` | string | ✅ | - | Lesson name |
| `contentType` | string | ✅ | video, reading, exercise | Type of lesson |
| `order` | number | ✅ | - | Display order |
| `objectives` | array | ❌ | - | Learning objectives (optional) |
| `quizzes` | array | ❌ | - | Quizzes for this lesson (optional) |

### Quiz Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Quiz name |
| `passScore` | number | ✅ | Minimum score to pass (e.g., 70) |
| `totalPoints` | number | ✅ | Total points possible (e.g., 100) |
| `questions` | array | ✅ | List of questions |

### Question Fields

| Field | Type | Required | Options | Description |
|-------|------|----------|---------|-------------|
| `type` | string | ✅ | mcq, truefalse, short | Question type |
| `prompt` | string | ✅ | - | The question text |
| `order` | number | ✅ | - | Display order |
| `options` | array | ✅ | - | Answer options |

### Option Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | ✅ | Answer text |
| `isCorrect` | boolean | ✅ | Whether this is the correct answer |

---

## 🔧 Commands

### Seed Content

```bash
# Seed from default content.json
npm run seed

# Seed from a specific file
npm run seed my-custom-content.json
```

### Clear All Content

⚠️ **WARNING**: This deletes ALL courses, lessons, quizzes, etc.

```bash
npm run seed:clear
```

This will ask for confirmation before deleting.

---

## 💡 Tips & Best Practices

### 1. Start Small

Don't try to create all content at once. Start with:
- 1 course
- 1-2 units
- 2-3 lessons
- 1 quiz

Test it, make sure it works, then expand.

### 2. Use the Template

Copy `content-template.json` to `content.json` and edit it. The template shows all available fields.

### 3. Version Control

Commit your `content.json` to Git! This lets you:
- Track changes over time
- Revert mistakes
- See who changed what
- Review content before publishing

### 4. Multiple Files

You can create different content files:
- `content-basic.json` - Basic course structure
- `content-full.json` - Complete with all quizzes
- `content-test.json` - Testing data

Run them with: `npm run seed content-basic.json`

### 5. Validate Your JSON

Before running the seed:
1. Use a JSON validator (e.g., jsonlint.com)
2. Check for missing commas
3. Ensure all quotes are double quotes `"`
4. Verify required fields are present

---

## 🐛 Troubleshooting

### Error: "File not found"

Make sure `content.json` exists in the `seed/` directory.

### Error: "Invalid JSON"

Your JSON has syntax errors. Common issues:
- Missing comma between items
- Extra comma at end of list
- Single quotes instead of double quotes
- Unclosed brackets

Use a JSON validator to find the issue.

### Error: "Invalid data structure"

The JSON doesn't match the expected format. Make sure:
- Top level has `"courses": []`
- All required fields are present
- Field names are spelled correctly

### Seed Runs But Content Doesn't Appear

1. Check the console output - did it actually create content?
2. Verify your database connection in `.env`
3. Try running `npm run seed:clear` then `npm run seed` again

---

## 🎯 Example Workflow

### Day-to-Day Content Updates

1. **Edit** `seed/content.json`
   ```json
   {
     "courses": [
       {
         "title": "My New Course",
         ...
       }
     ]
   }
   ```

2. **Clear old content** (optional)
   ```bash
   npm run seed:clear
   ```

3. **Seed new content**
   ```bash
   npm run seed
   ```

4. **Refresh your app** and see the changes!

---

## 📚 Next Steps

1. Copy `content-template.json` to `content.json`
2. Edit `content.json` with your course content
3. Run `npm run seed`
4. Check your database/app to see the new content
5. Iterate and improve!

---

## 🆘 Need Help?

If you get stuck:
1. Check the error message carefully
2. Validate your JSON syntax
3. Compare your file to `content-template.json`
4. Try seeding just 1 simple course first
5. Check the console output for specific errors

---

## 🎉 You're Ready!

The seed script is set up and ready to use. Start adding your content and watch your platform come to life in seconds instead of hours!


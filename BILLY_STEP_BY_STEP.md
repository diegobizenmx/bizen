# 🎙️ Billy - Complete Step-by-Step Guide

## ✅ Your Images (Updated!)
- `/public/2.png` - Mouth closed (default)
- `/public/3.png` - Mouth open (when talking)

---

## 📍 WHERE TO PLACE BILLY (6 Options)

### Option 1: Bottom-Right Corner (Default - Best for most pages)
```tsx
<TalkingCharacter
  textToSpeak="Hello!"
  position="bottom-right"
/>
```
**Result:** Billy appears in bottom-right corner, doesn't block content

---

### Option 2: Bottom-Left Corner
```tsx
<TalkingCharacter
  textToSpeak="Hello!"
  position="bottom-left"
/>
```
**Result:** Billy appears in bottom-left corner

---

### Option 3: Top-Right Corner
```tsx
<TalkingCharacter
  textToSpeak="Hello!"
  position="top-right"
/>
```
**Result:** Billy appears in top-right corner

---

### Option 4: Top-Left Corner
```tsx
<TalkingCharacter
  textToSpeak="Hello!"
  position="top-left"
/>
```
**Result:** Billy appears in top-left corner

---

### Option 5: Center of Screen (Best for important messages)
```tsx
<TalkingCharacter
  textToSpeak="Hello!"
  position="center"
/>
```
**Result:** Billy appears in center, grabs attention

---

### Option 6: Inline with Your Content (Static)
```tsx
<div>
  <h1>My Title</h1>
  
  <TalkingCharacter
    textToSpeak="Hello!"
    position="static"
    width={150}
    height={150}
  />
  
  <p>My content here...</p>
</div>
```
**Result:** Billy appears exactly where you place him in your HTML

---

## 🎵 HOW TO ADD AUDIO (2 Ways)

---

## METHOD 1: Text-to-Speech (No Audio Files Needed!) ⚡

**Easiest method - Billy speaks using browser voice**

### Step 1: Add Billy to Any Page

Open any page file, for example: `src/app/(landing)/page.tsx`

### Step 2: Import the Component

At the top of the file:
```tsx
import TalkingCharacter from '@/components/TalkingCharacter'
```

### Step 3: Add Billy

Inside your component's return statement:
```tsx
<TalkingCharacter
  textToSpeak="¡Bienvenido a BIZEN! Estoy aquí para ayudarte."
  position="bottom-right"
  width={200}
  height={200}
/>
```

### Step 4: Done! ✅

Billy will appear and speak the text using the browser's voice.

**Example - Landing Page:**
```tsx
// src/app/(landing)/page.tsx
import TalkingCharacter from '@/components/TalkingCharacter'

export default function LandingPage() {
  return (
    <div>
      {/* Your existing content */}
      <h1>Welcome to BIZEN</h1>
      
      {/* Add Billy at the end */}
      <TalkingCharacter
        textToSpeak="¡Hola! Bienvenido a BIZEN. Vamos a aprender juntos."
        position="bottom-right"
        width={220}
        height={220}
        showControls={true}
      />
    </div>
  )
}
```

---

## METHOD 2: Custom Audio Files (Better Quality!) 🎵

**Use your own recorded audio for professional voice**

### Step 1: Prepare Your Audio

**Option A - Record Audio:**
1. Use your phone or computer microphone
2. Record Billy's message (keep it under 15 seconds)
3. Save as MP3

**Option B - Use Text-to-Speech Service:**
1. Go to: https://ttsmaker.com/ or https://elevenlabs.io/
2. Type your message
3. Choose Spanish voice
4. Download as MP3

**Option C - Hire Voice Actor:**
1. Use Fiverr or similar
2. Get professional voice recording
3. Save as MP3

### Step 2: Add Audio to Your Project

1. **Create audio folder** (if it doesn't exist):
```bash
mkdir -p public/audio
```

2. **Add your audio file:**
   - Copy your MP3 file to: `public/audio/`
   - Example: `public/audio/welcome.mp3`

**Your folder structure should look like:**
```
public/
  ├── billy.png
  ├── billy mouth open.png
  └── audio/
      ├── welcome.mp3
      ├── module1-intro.mp3
      └── quiz-correct.mp3
```

### Step 3: Use Audio in Billy

**Instead of `textToSpeak`, use `audioSrc`:**

```tsx
<TalkingCharacter
  audioSrc="/audio/welcome.mp3"
  position="bottom-right"
  width={200}
  height={200}
/>
```

### Step 4: Test It!

Save your file and Billy will play your audio with lip-sync!

---

## 🎯 COMPLETE EXAMPLES

### Example 1: Landing Page with Text-to-Speech

**File:** `src/app/(landing)/page.tsx`

```tsx
import TalkingCharacter from '@/components/TalkingCharacter'

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to BIZEN</h1>
      <p>Your learning platform</p>
      
      {/* Billy welcomes visitors */}
      <TalkingCharacter
        textToSpeak="¡Bienvenido a BIZEN! Descubre cursos increíbles."
        position="bottom-right"
        width={200}
        height={200}
        showControls={true}
        draggable={true}
      />
    </div>
  )
}
```

**What happens:**
- Billy appears in bottom-right corner
- Shows play button (users can click to hear)
- Can be dragged around by users
- Speaks using browser voice

---

### Example 2: Module Page with Audio File

**File:** `src/components/bizen/m1s1/Section1Pages.tsx`

First, add your audio file: `public/audio/module1-welcome.mp3`

Then:

```tsx
import TalkingCharacter from '@/components/TalkingCharacter'

export default function Module1Section1() {
  return (
    <div>
      <h1>Módulo 1: Identidad Digital</h1>
      
      {/* Billy plays audio file */}
      <TalkingCharacter
        audioSrc="/audio/module1-welcome.mp3"
        position="bottom-right"
        width={250}
        height={250}
        autoPlay={false}
        showControls={true}
      />
      
      {/* Your module content */}
    </div>
  )
}
```

**What happens:**
- Billy appears with your custom audio
- Mouth moves in sync with audio volume
- Users can play/pause
- Professional voice quality

---

### Example 3: Interactive Button

**File:** Any component

```tsx
import { useState } from 'react'
import TalkingCharacter from '@/components/TalkingCharacter'

export default function MyPage() {
  const [message, setMessage] = useState('')
  
  return (
    <div>
      <button onClick={() => setMessage('¡Muy bien hecho!')}>
        Get Encouragement
      </button>
      
      <button onClick={() => setMessage('Sigue intentando, tú puedes.')}>
        Get Support
      </button>
      
      {/* Billy speaks when message changes */}
      {message && (
        <TalkingCharacter
          key={message}  // Force re-render
          textToSpeak={message}
          position="center"
          autoPlay={true}
          showControls={false}
        />
      )}
    </div>
  )
}
```

**What happens:**
- Click buttons to make Billy say different things
- Billy appears in center
- Auto-plays when message changes

---

### Example 4: Quiz Feedback

**File:** Any quiz component

```tsx
import { useBilly } from '@/hooks/useBilly'
import TalkingCharacter from '@/components/TalkingCharacter'

export default function QuizPage() {
  const billy = useBilly()
  
  const checkAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      billy.speak('¡Correcto! Excelente trabajo.')
    } else {
      billy.speak('No es correcto, pero sigue intentando.')
    }
  }
  
  return (
    <div>
      <h2>Question 1</h2>
      
      <button onClick={() => checkAnswer(true)}>
        Answer A
      </button>
      
      <button onClick={() => checkAnswer(false)}>
        Answer B
      </button>
      
      {/* Billy appears when speaking */}
      <TalkingCharacter
        textToSpeak={billy.currentMessage || ''}
        position="bottom-right"
        showControls={false}
      />
    </div>
  )
}
```

**What happens:**
- Billy gives feedback on quiz answers
- Appears only when speaking
- No controls shown (cleaner UI)

---

## 🎨 CUSTOMIZATION OPTIONS

### Change Billy's Size
```tsx
<TalkingCharacter
  textToSpeak="Hello!"
  width={300}   // Bigger
  height={300}  // Bigger
/>
```

### Make Billy Draggable
```tsx
<TalkingCharacter
  textToSpeak="Hello!"
  draggable={true}  // Users can drag me!
/>
```

### Auto-Play on Page Load
```tsx
<TalkingCharacter
  textToSpeak="Hello!"
  autoPlay={true}  // Speaks immediately
/>
```

### Hide Controls
```tsx
<TalkingCharacter
  textToSpeak="Hello!"
  showControls={false}  // No play button
/>
```

### Adjust Voice Speed
```tsx
<TalkingCharacter
  textToSpeak="Hello!"
  speechRate={1.2}  // Faster (0.1 to 10)
  speechPitch={0.9}  // Lower pitch (0 to 2)
/>
```

### Adjust Lip-Sync Sensitivity
```tsx
<TalkingCharacter
  audioSrc="/audio/file.mp3"
  volumeThreshold={20}  // More sensitive (0-255)
/>
```

---

## 📂 RECOMMENDED AUDIO FILES

### Create these audio files for your course:

```
public/audio/
  ├── welcome.mp3                    "¡Bienvenido a BIZEN!"
  ├── modules/
  │   ├── m1-intro.mp3              "Bienvenido al Módulo 1"
  │   ├── m1-complete.mp3           "¡Felicidades! Módulo 1 completado"
  │   ├── m2-intro.mp3              "Módulo 2: Storytelling"
  │   └── m2-complete.mp3           "¡Excelente! Módulo 2 terminado"
  ├── quiz/
  │   ├── correct.mp3               "¡Correcto!"
  │   └── incorrect.mp3             "Inténtalo de nuevo"
  └── encouragement/
      ├── great-job.mp3             "¡Muy bien hecho!"
      └── keep-going.mp3            "Sigue adelante"
```

---

## 🚀 QUICK START CHECKLIST

### For Text-to-Speech (5 minutes):
- [ ] Open a page file (e.g., `src/app/(landing)/page.tsx`)
- [ ] Add import: `import TalkingCharacter from '@/components/TalkingCharacter'`
- [ ] Add component: `<TalkingCharacter textToSpeak="Hello!" position="bottom-right" />`
- [ ] Save and test!

### For Audio Files (15 minutes):
- [ ] Create folder: `public/audio/`
- [ ] Add audio file: `public/audio/welcome.mp3`
- [ ] Open a page file
- [ ] Add import: `import TalkingCharacter from '@/components/TalkingCharacter'`
- [ ] Add component: `<TalkingCharacter audioSrc="/audio/welcome.mp3" position="bottom-right" />`
- [ ] Save and test!

---

## 🐛 TROUBLESHOOTING

### Billy doesn't appear?
**Fix:**
1. Check import is correct: `import TalkingCharacter from '@/components/TalkingCharacter'`
2. Make sure component is inside your JSX return statement
3. Check browser console for errors (F12)

### Billy doesn't speak?
**Fix:**
1. Click the play button (some browsers block auto-play)
2. Check browser audio isn't muted
3. Try in Chrome or Safari

### Audio file doesn't play?
**Fix:**
1. Verify file exists: `public/audio/yourfile.mp3`
2. Check path starts with `/audio/` not `public/audio/`
3. Try smaller file (under 2MB)
4. Convert to MP3 format

### Mouth doesn't move?
**Fix:**
1. For text-to-speech: This is normal (random animation)
2. For audio files: Adjust `volumeThreshold={20}` (lower = more sensitive)
3. Make sure audio is playing

---

## 🎯 BEST PRACTICES

### ✅ DO:
- Use Billy for important moments (welcome, completion, feedback)
- Keep messages short (1-2 sentences)
- Give users control (show play button)
- Test on mobile devices
- Use audio files for better quality

### ❌ DON'T:
- Add Billy to every single page (annoying!)
- Use very long messages (boring)
- Auto-play without user consent (annoying)
- Block important content with Billy
- Use tiny or huge sizes

---

## 📱 MOBILE SUPPORT

Billy works great on mobile!

**Tips:**
- Position bottom-right works best on mobile
- Make size responsive if needed
- Test on iPhone and Android
- Ensure controls are touch-friendly

---

## 🎉 YOU'RE READY!

**Your Billy is configured to use:**
- ✅ `/billy.png` (mouth closed)
- ✅ `/billy mouth open.png` (mouth open)

**You can place Billy:**
- ✅ 6 different positions (bottom-right, center, etc.)
- ✅ Inline with your content
- ✅ Anywhere you want!

**You can add audio:**
- ✅ Text-to-speech (instant, no files)
- ✅ Custom audio files (better quality)

---

## 🚀 NEXT STEPS

1. **Right now:** Test the demo at `http://localhost:3000/billy-demo`
2. **In 5 minutes:** Add Billy to your landing page using text-to-speech
3. **Today:** Record or generate 1-2 audio files
4. **This week:** Add Billy to your module pages

---

## 💡 QUICK REFERENCE

### Text-to-Speech
```tsx
<TalkingCharacter
  textToSpeak="Your message"
  position="bottom-right"
/>
```

### Audio File
```tsx
<TalkingCharacter
  audioSrc="/audio/file.mp3"
  position="bottom-right"
/>
```

### Positions
- `"bottom-right"` - Default, best for most pages
- `"bottom-left"` - Alternative corner
- `"center"` - Important messages
- `"static"` - Inline with content

---

**Questions? Check the demo page or other guides!**

**Happy coding! 🎙️✨**


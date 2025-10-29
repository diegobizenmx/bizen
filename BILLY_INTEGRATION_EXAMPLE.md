# Billy Integration Examples for BIZEN

## Quick Integration into Existing Pages

### Example 1: Add Billy to Module Welcome Page

**File**: `src/components/bizen/m1s1/Section1Pages.tsx`

```tsx
// At the top of the file
import BillyCourseAssistant from '@/components/BillyCourseAssistant'

// Inside your component (e.g., BSMXWelcomeM1)
export default function BSMXWelcomeM1() {
  return (
    <div>
      {/* Your existing content */}
      <h1>Módulo 1: Identidad Digital</h1>
      
      {/* Add Billy - he will automatically speak on page load */}
      <BillyCourseAssistant
        moduleId="m1"
        sectionNumber={1}
        pageNumber={1}
        enabled={true}
        position="bottom-right"
      />
      
      {/* Rest of your page content */}
    </div>
  )
}
```

### Example 2: Billy in Quiz Pages with Feedback

**File**: `src/components/bizen/m1s1/Section1Pages.tsx` (Quiz component)

```tsx
import { useBillyCourseAssistant } from '@/components/BillyCourseAssistant'
import TalkingCharacter from '@/components/TalkingCharacter'

export function QuizPage() {
  const billy = useBillyCourseAssistant()
  
  const handleAnswer = (isCorrect: boolean) => {
    // Your existing quiz logic
    billy.quizFeedback(isCorrect)
  }
  
  return (
    <div>
      <h2>Quiz</h2>
      
      {/* Your quiz questions */}
      <button onClick={() => handleAnswer(true)}>Opción A</button>
      <button onClick={() => handleAnswer(false)}>Opción B</button>
      
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

### Example 3: Module Completion Page

**File**: `src/app/module/[moduleId]/complete/page.tsx`

```tsx
import BillyCourseAssistant from '@/components/BillyCourseAssistant'

export default function ModuleCompletePage({ params }: { params: { moduleId: string } }) {
  return (
    <div>
      <h1>¡Felicidades!</h1>
      <p>Has completado el módulo {params.moduleId}</p>
      
      {/* Billy congratulates on completion */}
      <BillyCourseAssistant
        moduleId={params.moduleId}
        event="module-complete"
        position="center"
        enabled={true}
      />
      
      <button onClick={() => window.location.href = '/modules/menu'}>
        Ver todos los módulos
      </button>
    </div>
  )
}
```

### Example 4: Section Navigation with Billy

```tsx
import { useBillyCourseAssistant } from '@/components/BillyCourseAssistant'

export function SectionPage() {
  const billy = useBillyCourseAssistant()
  const [currentPage, setCurrentPage] = useState(1)
  
  const goToNextPage = () => {
    setCurrentPage(prev => prev + 1)
    billy.encouragement()
  }
  
  return (
    <div>
      {/* Page content */}
      <button onClick={goToNextPage}>Siguiente</button>
    </div>
  )
}
```

### Example 5: Interactive Button that Makes Billy Speak

```tsx
import { useBilly } from '@/hooks/useBilly'

export function HelpButton() {
  const billy = useBilly()
  
  return (
    <button
      onClick={() => billy.speak('¿Necesitas ayuda? Revisa los materiales adicionales en la sección de recursos.')}
      style={{
        position: 'fixed',
        bottom: 80,
        right: 20,
        background: '#0F62FE',
        color: 'white',
        border: 'none',
        borderRadius: 30,
        padding: '12px 20px',
        cursor: 'pointer',
        fontWeight: 700,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}
    >
      💡 Ayuda
    </button>
  )
}
```

## Integration Patterns

### Pattern 1: Landing Page Welcome

Add to `/src/app/(landing)/page.tsx`:

```tsx
import TalkingCharacter from '@/components/TalkingCharacter'

export default function LandingPage() {
  return (
    <div>
      {/* Existing hero section */}
      
      {/* Add Billy to welcome users */}
      <TalkingCharacter
        textToSpeak="¡Bienvenido a BIZEN! La plataforma de aprendizaje digital más innovadora."
        position="bottom-right"
        width={200}
        height={200}
        autoPlay={false}  // User clicks to hear
        showControls={true}
      />
    </div>
  )
}
```

### Pattern 2: Dashboard with Tips

Add to `/src/app/dashboard/page.tsx`:

```tsx
import { useBilly, BillyMessages } from '@/hooks/useBilly'
import { useEffect } from 'react'

export default function Dashboard() {
  const billy = useBilly()
  
  useEffect(() => {
    // Welcome user when they arrive
    billy.speak(BillyMessages.welcome)
  }, [])
  
  return (
    <div>
      <h1>Mi Dashboard</h1>
      
      {/* Show daily tip */}
      <button onClick={() => billy.reminder('practice')}>
        💡 Consejo del día
      </button>
    </div>
  )
}
```

### Pattern 3: Progress Celebration

```tsx
import { useBilly } from '@/hooks/useBilly'

export function ProgressBar({ progress }: { progress: number }) {
  const billy = useBilly()
  
  useEffect(() => {
    if (progress === 50) {
      billy.speak('¡Vas a la mitad! Excelente progreso.')
    } else if (progress === 100) {
      billy.speak('¡Increíble! Has completado todo.')
    }
  }, [progress, billy])
  
  return <div>Progress: {progress}%</div>
}
```

### Pattern 4: Error Messages with Billy

```tsx
import { useBilly } from '@/hooks/useBilly'

export function ErrorHandler({ error }: { error: string | null }) {
  const billy = useBilly()
  
  useEffect(() => {
    if (error) {
      billy.speak('Hubo un problema. Por favor, inténtalo de nuevo.')
    }
  }, [error, billy])
  
  return error ? <div>Error: {error}</div> : null
}
```

## Step-by-Step Integration Guide

### Step 1: Choose Where to Add Billy

Recommended locations:
- ✅ Module/section welcome pages (automatic greeting)
- ✅ Quiz pages (feedback on answers)
- ✅ Completion pages (celebration)
- ✅ Dashboard (tips and reminders)
- ❌ Every single page (too much, can be annoying)

### Step 2: Pick Integration Method

**Method A: Simple Component** (easiest)
```tsx
<BillyCourseAssistant moduleId="m1" enabled={true} />
```

**Method B: Hook with Control** (more flexible)
```tsx
const billy = useBilly()
billy.speak("Hello!")
```

**Method C: Raw Component** (full customization)
```tsx
<TalkingCharacter textToSpeak="..." audioSrc="..." />
```

### Step 3: Add the Component

1. Import the component
2. Place it in your JSX
3. Configure props
4. Test in browser

### Step 4: Test and Iterate

- Test on different devices
- Check if speech timing is good
- Ensure it's not annoying
- Get user feedback

## Configuration Tips

### For Learning Content
```tsx
<BillyCourseAssistant
  position="bottom-right"
  enabled={true}  // Always show during lessons
  moduleId={moduleId}
  sectionNumber={sectionNumber}
/>
```

### For Quizzes
```tsx
const billy = useBillyCourseAssistant()
// Use billy.quizFeedback(isCorrect) for each answer
```

### For Celebrations
```tsx
<BillyCourseAssistant
  position="center"
  event="module-complete"
  moduleId={moduleId}
/>
```

### For Help/Support
```tsx
<button onClick={() => billy.speak("...")}>
  Ask Billy
</button>
```

## Best Practices

### ✅ DO
- Use Billy for important moments (welcome, completion, errors)
- Keep messages short (1-2 sentences)
- Give users control (show/hide, skip, mute)
- Test speech timing
- Provide visual feedback when speaking

### ❌ DON'T
- Don't make Billy speak on every page
- Don't use long, complex messages
- Don't auto-play without user consent on landing pages
- Don't interrupt user actions
- Don't use generic messages (make them contextual)

## Audio Files Setup

If you want better quality than text-to-speech:

1. **Create audio directory**:
```bash
mkdir -p public/audio
```

2. **Add audio files**:
- `public/audio/m1-welcome.mp3`
- `public/audio/quiz-correct.mp3`
- `public/audio/completion.mp3`

3. **Use in component**:
```tsx
<TalkingCharacter
  audioSrc="/audio/m1-welcome.mp3"
  position="bottom-right"
/>
```

## Recording Audio Tips

If recording custom audio for Billy:

1. **Voice**: Use a friendly, encouraging tone
2. **Length**: Keep under 15 seconds per message
3. **Format**: MP3, 128-192 kbps
4. **Content**: Match your existing course language and style
5. **Professional**: Consider hiring a voice actor for consistency

## Testing Checklist

Before deploying Billy to production:

- [ ] Test on Chrome, Safari, Firefox
- [ ] Test on mobile devices
- [ ] Check volume levels
- [ ] Verify mouth animation syncs
- [ ] Test drag functionality
- [ ] Ensure controls work
- [ ] Check accessibility (screen readers)
- [ ] Verify it doesn't block important content
- [ ] Test with browser audio blocked
- [ ] Get user feedback

## Support

Questions? Check:
- Main guide: `BILLY_TALKING_CHARACTER_GUIDE.md`
- Demo page: Visit `/billy-demo`
- Component code: `src/components/TalkingCharacter.tsx`
- Hook code: `src/hooks/useBilly.ts`

---

Ready to bring Billy to life! 🎙️✨



# 🎙️ Billy - Talking Character System

## Overview

Billy is an interactive talking character system for BIZEN that synchronizes mouth movements with audio playback and text-to-speech. Perfect for creating engaging, interactive learning experiences!

## Features

✅ **Text-to-Speech** - Uses browser's Web Speech API for natural voice  
✅ **Audio Sync** - Lip-sync with custom audio files using Web Audio API  
✅ **Smart Detection** - Automatically detects audio volume to animate mouth  
✅ **Draggable** - Users can reposition Billy anywhere on screen  
✅ **Flexible Positioning** - Fixed positions or static inline placement  
✅ **Easy Integration** - Simple React component + hooks  
✅ **Customizable** - Control size, position, behavior, and appearance  

## Quick Start

### 1. Basic Usage with Text-to-Speech

```tsx
import TalkingCharacter from '@/components/TalkingCharacter'

function MyPage() {
  return (
    <TalkingCharacter
      textToSpeak="¡Hola! Bienvenido a BIZEN"
      position="bottom-right"
      width={200}
      height={200}
    />
  )
}
```

### 2. With Custom Audio File

```tsx
<TalkingCharacter
  audioSrc="/audio/welcome.mp3"
  position="bottom-left"
  width={250}
  height={250}
  autoPlay={true}
  onEnd={() => console.log('Finished speaking!')}
/>
```

### 3. Using the Hook for Programmatic Control

```tsx
import { useBilly, BillyMessages } from '@/hooks/useBilly'

function MyComponent() {
  const billy = useBilly()
  
  return (
    <div>
      <button onClick={() => billy.speak(BillyMessages.welcome)}>
        Make Billy Speak
      </button>
      
      <button onClick={() => billy.stop()}>
        Stop Speaking
      </button>
      
      {billy.isSpeaking && <p>Billy is talking...</p>}
    </div>
  )
}
```

## Component Props

### TalkingCharacter Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `audioSrc` | string | - | URL to audio file |
| `textToSpeak` | string | - | Text for speech synthesis |
| `name` | string | "Billy" | Character name (accessibility) |
| `width` | number | 200 | Character width in pixels |
| `height` | number | 200 | Character height in pixels |
| `position` | string | "bottom-right" | Position: "bottom-right", "bottom-left", "top-right", "top-left", "center", "static" |
| `autoPlay` | boolean | false | Auto-play on mount |
| `showControls` | boolean | true | Show play/pause button |
| `volumeThreshold` | number | 30 | Volume threshold for mouth opening (0-255) |
| `draggable` | boolean | false | Allow user to drag character |
| `zIndex` | number | 1000 | CSS z-index for layering |
| `speechRate` | number | 1 | Speech rate (0.1 to 10) |
| `speechPitch` | number | 1 | Speech pitch (0 to 2) |
| `mouthClosedImage` | string | "/billy closed mouth.png" | Path to closed mouth image |
| `mouthOpenImage` | string | "/billy open mouth.png" | Path to open mouth image |
| `onStart` | function | - | Callback when speech starts |
| `onEnd` | function | - | Callback when speech ends |

## Hook API

### useBilly()

Returns an object with these methods:

```typescript
{
  speak: (text: string) => void          // Make Billy speak
  playAudio: (audioUrl: string) => void  // Play audio file
  stop: () => void                        // Stop speaking
  isSpeaking: boolean                     // Is currently speaking
  currentMessage: string | null           // Current text/audio
  queueMessages: (messages[]) => void     // Queue multiple messages
  clearQueue: () => void                  // Clear message queue
}
```

## Integration Examples

### Example 1: Welcome Message on Module Start

```tsx
import TalkingCharacter from '@/components/TalkingCharacter'

function ModulePage() {
  return (
    <div>
      <h1>Módulo 1: Identidad Digital</h1>
      
      <TalkingCharacter
        textToSpeak="Bienvenido al Módulo 1. Vamos a aprender sobre identidad digital."
        position="bottom-right"
        autoPlay={true}
        showControls={true}
        draggable={true}
      />
      
      {/* Your module content */}
    </div>
  )
}
```

### Example 2: Quiz Feedback with Billy

```tsx
import { useBilly, BillyMessages } from '@/hooks/useBilly'

function QuizComponent() {
  const billy = useBilly()
  
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      billy.speak(BillyMessages.quizCorrect)
    } else {
      billy.speak(BillyMessages.quizIncorrect)
    }
  }
  
  return (
    <div>
      {/* Quiz questions */}
      <button onClick={() => handleAnswer(true)}>Answer A</button>
      <button onClick={() => handleAnswer(false)}>Answer B</button>
      
      <TalkingCharacter
        textToSpeak={billy.currentMessage || ''}
        position="bottom-right"
        width={200}
        height={200}
      />
    </div>
  )
}
```

### Example 3: Sequential Messages

```tsx
import { useBilly } from '@/hooks/useBilly'

function OnboardingFlow() {
  const billy = useBilly()
  
  const startOnboarding = () => {
    billy.queueMessages([
      { text: '¡Hola! Soy Billy, tu guía en BIZEN.' },
      { text: 'Te ayudaré en tu aprendizaje.' },
      { text: '¿Listo para comenzar?' },
    ])
  }
  
  return (
    <button onClick={startOnboarding}>
      Start Onboarding
    </button>
  )
}
```

### Example 4: Context-Aware Billy

```tsx
import TalkingCharacter from '@/components/TalkingCharacter'
import { ModuleMessages } from '@/hooks/useBilly'

function ModuleCompletePage({ moduleId }: { moduleId: string }) {
  const getMessage = () => {
    switch(moduleId) {
      case 'm1': return ModuleMessages.m1.end
      case 'm2': return ModuleMessages.m2.end
      case 'm3': return ModuleMessages.m3.end
      default: return '¡Módulo completado!'
    }
  }
  
  return (
    <div>
      <h1>¡Felicidades!</h1>
      
      <TalkingCharacter
        textToSpeak={getMessage()}
        position="center"
        width={300}
        height={300}
        autoPlay={true}
      />
    </div>
  )
}
```

## Audio Files

### Adding Custom Audio

1. Create directory: `/public/audio/`
2. Add your audio files (MP3, WAV, OGG)
3. Reference them as: `/audio/your-file.mp3`

### Recommended Audio Format

- **Format**: MP3 or WAV
- **Sample Rate**: 44.1 kHz
- **Bitrate**: 128-192 kbps
- **Mono or Stereo**: Either works
- **Duration**: Keep under 30 seconds for best UX

### Example Audio Structure

```
public/
  audio/
    welcome.mp3
    module-1-intro.mp3
    module-1-complete.mp3
    quiz-correct.mp3
    quiz-incorrect.mp3
    encouragement.mp3
```

## Customization

### Custom Character Images

Replace the default Billy images with your own:

```tsx
<TalkingCharacter
  mouthClosedImage="/your-character-closed.png"
  mouthOpenImage="/your-character-opened.png"
  textToSpeak="Hello!"
/>
```

### Image Requirements

- **Format**: PNG with transparent background
- **Resolution**: 500x500px or higher
- **Alignment**: Both images should have the same dimensions
- **Mouth Position**: Keep consistent between open/closed

### Styling and Positioning

```tsx
// Floating assistant
<TalkingCharacter
  position="bottom-right"
  draggable={true}
  zIndex={1000}
/>

// Inline in content
<TalkingCharacter
  position="static"
  width={150}
  height={150}
/>

// Center overlay
<TalkingCharacter
  position="center"
  width={400}
  height={400}
  zIndex={9999}
/>
```

## Advanced Features

### Audio Analysis Configuration

Fine-tune mouth movement sensitivity:

```tsx
<TalkingCharacter
  audioSrc="/audio/speech.mp3"
  volumeThreshold={30}  // Lower = more sensitive (0-255)
/>
```

### Speech Synthesis Options

Control the voice characteristics:

```tsx
<TalkingCharacter
  textToSpeak="Hello world"
  speechRate={1.2}    // Speed (0.1 - 10)
  speechPitch={1.1}   // Pitch (0 - 2)
/>
```

### Event Callbacks

Track Billy's behavior:

```tsx
<TalkingCharacter
  textToSpeak="Hello"
  onStart={() => {
    console.log('Started speaking')
    // Pause other audio, show subtitle, etc.
  }}
  onEnd={() => {
    console.log('Finished speaking')
    // Resume audio, hide subtitle, proceed to next step
  }}
/>
```

## Demo Page

Visit `/billy-demo` to see all features in action and experiment with different configurations.

## Browser Compatibility

- ✅ Chrome/Edge (full support)
- ✅ Safari (full support)
- ✅ Firefox (full support)
- ⚠️ Older browsers may not support Web Speech API

## Troubleshooting

### Billy doesn't speak

**Solution**: Check browser console for errors. Ensure microphone permissions if needed. Some browsers require user interaction before playing audio.

### Mouth doesn't move with audio

**Solution**: Adjust `volumeThreshold` prop. Try lower values (10-20) for quieter audio.

### Speech sounds robotic

**Solution**: This is normal for browser TTS. For better quality, use pre-recorded audio files instead.

### Character doesn't drag

**Solution**: Ensure `draggable={true}` prop is set and the character has a fixed position (not "static").

## Tips & Best Practices

1. **Keep messages short** - 1-2 sentences work best for engagement
2. **Use at key moments** - Module start, quiz feedback, achievements
3. **Don't overuse** - Too much talking can be annoying
4. **Provide controls** - Let users skip or mute Billy
5. **Test on mobile** - Ensure positioning works on small screens
6. **Add subtitles** - For accessibility and noisy environments
7. **Pre-record important messages** - Better quality than TTS

## Next Steps

1. ✅ Add audio files to `/public/audio/`
2. ✅ Test the demo at `/billy-demo`
3. ✅ Integrate Billy into your course pages
4. ✅ Customize messages for your content
5. ✅ Gather user feedback and iterate

## Support

For questions or issues, contact the development team or check the component source code at:
- `/src/components/TalkingCharacter.tsx`
- `/src/hooks/useBilly.ts`
- `/src/app/billy-demo/page.tsx`

---

**Made with ❤️ for BIZEN**


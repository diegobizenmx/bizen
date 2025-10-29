# 🎙️ Billy Animation Control Guide

## 🎯 How to Control Mouth Movement Speed

Billy's mouth movement can be controlled to sync better with speech!

---

## ⚡ Quick Fix - Make It Slower

### For Text-to-Speech (Most Common)

```tsx
<TalkingCharacter
  textToSpeak="Hello, this is Billy speaking!"
  position="bottom-right"
  animationSpeed={0.5}  // ← Make it slower!
/>
```

### For Audio Files

```tsx
<TalkingCharacter
  audioSrc="/audio/welcome.mp3"
  position="bottom-right"
  animationSpeed={0.3}  // ← Even slower for audio!
/>
```

---

## 🎛️ Animation Speed Options

| Value | Effect | Best For |
|-------|--------|----------|
| `0.2` | Very slow | Slow, calm speech |
| `0.3` | Slow | Relaxed talking |
| `0.5` | Slower | Normal conversation |
| `1.0` | Normal (default) | Regular speech |
| `1.5` | Faster | Excited speech |
| `2.0` | Very fast | Rapid talking |

---

## 🎵 Audio Sync Settings

### For Better Audio Sync

```tsx
<TalkingCharacter
  audioSrc="/audio/speech.mp3"
  position="bottom-right"
  animationSpeed={0.4}        // Slower mouth movement
  volumeThreshold={20}        // More sensitive to audio
/>
```

### Volume Threshold Options

| Value | Sensitivity | Best For |
|-------|-------------|----------|
| `10` | Very sensitive | Quiet audio |
| `20` | Sensitive | Normal audio |
| `30` | Default | Most audio |
| `50` | Less sensitive | Loud audio |

---

## 📝 Complete Examples

### Example 1: Slow, Calm Speech

```tsx
<TalkingCharacter
  textToSpeak="Welcome to BIZEN. Take your time to learn."
  position="bottom-right"
  animationSpeed={0.3}  // Slow and calm
  speechRate={0.8}      // Slower speech too
/>
```

### Example 2: Normal Conversation

```tsx
<TalkingCharacter
  textToSpeak="Hello! How are you today?"
  position="bottom-right"
  animationSpeed={0.6}  // Slightly slower
  speechRate={1.0}      // Normal speech speed
/>
```

### Example 3: Excited Announcement

```tsx
<TalkingCharacter
  textToSpeak="Congratulations! You completed the module!"
  position="center"
  animationSpeed={1.2}  // Faster for excitement
  speechRate={1.1}      // Slightly faster speech
/>
```

### Example 4: Audio File with Perfect Sync

```tsx
<TalkingCharacter
  audioSrc="/audio/welcome.mp3"
  position="bottom-right"
  animationSpeed={0.4}        // Slow mouth movement
  volumeThreshold={15}        // Very sensitive
  autoPlay={true}
/>
```

---

## 🎯 Recommended Settings

### For Text-to-Speech
```tsx
animationSpeed={0.5}  // Good balance
speechRate={1.0}      // Normal speed
```

### For Audio Files
```tsx
animationSpeed={0.3}        // Slower for realism
volumeThreshold={20}        // More sensitive
```

### For Mobile Devices
```tsx
animationSpeed={0.4}  // Slightly slower (better performance)
```

---

## 🔧 Advanced Control

### Multiple Characters with Different Speeds

```tsx
// Billy - Normal speed
<TalkingCharacter
  textToSpeak="Hello from Billy!"
  position="bottom-right"
  animationSpeed={0.5}
/>

// Billy - Slow and calm
<TalkingCharacter
  textToSpeak="Take your time to learn."
  position="bottom-left"
  animationSpeed={0.3}
/>
```

### Dynamic Speed Based on Content

```tsx
function MyComponent() {
  const [speed, setSpeed] = useState(0.5)
  
  const slowMessage = () => {
    setSpeed(0.3)
    // Billy will speak slowly
  }
  
  const fastMessage = () => {
    setSpeed(1.0)
    // Billy will speak faster
  }
  
  return (
    <TalkingCharacter
      textToSpeak="Dynamic speed!"
      animationSpeed={speed}
    />
  )
}
```

---

## 🐛 Troubleshooting

### Mouth Moving Too Fast?
**Solution:**
```tsx
animationSpeed={0.3}  // Much slower
```

### Mouth Moving Too Slow?
**Solution:**
```tsx
animationSpeed={1.2}  // Faster
```

### Not Syncing with Audio?
**Solution:**
```tsx
animationSpeed={0.4}        // Slower
volumeThreshold={15}        // More sensitive
```

### Text-to-Speech Too Robotic?
**Solution:**
```tsx
animationSpeed={0.6}  // Slower, more natural
speechRate={0.9}      // Slightly slower speech
speechPitch={0.8}     // Lower pitch
```

---

## 💡 Pro Tips

1. **Start with `0.5`** - Good default for most cases
2. **Use `0.3` for audio files** - More realistic sync
3. **Adjust `volumeThreshold`** - Lower = more sensitive
4. **Test on different devices** - Mobile might need slower speed
5. **Match speech rate** - If speech is slow, animation should be slow too

---

## 📋 Quick Reference

### Common Settings

```tsx
// Very slow and calm
animationSpeed={0.2}

// Slow and relaxed
animationSpeed={0.3}

// Normal conversation
animationSpeed={0.5}

// Slightly fast
animationSpeed={0.8}

// Fast and excited
animationSpeed={1.2}
```

### With Other Props

```tsx
<TalkingCharacter
  textToSpeak="Your message"
  position="bottom-right"
  animationSpeed={0.4}        // Slower mouth
  speechRate={0.9}           // Slower speech
  speechPitch={0.8}          // Lower pitch
  volumeThreshold={20}       // More sensitive
/>
```

---

## 🎉 Summary

**To make Billy's mouth move slower:**

```tsx
animationSpeed={0.3}  // Slower movement
```

**To make it sync better with audio:**

```tsx
animationSpeed={0.4}        // Slower mouth
volumeThreshold={20}        // More sensitive
```

**That's it!** Your Billy will now move more naturally! 🎙️✨

---

**Questions?** Check the demo page or other guides for more examples!


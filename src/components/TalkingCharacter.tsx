"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

export interface TalkingCharacterProps {
  /** Audio source URL or base64 */
  audioSrc?: string
  /** Character name for accessibility */
  name?: string
  /** Width of character in pixels */
  width?: number
  /** Height of character in pixels */
  height?: number
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center' | 'static'
  /** Auto-play audio on mount */
  autoPlay?: boolean
  /** Show play/pause button */
  showControls?: boolean
  /** Volume threshold for mouth opening (0-255) */
  volumeThreshold?: number
  /** Mouth animation speed multiplier (1 = normal, 0.5 = slower, 2 = faster) */
  animationSpeed?: number
  /** Callback when audio starts */
  onStart?: () => void
  /** Callback when audio ends */
  onEnd?: () => void
  /** Custom mouth closed image path */
  mouthClosedImage?: string
  /** Custom mouth open image path */
  mouthOpenImage?: string
  /** Enable draggable positioning */
  draggable?: boolean
  /** Z-index for layering */
  zIndex?: number
  /** Text to speak using Web Speech API (alternative to audioSrc) */
  textToSpeak?: string
  /** Voice for text-to-speech */
  voice?: SpeechSynthesisVoice | null
  /** Speech rate (0.1 to 10) */
  speechRate?: number
  /** Speech pitch (0 to 2) */
  speechPitch?: number
}

export default function TalkingCharacter({
  audioSrc,
  name = "Billy",
  width = 200,
  height = 200,
  position = 'bottom-right',
  autoPlay = false,
  showControls = true,
  volumeThreshold = 30,
  animationSpeed = 1,
  onStart,
  onEnd,
  mouthClosedImage = "/2.png",
  mouthOpenImage = "/3.png",
  draggable = false,
  zIndex = 1000,
  textToSpeak,
  voice = null,
  speechRate = 1,
  speechPitch = 1,
}: TalkingCharacterProps) {
  const [isMouthOpen, setIsMouthOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const dragStartRef = useRef({ x: 0, y: 0 })

  // Initialize audio context and analyser
  const initAudioAnalyser = useCallback(() => {
    if (!audioRef.current || audioContextRef.current) return

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      
      const source = audioContext.createMediaElementSource(audioRef.current)
      source.connect(analyser)
      analyser.connect(audioContext.destination)
      
      audioContextRef.current = audioContext
      analyserRef.current = analyser
    } catch (error) {
      console.error('Error initializing audio analyser:', error)
    }
  }, [])

  // Analyze audio and animate mouth
  const animateMouth = useCallback(() => {
    if (!analyserRef.current || !isPlaying) {
      setIsMouthOpen(false)
      return
    }

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserRef.current.getByteFrequencyData(dataArray)

    // Calculate average volume
    const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength

    // Open mouth if volume exceeds threshold
    setIsMouthOpen(average > volumeThreshold)

    // Continue animation loop with speed control
    const delay = Math.max(16, 100 / animationSpeed) // 16ms = 60fps max
    setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(animateMouth)
    }, delay)
  }, [isPlaying, volumeThreshold, animationSpeed])

  // Start playing audio
  const playAudio = useCallback(() => {
    if (textToSpeak && 'speechSynthesis' in window) {
      // Use Web Speech API for text-to-speech
      window.speechSynthesis.cancel() // Cancel any ongoing speech
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.rate = speechRate
      utterance.pitch = speechPitch
      if (voice) utterance.voice = voice
      
      utterance.onstart = () => {
        setIsPlaying(true)
        onStart?.()
      }
      
      utterance.onend = () => {
        setIsPlaying(false)
        setIsMouthOpen(false)
        onEnd?.()
      }
      
      // Animate mouth during speech with speed control
      const animateSpeech = () => {
        if (!window.speechSynthesis.speaking) {
          setIsMouthOpen(false)
          return
        }
        
        // Simulate mouth movement during speech with speed control
        setIsMouthOpen(prev => !prev)
        const baseDelay = 200 / animationSpeed // Base delay adjusted by speed
        const randomDelay = Math.random() * 100 // Add some randomness
        setTimeout(animateSpeech, baseDelay + randomDelay)
      }
      
      speechUtteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
      animateSpeech()
      
    } else if (audioRef.current && audioSrc) {
      // Use audio file
      initAudioAnalyser()
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error)
      })
    }
  }, [audioSrc, textToSpeak, voice, speechRate, speechPitch, initAudioAnalyser, onStart, onEnd])

  // Pause audio
  const pauseAudio = useCallback(() => {
    if (textToSpeak && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      setIsMouthOpen(false)
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [textToSpeak])

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !audioSrc) return

    const handlePlay = () => {
      setIsPlaying(true)
      onStart?.()
    }

    const handlePause = () => {
      setIsPlaying(false)
      setIsMouthOpen(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setIsMouthOpen(false)
      onEnd?.()
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audioSrc, onStart, onEnd])

  // Start mouth animation when playing
  useEffect(() => {
    if (isPlaying && audioSrc) {
      animateMouth()
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, audioSrc, animateMouth])

  // Auto-play on mount
  useEffect(() => {
    if (autoPlay) {
      playAudio()
    }
  }, [autoPlay, playAudio])

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX - dragPosition.x,
      y: e.clientY - dragPosition.y,
    }
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    setDragPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    })
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Position styles
  const getPositionStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      zIndex,
      transition: isDragging ? 'none' : 'all 0.3s ease',
    }

    if (draggable && (dragPosition.x !== 0 || dragPosition.y !== 0)) {
      return {
        ...baseStyle,
        position: 'fixed',
        left: dragPosition.x,
        top: dragPosition.y,
      }
    }

    if (position === 'static') {
      return { ...baseStyle, position: 'relative' as const }
    }

    const fixedPositions: Record<string, React.CSSProperties> = {
      'bottom-right': { position: 'fixed', bottom: 20, right: 20 },
      'bottom-left': { position: 'fixed', bottom: 20, left: 20 },
      'top-right': { position: 'fixed', top: 20, right: 20 },
      'top-left': { position: 'fixed', top: 20, left: 20 },
      'center': { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    }

    return { ...baseStyle, ...fixedPositions[position] }
  }

  return (
    <div
      style={getPositionStyle()}
      onMouseDown={handleMouseDown}
      role="region"
      aria-label={`${name} - talking character`}
    >
      <div
        style={{
          position: 'relative',
          width,
          height,
          cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : 'default',
          userSelect: 'none',
        }}
      >
        {/* Character Image */}
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src={isMouthOpen ? mouthOpenImage : mouthClosedImage}
            alt={`${name} ${isMouthOpen ? 'talking' : 'silent'}`}
            width={width}
            height={height}
            style={{
              objectFit: 'contain',
              filter: isPlaying ? 'none' : 'grayscale(20%)',
              transition: 'filter 0.3s ease',
            }}
            priority
          />
        </div>

        {/* Controls */}
        {showControls && (audioSrc || textToSpeak) && (
          <div
            style={{
              position: 'absolute',
              bottom: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 8,
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '8px 12px',
              borderRadius: 20,
              boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <button
              onClick={isPlaying ? pauseAudio : playAudio}
              style={{
                background: isPlaying ? '#EF4444' : '#10B981',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '6px 16px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 14,
                transition: 'transform 0.1s ease',
              }}
              onMouseDown={(e) => {
                e.stopPropagation()
                e.currentTarget.style.transform = 'scale(0.95)'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸ Pausar' : '▶ Hablar'}
            </button>
          </div>
        )}

        {/* Audio element (hidden) */}
        {audioSrc && (
          <audio
            ref={audioRef}
            src={audioSrc}
            style={{ display: 'none' }}
            preload="auto"
          />
        )}
      </div>
    </div>
  )
}


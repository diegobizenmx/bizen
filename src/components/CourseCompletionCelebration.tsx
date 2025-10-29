"use client"

import * as React from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref'
import { triggerConfetti } from '@/utils/confetti'

export type CourseCompletionCelebrationProps = {
  learnerName: string
  courseTitle: string
  primaryColor?: string
  accentColor?: string
  autoplay?: boolean
  onComplete?: () => void
  labels?: {
    celebrationRegion?: string
    progressLabel?: string
    completeLabel?: string
    certificateLabel?: string
  }
  ctas?: Array<{ text: string; href: string; variant?: "primary" | "secondary" }>
  disableParticles?: boolean
}

const DUR = {
  ring: 1.0,
  morph: 0.6,
  trophy: 0.7,
  card: 0.8,
  stagger: 0.06,
} as const

export default function CourseCompletionCelebration({
  learnerName,
  courseTitle,
  primaryColor = "#6366F1",
  accentColor = "#22D3EE",
  autoplay = true,
  onComplete,
  labels = {
    celebrationRegion: "Course completion celebration",
    progressLabel: "Progress",
    completeLabel: "Completed",
    certificateLabel: "Certificate",
  },
  ctas = [],
  disableParticles = false,
}: CourseCompletionCelebrationProps) {
  const prefersReducedMotion = useReducedMotionPref()
  const [mounted, setMounted] = React.useState(false)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const progress = useMotionValue(0)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!autoplay || !mounted) return

    const timer = setTimeout(() => {
      progress.set(100)

      setTimeout(() => {
        if (!disableParticles && !prefersReducedMotion && canvasRef.current) {
          triggerConfetti(canvasRef.current, [primaryColor, accentColor, "#F59E0B", "#10B981"])
        }
      }, 1600)

      setTimeout(() => {
        onComplete?.()
      }, 4000)
    }, 200)

    return () => clearTimeout(timer)
  }, [autoplay, mounted, progress, onComplete, primaryColor, accentColor, disableParticles, prefersReducedMotion])

  const circumference = 2 * Math.PI * 45

  return (
    <motion.div
      role="region"
      aria-label={labels.celebrationRegion}
      style={{
        position: "fixed" as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden" as const,
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
        padding: "32px",
        zIndex: 9999,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Confetti Canvas */}
      {!disableParticles && !prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: 10
          }}
          width={typeof window !== 'undefined' ? window.innerWidth : 1920}
          height={typeof window !== 'undefined' ? window.innerHeight : 1080}
        />
      )}

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 20, maxWidth: "56rem", width: "100%", padding: "0 16px" }}>
        <motion.div
          style={{
            background: "white",
            borderRadius: "clamp(16px, 3vw, 24px)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            overflow: "hidden",
          }}
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          {/* Header */}
          <div style={{
            position: "relative" as const,
            padding: "48px",
            background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
              {/* Progress Ring */}
              <div style={{ position: "relative" as const }}>
                <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke={`${primaryColor}20`}
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={useTransform(
                      progress,
                      (p) => circumference - (p * circumference / 100)
                    )}
                    style={{
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                    }}
                  />
                </svg>

                {/* Checkmark */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: DUR.morph,
                    delay: DUR.ring,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                    <motion.path
                      d="M20 6L9 17l-5-5"
                      stroke={primaryColor}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: DUR.morph,
                        delay: DUR.ring + 0.1,
                        ease: "easeOut",
                      }}
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Labels */}
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: "14px", 
                  fontWeight: 600, 
                  color: "#64748b", 
                  marginBottom: "8px" 
                }}>
                  {labels.progressLabel}
                </div>
                <motion.h2
                  style={{
                    margin: 0,
                    fontSize: "48px",
                    fontWeight: 900,
                    background: `linear-gradient(135deg, #1e293b, #475569)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  {labels.completeLabel}!
                </motion.h2>
              </div>
            </div>
          </div>

          {/* Trophy/Badge */}
          <motion.div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "32px",
              background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: DUR.trophy,
              delay: DUR.ring + DUR.morph,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))' }}
            >
              <path
                d="M12 2v2m0 14v3M8 6h8M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0v8a4 4 0 0 1-8 0V6"
                stroke={primaryColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* Certificate Card */}
          <motion.div
            style={{
              padding: "48px",
              background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 30%, #e0f7fa 100%)",
              borderTop: "1px solid #e2e8f0"
            }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: DUR.card, delay: DUR.ring + DUR.morph + DUR.trophy }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
              {/* Certificate Icon */}
              <motion.div
                style={{
                  flexShrink: 0,
                  width: "64px",
                  height: "64px",
                  borderRadius: "12px",
                  background: `linear-gradient(135deg, ${accentColor}, ${primaryColor})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: DUR.ring + DUR.morph + DUR.trophy + 0.3,
                  type: "spring",
                }}
              >
                📜
              </motion.div>

              {/* Certificate Info */}
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: "14px", 
                  fontWeight: 600, 
                  color: "#64748b", 
                  marginBottom: "4px" 
                }}>
                  {labels.certificateLabel}
                </div>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: "28px", 
                  fontWeight: 900, 
                  color: "#1e293b", 
                  marginBottom: "8px" 
                }}>
                  {learnerName}
                </h3>
                <p style={{ 
                  margin: 0, 
                  fontSize: "18px", 
                  color: "#475569", 
                  marginBottom: "4px" 
                }}>
                  {courseTitle}
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: "14px", 
                  color: "#94a3b8" 
                }}>
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          {ctas.length > 0 && (
            <motion.div
              style={{
                padding: "48px",
                background: "white",
                borderTop: "1px solid #f1f5f9"
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: DUR.ring + DUR.morph + DUR.trophy + DUR.card }}
            >
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "16px" }}>
                {ctas.map((cta, i) => (
                  <motion.a
                    key={i}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "12px 24px",
                      borderRadius: "12px",
                      fontWeight: 700,
                      textAlign: "center" as const,
                      textDecoration: "none",
                      cursor: "pointer",
                      ...(cta.variant === 'primary' ? {
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                        color: "white",
                        boxShadow: `0 8px 24px ${primaryColor}30`
                      } : {
                        border: `2px solid ${primaryColor}`,
                        color: primaryColor,
                        background: "transparent"
                      })
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: DUR.ring + DUR.morph + DUR.trophy + DUR.card + i * DUR.stagger }}
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={cta.text}
                  >
                    {cta.text}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

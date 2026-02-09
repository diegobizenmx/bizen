"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { InfoStepFields } from "@/types/lessonTypes"
import { sharedStyles } from "../sharedStyles"
// LessonProgressHeader now shown in LessonScreen for all slides

interface InfoStepProps {
  step: InfoStepFields & { id: string; title?: string; description?: string; fullScreen?: boolean; continueLabel?: string }
  onAnswered: (result: { isCompleted: boolean; isCorrect?: boolean; answerData?: any }) => void
  onExit?: () => void
  onContinue?: () => void
  isContinueEnabled?: boolean
  currentStepIndex?: number
  totalSteps?: number
  streak?: number
  stars?: 1 | 2 | 3
}

const FLASHCARD_BORDER_COLOR = "#f59e0b" // Orange/yellow for flashcard box

export function InfoStep({ step, onAnswered, onExit, onContinue, isContinueEnabled, currentStepIndex = 0, totalSteps = 1, streak = 0, stars = 3 }: InfoStepProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    // Info steps are always completed immediately (no interaction needed). Run once on mount
    // so we don't re-trigger when parent recreates onAnswered and cause an infinite loop.
    onAnswered({ isCompleted: true })
  // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: call once on mount only
  }, [])

  // Full-screen mode: flashcard layout with "BILLY TE QUIERE ENSEÑAR ALGO" and "QUIERO VER"
  if (step.fullScreen && onExit && onContinue) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        textAlign: 'center', 
        minHeight: 0,
        flex: 1,
        padding: '2rem 1.5rem',
        background: '#f1f5f9',
        boxSizing: 'border-box',
        gap: 'clamp(20px, 3vh, 32px)',
      }}>
        {/* Top section: Billy header + Quiero Ver button */}
        <div style={{
          width: '100%',
          maxWidth: '900px',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          {/* Billy header */}
          <div style={{
            padding: '16px 32px',
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            fontWeight: 600,
            color: '#1e293b',
            background: '#ffffff',
            border: '3px solid #1e293b',
            borderRadius: '16px',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            flex: '1 1 auto',
            minWidth: '200px',
          }}>
            BILLY TE QUIERE ENSEÑAR ALGO
          </div>

          {/* Quiero Ver button */}
          <button
            onClick={() => setIsRevealed(true)}
            disabled={isRevealed}
            style={{
              padding: '16px 48px',
              fontSize: 'clamp(18px, 3vw, 24px)',
              fontWeight: 600,
              color: '#ffffff',
              background: isRevealed ? '#94a3b8' : '#2563eb',
              border: 'none',
              borderRadius: '16px',
              cursor: isRevealed ? 'default' : 'pointer',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              minWidth: '180px',
            }}
          >
            QUIERO VER
          </button>
        </div>

        {/* Flashcard content box - orange border */}
        <div style={{
          flex: 1,
          width: '100%',
          maxWidth: '900px',
          border: `4px solid ${FLASHCARD_BORDER_COLOR}`,
          borderRadius: '24px',
          background: '#ffffff',
          padding: 'clamp(24px, 4vw, 48px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
        }}>
          {!isRevealed ? (
            // Placeholder before reveal
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '48px' }}>🐂</div>
              <p style={{
                fontSize: 'clamp(20px, 3vw, 28px)',
                fontWeight: 600,
                color: '#1e293b',
                margin: 0,
              }}>
                FLASHCARD
              </p>
            </div>
          ) : (
            // Actual content after reveal
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(16px, 2vh, 24px)' }}>
              {step.title && (
                <h2 style={{ 
                  fontSize: 'clamp(32px, 6vw, 48px)', 
                  fontWeight: 700, 
                  margin: 0,
                  color: '#1e293b',
                }}>
                  {step.title}
                </h2>
              )}
              {step.description && (
                <p style={{ 
                  fontSize: 'clamp(18px, 3vw, 24px)', 
                  margin: 0, 
                  color: '#475569', 
                  fontWeight: 500,
                }}>
                  {step.description}
                </p>
              )}
              <div style={{ fontSize: 'clamp(20px, 3.5vw, 28px)', lineHeight: 1.6, maxWidth: '700px', color: '#1e293b' }}>
                {step.body.split('\n\n').map((line, i) => (
                  <p key={i} style={{ margin: '0.8rem 0' }}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom navigation buttons - only show after reveal */}
        {isRevealed && (
          <div style={{ 
            width: '100%', 
            maxWidth: '900px',
            display: 'flex', 
            gap: '1.5rem',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <button
              onClick={onExit}
              style={{
                padding: '16px 48px',
                fontSize: 'clamp(18px, 3.5vw, 24px)',
                fontWeight: 500,
                color: '#2563eb',
                background: '#f1f5f9',
                border: '3px solid #1e293b',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                minWidth: '140px',
              }}
            >
              Salir
            </button>
            <button
              onClick={onContinue}
              disabled={!isContinueEnabled}
              style={{
                padding: '16px 48px',
                fontSize: 'clamp(18px, 3.5vw, 24px)',
                fontWeight: 600,
                color: '#ffffff',
                background: isContinueEnabled ? '#2563eb' : '#94a3b8',
                border: 'none',
                borderRadius: '9999px',
                cursor: isContinueEnabled ? 'pointer' : 'not-allowed',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                minWidth: '180px',
              }}
            >
              {step.continueLabel || "Continuar"}
            </button>
          </div>
        )}
      </div>
    )
  }

  // Regular mode: same layout/colors as fullScreen
  return (
    <div className={sharedStyles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '60vh' }}>
      {step.title && (
        <h2 className={sharedStyles.title} style={{ fontSize: 'clamp(36px, 7vw, 56px)', fontWeight: 600, marginBottom: '2rem', color: '#1e293b' }}>{step.title}</h2>
      )}
      {step.description && <p className={sharedStyles.description} style={{ fontSize: 'clamp(20px, 4vw, 28px)', marginBottom: '2rem', color: '#1e293b', fontWeight: 500 }}>{step.description}</p>}
      {step.imageUrl && (
        <div className={`${sharedStyles.imageContainer} my-6 md:my-8`}>
          <Image
            src={step.imageUrl}
            alt="Ilustración de la lección"
            width={400}
            height={400}
            className={`${sharedStyles.image} object-contain`}
          />
        </div>
      )}
      <div className={sharedStyles.body} style={{ fontSize: 'clamp(22px, 4.5vw, 30px)', lineHeight: 1.8, maxWidth: '700px', color: '#1e293b' }}>
        {step.body.split('\n\n').map((line, i) => (
          <p key={i} style={{ margin: '0.8rem 0' }}>{line}</p>
        ))}
      </div>
    </div>
  )
}


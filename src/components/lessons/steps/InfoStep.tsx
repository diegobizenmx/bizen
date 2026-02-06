"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import { InfoStepFields } from "@/types/lessonTypes"
import { sharedStyles } from "../sharedStyles"

interface InfoStepProps {
  step: InfoStepFields & { id: string; title?: string; description?: string; fullScreen?: boolean }
  onAnswered: (result: { isCompleted: boolean; isCorrect?: boolean; answerData?: any }) => void
  onExit?: () => void
  onContinue?: () => void
  isContinueEnabled?: boolean
}

export function InfoStep({ step, onAnswered, onExit, onContinue, isContinueEnabled }: InfoStepProps) {
  useEffect(() => {
    // Info steps are always completed immediately (no interaction needed). Run once on mount
    // so we don't re-trigger when parent recreates onAnswered and cause an infinite loop.
    onAnswered({ isCompleted: true })
  // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: call once on mount only
  }, [])

  // Full-screen mode: render with inline buttons
  if (step.fullScreen && onExit && onContinue) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        textAlign: 'center', 
        minHeight: '100dvh',
        padding: '2rem 1.5rem',
        background: '#f1f5f9',
        boxSizing: 'border-box',
      }}>
        {/* Progress bar placeholder - matches the rounded pill in the image */}
        <div style={{ 
          width: 'min(90%, 900px)', 
          height: '32px', 
          borderRadius: '20px', 
          border: '3px solid #1e293b',
          background: '#f1f5f9',
          marginBottom: '2rem',
        }} />

        {/* Content area - centered vertically */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {step.title && (
            <h2 style={{ 
              fontSize: 'clamp(32px, 6vw, 48px)', 
              fontWeight: 700, 
              marginBottom: '2rem',
              color: '#1e293b',
            }}>
              {step.title}
            </h2>
          )}
          {step.description && (
            <p style={{ 
              fontSize: 'clamp(18px, 3.5vw, 24px)', 
              marginBottom: '3rem', 
              color: '#1e293b', 
              fontWeight: 500,
            }}>
              {step.description}
            </p>
          )}
          <div style={{ fontSize: 'clamp(18px, 3.5vw, 24px)', lineHeight: 1.8, maxWidth: '700px', color: '#1e293b' }}>
            {step.body.split('\n\n').map((line, i) => (
              <p key={i} style={{ margin: '0.8rem 0' }}>{line}</p>
            ))}
          </div>
        </div>

        {/* Buttons at bottom - exactly as in the image */}
        <div style={{ 
          width: '100%', 
          maxWidth: '900px',
          display: 'flex', 
          gap: '1.5rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2rem',
        }}>
          <button
            onClick={onExit}
            style={{
              padding: '16px 48px',
              fontSize: 'clamp(16px, 3vw, 20px)',
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
              fontSize: 'clamp(16px, 3vw, 20px)',
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
            Iniciar misión
          </button>
        </div>
      </div>
    )
  }

  // Regular mode: normal info step
  return (
    <div className={sharedStyles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '60vh' }}>
      {step.title && (
        <>
          <h2 className={sharedStyles.title} style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 600, marginBottom: '2rem' }}>{step.title}</h2>
        </>
      )}
      {step.description && <p className={sharedStyles.description} style={{ fontSize: 'clamp(16px, 3vw, 20px)', marginBottom: '2rem', color: '#64748b', fontWeight: 500 }}>{step.description}</p>}
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
      <div className={sharedStyles.body} style={{ fontSize: 'clamp(16px, 3vw, 20px)', lineHeight: 1.8, maxWidth: '600px' }}>
        {step.body.split('\n\n').map((line, i) => (
          <p key={i} style={{ margin: '0.5rem 0' }}>{line}</p>
        ))}
      </div>
    </div>
  )
}


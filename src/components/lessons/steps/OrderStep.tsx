"use client"

import React, { useState, useEffect, useRef } from "react"
import { OrderStepFields } from "@/types/lessonTypes"
import { sharedStyles } from "../sharedStyles"
import { playCorrectSound, playIncorrectSound } from "../lessonSounds"
// LessonProgressHeader now shown in LessonScreen for all slides

interface OrderStepProps {
  step: OrderStepFields & { id: string; title?: string; description?: string; fullScreen?: boolean; continueLabel?: string }
  onAnswered: (result: { isCompleted: boolean; isCorrect?: boolean; answerData?: any }) => void
  orderedItemIds?: string[]
  onExit?: () => void
  onContinue?: () => void
  isContinueEnabled?: boolean
  currentStepIndex?: number
  totalSteps?: number
  streak?: number
  stars?: 1 | 2 | 3
}

const ORDER_ITEM_BLUE = "#2563eb"

export function OrderStep({
  step,
  onAnswered,
  orderedItemIds: initialOrder,
  onExit,
  onContinue,
  isContinueEnabled,
  currentStepIndex = 0,
  totalSteps = 1,
  streak = 0,
  stars = 3,
}: OrderStepProps) {
  const [orderedItemIds, setOrderedItemIds] = useState<string[]>(
    initialOrder ?? step.items.map((item) => item.id)
  )
  const [hasEvaluated, setHasEvaluated] = useState(false)
  const hasPlayedSound = useRef(false)
  const onAnsweredRef = useRef(onAnswered)
  onAnsweredRef.current = onAnswered

  useEffect(() => {
    // Check if items are in correct order
    const isCorrect = orderedItemIds.every((id, index) => {
      const item = step.items.find((it) => it.id === id)
      return item && item.correctOrder === index + 1
    })

    if (!hasEvaluated) {
      setHasEvaluated(true)

      // Play sound only once
      if (!hasPlayedSound.current) {
        if (isCorrect) {
          playCorrectSound()
        } else {
          playIncorrectSound()
        }
        hasPlayedSound.current = true
      }
    }

    // Use ref so parent re-renders (new onAnswered) don't retrigger this effect and cause a loop
    onAnsweredRef.current({
      isCompleted: true,
      isCorrect,
      answerData: { orderedItemIds: [...orderedItemIds] },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hasEvaluated omitted to avoid double run when we set it
  }, [orderedItemIds, step.items])

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newOrder = [...orderedItemIds]
    const [removed] = newOrder.splice(fromIndex, 1)
    newOrder.splice(toIndex, 0, removed)
    setOrderedItemIds(newOrder)
  }

  const moveUp = (index: number) => {
    if (index > 0 && !hasEvaluated) {
      moveItem(index, index - 1)
    }
  }

  const moveDown = (index: number) => {
    if (index < orderedItemIds.length - 1 && !hasEvaluated) {
      moveItem(index, index + 1)
    }
  }

  const getItemStyle = (item: typeof step.items[0], currentIndex: number) => {
    if (!hasEvaluated) {
      return ""
    }
    const isCorrect = item.correctOrder === currentIndex + 1
    return isCorrect
      ? "bg-emerald-100 border-emerald-600"
      : "bg-red-100 border-red-600"
  }

  const useFullScreenLayout = onExit != null || onContinue != null

  const buttonsRow = useFullScreenLayout ? (
    <div style={{
      width: "100%",
      maxWidth: "900px",
      display: "flex",
      gap: "1.5rem",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "2rem",
    }}>
      <button
        onClick={onExit}
        style={{
          padding: "16px 48px",
          fontSize: "clamp(18px, 3.5vw, 24px)",
          fontWeight: 500,
          color: "#2563eb",
          background: "#f1f5f9",
          border: "3px solid #1e293b",
          borderRadius: "9999px",
          cursor: "pointer",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          minWidth: "140px",
        }}
      >
        Salir
      </button>
      <button
        type="button"
        onClick={() => onContinue?.()}
        disabled={!isContinueEnabled}
        style={{
          padding: "16px 48px",
          fontSize: "clamp(18px, 3.5vw, 24px)",
          fontWeight: 600,
          color: "#ffffff",
          background: isContinueEnabled ? "#2563eb" : "#94a3b8",
          border: "none",
          borderRadius: "9999px",
          cursor: isContinueEnabled ? "pointer" : "not-allowed",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          minWidth: "180px",
        }}
      >
        {(step as { continueLabel?: string }).continueLabel ?? "Continuar"}
      </button>
    </div>
  ) : null

  const content = (
    <>
      {/* Title box - same style as match step */}
      {step.question && (
        <div style={{ textAlign: "center", marginBottom: "clamp(24px, 4vh, 48px)" }}>
          <h2 style={{
            fontSize: "clamp(18px, 2.5vw, 32px)",
            fontWeight: 600,
            color: "#1e293b",
            margin: 0,
            padding: "clamp(10px, 1.5vh, 16px) clamp(20px, 3vw, 32px)",
            border: "3px solid #1e293b",
            borderRadius: "16px",
            display: "inline-block",
            letterSpacing: "0.5px",
          }}>
            {step.question}
          </h2>
        </div>
      )}

      {/* Two-column layout: image (left) | items (right) */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(20px, 3vw, 48px)",
        alignItems: "stretch",
        flex: 1,
        minHeight: 0,
      }} className="order-layout-grid">
        {/* Image Area - left side */}
        <div style={{
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize: "clamp(18px, 2.5vw, 28px)",
          fontWeight: 600,
          padding: "24px",
          position: "relative",
          overflow: "hidden",
        }}>
          {step.imageUrl ? (
            <img 
              src={step.imageUrl} 
              alt={step.question || "Order illustration"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          ) : (
            <span>IMAGEN</span>
          )}
        </div>

        {/* Items list - right side */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2vh, 20px)" }}>
          {orderedItemIds.map((itemId, index) => {
            const item = step.items.find((it) => it.id === itemId)
            if (!item) return null
            const isCorrect = hasEvaluated && item.correctOrder === index + 1

            return (
              <div
                key={itemId}
                style={{
                  padding: "clamp(16px, 2.5vh, 24px)",
                  fontSize: "clamp(16px, 2vw, 22px)",
                  fontWeight: 700,
                  color: "#1e293b",
                  background: "#ffffff",
                  border: `3px solid ${hasEvaluated ? (isCorrect ? "#10b981" : "#ef4444") : ORDER_ITEM_BLUE}`,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                  <span style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, minWidth: "32px", textAlign: "center" }}>
                    {index + 1}
                  </span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {hasEvaluated && (
                    <span style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>
                      {isCorrect ? "✓" : "✗"}
                    </span>
                  )}
                </div>
                {!hasEvaluated && (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        background: "#e2e8f0",
                        border: "none",
                        cursor: index === 0 ? "not-allowed" : "pointer",
                        opacity: index === 0 ? 0.5 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      aria-label="Move up"
                    >
                      <svg
                        style={{ width: "20px", height: "20px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === orderedItemIds.length - 1}
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        background: "#e2e8f0",
                        border: "none",
                        cursor: index === orderedItemIds.length - 1 ? "not-allowed" : "pointer",
                        opacity: index === orderedItemIds.length - 1 ? 0.5 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      aria-label="Move down"
                    >
                      <svg
                        style={{ width: "20px", height: "20px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .order-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </>
  )

  if (useFullScreenLayout) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
        minHeight: 0,
        flex: 1,
        padding: "2rem 1.5rem",
        background: "#f1f5f9",
        boxSizing: "border-box",
      }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "1400px", padding: "0 clamp(20px, 4vw, 60px)", minHeight: 0 }}>
          {content}
        </div>
        {buttonsRow}
      </div>
    )
  }

  return (
    <div className={sharedStyles.container}>
      {step.title && <h2 className={sharedStyles.title}>{step.title}</h2>}
      {step.description && <p className={sharedStyles.description}>{step.description}</p>}
      {content}
    </div>
  )
}


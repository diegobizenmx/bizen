"use client"

import React, { useState, useEffect, useRef } from "react"
import { MatchStepFields } from "@/types/lessonTypes"
import { sharedStyles } from "../sharedStyles"
import { playCorrectSound, playIncorrectSound } from "../lessonSounds"
// LessonProgressHeader now shown in LessonScreen for all slides

interface MatchStepProps {
  step: MatchStepFields & { id: string; title?: string; description?: string; fullScreen?: boolean; continueLabel?: string }
  onAnswered: (result: { isCompleted: boolean; isCorrect?: boolean; answerData?: any }) => void
  matches?: Array<{ leftId: string; rightId: string }>
  onExit?: () => void
  onContinue?: () => void
  isContinueEnabled?: boolean
  currentStepIndex?: number
  totalSteps?: number
  streak?: number
  stars?: 1 | 2 | 3
}

const CONCEPT_BORDER_BLUE = "#2563eb"

export function MatchStep({ step, onAnswered, matches: initialMatches = [], onExit, onContinue, isContinueEnabled, currentStepIndex = 0, totalSteps = 1, streak = 0, stars = 3 }: MatchStepProps) {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null)
  const [matches, setMatches] = useState<Array<{ leftId: string; rightId: string }>>(
    initialMatches
  )
  const [hasEvaluated, setHasEvaluated] = useState(false)
  const hasPlayedSound = useRef(false)
  const onAnsweredRef = useRef(onAnswered)
  onAnsweredRef.current = onAnswered

  useEffect(() => {
    // Check if all pairs are matched
    const allMatched = step.leftItems.every((leftItem) =>
      matches.some((match) => match.leftId === leftItem.id)
    )
    if (allMatched && !hasEvaluated) {
      const isCorrect = step.correctPairs.every((correctPair) =>
        matches.some(
          (match) =>
            match.leftId === correctPair.leftId && match.rightId === correctPair.rightId
        )
      )

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

      onAnsweredRef.current({
        isCompleted: true,
        isCorrect,
        answerData: { matches: [...matches] },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onAnswered omitted to avoid infinite loop
  }, [matches, step.leftItems, step.correctPairs, hasEvaluated])

  const handleLeftClick = (leftId: string) => {
    if (selectedLeftId === leftId) {
      setSelectedLeftId(null)
    } else {
      setSelectedLeftId(leftId)
    }
  }

  const handleRightClick = (rightId: string) => {
    if (!selectedLeftId || hasEvaluated) return

    // Remove any existing match for this left item
    setMatches((prev) => prev.filter((m) => m.leftId !== selectedLeftId))
    // Add new match
    setMatches((prev) => [...prev, { leftId: selectedLeftId, rightId }])
    setSelectedLeftId(null)
  }

  const getMatchedRightId = (leftId: string) => {
    return matches.find((m) => m.leftId === leftId)?.rightId
  }

  const isMatchCorrect = (leftId: string, rightId: string) => {
    return step.correctPairs.some(
      (pair) => pair.leftId === leftId && pair.rightId === rightId
    )
  }

  const getMatchStyle = (leftId: string, rightId: string | undefined) => {
    if (!hasEvaluated || !rightId) {
      return ""
    }
    const isCorrect = isMatchCorrect(leftId, rightId)
    return isCorrect
      ? "bg-emerald-600/25 border-emerald-500 ring-2 ring-emerald-400"
      : "bg-red-600/20 border-red-500 ring-2 ring-red-500"
  }

  // Same full-screen layout and button position/colors as first slides (InfoStep, MCQStep, TrueFalseStep)
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
      {/* Title: ENLAZA LOS CONCEPTOS */}
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
          {step.question || "ENLAZA LOS CONCEPTOS"}
        </h2>
      </div>

      {/* 3-column layout: left items | right items | image */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1.4fr",
        gap: "clamp(20px, 3vw, 48px)",
        alignItems: "stretch",
        flex: 1,
        minHeight: 0,
      }} className="match-layout-grid">
        {/* Left Items Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2vh, 20px)" }}>
          {step.leftItems.map((leftItem) => {
            const matchedRightId = getMatchedRightId(leftItem.id)
            const isSelected = selectedLeftId === leftItem.id
            return (
              <button
                key={leftItem.id}
                onClick={() => !hasEvaluated && handleLeftClick(leftItem.id)}
                disabled={hasEvaluated}
                style={{
                  padding: "clamp(16px, 2.5vh, 24px)",
                  fontSize: "clamp(16px, 2vw, 22px)",
                  fontWeight: 700,
                  color: "#1e293b",
                  background: "#ffffff",
                  border: isSelected ? "3px solid #3b82f6" : `3px solid ${hasEvaluated && matchedRightId ? (isMatchCorrect(leftItem.id, matchedRightId) ? "#10b981" : "#ef4444") : CONCEPT_BORDER_BLUE}`,
                  borderRadius: "12px",
                  cursor: hasEvaluated ? "default" : "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "center",
                  width: "100%",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span>{leftItem.label}</span>
                  {hasEvaluated && matchedRightId && (
                    <span style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>
                      {isMatchCorrect(leftItem.id, matchedRightId) ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Right Items Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2vh, 20px)" }}>
          {step.rightItems.map((rightItem) => {
            const isMatched = matches.some((m) => m.rightId === rightItem.id)
            const matchedLeftId = matches.find((m) => m.rightId === rightItem.id)?.leftId
            return (
              <button
                key={rightItem.id}
                onClick={() => handleRightClick(rightItem.id)}
                disabled={!selectedLeftId || isMatched || hasEvaluated}
                style={{
                  padding: "clamp(16px, 2.5vh, 24px)",
                  fontSize: "clamp(16px, 2vw, 22px)",
                  fontWeight: 700,
                  color: "#1e293b",
                  background: "#ffffff",
                  border: `3px solid ${hasEvaluated && isMatched && matchedLeftId ? (isMatchCorrect(matchedLeftId, rightItem.id) ? "#10b981" : "#ef4444") : CONCEPT_BORDER_BLUE}`,
                  borderRadius: "12px",
                  cursor: hasEvaluated ? "default" : (!selectedLeftId || isMatched ? "not-allowed" : "pointer"),
                  opacity: (!selectedLeftId || isMatched) && !hasEvaluated ? 0.5 : 1,
                  transition: "all 0.2s ease",
                  textAlign: "center",
                  width: "100%",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span>{rightItem.label}</span>
                  {hasEvaluated && isMatched && matchedLeftId && (
                    <span style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>
                      {isMatchCorrect(matchedLeftId, rightItem.id) ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Image Area - displays actual image if provided */}
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
              alt={step.question || "Match illustration"}
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
      </div>

      <style>{`
        @media (max-width: 767px) {
          .match-layout-grid {
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
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "1600px", padding: "0 clamp(20px, 4vw, 60px)", minHeight: 0 }}>
          {content}
        </div>
        {buttonsRow}
      </div>
    )
  }

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "clamp(16px, 3vh, 40px) clamp(20px, 4vw, 60px)",
      maxWidth: "1600px",
      margin: "0 auto",
    }}>
      {content}
    </div>
  )
}


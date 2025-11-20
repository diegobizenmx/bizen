"use client"

import React, { useState, useEffect, useRef } from "react"
import { MatchStepFields } from "@/types/lessonTypes"
import { sharedStyles } from "../sharedStyles"
import { playCorrectSound, playIncorrectSound } from "../lessonSounds"

interface MatchStepProps {
  step: MatchStepFields & { id: string; title?: string; description?: string }
  onAnswered: (result: { isCompleted: boolean; isCorrect?: boolean; answerData?: any }) => void
  matches?: Array<{ leftId: string; rightId: string }>
}

export function MatchStep({ step, onAnswered, matches: initialMatches = [] }: MatchStepProps) {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null)
  const [matches, setMatches] = useState<Array<{ leftId: string; rightId: string }>>(
    initialMatches
  )
  const [hasEvaluated, setHasEvaluated] = useState(false)
  const hasPlayedSound = useRef(false)

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
      
      onAnswered({ 
        isCompleted: true, 
        isCorrect,
        answerData: { matches: [...matches] }
      })
    }
  }, [matches, step.leftItems, step.correctPairs, onAnswered, hasEvaluated])

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
      ? "bg-green-600/20 border-green-500 ring-2 ring-green-500"
      : "bg-red-600/20 border-red-500 ring-2 ring-red-500"
  }

  return (
    <div className={sharedStyles.container}>
      {step.title && <h2 className={sharedStyles.title}>{step.title}</h2>}
      {step.description && <p className={sharedStyles.description}>{step.description}</p>}
      {step.question && <h3 className={sharedStyles.question}>{step.question}</h3>}
      <div className={sharedStyles.matchContainer}>
        {/* Left Items */}
        <div className="space-y-3 md:space-y-4">
          <h4 className="text-sm md:text-base font-semibold text-slate-400 mb-3">
            Match these:
          </h4>
          {step.leftItems.map((leftItem) => {
            const matchedRightId = getMatchedRightId(leftItem.id)
            const isSelected = selectedLeftId === leftItem.id
            return (
              <button
                key={leftItem.id}
                onClick={() => !hasEvaluated && handleLeftClick(leftItem.id)}
                disabled={hasEvaluated}
                className={`${sharedStyles.matchItem} ${getMatchStyle(leftItem.id, matchedRightId)} w-full text-left transition-all duration-300 ${
                  isSelected && !hasEvaluated ? "ring-2 ring-blue-500" : ""
                } ${hasEvaluated ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-lg">{leftItem.label}</span>
                  {hasEvaluated && matchedRightId && (
                    <span className="text-2xl ml-2">
                      {isMatchCorrect(leftItem.id, matchedRightId) ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Right Items */}
        <div className="space-y-3 md:space-y-4">
          <h4 className="text-sm md:text-base font-semibold text-slate-400 mb-3">
            With these:
          </h4>
          {step.rightItems.map((rightItem) => {
            const isMatched = matches.some((m) => m.rightId === rightItem.id)
            const matchedLeftId = matches.find((m) => m.rightId === rightItem.id)?.leftId
            return (
              <button
                key={rightItem.id}
                onClick={() => handleRightClick(rightItem.id)}
                disabled={!selectedLeftId || isMatched || hasEvaluated}
                className={`${sharedStyles.matchItem} ${getMatchStyle(matchedLeftId || '', rightItem.id)} w-full text-left transition-all duration-300 ${
                  hasEvaluated ? 'cursor-default' : ''
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-lg">{rightItem.label}</span>
                  {hasEvaluated && isMatched && matchedLeftId && (
                    <span className="text-2xl ml-2">
                      {isMatchCorrect(matchedLeftId, rightItem.id) ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}


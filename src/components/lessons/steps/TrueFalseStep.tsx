"use client"

import React, { useState } from "react"
import { TrueFalseStepFields } from "@/types/lessonTypes"
import { sharedStyles } from "../sharedStyles"
import { playCorrectSound, playIncorrectSound } from "../lessonSounds"

interface TrueFalseStepProps {
  step: TrueFalseStepFields & { id: string; title?: string; description?: string }
  onAnswered: (result: { isCompleted: boolean; isCorrect?: boolean; answerData?: any }) => void
  selectedValue?: boolean
}

export function TrueFalseStep({
  step,
  onAnswered,
  selectedValue: initialValue,
}: TrueFalseStepProps) {
  const [selectedValue, setSelectedValue] = useState<boolean | undefined>(initialValue)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleSelect = (value: boolean) => {
    setSelectedValue(value)
    const isCorrect = value === step.correctValue
    setShowFeedback(true)
    
    // Play sound
    if (isCorrect) {
      playCorrectSound()
    } else {
      playIncorrectSound()
    }
    
    onAnswered({ 
      isCompleted: true, 
      isCorrect,
      answerData: { selectedValue: value }
    })
  }

  const getButtonStyle = (value: boolean) => {
    if (!showFeedback || selectedValue !== value) {
      return "bg-slate-700 hover:bg-slate-600 text-white"
    }
    const isCorrect = value === step.correctValue
    return isCorrect
      ? "bg-green-600 text-white ring-2 ring-green-400"
      : "bg-red-600 text-white ring-2 ring-red-400"
  }

  return (
    <div className={sharedStyles.container}>
      {step.title && <h2 className={sharedStyles.title}>{step.title}</h2>}
      {step.description && <p className={sharedStyles.description}>{step.description}</p>}
      <h3 className={sharedStyles.question}>{step.statement}</h3>
      <div className={`${sharedStyles.flexRow} mt-6`}>
        <button
          onClick={() => handleSelect(true)}
          disabled={showFeedback}
          className={`${sharedStyles.button} ${sharedStyles.spacing.md} flex-1 transition-all duration-300 ${getButtonStyle(true)} ${
            showFeedback ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-base md:text-lg font-semibold">Verdadero</span>
            {showFeedback && selectedValue === true && (
              <span className="text-2xl">
                {step.correctValue === true ? '✓' : '✗'}
              </span>
            )}
          </div>
        </button>
        <button
          onClick={() => handleSelect(false)}
          disabled={showFeedback}
          className={`${sharedStyles.button} ${sharedStyles.spacing.md} flex-1 transition-all duration-300 ${getButtonStyle(false)} ${
            showFeedback ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-base md:text-lg font-semibold">Falso</span>
            {showFeedback && selectedValue === false && (
              <span className="text-2xl">
                {step.correctValue === false ? '✓' : '✗'}
              </span>
            )}
          </div>
        </button>
      </div>
      {showFeedback && step.explanation && (
        <div className={`mt-4 p-4 rounded-xl ${
          selectedValue === step.correctValue
            ? 'bg-green-600/20 border border-green-500'
            : 'bg-red-600/20 border border-red-500'
        }`}>
          <p className={`text-sm md:text-base ${
            selectedValue === step.correctValue ? 'text-green-300' : 'text-red-300'
          }`}>
            {step.explanation}
          </p>
        </div>
      )}
    </div>
  )
}


"use client"

import React, { useState } from "react"
import { McqStepFields } from "@/types/lessonTypes"
import { sharedStyles } from "../sharedStyles"
import { playCorrectSound, playIncorrectSound } from "../lessonSounds"

interface MCQStepProps {
  step: McqStepFields & { id: string; title?: string; description?: string }
  onAnswered: (result: { isCompleted: boolean; isCorrect?: boolean; answerData?: any }) => void
  selectedOptionId?: string
}

export function MCQStep({ step, onAnswered, selectedOptionId: initialSelected }: MCQStepProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(initialSelected)
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({})

  const handleSelect = (optionId: string) => {
    setSelectedOptionId(optionId)
    const selectedOption = step.options.find((opt) => opt.id === optionId)
    const isCorrect = selectedOption?.isCorrect ?? false
    
    // Show visual feedback
    setShowFeedback({ [optionId]: true })
    
    // Play sound
    if (isCorrect) {
      playCorrectSound()
    } else {
      playIncorrectSound()
    }
    
    onAnswered({ 
      isCompleted: true, 
      isCorrect,
      answerData: { selectedOptionId: optionId }
    })
  }

  return (
    <div className={sharedStyles.container}>
      {step.title && <h2 className={sharedStyles.title}>{step.title}</h2>}
      {step.description && <p className={sharedStyles.description}>{step.description}</p>}
      <h3 className={sharedStyles.question}>{step.question}</h3>
      <div className={sharedStyles.grid1Col}>
        {step.options.map((option) => {
          const isSelected = selectedOptionId === option.id
          const hasFeedback = showFeedback[option.id]
          const isCorrect = option.isCorrect
          
          // Determine button style based on selection and correctness
          let buttonClasses = sharedStyles.option
          if (isSelected && hasFeedback) {
            // Override with feedback colors
            buttonClasses = isCorrect 
              ? "p-4 md:p-5 rounded-xl bg-green-600/30 border-2 border-green-500 ring-2 ring-green-500 transition-all duration-300 text-left" 
              : "p-4 md:p-5 rounded-xl bg-red-600/30 border-2 border-red-500 ring-2 ring-red-500 transition-all duration-300 text-left"
          } else if (isSelected) {
            buttonClasses = `${sharedStyles.option} ${sharedStyles.optionSelected}`
          }
          
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={hasFeedback && isSelected}
              className={`${buttonClasses} ${
                hasFeedback && isSelected ? 'cursor-default opacity-100' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-base md:text-lg text-left flex-1">{option.label}</span>
                {isSelected && hasFeedback && (
                  <span className="ml-3 text-2xl">
                    {isCorrect ? '✓' : '✗'}
                  </span>
                )}
              </div>
              {isSelected && hasFeedback && option.explanation && (
                <p className={`mt-2 text-sm md:text-base text-left ${
                  isCorrect ? 'text-green-300' : 'text-red-300'
                }`}>
                  {option.explanation}
                </p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}


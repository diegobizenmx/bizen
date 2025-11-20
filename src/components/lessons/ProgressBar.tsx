"use client"

import React from "react"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  className?: string
}

/**
 * Responsive progress bar for lesson navigation
 * - Full width on mobile
 * - Centered + constrained on desktop (max-w-2xl)
 */
export function ProgressBar({ currentStep, totalSteps, className = "" }: ProgressBarProps) {
  const percentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0

  return (
    <div
      className={`w-full max-w-2xl mx-auto px-4 md:px-6 ${className}`}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={0}
      aria-valuemax={totalSteps}
      aria-label={`Lesson progress: step ${currentStep} of ${totalSteps}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs md:text-sm font-medium text-slate-400">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs md:text-sm font-medium text-slate-400">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}


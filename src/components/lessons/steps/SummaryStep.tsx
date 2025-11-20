"use client"

import React, { useEffect } from "react"
import { SummaryStepFields } from "@/types/lessonTypes"
import { sharedStyles } from "../sharedStyles"

interface SummaryStepProps {
  step: SummaryStepFields & { id: string; title?: string; description?: string }
  onAnswered: (result: { isCompleted: boolean; isCorrect?: boolean; answerData?: any }) => void
}

export function SummaryStep({ step, onAnswered }: SummaryStepProps) {
  useEffect(() => {
    // Summary steps are always completed immediately
    onAnswered({ isCompleted: true })
  }, [onAnswered])

  return (
    <div className={sharedStyles.container}>
      <h2 className={sharedStyles.title}>{step.title}</h2>
      <div className={sharedStyles.body}>{step.body}</div>
    </div>
  )
}


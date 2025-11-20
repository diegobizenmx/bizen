"use client"

import React, { useEffect } from "react"
import { InfoStepFields } from "@/types/lessonTypes"
import { sharedStyles } from "../sharedStyles"

interface InfoStepProps {
  step: InfoStepFields & { id: string; title?: string; description?: string }
  onAnswered: (result: { isCompleted: boolean; isCorrect?: boolean; answerData?: any }) => void
}

export function InfoStep({ step, onAnswered }: InfoStepProps) {
  useEffect(() => {
    // Info steps are always completed immediately (no interaction needed)
    onAnswered({ isCompleted: true })
  }, [onAnswered])

  return (
    <div className={sharedStyles.container}>
      {step.title && <h2 className={sharedStyles.title}>{step.title}</h2>}
      {step.description && <p className={sharedStyles.description}>{step.description}</p>}
      <div className={sharedStyles.body}>{step.body}</div>
    </div>
  )
}


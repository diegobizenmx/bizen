"use client"

import React, { useState, useEffect, useRef } from "react"
import { OrderStepFields } from "@/types/lessonTypes"
import { sharedStyles } from "../sharedStyles"
import { playCorrectSound, playIncorrectSound } from "../lessonSounds"

interface OrderStepProps {
  step: OrderStepFields & { id: string; title?: string; description?: string }
  onAnswered: (result: { isCompleted: boolean; isCorrect?: boolean; answerData?: any }) => void
  orderedItemIds?: string[]
}

export function OrderStep({
  step,
  onAnswered,
  orderedItemIds: initialOrder,
}: OrderStepProps) {
  const [orderedItemIds, setOrderedItemIds] = useState<string[]>(
    initialOrder ?? step.items.map((item) => item.id)
  )
  const [hasEvaluated, setHasEvaluated] = useState(false)
  const hasPlayedSound = useRef(false)

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
    
    onAnswered({ 
      isCompleted: true, 
      isCorrect,
      answerData: { orderedItemIds: [...orderedItemIds] }
    })
  }, [orderedItemIds, step.items, onAnswered, hasEvaluated])

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
      ? "bg-green-600/20 border-green-500 ring-2 ring-green-500"
      : "bg-red-600/20 border-red-500 ring-2 ring-red-500"
  }

  return (
    <div className={sharedStyles.container}>
      {step.title && <h2 className={sharedStyles.title}>{step.title}</h2>}
      {step.description && <p className={sharedStyles.description}>{step.description}</p>}
      {step.question && <h3 className={sharedStyles.question}>{step.question}</h3>}
      <div className={sharedStyles.orderList}>
        {orderedItemIds.map((itemId, index) => {
          const item = step.items.find((it) => it.id === itemId)
          if (!item) return null

          return (
            <div
              key={itemId}
              className={`${sharedStyles.orderItem} ${getItemStyle(item, index)} flex items-center justify-between gap-3 md:gap-4 transition-all duration-300`}
            >
              <div className="flex items-center gap-3 md:gap-4 flex-1">
                <span className="text-slate-400 font-bold text-lg md:text-xl w-8 md:w-10 text-center">
                  {index + 1}
                </span>
                <span className="text-base md:text-lg flex-1">{item.label}</span>
                {hasEvaluated && (
                  <span className="text-2xl ml-2">
                    {item.correctOrder === index + 1 ? '✓' : '✗'}
                  </span>
                )}
              </div>
              {!hasEvaluated && (
                <div className="flex gap-2">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="p-2 rounded-lg bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Move up"
                  >
                    <svg
                      className="w-5 h-5"
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
                    className="p-2 rounded-lg bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Move down"
                  >
                    <svg
                      className="w-5 h-5"
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
  )
}


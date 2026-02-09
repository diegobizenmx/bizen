"use client"

import React from "react"

interface LessonContainerProps {
  children: React.ReactNode
  className?: string
  /** Extra padding at bottom (e.g. when a fixed footer is present) */
  bottomPad?: number
  /** Padding at top so content is not hidden under fixed progress bar */
  topPad?: number
  /** When true, this div does not scroll (parent is the scroll container); used when progress bar is inside same scroll */
  noScroll?: boolean
}

/**
 * Lesson content wrapper. Single background, no extra gap.
 * When noScroll is true, parent handles scrolling and progress bar is above this content.
 */
export function LessonContainer({ children, className = "", bottomPad, topPad = 0, noScroll = false }: LessonContainerProps) {
  /* Inner: full height so slide content can use all space down to bottom */
  const inner = (
    <div
      style={{
        paddingTop: 16 + topPad,
        paddingBottom: bottomPad != null ? 16 + bottomPad : 16,
        paddingLeft: 24,
        paddingRight: 24,
        maxWidth: 720,
        margin: "0 auto",
        minHeight: 0,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {children}
    </div>
  )

  /* LOCKED: no scroll - fixed area, overflow hidden */
  return (
    <div
      className={`flex-1 min-h-0 overflow-hidden ${className} lesson-container-no-scroll`}
      style={{ background: "#f1f5f9", display: "flex", flexDirection: "column" }}
    >
      <div style={{ overflow: "hidden", minHeight: 0, flex: 1, display: "flex", flexDirection: "column" }}>
        {inner}
      </div>
    </div>
  )
}


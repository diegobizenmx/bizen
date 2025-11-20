"use client"

import React from "react"

interface LessonContainerProps {
  children: React.ReactNode
  className?: string
}

/**
 * Responsive container for lesson content
 * - Mobile-first: full width with padding
 * - Desktop: centered with max-width, increased padding
 * - Scrollable content with reserved space for footer
 */
export function LessonContainer({ children, className = "" }: LessonContainerProps) {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden -webkit-overflow-scrolling-touch min-h-0">
      <div className="min-h-full flex flex-col">
        <div className="flex-1 py-4 md:py-10 lg:py-16 px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto w-full">
            <div
              className={`rounded-2xl bg-slate-800/95 backdrop-blur-sm shadow-2xl border border-slate-700/50 p-6 md:p-8 lg:p-10 mb-24 md:mb-28 lg:mb-32 ${className}`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useRouter, useParams } from "next/navigation"
import { LessonEngine } from "@/components/lessons"
import { lesson1Steps } from "@/data/lessons/lesson1"

/**
 * Interactive Lesson Page
 * 
 * Route: /learn/[courseId]/[unitId]/[lessonId]/interactive
 * 
 * This page replaces the old lesson implementation with the new Duolingo-style
 * lesson engine. It maps lesson IDs to their corresponding lesson data.
 * 
 * Example routes:
 * - /learn/course-1/unit-1/l1-1/interactive → Lesson 1: "Historia del dinero"
 */
export default function InteractiveLessonPage() {
  const router = useRouter()
  const params = useParams()
  const { courseId, unitId, lessonId } = params

  // Map lesson IDs to their lesson data
  const getLessonSteps = () => {
    switch (lessonId) {
      case "l1-1":
        return lesson1Steps
      // Add more lessons here as they're created
      // case "l1-2":
      //   return lesson2Steps
      default:
        // Fallback: return lesson1Steps for now
        // In production, you might want to show an error or redirect
        console.warn(`Lesson ${lessonId} not found, using lesson1Steps as fallback`)
        return lesson1Steps
    }
  }

  const handleComplete = () => {
    // Navigate back to the lesson/course menu or next lesson
    // You can customize this based on your navigation structure
    const backPath = `/learn/${courseId}/${unitId}`
    router.push(backPath)
  }

  const handleExit = () => {
    // Navigate back to the lesson/course menu
    const backPath = `/learn/${courseId}/${unitId}`
    router.push(backPath)
  }

  const lessonSteps = getLessonSteps()

  return (
    <LessonEngine
      lessonSteps={lessonSteps}
      onComplete={handleComplete}
      onExit={handleExit}
    />
  )
}

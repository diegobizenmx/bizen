import type { LessonStep } from "@/types/lessonTypes"
import { lesson1Steps } from "./lesson1"
import { lesson1WhyMoneySteps } from "./lesson1-why-money-matters"
import { lesson2Steps } from "./lesson2"

/**
 * Maps lesson ID (e.g. "l1-1", "l1-2") to the lesson's steps.
 * ID format: l{courseOrder}-{lessonIndex}
 * - course-1 → l1-1, l1-2, l1-3, ...
 * - course-2 → l2-1, l2-2, ...
 *
 * l1-1 = "Why money matters" (Introduction to Personal Finance – Part 1+ open for more parts).
 * lesson1Steps (Historia del dinero) kept for reference / possible l1-3 later.
 */
export const lessonRegistry: Record<string, LessonStep[]> = {
  "l1-1": lesson1WhyMoneySteps,
  "l1-2": lesson2Steps,
  "l1-historia": lesson1Steps, // previous first lesson; can be re-used as l1-3 etc.
  // "l1-3": lesson3Steps,
  // "l2-1": lesson2Course2Steps,
}

/** Get steps for a lesson ID, or fallback to l1-1 (Why money matters) if not found. */
export function getStepsForLesson(lessonId: string | undefined): LessonStep[] {
  if (!lessonId) return lesson1WhyMoneySteps
  return lessonRegistry[lessonId] ?? lesson1WhyMoneySteps
}

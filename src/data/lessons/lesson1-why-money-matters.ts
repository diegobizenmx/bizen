import { LessonStep } from "@/types/lessonTypes"

/**
 * Lesson 1 – Introduction to Personal Finance (COMPLETE)
 * Title: Why money matters (even if nobody explained it to you)
 * Estimated duration: 5–7 min total
 *
 * Structure: PART 1 – Welcome + Explanation 1. PART 2 – MCQ 1, Explanation 2,
 * MCQ 2. PART 3 – Micro-reflection (s6), retry logic (engine), closing (s8).
 * Retry and closing logic are reusable for future lessons.
 */

export const lesson1WhyMoneySteps: LessonStep[] = [
  // -------------------------------------------------------------------------
  // SECTION 1 – Welcome screen
  // Purpose: Set an emotional hook and lower resistance.
  // One main text block, one primary button: "Empezar"
  // -------------------------------------------------------------------------
  {
    id: "s1_welcome",
    stepType: "info",
    title: "Por qué importa el dinero (aunque nadie te lo haya explicado)",
    body: "El dinero no lo es todo… pero toca casi todo en tu vida. Y está bien que quieras entenderlo mejor.",
    description: "Bienvenida",
    continueLabel: "Empezar",
    isAssessment: false,
  },

  // -------------------------------------------------------------------------
  // SECTION 2 – Explanation block 1
  // Purpose: Normalize the problem and remove guilt.
  // Content: Money in daily life, small decisions matter, not your fault,
  // learning gives calm and freedom. No numbers, no jargon.
  // -------------------------------------------------------------------------
  {
    id: "s2_explication_block_1",
    stepType: "info",
    title: "No estás solo",
    body: "El dinero está en tu día a día: en lo que compras, en lo que ahorras o en lo que te gustaría hacer. Las pequeñas decisiones de hoy suman con el tiempo. No saber mucho de dinero no es culpa tuya: a casi nadie nos lo enseñan. Lo bueno es que aprender te da tranquilidad y más libertad para elegir.",
    description: "Normalizar y quitar culpa",
    isAssessment: false,
  },

  // -------------------------------------------------------------------------
  // SECTION 3 – Interactive Question 1 (emotional diagnostic)
  // Purpose: Engage the student and identify misconceptions.
  // UX: Immediate feedback, green/red, sounds. Store step ID if incorrect for review.
  // -------------------------------------------------------------------------
  {
    id: "s3_question_why_struggle",
    stepType: "mcq",
    question: "¿Por qué crees que muchas personas tienen problemas con el dinero?",
    options: [
      {
        id: "opt_a",
        label: "Porque no ganan suficiente",
        isCorrect: false,
        explanation: "Está bien, sigue adelante.",
      },
      {
        id: "opt_b",
        label: "Porque nadie les enseñó a manejarlo bien",
        isCorrect: true,
        explanation: "Exacto. A casi nadie nos enseñan a manejar el dinero.",
      },
      {
        id: "opt_c",
        label: "Porque no les importa",
        isCorrect: false,
        explanation: "Está bien, sigue adelante.",
      },
      {
        id: "opt_d",
        label: "Porque es solo suerte",
        isCorrect: false,
        explanation: "Está bien, sigue adelante.",
      },
    ],
    description: "Pregunta emocional / diagnóstico",
    isAssessment: true,
    recordIncorrect: true,
  },

  // -------------------------------------------------------------------------
  // SECTION 4 – Explanation block 2
  // Purpose: Reframe what financial education actually means.
  // Tone: Simple, honest, no hype, no "get rich" language. Short paragraphs.
  // -------------------------------------------------------------------------
  {
    id: "s4_explication_block_2",
    stepType: "info",
    title: "Qué es (y qué no es) la educación financiera",
    body: "Aprender de dinero no es para “volverte rico”. Es para tomar mejores decisiones cada día.\n\nTe ayuda a evitar errores comunes y a no sentirte perdido con las cuentas.\n\nAl final, se trata de tener claridad y control sobre tu vida, no de tener más que los demás.",
    description: "Reframe educación financiera",
    isAssessment: false,
  },

  // -------------------------------------------------------------------------
  // SECTION 5 – Interactive Question 2 (situational)
  // Purpose: Connect money concepts to real life.
  // Same UX and logic as Question 1: feedback, colors, sounds, store if incorrect.
  // -------------------------------------------------------------------------
  {
    id: "s5_question_situational",
    stepType: "mcq",
    question: "¿Cuál de estas situaciones tiene más que ver con la educación financiera?",
    options: [
      {
        id: "opt_a",
        label: "Elegir una carrera",
        isCorrect: false,
        explanation: "Está bien, sigue adelante.",
      },
      {
        id: "opt_b",
        label: "Saber cuánto gastar y cuánto ahorrar cada mes",
        isCorrect: true,
        explanation: "Correcto. La educación financiera se vive en decisiones como esa.",
      },
      {
        id: "opt_c",
        label: "Tener muchos seguidores",
        isCorrect: false,
        explanation: "Está bien, sigue adelante.",
      },
      {
        id: "opt_d",
        label: "Sacar buenas notas",
        isCorrect: false,
        explanation: "Está bien, sigue adelante.",
      },
    ],
    description: "Pregunta situacional",
    isAssessment: true,
    recordIncorrect: true,
  },

  // -------------------------------------------------------------------------
  // SECTION 6 – Guided micro-reflection
  // Purpose: Slow the student down and make it personal. No writing required.
  // -------------------------------------------------------------------------
  {
    id: "s6_micro_reflection",
    stepType: "info",
    title: "Un momento para reflexionar",
    body: "Puede que aún no manejes mucho dinero. Pero ya tomas decisiones cada día.",
    description: "Micro-reflexión guiada",
    continueLabel: "Continuar",
    isAssessment: false,
  },

  // -------------------------------------------------------------------------
  // SECTION 7 – Retry logic (handled by engine)
  // Before closing, the engine re-displays only questions answered incorrectly,
  // same options, second attempt. Correct on retry: green, positive sound,
  // encouraging message. No shame or mention of failure.
  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // SECTION 8 – Lesson closing
  // Purpose: Close emotionally. Reinforce beginning, clarity, better decisions.
  // No promises of wealth. Primary button: "Next lesson".
  // -------------------------------------------------------------------------
  {
    id: "s8_closing",
    stepType: "summary",
    title: "Solo el comienzo",
    body: "No se trata de tener más dinero. Se trata de saber qué hacer con lo que tienes.\n\nEsto es solo el inicio. Con claridad y mejores decisiones, vas por buen camino.",
    description: "Cierre emocional",
    continueLabel: "Siguiente lección",
    isAssessment: false,
  },
]

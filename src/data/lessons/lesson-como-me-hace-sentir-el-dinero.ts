import type { LessonStep } from "@/types/lessonTypes"

/**
 * Lesson 2: Cómo me hace sentir el dinero
 * Theme: Mi relación con el dinero
 * Lesson ID: como-me-hace-sentir-el-dinero
 * Estimated duration: 12–15 minutes
 * Language: Content in Spanish, instructions in English.
 *
 * IMAGE PLACEHOLDERS (add assets and set imageUrl on the corresponding steps):
 * - Step cms-intro: [IMAGE PLACEHOLDER: teenager thinking about money with mixed emotions]
 * - Step cms-teoria-1: [IMAGE PLACEHOLDER: brain vs heart illustration]
 * - Step cms-match: [IMAGE PLACEHOLDER: icons representing different emotions]
 * - Step cms-scenario: [IMAGE PLACEHOLDER: teen looking at something desirable in a store]
 * - Step cms-key-idea: [IMAGE PLACEHOLDER: calm teen organizing money]
 */

export const lessonComoMeHaceSentirElDineroSteps: LessonStep[] = [
  // FLASHCARD 1 – Intro (Progressive intro)
  {
    id: "cms-intro",
    stepType: "info",
    title: "Cómo me hace sentir el dinero",
    body: "El dinero no solo se piensa.\n\nTambién se siente.",
    isAssessment: false,
    continueLabel: "Empezar",
    fullScreen: true,
    // imageUrl: "/lessons/como-me-siente/intro.png" – [IMAGE PLACEHOLDER: teenager thinking about money with mixed emotions]
  },

  // FLASHCARD 2 – Quick Poll (non-graded; emotional baseline)
  {
    id: "cms-poll",
    stepType: "mcq",
    question: "Cuando tienes que pagar algo, normalmente te sientes:",
    options: [
      { id: "opt-tranquilo", label: "Tranquilo", isCorrect: true },
      { id: "opt-nervioso", label: "Nervioso", isCorrect: true },
      { id: "opt-estresado", label: "Estresado", isCorrect: true },
      { id: "opt-indiferente", label: "Indiferente", isCorrect: true },
    ],
    isAssessment: false,
    recordIncorrect: false,
    continueLabel: "Continuar",
    fullScreen: true,
  },

  // FLASHCARD 3 – Theory
  {
    id: "cms-teoria-1",
    stepType: "info",
    body: "Las emociones influyen en cómo usamos el dinero.\n\nA veces más que la lógica.",
    isAssessment: false,
    continueLabel: "Continuar",
    fullScreen: true,
    // imageUrl: "/lessons/como-me-siente/cerebro-corazon.png" – [IMAGE PLACEHOLDER: brain vs heart illustration]
  },

  // FLASHCARD 4 – True / False
  {
    id: "cms-tf-1",
    stepType: "true_false",
    statement: "Tomamos decisiones de dinero solo con la razón.",
    correctValue: false,
    explanation: "Falso. Muchas decisiones se toman desde la emoción.",
    isAssessment: true,
    recordIncorrect: true,
    continueLabel: "Continuar",
    fullScreen: true,
  },

  // FLASHCARD 5 – Match concept to emotion
  {
    id: "cms-match",
    stepType: "match",
    question: "Relaciona la situación con la emoción más común.",
    leftItems: [
      { id: "left-saldo", label: "Ver mi saldo" },
      { id: "left-comprar", label: "Comprar algo que quiero" },
      { id: "left-deuda", label: "Pagar una deuda" },
      { id: "left-ahorrar", label: "Ahorrar" },
    ],
    rightItems: [
      { id: "right-ansiedad", label: "Ansiedad" },
      { id: "right-emocion", label: "Emoción" },
      { id: "right-estres", label: "Estrés" },
      { id: "right-tranquilidad", label: "Tranquilidad" },
    ],
    correctPairs: [
      { leftId: "left-saldo", rightId: "right-ansiedad" },
      { leftId: "left-comprar", rightId: "right-emocion" },
      { leftId: "left-deuda", rightId: "right-estres" },
      { leftId: "left-ahorrar", rightId: "right-tranquilidad" },
    ],
    isAssessment: true,
    recordIncorrect: true,
    continueLabel: "Continuar",
    fullScreen: true,
    // Feedback in UI: "Las emociones aparecen en situaciones financieras cotidianas."
    // [IMAGE PLACEHOLDER: icons representing different emotions]
  },

  // FLASHCARD 6 – Scenario decision (no correct answer; register emotion)
  {
    id: "cms-scenario",
    stepType: "mcq",
    question: "Ves algo que te gusta mucho, pero no lo tenías planeado comprar.\n\n¿Qué emoción aparece primero?",
    options: [
      { id: "opt-emocion", label: "Emoción", isCorrect: true },
      { id: "opt-ansiedad", label: "Ansiedad", isCorrect: true },
      { id: "opt-culpa", label: "Culpa", isCorrect: true },
      { id: "opt-indiferencia", label: "Indiferencia", isCorrect: true },
    ],
    isAssessment: false,
    recordIncorrect: false,
    continueLabel: "Continuar",
    fullScreen: true,
    // [IMAGE PLACEHOLDER: teen looking at something desirable in a store]
  },

  // FLASHCARD 7 – Theory
  {
    id: "cms-teoria-2",
    stepType: "info",
    body: "No es malo sentir emociones con el dinero.\n\nEl problema es decidir solo con ellas.",
    isAssessment: false,
    continueLabel: "Continuar",
    fullScreen: true,
  },

  // FLASHCARD 8 – Order by intensity (menor a mayor)
  {
    id: "cms-order",
    stepType: "order",
    question: "Ordena las emociones de menor a mayor intensidad cuando se trata de dinero.",
    items: [
      { id: "item-tranquilidad", label: "Tranquilidad", correctOrder: 1 },
      { id: "item-emocion", label: "Emoción", correctOrder: 2 },
      { id: "item-estres", label: "Estrés", correctOrder: 3 },
      { id: "item-miedo", label: "Miedo", correctOrder: 4 },
    ],
    isAssessment: true,
    recordIncorrect: true,
    continueLabel: "Continuar",
    fullScreen: true,
    // Feedback: "Las emociones más intensas suelen llevar a peores decisiones."
  },

  // FLASHCARD 9 – Multiple choice quiz
  {
    id: "cms-mcq",
    stepType: "mcq",
    question: "¿Qué emoción suele llevar a decisiones impulsivas?",
    options: [
      { id: "opt-tranquilidad", label: "Tranquilidad", isCorrect: false },
      {
        id: "opt-emocion",
        label: "Emoción",
        isCorrect: true,
        explanation: "Correcto. La emoción intensa puede nublar la decisión.",
      },
      { id: "opt-reflexion", label: "Reflexión", isCorrect: false },
      { id: "opt-paciencia", label: "Paciencia", isCorrect: false },
    ],
    isAssessment: true,
    recordIncorrect: true,
    continueLabel: "Continuar",
    fullScreen: true,
  },

  // FLASHCARD 10 – Reflection (non-graded; self-awareness)
  {
    id: "cms-reflexion",
    stepType: "mcq",
    question: "La emoción que más influye en mis decisiones con dinero es:",
    options: [
      { id: "opt-miedo", label: "Miedo", isCorrect: true },
      { id: "opt-estres", label: "Estrés", isCorrect: true },
      { id: "opt-emocion", label: "Emoción", isCorrect: true },
      { id: "opt-culpa", label: "Culpa", isCorrect: true },
    ],
    isAssessment: false,
    recordIncorrect: false,
    continueLabel: "Continuar",
    fullScreen: true,
  },

  // FLASHCARD 11 – Key idea
  {
    id: "cms-key-idea",
    stepType: "info",
    body: "Reconocer cómo me siento con el dinero\n\nes el primer paso para decidir mejor.",
    isAssessment: false,
    continueLabel: "Continuar",
    fullScreen: true,
    // imageUrl: "/lessons/como-me-siente/decidir-mejor.png" – [IMAGE PLACEHOLDER: calm teen organizing money]
  },

  // FLASHCARD 12 – Closure (Progress feedback)
  {
    id: "cms-cierre",
    stepType: "summary",
    title: "Lección completada",
    body: "Ahora sabes que el dinero también se siente.",
    isAssessment: false,
    continueLabel: "Siguiente lección: Lo que creo que el dinero dice de mí",
    fullScreen: true,
  },
]

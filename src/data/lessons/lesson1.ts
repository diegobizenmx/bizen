import { LessonStep } from "@/types/lessonTypes"

/**
 * Course 1 - Lesson 1: "Historia del dinero"
 * 
 * 15 steps covering the history of money, from barter to digital currency.
 * All text is in Spanish for the Mexican financial education app.
 */
export const lesson1Steps: LessonStep[] = [
  {
    id: "s1_intro",
    stepType: "info",
    title: "Historia del dinero",
    body: "Hoy entiendo cómo nació el dinero. Al principio, la gente no tenía billetes ni monedas. Todo era intercambio directo. Yo doy algo y recibo otra cosa. Con el tiempo esto se volvió un problema porque no siempre coincidían las necesidades. Por eso nació el dinero.",
    description: "Introducción a la historia del dinero",
    isAssessment: false,
  },
  {
    id: "s2_flash_trueque",
    stepType: "info",
    title: "¿Qué es el trueque?",
    body: "Trueque: sistema donde las personas intercambiaban objetos o servicios directamente, sin usar dinero. No había un valor estándar, todo dependía de lo que cada uno quería en ese momento.",
    description: "Definición de trueque",
    isAssessment: false,
  },
  {
    id: "s3_mcq_def_trueque",
    stepType: "mcq",
    isAssessment: true,
    title: "Define el trueque",
    question: "¿Qué es el trueque?",
    options: [
      {
        id: "o1",
        label: "Intercambio directo de objetos o servicios sin usar dinero.",
        isCorrect: true,
        explanation: "El trueque fue el sistema de intercambio antes de existir el dinero.",
      },
      {
        id: "o2",
        label: "Uso de monedas antiguas para comprar comida.",
        isCorrect: false,
        explanation: "Las monedas llegaron después del trueque.",
      },
      {
        id: "o3",
        label: "Pagos digitales por medio de una app.",
        isCorrect: false,
        explanation: "Eso es dinero moderno, no trueque.",
      },
    ],
    recordIncorrect: true,
  },
  {
    id: "s4_mcq_problema_trueque",
    stepType: "mcq",
    isAssessment: true,
    title: "Problema del trueque",
    question: "¿Cuál era el principal problema del trueque?",
    options: [
      {
        id: "o1",
        label: "No siempre coincidían las necesidades de las personas.",
        isCorrect: true,
        explanation: "Si la otra persona no quería lo que tú ofrecías, el intercambio no se podía hacer.",
      },
      {
        id: "o2",
        label: "Había muy pocos productos en el mercado.",
        isCorrect: false,
        explanation: "El problema no era la cantidad de productos, sino coordinar el intercambio.",
      },
      {
        id: "o3",
        label: "Las personas no sabían sumar ni restar.",
        isCorrect: false,
        explanation: "Las matemáticas no eran el problema principal del trueque.",
      },
    ],
    recordIncorrect: true,
  },
  {
    id: "s5_order_historia",
    stepType: "order",
    isAssessment: true,
    title: "Ordena la evolución del dinero",
    question: "Coloca en orden cómo evolucionó el dinero a través del tiempo.",
    items: [
      {
        id: "item1",
        label: "Trueque",
        correctOrder: 1,
      },
      {
        id: "item2",
        label: "Monedas de metal",
        correctOrder: 2,
      },
      {
        id: "item3",
        label: "Billetes",
        correctOrder: 3,
      },
      {
        id: "item4",
        label: "Dinero digital",
        correctOrder: 4,
      },
    ],
    recordIncorrect: true,
  },
  {
    id: "s6_match_conceptos",
    stepType: "match",
    isAssessment: true,
    title: "Relaciona los conceptos",
    question: "Une cada concepto con su definición correcta.",
    leftItems: [
      { id: "left1", label: "Trueque" },
      { id: "left2", label: "Monedas" },
      { id: "left3", label: "Billetes" },
      { id: "left4", label: "Dinero digital" },
    ],
    rightItems: [
      { id: "right1", label: "Valor que existe en cuentas o apps" },
      { id: "right2", label: "Papel con valor asignado por un gobierno" },
      { id: "right3", label: "Intercambio directo de objetos" },
      { id: "right4", label: "Metal con valor propio" },
    ],
    correctPairs: [
      { leftId: "left1", rightId: "right3" },
      { leftId: "left2", rightId: "right4" },
      { leftId: "left3", rightId: "right2" },
      { leftId: "left4", rightId: "right1" },
    ],
    recordIncorrect: true,
  },
  {
    id: "s7_fill_beneficios",
    stepType: "fill_blanks",
    isAssessment: true,
    title: "¿Para qué sirve el dinero?",
    question: "Completa la frase con las palabras correctas.",
    textParts: [
      { type: "text", content: "El dinero nació para hacer los intercambios más " },
      {
        type: "blank",
        id: "b1",
        correctOptionId: "opt1",
      },
      { type: "text", content: " y más " },
      {
        type: "blank",
        id: "b2",
        correctOptionId: "opt4",
      },
      { type: "text", content: "." },
    ],
    options: [
      { id: "opt1", label: "fáciles", isCorrect: true },
      { id: "opt2", label: "confusos", isCorrect: false },
      { id: "opt3", label: "pesados", isCorrect: false },
      { id: "opt4", label: "rápidos", isCorrect: true },
      { id: "opt5", label: "lentos", isCorrect: false },
      { id: "opt6", label: "caros", isCorrect: false },
    ],
    recordIncorrect: true,
  },
  {
    id: "s8_multi_dinero_antiguo",
    stepType: "multi_select",
    isAssessment: true,
    title: "¿Qué fue dinero alguna vez?",
    question: "Selecciona objetos que se usaron como dinero en la antigüedad.",
    options: [
      { id: "o1", label: "Oro", isCorrect: true },
      { id: "o2", label: "Sal", isCorrect: true },
      { id: "o3", label: "Granos", isCorrect: true },
      { id: "o4", label: "Tarjetas bancarias", isCorrect: false },
      { id: "o5", label: "Apps móviles", isCorrect: false },
    ],
    recordIncorrect: true,
  },
  {
    id: "s9_true_false_doble",
    stepType: "true_false",
    isAssessment: true,
    title: "Verdadero o falso",
    statement: "El dinero existió desde el inicio de la humanidad.",
    correctValue: false,
    explanation: "Primero existió el trueque. El dinero apareció mucho después.",
    recordIncorrect: true,
  },
  {
    id: "s10_story_maiz",
    stepType: "mcq",
    isAssessment: true,
    title: "Historia: Ana y el maíz",
    question: "Ana quiere cambiar maíz por pescado, pero el pescador no quiere maíz. ¿Cuál es el verdadero problema?",
    description: "Así funcionaba el trueque: si la otra persona no quería lo que tú ofrecías, era muy difícil hacer el intercambio.",
    options: [
      {
        id: "o1",
        label: "No coincidían las necesidades de las personas.",
        isCorrect: true,
        explanation: "Este es el problema central del trueque.",
      },
      {
        id: "o2",
        label: "Había muy poco maíz.",
        isCorrect: false,
        explanation: "El problema no era la cantidad, sino coordinar el intercambio.",
      },
      {
        id: "o3",
        label: "El pescado era demasiado caro.",
        isCorrect: false,
        explanation: "En el trueque no había precios fijos como en el dinero.",
      },
    ],
    recordIncorrect: true,
  },
  {
    id: "s11_image_dinero_moderno",
    stepType: "image_choice",
    isAssessment: true,
    title: "Dinero moderno",
    question: "¿Cuál imagen representa mejor el dinero moderno?",
    correctImageId: "img2", // Billetes y monedas
    imageOptions: [
      {
        id: "img1",
        label: "Lingotes de oro",
        imageAlt: "Lingotes de oro",
        imageId: "gold_bars",
      },
      {
        id: "img2",
        label: "Billetes y monedas",
        imageAlt: "Billetes y monedas",
        imageId: "cash_coins",
      },
      {
        id: "img3",
        label: "Bolsa de arroz",
        imageAlt: "Bolsa de arroz",
        imageId: "rice_bag",
      },
    ],
    recordIncorrect: true,
  },
  {
    id: "s12_order_frase",
    stepType: "order",
    isAssessment: true,
    title: "Ordena la frase",
    question: "Ordena las palabras para formar una frase correcta.",
    items: [
      {
        id: "item1",
        label: "El dinero",
        correctOrder: 1,
      },
      {
        id: "item2",
        label: "facilita",
        correctOrder: 2,
      },
      {
        id: "item3",
        label: "los intercambios",
        correctOrder: 3,
      },
      {
        id: "item4",
        label: "entre personas",
        correctOrder: 4,
      },
    ],
    recordIncorrect: true,
  },
  {
    id: "s13_yes_no_monedas",
    stepType: "true_false",
    isAssessment: true,
    title: "Monedas antiguas",
    statement: "Las primeras monedas estaban hechas de metales valiosos como oro y plata.",
    correctValue: true,
    explanation: "El metal tenía valor propio, por eso funcionaba como dinero confiable.",
    recordIncorrect: true,
  },
  {
    id: "s14_summary_conceptos",
    stepType: "summary",
    isAssessment: false,
    title: "Lo que aprendí hoy",
    body: "Hoy entendí que primero existió el trueque, pero era poco práctico. Después surgieron las monedas, los billetes y, finalmente, el dinero digital. El dinero hace que los intercambios sean más fáciles y más rápidos.",
  },
  // Note: Review steps (s15_review_dynamic) are built dynamically by the lesson engine
  // based on incorrect answers, so they don't need to be in this static array
]


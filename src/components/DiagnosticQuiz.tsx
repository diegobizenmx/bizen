"use client"

import React, { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

type QuizProps = {
  brandName?: string
  primaryColor?: string
  accentColor?: string
  delayMs?: number
  onComplete?: (results: QuizResults) => void
}

type QuizResults = {
  score: number
  totalQuestions: number
  scorePct: number
  answers: Answer[]
  studentName: string
  evaluatorNotes: string
}

type Answer = {
  qid: number
  choiceIndex: number
  isCorrect: boolean
}

type Question = {
  id: number
  type: string
  q: string
  options: string[]
  correct: number
  note?: string
}

/**
 * QuizBrandBuilders – React puro con avance automático
 * - 20 preguntas (16 opción múltiple + 4 V/F)
 * - Avanza automáticamente al seleccionar una opción (delay breve)
 * - Barra de progreso + porcentaje
 * - Resultados con totales, %, nombre del alumno, observaciones y firma
 * - Sin dependencias externas
 */

export default function DiagnosticQuiz({
  brandName = "Microcredencial Brand Builders – U. Mondragón",
  primaryColor = "#0F62FE",
  accentColor = "#111827",
  delayMs = 650,
  onComplete,
}: QuizProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  // ====== Banco de preguntas ======
  const questions = useMemo(
    () => [
      {
        id: 1,
        type: "mc",
        q: "¿Cuál de las siguientes opciones explica mejor el cambio principal en el marketing de influencia en los últimos años?",
        options: [
          "Las marcas se enfocan únicamente en influencers con mayor alcance global.",
          "Las estrategias pasaron de enfocarse en alcance masivo a priorizar la credibilidad y conexión con nichos.",
          "El contenido patrocinado perdió efectividad y dejó de usarse en redes sociales.",
          "Las campañas digitales se centran más en el producto que en la comunidad del creador.",
        ],
        correct: 1,
      },
      {
        id: 2,
        type: "mc",
        q: "¿Qué caracteriza principalmente a un microinfluencer?",
        options: [
          "Produce contenido profesional con apoyo de agencias y presupuestos elevados.",
          "Su conexión auténtica con audiencias pequeñas y nichos definidos.",
          "Su principal objetivo es obtener beneficios económicos en cada colaboración.",
          "Tiene menor impacto porque su contenido llega a pocas personas.",
        ],
        correct: 1,
      },
      {
        id: 3,
        type: "mc",
        q: "¿Cuál es una tendencia actual en plataformas sociales?",
        options: [
          "El contenido largo y técnico para audiencias profesionales.",
          "La reducción del uso de video debido al aumento de los podcasts.",
          "El formato de microvideos (reels, shorts, clips) para captar atención rápida.",
          "El regreso del contenido estático como principal herramienta de engagement.",
        ],
        correct: 2,
      },
      {
        id: 4,
        type: "mc",
        q: "Una estrategia efectiva para crecer orgánicamente en redes es:",
        options: [
          "Aumentar la frecuencia de publicación sin importar la calidad del contenido.",
          "Generar valor constante y fomentar la interacción genuina.",
          "Seguir tendencias virales sin adaptarlas al propósito de la marca.",
          "Optimizar publicaciones únicamente con hashtags populares.",
        ],
        correct: 1,
      },
      {
        id: 5,
        type: "mc",
        q: "¿Qué elemento es clave en la identidad digital?",
        options: [
          "Crear un personaje diferente al real para atraer más atención.",
          "Mantener coherencia visual y de mensaje en todas las plataformas.",
          "Usar un estilo formal en unas redes y humorístico en otras.",
          "Actualizar el contenido solo cuando cambie la estrategia comercial.",
        ],
        correct: 1,
      },
      {
        id: 6,
        type: "mc",
        q: "En el storytelling, ¿qué propósito cumple la narrativa personal?",
        options: [
          "Humanizar la marca y conectar emocionalmente con la audiencia.",
          "Mostrar logros académicos sin contexto.",
          "Imitar el estilo de comunicación de otros influencers.",
          "Evitar hablar de experiencias personales.",
        ],
        correct: 0,
      },
      {
        id: 7,
        type: "mc",
        q: "Una estrategia efectiva para transmitir confianza es:",
        options: [
          "Prometer resultados rápidos y exagerar logros.",
          "Mostrar coherencia entre lo que se dice y lo que se hace.",
          "Publicar solo cuando algo sale bien.",
          "Evitar opiniones personales.",
        ],
        correct: 1,
      },
      {
        id: 8,
        type: "mc",
        q: "¿Cuál de los siguientes factores contribuye más al posicionamiento de una marca personal?",
        options: [
          "La cantidad de publicaciones diarias.",
          "La claridad en el mensaje y la consistencia en el tiempo.",
          "Los filtros visuales de moda.",
          "El número de hashtags utilizados.",
        ],
        correct: 1,
      },
      {
        id: 9,
        type: "mc",
        q: "¿Cuál es un principio básico de imagen personal en entornos digitales?",
        options: [
          "Cambiar de estilo cada semana para mostrar versatilidad.",
          "Ignorar el lenguaje corporal y centrarse en la edición.",
          "Mostrar consistencia entre tu estilo visual y tu mensaje.",
          "Copiar la estética de referentes exitosos.",
        ],
        correct: 2,
      },
      {
        id: 10,
        type: "mc",
        q: "La comunicación no verbal frente a la cámara incluye:",
        options: [
          "Contacto visual, postura y gestos que transmiten seguridad.",
          "La elección del fondo o escenario de grabación.",
          "El uso de subtítulos y efectos visuales.",
          "La vestimenta del mismo color que el entorno.",
        ],
        correct: 0,
      },
      {
        id: 11,
        type: "mc",
        q: "¿Qué tip mejora la consistencia visual de un perfil?",
        options: [
          "Cambiar el estilo fotográfico según la red social.",
          "Usar una paleta de colores y estilo coherente.",
          "Publicar sin importar la iluminación.",
          "Evitar repetir el mismo tipo de contenido.",
        ],
        correct: 1,
      },
      {
        id: 12,
        type: "mc",
        q: "¿Qué aspecto influye más en la credibilidad visual de una persona?",
        options: [
          "Tener un fondo de color llamativo.",
          "Reflejar profesionalismo en la iluminación y presentación personal.",
          "Utilizar logotipos animados en cada video.",
          "Mostrar elementos costosos para inspirar éxito.",
        ],
        correct: 1,
      },
      {
        id: 13,
        type: "mc",
        q: "¿Qué elemento NO pertenece a los fundamentos de grabación?",
        options: ["Luz", "Encuadre", "Hashtags", "Sonido"],
        correct: 2,
      },
      {
        id: 14,
        type: "mc",
        q: "En la edición orientada al engagement, el ritmo del video se refiere a:",
        options: [
          "La cantidad de efectos visuales utilizados.",
          "La fluidez con que cambian los planos y se mantiene la atención.",
          "La velocidad de la música de fondo.",
          "La duración total del contenido.",
        ],
        correct: 1,
      },
      {
        id: 15,
        type: "mc",
        q: "Para crear un reel viral, lo más importante es:",
        options: [
          "Usar música popular sin propósito claro.",
          "Contar una historia clara y captar atención en los primeros 3 segundos.",
          "Publicar en horas aleatorias.",
          "Incluir textos largos con poca edición.",
        ],
        correct: 1,
      },
      {
        id: 16,
        type: "mc",
        q: "¿Cuál de los siguientes errores puede reducir el impacto de un video?",
        options: [
          "Tener buena iluminación natural.",
          "Tener mala iluminación o sonido deficiente.",
          "Mostrar autenticidad en cámara.",
          "Usar transiciones suaves y coherentes.",
        ],
        correct: 1,
      },
      {
        id: 17,
        type: "mc",
        q: "El mapa de relaciones en el networking sirve para:",
        options: [
          "Calcular el tamaño total de tu audiencia.",
          "Identificar conexiones clave y oportunidades de colaboración.",
          "Organizar los contactos por orden alfabético.",
          "Analizar estadísticas de visualización de contenido.",
        ],
        correct: 1,
      },
      {
        id: 18,
        type: "mc",
        q: "Un mensaje efectivo de networking debe:",
        options: [
          "Ser personalizado y mostrar interés genuino.",
          "Enviarse automáticamente a contactos nuevos.",
          "Mantener un tono general sin contexto.",
          "Ser breve y sin seguimiento posterior.",
        ],
        correct: 0,
      },
      {
        id: 19,
        type: "vf",
        q: "El reel de presentación debe centrarse en tus logros académicos únicamente.",
        options: ["Verdadero", "Falso"],
        correct: 1, // Falso
        note: "Debe reflejar tu propuesta de valor y personalidad.",
      },
      {
        id: 20,
        type: "vf",
        q: "Diseñar una estrategia de contenido mensual permite medir el crecimiento y ajustar el enfoque.",
        options: ["Verdadero", "Falso"],
        correct: 0, // Verdadero
      },
    ],
    []
  )

  // ====== Estado ======
  const [isRestoring, setIsRestoring] = useState(true)
  
  // Initialize with default values (no localStorage check to avoid hydration issues)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isLock, setIsLock] = useState(false)
  const [studentName, setStudentName] = useState("")
  const [notes, setNotes] = useState("")
  
  // Load from localStorage after mount to avoid hydration issues
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStep = localStorage.getItem('diagnosticQuiz_step')
      const savedAnswers = localStorage.getItem('diagnosticQuiz_answers')
      const savedName = localStorage.getItem('diagnosticQuiz_studentName')
      const savedNotes = localStorage.getItem('diagnosticQuiz_notes')
      
      console.log("🔄 Restoring quiz progress from localStorage:", {
        savedStep,
        savedAnswers: savedAnswers ? `${JSON.parse(savedAnswers).length} answers` : 'none',
        savedName,
        savedNotes: savedNotes ? 'yes' : 'no'
      })
      
      if (savedStep) {
        const stepNum = parseInt(savedStep, 10)
        console.log(`✅ Restoring to step ${stepNum}`)
        setStep(stepNum)
      }
      if (savedAnswers) {
        try {
          const parsedAnswers = JSON.parse(savedAnswers)
          console.log(`✅ Restoring ${parsedAnswers.length} answers`)
          setAnswers(parsedAnswers)
        } catch (e) {
          console.error("Failed to parse saved answers:", e)
        }
      }
      if (savedName) setStudentName(savedName)
      if (savedNotes) setNotes(savedNotes)
      
      // Finished restoring - now allow saving
      setTimeout(() => setIsRestoring(false), 100)
    }
  }, [])

  const total = questions.length
  const progress = Math.round((Math.min(step, total) / total) * 100)
  const isFinished = step >= total

  const totalCorrect = answers.filter((a) => a.isCorrect).length
  const scorePct = Math.round((totalCorrect / total) * 100)

  // Save to localStorage whenever state changes (but not during initial restore)
  React.useEffect(() => {
    if (!isRestoring && typeof window !== 'undefined') {
      localStorage.setItem('diagnosticQuiz_step', step.toString())
      console.log("💾 Saved step to localStorage:", step)
    }
  }, [step, isRestoring])

  React.useEffect(() => {
    if (!isRestoring && typeof window !== 'undefined') {
      localStorage.setItem('diagnosticQuiz_answers', JSON.stringify(answers))
      console.log("💾 Saved answers to localStorage:", answers.length)
    }
  }, [answers, isRestoring])

  React.useEffect(() => {
    if (!isRestoring && typeof window !== 'undefined') {
      localStorage.setItem('diagnosticQuiz_studentName', studentName)
    }
  }, [studentName, isRestoring])

  React.useEffect(() => {
    if (!isRestoring && typeof window !== 'undefined') {
      localStorage.setItem('diagnosticQuiz_notes', notes)
    }
  }, [notes, isRestoring])

  // ====== Interacciones ======
  function handleChoice(choiceIdx: number) {
    if (isFinished || isLock) return
    const q = questions[step]
    const isCorrect = choiceIdx === q.correct
    const entry: Answer = { qid: q.id, choiceIndex: choiceIdx, isCorrect }

    setAnswers((prev) => {
      const next = [...prev]
      next[step] = entry
      return next
    })

    // bloqueo + auto avance
    setIsLock(true)
    setTimeout(() => {
      setStep((s) => s + 1)
      setIsLock(false)
    }, delayMs)
  }


  async function saveAndContinue() {
    console.log("🚀 saveAndContinue called - attempting to save and redirect")
    setIsSaving(true)
    
    const results: QuizResults = {
      score: totalCorrect,
      totalQuestions: total,
      scorePct,
      answers,
      studentName,
      evaluatorNotes: notes,
    }

    console.log("📤 Sending results to API:", results)

    try {
      const response = await fetch("/api/diagnostic-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(results),
      })

      console.log("📡 API response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("✅ Quiz saved successfully!", data)
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.warn("⚠️ API returned error, but continuing anyway:", errorData)
      }
    } catch (error) {
      console.warn("⚠️ Failed to save quiz, but continuing to modules:", error)
    }

    // Always continue to modules regardless of save status
    if (onComplete) {
      onComplete(results)
    }

    // Clear progress localStorage but mark quiz as completed
    if (typeof window !== 'undefined') {
      localStorage.removeItem('diagnosticQuiz_step')
      localStorage.removeItem('diagnosticQuiz_answers')
      localStorage.removeItem('diagnosticQuiz_studentName')
      localStorage.removeItem('diagnosticQuiz_notes')
      // Mark quiz as completed to prevent retaking
      localStorage.setItem('diagnosticQuiz_completed', 'true')
      console.log("✅ Marked diagnostic quiz as completed in localStorage")
    }

    // Redirect to workbook download page
    console.log("🔄 Redirecting to /workbook-download")
    setIsSaving(false)
    router.push("/workbook-download")
  }

  // ====== UI ======
  const styles = {
    wrapper: {
      width: "100%",
      minHeight: "100vh",
      height: "100%",
      margin: "0",
      padding: "40px 0",
      fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      color: accentColor,
      background: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
    } as React.CSSProperties,
    header: {
      marginBottom: 16,
      padding: "0 40px",
    } as React.CSSProperties,
    card: {
      border: "none",
      borderTop: "1px solid rgba(0,0,0,0.08)",
      borderBottom: "1px solid rgba(0,0,0,0.08)",
      borderRadius: 0,
      padding: "40px",
      background: "#fff",
      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      flex: 1,
      display: "flex",
      flexDirection: "column",
    } as React.CSSProperties,
    brand: {
      fontSize: 24,
      fontWeight: 600,
      color: primaryColor,
      letterSpacing: 0.4,
      textTransform: "uppercase" as const,
      marginBottom: 4,
    } as React.CSSProperties,
    h1: {
      fontSize: 48,
      margin: 0,
    } as React.CSSProperties,
    progressWrap: {
      margin: "16px 0 20px",
    } as React.CSSProperties,
    barOuter: {
      width: "100%",
      height: 12,
      borderRadius: 12,
      background: "rgba(0,0,0,0.06)",
      overflow: "hidden" as const,
    } as React.CSSProperties,
    barInner: {
      height: "100%",
      width: `${progress}%`,
      background: primaryColor,
      transition: "width 300ms ease",
    } as React.CSSProperties,
    pctRow: { display: "flex", justifyContent: "space-between", fontSize: 24, opacity: 0.8, marginTop: 6 } as React.CSSProperties,
    qText: { fontSize: 34, lineHeight: 1.5, marginBottom: 18, fontWeight: 500 } as React.CSSProperties,
    footerRow: {
      display: "flex",
      gap: 12,
      justifyContent: "space-between",
      marginTop: 6,
      alignItems: "center",
    } as React.CSSProperties,
    ghost: {
      border: "1px solid rgba(0,0,0,0.12)",
      background: "#fff",
      color: accentColor,
      padding: "16px 26px",
      borderRadius: 10,
      cursor: "pointer",
      fontSize: 24,
      fontWeight: 600,
    } as React.CSSProperties,
    solid: {
      border: "1px solid transparent",
      background: primaryColor,
      color: "#fff",
      padding: "16px 26px",
      borderRadius: 10,
      cursor: "pointer",
      fontSize: 24,
      fontWeight: 600,
    } as React.CSSProperties,
    dim: { opacity: 0.6, pointerEvents: "none" as const } as React.CSSProperties,
    resultStat: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 18 } as React.CSSProperties,
    statBox: {
      border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: 12,
      padding: 20,
      textAlign: "center" as const,
      background: "#fafafa",
    } as React.CSSProperties,
    label: { fontSize: 22, opacity: 0.7 } as React.CSSProperties,
    big: { fontSize: 42, fontWeight: 700 } as React.CSSProperties,
    field: { width: "100%", padding: "16px 20px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.12)", fontSize: 24 } as React.CSSProperties,
    textarea: {
      width: "100%",
      minHeight: 120,
      padding: "16px 20px",
      borderRadius: 10,
      border: "1px solid rgba(0,0,0,0.12)",
      resize: "vertical" as const,
      fontSize: 24,
    } as React.CSSProperties,
    smallNote: { fontSize: 22, opacity: 0.7, marginTop: 6 } as React.CSSProperties,
  }

  const optionBtnStyle = (isSelected: boolean): React.CSSProperties => ({
    width: "100%",
    textAlign: "left" as const,
    padding: "24px 28px",
    borderRadius: 12,
    border: `2px solid ${isSelected ? primaryColor : "rgba(0,0,0,0.12)"}`,
    background: isSelected 
      ? "linear-gradient(135deg, rgba(15, 98, 254, 0.1), rgba(16, 185, 129, 0.1))" 
      : "linear-gradient(135deg, #fff, #f8faff)",
    cursor: "pointer",
    transition: "all 300ms ease",
    transform: isSelected ? "scale(0.99)" : "scale(1)",
    marginBottom: 12,
    outline: "none",
    fontSize: 26,
    fontWeight: 500,
    boxShadow: isSelected 
      ? "0 8px 25px rgba(15, 98, 254, 0.2)" 
      : "0 4px 15px rgba(0,0,0,0.08)",
    position: "relative" as const,
    overflow: "hidden" as const,
  })

  // Check if we restored from localStorage (only after mount to avoid hydration issues)
  const [hasRestoredProgress, setHasRestoredProgress] = React.useState(false)
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
    setHasRestoredProgress(step > 0 && answers.length > 0)
  }, [step, answers.length]) // Check step and answers

  // Billy with speech bubble state
  const [billyFrame, setBillyFrame] = React.useState(0)

  // Animate Billy's mouth
  React.useEffect(() => {
    const interval = setInterval(() => {
      setBillyFrame(prev => prev === 0 ? 1 : 0)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  // ====== Render ======
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        html, body, #__next {
          height: 100%;
          min-height: 100vh;
        }
        @media (max-width: 768px) {
          .quiz-wrapper {
            padding: 20px 0 !important;
          }
          .quiz-header {
            padding: 0 20px !important;
          }
          .quiz-card {
            padding: 20px !important;
            border-radius: 0 !important;
            margin-bottom: 160px !important; /* Space for Billy */
          }
          .quiz-footer-text {
            padding: 0 20px !important;
          }
          .quiz-h1 {
            font-size: 32px !important;
          }
          .quiz-subtitle {
            font-size: 20px !important;
          }
          .quiz-question {
            font-size: 26px !important;
          }
          .quiz-option {
            padding: 18px 20px !important;
            font-size: 22px !important;
          }
          .quiz-stat-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .billy-container {
            bottom: 10px !important;
            right: 10px !important;
            max-width: 280px !important;
          }
          .billy-bubble {
            font-size: 18px !important;
            padding: 12px 16px !important;
          }
          .billy-image {
            width: 100px !important;
            height: 100px !important;
          }
        }
      `}</style>
      <div style={styles.wrapper} className="quiz-wrapper">
      
      {/* Billy with speech bubble - always visible */}
      <div className="billy-container" style={{
        position: "fixed" as const,
        bottom: 20,
        right: 20,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "flex-end",
        gap: 12,
        maxWidth: 350,
      }}>
        {/* Speech bubble */}
        <div className="billy-bubble" style={{
          position: "relative" as const,
          background: "#fff",
          border: `3px solid ${primaryColor}`,
          borderRadius: 20,
          padding: "16px 20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}>
          <p style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 600,
            color: "#111",
            lineHeight: 1.4,
          }}>
            ¡Buena suerte, Dragón!<br />
            ¡Te irá bien!
          </p>
          {/* Speech bubble tail */}
          <div style={{
            position: "absolute" as const,
            bottom: -12,
            right: 30,
            width: 0,
            height: 0,
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderTop: `15px solid ${primaryColor}`,
          }} />
          <div style={{
            position: "absolute" as const,
            bottom: -8,
            right: 33,
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "12px solid #fff",
          }} />
        </div>
        
        {/* Billy character */}
        <div className="billy-image" style={{
          width: 120,
          height: 120,
          position: "relative" as const,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={billyFrame === 0 ? "/2.png" : "/3.png"}
            alt="Billy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
            }}
          />
        </div>
      </div>
      
      <div style={styles.header} className="quiz-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={styles.brand}>{brandName}</div>
          {hasMounted && hasRestoredProgress && !isFinished && (
            <div style={{ 
              fontSize: 20, 
              color: "#16a34a", 
              background: "#ecfdf5", 
              padding: "10px 18px", 
              borderRadius: 8,
              fontWeight: 600 
            }}>
              ✓ Progreso restaurado
            </div>
          )}
        </div>
        <motion.h1 
          animate={{
            y: [0, -3, 0],
            textShadow: [
              "0 0 0px rgba(15, 98, 254, 0)",
              "0 0 20px rgba(15, 98, 254, 0.4)",
              "0 0 0px rgba(15, 98, 254, 0)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            ...styles.h1,
            background: "linear-gradient(45deg, #0F62FE, #10B981, #8B5CF6, #0F62FE)",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 4s ease-in-out infinite",
          }} 
          className="quiz-h1"
        >
          🧠 TEST &ldquo;BRAND BUILDERS&rdquo; – Evaluación Diagnóstica
        </motion.h1>
        <motion.p 
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{ marginTop: 8, opacity: 0.85, fontSize: 26 }} 
          className="quiz-subtitle"
        >
          Total: 20 preguntas • Duración sugerida: 20–25 minutos
        </motion.p>
        {!isFinished && (
          <motion.p 
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{ marginTop: 6, fontSize: 24, opacity: 0.7 }}
          >
            💡 Tu progreso se guarda automáticamente. Puedes cerrar y volver más tarde.
          </motion.p>
        )}
      </div>

      <div style={styles.card} className="quiz-card">
        {/* Progreso */}
        <motion.div 
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          style={styles.progressWrap}
        >
          <div style={{
            ...styles.barOuter,
            background: "linear-gradient(90deg, rgba(15, 98, 254, 0.1), rgba(16, 185, 129, 0.1))",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <motion.div 
              animate={{
                boxShadow: [
                  "0 0 0px rgba(15, 98, 254, 0)",
                  "0 0 20px rgba(15, 98, 254, 0.5)",
                  "0 0 0px rgba(15, 98, 254, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                ...styles.barInner,
                background: "linear-gradient(90deg, #0F62FE, #10B981, #8B5CF6)",
                backgroundSize: "200% 200%",
                animation: "shimmer 3s ease-in-out infinite",
              }} 
            />
          </div>
          <div style={styles.pctRow}>
            <span style={{ 
              background: "linear-gradient(45deg, #0F62FE, #10B981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 600
            }}>Progreso</span>
            <span style={{ 
              background: "linear-gradient(45deg, #0F62FE, #10B981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 700
            }}>{progress}%</span>
          </div>
        </motion.div>

        {/* Cuerpo */}
        {!isFinished ? (
          <QuestionView
            q={questions[step]}
            idx={step}
            total={total}
            selected={answers[step]?.choiceIndex}
            onSelect={handleChoice}
            isLock={isLock}
            optionBtnStyle={optionBtnStyle}
            styles={styles}
          />
        ) : (
          <ResultsView
            saveAndContinue={saveAndContinue}
            isSaving={isSaving}
            styles={styles}
          />
        )}

        {/* Navigation buttons removed - quiz auto-advances on answer selection */}
      </div>

    </div>
    </>
  )
}

/* ---------- Subcomponentes ---------- */

function QuestionView({
  q,
  idx,
  total,
  selected,
  onSelect,
  isLock,
  optionBtnStyle,
  styles,
}: {
  q: Question
  idx: number
  total: number
  selected?: number
  onSelect: (idx: number) => void
  isLock: boolean
  optionBtnStyle: (isSelected: boolean) => React.CSSProperties
  styles: Record<string, React.CSSProperties>
}) {
  return (
    <div>
      <motion.div 
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          ...styles.qText,
          background: "linear-gradient(45deg, #0F62FE, #10B981, #8B5CF6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }} 
        className="quiz-question"
      >
        <strong style={{ 
          background: "linear-gradient(45deg, #0F62FE, #10B981)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>{idx + 1}.</strong> {q.q}
      </motion.div>
      <div>
        {q.options.map((opt, i) => {
          const isSelected = selected === i
          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              style={optionBtnStyle(isSelected)}
              className="quiz-option"
              disabled={isLock}
              animate={{
                y: [0, -1, 0],
                scale: isSelected ? [1, 1.02, 1] : [1, 1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1
              }}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                boxShadow: "0 8px 25px rgba(15, 98, 254, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = isSelected ? "scale(0.99)" : "scale(1)")}
            >
              {opt}
            </motion.button>
          )
        })}
      </div>
      {q.note && (
        <motion.div 
          animate={{
            y: [0, -1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
          style={styles.smallNote}
        >
          <em>Nota:</em> {q.note}
        </motion.div>
      )}
      <motion.div 
        animate={{
          y: [0, -1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        style={{ 
          marginTop: 10, 
          fontSize: 24, 
          opacity: 0.7, 
          fontWeight: 500,
          background: "linear-gradient(45deg, #0F62FE, #10B981)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {idx + 1} / {total}
      </motion.div>
    </div>
  )
}

function ResultsView({
  saveAndContinue,
  isSaving,
  styles,
}: {
  saveAndContinue: () => void
  isSaving: boolean
  styles: Record<string, React.CSSProperties>
}) {
  return (
    <div>
      <motion.h2 
        animate={{
          y: [0, -5, 0],
          textShadow: [
            "0 0 0px rgba(15, 98, 254, 0)",
            "0 0 20px rgba(15, 98, 254, 0.4)",
            "0 0 0px rgba(15, 98, 254, 0)"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ 
          marginTop: 0, 
          marginBottom: 20, 
          fontSize: 42, 
          textAlign: "center",
          background: "linear-gradient(45deg, #0F62FE, #10B981, #8B5CF6, #0F62FE)",
          backgroundSize: "300% 300%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "shimmer 4s ease-in-out infinite",
        }}
      >
        ¡Quiz Completado! 🎉
      </motion.h2>
      <motion.p 
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        style={{ 
          textAlign: "center", 
          fontSize: 28, 
          marginBottom: 30, 
          opacity: 0.85,
          background: "linear-gradient(45deg, #0F62FE, #10B981)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Gracias por completar la evaluación diagnóstica.
      </motion.p>
      
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20 }}>
        <motion.button
          type="button"
          onClick={saveAndContinue}
          disabled={isSaving}
          animate={{
            y: [0, -3, 0],
            boxShadow: [
              "0 8px 24px rgba(0,0,0,0.15)",
              "0 12px 32px rgba(15, 98, 254, 0.3)",
              "0 8px 24px rgba(0,0,0,0.15)"
            ]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ 
            scale: 1.05,
            y: -5,
            boxShadow: "0 16px 40px rgba(15, 98, 254, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          style={{ 
            ...styles.solid,
            opacity: isSaving ? 0.6 : 1,
            cursor: isSaving ? "not-allowed" : "pointer",
            background: "linear-gradient(135deg, #0F62FE 0%, #10B981 50%, #8B5CF6 100%)",
            backgroundSize: "200% 200%",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            if (!isSaving) {
              e.currentTarget.style.backgroundPosition = "100% 0";
            }
          }}
          onMouseLeave={(e) => {
            if (!isSaving) {
              e.currentTarget.style.backgroundPosition = "0% 0";
            }
          }}
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 0px rgba(255,255,255,0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {isSaving ? "Guardando..." : "Continuar a Módulos →"}
          </motion.span>
        </motion.button>
      </div>
    </div>
  )
}



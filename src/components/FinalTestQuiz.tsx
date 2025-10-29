"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import SectionPageHeader from "@/components/bizen/SectionPageHeader"

type Question = {
  id: number
  type: string
  q: string
  options: string[]
  correct: number
  note?: string
}

type Answer = {
  qid: number
  choiceIndex: number
  isCorrect: boolean
}

const QUESTIONS: Question[] = [
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
    correct: 1,
        note: "Debe reflejar tu propuesta de valor y personalidad.",
      },
      {
        id: 20,
        type: "vf",
        q: "Diseñar una estrategia de contenido mensual permite medir el crecimiento y ajustar el enfoque.",
        options: ["Verdadero", "Falso"],
    correct: 0,
  },
]

export default function FinalTestQuiz({
  onComplete,
}: {
  onComplete: () => void
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const question = QUESTIONS[currentQuestion]
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100
  const answered = currentQuestion < answers.length
  
  const handleFinish = async () => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    try {
      // Calculate score
      const correctAnswers = answers.filter(a => a.isCorrect).length
      const score = correctAnswers
      const totalQuestions = QUESTIONS.length
      
      // Format answers for submission
      const formattedAnswers = answers.map((answer, idx) => {
        const q = QUESTIONS[idx]
        return {
          questionIndex: q.id,
          questionText: q.q,
          userAnswer: String(answer.choiceIndex),
          correctAnswer: String(q.correct),
          isCorrect: answer.isCorrect,
        }
      })
      
      // Save to database
      const response = await fetch('/api/final-test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: formattedAnswers,
          score,
          totalQuestions,
        })
      })
      
      if (!response.ok) {
        console.error('Failed to save final test results')
      } else {
        console.log('Final test results saved successfully')
      }
      
      // Call onComplete callback
      onComplete()
    } catch (error) {
      console.error('Error submitting final test:', error)
      // Still call onComplete even if save fails
      onComplete()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSelect = (optionIndex: number) => {
    if (selectedOption !== null || answered) return
    
    setSelectedOption(optionIndex)
    const isCorrect = optionIndex === question.correct

    const newAnswer: Answer = {
      qid: question.id,
      choiceIndex: optionIndex,
      isCorrect,
    }

    setAnswers([...answers, newAnswer])

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      } else {
        // Last question - show results
        setShowResults(true)
      }
    }, 600)
  }

  const score = answers.filter(a => a.isCorrect).length
  const totalQuestions = QUESTIONS.length
  const scorePct = Math.round((score / totalQuestions) * 100)

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
      padding: "0",
      position: "relative" as const,
      overflow: "hidden" as const,
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden" as const,
        pointerEvents: "none" as const,
        zIndex: 0
      }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(15, 98, 254, ${0.05 + i * 0.02}) 0%, transparent 70%)`,
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100, 0],
              y: [0, Math.random() * 100, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <SectionPageHeader
        primaryColor="#0F62FE"
        progress={100}
        brandName="BIZEN"
        logoSrc="/bizen-mondragonlogo.png"
      />
      
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "clamp(16px, 5vw, 40px) clamp(16px, 5vw, 40px) clamp(40px, 10vw, 80px) clamp(16px, 5vw, 40px)",
        position: "relative" as const,
        zIndex: 1
      }}>
        {!showResults ? (
          <>
            {/* Progress Bar */}
            <motion.div 
              style={{
                marginBottom: "40px",
                background: "white",
                borderRadius: "16px",
                padding: "16px 20px",
                boxShadow: "0 8px 24px rgba(15, 98, 254, 0.15)",
                border: "2px solid rgba(15, 98, 254, 0.1)"
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
            <div style={{ 
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "20px" }}>📊</span>
                  <span style={{ fontSize: "16px", fontWeight: 700, color: "#64748b" }}>
                    Pregunta {currentQuestion + 1} de {QUESTIONS.length}
                  </span>
            </div>
                <motion.span 
                  style={{ 
                    fontSize: "18px", 
                    fontWeight: 800, 
                    background: "linear-gradient(135deg, #0F62FE, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  {Math.round(progress)}%
                </motion.span>
        </div>
              <div style={{
                height: "12px",
                background: "rgba(15, 98, 254, 0.1)",
                borderRadius: "999px",
                overflow: "hidden"
              }}>
                <motion.div
                  style={{
                    height: "100%",
                    borderRadius: "999px",
                    background: "linear-gradient(90deg, #0F62FE 0%, #3B82F6 50%, #60A5FA 100%)",
                    boxShadow: "0 4px 12px rgba(15, 98, 254, 0.4)"
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
      </div>
            </motion.div>

            {/* Question Card */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                background: "white",
                borderRadius: "clamp(20px, 5vw, 32px)",
                padding: "clamp(20px, 5vw, 60px) clamp(24px, 6vw, 70px)",
                boxShadow: "0 25px 80px rgba(15, 98, 254, 0.2)",
                border: "3px solid rgba(15, 98, 254, 0.15)",
                position: "relative" as const,
                overflow: "hidden" as const
              }}
            >
              {/* Decorative glow effect */}
              <motion.div
                style={{
                  position: "absolute",
                  top: -100,
                  right: -100,
                  width: "300px",
                  height: "300px",
                  background: "radial-gradient(circle, rgba(15, 98, 254, 0.1) 0%, transparent 70%)",
                  borderRadius: "50%"
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div style={{ position: "relative" as const, zIndex: 2 }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 32,
                  padding: "12px 20px",
                  background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
                  borderRadius: "12px",
                  border: "2px solid rgba(15, 98, 254, 0.2)",
                  width: "fit-content"
                }}>
                  <span style={{ fontSize: "24px" }}>❓</span>
                  <span style={{ 
                    fontSize: "14px", 
                    fontWeight: 700, 
                    color: "#0F62FE",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.5px"
                  }}>
                    Pregunta {currentQuestion + 1}
                  </span>
      </div>

                <h2 style={{
                  margin: "0 0 clamp(24px, 6vw, 48px) 0",
                  fontSize: "clamp(20px, 5vw, 36px)",
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #1e293b, #475569)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.4
                }}>
                  {question.q}
                </h2>
    </div>

              <div style={{
                display: "flex",
                flexDirection: "column" as const,
                gap: "24px",
                position: "relative" as const,
                zIndex: 2
              }}>
                {question.options.map((option, i) => {
                  const isSelected = i === selectedOption
                  const optionLabels = ["A", "B", "C", "D"]

  return (
                    <motion.button
              key={i}
                      onClick={() => handleSelect(i)}
                      disabled={answered}
                      style={{
                        padding: "clamp(16px, 4vw, 32px) clamp(20px, 5vw, 40px)",
                        borderRadius: "clamp(12px, 3vw, 20px)",
                        border: `3px solid ${isSelected ? "#0F62FE" : "#E2E8F0"}`,
                        background: isSelected 
                          ? "linear-gradient(135deg, #EFF6FF, #DBEAFE)" 
                          : "white",
                        textAlign: "left" as const,
                        cursor: answered ? "default" : "pointer",
                        fontSize: "clamp(16px, 4vw, 22px)",
                        fontWeight: 600,
                        color: isSelected ? "#0F62FE" : "#1e293b",
                        transition: "all 0.2s",
                        position: "relative" as const,
                        overflow: "hidden" as const,
                        boxShadow: isSelected 
                          ? "0 12px 40px rgba(15, 98, 254, 0.3)" 
                          : "0 4px 12px rgba(0, 0, 0, 0.08)"
                      }}
                      whileHover={!answered ? { 
                        scale: 1.03, 
                        y: -4,
                        boxShadow: isSelected ? "0 16px 48px rgba(15, 98, 254, 0.4)" : "0 8px 24px rgba(0, 0, 0, 0.12)"
                      } : {}}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                    >
                      {/* Option label badge */}
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "clamp(36px, 8vw, 48px)",
                        height: "clamp(36px, 8vw, 48px)",
                        borderRadius: "clamp(8px, 2vw, 12px)",
                        background: isSelected 
                          ? "linear-gradient(135deg, #0F62FE, #3B82F6)"
                          : "linear-gradient(135deg, #E2E8F0, #CBD5E1)",
                        color: isSelected ? "white" : "#64748b",
                        fontWeight: 900,
                        fontSize: "clamp(14px, 3vw, 18px)",
                        marginRight: "clamp(8px, 2vw, 16px)",
                        boxShadow: isSelected ? "0 4px 12px rgba(15, 98, 254, 0.4)" : "0 2px 8px rgba(0, 0, 0, 0.1)"
                      }}>
                        {optionLabels[i]}
                      </div>
                      <span>{option}</span>
                    </motion.button>
          )
        })}
      </div>
            </motion.div>
          </>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              background: "white",
              borderRadius: "clamp(20px, 5vw, 32px)",
              padding: "clamp(30px, 6vw, 60px) clamp(40px, 8vw, 80px)",
              boxShadow: "0 25px 80px rgba(15, 98, 254, 0.2)",
              textAlign: "center",
              border: "3px solid rgba(15, 98, 254, 0.15)",
              position: "relative" as const,
              overflow: "hidden" as const
            }}
          >
            {/* Floating decorative elements */}
            <motion.div
              style={{
                position: "absolute",
                top: -50,
                right: -50,
                width: "200px",
                height: "200px",
                background: "radial-gradient(circle, rgba(15, 98, 254, 0.1) 0%, transparent 70%)",
                borderRadius: "50%"
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div style={{ position: "relative" as const, zIndex: 2 }}>
              <motion.h1 
                style={{
                  margin: "0 0 clamp(16px, 4vw, 32px) 0",
                  fontSize: "clamp(28px, 6vw, 56px)",
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #0F62FE, #3B82F6, #60A5FA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ¡Test Final Completado!
              </motion.h1>

              <div
                style={{
                  marginBottom: "clamp(16px, 4vw, 32px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <img
                  src="/2.png"
                  alt="Billy"
                  style={{
                    width: "clamp(120px, 25vw, 200px)",
                    height: "clamp(120px, 25vw, 200px)",
                    objectFit: "contain",
                    filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))"
                  }}
                />
        </div>

              <motion.div
                style={{
                  fontSize: "clamp(28px, 6vw, 48px)",
                  fontWeight: 900,
                  marginBottom: "clamp(12px, 3vw, 24px)",
                  background: scorePct >= 70 
                    ? "linear-gradient(135deg, #10B981, #059669)"
                    : scorePct >= 50 
                    ? "linear-gradient(135deg, #F59E0B, #D97706)"
                    : "linear-gradient(135deg, #EF4444, #DC2626)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {score} / {totalQuestions} correctas
              </motion.div>

              <motion.div
                style={{
                  fontSize: "clamp(18px, 4vw, 28px)",
                  color: "#64748b",
                  marginBottom: "clamp(24px, 6vw, 48px)",
                  fontWeight: 600
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {scorePct}% de aciertos
              </motion.div>

              <motion.button
                onClick={handleFinish}
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05, y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: 0.95 }}
          style={{ 
                  padding: "clamp(12px, 3vw, 20px) clamp(32px, 7vw, 56px)",
                  borderRadius: "clamp(12px, 3vw, 16px)",
                  background: "linear-gradient(135deg, #0F62FE, #3B82F6)",
                  color: "white",
                  fontSize: "clamp(16px, 4vw, 20px)",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 12px 36px rgba(15, 98, 254, 0.4)",
                  transition: "all 0.2s"
                }}
              >
                {isSubmitting ? 'Guardando...' : 'Finalizar'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

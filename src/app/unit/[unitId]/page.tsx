"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"

interface Lesson {
  id: string
  title: string
  contentType: string // "video" | "reading" | "exercise"
  order: number
  isCompleted: boolean
  isLocked: boolean
  hasQuiz: boolean
  quizId?: string
  hasAssignment: boolean
  assignmentId?: string
  score?: number // quiz score if completed
  position: { x: number; y: number } // for monopoly board positioning
}

interface UnitDetail {
  id: string
  title: string
  courseTitle: string
  courseId: string
  description?: string
  lessons: Lesson[]
  progress: number
}

export default function UnitPathPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const unitId = params.unitId as string
  
  const [unit, setUnit] = useState<UnitDetail | null>(null)
  const [loadingUnit, setLoadingUnit] = useState(true)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }

    // TODO: Fetch real unit data from API
    const fetchUnit = async () => {
      try {
        setLoadingUnit(true)
        
        // Generate monopoly-board style positions for lessons
        const generatePath = (totalLessons: number) => {
          const positions: { x: number; y: number }[] = []
          const boardSize = 800 // Total board size in pixels
          const margin = 100
          const innerSize = boardSize - (margin * 2)
          
          // Calculate lessons per side
          const lessonsPerSide = Math.ceil(totalLessons / 4)
          
          let lessonIndex = 0
          
          // Bottom edge (left to right)
          for (let i = 0; i < lessonsPerSide && lessonIndex < totalLessons; i++) {
            positions.push({
              x: margin + (i * (innerSize / lessonsPerSide)),
              y: boardSize - margin
            })
            lessonIndex++
          }
          
          // Right edge (bottom to top)
          for (let i = 1; i < lessonsPerSide && lessonIndex < totalLessons; i++) {
            positions.push({
              x: boardSize - margin,
              y: boardSize - margin - (i * (innerSize / lessonsPerSide))
            })
            lessonIndex++
          }
          
          // Top edge (right to left)
          for (let i = 1; i < lessonsPerSide && lessonIndex < totalLessons; i++) {
            positions.push({
              x: boardSize - margin - (i * (innerSize / lessonsPerSide)),
              y: margin
            })
            lessonIndex++
          }
          
          // Left edge (top to bottom)
          for (let i = 1; i < lessonsPerSide && lessonIndex < totalLessons; i++) {
            positions.push({
              x: margin,
              y: margin + (i * (innerSize / lessonsPerSide))
            })
            lessonIndex++
          }
          
          return positions
        }

        // Placeholder data
        const totalLessons = 12
        const positions = generatePath(totalLessons)
        
        const lessons: Lesson[] = [
          { id: "l1", title: "¿Qué es el Dinero?", contentType: "reading", order: 1, isCompleted: true, isLocked: false, hasQuiz: true, quizId: "q1", hasAssignment: false, score: 85, position: positions[0] || { x: 100, y: 700 } },
          { id: "l2", title: "Historia del Dinero", contentType: "video", order: 2, isCompleted: true, isLocked: false, hasQuiz: true, quizId: "q2", hasAssignment: false, score: 92, position: positions[1] || { x: 200, y: 700 } },
          { id: "l3", title: "Tipos de Moneda", contentType: "reading", order: 3, isCompleted: true, isLocked: false, hasQuiz: false, hasAssignment: true, assignmentId: "a1", position: positions[2] || { x: 300, y: 700 } },
          { id: "l4", title: "Sistemas Financieros", contentType: "exercise", order: 4, isCompleted: false, isLocked: false, hasQuiz: true, quizId: "q3", hasAssignment: false, position: positions[3] || { x: 400, y: 700 } },
          { id: "l5", title: "Bancos Centrales", contentType: "reading", order: 5, isCompleted: false, isLocked: true, hasQuiz: true, hasAssignment: false, position: positions[4] || { x: 500, y: 700 } },
          { id: "l6", title: "Inflación y Deflación", contentType: "video", order: 6, isCompleted: false, isLocked: true, hasQuiz: true, hasAssignment: false, position: positions[5] || { x: 600, y: 700 } },
          { id: "l7", title: "Política Monetaria", contentType: "reading", order: 7, isCompleted: false, isLocked: true, hasQuiz: false, hasAssignment: true, position: positions[6] || { x: 700, y: 700 } },
          { id: "l8", title: "Mercados Financieros", contentType: "exercise", order: 8, isCompleted: false, isLocked: true, hasQuiz: true, hasAssignment: false, position: positions[7] || { x: 700, y: 500 } },
          { id: "l9", title: "Tasas de Interés", contentType: "reading", order: 9, isCompleted: false, isLocked: true, hasQuiz: true, hasAssignment: false, position: positions[8] || { x: 700, y: 300 } },
          { id: "l10", title: "Proyecto Final Unidad 1", contentType: "exercise", order: 10, isCompleted: false, isLocked: true, hasQuiz: false, hasAssignment: true, assignmentId: "a2", position: positions[9] || { x: 700, y: 100 } },
          { id: "l11", title: "Repaso General", contentType: "reading", order: 11, isCompleted: false, isLocked: true, hasQuiz: true, quizId: "q4", hasAssignment: false, position: positions[10] || { x: 500, y: 100 } },
          { id: "l12", title: "Examen Unidad 1", contentType: "exercise", order: 12, isCompleted: false, isLocked: true, hasQuiz: true, quizId: "q5", hasAssignment: false, position: positions[11] || { x: 300, y: 100 } }
        ]

        setUnit({
          id: unitId,
          title: "Unidad 1: Introducción a las Finanzas",
          courseTitle: "Fundamentos de Finanzas Personales",
          courseId: "course-1",
          description: "Aprende los conceptos fundamentales del dinero y los sistemas financieros",
          lessons,
          progress: 25
        })
      } catch (error) {
        console.error("Error fetching unit:", error)
      } finally {
        setLoadingUnit(false)
      }
    }

    fetchUnit()
  }, [user, loading, router, unitId])

  if (loading || loadingUnit) {
    return (
      <div style={{ display: "grid", placeItems: "center", minHeight: "60vh", fontFamily: "Montserrat, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 48,
            height: 48,
            border: "4px solid #0F62FE22",
            borderTop: "4px solid #0F62FE",
            borderRadius: "50%",
            margin: "0 auto 16px",
            animation: "spin 1s linear infinite",
          }} />
          <p style={{ color: "#666", fontSize: 16 }}>Cargando camino de aprendizaje...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (!user || !unit) return null

  const getContentIcon = (type: string) => {
    switch (type) {
      case "reading": return "📖"
      case "video": return "🎥"
      case "exercise": return "✏️"
      default: return "📄"
    }
  }

  const getStatusIcon = (lesson: Lesson) => {
    if (lesson.isLocked) return "🔒"
    if (lesson.isCompleted && lesson.score && lesson.score >= 90) return "⭐"
    if (lesson.isCompleted) return "✓"
    return ""
  }

  return (
    <main style={{ 
      minHeight: "100vh",
      padding: "clamp(20px, 4vw, 40px)",
      fontFamily: "Montserrat, sans-serif",
      background: "linear-gradient(to bottom, #f0f7ff 0%, #ffffff 100%)"
    }}>
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: "0 auto 32px" }}>
        <button
          onClick={() => router.push("/path")}
          style={{
            background: "transparent",
            border: "none",
            color: "#0F62FE",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          ← Volver al mapa
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 14, color: "#666", marginBottom: 4 }}>{unit.courseTitle}</div>
            <h1 style={{ 
              margin: 0, 
              fontSize: "clamp(24px, 5vw, 32px)", 
              fontWeight: 800,
              background: "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              {unit.title}
            </h1>
            {unit.description && (
              <p style={{ margin: "8px 0 0", color: "#666", fontSize: 15 }}>
                {unit.description}
              </p>
            )}
          </div>

          {/* Progress Badge */}
          <div style={{
            padding: "12px 24px",
            background: "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)",
            color: "#fff",
            borderRadius: 20,
            textAlign: "center"
          }}>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{unit.progress}%</div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>Completado</div>
          </div>
        </div>
      </div>

      {/* Monopoly Board Container */}
      <div style={{
        maxWidth: 1000,
        margin: "0 auto",
        position: "relative"
      }}>
        {/* SVG Path Connector */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            pointerEvents: "none"
          }}
          viewBox="0 0 800 800"
        >
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#0F62FE", stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: "#10B981", stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
          {unit.lessons.map((lesson, index) => {
            if (index === unit.lessons.length - 1) return null
            const nextLesson = unit.lessons[index + 1]
            if (!lesson?.position || !nextLesson?.position) return null
            return (
              <line
                key={`connector-${lesson.id}`}
                x1={lesson.position.x}
                y1={lesson.position.y}
                x2={nextLesson.position.x}
                y2={nextLesson.position.y}
                stroke="url(#pathGradient)"
                strokeWidth="6"
                strokeDasharray={lesson.isCompleted ? "0" : "10,10"}
                style={{
                  transition: "all 0.3s ease"
                }}
              />
            )
          })}
        </svg>

        {/* Lesson Board */}
        <div style={{
          position: "relative",
          width: "100%",
          paddingBottom: "100%", // Square aspect ratio
          background: "rgba(255,255,255,0.5)",
          borderRadius: 24,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          overflow: "hidden"
        }}>
          {/* Lessons as Squares */}
          {unit.lessons.map((lesson, index) => {
            const icon = getContentIcon(lesson.contentType)
            const statusIcon = getStatusIcon(lesson)

            return (
              <motion.div
                key={lesson.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                onClick={() => !lesson.isLocked && setSelectedLesson(lesson)}
                style={{
                  position: "absolute",
                  left: `${(lesson.position.x / 800) * 100}%`,
                  top: `${(lesson.position.y / 800) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: 90,
                  height: 90,
                  background: lesson.isLocked 
                    ? "linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)"
                    : lesson.isCompleted
                    ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                    : selectedLesson?.id === lesson.id
                    ? "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
                    : "linear-gradient(135deg, #0F62FE 0%, #4A90E2 100%)",
                  borderRadius: 16,
                  cursor: lesson.isLocked ? "not-allowed" : "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  boxShadow: lesson.isLocked 
                    ? "0 4px 12px rgba(0,0,0,0.15)"
                    : "0 8px 20px rgba(15, 98, 254, 0.3)",
                  transition: "all 0.3s ease",
                  zIndex: selectedLesson?.id === lesson.id ? 10 : 5,
                  opacity: lesson.isLocked ? 0.6 : 1,
                  border: selectedLesson?.id === lesson.id ? "3px solid #fff" : "none"
                }}
                whileHover={!lesson.isLocked ? { 
                  scale: 1.15, 
                  zIndex: 20,
                  boxShadow: "0 12px 32px rgba(15, 98, 254, 0.5)"
                } : {}}
                whileTap={!lesson.isLocked ? { scale: 0.95 } : {}}
              >
                {/* Lesson Number Badge */}
                <div style={{
                  position: "absolute",
                  top: -8,
                  left: -8,
                  width: 28,
                  height: 28,
                  background: "#fff",
                  color: lesson.isLocked ? "#6B7280" : "#0F62FE",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 800,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                }}>
                  {lesson.order}
                </div>

                {/* Status Badge */}
                {statusIcon && (
                  <div style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    width: 28,
                    height: 28,
                    background: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                  }}>
                    {statusIcon}
                  </div>
                )}

                {/* Content Icon */}
                <div style={{ fontSize: 32 }}>{icon}</div>
                
                {/* Lesson Type Label */}
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  textAlign: "center"
                }}>
                  {lesson.contentType === "reading" && "Lectura"}
                  {lesson.contentType === "video" && "Video"}
                  {lesson.contentType === "exercise" && "Práctica"}
                </div>
              </motion.div>
            )
          })}

          {/* Center Trophy/Star (optional decoration) */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 80,
            opacity: 0.1,
            zIndex: 0
          }}>
            🏆
          </div>
        </div>

        {/* Legend */}
        <div style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          flexWrap: "wrap",
          fontSize: 13,
          color: "#666"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 16, height: 16, background: "linear-gradient(135deg, #0F62FE 0%, #4A90E2 100%)", borderRadius: 4 }} />
            <span>Disponible</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 16, height: 16, background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", borderRadius: 4 }} />
            <span>Completado</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 16, height: 16, background: "linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)", borderRadius: 4 }} />
            <span>Bloqueado</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span>⭐</span>
            <span>Puntaje perfecto</span>
          </div>
        </div>
      </div>

      {/* Lesson Detail Modal */}
      <AnimatePresence>
        {selectedLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLesson(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 600,
                background: "#fff",
                borderRadius: 24,
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                overflow: "hidden"
              }}
            >
              {/* Modal Header */}
              <div style={{
                padding: "32px 28px",
                background: selectedLesson.isCompleted
                  ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                  : "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)",
                color: "#fff"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 12
                }}>
                  <div style={{
                    display: "inline-block",
                    padding: "6px 14px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: 600
                  }}>
                    Lección {selectedLesson.order}
                  </div>

                  <button
                    onClick={() => setSelectedLesson(null)}
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      border: "none",
                      color: "#fff",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: 18,
                      fontWeight: 700
                    }}
                  >
                    ×
                  </button>
                </div>

                <h2 style={{ 
                  margin: "0 0 12px", 
                  fontSize: 24, 
                  fontWeight: 800 
                }}>
                  {getContentIcon(selectedLesson.contentType)} {selectedLesson.title}
                </h2>

                {selectedLesson.isCompleted && selectedLesson.score && (
                  <div style={{
                    padding: "8px 16px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: 12,
                    fontSize: 14,
                    display: "inline-block"
                  }}>
                    ✓ Completado - Puntaje: {selectedLesson.score}%
                  </div>
                )}
              </div>

              {/* Modal Content */}
              <div style={{ padding: "28px" }}>
                {/* What's Included */}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700 }}>
                    📋 Esta lección incluye:
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{
                      padding: 16,
                      background: "#F9FAFB",
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 12
                    }}>
                      <div style={{ fontSize: 24 }}>{getContentIcon(selectedLesson.contentType)}</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>
                          Contenido Principal
                        </div>
                        <div style={{ fontSize: 13, color: "#666" }}>
                          {selectedLesson.contentType === "reading" && "Material de lectura"}
                          {selectedLesson.contentType === "video" && "Video educativo"}
                          {selectedLesson.contentType === "exercise" && "Ejercicios interactivos"}
                        </div>
                      </div>
                    </div>

                    {selectedLesson.hasQuiz && (
                      <div style={{
                        padding: 16,
                        background: "#EEF2FF",
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        border: "2px solid #0F62FE"
                      }}>
                        <div style={{ fontSize: 24 }}>📝</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>
                            Quiz de Evaluación
                          </div>
                          <div style={{ fontSize: 13, color: "#666" }}>
                            Evalúa tu comprensión
                          </div>
                        </div>
                        {selectedLesson.isCompleted && selectedLesson.score && (
                          <div style={{
                            padding: "6px 12px",
                            background: selectedLesson.score >= 70 ? "#D1FAE5" : "#FEE2E2",
                            color: selectedLesson.score >= 70 ? "#065F46" : "#DC2626",
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 700
                          }}>
                            {selectedLesson.score}%
                          </div>
                        )}
                      </div>
                    )}

                    {selectedLesson.hasAssignment && (
                      <div style={{
                        padding: 16,
                        background: "#FEF3C7",
                        borderRadius: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        border: "2px solid #F59E0B"
                      }}>
                        <div style={{ fontSize: 24 }}>📂</div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>
                            Asignación Práctica
                          </div>
                          <div style={{ fontSize: 13, color: "#92400E" }}>
                            Proyecto o tarea
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <Button
                    onClick={() => {
                      router.push(`/learn/${unit.courseId}/${unit.id}/${selectedLesson.id}`)
                    }}
                    style={{ width: "100%" }}
                  >
                    {selectedLesson.isCompleted ? "Revisar Lección →" : "Comenzar Lección →"}
                  </Button>

                  {selectedLesson.hasQuiz && selectedLesson.quizId && (
                    <Button
                      onClick={() => {
                        router.push(`/quiz/${selectedLesson.quizId}`)
                      }}
                      variant="ghost"
                      style={{ width: "100%" }}
                    >
                      {selectedLesson.isCompleted && selectedLesson.score ? "Reintentar Quiz" : "Ir al Quiz"}
                    </Button>
                  )}

                  {selectedLesson.hasAssignment && selectedLesson.assignmentId && (
                    <Button
                      onClick={() => {
                        router.push(`/assignments/${selectedLesson.assignmentId}`)
                      }}
                      variant="ghost"
                      style={{ width: "100%" }}
                    >
                      Ver Asignación
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}


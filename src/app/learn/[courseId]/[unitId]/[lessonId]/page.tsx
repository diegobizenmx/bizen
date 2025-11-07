"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

interface Lesson {
  id: string
  title: string
  contentType: string
  content: {
    text?: string
    videoUrl?: string
    exerciseData?: any
  }
  hasQuiz: boolean
  quizId?: string
  nextLessonId?: string
  prevLessonId?: string
  unitTitle: string
  courseTitle: string
}

export default function LessonPlayerPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const { courseId, unitId, lessonId } = params as { courseId: string; unitId: string; lessonId: string }
  
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loadingLesson, setLoadingLesson] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }

    // TODO: Fetch real lesson from API
    const fetchLesson = async () => {
      try {
        setLoadingLesson(true)
        // Placeholder data
        setLesson({
          id: lessonId,
          title: "¿Qué es el Dinero?",
          contentType: "reading",
          content: {
            text: `# Introducción al Dinero

El dinero es un medio de intercambio que facilita las transacciones económicas. A lo largo de la historia, diferentes sociedades han usado diversos objetos como dinero.

## Funciones del Dinero

1. **Medio de intercambio**: Facilita el comercio de bienes y servicios
2. **Unidad de cuenta**: Permite medir el valor de cosas diferentes
3. **Reserva de valor**: Mantiene su valor a lo largo del tiempo

## Historia del Dinero

Desde las primeras formas de trueque hasta las monedas digitales modernas, el dinero ha evolucionado constantemente para satisfacer las necesidades de la sociedad.

### Etapas Clave

- **Trueque**: Intercambio directo de bienes
- **Dinero mercancía**: Objetos valiosos (sal, conchas, metales)
- **Monedas**: Metal acuñado con valor garantizado
- **Papel moneda**: Billetes respaldados por oro o plata
- **Dinero fiduciario**: Valor basado en confianza gubernamental
- **Dinero digital**: Criptomonedas y pagos electrónicos

## Conclusión

Entender el dinero es fundamental para tomar decisiones financieras informadas en el mundo moderno.`
          },
          hasQuiz: true,
          quizId: "quiz-1",
          nextLessonId: "lesson-2",
          prevLessonId: null,
          unitTitle: "Introducción a las Finanzas",
          courseTitle: "Fundamentos de Finanzas Personales"
        })
        
        // Track page visit
        // TODO: Call API to record progress
        setProgress(50)
      } catch (error) {
        console.error("Error fetching lesson:", error)
      } finally {
        setLoadingLesson(false)
      }
    }

    fetchLesson()
  }, [user, loading, router, courseId, unitId, lessonId])

  const handleMarkComplete = async () => {
    // TODO: Call API to mark lesson complete
    console.log("Marking lesson complete")
    setProgress(100)
    
    if (lesson?.hasQuiz && lesson.quizId) {
      router.push(`/quiz/${lesson.quizId}?from=lesson&courseId=${courseId}&unitId=${unitId}&lessonId=${lessonId}`)
    } else if (lesson?.nextLessonId) {
      router.push(`/learn/${courseId}/${unitId}/${lesson.nextLessonId}`)
    } else {
      router.push(`/courses/${courseId}`)
    }
  }

  if (loading || loadingLesson) {
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
          <p style={{ color: "#666", fontSize: 16 }}>Cargando lección...</p>
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

  if (!user || !lesson) return null

  return (
    <main style={{ 
      maxWidth: 900, 
      margin: "0 auto", 
      padding: "clamp(20px, 4vw, 40px)",
      fontFamily: "Montserrat, sans-serif"
    }}>
      {/* Top Navigation Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 32,
        flexWrap: "wrap",
        gap: 16
      }}>
        <button
          onClick={() => router.push("/courses")}
          style={{
            background: "transparent",
            border: "none",
            color: "#0F62FE",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          ← Volver al curso
        </button>

        {/* Progress Badge */}
        <div style={{
          padding: "8px 16px",
          background: progress === 100 ? "#10B981" : "#F59E0B",
          color: "#fff",
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 600
        }}>
          {progress === 100 ? "✓ Completado" : `${progress}% Progreso`}
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ 
        marginBottom: 24, 
        fontSize: 14, 
        color: "#666",
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }}>
        <span>{lesson.courseTitle}</span>
        <span>›</span>
        <span>{lesson.unitTitle}</span>
        <span>›</span>
        <span style={{ color: "#0F62FE", fontWeight: 600 }}>{lesson.title}</span>
      </div>

      {/* Lesson Content Card */}
      <Card style={{ marginBottom: 32 }}>
        <div style={{ padding: "32px 28px" }}>
          <h1 style={{
            margin: "0 0 24px",
            fontSize: "clamp(26px, 5vw, 32px)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            {lesson.title}
          </h1>

          {/* Content Type Badge */}
          <div style={{
            display: "inline-block",
            padding: "6px 14px",
            background: "#F3F4F6",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 600,
            color: "#374151",
            marginBottom: 24
          }}>
            {lesson.contentType === "reading" && "📖 Lectura"}
            {lesson.contentType === "video" && "🎥 Video"}
            {lesson.contentType === "exercise" && "✏️ Ejercicio"}
          </div>

          {/* Lesson Content */}
          <div style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: "#1F2937"
          }}>
            {lesson.contentType === "reading" && lesson.content.text && (
              <div 
                style={{ 
                  whiteSpace: "pre-wrap",
                  fontFamily: "Montserrat, sans-serif"
                }}
                dangerouslySetInnerHTML={{ 
                  __html: lesson.content.text
                    .replace(/^# (.+)$/gm, '<h1 style="font-size: 28px; font-weight: 800; margin: 32px 0 16px; color: #111;">$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2 style="font-size: 22px; font-weight: 700; margin: 28px 0 14px; color: #111;">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 style="font-size: 18px; font-weight: 700; margin: 24px 0 12px; color: #111;">$1</h3>')
                    .replace(/^\*\*(.+?)\*\*:/gm, '<strong style="color: #0F62FE;">$1:</strong>')
                    .replace(/^- (.+)$/gm, '<li style="margin: 8px 0; color: #374151;">$1</li>')
                    .replace(/\n\n/g, '</p><p style="margin: 16px 0; line-height: 1.8;">')
                    .replace(/^(.+)$/gm, '<p style="margin: 16px 0; line-height: 1.8;">$1</p>')
                }}
              />
            )}

            {lesson.contentType === "video" && lesson.content.videoUrl && (
              <div style={{
                width: "100%",
                aspectRatio: "16 / 9",
                background: "#000",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 18
              }}>
                <div>🎥 Video Player Placeholder</div>
              </div>
            )}

            {lesson.contentType === "exercise" && (
              <div style={{
                padding: 24,
                background: "#F9FAFB",
                borderRadius: 12,
                border: "2px dashed #D1D5DB"
              }}>
                <p style={{ margin: 0, fontSize: 16, color: "#6B7280" }}>
                  Interactive exercise component will go here
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap"
      }}>
        <Button
          variant="ghost"
          onClick={() => {
            if (lesson.prevLessonId) {
              router.push(`/learn/${courseId}/${unitId}/${lesson.prevLessonId}`)
            } else {
              router.push("/courses")
            }
          }}
          style={{ minWidth: 150 }}
        >
          ← Anterior
        </Button>

        <Button
          onClick={handleMarkComplete}
          style={{ minWidth: 200 }}
        >
          {lesson.hasQuiz ? "Ir al Quiz →" : lesson.nextLessonId ? "Siguiente Lección →" : "Completar ✓"}
        </Button>
      </div>
    </main>
  )
}


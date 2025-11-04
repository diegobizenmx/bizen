"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

interface Question {
  id: string
  type: string // "mcq" | "truefalse" | "short"
  prompt: string
  options?: Array<{ id: string; text: string; isCorrect: boolean }>
}

interface Quiz {
  id: string
  title: string
  passScore: number
  totalPoints: number
  questions: Question[]
  lessonTitle?: string
}

export default function QuizPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const quizId = params.quizId as string
  
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loadingQuiz, setLoadingQuiz] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }

    // TODO: Fetch real quiz from API
    const fetchQuiz = async () => {
      try {
        setLoadingQuiz(true)
        // Placeholder data
        setQuiz({
          id: quizId,
          title: "Quiz: Introducción a las Finanzas",
          passScore: 70,
          totalPoints: 100,
          lessonTitle: "¿Qué es el Dinero?",
          questions: [
            {
              id: "q1",
              type: "mcq",
              prompt: "¿Cuál es la función principal del dinero?",
              options: [
                { id: "a", text: "Decorar", isCorrect: false },
                { id: "b", text: "Medio de intercambio", isCorrect: true },
                { id: "c", text: "Jugar", isCorrect: false },
                { id: "d", text: "Ninguna de las anteriores", isCorrect: false }
              ]
            },
            {
              id: "q2",
              type: "truefalse",
              prompt: "El dinero fiduciario está respaldado por oro.",
              options: [
                { id: "true", text: "Verdadero", isCorrect: false },
                { id: "false", text: "Falso", isCorrect: true }
              ]
            },
            {
              id: "q3",
              type: "mcq",
              prompt: "¿Qué es el trueque?",
              options: [
                { id: "a", text: "Intercambio directo de bienes", isCorrect: true },
                { id: "b", text: "Uso de monedas", isCorrect: false },
                { id: "c", text: "Pago con tarjeta", isCorrect: false },
                { id: "d", text: "Ninguna", isCorrect: false }
              ]
            }
          ]
        })
      } catch (error) {
        console.error("Error fetching quiz:", error)
      } finally {
        setLoadingQuiz(false)
      }
    }

    fetchQuiz()
  }, [user, loading, router, quizId])

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers({ ...answers, [questionId]: optionId })
  }

  const handleSubmit = async () => {
    if (!quiz) return

    // Calculate score
    let correctCount = 0
    quiz.questions.forEach(q => {
      const userAnswer = answers[q.id]
      const correctOption = q.options?.find(opt => opt.isCorrect)
      if (userAnswer === correctOption?.id) {
        correctCount++
      }
    })

    const scorePercent = Math.round((correctCount / quiz.questions.length) * 100)
    setScore(scorePercent)
    setSubmitted(true)

    // TODO: Submit to API
    console.log("Quiz submitted", { quizId, answers, score: scorePercent })
  }

  const handleContinue = () => {
    const from = searchParams.get("from")
    const courseId = searchParams.get("courseId")
    const unitId = searchParams.get("unitId")
    const lessonId = searchParams.get("lessonId")

    if (from === "lesson" && courseId) {
      router.push(`/courses/${courseId}`)
    } else {
      router.push("/dashboard")
    }
  }

  if (loading || loadingQuiz) {
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
          <p style={{ color: "#666", fontSize: 16 }}>Cargando quiz...</p>
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

  if (!user || !quiz) return null

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const allAnswered = quiz.questions.every(q => answers[q.id])

  if (submitted) {
    const passed = score >= quiz.passScore

    return (
      <main style={{ 
        maxWidth: 700, 
        margin: "0 auto", 
        padding: "clamp(20px, 4vw, 40px)",
        fontFamily: "Montserrat, sans-serif"
      }}>
        <Card style={{ padding: "60px 40px", textAlign: "center" }}>
          <div style={{ fontSize: 80, marginBottom: 24 }}>
            {passed ? "🎉" : "😔"}
          </div>
          
          <h1 style={{
            margin: "0 0 16px",
            fontSize: "clamp(28px, 6vw, 36px)",
            fontWeight: 800,
            color: passed ? "#10B981" : "#EF4444"
          }}>
            {passed ? "¡Felicidades!" : "Intenta de nuevo"}
          </h1>

          <p style={{
            margin: "0 0 32px",
            fontSize: 18,
            color: "#666"
          }}>
            Obtuviste <strong style={{ color: passed ? "#10B981" : "#EF4444", fontSize: 32 }}>{score}%</strong>
          </p>

          <div style={{
            padding: 20,
            background: "#F9FAFB",
            borderRadius: 12,
            marginBottom: 32
          }}>
            <div style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
              Puntaje para aprobar: {quiz.passScore}%
            </div>
            <div style={{ fontSize: 14, color: "#666" }}>
              Preguntas correctas: {Math.round((score / 100) * quiz.questions.length)} / {quiz.questions.length}
            </div>
          </div>

          {passed && (
            <div style={{
              padding: 16,
              background: "#D1FAE5",
              border: "2px solid #10B981",
              borderRadius: 12,
              marginBottom: 24
            }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#065F46" }}>
                ✓ ¡Has aprobado este quiz!
              </div>
            </div>
          )}

          <Button onClick={handleContinue} style={{ maxWidth: 300 }}>
            {passed ? "Continuar →" : "Volver al curso"}
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main style={{ 
      maxWidth: 800, 
      margin: "0 auto", 
      padding: "clamp(20px, 4vw, 40px)",
      fontFamily: "Montserrat, sans-serif"
    }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ 
          fontSize: 14, 
          color: "#666", 
          marginBottom: 8 
        }}>
          {quiz.lessonTitle && `Lección: ${quiz.lessonTitle}`}
        </div>
        <h1 style={{
          margin: "0 0 16px",
          fontSize: "clamp(24px, 5vw, 30px)",
          fontWeight: 800,
          background: "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          {quiz.title}
        </h1>

        {/* Progress Bar */}
        <div style={{
          display: "flex",
          gap: 4,
          marginTop: 16
        }}>
          {quiz.questions.map((_, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                height: 6,
                background: index <= currentQuestionIndex ? "#0F62FE" : "#E5E7EB",
                borderRadius: 3,
                transition: "background 0.3s ease"
              }}
            />
          ))}
        </div>

        <div style={{
          marginTop: 12,
          fontSize: 14,
          color: "#666",
          display: "flex",
          justifyContent: "space-between"
        }}>
          <span>Pregunta {currentQuestionIndex + 1} de {quiz.questions.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}% Completado</span>
        </div>
      </div>

      {/* Question Card */}
      <Card style={{ marginBottom: 24, padding: "40px 32px" }}>
        <h2 style={{
          margin: "0 0 32px",
          fontSize: "clamp(18px, 4vw, 22px)",
          fontWeight: 700,
          lineHeight: 1.4,
          color: "#111"
        }}>
          {currentQuestion.prompt}
        </h2>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {currentQuestion.options?.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.id

            return (
              <div
                key={option.id}
                onClick={() => handleAnswer(currentQuestion.id, option.id)}
                style={{
                  padding: "18px 20px",
                  background: isSelected ? "#EEF2FF" : "#F9FAFB",
                  border: isSelected ? "2px solid #0F62FE" : "2px solid #E5E7EB",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? "#0F62FE" : "#374151",
                  fontSize: 16
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "#F3F4F6"
                    e.currentTarget.style.borderColor = "#9CA3AF"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "#F9FAFB"
                    e.currentTarget.style.borderColor = "#E5E7EB"
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: isSelected ? "6px solid #0F62FE" : "2px solid #D1D5DB",
                    background: isSelected ? "#fff" : "transparent",
                    flexShrink: 0
                  }} />
                  <span>{option.text}</span>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Navigation */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 16
      }}>
        <Button
          variant="ghost"
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
          style={{ minWidth: 120 }}
        >
          ← Anterior
        </Button>

        {currentQuestionIndex === quiz.questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered}
            style={{ minWidth: 180 }}
          >
            Enviar Quiz ✓
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentQuestionIndex(Math.min(quiz.questions.length - 1, currentQuestionIndex + 1))}
            disabled={!answers[currentQuestion.id]}
            style={{ minWidth: 120 }}
          >
            Siguiente →
          </Button>
        )}
      </div>
    </main>
  )
}


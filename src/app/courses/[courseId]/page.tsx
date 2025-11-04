"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

interface Lesson {
  id: string
  title: string
  order: number
  isLocked: boolean
  isCompleted: boolean
}

interface Section {
  id: string
  title: string
  order: number
  lessons: Lesson[]
}

interface CourseDetail {
  id: string
  title: string
  description: string
  sections: Section[]
}

export default function CourseDetailPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const courseId = params.courseId as string
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [loadingCourse, setLoadingCourse] = useState(true)
  const [hoveredLesson, setHoveredLesson] = useState<string | null>(null)
  const [visibleLessons, setVisibleLessons] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }

    // Fetch course with lessons
    const fetchCourse = async () => {
      try {
        setLoadingCourse(true)
        
        // TODO: Fetch actual completion status from API
        const completedLessons: string[] = [] // IDs of completed lessons
        
        // Define course structure for "Fundamentos del Dinero"
        if (courseId === "course-1") {
        setCourse({
          id: courseId,
            title: "Fundamentos del Dinero",
            description: "Aprende los conceptos básicos del dinero y su funcionamiento en la economía moderna.",
            sections: [
              {
                id: "section-1",
                title: "¿Qué es el dinero?",
                order: 1,
                lessons: [
                  {
                    id: "lesson-1",
                    title: "Historia del dinero",
                    order: 1,
                    isLocked: false,
                    isCompleted: completedLessons.includes("lesson-1")
                  },
                  {
                    id: "lesson-2",
                    title: "¿Cómo gana valor?",
                    order: 2,
                    isLocked: !completedLessons.includes("lesson-1"),
                    isCompleted: completedLessons.includes("lesson-2")
                  },
                  {
                    id: "lesson-3",
                    title: "Dinero físico vs digital",
                    order: 3,
                    isLocked: !completedLessons.includes("lesson-2"),
                    isCompleted: completedLessons.includes("lesson-3")
                  }
                ]
              },
              {
                id: "section-2",
                title: "Conceptos financieros básicos",
                order: 2,
                lessons: [
                  {
                    id: "lesson-4",
                    title: "Ingresos y gastos",
                    order: 4,
                    isLocked: !completedLessons.includes("lesson-3"),
                    isCompleted: completedLessons.includes("lesson-4")
                  },
                  {
                    id: "lesson-5",
                    title: "¿Qué es el presupuesto?",
                    order: 5,
                    isLocked: !completedLessons.includes("lesson-4"),
                    isCompleted: completedLessons.includes("lesson-5")
                  },
                  {
                    id: "lesson-6",
                    title: "Ciclo del dinero",
                    order: 6,
                    isLocked: !completedLessons.includes("lesson-5"),
                    isCompleted: completedLessons.includes("lesson-6")
                  }
                ]
              },
              {
                id: "section-3",
                title: "Educación financiera personal",
                order: 3,
                lessons: [
                  {
                    id: "lesson-7",
                    title: "¿Por qué importa?",
                    order: 7,
                    isLocked: !completedLessons.includes("lesson-6"),
                    isCompleted: completedLessons.includes("lesson-7")
                  },
                  {
                    id: "lesson-8",
                    title: "Finanzas en la vida diaria",
                    order: 8,
                    isLocked: !completedLessons.includes("lesson-7"),
                    isCompleted: completedLessons.includes("lesson-8")
                  },
                  {
                    id: "lesson-9",
                    title: "Mentalidad financiera",
                    order: 9,
                    isLocked: !completedLessons.includes("lesson-8"),
                    isCompleted: completedLessons.includes("lesson-9")
                  }
                ]
              }
            ]
          })
        } else {
          // Other courses - placeholder
          setCourse({
            id: courseId,
            title: "Curso en Desarrollo",
            description: "Este curso estará disponible próximamente.",
            sections: []
          })
        }
      } catch (error) {
        console.error("Error fetching course:", error)
      } finally {
        setLoadingCourse(false)
      }
    }

    fetchCourse()
  }, [user, loading, router, courseId])

  // Intersection Observer for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lessonId = entry.target.getAttribute('data-lesson-id')
            if (lessonId) {
              setVisibleLessons(prev => new Set(prev).add(lessonId))
            }
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    // Observe all lesson cards
    const lessonCards = document.querySelectorAll('[data-lesson-id]')
    lessonCards.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [course])

  if (loading || loadingCourse) {
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
          <p style={{ color: "#666", fontSize: 16 }}>Cargando curso...</p>
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

  if (!user || !course) return null

  // Calculate total lessons and completed
  const totalLessons = course.sections.reduce((sum, section) => sum + section.lessons.length, 0)
  const completedLessons = course.sections.reduce((sum, section) => 
    sum + section.lessons.filter(l => l.isCompleted).length, 0
  )
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  const isCourseComplete = totalLessons > 0 && completedLessons === totalLessons

  return (
    <div style={{
      background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)",
      position: "relative"
    }}>
    <main style={{ 
        maxWidth: "100%",
      margin: "0 auto", 
      padding: "clamp(20px, 4vw, 40px)",
      paddingBottom: "clamp(20px, 4vw, 40px)",
      fontFamily: "Montserrat, sans-serif"
    }}>
      {/* Back Button */}
      <button
        onClick={() => router.push("/courses")}
        style={{
          display: "flex",
          alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            marginBottom: 24,
            background: "transparent",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 600,
            color: "#0F62FE",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F9FAFB"
            e.currentTarget.style.borderColor = "#0F62FE"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"
          }}
        >
          <span style={{ fontSize: 18 }}>←</span>
          <span>Volver a Cursos</span>
      </button>

      {/* Course Header */}
        <div style={{
          maxWidth: 1200, 
          margin: "0 auto 40px",
          textAlign: "center"
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: "clamp(32px, 6vw, 42px)", 
            fontWeight: 900,
            background: "linear-gradient(90deg, #0F62FE, #10B981, #0F62FE)",
            backgroundSize: "200%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            animation: "shimmer 3s ease-in-out infinite",
            marginBottom: 12
          }}>
            {course.title}
          </h1>
          <p style={{
            margin: 0, 
            fontSize: "clamp(15px, 3vw, 17px)",
            color: "#666",
            maxWidth: 800,
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            {course.description}
          </p>
        </div>

        {/* Progress Card */}
        <Card style={{
          maxWidth: 1200,
          margin: "0 auto 48px",
          padding: "28px 32px",
          background: "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)",
          color: "#fff",
          border: "none"
        }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 16
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
                Tu Progreso en Este Curso
              </h3>
              <p style={{ margin: "4px 0 0", fontSize: 14, opacity: 0.9 }}>
                {completedLessons} de {totalLessons} lecciones completadas
              </p>
              </div>
            <div style={{ 
              fontSize: 48, 
              fontWeight: 900,
              textAlign: "right"
            }}>
              {progressPercent}%
            </div>
          </div>
          
          {/* Progress Bar */}
              <div style={{
                width: "100%",
            height: 8,
                background: "rgba(255,255,255,0.3)",
            borderRadius: 20,
                overflow: "hidden"
              }}>
                <div style={{
                  height: "100%",
              width: `${progressPercent}%`,
                  background: "#fff",
              borderRadius: 20,
              transition: "width 1s ease",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Shine effect */}
              <div style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(15, 98, 254, 0.3), transparent)",
                animation: "shine 2s infinite"
              }} />
            </div>
          </div>
      </Card>

        {/* Vertical Learning Path - Zigzag */}
        <div style={{ 
          maxWidth: 700, 
          margin: "0 auto",
          position: "relative",
          padding: "0 40px",
          paddingBottom: 40
        }}>
          {/* Central Connecting Line - Stops before finish section */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: 60,
            height: "calc(100% - 200px)",
            width: 5,
            background: "linear-gradient(180deg, #0F62FE 0%, #10B981 50%, #0F62FE 100%)",
            transform: "translateX(-50%)",
            zIndex: 0,
            opacity: 0.25,
            borderRadius: 3,
            boxShadow: "0 0 20px rgba(15, 98, 254, 0.3)"
          }} />

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 80,
            position: "relative",
            zIndex: 1,
            padding: "40px 0"
          }}>
          {course.sections.map((section, sectionIndex) => (
            <div key={section.id}>
              {/* Section Title Divider */}
              <div style={{
                textAlign: "center",
                marginBottom: 40,
                position: "relative"
              }}>
                <div style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  background: "linear-gradient(135deg, #0F62FE, #10B981)",
                  color: "#fff",
                  borderRadius: 20,
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  boxShadow: "0 8px 24px rgba(15, 98, 254, 0.3)",
                  position: "relative",
                  zIndex: 10
                }}>
                  {section.title.toUpperCase()}
                </div>
              </div>

              {/* Lessons - Vertical Stack with Zigzag */}
              <div style={{
          display: "flex",
          flexDirection: "column",
                gap: 120,
                position: "relative"
              }}>
                {section.lessons.map((lesson, lessonIndex) => {
                  // Zigzag effect - alternate left/right with more pronounced offset
                  const isLeft = lessonIndex % 2 === 0
                  const isVisible = visibleLessons.has(lesson.id)
                  
                  return (
                    <div
                      key={lesson.id}
                      data-lesson-id={lesson.id}
                      style={{
                        position: "relative",
                        display: "flex",
                        gap: 24,
                        alignItems: "center",
                        justifyContent: isLeft ? "flex-start" : "flex-end",
                        paddingLeft: isLeft ? "0" : "20%",
                        paddingRight: isLeft ? "20%" : "0",
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(40px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                        animation: isVisible ? `float 4s ease-in-out ${lessonIndex * 0.3}s infinite` : "none"
                      }}
                    >
                      {/* Lesson Number Badge - Left Side */}
                      <div style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background: lesson.isLocked
                          ? "linear-gradient(135deg, #93C5FD, #60A5FA)"
                          : lesson.isCompleted
                            ? "linear-gradient(135deg, #10B981, #059669)"
                            : "linear-gradient(135deg, #0F62FE, #2563EB)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 30,
                        fontWeight: 900,
                        boxShadow: lesson.isCompleted
                          ? "0 10px 30px rgba(16, 185, 129, 0.4)"
                          : "0 10px 30px rgba(15, 98, 254, 0.4)",
                        border: "6px solid #fff",
                        flexShrink: 0,
                        position: "relative",
                        zIndex: 10
                      }}>
                        {lesson.isCompleted ? "✓" : lesson.order}
                      </div>

            <Card 
              style={{
                          flex: 1,
                          maxWidth: 480,
                          minHeight: 140,
                          padding: 0,
                          overflow: "hidden",
                          cursor: lesson.isLocked ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                          border: "none",
                          position: "relative",
                          boxShadow: lesson.isLocked 
                            ? "0 8px 24px rgba(0,0,0,0.12)" 
                            : lesson.isCompleted
                              ? "0 16px 40px rgba(16, 185, 129, 0.35)"
                              : "0 16px 40px rgba(15, 98, 254, 0.35)",
                          display: "flex",
                          borderRadius: 20
              }}
              onClick={() => {
                          if (!lesson.isLocked) {
                            router.push(`/learn/${courseId}/${section.id}/${lesson.id}`)
                }
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                          if (!lesson.isLocked) {
                            e.currentTarget.style.transform = "scale(1.04)"
                            e.currentTarget.style.zIndex = "10"
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                          if (!lesson.isLocked) {
                            e.currentTarget.style.transform = "scale(1)"
                            e.currentTarget.style.zIndex = "1"
                          }
                        }}
                      >
                        {/* Lesson Content - Full Card Clickable */}
                  <div style={{
                          padding: "32px 36px",
                          background: lesson.isLocked
                            ? "linear-gradient(135deg, #93C5FD 0%, #60A5FA 50%, #3B82F6 100%)"
                            : lesson.isCompleted
                              ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                              : "linear-gradient(135deg, #0F62FE 0%, #2563EB 100%)",
                          color: "#fff",
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 20
                        }}>

                          {/* Title */}
                  <h3 style={{ 
                            margin: 0, 
                            fontSize: 20, 
                            fontWeight: 800,
                            lineHeight: 1.4,
                            textAlign: "center",
                            letterSpacing: "0.3px"
                          }}>
                            {lesson.title}
                  </h3>
                  </div>
                      </Card>
                    </div>
                  )
                })}
              </div>
                </div>
          ))}

          {/* Finish Line - Always visible, button unlocks when complete */}
          <div style={{
            marginTop: 60,
            marginBottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            animation: "fadeInScale 0.8s ease 0.5s both"
          }}>
            {/* Finish Line Visual */}
                  <div style={{
              width: "100%",
              maxWidth: 500,
              position: "relative",
                    display: "flex",
              flexDirection: "column",
                    alignItems: "center",
              gap: 24
                  }}>
              {/* Checkered Flag Pattern */}
                    <div style={{
                width: 120,
                height: 120,
                      borderRadius: "50%",
                background: isCourseComplete 
                  ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                  : "linear-gradient(135deg, #93C5FD 0%, #60A5FA 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                boxShadow: isCourseComplete
                  ? "0 20px 50px rgba(16, 185, 129, 0.4)"
                  : "0 20px 50px rgba(147, 197, 253, 0.4)",
                animation: "float 3s ease-in-out infinite",
                border: "8px solid #fff"
              }}>
                <div style={{
                  fontSize: 56,
                  animation: "pulse 2s ease-in-out infinite"
                }}>
                  🏁
                    </div>
                  </div>

              {/* Completion Message */}
              <div style={{
                textAlign: "center"
              }}>
                <h2 style={{
                  margin: "0 0 12px",
                  fontSize: 32,
                  fontWeight: 900,
                  background: isCourseComplete 
                    ? "linear-gradient(90deg, #0F62FE, #10B981)"
                    : "linear-gradient(90deg, #93C5FD, #60A5FA)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "0.5px"
                }}>
                  {isCourseComplete ? "¡Curso Completado!" : "Meta Final"}
                </h2>
                <p style={{
                  margin: 0,
                  fontSize: 18,
                  color: "#666",
                  fontWeight: 500
                }}>
                  {isCourseComplete 
                    ? "Has terminado todas las lecciones de este curso" 
                    : `Completa ${totalLessons - completedLessons} lecciones más para desbloquear`}
                </p>
              </div>

              {/* Next Course Button - Only show when complete */}
              {isCourseComplete ? (
                <Button
                  onClick={() => router.push("/courses")}
                  style={{
                    fontSize: 18,
                    padding: "16px 40px",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 16,
                    boxShadow: "0 8px 24px rgba(15, 98, 254, 0.3)",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.transform = "scale(1.05)"
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 98, 254, 0.4)"
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.transform = "scale(1)"
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 98, 254, 0.3)"
                  }}
                >
                  Siguiente Curso →
                </Button>
              ) : (
                <div style={{
                  fontSize: 18,
                  padding: "16px 40px",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #93C5FD 0%, #60A5FA 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 16,
                  boxShadow: "0 8px 24px rgba(147, 197, 253, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: 0.7
                }}>
                  <span style={{ fontSize: 24 }}>🔒</span>
                  <span>Completa el curso para continuar</span>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>

        {/* Empty State for Other Courses */}
        {course.sections.length === 0 && (
          <Card style={{ 
            padding: "60px 40px", 
            textAlign: "center", 
            maxWidth: 600, 
            margin: "40px auto" 
          }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🚧</div>
            <h3 style={{ margin: "0 0 12px", fontSize: 24, fontWeight: 700 }}>
              Curso en Desarrollo
            </h3>
            <p style={{ margin: "0 0 24px", color: "#666", fontSize: 16 }}>
              Este curso estará disponible próximamente.
            </p>
            <Button onClick={() => router.push("/courses")}>
              Volver a Cursos
            </Button>
          </Card>
        )}
      </main>

      {/* Animations */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Custom Scrollbar */
        div::-webkit-scrollbar {
          height: 10px;
        }

        div::-webkit-scrollbar-track {
          background: #F3F4F6;
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #0F62FE, #10B981);
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #0D52D1, #059669);
        }
      `}</style>
      </div>
  )
}

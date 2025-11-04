"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

interface Certificate {
  id: string
  courseTitle: string
  issuedAt: string
  url?: string
}

interface CourseProgress {
  id: string
  title: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
  quizzesPassed: number
  totalQuizzes: number
}

export default function ProgressPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [courses, setCourses] = useState<CourseProgress[]>([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }

    // TODO: Fetch real data from API
    const fetchData = async () => {
      try {
        setLoadingData(true)
        // Placeholder data
        setCertificates([
          {
            id: "cert-1",
            courseTitle: "Fundamentos de Finanzas Personales",
            issuedAt: "2025-10-15T10:30:00",
            url: "/certificates/cert-1.pdf"
          }
        ])

        setCourses([
          {
            id: "course-1",
            title: "Fundamentos de Finanzas Personales",
            progress: 45,
            lessonsCompleted: 12,
            totalLessons: 24,
            quizzesPassed: 3,
            totalQuizzes: 6
          },
          {
            id: "course-2",
            title: "Inversión para Principiantes",
            progress: 10,
            lessonsCompleted: 2,
            totalLessons: 18,
            quizzesPassed: 0,
            totalQuizzes: 4
          }
        ])
      } catch (error) {
        console.error("Error fetching progress:", error)
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
  }, [user, loading, router])

  if (loading || loadingData) {
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
          <p style={{ color: "#666", fontSize: 16 }}>Cargando progreso...</p>
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

  if (!user) return null

  const totalProgress = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length)
    : 0

  return (
    <main style={{ 
      maxWidth: 1000, 
      margin: "0 auto", 
      padding: "clamp(20px, 4vw, 40px)",
      fontFamily: "Montserrat, sans-serif"
    }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: "clamp(28px, 6vw, 36px)", 
          fontWeight: 800,
          background: "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          🏆 Mi Progreso
        </h1>
        <p style={{ margin: "8px 0 0", color: "#666", fontSize: "clamp(14px, 3vw, 16px)" }}>
          Revisa tus logros y certificados
        </p>
      </div>

      {/* Overall Progress Card */}
      <Card style={{ 
        padding: "32px 28px", 
        marginBottom: 32,
        background: "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)",
        color: "#fff"
      }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 700 }}>
          Progreso General
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 20
        }}>
          <div>
            <div style={{ fontSize: 40, fontWeight: 800 }}>{totalProgress}%</div>
            <div style={{ fontSize: 14, opacity: 0.9, marginTop: 4 }}>Progreso Promedio</div>
          </div>
          <div>
            <div style={{ fontSize: 40, fontWeight: 800 }}>{courses.length}</div>
            <div style={{ fontSize: 14, opacity: 0.9, marginTop: 4 }}>Cursos Activos</div>
          </div>
          <div>
            <div style={{ fontSize: 40, fontWeight: 800 }}>{certificates.length}</div>
            <div style={{ fontSize: 14, opacity: 0.9, marginTop: 4 }}>Certificados Obtenidos</div>
          </div>
        </div>
      </Card>

      {/* Certificates Section */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ 
          margin: "0 0 20px", 
          fontSize: 22, 
          fontWeight: 700 
        }}>
          🎓 Certificados
        </h2>
        
        {certificates.length > 0 ? (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20 
          }}>
            {certificates.map(cert => (
              <Card 
                key={cert.id}
                style={{
                  padding: 0,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onClick={() => {
                  if (cert.url) {
                    window.open(cert.url, "_blank")
                  }
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 98, 254, 0.2)"
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"
                }}
              >
                {/* Certificate Header */}
                <div style={{
                  padding: "28px 24px",
                  background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
                  color: "#fff",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
                    Certificado de Finalización
                  </h3>
                </div>

                {/* Certificate Info */}
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ 
                    fontSize: 16, 
                    fontWeight: 600, 
                    color: "#111",
                    marginBottom: 12,
                    lineHeight: 1.4
                  }}>
                    {cert.courseTitle}
                  </div>
                  <div style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
                    Emitido: {new Date(cert.issuedAt).toLocaleDateString('es-ES', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  {cert.url && (
                    <Button 
                      variant="ghost"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation()
                        window.open(cert.url, "_blank")
                      }}
                      style={{ width: "100%" }}
                    >
                      Descargar PDF →
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card style={{ padding: "40px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>
              Aún no tienes certificados
            </h3>
            <p style={{ margin: 0, color: "#666", fontSize: 14 }}>
              Completa tus cursos para obtener certificados
            </p>
          </Card>
        )}
      </div>

      {/* Course Progress Section */}
      <div>
        <h2 style={{ 
          margin: "0 0 20px", 
          fontSize: 22, 
          fontWeight: 700 
        }}>
          📊 Progreso por Curso
        </h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {courses.map(course => (
            <Card 
              key={course.id}
              style={{ 
                padding: 24,
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onClick={() => router.push(`/courses/${course.id}`)}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.transform = "translateX(4px)"
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 98, 254, 0.15)"
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.transform = "translateX(0)"
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>
                  {course.title}
                </h3>
                <div style={{
                  display: "flex",
                  gap: 16,
                  fontSize: 14,
                  color: "#666",
                  flexWrap: "wrap"
                }}>
                  <span>📖 {course.lessonsCompleted}/{course.totalLessons} lecciones</span>
                  <span>✅ {course.quizzesPassed}/{course.totalQuizzes} quizzes aprobados</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                  color: "#666",
                  marginBottom: 8
                }}>
                  <span>Progreso</span>
                  <span>{course.progress}%</span>
                </div>
                <div style={{
                  width: "100%",
                  height: 10,
                  background: "#E5E7EB",
                  borderRadius: 10,
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "100%",
                    width: `${course.progress}%`,
                    background: "linear-gradient(90deg, #0F62FE 0%, #10B981 100%)",
                    borderRadius: 10,
                    transition: "width 0.5s ease"
                  }} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}


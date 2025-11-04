"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Card from "@/components/ui/Card"

interface Course {
  id: string
  title: string
  description: string
  level: string
  lessonsCount: number
  duration: string
  isEnrolled: boolean
  isLocked: boolean
  isCompleted: boolean
  progress?: number
  order: number
}

export default function CoursesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null)

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }

    // Fetch courses with gating logic
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true)
        
        // TODO: Replace with actual API call to get completion status
        // For now, simulating that only the first course is unlocked
        const completedCourses: string[] = [] // IDs of completed courses
        
        const allCourses: Course[] = [
          {
            id: "course-1",
            title: "Fundamentos del Dinero",
            description: "Conceptos básicos del dinero",
            level: "Beginner",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: true,
            isLocked: false,
            isCompleted: completedCourses.includes("course-1"),
            progress: 0,
            order: 1
          },
          {
            id: "course-2",
            title: "Finanzas Personales",
            description: "Gestión de presupuesto personal",
            level: "Beginner",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: false,
            isLocked: !completedCourses.includes("course-1"),
            isCompleted: completedCourses.includes("course-2"),
            progress: 0,
            order: 2
          },
          {
            id: "course-3",
            title: "Mentalidad Financiera",
            description: "Hábitos para el éxito financiero",
            level: "Beginner",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: false,
            isLocked: !completedCourses.includes("course-2"),
            isCompleted: completedCourses.includes("course-3"),
            progress: 0,
            order: 3
          },
          {
            id: "course-4",
            title: "Inversiones Básicas",
            description: "Introducción al mercado financiero",
            level: "Intermediate",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: false,
            isLocked: !completedCourses.includes("course-3"),
            isCompleted: completedCourses.includes("course-4"),
            progress: 0,
            order: 4
          },
          {
            id: "course-5",
            title: "Finanzas para Emprendedores",
            description: "Gestión financiera empresarial",
            level: "Intermediate",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: false,
            isLocked: !completedCourses.includes("course-4"),
            isCompleted: completedCourses.includes("course-5"),
            progress: 0,
            order: 5
          },
          {
            id: "course-6",
            title: "Economía Global",
            description: "Economía mundial y actualidad",
            level: "Intermediate",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: false,
            isLocked: !completedCourses.includes("course-5"),
            isCompleted: completedCourses.includes("course-6"),
            progress: 0,
            order: 6
          },
          {
            id: "course-7",
            title: "Casos Prácticos",
            description: "Simulaciones financieras reales",
            level: "Intermediate",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: false,
            isLocked: !completedCourses.includes("course-6"),
            isCompleted: completedCourses.includes("course-7"),
            progress: 0,
            order: 7
          },
          {
            id: "course-8",
            title: "Finanzas en Pareja",
            description: "Gestión financiera compartida",
            level: "Intermediate",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: false,
            isLocked: !completedCourses.includes("course-7"),
            isCompleted: completedCourses.includes("course-8"),
            progress: 0,
            order: 8
          },
          {
            id: "course-9",
            title: "Impuestos y Obligaciones",
            description: "Obligaciones fiscales y tributarias",
            level: "Advanced",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: false,
            isLocked: !completedCourses.includes("course-8"),
            isCompleted: completedCourses.includes("course-9"),
            progress: 0,
            order: 9
          },
          {
            id: "course-10",
            title: "Inversiones para Jóvenes",
            description: "Estrategias de inversión juvenil",
            level: "Advanced",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: false,
            isLocked: !completedCourses.includes("course-9"),
            isCompleted: completedCourses.includes("course-10"),
            progress: 0,
            order: 10
          },
          {
            id: "course-11",
            title: "Finanzas Sostenibles",
            description: "Inversión responsable y ESG",
            level: "Advanced",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: false,
            isLocked: !completedCourses.includes("course-10"),
            isCompleted: completedCourses.includes("course-11"),
            progress: 0,
            order: 11
          },
          {
            id: "course-12",
            title: "Finanzas Laborales",
            description: "Optimización financiera profesional",
            level: "Advanced",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: false,
            isLocked: !completedCourses.includes("course-11"),
            isCompleted: completedCourses.includes("course-12"),
            progress: 0,
            order: 12
          },
          {
            id: "course-13",
            title: "Finanzas Empresariales",
            description: "Gestión financiera avanzada",
            level: "Advanced",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: false,
            isLocked: !completedCourses.includes("course-12"),
            isCompleted: completedCourses.includes("course-13"),
            progress: 0,
            order: 13
          },
          {
            id: "course-14",
            title: "Casos Avanzados",
            description: "Simulaciones complejas y avanzadas",
            level: "Advanced",
            lessonsCount: 9,
            duration: "2 semanas",
            isEnrolled: false,
            isLocked: !completedCourses.includes("course-13"),
            isCompleted: completedCourses.includes("course-14"),
            progress: 0,
            order: 14
          }
        ]
        
        setCourses(allCourses)
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoadingCourses(false)
      }
    }

    fetchCourses()
  }, [user, loading, router])

  if (loading || loadingCourses) {
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
          <p style={{ color: "#666", fontSize: 16 }}>Cargando cursos...</p>
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

  // Calculate progress stats
  const completedCount = courses.filter(c => c.isCompleted).length
  const totalCourses = courses.length
  const progressPercent = totalCourses > 0 ? Math.round((completedCount / totalCourses) * 100) : 0
  const unlockedCount = courses.filter(c => !c.isLocked).length

  // Achievement thresholds
  const achievements = [
    { id: 1, title: "Primer Paso", threshold: 1, icon: "🎯", unlocked: completedCount >= 1 },
    { id: 2, title: "En Marcha", threshold: 3, icon: "🚀", unlocked: completedCount >= 3 },
    { id: 3, title: "Medio Camino", threshold: 7, icon: "⭐", unlocked: completedCount >= 7 },
    { id: 4, title: "Casi Allí", threshold: 10, icon: "🔥", unlocked: completedCount >= 10 },
    { id: 5, title: "Maestro", threshold: 14, icon: "👑", unlocked: completedCount >= 14 },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "#10B981"
      case "Intermediate": return "#F59E0B"
      case "Advanced": return "#EF4444"
      default: return "#6B7280"
    }
  }

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "Beginner": return "Principiante"
      case "Intermediate": return "Intermedio"
      case "Advanced": return "Avanzado"
      default: return level
    }
  }

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "#fff",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Enhanced Animated Background */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)"
      }}>
        {/* Large Gradient Orbs with Blur */}
        <div style={{
          position: "absolute",
          top: "-30%",
          right: "-15%",
          width: 800,
          height: 800,
          background: "radial-gradient(circle, rgba(15, 98, 254, 0.12) 0%, rgba(59, 130, 246, 0.08) 40%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "float 25s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(34, 197, 94, 0.08) 40%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "float 20s ease-in-out infinite reverse"
        }} />
        <div style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "float 30s ease-in-out infinite",
          animationDelay: "5s"
        }} />
        
        {/* Glowing Particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: Math.random() * 8 + 3,
              height: Math.random() * 8 + 3,
              background: i % 3 === 0 ? "#0F62FE" : i % 3 === 1 ? "#10B981" : "#8B5CF6",
              borderRadius: "50%",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
              animation: `floatParticle ${Math.random() * 15 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        ))}

        {/* Animated Mesh Gradient */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.4,
          background: `
            radial-gradient(at 20% 30%, rgba(15, 98, 254, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 70%, rgba(16, 185, 129, 0.15) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(139, 92, 246, 0.1) 0px, transparent 50%)
          `,
          animation: "meshMove 20s ease-in-out infinite"
        }} />
      </div>

    <main style={{ 
      maxWidth: "100%",
      margin: "0 auto", 
      padding: "clamp(20px, 4vw, 40px)",
      fontFamily: "Montserrat, sans-serif",
      position: "relative",
      zIndex: 1
    }}>
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: "0 auto 32px", textAlign: "center" }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: "clamp(28px, 6vw, 36px)", 
          fontWeight: 800,
          background: "linear-gradient(90deg, #0F62FE, #10B981, #0F62FE)",
          backgroundSize: "200%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          animation: "shimmer 3s ease-in-out infinite"
        }}>
          Cursos
        </h1>
      </div>

      {/* Progress Tracker */}
      <div style={{ 
        maxWidth: 1200, 
        margin: "0 auto 32px",
        padding: "24px",
        background: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
        borderRadius: 20,
        border: "2px solid #BFDBFE"
      }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 12
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0F62FE" }}>
              Tu Progreso
            </h3>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: "#666" }}>
              {completedCount} de {totalCourses} cursos completados
            </p>
          </div>
          <div style={{ 
            fontSize: 36, 
            fontWeight: 900, 
            color: "#0F62FE",
            textAlign: "right"
          }}>
            {progressPercent}%
          </div>
        </div>
        
        {/* Progress Bar */}
        <div style={{
          width: "100%",
          height: 12,
          background: "#E5E7EB",
          borderRadius: 20,
          overflow: "hidden",
          marginBottom: 16
        }}>
          <div style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, #0F62FE 0%, #10B981 100%)",
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
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              animation: "shine 2s infinite"
            }} />
          </div>
        </div>

        {/* Achievement Badges */}
        <div style={{ 
          display: "flex", 
          gap: 12, 
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: achievement.unlocked 
                  ? "linear-gradient(135deg, #FFD700, #FFA500)"
                  : "#E5E7EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                filter: achievement.unlocked ? "none" : "grayscale(1)",
                opacity: achievement.unlocked ? 1 : 0.4,
                transform: achievement.unlocked ? "scale(1)" : "scale(0.9)",
                transition: "all 0.3s ease",
                boxShadow: achievement.unlocked ? "0 4px 12px rgba(255, 215, 0, 0.4)" : "none",
                cursor: "pointer",
                position: "relative"
              }}
              title={`${achievement.title} - ${achievement.threshold} cursos`}
            >
              {achievement.icon}
              {achievement.unlocked && (
                <div style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 16,
                  height: 16,
                  background: "#10B981",
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10
                }}>
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Monopoly-style Board - Horizontal Scroll Constellation */}
      <div style={{
        width: "100%",
        overflowX: "auto",
        overflowY: "hidden",
        paddingBottom: 40,
        marginBottom: 40,
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "thin",
        scrollbarColor: "#0F62FE #E5E7EB"
      }}>
        <div style={{
          position: "relative",
          display: "flex",
          gap: 120,
          minWidth: "max-content",
          padding: "80px 40px 60px"
        }}>
          {courses.map((course, index) => {
            // Create constellation effect - alternate up/down
            const yOffset = index % 3 === 0 ? 0 : index % 3 === 1 ? 80 : -80
            
            return (
              <div
            key={course.id}
            style={{ 
                  position: "relative",
                  transform: `translateY(${yOffset}px)`,
                  transition: "all 0.3s ease",
                  animation: `fadeInScale 0.5s ease ${index * 0.1}s both, float 3s ease-in-out ${index * 0.3}s infinite`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12
                }}
              >
                {/* Connecting Line to Next Course */}
                {index < courses.length - 1 && (
                  <div style={{
                    position: "absolute",
                    top: "60%",
                    left: "100%",
                    width: 120,
                    height: 4,
                    background: course.isCompleted 
                      ? "linear-gradient(90deg, #10B981, #0F62FE)" 
                      : "linear-gradient(90deg, #D1D5DB, #9CA3AF)",
                    transform: "translateY(-50%)",
                    zIndex: -1,
                    borderRadius: 2
                  }} />
                )}

                {/* Course Number Badge - Above Card */}
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: course.isLocked
                    ? "linear-gradient(135deg, #93C5FD, #60A5FA)"
                    : course.isCompleted
                      ? "linear-gradient(135deg, #10B981, #059669)"
                      : "linear-gradient(135deg, #0F62FE, #2563EB)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 900,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                  border: "4px solid #fff"
                }}>
                  {course.order}
                </div>

                <Card 
                  style={{ 
                    width: 360,
                    height: 400,
              padding: 0,
              overflow: "hidden",
                    cursor: course.isLocked ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
                    border: course.isEnrolled ? "3px solid #0F62FE" : course.isLocked ? "2px solid #D1D5DB" : "2px solid rgba(0,0,0,0.08)",
                    position: "relative",
                    boxShadow: course.isLocked 
                      ? "0 8px 20px rgba(0,0,0,0.15)" 
                      : course.isEnrolled
                        ? "0 12px 32px rgba(15, 98, 254, 0.25), 0 0 0 3px rgba(15, 98, 254, 0.2)"
                        : "0 12px 32px rgba(15, 98, 254, 0.25)",
                    display: "flex",
                    flexDirection: "column",
                    animation: course.isEnrolled ? "pulse 2s ease-in-out infinite" : "none"
                  }}
                  onClick={() => !course.isLocked && router.push(`/courses/${course.id}`)}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    if (!course.isLocked) {
                      setHoveredCourse(course.id)
                      e.currentTarget.style.transform = "translateY(-12px) scale(1.03)"
                      e.currentTarget.style.boxShadow = "0 24px 60px rgba(15, 98, 254, 0.5)"
                      e.currentTarget.style.zIndex = "100"
                    }
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    if (!course.isLocked) {
                      setHoveredCourse(null)
                      e.currentTarget.style.transform = "translateY(0) scale(1)"
                      e.currentTarget.style.boxShadow = course.isEnrolled 
                        ? "0 12px 32px rgba(15, 98, 254, 0.25), 0 0 0 3px rgba(15, 98, 254, 0.1)"
                        : "0 12px 32px rgba(15, 98, 254, 0.25)"
                      e.currentTarget.style.zIndex = "1"
                    }
                  }}
                >
                  {/* Hover Preview Tooltip */}
                  {hoveredCourse === course.id && !course.isLocked && (
                    <div style={{
                      position: "absolute",
                      bottom: "100%",
                      left: "50%",
                      transform: "translateX(-50%) translateY(-12px)",
                      background: "#fff",
                      padding: "16px 20px",
                      borderRadius: 12,
                      boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
                      border: "2px solid #0F62FE",
                      zIndex: 1000,
                      minWidth: 280,
                      animation: "fadeIn 0.2s ease"
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#0F62FE", marginBottom: 8 }}>
                        📚 Incluye:
                      </div>
                      <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>
                        • 9 lecciones interactivas<br/>
                        • Videos explicativos<br/>
                        • Quizzes de evaluación<br/>
                        • Ejercicios prácticos<br/>
                        • Certificado al completar
                      </div>
                      {/* Tooltip arrow */}
                      <div style={{
                        position: "absolute",
                        bottom: -8,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: "8px solid #0F62FE"
                      }} />
                    </div>
                  )}



            {/* Course Header */}
            <div style={{
                    padding: "28px 32px 24px",
                    background: course.isLocked
                      ? "linear-gradient(135deg, #93C5FD 0%, #60A5FA 50%, #3B82F6 100%)"
                      : course.isEnrolled 
                ? "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)" 
                : "#F9FAFB",
                    color: course.isLocked || course.isEnrolled ? "#fff" : "#111",
                    height: 200,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {/* Level Badge - Highlighted */}
              <div style={{
                display: "inline-block",
                      padding: "8px 16px",
                      background: course.isLocked 
                        ? "rgba(255,255,255,0.3)" 
                        : course.isEnrolled 
                          ? "rgba(255,255,255,0.3)" 
                          : "#fff",
                      color: course.isLocked || course.isEnrolled ? "#fff" : getLevelColor(course.level),
                borderRadius: 12,
                fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 16,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      boxShadow: course.isLocked || course.isEnrolled ? "none" : "0 2px 8px rgba(0,0,0,0.1)"
              }}>
                {getLevelLabel(course.level)}
              </div>

              <h3 style={{ 
                      margin: "0 0 12px", 
                fontSize: 20, 
                      fontWeight: 800,
                      lineHeight: 1.3,
                      textAlign: "center",
                      maxWidth: "100%",
                      padding: "0 8px"
              }}>
                {course.title}
              </h3>
              
              <p style={{
                margin: 0,
                fontSize: 14,
                      opacity: 0.85,
                      lineHeight: 1.5,
                      textAlign: "center",
                      maxWidth: "100%",
                      padding: "0 8px"
              }}>
                {course.description}
              </p>
            </div>

            {/* Course Info */}
              <div style={{
                    padding: "28px 32px",
                    height: 200,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "#fff"
                  }}>
                    {/* Lesson Count - Prominent */}
                    <div style={{
                      textAlign: "center",
                      paddingTop: 4
                    }}>
                      <div style={{
                        fontSize: 36,
                        fontWeight: 900,
                        color: course.isLocked ? "#94A3B8" : "#0F62FE",
                        lineHeight: 1,
                        marginBottom: 6
                      }}>
                        {course.lessonsCount}
                      </div>
                      <div style={{
                        fontSize: 13,
                        color: "#666",
                        fontWeight: 600
                      }}>
                        lecciones
                  </div>
                </div>
            </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>


      {/* Empty State */}
      {courses.length === 0 && (
        <Card style={{ padding: "60px 40px", textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📚</div>
          <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700 }}>
            No hay cursos disponibles
          </h3>
          <p style={{ margin: 0, color: "#666", fontSize: 14 }}>
            Contacta con tu administrador escolar para habilitar cursos
          </p>
        </Card>
      )}


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
            transform: translateY(-10px);
          }
        }

        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-25px) translateX(15px) rotate(90deg);
          }
          50% {
            transform: translateY(-15px) translateX(-15px) rotate(180deg);
          }
          75% {
            transform: translateY(-20px) translateX(10px) rotate(270deg);
          }
        }

        @keyframes meshMove {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(5%, 5%) rotate(2deg);
          }
          66% {
            transform: translate(-5%, 5%) rotate(-2deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 12px 32px rgba(15, 98, 254, 0.25), 0 0 0 0 rgba(15, 98, 254, 0.4);
          }
          50% {
            box-shadow: 0 12px 32px rgba(15, 98, 254, 0.25), 0 0 0 12px rgba(15, 98, 254, 0);
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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(-12px);
          }
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
    </main>
    </div>
  )
}

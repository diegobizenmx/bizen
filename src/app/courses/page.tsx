"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import Button from "@/components/ui/Button"

interface Lesson {
  id: string
  title: string
  unitTitle: string
  contentType: string
  order: number
  courseOrder: number
  isCompleted: boolean
  isLocked: boolean
  hasQuiz: boolean
  quizId?: string
  score?: number
  courseId: string
  courseTitle: string
}

interface Course {
  id: string
  title: string
  description: string
  level: string
  order: number
  isLocked: boolean
  isCompleted: boolean
  lessons: Lesson[]
}

// Island component
function LessonIsland({ lesson, offsetX, isNext, onClick }: { lesson: Lesson; offsetX: number; isNext: boolean; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: isNext ? [1, 1.08, 1] : 1
      }}
      transition={{ 
        duration: isNext ? 1.5 : 0.4,
        ease: "easeInOut",
        repeat: isNext ? Infinity : 0,
        repeatType: isNext ? "reverse" : undefined
      }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      style={{
        width: 180,
        height: 180,
        borderRadius: "50%",
        position: "relative",
        transform: `translateX(${offsetX}px)`,
        cursor: "pointer",
        transition: "transform 0.3s ease",
        filter: lesson.isLocked ? "brightness(0.95)" : "none"
      }}
    >
      {/* Bottom shadow */}
      <div style={{
        position: "absolute",
        bottom: -5,
        left: "50%",
        transform: "translateX(-50%)",
        width: 190,
        height: 25,
        background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 40%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(6px)",
        zIndex: 0
      }} />

      {/* Side edge */}
      <div style={{
        position: "absolute",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        width: 180,
        height: 180,
        borderRadius: "50%",
        background: lesson.isCompleted
          ? "#059669"
          : lesson.isLocked
          ? "#3B82F6"
          : "#1E40AF",
        zIndex: 1
      }} />

      {/* Top surface */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 180,
        height: 180,
        borderRadius: "50%",
        background: lesson.isCompleted
          ? "#10B981"
          : lesson.isLocked
          ? "#60A5FA"
          : "#3B82F6",
        border: "6px solid #fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
      }}>
        {/* Top highlight */}
        <div style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "30%",
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }} />
      </div>

      {/* Status Badges */}
      {lesson.isLocked && (
        <div style={{
          position: "absolute",
          top: -8,
          right: -8,
          width: 32,
          height: 32,
          background: "#fff",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 10
        }}>
          🔒
        </div>
      )}

      {lesson.isCompleted && lesson.score && lesson.score >= 90 && (
        <div style={{
          position: "absolute",
          top: -8,
          right: -8,
          width: 32,
          height: 32,
          background: "#FFD700",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          boxShadow: "0 2px 8px rgba(255, 215, 0, 0.4)",
          zIndex: 10
        }}>
          ⭐
        </div>
      )}

      {lesson.isCompleted && (!lesson.score || lesson.score < 90) && (
        <div style={{
          position: "absolute",
          top: -8,
          right: -8,
          width: 32,
          height: 32,
          background: "#10B981",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          color: "#fff",
          fontWeight: 800,
          boxShadow: "0 2px 8px rgba(16, 185, 129, 0.4)",
          zIndex: 10
        }}>
          ✓
        </div>
      )}
    </motion.div>
  )
}

export default function CoursesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null)

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }

    const fetchCoursesData = async () => {
      try {
        setLoadingData(true)
        
        const completedCourses: string[] = [] 
        const completedLessons: string[] = []

        const coursesData = [
          {
            id: "course-1", title: "Fundamentos del Dinero", description: "Aprende los conceptos básicos sobre el dinero", level: "Beginner", order: 1,
            lessons: [
              { unitTitle: "¿Qué es el dinero?", title: "Historia del dinero" },
              { unitTitle: "¿Qué es el dinero?", title: "Cómo gana valor" },
              { unitTitle: "¿Qué es el dinero?", title: "Dinero físico vs digital" },
              { unitTitle: "Conceptos financieros básicos", title: "Ingresos y gastos" },
              { unitTitle: "Conceptos financieros básicos", title: "Qué es el presupuesto" },
              { unitTitle: "Conceptos financieros básicos", title: "Ciclo del dinero" },
              { unitTitle: "Educación financiera personal", title: "Por qué importa" },
              { unitTitle: "Educación financiera personal", title: "Finanzas en la vida diaria" },
              { unitTitle: "Educación financiera personal", title: "Mentalidad financiera" }
            ]
          },
          {
            id: "course-2", title: "Finanzas Personales", description: "Gestión de presupuesto personal", level: "Beginner", order: 2,
            lessons: [
              { unitTitle: "Presupuesto y control", title: "Cómo crear un presupuesto" },
              { unitTitle: "Presupuesto y control", title: "Apps para organizar dinero" },
              { unitTitle: "Presupuesto y control", title: "Errores comunes" },
              { unitTitle: "Ahorro inteligente", title: "Métodos para ahorrar" },
              { unitTitle: "Ahorro inteligente", title: "Fondo de emergencia" },
              { unitTitle: "Ahorro inteligente", title: "Metas financieras" },
              { unitTitle: "Deudas y crédito", title: "Qué es el crédito" },
              { unitTitle: "Deudas y crédito", title: "Tipos de deuda" },
              { unitTitle: "Deudas y crédito", title: "Cómo evitar sobreendeudarte" }
            ]
          },
          {
            id: "course-3", title: "Mentalidad Financiera", description: "Desarrolla hábitos financieros saludables", level: "Beginner", order: 3,
            lessons: [
              { unitTitle: "Objetivos y visión", title: "Metas SMART" },
              { unitTitle: "Objetivos y visión", title: "Visualizar tu futuro" },
              { unitTitle: "Objetivos y visión", title: "Constancia y disciplina" },
              { unitTitle: "Hábitos saludables", title: "Rutinas financieras" },
              { unitTitle: "Hábitos saludables", title: "Planificación semanal" },
              { unitTitle: "Hábitos saludables", title: "Consumo consciente" },
              { unitTitle: "Creencias y emociones", title: "Psicología del dinero" },
              { unitTitle: "Creencias y emociones", title: "Miedos financieros" },
              { unitTitle: "Creencias y emociones", title: "Pensar en abundancia" }
            ]
          },
          {
            id: "course-4", title: "Finanzas para Emprendedores", description: "Gestión financiera empresarial", level: "Intermediate", order: 4,
            lessons: [
              { unitTitle: "Emprender desde cero", title: "Idea de negocio" },
              { unitTitle: "Emprender desde cero", title: "Modelo de negocio" },
              { unitTitle: "Emprender desde cero", title: "Propuesta de valor" },
              { unitTitle: "Finanzas del negocio", title: "Costos fijos y variables" },
              { unitTitle: "Finanzas del negocio", title: "Punto de equilibrio" },
              { unitTitle: "Finanzas del negocio", title: "Flujo de efectivo" },
              { unitTitle: "Crecimiento", title: "Branding y marketing" },
              { unitTitle: "Crecimiento", title: "Control de inventario" },
              { unitTitle: "Crecimiento", title: "Cómo reinvertir utilidades" }
            ]
          },
          {
            id: "course-5", title: "Impuestos y Obligaciones", description: "Todo sobre impuestos en México", level: "Intermediate", order: 5,
            lessons: [
              { unitTitle: "SAT y RFC", title: "Qué son los impuestos" },
              { unitTitle: "SAT y RFC", title: "Tipos de contribuyentes" },
              { unitTitle: "SAT y RFC", title: "RFC y e.firma" },
              { unitTitle: "Declarar y facturar", title: "Declaración anual" },
              { unitTitle: "Declarar y facturar", title: "Facturación electrónica" },
              { unitTitle: "Declarar y facturar", title: "Deducciones personales" },
              { unitTitle: "Derechos y errores comunes", title: "Qué pasa si no declaras" },
              { unitTitle: "Derechos y errores comunes", title: "Multas y beneficios" },
              { unitTitle: "Derechos y errores comunes", title: "Usar tus impuestos a favor" }
            ]
          },
          {
            id: "course-6", title: "Finanzas Laborales y Profesionales", description: "Optimiza tus ingresos profesionales", level: "Intermediate", order: 6,
            lessons: [
              { unitTitle: "Primer empleo", title: "Leer tu nómina" },
              { unitTitle: "Primer empleo", title: "Prestaciones laborales" },
              { unitTitle: "Primer empleo", title: "Negociar sueldo" },
              { unitTitle: "Freelancers y emprendedores", title: "Facturar y cobrar" },
              { unitTitle: "Freelancers y emprendedores", title: "Contratos y clientes" },
              { unitTitle: "Freelancers y emprendedores", title: "Fondo para impuestos" },
              { unitTitle: "Crecimiento profesional", title: "Aumentos y promociones" },
              { unitTitle: "Crecimiento profesional", title: "Uso inteligente de ingresos" },
              { unitTitle: "Crecimiento profesional", title: "Liderazgo financiero" }
            ]
          },
          {
            id: "course-7", title: "Finanzas en Pareja y Vida Adulta", description: "Gestión financiera compartida", level: "Intermediate", order: 7,
            lessons: [
              { unitTitle: "Comunicación financiera", title: "Hablar de dinero sin discutir" },
              { unitTitle: "Comunicación financiera", title: "Expectativas y valores" },
              { unitTitle: "Comunicación financiera", title: "Cuentas separadas o conjuntas" },
              { unitTitle: "Presupuesto familiar", title: "Planear ingresos y gastos" },
              { unitTitle: "Presupuesto familiar", title: "Gastos compartidos" },
              { unitTitle: "Presupuesto familiar", title: "Fondo para emergencias" },
              { unitTitle: "Decisiones grandes", title: "Comprar o rentar" },
              { unitTitle: "Decisiones grandes", title: "Matrimonio y finanzas" },
              { unitTitle: "Decisiones grandes", title: "Prevenir crisis financieras" }
            ]
          },
          {
            id: "course-8", title: "Inversiones Básicas", description: "Introducción al mundo de las inversiones", level: "Intermediate", order: 8,
            lessons: [
              { unitTitle: "Por qué invertir", title: "Interés compuesto" },
              { unitTitle: "Por qué invertir", title: "Riesgo vs rendimiento" },
              { unitTitle: "Por qué invertir", title: "Inversión a corto y largo plazo" },
              { unitTitle: "Instrumentos financieros", title: "Cetes y bonos" },
              { unitTitle: "Instrumentos financieros", title: "Acciones y fondos" },
              { unitTitle: "Instrumentos financieros", title: "Criptomonedas" },
              { unitTitle: "Estrategias de inversión", title: "Diversificación" },
              { unitTitle: "Estrategias de inversión", title: "Errores comunes" },
              { unitTitle: "Estrategias de inversión", title: "Cómo empezar con poco dinero" }
            ]
          },
          {
            id: "course-9", title: "Inversiones para Jóvenes", description: "Estrategias de inversión juvenil", level: "Advanced", order: 9,
            lessons: [
              { unitTitle: "Tu primer portafolio", title: "Cetes, fondos y apps" },
              { unitTitle: "Tu primer portafolio", title: "Cuánto invertir" },
              { unitTitle: "Tu primer portafolio", title: "Riesgos y recompensas" },
              { unitTitle: "Inversión digital", title: "Cripto y blockchain" },
              { unitTitle: "Inversión digital", title: "Robo-advisors" },
              { unitTitle: "Inversión digital", title: "Evitar fraudes" },
              { unitTitle: "Diversificación", title: "Inversión nacional e internacional" },
              { unitTitle: "Diversificación", title: "ETFs, REITs, indexados" },
              { unitTitle: "Diversificación", title: "Plazos y estrategias" }
            ]
          },
          {
            id: "course-10", title: "Finanzas Sostenibles y ESG", description: "Inversión responsable y ESG", level: "Advanced", order: 10,
            lessons: [
              { unitTitle: "Qué es ESG", title: "Medio ambiente, sociedad, gobernanza" },
              { unitTitle: "Qué es ESG", title: "Empresas sostenibles" },
              { unitTitle: "Qué es ESG", title: "Evaluar impacto" },
              { unitTitle: "Consumo consciente", title: "Finanzas éticas" },
              { unitTitle: "Consumo consciente", title: "Reducir y reutilizar" },
              { unitTitle: "Consumo consciente", title: "Finanzas personales sostenibles" },
              { unitTitle: "Inversiones verdes", title: "Bonos y fondos verdes" },
              { unitTitle: "Inversiones verdes", title: "Energías limpias" },
              { unitTitle: "Inversiones verdes", title: "Startups de impacto social" }
            ]
          },
          {
            id: "course-11", title: "Economía Global y Actualidad", description: "Entiende la economía mundial", level: "Advanced", order: 11,
            lessons: [
              { unitTitle: "Conceptos económicos", title: "Oferta y demanda" },
              { unitTitle: "Conceptos económicos", title: "Inflación y PIB" },
              { unitTitle: "Conceptos económicos", title: "Desempleo y productividad" },
              { unitTitle: "México y el mundo", title: "Sistema financiero mexicano" },
              { unitTitle: "México y el mundo", title: "Bancos centrales" },
              { unitTitle: "México y el mundo", title: "Comercio internacional" },
              { unitTitle: "Tendencias del futuro", title: "Economía digital" },
              { unitTitle: "Tendencias del futuro", title: "Sostenibilidad y ESG" },
              { unitTitle: "Tendencias del futuro", title: "Finanzas verdes" }
            ]
          },
          {
            id: "course-12", title: "Finanzas Empresariales Avanzadas", description: "Gestión financiera avanzada", level: "Advanced", order: 12,
            lessons: [
              { unitTitle: "Financiamiento empresarial", title: "Inversores y préstamos" },
              { unitTitle: "Financiamiento empresarial", title: "Pitch financiero" },
              { unitTitle: "Financiamiento empresarial", title: "Control de deuda" },
              { unitTitle: "Estrategia financiera", title: "Flujo de caja avanzado" },
              { unitTitle: "Estrategia financiera", title: "KPIs y métricas" },
              { unitTitle: "Estrategia financiera", title: "ROI, WACC y rentabilidad" },
              { unitTitle: "Escalamiento", title: "Reinversión" },
              { unitTitle: "Escalamiento", title: "Expansión internacional" },
              { unitTitle: "Escalamiento", title: "Exit strategy" }
            ]
          },
          {
            id: "course-13", title: "Casos Prácticos y Simulaciones", description: "Practica con casos reales", level: "Advanced", order: 13,
            lessons: [
              { unitTitle: "Caso: El Presupuesto de Juan", title: "Control de gastos" },
              { unitTitle: "Caso: El Presupuesto de Juan", title: "Ahorro mensual" },
              { unitTitle: "Caso: El Presupuesto de Juan", title: "Resultados según tus decisiones" },
              { unitTitle: "Caso: Tu negocio despega", title: "Costos y ventas" },
              { unitTitle: "Caso: Tu negocio despega", title: "Decisiones estratégicas" },
              { unitTitle: "Caso: Tu negocio despega", title: "Evaluación final" },
              { unitTitle: "Caso: Tu primera inversión", title: "Elegir riesgo" },
              { unitTitle: "Caso: Tu primera inversión", title: "Evaluar rendimiento" },
              { unitTitle: "Caso: Tu primera inversión", title: "Cierre con reflexión" }
            ]
          },
          {
            id: "course-14", title: "Casos Avanzados y Simulaciones", description: "Simulaciones complejas y avanzadas", level: "Advanced", order: 14,
            lessons: [
              { unitTitle: "El Reto del Freelancer", title: "Control de ingresos" },
              { unitTitle: "El Reto del Freelancer", title: "Decisiones de gasto" },
              { unitTitle: "El Reto del Freelancer", title: "Finales alternativos" },
              { unitTitle: "La Startup Verde", title: "Inversión sostenible" },
              { unitTitle: "La Startup Verde", title: "Pitch con inversionistas" },
              { unitTitle: "La Startup Verde", title: "Impacto y rentabilidad" },
              { unitTitle: "Mi primera inversión global", title: "Simulación de portafolio" },
              { unitTitle: "Mi primera inversión global", title: "Riesgos reales" },
              { unitTitle: "Mi primera inversión global", title: "Resultado final" }
            ]
          }
        ]

        // Build courses with lessons
        const allCourses: Course[] = coursesData.map((courseData, courseIndex) => {
          const courseIsLocked = courseIndex > 0 && !completedCourses.includes(coursesData[courseIndex - 1]!.id)
          
          const lessons: Lesson[] = courseData.lessons.map((lessonData, lessonIndex) => {
            const lessonId = `l${courseData.order}-${lessonIndex + 1}`
            const lessonTypes = ["reading", "video", "exercise"]
            const isFirstLesson = lessonIndex === 0
            const previousLessonId = lessonIndex > 0 ? `l${courseData.order}-${lessonIndex}` : null
            const previousCompleted = previousLessonId ? completedLessons.includes(previousLessonId) : true
            
            return {
              id: lessonId,
              title: lessonData.title,
              unitTitle: lessonData.unitTitle,
              contentType: lessonTypes[lessonIndex % 3]!,
              order: lessonIndex + 1,
              courseOrder: courseData.order,
              isCompleted: completedLessons.includes(lessonId),
              isLocked: courseIsLocked || (!isFirstLesson && !previousCompleted),
              hasQuiz: lessonIndex % 2 === 0,
              quizId: lessonIndex % 2 === 0 ? `q${lessonId}` : undefined,
              score: completedLessons.includes(lessonId) ? Math.floor(Math.random() * 30) + 70 : undefined,
              courseId: courseData.id,
              courseTitle: courseData.title
            }
          })

          return {
            id: courseData.id,
            title: courseData.title,
            description: courseData.description,
            level: courseData.level,
            order: courseData.order,
            isLocked: courseIsLocked,
            isCompleted: completedCourses.includes(courseData.id),
            lessons
          }
        })
        
        setCourses(allCourses)
        
        // Set initial current course
        if (allCourses.length > 0) {
          setCurrentCourse(allCourses[0]!)
        }
        
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoadingData(false)
      }
    }

    fetchCoursesData()
  }, [user, loading, router])

  // Intersection Observer to detect which course is in view
  useEffect(() => {
    if (courses.length === 0) return

    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -50% 0px', // Trigger when course is near top
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const courseId = entry.target.id.replace('course-', '')
          const course = courses.find(c => c.id === courseId)
          if (course && course.id !== currentCourse?.id) {
            console.log(`📍 Now viewing: Curso ${course.order} - ${course.title}`)
            setCurrentCourse(course)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all course sections
    courses.forEach((course) => {
      const element = document.getElementById(`course-${course.id}`)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [courses, currentCourse])

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

  if (!user) return null

  return (
    <>
      {/* Sticky Course Bar - Below AppHeader */}
      <div
        style={{
        position: "fixed",
          top: 85,
        left: 0,
          right: 0,
          zIndex: 99999,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none"
        }}
      >
        {currentCourse && (
          <div
            style={{
              background: "#3B82F6",
              boxShadow: "0 6px 20px rgba(37, 99, 235, 0.5)",
              padding: "10px 24px",
              borderRadius: 20,
              border: "3px solid #fff",
              pointerEvents: "auto",
              display: "inline-block"
            }}
          >
            <div style={{
              fontSize: 9,
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.8)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: 3,
              textAlign: "center",
              whiteSpace: "nowrap"
            }}>
              CURSO {currentCourse.order}
            </div>
        <div style={{
              fontSize: 14,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.2,
              textAlign: "center",
              whiteSpace: "nowrap"
            }}>
              {currentCourse.title}
            </div>
          </div>
        )}
      </div>

    <main style={{ 
        minHeight: "100vh",
        paddingTop: 120,
        paddingBottom: 80,
      fontFamily: "Montserrat, sans-serif",
        background: "linear-gradient(to bottom, #f0f7ff 0%, #ffffff 100%)"
      }}>
        {/* Island Path */}
        <div style={{ 
          maxWidth: 800,
          margin: "0 auto",
          position: "relative"
        }}>
          {courses.map((course) => (
            <div key={course.id} id={`course-${course.id}`} style={{ marginBottom: 80 }}>
              {/* Course Separator - Subtle */}
          <div style={{ 
                textAlign: "center",
                marginBottom: 80,
                padding: "20px 0"
        }}>
          <div style={{
                  display: "inline-block",
                  padding: "14px 28px",
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: 24,
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
                  border: "2px solid #E5E7EB"
                }}>
            <div style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#111"
                  }}>
                    📘 {course.title}
                  </div>
          </div>
        </div>

              {/* Lessons in Smooth Curve */}
        <div style={{ 
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 80
              }}>
                {course.lessons.map((lesson, lessonIdx) => {
                  // Irregular positioning - more organic, less perfect
                  const baseAmplitude = 150
                  const randomOffset = (lessonIdx * 73) % 40 - 20 // Pseudo-random offset
                  const waveOffset = Math.sin(lessonIdx * 0.7) * baseAmplitude
                  const offsetX = waveOffset + randomOffset
                  
                  // Determine if this is the next lesson
                  const isNext = !lesson.isLocked && !lesson.isCompleted && 
                    (lessonIdx === 0 || course.lessons[lessonIdx - 1]?.isCompleted)
                  
                  const isSelected = selectedLesson?.id === lesson.id
                  const isLeftSide = offsetX < 0
            
            return (
              <div
                      key={lesson.id}
                      id={`lesson-${lesson.id}`}
            style={{ 
                        width: "100%",
                  display: "flex",
                        justifyContent: "center",
                        position: "relative"
                      }}
                    >
                      <LessonIsland 
                        lesson={lesson}
                        offsetX={offsetX}
                        isNext={isNext}
                        onClick={() => setSelectedLesson(selectedLesson?.id === lesson.id ? null : lesson)}
                      />
                      
                      {/* Preview Panel Next to Island */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: isLeftSide ? -10 : 10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: isLeftSide ? -10 : 10 }}
                            style={{
                    position: "absolute",
                              top: "50%",
                    transform: "translateY(-50%)",
                              left: isLeftSide ? "calc(50% + 120px)" : "auto",
                              right: !isLeftSide ? "calc(50% + 120px)" : "auto",
                              width: 300,
                              background: "#F3F4F6",
                              borderRadius: 16,
                              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                              zIndex: 100,
                              border: "2px solid #E5E7EB"
                            }}
                          >
                            {/* Preview Content */}
                            <div style={{ padding: "20px" }}>
                    <div style={{
                                fontSize: 11,
                      fontWeight: 700,
                                color: "#6B7280",
                                marginBottom: 6,
                                textTransform: "uppercase"
                              }}>
                                Lección {lesson.order}
              </div>
              <h3 style={{ 
                                margin: "0 0 6px",
                                fontSize: 16,
                      fontWeight: 800,
                                color: "#111"
              }}>
                                {lesson.title}
              </h3>
                              <div style={{
                                fontSize: 12,
                                color: "#6B7280",
                                marginBottom: 16
                              }}>
                                {lesson.unitTitle}
            </div>

                              {lesson.isLocked ? (
              <div style={{
                                  padding: "14px",
                                  background: "#FEF3C7",
                                  borderRadius: 10,
                      textAlign: "center",
                                  border: "1px solid #F59E0B"
                                }}>
                                  <div style={{ fontSize: 28, marginBottom: 6 }}>🔒</div>
                                  <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E" }}>
                                    Bloqueada
                      </div>
                                  <div style={{ fontSize: 11, color: "#78350F", marginTop: 4 }}>
                                    Completa la lección anterior
                  </div>
                </div>
                              ) : (
                                <motion.div whileTap={{ scale: 0.95 }}>
                                  <Button
                                    onClick={() => {
                                      router.push(`/learn/${lesson.courseId}/unit-1/${lesson.id}`)
                                    }}
                                    style={{ width: "100%", fontSize: 14, padding: "10px 16px" }}
                                  >
                                    {lesson.isCompleted ? "Revisar →" : "Comenzar →"}
                                  </Button>
                                </motion.div>
                              )}
            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
          ))}
        </div>
      </main>


      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}

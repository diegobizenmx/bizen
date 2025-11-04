"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

interface Unit {
  id: string
  title: string
  order: number
  isLocked: boolean
  progress: number // 0-100
  lessons: Array<{
    id: string
    title: string
    isCompleted: boolean
  }>
}

export default function PathPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [units, setUnits] = useState<Unit[]>([])
  const [loadingUnits, setLoadingUnits] = useState(true)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }

    // TODO: Fetch real units from API
    const fetchUnits = async () => {
      try {
        setLoadingUnits(true)
        // Placeholder data - replace with actual API call
        setUnits([
          {
            id: "unit-1",
            title: "Introducción a las Finanzas",
            order: 1,
            isLocked: false,
            progress: 80,
            lessons: [
              { id: "lesson-1", title: "¿Qué es el dinero?", isCompleted: true },
              { id: "lesson-2", title: "Historia del dinero", isCompleted: true },
              { id: "lesson-3", title: "Sistemas financieros", isCompleted: false }
            ]
          },
          {
            id: "unit-2",
            title: "Presupuesto Personal",
            order: 2,
            isLocked: false,
            progress: 40,
            lessons: [
              { id: "lesson-4", title: "Crear un presupuesto", isCompleted: true },
              { id: "lesson-5", title: "Seguimiento de gastos", isCompleted: false },
              { id: "lesson-6", title: "Ajustar tu presupuesto", isCompleted: false }
            ]
          },
          {
            id: "unit-3",
            title: "Ahorro e Inversión",
            order: 3,
            isLocked: true,
            progress: 0,
            lessons: [
              { id: "lesson-7", title: "Estrategias de ahorro", isCompleted: false },
              { id: "lesson-8", title: "Introducción a inversiones", isCompleted: false },
              { id: "lesson-9", title: "Riesgo y retorno", isCompleted: false }
            ]
          },
          {
            id: "unit-4",
            title: "Crédito y Deuda",
            order: 4,
            isLocked: true,
            progress: 0,
            lessons: [
              { id: "lesson-10", title: "Comprender el crédito", isCompleted: false },
              { id: "lesson-11", title: "Gestión de deudas", isCompleted: false }
            ]
          }
        ])
        setSelectedCourseId("course-1")
      } catch (error) {
        console.error("Error fetching units:", error)
      } finally {
        setLoadingUnits(false)
      }
    }

    fetchUnits()
  }, [user, loading, router])

  if (loading || loadingUnits) {
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
          <p style={{ color: "#666", fontSize: 16 }}>Cargando mapa...</p>
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
    <div style={{ 
      minHeight: "100vh",
      background: "#fff",
      paddingTop: 0,
      marginTop: 0
    }}>
    <main style={{ 
      maxWidth: 800, 
      margin: "0 auto", 
      padding: "clamp(20px, 4vw, 40px)",
      fontFamily: "Montserrat, sans-serif",
      paddingTop: "clamp(20px, 4vw, 40px)"
    }}>
      {/* Back Button */}
      <button
        onClick={() => router.push("/dashboard")}
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
        <span>Inicio</span>
      </button>

      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: "clamp(28px, 6vw, 36px)", 
          fontWeight: 800,
          background: "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          🗺️ Tu Mapa de Aprendizaje
        </h1>
        <p style={{ margin: "8px 0 0", color: "#666", fontSize: "clamp(14px, 3vw, 16px)" }}>
          Desbloquea unidades completando lecciones
        </p>
      </div>

      {/* Duolingo-style Path */}
      <div style={{ 
        position: "relative", 
        display: "flex", 
        flexDirection: "column", 
        gap: 60,
        padding: "20px 0"
      }}>
        {units.map((unit, index) => {
          const isEven = index % 2 === 0
          return (
            <div
              key={unit.id}
              style={{
                position: "relative",
                display: "flex",
                justifyContent: isEven ? "flex-start" : "flex-end",
                animation: `fadeInUp 0.5s ease ${index * 0.1}s both`
              }}
            >
              {/* Unit Card */}
              <div
                onClick={() => !unit.isLocked && router.push(`/unit/${unit.id}`)}
                style={{
                  position: "relative",
                  width: "min(90%, 400px)",
                  padding: 24,
                  background: unit.isLocked 
                    ? "linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)" 
                    : "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)",
                  borderRadius: 20,
                  cursor: unit.isLocked ? "not-allowed" : "pointer",
                  boxShadow: unit.isLocked 
                    ? "0 8px 24px rgba(0,0,0,0.15)" 
                    : "0 12px 32px rgba(15, 98, 254, 0.3)",
                  transform: unit.isLocked ? "scale(0.95)" : "scale(1)",
                  opacity: unit.isLocked ? 0.6 : 1,
                  transition: "all 0.3s ease",
                  filter: unit.isLocked ? "grayscale(0.5)" : "none"
                }}
                onMouseEnter={(e) => {
                  if (!unit.isLocked) {
                    e.currentTarget.style.transform = "scale(1.02)"
                    e.currentTarget.style.boxShadow = "0 16px 40px rgba(15, 98, 254, 0.4)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!unit.isLocked) {
                    e.currentTarget.style.transform = "scale(1)"
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 98, 254, 0.3)"
                  }
                }}
              >
                {/* Lock Icon */}
                {unit.isLocked && (
                  <div style={{
                    position: "absolute",
                    top: -12,
                    right: -12,
                    width: 48,
                    height: 48,
                    background: "#6B7280",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                  }}>
                    🔒
                  </div>
                )}

                {/* Unit Number Badge */}
                <div style={{
                  position: "absolute",
                  top: -16,
                  left: 24,
                  background: "#fff",
                  color: unit.isLocked ? "#6B7280" : "#0F62FE",
                  padding: "6px 16px",
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 700,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}>
                  Unidad {unit.order}
                </div>

                {/* Unit Title */}
                <h2 style={{
                  margin: "20px 0 12px",
                  fontSize: "clamp(18px, 4vw, 22px)",
                  fontWeight: 800,
                  color: "#fff"
                }}>
                  {unit.title}
                </h2>

                {/* Lessons Count */}
                <div style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: 16
                }}>
                  {unit.lessons.filter(l => l.isCompleted).length} / {unit.lessons.length} lecciones completadas
                </div>

                {/* Progress Bar */}
                {!unit.isLocked && (
                  <div style={{
                    width: "100%",
                    height: 8,
                    background: "rgba(255,255,255,0.3)",
                    borderRadius: 10,
                    overflow: "hidden",
                    marginTop: 12
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${unit.progress}%`,
                      background: "#fff",
                      borderRadius: 10,
                      transition: "width 0.5s ease"
                    }} />
                  </div>
                )}

                {/* Locked Message */}
                {unit.isLocked && (
                  <div style={{
                    marginTop: 12,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.9)",
                    fontStyle: "italic"
                  }}>
                    Completa las unidades anteriores para desbloquear
                  </div>
                )}
              </div>

              {/* Connector Line (optional visual) */}
              {index < units.length - 1 && (
                <div style={{
                  position: "absolute",
                  bottom: -60,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 4,
                  height: 60,
                  background: "linear-gradient(to bottom, #0F62FE, #10B981)",
                  opacity: 0.3,
                  borderRadius: 10
                }} />
              )}
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
    </div>
  )
}


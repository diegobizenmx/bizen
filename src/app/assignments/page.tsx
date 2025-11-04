"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

interface Assignment {
  id: string
  title: string
  unitTitle: string
  courseTitle: string
  type: string // "file" | "link" | "text"
  dueAt: string
  points: number
  status: "pending" | "submitted" | "graded"
  score?: number
  submittedAt?: string
}

export default function AssignmentsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loadingAssignments, setLoadingAssignments] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "submitted" | "graded">("all")

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }

    // TODO: Fetch real assignments from API
    const fetchAssignments = async () => {
      try {
        setLoadingAssignments(true)
        // Placeholder data
        setAssignments([
          {
            id: "a1",
            title: "Plan de Presupuesto Mensual",
            unitTitle: "Presupuesto Personal",
            courseTitle: "Fundamentos de Finanzas Personales",
            type: "file",
            dueAt: "2025-11-15T23:59:59",
            points: 100,
            status: "pending"
          },
          {
            id: "a2",
            title: "Ensayo: Historia del Dinero",
            unitTitle: "Introducción a las Finanzas",
            courseTitle: "Fundamentos de Finanzas Personales",
            type: "text",
            dueAt: "2025-11-10T23:59:59",
            points: 50,
            status: "submitted",
            submittedAt: "2025-11-08T14:30:00"
          },
          {
            id: "a3",
            title: "Análisis de Inversión",
            unitTitle: "Ahorro e Inversión",
            courseTitle: "Fundamentos de Finanzas Personales",
            type: "link",
            dueAt: "2025-11-05T23:59:59",
            points: 150,
            status: "graded",
            score: 135,
            submittedAt: "2025-11-04T10:15:00"
          }
        ])
      } catch (error) {
        console.error("Error fetching assignments:", error)
      } finally {
        setLoadingAssignments(false)
      }
    }

    fetchAssignments()
  }, [user, loading, router])

  if (loading || loadingAssignments) {
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
          <p style={{ color: "#666", fontSize: 16 }}>Cargando asignaciones...</p>
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

  const filteredAssignments = filter === "all" 
    ? assignments 
    : assignments.filter(a => a.status === filter)

  const pendingCount = assignments.filter(a => a.status === "pending").length
  const submittedCount = assignments.filter(a => a.status === "submitted").length
  const gradedCount = assignments.filter(a => a.status === "graded").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "#F59E0B"
      case "submitted": return "#0F62FE"
      case "graded": return "#10B981"
      default: return "#6B7280"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Pendiente"
      case "submitted": return "Enviado"
      case "graded": return "Calificado"
      default: return status
    }
  }

  const isOverdue = (dueAt: string) => {
    return new Date(dueAt) < new Date()
  }

  return (
    <main style={{ 
      maxWidth: 1000, 
      margin: "0 auto", 
      padding: "clamp(20px, 4vw, 40px)",
      fontFamily: "Montserrat, sans-serif"
    }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: "clamp(28px, 6vw, 36px)", 
          fontWeight: 800,
          background: "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          📝 Mis Asignaciones
        </h1>
        <p style={{ margin: "8px 0 0", color: "#666", fontSize: "clamp(14px, 3vw, 16px)" }}>
          Gestiona y envía tus tareas
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16,
        marginBottom: 32
      }}>
        <Card style={{ textAlign: "center", padding: "20px 16px" }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#F59E0B" }}>{pendingCount}</div>
          <div style={{ fontSize: 14, color: "#666", marginTop: 4 }}>Pendientes</div>
        </Card>
        <Card style={{ textAlign: "center", padding: "20px 16px" }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#0F62FE" }}>{submittedCount}</div>
          <div style={{ fontSize: 14, color: "#666", marginTop: 4 }}>Enviadas</div>
        </Card>
        <Card style={{ textAlign: "center", padding: "20px 16px" }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#10B981" }}>{gradedCount}</div>
          <div style={{ fontSize: 14, color: "#666", marginTop: 4 }}>Calificadas</div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: "flex",
        gap: 8,
        marginBottom: 24,
        borderBottom: "2px solid #E5E7EB",
        flexWrap: "wrap"
      }}>
        {[
          { key: "all", label: "Todas" },
          { key: "pending", label: "Pendientes" },
          { key: "submitted", label: "Enviadas" },
          { key: "graded", label: "Calificadas" }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            style={{
              padding: "12px 20px",
              background: "transparent",
              border: "none",
              borderBottom: filter === tab.key ? "3px solid #0F62FE" : "3px solid transparent",
              color: filter === tab.key ? "#0F62FE" : "#6B7280",
              fontWeight: filter === tab.key ? 700 : 500,
              fontSize: 15,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Assignments List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {filteredAssignments.map(assignment => (
          <Card 
            key={assignment.id}
            style={{ 
              padding: 24,
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onClick={() => router.push(`/assignments/${assignment.id}`)}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}>
                {/* Status Badge */}
                <div style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  background: getStatusColor(assignment.status) + "22",
                  color: getStatusColor(assignment.status),
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 12
                }}>
                  {getStatusLabel(assignment.status)}
                </div>

                <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>
                  {assignment.title}
                </h3>

                <div style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>
                  {assignment.courseTitle} › {assignment.unitTitle}
                </div>

                <div style={{ 
                  display: "flex", 
                  gap: 16, 
                  fontSize: 13, 
                  color: "#666",
                  flexWrap: "wrap"
                }}>
                  <span>📅 Entrega: {new Date(assignment.dueAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>⭐ {assignment.points} puntos</span>
                  {assignment.status === "graded" && assignment.score !== undefined && (
                    <span style={{ color: "#10B981", fontWeight: 600 }}>
                      ✓ Calificación: {assignment.score}/{assignment.points}
                    </span>
                  )}
                </div>

                {assignment.status === "pending" && isOverdue(assignment.dueAt) && (
                  <div style={{
                    marginTop: 12,
                    padding: "8px 12px",
                    background: "#FEE2E2",
                    border: "1px solid #EF4444",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "#DC2626",
                    fontWeight: 600
                  }}>
                    ⚠️ Vencida
                  </div>
                )}
              </div>

              {/* Action Button */}
              {assignment.status === "pending" && (
                <Button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation()
                    router.push(`/assignments/${assignment.id}`)
                  }}
                  style={{ minWidth: 140 }}
                >
                  Entregar →
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAssignments.length === 0 && (
        <Card style={{ padding: "60px 40px", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📝</div>
          <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700 }}>
            No hay asignaciones {filter !== "all" && getStatusLabel(filter).toLowerCase()}
          </h3>
          <p style={{ margin: 0, color: "#666", fontSize: 14 }}>
            {filter === "pending" && "¡Genial! Estás al día con tus tareas"}
            {filter === "submitted" && "No tienes asignaciones esperando calificación"}
            {filter === "graded" && "Aún no tienes asignaciones calificadas"}
            {filter === "all" && "No tienes asignaciones aún"}
          </p>
        </Card>
      )}
    </main>
  )
}


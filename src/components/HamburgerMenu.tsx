"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Card from "@/components/ui/Card"

interface DashboardStats {
  coursesEnrolled: number
  lessonsCompleted: number
  currentStreak: number
  totalPoints: number
}

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      // TODO: Fetch real stats from API
      setStats({
        coursesEnrolled: 2,
        lessonsCompleted: 15,
        currentStreak: 7,
        totalPoints: 450
      })
    }
  }, [user])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navigateTo = (path: string) => {
    setIsOpen(false)
    router.push(path)
  }

  return (
    <>
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 5,
          zIndex: 1001,
          transition: "all 0.3s ease"
        }}
        aria-label="Menu"
      >
        <div style={{
          width: 28,
          height: 3,
          background: "#0F62FE",
          borderRadius: 2,
          transition: "all 0.3s ease",
          transform: isOpen ? "rotate(45deg) translateY(8px)" : "none"
        }} />
        <div style={{
          width: 28,
          height: 3,
          background: "#0F62FE",
          borderRadius: 2,
          transition: "all 0.3s ease",
          opacity: isOpen ? 0 : 1
        }} />
        <div style={{
          width: 28,
          height: 3,
          background: "#0F62FE",
          borderRadius: 2,
          transition: "all 0.3s ease",
          transform: isOpen ? "rotate(-45deg) translateY(-8px)" : "none"
        }} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            animation: "fadeIn 0.3s ease"
          }}
        />
      )}

      {/* Menu Panel */}
      <div style={{
        position: "fixed",
        top: 0,
        right: isOpen ? 0 : "-400px",
        width: "min(400px, 90vw)",
        height: "100vh",
        background: "#fff",
        boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        transition: "right 0.3s ease",
        overflowY: "auto",
        fontFamily: "Montserrat, sans-serif"
      }}>
        <div style={{ padding: "80px 24px 24px" }}>
          {/* User Greeting */}
          {user && (
            <div style={{ marginBottom: 32 }}>
              <h2 style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 800,
                background: "linear-gradient(135deg, #0F62FE 0%, #10B981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                ¡Hola, {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Estudiante'}!
              </h2>
            </div>
          )}

          {/* Stats Section */}
          {stats && (
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ 
                margin: "0 0 16px", 
                fontSize: 16, 
                fontWeight: 700,
                color: "#666",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}>
                Tu Progreso
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12
              }}>
                <Card style={{ textAlign: "center", padding: "16px 12px" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#0F62FE" }}>{stats.coursesEnrolled}</div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>Cursos Activos</div>
                </Card>
                <Card style={{ textAlign: "center", padding: "16px 12px" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#10B981" }}>{stats.lessonsCompleted}</div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>Lecciones</div>
                </Card>
                <Card style={{ textAlign: "center", padding: "16px 12px" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#F59E0B" }}>🔥 {stats.currentStreak}</div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>Racha</div>
                </Card>
                <Card style={{ textAlign: "center", padding: "16px 12px" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#8B5CF6" }}>{stats.totalPoints}</div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>Puntos</div>
                </Card>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ 
              margin: "0 0 16px", 
              fontSize: 16, 
              fontWeight: 700,
              color: "#666",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              Acciones Rápidas
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                onClick={() => navigateTo("/courses")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px",
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 15,
                  fontWeight: 600
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0F62FE"
                  e.currentTarget.style.color = "#fff"
                  e.currentTarget.style.transform = "translateX(4px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F9FAFB"
                  e.currentTarget.style.color = "#000"
                  e.currentTarget.style.transform = "translateX(0)"
                }}
              >
                <span style={{ fontSize: 24 }}>📚</span>
                <span>Explorar Cursos</span>
              </button>

              <button
                onClick={() => navigateTo("/assignments")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px",
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 15,
                  fontWeight: 600
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0F62FE"
                  e.currentTarget.style.color = "#fff"
                  e.currentTarget.style.transform = "translateX(4px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F9FAFB"
                  e.currentTarget.style.color = "#000"
                  e.currentTarget.style.transform = "translateX(0)"
                }}
              >
                <span style={{ fontSize: 24 }}>📝</span>
                <span>Asignaciones</span>
              </button>

              <button
                onClick={() => navigateTo("/progress")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px",
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 15,
                  fontWeight: 600
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0F62FE"
                  e.currentTarget.style.color = "#fff"
                  e.currentTarget.style.transform = "translateX(4px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F9FAFB"
                  e.currentTarget.style.color = "#000"
                  e.currentTarget.style.transform = "translateX(0)"
                }}
              >
                <span style={{ fontSize: 24 }}>🏆</span>
                <span>Mi Progreso</span>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 style={{ 
              margin: "0 0 16px", 
              fontSize: 16, 
              fontWeight: 700,
              color: "#666",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>
              Cuenta
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                onClick={() => navigateTo("/profile")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px",
                  background: "transparent",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: "left"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F9FAFB"
                  e.currentTarget.style.transform = "translateX(4px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.transform = "translateX(0)"
                }}
              >
                <span style={{ fontSize: 20 }}>👤</span>
                <span>Perfil</span>
              </button>

              <button
                onClick={() => navigateTo("/account")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px",
                  background: "transparent",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: "left"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F9FAFB"
                  e.currentTarget.style.transform = "translateX(4px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.transform = "translateX(0)"
                }}
              >
                <span style={{ fontSize: 20 }}>⚙️</span>
                <span>Cuenta</span>
              </button>

              <button
                onClick={() => navigateTo("/settings")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px",
                  background: "transparent",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: "left"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F9FAFB"
                  e.currentTarget.style.transform = "translateX(4px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.transform = "translateX(0)"
                }}
              >
                <span style={{ fontSize: 20 }}>🔧</span>
                <span>Configuración</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  )
}


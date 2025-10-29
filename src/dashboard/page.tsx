/* eslint-disable @next/next/no-html-link-for-pages */
"use client"

import * as React from "react"
import { useAuth } from "@/contexts/AuthContext"
import ProtectedRoute from "@/components/ProtectedRoute"

// Tipos de filas que mostramos en el dashboard
type Row = {
  course_title: string
  module_title: string
  grade_level: number
  section_id: string
  section_title: string
}

function DashboardContent(): React.JSX.Element {
  const { user, signOut } = useAuth()
  const [rows, setRows] = React.useState<Row[]>([])
  const [loading, setLoading] = React.useState(true)
  const [errorMsg, setErrorMsg] = React.useState<string>("")

  React.useEffect(() => {
    const run = async () => {
      setLoading(true)
      setErrorMsg("")

      // Contenido publicado (usando Prisma)
      const response = await fetch('/api/curriculum')
      if (response.ok) {
        const data = await response.json()
        setRows(data as Row[])
      } else {
        setErrorMsg('Error al cargar el currículum')
      }

      setLoading(false)
    }

    void run()
  }, [])

  const markCompleted = React.useCallback(
    async (sectionId: string) => {
      if (!user?.id) return
      
      try {
        const response = await fetch('/api/progress/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            sectionId,
            status: 'completed',
            percent: 100,
          }),
        })
        
        if (response.ok) {
          alert("¡Sección marcada como completada!")
        } else {
          const error = await response.json()
          alert(`Error al marcar completada: ${error.message}`)
        }
      } catch (error) {
        alert(`Error al marcar completada: ${error}`)
      }
    },
    [user?.id]
  )

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: "flex" as const, justifyContent: "space-between" as const, alignItems: "center" as const, marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Mi Dashboard</h1>
        <div style={{ display: "flex" as const, gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 14, color: "#666" }}>
            Hola, {user?.email}
          </span>
          <button
            onClick={() => signOut()}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              background: "white",
              color: "#374151",
              cursor: "pointer",
              fontSize: 14
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Admin Section */}
      <div style={{ 
        marginBottom: '32px', 
        padding: '20px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        borderRadius: '12px',
        color: 'white'
      }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600' }}>
          🔧 Panel de Administración
        </h2>
        <p style={{ margin: '0 0 20px 0', opacity: 0.9, fontSize: '14px' }}>
          Herramientas administrativas para gestionar la plataforma
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <a
            href="/admin/files"
            style={{
              display: 'block',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            📁 Archivos Subidos
          </a>
          <a
            href="/admin/quiz-results"
            style={{
              display: 'block',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            📊 Resultados de Quizzes
          </a>
          <a
            href="/admin/final-test-results"
            style={{
              display: 'block',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            🏆 Resultados Examen Final
          </a>
          <a
            href="/admin/manage-users"
            style={{
              display: 'block',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            👥 Gestionar Usuarios
          </a>
        </div>
      </div>

      {loading && <p>Cargando…</p>}
      {!loading && errorMsg && (
        <p style={{ color: "#f50c37ff" }}>Error: {errorMsg}</p>
      )}

      {!loading && !errorMsg && rows.length === 0 && (
        <p>No hay elementos publicados aún.</p>
      )}

      {!loading && rows.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid" as const,
            gap: 12,
            maxWidth: 900,
          }}
        >
          {rows.map((r) => (
            <li
              key={r.section_id}
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 12,
                padding: 12,
                background: "#fff",
                display: "grid" as const,
                gap: 6,
              }}
            >
              <div style={{ fontWeight: 800 }}>
                [G{r.grade_level}] {r.module_title}
              </div>
              <div style={{ opacity: 0.85 }}>{r.section_title}</div>
              <div style={{ fontSize: 13, opacity: 0.7 }}>
                Curso: {r.course_title}
              </div>

              {user && (
                <button
                  onClick={() => markCompleted(r.section_id)}
                  style={{
                    justifySelf: "start",
                    marginTop: 6,
                    borderRadius: 10,
                    padding: "10px 12px",
                    border: "1px solid rgba(14,165,233,.35)",
                    background: "#0EA5E9",
                    color: "#fff",
                    fontWeight: 800,
                    cursor: "pointer",
                    transition: "transform 60ms ease, filter 180ms ease",
                  }}
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "scale(0.9)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Marcar completada
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default function Dashboard(): React.JSX.Element {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}

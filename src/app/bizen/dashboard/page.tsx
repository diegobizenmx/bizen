"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthBizen } from "@/contexts/AuthContextBizen"
import Image from "next/image"

export default function BIZENDashboard() {
  const { user, loading } = useAuthBizen()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/bizen/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        minHeight: "100vh",
        fontSize: 18
      }}>
        Cargando...
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px",
      fontFamily: "Montserrat, sans-serif"
    }}>
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        background: "white",
        borderRadius: 24,
        padding: 48,
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
          <Image 
            src="/bizen-mondragonlogo.png" 
            alt="BIZEN" 
            width={64} 
            height={64}
          />
          <div>
            <h1 style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 900,
              background: "linear-gradient(135deg, #0B71FE, #4A9EFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Panel BIZEN
            </h1>
            <p style={{ margin: 4, color: "#666", fontSize: 14 }}>
              Bienvenido, {user.email}
            </p>
          </div>
        </div>

        <div style={{
          padding: 24,
          background: "linear-gradient(135deg, rgba(11, 113, 254, 0.08), rgba(74, 158, 255, 0.08))",
          borderRadius: 16,
          border: "2px dashed #0B71FE"
        }}>
          <p style={{ margin: 0, color: "#666", lineHeight: 1.6 }}>
            🚧 El contenido de BIZEN está en desarrollo. Próximamente encontrarás:
          </p>
          <ul style={{ marginTop: 16, paddingLeft: 20, color: "#666" }}>
            <li>Cursos de habilidades empresariales</li>
            <li>Contenido de finanzas y negocios</li>
            <li>Acceso a recursos educativos</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


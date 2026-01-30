"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!user) {
      window.open("/login", "_blank")
      return
    }
    
    // Dashboard functionality is now in the hamburger menu
    // Redirect to courses as the main learning area
    router.replace("/courses")
  }, [user, loading, router])

  return (
    <div style={{ 
      display: "grid", 
      placeItems: "center", 
      minHeight: "60vh", 
      fontFamily: "Montserrat, sans-serif" 
    }}>
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
        <p style={{ color: "#666", fontSize: 16 }}>Redirigiendo...</p>
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

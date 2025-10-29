"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import DiagnosticQuiz from "@/components/DiagnosticQuiz"

export default function DiagnosticQuizPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkQuiz() {
      if (loading) return
      
      if (!user) {
        router.push("/login")
        return
      }

      // Check if user has already completed the diagnostic quiz in database
      try {
        const response = await fetch("/api/diagnostic-quiz", {
          method: "GET",
        })

        if (response.ok) {
          const data = await response.json()
          console.log('[DIAGNOSTIC] Quiz status from DB:', data.completed)
          
          if (data.completed) {
            // Mark as completed in localStorage too
            if (typeof window !== 'undefined') {
              localStorage.setItem('diagnosticQuiz_completed', 'true')
            }
            // Already completed, redirect to modules
            console.log('[DIAGNOSTIC] Quiz completed, redirecting to modules')
            router.push("/modules/menu")
            return
          } else {
            // Not completed - clear any stale localStorage flag
            if (typeof window !== 'undefined') {
              localStorage.removeItem('diagnosticQuiz_completed')
            }
            // Redirect to introduction page first
            console.log('[DIAGNOSTIC] Quiz not completed, redirecting to intro')
            router.push("/diagnostic-quiz/intro")
            return
          }
        }
      } catch (error) {
        console.error("Error checking diagnostic quiz:", error)
        // If database is unavailable, redirect to intro
        router.push("/diagnostic-quiz/intro")
        return
      }
      
      setChecking(false)
    }

    checkQuiz()
  }, [user, loading, router])

  if (loading || checking) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFFFF"
      }}>
        <p style={{ fontSize: 18, color: "#666" }}>Cargando...</p>
      </div>
    )
  }

  return <DiagnosticQuiz />
}


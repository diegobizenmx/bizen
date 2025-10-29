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
    async function checkQuizStatus() {
      if (loading) return
      
      if (!user) {
        router.push("/login")
        return
      }

      try {
        // Check if user has seen intro
        const hasSeenIntro = localStorage.getItem('diagnosticQuiz_intro_seen')
        if (hasSeenIntro !== 'true') {
          router.push("/diagnostic-quiz/intro")
          return
        }

        // Check if quiz is already completed
        const response = await fetch("/api/diagnostic-quiz", {
          method: "GET",
        })

        if (response.ok) {
          const data = await response.json()
          if (data.completed) {
            router.push("/modules/menu")
            return
          }
        }
      } catch (error) {
        console.error("Error checking quiz status:", error)
      }
      
      setChecking(false)
    }

    checkQuizStatus()
  }, [user, loading, router])

  if (loading || checking) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <p style={{ fontSize: 18, color: "#fff" }}>Cargando quiz...</p>
      </div>
    )
  }

  return <DiagnosticQuiz />
}
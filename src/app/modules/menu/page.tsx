"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import MondragonMenuClient from "./ModulesMenuClient"

export default function ModulesMenuPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkQuiz() {
      if (loading) return
      
      console.log('[MODULES_MENU] User check:', !!user, user?.email)

      if (!user) {
        console.log('[MODULES_MENU] No user found, redirecting to login')
        router.push("/login")
        return
      }

      // Check if user has completed diagnostic quiz
      try {
        const response = await fetch("/api/diagnostic-quiz", {
          method: "GET",
        })

        if (response.ok) {
          const data = await response.json()
          console.log('[MODULES_MENU] Quiz check result:', data)
          
          if (!data.completed && !data.error) {
            // Not completed, redirect to quiz
            console.log('[MODULES_MENU] Quiz not completed, redirecting to diagnostic-quiz')
            
            // Clear any stale completion flags before redirecting
            if (typeof window !== 'undefined') {
              localStorage.removeItem('diagnosticQuiz_completed')
            }
            
            router.push("/diagnostic-quiz")
            return
          } else if (data.completed) {
            // Ensure localStorage is in sync
            if (typeof window !== 'undefined') {
              localStorage.setItem('diagnosticQuiz_completed', 'true')
            }
          }
        }
      } catch (error) {
        console.error('[MODULES_MENU] Error checking diagnostic quiz:', error)
        // If database is unavailable, allow access to modules
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

  return <MondragonMenuClient />
}

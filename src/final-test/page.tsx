"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import FinalTestQuiz from "@/components/FinalTestQuiz"

export default function FinalTestPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  
  const handleComplete = () => {
    // Redirect to Billy's celebration page
    router.push("/course-complete")
  }

  useEffect(() => {
    async function checkAccess() {
      if (loading) return
      
      if (!user) {
        router.push("/login")
        return
      }

      // Check if user has completed Module 6 Section 1 (file upload requirement)
      try {
        const response = await fetch("/api/progress/user-progress", {
          method: "GET",
        })

        if (response.ok) {
          const data = await response.json()
          console.log('[FINAL_TEST] User progress data:', data)
          console.log('[FINAL_TEST] Section completions:', data.sectionCompletions)
          
          const finalModuleCompleted = data.sectionCompletions?.some((section: any) => 
            section.moduleId === 6 && section.sectionId === 1 && section.isComplete
          )
          
          console.log('[FINAL_TEST] Module 6 Section 1 completed:', finalModuleCompleted)
          
          if (!finalModuleCompleted) {
            // User hasn't completed the prerequisite, redirect to modules
            console.log('[FINAL_TEST] Module 6 Section 1 not completed, redirecting to modules')
            router.push("/modules/menu")
            return
          }
        }
      } catch (error) {
        console.error("Error checking module completion:", error)
        // If database is unavailable, allow them to take the test
      }
      
      setChecking(false)
    }

    checkAccess()
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

  return <FinalTestQuiz onComplete={handleComplete} />
}

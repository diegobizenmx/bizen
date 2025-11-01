"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { createClient } from "@/lib/supabase/client"
import BillyWelcomeScreen from "@/components/BillyWelcomeScreen"

export default function WelcomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)
  const [isReturningUser, setIsReturningUser] = useState(false)
  const [redirectPath, setRedirectPath] = useState("/diagnostic-quiz")

  // Log immediately when component loads
  useEffect(() => {
    console.log('[WELCOME] 🔄 Page loaded!')
    console.log('[WELCOME] Current URL:', window.location.href)
    console.log('[WELCOME] User from auth:', user?.email || 'No user')
    console.log('[WELCOME] Loading:', loading)
  }, [])

  useEffect(() => {
    console.log('[WELCOME] 🔍 Checking verified param...')
    // If coming from email confirmation, check session
    const urlParams = new URLSearchParams(window.location.search)
    const verified = urlParams.get('verified')
    
    console.log('[WELCOME] Verified param:', verified)
    
    if (verified === 'true') {
      console.log('[WELCOME] ✅ Verified param detected!')
      console.log('[WELCOME] Current user:', user?.email || 'No user')
      console.log('[WELCOME] Loading:', loading)
      
      // Wait a bit for session to be available
      const checkSession = async () => {
        const supabase = createClient()
        console.log('[WELCOME] 🔍 Checking session...')
        const { data: { session } } = await supabase.auth.getSession()
        console.log('[WELCOME] Session exists:', !!session)
        console.log('[WELCOME] Session user:', session?.user?.email)
        
        if (session) {
          console.log('[WELCOME] ✅ Session found! Redirecting to clean URL...')
          window.location.href = '/welcome'
        } else {
          console.log('[WELCOME] ❌ No session found, reloading page...')
          setTimeout(() => {
            console.log('[WELCOME] 🔄 Reloading now...')
            window.location.reload()
          }, 1500)
        }
      }
      
      checkSession()
      return
    } else {
      console.log('[WELCOME] No verified param, continuing normally...')
    }
  }, [user, loading])

  useEffect(() => {
    if (loading) return

    if (!user) {
      // Not authenticated, redirect to login
      router.push("/login")
      return
    }

    // Check if user is returning or new
    const checkUserStatus = async () => {
      try {
        // Check if user has completed diagnostic quiz
        const response = await fetch("/api/diagnostic-quiz")
        const data = await response.json()

        if (data.hasCompleted) {
          // Returning user - already completed quiz
          setIsReturningUser(true)
          setRedirectPath("/modules/menu")
        } else {
          // New user - hasn't completed quiz
          setIsReturningUser(false)
          setRedirectPath("/diagnostic-quiz")
        }

        setIsReady(true)
      } catch (error) {
        console.error("Error checking user status:", error)
        // Default to new user flow
        setIsReturningUser(false)
        setRedirectPath("/diagnostic-quiz")
        setIsReady(true)
      }
    }

    checkUserStatus()
  }, [user, loading, router])

  if (loading || !isReady) {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          <p style={{ color: "#666", fontSize: 18 }}>Cargando...</p>
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

  if (!user) {
    return null
  }

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Estudiante"

  return (
    <BillyWelcomeScreen
      userName={userName}
      isReturningUser={isReturningUser}
      redirectTo={redirectPath}
      autoCloseAfter={5000}
    />
  )
}


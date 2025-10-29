/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"
import { motion } from "framer-motion"

type Layout = "Top" | "Sidebar"

type Props = {
  // Marca / encabezado
  brandName?: string
  subtitle?: string
  logoSrc?: string
  cornerLogoSrc?: string
  cornerLogoHref?: string

  // Layout
  layout?: Layout
  fullHeight?: boolean
  openInNewTab?: boolean

  // Dimensiones
  maxWidth?: number
  padding?: number
  gap?: number
  radius?: number
  sidebarWidth?: number

  // Colores
  pageBg?: string
  headerBg?: string
  headerText?: string
  primaryColor?: string
  textColor?: string
  btnBg?: string
  btnBgHover?: string

  // Módulos (6): título + url
  title1?: string; url1?: string
  title2?: string; url2?: string
  title3?: string; url3?: string
  title4?: string; url4?: string
  title5?: string; url5?: string
  title6?: string; url6?: string
}

export default function MondragonMenuClient({
  // Marca
  brandName = "BIZEN",
  subtitle = "6 módulos • 40 horas • Progreso lineal",
  logoSrc = "/bizen-mondragonlogo.png",
  cornerLogoSrc = "/bizen-mondragonlogo.png",
  cornerLogoHref,

  // Layout
  layout = "Top",
  fullHeight = true,
  openInNewTab = false,

  // Dimensiones
  maxWidth = 1200,
  padding = 40,
  gap = 20,                // 👈 BIGGER gap between modules (was 16)
  radius = 14,
  sidebarWidth = 300,

  // Colores
  pageBg = "#f8fafc",
  headerBg = "#ffffff",
  headerText = "#0f172a",
  primaryColor = "#1e40af",
  textColor = "#0f172a",
  btnBg = "#ffffff",
  btnBgHover = "#f3f4f6",

  // Módulos
  title1 = "Módulo 1", url1 = "/module/1/sections",
  title2 = "Módulo 2", url2 = "/module/2/sections",
  title3 = "Módulo 3", url3 = "/module/3/sections",
  title4 = "Módulo 4", url4 = "/module/4/sections",
  title5 = "Módulo 5", url5 = "/module/5/sections",
  title6 = "Módulo 6", url6 = "/module/6/section/1/page/1",
}: Props) {
  const { signOut, user, loading } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)
  const [unlockedModules, setUnlockedModules] = useState<number[]>([1])
  const [completedModules, setCompletedModules] = useState<number[]>([])
  const [loadingModules, setLoadingModules] = useState(true)
  const [showCompletionBilly, setShowCompletionBilly] = useState(false)
  const [firstModuleClicked, setFirstModuleClicked] = useState(false)
  const [showCourseComplete, setShowCourseComplete] = useState(false)
  
  // Debug: Log when completedModules changes
  React.useEffect(() => {
    console.log("🔄 completedModules state changed:", completedModules)
  }, [completedModules])
  
  // Check if Module 6 (course) is completed
  React.useEffect(() => {
    if (completedModules.includes(6)) {
      // Check if user has already seen the course completion celebration
      if (typeof window !== 'undefined') {
        const hasSeenCourseComplete = localStorage.getItem('courseCompleteCelebrationSeen')
        if (!hasSeenCourseComplete) {
          setShowCourseComplete(true)
          // Mark as seen so it never shows again
          localStorage.setItem('courseCompleteCelebrationSeen', 'true')
        }
      }
    }
  }, [completedModules])
  
  // Check if user is admin
  const ADMIN_EMAILS = ["diego@bizen.mx", "202207895@mondragonmexico.edu.mx"]
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email)
  
  // Debug: Log user email and admin status
  React.useEffect(() => {
    console.log("User email:", user?.email)
    console.log("Is admin:", isAdmin)
  }, [user?.email, isAdmin])

  // Fetch unlocked modules
  React.useEffect(() => {
    async function fetchUnlockedModules() {
      if (!user) {
        setLoadingModules(false)
        return
      }
      
      try {
        const res = await fetch("/api/modules/unlocked", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!res.ok) {
          if (res.status === 401) {
            // User not authenticated - redirect to login
            console.warn('User not authenticated, redirecting to login')
            window.location.href = '/login'
            return
          }
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const data = await res.json()
        
        if (data.success) {
          // Check if a new module was unlocked (for completion celebration)
          if (typeof window !== 'undefined') {
            const lastUnlocked = parseInt(localStorage.getItem('lastUnlockedModule') || '1', 10)
            const currentMaxUnlocked = Math.max(...data.unlockedModules)
            
            if (currentMaxUnlocked > lastUnlocked && lastUnlocked > 0) {
              // New module unlocked! Show Billy celebration
              setShowCompletionBilly(true)
              
              // Hide Billy after 10 seconds (longer so users can enjoy)
              setTimeout(() => {
                setShowCompletionBilly(false)
              }, 10000)
            }
            
            // Update stored value
            localStorage.setItem('lastUnlockedModule', String(currentMaxUnlocked))
          }
          
          setUnlockedModules(data.unlockedModules)
          
          // Also set completed modules
          if (data.completedModules) {
            setCompletedModules(data.completedModules)
            console.log("✅ Completed modules:", data.completedModules)
          }
        } else {
          console.warn("API returned success: false", data)
          // Set default unlocked modules on API error
          setUnlockedModules([1])
        }
      } catch (error) {
        console.error("Error fetching unlocked modules:", error)
        
        // If it's a 401 error, redirect to login
        if (error instanceof Error && error.message.includes('401')) {
          console.warn('Authentication error, redirecting to login')
          window.location.href = '/login'
          return
        }
        
        // Set default unlocked modules on error
        setUnlockedModules([1])
      } finally {
        setLoadingModules(false)
      }
    }
    
    // Only fetch if user is authenticated and not loading
    if (user && !loading) {
      fetchUnlockedModules()
    } else if (!user && !loading) {
      setLoadingModules(false)
    }
  }, [user, loading])

  const modules = [
    { n: 1, title: title1 || "Módulo 1", url: url1 },
    { n: 2, title: title2 || "Módulo 2", url: url2 },
    { n: 3, title: title3 || "Módulo 3", url: url3 },
    { n: 4, title: title4 || "Módulo 4", url: url4 },
    { n: 5, title: title5 || "Módulo 5", url: url5 },
    { n: 6, title: title6 || "Módulo 6", url: url6 },
  ]

  const target = openInNewTab ? "_blank" : "_self"
  const rel = openInNewTab ? "noopener noreferrer" : undefined

  const handleFirstModuleClick = () => {
    setFirstModuleClicked(true)
  }

  function MenuButton({ label, n, locked, isNext, isCompleted, onFirstModuleClick }: { label: string; n: number; locked: boolean; isNext?: boolean; isCompleted?: boolean; onFirstModuleClick?: () => void }) {
    const [isHovering, setIsHovering] = React.useState(false)
    
    // If completed, never show as "next" even if prop says so (extra safety)
    const actuallyIsNext = isNext && !isCompleted
    
    // Choose Billy image based on state
    const billyImage = locked ? "/2.png" : (isHovering || actuallyIsNext) ? "/3.png" : "/2.png"
    
    const handleClick = () => {
      // If this is the first module and user hasn't clicked it before, mark as clicked
      if (n === 1 && onFirstModuleClick && typeof window !== 'undefined') {
        const hasClickedBefore = localStorage.getItem('firstModuleClicked')
        if (!hasClickedBefore) {
          localStorage.setItem('firstModuleClicked', 'true')
          onFirstModuleClick()
        }
      }
    }
    
    return (
      <motion.div
        animate={actuallyIsNext && !locked ? {
          scale: [1, 1.03, 1],
          boxShadow: [
            "0 4px 12px rgba(0,0,0,.1), 0 8px 24px rgba(0,0,0,.08)",
            `0 8px 24px ${primaryColor}40, 0 12px 36px ${primaryColor}25`,
            "0 4px 12px rgba(0,0,0,.1), 0 8px 24px rgba(0,0,0,.08)",
          ]
        } : {}}
        transition={actuallyIsNext && !locked ? {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
        onMouseEnter={() => !locked && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleClick}
        whileHover={!locked ? { scale: 1.05 } : {}}
        whileTap={!locked ? { scale: 0.98 } : {}}
        style={{
          position: "relative" as const,
          display: "flex" as const,
          flexDirection: "column" as const,
          alignItems: "center" as const,
          justifyContent: "center" as const,
          gap: 8,
          width: "100%",
          minHeight: 200,
          aspectRatio: "1 / 1",
          backgroundColor: "#fff",
          color: textColor,
          borderRadius: 18,
          padding: "18px",
          fontWeight: 700,
          fontSize: 14,
          cursor: locked ? "not-allowed" : "pointer",
          userSelect: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,.1), 0 8px 24px rgba(0,0,0,.08)",
          outline: "none",
          border: `3px solid ${locked ? "#e5e7eb" : actuallyIsNext ? primaryColor : "#f1f5f9"}`,
          overflow: "hidden" as const,
          textAlign: "center" as const,
        }}
        role="button"
        aria-label={`${n}. ${label}${locked ? " (bloqueado)" : ""}`}
        aria-disabled={locked}
        tabIndex={locked ? -1 : 0}
        onKeyDown={(e) => {
          if (!locked && (e.key === "Enter" || e.key === " ")) {
            e.currentTarget.click()
          }
        }}
      >
        {/* Billy Character Image */}
        <div style={{ 
          position: "relative" as const,
          width: 120,
          height: 120,
          flex: 1,
          display: "flex" as const,
          alignItems: "center" as const,
          justifyContent: "center" as const,
        }}>
          <Image
            src={billyImage}
            alt="Billy"
            width={120}
            height={120}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: locked ? "grayscale(1) opacity(0.4)" : "none",
              transition: "filter 0.3s ease",
            }}
            priority
          />
          
          {/* Number Badge on Billy */}
          <div
            style={{
              position: "absolute" as const,
              top: -8,
              right: -8,
              minWidth: 38,
              height: 38,
              borderRadius: 999,
              background: locked ? "#9ca3af" : primaryColor,
              color: "#fff",
              fontSize: 18,
              lineHeight: "38px",
              textAlign: "center",
              fontWeight: 900,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              border: "3px solid white",
            }}
          >
            {n}
          </div>
          
          {/* Status icon overlay */}
          {isCompleted && (
            <div
              style={{
                position: "absolute" as const,
                bottom: -5,
                left: "50%",
                transform: "translateX(-50%)",
                width: 32,
                height: 32,
                borderRadius: 999,
                background: "#10b981",
                color: "white",
                fontSize: 18,
                lineHeight: "32px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(16, 185, 129, 0.4)",
                border: "2px solid white",
              }}
            >
              ✓
            </div>
          )}
        </div>
        
        {/* Module Title */}
        <div style={{ 
          fontSize: 14, 
          fontWeight: 800,
          lineHeight: 1.2,
          color: locked ? "#9ca3af" : textColor,
        }}>
          {label}
        </div>
        
        {/* Status indicator */}
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          {locked ? (
            <span>🔒</span>
          ) : actuallyIsNext ? (
            <span style={{ color: primaryColor, fontWeight: 600 }}>✨</span>
          ) : isCompleted ? (
            <span style={{ color: "#10b981", fontWeight: 600 }}>✓</span>
          ) : (
            <span>↗</span>
          )}
        </div>
      </motion.div>
    )
  }

  function Header() {
    return (
      <div
        style={{
          width: "100%",
          background: headerBg,
          color: headerText,
          borderRadius: radius,
          padding: "16px",
          display: "flex" as const,
          alignItems: "center" as const,
          gap: 12,
          boxSizing: "border-box" as const,
        }}
      >
        {logoSrc ? (
          <img
            src={logoSrc}
            alt="Logo"
            style={{
              width: 72,
              height: 72,
              borderRadius: 12,
              objectFit: "contain",
              backgroundColor: "#fff",
            }}
          />
        ) : null}
        <div style={{ display: "flex" as const, flexDirection: "column" }}>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 0.4, color: primaryColor }}>
            {brandName || "Microcredencial Mondragón"}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 13, opacity: 0.85 }}>{subtitle}</div>
          ) : null}
        </div>
      </div>
    )
  }

  function ModulesList() {
    if (loading || loadingModules) {
      return (
        <div style={{ textAlign: "center", padding: 40, color: textColor, opacity: 0.7 }}>
          Cargando módulos disponibles...
        </div>
      )
    }

    // Determine which is the "next" module to highlight (the first unlocked one that's not completed)
    const uncompletedUnlocked = unlockedModules.filter(num => !completedModules.includes(num))
    const nextModuleNumber = uncompletedUnlocked.length > 0 ? Math.min(...uncompletedUnlocked) : null
    
    console.log("📊 ModulesList render:", { unlockedModules, completedModules, uncompletedUnlocked, nextModuleNumber })
    
    return (
      <div style={{ 
        display: "flex" as const,
        gap: 40,
        justifyContent: "center" as const,
        maxWidth: 1400,
        margin: "0 auto",
        alignItems: "flex-start"
      }}>

        {/* Modules Grid */}
        <div style={{ 
          display: "grid" as const, 
          gridTemplateColumns: "repeat(3, minmax(220px, 260px))", // 3 columns: much bigger cards
          gap: 120,
          justifyContent: "center" as const,
          flex: 1
        }}>
          {modules.map(({ n, title, url }) => {
            const locked = !unlockedModules.includes(n)
            // Module is completed if it's in the completed modules list
            const isCompleted = completedModules.includes(n)
            // Only mark as "next" if it's not completed AND not locked
            const isNext = n === nextModuleNumber && !locked && !isCompleted
            
            const content = <MenuButton label={title} n={n} locked={locked} isNext={isNext} isCompleted={isCompleted} onFirstModuleClick={handleFirstModuleClick} />
            
            // If locked, render as disabled div
            if (locked) {
              return (
                <div key={n} style={{ pointerEvents: "none" }}>
                  {content}
                </div>
              )
            }
            
            // If unlocked, render as clickable link
            return url ? (
              <a key={n} href={url} target={target} rel={rel} style={{ textDecoration: "none" }}>
                {content}
              </a>
            ) : (
              <div key={n}>{content}</div>
            )
          })}
        </div>
      </div>
    )
  }

  function BillyModuleCompletionMessage({ primaryColor }: { primaryColor: string }) {
    const [currentFrame, setCurrentFrame] = useState(0)
    
    useEffect(() => {
      // Animate mouth opening/closing for 8 seconds (longer for users to read)
      const animationDuration = 8000
      const frameInterval = 200
      
      const intervalId = setInterval(() => {
        setCurrentFrame(prev => prev === 0 ? 1 : 0)
      }, frameInterval)
      
      // Stop animation after duration
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId)
        setCurrentFrame(0)
      }, animationDuration)
      
      return () => {
        clearInterval(intervalId)
        clearTimeout(timeoutId)
      }
    }, [])
    
    return (
      <>
        <style>{`
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3) translateY(-20px);
            }
            50% {
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @media (max-width: 768px) {
            .billy-module-completion-container {
              flex-direction: column-reverse !important;
              align-items: center !important;
            }
            .billy-module-completion-bubble {
              margin-right: 0 !important;
              margin-bottom: 20px !important;
              max-width: 90% !important;
            }
            .billy-module-completion-tail-outer,
            .billy-module-completion-tail-inner {
              display: none !important;
            }
          }
        `}</style>
        
        <div 
          className="billy-module-completion-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
            marginBottom: 20,
            position: "relative",
            animation: "bounceIn 0.8s ease-out",
          }}
        >
          {/* Speech Bubble - Celebration style */}
          <div 
            className="billy-module-completion-bubble"
            style={{
              position: "relative",
              background: "linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)",
              borderRadius: 20,
              padding: "20px 28px",
              boxShadow: "0 8px 24px rgba(251, 191, 36, 0.4)",
              border: "3px solid #f59e0b",
              maxWidth: 500,
              marginRight: 30,
            }}
          >
            {/* Comic-style tail pointing to Billy */}
            <div 
              className="billy-module-completion-tail-outer"
              style={{
                position: "absolute",
                right: -18,
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "15px solid transparent",
                borderBottom: "15px solid transparent",
                borderLeft: "20px solid #f59e0b",
              }} 
            />
            <div 
              className="billy-module-completion-tail-inner"
              style={{
                position: "absolute",
                right: -13,
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
                borderLeft: "17px solid #fbbf24",
              }} 
            />
            
            {/* Speech text */}
            <p style={{
              margin: 0,
              fontSize: 18,
              lineHeight: 1.5,
              color: "#78350f",
              fontWeight: 600,
            }}>
              🎉 ¡Bien hecho, Dragón! Es hora de pasar al siguiente módulo!
            </p>
          </div>
          
          {/* Billy Character */}
          <div style={{
            position: "relative",
            width: 150,
            height: 150,
            flexShrink: 0,
          }}>
            <Image
              src={currentFrame === 0 ? "/2.png" : "/3.png"}
              alt="Billy celebrating"
              width={150}
              height={150}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
              }}
              priority
            />
          </div>
        </div>
      </>
    )
  }

  function CourseCompleteCelebration({}: { primaryColor?: string }) {
    const [currentFrame, setCurrentFrame] = useState(0)
    const [showAnimation, setShowAnimation] = useState(true)
    
    useEffect(() => {
      // Auto-hide after 8 seconds
      const timeout = setTimeout(() => {
        setShowAnimation(false)
      }, 8000)
      
      return () => clearTimeout(timeout)
    }, [])
    
    useEffect(() => {
      // Animate mouth opening/closing
      const interval = setInterval(() => {
        setCurrentFrame(prev => prev === 0 ? 1 : 0)
      }, 300)
      
      return () => clearInterval(interval)
    }, [])
    
    if (!showAnimation) return null
    
    return (
      <>
        <style>{`
          @keyframes glitter {
            0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
          
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
          }
          
          @media (max-width: 768px) {
            .course-celebration-container {
              flex-direction: column-reverse !important;
              align-items: center !important;
            }
            .course-celebration-bubble {
              margin-right: 0 !important;
              margin-bottom: 20px !important;
              max-width: 90% !important;
            }
            .course-celebration-tail-outer,
            .course-celebration-tail-inner {
              display: none !important;
            }
          }
        `}</style>
        
        <div 
          className="course-celebration-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
            marginBottom: 20,
            position: "relative",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          {/* Glitter/Stars Background */}
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                fontSize: Math.random() * 20 + 15 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animation: `sparkle ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: Math.random() * 2 + "s",
              }}
            >
              ✨
            </span>
          ))}
          
          {/* Speech Bubble - Celebration style */}
          <div 
            className="course-celebration-bubble"
            style={{
              position: "relative",
              background: "linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)",
              borderRadius: 20,
              padding: "20px 28px",
              boxShadow: "0 8px 24px rgba(251, 191, 36, 0.4)",
              border: "3px solid #f59e0b",
              maxWidth: 500,
              marginRight: 30,
              zIndex: 2,
            }}
          >
            {/* Comic-style tail pointing to Billy */}
            <div 
              className="course-celebration-tail-outer"
              style={{
                position: "absolute",
                right: -18,
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "15px solid transparent",
                borderBottom: "15px solid transparent",
                borderLeft: "20px solid #f59e0b",
              }} 
            />
            <div 
              className="course-celebration-tail-inner"
              style={{
                position: "absolute",
                right: -13,
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
                borderLeft: "17px solid #fbbf24",
              }} 
            />
            
            {/* Speech text */}
            <p style={{
              margin: 0,
              fontSize: 18,
              lineHeight: 1.5,
              color: "#78350f",
              fontWeight: 600,
            }}>
              🎉 ¡FELICITACIONES! ¡Has completado todo el curso BIZEN! 🎓✨
            </p>
          </div>
          
          {/* Billy Character */}
          <div style={{
            position: "relative",
            width: 150,
            height: 150,
            flexShrink: 0,
          }}>
            <Image
              src={currentFrame === 0 ? "/2.png" : "/3.png"}
              alt="Billy celebrating"
              width={150}
              height={150}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
              }}
              priority
            />
            
            {/* Animated celebration badges */}
            <div style={{
              position: "absolute",
              top: -10,
              right: -10,
              animation: "sparkle 1s ease-in-out infinite",
            }}>
              🏆
            </div>
            <div style={{
              position: "absolute",
              bottom: -10,
              left: -10,
              animation: "sparkle 1.2s ease-in-out infinite",
              animationDelay: "0.3s",
            }}>
              ⭐
            </div>
          </div>
        </div>
      </>
    )
  }

  const cornerLogo = cornerLogoSrc || logoSrc

  function BillyWithSpeechBubble({ primaryColor }: { primaryColor: string }) {
    const [isVisible, setIsVisible] = useState(false)
    const [hasSeenWelcome, setHasSeenWelcome] = useState(false)
    
    useEffect(() => {
      // Check if user has seen the welcome message before
      if (typeof window !== 'undefined') {
        const hasSeenBefore = localStorage.getItem('modulesMenuWelcomeSeen')
        if (hasSeenBefore) {
          setHasSeenWelcome(true)
        } else {
          // Mark as seen after showing it
          localStorage.setItem('modulesMenuWelcomeSeen', 'true')
        }
      }
    }, [])
    
    useEffect(() => {
      // Only run animation if this is the first time seeing the welcome
      if (hasSeenWelcome) return
      
      // Fade in after a short delay
      const fadeInTimeout = setTimeout(() => {
        setIsVisible(true)
      }, 300)
      
      return () => {
        clearTimeout(fadeInTimeout)
      }
    }, [hasSeenWelcome])
    
    // Don't render if user has already seen the welcome message
    if (hasSeenWelcome) {
      return null
    }
    
    return (
      <>
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @media (max-width: 768px) {
            .billy-container {
              flex-direction: column-reverse !important;
              align-items: center !important;
            }
            .billy-bubble {
              margin-right: 0 !important;
              margin-bottom: 20px !important;
              max-width: 90% !important;
            }
            .billy-bubble-tail-outer,
            .billy-bubble-tail-inner {
              display: none !important;
            }
          }
        `}</style>
        
        <div 
          className="billy-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
            marginBottom: 20,
            position: "relative",
            opacity: isVisible ? 1 : 0,
            animation: isVisible ? "fadeInUp 0.6s ease-out" : "none",
          }}
        >
        {/* Speech Bubble */}
        <div 
          className="billy-bubble"
          style={{
            position: "relative",
            background: "#fff",
            borderRadius: 20,
            padding: "20px 28px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            border: `3px solid ${primaryColor}`,
            maxWidth: 500,
            marginRight: 30,
          }}
        >
          {/* Comic-style tail pointing to Billy */}
          <div 
            className="billy-bubble-tail-outer"
            style={{
              position: "absolute",
              right: -18,
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "15px solid transparent",
              borderBottom: "15px solid transparent",
              borderLeft: `20px solid ${primaryColor}`,
            }} 
          />
          <div 
            className="billy-bubble-tail-inner"
            style={{
              position: "absolute",
              right: -13,
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "12px solid transparent",
              borderBottom: "12px solid transparent",
              borderLeft: "17px solid #fff",
            }} 
          />
          
          {/* Speech text */}
          <p style={{
            margin: 0,
            fontSize: 18,
            lineHeight: 1.5,
            color: "#0f172a",
            fontWeight: 500,
          }}>
            ¡Bienvenido al menú de módulos, Dragón! 🎯 Inicia por el Módulo 1 y al completarlo se desbloqueará el siguiente módulo. Cada módulo contiene 3 secciones que debes completar en orden.
          </p>
        </div>
        
        {/* Billy Character */}
        <div style={{
          position: "relative",
          width: 150,
          height: 150,
          flexShrink: 0,
        }}>
          <Image
            src="/drago1.png"
            alt="Drago1"
            width={150}
            height={150}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
            }}
            priority
          />
        </div>
      </div>
      </>
    )
  }

  return (
    <section
      style={{
        position: "relative" as const,
        width: "100%",
        boxSizing: "border-box" as const,
        background: pageBg,
        fontFamily:
          "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
        minHeight: fullHeight ? "100vh" : undefined,
        display: "flex" as const,
      }}
    >
      {/* Botones esquina superior derecha */}
      <div style={{ position: "absolute" as const, top: 16, right: 16, display: "flex" as const, gap: 12, zIndex: 10 }}>
        <Link
          href="/"
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            background: "#fff",
            color: primaryColor,
            border: `2px solid ${primaryColor}`,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 700,
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)"
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)"
          }}
        >
          ← Regresar
        </Link>

        {/* Admin button - only visible to admins */}
        {isAdmin && (
          <Link
            href="/admin/quiz-results"
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              background: "#16a34a",
              color: "#fff",
              border: "2px solid #16a34a",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 700,
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)"
            }}
          >
            📊 Admin
          </Link>
        )}
        
        <button
          onClick={async () => {
            if (loggingOut) return
            setLoggingOut(true)
            try {
              await signOut()
              window.location.href = '/'
            } catch (error) {
              console.error('Logout error:', error)
              setLoggingOut(false)
            }
          }}
          disabled={loggingOut}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            background: loggingOut ? "#94a3b8" : primaryColor,
            color: "#fff",
            border: "none",
            fontSize: 14,
            fontWeight: 700,
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: loggingOut ? "not-allowed" : "pointer",
            opacity: loggingOut ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loggingOut) {
              e.currentTarget.style.transform = "scale(1.05)"
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)"
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)"
          }}
        >
          {loggingOut ? 'Cerrando...' : 'Cerrar sesión'}
        </button>
      </div>

      {/* Logo esquina superior izquierda */}
      {cornerLogo ? (
        cornerLogoHref ? (
          <a
            href={cornerLogoHref}
            style={{
              position: "absolute" as const,
              top: 12,
              left: 12,
              display: "inline-flex" as const,
              alignItems: "center" as const,
              gap: 8,
              textDecoration: "none",
            }}
            aria-label="Ir al inicio"
          >
            <img
              src={cornerLogo}
              alt="Logo esquina"
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                objectFit: "contain",
                boxShadow: "0 2px 8px rgba(0,0,0,.12)",
                background: "#fff",
              }}
            />
          </a>
        ) : (
          <div
            style={{
              position: "absolute" as const,
              top: 12,
              left: 12,
              display: "inline-flex" as const,
            }}
          >
            <img
              src={cornerLogo}
              alt="Logo esquina"
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                objectFit: "contain",
                boxShadow: "0 2px 8px rgba(0,0,0,.12)",
                background: "#fff",
              }}
            />
          </div>
        )
      ) : null}

      <div
        style={{
          width: "100%",
          margin: "0 auto",
          padding,
          boxSizing: "border-box" as const,
        }}
      >
        {layout === "Top" ? (
          <div style={{ display: "grid" as const, gridTemplateColumns: "1fr", gap }}>
            <Header />
            
            {/* Admin Dashboard Buttons - Visible to admins only */}
            {isAdmin && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gap: 16 }}>
                <Link
                  href="/admin/quiz-results"
                  style={{
                    display: "block",
                    padding: "16px 20px",
                    borderRadius: radius,
                    background: "linear-gradient(135deg, #0F62FE 0%, #0842A0 100%)",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 16,
                    fontWeight: 700,
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(15, 98, 254, 0.3)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(15, 98, 254, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(15, 98, 254, 0.3)"
                  }}
                >
                  📊 Quiz Diagnóstico
                </Link>
                
                <Link
                  href="/admin/module-quiz-results"
                  style={{
                    display: "block",
                    padding: "16px 20px",
                    borderRadius: radius,
                    background: "linear-gradient(135deg, #16a34a 0%, #059669 100%)",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 16,
                    fontWeight: 700,
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(22, 163, 74, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(22, 163, 74, 0.3)"
                  }}
                >
                  📚 Quizzes de Módulos (M1-M5)
                </Link>
                
                <Link
                  href="/admin/final-test-results"
                  style={{
                    display: "block",
                    padding: "16px 20px",
                    borderRadius: radius,
                    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 16,
                    fontWeight: 700,
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(245, 158, 11, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(245, 158, 11, 0.3)"
                  }}
                >
                  🎯 Resultados Test Final
                </Link>
                
                <Link
                  href="/admin/overall-results"
                  style={{
                    display: "block",
                    padding: "16px 20px",
                    borderRadius: radius,
                    background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 16,
                    fontWeight: 700,
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(124, 58, 237, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(124, 58, 237, 0.3)"
                  }}
                >
                  📊 Resultados Generales
                </Link>
                
                <Link
                  href="/admin/manage-users"
                  style={{
                    display: "block",
                    padding: "16px 20px",
                    borderRadius: radius,
                    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 16,
                    fontWeight: 700,
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(239, 68, 68, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.3)"
                  }}
                >
                  🗑️ Gestionar Usuarios
                </Link>
                
                <Link
                  href="/admin/files"
                  style={{
                    display: "block",
                    padding: "16px 20px",
                    borderRadius: radius,
                    background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 16,
                    fontWeight: 700,
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.3)"
                  }}
                >
                  📁 Archivos Módulo 6
                </Link>
              </div>
            )}
            
            <ModulesList />
            
            {/* Workbook Download Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <button
                onClick={() => {
                  // Create a temporary link element to trigger download
                  const link = document.createElement('a')
                  link.href = '/workbook.pdf'
                  link.download = 'Workbook - Guía de Aventura BIZEN.pdf'
                  link.target = '_blank'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
                style={{
                  padding: "16px 32px",
                  background: "linear-gradient(135deg, #0F62FE 0%, #10B981 50%, #8B5CF6 100%)",
                  backgroundSize: "200% 200%",
                  color: "#fff",
                  border: "none",
                  borderRadius: 16,
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(15, 98, 254, 0.3)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(15, 98, 254, 0.4)"
                  e.currentTarget.style.backgroundPosition = "100% 0"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)"
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 98, 254, 0.3)"
                  e.currentTarget.style.backgroundPosition = "0% 0"
                }}
              >
                <span style={{ fontSize: 24 }}>📚</span>
                <span>Descargar Workbook</span>
              </button>
            </motion.div>
            
            {/* Billy - Welcome message on first visit */}
            <BillyWithSpeechBubble primaryColor={primaryColor} />
            
            {/* Billy - Completion celebration when module unlocked */}
            {showCompletionBilly && (
              <BillyModuleCompletionMessage primaryColor={primaryColor} />
            )}
            
            {/* Course Completion Celebration - When Module 6 is completed */}
            {showCourseComplete && (
              <CourseCompleteCelebration primaryColor={primaryColor} />
            )}
          </div>
        ) : (
          <div
            style={{
              display: "grid" as const,
              gridTemplateColumns: `${sidebarWidth}px 1fr`,
              gap,
              alignItems: "start" as const,
            }}
          >
            <div style={{ position: "sticky" as const, top: 16 }}>
              <Header />
              <div style={{ height: 12 }} />
              <ModulesList />
            </div>
            <div
              style={{
                background: "#ffffff",
                borderRadius: radius,
                padding: 16,
                boxShadow: "0 1px 1px rgba(0,0,0,.04), 0 6px 20px rgba(0,0,0,.06)",
                minHeight: 200,
                color: "#0f172a",
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Contenido</div>
              <p style={{ margin: 0, opacity: 0.9 }}>
                En el layout &quot;Sidebar&quot;, el panel izquierdo queda fijo con los 6 módulos; aquí a la
                derecha puedes poner una intro, imagen o lo que necesites.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


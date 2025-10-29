/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { ModuleGate } from "@/components/ModuleGate"
import Image from "next/image"
import { motion } from "framer-motion"

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max))
}

type Props = {
  moduleNumber: number
  sectionsPerModule: number
  startUnlockedSection: number
  openInNewTab: boolean
  maxWidth: number
  padding: number
  gap: number
  radius: number
  pageBg: string
  textColor: string
  primaryColor: string
  btnBg: string
  btnBgHover: string
  header: string
  s1Title: string
  s1Url?: string
  s2Title: string
  s2Url?: string
  s3Title: string
  s3Url?: string
  showResetSection: boolean

  /* Marca */
  showBrandBar: boolean
  brandName: string
  brandLogoUrl?: string
  brandLogoWidth: number
  brandTextColor?: string

  /* API base para progreso */
  apiBase: string
  forceUnlockedThrough?: number
}

async function fetchProgress(apiBase: string, moduleNumber: number) {
  const r = await fetch(`${apiBase}/progress?moduleId=${encodeURIComponent(moduleNumber)}`, {
    credentials: "include",
  })
  if (!r.ok) throw new Error("No se pudo cargar el progreso")
  return r.json() as Promise<{
    moduleId: string | number
    sectionMax?: number
    completedSections?: number[]
  }>
}

async function resetProgress(apiBase: string, moduleNumber: number) {
  const r = await fetch(`${apiBase}/progress/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ moduleId: moduleNumber }),
  })
  if (!r.ok) throw new Error("No se pudo reiniciar el progreso")
  return r.json() as Promise<{
    moduleId: string | number
    sectionMax?: number
  }>
}

function ModuleSectionsGated({
  moduleNumber = 1,
  sectionsPerModule = 3,
  startUnlockedSection = 1,
  openInNewTab = false,
  maxWidth = 1200,
  padding = 20,
  gap = 18,                // 👈 BIGGER gap between sections (was 12)
  radius = 14,
  pageBg = "#f8fafc",
  textColor = "#0f172a",
  primaryColor = "#1e40af",
  btnBg = "#ffffff",
  btnBgHover = "#f3f4f6",
  header = "Secciones de este módulo",
  s1Title = "Sección 1",
  s1Url = "/modulo-1/section-1",
  s2Title = "Sección 2",
  s2Url = "/modulo-1/section-2",
  s3Title = "Sección 3",
  s3Url = "/modulo-1/section-3",
  showResetSection = true,

  showBrandBar = true,
  brandName = "BIZEN",
  brandLogoUrl = "/bizen-mondragonlogo.png",
  brandLogoWidth = 160,
  brandTextColor = "#0f172a",

  apiBase = "/api",
  forceUnlockedThrough,
}: Props) {
  const forcedMax = forceUnlockedThrough != null ? clamp(forceUnlockedThrough, 1, sectionsPerModule) : null
  const [sectionMax, setSectionMax] = React.useState<number>(forcedMax ?? startUnlockedSection)
  const [completedSections, setCompletedSections] = React.useState<number[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)
  const [showCompletionBilly, setShowCompletionBilly] = React.useState(false)
  const [previousSectionMax, setPreviousSectionMax] = React.useState(0)
  const [firstSectionClicked, setFirstSectionClicked] = React.useState(false)

  const loadProgress = React.useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchProgress(apiBase, moduleNumber)
      const maxFromApi = clamp(Number(data.sectionMax ?? startUnlockedSection), 1, sectionsPerModule)
      const finalMax = forcedMax != null ? Math.max(maxFromApi, forcedMax) : maxFromApi
      
      // Store completed sections array
      if (data.completedSections && Array.isArray(data.completedSections)) {
        console.log(`✅ Completed sections for M${moduleNumber}:`, data.completedSections)
        setCompletedSections(data.completedSections)
      } else {
        console.log(`⚠️ No completedSections data received for M${moduleNumber}`)
      }
      
      // Check if a new section was unlocked (for completion celebration)
      if (typeof window !== 'undefined') {
        const storageKey = `lastSectionMax_M${moduleNumber}`
        const lastMax = parseInt(localStorage.getItem(storageKey) || '0', 10)
        
        if (finalMax > lastMax && lastMax > 0) {
          // New section unlocked! Show Billy celebration
          setShowCompletionBilly(true)
          
          // Hide Billy after 5 seconds
          setTimeout(() => {
            setShowCompletionBilly(false)
          }, 5000)
        }
        
        // Update stored max
        localStorage.setItem(storageKey, String(finalMax))
      }
      
      setSectionMax(finalMax)
      setError(null)
    } catch (e: unknown) {
      setSectionMax(forcedMax ?? clamp(startUnlockedSection, 1, sectionsPerModule))
      // Silently use default progress - don't show error to user
      console.log("Using default progress:", startUnlockedSection)
      setError(null)
    } finally {
      setLoading(false)
    }
  }, [apiBase, moduleNumber, sectionsPerModule, startUnlockedSection, forcedMax])

  React.useEffect(() => {
    loadProgress()
  }, [loadProgress])

  React.useEffect(() => {
    const onFocus = () => loadProgress()
    window.addEventListener("focus", onFocus)
    return () => window.removeEventListener("focus", onFocus)
  }, [loadProgress])

  const sections = [
    { n: 1, title: s1Title || "Sección 1", url: s1Url },
    { n: 2, title: s2Title || "Sección 2", url: s2Url },
    { n: 3, title: s3Title || "Sección 3", url: s3Url },
  ].slice(0, sectionsPerModule)

  const handleFirstSectionClick = () => {
    setFirstSectionClicked(true)
  }

  function BillyWithSpeechBubble({ primaryColor }: { primaryColor: string }) {
    const [isVisible, setIsVisible] = React.useState(false)
    const [hasSeenWelcome, setHasSeenWelcome] = React.useState(false)
    
    React.useEffect(() => {
      // Check if user has seen the welcome message before for this module
      if (typeof window !== 'undefined') {
        const storageKey = `module${moduleNumber}SectionsWelcomeSeen`
        const hasSeenBefore = localStorage.getItem(storageKey)
        if (hasSeenBefore) {
          setHasSeenWelcome(true)
        } else {
          // Mark as seen after showing it
          localStorage.setItem(storageKey, 'true')
        }
      }
    }, [])
    
    React.useEffect(() => {
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
            .billy-sections-container {
              flex-direction: column-reverse !important;
              align-items: center !important;
            }
            .billy-sections-bubble {
              margin-right: 0 !important;
              margin-bottom: 20px !important;
              max-width: 90% !important;
            }
            .billy-sections-tail-outer,
            .billy-sections-tail-inner {
              display: none !important;
            }
          }
        `}</style>
        
        <div 
          className="billy-sections-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 24,
            marginBottom: 24,
            position: "relative",
            opacity: isVisible ? 1 : 0,
            animation: isVisible ? "fadeInUp 0.6s ease-out" : "none",
          }}
        >
          {/* Speech Bubble */}
          <div 
            className="billy-sections-bubble"
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
              className="billy-sections-tail-outer"
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
              className="billy-sections-tail-inner"
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
              ¡Bienvenido al Módulo 1, Dragón! 🎯 Completa cada sección en orden. Al terminar todas las secciones, se desbloqueará el Módulo 2.
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

  function BillyCompletionMessage({ primaryColor }: { primaryColor: string }) {
    const [isVisible, setIsVisible] = React.useState(false)
    
    React.useEffect(() => {
      // Fade in immediately
      setIsVisible(true)
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
            .billy-completion-container {
              flex-direction: column-reverse !important;
              align-items: center !important;
            }
            .billy-completion-bubble {
              margin-right: 0 !important;
              margin-bottom: 20px !important;
              max-width: 90% !important;
            }
            .billy-completion-tail-outer,
            .billy-completion-tail-inner {
              display: none !important;
            }
          }
        `}</style>
        
        <div 
          className="billy-completion-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 24,
            marginBottom: 24,
            position: "relative",
            animation: "bounceIn 0.8s ease-out",
          }}
        >
          {/* Speech Bubble - Celebration style */}
          <div 
            className="billy-completion-bubble"
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
              className="billy-completion-tail-outer"
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
              className="billy-completion-tail-inner"
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
              🎉 ¡Bien hecho, Dragón! Es hora de pasar a la siguiente sección!
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
              alt="Drago1 celebrating"
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

  function MenuButton({ label, n, locked, isNext, isCompleted, onFirstSectionClick }: { label: string; n: number; locked: boolean; isNext?: boolean; isCompleted?: boolean; onFirstSectionClick?: () => void }) {
    const [isHovering, setIsHovering] = React.useState(false)
    
    // Choose Billy image based on state
    const billyImage = locked ? "/2.png" : (isHovering || isNext) ? "/3.png" : "/2.png"
    
    const handleClick = () => {
      // If this is the first section and user hasn't clicked it before, mark as clicked
      if (n === 1 && onFirstSectionClick && typeof window !== 'undefined') {
        const hasClickedBefore = localStorage.getItem('firstSectionClicked')
        if (!hasClickedBefore) {
          localStorage.setItem('firstSectionClicked', 'true')
          onFirstSectionClick()
        }
      }
    }
    
    return (
      <motion.div
        animate={isNext && !locked ? {
          scale: [1, 1.03, 1],
          boxShadow: [
            "0 4px 12px rgba(0,0,0,.1), 0 8px 24px rgba(0,0,0,.08)",
            `0 8px 24px ${primaryColor}40, 0 12px 36px ${primaryColor}25`,
            "0 4px 12px rgba(0,0,0,.1), 0 8px 24px rgba(0,0,0,.08)",
          ]
        } : {}}
        transition={isNext && !locked ? {
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
          gap: 4,
          width: "100%",
          minHeight: 140,
          aspectRatio: "1 / 1",
          backgroundColor: "#fff",
          color: textColor,
          borderRadius: 12,
          padding: "12px",
          fontWeight: 700,
          fontSize: 14,
          cursor: locked ? "not-allowed" : "pointer",
          userSelect: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,.1), 0 8px 24px rgba(0,0,0,.08)",
          outline: "none",
          border: `2px solid ${locked ? "#e5e7eb" : isNext ? primaryColor : "#f1f5f9"}`,
          overflow: "hidden" as const,
          textAlign: "center" as const,
        }}
        role="button"
        aria-label={`${n}. ${label}${locked ? " (bloqueada)" : ""}${isCompleted ? " (completada)" : ""}`}
        aria-disabled={locked}
        tabIndex={locked ? -1 : 0}
      >
        {/* Billy Character Image */}
        <div style={{ 
          position: "relative" as const,
          width: 90,
          height: 90,
          flex: 1,
          display: "flex" as const,
          alignItems: "center" as const,
          justifyContent: "center" as const,
        }}>
          <Image
            src={billyImage}
            alt="Billy"
            width={90}
            height={90}
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
              top: -4,
              right: -4,
              minWidth: 28,
              height: 28,
              borderRadius: 999,
              background: locked ? "#9ca3af" : primaryColor,
              color: "#fff",
              fontSize: 14,
              lineHeight: "28px",
              textAlign: "center",
              fontWeight: 900,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              border: "2px solid white",
            }}
          >
            {n}
          </div>
          
          {/* Status icon overlay */}
          {isCompleted && (
            <div
              style={{
                position: "absolute" as const,
                bottom: -2,
                left: "50%",
                transform: "translateX(-50%)",
                width: 24,
                height: 24,
                borderRadius: 999,
                background: "#10b981",
                color: "white",
                fontSize: 14,
                lineHeight: "24px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(16, 185, 129, 0.4)",
                border: "2px solid white",
              }}
            >
              ✓
            </div>
          )}
        </div>
        
        {/* Section Title */}
        <div style={{ 
          fontSize: 15, 
          fontWeight: 800,
          lineHeight: 1.1,
          color: locked ? "#9ca3af" : textColor,
        }}>
          {label}
        </div>
        
        {/* Status indicator */}
        <div style={{ fontSize: 11, opacity: 0.7 }}>
          {locked ? (
            <span>🔒</span>
          ) : isNext ? (
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

  return (
    <section
      style={{
        width: "100%",
        background: pageBg,
        minHeight: "100vh",
        fontFamily:
          "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth,
          margin: "0 auto",
          padding,
          boxSizing: "border-box" as const,
        }}
      >
        {/* ---- Barra de marca ---- */}
        {showBrandBar && (
          <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 12, marginBottom: 12 }}>
            {brandLogoUrl ? (
              <img
                src={brandLogoUrl}
                alt={`${brandName || "Marca"} logo`}
                style={{ width: brandLogoWidth, height: "auto", display: "block" }}
              />
            ) : (
              <div
                aria-hidden
                title="Logo placeholder"
                style={{ width: 28, height: 28, borderRadius: 8, background: primaryColor }}
              />
            )}
            <strong
              style={{
                color: brandTextColor || textColor,
                letterSpacing: 0.2,
                fontWeight: 800,
                fontSize: 22,
              }}
            >
              {brandName}
            </strong>
          </div>
        )}

        {header && (
          <h3 style={{ marginTop: 0, marginBottom: 12, color: textColor, fontWeight: 800 }}>
            {header}
          </h3>
        )}

        {/* Estado de carga/errores */}
        {loading && (
          <div style={{ marginBottom: 12, color: textColor, opacity: 0.7, fontSize: 14 }}>
            Cargando progreso…
          </div>
        )}
        {error && (
          <div style={{ marginBottom: 12, color: "#b00020", fontSize: 14 }}>
            {error} — usando progreso inicial ({startUnlockedSection})
          </div>
        )}

        <div style={{ display: "grid" as const, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 220px))", gap: 36, justifyContent: "center" }}>
          {sections.map(({ n, title, url }) => {
            const locked = n > sectionMax
            // Check both the old logic AND the completedSections array
            const isCompleted = completedSections.includes(n) || n < sectionMax
            // isNext should ONLY be true if NOT completed
            const isNext = n === sectionMax && !locked && !isCompleted
            const content = <MenuButton label={title} n={n} locked={locked} isNext={isNext} isCompleted={isCompleted} onFirstSectionClick={handleFirstSectionClick} />
            return !locked && url ? (
              <a
                key={n}
                href={url}
                target={openInNewTab ? "_blank" : "_self"}
                rel={openInNewTab ? "noopener noreferrer" : undefined}
                style={{ textDecoration: "none" }}
              >
                {content}
              </a>
            ) : (
              <div key={n} style={{ pointerEvents: locked ? "none" : "auto" }}>
                {content}
              </div>
            )
          })}
        </div>

        {/* Billy - Welcome message on first visit (Module 1 only) */}
        {moduleNumber === 1 && (
          <BillyWithSpeechBubble primaryColor={primaryColor} />
        )}

        {/* Billy - Completion celebration (any module) */}
        {showCompletionBilly && (
          <BillyCompletionMessage primaryColor={primaryColor} />
        )}

        {/* Back to modules menu */}
        <div style={{ marginTop: 24 }}>
          <a
            href="/modules/menu"
            style={{
              display: "inline-block" as const,
              padding: "10px 16px",
              borderRadius: radius,
              background: btnBg,
              color: textColor,
              textDecoration: "none",
              fontWeight: 600,
              boxShadow: "0 1px 1px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06)",
            }}
          >
            ← Volver al menú de módulos
          </a>
        </div>
      </div>
    </section>
  )
}

export default function ModuleSectionsPage() {
  const params = useParams<{ moduleId: string }>()
  const moduleId = parseInt(params?.moduleId || "1", 10)

  // Configuration for each module
  const moduleConfigs: Record<number, {
    header: string
    s1Title: string
    s1Url: string
    s2Title: string
    s2Url: string
    s3Title: string
    s3Url: string
  }> = {
    1: {
      header: "Módulo 1 - Introducción al Marketing de Influencia",
      s1Title: "Panorama del marketing de influencia",
      s1Url: "/module/1/section/1/page/1",
      s2Title: "Tipos de influencers",
      s2Url: "/module/1/section/2/page/1",
      s3Title: "Tendencias en plataformas",
      s3Url: "/module/1/section/3/page/1",
    },
    2: {
      header: "Módulo 2 - Fundamentos",
      s1Title: "Sección 1",
      s1Url: "/module/2/section/1/page/1",
      s2Title: "Sección 2",
      s2Url: "/module/2/section/2/page/1",
      s3Title: "Sección 3",
      s3Url: "/module/2/section/3/page/1",
    },
    3: {
      header: "Módulo 3 - Plataformas",
      s1Title: "Sección 1",
      s1Url: "/module/3/section/1/page/1",
      s2Title: "Sección 2",
      s2Url: "/module/3/section/2/page/1",
      s3Title: "Sección 3",
      s3Url: "/module/3/section/3/page/1",
    },
    4: {
      header: "Módulo 4 - Estrategia",
      s1Title: "Sección 1",
      s1Url: "/module/4/section/1/page/1",
      s2Title: "Sección 2",
      s2Url: "/module/4/section/2/page/1",
      s3Title: "Sección 3",
      s3Url: "/module/4/section/3/page/1",
    },
    5: {
      header: "Módulo 5 - Producción",
      s1Title: "Sección 1",
      s1Url: "/module/5/section/1/page/1",
      s2Title: "Sección 2",
      s2Url: "/module/5/section/2/page/1",
      s3Title: "Sección 3",
      s3Url: "/module/5/section/3/page/1",
    },
    6: {
      header: "Módulo 6 - Evaluación Final",
      s1Title: "Sección 1",
      s1Url: "/module/6/section/1/page/1",
      s2Title: "",
      s2Url: "",
      s3Title: "",
      s3Url: "",
    },
  }

  const config = moduleConfigs[moduleId] || moduleConfigs[1]
  const sectionsPerModule = moduleId === 6 ? 1 : 3

  return (
    <ModuleGate moduleId={moduleId}>
      <ModuleSectionsGated
      moduleNumber={moduleId}
      sectionsPerModule={sectionsPerModule}
      startUnlockedSection={1}
      forceUnlockedThrough={undefined}
      openInNewTab={false}
      maxWidth={600}
      padding={20}
      gap={18}              // 👈 BIGGER gap
      radius={14}
      pageBg="#f8fafc"
      textColor="#0f172a"
      primaryColor="#0F62FE"
      btnBg="#ffffff"
      btnBgHover="#f3f4f6"
      header={config.header}
      s1Title={config.s1Title}
      s1Url={config.s1Url}
      s2Title={config.s2Title}
      s2Url={config.s2Url}
      s3Title={config.s3Title}
      s3Url={config.s3Url}
      showResetSection={true}
      showBrandBar={true}
      brandName="BIZEN"
      brandLogoUrl="/bizen-mondragonlogo.png"
      brandLogoWidth={160}
      brandTextColor="#0F62FE"
      apiBase="/api"
    />
    </ModuleGate>
  )
}

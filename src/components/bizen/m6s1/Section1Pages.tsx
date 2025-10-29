/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useMemo, useState, useEffect, useRef } from "react"
import { motion, Variants } from "framer-motion"
import SectionPageHeader from "@/components/bizen/SectionPageHeader"
import { useAuth } from "@/contexts/AuthContext"

type LayoutOption = "A" | "B"

const containerVar: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, ease: "easeOut" } },
}

const itemVar: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut" } },
}


/* ───────────────────────── Page 1 ───────────────────────── */

type Page1Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  title?: string
  moduleLabel?: string
  heroImage?: string
  layoutOption?: LayoutOption
  baseFontSize?: number
  progressPercent?: number
  videoFile?: string
  videoUrl?: string
  videoPoster?: string
  videoAutoplay?: boolean
  videoControls?: boolean
  videoLoop?: boolean
  videoMuted?: boolean
}

function Page1({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  title = "Proyecto Final: Tu Marca Personal en Acción",
  moduleLabel = "Guía para el Reto de 7 días",
  heroImage = "",
  layoutOption = "A",
  baseFontSize = 18,
  progressPercent = 0,
  videoFile = "",
  videoUrl = "https://www.youtube.com/embed/Alp3hD1NBj4",
  videoPoster = "",
  videoAutoplay = false,
  videoControls = true,
  videoLoop = false,
  videoMuted = true,
}: Page1Props) {
  const fs = Math.max(12, baseFontSize || 18)

  const wrapper: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      minHeight: "100vh",
      display: "flex" as const,
      flexDirection: "column" as const,
      justifyContent: "flex-start",
      background,
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs,
    }),
    [background, fs]
  )

  const container: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      maxWidth: "none",
      padding: "20px",
      boxSizing: "border-box" as const,
    }),
    []
  )

  const effectiveVideoSrc = (videoFile && videoFile.trim()) || (videoUrl && videoUrl.trim()) || ""
  const isYouTubeUrl = effectiveVideoSrc.includes('youtube.com') || effectiveVideoSrc.includes('youtu.be')

  return (
    <div style={wrapper}>
      <SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%" }}>
        <section>
          <div style={{ ...container }}>
            <motion.div 
              variants={containerVar} 
              initial="hidden" 
              animate="show"
            >
              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 24 }}
              >
              <motion.h1 
                style={{ 
                  margin: 0, 
                  fontSize: fs * 2.8, 
                  lineHeight: 1.15,
                  background: "linear-gradient(135deg, #0F62FE, #2563EB, #3B82F6, #60A5FA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "300% 300%",
                  textShadow: "0 6px 12px rgba(15, 98, 254, 0.3)",
                  filter: "drop-shadow(0 4px 8px rgba(15, 98, 254, 0.2))",
                  fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                  fontWeight: 800
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  y: [0, -8, 0]
                }}
                transition={{
                  backgroundPosition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                {title}
              </motion.h1>
              <motion.p 
                style={{ 
                  margin: "12px 0 0", 
                  opacity: 0.9, 
                  fontSize: fs * 1.4,
                  fontWeight: 600
                }}
                animate={{
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span style={{ 
                  color: primaryColor, 
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>▌</span> {moduleLabel}
              </motion.p>
            </motion.div>

            {heroImage ? (
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden" as const,
                  boxShadow: "0 18px 60px rgba(0,0,0,0.12)",
                  marginTop: 14,
                  marginBottom: 16,
                }}
              >
                <img src={heroImage} alt="Proyecto Final" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            ) : null}

            <motion.div 
              variants={itemVar} 
              style={{ marginBottom: 20 }}
            >
              <motion.div
                style={{
                  background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                  border: `2px solid ${primaryColor}20`,
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: `0 8px 32px ${primaryColor}15, 0 4px 16px rgba(0,0,0,0.05)`,
                  position: "relative" as const,
                  overflow: "hidden" as const
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 12px 40px ${primaryColor}25, 0 6px 20px rgba(0,0,0,0.08)`
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Decorative elements */}
                <div style={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  background: `radial-gradient(circle, ${primaryColor}15, transparent)`,
                  borderRadius: "50%"
                }} />
                <div style={{
                  position: "absolute",
                  bottom: -10,
                  left: -10,
                  width: 60,
                  height: 60,
                  background: `radial-gradient(circle, ${primaryColor}10, transparent)`,
                  borderRadius: "50%"
                }} />
                
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 16
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                      boxShadow: `0 4px 12px ${primaryColor}30`
                    }}>
                      <span style={{ color: "white", fontSize: fs * 1.2, fontWeight: 800 }}>🌟</span>
                    </div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.4, 
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                      Proyecto Final: Tu Marca Personal en Acción
                    </h3>
                  </div>
                  <p style={{ 
                    margin: 0, 
                    lineHeight: 1.6,
                    fontSize: fs * 1.05,
                    color: "#374151",
                    fontWeight: 500
                  }}>
                    <strong style={{ color: primaryColor }}>Objetivo:</strong> Crear y presentar la primera versión de tu <strong style={{ color: primaryColor }}>marca personal como influencer</strong>,
                  integrando los aprendizajes de los 5 módulos de la microcredencial. Al final, subirás un{" "}
                    <strong style={{ color: primaryColor }}>documento digital</strong> a la plataforma que evidencie tu proceso y resultados.
                </p>
            </div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVar} 
              style={{ marginBottom: 20 }}
            >
              <motion.div
                style={{
                  background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                  border: `2px solid ${primaryColor}20`,
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: `0 8px 32px ${primaryColor}15, 0 4px 16px rgba(0,0,0,0.05)`,
                  position: "relative" as const,
                  overflow: "hidden" as const
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 12px 40px ${primaryColor}25, 0 6px 20px rgba(0,0,0,0.08)`
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Decorative elements */}
                <div style={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  background: `radial-gradient(circle, ${primaryColor}15, transparent)`,
                  borderRadius: "50%"
                }} />
                <div style={{
                  position: "absolute",
                  bottom: -10,
                  left: -10,
                  width: 60,
                  height: 60,
                  background: `radial-gradient(circle, ${primaryColor}10, transparent)`,
                  borderRadius: "50%"
                }} />
                
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 16
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                      boxShadow: `0 4px 12px ${primaryColor}30`
                    }}>
                      <span style={{ color: "white", fontSize: fs * 1.2, fontWeight: 800 }}>📌</span>
                    </div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.4, 
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                      Actividad central: &quot;Reto de 7 días de creación de contenido&quot;
                </h3>
                  </div>
                  <p style={{ 
                    margin: 0, 
                    lineHeight: 1.6,
                    fontSize: fs * 1.05,
                    color: "#374151",
                    fontWeight: 500
                  }}>
                    Desarrolla tu propio <strong style={{ color: primaryColor }}>mini-lanzamiento digital</strong> durante 7 días, aplicando lo visto en clase y
                  documentando cada paso.
                </p>
            </div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVar} 
              style={{ marginBottom: 20 }}
            >
              <motion.div
                style={{
                  background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                  border: `2px solid ${primaryColor}20`,
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: `0 8px 32px ${primaryColor}15, 0 4px 16px rgba(0,0,0,0.05)`,
                  position: "relative" as const,
                  overflow: "hidden" as const
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Decorative elements */}
                <div style={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  background: `radial-gradient(circle, ${primaryColor}15, transparent)`,
                  borderRadius: "50%"
                }} />
                <div style={{
                  position: "absolute",
                  bottom: -10,
                  left: -10,
                  width: 60,
                  height: 60,
                  background: `radial-gradient(circle, ${primaryColor}10, transparent)`,
                  borderRadius: "50%"
                }} />
                
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 20
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                      boxShadow: `0 4px 12px ${primaryColor}30`
                    }}>
                      <span style={{ color: "white", fontSize: fs * 1.2, fontWeight: 800 }}>🎥</span>
                    </div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.4, 
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                      Video de orientación
                    </h3>
                  </div>

                {effectiveVideoSrc ? (
                    <div>
                    {isYouTubeUrl ? (
                      <iframe
                        src={effectiveVideoSrc}
                        title="Video de orientación"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          width: "60%",
                          maxWidth: "800px",
                          height: "auto",
                          aspectRatio: "16 / 9",
                          display: "block",
                          border: "none",
                          margin: "0 auto",
                        }}
                      />
                    ) : (
                      <video
                        src={effectiveVideoSrc}
                        poster={videoPoster}
                        autoPlay={videoAutoplay}
                        controls={videoControls}
                        loop={videoLoop}
                        muted={videoMuted}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    )}
                    </div>
                ) : (
                    <motion.div
                    style={{
                        border: `2px dashed ${primaryColor}40`,
                        borderRadius: 16,
                        padding: 32,
                        textAlign: "center" as const,
                        background: `linear-gradient(135deg, ${primaryColor}05, ${primaryColor}10)`,
                        color: "#6B7280",
                        fontSize: fs * 1.05,
                        fontWeight: 500
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      Si quieres, agrega un <strong style={{ color: primaryColor }}>video</strong> o deja esta sección vacía.
                    </motion.div>
                  )}
            </div>
              </motion.div>
            </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

/* ───────────────────────── Page 2 ───────────────────────── */

type Page2Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  heroImage?: string
  layoutOption?: LayoutOption
  baseFontSize?: number
  contentPieces?: string[]
  tipText?: string
  evidenceContent?: string[]
  growthIntro?: string
  growthBullets?: string[]
  growthEvidenceNote?: string
  growthTableGoals?: string[]
  growthTableActions?: string[]
}

function FlashCardReveal({
  title,
  children,
  primaryColor,
  fs,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  primaryColor: string
  fs: number
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(!!defaultOpen)
  const toggle = () => setOpen((v) => !v)
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 12px 40px ${primaryColor}25, 0 6px 20px rgba(0,0,0,0.08)`
      }}
      whileTap={{ scale: 0.98 }}
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={onKeyDown}
      aria-expanded={open}
      style={{
        borderRadius: 20,
        border: `2px solid ${primaryColor}20`,
        background: "linear-gradient(135deg, #ffffff, #f8fafc)",
        padding: 20,
        boxShadow: `0 8px 32px ${primaryColor}15, 0 4px 16px rgba(0,0,0,0.05)`,
        cursor: "pointer",
        position: "relative" as const,
        overflow: "hidden" as const,
      }}
    >
      {/* Decorative background elements */}
      <div style={{
        position: "absolute",
        top: -20,
        right: -20,
        width: 60,
        height: 60,
        background: `radial-gradient(circle, ${primaryColor}15, transparent)`,
        borderRadius: "50%"
      }} />
      <div style={{
        position: "absolute",
        bottom: -10,
        left: -10,
        width: 40,
        height: 40,
        background: `radial-gradient(circle, ${primaryColor}10, transparent)`,
        borderRadius: "50%"
      }} />
      
      <div style={{ 
        display: "flex" as const, 
        alignItems: "center" as const, 
        gap: 12, 
        marginBottom: 12,
        position: "relative" as const,
        zIndex: 2
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 4px 12px ${primaryColor}30`
        }}>
          <span style={{ color: "white", fontSize: fs * 0.8, fontWeight: 800 }}>
            {open ? "−" : "+"}
        </span>
        </div>
        <strong style={{ 
          fontSize: fs * 1.2, 
          lineHeight: 1.2,
          background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 800
        }}>
          {title}
        </strong>
      </div>

      <motion.div
        initial={false}
        animate={{
          maxHeight: open ? 800 : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut"
        }}
        style={{
          overflow: "hidden" as const,
          background: open ? `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}03)` : "transparent",
          borderRadius: 16,
          border: open ? `1px solid ${primaryColor}20` : "none",
          position: "relative" as const,
        }}
      >
          <div style={{
            padding: open ? 20 : 0,
            fontSize: fs * 1.0,
            lineHeight: 1.6,
            position: "relative" as const,
            zIndex: 2
          }}>
        {children}
      </div>
        </motion.div>
    </motion.div>
  )
}

function Page2({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 50,
  title = "Entrega: 3 piezas de contenido + plan de crecimiento",
  heroImage = "",
  layoutOption = "A",
  baseFontSize = 18,
  contentPieces = [
    "Video corto (Reel o TikTok) usando técnicas del Módulo 4.",
    "Imagen o carrusel que cuente una historia (Módulo 2).",
    "Post escrito con storytelling y llamado a la acción.",
  ],
  tipText = "No importa la calidad profesional, lo importante es la estrategia y coherencia.",
  evidenceContent = ["Capturas o links de las publicaciones.", "Descripción de por qué eligieron ese contenido."],
  growthIntro = "Con lo aprendido en el Módulo 5, crea una mini estrategia de crecimiento:",
  growthBullets = [
    "Meta a 1 mes (ej. conseguir 50 seguidores).",
    "Dos acciones concretas para lograrlo (colaboración con un amigo, 3 publicaciones por semana, etc.).",
  ],
  growthEvidenceNote = "Tabla sencilla con metas y acciones.",
  growthTableGoals = ["Conseguir 50 seguidores", "Incrementar 20% alcance"],
  growthTableActions = [
    "Colaboración con 1 amigo + 3 publicaciones/semana",
    "Usar 5 hashtags relevantes y comentar en 10 cuentas afines/día",
  ],
}: Page2Props) {
  const fs = Math.max(12, baseFontSize || 18)

  const wrapper: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      minHeight: "100vh",
      display: "flex" as const,
      flexDirection: "column" as const,
      justifyContent: "flex-start",
      background,
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs,
    }),
    [background, fs]
  )

  const container: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      maxWidth: "none",
      padding: "20px",
      boxSizing: "border-box" as const,
    }),
    []
  )

  const rowsCount = Math.max(growthTableGoals.length, growthTableActions.length)
  const rows = Array.from({ length: rowsCount }).map((_, i) => ({
    goal: growthTableGoals[i] || "",
    action: growthTableActions[i] || "",
  }))

  return (
    <div style={wrapper}>
      <SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%" }}>
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                style={{ 
                  margin: 0, 
                    fontSize: fs * 2.6, 
                  lineHeight: 1.15,
                    background: "linear-gradient(135deg, #0F62FE, #2563EB, #3B82F6, #60A5FA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "300% 300%",
                    textShadow: "0 6px 12px rgba(15, 98, 254, 0.3)",
                    filter: "drop-shadow(0 4px 8px rgba(15, 98, 254, 0.2))",
                  fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                  fontWeight: 800
                }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    y: [0, -8, 0]
                  }}
                  transition={{
                    backgroundPosition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
              >
                {title}
              </motion.h1>
              </motion.div>

              {heroImage ? (
                <motion.div
                  variants={itemVar}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden" as const,
                    boxShadow: "0 18px 60px rgba(0,0,0,0.12)",
                    marginTop: 14,
                    marginBottom: 16,
                  }}
                >
                  <img src={heroImage} alt="Sección" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              <motion.p variants={itemVar} style={{ margin: "0 0 10px 0", fontSize: fs * 0.95, opacity: 0.8 }}>
                <em>Dale click en cada paso para revelar las instrucciones.</em>
              </motion.p>

              <motion.div variants={itemVar} style={{ marginBottom: 14 }}>
                <FlashCardReveal title="1) Define tu identidad digital" primaryColor={primaryColor} fs={fs}>
                  <ul style={{ margin: 0, padding: "4px 0 0 18px" }}>
                    <li style={{ marginBottom: 6 }}>Elige un tema o nicho (p. ej., fitness, moda, gaming, cocina saludable, educación).</li>
                    <li style={{ marginBottom: 6 }}>Crea un perfil ficticio o real en Instagram, TikTok o YouTube.</li>
                    <li style={{ marginBottom: 6 }}>Diseña tu bio y define paleta de colores y estilo visual.</li>
                  </ul>
                </FlashCardReveal>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 14 }}>
                <FlashCardReveal title="2) Crea 3 piezas de contenido" primaryColor={primaryColor} fs={fs}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{
                      background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                      border: `2px solid ${primaryColor}20`,
                      borderRadius: 16,
                      padding: 20,
                      boxShadow: `0 8px 32px ${primaryColor}15, 0 4px 16px rgba(0,0,0,0.05)`,
                      position: "relative" as const,
                      overflow: "hidden" as const,
                    }}
                  >
                    {/* Decorative elements */}
                    <div style={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      width: 40,
                      height: 40,
                      background: `radial-gradient(circle, ${primaryColor}10, transparent)`,
                      borderRadius: "50%"
                    }} />
                    
                    <div style={{ position: "relative" as const, zIndex: 2 }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 16,
                        padding: "12px 16px",
                        background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`,
                        borderRadius: 12,
                        border: `1px solid ${primaryColor}20`
                      }}>
                        <span style={{ fontSize: fs * 1.2 }}>🎯</span>
                        <strong style={{ 
                          fontSize: fs * 1.1, 
                          color: primaryColor,
                          fontWeight: 700
                        }}>
                          Piezas de Contenido Requeridas
                        </strong>
                      </div>
                      
                      <ul style={{ margin: "0 0 12px 0", paddingLeft: 0, opacity: 0.95, fontSize: fs }}>
                      {contentPieces.map((b, i) => (
                          <motion.li 
                            key={i} 
                            style={{ 
                              marginBottom: 12,
                              padding: "12px 16px",
                              background: "rgba(255,255,255,0.7)",
                              borderRadius: 10,
                              border: `1px solid ${primaryColor}15`,
                              listStyle: "none",
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 12
                            }}
                            whileHover={{ 
                              scale: 1.02,
                              background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}03)`
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <div style={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: 2
                            }}>
                              <span style={{ color: "white", fontSize: fs * 0.7, fontWeight: 800 }}>
                                {i + 1}
                              </span>
                            </div>
                            <span style={{ lineHeight: 1.5 }}>{b}</span>
                          </motion.li>
                      ))}
                    </ul>
                    </div>
                  </motion.div>

                    <div
                      style={{
                        border: `1px solid ${primaryColor}33`,
                        background: `${primaryColor}0F`,
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 12,
                        fontSize: fs,
                      }}
                    >
                      <strong style={{ color: primaryColor }}>Tip:</strong> {tipText}
                    </div>

                    <div>
                      <strong style={{ display: "block" as const, marginBottom: 6, color: primaryColor, fontSize: fs * 1.05 }}>
                        Evidencia en el documento:
                      </strong>
                      <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95, fontSize: fs }}>
                        {evidenceContent.map((e, i) => (
                          <li key={i} style={{ marginBottom: 4 }}>
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                </FlashCardReveal>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <FlashCardReveal title="3) Plan de crecimiento básico" primaryColor={primaryColor} fs={fs}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{
                      background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                      border: `2px solid ${primaryColor}20`,
                      borderRadius: 16,
                      padding: 20,
                      boxShadow: `0 8px 32px ${primaryColor}15, 0 4px 16px rgba(0,0,0,0.05)`,
                      position: "relative" as const,
                      overflow: "hidden" as const,
                    }}
                  >
                    {/* Decorative elements */}
                    <div style={{
                      position: "absolute",
                      top: -10,
                      left: -10,
                      width: 50,
                      height: 50,
                      background: `radial-gradient(circle, ${primaryColor}08, transparent)`,
                      borderRadius: "50%"
                    }} />
                    
                    <div style={{ position: "relative" as const, zIndex: 2 }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 16,
                        padding: "12px 16px",
                        background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`,
                        borderRadius: 12,
                        border: `1px solid ${primaryColor}20`
                      }}>
                        <span style={{ fontSize: fs * 1.2 }}>📈</span>
                        <strong style={{ 
                          fontSize: fs * 1.1, 
                          color: primaryColor,
                          fontWeight: 700
                        }}>
                          Plan de Crecimiento
                        </strong>
                      </div>
                      
                      <p style={{ 
                        margin: "0 0 16px 0", 
                        opacity: 0.95, 
                        fontSize: fs,
                        padding: "12px 16px",
                        background: "rgba(255,255,255,0.7)",
                        borderRadius: 10,
                        border: `1px solid ${primaryColor}15`,
                        lineHeight: 1.6
                      }}>
                        {growthIntro}
                      </p>

                      <ul style={{ margin: "0 0 12px 0", paddingLeft: 0, opacity: 0.95, fontSize: fs }}>
                      {growthBullets.map((g, i) => (
                          <motion.li 
                            key={i} 
                            style={{ 
                              marginBottom: 12,
                              padding: "12px 16px",
                              background: "rgba(255,255,255,0.7)",
                              borderRadius: 10,
                              border: `1px solid ${primaryColor}15`,
                              listStyle: "none",
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 12
                            }}
                            whileHover={{ 
                              scale: 1.02,
                              background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}03)`
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <div style={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: 2
                            }}>
                              <span style={{ color: "white", fontSize: fs * 0.7, fontWeight: 800 }}>
                                {i + 1}
                              </span>
                            </div>
                            <span style={{ lineHeight: 1.5 }}>{g}</span>
                          </motion.li>
                      ))}
                    </ul>
                    </div>
                  </motion.div>

                    <div style={{ 
                      marginTop: 16, 
                      marginBottom: 16, 
                      fontSize: fs,
                      padding: "12px 16px",
                      background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}03)`,
                      borderRadius: 10,
                      border: `1px solid ${primaryColor}20`
                    }}>
                      <strong style={{ color: primaryColor, fontSize: fs * 1.05 }}>📋 Evidencia en el documento:</strong> 
                      <span style={{ marginLeft: 8, opacity: 0.9 }}>{growthEvidenceNote}</span>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      style={{
                        width: "100%",
                        overflowX: "auto",
                        background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                        border: `2px solid ${primaryColor}20`,
                        borderRadius: 16,
                        boxShadow: `0 8px 32px ${primaryColor}15, 0 4px 16px rgba(0,0,0,0.05)`,
                        position: "relative" as const,
                        overflow: "hidden" as const,
                      }}
                    >
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "separate",
                          borderSpacing: 0,
                          fontSize: fs * 0.95,
                        }}
                      >
                        <thead>
                          <tr style={{ 
                            background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`,
                            position: "relative" as const
                          }}>
                            <th
                              style={{
                                textAlign: "left",
                                padding: "16px 18px",
                                borderBottom: `2px solid ${primaryColor}30`,
                                color: primaryColor,
                                fontWeight: 700,
                                fontSize: fs * 1.05,
                                textTransform: "uppercase" as const,
                                letterSpacing: "0.5px"
                              }}
                            >
                              🎯 Meta (1 mes)
                            </th>
                            <th
                              style={{
                                textAlign: "left",
                                padding: "16px 18px",
                                borderBottom: `2px solid ${primaryColor}30`,
                                color: primaryColor,
                                fontWeight: 700,
                                fontSize: fs * 1.05,
                                textTransform: "uppercase" as const,
                                letterSpacing: "0.5px"
                              }}
                            >
                              ⚡ Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r, i) => (
                            <motion.tr 
                              key={i} 
                              style={{ 
                                background: i % 2 === 0 ? "rgba(255,255,255,0.8)" : `linear-gradient(135deg, ${primaryColor}03, ${primaryColor}01)`,
                                position: "relative" as const
                              }}
                              whileHover={{ 
                                background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}03)`,
                                scale: 1.01
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <td
                                style={{
                                  padding: "16px 18px",
                                  borderBottom: `1px solid ${primaryColor}15`,
                                  color: "#111",
                                  fontWeight: 500,
                                  fontSize: fs * 0.95,
                                  lineHeight: 1.4,
                                  verticalAlign: "top",
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                  <div style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    marginTop: 2
                                  }}>
                                    <span style={{ color: "white", fontSize: fs * 0.6, fontWeight: 800 }}>
                                      {i + 1}
                                    </span>
                                  </div>
                                {r.goal}
                                </div>
                              </td>
                              <td
                                style={{
                                  padding: "16px 18px",
                                  borderBottom: `1px solid ${primaryColor}15`,
                                  color: "#111",
                                  fontWeight: 500,
                                  fontSize: fs * 0.95,
                                  lineHeight: 1.4,
                                  verticalAlign: "top",
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                  <span style={{ fontSize: fs * 0.8, color: primaryColor, marginTop: 2 }}>✓</span>
                                {r.action}
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                          {rows.length === 0 ? (
                            <tr>
                              <td colSpan={2} style={{ padding: "12px 14px", opacity: 0.7 }}>
                                Agrega metas y acciones para generar la tabla.
                              </td>
                            </tr>
                          ) : null}
                        </tbody>
                      </table>
                    </motion.div>
                </FlashCardReveal>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

/* ───────────────────────── Page 3 ───────────────────────── */

type Page3Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  title?: string
  moduleLabel?: string
  syllabus?: string[]
  heroImage?: string
  layoutOption?: LayoutOption
  baseFontSize?: number
  progressPercent?: number
  mediaImage?: string
  videoUrl?: string
  videoPoster?: string
  acceptedTypes?: string
  maxFileSizeMB?: number
  showPreview?: boolean
  uploadEndpoint?: string
  uploadFieldName?: string
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
}

function UploadBox({
  primaryColor,
  fs,
  acceptedTypes,
  maxFileSizeMB,
  showPreview,
  uploadEndpoint,
  uploadFieldName,
  onUploadSuccess,
}: {
  primaryColor: string
  fs: number
  acceptedTypes: string
  maxFileSizeMB: number
  showPreview: boolean
  uploadEndpoint: string
  uploadFieldName: string
  onUploadSuccess?: () => void
}) {
  const { user } = useAuth()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [previewURL, setPreviewURL] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [notes, setNotes] = useState("")
  const [status, setStatus] = useState<"idle" | "ready" | "uploading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [serverResponse, setServerResponse] = useState<string | null>(null)
  
  // Get user info from auth context
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario'
  const userEmail = user?.email || ''

  const isImage = file?.type.startsWith("image/")
  const isPDF = file?.type === "application/pdf"

  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL)
    }
  }, [previewURL])

  const onPick = (f?: File) => {
    setErrorMsg(null)
    setServerResponse(null)
    setProgress(0)
    if (!f) {
      setFile(null)
      setPreviewURL(null)
      setStatus("idle")
      return
    }
    if (f.size > maxFileSizeMB * 1024 * 1024) {
      setErrorMsg(`El archivo supera ${maxFileSizeMB}MB.`)
      setFile(null)
      setPreviewURL(null)
      setStatus("idle")
      return
    }
    setFile(f)
    setStatus("ready")
    if (showPreview) {
      if (previewURL) URL.revokeObjectURL(previewURL)
      const url = URL.createObjectURL(f)
      setPreviewURL(url)
    }
  }

  const chooseFile = () => inputRef.current?.click()

  const upload = async () => {
    if (!file) return
    if (!uploadEndpoint) {
      setErrorMsg("Falta configurar 'uploadEndpoint' para enviar al servidor/BD.")
      return
    }

    try {
      setStatus("uploading")
      setErrorMsg(null)
      setServerResponse(null)
      setProgress(0)

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", uploadEndpoint, true)

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const pct = Math.round((e.loaded / e.total) * 100)
            setProgress(pct)
          }
        }
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              setStatus("success")
              setServerResponse(xhr.responseText || "Subido correctamente.")
              onUploadSuccess?.()
              resolve()
            } else {
              setStatus("error")
              setErrorMsg(`Error ${xhr.status}: ${xhr.statusText || "al subir el archivo"}`)
              reject(new Error(xhr.statusText))
            }
          }
        }

        const form = new FormData()
        form.append(uploadFieldName, file)
        form.append("title", title || "")
        form.append("notes", notes || "")
        form.append("userName", userName || "")
        form.append("userEmail", userEmail || "")

        xhr.send(form)
      })
    } catch {
      /* estado de error ya seteado */
    }
  }

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      style={{
        background: "linear-gradient(135deg, #ffffff, #f8fafc)",
        border: `2px solid ${primaryColor}20`,
        borderRadius: 20,
        padding: 24,
        boxShadow: `0 8px 32px ${primaryColor}15, 0 4px 16px rgba(0,0,0,0.05)`,
        position: "relative" as const,
        overflow: "hidden" as const,
        cursor: "pointer"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
    >
      {/* Decorative elements */}
      <div style={{
        position: "absolute",
        top: -20,
        right: -20,
        width: 60,
        height: 60,
        background: `radial-gradient(circle, ${primaryColor}15, transparent)`,
        borderRadius: "50%"
      }} />
      <div style={{
        position: "absolute",
        bottom: -10,
        left: -10,
        width: 40,
        height: 40,
        background: `radial-gradient(circle, ${primaryColor}10, transparent)`,
        borderRadius: "50%"
      }} />
      
      <div style={{ position: "relative" as const, zIndex: 2 }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          padding: "12px 16px",
          background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`,
          borderRadius: 12,
          border: `1px solid ${primaryColor}20`
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 12px ${primaryColor}30`
          }}>
            <span style={{ color: "white", fontSize: fs * 0.8, fontWeight: 800 }}>
              📎
            </span>
          </div>
          <h3 style={{ 
            margin: 0, 
            fontSize: fs * 1.3,
            background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 800
          }}>
            Adjunta tu archivo (PDF o imagen)
          </h3>
        </div>

        <p style={{ 
          margin: "0 0 16px 0", 
          opacity: 0.9, 
          fontSize: fs * 1.05,
          padding: "12px 16px",
          background: "rgba(255,255,255,0.7)",
          borderRadius: 10,
          border: `1px solid ${primaryColor}15`,
          lineHeight: 1.6
        }}>
          Se guardará en la base de datos. Tamaño máximo permitido: <strong style={{ color: primaryColor }}>{maxFileSizeMB}MB</strong>.
      </p>

        <div style={{ display: "grid" as const, gridTemplateColumns: "1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label 
              style={{ 
                fontSize: fs * 1.05,
                fontWeight: 600,
                color: primaryColor
              }}
            >
              <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: fs * 1.1 }}>👤</span>
                Tu nombre:
              </div>
              <input
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value)
                  localStorage.setItem('userName', e.target.value)
                }}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: `2px solid ${primaryColor}20`,
                  background: "rgba(255,255,255,0.8)",
                  fontSize: fs * 1.0,
                  transition: "all 0.2s ease"
                }}
                placeholder="Ej. Juan Pérez"
                required
              />
            </label>

            <label 
              style={{ 
                fontSize: fs * 1.05,
                fontWeight: 600,
                color: primaryColor
              }}
            >
              <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: fs * 1.1 }}>📧</span>
                Tu email:
              </div>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: `2px solid ${primaryColor}20`,
                  background: "rgba(255,255,255,0.8)",
                  fontSize: fs * 1.0,
                  transition: "all 0.2s ease"
                }}
                placeholder="Ej. juan@ejemplo.com"
                required
              />
            </label>
          </div>

          <label 
            style={{ 
              fontSize: fs * 1.05,
              fontWeight: 600,
              color: primaryColor
            }}
          >
            <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: fs * 1.1 }}>📝</span>
              Título (opcional):
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 12,
                border: `2px solid ${primaryColor}20`,
                background: "rgba(255,255,255,0.8)",
                fontSize: fs * 1.0,
                transition: "all 0.2s ease"
              }}
                placeholder="Ej. Evidencia final del Módulo 6"
            />
          </label>

          <label 
            style={{ 
              fontSize: fs * 1.05,
              fontWeight: 600,
              color: primaryColor
            }}
          >
            <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: fs * 1.1 }}>📄</span>
              Notas (opcional):
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 12,
                border: `2px solid ${primaryColor}20`,
                background: "rgba(255,255,255,0.8)",
                fontSize: fs * 1.0,
                resize: "vertical" as const,
                transition: "all 0.2s ease"
              }}
              placeholder="Descripción breve, links, etc."
            />
          </label>
        </div>

      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes}
        style={{ display: "none" }}
        onChange={(e) => onPick(e.target.files?.[0] || undefined)}
      />

        <div style={{ 
          display: "flex" as const, 
          gap: 12, 
          alignItems: "center" as const, 
          flexWrap: "wrap" as const,
          marginBottom: 16
        }}>
          <motion.button
          onClick={chooseFile}
            whileTap={{ scale: 0.95 }}
          style={{
              padding: "12px 20px",
              borderRadius: 12,
              border: `2px solid ${primaryColor}30`,
              background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`,
              color: primaryColor,
              fontWeight: 700,
            cursor: "pointer",
              fontSize: fs * 1.0,
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.2s ease"
          }}
        >
            <span style={{ fontSize: fs * 1.1 }}>📁</span>
          Elegir archivo
          </motion.button>

          <motion.button
          onClick={upload}
          disabled={!file || status === "uploading"}
            whileTap={!file || status === "uploading" ? {} : { scale: 0.95 }}
          style={{
              padding: "12px 20px",
              borderRadius: 12,
            border: "none",
              background: !file || status === "uploading" 
                ? `linear-gradient(135deg, #9CA3AF, #6B7280)` 
                : `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
            color: "#fff",
              fontWeight: 700,
            cursor: !file || status === "uploading" ? "not-allowed" : "pointer",
            opacity: !file || status === "uploading" ? 0.6 : 1,
              fontSize: fs * 1.0,
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.2s ease",
              boxShadow: !file || status === "uploading" 
                ? "none" 
                : `0 4px 12px ${primaryColor}30`
            }}
          >
            <span style={{ fontSize: fs * 1.1 }}>
              {status === "uploading" ? "⏳" : "⬆️"}
            </span>
          {status === "uploading" ? "Subiendo..." : "Subir"}
          </motion.button>

          <motion.div
            style={{
              padding: "8px 16px",
              borderRadius: 10,
              background: file 
                ? `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`
                : "rgba(0,0,0,0.05)",
              border: `1px solid ${file ? primaryColor + "20" : "rgba(0,0,0,0.1)"}`,
              fontSize: fs * 0.95,
              fontWeight: 500,
              color: file ? primaryColor : "#6B7280",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <span style={{ fontSize: fs * 1.0 }}>
              {file ? "📄" : "📋"}
            </span>
        {file ? (
              <span>
                <strong>{file.name}</strong> · {formatBytes(file.size)}
          </span>
          ) : (
              <span>No hay archivos seleccionados.</span>
        )}
          </motion.div>
      </div>

      {status === "uploading" ? (
          <motion.div 
            style={{ 
              marginTop: 16,
              padding: "16px",
              background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}03)`,
              borderRadius: 12,
              border: `1px solid ${primaryColor}20`
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 8, 
              marginBottom: 8,
              fontSize: fs * 1.0,
              fontWeight: 600,
              color: primaryColor
            }}>
              <span style={{ fontSize: fs * 1.2 }}>⏳</span>
              Subiendo archivo...
          </div>
            <div style={{ 
              width: "100%", 
              height: 12, 
              background: "rgba(255,255,255,0.8)", 
              borderRadius: 999, 
              overflow: "hidden",
              border: `1px solid ${primaryColor}20`
            }}>
              <motion.div 
                style={{ 
                  width: `${progress}%`, 
                  height: "100%", 
                  background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                  borderRadius: 999
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
        </div>
            <div style={{ 
              fontSize: fs * 0.9, 
              fontWeight: 600,
              color: primaryColor,
              marginTop: 8,
              textAlign: "center" as const
            }}>
              {progress}%
            </div>
          </motion.div>
      ) : null}

        {errorMsg ? (
          <motion.div 
            style={{ 
              marginTop: 16, 
              padding: "12px 16px",
              background: "linear-gradient(135deg, #FEE2E2, #FECACA)",
              border: "2px solid #F87171",
              borderRadius: 12,
              color: "#DC2626", 
              fontWeight: 700,
              fontSize: fs * 1.0,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span style={{ fontSize: fs * 1.2 }}>❌</span>
            {errorMsg}
          </motion.div>
        ) : null}
        
        {status === "success" ? (
          <motion.div 
            style={{ 
              marginTop: 16, 
              padding: "12px 16px",
              background: "linear-gradient(135deg, #D1FAE5, #A7F3D0)",
              border: "2px solid #34D399",
              borderRadius: 12,
              color: "#059669", 
              fontWeight: 700,
              fontSize: fs * 1.0,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span style={{ fontSize: fs * 1.2 }}>✅</span>
            Archivo subido correctamente.
          </motion.div>
        ) : null}
      {serverResponse && status === "success" ? (
        <pre
          style={{
            marginTop: 8,
            background: "#f6f7f9",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 8,
            padding: 10,
            maxHeight: 160,
            overflow: "auto" as const,
            fontSize: fs * 0.85,
          }}
        >
          {serverResponse}
        </pre>
      ) : null}

      {showPreview && file ? (
        <div style={{ marginTop: 14 }}>
          {isImage && previewURL ? (
            <img
              src={previewURL}
              alt="Vista previa"
              style={{
                width: "100%",
                maxHeight: 360,
                objectFit: "contain",
                borderRadius: 12,
                boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
              }}
            />
          ) : isPDF && previewURL ? (
            <iframe
              src={previewURL}
              title="Vista previa PDF"
              style={{
                width: "100%",
                height: 360,
                border: "none",
                borderRadius: 12,
                boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
              }}
            />
          ) : (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                border: "1px dashed rgba(0,0,0,0.18)",
                fontSize: fs * 0.9,
                opacity: 0.8,
              }}
            >
              Vista previa no disponible para este tipo de archivo.
            </div>
          )}
        </div>
      ) : null}
      </div>
    </motion.div>
  )
}

function Page3({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  title = "Parte final de la microcredencial",
  heroImage = "",
  layoutOption = "A",
  baseFontSize = 18,
  progressPercent = 100,
  mediaImage = "",
  videoUrl = "https://www.youtube.com/embed/ytUqPdQtlJY",
  videoPoster = "",
  acceptedTypes = ".pdf,.png,.jpg,.jpeg",
  maxFileSizeMB = 20,
  showPreview = true,
  uploadEndpoint = "/api/upload",
  uploadFieldName = "file",
}: Page3Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const [fileUploaded, setFileUploaded] = useState(false)

  // Block navigation when no file is uploaded
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!fileUploaded) {
        e.preventDefault()
        e.returnValue = 'Debes subir un archivo antes de salir de esta página.'
        return 'Debes subir un archivo antes de salir de esta página.'
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block common navigation keys when no file uploaded
      if (!fileUploaded && (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Escape')) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [fileUploaded])

  const wrapper: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      minHeight: "100vh",
      display: "flex" as const,
      flexDirection: "column" as const,
      justifyContent: "flex-start",
      background,
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs,
    }),
    [background, fs]
  )

  const container: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      maxWidth: "none",
      padding: 20,
      boxSizing: "border-box" as const,
    }),
    []
  )

  return (
    <div style={wrapper}>
      <SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%", position: "relative" as const }}>
        {/* Floating background elements */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden" as const,
          pointerEvents: "none" as const,
          zIndex: 0
        }}>
          <motion.div
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: 100,
              height: 100,
              background: `radial-gradient(circle, ${primaryColor}08, transparent)`,
              borderRadius: "50%"
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              top: "60%",
              right: "15%",
              width: 80,
              height: 80,
              background: `radial-gradient(circle, ${primaryColor}06, transparent)`,
              borderRadius: "50%"
            }}
            animate={{
              y: [0, 15, 0],
              x: [0, -10, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              top: "30%",
              right: "5%",
              width: 60,
              height: 60,
              background: `radial-gradient(circle, ${primaryColor}05, transparent)`,
              borderRadius: "50%"
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
        
        <section style={{ position: "relative" as const, zIndex: 1 }}>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">

              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                style={{ 
                  margin: 0, 
                    fontSize: fs * 2.8, 
                  lineHeight: 1.15,
                    background: "linear-gradient(135deg, #0F62FE, #2563EB, #3B82F6, #60A5FA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "300% 300%",
                    textShadow: "0 6px 12px rgba(15, 98, 254, 0.3)",
                    filter: "drop-shadow(0 4px 8px rgba(15, 98, 254, 0.2))",
                  fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                  fontWeight: 800
                }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    y: [0, -8, 0]
                  }}
                  transition={{
                    backgroundPosition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
              >
                {title}
              </motion.h1>
              </motion.div>

              {heroImage ? (
                <motion.div
                  variants={itemVar}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden" as const,
                    boxShadow: "0 18px 60px rgba(0,0,0,0.12)",
                    marginTop: 14,
                    marginBottom: 16,
                  }}
                >
                  <img src={heroImage} alt="Bienvenida" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                    border: `2px solid ${primaryColor}20`,
                    borderRadius: 20,
                    padding: 20,
                    boxShadow: `0 8px 32px ${primaryColor}15, 0 4px 16px rgba(0,0,0,0.05)`,
                    position: "relative" as const,
                    overflow: "hidden" as const,
                    cursor: "pointer"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Decorative elements */}
                  <motion.div 
                    style={{
                      position: "absolute",
                      top: -20,
                      right: -20,
                      width: 60,
                      height: 60,
                      background: `radial-gradient(circle, ${primaryColor}15, transparent)`,
                      borderRadius: "50%"
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    style={{
                      position: "absolute",
                      bottom: -10,
                      left: -10,
                      width: 40,
                      height: 40,
                      background: `radial-gradient(circle, ${primaryColor}10, transparent)`,
                      borderRadius: "50%"
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                  
                  <div style={{ position: "relative" as const, zIndex: 2 }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 16,
                      padding: "12px 16px",
                      background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`,
                      borderRadius: 12,
                      border: `1px solid ${primaryColor}20`
                    }}>
                      <span style={{ fontSize: fs * 1.2 }}>🎥</span>
                      <strong style={{ 
                        fontSize: fs * 1.1, 
                        color: primaryColor,
                        fontWeight: 700
                      }}>
                        Video de Bienvenida
                      </strong>
                    </div>
                    
                    <div>
                    {mediaImage ? (
                      <img src={mediaImage} alt="Imagen de bienvenida" style={{ width: "100%", height: "auto" }} />
                    ) : videoUrl ? (
                      videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                        <iframe
                          src={videoUrl}
                          title="Video de la sección"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{
                            width: "60%",
                            maxWidth: "800px",
                            height: "auto",
                            aspectRatio: "16 / 9",
                            display: "block",
                            border: "none",
                            margin: "0 auto",
                          }}
                        />
                      ) : (
                        <video src={videoUrl} poster={videoPoster} controls style={{ width: "100%", height: "auto", display: "block" }} />
                      )
                    ) : (
                        <motion.div
                        style={{
                            border: `2px dashed ${primaryColor}40`,
                            borderRadius: 16,
                            padding: 32,
                            textAlign: "center" as const,
                            background: `linear-gradient(135deg, ${primaryColor}05, ${primaryColor}10)`,
                            color: "#6B7280",
                            fontSize: fs * 1.05,
                            fontWeight: 500
                          }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          Si quieres, agrega un <strong style={{ color: primaryColor }}>video</strong> o deja esta sección vacía.
                        </motion.div>
                    )}
                  </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVar}>
                <motion.div
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                    border: `2px solid ${primaryColor}20`,
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: `0 8px 32px ${primaryColor}15, 0 4px 16px rgba(0,0,0,0.05)`,
                    position: "relative" as const,
                    overflow: "hidden" as const
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                  {/* Decorative elements */}
                  <div style={{
                    position: "absolute",
                    top: -20,
                    left: -20,
                    width: 50,
                    height: 50,
                    background: `radial-gradient(circle, ${primaryColor}08, transparent)`,
                    borderRadius: "50%"
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: -15,
                    right: -15,
                    width: 35,
                    height: 35,
                    background: `radial-gradient(circle, ${primaryColor}12, transparent)`,
                    borderRadius: "50%"
                  }} />
                  
                  <div style={{ position: "relative" as const, zIndex: 2 }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 16,
                      padding: "12px 16px",
                      background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`,
                      borderRadius: 12,
                      border: `1px solid ${primaryColor}20`
                    }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 4px 12px ${primaryColor}30`
                      }}>
                        <span style={{ color: "white", fontSize: fs * 0.8, fontWeight: 800 }}>
                          📝
                        </span>
                      </div>
                      <h3 style={{ 
                        margin: 0, 
                        fontSize: fs * 1.3,
                        background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: 800
                      }}>
                        Formato de entrega
                      </h3>
                  </div>

                    <p style={{ 
                      margin: "0 0 16px 0", 
                      opacity: 0.95, 
                      fontSize: fs * 1.05,
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.7)",
                      borderRadius: 10,
                      border: `1px solid ${primaryColor}15`,
                      lineHeight: 1.6
                    }}>
                      El documento debe subirse en formato PDF e incluir las siguientes secciones:
                  </p>

                    <div style={{ display: "grid" as const, gridTemplateColumns: "1fr", gap: 16, margin: "0 0 20px 0" }}>
                    {[
                      { 
                        text: "Portada: Incluye nombre, nicho y usuario de red social.",
                        color: "#3B82F6",
                        bgColor: "#EFF6FF",
                        borderColor: "#DBEAFE",
                        icon: "📋"
                      },
                      { 
                        text: "Identidad digital: Capturas de pantalla y descripción.",
                        color: "#10B981",
                        bgColor: "#ECFDF5",
                        borderColor: "#D1FAE5",
                        icon: "🖼️"
                      },
                      { 
                        text: "Contenido creado: Evidencias y justificación.",
                        color: "#F59E0B",
                        bgColor: "#FFFBEB",
                        borderColor: "#FEF3C7",
                        icon: "📊"
                      },
                      { 
                        text: "Mini estrategia de crecimiento: Tabla con metas y objetivos.",
                        color: "#8B5CF6",
                        bgColor: "#F3F4F6",
                        borderColor: "#E5E7EB",
                        icon: "📈"
                      },
                      { 
                        text: "Reflexión final: ¿Qué aprendiste durante el reto? ¿Qué harás diferente en el futuro?",
                        color: "#EF4444",
                        bgColor: "#FEF2F2",
                        borderColor: "#FECACA",
                        icon: "💭"
                      }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          padding: "20px 24px",
                          background: `linear-gradient(135deg, ${item.bgColor}, ${item.bgColor}CC)`,
                          borderRadius: 16,
                          border: `2px solid ${item.borderColor}`,
                          position: "relative" as const,
                          overflow: "hidden" as const,
                          transition: "all 0.3s ease"
                        }}
                        whileHover={{ 
                          scale: 1.03,
                          y: -2,
                          boxShadow: `0 8px 25px ${item.color}25`,
                          borderColor: item.color
                        }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                      >
                        <div style={{
                          position: "absolute" as const,
                          top: -10,
                          right: -10,
                          width: 60,
                          height: 60,
                          background: `radial-gradient(circle, ${item.color}15, transparent)`,
                          borderRadius: "50%",
                          opacity: 0.6
                        }} />
                        
                        <div style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: fs * 1.3,
                          boxShadow: `0 4px 16px ${item.color}30`,
                          position: "relative" as const,
                          zIndex: 2
                        }}>
                          {item.icon}
                        </div>
                        
                        <div style={{ flex: 1, position: "relative" as const, zIndex: 2 }}>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 8
                          }}>
                            <div style={{
                              width: 28,
                              height: 28,
                              borderRadius: 8,
                              background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: fs * 0.9,
                              fontWeight: 700,
                              color: "white",
                              boxShadow: `0 2px 8px ${item.color}30`
                            }}>
                              {idx + 1}
                            </div>
                            <span style={{
                              fontSize: fs * 1.1,
                              fontWeight: 600,
                              color: item.color,
                              textShadow: `0 1px 2px ${item.color}20`
                            }}>
                              Sección {idx + 1}
                            </span>
                          </div>
                          <span style={{
                            fontSize: fs * 1.0,
                            fontWeight: 500,
                            color: "#374151",
                            lineHeight: 1.5
                          }}>
                            {item.text}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                    style={{
                        marginTop: 20,
                        padding: "16px 20px",
                        background: `linear-gradient(135deg, #FEF3C7, #FDE68A)`,
                        borderRadius: 16,
                        border: `2px solid #F59E0B`,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        position: "relative" as const,
                        overflow: "hidden" as const
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                    >
                      <div style={{
                        position: "absolute" as const,
                        top: -15,
                        right: -15,
                        width: 50,
                        height: 50,
                        background: `radial-gradient(circle, #F59E0B20, transparent)`,
                        borderRadius: "50%",
                        opacity: 0.7
                      }} />
                      
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `linear-gradient(135deg, #F59E0B, #F59E0BCC)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: fs * 1.2,
                        boxShadow: `0 4px 12px #F59E0B30`,
                        position: "relative" as const,
                        zIndex: 2
                      }}>
                        💡
                  </div>
                      <div style={{ position: "relative" as const, zIndex: 2 }}>
                        <div style={{
                          fontSize: fs * 1.0,
                          fontWeight: 700,
                          color: "#92400E",
                          marginBottom: 4
                        }}>
                          Plantilla sugerida
                        </div>
                        <div style={{
                          fontSize: fs * 0.95,
                          fontWeight: 500,
                          color: "#A16207",
                          fontStyle: "italic" as const
                        }}>
                          Puedes usar una plantilla con espacios pre-diseñados.
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginTop: 16, marginBottom: 24 }}>
                <UploadBox
                  primaryColor={primaryColor}
                  fs={fs}
                  acceptedTypes={acceptedTypes}
                  maxFileSizeMB={maxFileSizeMB}
                  showPreview={showPreview}
                  uploadEndpoint={uploadEndpoint}
                  uploadFieldName={uploadFieldName}
                   onUploadSuccess={() => {
                     setFileUploaded(true);
                     // Emit custom event to notify parent component
                     window.dispatchEvent(new CustomEvent('fileUploaded'));
                     // The completion celebration will be shown by the parent component
                   }}
                />
              </motion.div>

              {/* Lock Warning Banner - shows when no file is uploaded */}
              {!fileUploaded && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{
                    background: `linear-gradient(135deg, #FEF2F2, #FEE2E2)`,
                    border: `2px solid #FCA5A5`,
                    borderRadius: 16,
                    padding: "20px 24px",
                    marginBottom: 24,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    position: "relative" as const,
                    overflow: "hidden" as const
                  }}
                >
                  <div style={{
                    position: "absolute" as const,
                    top: -10,
                    right: -10,
                    width: 40,
                    height: 40,
                    background: `radial-gradient(circle, #FCA5A520, transparent)`,
                    borderRadius: "50%",
                    opacity: 0.6
                  }} />
                  
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, #EF4444, #DC2626)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: fs * 1.5,
                    boxShadow: `0 4px 16px #EF444430`,
                    position: "relative" as const,
                    zIndex: 2
                  }}>
                    ⚠️
                  </div>
                  
                  <div style={{ flex: 1, position: "relative" as const, zIndex: 2 }}>
                    <h4 style={{
                      margin: "0 0 8px 0",
                      fontSize: fs * 1.2,
                      fontWeight: 700,
                      color: "#DC2626"
                    }}>
                      Archivo Requerido para Continuar
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: fs * 1.0,
                      lineHeight: 1.5,
                      color: "#7F1D1D"
                    }}>
                      Debes subir tu evidencia del <strong>Módulo 6</strong> antes de poder navegar a otras páginas.
                      <br />
                      <span style={{ fontSize: fs * 0.9, opacity: 0.8 }}>
                        Formatos aceptados: PDF, PNG, JPG o JPEG (máximo {maxFileSizeMB}MB).
                      </span>
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

/* ───────────────────────── Export ───────────────────────── */

const M6S1_CONTENT: Record<number, React.ReactNode> = {
  1: <Page1 />,
  2: <Page2 />,
  3: <Page3 />,
}

export default M6S1_CONTENT

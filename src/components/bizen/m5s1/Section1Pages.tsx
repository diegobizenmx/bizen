/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { motion, Variants } from "framer-motion"
import SectionPageHeader from "@/components/bizen/SectionPageHeader"
import MarketingFactsAnimation from "@/components/MarketingFactsAnimation"

type LayoutOption = "A" | "B"

const MAX_WIDTH = 1200

const containerVar: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, ease: "easeOut" } },
}

const itemVar: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut" } },
}

function Card({
  children,
  glow,
  borderColor = "rgba(0,0,0,0.08)",
}: {
  children: React.ReactNode
  glow?: string
  borderColor?: string
}) {
  return (
    <div
      style={{
        position: "relative" as const,
        borderRadius: 16,
        padding: 22,
        border: `1px solid ${borderColor}`,
        background: "linear-gradient(180deg, #fff, #ffffffcc)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        overflow: "hidden" as const,
      }}
    >
      {glow ? (
        <div
          style={{
            position: "absolute" as const,
            inset: -120,
            pointerEvents: "none",
            background: `radial-gradient(600px 300px at 20% 0%, ${glow}22, transparent 60%)`,
          }}
        />
      ) : null}
      {children}
    </div>
  )
}

type WelcomeProps = {
  brandName: string
  logoSrc: string
  primaryColor: string
  background: string
  title: string
  moduleLabel: string
  syllabus: string[]
  heroImage: string
  layoutOption: LayoutOption
  baseFontSize: number
  progressPercent: number
  mediaImage?: string
  videoFile?: string
  videoUrl?: string
  videoPoster?: string
  videoAutoplay?: boolean
  videoControls?: boolean
  videoLoop?: boolean
  videoMuted?: boolean
}

const DEFAULT_WELCOME_PROPS: WelcomeProps = {
  brandName: "BSMX",
  logoSrc: "",
  primaryColor: "#0F62FE",
  background: "#FFFFFF",
  title: "Bienvenidos a la microcredencial Brand Builders",
  moduleLabel: "Módulo 1",
  syllabus: [
    "Panorama actual del marketing de influencia.",
    "Tipos de influencers y microinfluencers.",
    "Tendencias en plataformas (Instagram, TikTok, YouTube, Twitch).",
  ],
  heroImage: "",
  layoutOption: "A",
  baseFontSize: 18,
  progressPercent: 0,
  mediaImage: "",
  videoFile: "",
  videoUrl: "",
  videoPoster: "",
  videoAutoplay: false,
  videoControls: true,
  videoLoop: false,
  videoMuted: true,
}

function BSMXWelcomeM1(p: Partial<WelcomeProps>) {
  const props = { ...DEFAULT_WELCOME_PROPS, ...p } as WelcomeProps

  const {
    brandName,
    logoSrc,
    primaryColor,
    background,
    title,
    moduleLabel,
    heroImage,
    syllabus,
    layoutOption,
    baseFontSize,
    progressPercent,
    mediaImage,
    videoFile,
    videoUrl,
    videoPoster,
    videoAutoplay,
    videoControls,
    videoLoop,
    videoMuted,
  } = props

  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects for the title
  React.useEffect(() => {
    const styleId = 'welcome-page-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-welcome {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float-title-welcome {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        .shimmer-title-welcome {
          background: linear-gradient(110deg, 
            #1e40af 0%, 
            #3b82f6 25%, 
            #60a5fa 50%, 
            #3b82f6 75%, 
            #1e40af 100%);
          background-size: 400% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #3b82f6 !important;
          animation: shimmer-title-welcome 2.5s linear infinite, float-title-welcome 3.5s ease-in-out infinite;
          display: inline-block;
          filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4));
        }
        @keyframes float-title-welcome {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const wrapper: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      background,
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs,
    }),
    [background, isA, fs]
  )

  const container: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      maxWidth: "none",
      padding: "20px",
      boxSizing: "border-box",
    }),
    [isA]
  )

  const breathing = {
    duration: 1.4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  }

  const effectiveImageSrc = mediaImage && mediaImage.trim()
  const effectiveVideoSrc =
    (videoFile && videoFile.trim()) || (videoUrl && videoUrl.trim()) || ""
  const safeSyllabus = Array.isArray(syllabus) ? syllabus : []

  return (
    <div style={wrapper}><SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%" }}>
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 12 }}>
                <motion.h1 
                  className="shimmer-title-welcome"
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {title}
                </motion.h1>
                <p style={{ margin: "6px 0 0", opacity: 0.9, fontSize: fs * 1.4 }}>
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {moduleLabel}
                </p>
              </motion.div>

              <motion.div variants={itemVar}>
                <div style={{
                  background: "linear-gradient(135deg, #fff, #f8faff)",
                  borderRadius: 20,
                  padding: "28px 24px",
                  border: `2px solid ${primaryColor}25`,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}>
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}80)`,
                  }} />
                  <div style={{
                    display: "flex" as const,
                    alignItems: "center" as const,
                    gap: 12,
                    marginBottom: 20,
                  }}>
                    <span style={{
                      background: primaryColor,
                      color: "white",
                      borderRadius: "50%",
                      width: 36,
                      height: 36,
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "center" as const,
                      fontSize: fs * 1.2,
                      fontWeight: 900,
                    }}>📚</span>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.6,
                      fontWeight: 800,
                      color: primaryColor,
                    }}>Temario</h3>
                  </div>
                  <div style={{
                    display: "grid" as const,
                    gridTemplateColumns: "1fr",
                    gap: 12,
                  }}>
                    {safeSyllabus.map((item, index) => (
                <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                  style={{
                          background: "white",
                          borderRadius: 12,
                          padding: "16px 20px",
                          border: `2px solid ${primaryColor}20`,
                          display: "flex" as const,
                          alignItems: "center" as const,
                          gap: 16,
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = primaryColor;
                          e.currentTarget.style.background = `${primaryColor}08`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = `${primaryColor}20`;
                          e.currentTarget.style.background = "white";
                        }}
                      >
                        <div style={{
                          background: primaryColor,
                          color: "white",
                          borderRadius: "50%",
                          width: 28,
                          height: 28,
                          display: "flex" as const,
                          alignItems: "center" as const,
                          justifyContent: "center" as const,
                          fontSize: fs * 0.9,
                          fontWeight: 900,
                          flexShrink: 0,
                        }}>
                          {index + 1}
                      </div>
                        <div style={{
                          fontSize: fs * 1.05,
                          lineHeight: 1.5,
                          color: "#333",
                          fontWeight: 500,
                        }}>
                          {item}
                  </div>
                        <div style={{
                          marginLeft: "auto",
                          color: primaryColor,
                          fontSize: fs * 1.2,
                          opacity: 0.7,
                        }}>
                          →
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {heroImage ? (
                <motion.div
                  variants={itemVar}
                    style={{
                    marginTop: 14,
                    marginBottom: 16,
                  }}
                >
                  <img src={heroImage} alt="Bienvenido" style={{ width: "60%", maxWidth: "600px", height: "auto", display: "block", margin: "0 auto" }} />
              </motion.div>
              ) : null}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

/* ───────────────────────── Page 1 ───────────────────────── */

type Page1Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  introText?: string
  bullets?: string[]
  keyIdea?: string
  awarenessItems?: string[]
  considerationItems?: string[]
  conversionItems?: string[]
  commonFormats?: string[]
  heroImage?: string
  layoutOption?: LayoutOption
  baseFontSize?: number
}

function Page1Card({
  children,
  glow,
  borderColor = "rgba(0,0,0,0.08)",
}: {
  children: React.ReactNode
  glow?: string
  borderColor?: string
}) {
  return (
    <div
      style={{
        position: "relative" as const,
        borderRadius: 16,
        padding: 20,
        border: `1px solid ${borderColor}`,
        background: "linear-gradient(180deg, #fff, #ffffffcc)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        overflow: "hidden" as const,
      }}
    >
      {glow ? (
        <div
          style={{
            position: "absolute" as const,
            inset: -120,
            pointerEvents: "none",
            background: `radial-gradient(600px 300px at 20% 0%, ${glow}22, transparent 60%)`,
          }}
        />
      ) : null}
      {children}
    </div>
  )
}

function AccordionItemPage1({
  title,
  children,
  primaryColor,
  defaultOpen = false,
  fontSize,
}: {
  title: string
  children: React.ReactNode
  primaryColor: string
  defaultOpen?: boolean
  fontSize: number
}) {
  const [open, setOpen] = useState(defaultOpen)
  const [hover, setHover] = useState(false)

  const bgHover = `${primaryColor}0D`
  const brHover = `${primaryColor}44`

  return (
    <div
      style={{
        border: `1px solid ${hover ? brHover : "rgba(0,0,0,0.08)"}`,
        borderRadius: 12,
        overflow: "hidden" as const,
        background: "#fff",
        transition: "border-color .2s ease, box-shadow .2s ease",
        boxShadow: hover ? "0 8px 24px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "14px 16px",
          background: hover ? bgHover : "transparent",
          border: 0,
          display: "flex" as const,
          alignItems: "center" as const,
          justifyContent: "space-between" as const,
          cursor: "pointer",
          fontWeight: 700,
          fontSize: fontSize * 1.05,
          transition: "background-color .18s ease",
        }}
        aria-expanded={open}
      >
        <span style={{ textDecoration: hover ? "underline" : "none", textUnderlineOffset: 3 }}>{title}</span>

        <motion.span
          style={{ color: primaryColor, fontWeight: 900, display: "inline-block" as const, lineHeight: 1 }}
          animate={{ rotate: open ? 90 : 0, scale: hover ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {open ? "–" : "+"}
        </motion.span>
      </motion.button>

      <div
        style={{
          maxHeight: open ? 600 : 0,
          opacity: open ? 1 : 0,
          transition:
            "max-height .25s ease, opacity .25s ease, padding .25s ease, background-color .18s ease",
          padding: open ? "0 16px 14px" : "0 16px 0",
          fontSize,
          background: open ? `${primaryColor}07` : "transparent",
        }}
      >
        {children}
      </div>
    </div>
  )
}

function WelcomePage() {
  return (
    <BSMXWelcomeM1
      brandName="BIZEN"
      logoSrc="/bizen-mondragonlogo.png"
      primaryColor="#0F62FE"
      background="#FFFFFF"
      title="Sección 1"
      moduleLabel="Módulo 5 · Sección 1"
      syllabus={[
        "Identidad de marca aplicada al networking.",
        "Mapa de relaciones y circuitos de valor.",
        "Mensajes, seguimiento y reputación."
      ]}
      layoutOption="B"
      baseFontSize={18}
      progressPercent={0}
      heroImage="/M5 cover.png"
    />
  )
}

function Page1({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 20,
  title = "",
  topicTitle = "Identidad de marca aplicada al networking",
  introText = "Tu marca personal es la suma de lo que haces, cómo lo cuentas y lo que otros dicen de ti. En networking, esa marca se traduce en señales claras que otros pueden recordar y repetir. Antes de escribirle a alguien o presentarte, define tres piezas clave.",
  bullets = [
    "Propuesta de valor (PPP): \"Ayudo a [persona] a lograr [resultado] mediante [método], con [prueba breve]\".",
    "Mensajes clave (3 anclas): qué haces (lenguaje simple), por qué importa (beneficio concreto) y una señal de credibilidad (caso, dato, logro, proyecto).",
    "Principio: networking no es pedir favores; es alinear tu identidad con necesidades reales y hacer fácil que el otro entienda para qué eres útil.",
  ],
  keyIdea = "Networking efectivo = claridad replicable: formula PPP + 3 anclas que otros pueden recordar y repetir.",
  awarenessItems = ["Persona objetivo", "Resultado/beneficio concreto", "Método (cómo lo haces)", "Prueba breve (caso, dato o proyecto)"],
  considerationItems = ["Qué haces en lenguaje simple", "Por qué importa (beneficio claro)", "Señal de credibilidad (caso/dato/logro)"],
  conversionItems = [
    "Ejemplo PPP: \"Ayudo a estudiantes de últimos semestres a conseguir entrevistas optimizando CV y portafolio (suben 30–50% su tasa de respuesta)\".",
    "Tip: usa números (%, tiempo, #) como evidencia.",
    "Varía persona/método sin perder claridad.",
  ],
  commonFormats = [
    "Alinear identidad con necesidades reales",
    "Facilitar que otros te recuerden y repitan",
    "Usar lenguaje simple y concreto",
    "Evitar pedir favores; ofrecer utilidad específica",
  ],
  heroImage = "",
  layoutOption = "A",
  baseFontSize = 18,
}: Page1Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm5s1-page1-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-m5s1p1 {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float-m5s1p1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        .shimmer-title-m5s1p1 {
          background: linear-gradient(110deg, 
            #1e40af 0%, 
            #3b82f6 25%, 
            #60a5fa 50%, 
            #3b82f6 75%, 
            #1e40af 100%);
          background-size: 400% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #3b82f6 !important;
          animation: shimmer-title-m5s1p1 2.5s linear infinite, float-m5s1p1 3.5s ease-in-out infinite;
          display: inline-block;
          filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4));
        }
        .floating-m5s1p1 {
          animation: float-m5s1p1 3.5s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

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
    [background, isA, fs]
  )

  const container: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      maxWidth: "none",
      padding: "20px",
      boxSizing: "border-box" as const,
    }),
    [isA]
  )

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  return (
    <div style={wrapper}><SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%" }}>
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 24, textAlign: "center" as const }}>
                <div style={{
                  background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`,
                  borderRadius: 24,
                  padding: "32px 24px",
                  border: `2px solid ${primaryColor}20`,
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}>
                  <div style={{
                    position: "absolute" as const,
                    top: -50,
                    right: -50,
                    width: 100,
                    height: 100,
                    background: `radial-gradient(circle, ${primaryColor}20, transparent)`,
                    borderRadius: "50%",
                  }} />
                  <div style={{
                    position: "absolute" as const,
                    bottom: -30,
                    left: -30,
                    width: 80,
                    height: 80,
                    background: `radial-gradient(circle, ${primaryColor}15, transparent)`,
                    borderRadius: "50%",
                  }} />
                  <motion.h1 
                    className="shimmer-title-m5s1p1 floating-m5s1p1"
                    style={{ 
                      margin: 0, 
                      fontSize: fs * 3.0, 
                      lineHeight: 1.1,
                      fontWeight: 900,
                      position: "relative" as const,
                      zIndex: 1,
                    }}
                  >
                    Identidad de marca aplicada al networking
                  </motion.h1>
                  <p style={{ 
                    margin: "12px 0 0", 
                    opacity: 0.85, 
                    fontSize: fs * 1.6,
                    fontWeight: 700,
                    color: primaryColor,
                    position: "relative" as const,
                    zIndex: 1,
                  }}>
                    <span style={{ 
                      color: primaryColor, 
                      fontWeight: 800,
                      fontSize: fs * 1.1,
                      marginRight: 8,
                    }}>▌</span> Estrategias para potenciar tu networking
                  </p>
                </div>
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
                  <img src={heroImage} alt="Sección 1" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <div style={{
                  background: "linear-gradient(135deg, #fff, #f8faff)",
                  borderRadius: 20,
                  padding: "28px 24px",
                  border: `2px solid ${primaryColor}25`,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}>
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}80)`,
                  }} />
                  <h3 style={{ 
                    margin: "0 0 16px 0", 
                    fontSize: fs * 1.5,
                    fontWeight: 800,
                    color: primaryColor,
                    display: "flex" as const,
                    alignItems: "center" as const,
                    gap: 12,
                  }}>
                    <span style={{
                      background: primaryColor,
                      color: "white",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "center" as const,
                      fontSize: fs * 1.1,
                      fontWeight: 900,
                    }}>?</span>
                    ¿Por qué importa?
                  </h3>
                  <p style={{ 
                    margin: 0, 
                    opacity: 0.9, 
                    fontSize: fs * 1.05,
                    lineHeight: 1.6,
                    color: "#333",
                  }}>{introText}</p>
                </div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <div style={{
                  background: "linear-gradient(135deg, #fff, #f8faff)",
                  borderRadius: 20,
                  padding: "28px 24px",
                  border: `2px solid ${primaryColor}25`,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}>
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}80)`,
                  }} />
                  <h3 style={{ 
                    margin: "0 0 20px 0", 
                    fontSize: fs * 1.5,
                    fontWeight: 800,
                    color: primaryColor,
                    display: "flex" as const,
                    alignItems: "center" as const,
                    gap: 12,
                  }}>
                    <span style={{
                      background: primaryColor,
                      color: "white",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "center" as const,
                      fontSize: fs * 1.1,
                      fontWeight: 900,
                    }}>🔑</span>
                    Piezas clave
                  </h3>
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: 0, 
                    opacity: 0.9, 
                    fontSize: fs * 1.05,
                    listStyle: "none" as const,
                  }}>
                    {bullets.map((b, i) => (
                      <li key={i} style={{ 
                        marginBottom: 16,
                        padding: "16px 20px",
                        background: `${primaryColor}08`,
                        borderRadius: 12,
                        border: `1px solid ${primaryColor}20`,
                        position: "relative" as const,
                        paddingLeft: 60,
                      }}>
                        <span style={{
                          position: "absolute" as const,
                          left: 20,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: primaryColor,
                          color: "white",
                          borderRadius: "50%",
                          width: 24,
                          height: 24,
                          display: "flex" as const,
                          alignItems: "center" as const,
                          justifyContent: "center" as const,
                          fontSize: fs * 0.8,
                          fontWeight: 900,
                        }}>
                          {i + 1}
                        </span>
                        <span style={{ lineHeight: 1.6, color: "#333" }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <div style={{
                  background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`,
                  border: `2px solid ${primaryColor}30`,
                  borderRadius: 20,
                  padding: "24px 28px",
                  position: "relative" as const,
                  overflow: "hidden" as const,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                }}>
                  <div style={{
                    position: "absolute" as const,
                    top: -20,
                    right: -20,
                    width: 60,
                    height: 60,
                    background: `radial-gradient(circle, ${primaryColor}20, transparent)`,
                    borderRadius: "50%",
                  }} />
                  <div style={{
                    position: "absolute" as const,
                    bottom: -15,
                    left: -15,
                    width: 40,
                    height: 40,
                    background: `radial-gradient(circle, ${primaryColor}15, transparent)`,
                    borderRadius: "50%",
                  }} />
                  <div style={{
                    display: "flex" as const,
                    alignItems: "center" as const,
                    gap: 12,
                    marginBottom: 12,
                  }}>
                    <span style={{
                      background: primaryColor,
                      color: "white",
                      borderRadius: "50%",
                      width: 36,
                      height: 36,
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "center" as const,
                      fontSize: fs * 1.2,
                      fontWeight: 900,
                    }}>💡</span>
                    <strong style={{ 
                      color: primaryColor, 
                      fontSize: fs * 1.2,
                      fontWeight: 800,
                    }}>
                    Idea clave
                  </strong>
                  </div>
                  <p style={{ 
                    margin: 0, 
                    opacity: 0.9, 
                    fontSize: fs * 1.1,
                    lineHeight: 1.6,
                    color: "#333",
                    fontWeight: 600,
                    position: "relative" as const,
                    zIndex: 1,
                  }}>{keyIdea}</p>
                </div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <div style={{
                  background: "linear-gradient(135deg, #fff, #f8faff)",
                  borderRadius: 20,
                  padding: "28px 24px",
                  border: `2px solid ${primaryColor}25`,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}>
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}80)`,
                  }} />
                  <h3 style={{ 
                    margin: "0 0 24px 0", 
                    fontSize: fs * 1.5,
                    fontWeight: 800,
                    color: primaryColor,
                    display: "flex" as const,
                    alignItems: "center" as const,
                    gap: 12,
                  }}>
                    <span style={{
                      background: primaryColor,
                      color: "white",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "center" as const,
                      fontSize: fs * 1.1,
                      fontWeight: 900,
                    }}>📚</span>
                    Glosario y reglas simples
                  </h3>
                  <div style={{ display: "grid" as const, gridTemplateColumns: "1fr", gap: 16 }}>
                    <AccordionItemPage1
                      title="Propuesta de valor (PPP)"
                      primaryColor={primaryColor}
                      fontSize={fs}
                      defaultOpen
                    >
                      <p style={{ margin: 0, opacity: 0.9, fontSize: fs * 1.05, lineHeight: 1.6 }}>
                        {awarenessItems.join(", ")}.
                      </p>
                    </AccordionItemPage1>

                    <AccordionItemPage1
                      title="Mensajes clave (3 anclas)"
                      primaryColor={primaryColor}
                      fontSize={fs}
                    >
                      <p style={{ margin: 0, opacity: 0.9, fontSize: fs * 1.05, lineHeight: 1.6 }}>
                        {considerationItems.join(", ")}.
                      </p>
                    </AccordionItemPage1>

                    <AccordionItemPage1
                      title="Ejemplos / variantes PPP"
                      primaryColor={primaryColor}
                      fontSize={fs}
                    >
                      <p style={{ margin: 0, opacity: 0.9, fontSize: fs * 1.05, lineHeight: 1.6 }}>
                        {conversionItems.join(", ")}.
                      </p>
                    </AccordionItemPage1>

                    <AccordionItemPage1
                      title="Principios de networking"
                      primaryColor={primaryColor}
                      fontSize={fs}
                    >
                      <p style={{ margin: 0, opacity: 0.9, fontSize: fs * 1.05, lineHeight: 1.6 }}>
                        {commonFormats.join(", ")}.
                      </p>
                    </AccordionItemPage1>
                  </div>
                </div>
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
}

function Page2Card({
  children,
  glow,
  borderColor = "rgba(0,0,0,0.08)",
}: {
  children: React.ReactNode
  glow?: string
  borderColor?: string
}) {
  return (
    <div
      style={{
        position: "relative" as const,
        borderRadius: 16,
        padding: 22,
        border: `1px solid ${borderColor}`,
        background: "linear-gradient(180deg, #fff, #ffffffcc)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        overflow: "hidden" as const,
      }}
    >
      {glow ? (
        <div
          style={{
            position: "absolute" as const,
            inset: -120,
            pointerEvents: "none",
            background: `radial-gradient(600px 300px at 20% 0%, ${glow}22, transparent 60%)`,
          }}
        />
      ) : null}
      {children}
    </div>
  )
}

function Page2Flashcard({
  front,
  back,
  primaryColor,
  fontSize,
}: {
  front: string
  back: string
  primaryColor: string
  fontSize: number
}) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      role="button"
      onClick={() => setFlipped((v) => !v)}
      whileHover={{ scale: 0.97 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{
        userSelect: "none",
        cursor: "pointer",
        borderRadius: 16,
        border: `1px solid ${primaryColor}33`,
        background: flipped ? `${primaryColor}0F` : "#fff",
        padding: 18,
        minWidth: 260,
        minHeight: 190,
        boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 12,
        willChange: "transform",
      }}
    >
      <strong
        style={{
          color: primaryColor,
          display: "block" as const,
          fontSize: fontSize * 1.1,
          lineHeight: 1.2,
        }}
      >
        {front}
      </strong>

      <p style={{ margin: 0, opacity: 0.95, fontSize, lineHeight: 1.5, flex: 1 }}>
        {flipped ? back : "Toca para ver"}
      </p>
    </motion.div>
  )
}

function Page2Chip({
  label,
  primaryColor,
  fs,
}: {
  label: string
  primaryColor: string
  fs: number
}) {
  return (
    <span
      style={{
        display: "inline-flex" as const,
        alignItems: "center" as const,
        gap: 6,
        padding: "8px 12px",
        borderRadius: 999,
        background: `${primaryColor}12`,
        color: primaryColor,
        fontSize: fs * 0.9,
        fontWeight: 600,
        border: `1px solid ${primaryColor}26`,
      }}
    >
      ● {label}
    </span>
  )
}

function Page2({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 40,
  title = "Tono, coherencia y prueba social",
  topicTitle = "Tono y estilo · Prueba social · Checklist · Keywords",
  heroImage = "",
  layoutOption = "B",
  baseFontSize = 18,
}: Page2Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"
  
  // Add shimmer and floating effects for the title
  React.useEffect(() => {
    const styleId = 'm5s1-page2-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-page2 {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-title-page2 {
          background: linear-gradient(110deg, 
            #1e40af 0%, 
            #3b82f6 25%, 
            #60a5fa 50%, 
            #3b82f6 75%, 
            #1e40af 100%);
          background-size: 400% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #3b82f6 !important;
          animation: shimmer-title-page2 2.5s linear infinite;
          display: inline-block;
          filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4));
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  // Interactive state for checklist
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "¿Mi frase de valor se entiende en 10–12 s?", checked: false },
    { id: 2, text: "¿Mis 3 mensajes ancla están alineados con lo que busco?", checked: false },
    { id: 3, text: "¿Mi bio y mi pitch suenan igual?", checked: false },
    { id: 4, text: "¿Tengo 1 prueba social lista?", checked: false },
  ])
  
  // Interactive state for keywords
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  
  // Interactive state for tone selection
  const [selectedTone, setSelectedTone] = useState<string | null>(null)
  
  const toggleChecklistItem = (id: number) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }
  
  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword) 
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    )
  }
  
  const selectTone = (tone: string) => {
    setSelectedTone(selectedTone === tone ? null : tone)
  }

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
    [background, isA, fs]
  )

  const container: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isA]
  )

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  const keywords = [
    "marca personal",
    "propuesta de valor",
    "Persona–Problema–Prueba",
    "mensajes ancla",
    "tono y estilo",
    "coherencia",
    "bio",
    "pitch",
    "prueba social",
    "credibilidad",
    "claridad",
    "recordación",
  ]

  return (
    <div style={wrapper}><SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main
        style={{
          width: "100%",
          display: "flex" as const,
          flexDirection: "column" as const,
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <section style={{ flex: 1, display: "block" }}>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 24, textAlign: "center" as const }}>
                <div style={{
                  background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`,
                  borderRadius: 24,
                  padding: "32px 24px",
                  border: `2px solid ${primaryColor}20`,
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}>
                  <div style={{
                    position: "absolute" as const,
                    top: -50,
                    right: -50,
                    width: 100,
                    height: 100,
                    background: `radial-gradient(circle, ${primaryColor}20, transparent)`,
                    borderRadius: "50%",
                  }} />
                  <div style={{
                    position: "absolute" as const,
                    bottom: -30,
                    left: -30,
                    width: 80,
                    height: 80,
                    background: `radial-gradient(circle, ${primaryColor}15, transparent)`,
                    borderRadius: "50%",
                  }} />
                  <h1 
                    className="shimmer-title-page2"
                    style={{ 
                      margin: 0, 
                      fontSize: fs * 3.2, 
                      lineHeight: 1.1,
                      fontWeight: 800,
                      position: "relative" as const,
                      zIndex: 1,
                    }}>{title}</h1>
                  <p style={{ 
                    margin: "12px 0 0", 
                    opacity: 0.85, 
                    fontSize: fs * 1.3,
                    fontWeight: 600,
                    color: "#333",
                    position: "relative" as const,
                    zIndex: 1,
                  }}>
                    <span style={{ 
                      color: primaryColor, 
                      fontWeight: 800,
                      fontSize: fs * 1.1,
                      marginRight: 8,
                    }}>▌</span> {topicTitle}
                  </p>
                </div>
              </motion.div>


              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <div style={{
                  background: "linear-gradient(135deg, #fff, #f8faff)",
                  borderRadius: 20,
                  padding: "28px 24px",
                  border: `2px solid ${primaryColor}25`,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}>
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}80)`,
                  }} />
                  <h3 style={{ 
                    margin: "0 0 16px 0", 
                    fontSize: fs * 1.5,
                    fontWeight: 800,
                    color: primaryColor,
                    display: "flex" as const,
                    alignItems: "center" as const,
                    gap: 12,
                  }}>
                    <span style={{
                      background: primaryColor,
                      color: "white",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "center" as const,
                      fontSize: fs * 1.1,
                      fontWeight: 900,
                    }}>🎭</span>
                    3) Tono y estilo
                  </h3>
                  <div style={{
                    background: `${primaryColor}08`,
                    borderRadius: 12,
                    padding: "16px 20px",
                    border: `1px solid ${primaryColor}20`,
                    marginBottom: 16,
                  }}>
                    <p style={{ 
                      margin: 0, 
                      lineHeight: 1.6,
                      fontSize: fs * 1.05,
                      color: "#333",
                    }}>
                      Coherente con tu identidad: <strong style={{ color: primaryColor }}>profesional cercano</strong>,{" "}
                      <strong style={{ color: primaryColor }}>técnico claro</strong> o <strong style={{ color: primaryColor }}>creativo directo</strong>. Debe verse
                      igual en tu <strong>bio</strong>, tu <strong>pitch</strong> y tus{" "}
                      <strong>mensajes</strong>. Si tu bio dice una cosa y tu correo otra,{" "}
                      <em style={{ color: "#e74c3c", fontWeight: 600 }}>tu marca se diluye</em>.
                    </p>
                  </div>
                  <div style={{
                    display: "grid" as const,
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 12,
                  }}>
                    {[
                      { label: "Profesional cercano", icon: "🤝", desc: "Cordial pero competente" },
                      { label: "Técnico claro", icon: "🔧", desc: "Preciso y directo" },
                      { label: "Creativo directo", icon: "💡", desc: "Innovador y conciso" }
                    ].map((style, i) => {
                      const isSelected = selectedTone === style.label
                      return (
                <motion.div
                          key={i}
                          onClick={() => selectTone(style.label)}
                  style={{
                            background: isSelected 
                              ? `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}15)`
                              : "white",
                            borderRadius: 16,
                            padding: "20px",
                            border: `3px solid ${isSelected ? primaryColor : `${primaryColor}25`}`,
                            textAlign: "center" as const,
                            cursor: "pointer",
                            position: "relative" as const,
                            boxShadow: isSelected 
                              ? `0 8px 24px ${primaryColor}30` 
                              : "0 4px 12px rgba(0,0,0,0.06)",
                            transition: "all 0.3s ease",
                          }}
                          whileHover={{ scale: 1.05, y: -4, boxShadow: isSelected ? `0 12px 32px ${primaryColor}40` : "0 8px 20px rgba(0,0,0,0.12)" }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSelected && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              style={{
                                position: "absolute",
                                top: -8,
                                right: -8,
                                background: `linear-gradient(135deg, ${primaryColor}, #3b82f6)`,
                                color: "white",
                                borderRadius: "50%",
                                width: 32,
                                height: 32,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: fs * 0.8,
                                fontWeight: "bold",
                                boxShadow: `0 4px 12px ${primaryColor}60`,
                              }}
                            >
                              ✓
                            </motion.div>
                          )}
                          <motion.div 
                            animate={isSelected ? { scale: 1.1 } : { scale: 1 }}
                            transition={{ duration: 0.2 }}
                            style={{ fontSize: "28px", marginBottom: 10 }}
                          >
                            {style.icon}
                          </motion.div>
                          <div style={{ 
                            fontWeight: 700, 
                            fontSize: fs * 1.05,
                            color: isSelected ? primaryColor : "#333", 
                            marginBottom: 6 
                          }}>{style.label}</div>
                          <div style={{ fontSize: fs * 0.85, color: "#666" }}>{style.desc}</div>
                </motion.div>
                      )
                    })}
                  </div>
                  {selectedTone && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ 
                        marginTop: 20, 
                        padding: "16px 20px", 
                        background: `linear-gradient(135deg, ${primaryColor}12, ${primaryColor}06)`, 
                        borderRadius: 12,
                        fontSize: fs * 0.95,
                        color: primaryColor,
                        textAlign: "center",
                        border: `2px solid ${primaryColor}30`,
                        fontWeight: 600,
                      }}
                    >
                      ✨ <strong>Tono seleccionado:</strong> {selectedTone}
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <Page2Card glow={primaryColor}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: fs * 1.35, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: fs * 1.5 }}>🎯</span>
                    Prueba social (breve y verificable)
                  </h3>
                  
                  <div style={{ display: "grid", gap: 16, marginBottom: 20 }}>
                    {/* Evidencia verificable */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      style={{
                        padding: "16px 20px",
                        background: "linear-gradient(135deg, rgba(15, 98, 254, 0.08), rgba(15, 98, 254, 0.04))",
                        borderRadius: 12,
                        border: "2px solid rgba(15, 98, 254, 0.2)"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "linear-gradient(135deg, #0F62FE, #60A5FA)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: fs * 1.1,
                          flexShrink: 0,
                          boxShadow: "0 4px 12px rgba(15, 98, 254, 0.3)"
                        }}>
                          ✓
                        </div>
                        <div style={{ flex: 1 }}>
                          <strong style={{ color: primaryColor, display: "block", marginBottom: 4, fontSize: fs * 1.05 }}>
                            Respaldos cortos y verificables:
                          </strong>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
                            <span style={{
                              padding: "4px 10px",
                              background: "rgba(15, 98, 254, 0.1)",
                              borderRadius: 6,
                              border: "1px solid rgba(15, 98, 254, 0.3)",
                              fontSize: fs * 0.9,
                              fontWeight: 600,
                              color: primaryColor
                            }}>
                              📝 mini-testimonios
                            </span>
                            <span style={{
                              padding: "4px 10px",
                              background: "rgba(15, 98, 254, 0.1)",
                              borderRadius: 6,
                              border: "1px solid rgba(15, 98, 254, 0.3)",
                              fontSize: fs * 0.9,
                              fontWeight: 600,
                              color: primaryColor
                            }}>
                              📊 métricas
                            </span>
                            <span style={{
                              padding: "4px 10px",
                              background: "rgba(15, 98, 254, 0.1)",
                              borderRadius: 6,
                              border: "1px solid rgba(15, 98, 254, 0.3)",
                              fontSize: fs * 0.9,
                              fontWeight: 600,
                              color: primaryColor
                            }}>
                              🔗 enlaces a muestras
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Evidencia real */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      style={{
                        padding: "16px 20px",
                        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.04))",
                        borderRadius: 12,
                        border: "2px solid rgba(16, 185, 129, 0.2)"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "linear-gradient(135deg, #10B981, #34D399)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: fs * 1.1,
                          flexShrink: 0,
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
                        }}>
                          💎
                        </div>
                        <div style={{ flex: 1 }}>
                          <strong style={{ color: "#10B981", display: "block", marginBottom: 4, fontSize: fs * 1.05 }}>
                            No necesitas grandes nombres
                          </strong>
                          <p style={{ margin: 0, lineHeight: 1.6, fontSize: fs * 0.95 }}>
                            Basta con <strong style={{ color: "#10B981" }}>evidencia real y específica</strong> que demuestre resultados concretos.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Ejemplos prácticos */}
                  <div style={{
                    marginTop: 20,
                    padding: "16px",
                    background: "linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(251, 191, 36, 0.04))",
                    borderRadius: 12,
                    border: "2px solid rgba(251, 191, 36, 0.25)"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: fs * 1.3 }}>💡</span>
                      <strong style={{ color: "#F59E0B", fontSize: fs * 1.05 }}>Ejemplos concretos:</strong>
                    </div>
                    <div style={{ display: "grid", gap: 10, fontSize: fs * 0.95 }}>
                      <div style={{ display: "flex", alignItems: "start", gap: 8 }}>
                        <span style={{ color: "#F59E0B", marginTop: 2 }}>→</span>
                        <span>&quot;Aumentamos ventas 25% en 3 meses&quot; (con gráfico enlace)</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "start", gap: 8 }}>
                        <span style={{ color: "#F59E0B", marginTop: 2 }}>→</span>
                        <span>&quot;Cliente X: &apos;Redujimos tiempo 40%&apos;&quot; (video 15s)</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "start", gap: 8 }}>
                        <span style={{ color: "#F59E0B", marginTop: 2 }}>→</span>
                        <span>&quot;10 proyectos entregados&quot; (link a portafolio)</span>
                      </div>
                    </div>
                  </div>
                </Page2Card>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <Page2Card glow={primaryColor}>
                  <h3 style={{ margin: "0 0 12px 0", fontSize: fs * 1.35 }}>
                    Checklist antes de contactar
                  </h3>
                  <div style={{ margin: 0, paddingLeft: 0, lineHeight: 1.55, fontSize: fs }}>
                    {checklistItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        onClick={() => toggleChecklistItem(item.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          padding: "14px 18px",
                          marginBottom: 10,
                          borderRadius: 14,
                          background: item.checked 
                            ? `linear-gradient(135deg, ${primaryColor}12, ${primaryColor}06)`
                            : "#f9fafb",
                          border: `2px solid ${item.checked ? primaryColor : "#e5e7eb"}`,
                          cursor: "pointer",
                          boxShadow: item.checked 
                            ? `0 4px 12px ${primaryColor}20`
                            : "0 2px 6px rgba(0,0,0,0.04)",
                        }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          animate={{ 
                            scale: item.checked ? 1 : 0.9,
                            backgroundColor: item.checked ? primaryColor : "#fff"
                          }}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            border: `2px solid ${item.checked ? primaryColor : "#d1d5db"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: fs * 0.9,
                            color: "white",
                            fontWeight: "bold",
                            boxShadow: item.checked ? `0 2px 8px ${primaryColor}40` : "0 1px 3px rgba(0,0,0,0.1)",
                          }}
                        >
                          {item.checked && "✓"}
                        </motion.div>
                        <span style={{ 
                          color: item.checked ? primaryColor : "#374151",
                          fontWeight: item.checked ? 600 : 500,
                          textDecoration: item.checked ? "line-through" : "none",
                          opacity: item.checked ? 0.7 : 1,
                        }}>
                          {item.text}
                        </span>
                      </motion.div>
                    ))}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ 
                        marginTop: 20, 
                        padding: "16px 20px", 
                        background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`, 
                        borderRadius: 12,
                        fontSize: fs * 0.95,
                        color: primaryColor,
                        textAlign: "center",
                        border: `2px solid ${primaryColor}25`,
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ fontSize: fs * 1.2, marginRight: 8 }}>
                        {checklistItems.filter(item => item.checked).length === checklistItems.length ? '🎉' : '📋'}
                      </span>
                      <strong>{checklistItems.filter(item => item.checked).length} de {checklistItems.length}</strong> completados
                    </motion.div>
                  </div>
                </Page2Card>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <Page2Card glow={primaryColor}>
                  <h3 style={{ margin: "0 0 12px 0", fontSize: fs * 1.35 }}>
                    Keywords (referencia rápida) - Toca para seleccionar
                  </h3>
                  <div style={{ display: "flex" as const, flexWrap: "wrap", gap: 10 }}>
                    {keywords.map((k) => {
                      const isSelected = selectedKeywords.includes(k)
                      return (
                        <motion.div
                          key={k}
                          onClick={() => toggleKeyword(k)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 16px",
                            borderRadius: 999,
                            background: isSelected 
                              ? `linear-gradient(135deg, ${primaryColor}, #3b82f6)`
                              : `${primaryColor}08`,
                            color: isSelected ? "white" : primaryColor,
                            fontSize: fs * 0.9,
                            fontWeight: 600,
                            border: `2px solid ${isSelected ? primaryColor : `${primaryColor}30`}`,
                            cursor: "pointer",
                            boxShadow: isSelected 
                              ? `0 4px 12px ${primaryColor}40`
                              : "0 2px 6px rgba(0,0,0,0.06)",
                          }}
                          whileHover={{ scale: 1.08, y: -2, boxShadow: isSelected ? `0 6px 16px ${primaryColor}50` : "0 4px 12px rgba(0,0,0,0.1)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isSelected && (
                            <span style={{ 
                              fontSize: fs * 0.8,
                              display: "inline-block",
                              animation: "spin 0.3s ease"
                            }}>✓</span>
                          )}
                          <span style={{ opacity: isSelected ? 1 : 0.7 }}>● {k}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                  {selectedKeywords.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ 
                        marginTop: 20, 
                        padding: "14px 18px", 
                        background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`, 
                        borderRadius: 10,
                        fontSize: fs * 0.9,
                        color: primaryColor,
                        border: `2px solid ${primaryColor}25`,
                        fontWeight: 600
                      }}
                    >
                      <strong>🎯 Seleccionados ({selectedKeywords.length}):</strong> {selectedKeywords.join(", ")}
                    </motion.div>
                  )}
                </Page2Card>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <Page2Card glow={primaryColor}>
                  <h3 style={{ margin: "0 0 18px 0", fontSize: fs * 1.35, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: fs * 1.5 }}>💬</span>
                    Q&amp;A rápido (toca para ver)
                  </h3>

                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: 18,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Page2Flashcard
                        front="¿Y si mi bio y mi pitch suenan distinto?"
                        back="Unifícalos: elige un tono (profesional cercano, técnico claro o creativo directo) y reescribe ambos para que digan lo mismo."
                        primaryColor={primaryColor}
                        fontSize={fs}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <Page2Flashcard
                        front="¿Necesito grandes nombres?"
                        back="No. Muestra evidencia real: mini-testimonios, métricas y enlaces a muestras verificables."
                        primaryColor={primaryColor}
                        fontSize={fs}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Page2Flashcard
                        front="¿Cuánto debe durar mi pitch?"
                        back="Idealmente 10-15 segundos: presenta quién eres, qué problemas resuelves y una prueba social breve."
                        primaryColor={primaryColor}
                        fontSize={fs}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <Page2Flashcard
                        front="¿Debo cambiar mi pitch según la audiencia?"
                        back="Sí, adapta el tono y ejemplos, pero mantén tu propuesta de valor central consistente para fortalecer tu marca."
                        primaryColor={primaryColor}
                        fontSize={fs}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Tip adicional */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      marginTop: 20,
                      padding: "14px 18px",
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.04))",
                      borderRadius: 12,
                      border: "2px solid rgba(16, 185, 129, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10
                    }}
                  >
                    <span style={{ fontSize: fs * 1.3, flexShrink: 0 }}>✨</span>
                    <span style={{ fontSize: fs * 0.95, color: "#10B981", fontWeight: 600 }}>
                      <strong>Tip:</strong> Practica tu pitch en voz alta y cronométrate. Si supera 20 segundos, acórtalo.
                    </span>
                  </motion.div>
                </Page2Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

/* ───────────────────────── Page 3 ───────────────────────── */

type TFKey = "V" | "F"

type TFQuestion = { statement: string; answer: TFKey }

// Shuffle function to randomize questions
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const TF_QUESTIONS: TFQuestion[] = shuffleArray([
  {
    statement:
      "El objetivo principal de la identidad de marca en networking es ser claro y memorable para habilitar conversaciones útiles.",
    answer: "V",
  },
  { statement: "Una propuesta de valor efectiva debe ser comprensible en 10–12 segundos y verificable.", answer: "V" },
  { statement: "El marco Persona–Problema–Prueba incluye persona, problema y evidencia.", answer: "V" },
  { statement: "La prueba social aumenta la credibilidad cuando aporta evidencia específica.", answer: "V" },
  { statement: "Los tres mensajes ancla deben ser breves, concretos y complementarios.", answer: "V" },
  { statement: "Si tu bio y tu pitch dicen cosas distintas, pierdes coherencia y recordación.", answer: "V" },
  { statement: "El tono correcto refleja tu identidad y se mantiene constante en el tiempo.", answer: "V" },
  { statement: "Un error común en la propuesta de valor es ser genérico y centrado en ti sin beneficio para el otro.", answer: "V" },
  { statement: "La evidencia válida muestra logros, casos o métricas reales.", answer: "V" },
  { statement: "Antes de contactar, conviene verificar que tu frase de valor, mensajes y bio estén alineados.", answer: "V" },
  { statement: "Para ser memorable, tus mensajes deben mantener un foco claro y repetible.", answer: "V" },
  { statement: "Un pitch eficaz en networking es breve, relevante y está respaldado por evidencia.", answer: "V" },
  { statement: "La prueba social que más ayuda es un caso con resultado concreto.", answer: "V" },
  { statement: "La frase \"Ayudo a juniors a obtener entrevistas con CVs medibles (+40% de respuestas)\" es concreta y verificable.", answer: "V" },
  { statement: "La identidad de marca aplicada al networking busca alinear lo que ofreces con necesidades reales.", answer: "V" },
  // Adding some false statements to create variety
  { statement: "Es mejor usar un tono diferente en cada plataforma para mantener la originalidad.", answer: "F" },
  { statement: "Los mensajes ancla deben ser largos y detallados para ser efectivos.", answer: "F" },
  { statement: "No es necesario tener evidencia específica para respaldar tu propuesta de valor.", answer: "F" },
  { statement: "El networking efectivo se basa principalmente en pedir favores a contactos.", answer: "F" },
  { statement: "Es mejor cambiar tu bio y pitch frecuentemente para mantener el interés.", answer: "F" },
  { statement: "La propuesta de valor debe enfocarse principalmente en tus logros personales.", answer: "F" },
  { statement: "No importa si tu identidad de marca es coherente en diferentes canales.", answer: "F" },
  { statement: "Es mejor usar jerga técnica para impresionar a tus contactos profesionales.", answer: "F" },
  { statement: "La prueba social solo es útil si proviene de personas muy famosas.", answer: "F" },
  { statement: "No es necesario definir una audiencia específica para tu propuesta de valor.", answer: "F" },
])

type Page3Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  layoutOption?: LayoutOption
  baseFontSize?: number
  heroImage?: string
  // Quiz tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: string | null, correctAnswer: string, isCorrect: boolean) => void
  onQuizComplete?: (score: number) => void
  isAlreadyCompleted?: boolean
  completedScore?: number
}

function Page3Card({
  children,
  glow,
  borderColor = "rgba(0,0,0,0.08)",
}: {
  children: React.ReactNode
  glow?: string
  borderColor?: string
}) {
  return (
    <div
      style={{
        position: "relative" as const,
        borderRadius: 16,
        padding: 22,
        border: `1px solid ${borderColor}`,
        background: "linear-gradient(180deg, #fff, #ffffffcc)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        overflow: "hidden" as const,
      }}
    >
      {glow ? (
        <div
          style={{
            position: "absolute" as const,
            inset: -120,
            pointerEvents: "none",
            background: `radial-gradient(600px 300px at 20% 0%, ${glow}22, transparent 60%)`,
          }}
        />
      ) : null}
      {children}
    </div>
  )
}

function Page3({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 60,
  title = "",
  topicTitle = "▌ Identidad de marca aplicada al networking — Quiz (V/F)",
  layoutOption = "B",
  baseFontSize = 18,
  heroImage = "",
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: Page3Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  const wrapper = useMemo(
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
    [background, isA, fs]
  )

  const container = useMemo(
    () => ({
      width: "100%",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isA]
  )

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  const total = TF_QUESTIONS.length
  const [idx, setIdx] = useState(0)
  const [selection, setSelection] = useState<(TFKey | null)[]>(Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(Array(total).fill(false))
  const [score, setScore] = useState(0)

  const q = TF_QUESTIONS[idx]
  const quizProgressPct = Math.round(((idx + 1) / total) * 100)
  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total

  const optStyle = (active: boolean): React.CSSProperties => ({
    padding: "24px 32px",
    borderRadius: 16,
    border: `3px solid ${active ? primaryColor : "rgba(0,0,0,0.12)"}`,
    background: active 
      ? `linear-gradient(135deg, ${primaryColor}, ${primaryColor}CC)` 
      : "linear-gradient(135deg, #fff, #f8faff)",
    fontWeight: 900,
    fontSize: fs * 1.3,
    letterSpacing: 0.5,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "center",
    boxShadow: active 
      ? "0 12px 32px rgba(0,0,0,0.15)" 
      : "0 4px 16px rgba(0,0,0,0.08)",
    transformOrigin: "center",
    color: active ? "white" : "#333",
    transition: "all 0.3s ease",
    minHeight: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })

  const handleSelectTF = (key: TFKey) => {
    if (checked[idx]) return

    const isCorrect = key === q.answer

    setSelection((prev) => {
      const next = [...prev]
      next[idx] = key
      return next
    })
    setChecked((prev) => {
      const next = [...prev]
      next[idx] = true
      return next
    })
    setCorrect((prev) => {
      const next = [...prev]
      next[idx] = isCorrect
      return next
    })
    
    const newScore = score + (isCorrect ? 1 : 0)
    if (isCorrect) setScore((s) => s + 1)

    // Track answer submission
    if (onAnswerSubmit) {
      console.log(`M5S1P3: Submitting answer ${idx}: ${key}, correct=${q.answer}, isCorrect=${isCorrect}`)
      onAnswerSubmit(idx, q.statement, key, q.answer, isCorrect)
    }

    if (idx < total - 1) {
      setTimeout(() => setIdx((i) => i + 1), 220)
    } else {
      // Last question - complete quiz after delay
      console.log("M5S1P3: Last question answered, completing quiz with score:", newScore)
      setTimeout(() => {
        if (onQuizComplete) {
          onQuizComplete(newScore)
        }
      }, 100)
    }
  }

  const feedback =
    checked[idx] && correct[idx] ? (
      <div style={{ color: "#0a7f35", fontWeight: 700 }}>✅ ¡Correcto!</div>
    ) : checked[idx] && !correct[idx] ? (
      <div style={{ color: "#b00020", fontWeight: 700 }}>
        ❌ Incorrecto. Era: <strong>{q.answer === "V" ? "Verdadero" : "Falso"}</strong>
      </div>
    ) : null

  // Show "Already Completed" screen if quiz was already taken
  if (isAlreadyCompleted) {
    return (
      <div style={wrapper}>
        <main style={{ width: "100%", display: "flex", flexDirection: "column", flex: 1, minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...container, textAlign: "center", paddingTop: 60, maxWidth: 600 }}>
            <div style={{ padding: 40, background: "#fff", borderRadius: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
              <h2 style={{ fontSize: fs * 2, fontWeight: 800, marginBottom: 16, color: primaryColor }}>
                Quiz Ya Completado
              </h2>
              <p style={{ fontSize: fs * 1.5, color: "#666", marginBottom: 24 }}>
                Ya completaste este quiz. Los quizzes solo pueden realizarse una vez.
              </p>
              <div style={{ padding: 20, background: `${primaryColor}10`, borderRadius: 12, marginBottom: 20 }}>
                <strong style={{ fontSize: fs * 1.5, color: primaryColor }}>
                  Tu puntuación: {completedScore ?? "?"} / {total}
                </strong>
              </div>
              <p style={{ fontSize: fs * 0.95, color: "#999" }}>
                ✨ Continúa con el siguiente contenido
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Custom facts for this networking quiz page
  const networkingFacts = [
    {
      character: 'billy' as const,
      text: 'El 85% de los empleos se consiguen a través de contactos y recomendaciones.',
      characterImage: '/2.png'
    },
    {
      character: 'drago' as const,
      text: 'Asistir a eventos profesionales puede aumentar tu red de contactos un 45%.',
      characterImage: '/drago1.png'
    },
    {
      character: 'billy' as const,
      text: 'Mantener contacto regular con tu red mejora tu visibilidad profesional un 60%.',
      characterImage: '/2.png'
    },
    {
      character: 'drago' as const,
      text: 'El 70% de las colaboraciones exitosas nace de una conexión previa.',
      characterImage: '/drago1.png'
    }
  ]

  return (
    <div style={wrapper}>{/* Marketing Facts Animation Overlay */}
      <MarketingFactsAnimation facts={networkingFacts} />
      
      <SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main
        style={{
          width: "100%",
          display: "flex" as const,
          flexDirection: "column" as const,
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <section style={{ flex: 1, display: "block" }}>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {/* Título + Tema */}
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.h1 
                      style={{
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {title}
                </motion.h1>
                <p style={{ margin: "8px 0 0", opacity: 0.9, fontSize: fs * 1.4, color: primaryColor, fontWeight: 700 }}>
                  {topicTitle}
                </p>
              </motion.div>

              <motion.div variants={itemVar}>
                <Page3Card glow={primaryColor}>
                  <div style={{ display: "flex" as const, alignItems: "center" as const, justifyContent: "space-between" as const, marginBottom: 14 }}>
                    <strong style={{ fontSize: fs * 1.1 }}>
                      Pregunta {idx + 1} / {total}
                    </strong>
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 10 }}>
                      <div style={{ width: 220, height: 12, background: "rgba(0,0,0,0.08)", borderRadius: 999, overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${quizProgressPct}%`,
                            height: "100%",
                            background: primaryColor,
                            borderRadius: 999,
                            transition: "width 220ms ease",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: fs * 0.95, opacity: 0.75 }}>{quizProgressPct}%</span>
                    </div>
                  </div>

                  <div style={{
                    background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}04)`,
                    borderRadius: 16,
                    padding: "24px 28px",
                    margin: "16px 0 24px",
                    border: `2px solid ${primaryColor}20`,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  }}>
                    <p style={{ 
                      margin: 0, 
                      lineHeight: 1.6, 
                      fontSize: fs * 1.2, 
                      fontWeight: 600,
                      color: "#333",
                      textAlign: "center"
                    }}>{q.statement}</p>
                  </div>

                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    {(["V", "F"] as TFKey[]).map((key) => {
                      const active = selection[idx] === key
                      const label = key === "V" ? "Verdadero" : "Falso"
                      return (
                        <motion.div
                          key={key}
                          role="button"
                          tabIndex={0}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 22 }}
                          onClick={() => handleSelectTF(key)}
                          style={optStyle(active)}
                        >
                          {label}
                        </motion.div>
                      )
                    })}
                  </div>

                  <div style={{ marginBottom: 4 }}>{feedback}</div>

                  {finished ? (
                    <div
                      style={{
                        marginTop: 18,
                        padding: 16,
                        border: `1px solid ${primaryColor}33`,
                        borderRadius: 12,
                        background: "#fff",
                        display: "flex" as const,
                        alignItems: "center" as const,
                        justifyContent: "space-between" as const,
                      }}
                    >
                      <strong>Resultado:</strong>
                      <span style={{ fontWeight: 800, color: primaryColor }}>
                        {score} / {total}
                      </span>
                    </div>
                  ) : null}
                </Page3Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

/* ───────────────────────── Page 4 ───────────────────────── */

type MCQuestion = { text: string; options: string[]; correctIndex: number }

const MC_QUESTIONS: MCQuestion[] = [
  {
    text: "El objetivo principal de la identidad de marca en networking es...",
    options: [
      "Vender de inmediato",
      "Ser claro y memorable para habilitar conversaciones útiles",
      "Hablar de todos tus logros",
      "Usar términos técnicos",
    ],
    correctIndex: 1,
  },
  {
    text: "Una propuesta de valor efectiva debe...",
    options: [
      "Ser larga y detallada",
      "Enfocarse solo en el método",
      "Ser comprensible en 10–12 s y verificable",
      "Evitar ejemplos",
    ],
    correctIndex: 2,
  },
  {
    text: "El marco Persona–Problema–Prueba incluye...",
    options: [
      "Público, proceso y presupuesto",
      "Persona, producto y precio",
      "Persona, problema y evidencia",
      "Problema, promesa y publicidad",
    ],
    correctIndex: 2,
  },
  {
    text: "La “prueba social” es útil porque...",
    options: [
      "Decora tu perfil",
      "Aumenta credibilidad con evidencia específica",
      "Evita que expliques tu trabajo",
      "Sustituye la propuesta de valor",
    ],
    correctIndex: 1,
  },
  {
    text: "Los tres mensajes ancla deben ser...",
    options: [
      "Amplios y poéticos",
      "Breves, concretos y complementarios",
      "Largos y técnicos",
      "Diferentes en cada canal",
    ],
    correctIndex: 1,
  },
  {
    text: "Si tu bio y tu pitch dicen cosas distintas, el efecto es...",
    options: [
      "Más originalidad",
      "Pérdida de coherencia y recordación",
      "Mejor posicionamiento",
      "Más alcance orgánico",
    ],
    correctIndex: 1,
  },
  {
    text: "El tono correcto es el que...",
    options: [
      "Suena sofisticado",
      "Imita a referentes famosos",
      "Refleja tu identidad y se mantiene constante",
      "Cambia cada semana",
    ],
    correctIndex: 2,
  },
  {
    text: "Un error común en la propuesta de valor es...",
    options: [
      "Incluir evidencia",
      "Usar verbos de acción",
      "Ser genérico y centrado en ti sin beneficio",
      "Mencionar resultados",
    ],
    correctIndex: 2,
  },
  {
    text: "La evidencia válida es aquella que...",
    options: [
      "Es difícil de comprobar",
      "Muestra logros, casos o métricas reales",
      "Es subjetiva",
      "Solo son opiniones",
    ],
    correctIndex: 1,
  },
  {
    text: "Antes de contactar, conviene verificar...",
    options: [
      "Si tienes muchos emojis",
      "Si tu frase de valor, mensajes y bio están alineados",
      "Si tu email es largo",
      "Si tu firma tiene 5 links",
    ],
    correctIndex: 1,
  },
  {
    text: "Para ser memorable, tus mensajes deben...",
    options: [
      "Cambiar en cada envío",
      "Mantener un foco claro y repetible",
      "Evitar números",
      "Ser abstractos",
    ],
    correctIndex: 1,
  },
  {
    text: "Un pitch eficaz en networking debe...",
    options: [
      "Usar jerga",
      "Ser breve, relevante y respaldado por prueba",
      "Omitir la propuesta de valor",
      "Ser humorístico siempre",
    ],
    correctIndex: 1,
  },
  {
    text: "La prueba social que más ayuda es...",
    options: ["Una opinión anónima", "Un caso con resultado concreto", "Un meme popular", "Un eslogan"],
    correctIndex: 1,
  },
  {
    text: "“Ayudo a juniors a obtener entrevistas con CVs medibles (+40% de respuestas)” es...",
    options: ["Vago", "Concreto y verificable", "Solo marketing", "Demasiado corto"],
    correctIndex: 1,
  },
  {
    text: "La identidad de marca aplicada al networking busca...",
    options: ["Pedir favores", "Ser el más famoso", "Alinear lo que ofreces con necesidades reales", "Vender cursos"],
    correctIndex: 2,
  },
]

type Page4Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  layoutOption?: LayoutOption
  baseFontSize?: number
  autoAdvanceDelayMs?: number
  // Quiz tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: number | null, correctAnswer: number, isCorrect: boolean) => void
  onQuizComplete?: (score: number) => void
  isAlreadyCompleted?: boolean
  completedScore?: number
}

function Page4Card({
  children,
  glow,
  borderColor = "rgba(0,0,0,0.08)",
}: {
  children: React.ReactNode
  glow?: string
  borderColor?: string
}) {
  return (
    <div
      style={{
        position: "relative" as const,
        borderRadius: 16,
        padding: 22,
        border: `1px solid ${borderColor}`,
        background: "linear-gradient(180deg, #fff, #ffffffcc)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        overflow: "hidden" as const,
      }}
    >
      {glow ? (
        <div
          style={{
            position: "absolute" as const,
            inset: -120,
            pointerEvents: "none",
            background: `radial-gradient(600px 300px at 20% 0%, ${glow}22, transparent 60%)`,
          }}
        />
      ) : null}
      {children}
    </div>
  )
}

function Page4({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 80,
  title = "Quiz: Identidad de marca y networking",
  topicTitle = "Marca personal • Propuesta de valor • Persona–Problema–Prueba • Mensajes ancla • Prueba social",
  layoutOption = "B",
  baseFontSize = 18,
  autoAdvanceDelayMs = 650,
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: Page4Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects for title
  React.useEffect(() => {
    const styleId = 'm5s1-page4-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer-glow {
          0%, 100% { 
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(15, 98, 254, 0.3));
          }
          50% { 
            opacity: 1;
            filter: drop-shadow(0 0 25px rgba(15, 98, 254, 0.6));
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(-0.5deg); }
          50% { transform: translateY(-15px) rotate(0deg); }
          75% { transform: translateY(-8px) rotate(0.5deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }, [])

  const wrapper = useMemo(
    () => ({
      width: "100%",
      display: "flex" as const,
      justifyContent: "flex-start",
      background,
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs,
      minHeight: "100vh",
      flexDirection: "column" as const,
    }),
    [background, isA, fs]
  )

  const container = useMemo(
    () => ({
      width: "100%",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isA]
  )

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  const total = MC_QUESTIONS.length
  const [idx, setIdx] = useState(0)
  const [selection, setSelection] = useState<(number | null)[]>(Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(Array(total).fill(false))
  const [score, setScore] = useState(0)

  const q = MC_QUESTIONS[idx]
  const quizProgressPct = Math.round(((idx + 1) / total) * 100)
  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total

  const optStyle = (active: boolean): React.CSSProperties => ({
    padding: "20px 24px",
    borderRadius: 16,
    border: `3px solid ${active ? primaryColor : "rgba(0,0,0,0.12)"}`,
    background: active 
      ? `linear-gradient(135deg, ${primaryColor}, ${primaryColor}CC)` 
      : "linear-gradient(135deg, #fff, #f8faff)",
    fontWeight: 800,
    fontSize: fs * 1.1,
    letterSpacing: 0.3,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "left",
    boxShadow: active 
      ? "0 12px 32px rgba(0,0,0,0.15)" 
      : "0 6px 20px rgba(0,0,0,0.08)",
    transformOrigin: "center",
    color: active ? "white" : "#333",
    transition: "all 0.3s ease",
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
  })

  const handleSelect = (optionIndex: number) => {
    if (checked[idx]) return

    setSelection((prev) => {
      const next = [...prev]
      next[idx] = optionIndex
      return next
    })

    const isCorrect = optionIndex === q.correctIndex
    setChecked((prev) => {
      const next = [...prev]
      next[idx] = true
      return next
    })
    setCorrect((prev) => {
      const next = [...prev]
      next[idx] = isCorrect
      return next
    })
    
    const newScore = score + (isCorrect ? 1 : 0)
    if (isCorrect) setScore((s) => s + 1)

    // Track answer submission
    if (onAnswerSubmit) {
      console.log(`M5S1P4: Submitting answer ${idx}: ${optionIndex}, correct=${q.correctIndex}, isCorrect=${isCorrect}`)
      onAnswerSubmit(idx, q.text, q.options[optionIndex], q.options[q.correctIndex], isCorrect)
    }

    if (idx < total - 1) {
      setTimeout(() => setIdx((i) => i + 1), autoAdvanceDelayMs)
    } else {
      // Last question - complete quiz after delay
      console.log("M5S1P4: Last question answered, completing quiz with score:", newScore)
      setTimeout(() => {
        if (onQuizComplete) {
          onQuizComplete(newScore)
        }
      }, 100)
    }
  }

  const feedback =
    checked[idx] && correct[idx] ? (
      <div style={{ color: "#0a7f35", fontWeight: 700 }}>✅ ¡Correcto!</div>
    ) : checked[idx] && !correct[idx] ? (
      <div style={{ color: "#b00020", fontWeight: 700 }}>
        ❌ Incorrecto. Respuesta: <strong>{q.options[q.correctIndex]}</strong>
      </div>
    ) : null

  // Show "Already Completed" screen if quiz was already taken
  if (isAlreadyCompleted) {
    return (
      <div style={wrapper}>{/* Marketing Facts Animation Overlay */}
      <MarketingFactsAnimation />
      
      <SectionPageHeader
          primaryColor={primaryColor}
          progress={progressPercent}
          brandName={brandName}
          logoSrc={logoSrc || undefined}
        />
        <div style={{ width: "100%", display: "flex", flexDirection: "column", flex: 1, minHeight: "calc(100vh - 80px)", alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...container, textAlign: "center", paddingTop: 60, maxWidth: 600 }}>
            <div style={{ padding: 40, background: "#fff", borderRadius: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
              <h2 style={{ fontSize: fs * 2, fontWeight: 800, marginBottom: 16, color: primaryColor }}>
                Quiz Ya Completado
              </h2>
              <p style={{ fontSize: fs * 1.5, color: "#666", marginBottom: 24 }}>
                Ya completaste este quiz. Los quizzes solo pueden realizarse una vez.
              </p>
              <div style={{ padding: 20, background: `${primaryColor}10`, borderRadius: 12, marginBottom: 20 }}>
                <strong style={{ fontSize: fs * 1.5, color: primaryColor }}>
                  Tu puntuación: {completedScore ?? "?"} / {total}
                </strong>
              </div>
              <p style={{ fontSize: fs * 0.95, color: "#999" }}>
                ✨ Continúa con el siguiente contenido
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Custom facts for this networking quiz page
  const networkingFactsPage5 = [
    {
      character: 'billy' as const,
      text: 'Un solo contacto clave puede abrir hasta 10 nuevas oportunidades laborales.',
      characterImage: '/2.png'
    },
    {
      character: 'drago' as const,
      text: 'LinkedIn registra más de 900 millones de usuarios activos enfocados en networking.',
      characterImage: '/drago1.png'
    },
    {
      character: 'billy' as const,
      text: 'Las personas que comentan en publicaciones de otros aumentan su alcance un 40%.',
      characterImage: '/2.png'
    },
    {
      character: 'drago' as const,
      text: 'El 65% de los profesionales cree que su red es esencial para su crecimiento personal.',
      characterImage: '/drago1.png'
    }
  ]

  return (
    <div style={wrapper}>{/* Marketing Facts Animation Overlay */}
      <MarketingFactsAnimation facts={networkingFactsPage5} />
      
      <SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%", display: "block" }}>
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 2.1, 
                    lineHeight: 1.15,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800,
                    background: "linear-gradient(90deg, #0F62FE, #60A5FA, #93C5FD, #0F62FE, #60A5FA)",
                    backgroundSize: "300% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer-title 4s ease-in-out infinite, shimmer-glow 3s ease-in-out infinite, float 5s ease-in-out infinite",
                    position: "relative",
                    display: "inline-block",
                    paddingBottom: "8px"
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <span 
                    style={{
                      position: "relative",
                      zIndex: 1,
                      textShadow: "0 0 40px rgba(15, 98, 254, 0.4), 0 0 60px rgba(15, 98, 254, 0.2)"
                    }}
                  >
                    {title}
                  </span>
                </motion.h1>
                <motion.p 
                  style={{ margin: "8px 0 0", opacity: 0.9, fontSize: fs * 1.1, whiteSpace: "pre-wrap" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </motion.p>
              </motion.div>

              <motion.div variants={itemVar}>
                <Page4Card glow={primaryColor}>
                  <div
                    style={{
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "space-between" as const,
                      marginBottom: 14,
                    }}
                  >
                    <strong style={{ fontSize: fs * 1.05 }}>
                      Pregunta {Math.min(idx + 1, total)} / {total}
                    </strong>
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 10 }}>
                      <div
                        style={{
                          width: 240,
                          height: 12,
                          background: "rgba(0,0,0,0.08)",
                          borderRadius: 999,
                          overflow: "hidden" as const,
                        }}
                      >
                        <div
                          style={{
                            width: `${quizProgressPct}%`,
                            height: "100%",
                            background: primaryColor,
                            borderRadius: 999,
                            transition: "width 220ms ease",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: fs * 0.95, opacity: 0.75 }}>{quizProgressPct}%</span>
                    </div>
                  </div>

                  <div style={{
                    background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}04)`,
                    borderRadius: 16,
                    padding: "24px 28px",
                    margin: "16px 0 24px",
                    border: `2px solid ${primaryColor}20`,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  }}>
                    <p style={{ 
                      margin: 0, 
                      lineHeight: 1.6, 
                      fontSize: fs * 1.2, 
                      fontWeight: 600,
                      color: "#333",
                      textAlign: "center"
                    }}>{q.text}</p>
                  </div>

                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: 12,
                      marginBottom: 14,
                    }}
                  >
                    {q.options.map((opt, i) => {
                      const active = selection[idx] === i
                      const disabled = !!checked[idx]
                      return (
                        <motion.div
                          key={opt}
                          role="button"
                          onClick={() => handleSelect(i)}
                          style={optStyle(active)}
                          aria-pressed={active}
                          whileHover={disabled ? undefined : { scale: 0.98 }}
                          whileTap={disabled ? undefined : { scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        >
                          {opt}
                        </motion.div>
                      )
                    })}
                  </div>

                  <div style={{ minHeight: 28, marginBottom: 6 }}>{feedback}</div>

                  {finished ? (
                    <div
                      style={{
                        marginTop: 12,
                        padding: 16,
                        border: `1px solid ${primaryColor}33`,
                        borderRadius: 12,
                        background: "#fff",
                        display: "flex" as const,
                        alignItems: "center" as const,
                        justifyContent: "space-between" as const,
                      }}
                    >
                      <strong>Resultado:</strong>
                      <span style={{ fontWeight: 800, color: primaryColor }}>
                        {score} / {total}
                      </span>
                    </div>
                  ) : null}
                </Page4Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

/* ───────────────────────── Page 5 ───────────────────────── */

const DEFAULT_PAGE5_INSTRUCTIONS = [
  "Propuesta de valor (1 frase): qué problema resuelves y para quién.\n3 mensajes ancla (máx. 12 palabras c/u): ideas clave que quieres que recuerden.\nEvidencia concreta: un dato, caso o resultado que respalde tu promesa.",
]

type Page5Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  layoutOption?: LayoutOption
  baseFontSize?: number
  instructions?: string[]
  gridColumns?: number
  gridGap?: number
}

function Page5Card({
  children,
  glow,
  borderColor = "rgba(0,0,0,0.08)",
}: {
  children: React.ReactNode
  glow?: string
  borderColor?: string
}) {
  return (
    <div
      style={{
        position: "relative" as const,
        borderRadius: 24,
        padding: 32,
        border: `2px solid ${borderColor}`,
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
        backdropFilter: "blur(10px)",
        boxShadow: glow
          ? `0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px ${glow}30, inset 0 1px 0 rgba(255,255,255,0.9)`
          : `0 12px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)`,
        overflow: "hidden" as const,
      }}
    >
      {glow ? (
        <div
          style={{
            position: "absolute" as const,
            inset: -120,
            pointerEvents: "none",
            background: `radial-gradient(600px 300px at 20% 0%, ${glow}25, transparent 60%)`,
          }}
        />
      ) : null}
      <div style={{ position: "relative" as const, zIndex: 1 }}>
      {children}
      </div>
    </div>
  )
}

function Page5GridFlashcards({
  children,
  gap = 16,
  columns = 1,
}: {
  children: React.ReactNode
  gap?: number
  columns?: number
}) {
  return (
    <div
      style={{
        display: "grid" as const,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        alignItems: "stretch" as const,
        width: "100%",
      }}
    >
      {children}
    </div>
  )
}

function Page5Flashcard({
  front,
  back,
  primaryColor,
  fontSize,
}: {
  front: string
  back: React.ReactNode
  primaryColor: string
  fontSize: number
}) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      role="button"
      onClick={() => setOpen((v) => !v)}
      whileHover={{ 
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        userSelect: "none",
        cursor: "pointer",
        borderRadius: 20,
        border: `3px solid ${open ? primaryColor : "rgba(0,0,0,0.1)"}`,
        background: open 
          ? `linear-gradient(135deg, ${primaryColor}15 0%, #ffffff 100%)` 
          : `linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)`,
        padding: 28,
        minHeight: 240,
        boxShadow: open
          ? `0 20px 50px ${primaryColor}25, 0 0 0 1px ${primaryColor}30, inset 0 1px 0 rgba(255,255,255,0.9)`
          : `0 8px 25px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)`,
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 18,
        transformOrigin: "center",
        willChange: "transform",
        position: "relative" as const,
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        style={{
          position: "absolute" as const,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${primaryColor}08, transparent)`,
          opacity: open ? 1 : 0,
        }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div style={{ position: "relative" as const, zIndex: 1 }}>
      <strong
        style={{
          display: "block" as const,
          fontSize: fontSize * 1.4,
          lineHeight: 1.3,
          fontWeight: 800,
          letterSpacing: "0.5px",
          marginBottom: 12,
          backgroundImage: open 
            ? `linear-gradient(90deg, ${primaryColor}, #4A90E2, ${primaryColor})`
            : "linear-gradient(90deg, #2c3e50, #2c3e50)",
          backgroundSize: open ? "200% auto" : "100% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: open ? "shimmer-title-page5 3s ease-in-out infinite" : "none",
          textShadow: open ? `0 0 20px ${primaryColor}30` : "none",
        }}
      >
        {front}
      </strong>

      <div
        style={{
          margin: 0,
            opacity: open ? 1 : 0.7,
            fontSize: fontSize * 1.05,
            lineHeight: 1.6,
          flex: 1,
            fontWeight: 500,
            color: open ? "#2c3e50" : "#666",
          }}
        >
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {back}
            </motion.div>
          ) : (
            <motion.span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                justifyContent: "center",
                padding: "20px 0",
                color: primaryColor,
                fontWeight: 600,
              }}
            >
              <span>👆</span>
              <span>Toca para ver la consigna</span>
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function Page5({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 100,
  title = "🎯 Workshop Interactivo",
  topicTitle = "Tarjeta de marca relacional",
  layoutOption = "B",
  baseFontSize = 18,
  instructions = DEFAULT_PAGE5_INSTRUCTIONS,
  gridColumns = 1,
  gridGap = 16,
}: Page5Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isLeft = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects for title
  React.useEffect(() => {
    const styleId = 'm5s1-page5-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-page5 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer-glow-page5 {
          0%, 100% { 
            opacity: 1;
            filter: drop-shadow(0 0 15px rgba(15, 98, 254, 0.4));
          }
          50% { 
            opacity: 1;
            filter: drop-shadow(0 0 30px rgba(15, 98, 254, 0.8));
          }
        }
        @keyframes float-page5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(-0.3deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(0.3deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }, [])

  const src = instructions.length ? instructions : DEFAULT_PAGE5_INSTRUCTIONS
  const TITLES = ["Tarjeta de marca relacional"]
  const list = src.map((t, i) => ({
    front: `🎯 ${TITLES[i] || `Paso ${i + 1}`}`,
    back: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{
          background: `linear-gradient(135deg, ${primaryColor}10, #f8f9ff)`,
          borderRadius: "12px",
          padding: "20px",
          border: `2px solid ${primaryColor}20`,
          marginBottom: "16px"
        }}>
          <h4 style={{
            margin: "0 0 12px 0",
            color: primaryColor,
            fontSize: fs * 1.1,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            ✍️ ¡Tu turno! Escribe en tu libreta:
          </h4>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <motion.div
            style={{
              background: "linear-gradient(135deg, #ffffff, #e6f3ff)",
              borderRadius: "12px",
              padding: "20px",
              border: `3px solid ${primaryColor}30`,
              boxShadow: `0 6px 20px ${primaryColor}20, inset 0 1px 0 rgba(255,255,255,0.9)`,
              position: "relative",
              overflow: "hidden"
            }}
            whileHover={{ scale: 1.03, y: -4, boxShadow: `0 10px 30px ${primaryColor}30` }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "4px",
              background: `linear-gradient(90deg, ${primaryColor}, #4A90E2, ${primaryColor})`,
              backgroundSize: "200% auto",
              animation: "shimmer-title-page5 2s ease-in-out infinite"
            }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "28px", filter: "drop-shadow(0 2px 4px rgba(15,98,254,0.3))" }}>💡</span>
              <strong style={{ 
                color: primaryColor, 
                fontSize: fs * 1.1,
                fontWeight: 800,
                background: `linear-gradient(90deg, ${primaryColor}, #4A90E2)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>Propuesta de valor</strong>
            </div>
            <p style={{ margin: 0, fontSize: fs * 1.0, color: "#2c3e50", lineHeight: 1.6, fontWeight: 500 }}>
              <em style={{ color: primaryColor, fontWeight: 600 }}>1 frase:</em> ¿Qué problema resuelves y para quién?
            </p>
          </motion.div>

          <motion.div
            style={{
              background: "linear-gradient(135deg, #ffffff, #f0f9ff)",
              borderRadius: "12px",
              padding: "20px",
              border: `3px solid ${primaryColor}30`,
              boxShadow: `0 6px 20px ${primaryColor}20, inset 0 1px 0 rgba(255,255,255,0.9)`,
              position: "relative",
              overflow: "hidden"
            }}
            whileHover={{ scale: 1.03, y: -4, boxShadow: `0 10px 30px ${primaryColor}30` }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "4px",
              background: `linear-gradient(90deg, #4A90E2, #00D4FF, #4A90E2)`,
              backgroundSize: "200% auto",
              animation: "shimmer-title-page5 2s ease-in-out infinite"
            }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "28px", filter: "drop-shadow(0 2px 4px rgba(15,98,254,0.3))" }}>🎯</span>
              <strong style={{ 
                color: "#4A90E2", 
                fontSize: fs * 1.1,
                fontWeight: 800,
                background: `linear-gradient(90deg, #4A90E2, #00D4FF)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>3 mensajes ancla</strong>
            </div>
            <p style={{ margin: 0, fontSize: fs * 1.0, color: "#2c3e50", lineHeight: 1.6, fontWeight: 500 }}>
              <em style={{ color: "#4A90E2", fontWeight: 600 }}>Máx. 12 palabras c/u:</em> Ideas clave que quieres que recuerden
            </p>
          </motion.div>

          <motion.div
            style={{
              background: "linear-gradient(135deg, #ffffff, #fff5e6)",
              borderRadius: "12px",
              padding: "20px",
              border: `3px solid ${primaryColor}30`,
              boxShadow: `0 6px 20px ${primaryColor}20, inset 0 1px 0 rgba(255,255,255,0.9)`,
              position: "relative",
              overflow: "hidden"
            }}
            whileHover={{ scale: 1.03, y: -4, boxShadow: `0 10px 30px ${primaryColor}30` }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "4px",
              background: `linear-gradient(90deg, #00D4FF, ${primaryColor}, #00D4FF)`,
              backgroundSize: "200% auto",
              animation: "shimmer-title-page5 2s ease-in-out infinite"
            }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "28px", filter: "drop-shadow(0 2px 4px rgba(15,98,254,0.3))" }}>📊</span>
              <strong style={{ 
                color: "#00D4FF", 
                fontSize: fs * 1.1,
                fontWeight: 800,
                background: `linear-gradient(90deg, #00D4FF, ${primaryColor})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>Evidencia concreta</strong>
            </div>
            <p style={{ margin: 0, fontSize: fs * 1.0, color: "#2c3e50", lineHeight: 1.6, fontWeight: 500 }}>
              <em style={{ color: "#00D4FF", fontWeight: 600 }}>Un dato, caso o resultado</em> que respalde tu promesa
            </p>
          </motion.div>
        </div>

        <motion.div
          style={{
            marginTop: "20px",
            padding: "16px",
            background: `linear-gradient(135deg, ${primaryColor}08, #f0f8ff)`,
            borderRadius: "12px",
            border: `2px solid ${primaryColor}20`,
            textAlign: "center"
          }}
          animate={{ 
            boxShadow: [
              `0 4px 12px ${primaryColor}20`,
              `0 6px 20px ${primaryColor}30`,
              `0 4px 12px ${primaryColor}20`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p style={{ 
            margin: 0, 
            fontSize: fs * 0.9, 
            color: primaryColor, 
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}>
            🎉 ¡Perfecto! Ahora tienes tu tarjeta de marca completa
          </p>
        </motion.div>
      </motion.div>
    ),
  }))

  const wrapper = useMemo(
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
    [background, isLeft, fs]
  )

  const container = useMemo(
    () => ({
      width: "100%",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: isLeft ? "0" : "0 auto",
    }),
    [isLeft]
  )

  return (
    <div style={wrapper}>
      <SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%", display: "block", position: "relative", zIndex: 1, marginTop: "20px" }}>
        <section style={{ paddingTop: "20px" }}>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 24, textAlign: "center" as const }}>
                <motion.h1 
                  style={{ 
                    fontSize: fs * 2.5, 
                    fontWeight: 900, 
                    margin: "0 0 12px 0",
                    background: `linear-gradient(135deg, ${primaryColor}, #4A90E2, ${primaryColor})`,
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                    animation: "shimmer-title-page5 3s ease-in-out infinite",
                    filter: "drop-shadow(0 2px 8px rgba(15, 98, 254, 0.3))"
                  }}
                  animate={{ 
                    y: [0, -8, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {title}
                </motion.h1>
                <motion.p 
                  style={{ 
                    fontSize: fs * 1.3, 
                    color: primaryColor, 
                    fontWeight: 600,
                    margin: "0 0 24px 0",
                    background: `linear-gradient(135deg, ${primaryColor}CC, #4A90E2CC)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block"
                  }}
                  animate={{ 
                    y: [0, -4, 0]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  {topicTitle}
                </motion.p>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Page5Card glow={primaryColor}>
                  <div style={{ textAlign: "center" as const, marginBottom: 32 }}>
                    <motion.h3 
                      style={{ 
                        margin: "0 0 16px 0", 
                        fontSize: fs * 1.8, 
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        background: `linear-gradient(135deg, ${primaryColor}, #4A90E2, ${primaryColor})`,
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "shimmer-title-page5 2.5s ease-in-out infinite",
                        filter: "drop-shadow(0 2px 6px rgba(15, 98, 254, 0.3))"
                      }}
                      animate={{ 
                        scale: [1, 1.05, 1],
                        y: [0, -6, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      🚀 ¡Crea tu Tarjeta de Marca! 🚀
                    </motion.h3>
                    <motion.p 
                      style={{ 
                        margin: "0 0 24px 0", 
                        opacity: 0.9, 
                        fontSize: fs * 1.2,
                        fontWeight: 600,
                        color: "#2c3e50",
                        lineHeight: 1.6
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      💡 <strong style={{ color: primaryColor }}>Paso a paso:</strong> Toca cada tarjeta para descubrir qué necesitas completar
                    </motion.p>
                    
                    {/* Fun progress indicator */}
                    <motion.div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "20px"
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      {[1, 2, 3].map((step) => (
                        <motion.div
                          key={step}
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${primaryColor}, #4A90E2)`,
                            boxShadow: `0 2px 8px ${primaryColor}40`
                          }}
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            delay: step * 0.3
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  <Page5GridFlashcards gap={gridGap} columns={gridColumns}>
                    {list.map((c, i) => (
                      <Page5Flashcard
                        key={c.front ?? i}
                        front={c.front}
                        back={c.back}
                        primaryColor={primaryColor}
                        fontSize={fs}
                      />
                    ))}
                  </Page5GridFlashcards>
                </Page5Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

/* ───────────────────────── Export ───────────────────────── */

const M5S1_CONTENT: Record<number, React.ReactNode> = {
  1: <WelcomePage />,
  2: <Page1 />,
  3: <Page2 />,
  4: <Page3 />,
  5: <Page5 />,
}

export default M5S1_CONTENT

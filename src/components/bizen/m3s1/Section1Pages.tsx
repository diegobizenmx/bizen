/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { motion, Variants } from "framer-motion"
import SectionPageHeader from "@/components/bizen/SectionPageHeader"
import MarketingFactsAnimation from "@/components/MarketingFactsAnimation"
import BillyCelebration from "@/components/BillyCelebration"

type LayoutOption = "A" | "B"

type Page1Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  introText?: string
  keyIdea?: string

  // Bloque 1: ¿Por qué importa?
  whyTitle?: string
  whyBody?: string
  whyExampleTitle?: string
  whyExampleText?: string

  // Bloque 2: Glosario y decisiones
  glossaryTitle?: string
  glossaryItems?: string[]

  // Bloque 3: Pasos + Errores (opcional)
  stepsTitle?: string
  stepsItems?: string[]
  errorsTitle?: string
  errorsItems?: string[]

  // Bloque 4: Q&A (opcional)
  qaTitle?: string
  qaItems?: string[]

  heroImage?: string
  layoutOption?: LayoutOption
  baseFontSize?: number
}

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
}

const DEFAULT_WELCOME_PROPS: WelcomeProps = {
  brandName: "BSMX",
  logoSrc: "",
  primaryColor: "#0F62FE",
  background: "linear-gradient(180deg, #FFFFFF, #F8FAFF)",
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
  } = props

  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))
  const hasHero = Boolean(heroImage && heroImage.trim())
  const hasMedia = Boolean(mediaImage && mediaImage.trim())
  const safeSyllabus = Array.isArray(syllabus) ? syllabus : []

  const wrapper: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      minHeight: "100vh",
      display: "flex" as const,
      flexDirection: "column" as const,
      justifyContent: "flex-start",
      background: "linear-gradient(180deg, #FFFFFF 0%, #F0F8FF 50%, #E0F2FE 100%)",
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs,
      position: "relative" as const,
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

  // Shimmer animation keyframes
  const shimmerKeyframes = `
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
  `

  return (
    <div style={wrapper}>
      <style dangerouslySetInnerHTML={{ __html: shimmerKeyframes }} />
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
              <motion.div variants={itemVar} style={{ marginBottom: 12 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800,
                    background: "linear-gradient(120deg, #0F62FE 0%, #4A90E2 25%, #7BB3F0 50%, #4A90E2 75%, #0F62FE 100%)",
                    backgroundSize: "1000px 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer 3s linear infinite",
                    textShadow: "0 4px 20px rgba(15, 98, 254, 0.3)",
                  }}
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {title}
                </motion.h1>
                <motion.p 
                  style={{ margin: "6px 0 0", opacity: 0.9, fontSize: fs * 1.4 }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {moduleLabel}
                </motion.p>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow={primaryColor}>
                  <motion.div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 16,
                      paddingBottom: 12,
                      borderBottom: "2px solid rgba(15, 98, 254, 0.1)",
                    }}
                  >
                    <motion.div
                      aria-hidden
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: "linear-gradient(135deg, #0F62FE, #4A90E2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(15, 98, 254, 0.3)",
                      }}
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span style={{ fontSize: 18, color: "white" }}>📚</span>
                    </motion.div>
                    <motion.h3 
                      style={{ 
                        margin: 0, 
                        fontSize: fs * 1.55,
                        background: "linear-gradient(120deg, #0F62FE 0%, #4A90E2 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Temario
                    </motion.h3>
                  </motion.div>
                  <div style={{ display: "grid", gap: 8 }}>
                    {safeSyllabus.map((item, index) => (
                      <motion.div
                        key={index}
                        style={{
                          padding: "12px 16px",
                          borderRadius: 12,
                          background: index % 2 === 0 
                            ? "linear-gradient(135deg, rgba(15, 98, 254, 0.08), rgba(74, 144, 226, 0.05))" 
                            : "linear-gradient(135deg, rgba(255, 107, 157, 0.08), rgba(255, 184, 140, 0.05))",
                          border: `1px solid ${index % 2 === 0 ? 'rgba(15, 98, 254, 0.2)' : 'rgba(255, 107, 157, 0.2)'}`,
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                          <motion.div
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: index % 2 === 0 
                                ? "linear-gradient(135deg, #0F62FE, #4A90E2)" 
                                : "linear-gradient(135deg, #FF6B9D, #FFB88C)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                            }}
                            animate={{ 
                              rotate: [0, 360],
                            }}
                            transition={{ 
                              duration: 2,
                              delay: index * 0.2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          >
                            <span style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
                              {index + 1}
                            </span>
                          </motion.div>
                          <p style={{ 
                            margin: 0, 
                            opacity: 0.95, 
                            fontSize: fs,
                            lineHeight: 1.6,
                            fontWeight: 500
                          }}>
                            {item}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {hasHero ? (
                <motion.div
                  variants={itemVar}
                  style={{
                    marginTop: 24,
                    marginBottom: 24,
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    style={{
                      position: "relative",
                      width: "60%",
                      maxWidth: "600px",
                      margin: "0 auto",
                      borderRadius: 24,
                      overflow: "hidden",
                      boxShadow: "0 20px 60px rgba(15, 98, 254, 0.3)",
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 30px 80px rgba(15, 98, 254, 0.4)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Decorative gradient overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, rgba(15, 98, 254, 0.1), rgba(255, 107, 157, 0.1))",
                        pointerEvents: "none",
                        zIndex: 1,
                      }}
                    />
                    <img 
                      src={heroImage} 
                      alt="Bienvenida" 
                      style={{ 
                        width: "100%", 
                        height: "auto", 
                        display: "block",
                        position: "relative",
                        zIndex: 0
                      }} 
                    />
                    {/* Animated border glow */}
                    <motion.div
                      style={{
                        position: "absolute",
                        inset: -2,
                        background: "linear-gradient(45deg, #0F62FE, #FF6B9D, #0F62FE)",
                        borderRadius: 24,
                        zIndex: -1,
                        opacity: 0.5,
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </motion.div>
              ) : null}

              {hasMedia && (
                <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                  <Card glow={primaryColor}>
                    <div
                      style={{
                        borderRadius: 14,
                        overflow: "hidden",
                        boxShadow: "0 14px 40px rgba(0,0,0,0.12)",
                      }}
                    >
                      <img
                        src={mediaImage}
                        alt="Imagen de bienvenida"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

function Page1({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 20,
  title = "Estrategias para transmitir confianza y coherencia",
  topicTitle = "",
  introText = "La confianza se gana cuando lo que prometes coincide con lo que entregas. La coherencia convierte interacciones aisladas en una experiencia predecible y segura.",
  keyIdea = "Confianza = (Competencia + Honestidad + Calidez) × Coherencia a lo largo del tiempo y en todos los puntos de contacto.",
  whyTitle = "1) ¿Por qué importan la confianza y la coherencia?",
  whyBody = "Las personas compran cuando perciben bajo riesgo. Señales claras de credibilidad y una experiencia consistente reducen incertidumbre, aceleran decisiones y fomentan la recomendación.",
  whyExampleTitle = "Ejemplos de señal de confianza",
  whyExampleText = "Casos reales con métricas, testimonios verificables, políticas transparentes (precio, devoluciones, tiempos), y un tono/visual coherente en web, redes y atención.",
  glossaryTitle = "2) Glosario y decisiones clave",
  glossaryItems = [
    "Prueba social: evidencia de terceros (reseñas, casos, logos) que valida tus promesas.",
    "Transparencia: políticas claras y fáciles de encontrar (precios, plazos, garantías).",
    "Consistencia: mismo tono, visual y promesas en todos los canales y momentos.",
    "Autoridad: certificaciones, experiencia, publicaciones o premios relevantes.",
    "Fricción baja: proceso simple y predecible (onboarding, pagos, soporte).",
  ],
  stepsTitle = "3) Pasos aplicables para elevar confianza",
  stepsItems = [
    "Audita 5–7 puntos de contacto: alinea mensaje, diseño y promesa en todos.",
    "Asocia cada afirmación con evidencia: dato, caso, demo o política.",
    "Estandariza tono y respuestas (guía de estilo + plantillas de soporte).",
    "Haz visible lo que reduce riesgo: garantías, SLA, proceso y precios.",
    "Mide señales de confianza: tiempo de respuesta, NPS, tasa de reembolsos y reseñas.",
  ],
  errorsTitle = "Errores comunes que erosionan la confianza",
  errorsItems = [
    "Prometer más de lo que entregas o esconder limitaciones.",
    "Cambiar de tono/estilo según el canal (rompe la coherencia).",
    "Ocultar precios/políticas o dificultar el contacto.",
    "Testimonios vagos sin contexto ni validación.",
  ],
  qaTitle = "4) Q&A rápido",
  qaItems = [
    "¿Cómo proyectar confianza con pocos seguidores? → Prioriza casos reales, claridad y velocidad de respuesta.",
    "¿Qué muestro si no tengo premios? → Proceso, métricas de desempeño y feedback de clientes.",
    "¿Cómo sostener coherencia en equipo? → Guía de tono/visual, ejemplos y revisiones quincenales.",
  ],
  heroImage = "",
  layoutOption = "A",
  baseFontSize = 18,
}: Page1Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"
  const [showFlashcards, setShowFlashcards] = useState(false)

  const wrapper = useMemo(
    () => ({
      width: "100%",
      minHeight: "100vh",
      display: "flex" as const,
      flexDirection: "column" as const,
      justifyContent: "flex-start",
      background: "#FFFFFF",
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
      maxWidth: "none",
      padding: "clamp(12px, 3vw, 20px)",
      boxSizing: "border-box" as const,
    }),
    [isA]
  )

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)))

  // Shimmer animation keyframes (defined in style tag)
  const shimmerKeyframes = `
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
  `

  return (
    <div style={wrapper}>
      <style dangerouslySetInnerHTML={{ __html: shimmerKeyframes }} />
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
              <motion.div variants={itemVar} style={{ marginBottom: "clamp(12px, 3vw, 20px)" }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: "clamp(24px, 6vw, 54px)",
                    lineHeight: 1.15,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800,
                    background: "linear-gradient(120deg, #0F62FE 0%, #4A90E2 25%, #7BB3F0 50%, #4A90E2 75%, #0F62FE 100%)",
                    backgroundSize: "1000px 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer 3s linear infinite",
                    textShadow: "0 4px 20px rgba(15, 98, 254, 0.3)",
                  }}
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {title}
                </motion.h1>
                {topicTitle && (
                                  <motion.p 
                  style={{ margin: "clamp(4px, 1vw, 8px) 0 0", opacity: 0.9, fontSize: "clamp(14px, 3.5vw, 25px)" }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </motion.p>
                )}
              </motion.div>

              {/* Interactive Flashcard Toggle */}
              <motion.div variants={itemVar} style={{ marginBottom: "clamp(12px, 3vw, 20px)" }}>
                <motion.button
                  onClick={() => setShowFlashcards(!showFlashcards)}
                  style={{
                    padding: "clamp(10px, 2vw, 12px) clamp(16px, 4vw, 24px)",
                    borderRadius: 12,
                    border: "none",
                    background: "linear-gradient(135deg, #FF6B9D 0%, #FFB88C 100%)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "clamp(13px, 2.5vw, 17px)",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(255, 107, 157, 0.4)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showFlashcards ? "📚 Ocultar Flashcards" : "🎴 Ver Conceptos Clave"}
                </motion.button>
              </motion.div>

              {/* Flashcards */}
              {showFlashcards && (
                <motion.div 
                  variants={itemVar} 
                  style={{ marginBottom: 20 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
                    gap: "clamp(12px, 3vw, 16px)",
                  }}>
                    {[
                      { color: "#FF6B9D", icon: "🛡️", term: "Confianza", desc: "Base de toda relación de valor" },
                      { color: "#4ECDC4", icon: "🔄", term: "Coherencia", desc: "Consistencia en cada punto de contacto" },
                      { color: "#45B7D1", icon: "✨", term: "Transparencia", desc: "Claridad sin barreras" },
                      { color: "#FFA07A", icon: "🎯", term: "Prueba Social", desc: "Evidencia de terceros verificable" },
                    ].map((card, idx) => (
                      <motion.div
                        key={idx}
                        style={{
                          background: `linear-gradient(135deg, ${card.color}15, ${card.color}05)`,
                          border: `2px solid ${card.color}40`,
                          borderRadius: 16,
                          padding: 20,
                          boxShadow: `0 8px 24px ${card.color}20`,
                        }}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div style={{ fontSize: 32, marginBottom: 8 }}>{card.icon}</div>
                        <h3 style={{ margin: "0 0 8px 0", color: card.color, fontSize: fs * 1.2, fontWeight: 800 }}>
                          {card.term}
                        </h3>
                        <p style={{ margin: 0, opacity: 0.9, fontSize: fs * 0.9 }}>{card.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

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
                  <img src={heroImage} alt="Sección 3" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              {introText ? (
                <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                  <Card glow="#4ECDC4">
                    <motion.div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 12,
                      }}
                    >
                      <motion.div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 8,
                          background: "linear-gradient(135deg, #4ECDC4, #45B7D1)",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      <h3 style={{ margin: 0, fontSize: fs * 1.3, color: "#45B7D1" }}>💡 Introducción</h3>
                    </motion.div>
                    <p style={{ margin: 0, opacity: 0.95, fontSize: fs, lineHeight: 1.6 }}>{introText}</p>
                  </Card>
                </motion.div>
              ) : null}

              {keyIdea ? (
                <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                  <motion.div
                    style={{
                      border: `2px solid ${primaryColor}44`,
                      background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`,
                      color: "#111",
                      borderRadius: 20,
                      padding: 20,
                      boxShadow: `0 12px 40px ${primaryColor}20`,
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <strong style={{ color: primaryColor, display: "block" as const, marginBottom: 8, fontSize: fs * 1.1 }}>
                      ⭐ Idea Clave
                    </strong>
                    <p style={{ margin: 0, opacity: 0.95, fontSize: fs, lineHeight: 1.6, fontWeight: 500 }}>{keyIdea}</p>
                  </motion.div>
                </motion.div>
              ) : null}

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow="#FF6B9D">
                  <motion.h3 
                    style={{ margin: "0 0 10px 0", fontSize: fs * 1.355, color: "#FF6B9D" }}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {whyTitle}
                  </motion.h3>
                  <p style={{ margin: "0 0 16px 0", opacity: 0.95, lineHeight: 1.6 }}>{whyBody}</p>
                  <motion.div 
                    style={{ marginTop: 12, padding: 16, background: "#FF6B9D10", borderRadius: 12 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <strong style={{ color: "#FF6B9D", display: "block" as const, marginBottom: 6 }}>{whyExampleTitle}</strong>
                    <p style={{ margin: 0, opacity: 0.95, lineHeight: 1.6 }}>{whyExampleText}</p>
                  </motion.div>
                </Card>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow="#4ECDC4">
                  <motion.h3 
                    style={{ margin: "0 0 20px 0", fontSize: fs * 1.355, color: "#4ECDC4" }}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    {glossaryTitle}
                  </motion.h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
                    {glossaryItems.map((t, i) => {
                      const colors = [
                        { bg: "rgba(78, 205, 196, 0.1)", border: "rgba(78, 205, 196, 0.3)", icon: "🔵" },
                        { bg: "rgba(255, 107, 157, 0.1)", border: "rgba(255, 107, 157, 0.3)", icon: "🟣" },
                        { bg: "rgba(69, 183, 209, 0.1)", border: "rgba(69, 183, 209, 0.3)", icon: "🟢" },
                        { bg: "rgba(255, 160, 122, 0.1)", border: "rgba(255, 160, 122, 0.3)", icon: "🟠" },
                        { bg: "rgba(15, 98, 254, 0.1)", border: "rgba(15, 98, 254, 0.3)", icon: "🔷" },
                      ]
                      const color = colors[i % colors.length]
                      const [term, description] = t.split(":").map(s => s.trim())
                      return (
                        <motion.div
                          key={`g-${i}`}
                          style={{
                            padding: "16px",
                            borderRadius: 12,
                            background: color.bg,
                            border: `2px solid ${color.border}`,
                            cursor: "pointer",
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                            zIndex: 10
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                            <span style={{ fontSize: 24 }}>{color.icon}</span>
                            <div>
                              <strong style={{ display: "block", marginBottom: 6, fontSize: fs * 0.95, color: "#111" }}>
                                {term}
                              </strong>
                              <p style={{ margin: 0, fontSize: fs * 0.9, opacity: 0.85, lineHeight: 1.5 }}>
                                {description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </Card>
              </motion.div>

              {(stepsItems.length > 0 || errorsItems.length > 0) && (
                <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                  <Card glow="#FFA07A">
                    {stepsItems.length > 0 && (
                      <>
                        <motion.h3 
                          style={{ margin: "0 0 20px 0", fontSize: fs * 1.355, color: "#FFA07A" }}
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 2.2, repeat: Infinity }}
                        >
                          {stepsTitle}
                        </motion.h3>
                        <div style={{ margin: "0 0 20px 0" }}>
                          {stepsItems.map((t, i) => (
                            <motion.div
                              key={`s-${i}`}
                              style={{
                                padding: "16px 20px",
                                marginBottom: 12,
                                borderRadius: 12,
                                background: "linear-gradient(135deg, rgba(255, 160, 122, 0.08), rgba(255, 107, 157, 0.05))",
                                border: `2px solid rgba(255, 160, 122, 0.3)`,
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 16,
                              }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ 
                                scale: 1.02,
                                boxShadow: "0 8px 24px rgba(255, 160, 122, 0.2)",
                              }}
                            >
                              <motion.div
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  background: "linear-gradient(135deg, #FFA07A, #FF6B9D)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                  boxShadow: "0 4px 12px rgba(255, 160, 122, 0.4)",
                                  fontSize: 18,
                                  fontWeight: "bold",
                                  color: "white",
                                }}
                                animate={{ 
                                  scale: [1, 1.1, 1],
                                  rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                  duration: 2,
                                  delay: i * 0.2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                {i + 1}
                              </motion.div>
                              <p style={{ 
                                margin: 0, 
                                fontSize: fs, 
                                lineHeight: 1.6,
                                flex: 1 
                              }}>
                                {t}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}

                    {errorsItems.length > 0 && (
                      <>
                        <motion.h4 
                          style={{ margin: "14px 0 16px 0", color: "#FF6B9D", fontSize: fs * 1.1 }}
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                        >
                          ⚠️ {errorsTitle}
                        </motion.h4>
                        <div>
                          {errorsItems.map((t, i) => (
                            <motion.div
                              key={`e-${i}`}
                              style={{
                                padding: "14px 18px",
                                marginBottom: 10,
                                borderRadius: 12,
                                background: "linear-gradient(135deg, rgba(255, 107, 157, 0.08), rgba(255, 182, 193, 0.05))",
                                border: `2px solid rgba(255, 107, 157, 0.3)`,
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 12,
                              }}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ 
                                scale: 1.03,
                                boxShadow: "0 8px 24px rgba(255, 107, 157, 0.25)",
                              }}
                            >
                              <motion.div
                                animate={{ 
                                  rotate: [0, -10, 10, 0],
                                  scale: [1, 1.1, 1]
                                }}
                                transition={{ 
                                  duration: 2,
                                  delay: i * 0.3,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                <span style={{ fontSize: 24 }}>🚫</span>
                              </motion.div>
                              <p style={{ 
                                margin: 0, 
                                fontSize: fs, 
                                lineHeight: 1.6,
                                flex: 1 
                              }}>
                                {t}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}
                  </Card>
                </motion.div>
              )}

              {qaItems.length > 0 && (
                <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                  <Card glow="#45B7D1">
                    <motion.h3 
                      style={{ margin: "0 0 20px 0", fontSize: fs * 1.355, color: "#45B7D1" }}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2.8, repeat: Infinity }}
                    >
                      {qaTitle}
                    </motion.h3>
                    <div style={{ display: "grid", gap: 12 }}>
                      {qaItems.map((t, i) => {
                        const [question, answer] = t.split("→").map(s => s.trim())
                        return (
                          <motion.div
                            key={`qa-${i}`}
                            style={{
                              padding: "18px 20px",
                              borderRadius: 14,
                              background: "linear-gradient(135deg, rgba(69, 183, 209, 0.08), rgba(78, 205, 196, 0.05))",
                              border: `2px solid rgba(69, 183, 209, 0.3)`,
                              cursor: "pointer",
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ 
                              scale: 1.02,
                              boxShadow: "0 8px 24px rgba(69, 183, 209, 0.2)",
                            }}
                          >
                            <div style={{ display: "flex", gap: 12 }}>
                              <motion.div
                                style={{
                                  fontSize: 24,
                                  flexShrink: 0,
                                }}
                                animate={{ 
                                  rotate: [0, 15, -15, 0]
                                }}
                                transition={{ 
                                  duration: 3,
                                  delay: i * 0.5,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                ❓
                              </motion.div>
                              <div style={{ flex: 1 }}>
                                <strong style={{ 
                                  display: "block", 
                                  marginBottom: 8, 
                                  fontSize: fs, 
                                  color: "#45B7D1",
                                  lineHeight: 1.4
                                }}>
                                  {question}
                                </strong>
                                <p style={{ 
                                  margin: 0, 
                                  fontSize: fs * 0.95, 
                                  opacity: 0.9,
                                  lineHeight: 1.6
                                }}>
                                  {answer}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

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
  awarenessImage?: string
  considerationImage?: string
  conversionImage?: string
  postImage?: string
}

function MetricRow({
  title,
  items,
  imageSrc,
  primaryColor,
  fs,
  reverse = false,
}: {
  title: string
  items: string[]
  imageSrc?: string
  primaryColor: string
  fs: number
  reverse?: boolean
}) {
  const hasImage = !!imageSrc
  const gradient = "linear-gradient(135deg, #e0f2fe, #bae6fd)";
  return (
    <div
      style={{
        display: "flex" as const,
        flexDirection: reverse ? "row-reverse" : "row",
        gap: 16,
        alignItems: "stretch" as const,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          flex: 1,
          border: "2px solid #bae6fd",
          borderRadius: 16,
          padding: 20,
          background: gradient,
          boxShadow: "0 8px 24px rgba(14, 165, 233, 0.15)",
        }}
      >
        <motion.h4
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            margin: "0 0 12px 0",
            color: "#0369a1",
            fontSize: fs * 1.3,
            fontWeight: 700,
          }}
        >
          {title}
        </motion.h4>
        <ul
          style={{
            margin: 0,
            paddingLeft: 22,
            fontSize: fs,
            lineHeight: 1.6,
            color: "#0c4a6e",
          }}
        >
          {items.map((it, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{ marginBottom: 8 }}
            >
              {it}
            </motion.li>
          ))}
        </ul>
      </div>

      {hasImage ? (
        <div
          style={{
            flex: 1,
            border: `1px solid ${primaryColor}33`,
            borderRadius: 14,
            overflow: "hidden" as const,
            background: "#fff",
            display: "flex" as const,
            alignItems: "center" as const,
            justifyContent: "center" as const,
            padding: 8,
          }}
        >
          <img
            src={imageSrc}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 10,
              aspectRatio: "16 / 9",
              display: "block" as const,
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

type ButtonVariant = "primary" | "ghost"

function Btn({
  children,
  onClick,
  variant = "primary",
  disabled,
  primaryColor,
}: {
  children: React.ReactNode
  onClick: () => void
  variant?: ButtonVariant
  disabled?: boolean
  primaryColor: string
}) {
  const base: React.CSSProperties = {
    padding: "12px 16px",
    borderRadius: 12,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    userSelect: "none",
    outline: "none",
    border: "none",
  }

  const styles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      ...base,
      background: primaryColor,
      color: "#fff",
      border: `1px solid ${primaryColor}`,
    },
    ghost: {
      ...base,
      background: "#fff",
      color: "#111",
      border: "1px solid rgba(0,0,0,0.12)",
    },
  }

  return (
    <motion.button
      type="button"
      onClick={disabled ? undefined : onClick}
      whileHover={{ scale: 0.9 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      style={styles[variant]}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}

function Page2({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 40,
  title = "",
  topicTitle = "Interacción, coherencia y storytelling práctico",
  heroImage = "",
  layoutOption = "B",
  baseFontSize = 18,
  awarenessImage = "",
  considerationImage = "",
  conversionImage = "",
  postImage = "",
}: Page2Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"
  const [showFlashcards, setShowFlashcards] = useState(false)

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm3s1-page2-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
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
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isA]
  )

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)))

  const breatheAnim = {
    scale: [1, 1.06, 1],
    filter: ["brightness(1)", "brightness(1.06)", "brightness(1)"],
  }

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
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.p
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 2.5,
                    fontWeight: 800,
                    lineHeight: 1.2,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6, #60A5FA)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer-title 3s ease infinite",
                    filter: "drop-shadow(0 2px 8px rgba(30, 64, 175, 0.3))",
                  }}
                >
                  {topicTitle}
                </motion.p>
              </motion.div>

              {/* Flashcard Toggle Button */}
              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <motion.button
                  onClick={() => setShowFlashcards(!showFlashcards)}
                  style={{
                    padding: "14px 28px",
                    borderRadius: 14,
                    border: "none",
                    background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: fs * 1.0,
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(14, 165, 233, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{showFlashcards ? "📚" : "🎴"}</span>
                  <span>{showFlashcards ? "Ocultar Conceptos Clave" : "Ver Conceptos Clave"}</span>
                </motion.button>
              </motion.div>

              {/* Flashcards */}
              {showFlashcards && (
                <motion.div 
                  variants={itemVar} 
                  style={{ marginBottom: 24 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 18,
                  }}>
                    {[
                      { color: "#0ea5e9", icon: "💬", term: "Gestión de interacción", desc: "Responder con calidez, cada DM/comentario es una micro-experiencia" },
                      { color: "#06b6d4", icon: "📊", term: "Métricas de coherencia", desc: "Retención, guardados y tiempo de visualización" },
                      { color: "#3b82f6", icon: "📖", term: "Storytelling", desc: "Hook → Contexto → Acción → Resultado → CTA" },
                      { color: "#8b5cf6", icon: "🛡️", term: "Confianza", desc: "Transparencia + evidencia + consistencia" },
                    ].map((card, idx) => (
                      <motion.div
                        key={idx}
                        style={{
                          background: `linear-gradient(135deg, ${card.color}15, ${card.color}05)`,
                          border: `2px solid ${card.color}40`,
                          borderRadius: 20,
                          padding: 24,
                          boxShadow: `0 8px 24px ${card.color}20`,
                          minHeight: 180,
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        transition={{ delay: idx * 0.1, type: "spring", stiffness: 300 }}
                      >
                        <div style={{ fontSize: 40, marginBottom: 12, textAlign: "center" }}>{card.icon}</div>
                        <h3 style={{ margin: "0 0 12px 0", color: card.color, fontSize: fs * 1.3, fontWeight: 800, textAlign: "center" }}>
                          {card.term}
                        </h3>
                        <p style={{ margin: 0, opacity: 0.9, fontSize: fs * 1.0, lineHeight: 1.6, textAlign: "center" }}>{card.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {heroImage ? (
                <motion.div
                  variants={itemVar}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden" as const,
                    boxShadow: "0 18px 60px rgba(0,0,0,0.12)",
                    marginTop: 16,
                    marginBottom: 18,
                  }}
                >
                  <img
                    src={heroImage}
                    alt="Sección 1"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block" as const,
                    }}
                  />
                </motion.div>
              ) : null}

              <motion.div variants={itemVar} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
                    border: "2px solid #bae6fd",
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: "0 12px 40px rgba(14, 165, 233, 0.12)",
                  }}
                >
                  <motion.h3
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      margin: "0 0 20px 0",
                      fontSize: fs * 1.5,
                      background: "linear-gradient(135deg, #0369a1, #0284c7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800,
                    }}
                  >
                    💡 Claves de confianza, coherencia e historias que conectan
                  </motion.h3>

                  <MetricRow
                    title="Gestión de interacción"
                    items={[
                      "Responder con calidez y resolver dudas; cada DM/comentario es una micro-experiencia.",
                      "Críticas válidas: agradecer, corregir y documentar el aprendizaje.",
                    ]}
                    imageSrc={awarenessImage}
                    primaryColor={primaryColor}
                    fs={fs}
                    reverse={false}
                  />

                  <MetricRow
                    title="Métricas que hablan de coherencia"
                    items={[
                      "Retención y recompra/renovación (cuando aplique).",
                      "Guardados, respuestas en historias, tiempo de visualización.",
                      "¿Tu promesa coincide con lo que la gente experimenta?",
                    ]}
                    imageSrc={considerationImage}
                    primaryColor={primaryColor}
                    fs={fs}
                    reverse={true}
                  />

                  <MetricRow
                    title="Storytelling práctico"
                    items={[
                      "Hook → Contexto → Acción → Resultado → CTA.",
                      "Muestra errores y aprendizajes (con intención).",
                      "Usa metáforas para explicar lo complejo.",
                    ]}
                    imageSrc={conversionImage}
                    primaryColor={primaryColor}
                    fs={fs}
                    reverse={false}
                  />

                  <MetricRow
                    title="Confianza y coherencia"
                    items={[
                      "Transparencia + evidencia + consistencia.",
                      "Calendario + backlog + guía de marca.",
                      "Responde bien a críticas; mide lo que importa.",
                    ]}
                    imageSrc={postImage}
                    primaryColor={primaryColor}
                    fs={fs}
                    reverse={true}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

type Question = {
  text: string
  options: string[]
  correct: number
  ref?: string
}

const QUESTIONS: Question[] = [
  {
    text: "Para viralidad orgánica con videos cortos, la plataforma más adecuada suele ser:",
    options: ["Instagram", "TikTok", "YouTube", "Twitch"],
    correct: 1,
    ref: "TikTok prioriza retención temprana y finalización; distribuye por rendimiento, no solo por seguidores.",
  },
  {
    text: "¿Qué formato es nativo de YouTube para videos cortos verticales?",
    options: ["Reels", "Shorts", "Stories", "Clips"],
    correct: 1,
    ref: "YouTube Shorts compite con Reels y TikTok. Útil para descubrimiento; el long-form construye profundidad y SEO.",
  },
  {
    text: "Para tutoriales largos y educativos, la mejor plataforma es:",
    options: ["TikTok", "Instagram", "YouTube", "Twitch"],
    correct: 2,
    ref: "YouTube favorece contenido evergreen con búsquedas, capítulos y recomendaciones.",
  },
  {
    text: "Elige la asociación correcta plataforma → contenido ideal:",
    options: [
      "TikTok → Streams largos en vivo.",
      "Instagram → Reels y carouseles estéticos.",
      "YouTube → Memes de 5 segundos.",
      "Twitch → Solo publicaciones estáticas.",
    ],
    correct: 1,
    ref: "Cada red tiene formatos/culturas. Adaptar creatividades maximiza el rendimiento.",
  },
  {
    text: "Ventaja clave de Twitch para marcas:",
    options: [
      "Interacción en tiempo real con comunidades específicas.",
      "Mejor SEO que YouTube.",
      "Solo sirve para anuncios pagados.",
      "No permite integración con la audiencia.",
    ],
    correct: 0,
    ref: "En vivo hay diálogo, preguntas y demostraciones; ideal para lanzamientos y activaciones con nichos.",
  },
  {
    text: "Una universidad quiere promocionar un evento estudiantil con urgencia:",
    options: [
      "Publicación de blog de 2,000 palabras.",
      "Instagram Stories con cuenta regresiva y links.",
      "Video largo en YouTube.",
      "Nota de prensa impresa.",
    ],
    correct: 1,
    ref: "Stories son ligeras, urgentes y ubicuas; las cuentas regresivas y links facilitan la asistencia.",
  },
  {
    text: "¿Qué error reduce resultados al publicar en varias plataformas?",
    options: [
      "Adaptar formato, duración y CTA a cada red.",
      "Usar el mismo video sin ajustar duración/ratio/estilo.",
      "Medir métricas nativas de cada plataforma.",
      "Contextualizar el copy según audiencia.",
    ],
    correct: 1,
    ref: "El ‘copy-paste’ ignora hábitos por plataforma y suele penalizar el alcance.",
  },
  {
    text: "En TikTok, una métrica crítica para el algoritmo es:",
    options: [
      "Retención y reproducción completa.",
      "Cantidad de hashtags sin relación.",
      "Número total de publicaciones históricas.",
      "Uso de música aleatoria sin contexto.",
    ],
    correct: 0,
    ref: "Los primeros segundos mandan: hook claro, cortes dinámicos y subtítulos aumentan la retención.",
  },
  {
    text: "En Instagram, los carouseles funcionan bien para:",
    options: [
      "Explicar procesos paso a paso y educar.",
      "Solo publicar memes.",
      "Transmisiones largas en vivo.",
      "Contenido puramente de texto.",
    ],
    correct: 0,
    ref: "El storytelling en secuencia favorece guardados y mejor distribución por señales de valor.",
  },
  {
    text: "En YouTube, para mejorar descubrimiento orgánico se recomienda:",
    options: [
      "Títulos claros con keywords, buena miniatura y descripción.",
      "Publicar sin título para no sesgar al algoritmo.",
      "Evitar listas de reproducción.",
      "No usar etiquetas ni capítulos.",
    ],
    correct: 0,
    ref: "Miniaturas con contraste y emoción elevan CTR; capítulos y descripciones ricas ayudan al SEO.",
  },
  {
    text: "Stories es un formato...",
    options: [
      "Temporal de 24 horas con alta inmediatez.",
      "De video largo con SEO elevado.",
      "Solo para desktop.",
      "Exclusivo de Twitch.",
    ],
    correct: 0,
    ref: "Su naturaleza efímera fomenta la interacción rápida (encuestas, preguntas, sliders).",
  },
  {
    text: "Marca de maquillaje que busca demos visuales:",
    options: [
      "YouTube con tutoriales detallados.",
      "Twitch con documentos PDF.",
      "X (Twitter) con hilos largos solamente.",
      "Solo newsletters por email.",
    ],
    correct: 0,
    ref: "Los tutoriales permiten ver el ‘antes y después’ con claridad, aumentando confianza e intención de compra.",
  },
  {
    text: "Si quieres alcance rápido con bajo presupuesto, prioriza:",
    options: ["YouTube", "TikTok", "Instagram", "Twitch"],
    correct: 1,
    ref: "El sistema de distribución de TikTok empuja contenido por rendimiento, incluso en cuentas nuevas.",
  },
  {
    text: "Para construir comunidad con interacción directa y donaciones del público, usa:",
    options: ["Instagram", "YouTube Shorts", "Twitch", "TikTok"],
    correct: 2,
    ref: "Twitch ofrece chat, suscripciones y donaciones en tiempo real para comunidades unidas.",
  },
  {
    text: "¿Qué afirmación es falsa?",
    options: [
      "Cada plataforma tiene públicos y formatos diferentes.",
      "El éxito depende solo de la plataforma, no del contenido.",
      "Es clave adaptar mensajes y creatividades.",
      "Medir métricas nativas ayuda a iterar mejor.",
    ],
    correct: 1,
    ref: "El contenido adaptado al canal y público es la base; la plataforma es el medio, no el fin.",
  },
]

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
  videoFile?: string
  videoUrl?: string
  videoPoster?: string
  videoAutoplay?: boolean
  videoControls?: boolean
  videoLoop?: boolean
  videoMuted?: boolean
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: unknown, correctAnswer: unknown, isCorrect: boolean) => void
  onQuizComplete?: (score: number) => void
  isAlreadyCompleted?: boolean
  completedScore?: number
}

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
  auditChecklist?: string[]
  signalChecklist?: string[]
  touchpointQuestions?: { label: string; question: string }[]
  reminders?: string[]
}

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
  actionPlan?: { horizon: string; items: string[] }[]
  followUpTemplate?: string[]
  metrics?: string[]
  closingCTA?: string
}

function Page3({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 60,
  title = "",
  topicTitle = "Plataformas y formatos",
  layoutOption = "A",
  baseFontSize = 18,
  videoFile = "",
  videoUrl = "",
  videoPoster = "",
  videoAutoplay = false,
  videoControls = true,
  videoLoop = false,
  videoMuted = true,
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: Page3Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"
  
  console.log("Page3 (M3S1P4) - hasOnAnswerSubmit:", !!onAnswerSubmit, "hasOnQuizComplete:", !!onQuizComplete, "isAlreadyCompleted:", isAlreadyCompleted)

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm3s1-page3-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
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
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isA]
  )

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)))

  const total = QUESTIONS.length
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(() => Array(total).fill(false))
  const [score, setScore] = useState(0)

  const q = QUESTIONS[idx]
  const safeOptions = Array.isArray(q?.options) ? q.options : []
  
  // Show "Already Completed" screen if quiz was already taken
  if (isAlreadyCompleted) {
    return (
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        background: 'linear-gradient(180deg, #FFFFFF, #F8FAFF)',
      }}>
        <div style={{
          maxWidth: 600,
          width: '100%',
          background: 'white',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: 20,
          padding: 40,
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16, color: primaryColor }}>
            Quiz Ya Completado
          </h2>
          <p style={{ fontSize: 18, color: '#666', marginBottom: 24 }}>
            Ya completaste este quiz. Los quizzes solo pueden realizarse una vez.
          </p>
          <div style={{
            padding: 20,
            background: `${primaryColor}15`,
            borderRadius: 14,
            marginBottom: 24,
          }}>
            <strong style={{ fontSize: 28, color: primaryColor }}>
              Tu puntuación: {completedScore ?? '?'} / {total}
            </strong>
          </div>
          <p style={{ fontSize: 16, color: '#999' }}>
            ✨ Continúa con el siguiente contenido
          </p>
        </div>
      </div>
    );
  }

  const handleSelect = (optionIndex: number) => {
    if (!q || optionIndex < 0 || optionIndex >= safeOptions.length || checked[idx]) return

    const isCorrect = optionIndex === q.correct
    
    setAnswers((prev) => {
      const next = [...prev]
      next[idx] = optionIndex
      return next
    })

    setChecked((prev) => {
      const next = [...prev]
      next[idx] = true
      return next
    })
    
    // Update score
    const newScore = score + (isCorrect ? 1 : 0)
    setScore(newScore)
    
    // Track answer submission FIRST
    if (onAnswerSubmit) {
      console.log(`Submitting answer ${idx}: option ${optionIndex}, correct=${q.correct}, isCorrect=${isCorrect}`)
      onAnswerSubmit(idx, q.text, q.options[optionIndex], q.options[q.correct], isCorrect)
    }

    // Auto-advance to next question after showing feedback
    setTimeout(() => {
      if (idx < total - 1) {
        setIdx((current) => current + 1)
      } else {
        // Quiz completed - wait a bit more to ensure last answer is tracked
        console.log("Last question answered, completing quiz with score:", newScore)
        setTimeout(() => {
          if (onQuizComplete) {
            onQuizComplete(newScore)
          }
        }, 100)
      }
    }, 1500) // Give time to see the feedback
  }

  const goPrev = () => setIdx((i) => Math.max(0, i - 1))
  const goNext = () => setIdx((i) => Math.min(total - 1, i + 1))

  const allAnswered = checked.every(Boolean)
  const wrongList = QUESTIONS.map((question, i) => ({
    i,
    question: question.text,
    correctText: question.options[question.correct],
    ref: question.ref,
    user: answers[i],
    isWrong: checked[i] && answers[i] !== question.correct,
  })).filter((entry) => entry.isWrong)

  const optStyle = (active: boolean): React.CSSProperties => ({
    padding: "18px 22px",
    borderRadius: 16,
    border: `2px solid ${active ? "#1e40af" : "rgba(30, 64, 175, 0.2)"}`,
    background: active 
      ? "linear-gradient(135deg, #1e40af, #3B82F6)" 
      : "linear-gradient(135deg, #ffffff, #f8fafc)",
    color: active ? "white" : "#1e40af",
    fontWeight: 800,
    fontSize: fs * 1.1,
    letterSpacing: 0.2,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "left",
    lineHeight: 1.5,
    boxShadow: active 
      ? "0 12px 32px rgba(30, 64, 175, 0.3), 0 4px 12px rgba(59, 130, 246, 0.2)" 
      : "0 4px 12px rgba(0, 0, 0, 0.08)",
    transform: "scale(1)",
    transition: "all 0.3s ease",
  })

  const resetQuiz = () => {
    setIdx(0)
    setAnswers(Array(total).fill(null))
    setChecked(Array(total).fill(false))
    setScore(0)
  }

  const breathing = {
    scale: [1, 1.06, 1],
    transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" as const },
  }

  const effectiveVideoSrc =
    (videoFile && String(videoFile).trim()) || (videoUrl && String(videoUrl).trim()) || ""

  return (
    <div style={wrapper}>
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
                <motion.p
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 2.5,
                    fontWeight: 800,
                    lineHeight: 1.2,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6, #60A5FA)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer-title 3s ease infinite",
                    filter: "drop-shadow(0 2px 8px rgba(30, 64, 175, 0.3))",
                  }}
                >
                  {topicTitle}
                </motion.p>
              </motion.div>

              {effectiveVideoSrc && (
                <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                  <Card glow={primaryColor}>
                    <video
                      src={effectiveVideoSrc}
                      poster={videoPoster || undefined}
                      autoPlay={videoAutoplay}
                      controls={videoControls}
                      loop={videoLoop}
                      muted={videoMuted}
                      playsInline
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block" as const,
                        borderRadius: 12,
                        outline: "none",
                      }}
                    />
                  </Card>
                </motion.div>
              )}

              <motion.div 
                variants={itemVar}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.div
                  style={{
                    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                    borderRadius: 24,
                    border: "2px solid #bae6fd",
                    padding: 32,
                    boxShadow: "0 12px 40px rgba(59, 130, 246, 0.15)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 24,
                      padding: "16px 20px",
                      background: "rgba(255, 255, 255, 0.8)",
                      borderRadius: 16,
                      border: "2px solid #bfdbfe"
                    }}
                  >
                    <strong style={{ 
                      fontSize: fs * 1.6,
                      background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800
                    }}>
                      Pregunta {Math.min(idx + 1, total)} / {total}
                    </strong>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ 
                        width: 240, 
                        height: 12, 
                        background: "rgba(30, 64, 175, 0.1)", 
                        borderRadius: 999, 
                        overflow: "hidden" 
                      }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.round(((idx + 1) / total) * 100)}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{ 
                            height: "100%", 
                            background: "linear-gradient(90deg, #1e40af, #3B82F6)",
                            borderRadius: 999 
                          }} 
                        />
                      </div>
                      <span style={{ 
                        fontSize: fs * 1.1,
                        color: "#1e40af",
                        fontWeight: 700 
                      }}>
                        {Math.round(((idx + 1) / total) * 100)}%
                      </span>
                    </div>
                  </div>

                  <p style={{ 
                    margin: "16px 0 28px", 
                    lineHeight: 1.7, 
                    fontSize: fs * 1.6,
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "#1e40af"
                  }}>
                    {q?.text ?? ""}
                  </p>

                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr", 
                    gap: 16, 
                    marginBottom: 20 
                  }}>
                    {safeOptions.map((opt, i) => {
                      const active = answers[idx] === i
                      return (
                        <motion.div
                          key={i}
                          role="button"
                          whileHover={checked[idx] ? {} : { scale: 1.03, y: -2 }}
                          whileTap={checked[idx] ? {} : { scale: 0.98 }}
                          onClick={checked[idx] ? undefined : () => handleSelect(i)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: checked[idx] ? 0.8 : 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                          style={{
                            ...optStyle(active),
                            cursor: checked[idx] ? "default" : "pointer",
                          }}
                        >
                          <strong style={{ display: "inline-block", marginRight: 8 }}>
                            {String.fromCharCode(65 + i)})
                          </strong>
                          {opt}
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Feedback section */}
                  {checked[idx] && q && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ 
                        padding: 18, 
                        borderRadius: 16, 
                        background: answers[idx] === q.correct 
                          ? "linear-gradient(135deg, #d1fae5, #a7f3d0)" 
                          : "linear-gradient(135deg, #fee2e2, #fecaca)", 
                        border: `2px solid ${answers[idx] === q.correct ? "#10b981" : "#ef4444"}`,
                        marginBottom: 16, 
                        minHeight: 50,
                        boxShadow: answers[idx] === q.correct 
                          ? "0 8px 24px rgba(16, 185, 129, 0.2)"
                          : "0 8px 24px rgba(239, 68, 68, 0.2)"
                      }}
                    >
                      <strong style={{ 
                        color: answers[idx] === q.correct ? "#047857" : "#991b1b",
                        fontSize: fs * 1.2,
                        fontWeight: 800
                      }}>
                        {answers[idx] === q.correct ? (
                          <>✅ ¡Correcto!</>
                        ) : (
                          <>
                            ❌ Incorrecto. La respuesta correcta es: <strong>{q.options[q.correct]}</strong>
                          </>
                        )}
                      </strong>
                    </motion.div>
                  )}

                  <div
                    style={{
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "flex-end" as const,
                      gap: 12,
                      marginTop: 6,
                    }}
                  >
                    <span style={{ opacity: 0.8, fontSize: fs * 0.95 }}>
                      {checked.filter(Boolean).length}/{total} respondidas
                    </span>
                  </div>

                  {allAnswered ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ 
                        marginTop: 24, 
                        padding: 24, 
                        borderRadius: 20, 
                        background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                        border: "3px solid #fbbf24",
                        boxShadow: "0 12px 40px rgba(251, 191, 36, 0.3)",
                        textAlign: "center"
                      }}
                    >
                      <strong style={{ 
                        fontSize: fs * 1.8,
                        background: "linear-gradient(135deg, #92400e, #b45309)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontWeight: 900,
                        display: "block",
                      }}>
                        🎉 Resultado: {score} / {total}
                      </strong>
                    </motion.div>
                  ) : null}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

function Page4({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 80,
  title = "",
  topicTitle = "Checklist de confianza: audita tus puntos de contacto",
  layoutOption = "B",
  baseFontSize = 18,
  auditChecklist = [
    "Confirma que la promesa principal es idéntica en web, landing, redes y deck comercial.",
    "Verifica que los CTA conducen al mismo destino con el copy actualizado.",
    "Revisa horarios, tiempos de respuesta y políticas visibles en cada canal.",
    "Valida que testimonios y casos tienen fecha, contexto y refuerzan la promesa.",
    "Simula una primera interacción (DM, formulario, correo) y comprueba que el tono sea consistente.",
  ],
  signalChecklist = [
    "Incluye indicadores tangibles (clientes, métricas, certificaciones) en la parte superior.",
    "Resalta garantías, políticas y procesos visibles desde el primer scroll.",
    "Añade prueba social fresca (menos de 6 meses) a cada página clave.",
    "Muestra fotografías o videos reales del equipo o del proceso para humanizar.",
  ],
  touchpointQuestions = [
    { label: "Redes sociales", question: "¿La bio y los destacados repiten la misma promesa y CTA?" },
    { label: "Sitio / landing", question: "¿Hay coherencia entre hero, testimonios y CTA final?" },
    { label: "Newsletter / email", question: "¿El asunto y el primer párrafo explican el valor sin ambigüedad?" },
    { label: "Soporte / atención", question: "¿Las respuestas automáticas usan el mismo tono y expectativas de servicio?" },
  ],
  reminders = [
    "Documenta hallazgos en un tablero compartido para asignar responsables.",
    "Programa revisiones mensuales; la coherencia se erosiona con pequeños cambios aislados.",
    "Cierra cada punto de contacto con el mismo CTA para reforzar el siguiente paso.",
  ],
}: Page4Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects for Page4 ONLY
  React.useEffect(() => {
    const styleId = 'm3s1-page4-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
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
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isA]
  )

  return (
    <div style={wrapper}>
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
        <section style={{ flex: 1 }}>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.p
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 2.5,
                    fontWeight: 800,
                    lineHeight: 1.2,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6, #60A5FA)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer-title 3s ease infinite",
                    filter: "drop-shadow(0 2px 8px rgba(30, 64, 175, 0.3))",
                  }}
                >
                  {topicTitle}
                </motion.p>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  style={{
                    background: "linear-gradient(135deg, #e0f2fe, #bae6fd)",
                    borderRadius: 20,
                    border: "2px solid #7dd3fc",
                    padding: 24,
                    boxShadow: "0 12px 40px rgba(14, 165, 233, 0.15)",
                  }}
                >
                  <h3 style={{ margin: "0 0 12px 0", fontSize: fs * 1.355, color: "#0369a1" }}>✔️ Checklist express (5 minutos)</h3>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: fs, lineHeight: 1.5 }}>
                    {auditChecklist.map((item, index) => (
                      <li key={`audit-${index}`} style={{ marginBottom: 8 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  style={{
                    background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                    borderRadius: 20,
                    border: "2px solid #fbbf24",
                    padding: 24,
                    boxShadow: "0 12px 40px rgba(251, 191, 36, 0.15)",
                  }}
                >
                  <h3 style={{ margin: "0 0 12px 0", fontSize: fs * 1.355, color: "#92400e" }}>📊 Señales visibles de confianza</h3>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: fs, lineHeight: 1.5 }}>
                    {signalChecklist.map((item, index) => (
                      <li key={`signal-${index}`} style={{ marginBottom: 8 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  style={{
                    background: "linear-gradient(135deg, #ddd6fe, #c4b5fd)",
                    borderRadius: 20,
                    border: "2px solid #a78bfa",
                    padding: 24,
                    boxShadow: "0 12px 40px rgba(139, 92, 246, 0.15)",
                  }}
                >
                  <h3 style={{ margin: "0 0 12px 0", fontSize: fs * 1.355, color: "#6b21a8" }}>💬 Preguntas por punto de contacto</h3>
                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: 12,
                    }}
                  >
                    {touchpointQuestions.map((item, index) => (
                      <motion.div
                        key={`touchpoint-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        style={{
                          border: "2px solid #c4b5fd",
                          borderRadius: 12,
                          padding: 16,
                          background: "#faf5ff",
                          boxShadow: "0 8px 20px rgba(139, 92, 246, 0.1)",
                        }}
                      >
                        <strong style={{ display: "block" as const, marginBottom: 8, color: "#6b21a8", fontSize: fs * 1.1 }}>
                          {item.label}
                        </strong>
                        <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.5, fontSize: fs * 0.95 }}>{item.question}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVar}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  style={{
                    background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                    borderRadius: 20,
                    border: "2px solid #10b981",
                    padding: 24,
                    boxShadow: "0 12px 40px rgba(16, 185, 129, 0.15)",
                  }}
                >
                  <h3 style={{ margin: "0 0 12px 0", fontSize: fs * 1.35, color: "#047857" }}>📝 Recuerda documentar</h3>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: fs, lineHeight: 1.5 }}>
                    {reminders.map((item, index) => (
                      <li key={`reminder-${index}`} style={{ marginBottom: 8 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

function Page5({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 100,
  title = "",
  topicTitle = "Plan de acción y seguimiento",
  layoutOption = "B",
  baseFontSize = 18,
  actionPlan = [
    {
      horizon: "Próximos 7 días",
      items: [
        "Define el mensaje núcleo y ajusta copys en bio, landing y deck.",
        "Recupera 3 testimonios recientes con contexto verificable.",
        "Diseña respuesta base para nuevos contactos y consultas frecuentes.",
      ],
    },
    {
      horizon: "30 días",
      items: [
        "Publica un caso o demo que muestre el proceso paso a paso.",
        "Implementa seguimiento automático (email/DM) con aporte de valor.",
        "Recopila feedback post-interacción y clasifícalo en aprendizajes.",
      ],
    },
    {
      horizon: "60-90 días",
      items: [
        "Revisa métricas de confianza (NPS, referidos, tiempos de respuesta).",
        "Actualiza material comercial con aprendizajes y nuevas pruebas sociales.",
        "Escala la coherencia al equipo: guidelines, ejemplos y sesiones de revisión.",
      ],
    },
  ],
  followUpTemplate = [
    "Asunto: Re: [tema específico]",
    "Hola [nombre], gracias por tu tiempo en [referencia concreta].",
    "Como acordamos, adjunto [recurso] que resume cómo podríamos ayudarte.",
    "Si te parece, propongo una llamada de 20 minutos esta semana para resolver dudas.",
    "¿Te funciona martes o jueves por la mañana?",
    "Gracias nuevamente, quedo atento. — [firma]",
  ],
  metrics = [
    "Tasa de respuesta al primer mensaje o correo.",
    "Tiempo promedio de respuesta en DM / email.",
    "Encuesta corta post interacción (NPS o emoji rating).",
    "Número de recomendaciones o referidos generados al mes.",
  ],
  closingCTA = "Bloquea una revisión trimestral del journey completo y comparte aprendizajes con el equipo.",
}: Page5Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))
  const followUpMessage = followUpTemplate.join("\n")
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [expandedMetrics, setExpandedMetrics] = useState<string[]>([])

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm3s1-page5-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
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
      background: "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)",
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs * 1.33,
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

  return (
    <div style={wrapper}>
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
        <section style={{ flex: 1 }}>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.p
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 2.5,
                    fontWeight: 800,
                    lineHeight: 1.2,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6, #60A5FA)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer-title 3s ease infinite",
                    filter: "drop-shadow(0 2px 8px rgba(30, 64, 175, 0.3))",
                  }}
                >
                  {topicTitle}
                </motion.p>
              </motion.div>

              {/* Interactive Action Plan Timeline */}
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #f0f9ff)",
                    borderRadius: 24,
                    border: "2px solid #bfdbfe",
                    padding: 32,
                    boxShadow: "0 12px 40px rgba(59, 130, 246, 0.15)",
                  }}
                >
                  <motion.h3 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                      margin: "0 0 24px 0", 
                      fontSize: fs * 1.6,
                      background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800 
                    }}
                  >
                    📅 Plan 7 · 30 · 90
                  </motion.h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {actionPlan.map((segment, index) => {
                      const colors = [
                        { bg: "linear-gradient(135deg, #dbeafe, #bfdbfe)", border: "#3B82F6", icon: "🚀" },
                        { bg: "linear-gradient(135deg, #e0e7ff, #c7d2fe)", border: "#6366f1", icon: "📈" },
                        { bg: "linear-gradient(135deg, #fef3c7, #fde68a)", border: "#f59e0b", icon: "🎯" },
                      ]
                      const color = colors[index]
                      const isExpanded = selectedPlan === index
                      
                      return (
                        <motion.div
                          key={`plan-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          style={{
                            border: `3px solid ${color.border}`,
                            borderRadius: 20,
                            overflow: "hidden",
                            background: color.bg,
                            boxShadow: isExpanded ? "0 16px 48px rgba(59, 130, 246, 0.25)" : "0 8px 24px rgba(59, 130, 246, 0.1)",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                          }}
                          onClick={() => setSelectedPlan(isExpanded ? null : index)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "20px 24px",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: "50%",
                                  background: color.border,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 24,
                                }}
                              >
                                {color.icon}
                              </motion.div>
                              <div>
                                <strong style={{ 
                                  display: "block", 
                                  fontSize: fs * 1.3, 
                                  color: "#1e293b",
                                  marginBottom: 4 
                                }}>
                                  {segment.horizon}
                                </strong>
                                <span style={{ fontSize: fs * 0.9, color: "#64748b" }}>
                                  {isExpanded ? "Click para colapsar" : "Click para expandir"}
                                </span>
                              </div>
                            </div>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              style={{
                                fontSize: 24,
                                color: color.border,
                                fontWeight: "bold",
                              }}
                            >
                              ▼
                            </motion.div>
                          </div>
                          
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{
                                padding: "0 24px 24px 88px",
                                background: "rgba(255, 255, 255, 0.5)",
                              }}
                            >
                              <ul style={{ margin: 0, paddingLeft: 20, fontSize: fs, lineHeight: 1.8 }}>
                                {segment.items.map((item, itemIndex) => (
                                  <motion.li
                                    key={`plan-${index}-${itemIndex}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: itemIndex * 0.05 }}
                                    style={{ 
                                      marginBottom: 12,
                                      color: "#334155",
                                      listStyle: "none",
                                      position: "relative",
                                      paddingLeft: 8,
                                    }}
                                  >
                                    <span style={{
                                      position: "absolute",
                                      left: -20,
                                      color: color.border,
                                      fontWeight: "bold",
                                    }}>•</span>
                                    {item}
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <Card glow={primaryColor}>
                  <h3 style={{ margin: "0 0 12px 0", fontSize: fs * 1.355 }}>Plantilla de seguimiento</h3>
                  <p style={{ margin: "0 0 12px 0", opacity: 0.85 }}>
                    Usa esta estructura si no recibes respuesta en 3–5 días. Personaliza cada bloque con datos reales.
                  </p>
                  <div
                    style={{
                      borderRadius: 12,
                      border: `1px solid ${primaryColor}22`,
                      background: "#f8fafc",
                      padding: 16,
                      fontFamily:
                        "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
                      whiteSpace: "pre-line",
                      fontSize: fs * 0.9,
                      lineHeight: 1.5,
                      color: "#0f172a",
                    }}
                  >
                    {followUpMessage}
                  </div>
                </Card>
              </motion.div>

              {/* Interactive Metrics Section */}
              <motion.div variants={itemVar}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #f0fdf4)",
                    borderRadius: 24,
                    border: "2px solid #86efac",
                    padding: 32,
                    boxShadow: "0 12px 40px rgba(34, 197, 94, 0.15)",
                  }}
                >
                  <motion.h3 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                      margin: "0 0 24px 0", 
                      fontSize: fs * 1.6,
                      background: "linear-gradient(135deg, #059669, #10b981)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800 
                    }}
                  >
                    📊 Indicadores para monitorear confianza
                  </motion.h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                    {metrics.map((item, index) => (
                      <motion.div
                        key={`metric-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 8 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "16px 20px",
                          borderRadius: 16,
                          background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                          border: "2px solid #6ee7b7",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onClick={() => {
                          setExpandedMetrics(prev => 
                            prev.includes(`metric-${index}`)
                              ? prev.filter(m => m !== `metric-${index}`)
                              : [...prev, `metric-${index}`]
                          )
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #059669, #10b981)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: fs * 0.9,
                            flexShrink: 0,
                          }}
                        >
                          {index + 1}
                        </div>
                        <span style={{ fontSize: fs * 1.05, color: "#064e3b", fontWeight: 500 }}>
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{
                      padding: "24px",
                      borderRadius: 16,
                      border: "2px dashed #10b981",
                      background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
                      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.1)",
                    }}
                  >
                    <strong style={{ display: "block", fontSize: fs * 1.15, color: "#065f46", marginBottom: 8 }}>
                      💡 {closingCTA}
                    </strong>
                    <span style={{ fontSize: fs, color: "#047857", opacity: 0.9 }}>
                      Documenta hallazgos y llévalos a la retro semanal para mantener la coherencia.
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

function WelcomePage() {
  return (
    <BSMXWelcomeM1
      brandName="BIZEN"
      logoSrc="/bizen-mondragonlogo.png"
      primaryColor="#0F62FE"
      background="linear-gradient(180deg, #FFFFFF, #F8FAFF)"
      title="Bienvenido al Módulo 3"
      moduleLabel="Módulo 3 · Sección 1"
      layoutOption="B"
      progressPercent={0}
      heroImage="/M3 cover.png"
      syllabus={[
        "Mapearás señales de confianza en cada punto de contacto.",
        "Verás cómo mantener coherencia visual, verbal y operativa.",
        "Definirás evidencias y procesos que reducen riesgo percibido.",
      ]}
    />
  )
}

const M3S1_CONTENT: Record<number, React.ReactNode> = {
  1: <WelcomePage />,
  2: <Page1 />,
  3: <Page2 />,
  4: <Page3 />,
  5: <Page4 />,
  6: <Page5 />,
}

export default M3S1_CONTENT

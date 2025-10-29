/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useMemo, useState, useEffect } from "react"
import { motion, Variants } from "framer-motion"
import SectionPageHeader from "@/components/bizen/SectionPageHeader"
import { useQuizPersistence } from "@/hooks/useQuizPersistence"
import MarketingFactsAnimation from "@/components/MarketingFactsAnimation"

type LayoutOption = "A" | "B"

const TOTAL_PAGES = 5
const progressForPage = (page: number) => Math.round((page / TOTAL_PAGES) * 100)

export type BSMXSection1Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number // 0-100
  title?: string
  topicTitle?: string
  introText?: string
  bullets?: string[]
  keyIdea?: string
  awarenessItems?: string[]
  considerationItems?: string[]
  conversionItems?: string[]
  commonFormats?: string[]
  accordionTitle?: string
  entertainmentText?: string
  educationText?: string
  empathyText?: string
  evidenceText?: string
  heroImage?: string
  layoutOption?: LayoutOption // "A" = full width, "B" = 1200 centered
  baseFontSize?: number // tamaño base en px
}

const containerVar: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, ease: "easeOut" },
  },
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

/** AccordionItem con hover/press */
function AccordionItem({
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
        onClick={() => setOpen(v => !v)}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        whileHover={{ scale: 0.9, y: -1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: "100%",
          textAlign: "left" as const,
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
        <span
          style={{
            textDecoration: hover ? "underline" : "none",
            textUnderlineOffset: 3,
          }}
        >
          {title}
        </span>

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
          transition: "max-height .25s ease, opacity .25s ease, padding .25s ease, background-color .18s ease",
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

function BSMXSection1({
    brandName = "BIZEN",
    logoSrc = "/bizen-mondragonlogo.png",
    primaryColor = "#0F62FE",
    background = "#FFFFFF",
  progressPercent = progressForPage(1),
  title = "Sección 1",
  topicTitle = "Identidad digital: Propuesta de valor, Bio, Tono y CTA",
  introText = "Tu identidad digital empieza por lo que prometes y a quién se lo prometes. Lo visual ayuda a recordar, pero la propuesta de valor es lo que hace que te elijan. Si tu bio termina con una acción clara, reduces fricción.",
  bullets = [
    "Lo visual ayuda a recordar, pero la propuesta de valor es lo que hace que te elijan.",
    "Si tu bio termina con una acción clara, reduces fricción.",
  ],
  keyIdea = "Propuesta de valor: qué problema resuelves y para quién.",
  awarenessItems = ["qué problema resuelves y para quién"],
  considerationItems = ["presentación breve + forma de contacto"],
  conversionItems = ["cómo suenas (cercano, directo, didáctico)"],
  commonFormats = ["acción concreta para el lector (escríbeme, agenda)"],
  accordionTitle = "Bio útil y errores a evitar",
  entertainmentText = "\"Explico finanzas a principiantes. ¿Tesis? Escríbeme y te guío.\"",
  educationText = "• Logos sin estrategia.",
  empathyText = "• Textos largos en bio.",
  evidenceText = "• Colores que dificulten leer.",
  heroImage = "",
  layoutOption = "A",
  baseFontSize = 18,
}: BSMXSection1Props) {
  const fs = Math.max(12, baseFontSize || 18)

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s1-page1-shimmer-effects';
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

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  return (
    <div style={wrapper}>
      <main style={{ width: "100%" }}>
        <div style={{ ...container, paddingTop: 12, paddingBottom: 12 }}>
          <SectionPageHeader
            brandName={brandName}
            logoSrc={logoSrc}
            primaryColor={primaryColor}
            logoHeight={84}
            progress={pct}
            background="transparent"
            borderColor="transparent"
            padding={0}
          />
        </div>

        {/* Contenido */}
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {/* Título + Tema */}
              <motion.div variants={itemVar} style={{ marginBottom: 12 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6, #60A5FA, #1e40af)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer-title 3s ease-in-out infinite",
                    filter: "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {title}
                </motion.h1>
                <motion.p 
                  style={{ margin: "6px 0 0", opacity: 0.9, fontSize: fs * 1.4 }}
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </motion.p>
              </motion.div>

              {/* Hero opcional */}
              {heroImage ? (
                <motion.div
                  variants={itemVar}
                  style={{
                    marginTop: 14,
                    marginBottom: 16,
                  }}
                >
                  <img src={heroImage} alt="Sección 1" style={{ width: "60%", maxWidth: "600px", height: "auto", display: "block", margin: "0 auto" }} />
                </motion.div>
              ) : null}

              {/* Introducción */}
              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <motion.div
                  whileHover={{ scale: 1.01, y: -2 }}
                  style={{
                    padding: "20px 24px",
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
                    border: `2px solid #00d4ff`,
                    boxShadow: `0 12px 40px rgba(0, 180, 216, 0.35), 0 4px 16px rgba(0, 119, 182, 0.2)`,
                    overflow: "hidden" as const,
                    position: "relative" as const,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16
                  }}
                >
                  <motion.div 
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
                      animation: "shimmer 2s linear infinite"
                    }} 
                  />
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                    style={{ 
                      fontSize: fs * 1.4,
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                      flexShrink: 0,
                      marginTop: 4
                    }}
                  >
                    💡
                  </motion.div>
                  <p style={{ 
                    margin: 0, 
                    position: "relative" as const,
                    zIndex: 1,
                    fontSize: fs * 1.05,
                    lineHeight: 1.6,
                    color: "white",
                    fontWeight: 500,
                    textShadow: "0 1px 2px rgba(0,0,0,0.15)"
                  }}>
                    {introText}
                  </p>
                </motion.div>
              </motion.div>

              {/* Puntos clave */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <h3 style={{ 
                  margin: "0 0 16px 0", 
                  fontSize: fs * 1.5,
                  fontWeight: 800,
                  color: "#1e40af"
                }}>
                  ⭐ Puntos clave
                </h3>
                <div style={{ display: "grid" as const, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
                  {(bullets || []).map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      whileHover={{ scale: 1.03, x: 8 }}
                      style={{
                        padding: 20,
                        borderRadius: 16,
                        background: "linear-gradient(135deg, #fff, #f0f7ff)",
                        border: `2px solid ${primaryColor}30`,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12
                      }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        style={{
                          fontSize: fs * 1.3,
                          minWidth: 32
                        }}
                      >
                        ✨
                      </motion.div>
                      <p style={{ 
                        margin: 0, 
                        fontSize: fs * 1.05,
                        lineHeight: 1.6,
                        color: "#1a1a1a",
                        fontWeight: 500
                      }}>
                        {b}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Idea clave */}
              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    border: `1px solid ${primaryColor}44`,
                    background: `${primaryColor}0F`,
                    color: "#111",
                    borderRadius: 16,
                    padding: 16,
                  }}
                >
                  <strong style={{ color: primaryColor, display: "block" as const, marginBottom: 6, fontSize: fs }}>
                    Idea clave
                  </strong>
                  <p style={{ margin: 0, opacity: 0.95, fontSize: fs }}>{keyIdea}</p>
                </div>
              </motion.div>

              {/* Piezas esenciales */}
              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: fs * 1.355, fontWeight: 700 }}>
                  Piezas esenciales de tu identidad digital{" "}
                  <span style={{ opacity: 0.7 }}>(define y comunica)</span>
                </h3>
                
                <div style={{ display: "grid" as const, gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
                  {/* Propuesta de valor */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    style={{
                      padding: 20,
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                      border: "2px solid #3B82F6",
                      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                      color: "white"
                    }}
                  >
                    <h4 style={{ margin: "0 0 8px 0", fontSize: fs * 1.2, fontWeight: 700 }}>
                      💎 Propuesta de valor
                    </h4>
                    <p style={{ margin: 0, fontSize: fs, opacity: 0.95 }}>
                      {(awarenessItems || []).join(", ")}.
                    </p>
                  </motion.div>

                  {/* Bio */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    style={{
                      padding: 20,
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                      border: "2px solid #0284c7",
                      boxShadow: "0 10px 30px rgba(2, 132, 199, 0.3)",
                      color: "white"
                    }}
                  >
                    <h4 style={{ margin: "0 0 8px 0", fontSize: fs * 1.2, fontWeight: 700 }}>
                      📝 Bio
                    </h4>
                    <p style={{ margin: 0, fontSize: fs, opacity: 0.95 }}>
                      {(considerationItems || []).join(", ")}.
                    </p>
                  </motion.div>

                  {/* Tono de voz */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    style={{
                      padding: 20,
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                      border: "2px solid #0891b2",
                      boxShadow: "0 10px 30px rgba(8, 145, 178, 0.3)",
                      color: "white"
                    }}
                  >
                    <h4 style={{ margin: "0 0 8px 0", fontSize: fs * 1.2, fontWeight: 700 }}>
                      🎤 Tono de voz
                    </h4>
                    <p style={{ margin: 0, fontSize: fs, opacity: 0.95 }}>
                      {(conversionItems || []).join(", ")}.
                    </p>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    style={{
                      padding: 20,
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                      border: "2px solid #0d9488",
                      boxShadow: "0 10px 30px rgba(13, 148, 136, 0.3)",
                      color: "white"
                    }}
                  >
                    <h4 style={{ margin: "0 0 8px 0", fontSize: fs * 1.2, fontWeight: 700 }}>
                      🎯 CTA
                    </h4>
                    <p style={{ margin: 0, fontSize: fs, opacity: 0.95 }}>
                      {(commonFormats || []).join(", ")}.
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Bio útil y errores */}
              <motion.div variants={itemVar} style={{ marginBottom: 12 }}>
                <Card glow={primaryColor}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: fs * 1.355, fontWeight: 700 }}>{accordionTitle}</h3>
                  <div style={{ display: "grid" as const, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <AccordionItem title="✅ Bio útil (ejemplo)" primaryColor="#10b981" fontSize={fs}>
                        <p style={{ margin: 0, opacity: 0.95, fontSize: fs }}>{entertainmentText}</p>
                      </AccordionItem>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <AccordionItem title="❌ Logos sin estrategia" primaryColor="#ef4444" fontSize={fs}>
                        <p style={{ margin: 0, opacity: 0.95, fontSize: fs }}>{educationText}</p>
                      </AccordionItem>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <AccordionItem title="❌ Textos largos en bio" primaryColor="#ef4444" fontSize={fs}>
                        <p style={{ margin: 0, opacity: 0.95, fontSize: fs }}>{empathyText}</p>
                      </AccordionItem>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <AccordionItem title="❌ Colores que dificulten leer" primaryColor="#ef4444" fontSize={fs}>
                        <p style={{ margin: 0, opacity: 0.95, fontSize: fs }}>{evidenceText}</p>
                      </AccordionItem>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  )
}

// ============================================================================
// Page 2: Pasos aplicables + Q&A
// ============================================================================

type BSMXSection1Page2Props = {
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

function Flashcard({
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
      onClick={() => setFlipped(v => !v)}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{
        userSelect: "none" as const,
        cursor: "pointer",
        borderRadius: 20,
        border: `2px solid ${flipped ? primaryColor : '#e5e7eb'}`,
        background: flipped 
          ? `linear-gradient(135deg, ${primaryColor}, #60A5FA)`
          : "linear-gradient(135deg, #ffffff, #f9fafb)",
        padding: 22,
        minWidth: 280,
        minHeight: 200,
        boxShadow: flipped 
          ? "0 20px 60px rgba(30, 64, 175, 0.3)"
          : "0 8px 24px rgba(0, 0, 0, 0.1)",
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 14,
        willChange: "transform",
        position: "relative" as const,
        overflow: "hidden" as const,
      }}
    >
      {flipped && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
            pointerEvents: "none" as const,
          }}
        />
      )}
      <strong
        style={{
          color: flipped ? "white" : primaryColor,
          display: "block" as const,
          fontSize: fontSize * 1.2,
          lineHeight: 1.3,
          fontWeight: 800,
          position: "relative" as const,
          zIndex: 1,
        }}
      >
        {front}
      </strong>
      <p
        style={{
          margin: 0,
          opacity: 0.95,
          fontSize: fontSize,
          lineHeight: 1.7,
          flex: 1,
          color: flipped ? "white" : "#374151",
          fontWeight: flipped ? 500 : 400,
          position: "relative" as const,
          zIndex: 1,
        }}
      >
        {flipped ? back : "👆 Toca para ver la respuesta"}
      </p>
      {!flipped && (
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            fontSize: fontSize * 1.5,
          }}
        >
          👆
        </motion.div>
      )}
    </motion.div>
  )
}

export function BSMXSection1Page2({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = progressForPage(2),
  title = "",
  topicTitle = "Pasos aplicables hoy + Q&A",
  heroImage = "",
  layoutOption = "B",
  baseFontSize = 18,
}: BSMXSection1Page2Props) {
  const fs = Math.max(12, baseFontSize || 18)

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s1-page2-shimmer-effects';
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
    [background, fs]
  )

  const container: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    []
  )

  return (
    <div style={wrapper}>
      <main
        style={{
          width: "100%",
          display: "flex" as const,
          flexDirection: "column" as const,
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={progressPercent}
          brandName={brandName}
          logoSrc={logoSrc || undefined}
        />
        {/* Contenido */}
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
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </motion.div>
              ) : null}

              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  style={{
                    background: "linear-gradient(135deg, #1e40af 0%, #3B82F6 100%)",
                    borderRadius: 16,
                    padding: 24,
                    boxShadow: "0 12px 40px rgba(30, 64, 175, 0.3)",
                  }}
                >
                  <h3 style={{ 
                    margin: "0 0 16px 0", 
                    fontSize: fs * 1.4,
                    color: "white",
                    fontWeight: 800
                  }}>
                    ✨ 3) Pasos aplicables hoy
                  </h3>
                  <ol style={{ 
                    margin: 0, 
                    paddingLeft: 28, 
                    lineHeight: 1.8, 
                    fontSize: fs * 1.05,
                    color: "white",
                    listStyleType: "decimal"
                  }}>
                    <li>Escribe tu propuesta de valor en una línea.</li>
                    <li>Edita tu bio para terminar en una acción clara.</li>
                    <li>Ajusta tu foto y portada para que sean legibles y coherentes.</li>
                    <li>Sube 1 ejemplo real (antes/después) con una breve explicación.</li>
                  </ol>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  style={{
                    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    borderRadius: 16,
                    padding: 24,
                    boxShadow: "0 12px 40px rgba(239, 68, 68, 0.3)",
                  }}
                >
                  <h3 style={{ 
                    margin: "0 0 16px 0", 
                    fontSize: fs * 1.4,
                    color: "white",
                    fontWeight: 800
                  }}>
                    ⚠️ Errores comunes
                  </h3>
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: 28, 
                    lineHeight: 1.8, 
                    fontSize: fs * 1.05,
                    color: "white",
                    listStyleType: "disc"
                  }}>
                    <li>Bio sin acción clara.</li>
                    <li>Colores que dificultan leer.</li>
                    <li>Cambiar de estilo cada semana sin motivo.</li>
                  </ul>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                    borderRadius: 16,
                    padding: 24,
                    boxShadow: "0 12px 40px rgba(14, 165, 233, 0.3)",
                  }}
                >
                  <h3 style={{ 
                    margin: "0 0 20px 0", 
                    fontSize: fs * 1.4,
                    color: "white",
                    fontWeight: 800
                  }}>
                    💬 4) Q&amp;A rápido (toca para ver)
                  </h3>
                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: 20,
                    }}
                  >
                    <Flashcard
                      front="¿Necesito logo?"
                      back="No. Empieza por tu propuesta de valor y una bio clara. El logo puede esperar."
                      primaryColor={primaryColor}
                      fontSize={fs}
                    />
                    <Flashcard
                      front="¿Puedo hablar de varios temas?"
                      back="Sí, pero dales un hilo común. Ej.: finanzas + productividad para estudiantes."
                      primaryColor={primaryColor}
                      fontSize={fs}
                    />
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

// ============================================================================
// Page 3: Quiz V/F - Identidad Digital
// ============================================================================

/* 15 afirmaciones (V/F) */
const DEFAULT_QUESTIONS = [
  { text: "Antes de diseñar el logo, debe definirse la propuesta de valor.", answer: true },
  { text: "La bio «Ayudo a pymes a decidir con datos. Agenda tu demo.» comunica mejor la propuesta de valor que las otras opciones.", answer: true },
  { text: "El propósito del tono de voz es guiar cómo hablas y escribes para generar reconocimiento.", answer: true },
  { text: "Usar una paleta y tipografía definidas ayuda a mantener la consistencia visual.", answer: true },
  { text: "Un portafolio breve que incluya antes/después, métricas y aprendizajes genera más confianza.", answer: true },
  { text: "Un CTA como «Escríbeme para cotizar» es adecuado en una bio profesional.", answer: true },
  { text: "La identidad digital debe verse idéntica en todas las plataformas, sin ningún ajuste de formato.", answer: false },
  { text: "El tono de voz ayuda a atraer al público adecuado y disuadir al que no encaja.", answer: true },
  { text: "Una bio efectiva debe evitar cualquier llamada a la acción para no parecer venta.", answer: false },
  { text: "La propuesta de valor solo describe tus habilidades internas y no considera al público objetivo.", answer: false },
  { text: "Usar ejemplos reales en el portafolio es mejor que usar imágenes genéricas.", answer: true },
  { text: "Una propuesta de valor efectiva puede formularse como «Ayudo a [público] a [resultado] con [método]».", answer: true },
  { text: "Una guía de estilo mínima puede incluir paleta de 3 colores, 1 tipografía y reglas de miniaturas.", answer: true },
  { text: "Un CTA claro es un elemento imprescindible en una bio efectiva.", answer: true },
  { text: "Mantener paleta y tipografías consistentes favorece el reconocimiento visual.", answer: true },
]

export type BSMXSection1Page3Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  layoutOption?: LayoutOption
  baseFontSize?: number
  imageSrc?: string
  imageAlt?: string
  // Tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: boolean | null, correctAnswer: boolean, isCorrect: boolean) => void
  onQuizComplete?: (score: number) => void
  isAlreadyCompleted?: boolean
  completedScore?: number
}

export function BSMXSection1Page3({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = progressForPage(3),
  title = "",
  topicTitle = "Quiz: Verdadero o Falso – Identidad Digital",
  layoutOption = "B",
  baseFontSize = 18,
  imageSrc = "",
  imageAlt = "Imagen de la sección",
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: BSMXSection1Page3Props) {
  const fs = Math.max(12, baseFontSize || 18)

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s1-page3-shimmer-effects';
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

  // Ancho 100%, sin alturas forzadas
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
    [background, fs]
  )

  const container = useMemo(
    () => ({
      width: "100%",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    []
  )

  const total = DEFAULT_QUESTIONS.length
  
  // Use persistence hook to save progress across refreshes
  const persistence = useQuizPersistence(
    "bsmx:quiz:m2s1p3",
    total,
    !isAlreadyCompleted // Only persist if quiz not already completed
  );
  
  const idx = persistence.idx;
  const setIdx = persistence.setIdx;
  const selection = persistence.answers as (boolean | null)[];
  const setSelection = persistence.setAnswers;
  const checked = persistence.checked;
  const setChecked = persistence.setChecked;
  const correct = persistence.correct;
  const setCorrect = persistence.setCorrect;
  const score = persistence.score;
  const setScore = persistence.setScore;

  const q = DEFAULT_QUESTIONS[idx]
  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total

  const handleSelect = (val: boolean) => {
    if (checked[idx]) return;
    const next = [...selection]
    next[idx] = val
    setSelection(next)
    const isCorrect = val === q.answer
    const nextChecked = [...checked]
    const nextCorrect = [...correct]
    nextChecked[idx] = true
    nextCorrect[idx] = !!isCorrect
    setChecked(nextChecked)
    setCorrect(nextCorrect)
    const newScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) setScore((s) => s + 1)
    
    // Track the answer
    if (onAnswerSubmit) {
      onAnswerSubmit(idx, q.text, val, q.answer, isCorrect);
    }
    
    setTimeout(() => {
      if (idx < total - 1) {
        setIdx(idx + 1);
      } else {
        // Quiz complete - submit final score and clear persisted state
        if (onQuizComplete) {
          onQuizComplete(newScore);
          // Clear localStorage after successful submission
          setTimeout(() => {
            persistence.clearPersistedState();
          }, 1000);
        }
      }
    }, 800);
  }

  const optStyle = (active: boolean): React.CSSProperties => ({
    padding: "18px 22px",
    borderRadius: 14,
    border: `2px solid ${active ? primaryColor : "rgba(0,0,0,0.12)"}`,
    background: active 
      ? "linear-gradient(135deg, #1e40af, #3B82F6)" 
      : "linear-gradient(135deg, #f0f7ff, #ffffff)",
    color: active ? "white" : "#1e40af",
    fontWeight: 800,
    fontSize: fs * 1.4,
    letterSpacing: 0.2,
    cursor: "pointer",
    userSelect: "none" as const,
    textAlign: "center" as const,
    boxShadow: active 
      ? "0 8px 24px rgba(30, 64, 175, 0.3), 0 4px 12px rgba(59, 130, 246, 0.2)" 
      : "0 2px 8px rgba(0,0,0,0.08)",
    transformOrigin: "center",
    transition: "all 0.3s ease",
  })

  const feedback =
    checked[idx] && correct[idx] ? (
      <div style={{ color: "#0a7f35", fontWeight: 700 }}>✅ ¡Correcto!</div>
    ) : checked[idx] && !correct[idx] ? (
      <div style={{ color: "#b00020", fontWeight: 700 }}>
        ❌ Incorrecto. {q.answer ? "Era VERDADERO." : "Era FALSO."}
      </div>
    ) : null

  // Show "Already Completed" screen if quiz was already taken
  if (isAlreadyCompleted) {
    return (
      <div style={wrapper}>
        {/* Marketing Facts Animation Overlay */}
        <MarketingFactsAnimation />
        
        <main style={{ width: "100%", display: "flex" as const, flexDirection: "column" as const, flex: 1, minHeight: "100vh" }}>
          <SectionPageHeader primaryColor={primaryColor} progress={progressPercent} brandName={brandName} logoSrc={logoSrc || undefined} />
          <section style={{ flex: 1, display: "block" }}>
            <div style={{ ...container, textAlign: "center" as const, paddingTop: 60 }}>
              <Card glow={primaryColor}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h2 style={{ fontSize: fs * 1.8, marginBottom: 12 }}>Quiz Ya Completado</h2>
                <p style={{ fontSize: fs * 1.1, color: "#666", marginBottom: 16 }}>
                  Ya completaste este quiz. Los quizzes solo pueden realizarse una vez.
                </p>
                <div style={{ padding: 16, background: `${primaryColor}15`, borderRadius: 12, marginBottom: 20 }}>
                  <strong style={{ fontSize: fs * 1.3 }}>Tu puntuación: {completedScore} / {total}</strong>
                </div>
              </Card>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div style={wrapper}>
      {/* Marketing Facts Animation Overlay */}
      <MarketingFactsAnimation 
        facts={[
          {
            character: 'billy',
            text: 'El 80% de los reclutadores revisa la marca personal en redes antes de contratar.',
            characterImage: '/2.png'
          },
          {
            character: 'drago',
            text: 'Solo se necesitan 7 segundos para causar una primera impresión de marca.',
            characterImage: '/drago1.png'
          },
          {
            character: 'billy',
            text: 'Las marcas personales coherentes pueden aumentar sus ingresos hasta en un 23%.',
            characterImage: '/2.png'
          },
          {
            character: 'drago',
            text: 'El color del logo puede mejorar el reconocimiento de marca en un 80%.',
            characterImage: '/drago1.png'
          }
        ]}
        baseFontSize={fs}
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
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={progressPercent}
          brandName={brandName}
          logoSrc={logoSrc || undefined}
        />
        {/* Contenido */}
        <section style={{ flex: 1, display: "block" }}>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {/* Título + Tema */}
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 2.5, 
                    lineHeight: 1.2,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6, #60A5FA)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer-title 3s ease infinite",
                    filter: "drop-shadow(0 2px 8px rgba(30, 64, 175, 0.3))",
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {topicTitle}
                </motion.h1>
              </motion.div>

              {/* Quiz V/F */}
              <motion.div 
                variants={itemVar}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <Card glow="#1e40af">
                  {/* Progreso del quiz */}
                  <div
                    style={{
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "space-between" as const,
                      marginBottom: 14,
                    }}
                  >
                    <strong style={{ fontSize: fs * 1.1, color: "#1e40af" }}>Pregunta {idx + 1} / {total}</strong>
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 10 }}>
                      <div style={{ width: 220, height: 12, background: "rgba(30, 64, 175, 0.1)", borderRadius: 999, overflow: "hidden" }}>
                    <div
                      style={{
                            width: `${Math.round(((idx + 1) / total) * 100)}%`,
                            height: "100%",
                        background: "linear-gradient(90deg, #1e40af, #3B82F6)",
                            borderRadius: 999,
                            transition: "width 220ms ease",
                      }}
                    />
                  </div>
                      <span style={{ fontSize: fs * 0.95, opacity: 0.75, color: "#1e40af", fontWeight: 600 }}>{Math.round(((idx + 1) / total) * 100)}%</span>
                    </div>
                  </div>

                  {/* Enunciado */}
                  <p style={{ 
                    margin: "10px 0 18px", 
                    lineHeight: 1.55, 
                    fontSize: fs * 1.4,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 600
                  }}>{q.text}</p>

                  {/* Opciones */}
                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: 16,
                      marginBottom: 16,
                    }}
                  >
                    <motion.div
                      role="button"
                      tabIndex={0}
                      whileHover={{ scale: 0.9 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      onClick={() => handleSelect(true)}
                      style={optStyle(selection[idx] === true)}
                    >
                      VERDADERO
              </motion.div>

              <motion.div
                      role="button"
                      tabIndex={0}
                      whileHover={{ scale: 0.9 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      onClick={() => handleSelect(false)}
                      style={optStyle(selection[idx] === false)}
                    >
                      FALSO
                    </motion.div>
                  </div>

                  {/* Feedback */}
                  <div style={{ marginBottom: 14, minHeight: 32 }}>{feedback}</div>

                  {/* Resultado final */}
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
                </Card>
              </motion.div>

            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

// ============================================================================
// Page 4: Quiz Multiple Choice - Identidad Digital (with persistence)
// ============================================================================

type Question = {
  text: string
  context?: string
  options: string[]
  correctIndex: number
}

/* ---------- Preguntas (15) ---------- */

const QUESTIONS: Question[] = [
  {
    text: "¿Qué elemento debe definirse ANTES del logo para construir identidad digital coherente?",
    context: "Una identidad sólida inicia con una promesa clara, no con lo visual.",
    options: ["Paleta de colores", "Propuesta de valor", "Tipografía principal", "Slogan rítmico"],
    correctIndex: 1,
  },
  {
    text: "¿Cuál bio comunica mejor una propuesta de valor enfocada al público?",
    context: "Una bio efectiva dice qué haces, para quién y cómo contactarte.",
    options: [
      "\"Fan del café y de las playlists.\"",
      "\"Hago de todo, pregúntame.\"",
      "\"Ayudo a pymes a decidir con datos. Agenda tu demo.\"",
      "\"Sígueme para más.\"",
    ],
    correctIndex: 2,
  },
  {
    text: "¿Cuál es el propósito principal del 'tono de voz' en una marca personal?",
    context: "El tono de voz refleja la personalidad verbal y genera reconocimiento.",
    options: ["Optimizar hashtags", "Definir precios", "Guiar cómo hablas y escribes", "Atraer solo seguidores internacionales"],
    correctIndex: 2,
  },
  {
    text: "Elige la práctica más útil para mantener consistencia visual en redes:",
    context: "La coherencia visual facilita el reconocimiento sin repetir exactamente lo mismo.",
    options: ["Cambiar colores en cada post", "Usar una paleta y tipografía definidas", "Evitar plantillas", "Publicar solo fotos"],
    correctIndex: 1,
  },
  {
    text: "¿Qué debe incluir un portafolio breve para generar confianza?",
    context: "Mostrar procesos y resultados ayuda a que te tomen en serio.",
    options: ["Solo fotos de stock", "Antes/después, métricas y aprendizaje", "Memes graciosos", "Frases motivacionales"],
    correctIndex: 1,
  },
  {
    text: "¿Qué tipo de CTA es más adecuado en una bio profesional?",
    context: "Tu bio debe facilitar el siguiente paso de forma explícita.",
    options: ["\"Dale like\"", "\"Comparte si te gustó\"", "\"Escríbeme para cotizar\"", "\"Mira mis fotos antiguas\""],
    correctIndex: 2,
  },
  {
    text: "La identidad digital debe ser idéntica en todas las plataformas, sin ajustes de formato.",
    context: "Consistencia no es rigidez: se mantiene la esencia, se adapta el formato.",
    options: ["Verdadero", "Falso"],
    correctIndex: 1,
  },
  {
    text: "El 'tono de voz' puede ayudarte a atraer al público adecuado y a disuadir al que no encaja.",
    context: "Decir quién eres también implica decir quién no eres.",
    options: ["Verdadero", "Falso"],
    correctIndex: 0,
  },
  {
    text: "Una bio efectiva debe evitar cualquier tipo de llamada a la acción para no parecer venta.",
    context: "La claridad sobre el siguiente paso reduce fricción.",
    options: ["Verdadero", "Falso"],
    correctIndex: 1,
  },
  {
    text: "Tu propuesta de valor solo describe tus habilidades internas; no considera al público objetivo.",
    context: "Las mejores PV hablan del público, el resultado y el cómo.",
    options: ["Verdadero", "Falso"],
    correctIndex: 1,
  },
  {
    text: "Usar ejemplos reales en el portafolio es mejor que usar imágenes genéricas.",
    context: "Lo concreto transmite más confianza que lo genérico.",
    options: ["Verdadero", "Falso"],
    correctIndex: 0,
  },
  {
    text: "Tarjeta: \"Propuesta de valor\". ¿Qué opción la describe mejor?",
    context: "Piensa en una frase que une público, resultado y método.",
    options: ["\"Me gustan los datos.\"", "\"Ayudo a [público] a [resultado] con [método].\"", "\"Sígueme para más tips.\"", "\"Contenido variado cada día.\""],
    correctIndex: 1,
  },
  {
    text: "Tarjeta: \"Guía de estilo mínima\". ¿Cuál ejemplo encaja?",
    context: "Una guía mínima asegura paleta, tipografía y reglas básicas.",
    options: ["Colores al azar + cualquier tipografía", "Paleta de 3 colores, 1 tipografía y reglas de miniaturas", "Solo emojis", "Sin reglas, así es más 'auténtico'"],
    correctIndex: 1,
  },
  {
    text: "Tarjeta: \"Bio efectiva\". ¿Qué elemento es imprescindible?",
    context: "Tu bio debe orientar a una acción específica.",
    options: ["Chiste interno", "CTA claro", "Frase críptica", "Lista de hobbies"],
    correctIndex: 1,
  },
  {
    text: "Tarjeta: \"Consistencia visual\". ¿Qué mantiene el reconocimiento?",
    context: "Reconocer tu marca aún cambiando formatos es clave.",
    options: ["Repetir exactamente la misma imagen", "Paleta y tipografías consistentes", "Cambiar logo cada semana", "No usar portada ni miniatura"],
    correctIndex: 1,
  },
]

/* ---------- Helpers ---------- */

function normalizeLen<T>(arr: T[], len: number, fill: T): T[] {
  const a = Array.isArray(arr) ? [...arr] : []
  if (a.length < len) {
    while (a.length < len) a.push(fill)
  } else if (a.length > len) {
    a.length = len
  }
  return a
}

export type BSMXSection1Page4Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  layoutOption?: LayoutOption
  baseFontSize?: number
  storageKey?: string
  persist?: boolean
  // Tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: number | null, correctAnswer: number, isCorrect: boolean) => void
  onQuizComplete?: (score: number) => void
  isAlreadyCompleted?: boolean
  completedScore?: number
}

export function BSMXSection1Page4({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = progressForPage(3),
  title = "",
  topicTitle = "Quiz: Construcción de la identidad digital",
  layoutOption = "B",
  baseFontSize = 18,
  storageKey = "bsmx:mc:mod1:sec1:quizIdentidad",
  persist = true,
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: BSMXSection1Page4Props) {
  const fs = Math.max(12, baseFontSize || 18)

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s1-page4-shimmer-effects';
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

  // Layout
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
    [background, fs]
  )

  const container = useMemo(
    () => ({
      width: "100%",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
      maxWidth: "100%",
    }),
    []
  )

  const total = QUESTIONS.length
  const [idx, setIdx] = useState(0)
  const [selection, setSelection] = useState<(number | null)[]>(
    Array(total).fill(null)
  )
  const [checked, setChecked] = useState<boolean[]>(Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(Array(total).fill(false))
  const [score, setScore] = useState(0)

  // Restaurar - ONLY if quiz is NOT already completed in database
  useEffect(() => {
    if (!persist || isAlreadyCompleted) return
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (!raw) return
      const data = JSON.parse(raw)
      if (Array.isArray(data?.selection))
        setSelection(normalizeLen(data.selection, total, null))
      if (Array.isArray(data?.checked))
        setChecked(normalizeLen(data.checked, total, false))
      if (Array.isArray(data?.correct))
        setCorrect(normalizeLen(data.correct, total, false))
      if (typeof data?.score === "number") setScore(data.score)
      if (typeof data?.idx === "number")
        setIdx(Math.max(0, Math.min(total - 1, data.idx)))
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persist, storageKey, isAlreadyCompleted])

  // Guardar - ONLY if quiz is NOT already completed in database
  useEffect(() => {
    if (!persist || isAlreadyCompleted) return
    try {
      const payload = JSON.stringify({
        idx,
        selection,
        checked,
        correct,
        score,
      })
      window.localStorage.setItem(storageKey, payload)
    } catch {}
  }, [persist, storageKey, idx, selection, checked, correct, score, isAlreadyCompleted])

  const q = QUESTIONS[idx]

  const selectOption = (optIndex: number) => {
    if (checked[idx]) return
    const next = [...selection]
    next[idx] = optIndex
    setSelection(next)
    const isCorrect = optIndex === q.correctIndex
    const nextChecked = [...checked]
    const nextCorrect = [...correct]
    nextChecked[idx] = true
    nextCorrect[idx] = !!isCorrect
    setChecked(nextChecked)
    setCorrect(nextCorrect)
    const newScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) setScore((s) => s + 1)
    
    // Track the answer
    if (onAnswerSubmit) {
      onAnswerSubmit(idx, q.text, q.options[optIndex], q.options[q.correctIndex], isCorrect);
    }
    
    setTimeout(() => {
      if (idx < total - 1) {
        setIdx(idx + 1);
      } else {
        // Quiz complete - submit final score
        if (onQuizComplete) {
          onQuizComplete(newScore);
        }
      }
    }, 800);
  }

  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total
  const quizProgressPct = Math.round(((idx + 1) / total) * 100)

  const optStyle = (active: boolean, disabled: boolean): React.CSSProperties => ({
    padding: "14px 16px",
    borderRadius: 12,
    border: `2px solid ${active ? "#1e40af" : "rgba(0,0,0,0.12)"}`,
    background: active 
      ? "linear-gradient(135deg, #1e40af, #3B82F6)" 
      : "linear-gradient(135deg, #f0f7ff, #ffffff)",
    color: active ? "white" : "#1e40af",
    fontWeight: 700,
    fontSize: fs * 1.0,
    textAlign: "left" as const,
    cursor: disabled ? "default" : "pointer",
    userSelect: "none" as const,
    display: "flex" as const,
    alignItems: "center" as const,
    gap: 10,
    transformOrigin: "center",
    boxShadow: active 
      ? "0 4px 12px rgba(30, 64, 175, 0.3), 0 2px 6px rgba(59, 130, 246, 0.2)" 
      : "0 2px 8px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  })

  const bulletStyle = (active: boolean): React.CSSProperties => ({
    width: 14,
    height: 14,
    borderRadius: 999,
    border: `2px solid ${active ? "white" : "rgba(30, 64, 175, 0.35)"}`,
    background: active ? "white" : "transparent",
    flexShrink: 0,
  })

  const feedback =
    checked[idx] && correct[idx] ? (
      <div style={{ color: "#0a7f35", fontWeight: 700 }}>✅ ¡Correcto!</div>
    ) : checked[idx] && !correct[idx] ? (
      <div style={{ color: "#b00020", fontWeight: 700 }}>
        ❌ Incorrecto. Respuesta correcta: {q.options[q.correctIndex]}
      </div>
    ) : null

  // Show "Already Completed" screen if quiz was already taken
  if (isAlreadyCompleted) {
    return (
      <div style={wrapper}>
        <main style={{ width: "100%", display: "flex" as const, flexDirection: "column" as const, flex: 1, minHeight: "100vh" }}>
          <SectionPageHeader primaryColor={primaryColor} progress={progressPercent} brandName={brandName} logoSrc={logoSrc || undefined} />
          <section style={{ flex: 1, display: "block" }}>
            <div style={{ ...container, textAlign: "center" as const, paddingTop: 60 }}>
              <Card glow={primaryColor}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h2 style={{ fontSize: fs * 1.8, marginBottom: 12 }}>Quiz Ya Completado</h2>
                <p style={{ fontSize: fs * 1.1, color: "#666", marginBottom: 16 }}>
                  Ya completaste este quiz. Los quizzes solo pueden realizarse una vez.
                </p>
                <div style={{ padding: 16, background: `${primaryColor}15`, borderRadius: 12, marginBottom: 20 }}>
                  <strong style={{ fontSize: fs * 1.3 }}>Tu puntuación: {completedScore} / {total}</strong>
                </div>
              </Card>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div style={wrapper}>
      {/* Marketing Facts Animation Overlay */}
      <MarketingFactsAnimation 
        facts={[
          {
            character: 'billy',
            text: 'Las personas confían un 67% más en marcas con presencia humana y cercana.',
            characterImage: '/2.png'
          },
          {
            character: 'drago',
            text: 'El 70% de los consumidores se identifica más con una marca que comparte sus valores.',
            characterImage: '/drago1.png'
          },
          {
            character: 'billy',
            text: 'Publicar contenido educativo aumenta el posicionamiento personal un 60%.',
            characterImage: '/2.png'
          },
          {
            character: 'drago',
            text: 'El 65% de los usuarios sigue a alguien por la autenticidad, no por el número de seguidores.',
            characterImage: '/drago1.png'
          }
        ]}
        baseFontSize={fs}
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
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={progressPercent}
          brandName={brandName}
          logoSrc={logoSrc || undefined}
        />
        {/* Contenido */}
        <section style={{ flex: 1, display: "block" }}>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {/* Quiz Title */}
              <motion.div variants={itemVar} style={{ marginBottom: 12 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 2.2, 
                    lineHeight: 1.2,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6, #60A5FA)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer-title 3s ease infinite",
                    filter: "drop-shadow(0 2px 8px rgba(30, 64, 175, 0.3))",
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Quiz de Opción Múltiple
                </motion.h1>
              </motion.div>

              {/* Subtítulo */}
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.p 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 1.4, 
                    lineHeight: 1.3,
                    color: "#1e40af",
                    fontWeight: 600,
                  }}
                >
                  {topicTitle}
                </motion.p>
              </motion.div>

              {/* Quiz */}
              <motion.div 
                variants={itemVar}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <Card glow="#1e40af">
                  {/* Progreso del quiz */}
                  <div
                    style={{
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "space-between" as const,
                      marginBottom: 14,
                    }}
                  >
                    <strong style={{ fontSize: fs * 1.1, color: "#1e40af" }}>
                      Pregunta {idx + 1} / {total}
                    </strong>
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 10 }}>
                      <div
                        style={{
                          width: 220,
                          height: 12,
                          background: "rgba(30, 64, 175, 0.1)",
                          borderRadius: 999,
                          overflow: "hidden" as const,
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.round(((idx + 1) / total) * 100)}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #1e40af, #3B82F6)",
                            borderRadius: 999,
                            transition: "width 220ms ease",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: fs * 0.95, opacity: 0.75, color: "#1e40af", fontWeight: 600 }}>{quizProgressPct}%</span>
                    </div>
                  </div>

                  {/* Enunciado + contexto */}
                  <div style={{ margin: "10px 0 18px", lineHeight: 1.55, fontSize: fs * 1.4 }}>
                    <p style={{ 
                      margin: 0,
                      background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 600
                    }}>{q.text}</p>
                    {q.context ? (
                      <p style={{ 
                        margin: "6px 0 0", 
                        opacity: 0.8, 
                        fontSize: fs * 0.95,
                        color: "#3B82F6",
                        fontWeight: 500
                      }}>{q.context}</p>
                    ) : null}
                  </div>

                  {/* Opciones */}
                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    {q.options.map((opt, i) => {
                      const active = selection[idx] === i
                      const disabled = !!checked[idx]
                      return (
              <motion.div
                          key={i}
                          role="button"
                          onClick={() => selectOption(i)}
                          style={optStyle(active, disabled)}
                          whileHover={disabled ? undefined : { scale: 0.9 }}
                          whileTap={disabled ? undefined : { scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        >
                          <span style={bulletStyle(active)} />
                          <span>{opt}</span>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Feedback */}
                  <div style={{ minHeight: 32, marginBottom: 14 }}>{feedback}</div>

                  {/* Resultado final */}
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
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

// ============================================================================
// Page 5: Practical Activities with Flashcards
// ============================================================================

function GridFlashcards({ 
  children, 
  gap = 16, 
  columns = 1 
}: { 
  children: React.ReactNode; 
  gap?: number; 
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
  );
}

function InteractiveStep({ step, index, fs }: { step: { front: string; back: string }, index: number, fs: number }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [userText, setUserText] = useState("");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      style={{
        padding: 20,
        borderRadius: 16,
        background: isCompleted 
          ? "linear-gradient(135deg, #10b981, #059669)" 
          : "linear-gradient(135deg, #f0f7ff, #ffffff)",
        border: `2px solid ${isCompleted ? "#10b981" : "#3B82F6"}`,
        boxShadow: isCompleted
          ? "0 8px 24px rgba(16, 185, 129, 0.2)"
          : "0 4px 12px rgba(59, 130, 246, 0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 12, 
        marginBottom: 12 
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: isCompleted 
            ? "linear-gradient(135deg, #10b981, #059669)" 
            : "linear-gradient(135deg, #1e40af, #3B82F6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 800,
          fontSize: fs * 0.9,
          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
        }}>
          {isCompleted ? "✓" : index + 1}
        </div>
        <h4 style={{ 
          margin: 0, 
          fontSize: fs * 1.1,
          color: isCompleted ? "#059669" : "#1e40af",
          fontWeight: 700
        }}>
          {step.front}
        </h4>
      </div>
      
      <p style={{ 
        margin: "0 0 12px 48px", 
        fontSize: fs,
        color: "#374151",
        lineHeight: 1.6
      }}>
        {step.back}
      </p>

      <textarea
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        placeholder="Escribe tu respuesta aquí..."
        style={{
          width: "100%",
          minHeight: "100px",
          padding: 12,
          borderRadius: 8,
          border: `2px solid ${isCompleted ? "#10b981" : "#e5e7eb"}`,
          fontSize: fs,
          fontFamily: "inherit",
          resize: "vertical" as const,
          outline: "none",
          transition: "all 0.3s ease",
          background: "white"
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#3B82F6";
          e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = userText ? "#10b981" : "#e5e7eb";
          e.target.style.boxShadow = "none";
        }}
      />

      {userText && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCompleted(!isCompleted)}
          style={{
            marginTop: 12,
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: isCompleted 
              ? "linear-gradient(135deg, #1e40af, #3B82F6)" 
              : "linear-gradient(135deg, #10b981, #059669)",
            color: "white",
            fontSize: fs * 0.9,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
          }}
        >
          {isCompleted ? "✓ Completado" : "✓ Marcar como completado"}
        </motion.button>
      )}
    </motion.div>
  );
}

/* ---------- Defaults ---------- */
const DEFAULT_INSTRUCTIONS = [
  "Identidad en palabras: Escribe un párrafo presentándote como marca personal: quién eres, a quién ayudas y cómo aportas valor.",
];
const DEFAULT_SECOND_CARD =
  "Identidad visual mínima: Ajusta foto y portada para que sean legibles y coherentes (misma estética, contraste y encuadre).";

export type BSMXSection1Page5Props = {
  // Branding / Layout
  brandName?: string;
  logoSrc?: string;
  primaryColor?: string;
  background?: string;
  progressPercent?: number;
  title?: string;
  topicTitle?: string;
  layoutOption?: LayoutOption;
  baseFontSize?: number;
  instructions?: string[];
  gridColumns?: number;
  gridGap?: number;

  // Segunda tarjeta opcional
  showSecondCard?: boolean;
  secondCardText?: string;
}

export function BSMXSection1Page5({
  // Branding / Layout
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 100,
  title = "Módulo 2 · Actividades prácticas",
  topicTitle = "Identidad en palabras (para libreta, solo escribir)",
  layoutOption = "B",
  baseFontSize = 18,
  instructions = DEFAULT_INSTRUCTIONS,
  gridColumns = 1,
  gridGap = 16,

  // Segunda tarjeta opcional
  showSecondCard = true,
  secondCardText = DEFAULT_SECOND_CARD,
}: BSMXSection1Page5Props) {
  const fs = Math.max(12, baseFontSize || 18);

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s1-page5-shimmer-effects';
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

  const baseList = (instructions?.length ? instructions : DEFAULT_INSTRUCTIONS).map(
    (t, i) => ({
      front: `Paso ${i + 1}`,
      back: t,
    })
  );

  const list = showSecondCard
    ? [
        ...baseList,
        {
          front: `Paso ${baseList.length + 1}`,
          back: secondCardText || DEFAULT_SECOND_CARD,
        },
      ]
    : baseList;

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
    [background, fs]
  );

  const container = useMemo(
    () => ({
      width: "100%",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    []
  );

  return (
    <div style={wrapper}>
      <SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%", display: "block" }}>
        {/* Contenido */}
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {/* Título + Tema */}
              <motion.div variants={itemVar} style={{ marginBottom: 14 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 2.5, 
                    lineHeight: 1.2,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6, #60A5FA)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer-title 3s ease infinite",
                    filter: "drop-shadow(0 2px 8px rgba(30, 64, 175, 0.3))",
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {title}
                </motion.h1>
                <p style={{ margin: "8px 0 0", color: "#1e40af", fontSize: fs * 1.4, fontWeight: 600 }}>
                  {topicTitle}
                </p>
              </motion.div>

              {/* Aviso */}
              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 18 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card glow="#1e40af">
                  <div
                    style={{
                      display: "flex" as const,
                      alignItems: "center" as const,
                      gap: 10,
                      fontWeight: 800,
                      background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontSize: fs * 1.05,
                    }}
                  >
                    🎉 ¡Ya casi terminas esta sección!
                  </div>
                </Card>
              </motion.div>

              {/* Actividad práctica */}
              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 16 }}
              >
                <Card glow="#1e40af">
                  <h3 style={{ 
                    margin: "0 0 12px 0", 
                    fontSize: fs * 1.3,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 700
                  }}>
                    Actividades prácticas
                  </h3>
                  <p style={{ 
                    margin: "0 0 24px 0", 
                    color: "#1e40af",
                    opacity: 0.85,
                    fontWeight: 500
                  }}>
                    Lee cada paso y escribe tu respuesta en el área de texto.
                  </p>

                  {/* Fun Interactive Writing Activity */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {list.map((step, index) => {
                      return <InteractiveStep key={index} step={step} index={index} fs={fs} />;
                    })}
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ============================================================================
// Content Mapping - Export for routing
// ============================================================================

const M2S1_CONTENT: Record<number, React.ReactNode> = {
  1: <BSMXSection1 heroImage="/M2 cover.png" />,
  2: <BSMXSection1Page2 />,
  3: <BSMXSection1Page3 />,
  4: <BSMXSection1Page4 />,
  5: <BSMXSection1Page5 />,
};

export default M2S1_CONTENT;

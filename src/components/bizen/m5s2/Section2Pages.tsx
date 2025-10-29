/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { motion, Variants } from "framer-motion"
import SectionPageHeader from "@/components/bizen/SectionPageHeader"

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
        border: `2px solid ${hover || open ? brHover : "rgba(0,0,0,0.08)"}`,
        borderRadius: 12,
        overflow: "hidden" as const,
        background: open ? `linear-gradient(135deg, ${primaryColor}05, #fff)` : "#fff",
        transition: "border-color .2s ease, box-shadow .2s ease, background .2s ease",
        boxShadow: hover || open ? `0 6px 20px ${primaryColor}15` : "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "16px 18px",
          background: hover 
            ? `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)` 
            : "transparent",
          border: hover ? `1px solid ${primaryColor}30` : "1px solid transparent",
          borderRadius: 10,
          display: "flex" as const,
          alignItems: "center" as const,
          justifyContent: "space-between" as const,
          cursor: "pointer",
          fontWeight: 700,
          fontSize: fontSize * 1.1,
          transition: "all .2s ease",
        }}
        aria-expanded={open}
      >
        <span style={{ 
          textDecoration: hover ? "underline" : "none", 
          textUnderlineOffset: 4,
          color: primaryColor,
        }}>
          {title}
        </span>

        <motion.span
          style={{ 
            color: primaryColor, 
            fontWeight: 900, 
            display: "inline-block" as const, 
            lineHeight: 1,
            fontSize: fontSize * 1.3,
          }}
          animate={{ 
            rotate: open ? 45 : 0, 
            scale: hover ? 1.2 : 1 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {open ? "−" : "+"}
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

function Page1({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 0,
  title = "Sección 2",
  topicTitle = "Mapa de relaciones y circuitos de valor",
  introText = "El networking estratégico se planea. Un mapa de relaciones te ayuda a priorizar a quién acercarte y qué valor intercambiar. Piensa en tres capas: Pares, Puentes y Mentores.",
  bullets = [
    "Mapa por capas: Pares (recursos/feedback/oportunidades), Puentes (reclutadores, líderes, profes), Mentores (trayectoria y orientación).",
    "Circuitos de valor: comparte recursos, oportunidades, feedback y conexiones; pide y ofrece con claridad y buen timing.",
    "Prioriza por afinidad e impacto; relación sostenida > cantidad de contactos.",
  ],
  keyIdea = "Tu red no es cuántos contactos tienes, sino la calidad de los intercambios sostenidos en el tiempo.",
  awarenessItems = [
    "Pares: tu nivel/área; comparten recursos y feedback",
    "Puentes: reclutadores, líderes de comunidades, profes",
    "Mentores: profesionales con trayectoria que orientan",
  ],
  considerationItems = [
    "Recursos útiles (docs, plantillas, referencias)",
    "Feedback accionable y honesto",
    "Oportunidades (vacantes, proyectos, eventos)",
    "Conexiones (presentaciones cálidas y contextuales)",
    "Aprendizajes sintetizados (resúmenes/casos)",
  ],
  conversionItems = [
    "Lista 15–20 contactos divididos por capa",
    "Prioriza 5 por afinidad/impacto",
    "Define la próxima micro-acción por persona",
    "Registra fecha, canal y objetivo de contacto",
    "Programa seguimiento (1–4 semanas según caso)",
  ],
  commonFormats = [
    "Reciprocidad y especificidad en las solicitudes",
    "Evitar mensajes genéricos/masivos",
    "Cuidar el timing y el contexto",
    "Agradecer y cerrar cada intercambio con claridad",
  ],
  heroImage = "",
  layoutOption = "A",
  baseFontSize = 18,
}: Page1Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm5s2-page1-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-m5s2 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer-glow-m5s2 {
          0%, 100% { 
            opacity: 1;
            filter: drop-shadow(0 0 15px rgba(15, 98, 254, 0.4));
          }
          50% { 
            opacity: 1;
            filter: drop-shadow(0 0 30px rgba(15, 98, 254, 0.8));
          }
        }
        @keyframes float-m5s2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(-0.3deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(0.3deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }, [])

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
              <motion.div variants={itemVar} style={{ marginBottom: 12 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2, ${primaryColor})`,
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                    animation: "shimmer-title-m5s2 3s ease-in-out infinite",
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
                <p style={{ margin: "6px 0 0", opacity: 0.9, fontSize: fs * 1.4 }}>
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </p>
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
                  <img src={heroImage} alt="Sección 2" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 16 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <Page1Card glow={primaryColor}>
                  <h3 style={{ 
                    margin: "0 0 10px 0", 
                    fontSize: fs * 1.355,
                    color: primaryColor,
                    fontWeight: 700
                  }}>
                    ¿Por qué importa?
                  </h3>
                  <p style={{ margin: 0, opacity: 0.95, fontSize: fs }}>{introText}</p>
                </Page1Card>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Page1Card glow={primaryColor}>
                  <motion.h3 
                    style={{ 
                      margin: "0 0 12px 0", 
                      fontSize: fs * 1.4,
                      backgroundImage: `linear-gradient(90deg, ${primaryColor}, #4A90E2)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 700
                    }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    🧩 Piezas clave
                  </motion.h3>
                  <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95, fontSize: fs * 1.05, listStyle: "none" as const }}>
                    {bullets.map((b, i) => (
                      <motion.li 
                        key={i} 
                        style={{ 
                          marginBottom: 12,
                          padding: "12px 16px",
                          background: `linear-gradient(135deg, ${primaryColor}08, transparent)`,
                          borderRadius: 10,
                          borderLeft: `3px solid ${primaryColor}`,
                          position: "relative" as const,
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        whileHover={{ 
                          scale: 1.02, 
                          x: 5,
                          background: `linear-gradient(135deg, ${primaryColor}15, transparent)`,
                        }}
                      >
                        <span style={{ 
                          color: primaryColor, 
                          fontWeight: 700,
                          marginRight: 8
                        }}>
                          {i === 0 && "📍 "}
                          {i === 1 && "🔗 "}
                          {i === 2 && "🎯 "}
                        </span>
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </Page1Card>
              </motion.div>

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

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Page1Card glow={primaryColor}>
                  <h3 style={{ 
                    margin: "0 0 12px 0", 
                    fontSize: fs * 1.355,
                    color: primaryColor,
                    fontWeight: 700
                  }}>
                    Glosario y reglas simples
                  </h3>
                  <div style={{ display: "grid" as const, gridTemplateColumns: "1fr", gap: 14 }}>
                    <AccordionItemPage1
                      title="Capas del mapa"
                      primaryColor={primaryColor}
                      fontSize={fs}
                      defaultOpen
                    >
                      <p style={{ margin: 0, opacity: 0.95 }}>{awarenessItems.join(", ")}.</p>
                    </AccordionItemPage1>

                    <AccordionItemPage1
                      title="Qué intercambiar (valor)"
                      primaryColor={primaryColor}
                      fontSize={fs}
                    >
                      <p style={{ margin: 0, opacity: 0.95 }}>{considerationItems.join(", ")}.</p>
                    </AccordionItemPage1>

                    <AccordionItemPage1
                      title="Acciones para construir el mapa"
                      primaryColor={primaryColor}
                      fontSize={fs}
                    >
                      <p style={{ margin: 0, opacity: 0.95 }}>{conversionItems.join(", ")}.</p>
                    </AccordionItemPage1>

                    <AccordionItemPage1
                      title="Principios para relaciones sanas"
                      primaryColor={primaryColor}
                      fontSize={fs}
                    >
                      <p style={{ margin: 0, opacity: 0.95 }}>{commonFormats.join(", ")}.</p>
                    </AccordionItemPage1>
                  </div>
                </Page1Card>
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
  fontSize,
  colorIndex = 0,
}: {
  front: string
  back: string
  fontSize: number
  colorIndex?: number
}) {
  const [flipped, setFlipped] = useState(false)
  const colors = [
    { bg: "#0F62FE", accent: "#2563eb", light: "#E3F2FD" }, // Blue
    { bg: "#7c3aed", accent: "#8b5cf6", light: "#F3E5F5" }, // Purple
    { bg: "#16a34a", accent: "#22c55e", light: "#F0FDF4" }, // Green
    { bg: "#dc2626", accent: "#ef4444", light: "#FEF2F2" }, // Red
  ]
  const cardColors = colors[colorIndex % colors.length]
  
  return (
    <motion.div
      role="button"
      onClick={() => setFlipped((v) => !v)}
      whileHover={{ scale: 1.08, y: -8 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        userSelect: "none",
        cursor: "pointer",
        borderRadius: 24,
        border: `3px solid ${flipped ? cardColors.accent : "rgba(0,0,0,0.1)"}`,
        background: flipped 
          ? `linear-gradient(135deg, ${cardColors.light}, #fff)` 
          : `linear-gradient(135deg, #fff, ${cardColors.light})`,
        padding: 24,
        minWidth: 280,
        minHeight: 220,
        boxShadow: flipped 
          ? `0 16px 40px ${cardColors.bg}35` 
          : `0 8px 24px ${cardColors.bg}15`,
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 16,
        willChange: "transform",
        position: "relative" as const,
        overflow: "hidden" as const,
      }}
    >
      {!flipped && (
        <div
        style={{
            position: "absolute" as const,
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            backgroundImage: `linear-gradient(90deg, ${cardColors.bg}, ${cardColors.accent}, ${cardColors.bg})`,
            backgroundSize: "200% auto",
            animation: "shimmer-title-p2 2s ease-in-out infinite"
          }}
        />
      )}
      <motion.strong
        style={{
          color: cardColors.accent,
          display: "block" as const,
          fontSize: fontSize * 1.2,
          lineHeight: 1.3,
          fontWeight: 900,
        }}
        animate={flipped ? { 
          scale: [1, 1.05, 1],
          color: [cardColors.accent, cardColors.bg, cardColors.accent]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {front}
      </motion.strong>

      <motion.p 
        style={{ 
          margin: 0, 
          opacity: flipped ? 0.95 : 0.6, 
          fontSize: flipped ? fontSize * 1.05 : fontSize * 0.9,
          lineHeight: 1.6, 
          flex: 1,
          fontWeight: flipped ? 500 : 400,
          color: flipped ? cardColors.bg : "#666"
        }}
        animate={flipped ? {
          opacity: [0, 0.95],
        } : {}}
      >
        {flipped ? back : "💡 Toca para revelar"}
      </motion.p>
      
      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex" as const,
            alignItems: "center" as const,
            gap: 8,
            color: cardColors.accent,
            fontSize: fontSize * 1.0,
            fontWeight: 700,
          }}
        >
          <span>✨</span>
          <span>Ya leído</span>
        </motion.div>
      )}
    </motion.div>
  )
}

function Page2({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 25,
  topicTitle = "Mapa de relaciones y circuitos de valor",
  heroImage = "",
  layoutOption = "B",
  baseFontSize = 18,
}: Page2Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm5s2-page2-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-p2 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-p2 {
          0%, 100% { transform: translateY(0px); }
          25% { transform: translateY(-8px); }
          50% { transform: translateY(-16px); }
          75% { transform: translateY(-8px); }
        }
      `;
      document.head.appendChild(style);
    }
  }, [])

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
        <section style={{ flex: 1, display: "block" }}>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2, ${primaryColor})`,
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                    animation: "shimmer-title-p2 3s ease-in-out infinite",
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
                  {topicTitle}
                </motion.h1>
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
                  <img src={heroImage} alt="Sección 2" style={{ width: "100%", height: "auto" }} />
                </motion.div>
              ) : null}

              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 18 }}
              >
                <motion.div
                  style={{
                    position: "relative" as const,
                    borderRadius: 20,
                    padding: 24,
                    border: `2px solid ${primaryColor}22`,
                    background: `linear-gradient(135deg, #fff 0%, ${primaryColor}08 50%, #fff 100%)`,
                    backdropFilter: "blur(6px)",
                    boxShadow: `0 10px 40px ${primaryColor}15`,
                    overflow: "hidden" as const,
                  }}
                  animate={{ 
                    boxShadow: [
                      `0 10px 40px ${primaryColor}15`,
                      `0 14px 50px ${primaryColor}20`,
                      `0 10px 40px ${primaryColor}15`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "6px",
                    backgroundImage: `linear-gradient(90deg, ${primaryColor}, #4A90E2, ${primaryColor})`,
                    backgroundSize: "200% auto",
                    animation: "shimmer-title-p2 2.5s ease-in-out infinite"
                  }} />
                  <h3 style={{ 
                    margin: "0 0 14px 0", 
                    fontSize: fs * 1.4,
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 800
                  }}>Plan de acción por contacto</h3>

                  <ol style={{ margin: 0, paddingLeft: 24, lineHeight: 1.6, fontSize: fs }}>
                    <li style={{ marginBottom: 10 }}>
                      <strong style={{ color: primaryColor }}>Objetivo:</strong> ¿para qué conectas?
                    </li>
                    <li style={{ marginBottom: 10 }}>
                      <strong style={{ color: primaryColor }}>Valor que ofreces:</strong> recursos, síntesis, voluntariado o mini-solución.
                    </li>
                    <li style={{ marginBottom: 10 }}>
                      <strong style={{ color: primaryColor }}>Siguiente paso:</strong> mensaje, reunión o envío.
                    </li>
                  </ol>

                  <h4 style={{ margin: "16px 0 8px", color: primaryColor, fontSize: fs * 1.15, fontWeight: 800 }}>Regla 3:1</h4>
                  <p style={{ margin: 0, lineHeight: 1.6, fontSize: fs, padding: "12px",
                    background: `linear-gradient(135deg, ${primaryColor}08, #4A90E208)`,
                    borderRadius: 12,
                    border: `1px solid ${primaryColor}22`
                  }}>
                    Por cada solicitud, ofrece <strong>tres aportes</strong> a tu red (compartir oportunidades,
                    sintetizar aprendizajes, conectar personas). Quien aporta de forma consistente se vuelve
                    <em> referenciable</em>.
                  </p>

                  <h4 style={{ margin: "16px 0 8px", color: "#2563eb", fontSize: fs * 1.15, fontWeight: 800 }}>
                    Frecuencia y cadencia
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: 24, lineHeight: 1.6, fontSize: fs }}>
                    <li style={{ marginBottom: 8 }}>
                      <strong style={{ color: "#2563eb" }}>Inicio:</strong> 5–10 nuevos contactos/mes.
                    </li>
                    <li style={{ marginBottom: 8 }}>
                      <strong style={{ color: "#2563eb" }}>Mantenimiento:</strong> 1–2 aportes/semana.
                    </li>
                    <li>
                      <strong style={{ color: "#2563eb" }}>Seguimiento:</strong> registra a quién escribiste y cuándo (fecha, canal, objetivo).
                    </li>
                  </ul>

                  <h4 style={{ margin: "16px 0 8px", color: "#7c3aed", fontSize: fs * 1.15, fontWeight: 800 }}>Cómo priorizar</h4>
                  <ul style={{ margin: 0, paddingLeft: 24, lineHeight: 1.6, fontSize: fs }}>
                    <li style={{ marginBottom: 8 }}>
                      <strong style={{ color: "#7c3aed" }}>Cercanía con tus metas:</strong> aborda primero tu <em>top 10</em>.
                    </li>
                    <li style={{ marginBottom: 8 }}>
                      <strong style={{ color: "#7c3aed" }}>Aprendizaje/colaboración:</strong> potencial real de crecer o crear juntos.
                    </li>
                    <li>
                      <strong style={{ color: "#7c3aed" }}>Probabilidad de respuesta:</strong> comunidades activas y contactos con señales públicas
                      de interacción.
                    </li>
                  </ul>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 20 }}
              >
                <motion.div
                  style={{
                    position: "relative" as const,
                    borderRadius: 20,
                    padding: 24,
                    border: `2px solid ${primaryColor}22`,
                    background: `linear-gradient(135deg, #f8fbff 0%, #fff 50%, #f8fbff 100%)`,
                    backdropFilter: "blur(6px)",
                    boxShadow: `0 10px 40px rgba(74, 144, 226, 0.15)`,
                    overflow: "hidden" as const,
                  }}
                  animate={{ 
                    boxShadow: [
                      `0 10px 40px rgba(74, 144, 226, 0.15)`,
                      `0 14px 50px rgba(74, 144, 226, 0.25)`,
                      `0 10px 40px rgba(74, 144, 226, 0.15)`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "6px",
                    backgroundImage: `linear-gradient(90deg, #4A90E2, ${primaryColor}, #4A90E2)`,
                    backgroundSize: "200% auto",
                    animation: "shimmer-title-p2 2.5s ease-in-out infinite"
                  }} />
                  <h3 style={{ 
                    margin: "0 0 18px 0", 
                    fontSize: fs * 1.5,
                    backgroundImage: `linear-gradient(135deg, #4A90E2, ${primaryColor})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 900,
                    display: "flex" as const,
                    alignItems: "center" as const,
                    gap: 10
                  }}>
                    🎯 Resumen táctil (toca las tarjetas)
                  </h3>

                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: 20,
                    }}
                  >
                    <Page2Flashcard
                      front="✨ Regla 3:1"
                      back="Por cada solicitud, entrega 3 aportes: oportunidades, síntesis de aprendizajes o conectar personas."
                      fontSize={fs}
                      colorIndex={0}
                    />
                    <Page2Flashcard
                      front="📅 Frecuencia y cadencia"
                      back="Inicio: 5–10 nuevos/mes. Mantenimiento: 1–2 aportes/semana. Seguimiento: registra a quién escribiste y cuándo."
                      fontSize={fs}
                      colorIndex={1}
                    />
                    <Page2Flashcard
                      front="🎯 Cómo priorizar"
                      back="Top 10 alineado a tus metas; luego alto potencial de colaboración y probabilidad de respuesta."
                      fontSize={fs}
                      colorIndex={2}
                    />
                    <Page2Flashcard
                      front="🚀 Siguiente paso claro"
                      back="Mensaje breve con objetivo, reunión de 15–20 min o envío de recurso/mini-solución."
                      fontSize={fs}
                      colorIndex={3}
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

/* ───────────────────────── Page 3 ───────────────────────── */

type TFQuestion = { text: string; answer: boolean }

const TF_QUESTIONS: TFQuestion[] = [
  { text: "Un mapa de relaciones ayuda a priorizar a quién acercarte y con qué objetivo.", answer: true },
  { text: "En networking, “pares” se refiere a jefes.", answer: false },
  { text: "Los “puentes” suelen ser perfiles que conectan con muchas personas, como reclutadores o líderes.", answer: true },
  { text: "Un mentor aporta orientación y validación basada en su experiencia.", answer: true },
  { text: "En cada contacto conviene definir objetivo, valor que ofreces y siguiente paso.", answer: true },
  { text: "La regla 3:1 significa pedir tres veces por cada vez que aportas.", answer: false },
  { text: "Un circuito de valor es un intercambio donde ambas partes ganan y repiten.", answer: true },
  { text: "La mejor forma de priorizar contactos es al azar o por número de seguidores.", answer: false },
  { text: "Una buena cadencia de mantenimiento es 1–2 aportes por semana, breves y útiles.", answer: true },
  { text: "Que te pidan consejos o te agradezcan recursos es señal de que aportas valor.", answer: true },
  { text: "Registrar interacciones sirve para no duplicar mensajes y dar seguimiento a tiempo.", answer: true },
  { text: "Un siguiente paso claro puede ser proponer una llamada breve con agenda.", answer: true },
  { text: "Para empezar el mes, 5–10 contactos relevantes es una meta razonable.", answer: true },
  { text: "“Referenciable” significa que otros te recomiendan por el valor que aportas.", answer: true },
  { text: "La calidad de tu red se mide mejor por el número de seguidores que por la continuidad de los intercambios.", answer: false },
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
  imageSrc?: string
  imageAlt?: string
  // Quiz tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: boolean | null, correctAnswer: boolean, isCorrect: boolean) => void
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
  progressPercent = 50,
  title = "Mapa de relaciones y networking — Quiz (15)",
  topicTitle = "Priorizar contactos • Pares • Puentes • Mentoría • Cadencia • Circuito de valor",
  layoutOption = "B",
  baseFontSize = 18,
  imageSrc = "",
  imageAlt = "Imagen de la sección",
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: Page3Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm5s2-page3-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-p3 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
    }
  }, [])

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

  const total = TF_QUESTIONS.length
  const [idx, setIdx] = useState(0)
  const [selection, setSelection] = useState<(boolean | null)[]>(Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(Array(total).fill(false))
  const [score, setScore] = useState(0)
  const scoreRef = React.useRef(0) // Track current score via ref for accurate submission
  
  // Reset score ref when component mounts (fresh quiz attempt)
  React.useEffect(() => {
    scoreRef.current = 0
  }, [])

  const q = TF_QUESTIONS[idx]
  const quizProgressPct = Math.round(((idx + 1) / total) * 100)
  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total

  const optStyle = (active: boolean, isTrue: boolean): React.CSSProperties => {
    const greenColors = { bg: "#16a34a", light: "#F0FDF4", accent: "#22c55e" }
    const redColors = { bg: "#dc2626", light: "#FEF2F2", accent: "#ef4444" }
    const colors = isTrue ? greenColors : redColors
    
    return {
      padding: "20px 24px",
      borderRadius: 18,
      border: `3px solid ${active ? colors.accent : "rgba(0,0,0,0.12)"}`,
      background: active 
        ? `linear-gradient(135deg, ${colors.light}, #fff)` 
        : "#fff",
    fontWeight: 800,
      fontSize: fs * 1.1,
    letterSpacing: 0.2,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "left",
      boxShadow: active 
        ? `0 12px 32px ${colors.bg}30` 
        : "0 4px 12px rgba(0,0,0,0.06)",
    transformOrigin: "center",
      position: "relative" as const,
      overflow: "hidden" as const,
    }
  }

  const handleSelectTF = (value: boolean) => {
    if (checked[idx]) return

    const isCorrect = value === q.answer

    setSelection((prev) => {
      const next = [...prev]
      next[idx] = value
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
    
    // Update score properly - use ref for immediate access
    if (isCorrect) {
      setScore((s) => s + 1)
      scoreRef.current += 1
    }

    // Track answer submission
    if (onAnswerSubmit) {
      console.log(`M5S2P3: Submitting answer ${idx}: ${value}, correct=${q.answer}, isCorrect=${isCorrect}`)
      onAnswerSubmit(idx, q.text, value, q.answer, isCorrect)
    }

    if (idx < total - 1) {
      setTimeout(() => setIdx((i) => i + 1), 250)
    } else {
      // Last question - complete quiz after delay
      const finalScore = scoreRef.current
      console.log("M5S2P3: Last question answered, completing quiz with score:", finalScore)
      setTimeout(() => {
        if (onQuizComplete) {
          onQuizComplete(finalScore)
        }
      }, 100)
    }
  }

  const feedback =
    checked[idx] && correct[idx] ? (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ color: "#0a7f35", fontWeight: 700, fontSize: fs * 1.1 }}>✅ ¡Correcto!</motion.div>
    ) : checked[idx] && !correct[idx] ? (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ color: "#b00020", fontWeight: 700, fontSize: fs * 1.1 }}>
        ❌ Incorrecto. Era <strong>{q.answer ? "Verdadero" : "Falso"}</strong>
      </motion.div>
    ) : null

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
        {/* Header */}
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={progressPercent}
          brandName={brandName}
          logoSrc={logoSrc || undefined}
        />

        <section style={{ flex: 1, display: "block" }}>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {/* Título + Tema */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                      style={{
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2, ${primaryColor})`,
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                    animation: "shimmer-title-p3 3s ease-in-out infinite",
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
                    margin: "8px 0 0", 
                    opacity: 0.9, 
                    fontSize: fs * 1.4,
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}CC, #4A90E2CC)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
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
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </motion.p>
              </motion.div>

              <motion.div variants={itemVar}>
                <motion.div
                  style={{
                    position: "relative" as const,
                    borderRadius: 20,
                    padding: 26,
                    border: `2px solid ${primaryColor}22`,
                    background: `linear-gradient(135deg, #fff 0%, ${primaryColor}08 50%, #fff 100%)`,
                    backdropFilter: "blur(6px)",
                    boxShadow: `0 10px 40px ${primaryColor}15`,
                    overflow: "hidden" as const,
                  }}
                  animate={{ 
                    boxShadow: [
                      `0 10px 40px ${primaryColor}15`,
                      `0 14px 50px ${primaryColor}20`,
                      `0 10px 40px ${primaryColor}15`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "6px",
                    backgroundImage: `linear-gradient(90deg, ${primaryColor}, #4A90E2, ${primaryColor})`,
                    backgroundSize: "200% auto",
                    animation: "shimmer-title-p3 2.5s ease-in-out infinite"
                  }} />
                  <div style={{ display: "flex" as const, alignItems: "center" as const, justifyContent: "space-between" as const, marginBottom: 16 }}>
                    <strong style={{ 
                      fontSize: fs * 1.2,
                      backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}>
                      Pregunta {idx + 1} / {total}
                    </strong>
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 12 }}>
                      <div style={{ width: 240, height: 14, background: "rgba(15, 98, 254, 0.1)", borderRadius: 999, overflow: "hidden" }}>
                        <motion.div
                          style={{
                            height: "100%",
                            background: `linear-gradient(90deg, ${primaryColor}, #4A90E2)`,
                            borderRadius: 999,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${quizProgressPct}%` }}
                          transition={{ duration: 220, ease: "easeOut" }}
                        />
                      </div>
                      <span style={{ 
                        fontSize: fs * 1.0, 
                        fontWeight: 800,
                        backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}>
                        {quizProgressPct}%
                      </span>
                    </div>
                  </div>

                  <p style={{ 
                    margin: "10px 0 20px", 
                    lineHeight: 1.6, 
                    fontSize: fs * 1.5,
                    fontWeight: 600,
                    padding: "16px",
                    background: `linear-gradient(135deg, ${primaryColor}08, #4A90E208)`,
                    borderRadius: 12,
                    border: `1px solid ${primaryColor}22`
                  }}>{q.text}</p>

                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    {[
                      { label: "✅ Verdadero", value: true },
                      { label: "❌ Falso", value: false },
                    ].map((opt) => {
                      const active = selection[idx] === opt.value
                      return (
                        <motion.div
                          key={String(opt.value)}
                          role="button"
                          tabIndex={0}
                          whileHover={{ scale: 0.95, y: -4 }}
                          whileTap={{ scale: 0.92 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          onClick={() => handleSelectTF(opt.value)}
                          style={optStyle(active, opt.value)}
                        >
                          <div style={{ 
                            fontWeight: 900, 
                            marginBottom: 8,
                            backgroundImage: active 
                              ? `linear-gradient(135deg, ${opt.value ? '#16a34a' : '#dc2626'}, ${opt.value ? '#22c55e' : '#ef4444'})`
                              : undefined,
                            WebkitBackgroundClip: active ? "text" : undefined,
                            WebkitTextFillColor: active ? "transparent" : (active ? "#fff" : "#111"),
                            backgroundClip: active ? "text" : undefined,
                          }}>
                            {opt.label}
                          </div>
                          <div style={{ 
                            opacity: active ? 1 : 0.7,
                            fontSize: fs * 0.9,
                            fontWeight: 600
                          }}>
                            {active ? "✓ Seleccionado" : "Selecciona esta opción"}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  <motion.div 
                    style={{ 
                      minHeight: 40, 
                      display: "flex" as const, 
                      alignItems: "center" as const,
                      padding: "12px 0"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: feedback ? 1 : 0 }}
                  >
                    {feedback}
                  </motion.div>

                  {finished ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{
                        marginTop: 20,
                        padding: 20,
                        border: `2px solid ${primaryColor}`,
                        borderRadius: 16,
                        background: `linear-gradient(135deg, ${primaryColor}15, #4A90E215)`,
                        display: "flex" as const,
                        alignItems: "center" as const,
                        justifyContent: "space-between" as const,
                      }}
                    >
                      <strong style={{ 
                        fontSize: fs * 1.2,
                        backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}>
                        🎉 Resultado:
                      </strong>
                      <span style={{ 
                        fontWeight: 900, 
                        fontSize: fs * 1.5,
                        backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}>
                        {score} / {total}
                      </span>
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

/* ───────────────────────── Page 4 ───────────────────────── */

type MCQuestion = { text: string; options: string[]; correctIndex: number }

const MC_QUESTIONS: MCQuestion[] = [
  {
    text: "Un mapa de relaciones sirve para...",
    options: [
      "Tener más seguidores",
      "Priorizar a quién acercarte y con qué objetivo",
      "Automatizar mensajes",
      "Evitar hablar con gente",
    ],
    correctIndex: 1, // B
  },
  {
    text: "'Pares' se refiere a...",
    options: ["Jefes", "Clientes", "Familia", "Personas de tu nivel/área que comparten recursos"],
    correctIndex: 3, // D
  },
  {
    text: "Los 'puentes' son...",
    options: [
      "Competidores",
      "Contactos pasivos",
      "Bots",
      "Perfiles que conectan con más personas (reclutadores, líderes)",
    ],
    correctIndex: 3, // D
  },
  {
    text: "Un mentor aporta...",
    options: ["Likes", "Descuentos", "Orientación y validación desde la experiencia", "Publicidad"],
    correctIndex: 2, // C
  },
  {
    text: "En cada contacto conviene definir...",
    options: ["Un regalo", "Un meme", "Objetivo, valor que ofreces y siguiente paso", "Un eslogan"],
    correctIndex: 2, // C
  },
  {
    text: "La regla 3:1 implica...",
    options: [
      "Pedir tres veces más de lo que das",
      "Solo dar sin pedir",
      "Aportar tres veces por cada solicitud",
      "Enviar tres correos seguidos",
    ],
    correctIndex: 2, // C
  },
  {
    text: "Un circuito de valor es...",
    options: ["Un grupo de WhatsApp", "Un CRM", "Intercambio donde ambas partes ganan y repiten", "Un currículum"],
    correctIndex: 2, // C
  },
  {
    text: "La mejor forma de priorizar contactos es...",
    options: [
      "Al azar",
      "Por número de seguidores",
      "Según metas, aprendizaje y probabilidad de respuesta",
      "Por cercanía física",
    ],
    correctIndex: 2, // C
  },
  {
    text: "Cadencia recomendada de mantenimiento...",
    options: ["Una vez al año", "Cada hora", "1–2 aportes por semana (breves y útiles)", "Solo cuando necesitas algo"],
    correctIndex: 2, // C
  },
  {
    text: "Una señal de que aportas valor es...",
    options: ["Te dejan en visto", "Te piden consejos/referencias o te agradecen recursos", "Te bloquean", "No responden"],
    correctIndex: 1, // B
  },
  {
    text: "Registrar interacciones sirve para...",
    options: ["Vender cursos", "No duplicar mensajes y dar seguimiento a tiempo", "Ganar likes", "Enviar spam"],
    correctIndex: 1, // B
  },
  {
    text: "Un ejemplo de 'siguiente paso' es...",
    options: ["Decir 'saludos'", "Proponer una llamada breve con agenda", "Pedir dinero", "Enviar memes"],
    correctIndex: 1, // B
  },
  {
    text: "Para empezar el mes, una meta razonable es...",
    options: ["5–10 contactos relevantes", "100 contactos nuevos", "0 contactos", "50 bots"],
    correctIndex: 0, // A
  },
  {
    text: "'Referenciable' significa...",
    options: ["Que otros te recomiendan por el valor que aportas", "Viral", "Famoso", "Caro"],
    correctIndex: 0, // A
  },
  {
    text: "La calidad de tu red se mide mejor por...",
    options: ["Calidad y continuidad de los intercambios", "Cantidad de seguidores", "Número de likes", "Cantidad de grupos"],
    correctIndex: 0, // A
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
  progressPercent = 75,
  title = "Quiz: Mapa de relaciones y networking",
  topicTitle = "Mapa de relaciones • Pares • Puentes • Mentores • Circuito de valor",
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

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm5s2-page4-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-p4 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
    }
  }, [])

  const wrapper = useMemo(
    () => ({
      width: "100%",
      display: "flex" as const,
      flexDirection: "column" as const,
      justifyContent: "flex-start",
      minHeight: "100vh",
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
      maxWidth: "none",
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
    padding: "18px 20px",
    borderRadius: 16,
    border: `3px solid ${active ? primaryColor : "rgba(0,0,0,0.08)"}`,
    background: active 
      ? `linear-gradient(135deg, ${primaryColor}15, #4A90E215)` 
      : "#fff",
    fontWeight: 800,
    fontSize: fs * 1.1,
    letterSpacing: 0.2,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "left",
    boxShadow: active 
      ? `0 12px 32px ${primaryColor}25` 
      : "0 4px 12px rgba(0,0,0,0.06)",
    transformOrigin: "center",
    position: "relative" as const,
    overflow: "hidden" as const,
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
      console.log(`M5S2P4: Submitting answer ${idx}: ${optionIndex}, correct=${q.correctIndex}, isCorrect=${isCorrect}`)
      onAnswerSubmit(idx, q.text, q.options[optionIndex], q.options[q.correctIndex], isCorrect)
    }

    if (idx < total - 1) {
      setTimeout(() => setIdx((i) => i + 1), autoAdvanceDelayMs)
    } else {
      // Last question - complete quiz after delay
      console.log("M5S2P4: Last question answered, completing quiz with score:", newScore)
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
      <div style={wrapper}><SectionPageHeader
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

  return (
    <div style={wrapper}><SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%", display: "block" as const, flex: 1 }}>
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 2.5, 
                    lineHeight: 1.15,
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2, ${primaryColor})`,
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                    animation: "shimmer-title-p4 3s ease-in-out infinite",
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
                    margin: "8px 0 0", 
                    opacity: 0.9, 
                    fontSize: fs * 1.25,
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}CC, #4A90E2CC)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
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
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </motion.p>
              </motion.div>

              <motion.div variants={itemVar}>
                <motion.div
                  style={{
                    position: "relative" as const,
                    borderRadius: 20,
                    padding: 28,
                    border: `2px solid ${primaryColor}22`,
                    background: `linear-gradient(135deg, #fff 0%, ${primaryColor}08 50%, #fff 100%)`,
                    backdropFilter: "blur(6px)",
                    boxShadow: `0 10px 40px ${primaryColor}15`,
                    overflow: "hidden" as const,
                  }}
                  animate={{ 
                    boxShadow: [
                      `0 10px 40px ${primaryColor}15`,
                      `0 14px 50px ${primaryColor}20`,
                      `0 10px 40px ${primaryColor}15`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "6px",
                    backgroundImage: `linear-gradient(90deg, ${primaryColor}, #4A90E2, ${primaryColor})`,
                    backgroundSize: "200% auto",
                    animation: "shimmer-title-p4 2.5s ease-in-out infinite"
                  }} />
                  <div
                    style={{
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "space-between" as const,
                      marginBottom: 18,
                    }}
                  >
                    <strong style={{ 
                      fontSize: fs * 1.3,
                      backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}>
                      Pregunta {Math.min(idx + 1, total)} / {total}
                    </strong>
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 12 }}>
                      <div
                        style={{
                          width: 260,
                          height: 14,
                          background: "rgba(15, 98, 254, 0.1)",
                          borderRadius: 999,
                          overflow: "hidden" as const,
                        }}
                      >
                        <motion.div
                          style={{
                            height: "100%",
                            background: `linear-gradient(90deg, ${primaryColor}, #4A90E2)`,
                            borderRadius: 999,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${quizProgressPct}%` }}
                          transition={{ duration: 220, ease: "easeOut" }}
                        />
                      </div>
                      <span style={{ 
                        fontSize: fs * 1.0, 
                        fontWeight: 800,
                        backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}>
                        {quizProgressPct}%
                      </span>
                    </div>
                  </div>

                  <p style={{ 
                    margin: "10px 0 20px", 
                    lineHeight: 1.6, 
                    fontSize: fs * 1.4,
                    fontWeight: 600,
                    padding: "18px",
                    background: `linear-gradient(135deg, ${primaryColor}08, #4A90E208)`,
                    borderRadius: 14,
                    border: `1px solid ${primaryColor}22`
                  }}>{q.text}</p>

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
                          whileHover={disabled ? undefined : { scale: 1.03, y: -6 }}
                          whileTap={disabled ? undefined : { scale: 0.92 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                          <div style={{ 
                            fontWeight: 900, 
                            fontSize: fs * 1.15,
                            marginBottom: 8,
                            display: "flex",
                            alignItems: "center",
                            gap: 8
                          }}>
                            <span style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: active 
                                ? `linear-gradient(135deg, ${primaryColor}, #4A90E2)`
                                : "#f0f0f0",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 900,
                              fontSize: fs * 1.0
                            }}>
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span style={{
                              backgroundImage: active 
                                ? `linear-gradient(135deg, ${primaryColor}, #4A90E2)`
                                : undefined,
                              WebkitBackgroundClip: active ? "text" : undefined,
                              WebkitTextFillColor: active ? "transparent" : "#111",
                              backgroundClip: active ? "text" : undefined,
                            }}>
                          {opt}
                            </span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  <motion.div 
                    style={{ 
                      minHeight: 40, 
                      marginBottom: 8,
                      padding: "12px 0"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: feedback ? 1 : 0 }}
                  >
                    {feedback}
                  </motion.div>

                  {finished ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{
                        marginTop: 20,
                        padding: 20,
                        border: `2px solid ${primaryColor}`,
                        borderRadius: 16,
                        background: `linear-gradient(135deg, ${primaryColor}15, #4A90E215)`,
                        display: "flex" as const,
                        alignItems: "center" as const,
                        justifyContent: "space-between" as const,
                      }}
                    >
                      <strong style={{ 
                        fontSize: fs * 1.2,
                        backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}>
                        🎉 Resultado:
                      </strong>
                      <span style={{ 
                        fontWeight: 900, 
                        fontSize: fs * 1.5,
                        backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}>
                        {score} / {total}
                      </span>
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

/* ───────────────────────── Page 5 ───────────────────────── */

const DEFAULT_PAGE5_INSTRUCTIONS = [
  "Lista 10 contactos o perfiles tipo distribuidos en 3 capas: Pares (recursos y feedback), Puentes (reclutadores, líderes, profes) y Mentores.",
  "Anota 3 comunidades activas donde podrías participar (grupos, foros, capítulos locales).",
  "Elige 1 posible mentor y escribe 1–2 razones por las que te gustaría aprender de esa persona.",
  "Para cada uno de los 10 contactos, escribe por qué conectas y el siguiente paso (mensaje, reunión o envío).",
  "Plantilla sugerida: “Nombre/Perfil — Conecto para [motivo]. Siguiente paso: [acción] (fecha).”.",
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

// Interactive Contact Card for the mapping activity
function InteractiveContactCard({
  contact,
  onUpdate,
  onDelete,
  colorScheme,
}: {
  contact: { name: string; category: string; value: string; nextStep: string; complete: boolean }
  onUpdate: (field: string, value: string) => void
  onDelete: () => void
  colorScheme: { bg: string; accent: string; light: string }
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      style={{
        border: `2px solid ${colorScheme.accent}`,
        borderRadius: 20,
        background: `linear-gradient(135deg, ${colorScheme.light}, #fff)`,
        padding: 20,
        boxShadow: `0 8px 24px ${colorScheme.bg}20`,
        position: "relative" as const,
        overflow: "hidden" as const,
      }}
    >
      <div style={{
        position: "absolute" as const,
        top: 0,
        left: 0,
        width: "100%",
        height: "4px",
        background: colorScheme.accent
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <input
          type="text"
          value={contact.name}
          onChange={(e) => onUpdate('name', e.target.value)}
          placeholder="Nombre del contacto"
          style={{
            border: `2px solid ${colorScheme.accent}44`,
            borderRadius: 12,
            padding: "10px 14px",
            fontSize: 16,
            fontWeight: 700,
            flex: 1,
            background: "#fff"
          }}
        />
        <motion.button
          onClick={onDelete}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            background: "#ef4444",
            color: "white",
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ×
        </motion.button>
      </div>
      
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          value={contact.category}
          onChange={(e) => onUpdate('category', e.target.value)}
          placeholder="Categoría (Pares/Puentes/Mentores)"
          style={{
            border: `2px solid ${colorScheme.accent}44`,
            borderRadius: 10,
            padding: "8px 12px",
            fontSize: 14,
            width: "100%",
            background: "#fff"
          }}
        />
      </div>
      
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <textarea
            value={contact.value}
            onChange={(e) => onUpdate('value', e.target.value)}
            placeholder="¿Qué valor intercambiarás?"
            rows={2}
            style={{
              border: `2px solid ${colorScheme.accent}44`,
              borderRadius: 10,
              padding: "10px",
              fontSize: 14,
              width: "100%",
              marginBottom: 10,
              resize: "vertical" as const,
              background: "#fff"
            }}
          />
          <input
            type="text"
            value={contact.nextStep}
            onChange={(e) => onUpdate('nextStep', e.target.value)}
            placeholder="Siguiente paso concreto"
            style={{
              border: `2px solid ${colorScheme.accent}44`,
              borderRadius: 10,
              padding: "8px 12px",
              fontSize: 14,
              width: "100%",
              background: "#fff"
            }}
          />
        </motion.div>
      )}
      
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: 10,
          padding: "8px 16px",
          borderRadius: 10,
          border: `2px solid ${colorScheme.accent}`,
          background: colorScheme.accent,
          color: "white",
          fontWeight: 700,
          cursor: "pointer",
          fontSize: 13
        }}
      >
        {isExpanded ? "▲ Ocultar detalles" : "▼ Ver detalles"}
      </motion.button>
    </motion.div>
  )
}

function Page5Flashcard({
  front,
  back,
  fontSize,
  colorIndex = 0,
}: {
  front: string
  back: string
  fontSize: number
  colorIndex?: number
}) {
  const [open, setOpen] = useState(false)
  const colors = [
    { bg: "#0F62FE", accent: "#2563eb", light: "#E3F2FD" }, // Blue
    { bg: "#7c3aed", accent: "#8b5cf6", light: "#F3E5F5" }, // Purple
    { bg: "#16a34a", accent: "#22c55e", light: "#F0FDF4" }, // Green
    { bg: "#ea580c", accent: "#f97316", light: "#FFF7ED" }, // Orange
  ]
  const cardColors = colors[colorIndex % colors.length]
  
  return (
    <motion.div
      role="button"
      onClick={() => setOpen((v) => !v)}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        userSelect: "none",
        cursor: "pointer",
        borderRadius: 24,
        border: `3px solid ${open ? cardColors.accent : "rgba(0,0,0,0.1)"}`,
        background: open 
          ? `linear-gradient(135deg, ${cardColors.light}, #fff)` 
          : `linear-gradient(135deg, #fff, ${cardColors.light})`,
        padding: 24,
        minHeight: 220,
        boxShadow: open 
          ? `0 16px 40px ${cardColors.bg}35` 
          : `0 8px 24px ${cardColors.bg}15`,
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 16,
        transformOrigin: "center",
        willChange: "transform",
        position: "relative" as const,
        overflow: "hidden" as const,
      }}
    >
      {!open && (
        <div
        style={{
            position: "absolute" as const,
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            backgroundImage: `linear-gradient(90deg, ${cardColors.bg}, ${cardColors.accent}, ${cardColors.bg})`,
            backgroundSize: "200% auto",
            animation: "shimmer-title-p5 2s ease-in-out infinite"
          }}
        />
      )}
      <motion.strong
        style={{
          color: cardColors.accent,
          display: "block" as const,
          fontSize: fontSize * 1.3,
          lineHeight: 1.3,
          fontWeight: 900,
        }}
        animate={open ? { 
          scale: [1, 1.05, 1],
          color: [cardColors.accent, cardColors.bg, cardColors.accent]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {front}
      </motion.strong>

      <motion.p
        style={{
          margin: 0,
          opacity: open ? 0.95 : 0.6,
          fontSize: open ? fontSize * 1.05 : fontSize * 0.9,
          lineHeight: 1.6,
          flex: 1,
          fontWeight: open ? 500 : 400,
          color: open ? cardColors.bg : "#666"
        }}
        animate={open ? {
          opacity: [0, 0.95],
        } : {}}
      >
        {open ? back : "💡 Toca para revelar"}
      </motion.p>
      
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex" as const,
            alignItems: "center" as const,
            gap: 8,
            color: cardColors.accent,
            fontSize: fontSize * 1.0,
            fontWeight: 700,
          }}
        >
          <span>✨</span>
          <span>Ya leído</span>
        </motion.div>
      )}
    </motion.div>
  )
}

function Page5({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 100,
  topicTitle = "Actividad — Mapa 10–3–1",
  layoutOption = "B",
  baseFontSize = 18,
  instructions = DEFAULT_PAGE5_INSTRUCTIONS,
  gridColumns = 1,
  gridGap = 16,
}: Page5Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isLeft = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm5s2-page5-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-p5 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
    }
  }, [])

  const list = (instructions.length ? instructions : DEFAULT_PAGE5_INSTRUCTIONS).map((t, i) => ({
    front: `Paso ${i + 1}`,
    back: t,
  }))

  // Interactive contact mapping state
  const [contacts, setContacts] = useState<Array<{ name: string; category: string; value: string; nextStep: string; complete: boolean }>>([
    { name: "", category: "Pares", value: "", nextStep: "", complete: false },
    { name: "", category: "Pares", value: "", nextStep: "", complete: false },
    { name: "", category: "Puentes", value: "", nextStep: "", complete: false },
  ])

  const colorSchemes = [
    { bg: "#0F62FE", accent: "#2563eb", light: "#E3F2FD" },
    { bg: "#7c3aed", accent: "#8b5cf6", light: "#F3E5F5" },
    { bg: "#16a34a", accent: "#22c55e", light: "#F0FDF4" },
    { bg: "#ea580c", accent: "#f97316", light: "#FFF7ED" },
  ]

  const addContact = () => {
    setContacts([...contacts, { name: "", category: "Pares", value: "", nextStep: "", complete: false }])
  }

  const deleteContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index))
  }

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
      maxWidth: "none",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isLeft]
  )

  return (
    <div style={wrapper}><SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%", display: "block" }}>
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2, ${primaryColor})`,
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                    animation: "shimmer-title-p5 3s ease-in-out infinite",
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
                  {topicTitle}
                </motion.h1>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <motion.div
                  style={{
                    position: "relative" as const,
                    borderRadius: 20,
                    padding: 24,
                    border: `2px solid ${primaryColor}22`,
                    background: `linear-gradient(135deg, #fff 0%, ${primaryColor}08 50%, #fff 100%)`,
                    backdropFilter: "blur(6px)",
                    boxShadow: `0 10px 40px ${primaryColor}15`,
                    overflow: "hidden" as const,
                  }}
                  animate={{ 
                    boxShadow: [
                      `0 10px 40px ${primaryColor}15`,
                      `0 14px 50px ${primaryColor}20`,
                      `0 10px 40px ${primaryColor}15`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "6px",
                    backgroundImage: `linear-gradient(90deg, ${primaryColor}, #4A90E2, ${primaryColor})`,
                    backgroundSize: "200% auto",
                    animation: "shimmer-title-p5 2.5s ease-in-out infinite"
                  }} />
                  <p style={{ 
                    margin: 0, 
                    fontWeight: 800, 
                    fontSize: fs * 1.2,
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    🗺️ Construye tu Mapa 10–3–1: pares, puentes y mentores. Para cada contacto, anota el porqué y el
                    siguiente paso.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <motion.div
                  style={{
                    position: "relative" as const,
                    borderRadius: 20,
                    padding: 24,
                    border: `2px solid ${primaryColor}22`,
                    background: `linear-gradient(135deg, #f8fbff 0%, #fff 50%, #f8fbff 100%)`,
                    backdropFilter: "blur(6px)",
                    boxShadow: `0 10px 40px rgba(74, 144, 226, 0.15)`,
                    overflow: "hidden" as const,
                  }}
                  animate={{ 
                    boxShadow: [
                      `0 10px 40px rgba(74, 144, 226, 0.15)`,
                      `0 14px 50px rgba(74, 144, 226, 0.25)`,
                      `0 10px 40px rgba(74, 144, 226, 0.15)`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "6px",
                    backgroundImage: `linear-gradient(90deg, #4A90E2, ${primaryColor}, #4A90E2)`,
                    backgroundSize: "200% auto",
                    animation: "shimmer-title-p5 2.5s ease-in-out infinite"
                  }} />
                  <h3 style={{ 
                    margin: "0 0 16px 0", 
                    fontSize: fs * 1.6,
                    backgroundImage: `linear-gradient(135deg, #4A90E2, ${primaryColor})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 900,
                    display: "flex" as const,
                    alignItems: "center" as const,
                    gap: 12
                  }}>
                    📝 Mapa 10–3–1 (para libreta)
                  </h3>
                  <p style={{ 
                    margin: "0 0 20px 0", 
                    opacity: 0.8,
                    fontSize: fs * 1.1,
                    fontWeight: 600,
                    color: "#666"
                  }}>
                    💡 Toca cada tarjeta para ver la instrucción y completa tu mapa en la libreta.
                  </p>

                  <Page5GridFlashcards gap={gridGap} columns={gridColumns}>
                    {list.map((c, i) => (
                      <Page5Flashcard key={i} front={c.front} back={c.back} fontSize={fs} colorIndex={i % 4} />
                    ))}
                  </Page5GridFlashcards>
                </motion.div>
              </motion.div>

              {/* Interactive Mapping Activity */}
              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <motion.div
                  style={{
                    position: "relative" as const,
                    borderRadius: 20,
                    padding: 28,
                    border: `2px solid ${primaryColor}22`,
                    background: `linear-gradient(135deg, #fff 0%, ${primaryColor}08 50%, #fff 100%)`,
                    backdropFilter: "blur(6px)",
                    boxShadow: `0 10px 40px ${primaryColor}15`,
                    overflow: "hidden" as const,
                  }}
                  animate={{ 
                    boxShadow: [
                      `0 10px 40px ${primaryColor}15`,
                      `0 14px 50px ${primaryColor}20`,
                      `0 10px 40px ${primaryColor}15`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "6px",
                    backgroundImage: `linear-gradient(90deg, ${primaryColor}, #4A90E2, ${primaryColor})`,
                    backgroundSize: "200% auto",
                    animation: "shimmer-title-p5 2.5s ease-in-out infinite"
                  }} />
                  <h3 style={{ 
                    margin: "0 0 18px 0", 
                    fontSize: fs * 1.6,
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}, #4A90E2)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 900,
                    display: "flex" as const,
                    alignItems: "center" as const,
                    gap: 12
                  }}>
                    ✏️ Construye tu Mapa Interactivo
                  </h3>
                  <p style={{ 
                    margin: "0 0 20px 0", 
                    opacity: 0.8,
                    fontSize: fs * 1.1,
                    fontWeight: 600,
                    color: "#666"
                  }}>
                    Agrega contactos y define tu mapa de relaciones. Completa al menos 5 contactos.
                  </p>

                  <div style={{ marginBottom: 16 }}>
                    <motion.button
                      onClick={addContact}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: "14px 24px",
                        borderRadius: 14,
                        border: "none",
                        background: `linear-gradient(135deg, ${primaryColor}, #4A90E2)`,
                        color: "white",
                        fontWeight: 900,
                        fontSize: fs * 1.1,
                        cursor: "pointer",
                        boxShadow: `0 8px 24px ${primaryColor}30`,
                        display: "flex" as const,
                        alignItems: "center" as const,
                        gap: 8
                      }}
                    >
                      <span>➕</span>
                      <span>Agregar Contacto</span>
                    </motion.button>
                  </div>

                  <div style={{
                    display: "grid" as const,
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: 20
                  }}>
                    {contacts.map((contact, i) => (
                      <InteractiveContactCard
                        key={i}
                        contact={contact}
                        onUpdate={(field, value) => {
                          const updated = [...contacts]
                          updated[i] = { ...updated[i], [field]: value }
                          setContacts(updated)
                        }}
                        onDelete={() => deleteContact(i)}
                        colorScheme={colorSchemes[i % colorSchemes.length]}
                      />
                    ))}
                  </div>

                  {contacts.length >= 5 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: 24,
                        padding: 20,
                        borderRadius: 16,
                        background: `linear-gradient(135deg, #16a34a15, #22c55e15)`,
                        border: `2px solid #16a34a`,
                        textAlign: "center" as const
                      }}
                    >
                      <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
                      <strong style={{ 
                        fontSize: fs * 1.3,
                        color: "#16a34a",
                        display: "block",
                        marginBottom: 8
                      }}>
                        ¡Excelente! Tienes {contacts.length} contactos en tu mapa
                      </strong>
                      <p style={{ margin: 0, color: "#666", fontSize: fs }}>
                        Continúa construyendo tu red siguiendo los pasos de arriba.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

/* ───────────────────────── Export ───────────────────────── */

const M5S2_CONTENT: Record<number, React.ReactNode> = {
  1: <Page1 />,
  2: <Page2 />,
  3: <Page3 />,
  4: <Page4 />,
  5: <Page5 />,
}

export default M5S2_CONTENT

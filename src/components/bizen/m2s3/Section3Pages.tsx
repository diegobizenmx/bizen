/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useMemo, useState } from "react"
import { motion, Variants } from "framer-motion"
import SectionPageHeader from "@/components/bizen/SectionPageHeader"
import { useQuizPersistence } from "@/hooks/useQuizPersistence"
import MarketingFactsAnimation from "@/components/MarketingFactsAnimation"

/** Tipos */
type LayoutOption = "A" | "B"

type Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  introText?: string
  keyIdea?: string

  // Bloque 1
  whyTitle?: string
  whyBody?: string
  whyExampleTitle?: string
  whyExampleText?: string

  // Bloque 2
  glossaryTitle?: string
  glossaryItems?: string[]

  // Bloque 3
  stepsTitle?: string
  stepsItems?: string[]
  errorsTitle?: string
  errorsItems?: string[]

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

// Interactive Checklist Item Component
function InteractiveChecklistItem({ text, fs, variant, index }: { text: string; fs: number; variant: "success" | "error"; index: number }) {
  const [isChecked, setIsChecked] = useState(false);

  const isSuccess = variant === "success";
  const borderColor = isSuccess ? "#1e40af" : "#dc2626";
  const backgroundColor = isSuccess 
    ? (isChecked ? "linear-gradient(135deg, #f0fdf4, #dcfce7)" : "linear-gradient(135deg, #f0f7ff, #ffffff)")
    : (isChecked ? "linear-gradient(135deg, #fef2f2, #fee2e2)" : "linear-gradient(135deg, #fff5f5, #ffffff)");
  const textColor = isSuccess ? "#1e40af" : "#dc2626";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setIsChecked(!isChecked)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: 16,
        borderRadius: 12,
        border: `2px solid ${isChecked ? (isSuccess ? "#10b981" : "#ef4444") : borderColor}`,
        background: backgroundColor,
        cursor: "pointer",
        userSelect: "none" as const,
        transition: "all 0.3s ease",
        boxShadow: isChecked 
          ? `0 4px 12px rgba(${isSuccess ? "16, 185, 129" : "239, 68, 68"}, 0.15)`
          : "0 2px 8px rgba(0,0,0,0.05)"
      }}
      whileHover={{ 
        scale: 1.02,
        borderColor: isSuccess ? "#3B82F6" : "#f87171",
        boxShadow: `0 6px 16px rgba(${isSuccess ? "59, 130, 246" : "248, 113, 113"}, 0.2)`
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Checkbox */}
      <motion.div
        animate={{
          scale: isChecked ? 1 : 0.8,
          rotate: isChecked ? 0 : -10
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: `3px solid ${isChecked ? (isSuccess ? "#10b981" : "#ef4444") : borderColor}`,
          background: isChecked 
            ? (isSuccess 
                ? "linear-gradient(135deg, #10b981, #059669)"
                : "linear-gradient(135deg, #ef4444, #dc2626)")
            : "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: isChecked 
            ? `0 4px 12px rgba(${isSuccess ? "16, 185, 129" : "239, 68, 68"}, 0.3)`
            : "none",
          transition: "all 0.3s ease"
        }}
      >
        {isChecked && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5 10l3 3 7-7"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </motion.div>

      {/* Text */}
      <p style={{
        margin: 0,
        fontSize: fs * 1.05,
        color: textColor,
        fontWeight: isChecked ? 600 : 500,
        lineHeight: 1.5,
        textDecoration: isChecked ? "none" : "none"
      }}>
        {text}
      </p>
    </motion.div>
  );
}

// Flashcard Component
function GlossaryFlashcard({ term, definition, fs }: { term: string; definition: string; fs: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        userSelect: "none" as const,
        cursor: "pointer",
        borderRadius: 16,
        border: "2px solid #1e40af",
        background: isFlipped 
          ? "linear-gradient(135deg, #1e40af, #3B82F6)" 
          : "linear-gradient(135deg, #f0f7ff, #ffffff)",
        padding: 20,
        minHeight: 180,
        boxShadow: isHovered 
          ? "0 12px 36px rgba(30, 64, 175, 0.25)"
          : "0 6px 20px rgba(0,0,0,0.1)",
        display: "flex" as const,
        flexDirection: "column" as const,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center" as const,
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      animate={{
        rotateY: isFlipped ? 180 : 0,
      }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
    >
      {!isFlipped ? (
        <>
          <strong style={{ 
            fontSize: fs * 1.2, 
            color: "#1e40af", 
            marginBottom: 12,
            fontWeight: 800
          }}>
            {term}
          </strong>
          <p style={{ 
            margin: 0, 
            fontSize: fs * 0.9, 
            opacity: 0.7, 
            fontStyle: "italic",
            color: "#1e40af"
          }}>
            👆 Toca para ver la definición
          </p>
        </>
      ) : (
        <p style={{ 
          margin: 0, 
          fontSize: fs * 1, 
          lineHeight: 1.6, 
          color: "white",
          fontWeight: 500
        }}>
          {definition}
        </p>
      )}
    </motion.div>
  );
}

function BSMXSection3({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 0,
  title = "",
  topicTitle = "Estrategias para transmitir confianza y coherencia",
  introText = "La confianza se gana cuando lo que prometes coincide con lo que entregas. La coherencia convierte interacciones aisladas en una experiencia predecible y segura.",
  keyIdea = "Confianza = (Competencia + Honestidad + Calidez) × Coherencia a lo largo del tiempo y en todos los puntos de contacto.",

  // 1) ¿Por qué importa?
  whyTitle = "1) ¿Por qué importan la confianza y la coherencia?",
  whyBody = "Las personas compran cuando perciben bajo riesgo. Señales claras de credibilidad y una experiencia consistente reducen incertidumbre, aceleran decisiones y fomentan la recomendación.",
  whyExampleTitle = "Ejemplos de señal de confianza",
  whyExampleText = "Casos reales con métricas, testimonios verificables, políticas transparentes (precio, devoluciones, tiempos), y un tono/visual coherente en web, redes y atención.",

  // 2) Glosario y decisiones
  glossaryTitle = "2) Glosario y decisiones clave",
  glossaryItems = [
    "Prueba social: evidencia de terceros (reseñas, casos, logos) que valida tus promesas.",
    "Transparencia: políticas claras y fáciles de encontrar (precios, plazos, garantías).",
    "Consistencia: mismo tono, visual y promesas en todos los canales y momentos.",
    "Autoridad: certificaciones, experiencia, publicaciones o premios relevantes.",
    "Fricción baja: proceso simple y predecible (onboarding, pagos, soporte).",
  ],

  // 3) Pasos + Errores
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

  heroImage = "",
  layoutOption = "A",
  baseFontSize = 18,
}: Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s3-page1-shimmer-effects';
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
      maxWidth: "none",
      padding: 20,
      boxSizing: "border-box" as const,
    }),
    [isA]
  )

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)))

  return (
    <div style={wrapper}><SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%" }}>
        {/* Contenido */}
        <section>
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

              {/* Hero */}
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

              {/* Introducción */}
              {introText ? (
                <motion.div 
                  variants={itemVar} 
                  style={{ marginBottom: 16 }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card glow="#1e40af">
                    <p style={{ 
                      margin: 0, 
                      opacity: 0.95, 
                      fontSize: fs,
                      color: "#1e40af",
                      fontWeight: 500
                    }}>{introText}</p>
                  </Card>
                </motion.div>
              ) : null}

              {/* Idea clave */}
              {keyIdea ? (
                <motion.div 
                  variants={itemVar} 
                  style={{ marginBottom: 16 }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    style={{
                      border: "2px solid #1e40af",
                      background: "linear-gradient(135deg, #f0f7ff, #ffffff)",
                      color: "#111",
                      borderRadius: 16,
                      padding: 20,
                      boxShadow: "0 8px 24px rgba(30, 64, 175, 0.15)",
                    }}
                  >
                    <strong style={{ 
                      color: "#ffffff",
                      background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      display: "block" as const, 
                      marginBottom: 8, 
                      fontSize: fs * 1.1,
                      fontWeight: 700
                    }}>
                      💡 Idea clave
                    </strong>
                    <p style={{ margin: 0, opacity: 0.95, fontSize: fs, color: "#1e40af", fontWeight: 500 }}>{keyIdea}</p>
                  </div>
                </motion.div>
              ) : null}

              {/* 1) ¿Por qué importa? */}
              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 16 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <Card glow="#1e40af">
                  <h3 style={{ 
                    margin: "0 0 10px 0", 
                    fontSize: fs * 1.355,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 700
                  }}>{whyTitle}</h3>
                  <p style={{ margin: 0, opacity: 0.95, lineHeight: 1.55, color: "#1e40af", fontWeight: 500 }}>{whyBody}</p>
                  <div style={{ marginTop: 12 }}>
                    <strong style={{ 
                      color: "#ffffff",
                      background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      display: "block" as const, 
                      marginBottom: 6,
                      fontWeight: 700
                    }}>
                      {whyExampleTitle}
                    </strong>
                    <p style={{ margin: 0, opacity: 0.95, color: "#1e40af" }}>{whyExampleText}</p>
                  </div>
                </Card>
              </motion.div>

              {/* 2) Glosario y decisiones - Flashcards */}
              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 16 }}
              >
                <Card glow="#1e40af">
                  <h3 style={{ 
                    margin: "0 0 20px 0", 
                    fontSize: fs * 1.355,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 700
                  }}>{glossaryTitle}</h3>
                  
                  <div style={{ 
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 16,
                  }}>
                    {glossaryItems.map((item, i) => {
                      // Split the glossary item into term and definition
                      const colonIndex = item.indexOf(':');
                      const term = colonIndex !== -1 ? item.substring(0, colonIndex).trim() : `Concepto ${i + 1}`;
                      const definition = colonIndex !== -1 ? item.substring(colonIndex + 1).trim() : item;
                      
                      return (
                        <GlossaryFlashcard 
                          key={`flashcard-${i}`}
                          term={term}
                          definition={definition}
                          fs={fs}
                        />
                      );
                    })}
                  </div>
                </Card>
              </motion.div>

              {/* 3) Pasos + Errores - Interactive Checklist */}
              {(stepsItems.length > 0 || errorsItems.length > 0) && (
                <motion.div 
                  variants={itemVar} 
                  style={{ marginBottom: 16 }}
                >
                  <Card glow="#1e40af">
                    {stepsItems.length > 0 && (
                      <>
                        <h3 style={{ 
                          margin: "0 0 20px 0", 
                          fontSize: fs * 1.355,
                          background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          fontWeight: 700
                        }}>{stepsTitle}</h3>
                        <div style={{ 
                          display: "flex",
                          flexDirection: "column",
                          gap: 12
                        }}>
                          {stepsItems.map((item, i) => (
                            <InteractiveChecklistItem
                              key={`step-${i}`}
                              text={item}
                              fs={fs}
                              variant="success"
                              index={i}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {errorsItems.length > 0 && (
                      <>
                        <h4 style={{ 
                          margin: "24px 0 16px 0", 
                          color: "#dc2626",
                          fontSize: fs * 1.2,
                          fontWeight: 700
                        }}>
                          {errorsTitle}
                        </h4>
                        <div style={{ 
                          display: "flex",
                          flexDirection: "column",
                          gap: 12
                        }}>
                          {errorsItems.map((item, i) => (
                            <InteractiveChecklistItem
                              key={`error-${i}`}
                              text={item}
                              fs={fs}
                              variant="error"
                              index={i + stepsItems.length}
                            />
                          ))}
                        </div>
                      </>
                    )}
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

// ============================================================================
// Page 2: BSMXSection1
// ============================================================================

export interface BSMXSection1Props {
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

/** Bloque de lista + imagen alternando layout */
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
          border: `1px solid ${primaryColor}33`,
          borderRadius: 14,
          padding: 16,
          background: "#fff",
        }}
      >
        <h4
          style={{
            margin: "0 0 10px 0",
            color: primaryColor,
            fontSize: fs * 1.1,
          }}
        >
          {title}
        </h4>
        <ul
          style={{
            margin: 0,
            paddingLeft: 22,
            fontSize: fs,
            lineHeight: 1.55,
          }}
        >
          {items.map((it, i) => (
            <li key={i}>{it}</li>
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

export function BSMXSection1({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 25,
  title = "",
  topicTitle = "Interacción, coherencia y storytelling práctico",
  heroImage = "",
  layoutOption = "B",
  baseFontSize = 18,
  awarenessImage = "",
  considerationImage = "",
  conversionImage = "",
  postImage = "",
}: BSMXSection1Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s3-page2-shimmer-effects';
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
      maxWidth: "none",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isA]
  )

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)))

  // "Breathing" del porcentaje
  const breatheAnim = {
    scale: [1, 1.06, 1],
    filter: ["brightness(1)", "brightness(1.06)", "brightness(1)"],
  }
  const breatheTransition = {
    duration: 1.8,
    ease: "easeInOut" as const,
    repeat: Infinity,
    repeatType: "mirror" as const,
  }

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
        {/* Content */}
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

                          <motion.div 
                variants={itemVar}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <motion.div style={{
                  background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                  border: "2px solid #93c5fd",
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: "0 8px 32px rgba(59, 130, 246, 0.15)",
                }}>
                  <h3 style={{ 
                    color: "#1e40af", 
                    margin: "0 0 12px 0",
                    fontSize: fs * 1.3,
                    fontWeight: 800
                  }}>
                    💡 Idea clave
                  </h3>
                  <p style={{ 
                    margin: 0, 
                    lineHeight: 1.7,
                    color: "#1e3a8a",
                    fontSize: fs * 1.05
                  }}>
                La coherencia genera confianza. Cuando todos tus puntos de contacto (bio, posts, historias, comentarios) 
                transmiten el mismo mensaje y valores, la audiencia reconoce y confía en tu marca.
              </p>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={itemVar}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -4 }}
                style={{ marginBottom: 16 }}
              >
                <motion.div style={{
                  background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                  border: "2px solid #bfdbfe",
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                }}>
                  <h3 style={{ 
                    margin: "0 0 16px 0", 
                    fontSize: fs * 1.3,
                    color: "#1e3a8a",
                    fontWeight: 800
                  }}>
                    ✨ Elementos de coherencia
                  </h3>
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: 22, 
                    lineHeight: 1.8,
                    fontSize: fs * 1.05
                  }}>
                    <li style={{ marginBottom: 8, color: "#1e40af" }}>Identidad visual consistente (colores, tipografía, filtros)</li>
                    <li style={{ marginBottom: 8, color: "#1e40af" }}>Tono de voz unificado en todos los canales</li>
                    <li style={{ marginBottom: 8, color: "#1e40af" }}>Valores y mensajes alineados</li>
                    <li style={{ marginBottom: 8, color: "#1e40af" }}>Promesas que se cumplen en la práctica</li>
              </ul>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={itemVar}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -4 }}
                style={{ marginBottom: 16 }}
              >
                <motion.div style={{
                  background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                  border: "2px solid #bae6fd",
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: "0 8px 32px rgba(14, 165, 233, 0.1)",
                }}>
                  <h3 style={{ 
                    margin: "0 0 12px 0", 
                    fontSize: fs * 1.3,
                    color: "#0c4a6e",
                    fontWeight: 800
                  }}>
                    📖 Storytelling práctico
                  </h3>
                  <p style={{ 
                    margin: "0 0 12px", 
                    lineHeight: 1.7,
                    fontSize: fs * 1.05,
                    color: "#075985"
                  }}>
                Usa el método STAR para contar historias auténticas:
              </p>
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: 22, 
                    lineHeight: 1.8,
                    fontSize: fs * 1.05
                  }}>
                    <li style={{ marginBottom: 8, color: "#0369a1" }}><strong>S</strong>ituación: Contexto breve</li>
                    <li style={{ marginBottom: 8, color: "#0369a1" }}><strong>T</strong>area: Desafío o problema</li>
                    <li style={{ marginBottom: 8, color: "#0369a1" }}><strong>A</strong>cción: Qué hiciste específicamente</li>
                    <li style={{ marginBottom: 8, color: "#0369a1" }}><strong>R</strong>esultado: Impacto medible o aprendizaje</li>
              </ul>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={itemVar}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <motion.div style={{
                  background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
                  border: "2px solid #a7f3d0",
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: "0 8px 32px rgba(16, 185, 129, 0.1)",
                }}>
                  <h3 style={{ 
                    margin: "0 0 16px 0", 
                    fontSize: fs * 1.3,
                    color: "#065f46",
                    fontWeight: 800
                  }}>
                    💬 Q&A rápido
                  </h3>
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: 22, 
                    lineHeight: 1.8,
                    fontSize: fs * 1.05
                  }}>
                    <li style={{ marginBottom: 10, color: "#047857" }}>¿Cómo proyectar confianza con pocos seguidores? → Prioriza casos reales, claridad y velocidad de respuesta.</li>
                    <li style={{ marginBottom: 10, color: "#047857" }}>¿Qué muestro si no tengo premios? → Proceso, métricas de desempeño y feedback de clientes.</li>
                    <li style={{ marginBottom: 10, color: "#047857" }}>¿Cómo sostener coherencia en equipo? → Guía de tono/visual, ejemplos y revisiones quincenales.</li>
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

// ============================================================================
// Page 3: Quiz - Plataformas y formatos
// ============================================================================

/** Botón (hover & press 0.9) */
function Btn({ children, onClick, variant = "primary", disabled, primaryColor }: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "ghost"
  disabled?: boolean
  primaryColor: string
}) {
  const base = {
    padding: "12px 16px",
    borderRadius: 12,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    userSelect: "none" as const,
    outline: "none",
    border: "none",
  }
  const styles = {
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
    >
      {children}
    </motion.button>
  )
}

/** Banco de preguntas (15) + referencia didáctica */
const QUESTIONS = [
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
    ref: "El 'copy-paste' ignora hábitos por plataforma y suele penalizar el alcance.",
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
    ref: "Los tutoriales permiten ver el 'antes y después' con claridad, aumentando confianza e intención de compra.",
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

export interface BSMXQuizProps {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  layoutOption?: LayoutOption
  baseFontSize?: number
  // Video
  videoFile?: string
  videoUrl?: string
  videoPoster?: string
  videoAutoplay?: boolean
  videoControls?: boolean
  videoLoop?: boolean
  videoMuted?: boolean
  // Tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: string, correctAnswer: string, isCorrect: boolean) => void
  onQuizComplete?: (score: number) => void
  isAlreadyCompleted?: boolean
  completedScore?: number
}

export function BSMXQuiz({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 50,
  title = "",
  topicTitle = "Plataformas y formatos",
  layoutOption = "A",
  baseFontSize = 18,
  // Video
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
}: BSMXQuizProps) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s3-page3-shimmer-effects';
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

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)))

  const total = QUESTIONS.length
  
  // Use persistence hook to save progress across refreshes
  const persistence = useQuizPersistence(
    "bsmx:quiz:m2s3p3",
    total,
    !isAlreadyCompleted
  );
  
  const idx = persistence.idx;
  const setIdx = persistence.setIdx;
  const answers = persistence.answers as (number | null)[];
  const setAnswers = persistence.setAnswers;
  const checked = persistence.checked;
  const setChecked = persistence.setChecked;
  const score = persistence.score;
  const setScore = persistence.setScore;

  const q = QUESTIONS[idx]
  const safeOptions = Array.isArray(q?.options) ? q.options : []
  const canCheck = q && answers[idx] !== null && !checked[idx]

  const handleSelect = (optionIndex: number) => {
    if (!q || optionIndex < 0 || optionIndex >= safeOptions.length || checked[idx]) return
    const next = [...answers]
    next[idx] = optionIndex
    setAnswers(next)
    const isCorrect = optionIndex === q.correct
    setChecked((prev) => {
      const n = [...prev]
      n[idx] = true
      return n
    })
    const newScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) setScore((s) => s + 1)
    
    // Track the answer
    if (onAnswerSubmit) {
      onAnswerSubmit(idx, q.text, q.options[optionIndex], q.options[q.correct], isCorrect);
    }
    
    setTimeout(() => {
      if (idx < total - 1) {
        setIdx(idx + 1);
      } else {
        // Quiz complete - submit final score and clear persisted state
        if (onQuizComplete) {
          onQuizComplete(newScore);
          setTimeout(() => persistence.clearPersistedState(), 1000);
        }
      }
    }, 800);
  }

  const allAnswered = checked.every(Boolean)
  const wrongList = QUESTIONS.map((qq, i) => ({
    i,
    question: qq.text,
    correctText: qq.options[qq.correct],
    ref: qq.ref,
    user: answers[i],
    isWrong: checked[i] && answers[i] !== qq.correct,
  })).filter((x) => x.isWrong)

  const optStyle = (active: boolean): React.CSSProperties =>
    ({
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

  // Breathing SOLO en el porcentaje
  const breathing = {
    scale: [1, 1.06, 1],
    transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" as const },
  }

  const effectiveVideoSrc =
    (videoFile && String(videoFile).trim()) ||
    (videoUrl && String(videoUrl).trim()) ||
    ""

  const isYouTubeUrl = effectiveVideoSrc.includes('youtube.com') || effectiveVideoSrc.includes('youtu.be')

  const userAns = answers[idx]
  const isAnswered = checked[idx]
  const isCorrect = isAnswered && userAns === q.correct

  // Show "Already Completed" screen if quiz was already taken
  if (isAlreadyCompleted) {
    return (
      <div style={wrapper}><SectionPageHeader primaryColor={primaryColor} progress={progressPercent} brandName={brandName} logoSrc={logoSrc || undefined} />
        <main style={{ width: "100%", display: "block" }}>
          <section>
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
            </motion.div>

            {effectiveVideoSrc ? (
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: fs * 1.55 }}>Video de la sección</h3>
                <div>
                    {isYouTubeUrl ? (
                      <iframe
                        src={effectiveVideoSrc}
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
                      <video
                        src={effectiveVideoSrc}
                        poster={videoPoster}
                        autoPlay={videoAutoplay}
                        controls={videoControls}
                        loop={videoLoop}
                        muted={videoMuted}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    )}
                  </div>
                </div>
            ) : null}

            <motion.div 
              variants={itemVar}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                style={{
                  background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                  borderRadius: 24,
                  border: "2px solid #bae6fd",
                  padding: 32,
                  boxShadow: "0 12px 40px rgba(59, 130, 246, 0.15)",
                }}
              >
                {/* Progress bar */}
            <div style={{
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  marginBottom: 24,
                  padding: "16px 20px",
                  background: "rgba(255, 255, 255, 0.8)",
              borderRadius: 16,
                  border: "2px solid #bfdbfe"
                }}>
                  <strong style={{ 
                    fontSize: fs * 1.6,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 800
                  }}>
                    Pregunta {idx + 1} / {total}
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

              {/* Question */}
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
                  {q.text}
                </p>

              {/* Options */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginBottom: 20 }}>
                {safeOptions.map((opt, i) => (
                    <motion.div
                    key={i}
                    role="button"
                    onClick={() => !isAnswered && handleSelect(i)}
                      whileHover={!isAnswered ? { scale: 1.03, y: -2 } : {}}
                      whileTap={!isAnswered ? { scale: 0.98 } : {}}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: isAnswered ? 0.8 : 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                    style={{
                      ...optStyle(userAns === i),
                      cursor: isAnswered ? "default" : "pointer",
                    }}
                  >
                    {opt}
                    </motion.div>
                ))}
              </div>

              {/* Feedback */}
              {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                      padding: 18, 
                      borderRadius: 16, 
                      background: isCorrect 
                        ? "linear-gradient(135deg, #d1fae5, #a7f3d0)" 
                        : "linear-gradient(135deg, #fee2e2, #fecaca)", 
                      border: `2px solid ${isCorrect ? "#10b981" : "#ef4444"}`,
                      marginBottom: 16, 
                      minHeight: 50,
                      boxShadow: isCorrect 
                        ? "0 8px 24px rgba(16, 185, 129, 0.2)"
                        : "0 8px 24px rgba(239, 68, 68, 0.2)"
                    }}
                  >
                    <strong style={{ 
                      color: isCorrect ? "#047857" : "#991b1b",
                      fontSize: fs * 1.2,
                      fontWeight: 800
                    }}>
                    {isCorrect ? "✅ ¡Correcto!" : `❌ Incorrecto. Respuesta: ${q.options[q.correct]}`}
                  </strong>
                    {q.ref && <p style={{ 
                      margin: "12px 0 0", 
                      fontSize: fs,
                      opacity: 0.9,
                      color: isCorrect ? "#065f46" : "#7f1d1d",
                      lineHeight: 1.6
                    }}>{q.ref}</p>}
                  </motion.div>
              )}

              {/* Final score */}
              {allAnswered && (
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
                      marginBottom: 16
                    }}>
                      🎉 Resultado: {score} / {total}
                    </strong>
                    <motion.button 
                      onClick={resetQuiz}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ 
                        padding: "14px 28px", 
                        borderRadius: 12, 
                        border: "none", 
                        background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                        color: "#fff", 
                        cursor: "pointer", 
                        fontWeight: 800,
                        fontSize: fs * 1.1,
                        boxShadow: "0 8px 24px rgba(30, 64, 175, 0.3)"
                      }}
                    >
                      🔄 Reintentar
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Page 4: Multiple Choice Quiz
type BSMXQuizTrueFalseProps = {
  // Quiz tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: string, correctAnswer: string, isCorrect: boolean) => void;
  onQuizComplete?: (score: number) => void;
  isAlreadyCompleted?: boolean;
  completedScore?: number;
};

function BSMXQuizTrueFalse(props: BSMXQuizTrueFalseProps = {}) {
  const { onAnswerSubmit, onQuizComplete, isAlreadyCompleted, completedScore } = props;
  const primaryColor = "#0F62FE";
  const background = "#FFFFFF";
  const fs = 18;

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s3-page4-shimmer-effects';
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

  const MC_QUESTIONS = [
    { 
      text: "¿Cuál es el método para estructurar historias auténticas?", 
      options: [
        "A) Método CORA (Contexto, Objetivo, Resultado, Aprendizaje)",
        "B) Método STAR (Situación, Tarea, Acción, Resultado)",
        "C) Método RACE (Relevancia, Análisis, Conclusiones, Ejecución)",
        "D) Método SMART (Específico, Medible, Alcanzable, Relevante, Tiempo)"
      ],
      correct: 1
    },
    { 
      text: "¿Qué elementos son clave para la coherencia de marca?", 
      options: [
        "A) Solo la identidad visual",
        "B) Solo el tono de voz",
        "C) Identidad visual, tono de voz, valores y promesas cumplidas",
        "D) Solo los valores de marca"
      ],
      correct: 2
    },
    { 
      text: "¿En cuántos puntos de contacto debe mantenerse la coherencia?", 
      options: [
        "A) Solo en Instagram y LinkedIn",
        "B) Solo en la bio",
        "C) En todos los puntos de contacto (bio, posts, stories, comentarios, DMs)",
        "D) Solo en el contenido principal"
      ],
      correct: 2
    },
    { 
      text: "¿Qué refuerza la credibilidad de una marca personal?", 
      options: [
        "A) Solo tener muchos seguidores",
        "B) Solo usar hashtags populares",
        "C) Prueba social: testimonios, casos de éxito, números y validaciones",
        "D) Solo publicar todos los días"
      ],
      correct: 2
    },
    { 
      text: "¿Cómo se construye la confianza según el contenido?", 
      options: [
        "A) No es necesario construirla explícitamente",
        "B) Cumpliendo las promesas que haces en tus mensajes",
        "C) Solo con buena estética",
        "D) Publicando todo lo que haces"
      ],
      correct: 1
    },
  ];

  const total = MC_QUESTIONS.length;
  const [idx, setIdx] = React.useState(0);
  const [selection, setSelection] = React.useState<(number | null)[]>(Array(total).fill(null));
  const [checked, setChecked] = React.useState<boolean[]>(Array(total).fill(false));
  const [score, setScore] = React.useState(0);

  const q = MC_QUESTIONS[idx];
  const isAnswered = checked[idx];
  const isCorrect = isAnswered && selection[idx] === q.correct;

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    const next = [...selection];
    next[idx] = answerIndex;
    setSelection(next);
    const correct = answerIndex === q.correct;
    const nextChecked = [...checked];
    nextChecked[idx] = true;
    setChecked(nextChecked);
    
    const newScore = score + (correct ? 1 : 0);
    if (correct) setScore(s => s + 1);

    // Track answer submission
    if (onAnswerSubmit) {
      console.log(`M2S3P4: Submitting answer ${idx}: ${answerIndex}, correct=${q.correct}, isCorrect=${correct}`);
      onAnswerSubmit(idx, q.text, q.options[answerIndex], q.options[q.correct], correct);
    }

    if (idx < total - 1) {
      setTimeout(() => { setIdx(idx + 1); }, 800);
    } else {
      // Last question - complete quiz after delay
      console.log("M2S3P4: Last question answered, completing quiz with score:", newScore);
      setTimeout(() => {
        if (onQuizComplete) {
          onQuizComplete(newScore);
        }
      }, 100);
    }
  };

  const allAnswered = checked.every(Boolean);

  // Show "Already Completed" screen if quiz was already taken
  if (isAlreadyCompleted) {
    return (
      <div style={{ width: "100%", minHeight: "100vh", background, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}><SectionPageHeader 
          primaryColor={primaryColor} 
          progress={75} 
          brandName="BIZEN"
          logoSrc="/bizen-mondragonlogo.png"
        />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 60, maxWidth: 600 }}>
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
    );
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh", background }}>
      <SectionPageHeader 
        primaryColor={primaryColor} 
        progress={75} 
        brandName="BIZEN"
        logoSrc="/bizen-mondragonlogo.png"
      />
      <div style={{ padding: "clamp(16px, 3vw, 32px)", maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div variants={containerVar} initial="hidden" animate="show">
          <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
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
              Coherencia y storytelling
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
          >
            <motion.div style={{
              background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
              borderRadius: 24,
              border: "2px solid #bae6fd",
              padding: 32,
              boxShadow: "0 12px 40px rgba(59, 130, 246, 0.15)",
            }}>
              {/* Progress bar */}
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: 24,
                padding: "16px 20px",
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: 16,
                border: "2px solid #bfdbfe"
              }}>
                <strong style={{ 
                  fontSize: fs * 1.6,
                  background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 800
                }}>
                  Pregunta {idx + 1} / {total}
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

              {/* Question */}
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
                {q.text}
              </p>

              {/* Options */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginBottom: 20 }}>
                {q.options.map((opt, i) => (
                  <motion.div
                    key={i}
                role="button"
                    onClick={() => !isAnswered && handleAnswer(i)}
                    whileHover={!isAnswered ? { scale: 1.03, y: -2 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isAnswered ? 0.8 : 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                style={{
                      padding: "18px 22px",
                      borderRadius: 16,
                      border: `2px solid ${selection[idx] === i ? "#1e40af" : "rgba(30, 64, 175, 0.2)"}`,
                      background: selection[idx] === i 
                        ? "linear-gradient(135deg, #1e40af, #3B82F6)" 
                        : "linear-gradient(135deg, #ffffff, #f8fafc)",
                      color: selection[idx] === i ? "white" : "#1e40af",
                  fontWeight: 800,
                      fontSize: fs * 1.1,
                  cursor: isAnswered ? "default" : "pointer",
                      boxShadow: selection[idx] === i 
                        ? "0 12px 32px rgba(30, 64, 175, 0.3), 0 4px 12px rgba(59, 130, 246, 0.2)" 
                        : "0 4px 12px rgba(0, 0, 0, 0.08)",
                      transition: "all 0.3s ease",
                }}
              >
                    {opt}
                  </motion.div>
            ))}
          </div>

              {/* Feedback */}
          {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ 
                    padding: 18, 
                    borderRadius: 16, 
                    background: isCorrect 
                      ? "linear-gradient(135deg, #d1fae5, #a7f3d0)" 
                      : "linear-gradient(135deg, #fee2e2, #fecaca)", 
                    border: `2px solid ${isCorrect ? "#10b981" : "#ef4444"}`,
                    marginBottom: 16, 
                    minHeight: 50,
                    boxShadow: isCorrect 
                      ? "0 8px 24px rgba(16, 185, 129, 0.2)"
                      : "0 8px 24px rgba(239, 68, 68, 0.2)"
                  }}
                >
                  <strong style={{ 
                    color: isCorrect ? "#047857" : "#991b1b",
                    fontSize: fs * 1.2,
                    fontWeight: 800
                  }}>
                    {isCorrect ? "✅ ¡Correcto!" : `❌ Incorrecto. Respuesta: ${q.options[q.correct]}`}
              </strong>
                </motion.div>
          )}

              {/* Final score */}
          {allAnswered && (
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
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

function BSMXFlashcards() {
  const primaryColor = "#0F62FE";
  const background = "#FFFFFF";
  const fs = 18;

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s3-page5-shimmer-effects';
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

  const CARDS = [
    { front: "Coherencia", back: "Mantener el mismo mensaje, valores y estilo visual en todos los puntos de contacto." },
    { front: "Método STAR", back: "Situación → Tarea → Acción → Resultado. Framework para storytelling auténtico." },
    { front: "Prueba social", back: "Testimonios, casos de éxito, números y validaciones que refuerzan credibilidad." },
    { front: "Tono de voz", back: "La personalidad que transmites en tu comunicación. Debe ser consistente en todas las plataformas." },
    { front: "Puntos de contacto", back: "Todos los lugares donde tu audiencia interactúa contigo: bio, posts, stories, comentarios, DMs." },
    { front: "Identidad visual", back: "Conjunto coherente de colores, tipografía, filtros y estilo que hace reconocible tu marca." },
  ];

  const [flipped, setFlipped] = React.useState<boolean[]>(Array(CARDS.length).fill(false));

  const toggleCard = (index: number) => {
    const next = [...flipped];
    next[index] = !next[index];
    setFlipped(next);
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", background }}><SectionPageHeader 
        primaryColor={primaryColor} 
        progress={100} 
        brandName="BIZEN"
        logoSrc="/bizen-mondragonlogo.png"
      />
      <div style={{ padding: "clamp(16px, 3vw, 32px)", maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div variants={containerVar} initial="hidden" animate="show">
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
              Repaso con Flashcards
            </motion.h1>
          </motion.div>

          <motion.p 
            variants={itemVar}
            style={{ 
              margin: "8px 0 32px", 
              fontSize: fs * 1.3,
              color: "#1e40af",
              fontWeight: 600,
              textAlign: "center"
            }}
          >
            👆 Toca cada tarjeta para ver la definición
          </motion.p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              role="button"
              onClick={() => toggleCard(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: flipped[i] 
                  ? "linear-gradient(135deg, #1e40af, #3B82F6)" 
                  : "linear-gradient(135deg, #f0f7ff, #ffffff)",
                border: `2px solid ${flipped[i] ? "#1e40af" : "#3B82F6"}`,
                borderRadius: 20,
                padding: 24,
                minHeight: 200,
                cursor: "pointer",
                boxShadow: flipped[i] 
                  ? "0 12px 36px rgba(30, 64, 175, 0.3)"
                  : "0 8px 24px rgba(59, 130, 246, 0.15)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 14
              }}
            >
              <motion.strong 
                style={{ 
                  color: flipped[i] ? "white" : "#1e40af", 
                  fontSize: fs * 1.5,
                  fontWeight: 800
                }}
                animate={{
                  scale: flipped[i] ? 1 : 1,
                }}
              >
                {card.front}
              </motion.strong>
              <motion.p 
                style={{ 
                  margin: 0, 
                  lineHeight: 1.6, 
                  fontSize: fs * 1.05,
                  color: flipped[i] ? "white" : "#3b82f6",
                  fontWeight: flipped[i] ? 500 : 400
                }}
                animate={{
                  opacity: flipped[i] ? 1 : 0.8
                }}
              >
                {flipped[i] ? card.back : "👆 Toca para ver la definición"}
              </motion.p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}

const M2S3_CONTENT: Record<number, React.ReactNode> = {
  1: <BSMXSection3 />,
  2: <BSMXSection1 />,
  3: <BSMXQuiz videoUrl="https://www.youtube.com/embed/MKVmrsyV-FM" />,
  4: <BSMXQuizTrueFalse />,
  5: <BSMXFlashcards />,
}

export default M2S3_CONTENT

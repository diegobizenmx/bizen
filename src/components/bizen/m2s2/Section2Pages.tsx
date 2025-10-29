/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import SectionPageHeader from "@/components/bizen/SectionPageHeader"
import { useQuizPersistence } from "@/hooks/useQuizPersistence"
import MarketingFactsAnimation from "@/components/MarketingFactsAnimation"

type LayoutOption = "A" | "B"

export type BSMXWelcomeM1S2Props = {
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
  syllabus?: string[]
  summaryPoints?: string[]
  caseText?: string
  whyItMatters?: string
  glossaryItems?: { front: string; back: string }[]
  structurePills?: string[]
  enableExercise?: boolean
}

/* ---------- UI helpers ---------- */

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

const containerVar = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06 },
  },
}
const itemVar = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

function Pill({ text, primaryColor, fs }: { text: string; primaryColor: string; fs: number }) {
  return (
    <span
      style={{
        display: "inline-flex" as const,
        alignItems: "center" as const,
        padding: "8px 12px",
        borderRadius: 999,
        border: `1px solid ${primaryColor}33`,
        background: "#fff",
        marginRight: 8,
        marginBottom: 8,
        fontSize: fs * 0.95,
        fontWeight: 600,
      }}
    >
      {text}
    </span>
  )
}

/** FlashCard con hover/press */
function FlashCard({
  title,
  body,
  primaryColor,
  fs,
}: {
  title?: string
  body: string
  primaryColor: string
  fs: number
}) {
  return (
    <motion.div
      whileHover={{ scale: 0.96 }}
      whileTap={{ scale: 0.92 }}
      style={{
        borderRadius: 14,
        border: `1px solid ${primaryColor}22`,
        background: "#fff",
        padding: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        cursor: "pointer",
      }}
    >
      {title ? (
        <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 10, marginBottom: 8 }}>
          <div aria-hidden style={{ width: 14, height: 14, borderRadius: 4, background: primaryColor }} />
          <strong style={{ fontSize: fs * 1.05 }}>{title}</strong>
        </div>
      ) : null}
      <p style={{ margin: 0, fontSize: fs * 0.98, lineHeight: 1.45, opacity: 0.95 }}>{body}</p>
    </motion.div>
  )
}

/** Flippable FlashCard for Glossary */
function GlossaryFlashCard({
  front,
  back,
  primaryColor,
  fs,
}: {
  front: string
  back: string
  primaryColor: string
  fs: number
}) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 0.96 }}
      whileTap={{ scale: 0.92 }}
      style={{
        borderRadius: 14,
        border: `2px solid ${isFlipped ? primaryColor : `${primaryColor}22`}`,
        background: isFlipped ? `${primaryColor}08` : "#fff",
        padding: 20,
        boxShadow: isFlipped ? "0 12px 32px rgba(0,0,0,0.1)" : "0 8px 24px rgba(0,0,0,0.05)",
        cursor: "pointer",
        minHeight: 140,
        display: "flex" as const,
        flexDirection: "column" as const,
        justifyContent: "center" as const,
        alignItems: "center" as const,
        textAlign: "center" as const,
        transition: "all 0.3s ease",
      }}
    >
      {!isFlipped ? (
        <>
          <strong style={{ fontSize: fs * 1.15, color: primaryColor, marginBottom: 8 }}>{front}</strong>
          <p style={{ margin: 0, fontSize: fs * 0.85, opacity: 0.6, fontStyle: "italic" }}>
            Toca para ver la definición
          </p>
        </>
      ) : (
        <p style={{ margin: 0, fontSize: fs * 0.98, lineHeight: 1.5, opacity: 0.95 }}>{back}</p>
      )}
    </motion.div>
  )
}

/* ---------- Component ---------- */

const DEFAULT_WHY =
  "Una historia bien contada enseña sin que parezca clase. Si muestras un cambio y explicas el paso que cualquiera puede copiar hoy, tu marca se vuelve útil y memorable."

const DEFAULT_CASE =
  "\"No me alcanzaba. Separé fijos de variables y puse un tope semanal. Resultado: llegué a fin de mes sin deudas. Copia esto: define tu tope para antojos esta semana.\""

const DEFAULT_GLOSSARY = [
  { front: "Hook (gancho)", back: "Primera línea que explica por qué quedarse." },
  { front: "Resultado observable", back: "Cambio que se nota (ej.: entregué mi tesis sin cargos extra)." },
  { front: "Aprendizaje replicable", back: "Instrucción que otros pueden usar hoy." },
  { front: "Estructura simple", back: "Contexto → Acción → Resultado → Aprendizaje (1 frase por punto)." },
]

const DEFAULT_STRUCTURE_PILLS = ["Contexto", "Acción", "Resultado", "Aprendizaje"]

const DEFAULT_SYLLABUS = [
  "¿Por qué importa? (valor y memorabilidad).",
  "Caso breve (ejemplo aplicado).",
  "Glosario: Hook, Resultado, Aprendizaje.",
  "Estructura: Contexto → Acción → Resultado → Aprendizaje.",
  "Micro-ejercicio: reescribe tu historia con la estructura.",
]

const DEFAULT_POINTS = [
  "Abre con un hook claro que prometa valor.",
  "Muestra un resultado observable (antes/después).",
  "Incluye un paso replicable que cualquiera pueda copiar hoy.",
  "Usa la estructura en 4 frases para claridad.",
  "Cierra con un CTA simple para provocar acción.",
]

function BSMXWelcomeM1S2({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 0,
  title = "",
  topicTitle = "Storytelling y narrativa personal",
  heroImage = "",
  layoutOption = "B",
  baseFontSize = 18,
  syllabus = DEFAULT_SYLLABUS,
  summaryPoints = DEFAULT_POINTS,
  caseText = DEFAULT_CASE,
  whyItMatters = DEFAULT_WHY,
  glossaryItems = DEFAULT_GLOSSARY,
  structurePills = DEFAULT_STRUCTURE_PILLS,
  enableExercise = false,
}: BSMXWelcomeM1S2Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isLeft = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s2-page1-shimmer-effects';
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
    [background, fs]
  )

  const container = useMemo(
    () => ({
      width: "100%",
      maxWidth: "none",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    []
  )

  // Estado del mini-ejercicio
  const [ctx, setCtx] = useState("")
  const [act, setAct] = useState("")
  const [res, setRes] = useState("")
  const [apr, setApr] = useState("")
  const [feedback, setFeedback] = useState<null | { ok: boolean; msg: string }>(null)

  function validateExercise() {
    const checks = [
      { v: ctx.trim(), name: "Contexto" },
      { v: act.trim(), name: "Acción" },
      { v: res.trim(), name: "Resultado" },
      { v: apr.trim(), name: "Aprendizaje" },
    ]
    for (const c of checks) {
      if (!c.v) return setFeedback({ ok: false, msg: `Falta "${c.name}".` })
      if (c.v.length > 220)
        return setFeedback({
          ok: false,
          msg: `"${c.name}" es muy largo. Intenta 1 frase (≤ 220 caracteres).`,
        })
    }
    setFeedback({ ok: true, msg: "¡Excelente! Tienes las 4 frases." })
  }

  // Animación de breathing para el porcentaje
  const breatheAnim = { scale: [1, 1.06, 1], filter: ["brightness(1)", "brightness(1.06)", "brightness(1)"] }

  return (
    <div style={wrapper}>
      <main style={{ width: "100%" }}>
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={pct}
          brandName={brandName}
          logoSrc={logoSrc}
        />

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
                  {topicTitle}
                </motion.h1>
              </motion.div>

              {/* Hero opcional */}
              {heroImage ? (
                <motion.div variants={itemVar} style={{ borderRadius: 16, overflow: "hidden" as const, margin: "10px 0 18px" }}>
                  <img src={heroImage} alt="Sección 2" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              {/* 1) ¿Por qué importa? */}
              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 16 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  style={{
                    background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: "0 8px 32px rgba(14, 165, 233, 0.15)",
                    border: "2px solid #7dd3fc",
                  }}
                >
                  <h3 style={{ 
                    margin: "0 0 12px 0", 
                    fontSize: fs * 1.35,
                    color: "#0369a1",
                    fontWeight: 800
                  }}>
                    💭 ¿Por qué importa?
                  </h3>
                  <p style={{ 
                    margin: 0, 
                    lineHeight: 1.7,
                    color: "#0c4a6e",
                    fontSize: fs * 1.05
                  }}>{whyItMatters}</p>
                </motion.div>
              </motion.div>

              {/* Caso breve */}
              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 16 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  style={{
                    background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: "0 8px 32px rgba(59, 130, 246, 0.15)",
                    border: "2px solid #93c5fd",
                  }}
                >
                  <h3 style={{ 
                    margin: "0 0 12px 0", 
                    fontSize: fs * 1.35,
                    color: "#1e40af",
                    fontWeight: 800
                  }}>
                    📖 Caso breve
                  </h3>
                  <blockquote
                    style={{
                      margin: 0,
                      paddingLeft: 16,
                      borderLeft: `4px solid #3b82f6`,
                      lineHeight: 1.7,
                      color: "#1e3a8a",
                      fontSize: fs * 1.05,
                      fontStyle: "italic"
                    }}
                  >
                    {caseText}
                  </blockquote>
                </motion.div>
              </motion.div>

              {/* 2) Glosario y estructuras -> FLASHCARDS */}
              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 16 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  style={{
                    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                    border: "2px solid #bfdbfe",
                  }}
                >
                  <h3 style={{ 
                    margin: "0 0 16px 0", 
                    fontSize: fs * 1.35,
                    color: "#1e3a8a",
                    fontWeight: 800
                  }}>
                    📚 Glosario y estructuras
                  </h3>

                  <div style={{ marginBottom: 12 }}>
                    {(structurePills || []).map((t, i) => (
                      <Pill key={i} text={t} primaryColor={primaryColor} fs={fs} />
                    ))}
                  </div>

                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: 12,
                    }}
                  >
                    {(glossaryItems || []).map((item, i) => (
                      <GlossaryFlashCard 
                        key={i} 
                        front={item.front} 
                        back={item.back} 
                        primaryColor={primaryColor} 
                        fs={fs} 
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Temario -> FLASHCARDS */}
              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 16 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  style={{
                    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: "0 8px 32px rgba(14, 165, 233, 0.1)",
                    border: "2px solid #bae6fd",
                  }}
                >
                  <h3 style={{ 
                    margin: "0 0 16px 0", 
                    fontSize: fs * 1.35,
                    color: "#0c4a6e",
                    fontWeight: 800
                  }}>
                    📋 Temario de la sección
                  </h3>
                  <div style={{ display: "grid" as const, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                    {(syllabus || []).map((s, i) => (
                      <FlashCard key={i} title={`Tema ${i + 1}`} body={s} primaryColor={primaryColor} fs={fs} />
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Resumen rápido */}
              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 16 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  style={{
                    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: "0 8px 32px rgba(245, 158, 11, 0.15)",
                    border: "2px solid #fcd34d",
                  }}
                >
                  <h3 style={{ 
                    margin: "0 0 16px 0", 
                    fontSize: fs * 1.35,
                    color: "#92400e",
                    fontWeight: 800
                  }}>
                    ⭐ Resumen rápido
                  </h3>
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: 22,
                    lineHeight: 1.8,
                    fontSize: fs * 1.05
                  }}>
                    {(summaryPoints || []).map((s, i) => (
                      <li key={i} style={{ marginBottom: 8, color: "#78350f" }}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              {/* Micro-ejercicio opcional */}
              {enableExercise ? (
                <motion.div variants={itemVar}>
                  <Card glow={primaryColor}>
                    <h3 style={{ margin: "0 0 12px 0", fontSize: fs * 1.35 }}>Micro-ejercicio</h3>
                    <p style={{ margin: "0 0 12px 0", opacity: 0.85, fontSize: fs * 0.95 }}>
                      Escribe tu historia en 4 frases (una por campo):
                    </p>

                    <div style={{ display: "grid" as const, gap: 10 }}>
                      <div>
                        <label htmlFor="ctx" style={{ display: "block" as const, fontWeight: 600, marginBottom: 4 }}>
                          1. Contexto
                        </label>
                        <input
                          id="ctx"
                          type="text"
                          value={ctx}
                          onChange={(e) => setCtx(e.target.value)}
                          placeholder="Ej.: No me alcanzaba para llegar a fin de mes."
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: 8,
                            border: "1px solid rgba(0,0,0,0.12)",
                            fontSize: fs * 0.95,
                            boxSizing: "border-box" as const,
                          }}
                        />
                      </div>

                      <div>
                        <label htmlFor="act" style={{ display: "block" as const, fontWeight: 600, marginBottom: 4 }}>
                          2. Acción
                        </label>
                        <input
                          id="act"
                          type="text"
                          value={act}
                          onChange={(e) => setAct(e.target.value)}
                          placeholder="Ej.: Separé gastos fijos de variables y puse un tope semanal."
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: 8,
                            border: "1px solid rgba(0,0,0,0.12)",
                            fontSize: fs * 0.95,
                            boxSizing: "border-box" as const,
                          }}
                        />
                      </div>

                      <div>
                        <label htmlFor="res" style={{ display: "block" as const, fontWeight: 600, marginBottom: 4 }}>
                          3. Resultado
                        </label>
                        <input
                          id="res"
                          type="text"
                          value={res}
                          onChange={(e) => setRes(e.target.value)}
                          placeholder="Ej.: Llegué a fin de mes sin deudas."
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: 8,
                            border: "1px solid rgba(0,0,0,0.12)",
                            fontSize: fs * 0.95,
                            boxSizing: "border-box" as const,
                          }}
                        />
                      </div>

                      <div>
                        <label htmlFor="apr" style={{ display: "block" as const, fontWeight: 600, marginBottom: 4 }}>
                          4. Aprendizaje
                        </label>
                        <input
                          id="apr"
                          type="text"
                          value={apr}
                          onChange={(e) => setApr(e.target.value)}
                          placeholder="Ej.: Define tu tope para antojos esta semana."
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: 8,
                            border: "1px solid rgba(0,0,0,0.12)",
                            fontSize: fs * 0.95,
                            boxSizing: "border-box" as const,
                          }}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={validateExercise}
                        style={{
                          padding: "12px 16px",
                          borderRadius: 10,
                          border: "none",
                          background: primaryColor,
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: fs,
                          cursor: "pointer",
                        }}
                      >
                        Validar
                      </button>

                      {feedback ? (
                        <div
                          style={{
                            padding: 12,
                            borderRadius: 8,
                            background: feedback.ok ? "#d4edda" : "#f8d7da",
                            color: feedback.ok ? "#155724" : "#721c24",
                            fontWeight: 600,
                          }}
                        >
                          {feedback.msg}
                        </div>
                      ) : null}
                    </div>
                  </Card>
                </motion.div>
              ) : null}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

// ============================================================================
// Page 2: Applicable Steps + Express Checklist
// ============================================================================

type BSMXSection2Page2Props = {
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
  accordionTitle?: string
  entertainmentText?: string
  educationText?: string
  empathyText?: string
  evidenceText?: string
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
  const direction: "row" | "row-reverse" = reverse ? "row-reverse" : "row"
  return (
    <div
      style={{
        display: "flex" as const,
        flexDirection: direction,
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
        <h4 style={{ margin: "0 0 10px 0", color: primaryColor, fontSize: fs * 1.1 }}>
          {title}
        </h4>
        <ul style={{ margin: 0, paddingLeft: 22, fontSize: fs, lineHeight: 1.55 }}>
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
              objectFit: "cover" as const,
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

export function BSMXSection2Page2({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 25,
  title = "",
  topicTitle = "Pasos aplicables hoy + Checklist express",
  heroImage = "",
  layoutOption = "B",
  baseFontSize = 18,
  awarenessImage = "",
  considerationImage = "",
}: BSMXSection2Page2Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s2-page2-shimmer-effects';
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

  // Estado del mini-ejercicio
  const [ctx, setCtx] = useState("")
  const [act, setAct] = useState("")
  const [res, setRes] = useState("")
  const [apr, setApr] = useState("")
  const [feedback, setFeedback] = useState<null | { ok: boolean; msg: string }>(null)

  function validateExercise() {
    const checks = [
      { v: ctx.trim(), name: "Contexto" },
      { v: act.trim(), name: "Acción" },
      { v: res.trim(), name: "Resultado" },
      { v: apr.trim(), name: "Aprendizaje" },
    ]
    for (const c of checks) {
      if (!c.v) return setFeedback({ ok: false, msg: `Falta "${c.name}".` })
      if (c.v.length > 220)
        return setFeedback({
          ok: false,
          msg: `"${c.name}" es muy largo. Intenta 1 frase (≤ 220 caracteres).`,
        })
    }
    setFeedback({ ok: true, msg: "¡Excelente! Tienes las 4 frases." })
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

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)))

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
          progress={pct}
          brandName={brandName}
          logoSrc={logoSrc}
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

              {/* Hero opcional */}
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
                  <img src={heroImage} alt="Sección 2" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              {/* Bloques temáticos */}
              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 12 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  style={{
                    background: "linear-gradient(135deg, #1e40af 0%, #3B82F6 100%)",
                    borderRadius: 20,
                    padding: 28,
                    boxShadow: "0 16px 48px rgba(30, 64, 175, 0.3)",
                  }}
                >
                  <h3 style={{ 
                    margin: "0 0 24px 0", 
                    fontSize: fs * 1.4,
                    color: "white",
                    fontWeight: 800
                  }}>
                    ✨ 3) Pasos aplicables hoy & Checklist express
                  </h3>

                  {/* Pasos aplicables hoy */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      borderRadius: 16,
                      padding: 20,
                      marginBottom: 16,
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h4 style={{ 
                      margin: "0 0 12px 0", 
                      color: "#1e40af", 
                      fontSize: fs * 1.15,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    }}>
                      📝 Pasos aplicables hoy
                    </h4>
                    <ul style={{ 
                      margin: 0, 
                      paddingLeft: 22, 
                      fontSize: fs,
                      lineHeight: 1.8,
                      color: "#374151"
                    }}>
                      <li>Escribe tu hook en 1 línea (promesa o pregunta).</li>
                      <li>Cuenta un cambio real (aunque sea pequeño).</li>
                      <li>Cierra con una instrucción que cualquiera pueda probar hoy.</li>
                    </ul>
                  </motion.div>

                  {/* Checklist express */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      borderRadius: 16,
                      padding: 20,
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h4 style={{ 
                      margin: "0 0 12px 0", 
                      color: "#1e40af", 
                      fontSize: fs * 1.15,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    }}>
                      ✅ Checklist express
                    </h4>
                    <ul style={{ 
                      margin: 0, 
                      paddingLeft: 22, 
                      fontSize: fs,
                      lineHeight: 1.8,
                      color: "#374151"
                    }}>
                      <li>¿Mi primera frase da motivo para quedarse?</li>
                      <li>¿Mostré un cambio concreto?</li>
                      <li>¿Dejé un paso claro?</li>
                    </ul>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Micro-ejercicio */}
              <motion.div 
                variants={itemVar}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                    borderRadius: 20,
                    padding: 28,
                    boxShadow: "0 16px 48px rgba(14, 165, 233, 0.3)",
                  }}
                >
                  <h3 style={{ 
                    margin: "0 0 16px 0", 
                    fontSize: fs * 1.4,
                    color: "white",
                    fontWeight: 800
                  }}>
                    💡 Micro-ejercicio
                  </h3>
                  <p style={{ 
                    margin: "0 0 24px 0", 
                    color: "white",
                    opacity: 0.95, 
                    fontSize: fs * 1.05,
                    fontWeight: 500
                  }}>
                    Escribe tu historia en 4 frases (una por campo):
                  </p>

                  <div style={{ display: "grid" as const, gap: 10 }}>
                    <div style={{ display: "grid" as const, gap: 16 }}>
                      <div style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        padding: 16,
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                      }}>
                        <label htmlFor="ctx" style={{ 
                          display: "block" as const, 
                          fontWeight: 700, 
                          marginBottom: 8,
                          fontSize: fs * 0.9,
                          color: "#1e40af"
                        }}>
                          1️⃣ Contexto
                      </label>
                      <input
                        id="ctx"
                        type="text"
                        value={ctx}
                        onChange={(e) => setCtx(e.target.value)}
                        placeholder="Ej.: No me alcanzaba para llegar a fin de mes."
                        style={{
                          width: "100%",
                            padding: "12px 16px",
                          borderRadius: 8,
                            border: "2px solid rgba(30, 64, 175, 0.2)",
                            fontSize: fs,
                          boxSizing: "border-box" as const,
                            transition: "all 0.3s ease"
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#3B82F6";
                            e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(30, 64, 175, 0.2)";
                            e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                      <div style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        padding: 16,
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                      }}>
                        <label htmlFor="act" style={{ 
                          display: "block" as const, 
                          fontWeight: 700, 
                          marginBottom: 8,
                          fontSize: fs * 0.9,
                          color: "#1e40af"
                        }}>
                          2️⃣ Acción
                      </label>
                      <input
                        id="act"
                        type="text"
                        value={act}
                        onChange={(e) => setAct(e.target.value)}
                        placeholder="Ej.: Separé gastos fijos de variables y puse un tope semanal."
                        style={{
                          width: "100%",
                            padding: "12px 16px",
                          borderRadius: 8,
                            border: "2px solid rgba(30, 64, 175, 0.2)",
                            fontSize: fs,
                          boxSizing: "border-box" as const,
                            transition: "all 0.3s ease"
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#3B82F6";
                            e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(30, 64, 175, 0.2)";
                            e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                      <div style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        padding: 16,
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                      }}>
                        <label htmlFor="res" style={{ 
                          display: "block" as const, 
                          fontWeight: 700, 
                          marginBottom: 8,
                          fontSize: fs * 0.9,
                          color: "#1e40af"
                        }}>
                          3️⃣ Resultado
                      </label>
                      <input
                        id="res"
                        type="text"
                        value={res}
                        onChange={(e) => setRes(e.target.value)}
                        placeholder="Ej.: Llegué a fin de mes sin deudas."
                        style={{
                          width: "100%",
                            padding: "12px 16px",
                          borderRadius: 8,
                            border: "2px solid rgba(30, 64, 175, 0.2)",
                            fontSize: fs,
                          boxSizing: "border-box" as const,
                            transition: "all 0.3s ease"
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#3B82F6";
                            e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(30, 64, 175, 0.2)";
                            e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                      <div style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        padding: 16,
                        borderRadius: 12,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                      }}>
                        <label htmlFor="apr" style={{ 
                          display: "block" as const, 
                          fontWeight: 700, 
                          marginBottom: 8,
                          fontSize: fs * 0.9,
                          color: "#1e40af"
                        }}>
                          4️⃣ Aprendizaje
                      </label>
                      <input
                        id="apr"
                        type="text"
                        value={apr}
                        onChange={(e) => setApr(e.target.value)}
                        placeholder="Ej.: Define tu tope para antojos esta semana."
                        style={{
                          width: "100%",
                            padding: "12px 16px",
                          borderRadius: 8,
                            border: "2px solid rgba(30, 64, 175, 0.2)",
                            fontSize: fs,
                          boxSizing: "border-box" as const,
                            transition: "all 0.3s ease"
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#3B82F6";
                            e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(30, 64, 175, 0.2)";
                            e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                      <motion.button
                      type="button"
                      onClick={validateExercise}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      style={{
                          padding: "16px 24px",
                          borderRadius: 12,
                        border: "none",
                          background: "linear-gradient(135deg, #10b981, #059669)",
                        color: "#fff",
                          fontWeight: 800,
                          fontSize: fs * 1.1,
                        cursor: "pointer",
                          boxShadow: "0 8px 24px rgba(16, 185, 129, 0.3)",
                          transition: "all 0.3s ease"
                      }}
                    >
                        ✓ Validar ejercicio
                      </motion.button>

                    {feedback ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        style={{
                            padding: 16,
                            borderRadius: 12,
                            background: feedback.ok ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                            border: `2px solid ${feedback.ok ? "#10b981" : "#ef4444"}`,
                            color: feedback.ok ? "#047857" : "#991b1b",
                            fontWeight: 700,
                            fontSize: fs,
                        }}
                      >
                        {feedback.msg}
                                                 </motion.div>
                    ) : null}
                  </div>
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
// Page 3: Quiz - Storytelling (15 questions)
// ============================================================================

type Question = {
  text: string
  options: string[]
  correctIndex: number
}

function Btn({
  children,
  onClick,
  variant = "primary",
  disabled,
  primaryColor,
}: {
  children: React.ReactNode
  onClick: () => void
  variant?: "primary" | "ghost"
  disabled?: boolean
  primaryColor: string
}) {
  const base: React.CSSProperties = {
    padding: "12px 16px",
    borderRadius: 12,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    userSelect: "none" as const,
    transformOrigin: "center",
    border: "none",
    background: "transparent",
  }
  const styles: Record<string, React.CSSProperties> = {
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
      style={styles[variant]}
      whileHover={disabled ? {} : { scale: 0.9 }}
      whileTap={disabled ? {} : { scale: 0.9 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      {children}
    </motion.button>
  )
}

/* ---------- Preguntas (15) ---------- */

const DEFAULT_QUESTIONS: Question[] = [
  {
    text:
      "¿Cuál es el objetivo de un 'hook' al inicio de tu contenido?\nContexto: El primer instante decide si la audiencia se queda o se va.",
    options: [
      "Mostrar todo el contenido de golpe",
      "Prometer un beneficio o despertar curiosidad",
      "Saludar a todos tus amigos",
      "Pedir que compartan antes de ver",
    ],
    correctIndex: 1,
  },
  {
    text:
      "En un mini-caso, ¿qué NO puede faltar para que sea memorable?\nContexto: Las historias se recuerdan por el cambio que muestran.",
    options: [
      "Contexto, acción, resultado y aprendizaje",
      "Una canción de moda",
      "Un filtro llamativo",
      "Un mensaje ambiguo",
    ],
    correctIndex: 0,
  },
  {
    text:
      "¿Qué hace 'transferible' un aprendizaje dentro de una historia personal?\nContexto: Compartir el proceso ayuda a otros a aplicarlo.",
    options: [
      "Que sea un secreto guardado",
      "Que incluya pasos o principios aplicables",
      "Que dependa solo del azar",
      "Que use jerga innecesaria",
    ],
    correctIndex: 1,
  },
  {
    text:
      "¿Cuál cierre conecta mejor con un objetivo de conseguir reuniones de prueba?\nContexto: El cierre debe alinearse con la meta del contenido.",
    options: ["\"Dale like\"", "\"Comparte si te gustó\"", "\"Agenda tu demo aquí\"", "\"Buen día\""],
    correctIndex: 2,
  },
  {
    text:
      "¿Qué rol juega la vulnerabilidad estratégica en storytelling?\nContexto: Mostrar procesos reales humaniza sin perder profesionalismo.",
    options: ["Exponer todo sin criterio", "Compartir errores con intención didáctica", "Evitar cualquier error", "Contar chismes"],
    correctIndex: 1,
  },
  {
    text:
      "¿Qué estructura simple ayuda a planear un carrusel educativo?\nContexto: Las estructuras guían al lector.",
    options: [
      "Portada con promesa, pasos claros y cierre con acción",
      "Memes aleatorios",
      "Texto muy pequeño",
      "Imágenes sin relación",
    ],
    correctIndex: 0,
  },
  {
    text:
      "Un buen hook puede ser una promesa concreta o una pregunta que active curiosidad.\nContexto: El objetivo es ganar segundos de atención con honestidad.",
    options: ["Verdadero", "Falso"],
    correctIndex: 0,
  },
  {
    text:
      "Las historias personales no deben incluir resultados; solo sensaciones.\nContexto: Resultados, aunque modestos, permiten aprender y confiar.",
    options: ["Verdadero", "Falso"],
    correctIndex: 1,
  },
  {
    text:
      "Educar con pasos concretos hace que más personas puedan aplicar lo que cuentas.\nContexto: La claridad práctica aumenta el valor percibido.",
    options: ["Verdadero", "Falso"],
    correctIndex: 0,
  },
  {
    text:
      "Un CTA es innecesario si el contenido ya fue útil.\nContexto: Guiar el siguiente paso facilita la acción.",
    options: ["Verdadero", "Falso"],
    correctIndex: 1,
  },
  {
    text:
      "Mostrar un proceso real puede ser útil incluso si no fue perfecto.\nContexto: El aprendizaje surge del proceso, no solo del resultado ideal.",
    options: ["Verdadero", "Falso"],
    correctIndex: 0,
  },
  {
    text:
      "Tarjeta: \"AIDA\". ¿Qué opción describe mejor esta estructura?\nContexto: AIDA es una guía clásica para persuadir con claridad.",
    options: [
      "Atención, Interés, Deseo, Acción",
      "Amistad, Idea, Descanso, Amor",
      "Acuerdo, Información, Datos, Autoridad",
      "Atracción, Identidad, Duda, Apoyo",
    ],
    correctIndex: 0,
  },
  {
    text:
      "Tarjeta: \"Hook\". ¿Cuál ejemplo encaja?\nContexto: El hook es el inicio que hace quedarse a la audiencia.",
    options: ["\"Hoy te muestro 3 pasos simples para...\"", "\"Buenas tardes, soy...\"", "\"¿Alguien por aquí?\"", "\"Fin del video\""],
    correctIndex: 0,
  },
  {
    text:
      "Tarjeta: \"Mini-caso\". ¿Qué define un buen mini-caso?\nContexto: Un mini-caso muestra cambio en poco espacio.",
    options: ["Contexto + acción + resultado", "Solo una opinión", "Un meme", "Un listado de hashtags"],
    correctIndex: 0,
  },
  {
    text:
      "Tarjeta: \"CTA alineado\". ¿Qué opción refleja mejor la alineación?\nContexto: El CTA debe coincidir con la meta.",
    options: [
      "Meta: leads → \"Agenda tu demo\"",
      "Meta: leads → \"Dale like\"",
      "Meta: leads → \"Comparte\"",
      "Meta: leads → \"Feliz día\"",
    ],
    correctIndex: 0,
  },
]

export type BSMXSection2Page3Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  layoutOption?: "A" | "B"
  baseFontSize?: number
  // Tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: number | null, correctAnswer: number, isCorrect: boolean) => void
  onQuizComplete?: (score: number) => void
  isAlreadyCompleted?: boolean
  completedScore?: number
}

export function BSMXSection2Page3({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 50,
  title = "",
  topicTitle = "Storytelling y narrativa personal (15 preguntas)",
  layoutOption = "B",
  baseFontSize = 18,
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: BSMXSection2Page3Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s2-page3-shimmer-effects';
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

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)))

  const total = DEFAULT_QUESTIONS.length
  
  // Use persistence hook to save progress across refreshes
  const persistence = useQuizPersistence(
    "bsmx:quiz:m2s2p3",
    total,
    !isAlreadyCompleted
  );
  
  const idx = persistence.idx;
  const setIdx = persistence.setIdx;
  const selection = persistence.answers as (number | null)[];
  const setSelection = persistence.setAnswers;
  const checked = persistence.checked;
  const setChecked = persistence.setChecked;
  const correct = persistence.correct;
  const setCorrect = persistence.setCorrect;
  const score = persistence.score;
  const setScore = persistence.setScore;

  const q = idx >= 0 && idx < total ? DEFAULT_QUESTIONS[idx] : null
  const canCheck = !!q && selection[idx] !== null && !checked[idx]

  const handleSelect = (optionIndex: number) => {
    if (!q || checked[idx]) return
    const next = [...selection]
    next[idx] = optionIndex
    setSelection(next)
    const isCorrect = optionIndex === q.correctIndex
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
      onAnswerSubmit(idx, q.text, q.options[optionIndex], q.options[q.correctIndex], isCorrect);
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

  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total
  const quizProgressPct = Math.round(((idx + 1) / total) * 100)

  const optStyle = (active: boolean): React.CSSProperties => ({
    padding: "14px 16px",
    borderRadius: 12,
    border: `2px solid ${active ? "#1e40af" : "rgba(0,0,0,0.12)"}`,
    background: active 
      ? "linear-gradient(135deg, #1e40af, #3B82F6)" 
      : "linear-gradient(135deg, #f0f7ff, #ffffff)",
    color: active ? "white" : "#1e40af",
    fontWeight: 700,
    fontSize: fs * 1.0,
    letterSpacing: 0.2,
    cursor: "pointer",
    userSelect: "none" as const,
    textAlign: "left" as const,
    boxShadow: active 
      ? "0 4px 12px rgba(30, 64, 175, 0.3), 0 2px 6px rgba(59, 130, 246, 0.2)" 
      : "0 2px 8px rgba(0,0,0,0.08)",
    transformOrigin: "center",
    transition: "all 0.3s ease",
  })

  const feedback =
    q && checked[idx] && correct[idx] ? (
      <div style={{ color: "#0a7f35", fontWeight: 700 }}>✅ ¡Correcto!</div>
    ) : q && checked[idx] && !correct[idx] ? (
      <div style={{ color: "#b00020", fontWeight: 700 }}>
        ❌ Incorrecto. Respuesta: <strong>{q.options[q.correctIndex]}</strong>
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
            text: 'El storytelling puede aumentar la recordación de marca hasta en 22 veces más.',
            characterImage: '/2.png'
          },
          {
            character: 'drago',
            text: 'Los perfiles con foto profesional reciben 14 veces más visitas en LinkedIn.',
            characterImage: '/drago1.png'
          },
          {
            character: 'billy',
            text: 'El 90% de los compradores B2B confía más en líderes con marca personal sólida.',
            characterImage: '/2.png'
          },
          {
            character: 'drago',
            text: 'La coherencia visual incrementa la confianza del público un 30%.',
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
          minHeight: "100vh",
        }}
      >
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={pct}
          brandName={brandName}
          logoSrc={logoSrc}
        />

        {/* Contenido */}
        <section style={{ flex: 1 }}>
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
                    <strong style={{ fontSize: fs * 1.05, color: "#1e40af" }}>
                      Pregunta {Math.min(idx + 1, total)} / {total}
                    </strong>
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 10 }}>
                      <div
                        style={{
                          width: 240,
                          height: 12,
                          background: "rgba(30, 64, 175, 0.1)",
                          borderRadius: 999,
                          overflow: "hidden" as const,
                        }}
                      >
                        <div
                          style={{
                            width: `${quizProgressPct}%`,
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

                  {/* Enunciado */}
                  <p style={{ 
                    margin: "10px 0 16px", 
                    lineHeight: 1.55, 
                    fontSize: fs * 1.1, 
                    whiteSpace: "pre-wrap" as const,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 600
                  }}>
                    {q ? q.text : "—"}
                  </p>

                  {/* Opciones */}
                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: 12,
                      marginBottom: 14,
                    }}
                  >
                    {(q?.options ?? []).map((opt, i) => {
                      const isSelected = selection[idx] === i
                      return (
                        <motion.div
                          key={i}
                          role="button"
                          onClick={() => handleSelect(i)}
                          style={optStyle(isSelected)}
                          aria-pressed={isSelected}
                          whileHover={{ scale: 0.9 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        >
                          {opt ?? ""}
                        </motion.div>
                      )
                    })}
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
// Page 4: True/False Quiz with Auto-Advance
// ============================================================================

// 15 afirmaciones V/F (Sección 2 · Storytelling)
const VF_QUESTIONS: { text: string; answer: boolean }[] = [
  { text: "El objetivo de un hook al inicio es prometer un beneficio o despertar curiosidad.", answer: true },
  { text: "Un mini-caso memorable incluye contexto, acción, resultado y aprendizaje.", answer: true },
  { text: "Un aprendizaje se vuelve transferible cuando incluye pasos o principios aplicables.", answer: true },
  { text: "Si tu objetivo es conseguir reuniones de prueba, un buen cierre es: «Agenda tu demo aquí».", answer: true },
  { text: "La vulnerabilidad estratégica implica compartir errores con intención didáctica, no exponerlo todo sin criterio.", answer: true },
  { text: "Una estructura efectiva de carrusel es: portada con promesa, pasos claros y cierre con acción.", answer: true },
  { text: "Un buen hook puede ser una promesa concreta o una pregunta que active curiosidad.", answer: true },
  { text: "Las historias personales no deben incluir resultados; solo sensaciones.", answer: false },
  { text: "Educar con pasos concretos hace que más personas puedan aplicar lo que cuentas.", answer: true },
  { text: "Un CTA es innecesario si el contenido ya fue útil.", answer: false },
  { text: "Mostrar un proceso real puede ser útil incluso si no fue perfecto.", answer: true },
  { text: "AIDA significa Atención, Interés, Deseo y Acción.", answer: true },
  { text: "Un ejemplo válido de hook es: «Hoy te muestro 3 pasos simples para…».", answer: true },
  { text: "Un buen mini-caso se define por: contexto + acción + resultado.", answer: true },
  { text: "Si tu meta son leads, un CTA alineado es «Agenda tu demo».", answer: true },
]

export type BSMXSection2Page4Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  layoutOption?: "A" | "B"
  baseFontSize?: number
  imageSrc?: string
  imageAlt?: string
  // Tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: number | null, correctAnswer: number, isCorrect: boolean) => void
  onQuizComplete?: (score: number) => void
  isAlreadyCompleted?: boolean
  completedScore?: number
}

export function BSMXSection2Page4({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 75,
  title = "",
  topicTitle = "Hooks, mini-casos, AIDA y CTA alineado – Verdadero o Falso",
  layoutOption = "B",
  baseFontSize = 18,
  imageSrc = "",
  imageAlt = "Imagen de la sección",
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: BSMXSection2Page4Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s2-page4-shimmer-effects';
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

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  const total = VF_QUESTIONS.length
  const [idx, setIdx] = useState(0)
  const [selection, setSelection] = useState<(boolean | null)[]>(Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(Array(total).fill(false))
  const [score, setScore] = useState(0)

  const q = VF_QUESTIONS[idx]
  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total

  const optStyle = (active: boolean): React.CSSProperties => ({
    padding: "18px 22px",
    borderRadius: 14,
    border: `2px solid ${active ? "#1e40af" : "rgba(0,0,0,0.12)"}`,
    background: active 
      ? "linear-gradient(135deg, #1e40af, #3B82F6)" 
      : "linear-gradient(135deg, #f0f7ff, #ffffff)",
    color: active ? "white" : "#1e40af",
    fontWeight: 800,
    fontSize: fs * 1.4,
    letterSpacing: 0.2,
    cursor: checked[idx] ? "default" : "pointer",
    userSelect: "none" as const,
    textAlign: "center" as const,
    boxShadow: active 
      ? "0 8px 24px rgba(30, 64, 175, 0.3), 0 4px 12px rgba(59, 130, 246, 0.2)" 
      : "0 2px 8px rgba(0,0,0,0.08)",
    transformOrigin: "center",
    transition: "all 0.3s ease",
  })

  const handleSelect = (val: boolean) => {
    if (checked[idx]) return
    const nextSel = [...selection]
    nextSel[idx] = val
    setSelection(nextSel)

    const isCorrect = val === q.answer
    setChecked((prev) => {
      const n = [...prev]
      n[idx] = true
      return n
    })
    setCorrect((prev) => {
      const n = [...prev]
      n[idx] = isCorrect
      return n
    })
    const newScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) setScore((s) => s + 1)

    // Track the answer
    if (onAnswerSubmit) {
      onAnswerSubmit(idx, q.text, val, q.answer, isCorrect);
    }

    // auto-avance a la siguiente pregunta (si existe)
    setTimeout(() => {
      if (idx < total - 1) {
        setIdx((cur) => cur + 1);
      } else {
        // Quiz complete - submit final score
        if (onQuizComplete) {
          onQuizComplete(newScore);
        }
      }
    }, 650)
  }

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
        <main style={{ width: "100%", display: "block" }}>
          <div style={{ ...container, paddingTop: 60, textAlign: "center" as const }}>
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
            text: 'El tono de voz de una marca define el 40% de su percepción emocional.',
            characterImage: '/2.png'
          },
          {
            character: 'drago',
            text: 'El 77% de los consumidores prefiere comprar a marcas que comparten su propósito.',
            characterImage: '/drago1.png'
          },
          {
            character: 'billy',
            text: 'Los colores cálidos generan un 24% más de respuesta emocional positiva.',
            characterImage: '/2.png'
          },
          {
            character: 'drago',
            text: 'Un mensaje de marca claro puede duplicar la retención de audiencia.',
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
          minHeight: "100vh",
        }}
      >
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={pct}
          brandName={brandName}
          logoSrc={logoSrc}
        />

        {/* Contenido */}
        <section style={{ flex: 1 }}>
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

                  {/* Opciones (hover/press 0.9) */}
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
                      aria-label="Verdadero"
                      tabIndex={0}
                      onClick={() => handleSelect(true)}
                      style={optStyle(selection[idx] === true)}
                      whileHover={checked[idx] ? {} : { scale: 0.9 }}
                      whileTap={checked[idx] ? {} : { scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    >
                      VERDADERO
                    </motion.div>

                    <motion.div
                      role="button"
                      aria-label="Falso"
                      tabIndex={0}
                      onClick={() => handleSelect(false)}
                      style={optStyle(selection[idx] === false)}
                      whileHover={checked[idx] ? {} : { scale: 0.9 }}
                      whileTap={checked[idx] ? {} : { scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    >
                      FALSO
                    </motion.div>
                  </div>

                  {/* Feedback */}
                  <div style={{ marginBottom: 14 }}>{feedback}</div>

                  {/* Resultado final (sin botón de reinicio) */}
                  {finished ? (
                    <div
                      style={{
                        marginTop: 18,
                        padding: 20,
                        border: "2px solid #1e40af",
                        borderRadius: 16,
                        background: "linear-gradient(135deg, #f0f7ff, #ffffff)",
                        display: "flex" as const,
                        alignItems: "center" as const,
                        justifyContent: "space-between" as const,
                        boxShadow: "0 8px 24px rgba(30, 64, 175, 0.15)",
                      }}
                    >
                      <strong style={{ fontSize: fs * 1.1, color: "#1e40af" }}>Resultado:</strong>
                      <span style={{ 
                        fontWeight: 800, 
                        color: "#ffffff",
                        background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                        padding: "8px 20px",
                        borderRadius: 8,
                        boxShadow: "0 4px 12px rgba(30, 64, 175, 0.3)"
                      }}>
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
// Page 5: Story Writing Activity with Flashcards (No Framer, Pure React)
// ============================================================================

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max))
}

function GridFlashcardsPage5({
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

function FlashcardPage5({
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
  const [open, setOpen] = React.useState(false)
  const [hover, setHover] = React.useState(false)

  return (
    <div
      role="button"
      onClick={() => setOpen((v) => !v)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        userSelect: "none" as const,
        cursor: "pointer",
        borderRadius: 16,
        border: `1px solid ${primaryColor}33`,
        background: open ? `${primaryColor}0F` : "#fff",
        padding: 18,
        minHeight: 200,
        boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 12,
        transform: hover ? "scale(0.98)" : "scale(1)",
        transition: "transform .12s ease, background-color .15s ease, box-shadow .2s ease",
        willChange: "transform",
      }}
      aria-label={`${front}${open ? " (abierta)" : ""}`}
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

      <p
        style={{
          margin: 0,
          opacity: 0.95,
          fontSize: fontSize,
          lineHeight: 1.55,
          flex: 1,
        }}
      >
        {open ? back : "Toca para ver"}
      </p>
    </div>
  )
}

const DEFAULT_INSTRUCTIONS_PAGE5 = [
  "ANTES: Describe tu situación inicial en 1 frase. Ej.: \"Me costaba organizar mi tiempo en la universidad\".",
  "ACCIÓN: Explica qué hiciste (con verbo) en 1 frase. Ej.: \"Bloqueé horarios y puse recordatorios diarios\".",
  "RESULTADO: Muestra el cambio observable en 1 frase. Ej.: \"Entregué todos mis trabajos a tiempo por 4 semanas\".",
  "APRENDIZAJE: Deja una instrucción replicable en 1 frase. Ej.: \"Agenda hoy 2 bloques de 45 min para tu tarea más difícil\".",
  "TIP: Usa lenguaje sencillo y específico; evita tecnicismos. 1 frase por tarjeta.",
  "TIP: Si puedes, agrega un número al resultado (%, semanas, cantidad).",
]

// Interactive Writing Step Component
function InteractiveWritingStep({ stepNumber, instruction, fs }: { stepNumber: number; instruction: string; fs: number }) {
  const [userText, setUserText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(e.target.value);
  };

  const handleComplete = () => {
    if (userText.trim()) {
      setIsCompleted(!isCompleted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: stepNumber * 0.1 }}
      style={{
        padding: 20,
        borderRadius: 16,
        background: isCompleted
          ? "linear-gradient(135deg, #f0fdf4, #dcfce7)"
          : "linear-gradient(135deg, #f0f7ff, #ffffff)",
        border: `2px solid ${isCompleted ? "#10b981" : "#3B82F6"}`,
        boxShadow: isCompleted
          ? "0 8px 24px rgba(16, 185, 129, 0.15)"
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
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: isCompleted
            ? "linear-gradient(135deg, #10b981, #059669)"
            : "linear-gradient(135deg, #1e40af, #3B82F6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 800,
          fontSize: fs * 1.1,
          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
          flexShrink: 0
        }}>
          {isCompleted ? "✓" : stepNumber}
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{
            margin: 0,
            fontSize: fs * 1.05,
            color: isCompleted ? "#059669" : "#1e40af",
            fontWeight: 700,
            lineHeight: 1.3
          }}>
            {instruction.split(":")[0] + ":"}
          </h4>
        </div>
      </div>

      <p style={{
        margin: "0 0 12px 52px",
        fontSize: fs * 0.9,
        color: "#6b7280",
        lineHeight: 1.5,
        fontStyle: "italic"
      }}>
        {instruction.split(":")[1]?.trim()}
      </p>

      <textarea
        value={userText}
        onChange={handleTextChange}
        placeholder="Escribe tu respuesta aquí..."
        style={{
          width: "100%",
          minHeight: "80px",
          padding: 14,
          borderRadius: 10,
          border: `2px solid ${isCompleted ? "#10b981" : "#e5e7eb"}`,
          fontSize: fs,
          fontFamily: "inherit",
          resize: "vertical" as const,
          outline: "none",
          transition: "all 0.3s ease",
          background: "white",
          color: "#111"
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#3B82F6";
          e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = userText ? "#10b981" : "#e5e7eb";
          e.target.style.boxShadow = "none";
        }}
        disabled={isCompleted}
      />

      {userText.trim() && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleComplete}
          style={{
            marginTop: 12,
            padding: "12px 24px",
            borderRadius: 10,
            border: "none",
            background: isCompleted
              ? "linear-gradient(135deg, #1e40af, #3B82F6)"
              : "linear-gradient(135deg, #10b981, #059669)",
            color: "white",
            fontSize: fs * 0.95,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
          }}
        >
          {isCompleted ? "✓ Completado - Volver a editar" : "✓ Marcar como completado"}
        </motion.button>
      )}
    </motion.div>
  );
}

export type BSMXSection2Page5Props = {
  // Branding / Layout
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  layoutOption?: "A" | "B" // A = izquierda, B = centrado
  baseFontSize?: number

  // Contenido
  instructions?: string[]
  gridColumns?: number
  gridGap?: number
}

export function BSMXSection2Page5({
  // Branding / Layout
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 100,
  title = "",
  topicTitle = "Historia breve con aprendizaje",
  layoutOption = "B",
  baseFontSize = 18,

  // Contenido
  instructions = DEFAULT_INSTRUCTIONS_PAGE5,
  gridColumns = 1,
  gridGap = 16,
}: BSMXSection2Page5Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isLeft = layoutOption === "A"
  const pct = clamp(Math.round(progressPercent || 0), 0, 100)

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm2s2-page5-shimmer-effects';
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

  const list = (instructions?.length ? instructions : DEFAULT_INSTRUCTIONS_PAGE5).map((t, i) => ({
    front: `Paso ${i + 1}`,
    back: t,
  }))

  const wrapper = React.useMemo(
    () => ({
      width: "100%",
      display: "flex" as const,
      justifyContent: "flex-start",
      background,
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs,
    }),
    [background, fs]
  )

  const container = React.useMemo(
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
      <main style={{ width: "100%", display: "block" }}>
        {/* Header */}
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={pct}
          brandName={brandName}
          logoSrc={logoSrc}
        />

        {/* Contenido */}
        <section>
          <div style={{ ...container }}>
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

            {/* Aviso motivacional */}
            <motion.div 
              variants={itemVar} 
              style={{ marginBottom: 18 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <Card glow="#1e40af">
                <div
                  style={{
                    display: "flex" as const,
                    alignItems: "center" as const,
                    gap: 10,
                    fontWeight: 800,
                    fontSize: fs * 1.05,
                    background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ✍️ Escribe tu historia en 4 pasos: Antes → Acción → Resultado → Aprendizaje.
                </div>
              </Card>
            </motion.div>

            {/* Actividad práctica — Flashcards */}
            <motion.div 
              variants={itemVar} 
              style={{ marginBottom: 16 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
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
                  Actividad práctica: Historia breve con aprendizaje
                </h3>
                <p style={{ 
                  margin: "0 0 24px 0", 
                  opacity: 0.8,
                  color: "#1e40af",
                  fontWeight: 500
                }}>
                  Completa cada paso escribiendo tu historia en los espacios proporcionados.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {instructions.slice(0, 4).map((instruction, i) => (
                    <InteractiveWritingStep 
                      key={i}
                      stepNumber={i + 1}
                      instruction={instruction}
                      fs={fs}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      {/* mini CSS-in-JSX para el pulso del % */}
      <style jsx>{`
        @keyframes pulseScale {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .pulse { animation: pulseScale 1.6s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

// ============================================================================
// Content Mapping - Export for routing
// ============================================================================

const M2S2_CONTENT: Record<number, React.ReactNode> = {
  1: <BSMXWelcomeM1S2 />,
  2: <BSMXSection2Page2 />,
  3: <BSMXSection2Page3 />,
  4: <BSMXSection2Page4 />,
  5: <BSMXSection2Page5 />,
};

export default M2S2_CONTENT;

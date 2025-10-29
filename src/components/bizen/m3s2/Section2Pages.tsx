/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { motion, Variants } from "framer-motion"
import SectionPageHeader from "@/components/bizen/SectionPageHeader"
import MarketingFactsAnimation, { m3s2p4Facts } from "@/components/MarketingFactsAnimation"

type LayoutOption = "A" | "B"



type Page1Props = {
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
  glossaryItems?: string[]
  structurePills?: string[]
  enableExercise?: boolean
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

const COMM_VF_QUESTIONS: { text: string; answer: boolean }[] = [
  { text: "La función de mirar a cámara es simular contacto visual para conectar con la audiencia.", answer: true },
  { text: "Una postura neutra y abierta comunica seguridad y accesibilidad.", answer: true },
  { text: "Las pausas breves ayudan a enfatizar ideas y a que el público procese el mensaje.", answer: true },
  { text: "Los gestos a la altura del pecho acompañan y clarifican el discurso dentro del encuadre.", answer: true },
  { text: "Una leve sonrisa inicial predispone positivamente y reduce fricción.", answer: true },
  { text: "Modular el ritmo de voz (acelerar, frenar y pausar) guía la atención y evita la monotonía.", answer: true },
  { text: "Balancearse de forma constante frente a cámara transmite estabilidad y control.", answer: false },
  { text: "La congruencia entre palabras, tono y gestos incrementa la credibilidad del mensaje.", answer: true },
  { text: "Puedes mirar tus notas y volver al lente siempre que retomes el contacto en ideas clave.", answer: true },
  { text: "Cruzar los brazos por tiempo prolongado suele comunicar apertura y escucha.", answer: false },
  { text: "Una respiración baja (diafragmática) favorece una voz más estable y presencia.", answer: true },
  { text: "El contacto visual efectivo consiste en mirar al lente en los puntos centrales.", answer: true },
  { text: "Las pausas sirven para enfatizar conceptos y ordenar el discurso.", answer: true },
  { text: "Los gestos deben ocurrir dentro del encuadre y a la altura del pecho para ser visibles.", answer: true },
  { text: "El ritmo ideal es variable: se ajusta al contenido y se apoya en pausas en lo clave.", answer: true },
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
  autoAdvanceDelayMs?: number
  imageSrc?: string
  imageAlt?: string
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
  instructions?: string[]
  gridColumns?: number
  gridGap?: number
}

const MAX_WIDTH = 1200

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

function Card({ children, glow, borderColor = "rgba(0,0,0,0.08)" }: { children: React.ReactNode; glow?: string; borderColor?: string }) {
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

function FlashCard({ title, body, primaryColor, fs }: { title?: string; body: string; primaryColor: string; fs: number }) {
  return (
    <motion.div
      whileHover={{ scale: 0.9 }}
      whileTap={{ scale: 0.9 }}
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

function GridFlashcards({ children, gap = 16, columns = 1 }: { children: React.ReactNode; gap?: number; columns?: number }) {
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
  const [open, setOpen] = useState(false)
  
  const cardGradients = [
    { bg: "linear-gradient(135deg, #3b82f6, #2563eb)", border: "#1e40af", icon: "💡" },
    { bg: "linear-gradient(135deg, #06b6d4, #0891b2)", border: "#0e7490", icon: "✨" },
    { bg: "linear-gradient(135deg, #10b981, #059669)", border: "#047857", icon: "🎯" },
    { bg: "linear-gradient(135deg, #f59e0b, #d97706)", border: "#92400e", icon: "🔥" },
    { bg: "linear-gradient(135deg, #8b5cf6, #7c3aed)", border: "#6b21a8", icon: "⭐" },
    { bg: "linear-gradient(135deg, #ec4899, #db2777)", border: "#9f1239", icon: "🎊" },
    { bg: "linear-gradient(135deg, #14b8a6, #0d9488)", border: "#0f766e", icon: "🌟" },
  ]
  
  // Use index-based color selection for variety
  const cardIndex = parseInt(front.split(" ")[1]) - 1 || 0
  const colors = cardGradients[cardIndex % cardGradients.length]
  
  return (
    <motion.div
      role="button"
      onClick={() => setOpen((value) => !value)}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        userSelect: "none",
        cursor: "pointer",
        borderRadius: 22,
        border: `3px solid ${colors.border}`,
        background: open 
          ? colors.bg 
          : "linear-gradient(135deg, #ffffff, #f8fafc)",
        padding: 24,
        minHeight: 220,
        boxShadow: open 
          ? "0 16px 40px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.1)"
          : "0 8px 24px rgba(0, 0, 0, 0.08)",
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 16,
        transformOrigin: "center",
        willChange: "transform",
        position: "relative" as const,
        overflow: "hidden" as const,
      }}
    >
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          style={{
            position: "absolute" as const,
            inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
            pointerEvents: "none" as const,
          }}
        />
      )}
      
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <motion.div
          animate={open ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: open ? "rgba(255, 255, 255, 0.25)" : colors.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          {colors.icon}
        </motion.div>
        <strong
          style={{
            color: open ? "white" : colors.border,
            display: "block" as const,
            fontSize: fontSize * 1.3,
            lineHeight: 1.2,
            fontWeight: 800,
          }}
        >
          {front}
        </strong>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          overflow: "hidden",
          flex: 1,
        }}
      >
        <p
          style={{
            margin: 0,
            color: open ? "white" : "#64748b",
            fontSize: fontSize * 1.05,
            lineHeight: 1.7,
            fontWeight: open ? 600 : 500,
          }}
        >
          {back}
        </p>
      </motion.div>
      
      {!open && (
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: colors.border,
            fontSize: fontSize * 0.95,
            fontWeight: 700,
            marginTop: "auto",
          }}
        >
          👆 Toca para ver el contenido
        </motion.div>
      )}
    </motion.div>
  )
}

function DraggableRow({ children, gap = 16 }: { children: React.ReactNode; gap?: number }) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !trackRef.current) return
      const viewWidth = viewportRef.current.offsetWidth
      const scrollWidth = trackRef.current.scrollWidth
      setWidth(Math.max(0, scrollWidth - viewWidth))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  return (
    <div ref={viewportRef} style={{ overflow: "hidden" as const, width: "100%" }}>
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -width, right: 0 }}
        whileTap={{ cursor: width > 0 ? "grabbing" : "default" }}
        style={{
          display: "flex" as const,
          gap,
          paddingBottom: 6,
          cursor: width > 0 ? "grab" : "default",
        }}
      >
        {children}
      </motion.div>
    </div>
  )
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
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {imageSrc ? (
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

function QAItem({
  question,
  answer,
  primaryColor,
  fs,
}: {
  question: string
  answer: string
  primaryColor: string
  fs: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.button
      type="button"
      onClick={() => setOpen((value) => !value)}
      whileHover={{ scale: 0.9 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      style={{
        textAlign: "left",
        borderRadius: 14,
        border: `1px solid ${primaryColor}33`,
        background: open ? `${primaryColor}0F` : "#fff",
        padding: 14,
        cursor: "pointer",
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 8,
      }}
    >
      <strong style={{ color: primaryColor, fontSize: fs * 1.05 }}>{question}</strong>
      <span style={{ opacity: 0.95, fontSize: fs }}>{open ? answer : "Toca para ver la respuesta"}</span>
    </motion.button>
  )
}

const DEFAULT_WHY =
  "La forma de decir las cosas también enseña: una pausa a tiempo y mirar al lente hacen que el mensaje aterrice."
const DEFAULT_CASE =
  "Di tu frase clave mirando al lente, haz una pausa breve y luego muestra un ejemplo. La gente lo recordará mejor."
const DEFAULT_GLOSSARY = [
  "Mirada al lente: simula contacto visual en puntos clave.",
  "Pausa: silencio corto para subrayar ideas.",
  "Gestos visibles: manos dentro del encuadre para acompañar.",
  "Respiración baja: estabiliza la voz y los nervios. Hábito: antes de grabar, dos respiraciones profundas y di tu primera frase.",
]
const DEFAULT_STRUCTURE_PILLS = ["Mirada", "Pausa", "Gestos", "Respiración"]
const DEFAULT_SYLLABUS = [
  "Por qué importa la comunicación no verbal.",
  "Ejemplo práctico aplicable.",
  "Hábitos clave: mirada, pausa, gestos, respiración.",
  "Cómo integrarlos en tu guion.",
]
const DEFAULT_POINTS = [
  "Mira al lente en la frase clave para simular contacto visual.",
  "Usa pausas breves para subrayar ideas y dar aire.",
  "Mantén las manos dentro del encuadre para acompañar el mensaje.",
  "Respiración baja para voz estable y menos nervios.",
  "Practica: dos respiraciones profundas antes de grabar y di tu primera frase.",
]

const DEFAULT_INSTRUCTIONS = [
  "POSTURA: Describe tu postura ideal (erguida, hombros relajados, pies firmes, sin balanceos).",
  "MANOS: Cómo las usarás (gestos a la altura del pecho para 3 ideas, sin tapar el rostro).",
  "RITMO DE VOZ: Frases cortas, énfasis en palabras clave y variaciones de entonación.",
  "PAUSAS: Pausas de 1–2 s tras cada idea clave; respira y evita muletillas.",
  "MIRADA: Mira al lente para cerrar cada bloque; solo hojea notas brevemente.",
  "PÁRRAFO FINAL: Redacta 4–6 líneas integrando postura, manos, ritmo, pausas y mirada.",
  "PRIMER HÁBITO: Escribe qué practicarás primero (p. ej., “mirar al lente al final de cada frase”).",
]

function Page1({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 0,
  title = "Sección 2",
  topicTitle = "Comunicación no verbal frente a cámara",
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
}: Page1Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isLeft = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm3s2-page1-shimmer-effects';
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
      background: "#FFFFFF",
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs * 1.25,
    }),
    [background, isLeft, fs]
  )

  const container = useMemo(
    () => ({
      width: "100%",
      maxWidth: "100%",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: 0,
    }),
    []
  )

  const [ctx, setCtx] = useState("")
  const [act, setAct] = useState("")
  const [res, setRes] = useState("")
  const [, setApr] = useState("")
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null)

  const breatheAnim = { scale: [1, 1.1, 1] }
  const breatheTransition = { duration: 1.4, ease: "easeInOut" as const, repeat: Infinity, repeatType: "mirror" as const }

  const validateExercise = () => {
    const checks = [
      { value: ctx.trim(), label: "Frase clave" },
      { value: act.trim(), label: "Pausa" },
      { value: res.trim(), label: "Ejemplo" },
    ]

    for (const c of checks) {
      if (!c.value) {
        setFeedback({ ok: false, msg: `Falta "${c.label}".` })
        return
      }
      if (c.value.length > 220) {
        setFeedback({ ok: false, msg: `"${c.label}" es muy largo. Usa una frase (≤ 220 caracteres).` })
        return
      }
    }

    setFeedback({ ok: true, msg: "¡Excelente! Estructura lista para practicar." })
  }

  const resetExercise = () => {
    setCtx("")
    setAct("")
    setRes("")
    setApr("")
    setFeedback(null)
  }

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
                <motion.div variants={itemVar} style={{ borderRadius: 16, overflow: "hidden" as const, margin: "10px 0 18px" }}>
                  <img src={heroImage} alt="Sección 2" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              {/* Enhanced Why It Matters Card */}
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #fef3c7)",
                    borderRadius: 24,
                    border: "2px solid #fbbf24",
                    padding: 32,
                    boxShadow: "0 12px 40px rgba(251, 191, 36, 0.2)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                      }}
                    >
                      💡
                    </motion.div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.6,
                      background: "linear-gradient(135deg, #92400e, #b45309)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800 
                    }}>
                      ¿Por qué importa?
                    </h3>
                  </div>
                  <p style={{ 
                    margin: 0, 
                    fontSize: fs * 1.1,
                    lineHeight: 1.7,
                    color: "#78350f",
                    fontWeight: 500 
                  }}>
                    {whyItMatters}
                  </p>
                </div>
              </motion.div>

              {/* Enhanced Practical Example Card */}
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #fce7f3)",
                    borderRadius: 24,
                    border: "2px solid #ec4899",
                    padding: 32,
                    boxShadow: "0 12px 40px rgba(236, 72, 153, 0.2)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #db2777, #ec4899)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                      }}
                    >
                      🎬
                    </motion.div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.6,
                      background: "linear-gradient(135deg, #9f1239, #be185d)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800 
                    }}>
                      Ejemplo práctico
                    </h3>
                  </div>
                  <blockquote
                    style={{
                      margin: 0,
                      padding: "20px 24px",
                      borderRadius: 16,
                      borderLeft: `5px solid #ec4899`,
                      background: "rgba(236, 72, 153, 0.05)",
                      opacity: 0.95,
                      lineHeight: 1.7,
                      fontSize: fs * 1.05,
                      color: "#831843",
                      fontWeight: 500,
                      fontStyle: "italic",
                    }}
                  >
                    {caseText}
                  </blockquote>
                </div>
              </motion.div>

              {/* Enhanced Glossary and Habits Section */}
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #e0f2fe)",
                    borderRadius: 24,
                    border: "2px solid #0ea5e9",
                    padding: 32,
                    boxShadow: "0 12px 40px rgba(14, 165, 233, 0.2)",
                  }}
                >
                  <motion.h3 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                      margin: "0 0 24px 0", 
                      fontSize: fs * 1.6,
                      background: "linear-gradient(135deg, #0369a1, #0284c7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800 
                    }}
                  >
                    📚 Glosario y hábitos
                  </motion.h3>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                    {glossaryItems.map((item, index) => {
                      const colors = [
                        { bg: "linear-gradient(135deg, #dbeafe, #bfdbfe)", border: "#3b82f6", icon: "👁️" },
                        { bg: "linear-gradient(135deg, #f0fdf4, #dcfce7)", border: "#22c55e", icon: "⏸️" },
                        { bg: "linear-gradient(135deg, #fef3c7, #fde68a)", border: "#eab308", icon: "👋" },
                        { bg: "linear-gradient(135deg, #fce7f3, #fbcfe8)", border: "#ec4899", icon: "🌬️" },
                      ]
                      const color = colors[index % colors.length]
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.03, y: -4 }}
                          style={{
                            border: `3px solid ${color.border}`,
                            borderRadius: 20,
                            background: color.bg,
                            padding: "24px",
                            boxShadow: "0 8px 24px rgba(59, 130, 246, 0.15)",
                            cursor: "pointer",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                            <div style={{
                              width: 48,
                              height: 48,
                              borderRadius: "50%",
                              background: color.border,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 24,
                            }}>
                              {color.icon}
                            </div>
                            <strong style={{ fontSize: fs * 1.2, color: "#1e293b" }}>
                              {structurePills[index]}
                            </strong>
                          </div>
                          <p style={{ margin: 0, fontSize: fs, lineHeight: 1.6, color: "#475569" }}>
                            {item}
                          </p>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Syllabus Section */}
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #f3e8ff)",
                    borderRadius: 24,
                    border: "2px solid #a855f7",
                    padding: 32,
                    boxShadow: "0 12px 40px rgba(168, 85, 247, 0.2)",
                  }}
                >
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #9333ea, #a855f7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                      }}
                    >
                      📋
                    </motion.div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.6,
                      background: "linear-gradient(135deg, #6b21a8, #7c3aed)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800 
                    }}>
                      Temario de la sección
                    </h3>
                  </motion.div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {syllabus.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, rotateZ: 1 }}
                        style={{
                          border: "2px solid #c4b5fd",
                          borderRadius: 16,
                          background: "linear-gradient(135deg, #f5f3ff, #e9d5ff)",
                          padding: "20px",
                          boxShadow: "0 4px 12px rgba(168, 85, 247, 0.15)",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{
                          display: "inline-block",
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #9333ea, #a855f7)",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: fs * 0.9,
                          marginBottom: 12,
                        }}>
                          {index + 1}
                        </div>
                        <p style={{ margin: 0, fontSize: fs * 1.05, lineHeight: 1.6, color: "#581c87", fontWeight: 500 }}>
                          {item}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Quick Summary Section */}
              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #d1fae5)",
                    borderRadius: 24,
                    border: "2px solid #10b981",
                    padding: 32,
                    boxShadow: "0 12px 40px rgba(16, 185, 129, 0.2)",
                  }}
                >
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #059669, #10b981)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                      }}
                    >
                      ✨
                    </motion.div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.6,
                      background: "linear-gradient(135deg, #047857, #059669)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800 
                    }}>
                      Resumen rápido
                    </h3>
                  </motion.div>
                                     <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                     {summaryPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 8 }}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          padding: "16px 20px",
                          borderRadius: 16,
                          background: "linear-gradient(135deg, #a7f3d0, #6ee7b7)",
                          border: "2px solid #34d399",
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, delay: index * 0.3, repeat: Infinity, repeatDelay: 5 }}
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
                          ✓
                        </motion.div>
                        <span style={{ fontSize: fs * 1.05, color: "#064e3b", fontWeight: 500, lineHeight: 1.6 }}>
                          {point}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {enableExercise ? (
                <motion.div variants={itemVar}>
                  <Card glow={primaryColor}>
                    <h3 style={{ margin: "0 0 8px", fontSize: fs * 1.35 }}>Mini-ejercicio: guion de 3 líneas</h3>
                    <p style={{ margin: "0 0 12px", opacity: 0.9 }}>
                      Escribe 3 frases: <strong>frase clave mirando al lente</strong> → <strong>pausa breve</strong> → <strong>ejemplo visible</strong>.
                    </p>

                    <div
                      style={{
                        display: "grid" as const,
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: 12,
                      }}
                    >
                      <div>
                        <label style={{ fontSize: fs * 0.9, opacity: 0.8 }}>Frase clave (mirada al lente)</label>
                        <textarea
                          value={ctx}
                          onChange={(e) => setCtx(e.target.value)}
                          placeholder="Ej.: Si miras al lente en tus puntos clave, la gente conecta contigo."
                          rows={3}
                          style={taStyle(primaryColor, fs)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: fs * 0.9, opacity: 0.8 }}>Pausa (describe el silencio)</label>
                        <textarea
                          value={act}
                          onChange={(e) => setAct(e.target.value)}
                          placeholder="Ej.: (pausa de 1 segundo)"
                          rows={3}
                          style={taStyle(primaryColor, fs)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: fs * 0.9, opacity: 0.8 }}>Ejemplo visible</label>
                        <textarea
                          value={res}
                          onChange={(e) => setRes(e.target.value)}
                          placeholder="Ej.: Muestra el objeto, dilo mirando al lente, pausa, refuerza."
                          rows={3}
                          style={taStyle(primaryColor, fs)}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex" as const, gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                      <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={validateExercise}
                        style={btnStyle(primaryColor, fs)}
                      >
                        Validar estructura
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={resetExercise}
                        style={outlineBtnStyle(primaryColor, fs)}
                      >
                        Limpiar
                      </motion.button>
                    </div>

                    {feedback ? (
                      <div
                        style={{
                          marginTop: 10,
                          padding: "10px 12px",
                          borderRadius: 10,
                          background: feedback.ok ? "#e7f7ee" : "#fff3f0",
                          border: `1px solid ${feedback.ok ? "#20b26b55" : "#ff724755"}`,
                          color: feedback.ok ? "#10643a" : "#7a2e22",
                          fontSize: fs * 0.95,
                        }}
                      >
                        {feedback.msg}
                      </div>
                    ) : null}
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

function Page2({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 25,
  title = "",
  topicTitle = "Pasos aplicables hoy + Checklist express + Q&A",
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

  // Add shimmer and floating effects for Page2 ONLY (M3S2)
  React.useEffect(() => {
    const styleId = 'm3s2-page2-shimmer-effects';
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
                whileHover={{ scale: 1.01 }}
                style={{ marginBottom: 18 }}
              >
            <div style={{
                  background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                  borderRadius: 20,
                  border: "2px solid #3b82f6",
                  padding: 24,
                  boxShadow: "0 12px 40px rgba(59, 130, 246, 0.2)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                      }}
                    >
                      ✓
                    </motion.div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.6,
                      background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800 
                    }}>
                      Checklist express
                    </h3>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, fontSize: fs }}>
                    {[
                      "Practica tu lenguaje corporal frente a cámara",
                      "Graba un video corto y analiza tu postura y mirada",
                      "Ajusta pausas y gestos para mayor naturalidad",
                      "Revisa tu tono de voz y volumen"
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ marginBottom: 12, color: "#1e40af", fontWeight: 500 }}
                      >
                        {item}
                      </motion.li>
                    ))}
              </ul>
            </div>
              </motion.div>

              <motion.div 
                variants={itemVar}
                whileHover={{ scale: 1.01 }}
                style={{ marginBottom: 18 }}
              >
            <div style={{
                  background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                  border: "2px solid #fbbf24",
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: "0 12px 40px rgba(251, 191, 36, 0.2)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                      }}
                    >
                      ❓
                    </motion.div>
                    <strong style={{ 
                      color: "#92400e", 
                      display: "block", 
                      fontSize: fs * 1.4,
                      fontWeight: 800
                    }}>
                      Q&A Rápido
                    </strong>
                  </div>
                  <div style={{
                    background: "white",
                    borderRadius: 12,
                    padding: 16,
                    border: "2px solid #fde68a"
                  }}>
                    <p style={{ margin: "0 0 8px 0", fontSize: fs * 1.05, fontWeight: 600, color: "#78350f" }}>
                      P: ¿Cómo mejoro mi contacto visual?
                    </p>
                    <p style={{ margin: 0, opacity: 0.95, color: "#92400e", lineHeight: 1.6 }}>
                R: Mira directamente a la cámara (no a la pantalla) y mantén la mirada natural, como hablando con un amigo.
              </p>
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

function Page4({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 75,
  title = "Comunicación no verbal frente a la cámara",
  topicTitle = "Mirada, postura, pausas, gestos y voz – Verdadero o Falso (15)",
  layoutOption = "B",
  baseFontSize = 18,
  autoAdvanceDelayMs = 650,
  imageSrc = "",
  imageAlt = "Imagen de la sección",
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: Page4Props & {
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: string, correctAnswer: string, isCorrect: boolean) => void;
  onQuizComplete?: (score: number) => void;
  isAlreadyCompleted?: boolean;
  completedScore?: number;
}) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects for Page4 ONLY
  React.useEffect(() => {
    const styleId = 'm3s2-page4-shimmer-effects';
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

  const total = COMM_VF_QUESTIONS.length
  const [idx, setIdx] = useState(0)
  const [selection, setSelection] = useState<(boolean | null)[]>(() => Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(() => Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(() => Array(total).fill(false))
  const [score, setScore] = useState(0)

  const q = COMM_VF_QUESTIONS[idx]
  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total
  const quizProgressPct = Math.round(((idx + 1) / total) * 100)

  const selectAndAdvance = (value: boolean) => {
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

    // Track answer
    if (onAnswerSubmit) {
      onAnswerSubmit(idx, q.text, value ? "VERDADERO" : "FALSO", q.answer ? "VERDADERO" : "FALSO", isCorrect)
    }

    if (isCorrect) {
      setScore(s => s + 1)
    }

    setTimeout(() => {
      if (idx < total - 1) {
        setIdx((current) => current + 1)
      } else {
        // Quiz complete
        const finalScore = score + (isCorrect ? 1 : 0)
        if (onQuizComplete) {
          onQuizComplete(finalScore)
        }
      }
    }, autoAdvanceDelayMs)
  }

  const optStyle = (active: boolean, disabled: boolean): React.CSSProperties => ({
    padding: "20px 24px",
    borderRadius: 16,
    border: `2px solid ${active ? "#1e40af" : "rgba(30, 64, 175, 0.2)"}`,
    background: active 
      ? "linear-gradient(135deg, #1e40af, #3B82F6)" 
      : "linear-gradient(135deg, #ffffff, #f8fafc)",
    color: active ? "white" : "#1e40af",
    fontWeight: 800,
    fontSize: fs * 1.2,
    letterSpacing: 0.2,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "center",
    boxShadow: active 
      ? "0 12px 32px rgba(30, 64, 175, 0.3), 0 4px 12px rgba(59, 130, 246, 0.2)" 
      : "0 4px 12px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    willChange: "transform",
    transformOrigin: "center",
  })

  const feedback =
    checked[idx] && correct[idx]
      ? "✅ ¡Correcto!"
      : checked[idx] && !correct[idx]
      ? `❌ Incorrecto. ${q.answer ? "Era VERDADERO." : "Era FALSO."}`
      : null

  // Show "Already Completed" screen if quiz was already taken
  if (isAlreadyCompleted) {
    return (
      <div style={wrapper}>
        <MarketingFactsAnimation facts={m3s2p4Facts} />
        <main style={{ width: "100%", display: "block" }}>
          <div
            style={{
              position: "sticky" as const,
              top: 0,
              zIndex: 50,
              backdropFilter: "saturate(140%) blur(6px)",
              background: "rgba(255,255,255,0.78)",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ ...container, paddingTop: 10, paddingBottom: 10 }}>
              <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 12, flexWrap: "wrap" }}>
                {logoSrc ? (
                  <img src={logoSrc} alt={`${brandName} logo`} style={{ height: 24, width: "auto", display: "block" }} />
                ) : (
                  <div aria-hidden style={{ width: 24, height: 24, borderRadius: 8, background: primaryColor }} />
                )}
                <strong style={{ letterSpacing: 0.2, fontWeight: 800, color: primaryColor, fontSize: fs * 1.35 }}>{brandName}</strong>
              </div>
            </div>
          </div>

          <div style={{ ...container, paddingTop: 40 }}>
            <div style={{ maxWidth: 600, margin: "0 auto", padding: 40, background: "#fff", borderRadius: 20, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}>
              <h1 style={{ margin: "0 0 16px 0", fontSize: fs * 2.5, color: primaryColor }}>✓ Quiz Completado</h1>
              <p style={{ margin: "0 0 24px 0", fontSize: fs * 1.2, color: "#666" }}>
                Ya completaste este quiz. Los quizzes solo pueden realizarse una vez.
              </p>
              <div style={{ padding: 20, background: `${primaryColor}15`, borderRadius: 12, marginBottom: 20 }}>
                <strong style={{ fontSize: fs * 1.5, color: primaryColor }}>
                  Tu puntuación: {completedScore ?? "?"} / {total}
                </strong>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div style={wrapper}>
      <MarketingFactsAnimation facts={m3s2p4Facts} />
      <main style={{ width: "100%", display: "block" }}>
        <div
          style={{
            position: "sticky" as const,
            top: 0,
            zIndex: 50,
            backdropFilter: "saturate(140%) blur(6px)",
            background: "rgba(255,255,255,0.78)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ ...container, paddingTop: 10, paddingBottom: 10 }}>
            <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 12, flexWrap: "wrap" }}>
              {logoSrc ? (
                <img src={logoSrc} alt={`${brandName} logo`} style={{ height: 24, width: "auto", display: "block" }} />
              ) : (
                <div aria-hidden style={{ width: 24, height: 24, borderRadius: 8, background: primaryColor }} />
              )}
              <strong style={{ letterSpacing: 0.2, fontWeight: 800, color: primaryColor, fontSize: fs * 1.35 }}>{brandName}</strong>
            </div>
          </div>
        </div>

        <div style={{ ...container, paddingTop: 0 }}>
          <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 12, marginBottom: 14 }}>
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: "inline-flex" as const,
                alignItems: "center" as const,
                gap: 8,
                padding: "8px 12px",
                borderRadius: 999,
                background: `${primaryColor}14`,
                color: primaryColor,
                fontWeight: 700,
                fontSize: fs * 0.95,
              }}
              aria-label="porcentaje de avance"
            >
              {pct}%
            </motion.span>
            <div
              style={{
                flex: 1,
                height: 10,
                background: "rgba(0,0,0,0.08)",
                borderRadius: 999,
                overflow: "hidden" as const,
              }}
            >
              <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: [1, 1.08, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: primaryColor,
                  borderRadius: 999,
                  transformOrigin: "center",
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ ...container, paddingTop: 16, paddingBottom: 8 }}>
          <motion.div variants={containerVar} initial="hidden" animate="show">
            <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
              <motion.h1
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
                  fontSize: fs * 3.0, 
                  lineHeight: 1.15,
                  background: "linear-gradient(135deg, #1e40af, #3B82F6, #60A5FA)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer-title 3s ease infinite",
                  filter: "drop-shadow(0 2px 8px rgba(30, 64, 175, 0.3))",
                  fontWeight: 800,
                }}
              >
                {title}
              </motion.h1>
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
                  margin: "8px 0 0", 
                  fontSize: fs * 1.4,
                  background: "linear-gradient(135deg, #1e40af, #3B82F6, #60A5FA)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer-title 3s ease infinite",
                  filter: "drop-shadow(0 2px 8px rgba(30, 64, 175, 0.3))",
                  fontWeight: 700,
                }}
              >
                {topicTitle}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar}>
                    <div
                      style={{
                    position: "relative" as const,
                    borderRadius: 20,
                    padding: 28,
                    border: "2px solid #e0f2fe",
                    background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 12px 40px rgba(14, 165, 233, 0.15)",
                    overflow: "hidden" as const,
                  }}
                >
                  <div
                    style={{
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "space-between" as const,
                      marginBottom: 20,
                    }}
                  >
                    <strong style={{ 
                      fontSize: fs * 1.3, 
                      background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800,
                    }}>
                      Pregunta {idx + 1} / {total}
                    </strong>
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 12 }}>
                      <div
                        style={{
                          width: 240,
                          height: 14,
                          background: "rgba(30, 64, 175, 0.1)",
                          borderRadius: 999,
                          overflow: "hidden" as const,
                          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      >
                        <motion.div
                          initial={{ width: `${quizProgressPct}%` }}
                          animate={{ width: `${quizProgressPct}%` }}
                          transition={{ duration: 0.4 }}
                          style={{
                            height: "100%",
                            background: "linear-gradient(90deg, #1e40af, #3B82F6)",
                            borderRadius: 999,
                          }}
                        />
                      </div>
                      <span style={{ 
                        fontSize: fs * 1.1, 
                        fontWeight: 700, 
                        color: "#1e40af",
                      }}>
                        {quizProgressPct}%
                      </span>
                    </div>
                  </div>

                  <p style={{ 
                    margin: "16px 0 24px", 
                    lineHeight: 1.65, 
                    fontSize: fs * 1.6,
                    background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 600,
                  }}>
                    {q.text}
                  </p>

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
                      onClick={() => selectAndAdvance(true)}
                      style={optStyle(selection[idx] === true, !!checked[idx])}
                      whileHover={{ scale: 0.9 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    >
                      VERDADERO
                    </motion.div>
                    <motion.div
                      role="button"
                      onClick={() => selectAndAdvance(false)}
                      style={optStyle(selection[idx] === false, !!checked[idx])}
                      whileHover={{ scale: 0.9 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    >
                      FALSO
                    </motion.div>
                  </div>

                  {feedback && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    style={{
                        marginBottom: 20,
                        padding: "16px 20px",
                        borderRadius: 14,
                        background: feedback.includes("✅") 
                          ? "linear-gradient(135deg, #d1fae5, #a7f3d0)"
                          : "linear-gradient(135deg, #fee2e2, #fecaca)",
                        border: `2px solid ${feedback.includes("✅") ? "#10b981" : "#ef4444"}`,
                        fontWeight: 700,
                        fontSize: fs * 1.15,
                        color: feedback.includes("✅") ? "#065f46" : "#991b1b",
                        boxShadow: feedback.includes("✅")
                          ? "0 8px 24px rgba(16, 185, 129, 0.2)"
                          : "0 8px 24px rgba(239, 68, 68, 0.2)",
                      }}
                    >
                      {feedback}
                    </motion.div>
                  )}

                  {finished ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{
                        marginTop: 24,
                        padding: 20,
                        border: "2px solid #10b981",
                        borderRadius: 16,
                        background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                        display: "flex" as const,
                        alignItems: "center" as const,
                        justifyContent: "space-between" as const,
                        boxShadow: "0 8px 24px rgba(16, 185, 129, 0.2)",
                      }}
                    >
                      <strong style={{ 
                        fontSize: fs * 1.3,
                        color: "#047857",
                      }}>
                        Resultado:
                      </strong>
                      <span style={{ 
                        fontWeight: 800, 
                        fontSize: fs * 1.4,
                        background: "linear-gradient(135deg, #059669, #10b981)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}>
                        {correct.filter(Boolean).length} / {total}
                      </span>
                    </motion.div>
                  ) : null}
                </div>
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
  progressPercent = 75,
  title = "",
  topicTitle = "Mi lenguaje corporal frente a cámara",
  layoutOption = "B",
  baseFontSize = 18,
  instructions = DEFAULT_INSTRUCTIONS,
  gridColumns = 1,
  gridGap = 16,
}: Page5Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isLeft = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects for Page5 ONLY
  React.useEffect(() => {
    const styleId = 'm3s2-page5-shimmer-effects';
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
  }, [])

  const list = (instructions?.length ? instructions : DEFAULT_INSTRUCTIONS).map((text, index) => ({
    front: `Paso ${index + 1}`,
    back: text,
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

  const breatheAnim = { scale: [1, 1.12, 1] }
  const breatheTransition = { duration: 1.4, repeat: Infinity, ease: "easeInOut" } as const

  const [paragraphText, setParagraphText] = React.useState("")
  const [isCompleted, setIsCompleted] = React.useState(false)

  const handleComplete = () => {
    if (paragraphText.trim().length > 50) {
      setIsCompleted(true)
    }
  }

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
              <motion.div variants={itemVar} style={{ marginBottom: 14 }}>
                <motion.h1 
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
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    backgroundImage: "linear-gradient(135deg, #1e40af, #3B82F6, #60A5FA)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer-title 3s ease infinite",
                    filter: "drop-shadow(0 2px 8px rgba(30, 64, 175, 0.3))",
                    fontWeight: 800,
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
                    padding: 28,
                    border: "2px solid #0ea5e9",
                    background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
                    boxShadow: "0 12px 40px rgba(14, 165, 233, 0.15)",
                    overflow: "hidden" as const,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 28,
                      }}
                    >
                      🎥
                    </motion.div>
                    <strong style={{ 
                      fontSize: fs * 1.3,
                      backgroundImage: "linear-gradient(135deg, #0369a1, #0284c7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800,
                    }}>
                      Instrucciones
                    </strong>
                  </div>
                  <p style={{ 
                    margin: 0, 
                    fontSize: fs * 1.1, 
                    lineHeight: 1.7,
                    color: "#0e7490",
                    fontWeight: 500,
                  }}>
                    Escribe un párrafo sobre cómo te gustaría verte al explicar un tema (postura, manos, ritmo, pausas
                    y mirada) y añade una frase sobre lo que practicarás primero.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <motion.div
                  style={{
                    position: "relative" as const,
                    borderRadius: 20,
                    padding: 28,
                    border: "2px solid #8b5cf6",
                    background: "linear-gradient(135deg, #faf5ff, #f3e8ff)",
                    boxShadow: "0 12px 40px rgba(139, 92, 246, 0.15)",
                    overflow: "hidden" as const,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 28,
                      }}
                    >
                      ✋
                    </motion.div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.4,
                      backgroundImage: "linear-gradient(135deg, #6b21a8, #7c3aed)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800,
                    }}>
                      Actividad práctica
                    </h3>
                  </div>
                  <p style={{ 
                    margin: "0 0 20px 0", 
                    fontSize: fs * 1.1,
                    color: "#6b21a8",
                    fontWeight: 600,
                  }}>
                    👆 Toca cada tarjeta para ver la instrucción y redacta tu párrafo final
                  </p>

                  <GridFlashcards gap={gridGap} columns={gridColumns}>
                    {list.map((card, index) => (
                      <Flashcard
                        key={index}
                        front={card.front}
                        back={card.back}
                        primaryColor={primaryColor}
                        fontSize={fs}
                      />
                    ))}
                  </GridFlashcards>
                </motion.div>
              </motion.div>

              {/* Interactive Activity */}
              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 16 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  style={{
                    position: "relative" as const,
                    borderRadius: 20,
                    padding: 28,
                    border: isCompleted ? "2px solid #10b981" : "2px solid #f59e0b",
                    background: isCompleted ? "linear-gradient(135deg, #d1fae5, #a7f3d0)" : "linear-gradient(135deg, #fef3c7, #fde68a)",
                    boxShadow: isCompleted 
                      ? "0 12px 40px rgba(16, 185, 129, 0.2)" 
                      : "0 12px 40px rgba(245, 158, 11, 0.15)",
                    overflow: "hidden" as const,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <motion.div
                      animate={isCompleted ? { 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      } : { scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: isCompleted 
                          ? "linear-gradient(135deg, #10b981, #059669)"
                          : "linear-gradient(135deg, #f59e0b, #d97706)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 28,
                      }}
                    >
                      {isCompleted ? "✅" : "📝"}
                    </motion.div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.4,
                      backgroundImage: isCompleted 
                        ? "linear-gradient(135deg, #047857, #059669)"
                        : "linear-gradient(135deg, #92400e, #b45309)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 800,
                    }}>
                      {isCompleted ? "Actividad completada" : "Escribe tu párrafo"}
                    </h3>
                  </div>
                  
                  <p style={{ 
                    margin: "0 0 20px 0", 
                    fontSize: fs * 1.05,
                    color: isCompleted ? "#065f46" : "#78350f",
                    fontWeight: 600,
                  }}>
                    {isCompleted 
                      ? "✨ ¡Excelente! Has completado la actividad. Ahora practica tu lenguaje corporal frente a cámara."
                      : "Describe cómo te gustaría verte al explicar un tema incluyendo: postura, manos, ritmo, pausas y mirada."
                    }
                  </p>

                  {!isCompleted && (
                    <>
                      <textarea
                        value={paragraphText}
                        onChange={(e) => setParagraphText(e.target.value)}
                        placeholder="Ejemplo: Me gustaría tener una postura abierta y relajada, con los hombros hacia atrás. Usaré gestos a la altura del pecho para enfatizar ideas clave. Mantendré un ritmo variado con pausas estratégicas después de puntos importantes. Practicaré mirar al lente en momentos clave para crear conexión visual."
                        style={{
                          width: "100%",
                          minHeight: "180px",
                          padding: "16px",
                          borderRadius: "14px",
                          border: "2px solid #fbbf24",
                          fontSize: fs * 1.0,
                          fontFamily: "inherit",
                          resize: "vertical" as const,
                          outline: "none",
                          background: "white",
                          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
                          lineHeight: 1.6,
                        }}
                      />
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 12,
                      }}>
                        <span style={{
                          fontSize: fs * 0.9,
                          color: paragraphText.length < 50 ? "#92400e" : "#059669",
                          fontWeight: 600,
                        }}>
                          {paragraphText.length} caracteres
                        </span>
                        <motion.button
                          onClick={handleComplete}
                          disabled={paragraphText.trim().length < 50}
                          whileTap={{ scale: paragraphText.trim().length >= 50 ? 0.98 : 1 }}
                          style={{
                            padding: "14px 28px",
                            borderRadius: 14,
                            border: "none",
                            background: paragraphText.trim().length >= 50
                              ? "linear-gradient(135deg, #10b981, #059669)"
                              : "linear-gradient(135deg, #d1d5db, #9ca3af)",
                            color: "white",
                            fontWeight: 700,
                            fontSize: fs * 1.1,
                            cursor: paragraphText.trim().length >= 50 ? "pointer" : "not-allowed",
                            boxShadow: paragraphText.trim().length >= 50
                              ? "0 8px 24px rgba(16, 185, 129, 0.3)"
                              : "none",
                            opacity: paragraphText.trim().length >= 50 ? 1 : 0.6,
                          }}
                        >
                          {paragraphText.trim().length >= 50 ? "✓ Completar" : `Escribe ${50 - paragraphText.length} caracteres más`}
                        </motion.button>
                      </div>
                    </>
                  )}

                  {isCompleted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: 20,
                        padding: 20,
                        background: "white",
                        borderRadius: 14,
                        border: "2px solid #10b981",
                        fontSize: fs * 1.0,
                        lineHeight: 1.7,
                        color: "#065f46",
                        fontStyle: "italic",
                      }}
                    >
                      {paragraphText}
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

function taStyle(primaryColor: string, fs: number): React.CSSProperties {
  return {
    width: "100%",
    borderRadius: 10,
    border: `1px solid ${primaryColor}33`,
    padding: 10,
    fontSize: fs * 0.95,
    lineHeight: 1.4,
    boxSizing: "border-box" as const,
    outline: "none",
    background: "#fff",
  }
}

function btnStyle(primaryColor: string, fs: number): React.CSSProperties {
  return {
    borderRadius: 999,
    border: "none",
    padding: "10px 16px",
    fontWeight: 700,
    fontSize: fs * 0.95,
    background: primaryColor,
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  }
}

function outlineBtnStyle(primaryColor: string, fs: number): React.CSSProperties {
  return {
    borderRadius: 999,
    border: `1px solid ${primaryColor}55`,
    padding: "10px 16px",
    fontWeight: 700,
    fontSize: fs * 0.95,
    background: "#fff",
    color: primaryColor,
    cursor: "pointer",
  }
}

function Page3() {
  const primaryColor = "#0F62FE";
  const background = "#FFFFFF";
  const fs = 18;

  const TIPS = [
    { 
      emoji: "🎥", 
      tip: "Practica frente a la cámara", 
      desc: "Graba videos cortos y observa tu lenguaje corporal", 
      gradient: "linear-gradient(135deg, #3b82f6, #2563eb)", 
      border: "#1e40af",
      glassColor: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.15))",
      borderColor: "rgba(59, 130, 246, 0.4)"
    },
    { 
      emoji: "👁️", 
      tip: "Mirada a la cámara", 
      desc: "Mira el lente, no la pantalla, para crear conexión", 
      gradient: "linear-gradient(135deg, #06b6d4, #0891b2)", 
      border: "#0e7490",
      glassColor: "linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(8, 145, 178, 0.15))",
      borderColor: "rgba(6, 182, 212, 0.4)"
    },
    { 
      emoji: "🎯", 
      tip: "Postura abierta", 
      desc: "Mantén los hombros relajados y gestos naturales", 
      gradient: "linear-gradient(135deg, #10b981, #059669)", 
      border: "#047857",
      glassColor: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.15))",
      borderColor: "rgba(16, 185, 129, 0.4)"
    },
    { 
      emoji: "⏸️", 
      tip: "Pausas estratégicas", 
      desc: "Usa silencios breves para enfatizar puntos clave", 
      gradient: "linear-gradient(135deg, #f59e0b, #f97316)", 
      border: "#ea580c",
      glassColor: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(249, 115, 22, 0.15))",
      borderColor: "rgba(245, 158, 11, 0.4)"
    },
    { 
      emoji: "🎤", 
      tip: "Tono de voz", 
      desc: "Varía tu entonación para mantener el interés", 
      gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)", 
      border: "#6b21a8",
      glassColor: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.15))",
      borderColor: "rgba(139, 92, 246, 0.4)"
    },
  ];

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm3s2-page3-shimmer-effects';
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

  return (
    <div style={{ width: "100%", minHeight: "100vh", background }}>
      <SectionPageHeader 
        primaryColor={primaryColor} 
        progress={50} 
        brandName="BIZEN"
        logoSrc="/bizen-mondragonlogo.png"
      />
      <div style={{ padding: "clamp(16px, 3vw, 32px)", maxWidth: "100%", margin: "0" }}>
        <motion.div variants={containerVar} initial="hidden" animate="show">
          <motion.h1 
            variants={itemVar}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ 
              margin: "0 0 12px 0", 
              fontSize: fs * 3.0, 
              lineHeight: 1.15,
              background: "linear-gradient(135deg, #1e40af, #3B82F6, #60A5FA)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer-title 3s ease infinite",
              filter: "drop-shadow(0 2px 8px rgba(30, 64, 175, 0.3))",
              fontWeight: 800,
            }}
          >
            Tips de Comunicación No Verbal
          </motion.h1>
          <motion.p variants={itemVar} style={{ margin: "6px 0 20px", opacity: 0.9, fontSize: fs * 1.4 }}>
          <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> Mejora tu presencia frente a cámara
          </motion.p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {TIPS.map((item, i) => (
              <motion.div
              key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
              style={{
                  background: item.glassColor,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: `2px solid ${item.borderColor}`,
                  borderRadius: 28,
                  padding: 32,
                  boxShadow: `
                    0 20px 60px rgba(0, 0, 0, 0.15),
                    0 8px 20px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.5),
                    inset 0 -1px 0 rgba(255, 255, 255, 0.3)
                  `,
                  cursor: "pointer",
                  minHeight: 220,
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}
              >
                {/* Glass reflection effect with color tint */}
                <div
                  style={{
                    position: "absolute" as const,
                    top: -50,
                    left: -50,
                    width: 150,
                    height: 150,
                    background: `radial-gradient(circle, ${item.borderColor} 0%, transparent 70%)`,
                    borderRadius: "50%",
                    pointerEvents: "none" as const,
                  }}
                />
                <div style={{ position: "relative" as const, zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatDelay: 3 }}
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${item.border}40, ${item.border}20)`,
                        backdropFilter: "blur(10px)",
                        border: `2px solid ${item.border}60`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 36,
                      }}
                    >
                      {item.emoji}
                    </motion.div>
                    <strong style={{ 
                      background: item.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontSize: fs * 1.7, 
                      fontWeight: 800 
                    }}>
                {item.tip}
              </strong>
            </div>
                  <p style={{ 
                    margin: 0, 
                    color: "#1e293b", 
                    lineHeight: 1.7, 
                    fontSize: fs * 1.15,
                    fontWeight: 500 
                  }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
          ))}
        </div>
        </motion.div>
      </div>
    </div>
  )
}

const M3S2_CONTENT: Record<number, React.ReactNode> = {
  1: <Page1 />,
  2: <Page2 />,
  3: <Page3 />,
  4: <Page4 />,
  5: <Page5 />,
}

export default M3S2_CONTENT

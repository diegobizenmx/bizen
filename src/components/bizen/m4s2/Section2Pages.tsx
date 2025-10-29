/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { motion, Variants, AnimatePresence } from "framer-motion"
import SectionPageHeader from "@/components/bizen/SectionPageHeader"
import MarketingFactsAnimation from "@/components/MarketingFactsAnimation"

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

const DEFAULT_MC_QUESTIONS: { text: string; options: string[]; correctIndex: number }[] = [
  { text: "Un buen ritmo logra...", options: ["Mantener la atención", "Durar más", "Ser confuso", "Tener muchos efectos"], correctIndex: 0 },
  { text: "Partes largas y aburridas producen...", options: ["Más vistas", "Profesionalismo", "Pérdida de atención", "Mejor ritmo"], correctIndex: 2 },
  { text: "Los subtítulos ayudan a...", options: ["Alargar", "Accesibilidad y retención", "Decorar", "Evitar compartir"], correctIndex: 1 },
  { text: "Muchas personas ven sin sonido porque...", options: ["Están en lugares públicos", "El sonido no importa", "No saben activarlo", "Prefieren leer"], correctIndex: 0 },
  { text: "Con los efectos, lo mejor es...", options: ["No usar nunca", "Solo filtros", "Usar pocos y con propósito", "Usar muchos"], correctIndex: 2 },
  { text: "Lo que más conecta es...", options: ["Subtítulos automáticos", "Transiciones rápidas", "Historia clara y cercana", "Fondos coloridos"], correctIndex: 2 },
  { text: "Un video saturado de efectos se percibe...", options: ["Profesional", "Desordenado y confuso", "Emocionante", "Clarísimo"], correctIndex: 1 },
  { text: "La música sirve para...", options: ["Crear emoción y reforzar mensaje", "Decorar", "Reemplazar voz", "Alargar"], correctIndex: 0 },
  { text: "Si el ritmo es muy lento...", options: ["La audiencia pierde interés", "Genera expectativa", "Aclara el mensaje", "Facilita compartir"], correctIndex: 0 },
  { text: "Una edición limpia representa...", options: ["Orden y claridad", "Transiciones exageradas", "Filtros constantes", "Música ruidosa"], correctIndex: 0 },
  { text: "Los subtítulos son clave para...", options: ["Evitar edición", "Llegar a más personas", "Añadir efectos", "Grabar más"], correctIndex: 1 },
  { text: "Al final de un buen video debería...", options: ["Haber confusión", "Quedar incompleto", "Transmitir una emoción clara", "Durar indefinido"], correctIndex: 2 },
  { text: "No conviene abusar de efectos porque...", options: ["Son caros", "Distraen del mensaje", "Son difíciles", "Alargan edición"], correctIndex: 1 },
  { text: "Genera más impacto...", options: ["Mensaje claro y directo", "Duración larga", "Filtros constantes", "Música alta"], correctIndex: 0 },
  { text: "El ritmo correcto mantiene...", options: ["Número de efectos", "Duración", "Interés y atención", "Confusión"], correctIndex: 2 },
]

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
  const colors = [
    { border: "#0F62FE", bg: "linear-gradient(135deg, rgba(15, 98, 254, 0.1), rgba(15, 98, 254, 0.05))", icon: "🎬" },
    { border: "#10B981", bg: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))", icon: "⚡" },
    { border: "#F59E0B", bg: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))", icon: "📝" },
    { border: "#EC4899", bg: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.05))", icon: "✨" },
  ]
  
  const colorIndex = title ? parseInt(title.replace("Tema ", "")) - 1 : 0
  const color = colors[colorIndex] || colors[0]
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      style={{
        borderRadius: 16,
        border: `2px solid ${color.border}40`,
        background: color.bg,
        padding: 20,
        boxShadow: `0 8px 24px ${color.border}20`,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {title ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${color.border}, ${color.border}CC)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: fs * 1.3,
            boxShadow: `0 4px 12px ${color.border}40`
          }}>
            {color.icon}
          </div>
          <strong style={{ fontSize: fs * 1.2, fontWeight: 800, color: color.border }}>{title}</strong>
        </div>
      ) : null}
      <p style={{ 
        margin: 0, 
        fontSize: fs * 1.05, 
        lineHeight: 1.6, 
        color: "#333",
        fontWeight: 600 
      }}>{body}</p>
    </motion.div>
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
          {items.map((item, index) => (
            <li key={index}>{item}</li>
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

function Keyword({ text, primaryColor, fs }: { text: string; primaryColor: string; fs: number }) {
  return (
    <span
      style={{
        display: "inline-flex" as const,
        alignItems: "center" as const,
        padding: "6px 10px",
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

function GridFlashcards({
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

function InteractiveFlashcard({
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
  
  const cardColors: Record<string, { color: string, icon: string }> = {
    "Ritmo": { color: "#8B5CF6", icon: "🎬" },
    "Estructura": { color: "#10B981", icon: "⚡" },
    "Subtítulos": { color: "#F59E0B", icon: "📝" },
    "Rótulos": { color: "#EC4899", icon: "✨" },
    "Música": { color: "#8B5CF6", icon: "🎵" },
    "Efectos": { color: "#10B981", icon: "⚡" },
    "Propósito": { color: "#F59E0B", icon: "🎯" },
    "Balance": { color: "#EC4899", icon: "⚖️" }
  }
  
  const cleanFront = front.replace(/[🎵⚡🎯⚖️🎬]/g, "").trim()
  const cardInfo = cardColors[cleanFront] || cardColors[front] || { color: primaryColor, icon: "📄" }
  
  return (
    <motion.div
      role="button"
      onClick={() => setOpen((value) => !value)}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      style={{
        userSelect: "none",
        cursor: "pointer",
        borderRadius: 20,
        border: `2px solid ${cardInfo.color}40`,
        background: open 
          ? `linear-gradient(135deg, ${cardInfo.color}15, ${cardInfo.color}08)` 
          : `linear-gradient(135deg, #ffffff, #f8fafc)`,
        padding: 24,
        minHeight: 220,
        boxShadow: open 
          ? `0 12px 40px ${cardInfo.color}30` 
          : "0 8px 24px rgba(0,0,0,0.08)",
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 16,
        transformOrigin: "center",
        willChange: "transform",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {open && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: `linear-gradient(90deg, ${cardInfo.color}, ${cardInfo.color}CC)`,
          animation: "shimmer-title 2s ease-in-out infinite"
        }} />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${cardInfo.color}, ${cardInfo.color}CC)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: fontSize * 1.4,
          boxShadow: `0 4px 12px ${cardInfo.color}40`
        }}>
          {cardInfo.icon}
        </div>
        <strong
          style={{
            color: cardInfo.color,
            display: "block" as const,
            fontSize: fontSize * 1.3,
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          {front}
        </strong>
      </div>

      <p
        style={{
          margin: 0,
          opacity: open ? 1 : 0.6,
          fontSize: open ? fontSize * 1.1 : fontSize,
          lineHeight: 1.6,
          flex: 1,
          fontWeight: open ? 600 : 400,
          color: open ? "#333" : "#666"
        }}
      >
        {open ? back : "👆 Toca para ver la definición completa"}
      </p>
    </motion.div>
  )
}

const KEYWORDS = [
  "ritmo",
  "gancho",
  "estructura",
  "subtítulos",
  "accesibilidad",
  "música",
  "efectos con propósito",
  "edición limpia",
  "claridad",
  "CTA",
  "revisión final",
]

const VF_QUESTIONS: { text: string; answer: boolean }[] = [
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

const DEFAULT_ACTIVITY_INSTRUCTIONS = [
  "Elige tres canciones y escribe qué tipo de video combinaría con cada una (tema, emoción y ritmo).",
  "Toma una frase inspiradora y escribe cómo la pondrías como subtítulo para que destaque (tipografía, contraste, duración en pantalla).",
  "Dibuja tres cuadros: inicio, desarrollo y final de una historia corta. Describe debajo qué sucede en cada uno.",
]

const DEFAULT_ACTIVITY_TITLES = ["4) Ritmo narrativo", "5) Subtítulos creativos", "6) Mini storyboard"]

function Page1({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 0,
  title = "Edición Orientada al Engagement",
  topicTitle = "Ritmo, subtítulos e historia",
  heroImage = "",
  layoutOption = "B",
  baseFontSize = 18,
  syllabus = [
    "Ritmo que sostiene atención.",
    "Estructura simple: gancho → desarrollo → CTA.",
    "Subtítulos y rótulos estratégicos.",
  ],
  summaryPoints = [
    "Corta silencios largos y repeticiones; alterna apoyos para dinamismo.",
    "Sigue la secuencia: Gancho (promesa) → Desarrollo breve → CTA específico.",
    "Añade subtítulos y rótulos para accesibilidad y énfasis, no para saturar.",
  ],
  caseText = "Abre con promesa clara, corta silencios y repeticiones, alterna apoyos (texto breve, b-roll, imágenes) y cierra con un CTA específico.",
  whyItMatters = "Editar con intención sostiene atención y comprensión: si el ritmo cae, la audiencia abandona. Subtítulos y rótulos mejoran accesibilidad y refuerzan ideas.",
  glossaryItems = [
    "1) Ritmo que sostiene atención. Corta silencios largos, repeticiones y divagaciones. Alterna apoyos (texto breve, b-roll, imágenes) para mantener dinamismo. Si el ritmo cae, la audiencia abandona.",
    "2) Estructura simple y clara. Gancho (promesa de valor), desarrollo (ejemplo o demostración breve) y cierre con CTA (qué acción específica quieres: comentar, guardar, probar).",
    "3) Subtítulos y rótulos estratégicos. Muchas personas ven sin sonido; los subtítulos mejoran accesibilidad y retención. Usa rótulos para resaltar ideas clave, no para llenar la pantalla.",
  ],
  structurePills = ["Ritmo", "Estructura", "Subtítulos", "Rótulos"],
  enableExercise = false,
}: Page1Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isLeft = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects for title
  React.useEffect(() => {
    const styleId = 'm4s2-page1-shimmer-effects';
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
          50% { transform: translateY(-12px); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

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

  const [ctx, setCtx] = useState("")
  const [act, setAct] = useState("")
  const [res, setRes] = useState("")

  return (
    <div style={wrapper}>
      <main style={{ width: "100%" }}>
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={progressPercent}
          brandName={brandName}
          logoSrc={logoSrc || undefined}
        />
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800,
                    background: "linear-gradient(90deg, #0F62FE, #60A5FA, #93C5FD, #0F62FE)",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer-title 3s ease-in-out infinite, float 3s ease-in-out infinite",
                    textShadow: "0 0 30px rgba(15, 98, 254, 0.3)"
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  📹 {title}
                </motion.h1>
                <motion.p 
                  style={{ 
                    margin: "8px 0 0", 
                    opacity: 0.9, 
                    fontSize: fs * 1.4,
                    color: primaryColor,
                    fontWeight: 600
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </motion.p>
              </motion.div>

              {heroImage ? (
                <motion.div variants={itemVar} style={{ borderRadius: 16, overflow: "hidden" as const, margin: "10px 0 18px" }}>
                  <img src={heroImage} alt="Sección 2" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div style={{
                  background: "linear-gradient(135deg, rgba(15, 98, 254, 0.15), rgba(15, 98, 254, 0.08))",
                  border: `2px solid ${primaryColor}40`,
                  borderRadius: 20,
                  padding: 28,
                  boxShadow: "0 12px 40px rgba(15, 98, 254, 0.2)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}CC, ${primaryColor})`,
                    animation: "shimmer-title 3s ease-in-out infinite"
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ 
                      fontSize: fs * 2, 
                      animation: "float 3s ease-in-out infinite",
                      display: "inline-block"
                    }}>💡</div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.5,
                      fontWeight: 800,
                      color: primaryColor
                    }}>¿Por qué importa?</h3>
                  </div>
                  <p style={{ 
                    margin: 0, 
                    fontSize: fs * 1.15,
                    lineHeight: 1.7,
                    color: "#333",
                    fontWeight: 600
                  }}>{whyItMatters}</p>
                </div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div style={{
                  background: "linear-gradient(135deg, #FFFFFF, #F8FAFF)",
                  border: `2px solid ${primaryColor}30`,
                  borderRadius: 20,
                  padding: 28,
                  boxShadow: "0 12px 40px rgba(15, 98, 254, 0.15)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, #8B5CF6, #A78BFA, #EC4899, #8B5CF6)`,
                    backgroundSize: "200%",
                    animation: "shimmer-title 3s ease-in-out infinite"
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ fontSize: fs * 2 }}>📚</div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.6,
                      fontWeight: 800,
                      color: primaryColor
                    }}>Lectura base (extendida)</h3>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <p style={{ 
                      margin: "0 0 20px 0", 
                      fontSize: fs * 1.1,
                      fontWeight: 600,
                      color: "#666"
                    }}>
                      💫 Toca cada tarjeta para ver la definición completa.
                    </p>
                  </div>

                  <GridFlashcards gap={16} columns={2}>
                    <InteractiveFlashcard
                      front="Ritmo"
                      back="Corta silencios largos, repeticiones y divagaciones. Alterna apoyos (texto breve, b-roll, imágenes) para mantener dinamismo. Si el ritmo cae, la audiencia abandona."
                      primaryColor={primaryColor}
                      fontSize={fs}
                    />
                    <InteractiveFlashcard
                      front="Estructura"
                      back="Gancho (promesa de valor), desarrollo (ejemplo o demostración breve) y cierre con CTA (qué acción específica quieres: comentar, guardar, probar)."
                      primaryColor={primaryColor}
                      fontSize={fs}
                    />
                    <InteractiveFlashcard
                      front="Subtítulos"
                      back="Muchas personas ven sin sonido; los subtítulos mejoran accesibilidad y retención. Usa para reforzar ideas clave, no para llenar la pantalla."
                      primaryColor={primaryColor}
                      fontSize={fs}
                    />
                    <InteractiveFlashcard
                      front="Rótulos"
                      back="Textos superpuestos que resaltan ideas importantes. Úsalos estratégicamente para énfasis y claridad, no para saturar visualmente el contenido."
                      primaryColor={primaryColor}
                      fontSize={fs}
                    />
                  </GridFlashcards>
                </div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div style={{
                  background: "linear-gradient(135deg, #FFFFFF, #F0FDF4)",
                  border: `2px solid #10B98140`,
                  borderRadius: 20,
                  padding: 28,
                  boxShadow: "0 12px 40px rgba(16, 185, 129, 0.15)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, #10B981, #34D399, #10B981)`,
                    animation: "shimmer-title 3s ease-in-out infinite"
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ fontSize: fs * 2 }}>📋</div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.6,
                      fontWeight: 800,
                      color: "#10B981"
                    }}>Temario de la sección</h3>
                  </div>
                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: 20,
                    }}
                  >
                    {syllabus.map((s, i) => (
                      <FlashCard key={i} title={`Tema ${i + 1}`} body={s} primaryColor={primaryColor} fs={fs} />
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div style={{
                  background: "linear-gradient(135deg, #FFFFFF, #FEF3C7)",
                  border: `2px solid #F59E0B40`,
                  borderRadius: 20,
                  padding: 28,
                  boxShadow: "0 12px 40px rgba(245, 158, 11, 0.15)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, #F59E0B, #FBBF24, #F59E0B)`,
                    animation: "shimmer-title 3s ease-in-out infinite"
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ fontSize: fs * 2 }}>✨</div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.6,
                      fontWeight: 800,
                      color: "#F59E0B"
                    }}>Resumen rápido</h3>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 24, opacity: 0.95 }}>
                    {summaryPoints.map((s, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{ 
                          marginBottom: 12,
                          fontSize: fs * 1.1,
                          lineHeight: 1.6,
                          fontWeight: 600,
                          color: "#333",
                          listStyle: "none",
                          paddingLeft: 24,
                          position: "relative"
                        }}
                      >
                        <span style={{
                          position: "absolute",
                          left: 0,
                          content: '"✓"',
                          color: "#10B981",
                          fontWeight: 800
                        }}>✓</span>
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div style={{
                  background: "linear-gradient(135deg, #FFFFFF, #FDF2F8)",
                  border: `2px solid #EC489940`,
                  borderRadius: 20,
                  padding: 28,
                  boxShadow: "0 12px 40px rgba(236, 72, 153, 0.15)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, #EC4899, #F472B6, #EC4899)`,
                    animation: "shimmer-title 3s ease-in-out infinite"
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ fontSize: fs * 2 }}>🎯</div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.6,
                      fontWeight: 800,
                      color: "#EC4899"
                    }}>Caso en 3 líneas</h3>
                  </div>
                  <p style={{ 
                    margin: 0, 
                    fontSize: fs * 1.15,
                    lineHeight: 1.7,
                    fontWeight: 600,
                    color: "#333"
                  }}>{caseText}</p>
                </div>
              </motion.div>

              {enableExercise ? (
                <motion.div variants={itemVar}>
                  <Card glow={primaryColor}>
                    <h3 style={{ margin: "0 0 8px", fontSize: fs * 1.35 }}>Mini-ejercicio: guion de 3 líneas</h3>
                    <p style={{ marginTop: 0, opacity: 0.9 }}>
                      Escribe 3 frases que apliquen la lectura: <strong>gancho claro</strong> → <strong>desarrollo breve con apoyos</strong> → <strong>CTA específico</strong>.
                    </p>

                    <div
                      style={{
                        display: "grid" as const,
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: 12,
                        marginTop: 8,
                      }}
                    >
                      <div>
                        <label style={{ fontSize: fs * 0.9, opacity: 0.8 }}>Gancho (promesa de valor)</label>
                        <textarea
                          value={ctx}
                          onChange={(e) => setCtx(e.target.value)}
                          placeholder="Ej.: En 60s te muestro cómo cortar silencios y subir retención."
                          rows={3}
                          style={taStyle(primaryColor, fs)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: fs * 0.9, opacity: 0.8 }}>Desarrollo (demo breve + apoyos)</label>
                        <textarea
                          value={act}
                          onChange={(e) => setAct(e.target.value)}
                          placeholder="Ej.: Corto repeticiones y alterno b-roll/rotulitos para mantener dinamismo."
                          rows={3}
                          style={taStyle(primaryColor, fs)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: fs * 0.9, opacity: 0.8 }}>CTA (acción específica)</label>
                        <textarea
                          value={res}
                          onChange={(e) => setRes(e.target.value)}
                          placeholder="Ej.: Guarda este post y prueba a cortar 10 segundos de silencios hoy."
                          rows={3}
                          style={taStyle(primaryColor, fs)}
                        />
                      </div>
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
// Interactive Components for Page 2
// ============================================================================

type MatchingActivityProps = {
  primaryColor: string
  fs: number
}

function MatchingActivity({ primaryColor, fs }: MatchingActivityProps) {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [completed, setCompleted] = useState(false)
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Cargando...</div>
  }

  const concepts = [
    { id: "orden", label: "Orden y Claridad" },
    { id: "pregunta", label: "Pregunta Clave" },
    { id: "recorta", label: "Recorta lo que sobra" },
    { id: "verifica", label: "Verifica Emoción y CTA" }
  ]

  const definitions = [
    { id: "orden", text: "Prioriza orden y claridad visual antes que adornos" },
    { id: "pregunta", text: "¿Se entiende la idea principal?" },
    { id: "recorta", text: "Elimina repeticiones y ruido visual" },
    { id: "verifica", text: "Qué emoción y qué acción deja el video" }
  ]

  const handleConceptClick = (conceptId: string) => {
    if (selectedConcept === conceptId) {
      setSelectedConcept(null)
    } else if (selectedConcept) {
      // This shouldn't happen - concepts should only be selected, not matched to other concepts
      setSelectedConcept(conceptId)
    } else {
      setSelectedConcept(conceptId)
    }
  }

  const handleDefinitionClick = (defId: string) => {
    if (selectedConcept) {
      const newMatches = { ...matches, [selectedConcept]: defId }
      setMatches(newMatches)
      setSelectedConcept(null)
      
      // Check if all matches are correct (concept.id should match def.id)
      const allCorrect = concepts.every(concept => 
        newMatches[concept.id] === concept.id
      )
      if (allCorrect) {
        setCompleted(true)
      }
    }
  }

  const getConceptStyle = (conceptId: string) => {
    const isMatched = matches[conceptId]
    const isCorrectMatch = isMatched && matches[conceptId] === conceptId
    const isIncorrectMatch = isMatched && matches[conceptId] !== conceptId
    
    return {
      padding: "12px 16px",
      borderRadius: 8,
      border: `2px solid ${
        selectedConcept === conceptId ? primaryColor : 
        isCorrectMatch ? "#0a7f35" :
        isIncorrectMatch ? "#dc3545" : "#e0e0e0"
      }`,
      background: selectedConcept === conceptId ? `${primaryColor}20` : 
                 isCorrectMatch ? "#0a7f3514" :
                 isIncorrectMatch ? "#dc354514" : "#fff",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textAlign: "center" as const,
      fontWeight: 600,
      fontSize: fs * 0.9
    }
  }

  const getDefinitionStyle = (defId: string) => {
    const isMatched = Object.values(matches).includes(defId)
    const matchedConcept = Object.keys(matches).find(key => matches[key] === defId)
    const isCorrectMatch = isMatched && matchedConcept === defId
    const isIncorrectMatch = isMatched && matchedConcept !== defId
    
    return {
      padding: "12px 16px",
      borderRadius: 8,
      border: `2px solid ${
        matches[selectedConcept || ""] === defId ? primaryColor :
        isCorrectMatch ? "#0a7f35" :
        isIncorrectMatch ? "#dc3545" : "#e0e0e0"
      }`,
      background: matches[selectedConcept || ""] === defId ? `${primaryColor}20` :
                 isCorrectMatch ? "#0a7f3514" :
                 isIncorrectMatch ? "#dc354514" : "#fff",
      cursor: "pointer",
      transition: "all 0.2s ease",
      textAlign: "center" as const,
      fontSize: fs * 0.85,
      lineHeight: 1.4
    }
  }

  return (
    <div>
      {completed ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div style={{ fontSize: fs * 2, marginBottom: 16 }}>🎉</div>
          <h4 style={{ color: "#0a7f35", marginBottom: 8 }}>¡Perfecto!</h4>
          <p style={{ opacity: 0.8, fontSize: fs * 0.9 }}>
            Has conectado correctamente todos los conceptos de edición limpia.
          </p>
          <button
            onClick={() => {
              setMatches({})
              setCompleted(false)
              setSelectedConcept(null)
            }}
            style={{
              marginTop: 16,
              padding: "8px 16px",
              background: primaryColor,
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: fs * 0.9
            }}
          >
            🔄 Intentar de nuevo
          </button>
        </div>
      ) : (
        <>
          {/* Progress indicator */}
          <div style={{ 
            marginBottom: 20, 
            textAlign: "center",
            padding: "12px",
            background: "#f8f9fa",
            borderRadius: 8,
            border: "1px solid #e9ecef"
          }}>
            <div style={{ fontSize: fs * 0.9, color: "#666", marginBottom: 4 }}>
              Progreso: {Object.keys(matches).length} / {concepts.length} conectados
            </div>
            <div style={{
              width: "100%",
              height: 6,
              background: "#e9ecef",
              borderRadius: 3,
              overflow: "hidden"
            }}>
              <div style={{
                width: `${(Object.keys(matches).length / concepts.length) * 100}%`,
                height: "100%",
                background: primaryColor,
                transition: "width 0.3s ease"
              }} />
            </div>
          </div>

          {/* Selected concept indicator */}
          {selectedConcept && (
            <div style={{
              marginBottom: 16,
              padding: "12px",
              background: `${primaryColor}15`,
              borderRadius: 8,
              border: `2px solid ${primaryColor}`,
              textAlign: "center"
            }}>
              <div style={{ fontSize: fs * 0.9, color: primaryColor, fontWeight: 600 }}>
                ✅ Concepto seleccionado: <strong>{concepts.find(c => c.id === selectedConcept)?.label}</strong>
              </div>
              <div style={{ fontSize: fs * 0.8, color: "#666", marginTop: 4 }}>
                Ahora haz clic en su definición correcta
              </div>
            </div>
          )}

          {/* Concepts section */}
          <div style={{ marginBottom: 20 }}>
            <h4 style={{ 
              margin: "0 0 12px 0", 
              fontSize: fs * 1.1, 
              color: "#333",
              textAlign: "center"
            }}>
              📋 Conceptos
            </h4>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(2, 1fr)", 
              gap: 12
            }}>
              {concepts.map(concept => (
                <div
                  key={concept.id}
                  onClick={() => handleConceptClick(concept.id)}
                  style={getConceptStyle(concept.id)}
                >
                  {concept.label}
                </div>
              ))}
            </div>
          </div>
          
          {/* Definitions section */}
          <div>
            <h4 style={{ 
              margin: "0 0 12px 0", 
              fontSize: fs * 1.1, 
              color: "#333",
              textAlign: "center"
            }}>
              📝 Definiciones
            </h4>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(2, 1fr)", 
              gap: 12 
            }}>
              {definitions.map(def => (
                <div
                  key={def.id}
                  onClick={() => handleDefinitionClick(def.id)}
                  style={getDefinitionStyle(def.id)}
                >
                  {def.text}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

type KeywordsGameProps = {
  keywords: string[]
  primaryColor: string
  fs: number
}

function KeywordsGame({ keywords, primaryColor, fs }: KeywordsGameProps) {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)
  const [learnedKeywords, setLearnedKeywords] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Cargando...</div>
  }

  const keywordInfo: Record<string, string> = {
    "ritmo": "Mantiene la atención del espectador. Sin ritmo, la audiencia abandona.",
    "gancho": "La promesa inicial que captura la atención en los primeros 3 segundos.",
    "estructura": "Gancho → Desarrollo → CTA. La base de todo video efectivo.",
    "subtítulos": "Mejoran accesibilidad y retención. Muchos ven sin sonido.",
    "accesibilidad": "Hacer contenido inclusivo para todos los usuarios.",
    "música": "Refuerza emociones y mensaje. No debe tapar la voz.",
    "efectos con propósito": "Solo si apoyan la comprensión, no para decorar.",
    "edición limpia": "Orden y claridad antes que adornos visuales.",
    "claridad": "El mensaje principal debe entenderse perfectamente.",
    "CTA": "Call to Action. Qué acción específica quieres del espectador."
  }

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(selectedKeyword === keyword ? null : keyword)
    setLearnedKeywords(prev => new Set([...prev, keyword]))
  }

  return (
    <div>
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: 8, 
        marginBottom: 20,
        justifyContent: "center"
      }}>
        {keywords.map((keyword, index) => (
          <button
            key={index}
            onClick={() => handleKeywordClick(keyword)}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              border: `2px solid ${
                selectedKeyword === keyword ? primaryColor :
                learnedKeywords.has(keyword) ? "#0a7f35" : "#e0e0e0"
              }`,
              background: selectedKeyword === keyword ? `${primaryColor}20` :
                         learnedKeywords.has(keyword) ? "#0a7f3514" : "#fff",
              color: selectedKeyword === keyword ? primaryColor :
                     learnedKeywords.has(keyword) ? "#0a7f35" : "#333",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontSize: fs * 0.85,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            {learnedKeywords.has(keyword) && "✓ "}
            {keyword}
          </button>
        ))}
      </div>

      {selectedKeyword && keywordInfo[selectedKeyword] && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: "16px",
            background: `${primaryColor}10`,
            borderRadius: 8,
            border: `2px solid ${primaryColor}30`,
            textAlign: "center"
          }}
        >
          <h4 style={{ 
            margin: "0 0 8px 0", 
            color: primaryColor, 
            fontSize: fs * 1.1 
          }}>
            {selectedKeyword}
          </h4>
          <p style={{ 
            margin: 0, 
            fontSize: fs * 0.9, 
            lineHeight: 1.4,
            opacity: 0.9
          }}>
            {keywordInfo[selectedKeyword]}
          </p>
        </motion.div>
      )}

      {learnedKeywords.size === keywords.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: "center",
            padding: "20px",
            background: "#0a7f3510",
            borderRadius: 8,
            border: "2px solid #0a7f3530",
            marginTop: 16
          }}
        >
          <div style={{ fontSize: fs * 2, marginBottom: 8 }}>🏆</div>
          <h4 style={{ color: "#0a7f35", marginBottom: 4 }}>¡Dominas todos los conceptos!</h4>
          <p style={{ fontSize: fs * 0.9, opacity: 0.8, margin: 0 }}>
            Has explorado todas las palabras clave de edición de video.
          </p>
        </motion.div>
      )}
    </div>
  )
}

function Page2({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 25,
  title = "Música, Efectos y Edición Final",
  topicTitle = "Creación de videos cortos y reels virales",
  heroImage = "",
  layoutOption = "B",
  baseFontSize = 18,
  awarenessImage = "",
  considerationImage = "",
  conversionImage = "",
  postImage = "",
}: Page2Props) {
  void conversionImage
  void postImage
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects for title
  React.useEffect(() => {
    const styleId = 'm4s2-page2-shimmer-effects';
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
          50% { transform: translateY(-12px); }
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
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1
                  style={{
                    margin: 0,
                    fontSize: fs * 3.0,
                    lineHeight: 1.15,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800,
                    background: "linear-gradient(90deg, #0F62FE, #60A5FA, #93C5FD, #0F62FE)",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer-title 3s ease-in-out infinite, float 3s ease-in-out infinite",
                    textShadow: "0 0 30px rgba(15, 98, 254, 0.3)"
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  🎵 {title}
                </motion.h1>
                <motion.p
                  style={{
                    margin: "8px 0 0",
                    opacity: 0.9,
                    fontSize: fs * 1.4,
                    color: primaryColor,
                    fontWeight: 600,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span
                    style={{
                      color: primaryColor,
                      fontWeight: 700,
                    }}
                  >
                    ▌
                  </span>{" "}
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

              {/* Interactive Flashcards Section */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div style={{
                  background: "linear-gradient(135deg, #FFFFFF, #F8FAFF)",
                  border: `2px solid ${primaryColor}30`,
                  borderRadius: 20,
                  padding: 32,
                  boxShadow: "0 12px 40px rgba(15, 98, 254, 0.15)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, #8B5CF6, #A78BFA, #EC4899, #8B5CF6)`,
                    backgroundSize: "200%",
                    animation: "shimmer-title 3s ease-in-out infinite"
                  }} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{ fontSize: fs * 2 }}>🎵</div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.6,
                      fontWeight: 800,
                      color: primaryColor
                    }}>
                      Música y Efectos con Propósito
                    </h3>
                  </div>
                  <p style={{ 
                    margin: "0 0 24px 0", 
                    fontSize: fs * 1.1, 
                    textAlign: "center", 
                    fontWeight: 600,
                    color: "#666"
                  }}>
                    💫 Toca cada tarjeta para aprender los conceptos clave
                  </p>
                  
                  <GridFlashcards gap={16} columns={2}>
                    <InteractiveFlashcard
                      front="🎵 Música"
                      back="Elige música que cree emoción y refuerce el mensaje. Ajusta niveles para que la música no tape la voz."
                    primaryColor={primaryColor}
                      fontSize={fs}
                    />
                    <InteractiveFlashcard
                      front="⚡ Efectos"
                      back="Usa efectos solo si apoyan la comprensión (señalar, transicionar, enfatizar). Evita el exceso: demasiado efecto = video desordenado."
                      primaryColor={primaryColor}
                      fontSize={fs}
                    />
                    <InteractiveFlashcard
                      front="🎯 Propósito"
                      back="Cada elemento debe tener una razón de ser. Si no aporta al mensaje principal, elimínalo."
                      primaryColor={primaryColor}
                      fontSize={fs}
                    />
                    <InteractiveFlashcard
                      front="⚖️ Balance"
                      back="La música y efectos deben complementar, no competir con tu voz y el mensaje principal."
                      primaryColor={primaryColor}
                      fontSize={fs}
                    />
                  </GridFlashcards>
                </div>
              </motion.div>

              {/* Interactive Matching Activity */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div style={{
                  background: "linear-gradient(135deg, #FFFFFF, #F0FDF4)",
                  border: `2px solid #10B98140`,
                  borderRadius: 20,
                  padding: 32,
                  boxShadow: "0 12px 40px rgba(16, 185, 129, 0.15)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, #10B981, #34D399, #10B981)`,
                    animation: "shimmer-title 3s ease-in-out infinite"
                  }} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{ fontSize: fs * 2 }}>✨</div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.6,
                      fontWeight: 800,
                      color: "#10B981"
                    }}>
                      Edición Limpia - Conecta Conceptos
                    </h3>
                  </div>
                  <p style={{ margin: "0 0 20px 0", opacity: 0.8, textAlign: "center", fontSize: fs * 0.9 }}>
                    <strong>Paso 1:</strong> Haz clic en un concepto (azul) → <strong>Paso 2:</strong> Haz clic en su definición correcta
                  </p>
                  
                  <MatchingActivity primaryColor={primaryColor} fs={fs} />
                </div>
              </motion.div>

              {/* Interactive Keywords Game */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div style={{
                  background: "linear-gradient(135deg, #FFFFFF, #FEF3C7)",
                  border: `2px solid #F59E0B40`,
                  borderRadius: 20,
                  padding: 32,
                  boxShadow: "0 12px 40px rgba(245, 158, 11, 0.15)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, #F59E0B, #FBBF24, #F59E0B)`,
                    animation: "shimmer-title 3s ease-in-out infinite"
                  }} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{ fontSize: fs * 2 }}>🎯</div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.6,
                      fontWeight: 800,
                      color: "#F59E0B"
                    }}>
                      Keywords Challenge
                    </h3>
                  </div>
                  <p style={{ 
                    margin: "0 0 24px 0", 
                    fontSize: fs * 1.1, 
                    textAlign: "center", 
                    fontWeight: 600,
                    color: "#666"
                  }}>
                    💫 Haz clic en las palabras clave para ver su importancia
                  </p>
                  
                  <KeywordsGame keywords={KEYWORDS} primaryColor={primaryColor} fs={fs} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

function Page3({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 50,
  title = "Quiz de Verdadero o Falso",
  topicTitle = "Mirada, postura, pausas, gestos y voz",
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
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects for title
  React.useEffect(() => {
    const styleId = 'm4s2-page3-shimmer-effects';
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
          50% { transform: translateY(-12px); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

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

  const total = VF_QUESTIONS.length
  const [idx, setIdx] = useState(0)
  const [selection, setSelection] = useState<(boolean | null)[]>(() => Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(() => Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(() => Array(total).fill(false))
  const [score, setScore] = useState(0)

  const q = VF_QUESTIONS[idx]
  const quizProgressPct = Math.round(((idx + 1) / total) * 100)
  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total

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
    
    const newScore = score + (isCorrect ? 1 : 0)
    if (isCorrect) setScore((value) => value + 1)

    // Track answer submission
    if (onAnswerSubmit) {
      console.log(`M4S2P3: Submitting answer ${idx}: ${value}, correct=${q.answer}, isCorrect=${isCorrect}`)
      onAnswerSubmit(idx, q.text, value, q.answer, isCorrect)
    }

    if (idx < total - 1) {
      setTimeout(() => setIdx((value) => value + 1), 220)
    } else {
      // Last question - complete quiz after delay
      console.log("M4S2P3: Last question answered, completing quiz with score:", newScore)
      setTimeout(() => {
        if (onQuizComplete) {
          onQuizComplete(newScore)
        }
      }, 100)
    }
  }

  const optStyle = (active: boolean): React.CSSProperties => ({
    padding: "18px 22px",
    borderRadius: 14,
    border: `2px solid ${active ? primaryColor : "rgba(0,0,0,0.12)"}`,
    background: active ? `${primaryColor}14` : "#fff",
    fontWeight: 800,
    fontSize: fs * 1.4,
    letterSpacing: 0.2,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "center",
    boxShadow: active ? "0 8px 24px rgba(0,0,0,0.06)" : "none",
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

  return (
    <div style={wrapper}>
      <main style={{ width: "100%", display: "block" }}>
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={progressPercent}
          brandName={brandName}
          logoSrc={logoSrc || undefined}
        />
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800,
                    background: "linear-gradient(90deg, #0F62FE, #60A5FA, #93C5FD, #0F62FE)",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer-title 3s ease-in-out infinite, float 3s ease-in-out infinite",
                    textShadow: "0 0 30px rgba(15, 98, 254, 0.3)"
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  ✓ {title}
                </motion.h1>
                <motion.p 
                  style={{ 
                    margin: "8px 0 0", 
                    opacity: 0.9, 
                    fontSize: fs * 1.4,
                    color: primaryColor,
                    fontWeight: 600
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </motion.p>
              </motion.div>


              <motion.div variants={itemVar}>
                <Card glow={primaryColor}>
                  <div
                    style={{
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "space-between" as const,
                      marginBottom: 14,
                    }}
                  >
                    <strong style={{ fontSize: fs * 1.1 }}>
                      Pregunta {idx + 1} / {total}
                    </strong>
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 10 }}>
                      <div
                        style={{
                          width: 220,
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
                    padding: "20px",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, rgba(15, 98, 254, 0.08), rgba(15, 98, 254, 0.04))",
                    border: "2px solid rgba(15, 98, 254, 0.2)",
                    marginBottom: 24
                  }}>
                    <p style={{ margin: 0, lineHeight: 1.7, fontSize: fs * 1.5, fontWeight: 600 }}>{q.text}</p>
                  </div>

                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: 16,
                      marginBottom: 20,
                    }}
                  >
                    {[
                      { label: "✅ VERDADERO", value: true, color: "#10B981", icon: "✓" },
                      { label: "❌ FALSO", value: false, color: "#EF4444", icon: "✗" }
                    ].map((opt) => {
                      const active = selection[idx] === opt.value
                      const disabled = !!checked[idx]
                      
                      let bgColor = "#fff"
                      let borderColor = "rgba(0,0,0,0.12)"
                      const textColor = "#111"
                      
                      if (active) {
                        bgColor = `${opt.color}15`
                        borderColor = opt.color
                      }
                      
                      return (
                        <motion.div
                          key={String(opt.value)}
                          role="button"
                          onClick={() => (!disabled ? selectAndAdvance(opt.value) : undefined)}
                          style={{
                            padding: "24px 28px",
                            borderRadius: "16px",
                            border: `2px solid ${borderColor}`,
                            background: bgColor,
                            fontWeight: 800,
                            fontSize: fs * 1.2,
                            letterSpacing: 0.2,
                            cursor: disabled ? "default" : "pointer",
                            userSelect: "none",
                            textAlign: "center",
                            boxShadow: active ? `0 8px 24px ${opt.color}30` : "0 2px 8px rgba(0,0,0,0.08)",
                            transformOrigin: "center",
                            color: textColor,
                            minHeight: "80px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                          whileHover={disabled ? undefined : { scale: 1.02, y: -4 }}
                          whileTap={disabled ? undefined : { scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        >
                          <span style={{ fontSize: fs * 1.3, marginRight: 8 }}>{opt.icon}</span>
                          <span>{opt.label.replace(/✅|❌/, "").trim()}</span>
                        </motion.div>
                      )
                    })}
                  </div>

                  <div style={{ marginBottom: 14, minHeight: 32 }}>
                    {feedback && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                          padding: "16px 20px",
                          borderRadius: "12px",
                          background: feedback.includes("Correcto") 
                            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08))"
                            : "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.08))",
                          border: `2px solid ${feedback.includes("Correcto") ? "#10B981" : "#EF4444"}`,
                          color: feedback.includes("Correcto") ? "#10B981" : "#EF4444",
                          fontWeight: 700,
                          fontSize: fs * 1.2,
                          display: "flex",
                          alignItems: "center",
                          gap: 10
                        }}
                      >
                        <span style={{ fontSize: fs * 1.5 }}>{feedback.includes("Correcto") ? "✅" : "❌"}</span>
                        <span>{feedback}</span>
                      </motion.div>
                    )}
                  </div>

                  {finished ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{
                        marginTop: 18,
                        padding: 28,
                        border: `2px solid ${primaryColor}`,
                        borderRadius: 16,
                        background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`,
                        display: "flex" as const,
                        alignItems: "center" as const,
                        justifyContent: "space-between" as const,
                        boxShadow: `0 8px 32px ${primaryColor}30`
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: fs * 2 }}>🎯</span>
                        <strong style={{ fontSize: fs * 1.3 }}>Resultado:</strong>
                      </div>
                      <div style={{ 
                        fontWeight: 800, 
                        color: primaryColor,
                        fontSize: fs * 1.4,
                        padding: "8px 16px",
                        borderRadius: "8px",
                        background: "white"
                      }}>
                        {score} / {total}
                      </div>
                    </motion.div>
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

function Page4({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 75,
  title = "Quiz de Opción Múltiple",
  topicTitle = "Edición orientada a engagement — ritmo, subtítulos, historia",
  layoutOption = "B",
  baseFontSize = 18,
  autoAdvanceDelayMs = 650,
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: Page4Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isLeft = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects for title
  React.useEffect(() => {
    const styleId = 'm4s2-page4-shimmer-effects';
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
          50% { transform: translateY(-12px); }
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
    [background, isLeft, fs]
  )

  const container: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isLeft]
  )

  const total = DEFAULT_MC_QUESTIONS.length
  const [idx, setIdx] = useState(0)
  const [selection, setSelection] = useState<(number | null)[]>(() => Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(() => Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(() => Array(total).fill(false))
  const [score, setScore] = useState(0)

  const q = DEFAULT_MC_QUESTIONS[idx] ?? null
  const quizProgressPct = Math.round(((idx + 1) / total) * 100)
  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total

  const optStyle = (active: boolean, isCorrect?: boolean, isWrong?: boolean): React.CSSProperties => {
    let borderColor = active ? primaryColor : "rgba(0,0,0,0.12)"
    let backgroundColor = active ? `${primaryColor}10` : "#fff"
    let boxShadow = active ? "0 8px 24px rgba(0,0,0,0.06)" : "0 2px 8px rgba(0,0,0,0.04)"
    
    if (isCorrect) {
      borderColor = "#10B981"
      backgroundColor = "#ECFDF5"
      boxShadow = "0 8px 24px rgba(16, 185, 129, 0.2)"
    } else if (isWrong) {
      borderColor = "#EF4444"
      backgroundColor = "#FEF2F2"
      boxShadow = "0 8px 24px rgba(239, 68, 68, 0.2)"
    }
    
    return {
      padding: "20px 24px",
      borderRadius: 16,
      border: `3px solid ${borderColor}`,
      background: backgroundColor,
      fontWeight: 600,
      fontSize: fs * 1.1,
      letterSpacing: 0.3,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "left",
      boxShadow,
    transformOrigin: "center",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative" as const,
      overflow: "hidden" as const,
    }
  }

  const handleSelect = (optionIndex: number) => {
    if (!q || checked[idx]) return

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
    if (isCorrect) setScore((value) => value + 1)

    // Track answer submission
    if (onAnswerSubmit) {
      console.log(`M4S2P4: Submitting answer ${idx}: ${optionIndex}, correct=${q.correctIndex}, isCorrect=${isCorrect}`)
      onAnswerSubmit(idx, q.text, q.options[optionIndex], q.options[q.correctIndex], isCorrect)
    }

    if (idx < total - 1) {
      setTimeout(() => {
        setIdx((value) => value + 1)
      }, autoAdvanceDelayMs)
    } else {
      // Last question - complete quiz after delay
      console.log("M4S2P4: Last question answered, completing quiz with score:", newScore)
      setTimeout(() => {
        if (onQuizComplete) {
          onQuizComplete(newScore)
        }
      }, 100)
    }
  }

  const feedback =
    q && checked[idx] && correct[idx]
      ? "✅ ¡Correcto!"
      : q && checked[idx] && !correct[idx]
      ? `❌ Incorrecto. Respuesta: ${q.options[q.correctIndex]}`
      : null

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
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800,
                    background: "linear-gradient(90deg, #0F62FE, #60A5FA, #93C5FD, #0F62FE)",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer-title 3s ease-in-out infinite, float 3s ease-in-out infinite",
                    textShadow: "0 0 30px rgba(15, 98, 254, 0.3)"
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  📝 {title}
                </motion.h1>
                <motion.p 
                  style={{ 
                    margin: "8px 0 0", 
                    opacity: 0.9, 
                    fontSize: fs * 1.4,
                    color: primaryColor,
                    fontWeight: 600,
                    whiteSpace: "pre-wrap"
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </motion.p>
              </motion.div>

              <motion.div variants={itemVar}>
                <Card glow={primaryColor}>
                  {/* Quiz Header with Progress */}
                  <div
                    style={{
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "space-between" as const,
                      marginBottom: 24,
                      padding: "20px 0",
                      borderBottom: "2px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 16 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}CC)`,
                          color: "#fff",
                          display: "flex" as const,
                          alignItems: "center" as const,
                          justifyContent: "center" as const,
                          fontWeight: 800,
                          fontSize: fs * 1.2,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        }}
                      >
                        {Math.min(idx + 1, total)}
                      </div>
                      <div>
                        <strong style={{ fontSize: fs * 1.2, color: "#1f2937", display: "block" }}>
                          Pregunta {Math.min(idx + 1, total)} de {total}
                    </strong>
                        <span style={{ fontSize: fs * 0.9, color: "#6B7280" }}>
                          Quiz de Edición de Videos
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 16 }}>
                      <div
                        style={{
                          width: 200,
                          height: 16,
                          background: "rgba(0,0,0,0.08)",
                          borderRadius: 999,
                          overflow: "hidden" as const,
                          position: "relative" as const,
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${quizProgressPct}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{
                            height: "100%",
                            background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}CC)`,
                            borderRadius: 999,
                            position: "relative" as const,
                          }}
                        />
                      </div>
                      <span style={{ 
                        fontSize: fs * 1.0, 
                        fontWeight: 700, 
                        color: primaryColor,
                        minWidth: 40,
                        textAlign: "center" as const,
                      }}>
                        {quizProgressPct}%
                      </span>
                    </div>
                  </div>

                  {/* Question */}
                  <div style={{
                    marginBottom: 32,
                    padding: "24px",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, rgba(15, 98, 254, 0.08), rgba(15, 98, 254, 0.04))",
                    border: "2px solid rgba(15, 98, 254, 0.2)"
                  }}>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        margin: "0",
                        fontSize: fs * 1.8,
                        lineHeight: 1.5,
                        fontWeight: 700,
                        color: "#1f2937",
                        textAlign: "center" as const,
                        padding: "0 8px"
                      }}
                    >
                      {q ? q.text : "—"}
                    </motion.h2>
                  </div>

                    {/* Options Grid */}
                    <div style={{ 
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(2, 1fr)", 
                      gap: 20,
                      maxWidth: 800,
                      margin: "0 auto",
                    }}>
                    {(q?.options ?? []).map((option, index) => {
                      const isSelected = selection[idx] === index
                        const isCorrect = checked[idx] && index === q.correctIndex
                        const isWrong = checked[idx] && isSelected && index !== q.correctIndex
                      const disabled = !!checked[idx]
                        
                      return (
                          <motion.button
                          key={index}
                          onClick={() => handleSelect(index)}
                            disabled={disabled}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ 
                              scale: disabled ? 1 : 1.05,
                              y: disabled ? 0 : -2,
                            }}
                            whileTap={{ scale: disabled ? 1 : 0.95 }}
                            style={optStyle(isSelected, isCorrect, isWrong)}
                          >
                            {/* Option Letter Circle */}
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: isCorrect 
                                  ? "#10B981" 
                                  : isWrong 
                                    ? "#EF4444" 
                                    : isSelected 
                                      ? primaryColor 
                                      : "rgba(0,0,0,0.1)",
                                color: "#fff",
                                display: "flex" as const,
                                alignItems: "center" as const,
                                justifyContent: "center" as const,
                                fontWeight: 800,
                                fontSize: fs * 1.0,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {String.fromCharCode(65 + index)}
                            </div>
                            
                            {/* Option Text */}
                            <span style={{ 
                              flex: 1, 
                              fontSize: fs * 1.1, 
                              lineHeight: 1.4,
                              fontWeight: 500,
                              textAlign: "left" as const,
                            }}>
                          {option}
                            </span>
                            
                            {/* Status Icon */}
                            {isCorrect && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                style={{ fontSize: fs * 1.3, color: "#10B981" }}
                              >
                                ✅
                        </motion.div>
                            )}
                            {isWrong && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                style={{ fontSize: fs * 1.3, color: "#EF4444" }}
                              >
                                ❌
                              </motion.div>
                            )}
                          </motion.button>
                        )
                      })}
                    </div>

                  {/* Feedback */}
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      style={{
                        marginTop: 32,
                        padding: 24,
                        borderRadius: 16,
                        background: correct[idx] 
                          ? "linear-gradient(135deg, #ECFDF5, #D1FAE5)" 
                          : "linear-gradient(135deg, #FEF2F2, #FEE2E2)",
                        border: `3px solid ${correct[idx] ? "#10B981" : "#EF4444"}`,
                        color: correct[idx] ? "#065F46" : "#991B1B",
                        fontWeight: 600,
                        fontSize: fs * 1.1,
                        textAlign: "center" as const,
                        boxShadow: correct[idx] 
                          ? "0 8px 24px rgba(16, 185, 129, 0.2)" 
                          : "0 8px 24px rgba(239, 68, 68, 0.2)",
                      }}
                    >
                      <div style={{ fontSize: fs * 1.5, marginBottom: 8 }}>
                        {correct[idx] ? "🎉" : "😔"}
                      </div>
                      {feedback}
                    </motion.div>
                  )}

                  {finished ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{
                        marginTop: 24,
                        padding: 32,
                        border: `2px solid ${primaryColor}`,
                        borderRadius: 20,
                        background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`,
                        display: "flex" as const,
                        alignItems: "center" as const,
                        justifyContent: "space-between" as const,
                        boxShadow: `0 12px 40px ${primaryColor}30`,
                        position: "relative",
                        overflow: "hidden"
                      }}
                    >
                      <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}CC, ${primaryColor})`,
                        animation: "shimmer-title 3s ease-in-out infinite"
                      }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: fs * 2.5 }}>🎯</span>
                        <strong style={{ fontSize: fs * 1.4 }}>Resultado:</strong>
                      </div>
                      <div style={{ 
                        fontWeight: 800, 
                        color: primaryColor,
                        fontSize: fs * 1.6,
                        padding: "12px 24px",
                        borderRadius: "12px",
                        background: "white",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                      }}>
                        {score} / {total}
                      </div>
                    </motion.div>
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

function Page5({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 100,
  title = "",
  topicTitle = "Actividades (para libreta): ritmo, subtítulos y storyboard",
  layoutOption = "B",
  baseFontSize = 18,
  instructions = DEFAULT_ACTIVITY_INSTRUCTIONS,
  gridColumns = 1,
  gridGap = 16,
}: Page5Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isLeft = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm4s2-page5-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-m4s2p5 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-m4s2p5 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .shimmer-title-m4s2p5 {
          background: linear-gradient(135deg, #0F62FE 0%, #3B82F6 25%, #60A5FA 50%, #3B82F6 75%, #0F62FE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-title-m4s2p5 2.5s ease-in-out infinite;
          filter: drop-shadow(0 2px 8px rgba(15, 98, 254, 0.3));
        }
        .floating-m4s2p5 {
          animation: float-m4s2p5 3s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Interactive Workshop State
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false])
  const [userInputs, setUserInputs] = useState<{
    songs: Array<{name: string, theme: string, emotion: string, rhythm: string}>
    subtitle: {phrase: string, typography: string, contrast: string, duration: string}
    storyboard: Array<{frame: string, description: string}>
  }>({
    songs: [{name: '', theme: '', emotion: '', rhythm: ''}, {name: '', theme: '', emotion: '', rhythm: ''}, {name: '', theme: '', emotion: '', rhythm: ''}],
    subtitle: {phrase: '', typography: '', contrast: '', duration: ''},
    storyboard: [{frame: '', description: ''}, {frame: '', description: ''}, {frame: '', description: ''}]
  })

  const workshopSteps = [
    {
      title: "🎵 Ritmo Narrativo",
      subtitle: "Conecta música con emociones",
      instruction: "Elige tres canciones y escribe qué tipo de video combinaría con cada una (tema, emoción y ritmo).",
      icon: "🎵"
    },
    {
      title: "📝 Subtítulos Creativos", 
      subtitle: "Diseña texto que impacte",
      instruction: "Toma una frase inspiradora y escribe cómo la pondrías como subtítulo para que destaque (tipografía, contraste, duración en pantalla).",
      icon: "📝"
    },
    {
      title: "🎬 Mini Storyboard",
      subtitle: "Visualiza tu historia",
      instruction: "Dibuja tres cuadros: inicio, desarrollo y final de una historia corta. Describe debajo qué sucede en cada uno.",
      icon: "🎬"
    }
  ]

  // Helper functions
  const updateUserInput = (step: number, field: string, value: string, index?: number) => {
    setUserInputs(prev => {
      const newInputs = { ...prev }
      if (step === 0) {
        if (index !== undefined) {
          newInputs.songs[index] = { ...newInputs.songs[index], [field]: value }
        }
      } else if (step === 1) {
        newInputs.subtitle = { ...newInputs.subtitle, [field]: value }
      } else if (step === 2) {
        if (index !== undefined) {
          newInputs.storyboard[index] = { ...newInputs.storyboard[index], [field]: value }
        }
      }
      return newInputs
    })
  }

  const markStepComplete = (step: number) => {
    setCompletedSteps(prev => {
      const newCompleted = [...prev]
      newCompleted[step] = true
      return newCompleted
    })
  }

  const nextStep = () => {
    if (currentStep < workshopSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

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
    <div style={wrapper}>
      <main style={{ width: "100%", display: "block" }}>
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={progressPercent}
          brandName={brandName}
          logoSrc={logoSrc || undefined}
        />
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                  className="shimmer-title-m4s2p5 floating-m4s2p5"
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 2.5, 
                    lineHeight: 1.15,
                    fontWeight: 900,
                  }}
                >
                  Actividades (para libreta): ritmo, subtítulos y storyboard
                </motion.h1>
                <motion.p style={{ 
                  margin: "8px 0 0", 
                  opacity: 0.9, 
                  fontSize: fs * 1.2,
                  color: primaryColor,
                  fontWeight: 600,
                }}>
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> Taller creativo interactivo
                </motion.p>
              </motion.div>

              {/* Progress Steps */}
              <motion.div variants={itemVar} style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
                  {workshopSteps.map((step, index) => {
                    const stepColors = ["#8B5CF6", "#10B981", "#F59E0B"]
                    const stepColor = stepColors[index]
                    
                    return (
                      <div key={index} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <motion.div
                          animate={{
                            scale: index === currentStep ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            background: index === currentStep 
                              ? `linear-gradient(135deg, ${stepColor}, ${stepColor}CC)` 
                              : completedSteps[index] 
                                ? "linear-gradient(135deg, #10B981, #059669)" 
                                : "linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.12))",
                            color: index === currentStep || completedSteps[index] ? "#fff" : "#666",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 800,
                            fontSize: fs * 1.1,
                            boxShadow: index === currentStep 
                              ? `0 6px 20px ${stepColor}40` 
                              : completedSteps[index]
                                ? "0 4px 12px rgba(16, 185, 129, 0.3)"
                                : "0 2px 8px rgba(0,0,0,0.08)",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {completedSteps[index] ? "✓" : index + 1}
                        </motion.div>
                        {index < workshopSteps.length - 1 && (
                          <div
                            style={{
                              width: 60,
                              height: 4,
                              borderRadius: 2,
                              background: completedSteps[index] 
                                ? "linear-gradient(90deg, #10B981, #059669)" 
                                : "linear-gradient(90deg, rgba(0,0,0,0.08), rgba(0,0,0,0.12))",
                              transition: "all 0.3s ease",
                              boxShadow: completedSteps[index] ? "0 2px 4px rgba(16, 185, 129, 0.2)" : "none"
                            }}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Current Step Content */}
              <motion.div 
                variants={itemVar} 
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card glow={["#8B5CF6", "#10B981", "#F59E0B"][currentStep]}>
                  {/* Step Header */}
                  <div style={{ 
                    textAlign: "center" as const, 
                    marginBottom: 32,
                    padding: "20px 0",
                    background: `linear-gradient(135deg, ${(["#F3E8FF", "#ECFDF5", "#FFFBEB"])[currentStep]}20, ${(["#F3E8FF", "#ECFDF5", "#FFFBEB"])[currentStep]}10)`,
                    borderRadius: 16,
                    border: `3px solid ${(["#8B5CF6", "#10B981", "#F59E0B"])[currentStep]}30`
                  }}>
                    <motion.div 
                      animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      style={{ fontSize: fs * 2.5, marginBottom: 8 }}
                    >
                      {workshopSteps[currentStep].icon}
                    </motion.div>
                    <h2 style={{ 
                      margin: "0 0 8px 0", 
                      fontSize: fs * 1.8, 
                      color: (["#8B5CF6", "#10B981", "#F59E0B"])[currentStep],
                      fontWeight: 800
                    }}>
                      {workshopSteps[currentStep].title}
                    </h2>
                    <p style={{ 
                      margin: 0, 
                      fontSize: fs * 1.1, 
                      color: "#6B7280",
                      fontWeight: 600
                    }}>
                      {workshopSteps[currentStep].subtitle}
                    </p>
                  </div>

                  {/* Step Instruction */}
                  <div style={{ 
                    marginBottom: 24,
                    padding: 20,
                    background: `linear-gradient(135deg, ${(["#F3E8FF", "#ECFDF5", "#FFFBEB"])[currentStep]}, #FFFFFF)`,
                    borderRadius: 12,
                    border: `2px solid ${(["#8B5CF6", "#10B981", "#F59E0B"])[currentStep]}30`,
                    boxShadow: `0 4px 12px ${(["#8B5CF6", "#10B981", "#F59E0B"])[currentStep]}15`
                  }}>
                    <p style={{ 
                      margin: 0, 
                      fontSize: fs * 1.1, 
                      lineHeight: 1.6,
                      color: "#374151",
                      fontWeight: 500
                    }}>
                      {workshopSteps[currentStep].instruction}
                    </p>
                  </div>

                  {/* Interactive Content Based on Step */}
                  {currentStep === 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      {userInputs.songs.map((song, index) => {
                        const songColors = ["#EC4899", "#8B5CF6", "#3B82F6"]
                        const songColor = songColors[index]
                        
                        return (
                        <motion.div
                        key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01, y: -2 }}
                          style={{
                            padding: 24,
                            border: `3px solid ${songColor}30`,
                            borderRadius: 16,
                            background: `linear-gradient(135deg, ${songColor}08, #FFFFFF)`,
                            boxShadow: `0 4px 12px ${songColor}15`
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <div style={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              background: `linear-gradient(135deg, ${songColor}, ${songColor}CC)`,
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 800,
                              fontSize: fs * 1.2,
                              boxShadow: `0 4px 12px ${songColor}30`
                            }}>
                              🎵
                            </div>
                            <h4 style={{ 
                              margin: 0, 
                              fontSize: fs * 1.3, 
                              color: songColor,
                              fontWeight: 800
                            }}>
                              Canción {index + 1}
                            </h4>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div>
                              <label style={{ 
                                display: "block", 
                                marginBottom: 8, 
                                fontSize: fs * 0.95, 
                                fontWeight: 700,
                                color: songColor
                              }}>
                                Nombre de la canción
                              </label>
                              <input
                                type="text"
                                value={song.name}
                                onChange={(e) => updateUserInput(0, 'name', e.target.value, index)}
                                style={{
                                  width: "100%",
                                  padding: "14px 16px",
                                  border: `2px solid ${songColor}30`,
                                  borderRadius: 12,
                                  fontSize: fs * 0.95,
                                  outline: "none",
                                  transition: "all 0.3s ease",
                                  background: `linear-gradient(135deg, ${songColor}05, #FFFFFF)`,
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = songColor;
                                  e.target.style.boxShadow = `0 4px 12px ${songColor}20`;
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = `${songColor}30`;
                                  e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                                }}
                                placeholder="Ej: Bohemian Rhapsody"
                              />
                            </div>
                            <div>
                              <label style={{ 
                                display: "block", 
                                marginBottom: 8, 
                                fontSize: fs * 0.95, 
                                fontWeight: 700,
                                color: songColor
                              }}>
                                Tema del video
                              </label>
                              <input
                                type="text"
                                value={song.theme}
                                onChange={(e) => updateUserInput(0, 'theme', e.target.value, index)}
                                style={{
                                  width: "100%",
                                  padding: "14px 16px",
                                  border: `2px solid ${songColor}30`,
                                  borderRadius: 12,
                                  fontSize: fs * 0.95,
                                  outline: "none",
                                  transition: "all 0.3s ease",
                                  background: `linear-gradient(135deg, ${songColor}05, #FFFFFF)`,
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = songColor;
                                  e.target.style.boxShadow = `0 4px 12px ${songColor}20`;
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = `${songColor}30`;
                                  e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                                }}
                                placeholder="Ej: Aventura épica"
                              />
                            </div>
                            <div>
                              <label style={{ 
                                display: "block", 
                                marginBottom: 8, 
                                fontSize: fs * 0.95, 
                                fontWeight: 700,
                                color: songColor
                              }}>
                                Emoción
                              </label>
                              <input
                                type="text"
                                value={song.emotion}
                                onChange={(e) => updateUserInput(0, 'emotion', e.target.value, index)}
                                style={{
                                  width: "100%",
                                  padding: "14px 16px",
                                  border: `2px solid ${songColor}30`,
                                  borderRadius: 12,
                                  fontSize: fs * 0.95,
                                  outline: "none",
                                  transition: "all 0.3s ease",
                                  background: `linear-gradient(135deg, ${songColor}05, #FFFFFF)`,
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = songColor;
                                  e.target.style.boxShadow = `0 4px 12px ${songColor}20`;
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = `${songColor}30`;
                                  e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                                }}
                                placeholder="Ej: Nostalgia, euforia"
                              />
                            </div>
                            <div>
                              <label style={{ 
                                display: "block", 
                                marginBottom: 8, 
                                fontSize: fs * 0.95, 
                                fontWeight: 700,
                                color: songColor
                              }}>
                                Ritmo
                              </label>
                              <input
                                type="text"
                                value={song.rhythm}
                                onChange={(e) => updateUserInput(0, 'rhythm', e.target.value, index)}
                                style={{
                                  width: "100%",
                                  padding: "14px 16px",
                                  border: `2px solid ${songColor}30`,
                                  borderRadius: 12,
                                  fontSize: fs * 0.95,
                                  outline: "none",
                                  transition: "all 0.3s ease",
                                  background: `linear-gradient(135deg, ${songColor}05, #FFFFFF)`,
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = songColor;
                                  e.target.style.boxShadow = `0 4px 12px ${songColor}20`;
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = `${songColor}30`;
                                  e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                                }}
                                placeholder="Ej: Lento y dramático"
                              />
                            </div>
                          </div>
                        </motion.div>
                        )
                      })}
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <label style={{ 
                          display: "block", 
                          marginBottom: 8, 
                          fontSize: fs * 1.1, 
                          fontWeight: 600,
                          color: "#374151"
                        }}>
                          Frase inspiradora
                        </label>
                        <textarea
                          value={userInputs.subtitle.phrase}
                          onChange={(e) => updateUserInput(1, 'phrase', e.target.value)}
                          style={{
                            width: "100%",
                            padding: "16px",
                            border: `2px solid ${primaryColor}30`,
                            borderRadius: 12,
                            fontSize: fs * 1.0,
                            outline: "none",
                            minHeight: 80,
                            resize: "vertical" as const
                          }}
                          placeholder="Escribe una frase inspiradora que quieras convertir en subtítulo..."
                        />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <label style={{ 
                            display: "block", 
                            marginBottom: 8, 
                            fontSize: fs * 0.9, 
                            fontWeight: 600,
                            color: "#374151"
                          }}>
                            Tipografía
                          </label>
                          <input
                            type="text"
                            value={userInputs.subtitle.typography}
                            onChange={(e) => updateUserInput(1, 'typography', e.target.value)}
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              border: `2px solid ${primaryColor}30`,
                              borderRadius: 8,
                              fontSize: fs * 0.95,
                              outline: "none"
                            }}
                            placeholder="Ej: Bold, Sans-serif"
                          />
                        </div>
                        <div>
                          <label style={{ 
                            display: "block", 
                            marginBottom: 8, 
                            fontSize: fs * 0.9, 
                            fontWeight: 600,
                            color: "#374151"
                          }}>
                            Contraste
                          </label>
                          <input
                            type="text"
                            value={userInputs.subtitle.contrast}
                            onChange={(e) => updateUserInput(1, 'contrast', e.target.value)}
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              border: `2px solid ${primaryColor}30`,
                              borderRadius: 8,
                              fontSize: fs * 0.95,
                              outline: "none"
                            }}
                            placeholder="Ej: Blanco sobre fondo oscuro"
                          />
                        </div>
                        <div>
                          <label style={{ 
                            display: "block", 
                            marginBottom: 8, 
                            fontSize: fs * 0.9, 
                            fontWeight: 600,
                            color: "#374151"
                          }}>
                            Duración en pantalla
                          </label>
                          <input
                            type="text"
                            value={userInputs.subtitle.duration}
                            onChange={(e) => updateUserInput(1, 'duration', e.target.value)}
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              border: `2px solid ${primaryColor}30`,
                              borderRadius: 8,
                              fontSize: fs * 0.95,
                              outline: "none"
                            }}
                            placeholder="Ej: 3 segundos"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      {userInputs.storyboard.map((frame, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          style={{
                            padding: 20,
                            border: `2px solid ${primaryColor}30`,
                            borderRadius: 16,
                            background: "#fff"
                          }}
                        >
                          <h4 style={{ 
                            margin: "0 0 16px 0", 
                            fontSize: fs * 1.2, 
                            color: primaryColor,
                            fontWeight: 600
                          }}>
                            {index === 0 ? "Inicio" : index === 1 ? "Desarrollo" : "Final"}
                          </h4>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div>
                              <label style={{ 
                                display: "block", 
                                marginBottom: 8, 
                                fontSize: fs * 0.9, 
                                fontWeight: 600,
                                color: "#374151"
                              }}>
                                Descripción visual
                              </label>
                              <textarea
                                value={frame.frame}
                                onChange={(e) => updateUserInput(2, 'frame', e.target.value, index)}
                                style={{
                                  width: "100%",
                                  padding: "12px 16px",
                                  border: `2px solid ${primaryColor}30`,
                                  borderRadius: 8,
                                  fontSize: fs * 0.95,
                                  outline: "none",
                                  minHeight: 80,
                                  resize: "vertical" as const
                                }}
                                placeholder="Describe lo que se ve en este cuadro..."
                              />
                            </div>
                            <div>
                              <label style={{ 
                                display: "block", 
                                marginBottom: 8, 
                                fontSize: fs * 0.9, 
                                fontWeight: 600,
                                color: "#374151"
                              }}>
                                ¿Qué sucede?
                              </label>
                              <textarea
                                value={frame.description}
                                onChange={(e) => updateUserInput(2, 'description', e.target.value, index)}
                                style={{
                                  width: "100%",
                                  padding: "12px 16px",
                                  border: `2px solid ${primaryColor}30`,
                                  borderRadius: 8,
                                  fontSize: fs * 0.95,
                                  outline: "none",
                                  minHeight: 80,
                                  resize: "vertical" as const
                                }}
                                placeholder="Explica qué acción o evento ocurre..."
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginTop: 32,
                    paddingTop: 24,
                    borderTop: "2px solid rgba(0,0,0,0.05)"
                  }}>
                    <motion.button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                      whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 8,
                        border: `2px solid ${currentStep === 0 ? "#E5E7EB" : primaryColor}`,
                        background: currentStep === 0 ? "#F9FAFB" : "#fff",
                        color: currentStep === 0 ? "#9CA3AF" : primaryColor,
                        fontSize: fs * 0.95,
                        fontWeight: 600,
                        cursor: currentStep === 0 ? "not-allowed" : "pointer",
                        opacity: currentStep === 0 ? 0.5 : 1,
                        transition: "all 0.3s ease"
                      }}
                    >
                      ← Anterior
                    </motion.button>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {completedSteps[currentStep] && (
                        <span style={{ 
                          fontSize: fs * 0.9, 
                          color: "#10B981",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 8
                        }}>
                          ✅ Completado
                        </span>
                      )}
                      <motion.button
                        onClick={() => {
                          markStepComplete(currentStep)
                          if (currentStep < workshopSteps.length - 1) {
                            nextStep()
                          }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          padding: "12px 24px",
                          borderRadius: 8,
                          border: "none",
                          background: primaryColor,
                          color: "#fff",
                          fontSize: fs * 0.95,
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.3s ease"
                        }}
                      >
                        {currentStep < workshopSteps.length - 1 ? "Siguiente →" : "Finalizar ✨"}
                      </motion.button>
                    </div>
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

function Placeholder({ label }: { label: string }) {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2 style={{ margin: 0 }}>{label}</h2>
      <p style={{ marginTop: 8, color: "#64748b" }}>Contenido en construcción.</p>
    </div>
  )
}

const M4S2_CONTENT: Record<number, React.ReactNode> = {
  1: <Page1 />,
  2: <Page2 />,
  3: <Page3 />,
  4: <Page4 />,
  5: <Page5 />,
}

export default M4S2_CONTENT

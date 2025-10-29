/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { motion, Variants } from "framer-motion"
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
}

type MCKey = "A" | "B" | "C" | "D"

type QuestionMC = {
  type: "mc"
  text: string
  context?: string
  options: { key: MCKey; label: string }[]
  answer: MCKey
}

type Question = QuestionMC

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
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: string | null, correctAnswer: string, isCorrect: boolean) => void
  onQuizComplete?: (score: number) => void
  isAlreadyCompleted?: boolean
  completedScore?: number
}

type TFQuestion = {
  type: "tf"
  text: string
  answer: boolean
}

type TFQuizProps = {
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
  autoAdvanceDelayMs?: number
  // Quiz tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: boolean | null, correctAnswer: boolean, isCorrect: boolean) => void
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
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: MCKey | null, correctAnswer: MCKey, isCorrect: boolean) => void
  onQuizComplete?: (score: number) => void
  isAlreadyCompleted?: boolean
  completedScore?: number
}

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
  imageFile?: string
  imageUrl?: string
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
  imageFile: "",
  imageUrl: "",
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
    imageFile,
    imageUrl,
  } = props

  const fs = Math.max(12, baseFontSize || 18)
  const _isA = layoutOption === "A"

  // Add shimmer and floating effects for title
  React.useEffect(() => {
    const styleId = 'm4s1-welcome-shimmer-effects';
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
      display: "flex",
      flexDirection: "column",
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
      boxSizing: "border-box",
    }),
    []
  )

  const effectiveImageSrc = (imageFile && imageFile.trim()) || (imageUrl && imageUrl.trim()) || ""
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
                  {title}
                </motion.h1>
                <motion.p 
                  style={{ margin: "6px 0 0", opacity: 0.9, fontSize: fs * 1.4, color: primaryColor, fontWeight: 600 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {moduleLabel}
                </motion.p>
              </motion.div>

              {safeSyllabus.length > 0 && (
                <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <Card glow={primaryColor}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                        gap: 12,
                        marginBottom: 16,
                    }}
                  >
                      <motion.div
                      aria-hidden
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      style={{
                          width: 20,
                          height: 20,
                          borderRadius: 8,
                          background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)`,
                          boxShadow: `0 4px 12px ${primaryColor}40`,
                        }}
                      />
                      <h3 style={{ margin: 0, fontSize: fs * 1.6, fontWeight: 800, color: primaryColor }}>Temario</h3>
                  </div>
                  <ul
                    style={{
                      margin: 0,
                        paddingLeft: 20,
                      opacity: 0.95,
                      fontSize: fs,
                        listStyle: "none",
                    }}
                  >
                    {safeSyllabus.map((item, index) => (
                        <motion.li 
                          key={index} 
                          style={{ marginBottom: 10 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 12px",
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, rgba(15, 98, 254, 0.08), rgba(15, 98, 254, 0.04))",
                            border: "1px solid rgba(15, 98, 254, 0.15)"
                          }}>
                            <span style={{ color: primaryColor, fontSize: fs * 1.1 }}>✓</span>
                            <span style={{ lineHeight: 1.5 }}>{item}</span>
                          </div>
                        </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
              )}

              {heroImage ? (
                <motion.div
                  variants={itemVar}
                  style={{
                    marginTop: 14,
                    marginBottom: 24,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <img 
                      src={heroImage} 
                      alt="Bienvenida" 
                      style={{ 
                        width: "60%", 
                        maxWidth: "600px", 
                        height: "auto", 
                        display: "block", 
                        borderRadius: "24px",
                        boxShadow: "0 20px 60px rgba(15, 98, 254, 0.25), 0 4px 20px rgba(15, 98, 254, 0.15)",
                        border: "2px solid rgba(15, 98, 254, 0.1)"
                      }} 
                    />
                  </motion.div>
                </motion.div>
              ) : null}

              {effectiveImageSrc ? (
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
                        src={effectiveImageSrc}
                        alt="Imagen de bienvenida"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
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

type AccordionProps = {
  title: string
  children: React.ReactNode
  primaryColor: string
  defaultOpen?: boolean
  fontSize: number
}

function AccordionItem({ title, children, primaryColor, defaultOpen = false, fontSize }: AccordionProps) {
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
        onClick={() => setOpen((value) => !value)}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
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
        <span
          style={{
            textDecoration: hover ? "underline" : "none",
            textUnderlineOffset: 3,
          }}
        >
          {title}
        </span>

        <motion.span
          style={{
            color: primaryColor,
            fontWeight: 900,
            display: "inline-block" as const,
            lineHeight: 1,
          }}
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

function Pill({ text, fs }: { text: string; fs: number }) {
  const colors = [
    { bg: "linear-gradient(135deg, rgba(15, 98, 254, 0.15), rgba(15, 98, 254, 0.05))", border: "rgba(15, 98, 254, 0.3)", text: "#0F62FE" },
    { bg: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))", border: "rgba(16, 185, 129, 0.3)", text: "#10B981" },
    { bg: "linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(236, 72, 153, 0.05))", border: "rgba(236, 72, 153, 0.3)", text: "#EC4899" },
    { bg: "linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.05))", border: "rgba(251, 191, 36, 0.3)", text: "#F59E0B" },
    { bg: "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05))", border: "rgba(139, 92, 246, 0.3)", text: "#8B5CF6" },
  ]
  const colorIndex = Math.abs(text.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) % colors.length
  const color = colors[colorIndex]
  
  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -2 }}
      style={{
        display: "inline-flex" as const,
        alignItems: "center" as const,
        padding: "10px 16px",
        borderRadius: 12,
        border: `2px solid ${color.border}`,
        background: color.bg,
        marginRight: 8,
        marginBottom: 8,
        fontSize: fs * 1.05,
        fontWeight: 700,
        color: color.text,
        cursor: "default",
        transition: "all 0.2s ease",
      }}
    >
      {text}
    </motion.span>
  )
}

const KEYWORDS = [
  "propósito",
  "guion breve",
  "entorno tranquilo",
  "fondo ordenado",
  "sonido claro",
  "luz pareja",
  "postura",
  "mirada al lente",
  "prueba 10 s",
  "conocer audiencia",
  "evitar ruidos",
]

const DEFAULT_QUESTIONS: Question[] = [
  {
    type: "mc",
    text: "Mirar al lente simula contacto visual y mejora la conexión con la audiencia.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "A",
  },
  {
    type: "mc",
    text: "Una postura abierta y neutra comunica accesibilidad y seguridad frente a cámara.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "A",
  },
  {
    type: "mc",
    text: "Las pausas breves ayudan a enfatizar ideas y a que el público procese el mensaje.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "A",
  },
  {
    type: "mc",
    text: "Balancearse constantemente frente a cámara transmite estabilidad y control.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "B",
  },
  {
    type: "mc",
    text: "Cruzar los brazos por tiempo prolongado suele comunicar apertura y escucha activa.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "B",
  },
  {
    type: "mc",
    text: "La respiración diafragmática favorece una voz más estable y con mejor proyección.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "A",
  },
  {
    type: "mc",
    text: "Los gestos a la altura del pecho y dentro del encuadre se perciben mejor en cámara.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "A",
  },
  {
    type: "mc",
    text: "El ritmo ideal es uniforme y rápido para mantener la atención todo el tiempo.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "B",
  },
  {
    type: "mc",
    text: "Colocar la luz principal detrás del sujeto mejora la iluminación del rostro.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "B",
  },
  {
    type: "mc",
    text: "Acercar un micrófono (incluso el del móvil) suele sonar mejor que usar uno lejano en la cámara.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "A",
  },
  {
    type: "mc",
    text: "Colocar el lente a la altura de los ojos genera un encuadre más natural para testimonios.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "A",
  },
  {
    type: "mc",
    text: "El ruido de fondo constante casi nunca se nota en la grabación final.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "B",
  },
  {
    type: "mc",
    text: "Un guion con ideas clave ayuda a hablar con fluidez sin sonar robotizado.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "A",
  },
  {
    type: "mc",
    text: "Grabar en una habitación vacía reduce el eco y mejora el sonido.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "B",
  },
  {
    type: "mc",
    text: "Activar el modo avión evita interrupciones y ruidos de notificaciones durante la grabación.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "A",
  },
  {
    type: "mc",
    text: "Hacer una prueba de 5–10 segundos antes de grabar ayuda a ajustar niveles de audio e iluminación.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "A",
  },
  {
    type: "mc",
    text: "Mirar el monitor/pantalla en vez del lente transmite mejor conexión que mirar el lente.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "B",
  },
  {
    type: "mc",
    text: "Una leve sonrisa al iniciar puede predisponer positivamente a la audiencia.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "A",
  },
  {
    type: "mc",
    text: "Si el destino principal es Stories o TikTok, grabar en vertical suele ser la mejor opción.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "A",
  },
  {
    type: "mc",
    text: "El fondo muy cargado y con movimiento distrae menos que un fondo limpio.",
    options: [
      { key: "A", label: "Verdadero" },
      { key: "B", label: "Falso" },
    ],
    answer: "B",
  },
]

const DEFAULT_TF_QUESTIONS: TFQuestion[] = [
  { type: "tf", text: "Mirar al lente simula contacto visual y mejora la conexión con la audiencia.", answer: true },
  { type: "tf", text: "La iluminación principal debe colocarse detrás del sujeto para iluminar mejor el rostro.", answer: false },
  { type: "tf", text: "Una postura abierta y neutra comunica accesibilidad y seguridad frente a cámara.", answer: true },
  { type: "tf", text: "Cruzar los brazos durante toda la toma suele comunicar apertura y escucha activa.", answer: false },
  { type: "tf", text: "Hacer una prueba de 5–10 segundos ayuda a ajustar niveles de audio e iluminación.", answer: true },
  { type: "tf", text: "El ruido de fondo constante casi nunca se nota en la grabación final.", answer: false },
  { type: "tf", text: "Respirar con el diafragma favorece una voz más estable y con mejor proyección.", answer: true },
  { type: "tf", text: "Si grabas para Stories o TikTok, el formato vertical suele ser la mejor opción.", answer: true },
  { type: "tf", text: "Un fondo muy cargado y con movimiento distrae menos que un fondo limpio.", answer: false },
  { type: "tf", text: "Colocar el lente a la altura de los ojos genera un encuadre más natural para testimonios.", answer: true },
  { type: "tf", text: "Acercar el micrófono al hablante suele mejorar el sonido frente a usar uno lejano en cámara.", answer: true },
  { type: "tf", text: "Un guion con ideas clave permite fluidez sin sonar robotizado.", answer: true },
  { type: "tf", text: "Balancearse constantemente frente a cámara transmite estabilidad y control.", answer: false },
  { type: "tf", text: "Las pausas breves ayudan a enfatizar ideas y a que el público procese el mensaje.", answer: true },
  { type: "tf", text: "Grabar en una habitación vacía reduce el eco y mejora el sonido.", answer: false },
  { type: "tf", text: "Activar modo avión evita interrupciones y ruidos de notificaciones durante la grabación.", answer: true },
  { type: "tf", text: "El ritmo uniforme y muy rápido siempre mantiene mejor la atención.", answer: false },
  { type: "tf", text: "Una leve sonrisa al iniciar puede predisponer positivamente a la audiencia.", answer: true },
]

function WelcomePage() {
  return (
    <BSMXWelcomeM1
      brandName="BIZEN"
      logoSrc="/bizen-mondragonlogo.png"
      primaryColor="#0F62FE"
      background="linear-gradient(180deg, #FFFFFF, #F8FAFF)"
      title="Bienvenido a Producción y Edición de Video"
      moduleLabel="Módulo 4"
      syllabus={[
        "Fundamentos de grabación: luz, encuadre y sonido.",
        "Edición orientada al engagement: ritmo, subtítulos y efectos.",
        "Creación de videos cortos y reels virales."
      ]}
      layoutOption="B"
      baseFontSize={18}
      progressPercent={0}
      heroImage="/M4 cover.png"
      imageFile=""
      imageUrl=""
    />
  )
}

function Page1({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 20,
  title = "Módulo 4 · Producción y Edición de Video",
  topicTitle = "Sección 1 · Fundamentos de grabación: luz, encuadre, sonido",
  introText = "Define qué quieres que recuerde tu público en una sola frase y apóyate en 3–5 puntos. Un guion breve reduce muletillas y te ayuda a hablar con seguridad.",
  bullets = [
    "Define propósito y guion breve: 1 frase objetivo + 3–5 puntos. Reducen muletillas y dan seguridad al hablar.",
    "Controla el entorno: lugar tranquilo, fondo ordenado y sin distracciones. Cierra ventanas, apaga ventiladores y usa modo no molestar.",
    "Claridad auditiva (prioridad): volumen moderado y constante; graba cerca de la fuente; evita viento y ecos.",
    "Claridad visual sin equipo caro: luz pareja (ventana frontal o lámpara suave), sin contraluces ni sombras duras; fondo limpio.",
  ],
  keyIdea = "Guion claro + entorno controlado + audio limpio + luz pareja = claridad y confianza sin equipo caro.",
  awarenessItems = [
    "Enuncia la idea central en 1 frase",
    "Lista 3–5 puntos de apoyo",
    "Practica la entrada y el cierre",
    "Reduce muletillas con claridad previa",
  ],
  considerationItems = [
    "Elige un lugar silencioso y ordenado",
    "Elimina distracciones del fondo",
    "Cierra ventanas y apaga ventiladores",
    "Activa modo no molestar",
  ],
  conversionItems = [
    "Habla a volumen moderado y constante",
    "Acerca el micrófono a tu boca",
    "Evita viento y reverberación/eco",
    "Cuida que no haya ruido de fondo",
  ],
  commonFormats = [
    "Usa luz pareja",
    "Evita contraluces y sombras duras",
    "Mantén un fondo limpio y simple",
    "No necesitas equipo caro",
  ],
  heroImage = "",
  layoutOption = "A",
  baseFontSize = 18,
}: Page1Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const _isA = layoutOption === "A"
  const _pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Interactive state for flashcards
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  // Flashcards data
  const flashcards = [
    { front: "Guion breve", back: "1 frase objetivo + 3-5 puntos de apoyo para reducir muletillas" },
    { front: "Control del entorno", back: "Lugar tranquilo, fondo ordenado, sin distracciones" },
    { front: "Claridad auditiva", back: "Volumen constante, graba cerca, evita viento y ecos" },
  ]

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm4s1-page1-shimmer-effects';
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
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    background: "linear-gradient(90deg, #0F62FE, #60A5FA, #93C5FD, #0F62FE)",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer-title 3s ease-in-out infinite, float 3s ease-in-out infinite",
                    fontWeight: 900,
                    textShadow: "0 0 30px rgba(15, 98, 254, 0.3)"
                  }}
                >
                  {title}
                </motion.h1>
                <motion.p style={{ 
                  margin: "8px 0 0", 
                  opacity: 0.9, 
                  fontSize: fs * 1.4,
                  color: primaryColor,
                  fontWeight: 600
                }}>
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </motion.p>
              </motion.div>

              {heroImage ? (
                <motion.div
                  variants={itemVar}
                  style={{ borderRadius: 16, overflow: "hidden" as const, boxShadow: "0 18px 60px rgba(0,0,0,0.12)", marginTop: 14, marginBottom: 16 }}
                >
                  <img src={heroImage} alt="Sección 1" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <div style={{
                  border: "1px solid rgba(15, 98, 254, 0.25)",
                  background: "linear-gradient(135deg, rgba(15, 98, 254, 0.12), rgba(15, 98, 254, 0.05))",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: "0 4px 20px rgba(15, 98, 254, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                }}>
                  <h3 style={{ 
                    margin: "0 0 14px 0", 
                    fontSize: fs * 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "#0F62FE",
                    fontWeight: 800
                  }}>
                    <span style={{ fontSize: fs * 1.6 }}>🎯</span>
                    ¿Por qué importa?
                  </h3>
                  <p style={{ margin: 0, opacity: 0.95, lineHeight: 1.6, fontSize: fs * 1.15 }}>{introText}</p>
                </div>
              </motion.div>

              {/* Interactive Flashcards - Smaller Size */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <h3 style={{ 
                  margin: "0 0 16px 0", 
                  fontSize: fs * 1.4,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: 10
                }}>
                  <span style={{ fontSize: fs * 1.5 }}>🎴</span>
                  Conceptos clave
                </h3>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))", 
                  gap: 8 
                }}>
                  {flashcards.map((card, idx) => (
                    <div
                      key={idx}
                      onClick={() => setFlippedCard(flippedCard === idx ? null : idx)}
                      style={{
                        aspectRatio: "1/1",
                        minHeight: "65px",
                        borderRadius: 10,
                        overflow: "hidden",
                        cursor: "pointer",
                        position: "relative",
                        border: "1px solid rgba(139, 92, 246, 0.2)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                      }}
                    >
                      <motion.div
                        animate={{ 
                          rotateY: flippedCard === idx ? 180 : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "relative",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* Front */}
                        <div
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(167, 139, 250, 0.85))",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            color: "white",
                            padding: 10,
                            boxShadow: "0 4px 16px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                          }}
                        >
                          <div style={{ textAlign: "center", zIndex: 1 }}>
                            <div style={{ fontSize: fs * 2.5, marginBottom: 12 }}>💡</div>
                            <strong style={{ fontSize: fs * 1.7 }}>{card.front}</strong>
                          </div>
                        </div>
                        {/* Back */}
                        <div
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, rgba(6, 182, 212, 0.9), rgba(14, 165, 233, 0.85))",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            color: "white",
                            padding: 10,
                            transform: "rotateY(180deg)",
                            boxShadow: "0 4px 16px rgba(6, 182, 212, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                          }}
                        >
                          <div style={{ textAlign: "center", fontSize: fs * 1.5, lineHeight: 1.7 }}>
                            {card.back}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <div style={{
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.05))",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: "0 4px 20px rgba(16, 185, 129, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                }}>
                  <h3 style={{ 
                    margin: "0 0 14px 0", 
                    fontSize: fs * 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "#10B981",
                    fontWeight: 800
                  }}>
                    <span style={{ fontSize: fs * 1.6 }}>✅</span>
                    Pasos prácticos
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95, fontSize: fs * 1.15, lineHeight: 1.8 }}>
                    {bullets.map((bullet, index) => (
                      <li key={index} style={{ marginBottom: 6 }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <div
                  style={{
                    border: `2px solid ${primaryColor}60`,
                    background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`,
                    color: "#111",
                    borderRadius: 20,
                    padding: 24,
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: `0 8px 32px ${primaryColor}20`,
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}cc, ${primaryColor})`,
                    animation: "shimmer-title 3s ease-in-out infinite",
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                      style={{
                        fontSize: fs * 1.5,
                      }}
                    >
                      💡
                    </motion.div>
                    <strong style={{ color: primaryColor, display: "block" as const, fontSize: fs * 1.2, fontWeight: 800 }}>Idea clave</strong>
                  </div>
                  <motion.p 
                    style={{ margin: 0, opacity: 0.95, fontSize: fs * 1.2, lineHeight: 1.6, fontWeight: 500 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.95, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {keyIdea}
                  </motion.p>
                </div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <Card glow={primaryColor}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 8,
                        background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: fs * 0.9,
                      }}
                    >
                      📚
                    </motion.div>
                    <h3 style={{ margin: 0, fontSize: fs * 1.5, fontWeight: 800, color: primaryColor }}>Glosario y reglas simples</h3>
                    </div>
                  <div style={{ display: "grid" as const, gridTemplateColumns: "1fr", gap: 16 }}>
                    <div style={{
                      padding: "16px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(15, 98, 254, 0.06), rgba(15, 98, 254, 0.03))",
                      border: `1px solid ${primaryColor}30`,
                    }}>
                      <h4 style={{ margin: "0 0 10px 0", color: primaryColor, fontSize: fs * 1.25, fontWeight: 700 }}>Propósito y guion breve</h4>
                      <ul style={{ margin: 0, paddingLeft: 20, listStyle: "none" }}>
                        {awarenessItems.map((item, idx) => (
                          <motion.li 
                            key={idx}
                            style={{ marginBottom: 6 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <span style={{ color: primaryColor, marginRight: 6 }}>✓</span>
                            <span style={{ fontSize: fs * 1.1, lineHeight: 1.5 }}>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div style={{
                      padding: "16px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.06), rgba(16, 185, 129, 0.03))",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                    }}>
                      <h4 style={{ margin: "0 0 10px 0", color: "#10B981", fontSize: fs * 1.25, fontWeight: 700 }}>Control del entorno</h4>
                      <ul style={{ margin: 0, paddingLeft: 20, listStyle: "none" }}>
                        {considerationItems.map((item, idx) => (
                          <motion.li 
                            key={idx}
                            style={{ marginBottom: 6 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <span style={{ color: "#10B981", marginRight: 6 }}>✓</span>
                            <span style={{ fontSize: fs * 1.1, lineHeight: 1.5 }}>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div style={{
                      padding: "16px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(236, 72, 153, 0.06), rgba(236, 72, 153, 0.03))",
                      border: "1px solid rgba(236, 72, 153, 0.3)",
                    }}>
                      <h4 style={{ margin: "0 0 10px 0", color: "#EC4899", fontSize: fs * 1.25, fontWeight: 700 }}>Claridad auditiva (prioridad)</h4>
                      <ul style={{ margin: 0, paddingLeft: 20, listStyle: "none" }}>
                        {conversionItems.map((item, idx) => (
                          <motion.li 
                            key={idx}
                            style={{ marginBottom: 6 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <span style={{ color: "#EC4899", marginRight: 6 }}>✓</span>
                            <span style={{ fontSize: fs * 1.1, lineHeight: 1.5 }}>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div style={{
                      padding: "16px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(251, 191, 36, 0.06), rgba(251, 191, 36, 0.03))",
                      border: "1px solid rgba(251, 191, 36, 0.3)",
                    }}>
                      <h4 style={{ margin: "0 0 10px 0", color: "#F59E0B", fontSize: fs * 1.25, fontWeight: 700 }}>Claridad visual sin equipo caro</h4>
                      <ul style={{ margin: 0, paddingLeft: 20, listStyle: "none" }}>
                        {commonFormats.map((item, idx) => (
                          <motion.li 
                            key={idx}
                            style={{ marginBottom: 6 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <span style={{ color: "#F59E0B", marginRight: 6 }}>✓</span>
                            <span style={{ fontSize: fs * 1.1, lineHeight: 1.5 }}>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <AccordionItem title="Checklist rápido antes de grabar" primaryColor={primaryColor} fontSize={fs}>
                  <div style={{ 
                    margin: "16px 0 0", 
                    display: "grid", 
                    gridTemplateColumns: "1fr", 
                    gap: 12 
                  }}>
                    {[
                      { text: "Modo no molestar activado.", icon: "🔕", color: "#0F62FE" },
                      { text: "Prueba de audio (10 seg) y repite si hay ruido.", icon: "🎤", color: "#10B981" },
                      { text: "Encuadre del pecho hacia arriba y fondo limpio.", icon: "📷", color: "#EC4899" },
                      { text: "Idea central clara en una frase.", icon: "💭", color: "#F59E0B" },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "14px 16px",
                          borderRadius: "12px",
                          background: `linear-gradient(135deg, ${item.color}10, ${item.color}08)`,
                          border: `1px solid ${item.color}30`,
                        }}
                      >
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: fs * 1.2,
                          flexShrink: 0,
                          boxShadow: `0 2px 8px ${item.color}30`,
                        }}>
                          {item.icon}
                        </div>
                        <span style={{ 
                          fontSize: fs * 1.1, 
                          lineHeight: 1.5,
                          fontWeight: 500
                        }}>
                          {item.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </AccordionItem>
              </motion.div>
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
  progressPercent = 40,
  title = "Presencia frente a cámara",
  topicTitle = "Fundamentos de grabación: luz, encuadre y sonido",
  heroImage = "",
  layoutOption = "B",
  baseFontSize = 18,
  awarenessImage = "",
  considerationImage = "",
}: Page2Props) {
  void awarenessImage
  void considerationImage

  const fs = Math.max(12, baseFontSize || 18)
  const _isA = layoutOption === "A"
  const _pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects for title
  React.useEffect(() => {
    const styleId = 'm4s1-page2-shimmer-effects';
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
        <section style={{ flex: 1, display: "block" }}>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
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
                  {title}
                </motion.h1>
                <motion.p 
                  style={{ margin: "8px 0 0", opacity: 0.9, fontSize: fs * 1.4, color: primaryColor, fontWeight: 600 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
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
                  <img src={heroImage} alt="Sección 1" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <div style={{
                  border: "2px solid rgba(15, 98, 254, 0.3)",
                  background: "linear-gradient(135deg, rgba(15, 98, 254, 0.15), rgba(15, 98, 254, 0.08))",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: "0 8px 32px rgba(15, 98, 254, 0.2)",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, #0F62FE, #60A5FA, #93C5FD, #0F62FE)",
                    animation: "shimmer-title 3s ease-in-out infinite",
                  }} />
                  <h3 style={{ 
                    margin: "0 0 16px 0", 
                    fontSize: fs * 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    color: "#0F62FE",
                    fontWeight: 800
                  }}>
                    <span style={{ fontSize: fs * 1.6 }}>🎬</span>
                    Presencia y audiencia: fundamentos prácticos
                  </h3>
                  <div style={{ display: "grid", gap: 12 }}>
                    <div style={{
                      padding: "16px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(15, 98, 254, 0.08), rgba(15, 98, 254, 0.04))",
                      border: "1px solid rgba(15, 98, 254, 0.2)"
                    }}>
                      <p style={{ margin: 0, lineHeight: 1.6, fontSize: fs * 1.1, fontWeight: 600 }}>
                        <span style={{ color: "#0F62FE", fontSize: fs * 1.2, marginRight: 6 }}>📹</span>
                        <strong style={{ color: "#0F62FE" }}>Presencia frente a cámara:</strong> postura abierta, mirada al lente y ritmo de voz claro. Ensaya 1–2 veces; una prueba de 10 segundos confirma silencio, fondo limpio y mensaje entendible.
                      </p>
                    </div>
                    <div style={{
                      padding: "16px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.04))",
                      border: "1px solid rgba(16, 185, 129, 0.2)"
                    }}>
                      <p style={{ margin: 0, lineHeight: 1.6, fontSize: fs * 1.1, fontWeight: 600 }}>
                        <span style={{ color: "#10B981", fontSize: fs * 1.2, marginRight: 6 }}>👥</span>
                        <strong style={{ color: "#10B981" }}>Conoce a tu audiencia:</strong> adapta ejemplos y tono para aumentar conexión y confianza.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVar}>
                <div
                  style={{
                    display: "grid" as const,
                    gridTemplateColumns: "minmax(220px, 280px) minmax(0, 1fr)",
                    gap: 16,
                    alignItems: "stretch" as const,
                  }}
                >
                  <Card glow={primaryColor}>
                    <h4
                      style={{
                        margin: 0,
                        color: primaryColor,
                        fontSize: fs * 1.15,
                        marginBottom: 14,
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                      }}
                    >
                      <span style={{ fontSize: fs * 1.3 }}>🔑</span>
                      Keywords (referencia rápida)
                    </h4>
                    <div style={{ 
                      display: "flex", 
                      flexWrap: "wrap", 
                      gap: 10,
                      padding: "8px 0"
                    }}>
                      {KEYWORDS.map((keyword, index) => (
                        <Pill key={index} text={keyword} fs={fs} />
                      ))}
                    </div>
                  </Card>

                  <Card glow={primaryColor}>
                    <h4
                      style={{
                        margin: "0 0 12px 0",
                        fontSize: fs * 1.4,
                        color: primaryColor,
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                      }}
                    >
                      <span style={{ fontSize: fs * 1.5 }}>⚡</span>
                      Acciones clave
                    </h4>
                    <div style={{ display: "grid", gap: 12 }}>
                      <div style={{
                        padding: "16px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, rgba(15, 98, 254, 0.1), rgba(15, 98, 254, 0.05))",
                        border: "1px solid rgba(15, 98, 254, 0.25)"
                      }}>
                        <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
                          <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, #0F62FE, #60A5FA)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            fontWeight: 800,
                            color: "white",
                            fontSize: fs
                          }}>1</div>
                          <p style={{ margin: 0, fontSize: fs * 1.1, lineHeight: 1.6, fontWeight: 600 }}>
                            <strong style={{ color: "#0F62FE" }}>Presencia:</strong> postura abierta, mirada al lente y voz clara. Ensaya 1–2 veces.
                          </p>
                        </div>
                      </div>
                      <div style={{
                        padding: "16px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))",
                        border: "1px solid rgba(16, 185, 129, 0.25)"
                      }}>
                        <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
                          <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, #10B981, #34D399)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            fontWeight: 800,
                            color: "white",
                            fontSize: fs
                          }}>2</div>
                          <p style={{ margin: 0, fontSize: fs * 1.1, lineHeight: 1.6, fontWeight: 600 }}>
                            <strong style={{ color: "#10B981" }}>Prueba 10 s:</strong> valida silencio, fondo y comprensión.
                          </p>
                        </div>
                      </div>
                      <div style={{
                        padding: "16px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.05))",
                        border: "1px solid rgba(236, 72, 153, 0.25)"
                      }}>
                        <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
                          <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, #EC4899, #F472B6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            fontWeight: 800,
                            color: "white",
                            fontSize: fs
                          }}>3</div>
                          <p style={{ margin: 0, fontSize: fs * 1.1, lineHeight: 1.6, fontWeight: 600 }}>
                            <strong style={{ color: "#EC4899" }}>Audiencia:</strong> adapta ejemplos y tono; evita lugares ruidosos.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
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
  progressPercent = 60,
  title = "Sección 1",
  topicTitle = "Preguntas de opción múltiple",
  layoutOption = "B",
  baseFontSize = 18,
  imageSrc = "",
  imageAlt = "Imagen de la sección",
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: Page3Props) {
  void imageSrc
  void imageAlt
  void isAlreadyCompleted
  void completedScore
  
  const fs = Math.max(12, baseFontSize || 18)
  const _isA = layoutOption === "A"
  const _pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

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
  const [idx, setIdx] = useState(0)
  const [selection, setSelection] = useState<(MCKey | null)[]>(() => Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(() => Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(() => Array(total).fill(false))
  const [score, setScore] = useState(0)

  const q = DEFAULT_QUESTIONS[idx]
  const _quizProgressPct = Math.round(((idx + 1) / total) * 100)
  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total

  const selectAndAdvance = (key: MCKey) => {
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
    if (isCorrect) setScore((value) => value + 1)

    // Track answer submission
    if (onAnswerSubmit) {
      console.log(`M4S1P3: Submitting answer ${idx}: ${key}, correct=${q.answer}, isCorrect=${isCorrect}`)
      onAnswerSubmit(idx, q.text, key, q.answer, isCorrect)
    }

    if (idx < total - 1) {
      setTimeout(() => setIdx((value) => Math.min(total - 1, value + 1)), 220)
    } else {
      // Last question - complete quiz after delay
      console.log("M4S1P3: Last question answered, completing quiz with score:", newScore)
      setTimeout(() => {
        if (onQuizComplete) {
          onQuizComplete(newScore)
        }
      }, 100)
    }
  }

  const _goPrev = () => setIdx((value) => Math.max(0, value - 1))
  const _goNext = () => setIdx((value) => Math.min(total - 1, value + 1))

  const _optStyle = (active: boolean): React.CSSProperties => ({
    padding: "18px 22px",
    borderRadius: 14,
    border: `2px solid ${active ? primaryColor : "rgba(0,0,0,0.12)"}`,
    background: active ? `${primaryColor}14` : "#fff",
    fontWeight: 800,
    fontSize: fs * 1.05,
    letterSpacing: 0.2,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "left",
    boxShadow: active ? "0 8px 24px rgba(0,0,0,0.06)" : "none",
    transformOrigin: "center",
  })

  const feedback =
    checked[idx] && correct[idx] ? (
      <div style={{ color: "#0a7f35", fontWeight: 700 }}>✅ ¡Correcto!</div>
    ) : checked[idx] && !correct[idx] ? (
      <div style={{ color: "#b00020", fontWeight: 700 }}>
        ❌ Incorrecto. Era {q.answer}: <strong>{q.options.find((option) => option.key === q.answer)?.label}</strong>
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
        <main style={{ width: "100%", display: "flex", flexDirection: "column", flex: 1, minHeight: "calc(100vh - 80px)", alignItems: "center", justifyContent: "center" }}>
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
      <MarketingFactsAnimation facts={[
        {
          character: 'billy',
          text: 'El 85% del contenido que se consume en internet es video.',
          characterImage: '/2.png'
        },
        {
          character: 'drago',
          text: 'Los videos aumentan la retención de información hasta un 95%, frente al 10% del texto.',
          characterImage: '/drago1.png'
        },
        {
          character: 'billy',
          text: 'Un video en redes sociales genera un 1200% más de compartidos que texto e imágenes combinados.',
          characterImage: '/2.png'
        },
        {
          character: 'drago',
          text: 'El 73% de los consumidores prefiere aprender sobre un producto a través de video.',
          characterImage: '/drago1.png'
        }
      ]} />
      <SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%", display: "block" }}>
        <div style={{ ...container, paddingTop: 16, paddingBottom: 8 }}>
          <motion.div variants={containerVar} initial="hidden" animate="show">
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
              <p style={{ margin: "8px 0 0", opacity: 0.9, fontSize: fs * 1.4 }}>
                <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
              </p>
            </motion.div>
          </motion.div>
        </div>

        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">

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
                            width: `${Math.round(((idx + 1) / total) * 100)}%`,
                            height: "100%",
                            background: primaryColor,
                            borderRadius: 999,
                            transition: "width 220ms ease",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: fs * 0.95, opacity: 0.75 }}>{Math.round(((idx + 1) / total) * 100)}%</span>
                    </div>
                  </div>

                  <p style={{ margin: "10px 0 18px", lineHeight: 1.55, fontSize: fs * 1.4 }}>{q.text}</p>

                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    {q.options.map((option) => {
                      const active = selection[idx] === option.key
                      const disabled = !!checked[idx]
                      return (
                        <motion.div
                          key={option.key}
                          role="button"
                          tabIndex={0}
                          whileHover={disabled ? {} : { scale: 0.98 }}
                          whileTap={disabled ? {} : { scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 22 }}
                          onClick={() => !disabled && selectAndAdvance(option.key)}
                          style={optStyle(active)}
                        >
                          <div style={{ fontWeight: 900, marginBottom: 6 }}>{option.key}</div>
                          <div>{option.label}</div>
                        </motion.div>
                      )
                    })}
                  </div>

                  <div style={{ minHeight: 32, marginBottom: 14 }}>{feedback}</div>

                  {finished && (
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
                        {correct.filter(Boolean).length} / {total}
                      </span>
                    </div>
                  )}
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
  progressPercent = 80,
  title = "Quiz de Verdadero/Falso",
  topicTitle = "Fundamentos de grabación",
  layoutOption = "B",
  baseFontSize = 18,
  heroImage = "",
  autoAdvanceDelayMs = 650,
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: TFQuizProps) {
  console.log("❌ RENDERING PAGE4 - True/False Quiz ❌");
  void isAlreadyCompleted
  void completedScore
  
  const fs = Math.max(12, baseFontSize || 18)
  const _isA = layoutOption === "A"
  const _pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects for title
  React.useEffect(() => {
    const styleId = 'm4s1-page4-shimmer-effects';
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

  const total = DEFAULT_TF_QUESTIONS.length
  const [idx, setIdx] = useState(0)
  const [selection, setSelection] = useState<(boolean | null)[]>(() => Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(() => Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(() => Array(total).fill(false))
  const [score, setScore] = useState(0)

  const q = DEFAULT_TF_QUESTIONS[idx]
  const _quizProgressPct = Math.round(((idx + 1) / total) * 100)
  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total

  const _optStyle = (active: boolean): React.CSSProperties => ({
    padding: "18px 22px",
    borderRadius: 14,
    border: `2px solid ${active ? primaryColor : "rgba(0,0,0,0.12)"}`,
    background: active ? `${primaryColor}14` : "#fff",
    fontWeight: 800,
    fontSize: fs * 1.05,
    letterSpacing: 0.2,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "left",
    boxShadow: active ? "0 8px 24px rgba(0,0,0,0.06)" : "none",
    transformOrigin: "center",
  })

  const handleSelectTF = (value: boolean) => {
    if (checked[idx]) return

    setSelection((prev) => {
      const next = [...prev]
      next[idx] = value
      return next
    })

    const isCorrect = value === q.answer
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
      console.log(`M4S1P4: Submitting answer ${idx}: ${value}, correct=${q.answer}, isCorrect=${isCorrect}`)
      onAnswerSubmit(idx, q.text, value, q.answer, isCorrect)
    }

    if (idx < total - 1) {
      setTimeout(() => {
        setIdx((value) => value + 1)
      }, autoAdvanceDelayMs)
    } else {
      // Last question - complete quiz after delay
      console.log("M4S1P4: Last question answered, completing quiz with score:", newScore)
      setTimeout(() => {
        if (onQuizComplete) {
          onQuizComplete(newScore)
        }
      }, 100)
    }
  }

  const feedback =
    checked[idx] && correct[idx] ? (
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ 
          padding: "16px 20px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08))",
          border: "2px solid #10B981",
          color: "#10B981",
          fontWeight: 700,
          fontSize: fs * 1.2,
          display: "flex",
          alignItems: "center",
          gap: 10
        }}
      >
        <span style={{ fontSize: fs * 1.5 }}>✅</span>
        <span>¡Correcto!</span>
      </motion.div>
    ) : checked[idx] && !correct[idx] ? (
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ 
          padding: "16px 20px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.08))",
          border: "2px solid #EF4444",
          color: "#EF4444",
          fontWeight: 700,
          fontSize: fs * 1.2,
          display: "flex",
          alignItems: "center",
          gap: 10
        }}
      >
        <span style={{ fontSize: fs * 1.5 }}>❌</span>
        <span>Incorrecto. Era <strong>{q.answer ? "Verdadero" : "Falso"}</strong></span>
      </motion.div>
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
        <main style={{ width: "100%", display: "flex", flexDirection: "column", flex: 1, minHeight: "calc(100vh - 80px)", alignItems: "center", justifyContent: "center" }}>
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
      <main style={{ width: "100%", display: "block" }}>
        <div style={{ ...container, paddingTop: 16, paddingBottom: 8 }}>
          <motion.div variants={containerVar} initial="hidden" animate="show">
            <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
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
                {title}
              </motion.h1>
              <motion.p 
                style={{ margin: "8px 0 0", opacity: 0.9, fontSize: fs * 1.4, color: primaryColor, fontWeight: 600 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {heroImage ? (
                <motion.div
                  variants={itemVar}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden" as const,
                    boxShadow: "0 18px 60px rgba(0,0,0,0.12)",
                    marginBottom: 20,
                  }}
                >
                  <img src={heroImage} alt="Sección" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

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
                    <p style={{ margin: 0, lineHeight: 1.6, fontSize: fs * 1.5, fontWeight: 600, color: "#111" }}>{q.text}</p>
                  </div>

                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                      marginBottom: 20,
                    }}
                  >
                    {[
                      { label: "Verdadero", value: true, icon: "✅", color: "#10B981" },
                      { label: "Falso", value: false, icon: "❌", color: "#EF4444" }
                    ].map((opt) => {
                      const active = selection[idx] === opt.value
                      const disabled = !!checked[idx]
                      
                      let bgColor = "#fff"
                      let borderColor = "rgba(0,0,0,0.12)"
                      let textColor = "#111"
                      
                      if (active) {
                        bgColor = `${opt.color}15`
                        borderColor = opt.color
                        textColor = opt.color
                      } else if (disabled && opt.value === q.answer) {
                        bgColor = "#10B98120"
                        borderColor = "#10B981"
                        textColor = "#10B981"
                      }
                      
                      return (
                        <motion.div
                          key={String(opt.value)}
                          role="button"
                          onClick={() => !disabled && handleSelectTF(opt.value)}
                          style={{
                            padding: "20px 24px",
                            borderRadius: 16,
                            border: `2px solid ${borderColor}`,
                            background: bgColor,
                            fontWeight: 800,
                            fontSize: fs * 1.2,
                            letterSpacing: 0.2,
                            cursor: disabled ? "not-allowed" : "pointer",
                            userSelect: "none" as const,
                            textAlign: "center" as const,
                            boxShadow: active ? `0 8px 24px ${opt.color}30` : "0 2px 8px rgba(0,0,0,0.08)",
                            opacity: disabled ? 0.6 : 1,
                            color: textColor,
                            position: "relative",
                            overflow: "hidden"
                          }}
                          whileHover={disabled ? undefined : { scale: 1.02, y: -2 }}
                          whileTap={disabled ? undefined : { scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        >
                          {active && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                fontSize: fs * 1.2,
                              }}
                            >
                              ✓
                            </motion.div>
                          )}
                          <div style={{ 
                            fontSize: fs * 2,
                            marginBottom: 8 
                          }}>
                            {opt.icon}
                          </div>
                          {opt.label}
                        </motion.div>
                      )
                    })}
                  </div>

                  <div style={{ minHeight: 32, marginBottom: 14 }}>{feedback}</div>

                  {finished && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{
                        marginTop: 18,
                        padding: 24,
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
                        {correct.filter(Boolean).length} / {total}
                      </div>
                    </motion.div>
                  )}
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
  _title = "Sección 1",
  topicTitle = "Quiz de Opción Múltiple",
  layoutOption = "B",
  baseFontSize = 18,
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: Page5Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const _isA = layoutOption === "A"
  const _pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Multiple Choice questions with 4 options each
  const QUESTIONS: QuestionMC[] = [
    {
      type: "mc",
      text: "¿Cuál es la mejor posición para mirar cuando grabas un video?",
      options: [
        { key: "A", label: "Directamente al lente de la cámara" },
        { key: "B", label: "Al monitor de la computadora" },
        { key: "C", label: "Hacia arriba para verse más alto" },
        { key: "D", label: "Hacia los lados para parecer natural" },
      ],
      answer: "A",
    },
    {
      type: "mc",
      text: "¿Dónde debe colocarse la luz principal para iluminar mejor el rostro?",
      options: [
        { key: "A", label: "Al frente y ligeramente arriba del sujeto" },
        { key: "B", label: "Detrás del sujeto" },
        { key: "C", label: "Solo desde abajo" },
        { key: "D", label: "Desde ambos lados por igual" },
      ],
      answer: "A",
    },
    {
      type: "mc",
      text: "¿Qué tipo de postura comunica mejor accesibilidad y seguridad?",
      options: [
        { key: "A", label: "Una postura abierta y neutra" },
        { key: "B", label: "Cruzar los brazos durante toda la toma" },
        { key: "C", label: "Balancearse constantemente" },
        { key: "D", label: "Mantener las manos en los bolsillos" },
      ],
      answer: "A",
    },
    {
      type: "mc",
      text: "¿Cuál es la duración ideal para una prueba de audio e iluminación?",
      options: [
        { key: "A", label: "5-10 segundos" },
        { key: "B", label: "1-2 segundos" },
        { key: "C", label: "30 segundos" },
        { key: "D", label: "No es necesario hacer pruebas" },
      ],
      answer: "A",
    },
    {
      type: "mc",
      text: "¿Qué efecto tiene el ruido de fondo constante en la grabación?",
      options: [
        { key: "A", label: "Casi nunca se nota" },
        { key: "B", label: "Mejora la calidad del audio" },
        { key: "C", label: "Distrae y reduce la calidad" },
        { key: "D", label: "Hace que el video se vea más profesional" },
      ],
      answer: "C",
    },
    {
      type: "mc",
      text: "¿Qué tipo de respiración favorece una voz más estable?",
      options: [
        { key: "A", label: "Respiración superficial" },
        { key: "B", label: "Respiración rápida" },
        { key: "C", label: "Aguantar la respiración" },
        { key: "D", label: "Respiración con el diafragma" },
      ],
      answer: "D",
    },
    {
      type: "mc",
      text: "¿Cuál es el mejor formato para grabar contenido para Stories o TikTok?",
      options: [
        { key: "A", label: "Horizontal (16:9)" },
        { key: "B", label: "Vertical (9:16)" },
        { key: "C", label: "Cuadrado (1:1)" },
        { key: "D", label: "No importa el formato" },
      ],
      answer: "B",
    },
    {
      type: "mc",
      text: "¿Qué tipo de fondo distrae menos a la audiencia?",
      options: [
        { key: "A", label: "Un fondo limpio y neutro" },
        { key: "B", label: "Un fondo muy cargado con movimiento" },
        { key: "C", label: "Un fondo con muchos colores" },
        { key: "D", label: "Un fondo con objetos brillantes" },
      ],
      answer: "A",
    },
    {
      type: "mc",
      text: "¿A qué altura debe colocarse el lente para un encuadre natural?",
      options: [
        { key: "A", label: "A la altura de los ojos" },
        { key: "B", label: "Por debajo de los ojos" },
        { key: "C", label: "Muy por encima de la cabeza" },
        { key: "D", label: "A la altura del pecho" },
      ],
      answer: "A",
    },
    {
      type: "mc",
      text: "¿Cómo mejora el sonido acercar el micrófono?",
      options: [
        { key: "A", label: "No hace diferencia" },
        { key: "B", label: "Reduce el ruido de fondo y mejora la claridad" },
        { key: "C", label: "Hace que suene más grave" },
        { key: "D", label: "Causa distorsión" },
      ],
      answer: "B",
    },
    {
      type: "mc",
      text: "¿Qué permite un guion con ideas clave?",
      options: [
        { key: "A", label: "Fluidez sin sonar robotizado" },
        { key: "B", label: "Sonar más robotizado" },
        { key: "C", label: "Hablar más rápido" },
        { key: "D", label: "Evitar pausas" },
      ],
      answer: "A",
    },
    {
      type: "mc",
      text: "¿Qué transmite balancearse constantemente frente a cámara?",
      options: [
        { key: "A", label: "Estabilidad y control" },
        { key: "B", label: "Confianza" },
        { key: "C", label: "Nerviosismo e inseguridad" },
        { key: "D", label: "Profesionalismo" },
      ],
      answer: "C",
    },
    {
      type: "mc",
      text: "¿Para qué sirven las pausas breves en el discurso?",
      options: [
        { key: "A", label: "Para que la audiencia se aburra" },
        { key: "B", label: "Para enfatizar ideas y que procesen el mensaje" },
        { key: "C", label: "Para alargar el video" },
        { key: "D", label: "Para parecer menos preparado" },
      ],
      answer: "B",
    },
    {
      type: "mc",
      text: "¿Qué efecto tiene grabar en una habitación vacía?",
      options: [
        { key: "A", label: "Aumenta el eco y empeora el sonido" },
        { key: "B", label: "Reduce el eco y mejora el sonido" },
        { key: "C", label: "No afecta el audio" },
        { key: "D", label: "Hace que suene más profesional" },
      ],
      answer: "A",
    },
    {
      type: "mc",
      text: "¿Para qué sirve activar modo avión durante la grabación?",
      options: [
        { key: "A", label: "Para ahorrar batería" },
        { key: "B", label: "Para evitar interrupciones y ruidos de notificaciones" },
        { key: "C", label: "Para mejorar la señal de internet" },
        { key: "D", label: "Para que la cámara funcione mejor" },
      ],
      answer: "B",
    },
    {
      type: "mc",
      text: "¿Cuál es el ritmo ideal para mantener la atención?",
      options: [
        { key: "A", label: "Muy lento y monótono" },
        { key: "B", label: "Variado con pausas estratégicas" },
        { key: "C", label: "Uniforme y muy rápido" },
        { key: "D", label: "Solo rápido sin pausas" },
      ],
      answer: "B",
    },
    {
      type: "mc",
      text: "¿Dónde debe mirar para transmitir mejor conexión con la audiencia?",
      options: [
        { key: "A", label: "Al monitor/pantalla" },
        { key: "B", label: "Al lente de la cámara" },
        { key: "C", label: "Hacia arriba" },
        { key: "D", label: "Hacia los lados" },
      ],
      answer: "B",
    },
    {
      type: "mc",
      text: "¿Qué efecto tiene una leve sonrisa al iniciar el video?",
      options: [
        { key: "A", label: "Predispone positivamente a la audiencia" },
        { key: "B", label: "Hace parecer menos profesional" },
        { key: "C", label: "No tiene efecto" },
        { key: "D", label: "Hace que se vea forzado" },
      ],
      answer: "A",
    },
  ]

  void isAlreadyCompleted
  void completedScore

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

  const total = QUESTIONS.length
  const [idx, setIdx] = useState(0)
  const [selection, setSelection] = useState<(MCKey | null)[]>(() => Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(() => Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(() => Array(total).fill(false))
  const [score, setScore] = useState(0)

  const q = QUESTIONS[idx]
  const _quizProgressPct = Math.round(((idx + 1) / total) * 100)
  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total

  const optStyle = (active: boolean, isCorrect?: boolean, isWrong?: boolean): React.CSSProperties => ({
    padding: "18px 20px",
    borderRadius: 14,
    border: `2px solid ${
      isCorrect ? "#0a7f35" : 
      isWrong ? "#b00020" : 
      active ? primaryColor : "rgba(0,0,0,0.12)"
    }`,
    background: isCorrect ? "#0a7f3514" : 
               isWrong ? "#b0002014" : 
               active ? `${primaryColor}14` : "#fff",
    fontWeight: 600,
    fontSize: fs * 0.95,
    letterSpacing: 0.1,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "left",
    boxShadow: active ? "0 8px 24px rgba(0,0,0,0.06)" : "0 2px 8px rgba(0,0,0,0.04)",
    transformOrigin: "center",
    width: "100%",
    height: "100%",
    minHeight: "80px",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
  })

  const feedback =
    q && checked[idx] && correct[idx] ? (
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ 
          padding: "16px 20px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08))",
          border: "2px solid #10B981",
          color: "#10B981",
          fontWeight: 700,
          fontSize: fs * 1.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginTop: 16,
        }}
      >
        <span style={{ fontSize: fs * 1.5 }}>✅</span>
        <span>¡Correcto!</span>
      </motion.div>
    ) : q && checked[idx] && !correct[idx] ? (
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ 
          padding: "16px 20px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.08))",
          border: "2px solid #EF4444",
          color: "#EF4444",
          fontWeight: 700,
          fontSize: fs * 1.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginTop: 16,
        }}
      >
        <span style={{ fontSize: fs * 1.5 }}>❌</span>
        <span>Incorrecto. Respuesta: <strong>{q.options.find(opt => opt.key === q.answer)?.label}</strong></span>
      </motion.div>
    ) : null

  const handleSelectMC = (value: MCKey) => {
    if (checked[idx]) return

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

    const isCorrect = value === q.answer
    setCorrect((prev) => {
      const next = [...prev]
      next[idx] = isCorrect
      return next
    })

    if (isCorrect) {
      setScore((prev) => prev + 1)
    }

    // Call onAnswerSubmit if provided
    if (onAnswerSubmit) {
      onAnswerSubmit(idx, q.text, value, q.answer, isCorrect)
    }

    // Auto advance after a delay
    setTimeout(() => {
      if (idx < total - 1) {
        setIdx((prev) => prev + 1)
      } else if (onQuizComplete) {
        onQuizComplete(score + (isCorrect ? 1 : 0))
      }
    }, 650)
  }


  // Add shimmer and floating effects for title
  React.useEffect(() => {
    const styleId = 'm4s1-page5-shimmer-effects';
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

  return (
    <div style={wrapper}>
      <MarketingFactsAnimation 
        facts={[
          {
            character: 'billy',
            text: 'Los primeros 3 segundos de un video determinan si el espectador se queda o se va.',
            characterImage: '/2.png'
          },
          {
            character: 'drago',
            text: 'Los videos con subtítulos tienen un 80% más de finalización.',
            characterImage: '/drago1.png'
          },
          {
            character: 'billy',
            text: 'Las miniaturas personalizadas aumentan el CTR hasta un 154%.',
            characterImage: '/2.png'
          },
          {
            character: 'drago',
            text: 'El 92% de las marcas considera al video una parte clave de su estrategia.',
            characterImage: '/drago1.png'
          }
        ]}
        baseFontSize={fs}
      />
      
      <SectionPageHeader
        brandName={brandName}
        logoSrc={logoSrc}
        primaryColor={primaryColor}
        progress={pct}
      />
      
      <main style={container}>
        {/* Title Section with Shimmer and Floating Effects */}
        <div style={{ marginBottom: 32, paddingTop: 20 }}>
          <motion.h1 
            style={{ 
              margin: 0, 
              fontSize: fs * 2.8, 
              lineHeight: 1.2,
              fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
              fontWeight: 900,
              color: primaryColor,
              textShadow: "0 4px 12px rgba(15, 98, 254, 0.2)",
              marginBottom: 12,
              letterSpacing: "-0.5px"
            }}
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Quiz de Opción Múltiple
          </motion.h1>
          <motion.p 
            style={{ 
              margin: 0,
              fontSize: fs * 1.3, 
              color: primaryColor,
              fontWeight: 600,
              opacity: 0.85
            }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span style={{ color: primaryColor, fontWeight: 700, marginRight: 8 }}>▌</span> {topicTitle}
          </motion.p>
        </div>

        <section
          style={{
            width: "100%",
            maxWidth: "100%",
            margin: "0",
            padding: "0",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >

          {/* Question Card */}
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 40,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              border: `2px solid ${primaryColor}22`,
              width: "100%",
              position: "relative",
            }}
          >
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}CC, ${primaryColor})`,
              borderRadius: "20px 20px 0 0",
            }} />
            <div style={{
              padding: "20px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(15, 98, 254, 0.08), rgba(15, 98, 254, 0.04))",
              border: "2px solid rgba(15, 98, 254, 0.2)",
              marginBottom: 32,
            }}>
              <h3
                style={{
                  fontSize: fs * 1.4,
                  fontWeight: 700,
                  color: "#111",
                  margin: 0,
                  lineHeight: 1.5,
                  textAlign: "center",
                }}
              >
                {q.text}
              </h3>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
                width: "100%",
              }}
            >
              {q.options.map((opt) => {
                const isSelected = selection[idx] === opt.key
                const isCorrectAnswer = opt.key === q.answer
                const isWrong = checked[idx] && isSelected && !isCorrectAnswer
                const isCorrect = checked[idx] && isCorrectAnswer
                
                const colors = [
                  { border: "#0F62FE", bg: "rgba(15, 98, 254, 0.1)", text: "#0F62FE" },
                  { border: "#10B981", bg: "rgba(16, 185, 129, 0.1)", text: "#10B981" },
                  { border: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)", text: "#F59E0B" },
                  { border: "#EC4899", bg: "rgba(236, 72, 153, 0.1)", text: "#EC4899" },
                ]
                const colorIndex = opt.key === "A" ? 0 : opt.key === "B" ? 1 : opt.key === "C" ? 2 : 3
                const optionColor = colors[colorIndex]
                
                let bgColor = checked[idx] ? "#f5f5f5" : "#fff"
                let borderColor = checked[idx] ? "#ddd" : optionColor.border
                let textColor = checked[idx] ? "#999" : "#111"
                
                if (isCorrect) {
                  bgColor = "#10B98120"
                  borderColor = "#10B981"
                  textColor = "#10B981"
                } else if (isWrong) {
                  bgColor = "#EF444420"
                  borderColor = "#EF4444"
                  textColor = "#EF4444"
                } else if (isSelected && !checked[idx]) {
                  bgColor = `${optionColor.text}15`
                  borderColor = optionColor.border
                }
                
                return (
                  <motion.button
                    key={opt.key}
                    whileHover={checked[idx] ? {} : { scale: 1.02, y: -4 }}
                    whileTap={checked[idx] ? {} : { scale: 0.98 }}
                    onClick={() => handleSelectMC(opt.key)}
                    disabled={checked[idx]}
                    style={{
                      padding: "24px",
                      borderRadius: "16px",
                      border: `2px solid ${borderColor}`,
                      background: bgColor,
                      fontWeight: 700,
                      fontSize: fs * 1.1,
                      letterSpacing: 0.2,
                      cursor: checked[idx] ? "default" : "pointer",
                      userSelect: "none",
                      textAlign: "left",
                      boxShadow: isSelected ? `0 8px 24px ${optionColor.text}30` : "0 2px 8px rgba(0,0,0,0.08)",
                      opacity: checked[idx] && !isSelected && !isCorrectAnswer ? 0.4 : 1,
                      color: textColor,
                      transition: "all 0.2s ease",
                      minHeight: "90px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "12px",
                          background: isCorrect ? "linear-gradient(135deg, #10B981, #34D399)" : 
                                    isWrong ? "linear-gradient(135deg, #EF4444, #F87171)" : 
                                    isSelected ? `linear-gradient(135deg, ${optionColor.border}, ${optionColor.text})` : `linear-gradient(135deg, ${optionColor.border}40, ${optionColor.bg})`,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 900,
                          fontSize: fs * 1.2,
                          flexShrink: 0,
                          boxShadow: `0 4px 12px ${optionColor.text}30`,
                        }}
                      >
                        {opt.key}
                      </div>
                      <span style={{ flex: 1, lineHeight: 1.4, fontSize: fs * 1.0, fontWeight: 600 }}>{opt.label}</span>
                      {(isCorrect || isWrong) && (
                        <div style={{ 
                          fontSize: fs * 1.8,
                          color: isCorrect ? "#10B981" : "#EF4444"
                        }}>
                          {isCorrect ? "✅" : "❌"}
                        </div>
                      )}
                      {isSelected && !checked[idx] && (
                        <div style={{ 
                          fontSize: fs * 1.5,
                          color: optionColor.text
                        }}>
                          ✓
                        </div>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Feedback */}
            {feedback}

            {/* Progress indicator */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 24,
                gap: 16,
              }}
            >
              <div
                style={{
                  fontSize: fs * 0.9,
                  color: "#666",
                  fontWeight: 600,
                }}
              >
                {answeredCount} / {total} respondidas
              </div>
            </div>
          </motion.div>

          {/* Results Summary */}
          {finished && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: 40,
                boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                border: `2px solid ${primaryColor}`,
                textAlign: "center",
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
                borderRadius: "20px 20px 0 0",
              }} />
              <div style={{ fontSize: fs * 3, marginBottom: 16 }}>
                {score === total ? "🎉" : score >= total * 0.8 ? "🏆" : score >= total * 0.6 ? "👍" : "📚"}
              </div>
              <h3
                style={{
                  fontSize: fs * 1.6,
                  fontWeight: 900,
                  color: primaryColor,
                  marginBottom: 24,
                }}
              >
                ¡Quiz Completado!
              </h3>
              <div
                style={{
                  fontSize: fs * 1.5,
                  color: primaryColor,
                  fontWeight: 800,
                  marginBottom: 8,
                  padding: "12px 24px",
                  borderRadius: "12px",
                  background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`,
                  border: `2px solid ${primaryColor}30`
                }}
              >
                Puntuación: {score} / {total}
              </div>
              <div
                style={{
                  fontSize: fs * 1.15,
                  color: "#666",
                  lineHeight: 1.6,
                  marginTop: 16,
                  fontWeight: 500
                }}
              >
                {score === total
                  ? "🎊 ¡Perfecto! Dominas todos los conceptos."
                  : score >= total * 0.8
                  ? "⭐ ¡Muy bien! Tienes un buen dominio del tema."
                  : score >= total * 0.6
                  ? "💪 Bien, pero puedes mejorar. Revisa los conceptos."
                  : "📖 Necesitas repasar más. Te recomendamos revisar el contenido."}
              </div>
              </motion.div>
          )}
        </section>
      </main>
    </div>
  )
}

// ============================================================================
// Video Planning Activity Component
// ============================================================================

type VideoPlanningActivityProps = {
  fs: number
  primaryColor: string
}

function VideoPlanningActivity({ fs, primaryColor }: VideoPlanningActivityProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    topic: "",
    objective: "",
    keyPoints: ["", "", ""],
    location: "",
    distractions: "",
    audioSetup: "",
    lightingSetup: "",
    equipment: "",
    duration: ""
  })

  const steps = [
    {
      title: "1. Preparación del Guion",
      fields: [
        { key: "topic", label: "¿Cuál es el tema principal de tu video?", placeholder: "Ej: Cómo hacer un pitch efectivo" },
        { key: "objective", label: "¿Qué quieres que recuerde tu audiencia?", placeholder: "Ej: 3 pasos clave para un pitch exitoso" },
        { key: "keyPoints", label: "Lista tus 3-5 puntos principales:", placeholder: "Punto clave..." }
      ]
    },
    {
      title: "2. Control del Entorno",
      fields: [
        { key: "location", label: "¿Dónde vas a grabar?", placeholder: "Ej: Oficina, sala de conferencias, estudio en casa" },
        { key: "distractions", label: "¿Qué distracciones necesitas eliminar?", placeholder: "Ej: Cerrar ventanas, apagar ventiladores, modo no molestar" }
      ]
    },
    {
      title: "3. Configuración de Audio",
      fields: [
        { key: "audioSetup", label: "¿Cómo vas a optimizar el audio?", placeholder: "Ej: Grabar cerca del micrófono, evitar ecos, volumen constante" }
      ]
    },
    {
      title: "4. Configuración de Iluminación",
      fields: [
        { key: "lightingSetup", label: "¿Cómo vas a configurar la iluminación?", placeholder: "Ej: Luz frontal suave, evitar contraluces, fondo limpio" }
      ]
    },
    {
      title: "5. Equipo y Duración",
      fields: [
        { key: "equipment", label: "¿Qué equipo necesitas?", placeholder: "Ej: Cámara, micrófono, trípode, iluminación" },
        { key: "duration", label: "¿Cuánto durará tu video?", placeholder: "Ej: 2-3 minutos" }
      ]
    }
  ]

  const handleInputChange = (key: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleKeyPointChange = (index: number, value: string) => {
    const newKeyPoints = [...formData.keyPoints]
    newKeyPoints[index] = value
    setFormData(prev => ({ ...prev, keyPoints: newKeyPoints }))
  }

  const addKeyPoint = () => {
    if (formData.keyPoints.length < 5) {
      setFormData(prev => ({ ...prev, keyPoints: [...prev.keyPoints, ""] }))
    }
  }

  const removeKeyPoint = (index: number) => {
    if (formData.keyPoints.length > 3) {
      const newKeyPoints = formData.keyPoints.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, keyPoints: newKeyPoints }))
    }
  }

  const currentStepData = steps[currentStep]

  const stepColors = [
    { bg: "linear-gradient(135deg, #3B82F6, #60A5FA)", icon: "✍️" },
    { bg: "linear-gradient(135deg, #10B981, #34D399)", icon: "🏢" },
    { bg: "linear-gradient(135deg, #8B5CF6, #A78BFA)", icon: "🎤" },
    { bg: "linear-gradient(135deg, #F59E0B, #FBBF24)", icon: "💡" },
    { bg: "linear-gradient(135deg, #EC4899, #F472B6)", icon: "📹" }
  ]

  return (
    <div>
      {/* Progress Bar with enhanced styling */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          marginBottom: 16,
          fontSize: fs * 1.1,
          color: "#333",
          fontWeight: 700
        }}>
          <span>📍 Paso {currentStep + 1} de {steps.length}</span>
          <span style={{ 
            background: primaryColor,
            color: "white",
            padding: "4px 12px",
            borderRadius: 8,
            fontSize: fs * 0.9
          }}>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div style={{
          width: "100%",
          height: 12,
          background: "#e0e7ff",
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)"
        }}>
          <motion.div style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}CC)`,
            transition: "width 0.3s ease",
            borderRadius: 6,
            boxShadow: `0 4px 12px ${primaryColor}40`
          }} 
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step Content with colored header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          background: stepColors[currentStep]?.bg || `linear-gradient(135deg, ${primaryColor}, ${primaryColor}CC)`,
          borderRadius: "16px 16px 4px 4px",
          padding: "20px 24px",
          marginBottom: 24,
          textAlign: "center",
          boxShadow: `0 4px 16px ${primaryColor}30`
        }}>
          <div style={{ fontSize: fs * 2, marginBottom: 8 }}>
            {stepColors[currentStep]?.icon || "📝"}
          </div>
          <h3 style={{ 
            fontSize: fs * 1.5, 
            fontWeight: 800, 
            color: "#fff", 
            margin: 0,
            textShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}>
            {currentStepData.title}
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {currentStepData.fields.map((field, index) => (
            <motion.div 
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                padding: "20px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #F8FAFF, #FFFFFF)",
                border: `2px solid ${primaryColor}20`,
                boxShadow: "0 2px 8px rgba(15, 98, 254, 0.08)"
              }}
            >
              <label style={{ 
                display: "block", 
                fontSize: fs * 1.1, 
                fontWeight: 700, 
                color: primaryColor, 
                marginBottom: 12 
              }}>
                {field.label}
              </label>
              
              {field.key === "keyPoints" ? (
                <div>
                  {formData.keyPoints.map((point, pointIndex) => (
                    <div key={pointIndex} style={{ 
                      display: "flex", 
                      gap: 8, 
                      marginBottom: 8,
                      alignItems: "center"
                    }}>
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleKeyPointChange(pointIndex, e.target.value)}
                        placeholder={field.placeholder}
                        style={{
                          flex: 1,
                          padding: "14px 18px",
                          border: `2px solid #e0e0e0`,
                          borderRadius: 10,
                          fontSize: fs * 1.0,
                          outline: "none",
                          transition: "all 0.2s ease",
                          background: "#fff",
                          fontWeight: 500
                        }}
                        onFocus={(e) => e.target.style.borderColor = primaryColor}
                        onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                      />
                      {formData.keyPoints.length > 3 && (
                        <button
                          onClick={() => removeKeyPoint(pointIndex)}
                          style={{
                            padding: "8px 12px",
                            background: "#ff4444",
                            color: "white",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer",
                            fontSize: fs * 0.8
                          }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  {formData.keyPoints.length < 5 && (
                    <button
                      onClick={addKeyPoint}
                      style={{
                        padding: "8px 16px",
                        background: `${primaryColor}20`,
                        color: primaryColor,
                        border: `2px solid ${primaryColor}`,
                        borderRadius: 6,
                        cursor: "pointer",
                        fontSize: fs * 0.9,
                        fontWeight: 600
                      }}
                    >
                      + Agregar punto
                    </button>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={formData[field.key as keyof typeof formData] as string}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    border: `2px solid #e0e0e0`,
                    borderRadius: 10,
                    fontSize: fs * 1.0,
                    outline: "none",
                    transition: "all 0.2s ease",
                    background: "#fff",
                    fontWeight: 500
                  }}
                  onFocus={(e) => e.target.style.borderColor = primaryColor}
                  onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        gap: 16
      }}>
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          style={{
            padding: "12px 24px",
            background: currentStep === 0 ? "#f0f0f0" : "#666",
            color: currentStep === 0 ? "#999" : "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: fs * 0.9,
            fontWeight: 600,
            cursor: currentStep === 0 ? "not-allowed" : "pointer",
            opacity: currentStep === 0 ? 0.5 : 1
          }}
        >
          ← Anterior
        </button>

        <div style={{ 
          fontSize: fs * 0.9, 
          color: "#666", 
          fontWeight: 600 
        }}>
          {currentStep + 1} / {steps.length}
        </div>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            style={{
              padding: "12px 24px",
              background: primaryColor,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: fs * 0.9,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Siguiente →
          </button>
        ) : (
          <button
            onClick={() => {
              // Show completion summary
              alert("¡Excelente! Has completado tu plan de video. Revisa todos los pasos y estás listo para grabar.")
            }}
            style={{
              padding: "12px 24px",
              background: "#0a7f35",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: fs * 0.9,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            ✅ Completar Plan
          </button>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Page 6: Summary and Next Steps (Non-quiz content page)
// ============================================================================

type Page6Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  layoutOption?: LayoutOption
  baseFontSize?: number
}

function Page6({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 100,
  title = "Planifica tu Video",
  topicTitle = "Fundamentos de grabación",
  layoutOption = "A",
  baseFontSize = 18,
}: Page6Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const _isA = layoutOption === "A"
  const _pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects for title
  React.useEffect(() => {
    const styleId = 'm4s1-page6-shimmer-effects';
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
      display: "flex",
      flexDirection: "column",
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
      boxSizing: "border-box",
      margin: "0",
    }),
    []
  )

  return (
    <div style={wrapper}>
      <main style={container}>
        <SectionPageHeader
          brandName={brandName}
          logoSrc={logoSrc}
          primaryColor={primaryColor}
          progress={pct}
        />

        <section style={{ flex: 1 }}>
          {/* Title with Shimmer and Floating Effects */}
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <motion.h1 
              style={{ 
                margin: 0, 
                fontSize: fs * 3.0, 
                lineHeight: 1.15,
                fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                fontWeight: 900,
                background: "linear-gradient(90deg, #0F62FE, #60A5FA, #93C5FD, #0F62FE)",
                backgroundSize: "200% auto",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer-title 3s ease-in-out infinite, float 3s ease-in-out infinite",
                textShadow: "0 0 30px rgba(15, 98, 254, 0.3)",
                marginBottom: 12
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              🎬 {title}
            </motion.h1>
            <motion.p 
              style={{ 
                margin: 0,
                fontSize: fs * 1.4, 
                color: primaryColor,
                fontWeight: 600,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
            </motion.p>
          </div>

          <div style={{
            ...cardStyle,
            border: `2px solid ${primaryColor}40`,
            background: "linear-gradient(135deg, #FFFFFF, #F8FAFF)",
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
              background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}CC, ${primaryColor})`,
              animation: "shimmer-title 3s ease-in-out infinite",
            }} />
            
            <p style={{ 
              fontSize: fs * 1.2, 
              lineHeight: 1.6, 
              color: "#333", 
              marginBottom: 32,
              textAlign: "center",
              fontWeight: 600
            }}>
              Aplica lo que has aprendido creando un plan completo para tu próximo video.
            </p>

            <VideoPlanningActivity fs={fs} primaryColor={primaryColor} />
          </div>
        </section>
      </main>
    </div>
  )
}

const M4S1_CONTENT: Record<number, React.ReactNode> = {
  1: <WelcomePage />,
  2: <Page1 />,
  3: <Page2 />,
  4: <Page4 />,
  5: <Page5 />,
  6: <Page6 />,
}

export default M4S1_CONTENT

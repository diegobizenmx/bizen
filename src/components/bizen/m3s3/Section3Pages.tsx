/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { motion, Variants } from "framer-motion"
import SectionPageHeader from "@/components/bizen/SectionPageHeader"
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
  whyTitle?: string
  whyBody?: string
  whyExampleTitle?: string
  whyExampleText?: string
  glossaryTitle?: string
  glossaryItems?: string[]
  stepsTitle?: string
  stepsItems?: string[]
  errorsTitle?: string
  errorsItems?: string[]
  qaTitle?: string
  qaItems?: string[]
  heroImage?: string
  layoutOption?: LayoutOption
  baseFontSize?: number
}

type QAItem = { q: string; a: string }
type MCQ = { text: string; context?: string; options: string[]; correctIndex: number }

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

const containerVar: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, ease: "easeOut" } },
}
const itemVar: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut" } },
}

const DEFAULT_STEPS = [
  "Elige 3 colores que contrasten entre sí.",
  "Elige 1 tipografía y úsala siempre en títulos.",
  "Redacta títulos de 4–6 palabras con verbo + beneficio.",
  "Deja aire visual (espacio vacío) alrededor del texto.",
]

const DEFAULT_CHECKLIST = [
  "¿Mi título se lee en móvil?",
  "¿Uso siempre los mismos colores/tipografía?",
  "¿Mi encuadre se repite y se reconoce?",
]

const DEFAULT_QA: QAItem[] = [
  {
    q: "¿Cómo elijo mis 3 colores?",
    a: "Base (tu tono principal), apoyo (complementa) y acento (para llamar la atención).",
  },
  {
    q: "¿Cuánto texto en portada?",
    a: "Lo mínimo para entender el tema sin esfuerzo.",
  },
]

// Note: DEFAULT_STYLE_INSTRUCTIONS removed as unused after Page5 refactor

const DEFAULT_QUESTIONS: MCQ[] = [
  {
    text: "¿Qué propósito conceptual tiene definir ‘constantes visuales’?",
    context: "Crear reconocimiento y reducir fricción al producir contenido.",
    options: [
      "Evitar toda variación",
      "Producir sin limitaciones",
      "Anclar identidad con paleta, tipografía y encuadre",
      "Usar filtros cada vez",
    ],
    correctIndex: 2,
  },
  {
    text: "¿Qué principio guía la elección tipográfica para portadas?",
    context: "Legibilidad y jerarquía son esenciales para comprensión rápida.",
    options: [
      "Decoración ante todo",
      "Contraste y tamaño adecuados",
      "La tipografía de moda",
      "Mezclar varias por diseño",
    ],
    correctIndex: 1,
  },
  {
    text: "¿Cuál es la función del ‘aire visual’ en diseño?",
    context: "El espacio vacío dirige la atención a lo importante.",
    options: [
      "Rellenar con stickers",
      "Descanso y jerarquía",
      "Ocultar errores",
      "Permitir más texto",
    ],
    correctIndex: 1,
  },
  {
    text: "¿Qué significa consistencia entre plataformas?",
    context: "Esencia y valores reconocibles con adaptación de formato.",
    options: [
      "Copiar exacto en todas",
      "Mantener identidad y adaptar duración/ratio/texto",
      "Usar siempre el mismo copy",
      "Cambiar identidad según plataforma",
    ],
    correctIndex: 1,
  },
  {
    text: "¿Qué rol conceptual cumple un ‘clóset cápsula’ para creadores?",
    context: "Reduce decisiones y mantiene una estética estable.",
    options: [
      "Tener ropa infinita",
      "Pocas prendas combinables que te favorecen",
      "Solo prendas negras",
      "Vestuario temático diario",
    ],
    correctIndex: 1,
  },
  {
    text: "¿Qué objetivo conceptual tiene la paleta de colores?",
    context: "Construir reconocimiento y armonía con la identidad.",
    options: [
      "Impresionar por saturación",
      "Cambiar sin reglas",
      "Sostener una atmósfera reconocible",
      "Elegir al azar",
    ],
    correctIndex: 2,
  },
  {
    text: "El uso consistente de una tipografía y estructura de portada ayuda a que te reconozcan más rápido.",
    context: "La repetición estratégica crea huella.",
    options: ["Verdadero", "Falso"],
    correctIndex: 0,
  },
  {
    text: "Los logotipos grandes en ropa incrementan la atención en el contenido educativo.",
    context: "Desvían la mirada del mensaje principal.",
    options: ["Verdadero", "Falso"],
    correctIndex: 1,
  },
  {
    text: "Aplicar muchos filtros diferentes es una vía para construir coherencia visual.",
    context: "Suele producir ruido y fatiga visual.",
    options: ["Verdadero", "Falso"],
    correctIndex: 1,
  },
  {
    text: "Una guía simple documentada (constantes y ejemplos sí/no) facilita la consistencia.",
    context: "Sistematizar ahorra tiempo y errores.",
    options: ["Verdadero", "Falso"],
    correctIndex: 0,
  },
  {
    text: "La consistencia impide la creatividad.",
    context: "Un marco claro libera energía para el contenido.",
    options: ["Verdadero", "Falso"],
    correctIndex: 1,
  },
  {
    text: "Tarjeta: “Jerarquía visual” ¿Qué prioriza?",
    context: "Ordenar elementos para que el ojo sepa por dónde leer.",
    options: ["Decoración", "Títulos claros y contrastados", "Mucho texto pequeño", "Fondos llenos"],
    correctIndex: 1,
  },
  {
    text: "Tarjeta: “Reconocimiento de marca” ¿Qué lo impulsa?",
    context: "Repetición de constantes y promesa clara.",
    options: ["Cambios impredecibles", "Constantes visuales + mensaje consistente", "Filtros aleatorios", "Títulos crípticos"],
    correctIndex: 1,
  },
  {
    text: "Tarjeta: “Adaptación de formato” ¿Qué implica?",
    context: "Modificar duración/ratio/portada manteniendo la esencia.",
    options: ["Uniformidad total", "Cambiar identidad", "Ajustar forma, conservar fondo conceptual", "Evitar portadas"],
    correctIndex: 2,
  },
  {
    text: "Tarjeta: “Minimalismo útil” ¿Qué promueve?",
    context: "Eliminar lo que no aporta para mejorar comprensión.",
    options: ["Añadir elementos por estética", "Menos es más cuando mejora claridad", "Saturación de colores", "Tipografías múltiples"],
    correctIndex: 1,
  },
]

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

function Btn({
  children,
  onClick,
  variant = "primary",
  disabled,
  primaryColor,
}: {
  children: React.ReactNode
  onClick?: () => void
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
    userSelect: "none",
    outline: "none",
    border: "none",
    transformOrigin: "center",
    willChange: "transform",
  }

  const styles: Record<"primary" | "ghost", React.CSSProperties> = {
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

function Page1({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 0,
  title = "Sección 3",
  topicTitle = "Constantes visuales, tipografía y paleta",
  introText = "",
  keyIdea = "Un estilo claro y consistente mejora el reconocimiento al instante y reduce fricción al consumir tu contenido.",
  whyTitle = "1) ¿Por qué importa?",
  whyBody = "Un estilo claro hace que te reconozcan en segundos. Si tus títulos, colores y encuadre se repiten, tu audiencia te identifica incluso antes de leer tu nombre.",
  whyExampleTitle = "Ejemplos",
  whyExampleText = "Titular breve con alto contraste (“Presenta claro hoy”), misma tipografía en todas tus portadas y encuadre similar en tus videos.",
  glossaryTitle = "2) Glosario y decisiones",
  glossaryItems = [
    "Constantes visuales: decisiones que repites (colores, letra, encuadre).",
    "Tipografía legible: letra clara para leer rápido.",
    "Paleta simple: color base + apoyo + acento con buen contraste.",
    "Decisión práctica: define un formato de portada y úsalo en todos tus videos.",
  ],
  stepsTitle = "3) Pasos aplicables hoy",
  stepsItems = [],
  errorsTitle = "Errores comunes",
  errorsItems = [],
  qaTitle = "4) Q&A rápido",
  qaItems = [],
  heroImage = "",
  layoutOption = "A",
  baseFontSize = 18,
}: Page1Props) {
  void layoutOption
  const fs = Math.max(12, baseFontSize || 18)

  // Interactive state for flashcards
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  // Flashcards data
  const flashcards = [
    { front: "Constantes Visuales", back: "Decisiones que repites: colores, tipografía y encuadre" },
    { front: "Tipografía Legible", back: "Letra clara para lectura rápida y fácil comprensión" },
    { front: "Paleta Simple", back: "Color base + apoyo + acento con buen contraste" },
  ]

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm3s3-page1-shimmer-effects';
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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
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
              <motion.div variants={itemVar} style={{ marginBottom: 12 }}>
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
                <p style={{ margin: "6px 0 0", opacity: 0.9, fontSize: fs * 1.4 }}>
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </p>
              </motion.div>

              {heroImage ? (
                <motion.div
                  variants={itemVar}
                  style={{ borderRadius: 16, overflow: "hidden" as const, boxShadow: "0 18px 60px rgba(0,0,0,0.12)", marginTop: 14, marginBottom: 16 }}
                >
                  <img src={heroImage} alt="Sección 3" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              {introText ? (
                <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                  <Card glow={primaryColor}>
                    <p style={{ margin: 0, opacity: 0.95, fontSize: fs }}>{introText}</p>
                  </Card>
                </motion.div>
              ) : null}

              {keyIdea ? (
                <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      border: `1px solid rgba(15, 98, 254, 0.25)`,
                      background: "linear-gradient(135deg, rgba(15, 98, 254, 0.15), rgba(15, 98, 254, 0.08))",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      color: "#111",
                      borderRadius: 16,
                      padding: 20,
                      boxShadow: "0 4px 16px rgba(15, 98, 254, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    <strong style={{ 
                      color: primaryColor, 
                      display: "flex", 
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 10, 
                      fontSize: fs * 1.1,
                      fontWeight: 800
                    }}>
                      <span style={{ fontSize: fs * 1.3 }}>💡</span>
                      Idea clave
                    </strong>
                    <p style={{ margin: 0, opacity: 0.95, fontSize: fs, lineHeight: 1.6 }}>{keyIdea}</p>
                  </div>
                </motion.div>
              ) : null}

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <div style={{
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(59, 130, 246, 0.05))",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: "0 4px 20px rgba(59, 130, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                }}>
                  <h3 style={{ 
                    margin: "0 0 14px 0", 
                    fontSize: fs * 1.35,
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                  }}>
                    <span style={{ fontSize: fs * 1.4 }}>🎯</span>
                    {whyTitle}
                  </h3>
                  <p style={{ margin: "0 0 16px 0", opacity: 0.95, lineHeight: 1.6, fontSize: fs }}>{whyBody}</p>
                  <div style={{ 
                    marginTop: 16,
                    padding: 16,
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15))",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    borderRadius: 12,
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                  }}>
                    <strong style={{ 
                      color: "#3B82F6", 
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                      fontSize: fs * 1.05
                    }}>
                      <span>💡</span>
                      {whyExampleTitle}
                    </strong>
                    <p style={{ margin: 0, opacity: 0.95, lineHeight: 1.5, fontSize: fs * 0.95 }}>{whyExampleText}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <div style={{
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(139, 92, 246, 0.05))",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: "0 4px 20px rgba(139, 92, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                }}>
                  <h3 style={{ 
                    margin: "0 0 16px 0", 
                    fontSize: fs * 1.35,
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                  }}>
                    <span style={{ fontSize: fs * 1.4 }}>📚</span>
                    {glossaryTitle}
                  </h3>
                  <div style={{ display: "grid", gap: 10 }}>
                    {glossaryItems.map((text, index) => (
                      <motion.div
                        key={`g-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          padding: 14,
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.2))",
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                          borderRadius: 12,
                          border: "1px solid rgba(139, 92, 246, 0.2)",
                          boxShadow: "0 2px 8px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                        }}
                      >
                        <span style={{ 
                          fontSize: fs * 1.2,
                          lineHeight: 1,
                          marginTop: 2,
                        }}>
                          {index === 0 ? "🎨" : index === 1 ? "✍️" : index === 2 ? "🌈" : "📐"}
                        </span>
                        <span style={{ 
                          fontSize: fs * 0.95, 
                          lineHeight: 1.5, 
                          opacity: 0.95,
                          flex: 1
                        }}>
                        {text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Interactive Flashcards Section */}
              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow="#8B5CF6">
                  <h3 style={{ margin: "0 0 16px 0", fontSize: fs * 1.355, color: "#8B5CF6", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: fs * 1.5 }}>🎴</span>
                    Tarjetas Interactivas
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                    {flashcards.map((card, idx) => (
                      <motion.div
                        key={idx}
                        onClick={() => setFlippedCard(flippedCard === idx ? null : idx)}
                        style={{
                          aspectRatio: "4/3",
                          borderRadius: 16,
                          overflow: "hidden",
                          cursor: "pointer",
                          position: "relative",
                          border: "1px solid rgba(139, 92, 246, 0.2)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                        }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.97 }}
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
                              padding: 16,
                              boxShadow: "0 4px 16px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                            }}
                          >
                            <div style={{ textAlign: "center", zIndex: 1 }}>
                              <div style={{ fontSize: fs * 1.2, marginBottom: 6 }}>💡</div>
                              <strong style={{ fontSize: fs * 0.9 }}>{card.front}</strong>
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
                              padding: 16,
                              transform: "rotateY(180deg)",
                              boxShadow: "0 4px 16px rgba(6, 182, 212, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                            }}
                          >
                            <div style={{ textAlign: "center", fontSize: fs * 0.8, lineHeight: 1.4 }}>
                              {card.back}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                  <p style={{ margin: "12px 0 0 0", fontSize: fs * 0.85, opacity: 0.7, textAlign: "center", fontStyle: "italic" }}>
                    Haz clic en las tarjetas para voltearlas
                  </p>
                </Card>
              </motion.div>

              {/* Interactive Activity Section */}
              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow="#10B981">
                  <h3 style={{ margin: "0 0 16px 0", fontSize: fs * 1.355, color: "#10B981", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: fs * 1.5 }}>🎯</span>
                    Actividad Práctica
                  </h3>
                  <div style={{ background: "linear-gradient(135deg, #ECFDF5, #F0FDF4)", padding: 20, borderRadius: 12, border: "2px solid #10B98140" }}>
                    <p style={{ margin: "0 0 16px 0", fontSize: fs, lineHeight: 1.6, color: "#065F46" }}>
                      <strong>Desafío:</strong> Piensa en un creador que admires. Identifica sus constantes visuales:
                    </p>
                    <div style={{ display: "grid", gap: 12 }}>
                      {[
                        { icon: "🎨", text: "¿Qué 3 colores usa repetidamente?" },
                        { icon: "✍️", text: "¿Qué tipografía usa en sus títulos?" },
                        { icon: "📐", text: "¿Qué encuadre se repite en sus videos?" },
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
                            padding: 14,
                            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            borderRadius: 12,
                            border: "1px solid rgba(16, 185, 129, 0.2)",
                            boxShadow: "0 2px 8px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                          }}
                        >
                          <span style={{ fontSize: fs * 1.3 }}>{item.icon}</span>
                          <span style={{ fontSize: fs * 0.9, color: "#065F46", fontWeight: 500 }}>{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {(stepsItems.length > 0 || errorsItems.length > 0) && (
                <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                  <Card glow={primaryColor}>
                    {stepsItems.length > 0 ? (
                      <>
                        <h3 style={{ margin: "0 0 10px 0", fontSize: fs * 1.355 }}>{stepsTitle}</h3>
                        <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95 }}>
                          {stepsItems.map((text, index) => (
                            <li key={`s-${index}`} style={{ marginBottom: 6 }}>
                              {text}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    {errorsItems.length > 0 ? (
                      <>
                        <h4 style={{ margin: "14px 0 8px 0", color: primaryColor, fontSize: fs * 1.1 }}>{errorsTitle}</h4>
                        <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95 }}>
                          {errorsItems.map((text, index) => (
                            <li key={`e-${index}`} style={{ marginBottom: 6 }}>
                              {text}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </Card>
                </motion.div>
              )}

              {qaItems.length > 0 ? (
                <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                  <Card glow={primaryColor}>
                    <h3 style={{ margin: "0 0 10px 0", fontSize: fs * 1.355 }}>{qaTitle}</h3>
                    <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95 }}>
                      {qaItems.map((text, index) => (
                        <li key={`qa-${index}`} style={{ marginBottom: 6 }}>
                          {text}
                        </li>
                      ))}
                    </ul>
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
  topicTitle = "Pasos aplicables hoy + Checklist + Q&A",
  heroImage = "",
  layoutOption = "B",
  baseFontSize = 18,
  awarenessImage = "",
  considerationImage = "",
  conversionImage = "",
  postImage = "",
}: Page2Props) {
  void layoutOption
  void awarenessImage
  void considerationImage
  void conversionImage
  void postImage

  const fs = Math.max(12, baseFontSize || 18)

  const wrapper: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      minHeight: "100vh",
      display: "flex" as const,
      justifyContent: "flex-start",
      background,
      color: "#111",
      fontFamily:
        'Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji',
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

  const steps = DEFAULT_STEPS
  const checklist = DEFAULT_CHECKLIST
  const qaList = DEFAULT_QA

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm3s3-page2-shimmer-effects';
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
        .shimmer-title {
          background: linear-gradient(135deg, #0F62FE 0%, #3B82F6 25%, #60A5FA 50%, #3B82F6 75%, #0F62FE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-title 2.5s ease-in-out infinite;
          filter: drop-shadow(0 2px 8px rgba(15, 98, 254, 0.3));
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

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
              {/* Shimmer Title with Floating Effect */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                  className="shimmer-title floating"
                  style={{
                    margin: 0,
                    fontSize: fs * 3.0,
                    lineHeight: 1.15,
                    fontWeight: 900,
                  }}
                >
                  Pasos aplicables hoy + Checklist + Q&A
                </motion.h1>
                <motion.p
                  style={{
                    margin: "8px 0 0",
                    opacity: 0.9,
                    fontSize: fs * 1.4,
                    color: primaryColor,
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      color: primaryColor,
                      fontWeight: 700,
                    }}
                  >
                    ▌
                  </span>{" "}
                  Guía práctica para aplicar hoy
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

              {/* Interactive Steps */}
              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow="#10B981">
                  <h3
                    style={{
                      margin: "0 0 16px 0",
                      fontSize: fs * 1.355,
                      color: "#10B981",
                      display: "flex",
                      alignItems: "center",
                      gap: 12
                    }}
                  >
                    <span style={{ fontSize: fs * 1.5 }}>🎯</span>
                    3) Pasos aplicables hoy
                  </h3>
                  <div style={{ display: "grid", gap: 12 }}>
                    {steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 8 }}
                    style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          padding: 16,
                          background: `linear-gradient(135deg, #10B98108, #10B98103)`,
                          borderRadius: 12,
                          border: `2px solid #10B98130`,
                          cursor: "pointer",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, #10B981, #059669)`,
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: fs * 1.2,
                            fontWeight: 800,
                            flexShrink: 0,
                            boxShadow: `0 4px 12px #10B98130`
                          }}
                        >
                          {index + 1}
                        </div>
                        <p style={{ margin: 0, fontSize: fs * 1.05, lineHeight: 1.6, flex: 1 }}>
                          {step}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Interactive Checklist */}
              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow="#8B5CF6">
                  <h3
                    style={{
                      margin: "0 0 16px 0",
                      fontSize: fs * 1.355,
                      color: "#8B5CF6",
                      display: "flex",
                      alignItems: "center",
                      gap: 12
                    }}
                  >
                    <span style={{ fontSize: fs * 1.5 }}>✅</span>
                    Checklist express
                  </h3>
                  <div style={{ display: "grid", gap: 12 }}>
                    {checklist.map((item, index) => (
                      <InteractiveChecklistItem
                        key={index}
                        text={item}
                        fs={fs}
                        variant={index < 2 ? "success" : "error"}
                        index={index}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Q&A Flashcards */}
              <motion.div variants={itemVar} style={{ marginBottom: 12 }}>
                <Card glow="#3B82F6">
                  <h3
                    style={{
                      margin: "0 0 16px 0",
                      fontSize: fs * 1.355,
                      color: "#3B82F6",
                      display: "flex",
                      alignItems: "center",
                      gap: 12
                    }}
                  >
                    <span style={{ fontSize: fs * 1.5 }}>💡</span>
                    4) Q&A rápido
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                    {qaList.map(({ q, a }, index) => (
                      <GlossaryFlashcard 
                        key={index}
                        term={q}
                        definition={a}
                        fs={fs}
                      />
                    ))}
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

// Interactive Checklist Item Component
function InteractiveChecklistItem({ text, fs, variant, index }: { text: string; fs: number; variant: "success" | "error"; index: number }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isSuccess = variant === "success";
  const borderColor = isSuccess ? "#10B981" : "#8B5CF6";
  const glassBackground = isChecked 
    ? (isSuccess 
        ? "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.15))" 
        : "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.15))")
    : "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15))";
  const textColor = isSuccess ? "#10B981" : "#8B5CF6";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setIsChecked(!isChecked)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
                        style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: 14,
        borderRadius: 16,
        border: `1px solid ${isChecked ? borderColor : `${borderColor}30`}`,
        background: glassBackground,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        cursor: "pointer",
        userSelect: "none" as const,
        transition: "all 0.3s ease",
        boxShadow: isHovered
          ? `0 6px 20px ${borderColor}30, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
          : `0 2px 8px ${borderColor}10, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
        position: "relative" as const,
        overflow: "hidden" as const,
      }}
      whileHover={{ 
        scale: 1.02,
        x: 4,
        borderColor: borderColor,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glass shine effect */}
      {isHovered && (
        <div style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: "linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
          opacity: 0.4,
          transition: "opacity 0.3s ease",
          pointerEvents: "none"
        }} />
      )}
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
          border: `3px solid ${borderColor}`,
          background: isChecked 
            ? `linear-gradient(135deg, ${borderColor}, ${isSuccess ? "#059669" : "#7C3AED"})`
            : "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: isChecked 
            ? `0 4px 12px ${borderColor}30`
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
        zIndex: 1,
        position: "relative" as const,
      }}>
        {text}
      </p>
    </motion.div>
  );
}

// Flashcard Component for Q&A
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
        border: isFlipped 
          ? "1px solid rgba(255, 255, 255, 0.3)" 
          : "1px solid rgba(59, 130, 246, 0.2)",
        background: isFlipped 
          ? "linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.95))" 
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: 16,
        minHeight: 140,
        boxShadow: isHovered 
          ? "0 8px 32px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
          : "0 4px 16px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        display: "flex" as const,
        flexDirection: "column" as const,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center" as const,
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        position: "relative" as const,
        overflow: "hidden" as const,
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      animate={{
        scale: isFlipped ? 1 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      {/* Glass shine effect */}
      {!isFlipped && (
        <div style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: "linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
          opacity: isHovered ? 0.6 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none"
        }} />
      )}
      
      {!isFlipped ? (
        <>
          <strong style={{ 
            fontSize: fs * 0.95, 
            color: "#1E40AF", 
            marginBottom: 8,
            fontWeight: 800,
            lineHeight: 1.3,
            zIndex: 1
          }}>
            {term}
          </strong>
          <p style={{ 
            margin: 0, 
            fontSize: fs * 0.75, 
            opacity: 0.8, 
            fontStyle: "italic",
            color: "#3B82F6",
            zIndex: 1
          }}>
            👆 Toca para ver
          </p>
        </>
      ) : (
        <p style={{ 
          margin: 0, 
          fontSize: fs * 0.85, 
          lineHeight: 1.5, 
          color: "white",
          fontWeight: 500,
          zIndex: 1
        }}>
          {definition}
        </p>
      )}
              </motion.div>
  );
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
  videoSrc?: string
  videoPoster?: string
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: number, correctAnswer: number, isCorrect: boolean) => void
  onQuizComplete?: (score: number) => void
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
}

function Page3({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 50,
  title = "",
  topicTitle = "Constantes, tipografía, aire y consistencia — Opción múltiple (15)",
  layoutOption = "B",
  baseFontSize = 18,
  videoSrc = "https://www.youtube.com/embed/q8uePCWfC3c",
  videoPoster = "",
  onAnswerSubmit,
  onQuizComplete,
}: Page3Props) {
  void layoutOption
  const fs = Math.max(12, baseFontSize || 18)

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm3s3-page3-shimmer-effects';
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
        .shimmer-title-page3 {
          background: linear-gradient(135deg, #0F62FE 0%, #3B82F6 25%, #60A5FA 50%, #3B82F6 75%, #0F62FE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-title 2.5s ease-in-out infinite;
          filter: drop-shadow(0 2px 8px rgba(15, 98, 254, 0.3));
        }
        .floating-page3 {
          animation: float 3s ease-in-out infinite;
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
  const [selection, setSelection] = useState<(number | null)[]>(() => Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(() => Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(() => Array(total).fill(false))
  const [score, setScore] = useState(0)

  const q = DEFAULT_QUESTIONS[idx]
  const quizProgressPct = Math.round(((idx + 1) / total) * 100)
  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total

  const selectAndAdvance = (optionIndex: number) => {
    if (checked[idx]) return
    const isCorrect = optionIndex === q.correctIndex

    setSelection((prev) => {
      const next = [...prev]
      next[idx] = optionIndex
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

    if (isCorrect) setScore((value) => value + 1)

    // Track answer submission
    if (onAnswerSubmit) {
      onAnswerSubmit(idx, q.text, q.options[optionIndex], q.options[q.correctIndex], isCorrect)
    }

    setTimeout(() => {
      if (idx < total - 1) {
        setIdx((value) => value + 1)
      } else {
        // Quiz complete
        if (onQuizComplete) {
          onQuizComplete(score + (isCorrect ? 1 : 0))
        }
      }
    }, 650)
  }


  const optStyle = (active: boolean): React.CSSProperties => ({
    padding: "16px 18px",
    borderRadius: 14,
    border: active 
      ? "1px solid rgba(15, 98, 254, 0.4)" 
      : "1px solid rgba(15, 98, 254, 0.15)",
    background: active 
      ? "linear-gradient(135deg, rgba(15, 98, 254, 0.2), rgba(15, 98, 254, 0.12))" 
      : "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15))",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    fontWeight: 700,
    fontSize: fs * 1.0,
    letterSpacing: 0.2,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "left",
    boxShadow: active 
      ? "0 8px 32px rgba(15, 98, 254, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
      : "0 4px 16px rgba(15, 98, 254, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
    willChange: "transform",
    transformOrigin: "center",
    transition: "all 0.3s ease",
  })

  const feedback: React.ReactNode =
    checked[idx] && correct[idx] ? (
      <div style={{ color: "#0a7f35", fontWeight: 700 }}>✅ ¡Correcto!</div>
    ) : checked[idx] && !correct[idx] ? (
      <div style={{ color: "#b00020", fontWeight: 700 }}>
        ❌ Incorrecto. Respuesta: <strong>{q.options[q.correctIndex]}</strong>
      </div>
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
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={progressPercent}
          brandName={brandName}
          logoSrc={logoSrc || undefined}
        />
        <div style={{ ...container, paddingTop: 16, paddingBottom: 8 }}>
          <motion.div variants={containerVar} initial="hidden" animate="show">
            <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
              <motion.h1 
                className="shimmer-title-page3 floating-page3"
                style={{ 
                  margin: 0, 
                  fontSize: fs * 3.0, 
                  lineHeight: 1.15,
                  fontWeight: 900,
                }}
              >
                Tips de estilo y consistencia visual
              </motion.h1>
              <motion.p style={{ 
                margin: "8px 0 0", 
                opacity: 0.9, 
                fontSize: fs * 1.4,
                color: primaryColor,
                fontWeight: 600,
              }}>
                <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <Card glow={primaryColor}>
                  {videoSrc ? (
                    <div>
                      {videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be') ? (
                        <iframe
                          src={videoSrc}
                          title="Video de la sección"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{
                            width: "60%",
                            maxWidth: "800px",
                            height: "auto",
                            aspectRatio: "16 / 9",
                            display: "block" as const,
                            border: "none",
                            margin: "0 auto",
                          }}
                        />
                      ) : (
                        <video
                          src={videoSrc}
                          poster={videoPoster || undefined}
                          controls
                          playsInline
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block" as const,
                            borderRadius: 12,
                            outline: "none",
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        display: "flex" as const,
                        alignItems: "center" as const,
                        justifyContent: "center" as const,
                        borderRadius: 12,
                        border: "2px dashed rgba(0,0,0,0.12)",
                        background: "#fff",
                        padding: 16,
                        textAlign: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, marginBottom: 6, color: primaryColor, fontSize: fs * 1.05 }}>
                          Espacio para tu video
                        </div>
                        <div style={{ opacity: 0.7 }}>Sube tu archivo desde tu UI.</div>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>

              <motion.div variants={itemVar}>
                <div style={{
                  border: "1px solid rgba(15, 98, 254, 0.2)",
                  background: "linear-gradient(135deg, rgba(15, 98, 254, 0.1), rgba(15, 98, 254, 0.05))",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: "0 4px 20px rgba(15, 98, 254, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                }}>
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

                  <div style={{ margin: "10px 0 18px", lineHeight: 1.55, fontSize: fs * 1.4 }}>
                    <p style={{ margin: 0 }}>{q.text}</p>
                    {q.context ? (
                      <p style={{ margin: "6px 0 0", opacity: 0.8, fontSize: fs * 0.95 }}>{q.context}</p>
                    ) : null}
                  </div>

                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: 16,
                      marginBottom: 16,
                    }}
                  >
                    {q.options.map((option, index) => {
                      const active = selection[idx] === index
                      const disabled = !!checked[idx]
                      return (
                        <motion.div
                          key={index}
                          role="button"
                          onClick={() => (!disabled ? selectAndAdvance(index) : undefined)}
                          style={optStyle(active)}
                          whileHover={disabled ? {} : { scale: 0.9 }}
                          whileTap={disabled ? {} : { scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        >
                          {option}
                        </motion.div>
                      )
                    })}
                  </div>

                  <div style={{ marginBottom: 14 }}>{feedback}</div>

                  <div style={{ textAlign: "right" as const, opacity: 0.8, fontSize: fs * 0.95 }}>
                    {checked.filter(Boolean).length}/{total} respondidas
                  </div>

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
  title = "",
  topicTitle = "Ejercicio práctico: Define tus constantes visuales",
  layoutOption = "B",
  baseFontSize = 18,
}: Page4Props) {
  void layoutOption
  const fs = Math.max(12, baseFontSize || 18)

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm3s3-page4-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-page4 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-page4 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .shimmer-title-page4 {
          background: linear-gradient(135deg, #0F62FE 0%, #3B82F6 25%, #60A5FA 50%, #3B82F6 75%, #0F62FE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-title-page4 2.5s ease-in-out infinite;
          filter: drop-shadow(0 2px 8px rgba(15, 98, 254, 0.3));
        }
        .floating-page4 {
          animation: float-page4 3s ease-in-out infinite;
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

  const [palette, setPalette] = useState("")
  const [typography, setTypography] = useState("")
  const [framing, setFraming] = useState("")
  const [covers, setCovers] = useState("")
  const [identity, setIdentity] = useState("")

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
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                  className="shimmer-title-page4 floating-page4"
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontWeight: 900,
                  }}
                >
                  Ejercicio práctico: Define tus constantes visuales
                </motion.h1>
                <motion.p style={{ 
                  margin: "8px 0 0", 
                  opacity: 0.9, 
                  fontSize: fs * 1.4,
                  color: primaryColor,
                  fontWeight: 600,
                }}>
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </motion.p>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow="#8B5CF6">
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <span style={{ fontSize: fs * 2, fontWeight: 800 }}>🎨</span>
                    <div>
                      <h3 style={{ margin: 0, fontSize: fs * 1.5, color: "#8B5CF6", fontWeight: 800 }}>
                        Define tu guía de estilo personal
                      </h3>
                      <p style={{ margin: "4px 0 0", opacity: 0.8, fontSize: fs * 1.0 }}>
                        Completa cada sección para crear tu guía mínima de constantes visuales.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex" as const, flexDirection: "column" as const, gap: 20 }}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, fontWeight: 800, fontSize: fs * 1.1 }}>
                        <span style={{ fontSize: fs * 1.3 }}>🌈</span>
                        <span style={{ color: "#E11D48", textShadow: "0 2px 4px rgba(225, 29, 72, 0.2)" }}>1. PALETA DE COLORES</span>
                      </label>
                      <textarea
                        value={palette}
                        onChange={(e) => setPalette(e.target.value)}
                        placeholder="Ej: Base azul marino, apoyo gris claro, acento dorado. Me favorecen porque..."
                        rows={3}
                        style={{
                          width: "100%",
                          padding: 16,
                          borderRadius: 12,
                          border: `3px solid #E11D4830`,
                          background: `linear-gradient(135deg, #FEF7F7, #FFFFFF)`,
                          fontSize: fs,
                          fontFamily: "inherit",
                          resize: "vertical" as const,
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 12px rgba(225, 29, 72, 0.08)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#E11D48";
                          e.target.style.boxShadow = "0 8px 24px rgba(225, 29, 72, 0.15)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#E11D4830";
                          e.target.style.boxShadow = "0 4px 12px rgba(225, 29, 72, 0.08)";
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, fontWeight: 800, fontSize: fs * 1.1 }}>
                        <span style={{ fontSize: fs * 1.3 }}>🔤</span>
                        <span style={{ color: "#10B981", textShadow: "0 2px 4px rgba(16, 185, 129, 0.2)" }}>2. TIPOGRAFÍA</span>
                      </label>
                      <textarea
                        value={typography}
                        onChange={(e) => setTypography(e.target.value)}
                        placeholder="Ej: Montserrat para títulos, Inter para texto. Siempre en mayúsculas los títulos..."
                        rows={3}
                        style={{
                          width: "100%",
                          padding: 16,
                          borderRadius: 12,
                          border: `3px solid #10B98130`,
                          background: `linear-gradient(135deg, #F0FDF4, #FFFFFF)`,
                          fontSize: fs,
                          fontFamily: "inherit",
                          resize: "vertical" as const,
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.08)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#10B981";
                          e.target.style.boxShadow = "0 8px 24px rgba(16, 185, 129, 0.15)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#10B98130";
                          e.target.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.08)";
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, fontWeight: 800, fontSize: fs * 1.1 }}>
                        <span style={{ fontSize: fs * 1.3 }}>📸</span>
                        <span style={{ color: "#8B5CF6", textShadow: "0 2px 4px rgba(139, 92, 246, 0.2)" }}>3. ENCUADRE</span>
                      </label>
                      <textarea
                        value={framing}
                        onChange={(e) => setFraming(e.target.value)}
                        placeholder="Ej: Altura de ojos, fondo neutro, manos visibles a la altura del pecho..."
                        rows={3}
                        style={{
                          width: "100%",
                          padding: 16,
                          borderRadius: 12,
                          border: `3px solid #8B5CF630`,
                          background: `linear-gradient(135deg, #FAF5FF, #FFFFFF)`,
                          fontSize: fs,
                          fontFamily: "inherit",
                          resize: "vertical" as const,
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 12px rgba(139, 92, 246, 0.08)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#8B5CF6";
                          e.target.style.boxShadow = "0 8px 24px rgba(139, 92, 246, 0.15)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#8B5CF630";
                          e.target.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.08)";
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, fontWeight: 800, fontSize: fs * 1.1 }}>
                        <span style={{ fontSize: fs * 1.3 }}>📋</span>
                        <span style={{ color: "#F59E0B", textShadow: "0 2px 4px rgba(245, 158, 11, 0.2)" }}>4. REGLAS DE PORTADAS</span>
                      </label>
                      <textarea
                        value={covers}
                        onChange={(e) => setCovers(e.target.value)}
                        placeholder="Ej: Títulos de 4-6 palabras, verbo + beneficio, alto contraste, aire visual..."
                        rows={3}
                        style={{
                          width: "100%",
                          padding: 16,
                          borderRadius: 12,
                          border: `3px solid #F59E0B30`,
                          background: `linear-gradient(135deg, #FFFBEB, #FFFFFF)`,
                          fontSize: fs,
                          fontFamily: "inherit",
                          resize: "vertical" as const,
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 12px rgba(245, 158, 11, 0.08)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#F59E0B";
                          e.target.style.boxShadow = "0 8px 24px rgba(245, 158, 11, 0.15)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#F59E0B30";
                          e.target.style.boxShadow = "0 4px 12px rgba(245, 158, 11, 0.08)";
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, fontWeight: 800, fontSize: fs * 1.1 }}>
                        <span style={{ fontSize: fs * 1.3 }}>✨</span>
                        <span style={{ color: "#3B82F6", textShadow: "0 2px 4px rgba(59, 130, 246, 0.2)" }}>5. ¿POR QUÉ REFLEJA TU IDENTIDAD?</span>
                      </label>
                      <textarea
                        value={identity}
                        onChange={(e) => setIdentity(e.target.value)}
                        placeholder="Explica cómo estas elecciones reflejan quién eres y qué valores transmites..."
                        rows={3}
                        style={{
                          width: "100%",
                          padding: 16,
                          borderRadius: 12,
                          border: `3px solid #3B82F630`,
                          background: `linear-gradient(135deg, #EFF6FF, #FFFFFF)`,
                          fontSize: fs,
                          fontFamily: "inherit",
                          resize: "vertical" as const,
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.08)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#3B82F6";
                          e.target.style.boxShadow = "0 8px 24px rgba(59, 130, 246, 0.15)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#3B82F630";
                          e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.08)";
                        }}
                      />
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

function Page5({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 100,
  title = "",
  topicTitle = "Análisis de casos: Buenas y malas prácticas visuales",
  layoutOption = "B",
  baseFontSize = 18,
}: Page5Props) {
  void layoutOption
  const fs = Math.max(12, baseFontSize || 18)

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm3s3-page5-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-page5 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-page5 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .shimmer-title-page5 {
          background: linear-gradient(135deg, #0F62FE 0%, #3B82F6 25%, #60A5FA 50%, #3B82F6 75%, #0F62FE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-title-page5 2.5s ease-in-out infinite;
          filter: drop-shadow(0 2px 8px rgba(15, 98, 254, 0.3));
        }
        .floating-page5 {
          animation: float-page5 3s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  type CaseExample = {
    id: number
    scenario: string
    isGood: boolean
    why: string
    category: string
  }

  const cases: CaseExample[] = [
    {
      id: 1,
      scenario: "Usar 5 colores diferentes en cada portada para que se vea variado",
      isGood: false,
      why: "Rompe la consistencia visual. Es mejor usar siempre tu paleta de 3 colores (base, apoyo, acento) para crear reconocimiento.",
      category: "Paleta de colores"
    },
    {
      id: 2,
      scenario: "Usar siempre la misma tipografía en tus títulos con el mismo tamaño y peso",
      isGood: true,
      why: "Crea consistencia y reconocimiento inmediato. Tu audiencia identifica tu contenido al instante.",
      category: "Tipografía"
    },
    {
      id: 3,
      scenario: "Cambiar el fondo y encuadre en cada video para que no se vea monótono",
      isGood: false,
      why: "Dificulta el reconocimiento de marca. Un encuadre consistente (misma altura, fondo similar) genera familiaridad.",
      category: "Encuadre"
    },
    {
      id: 4,
      scenario: "Llenar toda la portada con texto para dar más información",
      isGood: false,
      why: "Saturación visual. Los títulos de 4-6 palabras con aire visual son más efectivos y legibles.",
      category: "Portadas"
    },
    {
      id: 5,
      scenario: "Usar prendas lisas y neutras que no compitan con tu mensaje",
      isGood: true,
      why: "Mantiene el foco en el contenido. Los estampados grandes o logotipos distraen la atención del mensaje educativo.",
      category: "Vestuario"
    },
    {
      id: 6,
      scenario: "Documentar tus constantes visuales en una guía breve que consultas antes de crear",
      isGood: true,
      why: "Facilita la consistencia y ahorra tiempo de decisión. Una guía clara reduce errores y mantiene tu identidad coherente.",
      category: "Organización"
    },
    {
      id: 7,
      scenario: "Usar filtros diferentes en cada foto para experimentar con estilos",
      isGood: false,
      why: "Genera incoherencia visual. Es mejor elegir un preset o estilo de edición y aplicarlo consistentemente.",
      category: "Edición"
    },
    {
      id: 8,
      scenario: "Aplicar títulos con verbo + beneficio en formato: 'Aprende X hoy'",
      isGood: true,
      why: "Claridad y acción. Esta estructura comunica valor inmediato y motiva al clic.",
      category: "Portadas"
    },
  ]

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, boolean | null>>({})
  const [revealedCases, setRevealedCases] = useState<Record<number, boolean>>({})

  const handleAnswer = (caseId: number, answer: boolean) => {
    setSelectedAnswers(prev => ({ ...prev, [caseId]: answer }))
    setRevealedCases(prev => ({ ...prev, [caseId]: true }))
  }

  const totalCases = cases.length
  const answeredCases = Object.keys(selectedAnswers).length
  const correctAnswers = cases.filter(c => selectedAnswers[c.id] === c.isGood).length
  const allAnswered = answeredCases === totalCases

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
      margin: "0 auto",
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
      <main style={{ width: "100%", display: "block" }}>
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                  className="shimmer-title-page5 floating-page5"
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontWeight: 900,
                  }}
                >
                  Análisis de casos: Buenas y malas prácticas visuales
                </motion.h1>
                <motion.p style={{ 
                  margin: "8px 0 0", 
                  opacity: 0.9, 
                  fontSize: fs * 1.4,
                  color: primaryColor,
                  fontWeight: 600,
                }}>
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> Evalúa cada escenario y aprende de las mejores prácticas
                </motion.p>
              </motion.div>

              {/* Instructions */}
              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow="#10B981">
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: fs * 2 }}>🎯</span>
                    <h3 style={{ margin: 0, fontSize: fs * 1.5, color: "#10B981", fontWeight: 800 }}>
                      Objetivo
                    </h3>
                  </div>
                  <p style={{ margin: "0 0 8px 0", opacity: 0.9, lineHeight: 1.6 }}>
                    Evalúa cada escenario y decide si es una <strong style={{ color: '#0a7f35' }}>buena práctica ✓</strong> o una{' '}
                    <strong style={{ color: '#b00020' }}>mala práctica ✗</strong> para mantener una guía mínima de estilo consistente.
                  </p>
                  <p style={{ margin: 0, opacity: 0.75, fontSize: fs * 0.95 }}>
                    Después de responder, verás la explicación de por qué es correcta o incorrecta.
                  </p>
                </Card>
              </motion.div>

              {/* Progress */}
              {answeredCases > 0 && (
              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow={primaryColor}>
                    <div style={{ display: "flex" as const, justifyContent: "space-between" as const, alignItems: "center" as const }}>
                      <div>
                        <strong style={{ fontSize: fs * 1.1 }}>Progreso:</strong> {answeredCases} / {totalCases} casos
                      </div>
                      {allAnswered && (
                        <div style={{ fontSize: fs * 1.1, fontWeight: 700, color: primaryColor }}>
                          Puntuación: {correctAnswers} / {totalCases} ({Math.round((correctAnswers / totalCases) * 100)}%)
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Cases */}
              {cases.map((caseItem, index) => {
                const answered = selectedAnswers[caseItem.id] !== undefined
                const userAnswer = selectedAnswers[caseItem.id]
                const isCorrect = userAnswer === caseItem.isGood
                const revealed = revealedCases[caseItem.id]

                // Color mapping for categories
                const categoryColors: Record<string, string> = {
                  "Paleta de colores": "#E11D48",
                  "Tipografía": "#10B981",
                  "Encuadre": "#8B5CF6",
                  "Portadas": "#F59E0B",
                  "Vestuario": "#3B82F6",
                  "Organización": "#06B6D4",
                  "Edición": "#EC4899"
                }
                const cardColor = categoryColors[caseItem.category] || primaryColor

                return (
                  <motion.div 
                    key={caseItem.id} 
                    variants={itemVar} 
                    style={{ marginBottom: 14 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card glow={answered && isCorrect ? '#10B981' : answered && !isCorrect ? '#EF4444' : cardColor}>
                      <div style={{ display: "flex" as const, alignItems: "flex-start" as const, gap: 14 }}>
                        <div 
                          style={{ 
                            minWidth: 40, 
                            height: 40, 
                            borderRadius: "50%", 
                            background: `linear-gradient(135deg, ${cardColor}, ${cardColor}CC)`, 
                            color: "#fff",
                            display: "flex" as const,
                            alignItems: "center" as const,
                            justifyContent: "center" as const,
                            fontWeight: 800,
                            fontSize: fs * 1.0,
                            boxShadow: `0 4px 12px ${cardColor}30`
                          }}
                        >
                          {index + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div 
                            style={{ 
                              fontSize: fs * 0.95, 
                              fontWeight: 800, 
                              color: cardColor, 
                              marginBottom: 8,
                              textTransform: "uppercase" as const,
                              letterSpacing: 0.8,
                              display: "flex",
                              alignItems: "center",
                              gap: 8
                            }}
                          >
                            <span style={{ fontSize: fs * 1.2 }}>
                              {caseItem.category === "Paleta de colores" && "🌈"}
                              {caseItem.category === "Tipografía" && "🔤"}
                              {caseItem.category === "Encuadre" && "📸"}
                              {caseItem.category === "Portadas" && "📋"}
                              {caseItem.category === "Vestuario" && "👔"}
                              {caseItem.category === "Organización" && "📊"}
                              {caseItem.category === "Edición" && "🎨"}
                            </span>
                            <span>{caseItem.category}</span>
                          </div>
                          <p style={{ margin: "0 0 16px 0", fontSize: fs * 1.05, lineHeight: 1.7, fontWeight: 500 }}>
                            {caseItem.scenario}
                          </p>

                          {!answered && (
                            <div style={{ display: "flex" as const, gap: 12 }}>
                              <motion.button
                                onClick={() => handleAnswer(caseItem.id, true)}
                                style={{
                                  padding: "12px 20px",
                                  borderRadius: 12,
                                  background: "#10B981",
                                  color: "#fff",
                                  border: "none",
                                  fontWeight: 700,
                                  fontSize: fs,
                                  cursor: "pointer",
                                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                ✓ Buena práctica
                              </motion.button>
                              <motion.button
                                onClick={() => handleAnswer(caseItem.id, false)}
                                style={{
                                  padding: "12px 20px",
                                  borderRadius: 12,
                                  background: "#ffffff",
                                  color: "#EF4444",
                                  border: "2px solid #EF4444",
                                  fontWeight: 700,
                                  fontSize: fs,
                                  cursor: "pointer",
                                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                ✗ Mala práctica
                              </motion.button>
                            </div>
                          )}

                          {revealed && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ 
                                marginTop: 16, 
                                padding: 16, 
                                borderRadius: 12,
                                background: isCorrect 
                                  ? 'linear-gradient(135deg, #F0FDF4, #DCFCE7)' 
                                  : 'linear-gradient(135deg, #FEF2F2, #FEE2E2)',
                                border: `2px solid ${isCorrect ? '#10B981' : '#EF4444'}`,
                                boxShadow: isCorrect 
                                  ? '0 4px 12px rgba(16, 185, 129, 0.15)' 
                                  : '0 4px 12px rgba(239, 68, 68, 0.15)'
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: isCorrect ? '#10B981' : '#EF4444' }}>
                                <span style={{ fontSize: fs * 1.5 }}>{isCorrect ? '✅' : '❌'}</span>
                                <strong style={{ fontSize: fs * 1.05 }}>
                                  {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                                </strong>
                              </div>
                              <div style={{ fontSize: fs * 0.95, lineHeight: 1.6, color: "#374151" }}>
                                <strong style={{ color: isCorrect ? '#059669' : '#DC2626' }}>Explicación:</strong> {caseItem.why}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                </Card>
              </motion.div>
                )
              })}

              {/* Final Summary */}
              {allAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  variants={itemVar}
                  style={{ marginTop: 20 }}
                >
                  <Card glow={primaryColor}>
                    <h3 style={{ margin: "0 0 12px 0", fontSize: fs * 1.3, color: primaryColor }}>
                      🎉 ¡Actividad completada!
                    </h3>
                    <p style={{ margin: "0 0 12px 0", fontSize: fs * 1.05, lineHeight: 1.6 }}>
                      Tu puntuación: <strong>{correctAnswers} / {totalCases}</strong> ({Math.round((correctAnswers / totalCases) * 100)}%)
                    </p>
                    <div 
                      style={{ 
                        padding: 14, 
                        borderRadius: 10, 
                        background: `${primaryColor}0F`,
                        fontSize: fs * 0.95,
                        lineHeight: 1.7
                      }}
                    >
                      <strong style={{ color: primaryColor }}>💡 Recuerda:</strong> Una guía mínima de estilo bien definida 
                      te ayuda a tomar decisiones rápidas y mantener coherencia visual. Documenta tus constantes 
                      (paleta, tipografía, encuadre, reglas de portadas) y consúltalas antes de crear cada pieza de contenido.
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

const M3S3_CONTENT: Record<number, React.ReactNode> = {
  1: <Page1 />,
  2: <Page2 />,
  3: <Page3 />,
  4: <Page4 />,
  5: <Page5 />,
}

export default M3S3_CONTENT

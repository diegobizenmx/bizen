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

function Page1({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 0,
  title = "",
  topicTitle = "Videos cortos y reels virales — gancho, mensaje y compartibilidad",
  introText = "",
  keyIdea = "En formatos cortos: gana en los primeros 3 segundos, explica una sola idea y diseña para que la gente quiera compartir.",
  whyTitle = "1) La batalla de los 3 segundos",
  whyBody = "En formatos cortos, el inicio decide todo. Usa ganchos: pregunta poderosa, dato sorpresa, promesa concreta o imagen llamativa. Evita introducciones largas.",
  whyExampleTitle = "Ganchos útiles",
  whyExampleText = "Pregunta poderosa · Dato sorpresa · Promesa concreta · Imagen llamativa.",
  glossaryTitle = "2) Una sola idea por video",
  glossaryItems = [
    "Explica o muestra una sola idea con lenguaje simple.",
    "Un ejemplo breve vale más que un concepto vago.",
    "La claridad permite que más personas lo entiendan a la primera.",
  ],
  stepsTitle = "3) ¿Por qué la gente comparte?",
  stepsItems = [
    "Emoción.",
    "Humor.",
    "Utilidad inmediata.",
    "Identificación.",
    "Diseña tu contenido para provocar al menos una de estas respuestas.",
  ],
  errorsTitle = "Errores comunes",
  errorsItems = [],
  qaTitle = "",
  qaItems = [],
  heroImage = "",
  layoutOption = "A",
  baseFontSize = 18,
}: Page1Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm4s3-page1-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-m4s3p1 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-m4s3p1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .shimmer-title-m4s3p1 {
          background: linear-gradient(135deg, #0F62FE 0%, #3B82F6 25%, #60A5FA 50%, #3B82F6 75%, #0F62FE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-title-m4s3p1 2.5s ease-in-out infinite;
          filter: drop-shadow(0 2px 8px rgba(15, 98, 254, 0.3));
        }
        .floating-m4s3p1 {
          animation: float-m4s3p1 3s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Interactive state
  const [selectedHook, setSelectedHook] = useState<number | null>(null)
  const [hoveredSharingReason, setHoveredSharingReason] = useState<number | null>(null)
  const [expandedIdea, setExpandedIdea] = useState<number | null>(null)

  // Interactive data
  const hooks = [
    { 
      type: "Pregunta poderosa", 
      example: "¿Sabías que el 90% de las personas...?", 
      color: "#FF6B6B",
      icon: "❓"
    },
    { 
      type: "Dato sorpresa", 
      example: "En solo 3 segundos, tu cerebro decide...", 
      color: "#4ECDC4",
      icon: "💡"
    },
    { 
      type: "Promesa concreta", 
      example: "Te voy a enseñar el secreto que...", 
      color: "#45B7D1",
      icon: "🎯"
    },
    { 
      type: "Imagen llamativa", 
      example: "Una imagen vale más que mil palabras", 
      color: "#96CEB4",
      icon: "📸"
    }
  ]

  const sharingReasons = [
    { reason: "Emoción", description: "Contenido que mueve el corazón", icon: "❤️", color: "#FF6B6B" },
    { reason: "Humor", description: "Risas que se contagian", icon: "😂", color: "#FFD93D" },
    { reason: "Utilidad inmediata", description: "Información que se puede usar ya", icon: "⚡", color: "#6BCF7F" },
    { reason: "Identificación", description: "Me siento reflejado en esto", icon: "👥", color: "#4D96FF" }
  ]

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
                  className="shimmer-title-m4s3p1 floating-m4s3p1"
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontWeight: 900,
                  }}
                >
                  Videos cortos y reels virales — gancho, mensaje y compartibilidad
                </motion.h1>
                <motion.p style={{ 
                  margin: "8px 0 0", 
                  opacity: 0.9, 
                  fontSize: fs * 1.4,
                  color: primaryColor,
                  fontWeight: 600,
                }}>
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> Estrategias para crear contenido viral
                </motion.p>
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
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      border: `2px solid ${primaryColor}44`,
                      background: `linear-gradient(135deg, ${primaryColor}0F, ${primaryColor}20)`,
                      color: "#111",
                      borderRadius: 20,
                      padding: 24,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                    }}
                    onClick={() => setExpandedIdea(expandedIdea === 0 ? null : 0)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <div style={{ 
                        fontSize: fs * 1.5, 
                        background: primaryColor, 
                        borderRadius: "50%", 
                        width: 40, 
                        height: 40, 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center" 
                      }}>
                        💡
                  </div>
                      <strong style={{ color: primaryColor, fontSize: fs * 1.1, fontWeight: 700 }}>
                        Idea clave
                      </strong>
                    </div>
                    <p style={{ margin: 0, opacity: 0.95, fontSize: fs, lineHeight: 1.5 }}>{keyIdea}</p>
                    
                    <AnimatePresence>
                      {expandedIdea === 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ marginTop: 16, paddingTop: 16, borderTop: `2px solid ${primaryColor}30` }}
                        >
                          <p style={{ margin: 0, fontSize: fs * 0.9, opacity: 0.8, fontStyle: "italic" }}>
                            💡 <strong>Tip:</strong> Esta es la regla de oro para videos cortos. Si no capturas la atención en 3 segundos, pierdes al 80% de tu audiencia.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ) : null}

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow={primaryColor}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: fs * 1.355, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: fs * 1.2 }}>⚡</span>
                    {whyTitle}
                  </h3>
                  <p style={{ margin: "0 0 20px 0", opacity: 0.95, lineHeight: 1.55 }}>{whyBody}</p>
                  
                  <div style={{ marginTop: 16 }}>
                    <strong style={{ color: primaryColor, display: "block" as const, marginBottom: 16, fontSize: fs * 1.1 }}>
                      {whyExampleTitle} - Haz clic para ver ejemplos
                    </strong>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                      {hooks.map((hook, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedHook(selectedHook === index ? null : index)}
                          style={{
                            padding: 16,
                            borderRadius: 12,
                            background: selectedHook === index ? hook.color : `${hook.color}20`,
                            border: `2px solid ${selectedHook === index ? hook.color : `${hook.color}40`}`,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: selectedHook === index ? `0 8px 25px ${hook.color}40` : "0 4px 15px rgba(0,0,0,0.1)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <span style={{ fontSize: fs * 1.2 }}>{hook.icon}</span>
                            <strong style={{ 
                              color: selectedHook === index ? "#fff" : hook.color, 
                              fontSize: fs * 0.9,
                              fontWeight: 600
                            }}>
                              {hook.type}
                            </strong>
                          </div>
                          
                          <AnimatePresence>
                            {selectedHook === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ 
                                  color: "#fff", 
                                  fontSize: fs * 0.85, 
                                  fontStyle: "italic",
                                  lineHeight: 1.4
                                }}
                              >
                                "{hook.example}"
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow={primaryColor}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: fs * 1.355, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: fs * 1.2 }}>🎯</span>
                    {glossaryTitle}
                  </h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {glossaryItems.map((item, i) => (
                      <motion.div
                        key={`g-${i}`}
                        whileHover={{ x: 8, scale: 1.02 }}
                        onClick={() => setExpandedIdea(expandedIdea === i + 1 ? null : i + 1)}
                        style={{
                          padding: 16,
                          borderRadius: 12,
                          background: expandedIdea === i + 1 ? `${primaryColor}15` : `${primaryColor}08`,
                          border: `2px solid ${expandedIdea === i + 1 ? primaryColor : `${primaryColor}30`}`,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          position: "relative" as const,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: primaryColor,
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: fs * 0.8,
                            fontWeight: 700,
                            flexShrink: 0
                          }}>
                            {i + 1}
                          </div>
                          <p style={{ 
                            margin: 0, 
                            fontSize: fs * 0.95, 
                            fontWeight: 500,
                            lineHeight: 1.4,
                            flex: 1
                          }}>
                            {item}
                          </p>
                          <motion.div
                            animate={{ rotate: expandedIdea === i + 1 ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ fontSize: fs * 1.2, color: primaryColor }}
                          >
                            ▼
                          </motion.div>
                        </div>
                        
                        <AnimatePresence>
                          {expandedIdea === i + 1 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ 
                                marginTop: 12, 
                                paddingTop: 12, 
                                borderTop: `1px solid ${primaryColor}30`,
                                fontSize: fs * 0.85,
                                color: "#666",
                                fontStyle: "italic"
                              }}
                            >
                              {i === 0 && "💡 Ejemplo: En lugar de 'Te voy a enseñar sobre marketing digital', di 'Te voy a enseñar el truco de 30 segundos que duplicó mis ventas'"}
                              {i === 1 && "💡 Ejemplo: En lugar de explicar qué es el engagement, muestra un video donde alguien comenta '¡Esto es exactamente lo que necesitaba!'"}
                              {i === 2 && "💡 Ejemplo: Si tu video es sobre cocina, que hasta un niño de 8 años pueda seguir los pasos sin confundirse"}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {(stepsItems.length > 0 || errorsItems.length > 0) && (
                <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                  <Card glow={primaryColor}>
                    {stepsItems.length > 0 && (
                      <>
                        <h3 style={{ margin: "0 0 20px 0", fontSize: fs * 1.355, display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontSize: fs * 1.2 }}>📤</span>
                          {stepsTitle}
                        </h3>
                        
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
                          {sharingReasons.map((reason, i) => (
                            <motion.div
                              key={`s-${i}`}
                              whileHover={{ 
                                scale: 1.05, 
                                y: -6,
                                boxShadow: `0 12px 30px ${reason.color}30`
                              }}
                              onHoverStart={() => setHoveredSharingReason(i)}
                              onHoverEnd={() => setHoveredSharingReason(null)}
                              style={{
                                padding: 20,
                                borderRadius: 16,
                                background: hoveredSharingReason === i 
                                  ? `linear-gradient(135deg, ${reason.color}20, ${reason.color}10)` 
                                  : `linear-gradient(135deg, ${reason.color}15, ${reason.color}05)`,
                                border: `2px solid ${hoveredSharingReason === i ? reason.color : `${reason.color}40`}`,
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                position: "relative" as const,
                                overflow: "hidden" as const,
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                <div style={{
                                  fontSize: fs * 1.5,
                                  background: reason.color,
                                  borderRadius: "50%",
                                  width: 40,
                                  height: 40,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow: `0 4px 15px ${reason.color}40`
                                }}>
                                  {reason.icon}
                                </div>
                                <strong style={{ 
                                  color: reason.color, 
                                  fontSize: fs * 1.0,
                                  fontWeight: 700
                                }}>
                                  {reason.reason}
                                </strong>
                              </div>
                              
                              <p style={{ 
                                margin: 0, 
                                fontSize: fs * 0.9, 
                                color: "#666",
                                lineHeight: 1.4,
                                fontStyle: "italic"
                              }}>
                                {reason.description}
                              </p>
                              
                              {i === 4 && (
                                <div style={{
                                  marginTop: 12,
                                  padding: 12,
                                  background: `${primaryColor}10`,
                                  borderRadius: 8,
                                  border: `1px solid ${primaryColor}30`
                                }}>
                                  <p style={{ 
                                    margin: 0, 
                                    fontSize: fs * 0.85, 
                                    color: primaryColor,
                                    fontWeight: 600,
                                    textAlign: "center" as const
                                  }}>
                                    💡 {stepsItems[i]}
                                  </p>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}

                    {errorsItems.length > 0 && (
                      <>
                        <h4 style={{ margin: "14px 0 8px 0", color: primaryColor, fontSize: fs * 1.1 }}>{errorsTitle}</h4>
                        <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95 }}>
                          {errorsItems.map((t, i) => (
                            <li key={`e-${i}`} style={{ marginBottom: 6 }}>
                              {t}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </Card>
                </motion.div>
              )}

              {qaItems.length > 0 && (
                <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                  <Card glow={primaryColor}>
                    <h3 style={{ margin: "0 0 10px 0", fontSize: fs * 1.355 }}>{qaTitle}</h3>
                    <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95 }}>
                      {qaItems.map((t, i) => (
                        <li key={`qa-${i}`} style={{ marginBottom: 6 }}>
                          {t}
                        </li>
                      ))}
                    </ul>
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
  layoutOption?: LayoutOption
  baseFontSize?: number
}

function Page2({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 25,
  title = "",
  topicTitle = "Claves para potenciar alcance y compartir",
  layoutOption = "B",
  baseFontSize = 18,
}: Page2Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm4s3-page2-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-m4s3p2 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-m4s3p2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .shimmer-title-m4s3p2 {
          background: linear-gradient(135deg, #0F62FE 0%, #3B82F6 25%, #60A5FA 50%, #3B82F6 75%, #0F62FE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-title-m4s3p2 2.5s ease-in-out infinite;
          filter: drop-shadow(0 2px 8px rgba(15, 98, 254, 0.3));
        }
        .floating-m4s3p2 {
          animation: float-m4s3p2 3s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Interactive state
  const [selectedTrend, setSelectedTrend] = useState<number | null>(null)
  const [selectedCTA, setSelectedCTA] = useState<number | null>(null)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)

  // Interactive data
  const trends = [
    { 
      title: "Observa qué funciona", 
      description: "Identifica tendencias, audios y formatos populares en tu nicho",
      icon: "👀",
      color: "#FF6B6B",
      examples: ["Audios virales", "Formatos de video trending", "Hashtags populares", "Horarios de mayor engagement"]
    },
    { 
      title: "Adáptalo con tu voz", 
      description: "No copies; usa la tendencia como base y añade tu estilo único",
      icon: "🎨",
      color: "#4ECDC4",
      examples: ["Tu perspectiva personal", "Tu tono de voz", "Tu experiencia", "Tu audiencia específica"]
    },
    { 
      title: "Sé rápido", 
      description: "Las tendencias tienen vida corta; actúa mientras están en auge",
      icon: "⚡",
      color: "#45B7D1",
      examples: ["Primeras 24-48 horas", "Máximo 1 semana", "Monitorea el engagement", "Aprovecha el momentum"]
    }
  ]

  const ctaExamples = [
    { text: "Guarda este post para consultarlo después", type: "Guardar", icon: "💾", color: "#96CEB4" },
    { text: "Comparte con alguien que necesite esto", type: "Compartir", icon: "📤", color: "#FFD93D" },
    { text: "Deja un comentario con tu opinión", type: "Comentar", icon: "💬", color: "#FF9FF3" }
  ]

  const sharingElements = [
    { element: "Humor", icon: "😂", color: "#FFD93D", description: "Risas que se contagian" },
    { element: "Inspiración", icon: "✨", color: "#FF6B6B", description: "Contenido que motiva" },
    { element: "Utilidad", icon: "⚡", color: "#4ECDC4", description: "Información práctica" },
    { element: "Identificación", icon: "👥", color: "#45B7D1", description: "Me siento reflejado" }
  ]

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
                  className="shimmer-title-m4s3p2 floating-m4s3p2"
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontWeight: 900,
                  }}
                >
                  Claves para potenciar alcance y compartir
                </motion.h1>
                <motion.p style={{ 
                  margin: "8px 0 0", 
                  opacity: 0.9, 
                  fontSize: fs * 1.4,
                  color: primaryColor,
                  fontWeight: 600,
                }}>
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> Estrategias para maximizar tu alcance
                </motion.p>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow={primaryColor}>
                  <h3 style={{ margin: "0 0 20px 0", fontSize: fs * 1.355, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: fs * 1.2 }}>📤</span>
                    4) Diseñar para compartir
                  </h3>
                  
                  <p style={{ margin: "0 0 20px 0", opacity: 0.95, lineHeight: 1.55, fontSize: fs * 1.05 }}>
                    Los videos que se comparten masivamente no son casualidad. Diseña tu contenido para provocar una reacción 
                    emocional o para ofrecer utilidad inmediata.
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                    {sharingElements.map((element, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -4,
                          boxShadow: `0 12px 30px ${element.color}30`
                        }}
                        onHoverStart={() => setHoveredElement(element.element)}
                        onHoverEnd={() => setHoveredElement(null)}
                        style={{
                          padding: 20,
                          borderRadius: 16,
                          background: hoveredElement === element.element 
                            ? `linear-gradient(135deg, ${element.color}20, ${element.color}10)` 
                            : `linear-gradient(135deg, ${element.color}15, ${element.color}05)`,
                          border: `2px solid ${hoveredElement === element.element ? element.color : `${element.color}40`}`,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          textAlign: "center" as const,
                        }}
                      >
                        <div style={{ fontSize: fs * 2, marginBottom: 8 }}>
                          {element.icon}
                        </div>
                        <h4 style={{ 
                          margin: "0 0 8px 0", 
                          color: element.color, 
                          fontSize: fs * 1.0,
                          fontWeight: 700
                        }}>
                          {element.element}
                        </h4>
                        <p style={{ 
                          margin: 0, 
                          fontSize: fs * 0.85, 
                          color: "#666",
                          fontStyle: "italic"
                        }}>
                          {element.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div style={{ 
                    marginTop: 20, 
                    padding: 16, 
                    background: `${primaryColor}08`, 
                    borderRadius: 12,
                    border: `2px solid ${primaryColor}20`
                  }}>
                    <p style={{ 
                      margin: 0, 
                      fontSize: fs * 0.95, 
                      color: primaryColor,
                      fontWeight: 600,
                      textAlign: "center" as const
                    }}>
                      💡 Si tu video hace reír, inspira, enseña algo útil o genera identificación ("esto me pasó a mí"), 
                      aumentas las probabilidades de que lo compartan.
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow={primaryColor}>
                  <h3 style={{ margin: "0 0 20px 0", fontSize: fs * 1.355, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: fs * 1.2 }}>📈</span>
                    5) Tendencias y formatos populares
                  </h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {trends.map((trend, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 8, scale: 1.02 }}
                        onClick={() => setSelectedTrend(selectedTrend === index ? null : index)}
                        style={{
                          padding: 20,
                          borderRadius: 16,
                          background: selectedTrend === index ? `${trend.color}15` : `${trend.color}08`,
                          border: `2px solid ${selectedTrend === index ? trend.color : `${trend.color}30`}`,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          position: "relative" as const,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          <div style={{
                            fontSize: fs * 1.5,
                            background: trend.color,
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 4px 15px ${trend.color}40`,
                            flexShrink: 0
                          }}>
                            {trend.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ 
                              margin: "0 0 8px 0", 
                              color: trend.color, 
                              fontSize: fs * 1.1,
                              fontWeight: 700
                            }}>
                              {trend.title}
                            </h4>
                            <p style={{ 
                              margin: 0, 
                              fontSize: fs * 0.95, 
                              lineHeight: 1.4,
                              color: "#374151"
                            }}>
                              {trend.description}
                            </p>
                          </div>
                          <motion.div
                            animate={{ rotate: selectedTrend === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ fontSize: fs * 1.2, color: trend.color }}
                          >
                            ▼
                          </motion.div>
                        </div>
                        
                        <AnimatePresence>
                          {selectedTrend === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ 
                                marginTop: 16, 
                                paddingTop: 16, 
                                borderTop: `2px solid ${trend.color}30`
                              }}
                            >
                              <p style={{ 
                                margin: "0 0 12px 0", 
                                fontSize: fs * 0.9, 
                                color: "#666",
                                fontWeight: 600
                              }}>
                                Ejemplos prácticos:
                              </p>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                {trend.examples.map((example, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      padding: "6px 12px",
                                      background: `${trend.color}20`,
                                      color: trend.color,
                                      borderRadius: 20,
                                      fontSize: fs * 0.8,
                                      fontWeight: 500,
                                      border: `1px solid ${trend.color}40`
                                    }}
                                  >
                                    {example}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow={primaryColor}>
                  <h3 style={{ margin: "0 0 20px 0", fontSize: fs * 1.355, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: fs * 1.2 }}>🎯</span>
                    6) CTA (Call To Action) claro
                  </h3>
                  
                  <p style={{ margin: "0 0 20px 0", opacity: 0.95, lineHeight: 1.55, fontSize: fs * 1.05 }}>
                    Al final de tu video, invita a la acción de forma específica:
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {ctaExamples.map((cta, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02, x: 8 }}
                        onClick={() => setSelectedCTA(selectedCTA === index ? null : index)}
                        style={{
                          padding: 20,
                          borderRadius: 16,
                          background: selectedCTA === index ? `${cta.color}15` : `${cta.color}08`,
                          border: `2px solid ${selectedCTA === index ? cta.color : `${cta.color}30`}`,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          position: "relative" as const,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          <div style={{
                            fontSize: fs * 1.2,
                            background: cta.color,
                            borderRadius: "50%",
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 4px 15px ${cta.color}40`,
                            flexShrink: 0
                          }}>
                            {cta.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ 
                              display: "flex", 
                              alignItems: "center", 
                              gap: 12, 
                              marginBottom: 8 
                            }}>
                              <span style={{ 
                                fontSize: fs * 0.8, 
                                color: cta.color, 
                                fontWeight: 600,
                                background: `${cta.color}20`,
                                padding: "4px 8px",
                                borderRadius: 12
                              }}>
                                {cta.type}
                              </span>
                            </div>
                            <p style={{ 
                              margin: 0, 
                              fontSize: fs * 0.95, 
                              lineHeight: 1.4,
                              color: "#374151",
                              fontStyle: "italic"
                            }}>
                              "{cta.text}"
                            </p>
                          </div>
                          <motion.div
                            animate={{ rotate: selectedCTA === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ fontSize: fs * 1.2, color: cta.color }}
                          >
                            ▼
                          </motion.div>
                        </div>
                        
                        <AnimatePresence>
                          {selectedCTA === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ 
                                marginTop: 16, 
                                paddingTop: 16, 
                                borderTop: `2px solid ${cta.color}30`
                              }}
                            >
                              <div style={{ 
                                padding: 16, 
                                background: `${cta.color}10`, 
                                borderRadius: 12,
                                border: `1px solid ${cta.color}20`
                              }}>
                                <p style={{ 
                                  margin: "0 0 8px 0", 
                                  fontSize: fs * 0.9, 
                                  color: cta.color,
                                  fontWeight: 600
                                }}>
                                  💡 Por qué funciona:
                                </p>
                                <p style={{ 
                                  margin: 0, 
                                  fontSize: fs * 0.85, 
                                  color: "#666",
                                  lineHeight: 1.4
                                }}>
                                  {index === 0 && "Crea valor a largo plazo y aumenta el engagement orgánico"}
                                  {index === 1 && "Amplifica tu alcance y genera recomendaciones de boca en boca"}
                                  {index === 2 && "Fomenta la interacción y construye una comunidad activa"}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>

                  <div style={{ 
                    marginTop: 20, 
                    padding: 16, 
                    background: `${primaryColor}08`, 
                    borderRadius: 12,
                    border: `2px solid ${primaryColor}20`
                  }}>
                    <p style={{ 
                      margin: 0, 
                      fontSize: fs * 0.95, 
                      color: primaryColor,
                      fontWeight: 600,
                      textAlign: "center" as const
                    }}>
                      🎯 Un CTA concreto aumenta interacción y visibilidad.
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  style={{
                    border: `2px solid ${primaryColor}44`,
                    background: `linear-gradient(135deg, ${primaryColor}0F, ${primaryColor}20)`,
                    color: "#111",
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ 
                      fontSize: fs * 1.5, 
                      background: primaryColor, 
                      borderRadius: "50%", 
                      width: 50, 
                      height: 50, 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center" 
                    }}>
                      📋
                    </div>
                    <strong style={{ color: primaryColor, fontSize: fs * 1.2, fontWeight: 700 }}>
                    Resumen rápido
                  </strong>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 12,
                      padding: 12,
                      background: `${primaryColor}08`,
                      borderRadius: 12,
                      border: `1px solid ${primaryColor}20`
                    }}>
                      <div style={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: "50%", 
                        background: "#FF6B6B",
                        flexShrink: 0
                      }} />
                      <span style={{ fontSize: fs * 0.95, fontWeight: 600 }}>Gancho potente en 3 segundos</span>
                    </div>
                    
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 12,
                      padding: 12,
                      background: `${primaryColor}08`,
                      borderRadius: 12,
                      border: `1px solid ${primaryColor}20`
                    }}>
                      <div style={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: "50%", 
                        background: "#4ECDC4",
                        flexShrink: 0
                      }} />
                      <span style={{ fontSize: fs * 0.95, fontWeight: 600 }}>Una idea clara y simple</span>
                    </div>
                    
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 12,
                      padding: 12,
                      background: `${primaryColor}08`,
                      borderRadius: 12,
                      border: `1px solid ${primaryColor}20`
                    }}>
                      <div style={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: "50%", 
                        background: "#45B7D1",
                        flexShrink: 0
                      }} />
                      <span style={{ fontSize: fs * 0.95, fontWeight: 600 }}>Emoción o utilidad que motive compartir</span>
                    </div>
                    
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 12,
                      padding: 12,
                      background: `${primaryColor}08`,
                      borderRadius: 12,
                      border: `1px solid ${primaryColor}20`
                    }}>
                      <div style={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: "50%", 
                        background: "#96CEB4",
                        flexShrink: 0
                      }} />
                      <span style={{ fontSize: fs * 0.95, fontWeight: 600 }}>CTA específico al final</span>
                    </div>
                  </div>
                  
                  <div style={{ 
                    marginTop: 16, 
                    padding: 16, 
                    background: `${primaryColor}15`, 
                    borderRadius: 12,
                    border: `2px solid ${primaryColor}30`
                  }}>
                    <p style={{ 
                      margin: 0, 
                      fontSize: fs * 0.9, 
                      color: primaryColor,
                      fontWeight: 600,
                      textAlign: "center" as const,
                      fontStyle: "italic"
                    }}>
                      ✨ Sigue esta fórmula y aumenta significativamente el alcance de tus videos
                  </p>
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

function Placeholder({ label }: { label: string }) {
  const primaryColor = "#0F62FE";
  const background = "#FFFFFF";
  return (
    <div style={{ width: "100%", minHeight: "100vh", background }}><SectionPageHeader 
        primaryColor={primaryColor} 
        progress={25} 
        brandName="BIZEN"
        logoSrc="/bizen-mondragonlogo.png"
      />
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2 style={{ margin: 0 }}>{label}</h2>
        <p style={{ marginTop: 8, color: "#64748b" }}>Contenido en construcción.</p>
      </div>
    </div>
  )
}

/**
 * Sección 2 · Quiz de opción múltiple (15) — React puro
 * - Sin Framer property controls ni botonera inferior ni botones de navegación
 * - Auto-check + auto-next: al hacer clic en una opción se corrige y avanza
 * - Barra superior NO sticky con % "breathing" a la izquierda de la barra
 * - Video opcional
 */

/** 15 preguntas de Verdadero/Falso */
const QUESTIONS: { text: string; options: string[]; correctIndex: number }[] = [
  { text: "1. En los primeros 3 segundos de un video corto es crucial captar la atención del espectador.", options: ["Verdadero", "Falso"], correctIndex: 0 },
  { text: "2. Un video viral se caracteriza por ser muy largo y complejo.", options: ["Verdadero", "Falso"], correctIndex: 1 },
  { text: "3. Un gancho es una frase o imagen que atrapa la atención inmediatamente.", options: ["Verdadero", "Falso"], correctIndex: 0 },
  { text: "4. Los mensajes sencillos se entienden más rápido que los complejos.", options: ["Verdadero", "Falso"], correctIndex: 0 },
  { text: "5. Las emociones de alegría y sorpresa impulsan más la interacción que la indiferencia.", options: ["Verdadero", "Falso"], correctIndex: 0 },
  { text: "6. Para aprovechar una tendencia debes copiarla exactamente igual.", options: ["Verdadero", "Falso"], correctIndex: 1 },
  { text: "7. Los retos y challenges ayudan a crear comunidad y viralidad.", options: ["Verdadero", "Falso"], correctIndex: 0 },
  { text: "8. Sin un inicio llamativo, es probable que la audiencia abandone el video rápidamente.", options: ["Verdadero", "Falso"], correctIndex: 0 },
  { text: "9. La gente comparte videos cuando siente emoción o valor inmediato.", options: ["Verdadero", "Falso"], correctIndex: 0 },
  { text: "10. Ser aburrido o confuso puede arruinar el potencial viral de un video.", options: ["Verdadero", "Falso"], correctIndex: 0 },
  { text: "11. CTA significa 'Call To Action' o invitación a actuar.", options: ["Verdadero", "Falso"], correctIndex: 0 },
  { text: "12. Para detectar tendencias conviene ignorar el contenido popular.", options: ["Verdadero", "Falso"], correctIndex: 1 },
  { text: "13. Los videos largos y complejos atraen más en redes sociales.", options: ["Verdadero", "Falso"], correctIndex: 1 },
  { text: "14. Para diferenciarte conviene ser original y auténtico.", options: ["Verdadero", "Falso"], correctIndex: 0 },
  { text: "15. La viralidad depende solo de la suerte.", options: ["Verdadero", "Falso"], correctIndex: 1 },
]

type SectionMCProps = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  layoutOption?: "A" | "B"
  baseFontSize?: number
  videoSrc?: string
  videoPoster?: string
  // Quiz tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: number | null, correctAnswer: number, isCorrect: boolean) => void
  onQuizComplete?: (score: number) => void
  isAlreadyCompleted?: boolean
  completedScore?: number
}

function SectionMC({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 50,
  title = "",
  topicTitle = "Ganchos, viralidad, CTA y tendencias (15 preguntas)",
  layoutOption = "B",
  baseFontSize = 18,
  videoSrc = "",
  videoPoster = "",
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: SectionMCProps) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm4s3-sectionmc-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-m4s3p3 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-m4s3p3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .shimmer-title-m4s3p3 {
          background: linear-gradient(135deg, #0F62FE 0%, #3B82F6 25%, #60A5FA 50%, #3B82F6 75%, #0F62FE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-title-m4s3p3 2.5s ease-in-out infinite;
          filter: drop-shadow(0 2px 8px rgba(15, 98, 254, 0.3));
        }
        .floating-m4s3p3 {
          animation: float-m4s3p3 3s ease-in-out infinite;
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
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isA]
  )

  const total = QUESTIONS.length
  const [idx, setIdx] = React.useState(0)
  const [selection, setSelection] = React.useState<(number | null)[]>(
    Array(total).fill(null)
  )
  const [checked, setChecked] = React.useState<boolean[]>(Array(total).fill(false))
  const [correct, setCorrect] = React.useState<boolean[]>(Array(total).fill(false))
  const [score, setScore] = React.useState(0)

  const q = QUESTIONS[idx]
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
      textAlign: "left" as const,
      boxShadow,
    transformOrigin: "center",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative" as const,
      overflow: "hidden" as const,
    }
  }

  // Auto-check + auto-next
  const handleOptionClick = (optIndex: number) => {
    if (checked[idx]) return

    const isCorrect = optIndex === q.correctIndex

    setSelection((prev) => {
      const next = [...prev]
      next[idx] = optIndex
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
      console.log(`M4S3P3: Submitting answer ${idx}: ${optIndex}, correct=${q.correctIndex}, isCorrect=${isCorrect}`)
      onAnswerSubmit(idx, q.text, q.options[optIndex], q.options[q.correctIndex], isCorrect)
    }

    // Pequeño delay para ver el feedback y avanzar
    if (idx < total - 1) {
      setTimeout(() => {
        setIdx((i) => i + 1)
      }, 220)
    } else {
      // Last question - complete quiz after delay
      console.log("M4S3P3: Last question answered, completing quiz with score:", newScore)
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
      <div style={wrapper}>
        <main style={{ width: "100%", display: "flex", flexDirection: "column", flex: 1, minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...container, textAlign: "center", paddingTop: 60, maxWidth: 600 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              style={{
                padding: "48px 40px",
                background: "linear-gradient(135deg, #F8FAFC, #E2E8F0)",
                borderRadius: 24,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                border: `3px solid ${primaryColor}`,
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                style={{ fontSize: 80, marginBottom: 24 }}
              >
                🏆
              </motion.div>
              
              <h2 style={{
                fontSize: fs * 2.2,
                fontWeight: 800,
                marginBottom: 16,
                color: "#1f2937",
                background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}CC)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Quiz Completado
              </h2>
              
              <p style={{
                fontSize: fs * 1.2,
                color: "#6B7280",
                marginBottom: 32,
                lineHeight: 1.5,
              }}>
                Ya completaste este quiz. Los quizzes solo pueden realizarse una vez.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  padding: "24px 32px",
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}CC)`,
                  borderRadius: 16,
                  marginBottom: 24,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
              >
                <div style={{
                  fontSize: fs * 1.0,
                  color: "#fff",
                  marginBottom: 8,
                  fontWeight: 600,
                }}>
                  Tu Puntuación
              </div>
                <div style={{
                  fontSize: fs * 2.5,
                  fontWeight: 800,
                  color: "#fff",
                }}>
                  {completedScore ?? "?"} / {total}
            </div>
                <div style={{
                  fontSize: fs * 0.9,
                  color: "rgba(255,255,255,0.8)",
                  marginTop: 8,
                }}>
                  {completedScore === total ? "¡Perfecto! 🎉" : 
                   (completedScore ?? 0) >= total * 0.8 ? "¡Muy bien! 👏" :
                   (completedScore ?? 0) >= total * 0.6 ? "¡Bien! 👍" : "¡Sigue practicando! 💪"}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  padding: "16px 24px",
                  background: "rgba(0,0,0,0.05)",
                  borderRadius: 12,
                  fontSize: fs * 1.0,
                  color: "#6B7280",
                }}
              >
                ✨ Continúa con el siguiente contenido
              </motion.div>
            </motion.div>
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

        {/* Contenido */}
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {/* Título + Tema */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                  className="shimmer-title-m4s3p3 floating-m4s3p3"
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontWeight: 900,
                  }}
                >
                  Quiz Verdadero/Falso - Ganchos, viralidad, CTA y tendencias
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

              {/* Video (opcional) */}
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
                        <div
                          style={{
                            fontWeight: 800,
                            marginBottom: 6,
                            color: primaryColor,
                            fontSize: fs * 1.05,
                          }}
                        >
                          Espacio para tu video
                        </div>
                        <div style={{ opacity: 0.7 }}>
                          Sube tu archivo en tu UI (prop <b>videoSrc</b>).
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>

              {/* Quiz Opción múltiple */}
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
                        <strong style={{ fontSize: fs * 1.2, color: "#1f2937", display: "block" as const }}>
                          Pregunta {Math.min(idx + 1, total)} de {total}
                    </strong>
                        <span style={{ fontSize: fs * 0.9, color: "#6B7280" }}>
                          Quiz de Videos Virales
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
                  <div style={{ marginBottom: 32 }}>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        margin: "0 0 32px 0",
                        fontSize: fs * 1.6,
                        lineHeight: 1.4,
                        fontWeight: 700,
                        color: "#1f2937",
                        textAlign: "center" as const,
                        padding: "0 20px",
                      }}
                    >
                      {q ? q.text : "—"}
                    </motion.h2>

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
                            onClick={() => handleOptionClick(index)}
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
                  </div>

                  {/* Enhanced Feedback */}
                  <AnimatePresence>
                    {checked[idx] && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        style={{
                          marginTop: 24,
                          padding: "20px 24px",
                          borderRadius: 16,
                          background: correct[idx] 
                            ? "linear-gradient(135deg, #ECFDF5, #D1FAE5)"
                            : "linear-gradient(135deg, #FEF2F2, #FEE2E2)",
                          border: `2px solid ${correct[idx] ? "#10B981" : "#EF4444"}`,
                          textAlign: "center" as const,
                          boxShadow: correct[idx] 
                            ? "0 8px 24px rgba(16, 185, 129, 0.15)"
                            : "0 8px 24px rgba(239, 68, 68, 0.15)",
                        }}
                      >
                        <div style={{
                          fontSize: fs * 1.5,
                          marginBottom: 8,
                        }}>
                          {correct[idx] ? "🎉" : "💡"}
                        </div>
                        <div style={{
                          fontSize: fs * 1.1,
                          fontWeight: 700,
                          color: correct[idx] ? "#065F46" : "#991B1B",
                          marginBottom: 4,
                        }}>
                          {correct[idx] ? "¡Excelente!" : "¡Casi!"}
                        </div>
                        <div style={{
                          fontSize: fs * 0.95,
                          color: correct[idx] ? "#047857" : "#B91C1C",
                        }}>
                          {correct[idx] 
                            ? "Has respondido correctamente. ¡Sigue así!" 
                            : `La respuesta correcta es: ${q.options[q.correctIndex]}`
                          }
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Enhanced Final Result */}
                  {finished ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      style={{
                        marginTop: 32,
                        padding: "32px 24px",
                        borderRadius: 20,
                        background: "linear-gradient(135deg, #F8FAFC, #E2E8F0)",
                        border: `3px solid ${primaryColor}`,
                        textAlign: "center" as const,
                        boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div style={{
                        fontSize: fs * 2.5,
                        marginBottom: 16,
                      }}>
                        🏆
                      </div>
                      <h3 style={{
                        fontSize: fs * 1.8,
                        fontWeight: 800,
                        color: "#1f2937",
                        margin: "0 0 8px 0",
                      }}>
                        ¡Quiz Completado!
                      </h3>
                      <p style={{
                        fontSize: fs * 1.1,
                        color: "#6B7280",
                        margin: "0 0 24px 0",
                      }}>
                        Has terminado el quiz de videos virales
                      </p>
                      <div style={{
                        display: "inline-flex" as const,
                        alignItems: "center" as const,
                        gap: 12,
                        padding: "16px 24px",
                        background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}CC)`,
                        borderRadius: 50,
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: fs * 1.3,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                      }}>
                        <span>Puntuación Final:</span>
                        <span style={{ fontSize: fs * 1.5 }}>
                        {score} / {total}
                      </span>
                    </div>
                      <div style={{
                        marginTop: 16,
                        fontSize: fs * 0.9,
                        color: "#9CA3AF",
                      }}>
                        {score === total ? "¡Perfecto! 🎉" : 
                         score >= total * 0.8 ? "¡Muy bien! 👏" :
                         score >= total * 0.6 ? "¡Bien! 👍" : "¡Sigue practicando! 💪"}
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

/* ---------- Preguntas (opción múltiple) para página 4 ---------- */
type MCQ = { text: string; options: string[]; correctIndex: number }

const QUESTIONS_PAGE4: MCQ[] = [
  { text: "En los primeros 3s debe...", options: ["Un efecto", "Captar la atención", "Explicar todo", "Poner subtítulos"], correctIndex: 1 },
  { text: "Un video viral se caracteriza por...", options: ["Muchos efectos", "Ser muy largo", "Que la gente quiera compartirlo", "Verse una sola vez"], correctIndex: 2 },
  { text: "Un gancho es...", options: ["Un filtro", "Frase/imagen que atrapa", "Un efecto complejo", "Una transición"], correctIndex: 1 },
  { text: "Mensaje sencillo porque...", options: ["Ahorrar edición", "Se entiende rápido", "Permite más efectos", "Alarga grabación"], correctIndex: 0 },
  { text: "Emociones que más impulsan interacción...", options: ["Indiferencia", "Confusión", "Alegría o sorpresa", "Molestia"], correctIndex: 2 },
  { text: "Aprovechar tendencia sin copiar es...", options: ["Copiar exacto", "Adaptarla con tu estilo", "Ignorar", "Hacerla muy larga"], correctIndex: 3 },
  { text: "Retos/challenges ayudan a...", options: ["Aburrir", "Crear comunidad y viralidad", "Evitar compartir", "Alargar"], correctIndex: 1 },
  { text: "Sin inicio llamativo, lo más probable es...", options: ["Más retención", "Abandono rápido", "Viral automático", "Más claridad"], correctIndex: 1 },
  { text: "La gente comparte cuando...", options: ["Mensaje confuso", "Emoción/valor inmediato", "Video muy largo", "Subtítulos exagerados"], correctIndex: 1 },
  { text: "Un error que arruina potencial es...", options: ["Mensaje claro", "Inicio enérgico", "Ser aburrido o confuso", "Usar tendencias"], correctIndex: 2 },
  { text: "CTA significa...", options: ["Tipo de edición", "Invitación a actuar", "Filtro", "Reto"], correctIndex: 0 },
  { text: "Para detectar tendencias conviene...", options: ["Ignorar lo popular", "Observar contenido viral", "Crear sin plan", "Usar contenido viejo"], correctIndex: 1 },
  { text: "Suele atraer más en redes...", options: ["Largo y complejo", "Breve y directo", "Sin emoción", "Sin historia"], correctIndex: 3 },
  { text: "Para diferenciarte conviene...", options: ["Copiar a otros", "Ser original y auténtico", "Hacerlo muy largo", "Llenar de efectos"], correctIndex: 1 },
  { text: "La viralidad depende de...", options: ["Solo suerte", "Estrategia y creatividad", "Copiar tendencias", "Música popular"], correctIndex: 1 },
]

type BSMXSection3Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  layoutOption?: "A" | "B"
  baseFontSize?: number
  /** ms para mostrar feedback antes de pasar a la siguiente */
  autoAdvanceDelayMs?: number
  // Quiz tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: number | null, correctAnswer: number, isCorrect: boolean) => void
  onQuizComplete?: (score: number) => void
  isAlreadyCompleted?: boolean
  completedScore?: number
}

function BSMXSection3({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 75,
  title = "",
  topicTitle = "Viralidad, ganchos y compartir (15 preguntas)",
  layoutOption = "B",
  baseFontSize = 18,
  autoAdvanceDelayMs = 650,
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: BSMXSection3Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm4s3-bsmxsection3-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-m4s3p4 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-m4s3p4 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .shimmer-title-m4s3p4 {
          background: linear-gradient(135deg, #0F62FE 0%, #3B82F6 25%, #60A5FA 50%, #3B82F6 75%, #0F62FE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-title-m4s3p4 2.5s ease-in-out infinite;
          filter: drop-shadow(0 2px 8px rgba(15, 98, 254, 0.3));
        }
        .floating-m4s3p4 {
          animation: float-m4s3p4 3s ease-in-out infinite;
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

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)))

  const total = QUESTIONS_PAGE4.length
  const [idx, setIdx] = React.useState(0)
  const [selection, setSelection] = React.useState<(number | null)[]>(
    Array(total).fill(null)
  )
  const [checked, setChecked] = React.useState<boolean[]>(Array(total).fill(false))
  const [correct, setCorrect] = React.useState<boolean[]>(Array(total).fill(false))
  const [score, setScore] = React.useState(0)

  const q = QUESTIONS_PAGE4[idx]
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
      padding: "18px 20px",
      borderRadius: 16,
      border: `2px solid ${borderColor}`,
      background: backgroundColor,
      fontWeight: 600,
      fontSize: fs * 1.05,
      letterSpacing: 0.1,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "left",
      boxShadow,
    transformOrigin: "center",
      transition: "all 0.3s ease",
      position: "relative" as const,
      overflow: "hidden" as const,
    }
  }

  // Clic = seleccionar, validar y avanzar automáticamente
  const handleSelect = (optionIndex: number) => {
    if (checked[idx]) return

    setSelection((prev) => {
      const next = [...prev]
      next[idx] = optionIndex
      return next
    })

    const isCorrect = optionIndex === q.correctIndex
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
    
    const newScore = score + (isCorrect ? 1 : 0)
    if (isCorrect) setScore((s) => s + 1)

    // Track answer submission
    if (onAnswerSubmit) {
      console.log(`M4S3P4: Submitting answer ${idx}: ${optionIndex}, correct=${q.correctIndex}, isCorrect=${isCorrect}`)
      onAnswerSubmit(idx, q.text, q.options[optionIndex], q.options[q.correctIndex], isCorrect)
    }

    // Muestra feedback breve y pasa a la siguiente (si existe)
    if (idx < total - 1) {
      setTimeout(() => setIdx((i) => i + 1), autoAdvanceDelayMs)
    } else {
      // Last question - complete quiz after delay
      console.log("M4S3P4: Last question answered, completing quiz with score:", newScore)
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
      <div style={wrapper}>
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={progressPercent}
          brandName={brandName}
          logoSrc={logoSrc || undefined}
        />
        
        {/* Billy and Drago Marketing Facts Animation */}
        <MarketingFactsAnimation
          facts={[
            {
              character: 'billy',
              text: "Los tutoriales en video incrementan la fidelización de audiencia un 50%",
              characterImage: '/2.png'
            },
            {
              character: 'drago',
              text: "El uso de color grading da coherencia visual y refuerza la identidad de marca",
              characterImage: '/drago1.png'
            },
            {
              character: 'billy',
              text: "Los videos con cierre de 'call to action' generan hasta 3 veces más clics",
              characterImage: '/2.png'
            },
            {
              character: 'drago',
              text: "Publicar videos de forma constante puede triplicar el crecimiento orgánico en redes",
              characterImage: '/drago1.png'
            }
          ]}
          primaryColor={primaryColor}
          brandName={brandName}
        />
        
        <div style={{ width: "100%", display: "flex", flexDirection: "column", flex: 1, minHeight: "calc(100vh - 80px)", alignItems: "center", justifyContent: "center" }}>
          <div style={{ ...container, textAlign: "center", paddingTop: 60, maxWidth: 600 }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              style={{ 
                padding: 48, 
                background: "linear-gradient(135deg, #F8FAFC, #F1F5F9)", 
                borderRadius: 24, 
                boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                border: `3px solid ${primaryColor}20`
              }}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
                style={{ fontSize: fs * 3, marginBottom: 24 }}
              >
                🏆
              </motion.div>
              <h2 style={{ 
                fontSize: fs * 2.2, 
                fontWeight: 800, 
                marginBottom: 16,
                background: `linear-gradient(135deg, ${primaryColor}, #8B5CF6)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Quiz Completado
              </h2>
              <p style={{ 
                fontSize: fs * 1.2, 
                color: "#64748B", 
                marginBottom: 32,
                fontWeight: 500
              }}>
                Ya completaste este quiz. Los quizzes solo pueden realizarse una vez.
              </p>
              <div style={{ 
                padding: "24px 32px", 
                background: `linear-gradient(135deg, ${primaryColor}, #8B5CF6)`, 
                borderRadius: 16, 
                marginBottom: 24,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
              }}>
                <strong style={{ 
                  fontSize: fs * 1.8, 
                  color: "white",
                  fontWeight: 800
                }}>
                  Tu puntuación: {completedScore ?? "?"} / {total}
                </strong>
              </div>
              <p style={{ 
                fontSize: fs * 1.0, 
                color: "#94A3B8",
                fontWeight: 600
              }}>
                ✨ Continúa con el siguiente contenido
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={wrapper}>
      <SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      
      {/* Billy and Drago Marketing Facts Animation */}
      <MarketingFactsAnimation
        facts={[
          {
            character: 'billy',
            text: "Los tutoriales en video incrementan la fidelización de audiencia un 50%",
            characterImage: '/2.png'
          },
          {
            character: 'drago',
            text: "El uso de color grading da coherencia visual y refuerza la identidad de marca",
            characterImage: '/drago1.png'
          },
          {
            character: 'billy',
            text: "Los videos con cierre de 'call to action' generan hasta 3 veces más clics",
            characterImage: '/2.png'
          },
          {
            character: 'drago',
            text: "Publicar videos de forma constante puede triplicar el crecimiento orgánico en redes",
            characterImage: '/drago1.png'
          }
        ]}
        primaryColor={primaryColor}
        brandName={brandName}
      />
      
      <main style={{ width: "100%", display: "block" }}>
        {/* Contenido */}
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {/* Título + Tema */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                  className="shimmer-title-m4s3p4 floating-m4s3p4"
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 2.5, 
                    lineHeight: 1.15,
                    fontWeight: 900,
                  }}
                >
                  Viralidad, ganchos y compartir
                </motion.h1>
                <motion.p style={{ 
                  margin: "8px 0 0", 
                  opacity: 0.9, 
                  fontSize: fs * 1.2, 
                  whiteSpace: "pre-wrap",
                  fontWeight: 600,
                  color: primaryColor
                }}>
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> Quiz interactivo (15 preguntas)
                </motion.p>
              </motion.div>

              {/* Quiz */}
              <motion.div variants={itemVar}>
                <Card glow={primaryColor} style={{ padding: 32, borderRadius: 24 }}>
                  {/* Quiz Header */}
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    marginBottom: 24,
                    padding: "20px 24px",
                    background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`,
                    borderRadius: 16,
                    border: `2px solid ${primaryColor}20`
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${primaryColor}, #8B5CF6)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: fs * 1.2,
                        fontWeight: 800,
                        color: "white",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
                      }}>
                        {Math.min(idx + 1, total)}
                      </div>
                      <div>
                        <h3 style={{ 
                          margin: 0, 
                          fontSize: fs * 1.3, 
                          fontWeight: 700,
                          color: primaryColor
                        }}>
                          Quiz de Videos Virales
                        </h3>
                        <p style={{ 
                          margin: "4px 0 0", 
                          fontSize: fs * 0.9, 
                          opacity: 0.8,
                          fontWeight: 500
                        }}>
                          Pregunta {Math.min(idx + 1, total)} de {total}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ 
                          fontSize: fs * 1.1, 
                          fontWeight: 700,
                          color: primaryColor
                        }}>
                          {Math.round(((idx + 1) / total) * 100)}%
                        </div>
                        <div style={{ 
                          fontSize: fs * 0.8, 
                          opacity: 0.7,
                          fontWeight: 500
                        }}>
                          Completado
                        </div>
                      </div>
                  <div
                    style={{
                          width: 120,
                          height: 8,
                          background: "rgba(0,0,0,0.1)",
                          borderRadius: 999,
                          overflow: "hidden",
                          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)"
                        }}
                      >
                        <motion.div
                          style={{
                            width: `${Math.round(((idx + 1) / total) * 100)}%`,
                            height: "100%",
                            background: `linear-gradient(90deg, ${primaryColor}, #8B5CF6)`,
                            borderRadius: 999,
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Enunciado */}
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      margin: "0 0 32px 0", 
                      lineHeight: 1.4, 
                      fontSize: fs * 1.6,
                      fontWeight: 700,
                      textAlign: "center",
                      color: "#1a1a1a"
                    }}
                  >
                    {q.text}
                  </motion.h2>

                  {/* Opciones (clic = validar + auto-advance) */}
                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 16,
                      marginBottom: 24,
                    }}
                  >
                    {q.options.map((opt, i) => {
                      const active = selection[idx] === i
                      const disabled = !!checked[idx]
                      const isCorrect = checked[idx] && i === q.correctIndex
                      const isWrong = checked[idx] && active && i !== q.correctIndex
                      
                      return (
                        <motion.button
                          key={i}
                          onClick={() => handleSelect(i)}
                          style={optStyle(active, isCorrect, isWrong)}
                          disabled={disabled}
                          whileHover={disabled ? undefined : { scale: 1.02, y: -2 }}
                          whileTap={disabled ? undefined : { scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <div style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: 12,
                            width: "100%"
                          }}>
                            <div style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: isCorrect ? "#10B981" : isWrong ? "#EF4444" : active ? primaryColor : "#E5E7EB",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: fs * 0.9,
                              fontWeight: 700,
                              color: "white",
                              flexShrink: 0
                            }}>
                              {String.fromCharCode(65 + i)}
                            </div>
                            <span style={{ 
                              flex: 1, 
                              lineHeight: 1.4,
                              fontSize: fs * 0.95
                            }}>
                          {opt}
                            </span>
                            {isCorrect && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                                style={{ fontSize: fs * 1.2 }}
                              >
                                ✅
                              </motion.span>
                            )}
                            {isWrong && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                                style={{ fontSize: fs * 1.2 }}
                              >
                                ❌
                              </motion.span>
                            )}
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* Feedback animado */}
                  <AnimatePresence>
                    {checked[idx] && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                        style={{
                          marginBottom: 24,
                          padding: "20px 24px",
                          borderRadius: 16,
                          background: correct[idx] 
                            ? "linear-gradient(135deg, #ECFDF5, #D1FAE5)" 
                            : "linear-gradient(135deg, #FEF2F2, #FEE2E2)",
                          border: `2px solid ${correct[idx] ? "#10B981" : "#EF4444"}`,
                          textAlign: "center" as const,
                          boxShadow: correct[idx] 
                            ? "0 8px 24px rgba(16, 185, 129, 0.15)" 
                            : "0 8px 24px rgba(239, 68, 68, 0.15)"
                        }}
                      >
                        <div style={{ 
                          fontSize: fs * 1.3, 
                          marginBottom: 8,
                          fontWeight: 700,
                          color: correct[idx] ? "#059669" : "#DC2626"
                        }}>
                          {correct[idx] ? "🎉 ¡Excelente!" : "💡 ¡Inténtalo de nuevo!"}
                        </div>
                        <p style={{ 
                          margin: 0, 
                          fontSize: fs * 1.0,
                          color: correct[idx] ? "#047857" : "#B91C1C",
                          fontWeight: 600
                        }}>
                          {correct[idx] 
                            ? "Respuesta correcta. ¡Sigue así!" 
                            : `La respuesta correcta es: ${q.options[q.correctIndex]}`
                          }
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Resultado final */}
                  {finished ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                      style={{
                        marginTop: 24,
                        padding: "32px 24px",
                        borderRadius: 20,
                        background: "linear-gradient(135deg, #F8FAFC, #F1F5F9)",
                        border: `3px solid ${primaryColor}`,
                        textAlign: "center" as const,
                        boxShadow: "0 12px 32px rgba(0,0,0,0.1)"
                      }}
                    >
                      <div style={{ fontSize: fs * 2.5, marginBottom: 16 }}>🏆</div>
                      <h3 style={{ 
                        margin: "0 0 12px 0", 
                        fontSize: fs * 1.8, 
                        fontWeight: 800,
                        background: `linear-gradient(135deg, ${primaryColor}, #8B5CF6)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}>
                        ¡Quiz Completado!
                      </h3>
                      <div style={{
                        display: "inline-block",
                        padding: "16px 32px",
                        background: `linear-gradient(135deg, ${primaryColor}, #8B5CF6)`,
                        borderRadius: 50,
                        marginBottom: 16
                      }}>
                        <span style={{ 
                          fontSize: fs * 1.6, 
                          fontWeight: 800, 
                          color: "white"
                        }}>
                          {score} / {total} preguntas correctas
                      </span>
                    </div>
                      <p style={{ 
                        margin: 0, 
                        fontSize: fs * 1.1,
                        color: "#64748B",
                        fontWeight: 600
                      }}>
                        {score === total ? "¡Perfecto! 🎉" : 
                         score >= total * 0.8 ? "¡Muy bien! 👏" : 
                         score >= total * 0.6 ? "¡Buen trabajo! 💪" : 
                         "¡Sigue practicando! 📚"}
                      </p>
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

/* ---------- UI helpers para Flashcards ---------- */

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

function Flashcard({ front, back, primaryColor, fontSize }: { front: string; back: string; primaryColor: string; fontSize: number }) {
  const [open, setOpen] = React.useState(false)
  return (
    <motion.div
      role="button"
      onClick={() => setOpen(v => !v)}
      whileHover={{ scale: 0.9 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      style={{
        userSelect: "none",
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
        transformOrigin: "center",
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
    </motion.div>
  )
}

/* ---------- Defaults para actividades ---------- */

const DEFAULT_INSTRUCTIONS = [
  "Guion rápido: redacta un guion de 15 segundos con inicio llamativo, mensaje claro y final sorpresivo.",
  "Frases gancho: escribe tres frases de apertura para captar atención inmediata.",
  "Análisis de tendencia: describe los elementos que hicieron popular un reel reciente que viste.",
]

type BSMXSection1Props = {
  brandName?: string
  logoSrc?: string
  primaryColor?: string
  background?: string
  progressPercent?: number
  title?: string
  topicTitle?: string
  layoutOption?: "A" | "B"
  baseFontSize?: number
  instructions?: string[]
  gridColumns?: number
  gridGap?: number
}

function BSMXSection1({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 100,
  title = "",
  topicTitle = "Taller Interactivo de Creación Viral",
  layoutOption = "B",
  baseFontSize = 18,
  instructions = DEFAULT_INSTRUCTIONS,
  gridColumns = 1,
  gridGap = 16,
}: BSMXSection1Props) {
  const fs = Math.max(12, baseFontSize || 18)
  const isLeft = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)))

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm4s3-bsmxsection1-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer-title-m4s3p5 {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float-m4s3p5 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .shimmer-title-m4s3p5 {
          background: linear-gradient(135deg, #0F62FE 0%, #3B82F6 25%, #60A5FA 50%, #3B82F6 75%, #0F62FE 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-title-m4s3p5 2.5s ease-in-out infinite;
          filter: drop-shadow(0 2px 8px rgba(15, 98, 254, 0.3));
        }
        .floating-m4s3p5 {
          animation: float-m4s3p5 3s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Interactive state
  const [activeActivity, setActiveActivity] = useState<number | null>(null)
  const [userInputs, setUserInputs] = useState<{[key: number]: string}>({})
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set())

  const activities = [
    {
      id: 1,
      title: "🎬 Guion Rápido",
      subtitle: "Crea tu video de 15 segundos",
      icon: "🎬",
      color: "#FF6B6B",
      description: "Redacta un guion de 15 segundos con inicio llamativo, mensaje claro y final sorpresivo.",
      placeholder: "Escribe tu guion aquí...\n\nInicio (0-3s): [Gancho llamativo]\nDesarrollo (3-12s): [Mensaje principal]\nFinal (12-15s): [Cierre sorpresivo]",
      tips: ["Usa preguntas impactantes", "Mantén el mensaje simple", "Termina con una sorpresa"]
    },
    {
      id: 2,
      title: "🎯 Frases Gancho",
      subtitle: "Captura la atención inmediata",
      icon: "🎯",
      color: "#4ECDC4",
      description: "Escribe tres frases de apertura para captar atención inmediata.",
      placeholder: "Escribe tus 3 frases gancho aquí...\n\n1. [Primera frase impactante]\n2. [Segunda frase intrigante]\n3. [Tercera frase emocional]",
      tips: ["Usa números o estadísticas", "Crea curiosidad", "Apela a emociones"]
    },
    {
      id: 3,
      title: "📈 Análisis de Tendencia",
      subtitle: "Desentraña el éxito viral",
      icon: "📈",
      color: "#45B7D1",
      description: "Describe los elementos que hicieron popular un reel reciente que viste.",
      placeholder: "Analiza un reel viral que hayas visto...\n\nVideo analizado: [Título/descripción]\n\nElementos que lo hicieron viral:\n• [Elemento 1]\n• [Elemento 2]\n• [Elemento 3]\n\n¿Qué puedes aplicar a tus videos?",
      tips: ["Observa el timing", "Analiza la música", "Identifica el hook emocional"]
    }
  ]

  const handleInputChange = (activityId: number, value: string) => {
    setUserInputs(prev => ({ ...prev, [activityId]: value }))
  }

  const toggleActivity = (activityId: number) => {
    setActiveActivity(activeActivity === activityId ? null : activityId)
  }

  const markComplete = (activityId: number) => {
    setCompletedActivities(prev => new Set([...prev, activityId]))
  }

  const wrapper = useMemo(
    () => ({
      width: "100%",
      display: "flex" as const,
      justifyContent: "flex-start",
      background: "linear-gradient(135deg, #EFF6FF, #F0F9FF, #DBEAFE)",
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs,
      minHeight: "100vh",
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
      <main style={{ width: "100%", display: "block" }}>
        <SectionPageHeader
          primaryColor={primaryColor}
          progress={progressPercent}
          brandName={brandName}
          logoSrc={logoSrc || undefined}
        />
        
        {/* Contenido */}
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {/* Título + Tema */}
              <motion.div variants={itemVar} style={{ marginBottom: 24, textAlign: "center" }}>
                <motion.h1 
                  className="shimmer-title-m4s3p5 floating-m4s3p5"
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontWeight: 900,
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  Taller Interactivo de Creación Viral
                </motion.h1>
                <motion.p 
                  style={{ 
                    margin: "12px 0 0", 
                    opacity: 0.9, 
                    fontSize: fs * 1.3,
                    color: primaryColor,
                    fontWeight: 700
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.9 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <span style={{ color: primaryColor, fontWeight: 800, fontSize: fs * 1.3 }}>🎯</span> Actividades creativas interactivas
                </motion.p>
              </motion.div>

              {/* Aviso motivacional */}
              <motion.div variants={itemVar} style={{ marginBottom: 32 }}>
                <motion.div
                  style={{
                    background: "linear-gradient(135deg, #DBEAFE, #E0F2FE, #BAE6FD)",
                    borderRadius: 20,
                    padding: "28px 36px",
                    boxShadow: "0 12px 32px rgba(15, 98, 254, 0.15)",
                    border: `2px solid ${primaryColor}30`,
                    textAlign: "center"
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    style={{
                      display: "flex" as const,
                      alignItems: "center" as const,
                      justifyContent: "center",
                      gap: 16,
                      fontWeight: 800,
                      color: primaryColor,
                      fontSize: fs * 1.3,
                    }}
                  >
                    <motion.span 
                      animate={{ rotate: [0, 20, -20, 20, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      style={{ fontSize: fs * 2.2 }}
                    >
                      🚀
                    </motion.span>
                    <span>¡Crea contenido viral con estas 3 actividades interactivas!</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Activities Grid */}
              <motion.div 
                variants={itemVar} 
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
                  gap: 24,
                  marginBottom: 32 
                }}
              >
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    style={{
                      background: "linear-gradient(135deg, #FFFFFF, #F8FAFF)",
                      borderRadius: 20,
                      padding: 0,
                      boxShadow: `0 15px 35px ${activity.color}15, 0 4px 16px rgba(0,0,0,0.08)`,
                      backdropFilter: "blur(10px)",
                      border: `2px solid ${activity.color}20`,
                      overflow: "hidden",
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.3s ease"
                    }}
                    onClick={() => toggleActivity(activity.id)}
                  >
                    {/* Activity Header */}
                    <div
                      style={{
                        background: `linear-gradient(135deg, ${activity.color}, ${activity.color}CC)`,
                        padding: "24px",
                        color: "#fff",
                        position: "relative"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                        <span style={{ fontSize: fs * 2 }}>{activity.icon}</span>
                        <div>
                          <h3 style={{ margin: 0, fontSize: fs * 1.4, fontWeight: 800 }}>
                            {activity.title}
                          </h3>
                          <p style={{ margin: "4px 0 0", fontSize: fs * 0.9, opacity: 0.9 }}>
                            {activity.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      {completedActivities.has(activity.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            background: "#4CAF50",
                            borderRadius: "50%",
                            width: 32,
                            height: 32,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: fs * 1.2
                          }}
                        >
                          ✅
                        </motion.div>
                      )}
                    </div>

                    {/* Activity Description */}
                    <div style={{ padding: "20px 24px" }}>
                      <p style={{ 
                        margin: "0 0 16px", 
                        fontSize: fs * 0.95, 
                        lineHeight: 1.5,
                        color: "#555"
                      }}>
                        {activity.description}
                      </p>

                      {/* Tips */}
                      <div style={{ marginBottom: 16 }}>
                        <h4 style={{ 
                          margin: "0 0 8px", 
                          fontSize: fs * 0.9, 
                          color: activity.color,
                          fontWeight: 700
                        }}>
                          💡 Tips:
                        </h4>
                        <ul style={{ margin: 0, paddingLeft: 16, fontSize: fs * 0.85 }}>
                          {activity.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} style={{ marginBottom: 4, color: "#666" }}>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expandable Input Area */}
                      <AnimatePresence>
                        {activeActivity === activity.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: "hidden" }}
                          >
                            <textarea
                              value={userInputs[activity.id] || ""}
                              onChange={(e) => handleInputChange(activity.id, e.target.value)}
                              placeholder={activity.placeholder}
                              style={{
                                width: "100%",
                                minHeight: 120,
                                padding: 16,
                                border: `2px solid ${activity.color}20`,
                                borderRadius: 12,
                                fontSize: fs * 0.9,
                                fontFamily: "inherit",
                                resize: "vertical",
                                outline: "none",
                                background: "#fafafa",
                                transition: "all 0.3s ease"
                              }}
                              onFocus={(e) => {
                                e.target.style.borderColor = activity.color
                                e.target.style.background = "#fff"
                              }}
                              onBlur={(e) => {
                                e.target.style.borderColor = `${activity.color}20`
                                e.target.style.background = "#fafafa"
                              }}
                            />
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                markComplete(activity.id)
                              }}
                              disabled={completedActivities.has(activity.id)}
                              style={{
                                marginTop: 12,
                                padding: "12px 24px",
                                background: completedActivities.has(activity.id) 
                                  ? "#4CAF50" 
                                  : `linear-gradient(135deg, ${activity.color}, ${activity.color}CC)`,
                                color: "#fff",
                                border: "none",
                                borderRadius: 25,
                                fontSize: fs * 0.9,
                                fontWeight: 700,
                                cursor: completedActivities.has(activity.id) ? "default" : "pointer",
                                opacity: completedActivities.has(activity.id) ? 0.7 : 1,
                                transition: "all 0.3s ease"
                              }}
                            >
                              {completedActivities.has(activity.id) ? "✅ Completado" : "🎯 Marcar como completado"}
                            </motion.button>
              </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Click to expand hint */}
                      {activeActivity !== activity.id && (
                        <motion.div
                          style={{
                            textAlign: "center",
                            padding: "12px",
                            background: `${activity.color}10`,
                            borderRadius: 8,
                            fontSize: fs * 0.85,
                            color: activity.color,
                            fontWeight: 600
                          }}
                          whileHover={{ scale: 1.02 }}
                        >
                          👆 Haz clic para expandir y escribir
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Progress Summary */}
              <motion.div variants={itemVar}>
                <motion.div
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,248,255,0.95))",
                    borderRadius: 20,
                    padding: "24px 32px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    textAlign: "center"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <h3 style={{ 
                    margin: "0 0 16px", 
                    fontSize: fs * 1.3, 
                    color: primaryColor,
                    fontWeight: 800
                  }}>
                    📊 Tu Progreso
                  </h3>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    gap: 16,
                    marginBottom: 16
                  }}>
                    <span style={{ fontSize: fs * 2, fontWeight: 800, color: primaryColor }}>
                      {completedActivities.size}/3
                    </span>
                    <span style={{ fontSize: fs * 1.1, color: "#666" }}>
                      actividades completadas
                    </span>
                  </div>
                  
                  <div style={{ 
                    background: "#f0f0f0", 
                    borderRadius: 10, 
                    height: 8, 
                    overflow: "hidden",
                    marginBottom: 16
                  }}>
                    <motion.div
                      style={{
                        background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}CC)`,
                        height: "100%",
                        borderRadius: 10
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedActivities.size / 3) * 100}%` }}
                      transition={{ duration: 0.8, delay: 1 }}
                    />
                  </div>

                  {completedActivities.size === 3 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      style={{
                        background: "linear-gradient(135deg, #4CAF50, #45a049)",
                        color: "#fff",
                        padding: "16px 24px",
                        borderRadius: 15,
                        fontSize: fs * 1.1,
                        fontWeight: 700
                      }}
                    >
                      🎉 ¡Excelente! Has completado todas las actividades. ¡Ahora crea contenido viral!
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

const M4S3_CONTENT: Record<number, React.ReactNode> = {
  1: <Page1 />,
  2: <Page2 />,
  3: <SectionMC videoSrc="https://www.youtube.com/embed/E_4ZmkcuyvU" />,
  4: <BSMXSection3 />,
  5: <BSMXSection1 />,
}

export default M4S3_CONTENT

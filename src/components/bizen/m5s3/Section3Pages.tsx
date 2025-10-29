/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { motion, Variants } from "framer-motion"
import SectionPageHeader from "@/components/bizen/SectionPageHeader"
import { playClickSound } from "@/utils/sounds"
import MarketingFactsAnimation from "@/components/MarketingFactsAnimation"

type LayoutOption = "A" | "B"

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
  padding = 22,
}: {
  children: React.ReactNode
  glow?: string
  borderColor?: string
  padding?: number
}) {
  return (
    <div
      style={{
        position: "relative" as const,
        borderRadius: 16,
        padding,
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

function Page1({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 0,
  title = "Mensajes, seguimiento y reputación",
  topicTitle = "Construye tu estrategia de networking efectivo",
  introText = `En networking, el primer mensaje abre la puerta y el seguimiento construye confianza. Tres principios:
1) Claridad y relevancia: indica por qué escribes y qué propones en 2–3 líneas. Personaliza con una referencia real (proyecto, post, charla).
2) Solicitud concreta y fácil: una sola acción (leer un adjunto breve, dar una fecha, responder “sí/no”). Reduce fricción.
3) Seguimiento con valor: si no responden, vuelve con algo útil (resumen, recurso, invitación específica), no solo “¿viste mi correo?”.`,
  bullets = [
    "Empieza claro y pertinente en 2–3 líneas con referencia real.",
    "Pide una sola acción, específica y de baja fricción.",
    "Haz seguimiento aportando valor nuevo, no presión vacía.",
  ],
  keyIdea = "El mensaje inicia la relación; el seguimiento consistente y útil construye reputación.",
  awarenessItems = [
    "Explica por qué escribes en 2–3 líneas",
    "Personaliza con proyecto/post/charla",
    "Muestra relevancia para la persona",
  ],
  considerationItems = [
    "Propón una sola acción",
    "Baja fricción: sí/no, fecha, adjunto breve",
    "Indica el beneficio de realizarla",
  ],
  conversionItems = [
    "Evita “¿viste mi correo?”",
    "Aporta un recurso o resumen útil",
    "Invitación específica con valor claro",
  ],
  commonFormats = [
    "Consistencia y respeto de tiempos",
    "Cierres y agradecimientos explícitos",
    "Registro de interacciones para dar buen seguimiento",
  ],
  heroImage = "",
  layoutOption = "A",
  baseFontSize = 18,
}: Page1Props) {
  void layoutOption

  const [expandedPrinciple, setExpandedPrinciple] = useState<number | null>(null);
  const fs = Math.max(12, baseFontSize || 18)
  
  const principleDetails = [
    {
      title: "Claridad y relevancia",
      details: [
        "• Personaliza con una referencia específica (proyecto, post, charla)",
        "• Indica claramente por qué escribes en las primeras líneas",
        "• Propón algo concreto en 2-3 líneas máximo",
        "• Evita mensajes genéricos o demasiado largos"
      ],
      example: "Ejemplo: 'Hola María, vi tu post sobre sostenibilidad en LinkedIn. Estoy desarrollando un proyecto similar y me encantaría intercambiar ideas. ¿Te parece bien una llamada de 15 min?'"
    },
    {
      title: "Solicitud concreta y fácil",
      details: [
        "• Una sola acción específica y clara",
        "• Reduce la fricción al mínimo",
        "• Opciones simples: sí/no, fecha específica, adjunto breve",
        "• Evita múltiples opciones o decisiones complejas"
      ],
      example: "Ejemplo: '¿Podrías revisar este documento de 2 páginas y darme tu feedback? Solo necesito un sí/no si te parece interesante.'"
    },
    {
      title: "Seguimiento con valor",
      details: [
        "• Si no responden en 1 semana, vuelve con valor",
        "• Ofrece algo útil: resumen, recurso, invitación específica",
        "• No solo preguntes '¿viste mi correo?'",
        "• Máximo 2-3 seguimientos antes de cambiar estrategia"
      ],
      example: "Ejemplo: 'Hola María, te comparto este artículo que encontré sobre tu tema. Me recordó nuestra conversación anterior. ¿Te interesa que lo discutamos?'"
    }
  ];

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
      padding: 20,
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
              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.0, 
                    lineHeight: 1.15,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${primaryColor}, #8B5CF6, #F59E0B, #10B981)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "300% 300%",
                    textShadow: "0 6px 12px rgba(0,0,0,0.15)",
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                  }}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ 
                    scale: 1,
                    opacity: 1,
                    y: [0, -12, 0, -8, 0],
                    backgroundPosition: ["0% 50%", "100% 50%", "50% 100%", "0% 50%"]
                  }}
                  transition={{ 
                    scale: { duration: 0.6, ease: "easeOut" },
                    opacity: { duration: 0.6, ease: "easeOut" },
                    y: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    backgroundPosition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {title}
                </motion.h1>
                <p style={{ margin: "6px 0 16px", opacity: 0.9, fontSize: fs * 1.4 }}>
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </p>
                
                {/* Interactive Progress Indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`,
                    borderRadius: 16,
                    padding: 16,
                    border: `2px solid ${primaryColor}20`,
                    marginBottom: 8
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    }}>
                      <span style={{ fontSize: fs * 1.2 }}>📈</span>
                      <span style={{ 
                        fontSize: fs * 1.1, 
                        fontWeight: 700, 
                        color: primaryColor 
                      }}>
                        Tu Progreso de Aprendizaje
                      </span>
                    </div>
                    <div style={{
                      background: `linear-gradient(135deg, ${primaryColor}, #8B5CF6)`,
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: 12,
                      fontSize: fs * 0.9,
                      fontWeight: 700
                    }}>
                      25%
                    </div>
                  </div>
                  <div style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center"
                  }}>
                    {[
                      { label: "Fundamentos", completed: true },
                      { label: "Principios", completed: true },
                      { label: "Práctica", completed: false },
                      { label: "Aplicación", completed: false }
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "8px 12px",
                          background: step.completed 
                            ? `linear-gradient(135deg, ${primaryColor}, #8B5CF6)` 
                            : "rgba(0,0,0,0.05)",
                          color: step.completed ? "white" : "#666",
                          borderRadius: 20,
                          fontSize: fs * 0.85,
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        <span>{step.completed ? "✓" : "○"}</span>
                        <span>{step.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
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

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Card glow={primaryColor} padding={24}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 16
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12
                      }}>
                        <span style={{ fontSize: fs * 1.8 }}>📖</span>
                        <h3 style={{ 
                          margin: 0, 
                          fontSize: fs * 1.4, 
                          color: primaryColor,
                          fontWeight: 800
                        }}>
                          Fundamentos del Networking
                        </h3>
                      </div>
                      <div style={{
                        background: `linear-gradient(135deg, ${primaryColor}, #8B5CF6)`,
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: 20,
                        fontSize: fs * 0.9,
                        fontWeight: 700
                      }}>
                        📚 Lectura
                      </div>
                    </div>
                    <div style={{
                      background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}03)`,
                      borderRadius: 12,
                      padding: 20,
                      border: `2px solid ${primaryColor}20`,
                      position: "relative",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        width: 60,
                        height: 60,
                        background: `radial-gradient(circle, ${primaryColor}15, transparent)`,
                        borderRadius: "50%"
                      }} />
                      <p style={{ 
                        margin: 0, 
                        opacity: 0.95, 
                        fontSize: fs * 1.05, 
                        lineHeight: 1.7,
                        whiteSpace: "pre-wrap",
                        fontWeight: 500
                      }}>
                        {introText}
                      </p>
                    </div>
                </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Card glow={primaryColor} padding={24}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 20
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12
                      }}>
                        <span style={{ fontSize: fs * 1.8 }}>🎯</span>
                        <h3 style={{ 
                          margin: 0, 
                          fontSize: fs * 1.4, 
                          color: primaryColor,
                          fontWeight: 800
                        }}>
                          Tres principios fundamentales
                        </h3>
                      </div>
                      <div style={{
                        display: "flex",
                        gap: 8
                      }}>
                        {[1, 2, 3].map((step) => (
                          <div
                            key={step}
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              background: primaryColor,
                              opacity: 0.8
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div style={{
                      display: "grid",
                      gap: 16
                    }}>
                    {bullets.map((b, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setExpandedPrinciple(expandedPrinciple === i ? null : i)}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                            padding: 20,
                            background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}03)`,
                            borderRadius: 16,
                            border: `2px solid ${expandedPrinciple === i ? primaryColor : `${primaryColor}20`}`,
                            cursor: "pointer",
                            position: "relative",
                            overflow: "hidden",
                            transition: "all 0.3s ease"
                          }}
                        >
                          <div style={{
                            position: "absolute",
                            top: -5,
                            right: -5,
                            width: 40,
                            height: 40,
                            background: `radial-gradient(circle, ${primaryColor}15, transparent)`,
                            borderRadius: "50%"
                          }} />
                          <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${primaryColor}, #8B5CF6)`,
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: fs * 1.2,
                            fontWeight: 800,
                            flexShrink: 0,
                            boxShadow: `0 4px 12px ${primaryColor}30`
                          }}>
                            {i + 1}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ 
                              margin: 0, 
                              fontSize: fs * 1.05, 
                              lineHeight: 1.6,
                              fontWeight: 600,
                              color: "#333"
                            }}>
                              {b}
                            </p>
                            <div style={{
                              marginTop: 8,
                              fontSize: fs * 0.85,
                              color: primaryColor,
                              fontWeight: 500,
                              opacity: 0.8,
                              display: "flex",
                              alignItems: "center",
                              gap: 4
                            }}>
                              {expandedPrinciple === i ? "Ocultar detalles" : "Haz clic para más detalles"}
                              <span style={{
                                transform: expandedPrinciple === i ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.3s ease"
                              }}>
                                ↓
                              </span>
                            </div>
                            
                            {/* Expandable Details */}
                            <motion.div
                              initial={false}
                              animate={{
                                height: expandedPrinciple === i ? "auto" : 0,
                                opacity: expandedPrinciple === i ? 1 : 0
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              style={{
                                overflow: "hidden",
                                marginTop: 16
                              }}
                            >
                              {expandedPrinciple === i && (
                                <div style={{
                                  background: `linear-gradient(135deg, ${primaryColor}05, ${primaryColor}02)`,
                                  borderRadius: 12,
                                  padding: 16,
                                  border: `1px solid ${primaryColor}15`
                                }}>
                                  <h4 style={{
                                    margin: "0 0 12px 0",
                                    fontSize: fs * 1.1,
                                    fontWeight: 700,
                                    color: primaryColor
                                  }}>
                                    {principleDetails[i].title}
                                  </h4>
                                  
                                  <div style={{ marginBottom: 16 }}>
                                    <h5 style={{
                                      margin: "0 0 8px 0",
                                      fontSize: fs * 0.95,
                                      fontWeight: 600,
                                      color: "#333"
                                    }}>
                                      Detalles clave:
                                    </h5>
                                    <ul style={{
                                      margin: 0,
                                      paddingLeft: 16,
                                      fontSize: fs * 0.9,
                                      lineHeight: 1.5,
                                      color: "#555"
                                    }}>
                                      {principleDetails[i].details.map((detail, idx) => (
                                        <li key={idx} style={{ marginBottom: 4 }}>
                                          {detail}
                      </li>
                    ))}
                  </ul>
                                  </div>
                                  
                                  <div style={{
                                    background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`,
                                    borderRadius: 8,
                                    padding: 12,
                                    border: `1px solid ${primaryColor}20`
                                  }}>
                                    <h5 style={{
                                      margin: "0 0 8px 0",
                                      fontSize: fs * 0.95,
                                      fontWeight: 600,
                                      color: primaryColor
                                    }}>
                                      💡 Ejemplo práctico:
                                    </h5>
                                    <p style={{
                                      margin: 0,
                                      fontSize: fs * 0.9,
                                      lineHeight: 1.5,
                                      color: "#555",
                                      fontStyle: "italic"
                                    }}>
                                      {principleDetails[i].example}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`,
                    border: `3px solid ${primaryColor}30`,
                    borderRadius: 20,
                    padding: 24,
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    background: `radial-gradient(circle, ${primaryColor}20, transparent)`,
                    borderRadius: "50%"
                  }} />
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12
                  }}>
                    <span style={{ fontSize: fs * 1.8 }}>💡</span>
                    <strong style={{ 
                      color: primaryColor, 
                      fontSize: fs * 1.2, 
                      fontWeight: 800
                    }}>
                    Idea clave
                  </strong>
                </div>
                  <p style={{ 
                    margin: 0, 
                    fontSize: fs * 1.1, 
                    lineHeight: 1.6,
                    fontWeight: 600,
                    color: "#333"
                  }}>
                    {keyIdea}
                  </p>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Card glow={primaryColor} padding={24}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 20
                    }}>
                      <span style={{ fontSize: fs * 1.8 }}>⚡</span>
                      <h3 style={{ 
                        margin: 0, 
                        fontSize: fs * 1.4, 
                        color: primaryColor,
                        fontWeight: 800
                      }}>
                        Principios prácticos
                      </h3>
                    </div>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
                      gap: 20 
                    }}>
                      {[
                        { 
                          title: "Mensaje inicial: claridad y relevancia", 
                          items: awarenessItems, 
                          icon: "📝",
                          color: "#10B981"
                        },
                        { 
                          title: "Solicitud concreta y fácil", 
                          items: considerationItems, 
                          icon: "🎯",
                          color: "#F59E0B"
                        },
                        { 
                          title: "Seguimiento con valor", 
                          items: conversionItems, 
                          icon: "🔄",
                          color: "#8B5CF6"
                        },
                        { 
                          title: "Reputación: señales y buenas prácticas", 
                          items: commonFormats, 
                          icon: "⭐",
                          color: "#EF4444"
                        }
                      ].map((section, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          style={{
                            background: `linear-gradient(135deg, ${section.color}10, ${section.color}05)`,
                            border: `2px solid ${section.color}30`,
                            borderRadius: 16,
                            padding: 20,
                            position: "relative",
                            overflow: "hidden"
                          }}
                        >
                          <div style={{
                            position: "absolute",
                            top: -10,
                            right: -10,
                            width: 60,
                            height: 60,
                            background: `radial-gradient(circle, ${section.color}20, transparent)`,
                            borderRadius: "50%"
                          }} />
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 12
                          }}>
                            <span style={{ fontSize: fs * 1.4 }}>{section.icon}</span>
                            <h4 style={{ 
                              margin: 0, 
                              color: section.color, 
                              fontSize: fs * 1.1,
                              fontWeight: 800
                            }}>
                              {section.title}
                      </h4>
                    </div>
                          <ul style={{ 
                            margin: 0, 
                            paddingLeft: 16,
                            fontSize: fs * 0.95,
                            lineHeight: 1.6
                          }}>
                            {section.items.map((item, j) => (
                              <li key={j} style={{ 
                                marginBottom: 8,
                                color: "#333",
                                fontWeight: 500
                              }}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                  </div>
                </Card>
                </motion.div>
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
  videoSrc?: string
  videoPoster?: string
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
  templates?: { label: string; lines: string[] }[]
  objectionHandles?: { title: string; responses: string[] }[]
  closingTips?: string[]
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

function Page2({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 25,
  title = "Mensajes, cadencia y reputación",
  topicTitle = "Estrategias avanzadas de networking digital",
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
  void heroImage

  const fs = Math.max(12, baseFontSize || 18)

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

        <section style={{ ...container, flex: 1 }}>
          <motion.div variants={containerVar} initial="hidden" animate="show">
            <motion.div variants={itemVar}>
              <motion.h1 
                style={{ 
                  margin: 0, 
                  fontSize: fs * 3.0, 
                  lineHeight: 1.15,
                  fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                  fontWeight: 800,
                  background: `linear-gradient(135deg, #0F62FE, #2563EB, #3B82F6, #60A5FA)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "300% 300%",
                  textShadow: "0 6px 12px rgba(15, 98, 254, 0.3)",
                  filter: "drop-shadow(0 4px 8px rgba(15, 98, 254, 0.2))"
                }}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                  y: [0, -12, 0, -8, 0],
                  backgroundPosition: ["0% 50%", "100% 50%", "50% 100%", "0% 50%"]
                }}
                transition={{ 
                  scale: { duration: 0.6, ease: "easeOut" },
                  opacity: { duration: 0.6, ease: "easeOut" },
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  backgroundPosition: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                {title}
              </motion.h1>
              <p style={{ margin: "8px 0 20px", opacity: 0.9, fontSize: fs * 1.1 }}>
                <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
              </p>
            </motion.div>

            <motion.div variants={itemVar}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Card glow={primaryColor} padding={24}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12
                    }}>
                      <span style={{ fontSize: fs * 1.8 }}>✅</span>
                      <h3 style={{ 
                        margin: 0, 
                        fontSize: fs * 1.4, 
                        color: primaryColor,
                        fontWeight: 800
                      }}>
                        Checklist Operativo del Mensaje
                      </h3>
                    </div>
                    <div style={{
                      background: `linear-gradient(135deg, ${primaryColor}, #8B5CF6)`,
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: 20,
                      fontSize: fs * 0.9,
                      fontWeight: 700
                    }}>
                      📋 Guía
                    </div>
                  </div>
                  
                  <div style={{
                    display: "grid",
                    gap: 16
                  }}>
                    {[
                      {
                        text: "Saludo personalizado con referencia concreta (post, evento o proyecto).",
                        icon: "👋",
                        color: "#10B981"
                      },
                      {
                        text: "Propuesta de valor resumida en máximo dos líneas y orientada al beneficio.",
                        icon: "💎",
                        color: "#F59E0B"
                      },
                      {
                        text: "Solicitud única y sencilla (agenda, respuesta sí/no, feedback rápido).",
                        icon: "🎯",
                        color: "#8B5CF6"
                      },
                      {
                        text: "Anticipa la siguiente interacción: \"si no respondes, te escribo en X días con Y recurso\".",
                        icon: "⏰",
                        color: "#EF4444"
                      },
                      {
                        text: "Cierra con agradecimiento y firma consistente (nombre, rol, enlaces relevantes).",
                        icon: "✍️",
                        color: "#06B6D4"
                      }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          padding: 16,
                          background: `linear-gradient(135deg, ${item.color}08, ${item.color}03)`,
                          borderRadius: 12,
                          border: `2px solid ${item.color}20`,
                          cursor: "pointer",
                          position: "relative",
                          overflow: "hidden"
                        }}
                      >
                        <div style={{
                          position: "absolute",
                          top: -5,
                          right: -5,
                          width: 40,
                          height: 40,
                          background: `radial-gradient(circle, ${item.color}15, transparent)`,
                          borderRadius: "50%"
                        }} />
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${item.color}, ${item.color}80)`,
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: fs * 1.1,
                          fontWeight: 800,
                          flexShrink: 0,
                          boxShadow: `0 4px 12px ${item.color}30`
                        }}>
                          {item.icon}
                        </div>
                        <p style={{ 
                          margin: 0, 
                          fontSize: fs * 1.05, 
                          lineHeight: 1.6,
                          fontWeight: 500,
                          color: "#333",
                          flex: 1
                        }}>
                          {item.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{
                      marginTop: 20,
                      padding: 16,
                      background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`,
                      borderRadius: 12,
                      border: `2px solid ${primaryColor}20`
                    }}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8
                    }}>
                      <span style={{ fontSize: fs * 1.2 }}>💡</span>
                      <h4 style={{
                        margin: 0,
                        fontSize: fs * 1.1,
                        fontWeight: 700,
                        color: primaryColor
                      }}>
                        Pro Tip
                      </h4>
                    </div>
                    <p style={{
                      margin: 0,
                      fontSize: fs * 0.95,
                      lineHeight: 1.5,
                      color: "#555",
                      fontStyle: "italic"
                    }}>
                      Usa este checklist antes de enviar cada mensaje. Cada punto aumenta significativamente las posibilidades de respuesta.
                    </p>
                  </motion.div>
              </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}

/* ───────────────────────── Page 3: True/False Quiz ───────────────────────── */

type TFQuestion = {
  type: "tf"
  text: string
  answer: boolean // true = Verdadero, false = Falso
}
type Question = TFQuestion

const DEFAULT_QUESTIONS_TF: Question[] = [
  { type: "tf", text: "Un primer mensaje efectivo es breve, personalizado y con propósito claro.", answer: true },
  { type: "tf", text: "La solicitud en el mensaje debe ser una acción concreta y fácil de realizar.", answer: true },
  { type: "tf", text: "Un buen seguimiento con valor aporta un recurso o una síntesis útil.", answer: true },
  { type: "tf", text: "Una cadencia recomendable es hacer seguimiento a los 5–7 días con algo útil.", answer: false },
  { type: "tf", text: "Cerrar cortésmente a los 14–21 días ayuda a cuidar tu reputación y deja la puerta abierta.", answer: true },
  { type: "tf", text: "La reputación se construye cumpliendo lo prometido y manteniendo consistencia.", answer: true },
  { type: "tf", text: "Personalizar un mensaje es solo cambiar el saludo o añadir un emoji.", answer: false },
  { type: "tf", text: "Para reducir fricción, conviene ofrecer opciones claras (A/B) o un sí/no.", answer: true },
  { type: "tf", text: "Un siguiente paso apropiado es proponer dos horarios concretos para elegir.", answer: false },
  { type: "tf", text: "Insistir sin aportar valor o sin respetar tiempos perjudica tu reputación.", answer: true },
  { type: "tf", text: "Un mensaje demasiado largo reduce la probabilidad de que lo lean.", answer: true },
  { type: "tf", text: "Si no hay respuesta tras dos seguimientos, lo mejor es insistir cada día.", answer: false },
  { type: "tf", text: "Para construir confianza, sé claro, cumple y reconoce los aportes de otros.", answer: true },
  { type: "tf", text: "Un buen seguimiento con valor puede ser un resumen de 5 líneas acompañado de un recurso práctico.", answer: false },
  { type: "tf", text: "La reputación se gana principalmente con un mensaje viral o un logo atractivo.", answer: false },
]

function Page3({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 50,
  title = "Mensajes, seguimiento y reputación — Quiz (15, V/F)",
  topicTitle = "Primer mensaje • Solicitud clara • Seguimiento con valor • Cadencia • Cierre cortés • Reputación",
  layoutOption = "B",
  baseFontSize = 18,
  videoSrc = "https://www.youtube.com/embed/AgESphzIze8",
  videoPoster = "",
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: Page3Props) {
  void layoutOption

  const fs = Math.max(12, baseFontSize || 18)

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

  // Quiz state
  const total = DEFAULT_QUESTIONS_TF.length
  const [idx, setIdx] = useState(0)
  const [selection, setSelection] = useState<(boolean | null)[]>(Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(Array(total).fill(false))
  const [score, setScore] = useState(0)
  const [lock, setLock] = useState(false)

  const q = DEFAULT_QUESTIONS_TF[idx]
  const answeredCount = checked.filter(Boolean).length
  const finished = answeredCount === total
  const quizProgressPct = Math.round(((idx + 1) / total) * 100)

  // Styles & helpers
  const optStyle = (active: boolean): React.CSSProperties => ({
    padding: "24px 28px",
    borderRadius: 20,
    border: `3px solid ${active ? primaryColor : "rgba(0,0,0,0.08)"}`,
    background: active 
      ? `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)` 
      : `linear-gradient(135deg, #ffffff, #f8fafc)`,
    fontWeight: 800,
    fontSize: fs * 1.1,
    letterSpacing: 0.3,
    cursor: lock ? "not-allowed" : "pointer",
    userSelect: "none",
    textAlign: "center" as const,
    boxShadow: active 
      ? `0 12px 32px ${primaryColor}25, 0 4px 16px ${primaryColor}15` 
      : "0 6px 20px rgba(0,0,0,0.08), 0 3px 10px rgba(0,0,0,0.04)",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    position: "relative" as const,
    overflow: "hidden" as const,
    transform: "translateY(0) scale(1)",
  })

  const handleSelect = (value: boolean) => {
    if (lock || checked[idx]) return
    
    // Play click sound
    playClickSound()
    
    // Guardar selección
    const nextSel = [...selection]
    nextSel[idx] = value
    setSelection(nextSel)

    // Calificar de inmediato
    const isCorrect = value === q.answer
    const nextChecked = [...checked]
    const nextCorrect = [...correct]
    nextChecked[idx] = true
    nextCorrect[idx] = isCorrect
    setChecked(nextChecked)
    setCorrect(nextCorrect)
    
    const newScore = score + (isCorrect ? 1 : 0)
    if (isCorrect) setScore((s) => s + 1)

    // Track answer submission
    if (onAnswerSubmit) {
      console.log(`M5S3P3: Submitting answer ${idx}: ${value}, correct=${q.answer}, isCorrect=${isCorrect}`)
      onAnswerSubmit(idx, q.text, value, q.answer, isCorrect)
    }

    // Breve feedback y avanzar
    setLock(true)
    const isLast = idx === total - 1
    setTimeout(() => {
      setLock(false)
      if (!isLast) {
        setIdx((i) => i + 1)
      } else {
        // Last question - complete quiz
        console.log("M5S3P3: Last question answered, completing quiz with score:", newScore)
          if (onQuizComplete) {
            onQuizComplete(newScore)
          }
      }
    }, 900)
  }

  const feedback =
    checked[idx] && correct[idx] ? (
      <div style={{ color: "#0a7f35", fontWeight: 700 }}>✅ ¡Correcto!</div>
    ) : checked[idx] && !correct[idx] ? (
      <div style={{ color: "#b00020", fontWeight: 700 }}>
        ❌ Incorrecto. Era <strong>{q.answer ? "Verdadero" : "Falso"}</strong>
      </div>
    ) : null

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
                    background: `linear-gradient(135deg, #0F62FE, #2563EB, #3B82F6, #60A5FA)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "300% 300%",
                    textShadow: "0 6px 12px rgba(15, 98, 254, 0.3)",
                    filter: "drop-shadow(0 4px 8px rgba(15, 98, 254, 0.2))"
                  }}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ 
                    scale: 1,
                    opacity: 1,
                    y: [0, -12, 0, -8, 0],
                    backgroundPosition: ["0% 50%", "100% 50%", "50% 100%", "0% 50%"]
                  }}
                  transition={{ 
                    scale: { duration: 0.6, ease: "easeOut" },
                    opacity: { duration: 0.6, ease: "easeOut" },
                    y: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    backgroundPosition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {title}
                </motion.h1>
                <p style={{ margin: "8px 0 0", opacity: 0.9, fontSize: fs * 1.4 }}>
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </p>
              </motion.div>

              {/* Video opcional */}
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
                        Agrega la fuente de video en la prop <b>videoSrc</b>.
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Quiz VF */}
            <motion.div variants={itemVar}>
              <motion.div
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Card glow={primaryColor} padding={24}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 24
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12
                    }}>
                      <span style={{ fontSize: fs * 1.8 }}>🧠</span>
                      <h3 style={{ 
                        margin: 0, 
                        fontSize: fs * 1.4, 
                        color: primaryColor,
                        fontWeight: 800
                      }}>
                        Quiz de Verdadero/Falso
                      </h3>
                    </div>
                    <div style={{
                      background: `linear-gradient(135deg, ${primaryColor}, #8B5CF6)`,
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: 20,
                      fontSize: fs * 0.9,
                      fontWeight: 700
                    }}>
                      {total} Preguntas
                    </div>
                  </div>
                {/* Progreso del quiz */}
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

                {/* Enunciado */}
                <p
                  style={{
                    margin: "10px 0 18px",
                    lineHeight: 1.55,
                    fontSize: fs * 1.4,
                  }}
                >
                  {q.text}
                </p>

                {/* Opciones V/F (sin botones) */}
                <div
                  role="radiogroup"
                  aria-label="Opciones verdadero o falso"
                  style={{
                    display: "grid" as const,
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  {[
                    { label: "Verdadero", value: true, color: "#10B981" },
                    { label: "Falso", value: false, color: "#EF4444" },
                  ].map((opt) => {
                    const active = selection[idx] === opt.value
                    return (
                      <motion.div
                        key={String(opt.value)}
                        role="radio"
                        aria-checked={active}
                        className="tile"
                        onClick={() => handleSelect(opt.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") handleSelect(opt.value)
                        }}
                        tabIndex={0}
                        style={optStyle(active)}
                        whileHover={{ 
                          scale: 1.03, 
                          y: -3,
                          boxShadow: active 
                            ? `0 20px 50px ${primaryColor}35, 0 10px 30px ${primaryColor}25` 
                            : `0 12px 30px ${opt.color}25, 0 6px 15px ${opt.color}15`,
                          transition: { duration: 0.2, ease: "easeOut" }
                        }}
                        whileTap={{ 
                          scale: 0.95,
                          y: 1,
                          boxShadow: active 
                            ? `0 8px 25px ${primaryColor}20, 0 4px 15px ${primaryColor}15` 
                            : `0 6px 20px ${opt.color}15, 0 3px 10px ${opt.color}10`,
                          transition: { duration: 0.1, ease: "easeIn" }
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 30,
                          mass: 0.8
                        }}
                      >
                        {/* Ripple effect background */}
                        <div style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `radial-gradient(circle at center, ${opt.color}15, transparent 70%)`,
                          borderRadius: 20,
                          opacity: active ? 1 : 0,
                          transition: "opacity 0.3s ease"
                        }} />
                        
                        {/* Decorative corner element */}
                        <div style={{
                          position: "absolute",
                          top: -10,
                          right: -10,
                          width: 50,
                          height: 50,
                          background: `radial-gradient(circle, ${opt.color}20, transparent)`,
                          borderRadius: "50%"
                        }} />
                        
                        {/* Button content */}
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          zIndex: 2
                        }}>
                          <div style={{ 
                            fontWeight: 900, 
                            fontSize: fs * 1.2,
                            color: active ? primaryColor : "#333",
                            textShadow: active ? `0 2px 4px ${primaryColor}20` : "none",
                            transition: "all 0.3s ease"
                          }}>
                            {opt.label}
                      </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Feedback */}
                <div style={{ minHeight: 28, marginBottom: 4 }}>{feedback}</div>

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
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

/* ───────────────────────── Page 4: Multiple Choice Quiz ───────────────────────── */

type MCQuestion = {
  text: string
  options: string[]
  correctIndex: number
}

// Utility function to shuffle array while preserving original index mapping
const shuffleArray = <T,>(array: T[]): { item: T; originalIndex: number }[] => {
  const indexed = array.map((item, index) => ({ item, originalIndex: index }))
  const shuffled = [...indexed].sort(() => Math.random() - 0.5)
  return shuffled
}

const DEFAULT_QUESTIONS_MC: MCQuestion[] = [
  {
    text: "Un primer mensaje efectivo debe ser...",
    options: ["Largo y general", "Breve, personalizado y con propósito claro", "Impersonal", "Humorístico siempre"],
    correctIndex: 1,
  },
  {
    text: "La solicitud en el mensaje debe...",
    options: ["Incluir varias acciones", "Ser una acción concreta y fácil", "Ser ambigua", "No existir"],
    correctIndex: 1,
  },
  {
    text: "El seguimiento con valor implica...",
    options: ['Repetir "¿viste mi correo?"', "Aportar un recurso o síntesis útil", "Enviar stickers", "Presionar con urgencia"],
    correctIndex: 1,
  },
  {
    text: "Cadencia recomendable para seguimiento...",
    options: ["Cada hora", "A los 5–7 días con algo útil", "Cada 2 minutos", "Nunca"],
    correctIndex: 1,
  },
  {
    text: "Cerrar cortésmente a los 14–21 días sirve para...",
    options: ["Molestar", "Cuidar reputación y dejar puerta abierta", "Forzar respuesta", "Subir métricas"],
    correctIndex: 1,
  },
  {
    text: "La reputación se construye con...",
    options: ["Mensajes masivos", "Cumplir lo prometido y mantener consistencia", "Publicidad pagada", "Hashtags"],
    correctIndex: 1,
  },
  {
    text: "Personalizar un mensaje significa...",
    options: [
      "Usar el nombre y un chiste",
      "Referirse a algo específico del receptor (proyecto, post, charla)",
      "Cambiar el saludo",
      "Enviar emojis",
    ],
    correctIndex: 1,
  },
  {
    text: "Para reducir fricción, conviene...",
    options: ["Pedir cosas complejas", 'Ofrecer opciones claras (A/B) o un "sí/no"', "Adjuntar documentos largos", "Proponer reuniones sin agenda"],
    correctIndex: 1,
  },
  {
    text: 'Un ejemplo de "siguiente paso" apropiado es...',
    options: ['"Hablemos algún día"', '"¿Te viene bien mié 12:30 o jue 17:00?"', '"Llámame ya"', '"Pásame tu WhatsApp"'],
    correctIndex: 1,
  },
  {
    text: "La reputación negativa puede venir de...",
    options: ["Agradecer", "Insistir sin aportar valor o sin respetar tiempos", "Cumplir plazos", "Personalizar mensajes"],
    correctIndex: 1,
  },
  {
    text: "Un mensaje demasiado largo...",
    options: ["Mejora la respuesta", "Reduce la probabilidad de lectura", "Siempre funciona", "Es profesional"],
    correctIndex: 1,
  },
  {
    text: "Si no hay respuesta tras dos seguimientos...",
    options: ["Insiste cada día", "Cierra cortésmente y avanza", "Cambia de identidad de marca", "Bloquéalo"],
    correctIndex: 1,
  },
  {
    text: "Para construir confianza, es clave...",
    options: ["Responder tarde", "Ser claro, cumplir y reconocer aportes", "Evitar métricas", "Usar tecnicismos"],
    correctIndex: 1,
  },
  {
    text: "Un seguimiento con valor adecuado sería...",
    options: ['"¿Lo has visto?"', '"Te dejo un resumen de 5 líneas + recurso práctico"', '"Me urge"', '"¿Por qué no respondes?"'],
    correctIndex: 1,
  },
  {
    text: "La reputación se gana principalmente con...",
    options: ["Un mensaje viral", "Interacciones pequeñas y consistentes en el tiempo", "Un logo atractivo", "Un eslogan"],
    correctIndex: 1,
  },
]

function Page4({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 75,
  title = "Quiz: Mensajes, cadencia y reputación",
  topicTitle = "Mensaje inicial • Solicitud concreta • Seguimiento con valor • Cadencia • Reputación",
  layoutOption = "B",
  baseFontSize = 18,
  onAnswerSubmit,
  onQuizComplete,
  isAlreadyCompleted,
  completedScore,
}: Page4Props) {
  void layoutOption

  const fs = Math.max(12, baseFontSize || 18)

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

  // Estado del quiz
  const total = DEFAULT_QUESTIONS_MC.length
  const [idx, setIdx] = useState(0)
  const [selection, setSelection] = useState<(number | null)[]>(Array(total).fill(null))
  const [checked, setChecked] = useState<boolean[]>(Array(total).fill(false))
  const [correct, setCorrect] = useState<boolean[]>(Array(total).fill(false))
  const [score, setScore] = useState(0)
  const [lock, setLock] = useState(false)

  // Shuffle questions to randomize answer positions
  const shuffledQuestions = useMemo(() => {
    return DEFAULT_QUESTIONS_MC.map(question => {
      const shuffled = shuffleArray(question.options)
      const correctOriginalIndex = question.correctIndex
      const newCorrectIndex = shuffled.findIndex(item => item.originalIndex === correctOriginalIndex)
      
      return {
        ...question,
        options: shuffled.map(item => item.item),
        correctIndex: newCorrectIndex
      }
    })
  }, [])

  const q = shuffledQuestions[idx]
  const finished = checked.filter(Boolean).length === total
  const quizProgressPct = Math.round(((idx + 1) / total) * 100)

  const handlePick = (i: number) => {
    if (lock || checked[idx]) return
    if (i < 0 || i >= q.options.length) return

    // Play click sound
    playClickSound()

    // Guardar selección
    const nextSel = [...selection]
    nextSel[idx] = i
    setSelection(nextSel)

    // Calificar inmediato
    const isCorrect = i === q.correctIndex
    const nextChk = [...checked]
    const nextCor = [...correct]
    nextChk[idx] = true
    nextCor[idx] = isCorrect
    setChecked(nextChk)
    setCorrect(nextCor)
    
    const newScore = score + (isCorrect ? 1 : 0)
    if (isCorrect) setScore((s) => s + 1)

    // Track answer submission
    if (onAnswerSubmit) {
      console.log(`M5S3P4: Submitting answer ${idx}: ${i}, correct=${q.correctIndex}, isCorrect=${isCorrect}`)
      onAnswerSubmit(idx, q.text, q.options[i], q.options[q.correctIndex], isCorrect)
    }

    // Breve pausa para feedback y avanzar
    setLock(true)
    const last = idx === total - 1
    setTimeout(() => {
      setLock(false)
      if (!last) {
        setIdx((n) => n + 1)
      } else {
        // Last question - complete quiz
        console.log("M5S3P4: Last question answered, completing quiz with score:", newScore)
        setTimeout(() => {
          if (onQuizComplete) {
            onQuizComplete(newScore)
          }
        }, 100)
      }
    }, 900)
  }

  // Estilo de cada opción (resalta correcta/incorrecta tras responder)
  const tileStyle = (i: number): React.CSSProperties => {
    const selected = selection[idx] === i

    let border = "3px solid rgba(0,0,0,0.08)"
    let bg = "linear-gradient(135deg, #ffffff, #f8fafc)"
    let color = "#333"
    let boxShadow = "0 6px 20px rgba(0,0,0,0.08), 0 3px 10px rgba(0,0,0,0.04)"

    if (checked[idx]) {
      if (i === q.correctIndex) {
        border = "3px solid #10B981"
        bg = "linear-gradient(135deg, #10B98115, #10B98108)"
        color = "#0a7f35"
        boxShadow = "0 12px 32px #10B98125, 0 4px 16px #10B98115"
      } else if (selected && i !== q.correctIndex) {
        border = "3px solid #EF4444"
        bg = "linear-gradient(135deg, #EF444415, #EF444408)"
        color = "#b00020"
        boxShadow = "0 12px 32px #EF444425, 0 4px 16px #EF444415"
      }
    } else if (selected) {
      border = `3px solid ${primaryColor}`
      bg = `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`
      color = primaryColor
      boxShadow = `0 12px 32px ${primaryColor}25, 0 4px 16px ${primaryColor}15`
    }

    return {
      padding: "20px 24px",
      borderRadius: 16,
      border,
      background: bg,
      fontWeight: 800,
      fontSize: fs * 1.1,
      letterSpacing: 0.3,
      cursor: lock ? "not-allowed" : "pointer",
      userSelect: "none",
      textAlign: "left" as const,
      boxShadow,
      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      position: "relative" as const,
      overflow: "hidden" as const,
      color,
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
              {/* Título + Tema */}
              <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 2.1, 
                    lineHeight: 1.15,
                    background: "linear-gradient(135deg, #0F62FE, #2563EB, #3B82F6, #60A5FA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "300% 300%",
                    textShadow: "0 6px 12px rgba(15, 98, 254, 0.3)",
                    filter: "drop-shadow(0 4px 8px rgba(15, 98, 254, 0.2))"
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    y: [0, -8, 0]
                  }}
                  transition={{
                    backgroundPosition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {title}
                </motion.h1>
              <p style={{ margin: "8px 0 0", opacity: 0.9, fontSize: fs * 1.1, whiteSpace: "pre-wrap" }}>
                <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
              </p>
            </motion.div>

            {/* Tarjeta del Quiz */}
            <motion.div variants={itemVar}>
            <Card glow={primaryColor}>
              {/* Progreso del quiz */}
              <div
                style={{
                  display: "flex" as const,
                  alignItems: "center" as const,
                  justifyContent: "space-between" as const,
                  marginBottom: 14,
                }}
              >
                <strong style={{ fontSize: fs * 1.05 }}>
                  Pregunta {Math.min(idx + 1, total)} / {total}
                </strong>
                <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 10 }}>
                  <div
                    style={{
                      width: 240,
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

              {/* Enunciado */}
              <p style={{ margin: "10px 0 16px", lineHeight: 1.55, fontSize: fs * 1.1, whiteSpace: "pre-wrap" }}>{q.text}</p>

              {/* Opciones (sin botones) */}
              <div
                role="radiogroup"
                aria-label="Opciones de la pregunta"
                style={{
                  display: "grid" as const,
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 16,
                  marginBottom: 14,
                }}
              >
                {q.options.map((opt, i) => {
                  const letters = ['A', 'B', 'C', 'D']
                  const selected = selection[idx] === i
                  
                  return (
                    <motion.div
                    key={i}
                    role="radio"
                      aria-checked={selected}
                    className="tile"
                    tabIndex={0}
                    onClick={() => handlePick(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handlePick(i)
                    }}
                    style={tileStyle(i)}
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        boxShadow: selected
                          ? `0 20px 50px ${primaryColor}35, 0 10px 30px ${primaryColor}25`
                          : "0 12px 30px rgba(0,0,0,0.15), 0 6px 15px rgba(0,0,0,0.08)",
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                      whileTap={{
                        scale: 0.98,
                        y: 0,
                        transition: { duration: 0.1, ease: "easeIn" }
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        mass: 0.8
                      }}
                    >
                      {/* Letter indicator */}
                      <div style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: selected 
                          ? primaryColor 
                          : "rgba(0,0,0,0.1)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                        fontSize: fs * 0.9,
                        boxShadow: selected 
                          ? `0 4px 12px ${primaryColor}40`
                          : "0 2px 8px rgba(0,0,0,0.1)"
                      }}>
                        {letters[i]}
                      </div>
                      
                      {/* Option text */}
                      <div style={{
                        paddingRight: 50,
                        lineHeight: 1.4
                      }}>
                    {opt}
                  </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Feedback para la pregunta actual */}
              <div style={{ minHeight: 28, marginBottom: 4 }}>{feedback}</div>

              {/* Resultado final (sin botón de reinicio) */}
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
                    {score} / {total}
                  </span>
                </div>
              )}
            </Card>
            </motion.div>

            {/* Billy and Drago Facts */}
            <motion.div variants={itemVar} style={{ marginTop: 24 }}>
              <MarketingFactsAnimation
                facts={[
                  {
                    character: "billy",
                    text: "Tener un elevator pitch claro multiplica tus oportunidades de conexión.",
                    characterImage: "/2.png"
                  },
                  {
                    character: "drago",
                    text: "El 68% de los profesionales afirma que el networking fue clave en su último ascenso.",
                    characterImage: "/drago1.png"
                  },
                  {
                    character: "billy",
                    text: "La reciprocidad en tu red mejora tu posicionamiento como aliado estratégico.",
                    characterImage: "/2.png"
                  },
                  {
                    character: "drago",
                    text: "Un networking constante consolida tu autoridad y visibilidad a largo plazo.",
                    characterImage: "/drago1.png"
                  }
                ]}
                baseFontSize={fs}
              />
            </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

/* ───────────────────────── Page 5: Flashcards Activity ───────────────────────── */

const DEFAULT_INSTRUCTIONS: string[] = [
  // Mensaje inicial (Día 0)
  `Objetivo: abrir puerta con claridad y relevancia (2–3 líneas).
Ejemplo:
Hola [Nombre], vi tu [post/proyecto/charla] sobre [tema]. Soy [tu nombre]; ayudo a [público] a [resultado] con [método].
¿Te viene bien una mini llamada de 10 min esta semana para [propósito concreto: p.ej., validar X/compartir Y]? (Día 0)`,

  // Seguimiento con valor (Día 7)
  `Objetivo: aportar utilidad, no presionar.
Ejemplo:
Hola [Nombre], la semana pasada te escribí sobre [tema]. Te comparto un recurso de 2–3 min: [link/resumen] que resume [beneficio].
Si te sirve, puedo adaptar [X] a tu contexto en 10 min. ¿Martes o jueves? (Día 7)`,

  // Cierre cortés (Día 14–21)
  `Objetivo: cerrar el hilo con respeto, dejando puerta abierta.
Ejemplo:
Cierro este hilo para no ocupar tu bandeja. Si en algún momento [señal concreta de utilidad], con gusto retomo.
Gracias por tu tiempo; quedo atento/a si prefieres que lo revisemos más adelante. (Día 14–21)`,
]

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
  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setOpen((v) => !v)
      }}
      whileHover={{ opacity: 0.85 }}
      whileTap={{ opacity: 0.75 }}
      transition={{ duration: 0.2 }}
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
        transition: "background 160ms ease, border-color 160ms ease",
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
          whiteSpace: "pre-wrap",
        }}
      >
        {open ? back : "Toca para ver"}
      </p>
    </motion.div>
  )
}

function Page5({
  brandName = "BIZEN",
  logoSrc = "/bizen-mondragonlogo.png",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  progressPercent = 100,
  title = "Actividad — 3 Mensajes y cadencia",
  layoutOption = "B",
  baseFontSize = 18,
  instructions = DEFAULT_INSTRUCTIONS,
  gridColumns = 1,
  gridGap = 16,
}: Page5Props) {
  void layoutOption

  const fs = Math.max(12, baseFontSize || 18)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false])
  const [currentStep, setCurrentStep] = useState(0)

  const DEFAULT_TITLES = ["Mensaje inicial (Día 0)", "Seguimiento con valor (Día 7)", "Cierre cortés (Día 14–21)"]
  const list = (instructions?.length ? instructions : DEFAULT_INSTRUCTIONS).map((t: string, i: number) => ({
    front: DEFAULT_TITLES[i] || `Paso ${i + 1}`,
    back: t,
  }))

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
      {/* CSS simple para "breathing" */}
      <style>{`
        @keyframes breathe { 0%{transform:scale(1)} 50%{transform:scale(1.15)} 100%{transform:scale(1)} }
        @keyframes barPulse { 0%{transform:scaleY(1)} 50%{transform:scaleY(1.06)} 100%{transform:scaleY(1)} }
        .breathing { animation: breathe 1.2s ease-in-out infinite; }
        .barPulse { animation: barPulse 1.2s ease-in-out infinite; transform-origin: center; }
      `}</style>

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
              {/* Título con efecto flotante azul */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 2.4, 
                    lineHeight: 1.15,
                    background: "linear-gradient(135deg, #0F62FE, #2563EB, #3B82F6, #60A5FA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "300% 300%",
                    textShadow: "0 6px 12px rgba(15, 98, 254, 0.3)",
                    filter: "drop-shadow(0 4px 8px rgba(15, 98, 254, 0.2))",
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    y: [0, -8, 0]
                  }}
                  transition={{
                    backgroundPosition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {title}
                </motion.h1>
              </motion.div>

              {/* Interactive Progress Timeline */}
              <motion.div variants={itemVar} style={{ marginBottom: 32 }}>
                <motion.div
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                    border: `2px solid ${primaryColor}20`,
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: `0 8px 32px ${primaryColor}15, 0 4px 16px rgba(0,0,0,0.05)`,
                    position: "relative" as const,
                    overflow: "hidden" as const
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20
                  }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: fs * 1.3,
                      fontWeight: 800,
                      color: primaryColor,
                      background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                      Tu Progreso de Actividad
                    </h3>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    }}>
                      <span style={{
                        fontSize: fs * 1.1,
                        fontWeight: 700,
                        color: primaryColor
                      }}>
                        {completedSteps.filter(Boolean).length}/3
                      </span>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 4px 12px ${primaryColor}30`
                      }}>
                        <span style={{ color: "white", fontSize: fs * 1.2, fontWeight: 800 }}>
                          {completedSteps.filter(Boolean).length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Timeline */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative" as const
                  }}>
                    {DEFAULT_TITLES.map((title, index) => (
                      <motion.div
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column" as const,
                          alignItems: "center",
                          flex: 1,
                          position: "relative" as const,
                          zIndex: 2
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentStep(index)}
                      >
                        {/* Step Circle */}
                        <motion.div
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            background: completedSteps[index] 
                              ? `linear-gradient(135deg, #10B981, #059669)`
                              : currentStep === index
                                ? `linear-gradient(135deg, ${primaryColor}, #3B82F6)`
                                : "linear-gradient(135deg, #E5E7EB, #D1D5DB)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 12,
                            cursor: "pointer",
                            boxShadow: completedSteps[index]
                              ? "0 6px 20px #10B98140"
                              : currentStep === index
                                ? `0 6px 20px ${primaryColor}40`
                                : "0 4px 12px rgba(0,0,0,0.1)"
                          }}
                          whileTap={{ scale: 0.9 }}
                          animate={{
                            scale: currentStep === index ? [1, 1.1, 1] : 1,
                            boxShadow: currentStep === index 
                              ? [`0 6px 20px ${primaryColor}40`, `0 8px 25px ${primaryColor}50`, `0 6px 20px ${primaryColor}40`]
                              : undefined
                          }}
                          transition={{
                            scale: { duration: 0.5, repeat: Infinity, repeatDelay: 1 },
                            boxShadow: { duration: 0.5, repeat: Infinity, repeatDelay: 1 }
                          }}
                        >
                          {completedSteps[index] ? (
                            <span style={{ color: "white", fontSize: fs * 1.2, fontWeight: 800 }}>✓</span>
                          ) : (
                            <span style={{ 
                              color: currentStep === index ? "white" : "#6B7280", 
                              fontSize: fs * 1.1, 
                              fontWeight: 800 
                            }}>
                              {index + 1}
                            </span>
                          )}
                        </motion.div>

                        {/* Step Title */}
                        <motion.p
                          style={{
                            margin: 0,
                            fontSize: fs * 0.9,
                            fontWeight: 600,
                            color: completedSteps[index] 
                              ? "#10B981"
                              : currentStep === index
                                ? primaryColor
                                : "#6B7280",
                            textAlign: "center" as const,
                            lineHeight: 1.3
                          }}
                          animate={{
                            color: currentStep === index ? [primaryColor, "#3B82F6", primaryColor] : undefined
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatDelay: 0.5
                          }}
                        >
                          {title}
                        </motion.p>

                        {/* Connecting Line */}
                        {index < DEFAULT_TITLES.length - 1 && (
                          <div style={{
                            position: "absolute",
                            top: 25,
                            left: "calc(50% + 25px)",
                            right: "calc(-50% + 25px)",
                            height: 2,
                            background: `linear-gradient(90deg, ${primaryColor}40, ${primaryColor}20)`,
                            zIndex: 1
                          }} />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Instrucciones interactivas */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.div
                  style={{
                    background: "linear-gradient(135deg, #f8fafc, #ffffff)",
                    border: `2px solid ${primaryColor}20`,
                    borderRadius: 20,
                    padding: 24,
                    boxShadow: `0 8px 32px ${primaryColor}15, 0 4px 16px rgba(0,0,0,0.05)`,
                    position: "relative" as const,
                    overflow: "hidden" as const
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Decorative elements */}
                  <div style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    background: `radial-gradient(circle, ${primaryColor}15, transparent)`,
                    borderRadius: "50%"
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: -10,
                    left: -10,
                    width: 60,
                    height: 60,
                    background: `radial-gradient(circle, ${primaryColor}10, transparent)`,
                    borderRadius: "50%"
                  }} />
                  
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 16
                    }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                        boxShadow: `0 4px 12px ${primaryColor}30`
                      }}>
                        <span style={{ color: "white", fontSize: fs * 1.2, fontWeight: 800 }}>📝</span>
                      </div>
                      <h3 style={{
                        margin: 0,
                        fontSize: fs * 1.3,
                        fontWeight: 800,
                        color: primaryColor,
                        background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}>
                        Instrucciones de la Actividad
                      </h3>
                    </div>
                    <p style={{ 
                      margin: 0, 
                      color: "#374151", 
                      fontSize: fs * 1.1, 
                      lineHeight: 1.6,
                      fontWeight: 500
                    }}>
                      Escribe <strong style={{ color: primaryColor }}>3 mensajes</strong> y define su cadencia: 
                      <span style={{ color: primaryColor, fontWeight: 700 }}> día 0</span> (inicial), 
                      <span style={{ color: primaryColor, fontWeight: 700 }}> día 7</span> (seguimiento con valor) y 
                      <span style={{ color: primaryColor, fontWeight: 700 }}> día 14–21</span> (cierre cortés). 
                      Mantén claridad, una sola acción y aporta utilidad en el seguimiento.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Flashcards interactivas */}
              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <motion.div
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                    border: `2px solid ${primaryColor}20`,
                    borderRadius: 24,
                    padding: 28,
                    boxShadow: `0 12px 40px ${primaryColor}15, 0 6px 20px rgba(0,0,0,0.08)`,
                    position: "relative" as const,
                    overflow: "hidden" as const
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Decorative background elements */}
                  <div style={{
                    position: "absolute",
                    top: -30,
                    left: -30,
                    width: 100,
                    height: 100,
                    background: `radial-gradient(circle, ${primaryColor}08, transparent)`,
                    borderRadius: "50%"
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    background: `radial-gradient(circle, ${primaryColor}12, transparent)`,
                    borderRadius: "50%"
                  }} />
                  
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 20
                    }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 16,
                        boxShadow: `0 6px 16px ${primaryColor}35`
                      }}>
                        <span style={{ color: "white", fontSize: fs * 1.4, fontWeight: 800 }}>🎯</span>
                      </div>
                      <div>
                        <h3 style={{ 
                          margin: "0 0 4px 0", 
                          fontSize: fs * 1.4, 
                          fontWeight: 800,
                          background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent"
                        }}>
                          Plantillas de Mensajes
                        </h3>
                        <p style={{ 
                          margin: 0, 
                          fontSize: fs * 0.95, 
                          color: "#6B7280",
                          fontWeight: 500
                        }}>
                          Para tu libreta personal
                        </p>
                      </div>
                    </div>
                    
                    <motion.div
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}05)`,
                        borderRadius: 16,
                        padding: 20,
                        marginBottom: 24,
                        border: `1px solid ${primaryColor}20`
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <p style={{ 
                        margin: 0, 
                        fontSize: fs * 1.05, 
                        color: "#374151",
                        lineHeight: 1.6,
                        fontWeight: 500,
                        textAlign: "center" as const
                      }}>
                        <span style={{ color: primaryColor, fontWeight: 700 }}>💡 Toca cada tarjeta</span> para ver la plantilla. 
                        Adáptala a tu contexto y anota las <strong style={{ color: primaryColor }}>fechas aproximadas</strong>.
                      </p>
                    </motion.div>

                    <GridFlashcards gap={gridGap} columns={gridColumns}>
                      {list.map((c: { front: string; back: string }, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          whileHover={{ 
                            scale: 1.05, 
                            y: -5,
                            rotateY: hoveredCard === i ? 5 : 0
                          }}
                          whileTap={{ scale: 0.98 }}
                          onHoverStart={() => setHoveredCard(i)}
                          onHoverEnd={() => setHoveredCard(null)}
                          onClick={() => {
                            const newCompleted = [...completedSteps]
                            newCompleted[i] = true
                            setCompletedSteps(newCompleted)
                            setCurrentStep((i + 1) % 3)
                          }}
                          style={{
                            cursor: "pointer",
                            position: "relative" as const,
                            transformStyle: "preserve-3d" as const
                          }}
                        >
                          <motion.div
                            style={{
                              position: "relative" as const,
                              transformStyle: "preserve-3d" as const
                            }}
                            animate={{
                              rotateY: hoveredCard === i ? 5 : 0,
                              scale: completedSteps[i] ? 1.02 : 1
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <Flashcard 
                              front={c.front} 
                              back={c.back} 
                              primaryColor={completedSteps[i] ? "#10B981" : primaryColor} 
                              fontSize={fs} 
                            />
                            
                            {/* Completion Checkmark Overlay */}
                            {completedSteps[i] && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ 
                                  type: "spring", 
                                  stiffness: 500, 
                                  damping: 30,
                                  delay: 0.2
                                }}
                                style={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  width: 32,
                                  height: 32,
                                  borderRadius: "50%",
                                  background: "linear-gradient(135deg, #10B981, #059669)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow: "0 4px 12px #10B98140",
                                  zIndex: 10
                                }}
                              >
                                <span style={{ 
                                  color: "white", 
                                  fontSize: fs * 1.1, 
                                  fontWeight: 800 
                                }}>
                                  ✓
                                </span>
                              </motion.div>
                            )}

                            {/* Hover Glow Effect */}
                            {hoveredCard === i && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                  position: "absolute",
                                  top: -4,
                                  left: -4,
                                  right: -4,
                                  bottom: -4,
                                  background: `radial-gradient(circle, ${primaryColor}20, transparent 70%)`,
                                  borderRadius: 16,
                                  zIndex: -1
                                }}
                              />
                            )}
                          </motion.div>
                        </motion.div>
                      ))}
                    </GridFlashcards>
                  </div>
                </motion.div>
              </motion.div>

              {/* Completion Celebration */}
              {completedSteps.every(Boolean) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    delay: 0.5
                  }}
                  style={{ marginTop: 32 }}
                >
                  <motion.div
                    style={{
                      background: "linear-gradient(135deg, #10B981, #059669)",
                      borderRadius: 24,
                      padding: 32,
                      textAlign: "center" as const,
                      boxShadow: "0 16px 50px #10B98130, 0 8px 25px rgba(16, 185, 129, 0.2)",
                      position: "relative" as const,
                      overflow: "hidden" as const
                    }}
                    animate={{
                      boxShadow: [
                        "0 16px 50px #10B98130, 0 8px 25px rgba(16, 185, 129, 0.2)",
                        "0 20px 60px #10B98140, 0 12px 35px rgba(16, 185, 129, 0.3)",
                        "0 16px 50px #10B98130, 0 8px 25px rgba(16, 185, 129, 0.2)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Celebration Background Elements */}
                    <div style={{
                      position: "absolute",
                      top: -50,
                      left: -50,
                      width: 100,
                      height: 100,
                      background: "radial-gradient(circle, rgba(255,255,255,0.2), transparent)",
                      borderRadius: "50%"
                    }} />
                    <div style={{
                      position: "absolute",
                      bottom: -30,
                      right: -30,
                      width: 80,
                      height: 80,
                      background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent)",
                      borderRadius: "50%"
                    }} />

                    <div style={{ position: "relative", zIndex: 2 }}>
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          fontSize: fs * 4,
                          marginBottom: 16
                        }}
                      >
                        🎉
                      </motion.div>
                      
                      <h2 style={{
                        margin: "0 0 12px 0",
                        fontSize: fs * 1.8,
                        fontWeight: 800,
                        color: "white",
                        textShadow: "0 2px 4px rgba(0,0,0,0.2)"
                      }}>
                        ¡Actividad Completada!
                      </h2>
                      
                      <p style={{
                        margin: "0 0 20px 0",
                        fontSize: fs * 1.1,
                        color: "rgba(255,255,255,0.9)",
                        lineHeight: 1.5
                      }}>
                        Has completado todas las plantillas de mensajes. 
                        <br />
                        <strong>¡Ahora tienes todo listo para tu estrategia de networking!</strong>
                      </p>

                      <motion.div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 12,
                          marginTop: 20
                        }}
                        animate={{
                          y: [0, -5, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <span style={{
                          fontSize: fs * 1.2,
                          color: "white",
                          fontWeight: 700
                        }}>
                          ✓ 3/3 Plantillas Listas
                        </span>
                        <div style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.8)"
                        }} />
                        <span style={{
                          fontSize: fs * 1.2,
                          color: "white",
                          fontWeight: 700
                        }}>
                          ✓ Cadencia Definida
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

const M5S3_CONTENT: Record<number, React.ReactNode> = {
  1: <Page1 />,
  2: <Page2 />,
  3: <Page3 />,
  4: <Page4 />,
  5: <Page5 />,
}

export default M5S3_CONTENT

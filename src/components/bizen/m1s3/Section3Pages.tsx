// src/components/bizen/m1s3/Section3Pages.tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import SectionPageHeader from "@/components/bizen/SectionPageHeader";
import MarketingFactsAnimation from "@/components/MarketingFactsAnimation";

// === Config ===
const MAX_WIDTH = "100%";

// === UI helpers ===
function Card({
  children,
  glow,
  borderColor = "rgba(0,0,0,0.08)",
}: {
  children: React.ReactNode;
  glow?: string;
  borderColor?: string;
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
  );
}


// Page 1 - Tendencias en plataformas
function Page1() {
  const brandName = "BIZEN";
  const logoSrc = "/bizen-mondragonlogo.png";
  const primaryColor = "#0F62FE";
  const background = "#FFFFFF";
  const progressPercent = 0;
  const title = "Sección 3";
  const topicTitle = "Tendencias en plataformas (Instagram, TikTok, YouTube, Twitch)";
  const keyIdea = "La plataforma no es el objetivo; es el medio. El contenido se adapta a su cultura y formato.";
  const trustTitle = "Qué conviene a cada una (2025)";
  const trustTransparencyItems = [
    "Video corto, ritmo rápido",
    "Retención y finalización pesan mucho",
    "Ideal para descubrimiento/viralidad",
  ];
  const trustEvidenceItems = [
    "Estética + Reels + carouseles",
    "Carouseles = educación paso a paso",
    "Stories = urgencia (cuentas regresivas, links)",
  ];
  const trustCoherenceItems = [
    "Videos largos/guías",
    "SEO, capítulos y miniaturas trabajadas",
    "Perfecto para profundidad y evergreen",
  ];
  const toolsTitle = "Twitch (en vivo)";
  const toolsCalendarItems = [
    "Interacción directa: preguntas y demos",
    "Comunidad fiel en tiempo real",
    "En vivo ideal para lanzamientos y activaciones",
  ];
  const baseFontSize = 18;

  const fs = Math.max(12, baseFontSize || 18);
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)));

  const wrapper: React.CSSProperties = {
    width: "100%",
    minHeight: "100vh",
    display: "flex" as const,
    flexDirection: "column" as const,
    justifyContent: "flex-start" as const,
    background,
    color: "#111",
    fontFamily:
      "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
    fontSize: fs,
  };

  const container: React.CSSProperties = {
    width: "100%",
    maxWidth: "none",
    padding: "20px",
    boxSizing: "border-box" as const,
    margin: "0",
  };

  // Add shimmer and floating effects for title
  React.useEffect(() => {
    const styleId = 'm1s3-page1-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes breath { 
          0% { transform: scale(1) } 
          50% { transform: scale(1.08) } 
          100% { transform: scale(1) } 
        }
        .breath { animation: breath 2s ease-in-out infinite; transform-origin: center; }
        .pressable { transition: transform .12s ease }
        .pressable:hover { transform: scale(0.96) }
        .pressable:active { transform: scale(0.9) }
        .fade-in { animation: fadeInUp .32s ease-out both }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px) }
          to   { opacity: 1; transform: translateY(0) }
        }
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
    <div style={wrapper}>

      <SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%" }}>
        {/* Contenido */}
        <section>
          <div style={{ ...container }}>
            {/* Título + Tema */}
            <motion.div 
              className="fade-in" 
              style={{ marginBottom: 12 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                style={{ 
                  margin: 0, 
                  fontSize: fs * 3.0, 
                  lineHeight: 1.15,
                  background: "linear-gradient(135deg, #1e40af, #3B82F6, #60A5FA, #1e40af)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer-title 3s ease-in-out infinite",
                  filter: "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"
                }}
                animate={{
                  y: [0, -8, 0],
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
                <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span>{" "}
                {topicTitle}
              </p>
            </motion.div>

            {/* Idea clave */}
            <div className="fade-in" style={{ marginBottom: 16 }}>
              <div
                style={{
                  border: `1px solid ${primaryColor}44`,
                  background: `${primaryColor}0F`,
                  color: "#111",
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <strong
                  style={{
                    color: primaryColor,
                    display: "block" as const,
                    marginBottom: 6,
                    fontSize: fs,
                  }}
                >
                  Idea clave
                </strong>
                <p style={{ margin: 0, opacity: 0.95, fontSize: fs }}>{keyIdea}</p>
              </div>
            </div>

            {/* Plataformas */}
            <div className="fade-in" style={{ marginBottom: 16 }}>
              <Card glow={primaryColor}>
                <h3 style={{ margin: "0 0 12px 0", fontSize: fs * 1.355 }}>{trustTitle}</h3>

                <div style={{ display: "grid" as const, gridTemplateColumns: "1fr", gap: 16 }}>
                  {/* TikTok */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #1e40af, #3B82F6)",
                      border: "2px solid #3B82F6",
                      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
                    }}
                  >
                    <h4 style={{ margin: "0 0 8px 0", color: "white", fontSize: fs * 1.2, fontWeight: 700 }}>
                      ⚡ TikTok
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95, color: "white" }}>
                      {trustTransparencyItems.map((t, i) => (
                        <li key={`tk-${i}`} style={{ marginBottom: 6 }}>{t}</li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Instagram */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                      border: "2px solid #0284c7",
                      boxShadow: "0 10px 30px rgba(2, 132, 199, 0.3)"
                    }}
                  >
                    <h4 style={{ margin: "0 0 8px 0", color: "white", fontSize: fs * 1.2, fontWeight: 700 }}>
                      📸 Instagram
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95, color: "white" }}>
                      {trustEvidenceItems.map((t, i) => (
                        <li key={`ig-${i}`} style={{ marginBottom: 6 }}>{t}</li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* YouTube */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                      border: "2px solid #0891b2",
                      boxShadow: "0 10px 30px rgba(8, 145, 178, 0.3)"
                    }}
                  >
                    <h4 style={{ margin: "0 0 8px 0", color: "white", fontSize: fs * 1.2, fontWeight: 700 }}>
                      🎥 YouTube
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95, color: "white" }}>
                      {trustCoherenceItems.map((t, i) => (
                        <li key={`yt-${i}`} style={{ marginBottom: 6 }}>{t}</li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </Card>
            </div>

            {/* Twitch */}
            <motion.div 
              className="fade-in" 
              style={{ marginBottom: 16 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                style={{
                  position: "relative" as const,
                  borderRadius: 16,
                  padding: 20,
                  border: `2px solid #14b8a6`,
                  background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                  boxShadow: "0 15px 40px rgba(20, 184, 166, 0.4)",
                  overflow: "hidden" as const,
                }}
              >
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent)",
                  animation: "shimmer 3s linear infinite"
                }} />
                
                <h3 style={{ 
                  margin: "0 0 12px 0", 
                  fontSize: fs * 1.355,
                  color: "white",
                  fontWeight: 700,
                  position: "relative" as const,
                  zIndex: 1,
                }}>
                  🎮 {toolsTitle}
                </h3>
                <ul style={{ 
                  margin: 0, 
                  paddingLeft: 18, 
                  opacity: 0.95,
                  color: "white",
                  position: "relative" as const,
                  zIndex: 1,
                }}>
                  {toolsCalendarItems.map((t, i) => (
                    <motion.li 
                      key={`tw-${i}`} 
                      style={{ marginBottom: 6 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    >
                      {t}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

          </div>
        </section>
      </main>
    </div>
  );
}

// Helper components for Page2
const containerVar: React.ComponentProps<typeof motion.div>['variants'] = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVar: React.ComponentProps<typeof motion.div>['variants'] = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function MetricRow({
  title,
  items,
  imageSrc,
  primaryColor,
  fs,
  reverse = false,
}: {
  title: string;
  items: string[];
  imageSrc?: string;
  primaryColor: string;
  fs: number;
  reverse?: boolean;
}) {
  const hasImage = !!imageSrc;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex" as const,
        flexDirection: reverse ? "row-reverse" : "row",
        gap: 20,
        alignItems: "stretch" as const,
        marginBottom: 24,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          flex: 1,
          border: `3px solid ${primaryColor}40`,
          borderRadius: 20,
          padding: 24,
          background: `linear-gradient(135deg, ${primaryColor}08, #fff)`,
          boxShadow: `0 8px 24px ${primaryColor}20`,
          position: "relative" as const,
          overflow: "hidden" as const,
        }}
      >
        {/* Decorative accent */}
        <div
          style={{
            position: "absolute" as const,
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}88)`,
          }}
        />
        
        <h4
          style={{
            margin: "0 0 16px 0",
            color: primaryColor,
            fontSize: fs * 1.2,
            fontWeight: 700,
          }}
        >
          {title}
        </h4>
        <ul
          style={{
            margin: 0,
            paddingLeft: 24,
            fontSize: fs * 1.05,
            lineHeight: 1.7,
            listStyle: "none",
          }}
        >
          {items.map((it, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ 
                marginBottom: 12,
                paddingLeft: 8,
                position: "relative" as const,
              }}
            >
              <span 
                style={{ 
                  position: "absolute" as const,
                  left: "-16px",
                  color: primaryColor,
                  fontWeight: 800,
                  fontSize: fs * 0.9,
                }}
              >
                •
              </span>
              {it}
            </motion.li>
          ))}
        </ul>
      </motion.div>

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
    </motion.div>
  );
}

// Page 2 - Buenas prácticas y errores comunes
function Page2() {
  const brandName = "BIZEN";
  const logoSrc = "/bizen-mondragonlogo.png";
  const primaryColor = "#0F62FE";
  const background = "#FFFFFF";
  const progressPercent = 25;
  const title = "Sección 3";
  const topicTitle = "Buenas prácticas transversales, errores comunes y ejemplos rápidos";
  const baseFontSize = 18;

  // Increased font size for larger text
  const fs = Math.max(16, baseFontSize || 24);
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)));

  // Floating animation variants
  const floatingVariants = {
    float: {
      y: [-8, 8, -8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Add shimmer and floating keyframes
  React.useEffect(() => {
    const styleId = 'm1s3-page2-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer-title {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const wrapper: React.CSSProperties = {
    width: "100%",
    minHeight: "100vh",
    display: "flex" as const,
    flexDirection: "column" as const,
    justifyContent: "flex-start" as const,
    background: "linear-gradient(135deg, #E0F2FE 0%, #F8FAFC 50%, #F0F9FF 100%)",
    color: "#111",
    fontFamily:
      "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
    fontSize: fs,
  };

  const container: React.CSSProperties = {
    width: "100%",
    padding: "clamp(16px, 3vw, 32px)",
    boxSizing: "border-box" as const,
    margin: "0",
  };

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
              {/* Shimmer Title with Floating Effect */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.5, 
                    lineHeight: 1.15,
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <span style={{
                    background: `linear-gradient(90deg, #1e40af, #3B82F6, #60A5FA, #1e40af)`,
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                    animation: "shimmer 3s infinite linear",
                  }}>
                    {title}
                  </span>
                </motion.h1>
                <motion.p 
                  variants={floatingVariants}
                  animate="float"
                  style={{ 
                    margin: "12px 0 0", 
                    opacity: 0.9, 
                    fontSize: fs * 1.6,
                    color: "#1E40AF",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "#60A5FA", fontWeight: 700, fontSize: "1.3em" }}>▌</span> {topicTitle}
                </motion.p>
              </motion.div>

              {/* Enhanced Card with Gradient Background */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div
                  style={{
                    position: "relative" as const,
                    borderRadius: "24px",
                    padding: "32px",
                    border: "2px solid rgba(59, 130, 246, 0.2)",
                    boxShadow: "0 10px 40px rgba(59, 130, 246, 0.15)",
                    background: "linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%)",
                    overflow: "hidden" as const,
                  }}
                >
                  {/* Decorative background circle */}
                  <div
                    style={{
                      position: "absolute" as const,
                      top: -50,
                      right: -50,
                      width: "200px",
                      height: "200px",
                      background: "radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent)",
                      borderRadius: "50%",
                    }}
                  />
                  
                  <h3 style={{ 
                    margin: "0 0 24px 0", 
                    fontSize: fs * 1.8, 
                    color: "#1E40AF",
                    fontWeight: 700,
                    position: "relative" as const,
                    zIndex: 1
                  }}>
                    Buenas prácticas, errores comunes y ejemplos rápidos
                  </h3>

                  <MetricRow
                    title="✅ Buenas prácticas transversales"
                    items={[
                      "Identidad consistente: mismo tono/visual en todas, pero formato adaptado (duración, ratio, subtítulos).",
                      "Un objetivo por pieza: informa, educa o entretiene → un CTA claro.",
                      "Accesibilidad: subtítulos siempre; tipografías legibles; contraste.",
                      "Reutiliza con intención: un YouTube largo → 2–3 Reels/TikToks + 1 carrusel resumen + clips para Stories.",
                    ]}
                    imageSrc=""
                    primaryColor="#10B981"
                    fs={fs}
                    reverse={false}
                  />

                  <MetricRow
                    title="⚠️ Errores comunes (y cómo evitarlos)"
                    items={[
                      "Mismo video en todas sin adaptar → Ajusta ratio, duración y texto.",
                      "Portadas genéricas en carruseles → Promesa concreta y grande.",
                      "Títulos vagos en YouTube → Sé descriptivo y útil.",
                      "Lives sin guion → Lleva agenda y preguntas de respaldo.",
                    ]}
                    imageSrc=""
                    primaryColor="#F59E0B"
                    fs={fs}
                    reverse={true}
                  />

                  <MetricRow
                    title="💡 Ejemplos rápidos (rellena los huecos)"
                    items={[
                      'Gancho TikTok/Reel: "Nadie te dice que ___, pero en 30 s te muestro cómo".',
                      'Portada Carrusel: "3 pasos para ___ hoy".',
                      'Título YouTube: "Cómo ___ en 5 pasos (guía 2025)".',
                      'Miniatura: "SIN ___ → CON ___".',
                      'Apertura Twitch: "Hoy resolvemos ___ en 20 min; trae tu pregunta".',
                    ]}
                    imageSrc=""
                    primaryColor="#3B82F6"
                    fs={fs}
                    reverse={false}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Page 3 - Quiz Verdadero o Falso
type Page3Props = {
  // Quiz tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: boolean | null, correctAnswer: boolean, isCorrect: boolean) => void;
  onQuizComplete?: (score: number) => void;
  isAlreadyCompleted?: boolean;
  completedScore?: number;
};

function Page3(props: Page3Props = {}) {
  const { onAnswerSubmit, onQuizComplete, isAlreadyCompleted, completedScore } = props;
  const brandName = "BIZEN";
  const logoSrc = "/bizen-mondragonlogo.png";
  const primaryColor = "#0F62FE";
  const background = "#FFFFFF";
  const progressPercent = 50;
  const title = "Sección 3";
  const topicTitle = "Quiz: Verdadero o Falso";
  const baseFontSize = 18;
  const videoUrl = "https://www.youtube.com/embed/MZrHTJK_tuI";

  const fs = Math.max(12, baseFontSize || 18);
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)));

  const wrapper: React.CSSProperties = {
    width: "100%",
    minHeight: "100vh",
    display: "flex" as const,
    flexDirection: "column" as const,
    justifyContent: "flex-start" as const,
    background,
    color: "#111",
    fontFamily:
      "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
    fontSize: fs,
  };

  const container: React.CSSProperties = {
    width: "100%",
    padding: "clamp(16px, 3vw, 32px)",
    boxSizing: "border-box" as const,
    margin: "0",
  };

  const QUESTIONS: { text: string; answer: boolean }[] = [
    { text: "La plataforma no es el objetivo; es el medio. El contenido se adapta a su cultura y formato.", answer: true },
    { text: "En 2025, TikTok prioriza ritmo rápido, retención y finalización; es ideal para descubrimiento/viralidad.", answer: true },
    { text: "En Instagram, los carruseles NO sirven para educación paso a paso.", answer: false },
    { text: "YouTube es óptimo para profundidad y contenidos evergreen; conviene título descriptivo, miniatura clara y capítulos.", answer: true },
    { text: "Twitch destaca por la interacción en vivo, preguntas y demos con comunidad fiel.", answer: true },
    { text: "Es buena práctica publicar el mismo video en todas las plataformas sin adaptar ratio, duración ni texto.", answer: false },
    { text: "Un objetivo por pieza (informar/educar/entretener) y un CTA claro es una buena práctica transversal.", answer: true },
    { text: "Para accesibilidad conviene subtítulos, tipografías legibles y contraste adecuado.", answer: true },
    { text: "Reutilizar con intención: un video largo de YouTube puede convertirse en 2–3 Reels/TikToks y un carrusel resumen.", answer: true },
    { text: "Las portadas genéricas en carruseles suelen mejorar el rendimiento y la claridad de la promesa.", answer: false },
    { text: "Títulos vagos en YouTube funcionan mejor para SEO que los títulos descriptivos y útiles.", answer: false },
    { text: "En transmisiones en vivo, llevar una agenda y preguntas de respaldo es recomendable.", answer: true },
    { text: "En carruseles conviene: portada con promesa, desarrollo claro y cierre con CTA.", answer: true },
    { text: "En Instagram, las Stories no ayudan a generar urgencia.", answer: false },
  ];

  const total = QUESTIONS.length;
  const [idx, setIdx] = React.useState(0);
  const [selection, setSelection] = React.useState<(boolean | null)[]>(Array(total).fill(null));
  const [checked, setChecked] = React.useState<boolean[]>(Array(total).fill(false));
  const [correct, setCorrect] = React.useState<boolean[]>(Array(total).fill(false));
  const [hoverOpt, setHoverOpt] = React.useState<"true" | "false" | null>(null);
  const [score, setScore] = React.useState(0);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const q = QUESTIONS[idx];

  const handleAnswer = (val: boolean) => {
    if (checked[idx]) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const next = [...selection];
    next[idx] = val;
    setSelection(next);

    const isCorrect = val === q.answer;
    const nextChecked = [...checked];
    const nextCorrect = [...correct];
    nextChecked[idx] = true;
    nextCorrect[idx] = !!isCorrect;
    setChecked(nextChecked);
    setCorrect(nextCorrect);
    
    const newScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) setScore((s) => s + 1);

    // Track answer submission
    if (onAnswerSubmit) {
      console.log(`M1S3P3: Submitting answer ${idx}: ${val}, correct=${q.answer}, isCorrect=${isCorrect}`);
      onAnswerSubmit(idx, q.text, val, q.answer, isCorrect);
    }

    if (idx < total - 1) {
      timeoutRef.current = setTimeout(() => {
        setIdx((current) => Math.min(current + 1, total - 1));
        timeoutRef.current = null;
      }, 800);
    } else {
      // Last question - complete quiz after delay
      console.log("M1S3P3: Last question answered, completing quiz with score:", newScore);
      timeoutRef.current = setTimeout(() => {
        if (onQuizComplete) {
          onQuizComplete(newScore);
        }
        timeoutRef.current = null;
      }, 100);
    }
  };

  const answeredCount = checked.filter(Boolean).length;
  const finished = answeredCount === total;

  const optStyle = (active: boolean, hovered: boolean): React.CSSProperties => ({
    padding: "24px 28px",
    borderRadius: 20,
    border: `3px solid ${active ? primaryColor : "rgba(0,0,0,0.1)"}`,
    background: active 
      ? `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)` 
      : "linear-gradient(135deg, #fff, #f8faff)",
    fontWeight: 900,
    fontSize: fs * 1.6,
    letterSpacing: 0.3,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "center",
    boxShadow: active 
      ? `0 12px 32px ${primaryColor}30, 0 4px 12px rgba(0,0,0,0.1)` 
      : hovered 
        ? "0 8px 24px rgba(0,0,0,0.08)" 
        : "0 4px 12px rgba(0,0,0,0.05)",
    transform: hovered ? "scale(0.96) translateY(-2px)" : "scale(1)",
    transition: "all 0.2s ease",
    position: "relative" as const,
    overflow: "hidden" as const,
    color: active ? primaryColor : "#333",
  });

  const feedback = checked[idx]
    ? correct[idx]
      ? <div style={{ color: "#0a7f35", fontWeight: 700 }}>✅ ¡Correcto!</div>
      : <div style={{ color: "#b00020", fontWeight: 700 }}>❌ Incorrecto. {q.answer ? "Era VERDADERO." : "Era FALSO."}</div>
    : null;

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
    );
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
        {/* Contenido */}
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {/* Video */}
              {videoUrl ? (
                <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                  <Card glow={primaryColor}>
                    <h3 style={{ margin: "0 0 12px 0", fontSize: fs * 1.55 }}>
                      Video de la sección
                    </h3>
                    <div
                      style={{
                        borderRadius: 14,
                        overflow: "hidden",
                        boxShadow: "0 14px 40px rgba(0,0,0,0.12)",
                      }}
                    >
                      <iframe
                        src={videoUrl}
                        title="Video de la sección"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          width: "100%",
                          height: "auto",
                          aspectRatio: "16 / 9",
                          display: "block",
                          border: "none",
                        }}
                      />
                    </div>
                  </Card>
                </motion.div>
              ) : null}

              {/* Quiz V/F */}
              <motion.div variants={itemVar}>
                <Card glow={primaryColor}>
                  {/* Progreso del quiz */}
                  <div style={{ 
                    display: "flex" as const, 
                    alignItems: "center" as const, 
                    justifyContent: "space-between" as const, 
                    marginBottom: 24,
                    padding: "16px 20px",
                    background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
                    borderRadius: 16,
                    border: `2px solid ${primaryColor}20`,
                  }}>
                    <strong style={{ 
                      fontSize: fs * 1.2,
                      color: primaryColor,
                      fontWeight: 800,
                    }}>
                      📊 Pregunta {idx + 1} / {QUESTIONS.length}
                    </strong>
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 12 }}>
                      <div style={{ 
                        width: 240, 
                        height: 14, 
                        background: "rgba(0,0,0,0.1)", 
                        borderRadius: 999, 
                        overflow: "hidden",
                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${Math.round(((idx + 1) / QUESTIONS.length) * 100)}%`,
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{
                            height: "100%",
                            background: `linear-gradient(90deg, ${primaryColor}, #3B82F6)`,
                            borderRadius: 999,
                            boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                          }}
                        />
                      </div>
                      <span style={{ 
                        fontSize: fs * 1.0, 
                        fontWeight: 700,
                        color: primaryColor,
                        minWidth: 50,
                        textAlign: "right",
                      }}>
                        {Math.round(((idx + 1) / QUESTIONS.length) * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Enunciado */}
                  <p style={{ 
                    margin: "0 0 28px 0", 
                    lineHeight: 1.6, 
                    fontSize: fs * 1.5,
                    fontWeight: 600,
                    color: "#1a1a1a",
                    padding: "20px 24px",
                    background: "linear-gradient(135deg, #fff, #f8fafc)",
                    borderRadius: 16,
                    border: `2px solid ${primaryColor}15`,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  }}>
                    {QUESTIONS[idx].text}
                  </p>

                  {/* Opciones */}
                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: 20,
                      marginBottom: 24,
                    }}
                  >
                    <div
                      role="button"
                      onClick={() => handleAnswer(true)}
                      onMouseEnter={() => !checked[idx] && setHoverOpt("true")}
                      onMouseLeave={() => setHoverOpt(null)}
                      style={optStyle(selection[idx] === true, hoverOpt === "true")}
                    >
                      VERDADERO
                    </div>
                    <div
                      role="button"
                      onClick={() => handleAnswer(false)}
                      onMouseEnter={() => !checked[idx] && setHoverOpt("false")}
                      onMouseLeave={() => setHoverOpt(null)}
                      style={optStyle(selection[idx] === false, hoverOpt === "false")}
                    >
                      FALSO
                    </div>
                  </div>

                  {/* Feedback */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ marginBottom: 16 }}
                  >
                    {feedback}
                  </motion.div>
                  <div style={{ 
                    marginBottom: 20, 
                    padding: "12px 16px",
                    background: "#f8fafc",
                    borderRadius: 12,
                    fontSize: fs * 0.95, 
                    fontWeight: 600,
                    color: "#666",
                    textAlign: "right",
                  }}>
                    {answeredCount}/{QUESTIONS.length} respondidas
                  </div>

                  {/* Resultado final */}
                  {finished ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        padding: 24,
                        border: `3px solid ${primaryColor}`,
                        borderRadius: 20,
                        background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`,
                        display: "flex" as const,
                        alignItems: "center" as const,
                        justifyContent: "space-between" as const,
                        boxShadow: `0 8px 24px ${primaryColor}20`,
                      }}
                    >
                      <strong style={{ 
                        fontSize: fs * 1.3,
                        fontWeight: 800,
                        color: "#1a1a1a",
                      }}>
                        🎉 Resultado Final:
                      </strong>
                      <span style={{ 
                        fontWeight: 900, 
                        color: primaryColor,
                        fontSize: fs * 1.5,
                      }}>
                        {correct.filter(Boolean).length} / {QUESTIONS.length}
                      </span>
                    </motion.div>
                  ) : null}
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Helper component for quiz buttons
// Page 4 - Quiz de opciones múltiples
type Page4Props = {
  // Quiz tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: number | null, correctAnswer: number, isCorrect: boolean) => void;
  onQuizComplete?: (score: number) => void;
  isAlreadyCompleted?: boolean;
  completedScore?: number;
};

function Page4(props: Page4Props = {}) {
  const { onAnswerSubmit, onQuizComplete, isAlreadyCompleted, completedScore } = props;
  const brandName = "BIZEN";
  const logoSrc = "/bizen-mondragonlogo.png";
  const primaryColor = "#0F62FE";
  const background = "#FFFFFF";
  const progressPercent = 75;
  const title = "Sección 3";
  const topicTitle = "Quiz: Plataformas y formatos";
  const baseFontSize = 18;

  const fs = Math.max(12, baseFontSize || 18);

  // Add shimmer and floating keyframes
  React.useEffect(() => {
    const styleId = 'm1s3-page4-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)));

  const wrapper: React.CSSProperties = {
    width: "100%",
    minHeight: "100vh",
    display: "flex" as const,
    flexDirection: "column" as const,
    justifyContent: "flex-start" as const,
    background,
    color: "#111",
    fontFamily:
      "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
    fontSize: fs,
  };

  const container: React.CSSProperties = {
    width: "100%",
    padding: "clamp(16px, 3vw, 32px)",
    boxSizing: "border-box" as const,
    margin: "0",
  };

  const QUIZ_QUESTIONS = [
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
      ref: "YouTube Shorts compite con Reels y TikTok; el long-form construye profundidad y SEO.",
    },
    {
      text: "Para guías largas y contenido evergreen (búsquedas + capítulos), la mejor plataforma es:",
      options: ["TikTok", "Instagram", "YouTube", "Twitch"],
      correct: 2,
      ref: "YouTube favorece profundidad, miniaturas trabajadas y capítulos.",
    },
    {
      text: "Elige la asociación correcta plataforma → contenido ideal:",
      options: [
        "TikTok → Streams largos en vivo.",
        "Instagram → Reels y carouseles estéticos.",
        "YouTube → Memes de 5 segundos.",
        "Twitch → Publicaciones estáticas.",
      ],
      correct: 1,
      ref: "Instagram: estética + Reels + carouseles; TikTok: corto y rápido; Twitch: en vivo; YouTube: profundidad.",
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
      ref: "En vivo hay diálogo, preguntas y demos; fomenta comunidad fiel.",
    },
    {
      text: "Buena práctica en carruseles de Instagram:",
      options: [
        "Portada con promesa → desarrollo claro → cierre/CTA.",
        "Subir solo texto sin imágenes.",
        "Evitar CTA para no distraer.",
        "Usar 2 slides máximo siempre.",
      ],
      correct: 0,
      ref: "Portada con promesa engancha; secuencia didáctica y cierre con CTA mejoran valor y guardados.",
    },
    {
      text: "Buena práctica transversal al adaptar contenido a redes:",
      options: [
        "Un objetivo por pieza + CTA claro.",
        "Usar el mismo ratio/duración en todas.",
        "Evitar subtítulos para no saturar.",
        "Cambiar el tono de marca en cada canal.",
      ],
      correct: 0,
      ref: "Identidad consistente y un objetivo por pieza con CTA claro.",
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
      ref: "El 'copy-paste' ignora hábitos de consumo y penaliza el alcance.",
    },
    {
      text: "Para mejorar descubrimiento orgánico en YouTube se recomienda:",
      options: [
        "Títulos claros con keywords, miniatura trabajada y capítulos.",
        "Publicar sin título para no sesgar el algoritmo.",
        "Evitar listas de reproducción.",
        "No usar etiquetas ni descripciones.",
      ],
      correct: 0,
      ref: "Miniaturas con contraste y emoción elevan CTR; capítulos y descripciones ricas ayudan al SEO.",
    },
    {
      text: "Accesibilidad recomendada en contenido social:",
      options: [
        "Subtítulos siempre, tipografías legibles y buen contraste.",
        "Desactivar subtítulos para no ocupar pantalla.",
        "Usar fuentes muy finas y pequeñas.",
        "Evitar descripciones de contexto.",
      ],
      correct: 0,
      ref: "Accesibilidad mejora comprensión, retención y alcance.",
    },
    {
      text: "Reutilización con intención de un video largo de YouTube:",
      options: [
        "2–3 Reels/TikToks + 1 carrusel resumen + clips para Stories.",
        "Publicarlo igual en todas las redes sin cambios.",
        "Solo un post de texto en X (Twitter).",
        "Únicamente un PDF para descargar.",
      ],
      correct: 0,
      ref: "Repurpose inteligente: extrae piezas cortas y formatos nativos por plataforma.",
    },
    {
      text: "¿Qué gancho sigue el patrón recomendado para TikTok/Reel?",
      options: [
        '"Nadie te dice que ___, pero en 30 s te muestro cómo".',
        '"Video largo sin índice, mira si quieres".',
        '"Hola, me presento 2 minutos antes del tema…".',
        '"Sin CTA ni promesa clara".',
      ],
      correct: 0,
      ref: "Hook directo y tiempo acotado elevan retención temprana.",
    },
  ];

  const total = QUIZ_QUESTIONS.length;
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<(number | null)[]>(Array(total).fill(null));
  const [checked, setChecked] = React.useState<boolean[]>(Array(total).fill(false));
  const [correct, setCorrect] = React.useState<boolean[]>(Array(total).fill(false));
  const [score, setScore] = React.useState(0);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const q = QUIZ_QUESTIONS[idx];
  const safeOptions = Array.isArray(q?.options) ? q.options : [];

  const handleAnswer = (optionIndex: number) => {
    if (!q || optionIndex < 0 || optionIndex >= safeOptions.length) return;
    if (checked[idx]) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const nextAnswers = [...answers];
    nextAnswers[idx] = optionIndex;
    setAnswers(nextAnswers);

    const isCorrect = optionIndex === q.correct;
    const nextChecked = [...checked];
    const nextCorrect = [...correct];
    nextChecked[idx] = true;
    nextCorrect[idx] = !!isCorrect;
    setChecked(nextChecked);
    setCorrect(nextCorrect);
    
    const newScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) setScore((s) => s + 1);

    // Track answer submission
    if (onAnswerSubmit) {
      console.log(`M1S3P4: Submitting answer ${idx}: ${optionIndex}, correct=${q.correct}, isCorrect=${isCorrect}`);
      onAnswerSubmit(idx, q.text, q.options[optionIndex], q.options[q.correct], isCorrect);
    }

    if (idx < total - 1) {
      timeoutRef.current = setTimeout(() => {
        setIdx((current) => Math.min(current + 1, total - 1));
        timeoutRef.current = null;
      }, 800);
    } else {
      // Last question - complete quiz after delay
      console.log("M1S3P4: Last question answered, completing quiz with score:", newScore);
      timeoutRef.current = setTimeout(() => {
        if (onQuizComplete) {
          onQuizComplete(newScore);
        }
        timeoutRef.current = null;
      }, 100);
    }
  };

  const answeredCount = checked.filter(Boolean).length;
  const finished = answeredCount === total;
  const correctCount = correct.filter(Boolean).length;

  const optStyle = (active: boolean): React.CSSProperties => ({
    padding: "16px 18px",
    borderRadius: 14,
    border: `2px solid ${active ? primaryColor : "rgba(0,0,0,0.12)"}`,
    background: active ? `${primaryColor}14` : "#fff",
    fontWeight: 700,
    fontSize: fs * 1.05,
    letterSpacing: 0.2,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "left",
    lineHeight: 1.35,
    boxShadow: active ? "0 8px 24px rgba(0,0,0,0.06)" : "none",
    transform: "scale(1)",
    transition: "transform .12s ease, border-color .2s ease, background .2s ease",
  });

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
    );
  }

  return (
    <div style={wrapper}>
      {/* Marketing Facts Animation Overlay */}
      <MarketingFactsAnimation facts={[
        {
          character: 'billy',
          text: 'El 65% de los consumidores ha descubierto un producto nuevo gracias a un influencer.',
          characterImage: '/2.png'
        },
        {
          character: 'drago',
          text: 'El 90% de las campañas en YouTube son impulsadas por influencers.',
          characterImage: '/drago1.png'
        },
        {
          character: 'billy',
          text: 'El 54% de los jóvenes de 18 a 29 años ha comprado por recomendación de un influencer.',
          characterImage: '/2.png'
        },
        {
          character: 'drago',
          text: 'Las colaboraciones de largo plazo generan un 40% más de confianza en la audiencia.',
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
        {/* Contenido */}
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {/* Quiz */}
              <motion.div variants={itemVar}>
                <Card glow={primaryColor}>
                  {/* Quiz Title with Shimmer Effect */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      marginBottom: 24,
                      padding: "20px 24px",
                      background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
                      borderRadius: 16,
                      border: `2px solid ${primaryColor}20`,
                      textAlign: "center",
                    }}
                  >
                    <motion.h2
                      style={{
                        margin: 0,
                        fontSize: fs * 2.5,
                        lineHeight: 1.2,
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <span style={{
                        background: `linear-gradient(90deg, #1e40af, #3B82F6, #60A5FA, #1e40af)`,
                        backgroundSize: "200% 100%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        animation: "shimmer 3s infinite linear",
                      }}>
                        Quiz de Opción Múltiple
                      </span>
                    </motion.h2>
                    <motion.p 
                      style={{ 
                        margin: "12px 0 0", 
                        opacity: 0.9, 
                        fontSize: fs * 1.3,
                        color: "#1E40AF",
                        fontWeight: 600,
                      }}
                      animate={{
                        y: [-4, 4, -4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span style={{ color: "#60A5FA", fontWeight: 700, fontSize: "1.2em" }}>▌</span> {topicTitle}
                    </motion.p>
                  </motion.div>

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
                      Pregunta {Math.min(idx + 1, total)} / {total}
                    </strong>
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 10 }}>
                      <div style={{ width: 220, height: 12, background: "rgba(0,0,0,0.08)", borderRadius: 999, overflow: "hidden" }}>
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
                      <span style={{ fontSize: fs * 0.95, opacity: 0.75 }}>
                        {Math.round(((idx + 1) / total) * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Enunciado */}
                  <p style={{ margin: "10px 0 18px", lineHeight: 1.55, fontSize: fs * 1.4 }}>
                    {q?.text ?? ""}
                  </p>

                  {/* Opciones */}
                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: 12,
                      marginBottom: 10,
                    }}
                  >
                    {safeOptions.map((opt, i) => {
                      const active = answers[idx] === i;
                      const disabled = checked[idx];
                      return (
                        <div
                          key={i}
                          role="button"
                          onClick={() => {
                            if (disabled) return;
                            handleAnswer(i);
                          }}
                          style={optStyle(active)}
                        >
                          <strong style={{ display: "inline-block" as const, marginRight: 8 }}>
                            {String.fromCharCode(65 + i)})
                          </strong>
                          {opt}
                        </div>
                      );
                    })}
                  </div>

                  {/* Feedback + Referencia */}
                  <div style={{ margin: "8px 0 14px" }}>
                    {checked[idx] && q ? (
                      answers[idx] === q.correct ? (
                        <div style={{ color: "#0a7f35", fontWeight: 700 }}>
                          ✅ ¡Correcto!
                          {q.ref ? (
                            <div style={{ marginTop: 6, opacity: 0.9 }}>
                              <em>Referencia:</em> {q.ref}
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div style={{ color: "#b00020", fontWeight: 700 }}>
                          ❌ Incorrecto. Era: <u>{q.options?.[q.correct] ?? "Opción correcta"}</u>
                          {q.ref ? (
                            <div style={{ marginTop: 6, opacity: 0.9 }}>
                              <em>Referencia:</em> {q.ref}
                            </div>
                          ) : null}
                        </div>
                      )
                    ) : null}
                  </div>

                  <div style={{ marginBottom: 10, opacity: 0.75, fontSize: fs * 0.9, textAlign: "right" }}>
                    {answeredCount}/{total} respondidas
                  </div>

                  {finished ? (
                    <div
                      style={{
                        marginTop: 12,
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
                        {correctCount} / {total}
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
  );
}

// Page 5 - Interactive Flashcard Activity
function Page5() {
  const brandName = "BIZEN";
  const logoSrc = "/bizen-mondragonlogo.png";
  const primaryColor = "#0F62FE";
  const background = "#FFFFFF";
  const progressPercent = 100;
  const title = "Actividad rápida · Plataformas y formatos";
  const topicTitle = "La plataforma es el medio; adapta el contenido a su cultura y formato.";
  const baseFontSize = 18;

  // Increased font size for larger text
  const fs = Math.max(16, baseFontSize || 24);

  // Floating animation variants
  const floatingVariants = {
    float: {
      y: [-8, 8, -8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Add shimmer and floating keyframes
  React.useEffect(() => {
    const styleId = 'm1s3-page5-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer-title {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const ACTIVITY_STEPS = [
    {
      front: "Paso 1 · Idea clave (1 min)",
      back: 'La plataforma no es el objetivo; es el medio.\nEjercicio: explica en 2 líneas cómo adaptar el mismo mensaje a TikTok vs. YouTube.\nFormato: "En ___ hago ___ en ___s; en ___ profundizo con ___ + capítulos."',
    },
    {
      front: "Paso 2 · TikTok (2–3 min)",
      back: "Corto, ritmo rápido; retención/finalización clave.\nGuía: Hook 0–2s → 2–3 tips → remate + CTA.",
    },
    {
      front: "Paso 3 · Instagram (2–3 min)",
      back: "Estética + Reels + carruseles (paso a paso) + Stories (urgencia).\nGuía: Portada con promesa grande → desarrollo claro → cierre/CTA.",
    },
    {
      front: "Paso 4 · YouTube (2–3 min)",
      back: "Long-form, SEO, capítulos, miniaturas trabajadas.\nGuía: Título descriptivo + miniatura clara + capítulos (0:00, 0:30, 1:30…).",
    },
    {
      front: "Paso 5 · Twitch (2–3 min)",
      back: "En vivo: interacción directa, preguntas y demos.\nEstructura: Intro → mini demo → Q&A → reto final.",
    },
    {
      front: "Paso 6 · Buenas prácticas",
      back: "Identidad consistente (tono/visual) + formato adaptado (duración/ratio/subs).\nUn objetivo por pieza → CTA claro. Accesibilidad: subtítulos, contraste.",
    },
    {
      front: "Paso 7 · Reutiliza con intención",
      back: "De un YouTube largo → 2–3 Reels/TikToks + 1 carrusel resumen + clips para Stories.\nPiensa en cortes, copy y CTA por red.",
    },
    {
      front: "Paso 8 · Evita errores",
      back: "Mismo video en todas → Ajusta ratio/duración/texto.\nPortadas genéricas → Promesa concreta y grande.\nTítulos vagos en YouTube → Sé descriptivo y útil.\nLives sin guion → Agenda + preguntas de respaldo.",
    },
    {
      front: "Paso 9 · Mini-matriz express",
      back: "Plataforma | Formato | Gancho/Estructura | CTA\nTikTok | 9:16 · 15–30s | Hook + 2–3 tips + remate | Guarda/Comparte\nIG (Carrusel) | 1:1 · 7 slides | Portada→pasos→cierre | Desliza/Guarda\nYouTube | 16:9 · 4–6 min | Título + miniatura + capítulos | Link a recursos\nTwitch | Live 20 min | Intro→demo→Q&A→reto | Pregunta en el chat",
    },
    {
      front: "Paso 10 · KPI rápido",
      back: "Define 1 meta y plan de mejora:\n• Reel/TikTok: Retención 50% ≥ 35%\n• Carrusel: Guardados/Imp ≥ 4%\n• YouTube: % visualización ≥ 35%\n• Twitch: Mensajes/min ≥ 3\nSi no se cumple: ajusta gancho/portada/capítulos/dinámica del live.",
    },
  ];

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)));

  const [opened, setOpened] = React.useState(0);

  const wrapper: React.CSSProperties = {
    width: "100%",
    minHeight: "100vh",
    display: "flex" as const,
    flexDirection: "column" as const,
    justifyContent: "flex-start" as const,
    background: "linear-gradient(135deg, #E0F2FE 0%, #F8FAFC 50%, #F0F9FF 100%)",
    color: "#111",
    fontFamily:
      "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
    fontSize: fs,
  };

  const container: React.CSSProperties = {
    width: "100%",
    padding: "clamp(16px, 3vw, 32px)",
    boxSizing: "border-box" as const,
    margin: "0",
  };

  const miniPct = ACTIVITY_STEPS.length ? Math.round((opened / ACTIVITY_STEPS.length) * 100) : 0;

  return (
    <div style={wrapper}>
      <SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%", display: "block" }}>
        {/* Content */}
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {/* Shimmer Title with Floating Effect */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.5, 
                    lineHeight: 1.15,
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <span style={{
                    background: `linear-gradient(90deg, #1e40af, #3B82F6, #60A5FA, #1e40af)`,
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                    animation: "shimmer 3s infinite linear",
                  }}>
                    {title}
                  </span>
                </motion.h1>
                <motion.p 
                  variants={floatingVariants}
                  animate="float"
                  style={{ 
                    margin: "12px 0 0", 
                    opacity: 0.9, 
                    fontSize: fs * 1.6,
                    color: "#1E40AF",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "#60A5FA", fontWeight: 700, fontSize: "1.3em" }}>▌</span> {topicTitle}
                </motion.p>
              </motion.div>

              {/* Instruction */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div
                  style={{
                    padding: "24px 28px",
                    borderRadius: 20,
                    border: `3px solid #00d4ff`,
                    background: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
                    boxShadow: `0 20px 60px rgba(0, 180, 216, 0.4), 0 8px 24px rgba(0, 119, 182, 0.3)`,
                    overflow: "hidden" as const,
                    position: "relative" as const,
                  }}
                >
                  <motion.div 
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(255,255,255,0.3), transparent)",
                      animation: "shimmer 2s linear infinite"
                    }} 
                  />
                  <div style={{ 
                    position: "relative" as const,
                    zIndex: 1,
                    display: "flex" as const, 
                    alignItems: "center" as const, 
                    gap: 16, 
                  }}>
                    <motion.div
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                      style={{ 
                        fontSize: fs * 2,
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
                      }}
                    >
                      🚀
                    </motion.div>
                    <div style={{
                      color: "white",
                      fontWeight: 900,
                      fontSize: fs * 1.3,
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}>
                      Actividad interactiva: toca cada tarjeta para descubrir el contenido
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mini progress */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div style={{ 
                  display: "flex" as const, 
                  alignItems: "center" as const, 
                  gap: 12,
                  padding: "20px 24px",
                  background: "linear-gradient(135deg, #1e40af 0%, #3B82F6 50%, #60A5FA 100%)",
                  borderRadius: 20,
                  border: "2px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)",
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}>
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(45deg, rgba(255,255,255,0.1), transparent)",
                    animation: "shimmer 3s linear infinite"
                  }} />
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    style={{ fontSize: fs * 1.8, position: "relative" as const, zIndex: 1 }}
                  >
                    🎯
                  </motion.div>
                  <div style={{ 
                    flex: 1, 
                    position: "relative" as const, 
                    zIndex: 1 
                  }}>
                    <motion.div 
                      style={{ 
                        color: "white", 
                        fontWeight: 800,
                        fontSize: fs * 1.1,
                        marginBottom: 6,
                      }}
                      animate={opened > 0 ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      Progreso: {opened}/{ACTIVITY_STEPS.length} pasos abiertos
                    </motion.div>
                    <div style={{ 
                      width: "100%", 
                      height: 12, 
                      background: "rgba(255,255,255,0.3)", 
                      borderRadius: 999, 
                      overflow: "hidden",
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${miniPct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                          height: "100%",
                          background: "linear-gradient(90deg, #fff, #f0f9ff)",
                          borderRadius: 999,
                          boxShadow: "0 0 20px rgba(255,255,255,0.8)",
                        }}
                      />
                    </div>
                  </div>
                  <span style={{ 
                    color: "white", 
                    fontWeight: 800,
                    fontSize: fs * 1.05,
                    background: "rgba(255,255,255,0.2)",
                    padding: "6px 12px",
                    borderRadius: 20,
                    minWidth: 50,
                    textAlign: "right",
                    position: "relative" as const,
                    zIndex: 1,
                  }}>
                    {miniPct}%
                  </span>
                </div>
              </motion.div>

              {/* Flashcards */}
              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <div style={{ 
                  display: "grid" as const, 
                  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", 
                  gap: 20 
                }}>
                  {ACTIVITY_STEPS.map((step, i) => (
                    <ActivityFlashcard
                      key={i}
                      front={step.front}
                      back={step.back}
                      primaryColor={primaryColor}
                      fontSize={fs}
                      onFirstOpen={() => setOpened((v) => Math.min(ACTIVITY_STEPS.length, v + 1))}
                    />
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Activity Flashcard component
function ActivityFlashcard({
  front,
  back,
  primaryColor,
  fontSize,
  onFirstOpen,
  onAnyClick,
}: {
  front: string;
  back: string;
  primaryColor: string;
  fontSize: number;
  onFirstOpen?: () => void;
  onAnyClick?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [seen, setSeen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const colors = [
    "linear-gradient(135deg, #1e40af, #3B82F6)",
    "linear-gradient(135deg, #0ea5e9, #0284c7)",
    "linear-gradient(135deg, #06b6d4, #0891b2)",
    "linear-gradient(135deg, #14b8a6, #0d9488)",
    "linear-gradient(135deg, #10b981, #059669)",
    "linear-gradient(135deg, #64748b, #475569)",
  ];

  return (
    <motion.div
      role="button"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setOpen((v) => !v);
        if (!seen) {
          setSeen(true);
          onFirstOpen?.();
        }
        onAnyClick?.();
      }}
      style={{
        userSelect: "none" as const,
        cursor: "pointer",
        borderRadius: 24,
        border: `3px solid ${open ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.1)"}`,
        background: open ? colors[Math.floor(Math.random() * colors.length)] : "linear-gradient(135deg, #f8faff, #e0e7ff)",
        padding: 24,
        minHeight: 180,
        boxShadow: hovered 
          ? `0 16px 40px ${primaryColor}25, 0 8px 20px rgba(0,0,0,0.1)` 
          : "0 8px 24px rgba(0,0,0,0.08)",
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 14,
        position: "relative" as const,
        overflow: "hidden" as const,
        transition: "all 0.3s ease",
      }}
    >
      {/* Decorative background circle */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: isNaN(parseInt(front)) ? [0.2, 0.3, 0.2] : [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: open ? colors[Math.floor(Math.random() * colors.length)] : primaryColor,
          filter: "blur(40px)",
        }}
      />
      
      <strong
        style={{
          color: open ? "white" : primaryColor,
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
          opacity: open ? 0.95 : 0.6,
          fontSize: open ? fontSize * 1.05 : fontSize,
          lineHeight: 1.6,
          whiteSpace: "pre-line",
          color: open ? "white" : "#475569",
          fontWeight: open ? 500 : 600,
          fontStyle: open ? "normal" : "italic",
          position: "relative" as const,
          zIndex: 1,
        }}
      >
        {open ? back : "👆 Toca para revelar el contenido"}
      </p>

      {!open && (
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            marginTop: "auto",
            alignSelf: "center",
            fontSize: fontSize * 2,
            position: "relative" as const,
            zIndex: 1,
          }}
        >
          👆
        </motion.div>
      )}
    </motion.div>
  );
}

// ==========================================
// Export content mapping
// ==========================================
const M1S3_CONTENT: Record<number, React.ReactNode> = {
  1: <Page1 />,
  2: <Page2 />,
  3: <Page3 />,
  4: <Page4 />,
  5: <Page5 />,
};

export default M1S3_CONTENT;

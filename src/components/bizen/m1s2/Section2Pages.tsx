// src/components/bsmx/m1s2/Section2Pages.tsx
"use client";

import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import SectionPageHeader from "@/components/bizen/SectionPageHeader";
import MarketingFactsAnimation from "@/components/MarketingFactsAnimation";

/* =========================================================
   UTIL: estado persistido en localStorage (refresh-proof)
   ========================================================= */
function usePersisted<T>(key: string, initial: () => T) {
  const [state, setState] = React.useState<T>(() => {
    if (typeof window === "undefined") return initial();
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initial();
    } catch {
      return initial();
    }
  });

  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState] as const;
}

/* =========================================================
   UI Helpers
   ========================================================= */
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
  );
}

function Pill({
  text,
  primaryColor,
  fs,
}: {
  text: string;
  primaryColor: string;
  fs: number;
}) {
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
      }}
    >
      {text}
    </span>
  );
}

const EASE_ITEM = [0.16, 1, 0.3, 1] as const;

const containerVar: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06 },
  },
};
const itemVar: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.35, ease: EASE_ITEM },
  },
};

function GridFlashcards({
  children,
  gap = 16,
  columns = 1,
}: {
  children: React.ReactNode;
  gap?: number;
  columns?: number;
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
  );
}

function Flashcard({
  front,
  back,
  primaryColor,
  fontSize,
  onFirstOpen,
}: {
  front: string;
  back: string;
  primaryColor: string;
  fontSize: number;
  onFirstOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      role="button"
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={() => {
        setOpen((v) => !v);
        if (!seen) {
          setSeen(true);
          onFirstOpen?.();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        userSelect: "none",
        cursor: "pointer",
        borderRadius: 20,
        border: `2px solid ${open ? primaryColor : primaryColor}40`,
        background: open 
          ? `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)` 
          : `linear-gradient(135deg, #fff, #f8faff)`,
        padding: 22,
        minHeight: 180,
        boxShadow: hovered 
          ? `0 16px 40px ${primaryColor}25, 0 8px 20px rgba(0,0,0,0.1)` 
          : "0 8px 24px rgba(0,0,0,0.08)",
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 14,
        transformOrigin: "center",
        position: "relative" as const,
        overflow: "hidden" as const,
        transition: "all 0.3s ease",
      }}
    >
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${primaryColor}10, transparent)`,
            pointerEvents: "none",
          }}
        />
      )}
      
      <strong
        style={{
          color: open ? primaryColor : primaryColor,
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
          fontSize: open ? fontSize : fontSize * 0.95,
          lineHeight: 1.6,
          flex: 1,
          position: "relative" as const,
          zIndex: 1,
          color: open ? "#111" : primaryColor,
          fontWeight: open ? 500 : 600,
          fontStyle: open ? "normal" : "italic",
        }}
      >
        {open ? back : "👆 Toca para ver el contenido"}
      </p>
      
      {!open && (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            fontSize: fontSize * 1.5,
          }}
        >
          👆
        </motion.div>
      )}
    </motion.div>
  );
}

/* =========================================================
   PÁGINA 1 — Bienvenida S2 (Tipos de influencers)
   ========================================================= */
type M1S2Page1Props = {
  brandName?: string;
  logoSrc?: string;
  primaryColor?: string;
  background?: string;
  progressPercent?: number;
  title?: string;
  topicTitle?: string;
  heroImage?: string;
  layoutOption?: "A" | "B";
  baseFontSize?: number;
  syllabus?: string[];
  summaryPoints?: string[];
};

function M1S2Page1(props: M1S2Page1Props) {
  const {
    brandName = "BIZEN",
    logoSrc = "/bizen-mondragonlogo.png",
    primaryColor = "#0F62FE",
    background = "#FFFFFF",
    progressPercent = 0,
    title = "Sección 2",
    topicTitle = "Tipos de influencers y microinfluencers",
    heroImage = "",
    layoutOption = "B",
    baseFontSize = 18,
    syllabus = [
      "Definiciones y umbrales por tamaño de audiencia.",
      "Ventajas y trade-offs de cada tipo.",
      "Cuándo elegir micro vs. macro según objetivo.",
      "Señales de calidad y riesgos a vigilar.",
      "Mini-ejercicio de clasificación de perfiles.",
    ],
    summaryPoints = [
      "Micro y nano: alta cercanía y engagement, costo-eficientes para nichos.",
      "Mid-tier: buen equilibrio entre alcance y credibilidad.",
      "Macro y mega: escalan awareness con rapidez, pero menor interacción relativa.",
      "Elige el tipo según objetivo (awareness/consideración/conversión) y presupuesto.",
      "Evalúa fit de audiencia, consistencia de contenido y cumplimiento.",
    ],
  } = props;

  // Increased font size from base 18 to 24 for bigger text
  const fs = Math.max(16, baseFontSize || 24);
  const isLeft = layoutOption === "A";
  const [selectedPill, setSelectedPill] = useState<number | null>(null);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Add shimmer and floating keyframes
  React.useEffect(() => {
    const styleId = 'm1s2-page1-shimmer-effects';
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

  const wrapper = useMemo(
    () => ({
      width: "100%",
      minHeight: "100vh",
      display: "flex" as const,
      flexDirection: "column" as const,
      alignItems: "stretch" as const,
      background,
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs,
    }),
    [background, fs]
  );

  const container = useMemo(
    () => ({
      width: "100%",
      maxWidth: "none",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isLeft]
  );

  return (
    <div style={wrapper}>
      <SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%", flex: 1 }}>
        {/* Contenido */}
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              <motion.div variants={itemVar} style={{ marginBottom: 24, position: "relative" as const }}>
                {/* Animated background glow */}
                <div style={{
                  position: "absolute" as const,
                  top: "-60px",
                  left: "-60px",
                  right: "-60px",
                  bottom: "-60px",
                  background: "radial-gradient(ellipse at center, rgba(30, 64, 175, 0.08) 0%, transparent 70%)",
                  borderRadius: "50%",
                  zIndex: 0,
                  animation: "float 8s ease-in-out infinite"
                }} />
                
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.8, 
                    lineHeight: 1.15,
                    fontWeight: 800,
                    position: "relative" as const,
                    overflow: "hidden" as const,
                    zIndex: 1
                  }}
                  animate={{ 
                    y: [0, -12, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span style={{ 
                    background: `linear-gradient(135deg, #1e40af 0%, #3B82F6 25%, #60A5FA 50%, #93C5FD 75%, #1e40af 100%)`,
                    backgroundSize: "300% 300%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer-title 4s infinite",
                    position: "relative" as const,
                    zIndex: 1,
                    fontWeight: 800,
                    display: "inline-block",
                    filter: "drop-shadow(0 2px 4px rgba(30, 64, 175, 0.3))"
                  }}>
                    {title}
                  </span>
                  {/* Shimmer overlay */}
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    animation: "shimmer 4s infinite",
                    zIndex: 2
                  }} />
                </motion.h1>
                
                <motion.p 
                  style={{ 
                    margin: "12px 0 0", 
                    opacity: 0.95, 
                    fontSize: fs * 1.6,
                    fontWeight: 600,
                    position: "relative" as const,
                    zIndex: 1
                  }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span style={{ 
                    background: `linear-gradient(135deg, #1e40af, #3B82F6)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 700, 
                    fontSize: fs * 1.8 
                  }}>
                    ▌
                  </span>{" "}
                  <span style={{ 
                    fontWeight: 600,
                    color: "#1e40af"
                  }}>
                    {topicTitle}
                  </span>
                </motion.p>
              </motion.div>

              {heroImage ? (
                <motion.div variants={itemVar} style={{ borderRadius: 16, overflow: "hidden" as const, margin: "10px 0 18px" }}>
                  <img src={heroImage} alt="Sección 2" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 24 }}
              >
                <Card glow={primaryColor}>
                  <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 12, marginBottom: 16 }}>
                    <motion.div 
                      aria-hidden 
                      style={{ width: 24, height: 24, borderRadius: 8, background: primaryColor }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    />
                    <h3 style={{ margin: 0, fontSize: fs * 1.6, fontWeight: 800 }}>📚 Temario de la sección</h3>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 0, opacity: 0.95, listStyle: "none" }}>
                    {syllabus.map((s, i) => (
                      <motion.li 
                        key={i} 
                        style={{ marginBottom: 16 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <motion.div
                          onClick={() => toggleExpand(i)}
                          style={{
                            cursor: "pointer",
                            padding: "16px 18px",
                            borderRadius: "12px",
                            background: expandedItems.includes(i) ? `${primaryColor}15` : "transparent",
                            border: `2px solid ${expandedItems.includes(i) ? primaryColor : "rgba(0,0,0,0.08)"}`,
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            fontSize: fs * 1.1
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                            borderColor: primaryColor
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.span 
                            style={{ color: primaryColor, fontWeight: 800, fontSize: fs * 1.4 }}
                            animate={{ 
                              rotate: expandedItems.includes(i) ? 360 : 0,
                              scale: expandedItems.includes(i) ? [1, 1.2, 1] : 1
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {expandedItems.includes(i) ? "✓" : "○"}
                          </motion.span>
                          <span style={{ fontWeight: 600 }}>{s}</span>
                        </motion.div>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              <motion.div 
                variants={itemVar}
              >
                <Card glow={primaryColor}>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: fs * 1.6, fontWeight: 800 }}>
                    ⚡ Resumen rápido
                  </h3>
                  <p style={{ margin: "0 0 10px 0", opacity: 0.95 }}>
                    Por tamaño de audiencia y rol típico en la estrategia:
                  </p>

                  <div style={{ marginBottom: 10 }}>
                    {[
                      { text: "Nano (<10K)", color: "#8b5cf6", desc: "Alta cercanía, nichos muy específicos" },
                      { text: "Micro (10K–100K)", color: "#3b82f6", desc: "Ideal para engagement y conversión" },
                      { text: "Mid-tier (100K–500K)", color: "#10b981", desc: "Equilibrio alcance-confianza" },
                      { text: "Macro (500K–1M)", color: "#f59e0b", desc: "Scalabilidad y awareness" },
                      { text: "Mega (>1M)", color: "#ef4444", desc: "Máximo alcance masivo" }
                    ].map((item, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          display: "inline-flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "10px 14px",
                          borderRadius: 12,
                          border: `2px solid ${selectedPill === i ? item.color : `${item.color}33`}`,
                          background: selectedPill === i ? item.color : `${item.color}10`,
                          marginRight: 8,
                          marginBottom: 8,
                          fontSize: fs * 0.95,
                          fontWeight: 700,
                          color: selectedPill === i ? "#fff" : item.color,
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          position: "relative" as const,
                          overflow: "visible" as const
                        }}
                        onClick={() => setSelectedPill(selectedPill === i ? null : i)}
                      >
                        <span>{item.text}</span>
                        {selectedPill === i && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                              position: "absolute",
                              top: "100%",
                              marginTop: 8,
                              padding: "8px 12px",
                              background: item.color,
                              color: "#fff",
                              borderRadius: 8,
                              fontSize: fs * 0.85,
                              whiteSpace: "nowrap",
                              zIndex: 10,
                              pointerEvents: "none"
                            }}
                          >
                            {item.desc}
                            <div style={{
                              position: "absolute",
                              bottom: "100%",
                              left: "50%",
                              transform: "translateX(-50%)",
                              border: "6px solid transparent",
                              borderBottomColor: item.color
                            }} />
                          </motion.div>
                        )}
                      </motion.span>
                    ))}
                  </div>

                  <ul style={{ margin: 0, paddingLeft: 0, opacity: 0.95, listStyle: "none" }}>
                    {summaryPoints.map((s, i) => (
                      <motion.li 
                        key={i} 
                        style={{ marginBottom: 10, display: "flex", alignItems: "flex-start", gap: 8 }}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <motion.span 
                          style={{ color: primaryColor, fontWeight: 800, fontSize: fs * 1.2 }}
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          →
                        </motion.span>
                        <span>{s}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   PÁGINA 2 — Info Influencers (acordeones + micro pros/cons)
   ========================================================= */
type LayoutOption = "A" | "B";
type Role = { title: string; description: string };

type M1S2Page2Props = {
  layoutOption?: LayoutOption;
  baseFontSize?: number;
  primaryColor?: string;
  background?: string;
  brandName?: string;
  logoSrc?: string;
  progressPercent?: number;
  headerTitle?: string;
  headerSubtitle?: string;
  definitionTitle?: string;
  definitionBody1?: string;
  definitionBody2?: string;
  roles?: Role[];
  microTitle?: string;
  microProsTitle?: string;
  microPros?: string[];
  microConsTitle?: string;
  microCons?: string[];
  heroImage?: string;
};

function AccordionItem({
  title,
  children,
  primaryColor,
  defaultOpen = false,
  fontSize,
}: {
  title: string;
  children: React.ReactNode;
  primaryColor: string;
  defaultOpen?: boolean;
  fontSize: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, overflow: "hidden" as const, background: "#fff" }}>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 0.96 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "14px 16px",
          background: "transparent",
          border: 0,
          display: "flex" as const,
          alignItems: "center" as const,
          justifyContent: "space-between" as const,
          cursor: "pointer",
          fontWeight: 700,
          fontSize: fontSize * 1.05,
          transformOrigin: "center",
        }}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span style={{ color: primaryColor, fontWeight: 900 }}>{open ? "–" : "+"}</span>
      </motion.button>
      <div
        style={{
          maxHeight: open ? 600 : 0,
          opacity: open ? 1 : 0,
          transition: "max-height .25s ease, opacity .25s ease, padding .25s ease",
          padding: open ? "0 16px 14px" : "0 16px 0",
          fontSize,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function M1S2Page2(props: M1S2Page2Props) {
  const {
    layoutOption = "A",
    baseFontSize = 18,
    primaryColor = "#0F62FE",
    background = "#FFFFFF",
    brandName = "BIZEN",
    logoSrc = "/bizen-mondragonlogo.png",
    progressPercent = 25,
    headerTitle = "¿Qué es un influencer de verdad?",
    headerSubtitle = "Aporta valor y construye relación con su comunidad",
    definitionTitle = "Definición práctica",
    definitionBody1 = "Es alguien que influye en decisiones de una comunidad porque aporta valor (enseña, entretiene, recomienda con credibilidad).",
    definitionBody2 = "No es solo famoso: construye relación con su audiencia y entiende sus necesidades.",
    roles = [
      { title: "Educadores/as", description: "Tutoriales, guías cómo-hacer, comparativas." },
      { title: "Entretenimiento / Storytellers", description: "Humor, retos, trends con narrativa." },
      { title: "Reseñas / Testers", description: "Pruebas honestas, antes–después, pros/contras." },
      { title: "Comunidad / Líderes de nicho", description: "Organizan clubs, Discord, lives." },
      { title: "Curadores/as", description: "Recomiendan lo mejor de un tema (apps, libros, outfits)." },
      { title: "Activadores de ventas", description: "Crean urgencia (códigos, bundles, lives)." },
    ],
    microTitle = "Micro-influencers: ventajas y límites",
    microProsTitle = "Ventajas",
    microPros = [
      "Engagement alto → confianza; comunidades más específicas.",
      "Coste/beneficio sano; ideal para pruebas e iteración rápida.",
      "Mejor fit con marcas locales o productos de nicho.",
    ],
    microConsTitle = "Límites",
    microCons = ["Alcance total menor (a veces necesitas varios micro).", "Producción y coordinación con muchos creadores toma tiempo."],
    heroImage = "",
  } = props;

  // Increased font size for larger text
  const fs = Math.max(16, baseFontSize || 24);
  const isA = layoutOption === "A";
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

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
    const styleId = 'm1s2-page2-shimmer-effects';
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

  const wrapper: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      minHeight: "100vh",
      display: "flex" as const,
      flexDirection: "column" as const,
      alignItems: "stretch" as const,
      background: "linear-gradient(135deg, #E0F2FE 0%, #F8FAFC 50%, #F0F9FF 100%)",
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs,
    }),
    [fs]
  );

  const container: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      maxWidth: "none",
      padding: "24px",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isA]
  );

  const toggleCard = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Flashcard component
  const FlashCard = ({ front, back, index }: { front: string; back: string; index: number }) => {
    const isFlipped = flippedCards.includes(index);
    return (
      <motion.div
        variants={floatingVariants}
        animate="float"
        style={{
          perspective: "1000px",
          cursor: "pointer",
        }}
        onClick={() => toggleCard(index)}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            width: "100%",
            minHeight: "200px",
            position: "relative" as const,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front */}
          <div
            style={{
              position: "absolute" as const,
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden" as const,
              background: isFlipped ? "transparent" : "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
              borderRadius: "24px",
              padding: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 60px rgba(59, 130, 246, 0.3)",
              color: "#fff",
              transform: "rotateY(0deg)",
              border: "3px solid rgba(255,255,255,0.2)",
            }}
          >
            <div style={{ textAlign: "center" as const }}>
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎓</div>
              <h3 style={{ margin: 0, fontSize: fs * 1.4, fontWeight: 700 }}>{front}</h3>
              <p style={{ margin: "12px 0 0", fontSize: fs * 1.0, opacity: 0.9 }}>Toca para girar</p>
            </div>
          </div>
          {/* Back */}
          <div
            style={{
              position: "absolute" as const,
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden" as const,
              background: isFlipped ? "linear-gradient(135deg, #10B981 0%, #059669 100%)" : "transparent",
              borderRadius: "24px",
              padding: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 60px rgba(16, 185, 129, 0.3)",
              color: "#fff",
              transform: "rotateY(180deg)",
              border: "3px solid rgba(255,255,255,0.2)",
            }}
          >
            <p style={{ margin: 0, fontSize: fs * 1.2, lineHeight: 1.6, textAlign: "center" as const }}>{back}</p>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div style={wrapper}>
      <SectionPageHeader
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main style={{ width: "100%", flex: 1 }}>
        <section>
          <div style={{ ...container }}>
            <motion.div variants={containerVar} initial="hidden" animate="show">
              {/* Shimmer Title with Floating Effect */}
              <motion.div 
                variants={itemVar} 
                style={{ marginBottom: 24 }}
              >
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
                    {headerTitle}
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
                  <span style={{ color: "#60A5FA", fontWeight: 700, fontSize: "1.3em" }}>▌</span> {headerSubtitle}
                </motion.p>
              </motion.div>

              {heroImage ? (
                <motion.div
                  variants={itemVar}
                  style={{ borderRadius: 16, overflow: "hidden" as const, boxShadow: "0 18px 60px rgba(0,0,0,0.12)", marginTop: 14, marginBottom: 16 }}
                >
                  <img src={heroImage} alt="Hero" style={{ width: "100%", height: "auto", display: "block" }} />
                </motion.div>
              ) : null}

              {/* Definition Card */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%)",
                    borderRadius: "24px",
                    padding: "32px",
                    border: "2px solid rgba(59, 130, 246, 0.2)",
                    boxShadow: "0 10px 40px rgba(59, 130, 246, 0.15)",
                    position: "relative" as const,
                    overflow: "hidden",
                  }}
                >
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
                  <h3 style={{ margin: "0 0 16px 0", fontSize: fs * 1.6, color: "#1E40AF", fontWeight: 700 }}>
                    {definitionTitle}
                  </h3>
                  <p style={{ margin: 0, opacity: 0.95, fontSize: fs * 1.1, lineHeight: 1.7 }}>
                    {definitionBody1}
                  </p>
                  <p style={{ margin: "12px 0 0", opacity: 0.95, fontSize: fs * 1.1, lineHeight: 1.7, color: "#475569" }}>
                    {definitionBody2}
                  </p>
                </div>
              </motion.div>

              {/* Flashcard Grid */}
              <motion.div variants={itemVar} style={{ marginBottom: 28 }}>
                <h3 style={{ margin: "0 0 24px 0", fontSize: fs * 1.8, color: "#1E40AF", fontWeight: 700, textAlign: "center" as const }}>
                  🎯 Clasificación por rol/estilo (interactivo)
                </h3>
                <div style={{ display: "grid" as const, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
                  {roles.map((r, i) => (
                    <FlashCard key={i} front={r.title} back={r.description} index={i} />
                  ))}
                </div>
              </motion.div>

              {/* Micro-influencers Card */}
              <motion.div variants={itemVar} style={{ marginBottom: 28 }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%)",
                    borderRadius: "24px",
                    padding: "32px",
                    border: "2px solid rgba(16, 185, 129, 0.2)",
                    boxShadow: "0 10px 40px rgba(16, 185, 129, 0.15)",
                    position: "relative" as const,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute" as const,
                      bottom: -50,
                      left: -50,
                      width: "200px",
                      height: "200px",
                      background: "radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent)",
                      borderRadius: "50%",
                    }}
                  />
                  <h3 style={{ margin: "0 0 24px 0", fontSize: fs * 1.8, color: "#059669", fontWeight: 700 }}>
                    {microTitle}
                  </h3>
                  <div style={{ display: "grid" as const, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                    <div>
                      <h4 style={{ margin: "0 0 12px 0", color: "#10B981", fontSize: fs * 1.3, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                        <span>✅</span> {microProsTitle}
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: 24, lineHeight: 1.8 }}>
                        {microPros.map((p, i) => (
                          <li key={i} style={{ marginBottom: 10, fontSize: fs * 1.05, color: "#1F2937" }}>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 style={{ margin: "0 0 12px 0", color: "#F59E0B", fontSize: fs * 1.3, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                        <span>⚠️</span> {microConsTitle}
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: 24, lineHeight: 1.8 }}>
                        {microCons.map((c, i) => (
                          <li key={i} style={{ marginBottom: 10, fontSize: fs * 1.05, color: "#1F2937" }}>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   PÁGINA 3 — Quiz V/F (persistente)
   ========================================================= */
const M1S2_P3_QUESTIONS: { text: string; answer: boolean }[] = [
  { text: "Un influencer de verdad influye porque aporta valor (enseña, entretiene o recomienda con credibilidad).", answer: true },
  { text: "Ser famoso por sí solo te convierte en un buen influencer para marcas.", answer: false },
  { text: "Nano = 1k–10k, y suelen ser útiles para marcas locales o muy de nicho.", answer: true },
  { text: "Micro = 10k–100k, hoy suelen ser los más usados por su equilibrio alcance-confianza.", answer: true },
  { text: "Mid/Macro = 100k–1M, destacan por visibilidad y efecto lanzamiento (wow).", answer: true },
  { text: "Mega = 1M+, son masivos, menos segmentados y más costosos.", answer: true },
  { text: "Nano/Micro están de moda porque su ER es más bajo y su conversación es menos real.", answer: false },
  { text: "Educadores/as: tutoriales, guías cómo-hacer y comparativas.", answer: true },
  { text: "Entretenimiento/Storytellers: humor, retos y trends con narrativa.", answer: true },
  { text: "Reseñas/Testers: pruebas honestas, antes-después, pros/contras.", answer: true },
  { text: "Comunidad/Líderes de nicho: organizan clubs, Discord y lives.", answer: true },
  { text: "Curadores/as: recomiendan lo mejor de un tema (apps, libros, outfits).", answer: true },
  { text: "Activadores de ventas: crean urgencia con códigos, bundles y lives.", answer: true },
  { text: "Tu marca personal debe quedarse estrictamente con un solo rol.", answer: false },
  { text: "TikTok/IG Reels: video corto y descubrimiento rápido.", answer: true },
  { text: "YouTube/Shorts: reseñas y guías profundas (long form) + alcance con shorts.", answer: true },
  { text: "Instagram (feed, stories, carrusel): estética, comunidad y DMs.", answer: true },
  { text: "Twitch/Directos: conexión real en vivo (Q&A, gaming, charlas).", answer: true },
  { text: "X/Threads: ideas y autoridad con texto corto/hilos.", answer: true },
  { text: "Blogs/Newsletters/LinkedIn: profundidad y posicionamiento experto (B2B).", answer: true },
  { text: "Ventaja: ER alto, comunidades específicas y costos razonables.", answer: true },
  { text: "Ventaja: ideales para pruebas e iteración rápida.", answer: true },
  { text: "Límite: menor alcance total; a veces necesitas varios micro.", answer: true },
  { text: "Límite: coordinar muchos creadores puede requerir más producción y tiempo.", answer: true },
];

type M1S2Page3Props = {
  brandName?: string;
  logoSrc?: string;
  primaryColor?: string;
  background?: string;
  progressPercent?: number;
  title?: string;
  topicTitle?: string;
  layoutOption?: "A" | "B";
  baseFontSize?: number;
  // Quiz tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: boolean | null, correctAnswer: boolean, isCorrect: boolean) => void;
  onQuizComplete?: (score: number) => void;
  isAlreadyCompleted?: boolean;
  completedScore?: number;
};

function M1S2Page3(props: M1S2Page3Props) {
  const {
    brandName = "BIZEN",
    logoSrc = "/bizen-mondragonlogo.png",
    primaryColor = "#0F62FE",
    background = "#FFFFFF",
    progressPercent = 50,
    title = "Influencers – Verdadero o Falso",
    topicTitle = "Fundamentos, tamaños, roles, plataformas y micro-influencers",
    layoutOption = "B",
    baseFontSize = 18,
    onAnswerSubmit,
    onQuizComplete,
    isAlreadyCompleted,
    completedScore,
  } = props;

  const fs = Math.max(12, baseFontSize || 18);
  const isA = layoutOption === "A";
  
  // Add shimmer and floating keyframes for page 3
  React.useEffect(() => {
    const styleId = 'm1s2-page3-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes shimmer-text {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
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
      background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f7ff 100%)",
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs,
    }),
    [background, isA, fs]
  );
  const container = useMemo(
    () => ({
      width: "100%",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isA]
  );

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)));
  const total = M1S2_P3_QUESTIONS.length;

  // === ESTADO PERSISTENTE ===
  const [idx, setIdx] = usePersisted<number>("bsmx:m1s2:p3:idx", () => 0);
  const [selection, setSelection] = usePersisted<(boolean | null)[]>("bsmx:m1s2:p3:sel", () =>
    Array(total).fill(null)
  );
  const [checked, setChecked] = usePersisted<boolean[]>("bsmx:m1s2:p3:chk", () =>
    Array(total).fill(false)
  );
  const [correct, setCorrect] = usePersisted<boolean[]>("bsmx:m1s2:p3:ok", () =>
    Array(total).fill(false)
  );
  const [score, setScore] = usePersisted<number>("bsmx:m1s2:p3:score", () => 0);

  useEffect(() => {
    // Normaliza tamaños si editas preguntas
    if (selection.length !== total) setSelection(Array(total).fill(null));
    if (checked.length !== total) setChecked(Array(total).fill(false));
    if (correct.length !== total) setCorrect(Array(total).fill(false));
    if (idx > total - 1) setIdx(total - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const q = M1S2_P3_QUESTIONS[idx];
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAnswer = (value: boolean) => {
    if (checked[idx]) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const nextSelection = [...selection];
    nextSelection[idx] = value;
    setSelection(nextSelection);

    const isCorrect = value === q.answer;
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
      console.log(`M1S2P3: Submitting answer ${idx}: ${value}, correct=${q.answer}, isCorrect=${isCorrect}`);
      onAnswerSubmit(idx, q.text, value, q.answer, isCorrect);
    }

    if (idx < total - 1) {
      timeoutRef.current = setTimeout(() => {
        setIdx((current) => Math.min(current + 1, total - 1));
        timeoutRef.current = null;
      }, 800);
    } else {
      // Last question - complete quiz after delay
      console.log("M1S2P3: Last question answered, completing quiz with score:", newScore);
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

  const optStyle = (active: boolean) =>
    ({
      padding: "18px 22px",
      borderRadius: 14,
      border: `2px solid ${active ? primaryColor : "rgba(0,0,0,0.12)"}`,
      background: active ? `${primaryColor}14` : "#fff",
      fontWeight: 800,
      fontSize: fs * 1.4,
      letterSpacing: 0.2,
      cursor: "pointer",
      userSelect: "none" as const,
      textAlign: "center" as const,
      boxShadow: active ? "0 8px 24px rgba(0,0,0,0.06)" : "none",
      willChange: "transform",
      transformOrigin: "center",
    }) as React.CSSProperties;

  const feedback =
    checked[idx] && correct[idx] ? (
      <div style={{ color: "#0a7f35", fontWeight: 700 }}>✅ ¡Correcto!</div>
    ) : checked[idx] && !correct[idx] ? (
      <div style={{ color: "#b00020", fontWeight: 700 }}>
        ❌ Incorrecto. {q.answer ? "Era VERDADERO." : "Era FALSO."}
      </div>
    ) : null;

  const quizProgressPct = Math.round(((idx + 1) / total) * 100);

  // Show "Already Completed" screen if quiz was already taken
  if (isAlreadyCompleted) {
    return (
      <div style={wrapper}>
        {/* Marketing Facts Animation Overlay */}
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
          text: 'El 82% de los influencers usa Instagram como plataforma principal.',
          characterImage: '/2.png'
        },
        {
          character: 'drago',
          text: 'TikTok genera un 15% más de interacción que Instagram en campañas de influencia.',
          characterImage: '/drago1.png'
        },
        {
          character: 'billy',
          text: 'El 69% de las marcas planea aumentar su presupuesto en influencers este año.',
          characterImage: '/2.png'
        },
        {
          character: 'drago',
          text: '4 de cada 10 usuarios compran después de ver una recomendación de influencer.',
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
              <motion.div variants={itemVar} style={{ marginBottom: 24, position: "relative" as const }}>
                {/* Animated background glow */}
                <div style={{
                  position: "absolute" as const,
                  top: "-60px",
                  left: "-60px",
                  right: "-60px",
                  bottom: "-60px",
                  background: "radial-gradient(ellipse at center, rgba(30, 64, 175, 0.08) 0%, transparent 70%)",
                  borderRadius: "50%",
                  zIndex: 0,
                  animation: "float 8s ease-in-out infinite"
                }} />
                
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.8, 
                    lineHeight: 1.15,
                    fontWeight: 800,
                    position: "relative" as const,
                    overflow: "hidden" as const,
                    zIndex: 1
                  }}
                  animate={{ 
                    y: [0, -12, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span style={{ 
                    background: `linear-gradient(135deg, #1e40af 0%, #3B82F6 25%, #60A5FA 50%, #93C5FD 75%, #1e40af 100%)`,
                    backgroundSize: "300% 300%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer-text 4s infinite",
                    position: "relative" as const,
                    zIndex: 1,
                    fontWeight: 800,
                    display: "inline-block",
                    filter: "drop-shadow(0 2px 4px rgba(30, 64, 175, 0.3))"
                  }}>
                    {title}
                  </span>
                  {/* Shimmer overlay */}
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    animation: "shimmer 4s infinite",
                    zIndex: 2
                  }} />
                </motion.h1>
                
                <motion.p 
                  style={{ 
                    margin: "12px 0 0", 
                    opacity: 0.95, 
                    fontSize: fs * 1.6,
                    fontWeight: 600,
                    position: "relative" as const,
                    zIndex: 1
                  }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span style={{ 
                    background: `linear-gradient(135deg, #1e40af, #3B82F6)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 700, 
                    fontSize: fs * 1.8 
                  }}>
                    ▌
                  </span>{" "}
                  <span style={{ 
                    fontWeight: 600,
                    color: "#1e40af"
                  }}>
                    {topicTitle}
                  </span>
                </motion.p>
              </motion.div>

              {/* Quiz V/F */}
              <motion.div variants={itemVar}>
                <Card glow={primaryColor}>
                  {/* Progreso del quiz */}
                  <div style={{ display: "flex" as const, alignItems: "center" as const, justifyContent: "space-between" as const, marginBottom: 14 }}>
                    <strong style={{ fontSize: fs * 1.1 }}>
                      Pregunta {idx + 1} / {total}
                    </strong>
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 10 }}>
                      <div style={{ width: 220, height: 12, background: "rgba(0,0,0,0.08)", borderRadius: 999, overflow: "hidden" }}>
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
                  <p style={{ margin: "10px 0 18px", lineHeight: 1.55, fontSize: fs * 1.4 }}>{q.text}</p>

                  {/* Opciones */}
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
                      onClick={() => handleAnswer(true)}
                      style={optStyle(selection[idx] === true)}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    >
                      VERDADERO
                    </motion.div>
                    <motion.div
                      role="button"
                      onClick={() => handleAnswer(false)}
                      style={optStyle(selection[idx] === false)}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    >
                      FALSO
                    </motion.div>
                  </div>

              {/* Feedback */}
              <div style={{ marginBottom: 12 }}>{feedback}</div>
              <div style={{ marginBottom: 14, opacity: 0.75, fontSize: fs * 0.9, textAlign: "right" }}>
                {answeredCount}/{total} respondidas
              </div>

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
                        {correct.filter(Boolean).length} / {total}
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

/* =========================================================
   PÁGINA 4 — Quiz Opción Múltiple (persistente)
   ========================================================= */
const M1S2_P4_QUESTIONS = [
  {
    text: "¿Qué define mejor a un influencer de verdad?",
    options: ["Alguien famoso con muchos seguidores", "Alguien que influye porque aporta valor y relación con su audiencia", "Cualquier cuenta verificada", "Un anunciante que paga por alcance"],
    correctIndex: 1,
  },
  {
    text: "¿Qué NO describe a un influencer auténtico?",
    options: ["Construye credibilidad y enseña/entretiene", "Solo es famoso, sin relación con su audiencia", "Aporta recomendaciones útiles", "Entiende necesidades de su comunidad"],
    correctIndex: 1,
  },
  { text: "Rango típico de audiencia: Nano", options: ["1k–10k", "10k–100k", "100k–1M", "1M+"], correctIndex: 0 },
  { text: "Rango típico de audiencia: Micro", options: ["500–5k", "10k–100k", "50k–200k", "1M+"], correctIndex: 1 },
  { text: "Rango típico de audiencia: Mid/Macro", options: ["1k–10k", "10k–100k", "100k–1M", "1M+"], correctIndex: 2 },
  { text: "Rango típico de audiencia: Mega", options: ["100–1k", "1k–10k", "100k–1M", "1M+"], correctIndex: 3 },
  {
    text: "¿Por qué Nano/Micro están de moda?",
    options: ["Solo por ser más baratos", "ER más alto, conversaciones reales y conversión más medible", "Porque no requieren coordinación", "Porque siempre tienen mayor alcance total"],
    correctIndex: 1,
  },
  { text: "Rol: Educadores/as", options: ["Humor, retos, narrativa", "Tutoriales, guías y comparativas", "Urgen a comprar con códigos", "Organizan lives comunitarios"], correctIndex: 1 },
  { text: "Rol: Entretenimiento / Storytellers", options: ["Curaduría de apps/libros", "Comparativas técnicas", "Humor, retos, trends con narrativa", "Gestión de Discord/clubes"], correctIndex: 2 },
  { text: "Rol: Reseñas / Testers", options: ["Antes-después, pros/contras, pruebas honestas", "Códigos/bundles y lives de venta", "Hilos largos de texto", "Noticias generales"], correctIndex: 0 },
  { text: "Rol: Comunidad / Líderes de nicho", options: ["Organizan clubs, Discord y lives", "Solo publican reels virales", "Solo comparan precios", "Solo hacen ads pagados"], correctIndex: 0 },
  {
    text: "Plataforma → principal aporte",
    options: [
      "TikTok/IG Reels: video corto y descubrimiento rápido",
      "YouTube/Shorts: solo memes sin profundidad",
      "Instagram: solo anuncios pagados",
      "Blogs/Newsletters/LinkedIn: solo entretenimiento ligero",
    ],
    correctIndex: 0,
  },
  { text: "¿Qué destaca de YouTube (long form) y Shorts?", options: ["Guías y reseñas profundas + alcance con Shorts", "Solo directos en vivo", "Solo fotos estéticas", "Solo textos cortos e hilos"], correctIndex: 0 },
  {
    text: "Una ventaja típica de micro-influencers",
    options: ["Siempre tienen mayor alcance que los mega", "ER alto, comunidades específicas y mejor fit local/nicho", "No requieren coordinación alguna", "Garantizan ventas sin contenido"],
    correctIndex: 1,
  },
];

type M1S2Page4Props = {
  brandName?: string;
  logoSrc?: string;
  primaryColor?: string;
  background?: string;
  progressPercent?: number;
  title?: string;
  topicTitle?: string;
  layoutOption?: "A" | "B";
  baseFontSize?: number;
  // Quiz tracking props
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: number | null, correctAnswer: number, isCorrect: boolean) => void;
  onQuizComplete?: (score: number) => void;
  isAlreadyCompleted?: boolean;
  completedScore?: number;
};

function M1S2Page4(props: M1S2Page4Props) {
  const {
    brandName = "BIZEN",
    logoSrc = "/bizen-mondragonlogo.png",
    primaryColor = "#0F62FE",
    background = "#FFFFFF",
    progressPercent = 75,
    title = "Sección 2",
    topicTitle = "Quiz: Opción múltiple (14 preguntas)",
    layoutOption = "B",
    baseFontSize = 18,
    onAnswerSubmit,
    onQuizComplete,
    isAlreadyCompleted,
    completedScore,
  } = props;

  const fs = Math.max(12, baseFontSize || 18);
  const isA = layoutOption === "A";
  
  // Add shimmer and floating keyframes for page 4
  React.useEffect(() => {
    const styleId = 'm1s2-page4-shimmer-effects';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes shimmer-text {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
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
      background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f7ff 100%)",
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs,
    }),
    [background, isA, fs]
  );
  const container = useMemo(
    () => ({
      width: "100%",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isA]
  );

  const breath = {
    scale: [1, 1.06, 1],
    transition: { duration: 2.0, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const },
  };

  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)));

  const total = M1S2_P4_QUESTIONS.length;

  // === ESTADO PERSISTENTE ===
  const [idx, setIdx] = usePersisted<number>("bsmx:m1s2:p4:idx", () => 0);
  const [selection, setSelection] = usePersisted<(number | null)[]>("bsmx:m1s2:p4:sel", () =>
    Array(total).fill(null)
  );
  const [checked, setChecked] = usePersisted<boolean[]>("bsmx:m1s2:p4:chk", () =>
    Array(total).fill(false)
  );
  const [correct, setCorrect] = usePersisted<boolean[]>("bsmx:m1s2:p4:ok", () =>
    Array(total).fill(false)
  );
  const [score, setScore] = usePersisted<number>("bsmx:m1s2:p4:score", () => 0);

  useEffect(() => {
    if (selection.length !== total) setSelection(Array(total).fill(null));
    if (checked.length !== total) setChecked(Array(total).fill(false));
    if (correct.length !== total) setCorrect(Array(total).fill(false));
    if (idx > total - 1) setIdx(total - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const q = idx >= 0 && idx < total ? M1S2_P4_QUESTIONS[idx] : null;
  
  // Debug logging for question data
  React.useEffect(() => {
    if (q) {
      console.log(`🔍 M1S2P4 Question Debug:`, {
        questionIndex: idx,
        questionText: q.text,
        options: q.options,
        correctIndex: q.correctIndex,
        correctAnswer: q.options?.[q.correctIndex],
        optionsLength: q.options?.length
      });
    }
  }, [q, idx]);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAnswer = (optionIndex: number) => {
    if (!q || !Array.isArray(q.options)) return;
    if (checked[idx]) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const next = [...selection];
    next[idx] = optionIndex;
    setSelection(next);

    const isCorrect = optionIndex === q.correctIndex;
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
      console.log(`M1S2P4: Submitting answer ${idx}: ${optionIndex}, correct=${q.correctIndex}, isCorrect=${isCorrect}`);
      onAnswerSubmit(idx, q.text, optionIndex, q.correctIndex, isCorrect);
    }

    if (idx < total - 1) {
      timeoutRef.current = setTimeout(() => {
        setIdx((current) => Math.min(current + 1, total - 1));
        timeoutRef.current = null;
      }, 800);
    } else {
      // Last question - complete quiz after delay
      console.log("M1S2P4: Last question answered, completing quiz with score:", newScore);
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

  // Reset quiz function
  const resetQuiz = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bsmx:m1s2:p4:idx');
      localStorage.removeItem('bsmx:m1s2:p4:sel');
      localStorage.removeItem('bsmx:m1s2:p4:chk');
      localStorage.removeItem('bsmx:m1s2:p4:ok');
      localStorage.removeItem('bsmx:m1s2:p4:score');
      window.location.reload();
    }
  };

  const optStyle = (active: boolean, disabled: boolean) => ({
    padding: "18px 20px",
    borderRadius: 16,
    border: `2.5px solid ${active ? primaryColor : "rgba(0,0,0,0.1)"}`,
    background: active 
      ? `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)` 
      : "linear-gradient(135deg, #ffffff, #f8fafc)",
    fontWeight: 600,
    fontSize: fs * 1.05,
    letterSpacing: 0.15,
    cursor: disabled ? "default" : "pointer",
    userSelect: "none" as const,
    textAlign: "left" as const,
    boxShadow: active 
      ? "0 8px 24px rgba(15, 98, 254, 0.15), 0 2px 8px rgba(15, 98, 254, 0.1)" 
      : "0 2px 8px rgba(0,0,0,0.04)",
    willChange: "transform",
    transformOrigin: "center",
    position: "relative" as const,
    overflow: "hidden" as const,
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    backdropFilter: "blur(10px)",
  });

  const feedback =
    q && checked[idx] && correct[idx] ? (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          padding: "16px 20px",
          borderRadius: 14,
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08))",
          border: "2px solid #10B981",
          color: "#0a7f35",
          fontWeight: 700,
          fontSize: fs * 1.1,
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 4px 16px rgba(16, 185, 129, 0.2)"
        }}
      >
        <span style={{ fontSize: fs * 1.5 }}>✅</span>
        <span>¡Excelente! Respuesta correcta</span>
      </motion.div>
    ) : q && checked[idx] && !correct[idx] ? (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          padding: "16px 20px",
          borderRadius: 14,
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.08))",
          border: "2px solid #EF4444",
          color: "#b00020",
          fontWeight: 600,
          fontSize: fs * 1.05
        }}
      >
        <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: fs * 1.5 }}>❌</span>
          <strong style={{ fontSize: fs * 1.1 }}>Incorrecto</strong>
        </div>
        <div style={{ 
          padding: "8px 12px",
          background: "rgba(0,0,0,0.04)",
          borderRadius: 8,
          fontSize: fs * 0.95,
          lineHeight: 1.5
        }}>
          La respuesta correcta era: <strong style={{ color: "#0a7f35", fontWeight: 700 }}>{q.options[q.correctIndex]}</strong>
        </div>
      </motion.div>
    ) : null;

  // Debug logging for feedback
  React.useEffect(() => {
    if (q && checked[idx] && !correct[idx]) {
      console.log(`🔍 M1S2P4 Feedback Debug:`, {
        questionIndex: idx,
        questionText: q.text,
        correctIndex: q.correctIndex,
        correctAnswer: q.options[q.correctIndex],
        allOptions: q.options,
        userSelection: selection[idx]
      });
    }
  }, [q, idx, checked, correct, selection]);

  const quizProgressPct = Math.round(((idx + 1) / total) * 100);

  // Show "Already Completed" screen if quiz was already taken
  if (isAlreadyCompleted) {
    return (
      <div style={wrapper}>
        {/* Marketing Facts Animation Overlay */}
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
          character: 'drago',
          text: 'Los nano-influencers tienen tasas de engagement de hasta 8%.',
          characterImage: '/drago1.png'
        },
        {
          character: 'billy',
          text: 'El 70% de los adolescentes confía más en influencers que en celebridades tradicionales.',
          characterImage: '/2.png'
        },
        {
          character: 'drago',
          text: 'El 45% de las marcas considera el influencer marketing su canal más rentable.',
          characterImage: '/drago1.png'
        },
        {
          character: 'billy',
          text: 'Los videos patrocinados tienen 3 veces más visualizaciones que los anuncios pagados.',
          characterImage: '/2.png'
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
              <motion.div variants={itemVar} style={{ marginBottom: 24, position: "relative" as const }}>
                {/* Animated background glow */}
                <div style={{
                  position: "absolute" as const,
                  top: "-60px",
                  left: "-60px",
                  right: "-60px",
                  bottom: "-60px",
                  background: "radial-gradient(ellipse at center, rgba(30, 64, 175, 0.08) 0%, transparent 70%)",
                  borderRadius: "50%",
                  zIndex: 0,
                  animation: "float 8s ease-in-out infinite"
                }} />
                
                <motion.h1 
                  style={{ 
                    margin: 0, 
                    fontSize: fs * 3.8, 
                    lineHeight: 1.15,
                    fontWeight: 800,
                    position: "relative" as const,
                    overflow: "hidden" as const,
                    zIndex: 1
                  }}
                  animate={{ 
                    y: [0, -12, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span style={{ 
                    background: `linear-gradient(135deg, #1e40af 0%, #3B82F6 25%, #60A5FA 50%, #93C5FD 75%, #1e40af 100%)`,
                    backgroundSize: "300% 300%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer-text 4s infinite",
                    position: "relative" as const,
                    zIndex: 1,
                    fontWeight: 800,
                    display: "inline-block",
                    filter: "drop-shadow(0 2px 4px rgba(30, 64, 175, 0.3))"
                  }}>
                    {title}
                  </span>
                  {/* Shimmer overlay */}
                  <div style={{
                    position: "absolute" as const,
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    animation: "shimmer 4s infinite",
                    zIndex: 2
                  }} />
                </motion.h1>
                
                <motion.p 
                  style={{ 
                    margin: "12px 0 0", 
                    opacity: 0.95, 
                    fontSize: fs * 1.6,
                    fontWeight: 600,
                    position: "relative" as const,
                    zIndex: 1
                  }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span style={{ 
                    background: `linear-gradient(135deg, #1e40af, #3B82F6)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 700, 
                    fontSize: fs * 1.8 
                  }}>
                    ▌
                  </span>{" "}
                  <span style={{ 
                    fontWeight: 600,
                    color: "#1e40af"
                  }}>
                    {topicTitle}
                  </span>
                </motion.p>
              </motion.div>

              {/* Quiz */}
              <motion.div variants={itemVar}>
                <Card glow={primaryColor}>
                  <div style={{ display: "flex" as const, alignItems: "center" as const, justifyContent: "space-between" as const, marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        padding: "8px 14px",
                        background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
                        borderRadius: 12,
                        color: "white",
                        fontWeight: 700,
                        fontSize: fs * 1.05,
                        boxShadow: "0 4px 12px rgba(15, 98, 254, 0.3)"
                      }}>
                        Pregunta {Math.min(idx + 1, total)}/{total}
                      </div>
                    </div>
                    <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 12 }}>
                      <div style={{ 
                        width: 220, 
                        height: 14, 
                        background: "linear-gradient(135deg, rgba(0,0,0,0.06), rgba(0,0,0,0.04))", 
                        borderRadius: 999, 
                        overflow: "hidden",
                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)"
                      }}>
                        <motion.div
                          initial={false}
                          animate={{ width: `${quizProgressPct}%` }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          style={{
                            height: "100%",
                            background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}ff, ${primaryColor})`,
                            backgroundSize: "200% auto",
                            borderRadius: 999,
                            boxShadow: "0 2px 8px rgba(15, 98, 254, 0.4)"
                          }}
                        />
                      </div>
                      <span style={{ 
                        fontSize: fs * 1.0, 
                        fontWeight: 700,
                        color: primaryColor
                      }}>
                        {quizProgressPct}%
                      </span>
                    </div>
                  </div>

                  <p style={{ 
                    margin: "14px 0 20px", 
                    lineHeight: 1.6, 
                    fontSize: fs * 1.15,
                    fontWeight: 600,
                    color: "#1f2937"
                  }}>
                    {q ? q.text : "—"}
                  </p>

                  <div
                    style={{
                      display: "grid" as const,
                      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                      gap: 14,
                      marginBottom: 14,
                    }}
                  >
                    {(q && q.options ? q.options : []).map((opt, i) => {
                      const isSelected = selection[idx] === i;
                      const disabled = checked[idx];
                      return (
                        <motion.div
                          key={i}
                          role="button"
                          onClick={() => {
                            if (disabled) return;
                            handleAnswer(i);
                          }}
                          style={optStyle(isSelected, disabled)}
                          aria-pressed={isSelected}
                          whileHover={disabled ? undefined : { scale: 0.98, y: -2 }}
                          whileTap={disabled ? undefined : { scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          {/* Glow effect for selected items */}
                          {isSelected && (
                            <div style={{
                              position: "absolute" as const,
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: `linear-gradient(135deg, ${primaryColor}20, transparent)`,
                              borderRadius: 16,
                              pointerEvents: "none",
                            }} />
                          )}
                          <span style={{ 
                            position: "relative" as const,
                            zIndex: 1,
                            display: "block",
                            lineHeight: 1.5
                          }}>
                            {opt || ""}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div style={{ marginBottom: 12 }}>{feedback}</div>
                  <div style={{ marginBottom: 14, opacity: 0.75, fontSize: fs * 0.9, textAlign: "right" }}>
                    {checked.filter(Boolean).length}/{total} respondidas
                  </div>

                  {finished ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          marginTop: 24,
                          padding: "24px 28px",
                          borderRadius: 16,
                          background: "linear-gradient(135deg, rgba(15, 98, 254, 0.08), rgba(15, 98, 254, 0.04))",
                          border: `2.5px solid ${primaryColor}`,
                          display: "flex" as const,
                          alignItems: "center" as const,
                          justifyContent: "space-between" as const,
                          boxShadow: "0 8px 24px rgba(15, 98, 254, 0.15)",
                          marginBottom: 16
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontSize: fs * 1.8 }}>🎉</span>
                          <strong style={{ 
                            fontSize: fs * 1.2,
                            fontWeight: 800,
                            color: "#1f2937"
                          }}>
                            Resultado Final:
                          </strong>
                        </div>
                        <span style={{ 
                          fontSize: fs * 1.6,
                          fontWeight: 900, 
                          color: primaryColor,
                          background: "white",
                          padding: "8px 16px",
                          borderRadius: 12,
                          boxShadow: "0 4px 12px rgba(15, 98, 254, 0.2)"
                        }}>
                          {correct.filter(Boolean).length} / {total}
                        </span>
                      </motion.div>
                      <motion.button
                        onClick={resetQuiz}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          width: "100%",
                          padding: "16px 24px",
                          borderRadius: 14,
                          background: "linear-gradient(135deg, #6b7280, #4b5563)",
                          border: "none",
                          color: "white",
                          fontWeight: 700,
                          fontSize: fs * 1.05,
                          cursor: "pointer",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                          transition: "all 0.2s"
                        }}
                      >
                        🔄 Reintentar Quiz
                      </motion.button>
                    </>
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

/* =========================================================
   PÁGINA 5 — Actividad Flashcards (persistente) + CTA
   ========================================================= */
const M1S2_P5_STEPS: string[] = [
  "Escribe tu NICHO + PROMESA en 1 frase (¿a quién ayudas?, ¿con qué problema?, ¿qué resultado?): 'Ayudo a [X] a [Y] con [Z]'.",
  "Elige tu tamaño objetivo: NANO (1k–10k) o MICRO (10k–100k) y explica en 1 línea por qué (ER alto, nicho local, costos, etc.).",
  "Define tus ROLES (2): elige 1 principal y 1 secundario (Educador, Storyteller, Reseñas/Tester, Comunidad, Curador, Activador de ventas).",
  "Selecciona PLATAFORMA + FORMATO principal y anota 1 idea: TikTok/IG Reels (corto), YouTube (largo o Shorts), IG carrusel/stories, Twitch, X/Threads, Newsletter/LinkedIn.",
  "Encuentra 2 CREATORES de referencia (1 nano + 1 micro) en tu nicho y escribe: qué valor aportan (4E) y 1 métrica a observar (ER, guardados, VTR).",
  "Redacta un GUION de 5 líneas para tu primera pieza: HOOK, mensaje clave, ejemplo/prueba (evidencia), CTA, disclosure (#Ad si aplica). ¡Listo para grabar!",
];

type M1S2Page5Props = {
  brandName?: string;
  logoSrc?: string;
  primaryColor?: string;
  background?: string;
  progressPercent?: number;
  title?: string;
  topicTitle?: string;
  layoutOption?: "A" | "B";
  baseFontSize?: number;
  instructions?: string[];
  gridColumns?: number;
  gridGap?: number;
  persistProgress?: boolean;

  // Desbloqueo + navegación (opcional)
  storageKey?: string;
  moduleNumber?: number;
  sectionsPerModule?: number;
  currentSectionNumber?: number;
  menuUrl?: string;
  openMenuInNewTab?: boolean;
  continueLabel?: string;
  showContinueButton?: boolean;
};

function M1S2Page5(props: M1S2Page5Props) {
  const {
    brandName = "BIZEN",
    logoSrc = "/bizen-mondragonlogo.png",
    primaryColor = "#0F62FE",
    background = "#FFFFFF",
    progressPercent = 100,
    title = "Sección 2",
    topicTitle = "Actividad práctica (6 pasos)",
    layoutOption = "B",
    baseFontSize = 18,
    instructions = M1S2_P5_STEPS,
    gridColumns = 1,
    gridGap = 16,

    storageKey = "bsmx_mondragon_progress",
    moduleNumber = 1,
   sectionsPerModule = 3,
   currentSectionNumber = 2,
   menuUrl = "https://www.bsmx.lat/general-modulo-1/mod-1-secciones",
   openMenuInNewTab = false,
   continueLabel = "Continuar al menú",
   showContinueButton = true,
  } = props;

  // Add shimmer and floating effects
  React.useEffect(() => {
    const styleId = 'm1s2-page5-shimmer-effects';
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
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const fs = Math.max(12, baseFontSize || 18);
  const isLeft = layoutOption === "A";
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent)));

  const list = (instructions?.length ? instructions : M1S2_P5_STEPS)
    .slice(0, 6)
    .map((t, i) => ({ front: `Paso ${i + 1}`, back: t }));

  // Persistimos cuáles tarjetas se han visto
  const [seen, setSeen] = usePersisted<boolean[]>("bsmx:m1s2:p5:seen", () =>
    Array(list.length).fill(false)
  );
  const opened = seen.filter(Boolean).length;

  // Add interactive activity state
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    Array(list.length).fill(false)
  );
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (seen.length !== list.length) {
      setSeen(Array(list.length).fill(false));
    }
  }, [list.length, seen.length, setSeen]);

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
  );
  const container = useMemo(
    () => ({
      width: "100%",
      maxWidth: "none",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isLeft]
  );

  const miniPct = Math.round((opened / list.length) * 100);

  const unlockNextAndGo = React.useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        const key = `${storageKey}:m${moduleNumber}:sectionMax`;
        const raw = window.localStorage.getItem(key);
        const currentMax = raw ? parseInt(raw, 10) || 1 : 1;
        const next = Math.min(sectionsPerModule, Math.max(currentMax, (currentSectionNumber || 2) + 1));
        window.localStorage.setItem(key, String(next));
        window.dispatchEvent(new Event("bsmx:section-updated"));
      }
    } catch (e) {
      console.error("unlockNextAndGo error:", e);
    } finally {
      if (openMenuInNewTab) window.open(menuUrl, "_blank", "noopener,noreferrer");
      else window.location.href = menuUrl;
    }
  }, [storageKey, moduleNumber, sectionsPerModule, currentSectionNumber, menuUrl, openMenuInNewTab]);

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
              <motion.div variants={itemVar} style={{ marginBottom: 14 }}>
                <h1 
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
                </h1>
                <p style={{ margin: "8px 0 0", opacity: 0.9, fontSize: fs * 1.12 }}>
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {topicTitle}
                </p>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div
                  style={{
                    position: "relative" as const,
                    borderRadius: 24,
                    padding: 28,
                    border: `3px solid #00d4ff`,
                    background: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
                    boxShadow: `0 20px 60px rgba(0, 180, 216, 0.4), 0 8px 24px rgba(0, 119, 182, 0.3)`,
                    overflow: "hidden" as const,
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
                    
                    <div>
                      <div style={{
                        color: "white",
                        fontWeight: 900,
                        fontSize: fs * 1.3,
                        marginBottom: 6,
                        textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      }}>
                        ¡Actividad Interactiva!
                      </div>
                      <div style={{
                        color: "rgba(255,255,255,0.95)",
                        fontWeight: 600,
                        fontSize: fs * 1.05,
                        lineHeight: 1.5,
                      }}>
                        Toca cada tarjeta de colores para descubrir el siguiente paso de tu actividad práctica
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                      position: "absolute",
                      top: -50,
                      right: -50,
                      width: 150,
                      height: 150,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent)",
                      filter: "blur(20px)",
                    }}
                  />
                  <motion.div
                    animate={{ 
                      scale: [1.3, 1, 1.3],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{
                      position: "absolute",
                      bottom: -60,
                      left: -60,
                      width: 180,
                      height: 180,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent)",
                      filter: "blur(30px)",
                    }}
                  />
                </div>
              </motion.div>

              {/* Activity Progress Banner */}
              <motion.div variants={itemVar} style={{ marginBottom: 24 }}>
                <div 
                  style={{ 
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
                  }}
                >
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(45deg, rgba(255,255,255,0.1), transparent)",
                    animation: "shimmer 3s linear infinite"
                  }} />
                  
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    style={{ fontSize: fs * 1.8 }}
                  >
                    🎯
                  </motion.div>
                  
                  <div style={{ flex: 1, position: "relative" as const, zIndex: 1 }}>
                    <motion.div 
                      style={{ 
                        color: "white", 
                        fontWeight: 800,
                        fontSize: fs * 1.1,
                        marginBottom: 4,
                      }}
                      animate={opened > 0 ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      Progreso de la Actividad
                    </motion.div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ 
                        flex: 1, 
                        height: 12, 
                        background: "rgba(255,255,255,0.3)", 
                        borderRadius: 999, 
                        overflow: "hidden",
                        position: "relative",
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
                      <span style={{ 
                        color: "white", 
                        fontWeight: 800,
                        fontSize: fs * 1.05,
                        minWidth: 50,
                        textAlign: "right"
                      }}>
                        {miniPct}%
                      </span>
                    </div>
                  </div>
                  
                  <motion.span 
                    style={{ 
                      color: "white", 
                      fontWeight: 800,
                      fontSize: fs * 0.9,
                      background: "rgba(255,255,255,0.2)",
                      padding: "6px 12px",
                      borderRadius: 20,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {opened}/{list.length}
                  </motion.span>
                </div>
              </motion.div>

              {/* Interactive Activity Cards */}
              <motion.div variants={itemVar} style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "grid" as const,
                    gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
                    gap: 20,
                  }}
                >
                  {list.map((c, i) => {
                    const isOpen = seen[i];
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
                        key={i}
                        onClick={() => {
                          setSeen((prev) => {
                            const next = [...prev];
                            if (!next[i]) next[i] = true;
                            return next;
                          });
                        }}
                        style={{
                          position: "relative" as const,
                          cursor: "pointer",
                          borderRadius: 24,
                          padding: 24,
                          background: isOpen ? colors[i % colors.length] : "linear-gradient(135deg, #f8faff, #e0e7ff)",
                          border: `3px solid ${isOpen ? "rgba(255,255,255,0.5)" : colors[i % colors.length] + "80"}`,
                          boxShadow: isOpen 
                            ? `0 20px 60px ${colors[i % colors.length] + "60"}` 
                            : "0 10px 30px rgba(0,0,0,0.1)",
                          overflow: "hidden" as const,
                          minHeight: 200,
                          display: "flex" as const,
                          flexDirection: "column" as const,
                          gap: 12,
                        }}
                        whileHover={isOpen ? { scale: 1.05, y: -8 } : { scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        {/* Shimmer overlay when open */}
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
                              animation: "shimmer 2s linear infinite",
                            }}
                          />
                        )}
                        
                        {/* Step number badge */}
                        <motion.div
                          style={{
                            alignSelf: "flex-start",
                            background: isOpen ? "rgba(255,255,255,0.3)" : colors[i % colors.length],
                            color: isOpen ? "white" : "white",
                            padding: "8px 16px",
                            borderRadius: 20,
                            fontSize: fs * 0.85,
                            fontWeight: 800,
                            backdropFilter: "blur(10px)",
                            border: `2px solid ${isOpen ? "rgba(255,255,255,0.5)" : "transparent"}`,
                          }}
                          animate={isOpen ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {c.front}
                        </motion.div>

                        {/* Content */}
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, position: "relative", zIndex: 1 }}>
                          {isOpen ? (
                            <>
                              <p
                                style={{
                                  margin: 0,
                                  color: "white",
                                  fontSize: fs * 1.05,
                                  lineHeight: 1.7,
                                  fontWeight: 500,
                                }}
                              >
                                {c.back}
                              </p>
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                  marginTop: "auto",
                                  alignSelf: "flex-end",
                                  fontSize: fs * 1.5,
                                }}
                              >
                                ✅
                              </motion.div>
                            </>
                          ) : (
                            <>
                              <p
                                style={{
                                  margin: 0,
                                  color: "#4b5563",
                                  fontSize: fs,
                                  lineHeight: 1.6,
                                  fontStyle: "italic",
                                  opacity: 0.7,
                                }}
                              >
                                Toca para revelar el paso
                              </p>
                              <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                  marginTop: "auto",
                                  alignSelf: "center",
                                  fontSize: fs * 2,
                                }}
                              >
                                👆
                              </motion.div>
                            </>
                          )}
                        </div>

                        {/* Decorative gradient dot */}
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: isOpen ? [0.3, 0.5, 0.3] : [0.2, 0.3, 0.2],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          style={{
                            position: "absolute",
                            top: -30,
                            right: -30,
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            background: colors[i % colors.length],
                            filter: "blur(40px)",
                            opacity: 0.3,
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   EXPORT: mapping de las 5 páginas de la sección 2
   Úsalo en tu page.tsx: {M1S2_CONTENT[page] ?? <div>…</div>}
   ========================================================= */
export const M1S2_CONTENT: Record<number, React.ReactNode> = {
  1: <M1S2Page1 />,
  2: <M1S2Page2 />,
  3: <M1S2Page3 />,
  4: <M1S2Page4 />,
  5: <M1S2Page5 />,
};

export default M1S2_CONTENT;

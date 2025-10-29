// src/components/bizen/m1s1/Section1Pages.tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import SectionPageHeader from "@/components/bizen/SectionPageHeader";
import MarketingFactsAnimation from "@/components/MarketingFactsAnimation";

// Config
const EASE = [0.22, 1, 0.36, 1] as const;

// Variants con easing válido para Framer Motion (corrige TS2322)
const containerVar: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, ease: EASE },
  },
};
const itemVar: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { ease: EASE } },
};

const QUIZ_CARD_STYLE: React.CSSProperties = {
  padding: 32,
  maxWidth: "100%",
  margin: "0",
};

const MAX_WIDTH = 1200;

// =========================
// Header Component
// =========================
// =========================
// UI Helpers reutilizables
// =========================
function Card({
  children,
  glow,
  borderColor = "rgba(0,0,0,0.08)",
  style,
}: {
  children: React.ReactNode;
  glow?: string;
  borderColor?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "relative" as const,
        borderRadius: 16,
        padding: 20,
        border: `1px solid ${borderColor}`,
        background: "#FFFFFF",
        backdropFilter: "blur(6px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        overflow: "hidden" as const,
        ...style,
      }}
    >
      {glow ? (
        <div
          aria-hidden
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

type BIZENWelcomeM1Props = {
  brandName: string;
  logoSrc: string;
  primaryColor: string;
  background: string;
  title: string;
  moduleLabel: string;
  heroImage: string;
  syllabus: string[];
  layoutOption: LayoutOption;
  baseFontSize: number;
  progressPercent: number;
  videoFile: string;
  videoUrl: string;
  videoPoster: string;
  videoAutoplay: boolean;
  videoControls: boolean;
  videoLoop: boolean;
  videoMuted: boolean;
};

const DEFAULT_WELCOME_PROPS: BIZENWelcomeM1Props = {
  brandName: "BIZEN",
  logoSrc: "",
  primaryColor: "#0F62FE",
  background: "#FFFFFF",
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
  videoFile: "",
  videoUrl: "",
  videoPoster: "",
  videoAutoplay: false,
  videoControls: true,
  videoLoop: false,
  videoMuted: true,
};

function BIZENWelcomeM1(props: Partial<BIZENWelcomeM1Props>) {
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
    videoFile,
    videoUrl,
    videoPoster,
    videoAutoplay,
    videoControls,
    videoLoop,
    videoMuted,
  } = { ...DEFAULT_WELCOME_PROPS, ...props };

  const fs = Math.max(12, baseFontSize || 18);
  const isA = layoutOption === "A";
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)));

  // Add shimmer keyframes
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const wrapper = React.useMemo(
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
  );

  const container = React.useMemo(
    () => ({
      width: "100%",
      maxWidth: "none",
      padding: "20px",
      boxSizing: "border-box" as const,
    }),
    [isA]
  );

  const breathing = {
    duration: 1.4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  const effectiveVideoSrc =
    (videoFile && videoFile.trim()) || (videoUrl && videoUrl.trim()) || "";

  const isYouTubeUrl = effectiveVideoSrc.includes('youtube.com') || effectiveVideoSrc.includes('youtu.be');

  const safeSyllabus = Array.isArray(syllabus) ? syllabus : [];

  return (
    <div style={wrapper}>
      <SectionPageHeader
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
                    lineHeight: 1.2,
                    fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${primaryColor}, #3B82F6, #60A5FA, #93C5FD)`,
                    backgroundSize: "300% 300%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 4px 12px rgba(15, 98, 254, 0.3)",
                    position: "relative" as const,
                    overflow: "hidden" as const,
                  }}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: [0, -8, 0],
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ 
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    scale: {
                      duration: 0.6,
                      ease: "easeOut"
                    },
                    opacity: {
                      duration: 0.6,
                      ease: "easeOut"
                    },
                    backgroundPosition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <motion.span
                    style={{
                      position: "absolute" as const,
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                      animation: "shimmer 2s infinite"
                    }}
                    animate={{
                      left: ["100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {title}
                </motion.h1>
                <motion.p
                  style={{ margin: "10px 0 0", opacity: 0.9, fontSize: fs * 1.4 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span>{" "}
                  {moduleLabel}
                </motion.p>
              </motion.div>

              {heroImage ? (
                <motion.div
                  variants={itemVar}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 18px 60px rgba(0,0,0,0.12)",
                    marginTop: 14,
                    marginBottom: 16,
                  }}
                >
                  <img
                    src={heroImage}
                    alt="Bienvenida"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </motion.div>
              ) : null}

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <Card glow={primaryColor}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 16,
                      paddingBottom: 12,
                      borderBottom: `2px solid ${primaryColor}20`,
                    }}
                  >
                    <div
                      aria-hidden
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 8,
                        background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 4px 12px ${primaryColor}30`,
                      }}
                    >
                      <span style={{ color: "white", fontSize: "14px", fontWeight: 800 }}>📚</span>
                    </div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.55,
                      background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                      Temario
                    </h3>
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 0,
                      opacity: 0.95,
                      fontSize: fs,
                      listStyle: "none",
                    }}
                  >
                    {safeSyllabus.map((s, i) => (
                      <motion.li 
                        key={i} 
                        style={{ 
                          marginBottom: 12,
                          padding: "12px 16px",
                          background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}03)`,
                          borderRadius: 10,
                          border: `1px solid ${primaryColor}15`,
                          transition: "all 0.2s ease",
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          background: `linear-gradient(135deg, ${primaryColor}12, ${primaryColor}08)`,
                          border: `1px solid ${primaryColor}25`,
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span style={{ color: primaryColor, fontWeight: 700, marginRight: 8 }}>✓</span>
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
                <div>
                  {effectiveVideoSrc ? (
                    <div>
                      {isYouTubeUrl ? (
                        <iframe
                          src={effectiveVideoSrc}
                          title="Video de bienvenida"
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
                  ) : (
                    <div
                      style={{
                        border: "1px dashed rgba(0,0,0,0.2)",
                        borderRadius: 14,
                        padding: 24,
                        textAlign: "center",
                        color: "rgba(0,0,0,0.6)",
                        fontSize: fs * 0.95,
                      }}
                    >
                      Proporciona un <strong>archivo</strong> o una{" "}
                      <strong>URL</strong> de video para mostrarlo aquí.
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

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
  const [open, setOpen] = React.useState(defaultOpen);
  const [hover, setHover] = React.useState(false);

  const bgHover = `${primaryColor}0D`;
  const brHover = `${primaryColor}44`;

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
        onClick={() => setOpen((v) => !v)}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.995 }}
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
        <span style={{ textDecoration: hover ? "underline" : "none", textUnderlineOffset: 3 }}>
          {title}
        </span>
        <motion.span
          style={{ color: primaryColor, fontWeight: 900, lineHeight: 1, display: "inline-block" }}
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
  );
}

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
  icon,
}: {
  front: string;
  back: string;
  primaryColor: string;
  fontSize: number;
  icon?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.div
      role="button"
      onClick={() => setOpen((v) => !v)}
      whileHover={{ 
        scale: 1.02,
        y: -4,
        boxShadow: `0 20px 40px ${primaryColor}20`
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        userSelect: "none",
        cursor: "pointer",
        borderRadius: 20,
        border: `2px solid ${primaryColor}30`,
        background: open 
          ? `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)` 
          : `linear-gradient(135deg, #ffffff, #fafafa)`,
        padding: 24,
        minHeight: 240,
        boxShadow: open 
          ? `0 20px 40px ${primaryColor}20, 0 8px 16px rgba(0,0,0,0.1)` 
          : `0 10px 28px rgba(0,0,0,0.08)`,
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 16,
        transformOrigin: "center",
        willChange: "transform",
        position: "relative" as const,
        overflow: "hidden" as const,
        transition: "all 0.3s ease"
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: "absolute" as const,
        top: -20,
        right: -20,
        width: 60,
        height: 60,
        background: `radial-gradient(circle, ${primaryColor}20, transparent)`,
        borderRadius: "50%"
      }} />
      
      <div style={{ position: "relative" as const, zIndex: 2, flex: 1, display: "flex", flexDirection: "column" as const }}>
        {/* Header with icon and title */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          {icon && (
            <div style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}CC)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 12px ${primaryColor}40`,
              flexShrink: 0
            }}>
              <span style={{ color: "white", fontSize: "18px" }}>{icon}</span>
            </div>
          )}
          <strong style={{ 
            color: open ? primaryColor : `${primaryColor}AA`, 
            display: "block" as const, 
            fontSize: fontSize * 1.2, 
            lineHeight: 1.2,
            fontWeight: 800
          }}>
            {front}
          </strong>
        </div>
        
        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" as const, justifyContent: "center" }}>
          {open ? (
            <motion.p 
              style={{ 
                margin: 0, 
                opacity: 0.95, 
                fontSize: fontSize * 1.05, 
                lineHeight: 1.6, 
                color: "#374151",
                fontWeight: 500
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.95, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {back}
            </motion.p>
          ) : (
            <div style={{ textAlign: "center" as const, opacity: 0.7 }}>
              <div style={{
                fontSize: fontSize * 0.9,
                color: primaryColor,
                fontWeight: 600,
                marginBottom: 8
              }}>
                Toca para ver
              </div>
              <div style={{
                width: 40,
                height: 2,
                background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}60)`,
                borderRadius: 1,
                margin: "0 auto"
              }} />
            </div>
          )}
        </div>
        
        {/* Flip indicator */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 12,
          opacity: 0.6
        }}>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${primaryColor}20, ${primaryColor}10)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <span style={{ 
              color: primaryColor, 
              fontSize: "12px",
              fontWeight: 800
            }}>
              {open ? "↩" : "↻"}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

type LayoutOption = "A" | "B";

function DragScrollRow({
  children,
  gap = 16,
}: {
  children: React.ReactNode;
  gap?: number;
}) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => {
      if (!viewportRef.current || !trackRef.current) return;
      const vw = viewportRef.current.offsetWidth;
      const sw = trackRef.current.scrollWidth;
      setWidth(Math.max(0, sw - vw));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={viewportRef} style={{ overflow: "hidden" as const, width: "100%" }}>
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -width, right: 0 }}
        style={{
          display: "flex" as const,
          gap,
          paddingBottom: 6,
          cursor: width > 0 ? "grab" : "default",
        }}
        whileTap={{ cursor: width > 0 ? "grabbing" : "default" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function SwipeFlashcard({
  front,
  back,
  primaryColor,
  fontSize,
}: {
  front: string;
  back: string;
  primaryColor: string;
  fontSize: number;
}) {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <motion.div
      role="button"
      onClick={() => setFlipped((v) => !v)}
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{
        userSelect: "none",
        cursor: "pointer",
        borderRadius: 16,
        border: `1px solid ${primaryColor}33`,
        background: flipped ? `${primaryColor}0F` : "#fff",
        padding: 18,
        minWidth: 260,
        minHeight: 190,
        boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 12,
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
          fontSize,
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        {flipped ? back : "Toca para ver"}
      </p>
    </motion.div>
  );
}

function MetricRowBlock({
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
  const hasImage = Boolean(imageSrc);
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
        <h4 style={{ margin: "0 0 10px 0", color: primaryColor, fontSize: fs * 1.1 }}>{title}</h4>
        <ul style={{ margin: 0, paddingLeft: 22, fontSize: fs, lineHeight: 1.55 }}>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
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
  );
}

// ==========================================
// Contenidos (páginas de la sección)
// ==========================================

// PÁGINA 1 — Pantalla de bienvenida (layout B)
function WelcomePage() {
  return (
    <BIZENWelcomeM1
      brandName="BIZEN"
      logoSrc="/bizen-mondragonlogo.png"
      moduleLabel="Módulo 1 · Sección 1"
      title="Bienvenido a Brand Builders"
      syllabus={[
        "Entiende hacia dónde va el marketing de influencia en 2024.",
        "Conoce el mapa general de la microcredencial y entregables clave.",
        "Identifica cómo aprovechar la regla 4E para evaluar creadores.",
      ]}
      layoutOption="B"
      baseFontSize={18}
      progressPercent={0}
      videoUrl="https://www.youtube.com/embed/n_kRl-y0eds"
    />
  );
}

// PÁGINA 2 — Bienvenida + temario + 4E
function Page1() {
  const primaryColor = "#0F62FE";
  const background = "#FFFFFF";
  const fs = 18;

  // Add shimmer keyframes
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={{ 
      width: "100%", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f7ff 100%)",
      fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji"
    }}>
      <SectionPageHeader 
        primaryColor={primaryColor} 
        progress={20} 
        brandName="BIZEN"
        logoSrc="/bizen-mondragonlogo.png"
      />
      <div style={{ padding: "20px", maxWidth: "100%", margin: "0" }}>
        <motion.div variants={containerVar} initial="hidden" animate="show">
          <motion.div variants={itemVar} style={{ marginBottom: 12 }}>
            <motion.h1 
              style={{ 
                margin: 0, 
                fontSize: fs * 3.0, 
                lineHeight: 1.15,
                fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                fontWeight: 800,
                background: `linear-gradient(135deg, ${primaryColor}, #3B82F6, #60A5FA, #93C5FD)`,
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 4px 12px rgba(15, 98, 254, 0.3)",
                position: "relative" as const,
                overflow: "hidden" as const,
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -8, 0],
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                scale: {
                  duration: 0.6,
                  ease: "easeOut"
                },
                opacity: {
                  duration: 0.6,
                  ease: "easeOut"
                },
                backgroundPosition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <motion.span
                style={{
                  position: "absolute" as const,
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                  animation: "shimmer 2s infinite"
                }}
                animate={{
                  left: ["100%", "100%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              Sección 1
            </motion.h1>
            <motion.p 
              style={{ margin: "6px 0 0", opacity: 0.9, fontSize: fs * 1.4 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.9, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span style={{ 
                color: primaryColor, 
                fontWeight: 700,
                textShadow: "0 2px 4px rgba(15, 98, 254, 0.3)"
              }}>▌</span> 
              <motion.span
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Panorama actual del marketing de influencia
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Intro */}
          <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
            <Card glow={primaryColor} style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
              border: `2px solid ${primaryColor}20`,
              boxShadow: "0 20px 40px rgba(15, 98, 254, 0.1), 0 8px 16px rgba(0,0,0,0.05)"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
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
                    <span style={{ color: "white", fontSize: "18px" }}>💡</span>
                  </div>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: fs * 1.2,
                    background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    Concepto clave
                  </h3>
                </div>
                <p style={{ 
                  margin: 0, 
                  opacity: 0.95, 
                  fontSize: fs,
                  lineHeight: 1.6,
                  color: "#374151"
                }}>
                  El marketing de influencia es cuando marcas colaboran con creadores para generar contenido auténtico que conecte con audiencias específicas.
              </p>
            </Card>
          </motion.div>

          {/* Bullets */}
          <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
            <Card glow={primaryColor} style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)",
              border: `2px solid ${primaryColor}20`,
              boxShadow: "0 20px 40px rgba(15, 98, 254, 0.1), 0 8px 16px rgba(0,0,0,0.05)"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
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
                    <span style={{ color: "white", fontSize: "18px" }}>🎯</span>
                  </div>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: fs * 1.355,
                    background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    ¿Por qué importa hoy?
                  </h3>
                </div>
                <div style={{ display: "grid", gap: 12 }}>
                  {[
                    "La gente confía más en personas cercanas que en anuncios tradicionales.",
                    "Las redes sociales también son buscadores de productos y reseñas.",
                    "Permite llegar a nichos específicos (gaming, skincare, deporte, etc.)."
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "12px 16px",
                        background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}03)`,
                        borderRadius: 12,
                        border: `1px solid ${primaryColor}15`,
                        transition: "all 0.2s ease"
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        background: `linear-gradient(135deg, ${primaryColor}12, ${primaryColor}08)`,
                        border: `1px solid ${primaryColor}25`
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2
                      }}>
                        <span style={{ color: "white", fontSize: "12px", fontWeight: 800 }}>✓</span>
                      </div>
                      <p style={{ 
                        margin: 0, 
                        opacity: 0.95, 
                        fontSize: fs,
                        lineHeight: 1.5,
                        color: "#374151"
                      }}>
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
            </Card>
          </motion.div>

          {/* Idea clave */}
          <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
            <div
              style={{
                background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}08)`,
                border: `2px solid ${primaryColor}30`,
                color: "#111",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 20px 40px rgba(15, 98, 254, 0.15), 0 8px 16px rgba(0,0,0,0.05)",
                position: "relative" as const,
                overflow: "hidden" as const
              }}
            >
              <div style={{
                position: "absolute" as const,
                top: -50,
                right: -50,
                width: 100,
                height: 100,
                background: `radial-gradient(circle, ${primaryColor}20, transparent)`,
                borderRadius: "50%"
              }} />
              <div style={{
                position: "absolute" as const,
                bottom: -30,
                left: -30,
                width: 60,
                height: 60,
                background: `radial-gradient(circle, ${primaryColor}15, transparent)`,
                borderRadius: "50%"
              }} />
              <div style={{ position: "relative" as const, zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 4px 12px ${primaryColor}40`
                  }}>
                    <span style={{ color: "white", fontSize: "18px" }}>💎</span>
                  </div>
                  <strong style={{ 
                    color: primaryColor, 
                    display: "block" as const, 
                    fontSize: fs * 1.2,
                    background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                Idea clave
              </strong>
                </div>
                <p style={{ 
                  margin: 0, 
                  opacity: 0.95, 
                  fontSize: fs * 1.1,
                  lineHeight: 1.6,
                  color: "#374151",
                  fontWeight: 500
                }}>
                  Un creador influye porque aporta valor real a su audiencia.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Formas típicas */}
          <motion.div variants={itemVar} style={{ marginBottom: 16 }}>
            <Card glow={primaryColor} style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
              border: `2px solid ${primaryColor}20`,
              boxShadow: "0 20px 40px rgba(15, 98, 254, 0.1), 0 8px 16px rgba(0,0,0,0.05)"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
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
                    <span style={{ color: "white", fontSize: "18px" }}>🤝</span>
                  </div>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: fs * 1.355,
                    background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    Formas típicas de colaboración
              </h3>
                </div>
                <p style={{ 
                  margin: "0 0 20px 0", 
                  opacity: 0.7, 
                  fontSize: fs * 0.95,
                  fontStyle: "italic"
                }}>
                  Elige según tu objetivo
                </p>

                <div style={{ display: "grid" as const, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                  {[
                    {
                      title: "Awareness",
                      subtitle: "(dar a conocer)",
                      content: "menciones, challenges, unboxings, vlogs, lives, colaboraciones",
                      icon: "📢",
                      color: "#3B82F6"
                    },
                    {
                      title: "Consideración",
                      subtitle: "(educar/convencer)",
                      content: "tutoriales, comparativas, antes-después, reseñas honestas, Q&A",
                      icon: "🎓",
                      color: "#60A5FA"
                    },
                    {
                      title: "Conversión",
                      subtitle: "(vender)",
                      content: "códigos/links, bundles, ofertas limitadas, whitelisting, Spark Ads",
                      icon: "💰",
                      color: "#1D4ED8"
                    },
                    {
                      title: "Formatos comunes",
                      subtitle: "",
                      content: "video corto, video largo, carruseles, directos, historias",
                      icon: "🎬",
                      color: "#2563EB"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      style={{
                        padding: "20px",
                        background: `linear-gradient(135deg, ${item.color}08, ${item.color}03)`,
                        borderRadius: 16,
                        border: `2px solid ${item.color}20`,
                        transition: "all 0.3s ease",
                        position: "relative" as const,
                        overflow: "hidden" as const
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -4,
                        background: `linear-gradient(135deg, ${item.color}15, ${item.color}08)`,
                        border: `2px solid ${item.color}40`,
                        boxShadow: `0 12px 24px ${item.color}20`
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div style={{
                        position: "absolute" as const,
                        top: -20,
                        right: -20,
                        width: 60,
                        height: 60,
                        background: `radial-gradient(circle, ${item.color}20, transparent)`,
                        borderRadius: "50%"
                      }} />
                      <div style={{ position: "relative" as const, zIndex: 2 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                          <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${item.color}, ${primaryColor})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 4px 8px ${item.color}30`
                          }}>
                            <span style={{ color: "white", fontSize: "16px" }}>{item.icon}</span>
                          </div>
                <div>
                            <h4 style={{ 
                              margin: "0 0 2px 0", 
                              color: item.color, 
                              fontSize: fs * 1.1,
                              fontWeight: 800
                            }}>
                              {item.title}
                  </h4>
                            {item.subtitle && (
                              <p style={{ 
                                margin: 0, 
                                color: item.color, 
                                fontSize: fs * 0.85,
                                opacity: 0.8,
                                fontWeight: 500
                              }}>
                                {item.subtitle}
                              </p>
                            )}
                </div>
                        </div>
                        <p style={{ 
                          margin: 0, 
                          opacity: 0.95, 
                          fontSize: fs * 0.95,
                          lineHeight: 1.5,
                          color: "#374151"
                        }}>
                          {item.content}
                  </p>
                </div>
                    </motion.div>
                  ))}
              </div>
            </Card>
          </motion.div>

          {/* 4E acordeón */}
          <motion.div variants={itemVar} style={{ marginBottom: 12 }}>
            <Card glow={primaryColor} style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)",
              border: `2px solid ${primaryColor}20`,
              boxShadow: "0 20px 40px rgba(15, 98, 254, 0.1), 0 8px 16px rgba(0,0,0,0.05)"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
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
                    <span style={{ color: "white", fontSize: "18px" }}>⚡</span>
                  </div>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: fs * 1.355,
                    background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    ¿Cómo saber si un creador aporta valor?
              </h3>
                </div>
                <p style={{ 
                  margin: "0 0 20px 0", 
                  opacity: 0.7, 
                  fontSize: fs * 0.95,
                  fontStyle: "italic"
                }}>
                  Regla 4E - Toca cada elemento para expandir
                </p>
                <div style={{ display: "grid" as const, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
                  {[
                    {
                      title: "Entretenimiento",
                      content: "Engancha; te hace ver hasta el final.",
                      icon: "🎭",
                      color: "#3B82F6"
                    },
                    {
                      title: "Educación",
                      content: "Aprendes algo útil y aplicable.",
                      icon: "📚",
                      color: "#60A5FA"
                    },
                    {
                      title: "Empatía",
                      content: "Conoce dolores reales de la comunidad.",
                      icon: "❤️",
                      color: "#1D4ED8"
                    },
                    {
                      title: "Evidencia",
                      content: "Muestra resultados, fuentes y comparativas.",
                      icon: "📊",
                      color: "#2563EB"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      style={{
                        padding: "20px",
                        background: `linear-gradient(135deg, ${item.color}08, ${item.color}03)`,
                        borderRadius: 16,
                        border: `2px solid ${item.color}20`,
                        transition: "all 0.3s ease",
                        position: "relative" as const,
                        overflow: "hidden" as const,
                        cursor: "pointer"
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -4,
                        background: `linear-gradient(135deg, ${item.color}15, ${item.color}08)`,
                        border: `2px solid ${item.color}40`,
                        boxShadow: `0 12px 24px ${item.color}20`
                      }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div style={{
                        position: "absolute" as const,
                        top: -20,
                        right: -20,
                        width: 60,
                        height: 60,
                        background: `radial-gradient(circle, ${item.color}20, transparent)`,
                        borderRadius: "50%"
                      }} />
                      <div style={{ position: "relative" as const, zIndex: 2 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                          <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${item.color}, ${primaryColor})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 4px 8px ${item.color}30`
                          }}>
                            <span style={{ color: "white", fontSize: "16px" }}>{item.icon}</span>
                          </div>
                          <h4 style={{ 
                            margin: 0, 
                            color: item.color, 
                            fontSize: fs * 1.1,
                            fontWeight: 800
                          }}>
                            {item.title}
                          </h4>
                        </div>
                        <p style={{ 
                          margin: 0, 
                          opacity: 0.95, 
                          fontSize: fs * 0.95,
                          lineHeight: 1.5,
                          color: "#374151"
                        }}>
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// PÁGINA 3 — Selección de creadores y métricas (drag cards)
function Page2() {
  const brandName = "BIZEN";
  const logoSrc = "/bizen-mondragonlogo.png";
  const primaryColor = "#0F62FE";
  const background = "#FFFFFF";
  const progressPercent = 40;
  const title = "Selección de creadores y métricas clave";
  const topicTitle = "";
  const heroImage = "";
  const layoutOption = "B" as LayoutOption;
  const baseFontSize = 18;

  const fs = Math.max(12, baseFontSize || 18);
  const isA = layoutOption === "A";

  // Add shimmer keyframes
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const wrapper = React.useMemo(
    () => ({
      width: "100%",
      minHeight: "100vh",
      display: "flex" as const,
      flexDirection: "column" as const,
      alignItems: "stretch" as const,
      background: "linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f7ff 100%)",
      color: "#111",
      fontFamily:
        "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      fontSize: fs,
    }),
    [background, isA, fs]
  );

  const container = React.useMemo(
    () => ({
      width: "100%",
      padding: "clamp(16px, 3vw, 32px)",
      boxSizing: "border-box" as const,
      margin: "0",
    }),
    [isA]
  );

  return (
    <div style={wrapper}>
      <SectionPageHeader
        logoHeight={84}
        primaryColor={primaryColor}
        progress={progressPercent}
        brandName={brandName}
        logoSrc={logoSrc || undefined}
      />
      <main
        style={{
          width: "100%",
          display: "flex" as const,
          flexDirection: "column" as const,
          flex: 1,
          minHeight: "100vh",
        }}
      >
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
                    background: `linear-gradient(135deg, ${primaryColor}, #3B82F6, #60A5FA, #93C5FD)`,
                    backgroundSize: "300% 300%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "0 4px 12px rgba(15, 98, 254, 0.3)",
                    position: "relative" as const,
                    overflow: "hidden" as const,
                  }}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: [0, -8, 0],
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ 
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    scale: {
                      duration: 0.6,
                      ease: "easeOut"
                    },
                    opacity: {
                      duration: 0.6,
                      ease: "easeOut"
                    },
                    backgroundPosition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <motion.span
                    style={{
                      position: "absolute" as const,
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                      animation: "shimmer 2s infinite"
                    }}
                    animate={{
                      left: ["100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {title}
                </motion.h1>
                <motion.p 
                  style={{ margin: "8px 0 0", opacity: 0.9, fontSize: fs * 1.4 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0.9, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <span style={{ 
                    color: primaryColor, 
                    fontWeight: 700,
                    textShadow: "0 2px 4px rgba(15, 98, 254, 0.3)"
                  }}>▌</span> 
                  <motion.span
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {topicTitle}
                  </motion.span>
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
                <Card glow={primaryColor} style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
                  border: `2px solid ${primaryColor}20`,
                  boxShadow: "0 20px 40px rgba(15, 98, 254, 0.1), 0 8px 16px rgba(0,0,0,0.05)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, #10B981, #059669)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 4px 12px rgba(16, 185, 129, 0.3)`
                    }}>
                      <span style={{ color: "white", fontSize: "18px" }}>🎯</span>
                    </div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.3,
                      background: `linear-gradient(135deg, #10B981, #059669)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}>
                      Selección de creadores: 3R + 5C
                    </h3>
                  </div>
                  <p style={{ 
                    margin: "0 0 20px 0", 
                    opacity: 0.8, 
                    fontSize: fs,
                    fontStyle: "italic"
                  }}>
                    Toca las tarjetas para ver las explicaciones
                  </p>

                  {/* 3R Flashcards */}
                  <div style={{ marginBottom: 24 }}>
                    <motion.div 
                      style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, #F59E0B, #D97706)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 6px 16px rgba(245, 158, 11, 0.4)`,
                        border: `2px solid #F59E0B`
                      }}>
                        <span style={{ color: "white", fontSize: "16px", fontWeight: 900 }}>3</span>
                      </div>
                      <h4 style={{ 
                        margin: 0, 
                        color: "#F59E0B", 
                        fontSize: fs * 1.4,
                        fontWeight: 900,
                        background: `linear-gradient(135deg, #F59E0B, #D97706)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textShadow: "0 2px 4px rgba(245, 158, 11, 0.3)"
                      }}>
                        Las 3R
                      </h4>
                    </motion.div>
                    <GridFlashcards gap={20} columns={3}>
                      {[
                        { front: "Reach", back: "Alcance real, no solo seguidores. Mide cuántas personas realmente ven el contenido y se involucran con él.", icon: "📊", color: "#F59E0B" },
                        { front: "Relevance", back: "Temas y audiencia adecuados. El contenido debe ser relevante para tu marca y dirigirse a tu público objetivo.", icon: "🎯", color: "#F59E0B" },
                        { front: "Resonance", back: "Engagement de calidad: comentarios útiles, guardados, compartidos. Mide qué tan bien conecta el contenido.", icon: "💬", color: "#F59E0B" },
                      ].map((card, index) => (
                        <Flashcard 
                          key={`3r-${index}`} 
                          front={card.front} 
                          back={card.back} 
                          primaryColor={card.color} 
                          fontSize={fs}
                          icon={card.icon}
                        />
                      ))}
                    </GridFlashcards>
                  </div>

                  {/* 5C Flashcards */}
                  <div>
                    <motion.div 
                      style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, #8B5CF6, #7C3AED)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 6px 16px rgba(139, 92, 246, 0.4)`,
                        border: `2px solid #8B5CF6`
                      }}>
                        <span style={{ color: "white", fontSize: "16px", fontWeight: 900 }}>5</span>
                      </div>
                      <h4 style={{ 
                        margin: 0, 
                        color: "#8B5CF6", 
                        fontSize: fs * 1.4,
                        fontWeight: 900,
                        background: `linear-gradient(135deg, #8B5CF6, #7C3AED)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textShadow: "0 2px 4px rgba(139, 92, 246, 0.3)"
                      }}>
                        Las 5C
                      </h4>
                    </motion.div>
                    <GridFlashcards gap={20} columns={3}>
                      {[
                        { front: "Comunidad", back: "Quiénes son y qué problema comparten. Conoce a su audiencia y entiende sus necesidades específicas.", icon: "👥", color: "#8B5CF6" },
                        { front: "Credibilidad", back: "Trayectoria, transparencia. ¿Es confiable y auténtico? ¿Tiene experiencia en el tema?", icon: "⭐", color: "#8B5CF6" },
                        { front: "Contenido", back: "Estilo, calidad audiovisual, storytelling. ¿Cómo comunica? ¿Es consistente y profesional?", icon: "🎬", color: "#8B5CF6" },
                        { front: "Coherencia", back: "Valores compatibles con la marca. ¿Sus valores coinciden con los tuyos? ¿Es una buena representación?", icon: "🤝", color: "#8B5CF6" },
                        { front: "Cumplimiento", back: "Disclosure y normas de plataforma. ¿Sigue las reglas? ¿Es transparente con las colaboraciones?", icon: "📋", color: "#8B5CF6" },
                      ].map((card, index) => (
                        <Flashcard 
                          key={`5c-${index}`} 
                          front={card.front} 
                          back={card.back} 
                          primaryColor={card.color} 
                          fontSize={fs}
                          icon={card.icon}
                        />
                      ))}
                    </GridFlashcards>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVar} style={{ marginBottom: 12 }}>
                <Card glow={primaryColor} style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #fef7ff 100%)",
                  border: `2px solid #EC4899`,
                  boxShadow: "0 20px 40px rgba(236, 72, 153, 0.1), 0 8px 16px rgba(0,0,0,0.05)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, #EC4899, #BE185D)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 4px 12px rgba(236, 72, 153, 0.3)`
                    }}>
                      <span style={{ color: "white", fontSize: "18px" }}>📊</span>
                    </div>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: fs * 1.3,
                      background: `linear-gradient(135deg, #EC4899, #BE185D)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}>
                      Métricas por objetivo
                    </h3>
                  </div>
                  <p style={{ 
                    margin: "0 0 24px 0", 
                    opacity: 0.7, 
                    fontSize: fs * 0.95,
                    fontStyle: "italic",
                    textAlign: "center" as const,
                    padding: "12px 20px",
                    background: `linear-gradient(135deg, #EC489920, #BE185D10)`,
                    borderRadius: 12,
                    border: `1px solid #EC489930`
                  }}>
                    (no mezcles peras con manzanas)
                  </p>

                  <div style={{ display: "grid", gap: 20 }}>
                    {[
                      {
                        title: "Awareness",
                        subtitle: "Dar a conocer",
                        items: ["Alcance", "Impresiones", "Reproducciones", "VTR (view-through rate)"],
                        color: "#F59E0B",
                        icon: "👁️",
                        description: "Mide cuántas personas vieron tu contenido"
                      },
                      {
                        title: "Consideración",
                        subtitle: "Educar y convencer",
                        items: ["CTR", "Guardados", "Comentarios de calidad", "Tiempo de visualización", "Clicks a página/landing"],
                        color: "#10B981",
                        icon: "🤔",
                        description: "Mide el interés y engagement de la audiencia"
                      },
                      {
                        title: "Conversión",
                        subtitle: "Vender",
                        items: ["Compras/altas con código o link", "CR (conversion rate)", "CPA/CAC"],
                        color: "#EF4444",
                        icon: "💰",
                        description: "Mide las ventas y conversiones reales"
                      },
                      {
                        title: "Post-campaña",
                        subtitle: "Impacto a largo plazo",
                        items: ["UGC generado", "Reseñas", "Incremento de búsquedas de marca", "Lift de recuerdo (si encuestas)"],
                        color: "#8B5CF6",
                        icon: "📈",
                        description: "Mide el impacto duradero de la campaña"
                      }
                    ].map((metric, index) => (
                      <motion.div
                        key={index}
                        style={{
                          background: `linear-gradient(135deg, ${metric.color}08, ${metric.color}03)`,
                          borderRadius: 20,
                          border: `2px solid ${metric.color}20`,
                          padding: 24,
                          position: "relative" as const,
                          overflow: "hidden" as const,
                          transition: "all 0.3s ease"
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          y: -4,
                          background: `linear-gradient(135deg, ${metric.color}15, ${metric.color}08)`,
                          border: `2px solid ${metric.color}40`,
                          boxShadow: `0 12px 24px ${metric.color}20`
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div style={{
                          position: "absolute" as const,
                          top: -30,
                          right: -30,
                          width: 80,
                          height: 80,
                          background: `radial-gradient(circle, ${metric.color}20, transparent)`,
                          borderRadius: "50%"
                        }} />
                        <div style={{ position: "relative" as const, zIndex: 2 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                            <div style={{
                              width: 48,
                              height: 48,
                              borderRadius: "50%",
                              background: `linear-gradient(135deg, ${metric.color}, ${metric.color}CC)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: `0 4px 12px ${metric.color}40`
                            }}>
                              <span style={{ color: "white", fontSize: "20px" }}>{metric.icon}</span>
                            </div>
                            <div>
                              <h4 style={{ 
                                margin: "0 0 4px 0", 
                                color: metric.color, 
                                fontSize: fs * 1.3,
                                fontWeight: 800
                              }}>
                                {metric.title}
                              </h4>
                              <p style={{ 
                                margin: 0, 
                                color: metric.color, 
                                fontSize: fs * 0.9,
                                opacity: 0.8,
                                fontWeight: 600
                              }}>
                                {metric.subtitle}
                              </p>
                            </div>
                          </div>
                          <p style={{ 
                            margin: "0 0 16px 0", 
                            fontSize: fs * 0.9,
                            color: "#6B7280",
                            fontStyle: "italic"
                          }}>
                            {metric.description}
                          </p>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                            {metric.items.map((item, itemIndex) => (
                              <motion.div
                                key={itemIndex}
                                style={{
                                  padding: "12px 16px",
                                  background: `linear-gradient(135deg, ${metric.color}15, ${metric.color}08)`,
                                  borderRadius: 12,
                                  border: `1px solid ${metric.color}30`,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8
                                }}
                                whileHover={{ 
                                  scale: 1.05,
                                  background: `linear-gradient(135deg, ${metric.color}25, ${metric.color}15)`
                                }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                              >
                                <div style={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  background: metric.color,
                                  flexShrink: 0
                                }} />
                                <span style={{ 
                                  fontSize: fs * 0.9,
                                  color: "#374151",
                                  fontWeight: 500
                                }}>
                                  {item}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

// PÁGINA 4 — Quiz V/F
function Page3(props: {
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: unknown, correctAnswer: unknown, isCorrect: boolean) => void;
  onQuizComplete?: (score: number) => void;
  isAlreadyCompleted?: boolean;
  completedScore?: number;
} = {}) {
  const { onAnswerSubmit, onQuizComplete, isAlreadyCompleted, completedScore } = props;
  
  const primaryColor = "#0F62FE";
  const fs = 18;
  const background = "#FFFFFF";
  
  console.log("Page3 (M1S1P4) - hasOnAnswerSubmit:", !!onAnswerSubmit, "hasOnQuizComplete:", !!onQuizComplete, "isAlreadyCompleted:", isAlreadyCompleted);

  const QUESTIONS = [
    { text: "El marketing de influencia es simplemente darle un producto a un famoso.", answer: false },
    { text: "Un creador aporta valor si educa, entretiene, inspira o demuestra con evidencia.", answer: true },
    { text: "En 3R, 'Reach' significa solo contar seguidores.", answer: false },
    { text: "Las 5C son: Comunidad, Credibilidad, Contenido, Coherencia y Cumplimiento.", answer: true },
    { text: "Las métricas de Awareness incluyen CTR y CPA como principales.", answer: false },
    { text: "La audiencia/comunidad es un actor clave en la colaboración.", answer: true },
    { text: "Los creadores permiten velocidad y autenticidad en la producción de contenidos.", answer: true },
    { text: "Un riesgo es no definir KPIs por objetivo.", answer: true },
    { text: "Conversión se mide típicamente con CR y CPA/CAC.", answer: true },
    { text: "Llegar a micro-comunidades suele ser menos efectivo que llegar a todos.", answer: false },
  ];

  const total = QUESTIONS.length;
  const [idx, setIdx] = React.useState(0);
  const [selection, setSelection] = React.useState<(boolean | null)[]>(Array(total).fill(null));
  const [checked, setChecked] = React.useState<boolean[]>(Array(total).fill(false));
  const [correct, setCorrect] = React.useState<boolean[]>(Array(total).fill(false));
  const [score, setScore] = React.useState(0);

  const q = QUESTIONS[idx];
  
  // Show "Already Completed" screen if quiz was already taken
  if (isAlreadyCompleted) {
    return (
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        background: '#FFFFFF',
      }}>
        <div style={{
          maxWidth: 600,
          width: '100%',
          background: 'white',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: 20,
          padding: 40,
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16, color: primaryColor }}>
            Quiz Ya Completado
          </h2>
          <p style={{ fontSize: 18, color: '#666', marginBottom: 24 }}>
            Ya completaste este quiz. Los quizzes solo pueden realizarse una vez.
          </p>
          <div style={{
            padding: 20,
            background: `${primaryColor}15`,
            borderRadius: 14,
            marginBottom: 24,
          }}>
            <strong style={{ fontSize: 28, color: primaryColor }}>
              Tu puntuación: {completedScore !== undefined && completedScore !== null ? completedScore : '?'} / {total}
            </strong>
          </div>
          <p style={{ fontSize: 16, color: '#999' }}>
            ✨ Continúa con el siguiente contenido
          </p>
        </div>
      </div>
    );
  }

  const optStyle = (active: boolean): React.CSSProperties => ({
    padding: "24px 28px",
    borderRadius: 14,
    border: `2px solid ${active ? primaryColor : "rgba(0,0,0,0.12)"}`,
    background: active ? `${primaryColor}14` : "#fff",
    fontWeight: 800,
    fontSize: fs * 1.35,
    letterSpacing: 0.2,
    cursor: "pointer",
    userSelect: "none",
    textAlign: "center",
    boxShadow: active ? "0 8px 24px rgba(0,0,0,0.06)" : "none",
    transformOrigin: "center",
  });

  const feedback =
    checked[idx] && correct[idx] ? (
      <div style={{ color: "#0a7f35", fontWeight: 700 }}>✅ ¡Correcto!</div>
    ) : checked[idx] && !correct[idx] ? (
      <div style={{ color: "#b00020", fontWeight: 700 }}>
        ❌ Incorrecto. {q.answer ? "Era VERDADERO." : "Era FALSO."}
      </div>
    ) : null;

  return (
    <div style={{ 
      width: "100%", 
      minHeight: "100vh", 
      background,
      fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      position: "relative" as const,
      overflow: "hidden" as const
    }}>
      {/* CSS Animations */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>
      
      {/* Marketing Facts Animation Overlay */}
      <MarketingFactsAnimation />
      
      {/* Drago Character - Floating and Enhanced */}
      <motion.div
        style={{
          position: "absolute" as const,
          top: "20px",
          right: "20px",
          zIndex: 10,
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          overflow: "hidden" as const,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2), 0 0 0 4px rgba(255,255,255,0.3)",
          border: "3px solid rgba(15, 98, 254, 0.3)"
        }}
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, 10, -10, 0],
          transition: { duration: 0.5 }
        }}
      >
        <img 
          src="/drago1.png" 
          alt="Drago Character" 
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover" as const,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
          }}
        />
        {/* Floating sparkles around Drago */}
        <motion.div
          style={{
            position: "absolute" as const,
            top: "-10px",
            left: "-10px",
            right: "-10px",
            bottom: "-10px",
            pointerEvents: "none" as const
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute" as const,
                width: "8px",
                height: "8px",
                background: "linear-gradient(45deg, #f093fb, #667eea)",
                borderRadius: "50%",
                top: `${20 + (i * 15)}%`,
                left: `${20 + (i * 15)}%`,
                boxShadow: "0 0 10px rgba(240, 147, 251, 0.8)"
              }}
              animate={{
                scale: [0.5, 1.2, 0.5],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      
      <SectionPageHeader 
        primaryColor={primaryColor} 
        progress={60} 
        brandName="BIZEN"
        logoSrc="/bizen-mondragonlogo.png"
      />
      <div style={{ padding: "20px", maxWidth: "100%", margin: "0" }}>
        <motion.div variants={containerVar} initial="hidden" animate="show">
          <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
            <motion.div
              style={{
                display: "flex" as const,
                alignItems: "center" as const,
                gap: 20,
                marginBottom: 10
              }}
            >
              <motion.div
                style={{
                  fontSize: fs * 2.5,
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                }}
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
              </motion.div>
              <motion.h1 
                style={{ 
                  margin: 0, 
                  fontSize: fs * 3.0, 
                  lineHeight: 1.15,
                  fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #0F62FE 0%, #667eea 50%, #f093fb 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  animation: "shimmer 3s ease-in-out infinite"
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  textShadow: [
                    "0 4px 8px rgba(0,0,0,0.1)",
                    "0 8px 16px rgba(15, 98, 254, 0.3)",
                    "0 4px 8px rgba(0,0,0,0.1)"
                  ]
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  textShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse" as const
                  }
                }}
              >
                Quiz: Verdadero o Falso
              </motion.h1>
            </motion.div>
            <motion.p 
              style={{ 
                margin: "8px 0 0", 
                opacity: 0.9, 
                fontSize: fs * 1.4,
                color: "#666"
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span style={{ 
                color: primaryColor, 
                fontWeight: 700,
                textShadow: "0 2px 4px rgba(15, 98, 254, 0.3)"
              }}>▌</span>{" "}
              ¡Pon a prueba tus conocimientos! 🚀 Cada respuesta te acerca más al dominio del marketing de influencia
            </motion.p>
          </motion.div>

          <motion.div variants={itemVar}>
            <Card glow={primaryColor} style={QUIZ_CARD_STYLE}>
              {/* Progreso */}
              <div style={{ display: "flex" as const, alignItems: "center" as const, justifyContent: "space-between" as const, marginBottom: 14 }}>
                <strong style={{ fontSize: fs * 1.55 }}>
                  Pregunta {idx + 1} / {total}
                </strong>
                <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 10 }}>
                  <div style={{ width: 220, height: 12, background: "rgba(0,0,0,0.08)", borderRadius: 999, overflow: "hidden" }}>
                    <div
                      style={{ width: `${Math.round(((idx + 1) / total) * 100)}%`, height: "100%", background: primaryColor, borderRadius: 999 }}
                    />
                  </div>
                  <span style={{ fontSize: fs * 1.1, opacity: 0.75, fontFamily: 'Montserrat' }}>
                    {Math.round(((idx + 1) / total) * 100)}%
                  </span>
                </div>
              </div>

              {/* Enunciado */}
              <p style={{ margin: "12px 0 24px", lineHeight: 1.6, fontSize: fs * 1.3 }}>{q.text}</p>

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
                  tabIndex={0}
                  whileHover={{ scale: 0.96 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  onClick={() => {
                    if (checked[idx]) return;
                    const next = [...selection];
                    next[idx] = true;
                    setSelection(next);
                    const isCorrect = true === q.answer;
                    const nextChecked = [...checked];
                    const nextCorrect = [...correct];
                    nextChecked[idx] = true;
                    nextCorrect[idx] = !!isCorrect;
                    setChecked(nextChecked);
                    setCorrect(nextCorrect);
                    const newScore = score + (isCorrect ? 1 : 0);
                    if (isCorrect) setScore((s) => s + 1);
                    
                    // Track answer submission FIRST
                    if (onAnswerSubmit) {
                      console.log(`Submitting answer ${idx}: TRUE, correct=${q.answer}, isCorrect=${isCorrect}`);
                      onAnswerSubmit(idx, q.text, true, q.answer, isCorrect);
                    }
                    
                    setTimeout(() => {
                      if (idx < total - 1) {
                        setIdx(idx + 1);
                      } else {
                        // Quiz completed - wait a bit more to ensure last answer is tracked
                        console.log("Last question answered, completing quiz with score:", newScore);
                        setTimeout(() => {
                          if (onQuizComplete) {
                            onQuizComplete(newScore);
                          }
                        }, 100);
                      }
                    }, 800);
                  }}
                  style={optStyle(selection[idx] === true)}
                >
                  VERDADERO
                </motion.div>

                <motion.div
                  role="button"
                  tabIndex={0}
                  whileHover={{ scale: 0.96 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  onClick={() => {
                    if (checked[idx]) return;
                    const next = [...selection];
                    next[idx] = false;
                    setSelection(next);
                    const isCorrect = false === q.answer;
                    const nextChecked = [...checked];
                    const nextCorrect = [...correct];
                    nextChecked[idx] = true;
                    nextCorrect[idx] = !!isCorrect;
                    setChecked(nextChecked);
                    setCorrect(nextCorrect);
                    const newScore = score + (isCorrect ? 1 : 0);
                    if (isCorrect) setScore((s) => s + 1);
                    
                    // Track answer submission FIRST
                    if (onAnswerSubmit) {
                      console.log(`Submitting answer ${idx}: FALSE, correct=${q.answer}, isCorrect=${isCorrect}`);
                      onAnswerSubmit(idx, q.text, false, q.answer, isCorrect);
                    }
                    
                    setTimeout(() => {
                      if (idx < total - 1) {
                        setIdx(idx + 1);
                      } else {
                        // Quiz completed - wait a bit more to ensure last answer is tracked
                        console.log("Last question answered, completing quiz with score:", newScore);
                        setTimeout(() => {
                          if (onQuizComplete) {
                            onQuizComplete(newScore);
                          }
                        }, 100);
                      }
                    }, 800);
                  }}
                  style={optStyle(selection[idx] === false)}
                >
                  FALSO
                </motion.div>
              </div>

              {/* Feedback */}
              <div style={{ marginBottom: 18, fontSize: fs * 1.1 }}>{feedback}</div>

              {/* Resultado final */}
              {checked.filter(Boolean).length === total ? (
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
                  <span style={{ fontWeight: 800, color: primaryColor, fontSize: fs * 1.3 }}>
                    {score} / {total}
                  </span>
                </div>
              ) : null}
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// PÁGINA 5 — Quiz Opción múltiple
function Page4(props: {
  onAnswerSubmit?: (questionIndex: number, questionText: string, userAnswer: unknown, correctAnswer: unknown, isCorrect: boolean) => void;
  onQuizComplete?: (score: number) => void;
  isAlreadyCompleted?: boolean;
  completedScore?: number;
} = {}) {
  const { onAnswerSubmit, onQuizComplete, isAlreadyCompleted, completedScore } = props;
  
  const primaryColor = "#0F62FE";
  const fs = 18;
  const background = "#FFFFFF";
  
  console.log("Page4 (M1S1P5) - hasOnAnswerSubmit:", !!onAnswerSubmit, "hasOnQuizComplete:", !!onQuizComplete, "isAlreadyCompleted:", isAlreadyCompleted, "completedScore:", completedScore);

  const QUESTIONS = [
    {
      text: "¿Qué está impulsando el auge del video corto en marketing de influencia?",
      options: ["Solo TikTok", "YouTube Shorts y Reels", "TikTok, Reels y Shorts", "TV tradicional"],
      correctIndex: 2,
    },
    {
      text: "¿Qué caracteriza mejor a los microcreadores?",
      options: [
        "Muchos seguidores pero poco engagement",
        "Engagement alto en nichos específicos",
        "Solo publican anuncios",
        "No tienen credibilidad",
      ],
      correctIndex: 1,
    },
    {
      text: "¿Qué significa VTR (view-through rate) en este contexto?",
      options: [
        "Porcentaje de clics sobre impresiones",
        "Porcentaje que ve el video completo o hasta cierto punto",
        "Cantidad total de vistas",
        "Costo por mil impresiones",
      ],
      correctIndex: 1,
    },
    {
      text: "¿Qué es el whitelisting en influencia?",
      options: [
        "Enviar productos gratis a cualquiera",
        "Licenciar el contenido y pautar desde el perfil del creador",
        "Eliminar comentarios negativos",
        "Publicar solo orgánico",
      ],
      correctIndex: 1,
    },
    {
      text: "Spark Ads/Boost se refiere a:",
      options: [
        "Comprar seguidores",
        "Amplificar con pauta un post orgánico del creador",
        "Cambiar el algoritmo",
        "Hacer lives únicamente",
      ],
      correctIndex: 1,
    },
    {
      text: "Una métrica adecuada para fase de consideración es:",
      options: ["CTR", "Impresiones", "Alcance", "CPM"],
      correctIndex: 0,
    },
    {
      text: "Un riesgo común en campañas con creadores es:",
      options: [
        "Definir KPIs por objetivo",
        "Fraude (seguidores/engagement falsos)",
        "Medir conversiones",
        "Usar disclosure",
      ],
      correctIndex: 1,
    },
    {
      text: "En 3R, 'Resonance' evalúa principalmente:",
      options: [
        "Cantidad de publicaciones",
        "Calidad y señales de engagement (comentarios útiles, guardados, compartidos)",
        "Cantidad de seguidores",
        "Costo por clic",
      ],
      correctIndex: 1,
    },
    {
      text: "En 5C, 'Cumplimiento' tiene que ver con:",
      options: [
        "Creatividad y edición de video",
        "Disclosure y normas de plataforma",
        "Costo de producción",
        "Cantidad de posts semanales",
      ],
      correctIndex: 1,
    },
    {
      text: "Tendencia actual de consumo y búsqueda en redes:",
      options: [
        "Las redes solo entretienen, no informan",
        "Las redes funcionan como buscador social de reseñas y 'cómo-hacer'",
        "Los blogs reemplazaron a las redes",
        "Solo importa la TV",
      ],
      correctIndex: 1,
    },
  ];

  const total = QUESTIONS.length;
  const [idx, setIdx] = React.useState(0);
  const [selection, setSelection] = React.useState<(number | null)[]>(Array(total).fill(null));
  const [checked, setChecked] = React.useState<boolean[]>(Array(total).fill(false));
  const [correct, setCorrect] = React.useState<boolean[]>(Array(total).fill(false));
  const [score, setScore] = React.useState(0);

  const q = QUESTIONS[idx];
  
  // Show "Already Completed" screen if quiz was already taken
  if (isAlreadyCompleted) {
    // Debug logging
    console.log('🎯 Page4 (M1S1P5) Already Completed - completedScore:', completedScore, 'total:', total, 'typeof completedScore:', typeof completedScore);
    
    return (
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        background: '#FFFFFF',
      }}>
        <div style={{
          maxWidth: 600,
          width: '100%',
          background: 'white',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: 20,
          padding: 40,
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16, color: primaryColor }}>
            Quiz Ya Completado
          </h2>
          <p style={{ fontSize: 18, color: '#666', marginBottom: 24 }}>
            Ya completaste este quiz. Los quizzes solo pueden realizarse una vez.
          </p>
          <div style={{
            padding: 20,
            background: `${primaryColor}15`,
            borderRadius: 14,
            marginBottom: 24,
          }}>
            <strong style={{ fontSize: 28, color: primaryColor }}>
              Tu puntuación: {completedScore !== undefined && completedScore !== null ? completedScore : '?'} / {total}
            </strong>
          </div>
          <p style={{ fontSize: 16, color: '#999' }}>
            ✨ Continúa con el siguiente contenido
          </p>
        </div>
      </div>
    );
  }

  const optStyle = (active: boolean, disabled: boolean): React.CSSProperties => ({
    padding: "28px 32px",
    borderRadius: 20,
    border: `3px solid ${active ? "transparent" : "rgba(15, 98, 254, 0.15)"}`,
    background: active 
      ? "linear-gradient(135deg, #0F62FE 0%, #3B82F6 50%, #60A5FA 100%)"
      : "linear-gradient(135deg, #FFFFFF 0%, #F8FAFF 100%)",
    fontWeight: 700,
    fontSize: fs * 1.3,
    textAlign: "left",
    cursor: disabled ? "default" : "pointer",
    userSelect: "none",
    display: "flex" as const,
    alignItems: "center" as const,
    gap: 16,
    transformOrigin: "center",
    boxShadow: active 
      ? "0 15px 35px rgba(15, 98, 254, 0.4), 0 5px 15px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)" 
      : "0 8px 25px rgba(0,0,0,0.08), 0 3px 10px rgba(15, 98, 254, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
    backdropFilter: "blur(15px)",
    color: active ? "white" : "#2d3748",
    textShadow: active ? "0 2px 4px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.1)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative" as const,
    overflow: "hidden" as const,
  });

  const bulletStyle = (active: boolean): React.CSSProperties => ({
    width: 28,
    height: 28,
    borderRadius: 999,
    border: `3px solid ${active ? "rgba(255,255,255,0.9)" : "rgba(15, 98, 254, 0.3)"}`,
    background: active 
      ? "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)"
      : "linear-gradient(135deg, #FFFFFF 0%, #F8FAFF 100%)",
    flexShrink: 0,
    boxShadow: active 
      ? "0 6px 20px rgba(255,255,255,0.4), inset 0 2px 4px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.3)" 
      : "0 4px 15px rgba(15, 98, 254, 0.2), inset 0 1px 2px rgba(255,255,255,0.8)",
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    fontSize: "14px",
    fontWeight: 900,
    color: active ? "#FFFFFF" : "#0F62FE",
    textShadow: active ? "0 1px 2px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.1)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  });

  const feedback =
    checked[idx] && correct[idx] ? (
      <motion.div 
        style={{ 
          color: "#0a7f35", 
          fontWeight: 700,
          fontSize: fs * 1.3,
          display: "flex" as const,
          alignItems: "center" as const,
          gap: 15,
          justifyContent: "center" as const,
          padding: "20px 24px",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)",
          borderRadius: 16,
          border: "2px solid rgba(16, 185, 129, 0.2)",
          boxShadow: "0 8px 25px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255,255,255,0.5)"
        }}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.span
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 0.6,
            repeat: 2,
            ease: "easeInOut"
          }}
          style={{ fontSize: fs * 1.5 }}
        >
          ✅
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          ¡Excelente! 🎉 ¡Sigue así!
        </motion.span>
      </motion.div>
    ) : checked[idx] && !correct[idx] ? (
      <motion.div 
        style={{ 
          color: "#dc2626", 
          fontWeight: 700,
          fontSize: fs * 1.2,
          display: "flex" as const,
          alignItems: "center" as const,
          gap: 15,
          justifyContent: "center" as const,
          flexDirection: "column" as const,
          padding: "20px 24px",
          background: "linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(185, 28, 28, 0.05) 100%)",
          borderRadius: 16,
          border: "2px solid rgba(220, 38, 38, 0.2)",
          boxShadow: "0 8px 25px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255,255,255,0.5)"
        }}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <motion.span
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 0.5,
              repeat: 2,
              ease: "easeInOut"
            }}
            style={{ fontSize: fs * 1.4 }}
          >
            ❌
          </motion.span>
          <span>¡Ups! No te preocupes, ¡sigue aprendiendo!</span>
        </motion.div>
        <motion.span 
          style={{ 
            fontSize: fs * 0.95,
            color: "#666",
            marginTop: 8,
            padding: "8px 16px",
            background: "rgba(255,255,255,0.7)",
            borderRadius: 12,
            border: "1px solid rgba(220, 38, 38, 0.1)"
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <strong>Respuesta correcta:</strong> {q.options[q.correctIndex]}
        </motion.span>
      </motion.div>
    ) : null;

  return (
    <div style={{ 
      width: "100%", 
      minHeight: "100vh", 
      background: "#FFFFFF",
      fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      position: "relative" as const,
      overflow: "hidden" as const
    }}>
      {/* CSS Animations */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
          50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.6), 0 0 40px rgba(118, 75, 162, 0.4); }
        }
      `}</style>
      {/* Animated background elements */}
      <div style={{
        position: "absolute" as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "transparent",
        animation: "float 20s ease-in-out infinite"
      }} />
      
      {/* Marketing Facts Animation Overlay */}
      <MarketingFactsAnimation />
      
      {/* Drago Character - Floating and Enhanced */}
      <motion.div
        style={{
          position: "absolute" as const,
          top: "20px",
          right: "20px",
          zIndex: 10,
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          overflow: "hidden" as const,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2), 0 0 0 4px rgba(255,255,255,0.3)",
          border: "3px solid rgba(102, 126, 234, 0.3)"
        }}
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, 10, -10, 0],
          transition: { duration: 0.5 }
        }}
      >
        <img 
          src="/drago1.png" 
          alt="Drago Character" 
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover" as const,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
          }}
        />
        {/* Floating sparkles around Drago */}
        <motion.div
          style={{
            position: "absolute" as const,
            top: "-10px",
            left: "-10px",
            right: "-10px",
            bottom: "-10px",
            pointerEvents: "none" as const
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute" as const,
                width: "8px",
                height: "8px",
                background: "linear-gradient(45deg, #f093fb, #667eea)",
                borderRadius: "50%",
                top: `${20 + (i * 15)}%`,
                left: `${20 + (i * 15)}%`,
                boxShadow: "0 0 10px rgba(240, 147, 251, 0.8)"
              }}
              animate={{
                scale: [0.5, 1.2, 0.5],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      
      <SectionPageHeader 
        primaryColor={primaryColor} 
        progress={80} 
        brandName="BIZEN"
        logoSrc="/bizen-mondragonlogo.png"
      />
      <div style={{ padding: "20px", maxWidth: "100%", margin: "0", position: "relative" as const, zIndex: 1 }}>
        <motion.div variants={containerVar} initial="hidden" animate="show">
          <motion.div variants={itemVar} style={{ marginBottom: 18 }}>
            <motion.div
              style={{
                display: "flex" as const,
                alignItems: "center" as const,
                gap: 20,
                marginBottom: 10
              }}
            >
              <motion.div
                style={{
                  fontSize: fs * 2.5,
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                }}
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
              </motion.div>
              <motion.h1 
                style={{ 
                  margin: 0, 
                  fontSize: fs * 3.0, 
                  lineHeight: 1.15,
                  fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #0F62FE 0%, #3B82F6 50%, #60A5FA 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  animation: "shimmer 3s ease-in-out infinite"
                }}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ 
                  scale: [1, 1.05, 1], 
                  opacity: 1, 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0],
                  textShadow: [
                    "0 4px 8px rgba(0,0,0,0.1)",
                    "0 8px 16px rgba(15, 98, 254, 0.3)",
                    "0 4px 8px rgba(0,0,0,0.1)"
                  ]
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  textShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse" as const
                  }
                }}
              >
                Quiz: Opción Múltiple – Panorama del marketing de influencia
              </motion.h1>
            </motion.div>
            <motion.p 
              style={{ 
                margin: "8px 0 0", 
                opacity: 0.9, 
                fontSize: fs * 1.4,
                color: "rgba(255,255,255,0.9)",
                textShadow: "0 2px 4px rgba(0,0,0,0.2)"
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span style={{ 
                color: "#0F62FE", 
                fontWeight: 700,
                textShadow: "0 2px 4px rgba(15, 98, 254, 0.3)"
              }}>▌</span>{" "}
              <span style={{ color: "#0F62FE" }}>¡Pon a prueba tus conocimientos! 🚀 Cada respuesta te acerca más al dominio del marketing de influencia</span>
            </motion.p>
          </motion.div>

          <motion.div variants={itemVar}>
            <motion.div
              style={{
                position: "relative" as const,
                borderRadius: 20,
                padding: 32,
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                overflow: "hidden" as const,
                maxWidth: "100%",
                margin: "0",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Animated glow effect */}
              <div style={{
                position: "absolute" as const,
                inset: -2,
                background: "#FFFFFF",
                borderRadius: 22,
                zIndex: -1,
                animation: "shimmer 3s ease-in-out infinite"
              }} />
              
              {/* Motivational header */}
              <motion.div
                style={{
                  display: "flex" as const,
                  alignItems: "center" as const,
                  justifyContent: "center" as const,
                  gap: 15,
                  marginBottom: 20,
                  padding: "15px 20px",
                  background: "#FFFFFF",
                  borderRadius: 15,
                  border: "2px solid transparent"
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.span
                  style={{ fontSize: fs * 1.8 }}
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎯
                </motion.span>
                <motion.span
                  style={{
                    fontSize: fs * 1.1,
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #0F62FE 0%, #3B82F6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  ¡Demuestra tu conocimiento! Cada respuesta cuenta
                </motion.span>
                <motion.span
                  style={{ fontSize: fs * 1.8 }}
                  animate={{ 
                    rotate: [0, -15, 15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  💪
                </motion.span>
              </motion.div>
              
              {/* Progreso del quiz */}
              <motion.div
                style={{
                  display: "flex" as const,
                  alignItems: "center" as const,
                  justifyContent: "space-between" as const,
                  marginBottom: 20,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.strong 
                  style={{ 
                    fontSize: fs * 1.55,
                    background: "linear-gradient(135deg, #0F62FE 0%, #3B82F6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 800
                  }}
                  animate={{ 
                    textShadow: [
                      "0 2px 4px rgba(102, 126, 234, 0.3)",
                      "0 4px 8px rgba(118, 75, 162, 0.4)",
                      "0 2px 4px rgba(102, 126, 234, 0.3)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse" as const
                  }}
                >
                  Pregunta {idx + 1} / {total}
                </motion.strong>
                <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 12 }}>
                  <motion.div
                    style={{
                      width: 240,
                      height: 16,
                      background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                      borderRadius: 999,
                      overflow: "hidden" as const,
                      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <motion.div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "#FFFFFF",
                        backgroundSize: "200% 200%",
                        borderRadius: 999,
                        boxShadow: "none",
                      }}
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: `${Math.round(((idx + 1) / total) * 100)}%`,
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                      }}
                      transition={{ 
                        width: { duration: 0.5, ease: "easeOut" },
                        backgroundPosition: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    />
                  </motion.div>
                  <motion.span 
                    style={{ 
                      fontSize: fs * 1.1, 
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #0F62FE 0%, #3B82F6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {Math.round(((idx + 1) / total) * 100)}%
                  </motion.span>
                </div>
              </motion.div>

              {/* Enunciado */}
              <motion.p 
                style={{ 
                  margin: "20px 0 28px", 
                  lineHeight: 1.6, 
                  fontSize: fs * 1.3,
                  fontWeight: 600,
                  color: "#2d3748",
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)"
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {q.text}
              </motion.p>

              {/* Opciones */}
              <motion.div
                style={{
                  display: "grid" as const,
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: 20,
                  marginBottom: 24,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {q.options.map((opt, i) => {
                  const active = selection[idx] === i;
                  const disabled = !!checked[idx];
                  const letter = String.fromCharCode(65 + i);
                  return (
                    <motion.div
                      key={i}
                      role="button"
                      onClick={() => {
                        if (disabled) return;
                        const next = [...selection];
                        next[idx] = i;
                        setSelection(next);
                        const isCorrect = i === q.correctIndex;
                        const nextChecked = [...checked];
                        const nextCorrect = [...correct];
                        nextChecked[idx] = true;
                        nextCorrect[idx] = !!isCorrect;
                        setChecked(nextChecked);
                        setCorrect(nextCorrect);
                        const newScore = score + (isCorrect ? 1 : 0);
                        if (isCorrect) setScore((s) => s + 1);
                        
                        // Track answer submission FIRST
                        if (onAnswerSubmit) {
                          console.log(`Submitting answer ${idx}: option ${i}, correct=${q.correctIndex}, isCorrect=${isCorrect}`);
                          onAnswerSubmit(idx, q.text, q.options[i], q.options[q.correctIndex], isCorrect);
                        }
                        
                        setTimeout(() => {
                          if (idx < total - 1) {
                            setIdx(idx + 1);
                          } else {
                            // Quiz completed - wait a bit more to ensure last answer is tracked
                            console.log("Last question answered, completing quiz with score:", newScore);
                            setTimeout(() => {
                              if (onQuizComplete) {
                                onQuizComplete(newScore);
                              }
                            }, 100);
                          }
                        }, 800);
                      }}
                      style={optStyle(active, disabled)}
                      initial={{ opacity: 0, y: 30, scale: 0.8, rotateX: -15 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        rotateX: 0,
                        boxShadow: active 
                          ? "0 20px 40px rgba(15, 98, 254, 0.4), 0 8px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)" 
                          : "0 10px 30px rgba(0,0,0,0.08), 0 4px 15px rgba(15, 98, 254, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)"
                      }}
                      whileHover={disabled ? undefined : { 
                        scale: 1.03, 
                        y: -4,
                        rotateX: 2,
                        boxShadow: "0 15px 35px rgba(15, 98, 254, 0.25), 0 6px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)"
                      }}
                      whileTap={disabled ? undefined : { 
                        scale: 0.97,
                        y: 0,
                        rotateX: 0
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 30,
                        delay: i * 0.08,
                        duration: 0.6
                      }}
                    >
                      <motion.span 
                        style={bulletStyle(active)}
                        animate={active ? { 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                          boxShadow: [
                            "0 6px 20px rgba(255,255,255,0.4), inset 0 2px 4px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.3)",
                            "0 8px 25px rgba(255,255,255,0.6), inset 0 2px 4px rgba(0,0,0,0.1), 0 0 0 2px rgba(255,255,255,0.5)",
                            "0 6px 20px rgba(255,255,255,0.4), inset 0 2px 4px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.3)"
                          ]
                        } : {
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            "0 4px 15px rgba(15, 98, 254, 0.2), inset 0 1px 2px rgba(255,255,255,0.8)",
                            "0 6px 20px rgba(15, 98, 254, 0.3), inset 0 1px 2px rgba(255,255,255,0.9)",
                            "0 4px 15px rgba(15, 98, 254, 0.2), inset 0 1px 2px rgba(255,255,255,0.8)"
                          ]
                        }}
                        transition={{ 
                          duration: 0.8,
                          repeat: Infinity,
                          repeatDelay: 1.5,
                          ease: "easeInOut"
                        }}
                      >
                        {letter}
                      </motion.span>
                      <motion.span
                        animate={active ? { 
                          x: [0, 3, 0],
                          textShadow: [
                            "0 2px 4px rgba(0,0,0,0.3)",
                            "0 3px 6px rgba(0,0,0,0.4)",
                            "0 2px 4px rgba(0,0,0,0.3)"
                          ]
                        } : {
                          textShadow: [
                            "0 1px 2px rgba(0,0,0,0.1)",
                            "0 2px 4px rgba(0,0,0,0.15)",
                            "0 1px 2px rgba(0,0,0,0.1)"
                          ]
                        }}
                        transition={{ 
                          duration: 0.6,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: "easeInOut"
                        }}
                        style={{
                          flex: 1,
                          lineHeight: 1.4
                        }}
                      >
                        {opt}
                      </motion.span>
                      
                      {/* Add a subtle glow effect for active options */}
                      {active && (
                        <motion.div
                          style={{
                            position: "absolute" as const,
                            inset: 0,
                            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
                            borderRadius: 20,
                            pointerEvents: "none" as const
                          }}
                          animate={{
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Feedback */}
              <div 
                style={{ 
                  minHeight: 50, 
                  marginBottom: 20, 
                  fontSize: fs * 1.1,
                  fontWeight: 700,
                  display: "flex" as const,
                  alignItems: "center" as const,
                  justifyContent: "flex-start" as const
                }}
              >
                {feedback}
              </div>

              {/* Resultado final */}
              {checked.filter(Boolean).length === total ? (
                <motion.div
                  style={{
                    marginTop: 24,
                    padding: 32,
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)",
                    border: "3px solid rgba(102, 126, 234, 0.4)",
                    borderRadius: 20,
                    backdropFilter: "blur(15px)",
                    boxShadow: "0 15px 35px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                    display: "flex" as const,
                    alignItems: "center" as const,
                    justifyContent: "space-between" as const,
                    position: "relative" as const,
                    overflow: "hidden" as const
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25,
                    delay: 0.5
                  }}
                >
                  {/* Celebration confetti */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      style={{
                        position: "absolute" as const,
                        width: "6px",
                        height: "6px",
                        background: ["#0F62FE", "#3B82F6", "#60A5FA"][i % 3],
                        borderRadius: "50%",
                        top: `${20 + (i * 10)}%`,
                        left: `${10 + (i * 12)}%`,
                        boxShadow: "0 0 8px rgba(15, 98, 254, 0.6)"
                      }}
                      animate={{
                        y: [-20, -40, -60],
                        opacity: [1, 0.8, 0],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                  
                  <motion.div
                    style={{
                      display: "flex" as const,
                      alignItems: "center" as const,
                      gap: 15
                    }}
                  >
                    <motion.span
                      style={{ fontSize: fs * 2.2 }}
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      🎉
                    </motion.span>
                    <motion.strong 
                      style={{ 
                        fontSize: fs * 1.4,
                        background: "linear-gradient(135deg, #0F62FE 0%, #3B82F6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontWeight: 800
                      }}
                      animate={{ 
                        textShadow: [
                          "0 2px 4px rgba(102, 126, 234, 0.3)",
                          "0 4px 8px rgba(118, 75, 162, 0.4)",
                          "0 2px 4px rgba(102, 126, 234, 0.3)"
                        ]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse" as const
                      }}
                    >
                      ¡Resultado Final!
                    </motion.strong>
                  </motion.div>
                  
                  <motion.div
                    style={{
                      display: "flex" as const,
                      alignItems: "center" as const,
                      gap: 10
                    }}
                  >
                    <motion.span 
                      style={{ 
                        fontWeight: 800, 
                        fontSize: fs * 1.8,
                        background: "linear-gradient(135deg, #0F62FE 0%, #3B82F6 50%, #60A5FA 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textShadow: "0 4px 8px rgba(15, 98, 254, 0.3)"
                      }}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        textShadow: [
                          "0 4px 8px rgba(15, 98, 254, 0.3)",
                          "0 8px 16px rgba(15, 98, 254, 0.5)",
                          "0 4px 8px rgba(15, 98, 254, 0.3)"
                        ]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse" as const
                      }}
                    >
                      {score} / {total}
                    </motion.span>
                    <motion.span
                      style={{ fontSize: fs * 1.5 }}
                      animate={{ 
                        rotate: [0, 20, -20, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {score === total ? "🏆" : score >= total * 0.7 ? "🥈" : "🥉"}
                    </motion.span>
                  </motion.div>
                </motion.div>
              ) : null}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// PÁGINA 6 — Flashcards (actividad práctica) - Navigation to sections menu
function Page5() {
  const primaryColor = "#0F62FE";
  const background = "#FFFFFF";
  const fs = 18;

  // Add shimmer keyframes
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-12px) rotate(1deg); }
        66% { transform: translateY(6px) rotate(-1deg); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const DEFAULT_INSTRUCTIONS: string[] = [
    "Define el objetivo principal (Awareness, Consideración o Conversión) y su métrica líder.",
    "Elige 3 creadores y evalúa 3R: Reach, Relevance, Resonance con evidencia.",
    "Completa 5C: Comunidad, Credibilidad, Contenido, Coherencia, Cumplimiento.",
    "Redacta un briefing de 6 puntos: mensaje, CTA, formatos, tono, deadlines, restricciones.",
    "Propón 2 ideas por objetivo alineadas al briefing.",
    "Define disclosure y lineamientos por plataforma (#Ad, etiquetado, licencias).",
    "Planifica amplificación (Spark Ads/Boost), audiencias, presupuesto y duración.",
    "Arma tu plan de medición con KPIs por objetivo y mini dashboard.",
    "Estima presupuesto (fees, producción, pauta) y metas (CPA/CAC).",
    "Plan post-campaña: UGC a reutilizar, reseñas y mediciones de lift.",
  ];

  return (
    <div style={{ 
      width: "100%", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f7ff 100%)",
      fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
      position: "relative" as const,
      overflow: "hidden" as const
    }}>
      <SectionPageHeader 
        primaryColor={primaryColor} 
        progress={100} 
        brandName="BIZEN"
        logoSrc="/bizen-mondragonlogo.png"
      />
      <div style={{ padding: "20px", maxWidth: "100%", margin: "0" }}>
        <motion.div variants={containerVar} initial="hidden" animate="show">
          <motion.div variants={itemVar} style={{ marginBottom: 14 }}>
            <motion.h1 
              style={{ 
                margin: 0, 
                fontSize: fs * 3.0, 
                lineHeight: 1.15,
                fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
                fontWeight: 800,
                background: `linear-gradient(135deg, ${primaryColor}, #3B82F6, #60A5FA, #93C5FD)`,
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 4px 12px rgba(15, 98, 254, 0.3)",
                position: "relative" as const,
                overflow: "hidden" as const,
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -8, 0],
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                scale: {
                  duration: 0.6,
                  ease: "easeOut"
                },
                opacity: {
                  duration: 0.6,
                  ease: "easeOut"
                },
                backgroundPosition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <motion.span
                style={{
                  position: "absolute" as const,
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                  animation: "shimmer 2s infinite"
                }}
                animate={{
                  left: ["100%", "100%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              Actividad práctica
            </motion.h1>
            <motion.p 
              style={{ margin: "8px 0 0", opacity: 0.9, fontSize: fs * 1.4 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.9, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span style={{ 
                color: primaryColor, 
                fontWeight: 700,
                textShadow: "0 2px 4px rgba(15, 98, 254, 0.3)"
              }}>▌</span>{" "}
              <motion.span
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Aplica lo aprendido con actividades interactivas
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Aviso motivacional */}
          <motion.div 
            variants={itemVar} 
            style={{ marginBottom: 18 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card glow={primaryColor} style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
              border: `2px solid ${primaryColor}30`,
              boxShadow: "0 20px 40px rgba(15, 98, 254, 0.15), 0 8px 16px rgba(0,0,0,0.05)"
            }}>
              <div style={{ 
                display: "flex" as const, 
                alignItems: "center" as const, 
                gap: 12,
                fontWeight: 800,
                fontSize: fs * 1.1
              }}>
                <motion.div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 4px 12px ${primaryColor}30`
                  }}
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span style={{ color: "white", fontSize: "20px" }}>🎉</span>
                </motion.div>
                <motion.div
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ¡Ya casi terminas esta sección!
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Flashcards */}
          <motion.div 
            variants={itemVar} 
            style={{ marginBottom: 24 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card glow={primaryColor} style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)",
              border: `2px solid ${primaryColor}20`,
              boxShadow: "0 20px 40px rgba(15, 98, 254, 0.1), 0 8px 16px rgba(0,0,0,0.05)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
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
                  <span style={{ color: "white", fontSize: "18px" }}>🎯</span>
                </div>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: fs * 1.4,
                  background: `linear-gradient(135deg, ${primaryColor}, #3B82F6)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>
                  Pasos de la Actividad Práctica
                </h3>
              </div>
              <p style={{ margin: "0 0 20px 0", opacity: 0.7, fontSize: fs * 0.95, fontStyle: "italic" }}>
                📱 Toca cada tarjeta para ver la instrucción completa
              </p>

              <GridFlashcards gap={16} columns={2}>
                {DEFAULT_INSTRUCTIONS.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                  >
                    <Flashcard 
                      front={`Paso ${i + 1}`} 
                      back={t} 
                      primaryColor={primaryColor} 
                      fontSize={fs}
                      icon={["🎯", "🔍", "✅", "📝", "💡", "📋", "📊", "📈", "💰", "🎉"][i]}
                    />
                  </motion.div>
                ))}
              </GridFlashcards>
            </Card>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

// ==========================================
// Mapa de contenido por número de página
// Exportado para usar en el router dinámico
// ==========================================
const M1S1_CONTENT: Record<number, React.ReactNode> = {
  1: <WelcomePage />,
  2: <Page1 />,
  3: <Page2 />,
  4: <Page3 />,
  5: <Page4 />,
  6: <Page5 />,
};

export default M1S1_CONTENT;

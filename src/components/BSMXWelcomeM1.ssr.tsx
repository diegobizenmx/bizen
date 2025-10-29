// src/components/BSMXWelcomeM1.ssr.tsx
import * as React from "react"
import Link from "next/link"
import Image from "next/image"

type LayoutOption = "A" | "B"

export type BSMXWelcomeSSRProps = {
  brandName?: string
  logoSrc?: string            // /public/bsmx-logo.png o URL absoluta (ver nota)
  primaryColor?: string
  background?: string
  title?: string
  moduleLabel?: string
  syllabus?: string[]
  heroImage?: string          // /public/hero.jpg o URL absoluta (ver nota)
  layoutOption?: LayoutOption
  baseFontSize?: number
  progressPercent?: number

  // Video archivo/URL directa (mp4/webm/ogg)
  videoFile?: string
  videoUrl?: string
  videoPoster?: string
  videoAutoplay?: boolean
  videoControls?: boolean
  videoLoop?: boolean
  videoMuted?: boolean

  // YouTube
  youtubeUrl?: string

  // Botonera
  navOpenInNewTab?: boolean
  homeBtnLabel?: string
  homeBtnUrl?: string
  homeBtnBg?: string
  homeBtnText?: string
  backBtnLabel?: string
  backBtnUrl?: string
  backBtnBg?: string
  backBtnText?: string
  nextBtnLabel?: string
  nextBtnUrl?: string
  nextBtnBg?: string
  nextBtnText?: string
}

const MAX_WIDTH = 1200

function Card({
  children,
  glow,
  borderColor = "rgba(0,0,0,0.08)",
  baseStyle,
}: {
  children: React.ReactNode
  glow?: string
  borderColor?: string
  baseStyle?: React.CSSProperties
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
        ...baseStyle,
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
  )
}

function LinkBtn({
  label,
  href,
  bg,
  fg,
  newTab,
}: {
  label: string
  href?: string
  bg: string
  fg: string
  newTab?: boolean
}) {
  const clean = (href || "").trim()
  const isInternal = clean.startsWith("/")
  const isAbs = /^https?:\/\//i.test(clean)
  const finalHref = !clean ? "#" : isInternal ? clean : isAbs ? clean : `https://${clean}`

  const baseStyle: React.CSSProperties = {
    display: "inline-flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 10,
    textDecoration: "none",
    padding: "12px 16px",
    borderRadius: 12,
    background: bg,
    color: fg,
    border: "1px solid rgba(0,0,0,0.12)",
    fontWeight: 800,
    minWidth: 170,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  }

  if (isInternal) {
    return (
      <Link href={finalHref} style={baseStyle}>
        {label}
      </Link>
    )
  }
  return (
    <a href={finalHref} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} style={baseStyle}>
      {label}
    </a>
  )
}

/** YouTube ID helper */
function getYouTubeId(url?: string): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v")
      if (v) return v
      const parts = u.pathname.split("/")
      const idx = parts.findIndex((p) => p === "embed")
      if (idx >= 0 && parts[idx + 1]) return parts[idx + 1]
    }
    if (u.hostname === "youtu.be") return u.pathname.replace("/", "")
  } catch {}
  const m = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&/]+)/)
  return m ? m[1] : null
}

/** Logo con next/image; si no hay archivo, muestra un SVG placeholder */
function BrandLogo({ src, alt, color }: { src?: string; alt: string; color: string }) {
  if (src) {
    // Usamos width/height fijos para evitar CLS; ajusta si necesitas otra proporción
    return (
      <Image
        src={src}
        alt={alt}
        width={100}
        height={30}
        priority
        // Si usas dominio externo sin configurarlo, descomenta la línea de abajo:
        // unoptimized
        style={{ height: "30px", width: "auto" }}
      />
    )
  }
  // Placeholder SVG
  return (
    <svg width="44" height="44" viewBox="0 0 128 128" aria-label={alt} role="img">
      <rect width="128" height="128" rx="24" fill={color} />
      <circle cx="64" cy="70" r="30" fill="#fff" opacity="0.15" />
      <circle cx="50" cy="64" r="8" fill="#fff" />
      <circle cx="78" cy="64" r="8" fill="#fff" />
      <path d="M32 40c8-10 18-16 32-16s24 6 32 16" stroke="#fff" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M56 86c4 4 12 4 16 0" stroke="#fff" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M28 24c0 10 6 12 10 12M100 24c0 10-6 12-10 12" stroke="#fff" strokeWidth="8" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function BSMXWelcomeM1(props: BSMXWelcomeSSRProps) {
  const {
    brandName = "BIZEN",
    logoSrc = "/bizen-mondragonlogo.png",
    primaryColor = "#0F62FE",
    background = "linear-gradient(180deg, #FFFFFF, #F0F6FF)",
    title = "Bienvenidos a la microcredencial Brand Builders",
    moduleLabel = "Módulo 1",
    syllabus = [
      "Panorama actual del marketing de influencia.",
      "Tipos de influencers y microinfluencers.",
      "Tendencias en plataformas (Instagram, TikTok, YouTube, Twitch).",
    ],
    heroImage = "",

    layoutOption = "A",
    baseFontSize = 18,
    progressPercent = 0,

    videoFile = "",
    videoUrl = "",
    videoPoster = "",
    videoAutoplay = false,
    videoControls = true,
    videoLoop = false,
    videoMuted = true,

    youtubeUrl = "",

    navOpenInNewTab = false,
    homeBtnLabel = "🏠 Página principal",
    homeBtnUrl = "/",
    homeBtnBg = "#ffffff",
    homeBtnText = "#0f172a",
    backBtnLabel = "← Regresar",
    backBtnUrl = "",
    backBtnBg = "#ffffff",
    backBtnText = "#0f172a",
    nextBtnLabel = "Continuar →",
    nextBtnUrl = "",
    nextBtnBg = "#0F62FE",
    nextBtnText = "#ffffff",
  } = props

  const fs = Math.max(12, baseFontSize || 18)
  const isA = layoutOption === "A"
  const pct = Math.max(0, Math.min(100, Math.round(progressPercent || 0)))

  const wrapper: React.CSSProperties = {
    width: "100%",
    minHeight: "100vh",
    display: "flex" as const,
    justifyContent: isA ? "flex-start" : "center",
    background,
    color: "#111",
    fontFamily:
      "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
    fontSize: fs,
  }

  const container: React.CSSProperties = {
    width: "100%",
    maxWidth: isA ? "none" : MAX_WIDTH,
    padding: "20px",
    boxSizing: "border-box" as const,
  }

  const effectiveVideoSrc = (videoFile && videoFile.trim()) || (videoUrl && videoUrl.trim()) || ""
  const ytId = getYouTubeId(youtubeUrl)

  return (
    <div style={wrapper}>
      <main style={{ width: "100%" }}>
        {/* Header */}
        <header style={{ ...container, paddingTop: 16, paddingBottom: 16 }}>
          <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 12 }}>
            <strong style={{ letterSpacing: 0.2 }}>{brandName}</strong>
            {logoSrc && (
              <div style={{ height: "70px", width: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={logoSrc}
                  alt={`${brandName} logo`}
                  style={{ maxHeight: "60px", maxWidth: "150px", width: "auto", height: "auto", objectFit: "contain" }}
                />
              </div>
            )}
          </div>
        </header>

        {/* Progreso */}
        <div style={{ ...container, paddingTop: 0 }}>
          <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 12, marginBottom: 14 }}>
            <span
              style={{
                display: "inline-flex" as const,
                alignItems: "center" as const,
                justifyContent: "center" as const,
                gap: 8,
                padding: "6px 10px",
                borderRadius: 999,
                background: `${primaryColor}14`,
                color: primaryColor,
                fontWeight: 800,
                minWidth: 52,
              }}
              aria-label="porcentaje de avance"
            >
              {pct}%
            </span>
            <div aria-hidden style={{ flex: 1, height: 10, background: "rgba(0,0,0,0.08)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: primaryColor, borderRadius: 999 }} />
            </div>
          </div>
        </div>

        {/* Contenido */}
        <section>
          <div style={{ ...container }}>
            <div style={{ marginBottom: 12 }}>
              <h1 style={{ margin: 0, fontSize: fs * 2.2, lineHeight: 1.15 }}>{title}</h1>
              <p style={{ margin: "6px 0 0", opacity: 0.9, fontSize: fs * 1.15 }}>
                <span style={{ color: primaryColor, fontWeight: 700 }}>▌</span> {moduleLabel}
              </p>
            </div>

            {heroImage ? (
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden" as const,
                  boxShadow: "0 18px 60px rgba(0,0,0,0.12)",
                  marginTop: 14,
                  marginBottom: 16,
                }}
              >
                {/* Hero responsivo con next/image */}
                <Image
                  src={heroImage}
                  alt="Bienvenida"
                  width={1920}
                  height={1080}
                  priority
                  sizes="100vw"
                  style={{ width: "100%", height: "auto", display: "block" }}
                  // Si es dominio externo no configurado, descomenta:
                  // unoptimized
                />
              </div>
            ) : null}

            {/* Video / YouTube */}
            <div style={{ marginBottom: 16 }}>
              <Card glow={primaryColor}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: fs * 1.25 }}>Video de bienvenida</h3>

                {ytId ? (
                  <div
                    style={{
                      position: "relative" as const,
                      width: "100%",
                      paddingBottom: "56.25%",
                      borderRadius: 14,
                      overflow: "hidden" as const,
                      boxShadow: "0 14px 40px rgba(0,0,0,0.12)",
                    }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}`}
                      title="YouTube video"
                      style={{ position: "absolute" as const, inset: 0, width: "100%", height: "100%", border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : effectiveVideoSrc ? (
                  <div style={{ borderRadius: 14, overflow: "hidden" as const, boxShadow: "0 14px 40px rgba(0,0,0,0.12)" }}>
                    <video
                      src={effectiveVideoSrc}
                      poster={videoPoster}
                      autoPlay={videoAutoplay}
                      controls={videoControls}
                      loop={videoLoop}
                      muted={videoMuted}
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
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
                    Proporciona <strong>youtubeUrl</strong> o un <strong>archivo/URL de video</strong>.
                  </div>
                )}
              </Card>
            </div>

            {/* Temario */}
            <Card glow={primaryColor}>
              <div style={{ display: "flex" as const, alignItems: "center" as const, gap: 10, marginBottom: 10 }}>
                <div aria-hidden style={{ width: 18, height: 18, borderRadius: 6, background: primaryColor }} />
                <h3 style={{ margin: 0, fontSize: fs * 1.25 }}>Temario</h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95, fontSize: fs }}>
                {syllabus.map((s, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    {s}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Botonera */}
            <div style={{ marginTop: 22, display: "flex" as const, justifyContent: "center" }}>
              <div style={{ display: "flex" as const, gap: 12, flexWrap: "wrap", justifyContent: "center" as const, maxWidth: 900 }}>
                <LinkBtn label={homeBtnLabel} href={homeBtnUrl} bg={homeBtnBg || "#ffffff"} fg={homeBtnText || "#0f172a"} newTab={navOpenInNewTab} />
                <LinkBtn label={backBtnLabel} href={backBtnUrl} bg={backBtnBg || "#ffffff"} fg={backBtnText || "#0f172a"} newTab={navOpenInNewTab} />
                <LinkBtn label={nextBtnLabel} href={nextBtnUrl} bg={nextBtnBg || primaryColor} fg={nextBtnText || "#ffffff"} newTab={navOpenInNewTab} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

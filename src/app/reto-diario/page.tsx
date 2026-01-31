"use client"

/**
 * Reto diario — placeholder page.
 * Daily challenge feature; content to be added.
 */

import { useEffect } from "react"

export default function RetoDiarioPage() {
  useEffect(() => {
    const bodyEl = document.body
    if (bodyEl) {
      bodyEl.style.background = "#ffffff"
    }
    return () => {
      bodyEl.style.background = ""
    }
  }, [])

  return (
    <div
      style={{
        padding: "clamp(24px, 5vw, 48px) clamp(16px, 4vw, 24px)",
        maxWidth: "720px",
        margin: "0 auto",
        fontFamily: "'Inter', 'Poppins', sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(28px, 4vw, 36px)",
          fontWeight: 800,
          color: "#111",
          margin: "0 0 16px",
        }}
      >
        Reto diario
      </h1>
      <p
        style={{
          fontSize: "clamp(16px, 1rem, 18px)",
          color: "#64748b",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Aquí podrás encontrar tu reto del día. Próximamente.
      </p>
    </div>
  )
}

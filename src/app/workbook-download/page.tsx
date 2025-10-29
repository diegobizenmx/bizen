"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { motion } from "framer-motion"

export default function WorkbookDownloadPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkAccess() {
      if (loading) return
      
      if (!user) {
        router.push("/login")
        return
      }

      try {
        // Check if user has already downloaded the workbook
        const hasDownloaded = localStorage.getItem('workbook_downloaded')
        if (hasDownloaded === 'true') {
          router.push("/modules/menu")
          return
        }
      } catch (error) {
        console.error("Error checking workbook status:", error)
      }
      
      setChecking(false)
    }

    checkAccess()
  }, [user, loading, router])

  const handleDownload = () => {
    // Mark as downloaded
    localStorage.setItem('workbook_downloaded', 'true')
    
    // Create download link
    const link = document.createElement('a')
    link.href = '/workbook.pdf'
    link.download = 'BIZEN_Workbook_Brand_Builders.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Redirect after a short delay
    setTimeout(() => {
      router.push("/modules/menu")
    }, 2000)
  }

  if (loading || checking) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)",
        backgroundSize: "400% 400%",
        animation: "shimmer 3s ease-in-out infinite"
      }}>
        <p style={{ fontSize: 18, color: "#fff" }}>Cargando...</p>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)",
      backgroundSize: "400% 400%",
      animation: "shimmer 3s ease-in-out infinite",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji"
    }}>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: "800px",
          width: "100%",
          textAlign: "center",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          backdropFilter: "blur(10px)"
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ marginBottom: "30px" }}
        >
          <img
            src="/bizen-mondragonlogo.png"
            alt="BIZEN Logo"
            style={{
              width: "clamp(60px, 15vw, 80px)",
              height: "auto",
              margin: "0 auto",
              display: "block"
            }}
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "#0F62FE",
            margin: "0 0 20px 0",
            background: "linear-gradient(135deg, #0F62FE, #3B82F6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          📚 Workbook Brand Builders
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontSize: "1.2rem",
            color: "#666",
            margin: "0 0 30px 0",
            lineHeight: 1.6
          }}
        >
          Tu guía completa para dominar el marketing de influencia
        </motion.p>

        {/* Guide Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            background: "linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)",
            borderRadius: "15px",
            padding: "25px",
            margin: "0 0 30px 0",
            border: "2px solid #f97316",
            textAlign: "center"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", marginBottom: "15px" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)"
            }}>
              <span style={{ color: "white", fontSize: "20px" }}>🧭</span>
            </div>
            <h3 style={{
              margin: 0,
              fontSize: "1.3rem",
              color: "#ea580c",
              fontWeight: 700
            }}>
              Tu Compañero de Viaje
            </h3>
          </div>
          <p style={{
            margin: 0,
            fontSize: "1.1rem",
            color: "#9a3412",
            lineHeight: 1.6,
            fontWeight: 500
          }}>
            Este workbook es tu <strong>guía personal</strong> que te acompañará durante todo tu viaje de aprendizaje. 
            No es solo un documento, sino tu <strong>compañero de estudio</strong> que te ayudará a aplicar 
            cada concepto y desarrollar tus habilidades paso a paso.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            background: "linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%)",
            borderRadius: "15px",
            padding: "30px",
            margin: "30px 0",
            border: "2px solid #0F62FE20"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
            <div style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0F62FE, #3B82F6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(15, 98, 254, 0.3)"
            }}>
              <span style={{ color: "white", fontSize: "24px" }}>📖</span>
            </div>
            <h2 style={{
              margin: 0,
              fontSize: "1.5rem",
              color: "#0F62FE",
              fontWeight: 700
            }}>
              ¿Qué incluye tu Guía de Aprendizaje?
            </h2>
          </div>

          <div style={{ textAlign: "left", fontSize: "1.1rem", lineHeight: 1.6, color: "#374151" }}>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Guías paso a paso</strong> para cada módulo
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Plantillas descargables</strong> para tus proyectos
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Checklists</strong> de verificación
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            margin: "30px 0"
          }}
        >
          {[
            { icon: "💡", title: "Práctico", desc: "Casos reales" },
            { icon: "🎯", title: "Completo", desc: "6 módulos" },
            { icon: "📱", title: "Portable", desc: "PDF descargable" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb"
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{feature.icon}</div>
              <h3 style={{ margin: "0 0 8px 0", color: "#0F62FE", fontSize: "1.1rem", fontWeight: 600 }}>
                {feature.title}
              </h3>
              <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Download Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          style={{
            background: "linear-gradient(135deg, #10B981, #059669)",
            color: "white",
            border: "none",
            padding: "18px 40px",
            borderRadius: "50px",
            fontSize: "1.2rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "20px"
          }}
        >
          💾 Descargar Workbook
        </motion.button>

        {/* File info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          style={{
            background: "rgba(15, 98, 254, 0.1)",
            borderRadius: "10px",
            padding: "15px",
            margin: "20px 0",
            border: "1px solid rgba(15, 98, 254, 0.2)"
          }}
        >
          <p style={{ margin: "0 0 5px 0", fontSize: "0.9rem", color: "#0F62FE", fontWeight: 600 }}>
            📄 BIZEN_Workbook_Brand_Builders.pdf
          </p>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#666" }}>
            Tamaño: ~2.5 MB • Formato: PDF • Compatible con todos los dispositivos
          </p>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.6 }}
          style={{
            margin: "30px 0 0 0",
            fontSize: "0.9rem",
            color: "#999",
            fontStyle: "italic"
          }}
        >
          * El workbook se puede descargar una sola vez. Guárdalo en un lugar seguro.
        </motion.p>
      </motion.div>
    </div>
  )
}
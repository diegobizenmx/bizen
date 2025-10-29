"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { motion } from "framer-motion"

export default function DiagnosticQuizIntroPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkQuizStatus() {
      if (loading) return
      
      if (!user) {
        router.push("/login")
        return
      }

      try {
        // Check if user has already seen the intro
        const hasSeenIntro = localStorage.getItem('diagnosticQuiz_intro_seen')
        if (hasSeenIntro === 'true') {
          // Check if quiz is completed
          const response = await fetch("/api/diagnostic-quiz", {
            method: "GET",
          })

          if (response.ok) {
            const data = await response.json()
            if (data.completed) {
              router.push("/modules/menu")
              return
            } else {
              router.push("/diagnostic-quiz/quiz")
              return
            }
          }
        }
      } catch (error) {
        console.error("Error checking quiz status:", error)
      }
      
      setChecking(false)
    }

    checkQuizStatus()
  }, [user, loading, router])

  const handleContinue = () => {
    // Mark intro as seen
    localStorage.setItem('diagnosticQuiz_intro_seen', 'true')
    router.push("/diagnostic-quiz/quiz")
  }

  if (loading || checking) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <p style={{ fontSize: 18, color: "#fff" }}>Cargando...</p>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji"
    }}>
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
          ¡Bienvenido a Brand Builders!
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
          Antes de comenzar tu microcredencial, necesitamos conocer tu nivel actual
        </motion.p>

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
              <span style={{ color: "white", fontSize: "24px" }}>📝</span>
            </div>
            <h2 style={{
              margin: 0,
              fontSize: "1.5rem",
              color: "#0F62FE",
              fontWeight: 700
            }}>
              Quiz Diagnóstico
            </h2>
          </div>

          <div style={{ textAlign: "left", fontSize: "1.1rem", lineHeight: 1.6, color: "#374151" }}>
            <p style={{ margin: "0 0 15px 0" }}>
              <strong>¿Qué es?</strong> Un cuestionario de 20 preguntas que nos ayudará a evaluar tu conocimiento actual sobre marketing de influencia.
            </p>
            <p style={{ margin: "0 0 15px 0" }}>
              <strong>¿Cuánto tiempo toma?</strong> Aproximadamente 10-15 minutos.
            </p>
            <p style={{ margin: "0 0 15px 0" }}>
              <strong>¿Es obligatorio?</strong> Sí, es necesario completarlo para acceder a los módulos.
            </p>
            <p style={{ margin: "0 0 0 0" }}>
              <strong>¿Puedo repetirlo?</strong> No, solo se puede realizar una vez.
            </p>
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
            { icon: "🎯", title: "Personalizado", desc: "Adaptado a tu nivel" },
            { icon: "⚡", title: "Rápido", desc: "Solo 10-15 minutos" },
            { icon: "📊", title: "Detallado", desc: "Análisis completo" },
            { icon: "🔒", title: "Seguro", desc: "Datos protegidos" }
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

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          style={{
            background: "linear-gradient(135deg, #0F62FE, #3B82F6)",
            color: "white",
            border: "none",
            padding: "18px 40px",
            borderRadius: "50px",
            fontSize: "1.2rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(15, 98, 254, 0.3)",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
        >
          🚀 Comenzar Quiz Diagnóstico
        </motion.button>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          style={{
            margin: "30px 0 0 0",
            fontSize: "0.9rem",
            color: "#999",
            fontStyle: "italic"
          }}
        >
          * Este quiz solo se puede realizar una vez. Asegúrate de estar en un lugar tranquilo.
        </motion.p>
      </motion.div>
    </div>
  )
}
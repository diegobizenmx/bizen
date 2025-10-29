"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { playCelebrationSound } from "@/utils/sounds"

/**
 * Module Completion Page
 * 
 * This page is shown after completing all sections of a module.
 * Displays a celebration animation and provides navigation to the modules menu.
 * 
 * URL: /module/[moduleId]/complete
 * Example: /module/1/complete
 */

export default function ModuleCompletePage() {
  const params = useParams<{ moduleId: string }>()
  const moduleId = Number(params.moduleId || 1)
  const primaryColor = "#0F62FE"
  const [isMouthOpen, setIsMouthOpen] = React.useState(false)
  const [showBilly, setShowBilly] = React.useState(false)
  
  // Play celebration sound on mount
  React.useEffect(() => {
    playCelebrationSound()
  }, [])
  
  // Billy talking animation
  React.useEffect(() => {
    // Show Billy after 1 second
    const showTimer = setTimeout(() => {
      setShowBilly(true)
      
      // Animate mouth for 3 seconds
      const interval = setInterval(() => {
        setIsMouthOpen(prev => !prev)
      }, 300)
      
      const stopTimer = setTimeout(() => {
        clearInterval(interval)
        setIsMouthOpen(false)
      }, 3000)
      
      return () => {
        clearInterval(interval)
        clearTimeout(stopTimer)
      }
    }, 1000)
    
    return () => clearTimeout(showTimer)
  }, [])

  return (
    <main 
      style={{ 
        minHeight: "100vh",
        display: "flex" as const,
        flexDirection: "column" as const,
        alignItems: "center" as const,
        justifyContent: "center" as const,
        background: "#FFFFFF",
        padding: 24,
        position: "relative" as const,
        overflow: "hidden"
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute" as const,
          inset: 0,
          opacity: 0.05,
          background: `radial-gradient(circle at 50% 50%, ${primaryColor}, transparent 70%)`
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "relative" as const,
          zIndex: 1,
          textAlign: "center",
          maxWidth: 600
        }}
      >
        {/* Emoji animation */}
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            repeatDelay: 2
          }}
          style={{ fontSize: 80, marginBottom: 24 }}
        >
          🎉
        </motion.div>

        <h1 style={{ 
          fontSize: 48, 
          margin: 0, 
          marginBottom: 16,
          fontWeight: 900,
          color: primaryColor
        }}>
          ¡Felicidades!
        </h1>
        
        <p style={{ 
          fontSize: 24, 
          color: "#666", 
          margin: 0,
          marginBottom: 8
        }}>
          Has completado el Módulo {moduleId}
        </p>

        <p style={{ 
          fontSize: 16, 
          color: "#999", 
          margin: 0,
          marginBottom: 40
        }}>
          Excelente trabajo en tu aprendizaje
        </p>

        {/* Billy Celebration */}
        {showBilly && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "relative",
              marginBottom: 40,
              display: "flex" as const,
              alignItems: "center" as const,
              justifyContent: "center" as const,
              gap: 24,
            }}
          >
            {/* Speech Bubble */}
            <div
              style={{
                position: "relative",
                background: "white",
                border: "4px solid #0F62FE",
                borderRadius: 30,
                padding: "25px 35px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                maxWidth: 400,
                animation: "popIn 0.4s ease-out 0.3s both",
              }}
            >
              <p
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#0F62FE",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                ¡Felicidades, Dragón! Es hora de pasar al siguiente módulo
              </p>
              
              {/* Speech bubble tail pointing to Billy */}
              <div
                style={{
                  position: "absolute",
                  right: -20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 0,
                  height: 0,
                  borderTop: "20px solid transparent",
                  borderBottom: "20px solid transparent",
                  borderLeft: "24px solid #0F62FE",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: -15,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 0,
                  height: 0,
                  borderTop: "17px solid transparent",
                  borderBottom: "17px solid transparent",
                  borderLeft: "20px solid white",
                }}
              />
            </div>
            
            {/* Billy Character */}
            <Image
              src={isMouthOpen ? "/3.png" : "/2.png"}
              alt="Billy celebrando"
              width={250}
              height={250}
              style={{
                display: "block",
                filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.2))",
              }}
              priority
            />
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link
            href="/modules/menu"
            style={{
              display: "inline-flex" as const,
              alignItems: "center" as const,
              justifyContent: "center" as const,
              padding: "18px 36px",
              borderRadius: 12,
              background: primaryColor,
              color: "#ffffff",
              fontSize: 20,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(15, 98, 254, 0.3)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"
              e.currentTarget.style.boxShadow = "0 14px 40px rgba(15, 98, 254, 0.4)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(15, 98, 254, 0.3)"
            }}
          >
            Ver todos los módulos →
          </Link>
        </motion.div>

        {/* Secondary actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ marginTop: 32, display: "flex" as const, gap: 16, justifyContent: "center" }}
        >
          <Link
            href="/"
            style={{
              padding: "12px 24px",
              borderRadius: 10,
              background: "transparent",
              color: "#374151",
              border: "1px solid #e5e7eb",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f9fafb"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent"
            }}
          >
            Ir al inicio
          </Link>

          <Link
            href="/dashboard"
            style={{
              padding: "12px 24px",
              borderRadius: 10,
              background: "transparent",
              color: "#374151",
              border: "1px solid #e5e7eb",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f9fafb"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent"
            }}
          >
            Ver mi progreso
          </Link>
        </motion.div>
      </motion.div>
      
      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  )
}

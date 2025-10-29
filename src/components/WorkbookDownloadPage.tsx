"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface WorkbookDownloadPageProps {
  workbookUrl?: string
  workbookName?: string
  onDownloadComplete?: () => void
}

export default function WorkbookDownloadPage({
  workbookUrl = "/workbook.pdf", // Your BIZEN workbook
  workbookName = "Workbook - Guía de Aventura",
  onDownloadComplete,
}: WorkbookDownloadPageProps) {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [billyFrame, setBillyFrame] = useState(0)
  const [dragoFrame, setDragoFrame] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    // Fade in animation
    setTimeout(() => setIsVisible(true), 100)
    
    // Animate Billy's mouth
    const billyInterval = setInterval(() => {
      setBillyFrame(prev => prev === 0 ? 1 : 0)
    }, 400)

    // Animate Drago (if you want it to move)
    const dragoInterval = setInterval(() => {
      setDragoFrame(prev => prev === 0 ? 1 : 0)
    }, 600)

    return () => {
      clearInterval(billyInterval)
      clearInterval(dragoInterval)
    }
  }, [])

  const handleDownload = async () => {
    setIsDownloading(true)
    
    try {
      // Create a temporary link element to trigger download
      const link = document.createElement('a')
      link.href = workbookUrl
      link.download = workbookName
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Call completion callback if provided
      if (onDownloadComplete) {
        onDownloadComplete()
      }
      
      // Redirect to modules after a short delay
      setTimeout(() => {
        router.push("/modules/menu")
      }, 2000)
      
    } catch (error) {
      console.error("Error downloading file:", error)
      setIsDownloading(false)
    }
  }

  return (
    <motion.div
      animate={{
        background: [
          "linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f7ff 100%)",
          "linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f8faff 100%)",
          "linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f7ff 100%)"
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f7ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.6s ease",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Speech Bubble */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            boxShadow: [
              "0 15px 50px rgba(0,0,0,0.2)",
              "0 20px 60px rgba(15, 98, 254, 0.3)",
              "0 15px 50px rgba(0,0,0,0.2)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "relative",
            background: "linear-gradient(135deg, #ffffff, #f8faff)",
            border: "4px solid #0F62FE",
            borderRadius: 30,
            padding: "30px 50px",
            boxShadow: "0 15px 50px rgba(0,0,0,0.2)",
            textAlign: "center",
            maxWidth: 600,
            width: "100%",
          }}
        >
          <motion.p
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            style={{
              fontSize: "clamp(20px, 4vw, 28px)",
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.4,
              background: "linear-gradient(45deg, #0F62FE, #10B981, #8B5CF6, #0F62FE)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s ease-in-out infinite",
            }}
          >
            Dragón por último tiene que descargar este workbook que será tu guía durante esta aventura.
          </motion.p>
          
          {/* Speech bubble tail */}
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderTop: "20px solid #0F62FE",
            }}
          />
        </motion.div>

        {/* Characters Container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          {/* Billy Character */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              filter: "drop-shadow(0 10px 30px rgba(15, 98, 254, 0.3))",
            }}
          >
            <Image
              src={billyFrame === 0 ? "/2.png" : "/3.png"}
              alt="Billy"
              width={200}
              height={200}
              style={{ display: "block" }}
              priority
            />
          </motion.div>

          {/* Drago Character */}
          <motion.div
            animate={{
              y: [0, -6, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{
              filter: "drop-shadow(0 10px 30px rgba(16, 185, 129, 0.3))",
              marginTop: "-40px",
            }}
          >
            <Image
              src="/drago1.png"
              alt="Dragón"
              width={350}
              height={350}
              style={{ display: "block", objectFit: "contain" }}
              priority
            />
          </motion.div>
        </div>

        {/* Download Button */}
        <motion.button
          animate={{
            y: [0, -5, 0],
            boxShadow: [
              "0 10px 30px rgba(0,0,0,0.2)",
              "0 15px 40px rgba(15, 98, 254, 0.4)",
              "0 10px 30px rgba(0,0,0,0.2)"
            ]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ 
            scale: 1.05,
            y: -8,
            boxShadow: "0 20px 50px rgba(15, 98, 254, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={isDownloading}
          style={{
            padding: "20px 40px",
            background: isDownloading 
              ? "linear-gradient(135deg, #6B7280, #9CA3AF)" 
              : "linear-gradient(135deg, #0F62FE 0%, #10B981 50%, #8B5CF6 100%)",
            backgroundSize: "200% 200%",
            color: "#fff",
            border: "none",
            borderRadius: 20,
            fontSize: "clamp(18px, 3vw, 24px)",
            fontWeight: 700,
            cursor: isDownloading ? "not-allowed" : "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            position: "relative",
            overflow: "hidden",
            minWidth: 300,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (!isDownloading) {
              e.currentTarget.style.backgroundPosition = "100% 0";
            }
          }}
          onMouseLeave={(e) => {
            if (!isDownloading) {
              e.currentTarget.style.backgroundPosition = "0% 0";
            }
          }}
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 15px rgba(255,255,255,0.6)",
                "0 0 0px rgba(255,255,255,0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {isDownloading ? "📥 Descargando..." : "📥 Descargar Workbook"}
          </motion.span>
        </motion.button>

        {/* Progress indicator */}
        {isDownloading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: "center",
              color: "#0F62FE",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            ¡Descarga iniciada! Redirigiendo a los módulos...
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.div>
  )
}

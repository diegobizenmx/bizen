"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface DiagnosticQuizIntroProps {
  brandName?: string;
  primaryColor?: string;
  background?: string;
  onStartQuiz?: () => void;
}

export default function DiagnosticQuizIntro({
  brandName = "BIZEN",
  primaryColor = "#0F62FE",
  background = "#FFFFFF",
  onStartQuiz,
}: DiagnosticQuizIntroProps) {
  const router = useRouter();
  const [currentFrame, setCurrentFrame] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Fade in
    setTimeout(() => setIsVisible(true), 100);
    
    // Animate talking for 4 seconds
    const interval = setInterval(() => {
      setCurrentFrame(prev => prev === 0 ? 1 : 0);
    }, 300);
    
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setCurrentFrame(0); // End with mouth closed
    }, 4000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleStartQuiz = () => {
    if (onStartQuiz) {
      onStartQuiz();
    } else {
      router.push("/diagnostic-quiz/quiz");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background,
        color: "#111",
        fontFamily:
          "Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: primaryColor,
            letterSpacing: 1,
          }}
        >
          {brandName}
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          width: "100%",
          maxWidth: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
          marginTop: 64, // Account for fixed header
        }}
      >
        {/* Billy Character - LEFT */}
        <div style={{ flex: "0 0 auto" }}>
          <Image
            src={currentFrame === 0 ? "/2.png" : "/3.png"}
            alt="Billy hablando"
            width={250}
            height={250}
            style={{
              width: 250,
              height: 250,
              objectFit: "contain",
              filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.15))",
            }}
            priority
          />
        </div>

        {/* Speech Bubble - RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            scale: isVisible ? 1 : 0.9,
            x: isVisible ? 0 : 20
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "relative",
            background: "#fff",
            borderRadius: 24,
            padding: "32px 40px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            border: `4px solid ${primaryColor}`,
            maxWidth: 500,
            flex: "1 1 500px",
          }}
        >
          {/* Tail pointing LEFT to Billy */}
          <div
            style={{
              position: "absolute",
              left: -24,
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "20px solid transparent",
              borderBottom: "20px solid transparent",
              borderRight: `24px solid ${primaryColor}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -18,
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "16px solid transparent",
              borderBottom: "16px solid transparent",
              borderRight: "20px solid #fff",
            }}
          />

          {/* Speech Content */}
          <div style={{ marginBottom: 32 }}>
            <motion.h1
              animate={{
                y: [0, -5, 0],
                textShadow: [
                  "0 0 0px rgba(15, 98, 254, 0)",
                  "0 0 20px rgba(15, 98, 254, 0.3)",
                  "0 0 0px rgba(15, 98, 254, 0)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                margin: "0 0 16px 0",
                fontSize: 28,
                fontWeight: 800,
                color: "#111",
                lineHeight: 1.2,
                background: "linear-gradient(45deg, #0F62FE, #10B981, #0F62FE)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 3s ease-in-out infinite",
              }}
            >
              ¡Hola, Dragón! 🐉
            </motion.h1>
            
            <motion.p
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              style={{
                margin: "0 0 16px 0",
                fontSize: 18,
                color: "#333",
                lineHeight: 1.6,
              }}
            >
              Este es un <strong style={{ color: primaryColor }}>Quiz diagnóstico</strong>. ¡No tengas miedo! 
              Intenta contestarlo con los conocimientos que ya tienes. 
              <strong style={{ color: primaryColor }}> ¡No pidas ayuda!</strong>
            </motion.p>

            <motion.p
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              style={{
                margin: "0 0 24px 0",
                fontSize: 16,
                color: "#666",
                lineHeight: 1.5,
              }}
            >
              Este quiz nos ayudará a entender tu nivel actual y personalizar 
              tu experiencia de aprendizaje. ¡Relájate y responde con confianza!
            </motion.p>
          </div>

          {/* Start Button */}
          <motion.button
            animate={{
              y: [0, -3, 0],
              boxShadow: [
                "0 8px 24px rgba(0,0,0,0.15)",
                "0 12px 32px rgba(15, 98, 254, 0.3)",
                "0 8px 24px rgba(0,0,0,0.15)"
              ]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ 
              scale: 1.05,
              y: -5,
              boxShadow: "0 16px 40px rgba(15, 98, 254, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartQuiz}
            style={{
              width: "100%",
              padding: "16px 32px",
              background: `linear-gradient(135deg, ${primaryColor} 0%, #10B981 50%, ${primaryColor} 100%)`,
              backgroundSize: "200% 200%",
              color: "#fff",
              border: "none",
              borderRadius: 16,
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundPosition = "100% 0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundPosition = "0% 0";
            }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 10px rgba(255,255,255,0.5)",
                  "0 0 0px rgba(255,255,255,0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🚀 ¡Empezar Quiz diagnóstico!
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* Animations and Responsive Design */}
      <style jsx>{`
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
        
        @media (max-width: 768px) {
          .main-content {
            flex-direction: column !important;
            gap: 32px !important;
            text-align: center !important;
          }
          .billy-character {
            order: 2;
          }
          .speech-bubble {
            order: 1;
            max-width: 90% !important;
          }
        }
      `}</style>
    </div>
  );
}

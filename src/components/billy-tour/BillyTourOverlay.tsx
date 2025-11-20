"use client";

import React, { useEffect, useState, useLayoutEffect } from "react";
import Image from "next/image";
import { useBillyTour } from "./BillyTourContext";
import { BILLY_TOUR_STEPS, type BillyTourStep } from "./billyTourConfig";

interface ElementPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface SpeechBubblePosition {
  top: number;
  left: number;
  placement: "top" | "bottom" | "left" | "right";
}

export function BillyTourOverlay() {
  const { isActive, currentStepIndex, nextStep, prevStep, endTour, totalSteps } = useBillyTour();
  const [elementPosition, setElementPosition] = useState<ElementPosition | null>(null);
  const [speechBubblePosition, setSpeechBubblePosition] = useState<SpeechBubblePosition | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const currentStep: BillyTourStep | undefined = BILLY_TOUR_STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === totalSteps - 1;
  const isFirstStep = currentStepIndex === 0;

  // Detect mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate positions when step changes or window resizes
  useLayoutEffect(() => {
    if (!isActive || !currentStep || typeof window === "undefined") {
      setElementPosition(null);
      setSpeechBubblePosition(null);
      return;
    }

    const calculatePositions = () => {
      try {
        const element = document.querySelector(currentStep.selector) as HTMLElement;
        
        if (!element) {
          console.warn(`Billy Tour: Element not found for selector "${currentStep.selector}"`);
          setElementPosition(null);
          setSpeechBubblePosition(null);
          return;
        }

        const rect = element.getBoundingClientRect();
        const padding = 12; // Padding around highlighted element

        const elemPos: ElementPosition = {
          top: rect.top + window.scrollY - padding,
          left: rect.left + window.scrollX - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2
        };

        setElementPosition(elemPos);

        // Calculate speech bubble position
        const bubbleWidth = isMobile ? 280 : 360;
        const bubbleHeight = 200; // Approximate
        const gap = 20; // Gap between element and bubble

        let placement = currentStep.placement || "auto";
        let bubbleTop = 0;
        let bubbleLeft = 0;

        // Auto-detect best placement
        if (placement === "auto") {
          const spaceBelow = window.innerHeight - (rect.bottom + gap);
          const spaceAbove = rect.top - gap;
          const spaceRight = window.innerWidth - (rect.right + gap);
          const spaceLeft = rect.left - gap;

          if (spaceBelow >= bubbleHeight) {
            placement = "bottom";
          } else if (spaceAbove >= bubbleHeight) {
            placement = "top";
          } else if (spaceRight >= bubbleWidth) {
            placement = "right";
          } else if (spaceLeft >= bubbleWidth) {
            placement = "left";
          } else {
            // Not enough space anywhere, default to bottom and let it scroll
            placement = "bottom";
          }
        }

        // Calculate position based on placement
        switch (placement) {
          case "bottom":
            bubbleTop = rect.bottom + window.scrollY + gap;
            bubbleLeft = rect.left + window.scrollX + rect.width / 2 - bubbleWidth / 2;
            break;
          case "top":
            bubbleTop = rect.top + window.scrollY - bubbleHeight - gap;
            bubbleLeft = rect.left + window.scrollX + rect.width / 2 - bubbleWidth / 2;
            break;
          case "right":
            bubbleTop = rect.top + window.scrollY + rect.height / 2 - bubbleHeight / 2;
            bubbleLeft = rect.right + window.scrollX + gap;
            break;
          case "left":
            bubbleTop = rect.top + window.scrollY + rect.height / 2 - bubbleHeight / 2;
            bubbleLeft = rect.left + window.scrollX - bubbleWidth - gap;
            break;
        }

        // Ensure bubble stays within viewport
        const maxLeft = window.innerWidth + window.scrollX - bubbleWidth - 20;
        const minLeft = window.scrollX + 20;
        bubbleLeft = Math.max(minLeft, Math.min(maxLeft, bubbleLeft));

        setSpeechBubblePosition({
          top: bubbleTop,
          left: bubbleLeft,
          placement: placement as "top" | "bottom" | "left" | "right"
        });

        // Scroll element into view if needed
        const elementRect = element.getBoundingClientRect();
        const isInViewport = (
          elementRect.top >= 0 &&
          elementRect.left >= 0 &&
          elementRect.bottom <= window.innerHeight &&
          elementRect.right <= window.innerWidth
        );

        if (!isInViewport) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } catch (error) {
        console.error("Billy Tour: Error calculating positions", error);
      }
    };

    // Calculate immediately and after a short delay to ensure DOM is ready
    calculatePositions();
    const timer = setTimeout(calculatePositions, 100);

    window.addEventListener("resize", calculatePositions);
    window.addEventListener("scroll", calculatePositions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculatePositions);
      window.removeEventListener("scroll", calculatePositions);
    };
  }, [isActive, currentStep, currentStepIndex, isMobile]);

  if (!isActive || !currentStep) {
    return null;
  }

  const handleNext = () => {
    if (isLastStep) {
      endTour();
    } else {
      nextStep();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 999999,
        pointerEvents: "auto"
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.60)",
          backdropFilter: "blur(2px)",
          pointerEvents: "auto"
        }}
        onClick={handleNext} // Click overlay to advance
      />

      {/* Highlighted element cutout */}
      {elementPosition && (
        <div
          style={{
            position: "absolute",
            top: elementPosition.top,
            left: elementPosition.left,
            width: elementPosition.width,
            height: elementPosition.height,
            border: "3px solid #0B71FE",
            borderRadius: 12,
            boxShadow: "0 0 0 4px rgba(11, 113, 254, 0.3), 0 0 0 9999px rgba(0, 0, 0, 0.60)",
            pointerEvents: "none",
            zIndex: 1,
            animation: "pulse-highlight 2s ease-in-out infinite"
          }}
        />
      )}

      {/* Billy's speech bubble */}
      {speechBubblePosition && (
        <div
          style={{
            position: "absolute",
            top: speechBubblePosition.top,
            left: speechBubblePosition.left,
            width: isMobile ? 280 : 360,
            background: "white",
            borderRadius: 16,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            padding: 24,
            zIndex: 2,
            pointerEvents: "auto",
            fontFamily: "'Montserrat', sans-serif"
          }}
          onClick={(e) => e.stopPropagation()} // Don't advance when clicking the bubble
        >
          {/* Billy avatar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0B71FE 0%, #4A9EFF 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                flexShrink: 0
              }}
            >
              {/* Placeholder for Billy - use /billy.png if available */}
              <Image
                src="/billy.png"
                alt="Billy"
                width={48}
                height={48}
                style={{ borderRadius: "50%" }}
                onError={(e) => {
                  // Fallback to emoji if image not found
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling!.textContent = "🐻";
                }}
              />
              <span style={{ display: "none" }}>🐻</span>
            </div>
            <div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#0B71FE",
                  marginBottom: 2
                }}
              >
                {currentStep.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#6B7280",
                  fontWeight: 600
                }}
              >
                Paso {currentStepIndex + 1} de {totalSteps}
              </div>
            </div>
          </div>

          {/* Body text */}
          <div
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "#374151",
              marginBottom: 20
            }}
          >
            {currentStep.body}
          </div>

          {/* Navigation buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              {!isFirstStep && (
                <button
                  onClick={prevStep}
                  style={{
                    padding: "10px 20px",
                    background: "#F3F4F6",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#374151",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    fontFamily: "'Montserrat', sans-serif"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#E5E7EB"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#F3F4F6"}
                >
                  ← Atrás
                </button>
              )}
              <button
                onClick={endTour}
                style={{
                  padding: "10px 20px",
                  background: "transparent",
                  border: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#6B7280",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >
                Saltar
              </button>
            </div>
            <button
              onClick={handleNext}
              style={{
                padding: "10px 24px",
                background: "linear-gradient(135deg, #0B71FE 0%, #4A9EFF 100%)",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
                transition: "transform 0.2s ease",
                boxShadow: "0 4px 12px rgba(11, 113, 254, 0.3)",
                fontFamily: "'Montserrat', sans-serif"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {isLastStep ? "¡Empezar! 🚀" : "Siguiente →"}
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes pulse-highlight {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(11, 113, 254, 0.3), 0 0 0 9999px rgba(0, 0, 0, 0.60);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(11, 113, 254, 0.5), 0 0 0 9999px rgba(0, 0, 0, 0.60);
          }
        }
      `}</style>
    </div>
  );
}


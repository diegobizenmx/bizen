/**
 * Example: How to manually restart the Billy Tour
 * 
 * This is an example component showing how to add a "Restart Tour" button
 * anywhere in your app (e.g., in a help menu, settings page, or header).
 */

"use client";

import React from "react";
import { useBillyTour } from "./BillyTourContext";

export function RestartTourButton() {
  const { startTour, isActive } = useBillyTour();

  return (
    <button
      onClick={startTour}
      disabled={isActive}
      style={{
        padding: "12px 24px",
        background: isActive 
          ? "#E5E7EB" 
          : "linear-gradient(135deg, #0B71FE 0%, #4A9EFF 100%)",
        border: "none",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 700,
        color: isActive ? "#9CA3AF" : "white",
        cursor: isActive ? "not-allowed" : "pointer",
        transition: "transform 0.2s ease",
        boxShadow: isActive 
          ? "none" 
          : "0 4px 12px rgba(11, 113, 254, 0.3)",
        fontFamily: "'Montserrat', sans-serif"
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.transform = "scale(1.05)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {isActive ? "Tour en progreso..." : "🐻 Mostrar tour de nuevo"}
    </button>
  );
}

/**
 * Example usage in a Settings page:
 * 
 * import { RestartTourButton } from "@/components/billy-tour/RestartTourButton.example";
 * 
 * export default function SettingsPage() {
 *   return (
 *     <div>
 *       <h1>Configuración</h1>
 *       <section>
 *         <h2>Ayuda</h2>
 *         <RestartTourButton />
 *       </section>
 *     </div>
 *   );
 * }
 */

/**
 * Example usage with just the hook (no button component):
 * 
 * "use client";
 * 
 * import { useBillyTour } from "@/components/billy-tour/BillyTourContext";
 * 
 * export default function HelpMenu() {
 *   const { startTour } = useBillyTour();
 * 
 *   return (
 *     <button onClick={startTour}>
 *       Ver tour de inicio
 *     </button>
 *   );
 * }
 */


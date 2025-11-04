"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import HamburgerMenu from "./HamburgerMenu"

export default function AppHeader() {
  const router = useRouter()

  return (
    <div style={{
      position: "sticky",
      top: 0,
      zIndex: 999,
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(15, 98, 254, 0.1)",
      padding: "16px clamp(20px, 4vw, 40px)",
      marginBottom: 0
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div 
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
            width: "fit-content"
          }}
          onClick={() => router.push("/courses")}
        >
        <Image 
          src="/bizen-logo.png" 
          alt="BIZEN Logo" 
          width={40} 
          height={40}
          priority
          style={{
            objectFit: "contain"
          }}
        />
          <span style={{
            fontSize: "clamp(20px, 4vw, 24px)",
            fontWeight: 800,
            color: "#0F62FE",
            fontFamily: "Montserrat, sans-serif",
            letterSpacing: "0.5px"
          }}>
            BIZEN
          </span>
        </div>

        {/* Hamburger Menu in top right */}
        <HamburgerMenu />
      </div>
    </div>
  )
}


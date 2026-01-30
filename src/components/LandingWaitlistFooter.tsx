"use client"

import Link from "next/link"
import Image from "next/image"

export function LandingWaitlistFooter() {
    return (
        <footer style={{
            width: "100%",
            background: "linear-gradient(to bottom, #ffffff, #f0f9ff)",
            borderTop: "1px solid rgba(15, 98, 254, 0.1)",
            padding: "clamp(48px, 8vw, 80px) clamp(16px, 4vw, 32px) clamp(24px, 4vw, 32px)",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 10
        }}>
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "clamp(32px, 5vw, 64px)",
                alignItems: "start"
            }}>
                {/* Brand Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "300px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "32px", height: "32px", position: "relative" }}>
                            <Image
                                src="/bizen-logo.png"
                                alt="BIZEN Logo"
                                width={32}
                                height={32}
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                        <span style={{
                            fontWeight: 800,
                            fontSize: "20px",
                            color: "#0F62FE",
                            fontFamily: "'Montserrat', sans-serif"
                        }}>
                            BIZEN
                        </span>
                    </div>
                    <p style={{
                        fontSize: "14px",
                        lineHeight: "1.6",
                        color: "#64748B",
                        margin: 0,
                        fontFamily: "'Inter', sans-serif"
                    }}>
                        La plataforma de educación financiera práctica y gamificada para la próxima generación de emprendedores.
                    </p>
                </div>

                {/* Links Column 1: Plataforma */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <h4 style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#0F172A",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        margin: 0
                    }}>
                        Plataforma
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <Link href="/signup" target="_blank" rel="noopener noreferrer" style={{ color: "#475569", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }} className="footer-link">
                            Crear cuenta gratis
                        </Link>
                        <Link href="/login" target="_blank" rel="noopener noreferrer" style={{ color: "#475569", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }} className="footer-link">
                            Iniciar sesión
                        </Link>
                        <Link href="#cursos" style={{ color: "#475569", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }} className="footer-link">
                            Cursos disponibles
                        </Link>
                        <Link href="#precios" style={{ color: "#475569", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }} className="footer-link">
                            Planes
                        </Link>
                    </div>
                </div>

                {/* Links Column 2: Legal & Soporte */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <h4 style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#0F172A",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        margin: 0
                    }}>
                        Legal
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <Link href="/bizen/terminos" style={{ color: "#475569", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }} className="footer-link">
                            Términos y Condiciones
                        </Link>
                        <Link href="/bizen/privacidad" style={{ color: "#475569", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }} className="footer-link">
                            Aviso de Privacidad
                        </Link>
                        <Link href="/bizen/cookies" style={{ color: "#475569", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }} className="footer-link">
                            Política de Cookies
                        </Link>
                    </div>
                </div>

                {/* Links Column 3: Redes */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <h4 style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#0F172A",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        margin: 0
                    }}>
                        Conecta
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <a href="#" style={{ color: "#475569", fontSize: "14px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }} className="footer-link">
                            <span>📸</span> Instagram
                        </a>
                        <a href="#" style={{ color: "#475569", fontSize: "14px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }} className="footer-link">
                            <span>🐦</span> Twitter / X
                        </a>
                        <a href="#" style={{ color: "#475569", fontSize: "14px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }} className="footer-link">
                            <span>💼</span> LinkedIn
                        </a>
                    </div>
                </div>
            </div>

            <div style={{
                maxWidth: "1200px",
                margin: "clamp(32px, 5vw, 64px) auto 0",
                paddingTop: "32px",
                borderTop: "1px solid rgba(15, 98, 254, 0.08)",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px"
            }}>
                <p style={{ fontSize: "13px", color: "#94A3B8", margin: 0 }}>
                    © {new Date().getFullYear()} BIZEN Education. Todos los derechos reservados.
                </p>
                <p style={{ fontSize: "13px", color: "#94A3B8", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                    Hecho con 💙 en México
                </p>
            </div>

            <style jsx global>{`
        .footer-link:hover {
          color: #0F62FE !important;
          transform: translateX(2px);
        }
      `}</style>
        </footer>
    )
}

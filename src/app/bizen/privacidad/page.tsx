"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

// ===== Brand & Theme
const brandName = "BIZEN"
const bgColor = "#0B71FE"
const linkColor = "#0E4A7A"
const supportEmail = "diego@bizen.mx"
const logoSrc = "/bsmx-logo.png"

export default function BIZENPrivacidadPage() {
  return (
    <main style={{ 
      background: "#f8fafc", 
      minHeight: "100vh", 
      paddingBottom: 60 
    }}>
      {/* Header */}
      <div style={{
        background: bgColor,
        color: "#fff",
        padding: "20px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        position: "sticky" as const,
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <div style={{ 
          maxWidth: 1200, 
          margin: "0 auto", 
          display: "flex" as const, 
          alignItems: "center" as const,
          gap: 16
        }}>
          <Link href="/bizen/signup" style={{ display: "flex" as const, alignItems: "center" as const, gap: 10, textDecoration: "none", color: "#fff" }}>
            <Image src={logoSrc} alt={`${brandName} logo`} width={40} height={40} priority />
            <strong style={{ fontSize: 20 }}>{brandName}</strong>
          </Link>
          <Link 
            href="/bizen/signup"
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
              transition: "background 0.2s ease",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            ← Regresar
          </Link>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, marginLeft: "auto" }}>
            Aviso de Privacidad
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ 
        maxWidth: 900, 
        margin: "0 auto", 
        padding: "40px 24px" 
      }}>
        <article style={{ 
          background: "#fff", 
          borderRadius: 16, 
          padding: "40px", 
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          lineHeight: 1.8,
          color: "#333"
        }}>
          <div style={{ marginBottom: 40, paddingBottom: 20, borderBottom: "2px solid #e5e7eb" }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: "#111", margin: "0 0 12px 0" }}>
              Aviso de Privacidad – {brandName}
            </h1>
            <p style={{ fontSize: 14, color: "#666", margin: 0 }}>
              Última actualización: <strong>20 de octubre de 2025</strong>
            </p>
          </div>

          {/* Section 1 */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: bgColor, marginBottom: 16 }}>
              1) Identidad y datos de contacto del responsable
            </h2>
            <p>
              <strong>{brandName}</strong> (en lo sucesivo, "{brandName}" o el "Responsable") es responsable del tratamiento de sus datos personales.
            </p>
            <p>
              <strong>Contacto:</strong> <a href={`mailto:${supportEmail}`} style={{ color: linkColor }}>{supportEmail}</a> – +52 442 708 16 22.
            </p>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: bgColor, marginBottom: 16 }}>
              2) Datos personales que recabamos
            </h2>
            <p>
              Obtenemos datos de forma directa (formularios, alta de cuenta), automática (cookies/analítica) o mediante terceros. Categorías:
            </p>
            <ul style={{ marginLeft: 20 }}>
              <li style={{ marginBottom: 8 }}>
                <strong>Identificación y contacto:</strong> nombre, apellidos, correo, teléfono.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Cuenta y uso:</strong> usuario, progreso de cursos, calificaciones, IP, dispositivo.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Facturación:</strong> datos necesarios para el cobro (tokens de pago).
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: bgColor, marginBottom: 16 }}>
              3) Finalidades del tratamiento
            </h2>
            
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 12, marginTop: 20 }}>
              Primarias:
            </h3>
            <ul style={{ marginLeft: 20 }}>
              <li>Crear y administrar su cuenta.</li>
              <li>Proveer contenidos educativos.</li>
              <li>Personalizar la experiencia de aprendizaje.</li>
              <li>Facturación y cumplimiento de obligaciones.</li>
              <li>Seguridad de la plataforma.</li>
              <li>Atención a clientes.</li>
            </ul>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 12, marginTop: 20 }}>
              Secundarias:
            </h3>
            <ul style={{ marginLeft: 20 }}>
              <li>Envío de newsletters y promociones.</li>
              <li>Analítica para mejorar el servicio.</li>
            </ul>
            <p>
              Puede negar o revocar su consentimiento para finalidades secundarias escribiendo a <a href={`mailto:${supportEmail}`} style={{ color: linkColor }}>{supportEmail}</a>.
            </p>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: bgColor, marginBottom: 16 }}>
              4) Derechos ARCO
            </h2>
            <p>
              Puede ejercer sus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong>:
            </p>
            <ul style={{ marginLeft: 20 }}>
              <li style={{ marginBottom: 8 }}>
                <strong>Contacto:</strong> <a href={`mailto:${supportEmail}`} style={{ color: linkColor }}>{supportEmail}</a>
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Plazos:</strong> responderemos en máximo 20 días hábiles.
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Gratuito:</strong> el ejercicio de derechos es gratuito.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: bgColor, marginBottom: 16 }}>
              5) Medidas de seguridad
            </h2>
            <p>
              Aplicamos medidas técnicas, administrativas y físicas razonables para proteger sus datos. Ningún sistema es infalible; use contraseñas robustas.
            </p>
          </section>

          {/* Section 6 */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: bgColor, marginBottom: 16 }}>
              6) Contacto
            </h2>
            <p><strong>Área de Privacidad:</strong> {brandName}</p>
            <p><strong>Correo:</strong> <a href={`mailto:${supportEmail}`} style={{ color: linkColor }}>{supportEmail}</a></p>
            <p><strong>Teléfono:</strong> +52 442 708 16 22</p>
            <p><strong>Horario:</strong> 8:00 a 20:00 (hora local)</p>
          </section>

          {/* Footer */}
          <div style={{ 
            marginTop: 40, 
            paddingTop: 24, 
            borderTop: "2px solid #e5e7eb",
            textAlign: "center" as const,
            color: "#666",
            fontSize: 14
          }}>
            <p>© {new Date().getFullYear()} {brandName}. Todos los derechos reservados.</p>
            <p style={{ marginTop: 12 }}>
              <Link href="/bizen/signup" style={{ color: linkColor, marginRight: 16 }}>Crear cuenta</Link>
              <Link href="/bizen/login" style={{ color: linkColor, marginRight: 16 }}>Iniciar sesión</Link>
              <Link href="/bizen/terminos" style={{ color: linkColor }}>Términos</Link>
            </p>
          </div>
        </article>
      </div>
    </main>
  )
}



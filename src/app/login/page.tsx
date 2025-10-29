"use client"

import * as React from "react"
import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { canAccessMicrocredential } from "@/lib/emailValidation"

// ===== Brand & Theme
const brandName = "BIZEN"
const logoSrc = "/bsmx-logo.png"
const bgColor = "#FFFFFF"         // ⚪ Fondo blanco
const buttonColor = "#0B71FE"     // 🔵 Botón principal
const linkColor = "#0E4A7A"
const supportEmail = "soporte@bizen.mx"

// ===== UI Primitives
function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
        background: "#fff",
        padding: "clamp(20px, 5vw, 24px)",
        minWidth: 0,
        overflow: "hidden" as const,
        ...(props.style || {}),
      }}
    />
  )
}
function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return <label htmlFor={htmlFor} style={{ display: "block" as const, fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 6, fontFamily: 'Montserrat, sans-serif' }}>{children}</label>
}
function TextField(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        height: 44,
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.12)",
        padding: "0 14px",
        outline: "none",
        fontSize: 14,
        color: "#111",
        background: "#fff",
        transition: "box-shadow .2s ease, border-color .2s ease",
        fontFamily: 'Montserrat, sans-serif',
        ...(props.style || {}),
      }}
      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 4px ${linkColor}26`)}
      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
    />
  )
}
function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }
) {
  const { loading, ...rest } = props
  return (
    <button
      {...rest}
      style={{
        height: 46,
        borderRadius: 12,
        border: "none",
        width: "100%",
        background: rest.disabled ? "#cfd8e3" : `linear-gradient(90deg, #0B71FE 0%, #4A9EFF 50%, #0B71FE 100%)`,
        backgroundSize: rest.disabled ? "auto" : "200% auto",
        backgroundPosition: rest.disabled ? "left" : "0% 0%",
        color: "#fff",
        fontWeight: 700,
        letterSpacing: 0.2,
        cursor: rest.disabled ? "not-allowed" : "pointer",
        transform: "translateZ(0)",
        transition: "transform .06s, filter .2s, box-shadow .2s",
        boxShadow: rest.disabled ? "none" : "0 6px 16px rgba(0,0,0,0.12)",
        fontFamily: 'Montserrat, sans-serif',
        animation: rest.disabled ? "none" : "shimmer-button 3s ease-in-out infinite",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {loading ? "Entrando…" : rest.children}
    </button>
  )
}
function Divider({ label = "o" }: { label?: string }) {
  return (
    <div style={{ display: "grid" as const, gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center" }}>
      <div style={{ height: 1, background: "rgba(0,0,0,0.08)" }} />
      <span style={{ fontSize: 12, color: "#666", fontFamily: 'Montserrat, sans-serif' }}>{label}</span>
      <div style={{ height: 1, background: "rgba(0,0,0,0.08)" }} />
    </div>
  )
}

// ===== Billy Talking Component (Billy on LEFT, Bubble on RIGHT)
function BillyGreeting({ message }: { message: React.ReactNode }) {
  const [currentFrame, setCurrentFrame] = React.useState(0)
  const [isVisible, setIsVisible] = React.useState(false)
  
  React.useEffect(() => {
    // Fade in
    setTimeout(() => setIsVisible(true), 100)
    
    // Animate talking for 3 seconds
    const interval = setInterval(() => {
      setCurrentFrame(prev => prev === 0 ? 1 : 0)
    }, 250)
    
    const timeout = setTimeout(() => {
      clearInterval(interval)
      setCurrentFrame(0) // End with mouth closed
    }, 3000)
    
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])
  
  return (
    <div style={{
      display: "flex" as const,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      gap: "clamp(16px, 4vw, 24px)",
      opacity: isVisible ? 1 : 0,
      transition: "opacity 0.5s ease",
      flexWrap: "wrap" as const,
    }}>
      {/* Billy Character - LEFT */}
      <div style={{ flexShrink: 0 }}>
        <Image
          src={currentFrame === 0 ? "/2.png" : "/3.png"}
          alt="Billy hablando"
          width={200}
          height={200}
          style={{
            width: "clamp(120px, 30vw, 200px)",
            height: "clamp(120px, 30vw, 200px)",
            objectFit: "contain",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
          }}
          priority
        />
      </div>
      
      {/* Speech Bubble - RIGHT */}
      <div style={{
        position: "relative" as const,
        background: "#fff",
        borderRadius: "clamp(16px, 4vw, 20px)",
        padding: "clamp(16px, 4vw, 20px) clamp(20px, 5vw, 28px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        border: "3px solid #0B71FE",
        maxWidth: "min(480px, 90vw)",
      }}>
        {/* Tail pointing TOP to Billy */}
        <div style={{
          position: "absolute" as const,
          top: -18,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderBottom: "20px solid #0B71FE",
        }} />
        <div style={{
          position: "absolute" as const,
          top: -13,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderBottom: "17px solid #fff",
        }} />
        
        <p style={{
          margin: 0,
          fontSize: "clamp(16px, 4vw, 20px)",
          lineHeight: 1.5,
          color: "#0f172a",
          fontWeight: 600,
          fontFamily: 'Montserrat, sans-serif',
        }}>
          {message}
        </p>
      </div>
    </div>
  )
}

// ===== Login Content Component (uses searchParams)
function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, resetPassword } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState<string | null>(null)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPass, setShowPass] = React.useState(false)
  const [remember, setRemember] = React.useState(true)
  const [isMobile, setIsMobile] = React.useState(true)

  // Handle URL error parameters
  React.useEffect(() => {
    const error = searchParams.get("error")
    if (error) {
      switch (error) {
        case "no_code":
          setMessage("Código de verificación no encontrado")
          break
        case "auth_failed":
          setMessage("Error de autenticación. Intenta de nuevo")
          break
        case "unexpected_error":
          setMessage("Error inesperado. Intenta de nuevo")
          break
        default:
          setMessage("Error de autenticación")
      }
    }
  }, [searchParams])

  // Check if mobile/tablet
  const [isTablet, setIsTablet] = React.useState(false)
  
  React.useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768)
        setIsTablet(window.innerWidth <= 1024)
      }
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Function to translate Supabase error messages to Spanish
  function translateAuthError(errorMessage: string): string {
    const errorTranslations: Record<string, string> = {
      "Invalid login credentials": "Credenciales de inicio de sesión inválidas",
      "Email not confirmed": "Email no confirmado. Revisa tu correo y haz clic en el enlace de verificación.",
      "Too many requests": "Demasiados intentos. Espera un momento antes de intentar de nuevo.",
      "User not found": "Usuario no encontrado",
      "Invalid email": "Email inválido",
      "Password should be at least 6 characters": "La contraseña debe tener al menos 6 caracteres",
      "Unable to validate email address: invalid format": "No se puede validar la dirección de email: formato inválido",
      "Signup is disabled": "El registro está deshabilitado",
      "Email rate limit exceeded": "Límite de emails excedido. Intenta de nuevo más tarde.",
      "For security purposes, you can only request this once every 60 seconds": "Por seguridad, solo puedes solicitar esto una vez cada 60 segundos"
    }
    
    // Check for exact matches first
    if (errorTranslations[errorMessage]) {
      return errorTranslations[errorMessage]
    }
    
    // Check for partial matches
    for (const [english, spanish] of Object.entries(errorTranslations)) {
      if (errorMessage.includes(english)) {
        return spanish
      }
    }
    
    // Default fallback
    return "Error de autenticación. Intenta de nuevo"
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)
    
    // Validate email domain for Microcredential access
    if (!canAccessMicrocredential(email)) {
      setMessage("⚠️ Solo estudiantes de Mondragón pueden acceder aquí. Si tienes una cuenta BIZEN (cualquier email), usa: /bizen/login")
      // Offer direct link to BIZEN login
      setTimeout(() => {
        if (confirm("Tu email no es de Mondragón. ¿Quieres ir a la página de login de BIZEN?")) {
          router.push("/bizen/login")
        }
      }, 500)
      return
    }
    
    try {
      setLoading(true)
      const { error } = await signIn(email, password)
      if (error) {
        // Log the actual error for debugging
        console.error('🔴 Login error:', error)
        console.error('🔴 Error message:', error.message)
        console.error('🔴 Error status:', error.status)
        
        // If "Invalid login credentials", suggest trying BIZEN login for non-Mondragón emails
        if (error.message.includes("Invalid login credentials") && !canAccessMicrocredential(email)) {
          setMessage("⚠️ Credenciales inválidas. Si tu cuenta es de BIZEN (no Mondragón), intenta en /bizen/login")
          return
        }
        
        // Check for email not confirmed error specifically
        if (error.message.includes("Email not confirmed") || error.message.includes("email_not_confirmed")) {
          setMessage("📧 Tu email no está verificado. Revisa tu correo y haz clic en el enlace de verificación. Si no lo recibiste, usa el botón 'Link mágico al email'.")
          return
        }
        
        throw error
      }
      router.replace("/welcome")
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error al iniciar sesión"
      console.error('🔴 Caught error:', err)
      setMessage(translateAuthError(errorMessage))
    } finally {
      setLoading(false)
    }
  }

  async function onMagicLink() {
    setMessage(null)
    if (!email) return setMessage("Escribe tu email para enviarte un link mágico.")
    try {
      setLoading(true)
      const { error } = await resetPassword(email)
      if (error) throw error
      setMessage("Revisa tu correo: te enviamos un link para entrar.")
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error al enviar el link"
      setMessage(translateAuthError(errorMessage))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ 
      background: bgColor, 
      minHeight: "100dvh", 
      padding: "clamp(16px, 4vw, 24px)",
      display: "grid" as const, 
      placeItems: "center" 
    }}>
      {/* Header */}
      <div style={{
        position: "fixed" as const, top: 0, left: 0, right: 0, 
        height: "clamp(56px, 12vw, 64px)",
        display: "flex" as const, alignItems: "center" as const, justifyContent: "flex-start" as const,
        background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)", color: "#111",
        zIndex: 1000,
        paddingLeft: "clamp(16px, 4vw, 24px)",
      }}>
        <Link href="/" style={{ display: "flex" as const, alignItems: "center" as const, gap: 10, textDecoration: "none", color: "inherit" }}>
          <Image src={logoSrc} alt={`${brandName} logo`} width={40} height={40} priority />
          <strong style={{ fontSize: "clamp(16px, 4vw, 20px)", color: "#0B71FE", fontFamily: 'Montserrat, sans-serif' }}>{brandName}</strong>
        </Link>
        <div style={{ 
          position: "absolute" as const, 
          right: "clamp(12px, 3vw, 20px)",
          fontSize: "clamp(10px, 2.5vw, 12px)", 
          color: "#666",
          display: isMobile ? "none" : "block" 
        }}>
          ¿Necesitas ayuda? <a href={`mailto:${supportEmail}`} style={{ color: "#0B71FE", textDecoration: "underline" }}>Escríbenos</a>
        </div>
      </div>

      {/* Layout with Billy on LEFT, Form on RIGHT */}
      <div style={{
        width: "100%", 
        maxWidth: 1200, 
        margin: "0 auto",
        paddingTop: "clamp(70px, 15vw, 100px)",
        display: "flex" as const,
        flexDirection: "row" as const,
        alignItems: "center" as const,
        justifyContent: "center" as const,
        gap: "clamp(24px, 6vw, 60px)",
        flexWrap: "wrap" as const,
      }}>
        {/* Billy with Speech Bubble - LEFT SIDE */}
        <div style={{ flex: "0 0 auto", width: "100%", maxWidth: "600px", order: isTablet ? 2 : 1 }}>
          <BillyGreeting message={<>Hola, <span style={{ color: "#0B71FE", background: "linear-gradient(90deg, #0B71FE 0%, #4A9EFF 50%, #0B71FE 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer-text 3s ease-in-out infinite" }}>Dragón</span>. Aquí es donde tienes que iniciar sesión. Si no tienes una cuenta, da click en &apos;Crear cuenta&apos;</>} />
        </div>

        {/* Form Card - RIGHT SIDE */}
        <div style={{ width: "100%", maxWidth: "min(480px, 90vw)", flex: "1 1 480px", order: isTablet ? 1 : 2 }}>
          <Card>
            <div style={{ display: "grid" as const, gap: "clamp(6px, 1.5vw, 8px)", marginBottom: "clamp(12px, 3vw, 16px)", textAlign: "center" }}>
              <h1 style={{ 
                margin: 0, 
                fontSize: "clamp(22px, 5vw, 28px)", 
                background: "linear-gradient(90deg, #0B71FE 0%, #4A9EFF 50%, #0B71FE 100%)",
                backgroundSize: "200% auto",
                backgroundPosition: "0% 0%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer-heading 3s ease-in-out infinite",
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif'
              }}>Iniciar sesión</h1>
              <p style={{ margin: 0, fontSize: "clamp(16px, 4vw, 18px)", color: "#0E4A7A", fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>¿Eres estudiante Mondragón?</p>
              <p style={{ margin: "4px 0 0", fontSize: "clamp(13px, 3vw, 15px)", color: "#666", fontWeight: 500, fontFamily: 'Montserrat, sans-serif' }}>Inicia sesión con tu correo Mondragón</p>
            </div>

            {/* FORM centrado */}
            <form onSubmit={onSubmit} style={{ display: "grid" as const, gap: 14, maxWidth: 360, margin: "0 auto" }}>
              <div>
                <Label htmlFor="email">Email</Label>
                <TextField id="email" name="email" type="email" placeholder="tucorreo@ejemplo.com" required autoComplete="email"
                  value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
              </div>

              <div>
                <div style={{ display: "flex" as const, justifyContent: "space-between" as const, alignItems: "end" }}>
                  <Label htmlFor="password">Contraseña</Label>
                  <button type="button" onClick={() => setShowPass((s) => !s)}
                    style={{ background: "transparent", border: "none", color: linkColor, fontSize: 12, cursor: "pointer", fontFamily: 'Montserrat, sans-serif' }}>
                    {showPass ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                <TextField id="password" name="password" type={showPass ? "text" : "password"} placeholder="Tu contraseña"
                  required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
              </div>

              <div style={{ display: "flex" as const, justifyContent: "space-between" as const, alignItems: "center" }}>
                <label style={{ display: "inline-flex" as const, gap: 8, alignItems: "center" as const, fontSize: 12, color: "#444", fontFamily: 'Montserrat, sans-serif' }}>
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.currentTarget.checked)} /> Recuérdame
                </label>
                <a href="/forgot-password" style={{ fontSize: 12, color: linkColor, textDecoration: "none", fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>¿Olvidaste tu contraseña?</a>
              </div>

              <Button type="submit" disabled={loading} loading={loading}>Entrar</Button>

              <Divider label="¿No tienes cuenta?" />
              <a href="/signup" style={{ 
                display: "inline-block" as const, 
                textAlign: "center", 
                width: "100%", 
                textDecoration: "none", 
                fontSize: 14, 
                color: "#0B71FE", 
                fontWeight: 600,
                fontFamily: 'Montserrat, sans-serif',
                background: "linear-gradient(90deg, #0B71FE 0%, #4A9EFF 50%, #0B71FE 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer-text 3s ease-in-out infinite",
              }}>
                Crear cuenta
              </a>
            </form>

            {message && (
              <p role="status" style={{ marginTop: 14, textAlign: "center", wordBreak: "break-word", overflowWrap: "anywhere", fontFamily: 'Montserrat, sans-serif' }}>
                {message}
              </p>
            )}

            {/* Acción alternativa centrada */}
            <div style={{ marginTop: 16, display: "grid" as const, gap: 10, maxWidth: 360, marginLeft: "auto", marginRight: "auto" }}>
              <Divider label="o entra con" />
              <button
                type="button" onClick={onMagicLink} disabled={loading}
                style={{ height: 42, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)", background: "#ffffff", color: linkColor, cursor: "pointer", fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}
              >
                Link mágico al email
              </button>
            </div>
          </Card>

          <div style={{ textAlign: "center", marginTop: 16, color: "#666", fontSize: 12 }}>
            © {new Date().getFullYear()} {brandName}. Todos los derechos reservados.
            <div style={{ marginTop: 8 }}>
              <a href="/privacidad" style={{ color: "#0B71FE", textDecoration: "underline" }}>Aviso de Privacidad</a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @keyframes shimmer-text {
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
        
        @keyframes shimmer-heading {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 0%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        
        @keyframes shimmer-button {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 0%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        
        @media (max-width: 1024px) {
          main > div {
            flex-direction: column !important;
            gap: 32px !important;
          }
          main > div > div:first-child {
            order: 2; /* Billy goes to bottom on mobile */
          }
        }
      `}</style>
    </main>
  )
}

// ===== Page (wrapped in Suspense)
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        background: "#FFFFFF", 
        minHeight: "100dvh", 
        display: "grid" as const, 
        placeItems: "center", 
        color: "#111",
        fontSize: 18
      }}>
        Cargando...
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}

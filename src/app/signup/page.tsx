"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import PasswordStrengthField from "@/components/PasswordStrengthField"

// TypeScript declarations for Google reCAPTCHA
declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options?: { action: string }) => Promise<string>
    }
  }
}

// ===== Brand & Theme
const brandName = "BIZEN"
const logoSrc = "/bsmx-logo.png"
const bgColor = "#FFFFFF"         // ⚪ Fondo blanco
const buttonColor = "#0B71FE"
const linkColor = "#0E4A7A"
const supportEmail = "soporte@bizen.mx"

// ===== UI
function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
        background: "#fff",
        padding: 24,
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
      {loading ? "Creando…" : rest.children}
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

// ===== Billy Talking Component (Bubble on LEFT, Billy on RIGHT)
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
      gap: 24,
      opacity: isVisible ? 1 : 0,
      transition: "opacity 0.5s ease",
    }}>
      {/* Speech Bubble - LEFT */}
      <div style={{
        position: "relative" as const,
        background: "#fff",
        borderRadius: 20,
        padding: "20px 28px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        border: "3px solid #0B71FE",
        maxWidth: 380,
      }}>
        {/* Tail pointing RIGHT to Billy */}
        <div style={{
          position: "absolute" as const,
          right: -18,
          top: "50%",
          transform: "translateY(-50%)",
          width: 0,
          height: 0,
          borderTop: "15px solid transparent",
          borderBottom: "15px solid transparent",
          borderLeft: "20px solid #0B71FE",
        }} />
        <div style={{
          position: "absolute" as const,
          right: -13,
          top: "50%",
          transform: "translateY(-50%)",
          width: 0,
          height: 0,
          borderTop: "12px solid transparent",
          borderBottom: "12px solid transparent",
          borderLeft: "17px solid #fff",
        }} />
        
        <p style={{
          margin: 0,
          fontSize: 20,
          lineHeight: 1.5,
          color: "#0f172a",
          fontWeight: 600,
          fontFamily: 'Montserrat, sans-serif',
        }}>
          {message}
        </p>
      </div>
      
      {/* Billy Character - RIGHT */}
      <div>
        <Image
          src={currentFrame === 0 ? "/2.png" : "/3.png"}
          alt="Billy hablando"
          width={200}
          height={200}
          style={{
            width: 200,
            height: 200,
            objectFit: "contain",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
          }}
          priority
        />
      </div>
    </div>
  )
}

// ===== Page
export default function SignupPage() {
  const [state, setState] = React.useState({
    success: false,
    message: null as string | null,
    errors: {} as Record<string, string[]>,
    loading: false
  })

  // ✅ Campos controlados para preservar valores tras validación
  const [fullName, setFullName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [accepted, setAccepted] = React.useState(false)

  const [showPass, setShowPass] = React.useState(false)
  const [resendEmail, setResendEmail] = React.useState('')
  const [resendStatus, setResendStatus] = React.useState<string | null>(null)
  const [resending, setResending] = React.useState(false)
  const [recaptchaLoaded, setRecaptchaLoaded] = React.useState(false)
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  // Load reCAPTCHA (only if site key exists)
  React.useEffect(() => {
    if (!siteKey) {
      // No key configured → skip reCAPTCHA in dev
      setRecaptchaLoaded(false)
      return
    }
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    script.onload = () => setRecaptchaLoaded(true)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [siteKey])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState(prev => ({ ...prev, loading: true, message: null, errors: {} }))
    
    try {
      // Get reCAPTCHA token (v3) with robust guards and timeout fallback
      let recaptchaToken = ''
      if (siteKey && recaptchaLoaded && typeof window !== 'undefined' && window.grecaptcha) {
        recaptchaToken = await new Promise<string>((resolve) => {
          let settled = false
          const timeout = setTimeout(() => {
            if (!settled) {
              settled = true
              resolve('')
            }
          }, 2000)
          try {
            window.grecaptcha!.ready(() => {
              window.grecaptcha!.execute(siteKey, { action: 'signup' })
                .then((token: string) => { if (!settled) { settled = true; clearTimeout(timeout); resolve(token) } })
                .catch(() => { if (!settled) { settled = true; clearTimeout(timeout); resolve('') } })
            })
          } catch {
            if (!settled) {
              settled = true
              clearTimeout(timeout)
              resolve('')
            }
          }
        })
      }

      // Log form values before sending
      console.log('📤 Client: Preparing form submission:', {
        fullName: fullName || '(empty)',
        email: email || '(empty)',
        passwordLength: password?.length || 0,
        accepted,
      })
      
      const formData = new FormData()
      formData.append('fullName', fullName || '')
      formData.append('email', email || '')
      formData.append('password', password || '')
      formData.append('accepted', accepted ? 'on' : '')
      formData.append('appSource', 'microcredential') // Track that this is from microcredential app
      if (recaptchaToken) {
        formData.append('recaptchaToken', recaptchaToken)
      }
      
      // Log FormData contents
      console.log('📤 Client: FormData entries:')
      for (const [key, value] of formData.entries()) {
        console.log(`   ${key}:`, key === 'password' ? '[HIDDEN]' : value)
      }
      
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: formData
      })
      
      // Get response text first (can only read once)
      const text = await response.text()
      
      // Check if response is OK
      if (!response.ok) {
        console.error('Signup API error:', response.status, text)
        let errorMessage = `Error del servidor (${response.status}). Intenta de nuevo.`
        
        // Try to parse error message if available
        if (text) {
          try {
            const errorJson = JSON.parse(text)
            if (errorJson.message) {
              errorMessage = errorJson.message
            }
            // In development, show more details
            if (process.env.NODE_ENV === 'development' && errorJson.originalError) {
              console.error('Original Supabase error:', errorJson.originalError)
              errorMessage += `\n\n(Detalle técnico: ${errorJson.originalError})`
            }
          } catch {
            // Not JSON, use default message
          }
        }
        
        setState({
          success: false,
          message: errorMessage,
          errors: {},
          loading: false
        })
        return
      }
      
      // Check if response has content before parsing JSON
      if (!text || text.trim() === '') {
        console.error('Empty response from signup API')
        setState({
          success: false,
          message: 'El servidor no respondió correctamente. Intenta de nuevo.',
          errors: {},
          loading: false
        })
        return
      }
      
      let result
      try {
        result = JSON.parse(text)
      } catch (parseError) {
        console.error('Failed to parse signup response:', text, parseError)
        setState({
          success: false,
          message: 'Error al procesar la respuesta del servidor. Intenta de nuevo.',
          errors: {},
          loading: false
        })
        return
      }
      
      if (result.success) {
        setState({
          success: true,
          message: result.message,
          errors: {},
          loading: false
        })
        
        if (result.redirect) {
          window.location.href = result.redirect
        }
      } else {
        setState({
          success: false,
          message: result.message,
          errors: result.errors || {},
          loading: false
        })
      }
    } catch (error) {
      console.error('Signup error:', error)
      setState({
        success: false,
        message: 'Error de autenticación. Intenta de nuevo',
        errors: {},
        loading: false
      })
    }
  }

  async function onResend() {
    const emailToResend = resendEmail || email || (document.getElementById('email') as HTMLInputElement)?.value
    if (!emailToResend) {
      setResendStatus('❌ Por favor ingresa tu email primero')
      return
    }
    setResending(true)
    setResendStatus('📤 Reenviando...')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const origin = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://bizen.mx')
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: emailToResend,
        options: { emailRedirectTo: `${origin}/auth/callback` }
      })
      if (error) {
        console.error('Resend error:', error)
        setResendStatus(`❌ Error: ${error.message}`)
      } else {
        setResendStatus('✅ Correo reenviado. Revisa tu bandeja y spam.')
        setResendEmail(emailToResend)
      }
    } catch (err) {
      console.error('Resend exception:', err)
      setResendStatus('❌ Error al reenviar. Intenta de nuevo.')
    } finally {
      setResending(false)
    }
  }

  return (
    <main style={{ background: bgColor, minHeight: "100dvh", padding: 24, display: "grid" as const, placeItems: "center" }}>
      {/* Header */}
      <div style={{
        position: "fixed" as const, top: 0, left: 0, right: 0, height: 64,
        display: "flex" as const, alignItems: "center" as const, justifyContent: "flex-start" as const,
        background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)", color: "#111",
        paddingLeft: 24,
      }}>
        <Link href="/" style={{ display: "flex" as const, alignItems: "center" as const, gap: 10, textDecoration: "none", color: "inherit" }}>
          <Image src={logoSrc} alt={`${brandName} logo`} width={40} height={40} priority />
          <strong style={{ fontSize: 20, color: "#0B71FE", fontFamily: 'Montserrat, sans-serif' }}>{brandName}</strong>
        </Link>
        <div style={{ position: "absolute" as const, right: 20, fontSize: 12, color: "#666" }}>
          ¿Necesitas ayuda? <a href={`mailto:${supportEmail}`} style={{ color: "#0B71FE", textDecoration: "underline" }}>Escríbenos</a>
        </div>
      </div>

      {/* Layout with Form on LEFT, Billy on RIGHT */}
      <div style={{
        width: "100%", 
        maxWidth: 1200, 
        margin: "0 auto",
        display: "flex" as const,
        flexDirection: "row" as const,
        alignItems: "center" as const,
        justifyContent: "center" as const,
        gap: 60,
      }}>
        {/* Form Card - LEFT SIDE */}
        <div style={{ width: "100%", maxWidth: 480, flex: "1 1 480px" }}>
          <Card>
            <div style={{ display: "grid" as const, gap: 8, marginBottom: 16, textAlign: "center" }}>
              <h1 style={{ 
                margin: 0, 
                fontSize: 28, 
                background: "linear-gradient(90deg, #0B71FE 0%, #4A9EFF 50%, #0B71FE 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer-text 3s ease-in-out infinite",
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif'
              }}>Crear cuenta</h1>
              <p style={{ margin: 0, fontSize: 18, color: "#0E4A7A", fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>¿Eres estudiante Mondragón?</p>
              <p style={{ 
                margin: "8px 0 0", 
                fontSize: 15, 
                color: "#0E4A7A", 
                fontWeight: 600,
                padding: "10px 16px",
                background: "linear-gradient(135deg, #e3f2fd 0%, #f0f7ff 100%)",
                borderRadius: 8,
                border: "1px solid #0B71FE30",
                fontFamily: 'Montserrat, sans-serif'
              }}>
                🎓 Regístrate con tu correo Mondragón
              </p>
            </div>

            {/* FORM centrado (fullName/email/accepted controlados) */}
            <form onSubmit={onSubmit} style={{ display: "grid" as const, gap: 14, maxWidth: 360, margin: "0 auto" }}>
              <div>
                <Label htmlFor="fullName">Nombre completo</Label>
                <TextField
                  id="fullName"
                  name="fullName"
                  placeholder="Escribe tu nombre completo (ej: Juan Pérez García)"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  style={{ borderColor: state.errors.fullName ? '#dc2626' : undefined }}
                />
                <div style={{ marginTop: 4, fontSize: 11, color: '#666', fontStyle: 'italic' }}>
                  * Ingresa tu nombre y apellidos completos
                </div>
                {state.errors.fullName && (
                  <div style={{ marginTop: 4, fontSize: 12, color: '#dc2626' }}>
                    {state.errors.fullName.map((error, index) => <div key={index}>{error}</div>)}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tucorreo@mondragonmexico.edu.mx"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  style={{ borderColor: state.errors.email ? '#dc2626' : undefined }}
                />
                {state.errors.email && (
                  <div style={{ marginTop: 4, fontSize: 12, color: '#dc2626' }}>
                    {state.errors.email.map((error, index) => <div key={index}>{error}</div>)}
                  </div>
                )}
              </div>

              <PasswordStrengthField
                name="password"
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
                autoComplete="new-password"
                showPass={showPass}
                onToggleShow={() => setShowPass(s => !s)}
                error={state.errors.password}
                linkColor={linkColor}
                value={password}
                onChange={setPassword}
              />

              <div style={{ display: "flex" as const, gap: 10, alignItems: "flex-start" }}>
                <input
                  id="accepted"
                  name="accepted"
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  style={{ marginTop: 2 }}
                />
                <label htmlFor="accepted" style={{ fontSize: 12, color: "#444" }}>
                  Acepto los <a href="/terminos" style={{ color: linkColor }}>Términos</a> y el <a href="/privacidad" style={{ color: linkColor }}>Aviso de Privacidad</a>.
                </label>
              </div>
              {state.errors.accepted && (
                <div style={{ fontSize: 12, color: '#dc2626' }}>
                  {state.errors.accepted.map((error, index) => <div key={index}>{error}</div>)}
                </div>
              )}

              <Button type="submit" disabled={state.loading} loading={state.loading}>
                {state.loading ? "Creando cuenta..." : "Registrarme"}
              </Button>

              <Divider label="¿Ya tienes cuenta?" />
              <a href="/login" style={{ display: "inline-block" as const, textAlign: "center", width: "100%", textDecoration: "none", fontSize: 14, color: linkColor, fontWeight: 600 }}>
                Inicia sesión
              </a>

              {/* Botón secundario blanco: Reenviar verificación */}
              <button
                type="button"
                onClick={onResend}
                disabled={state.loading || resending}
                style={{
                  marginTop: 8, height: 40, borderRadius: 10,
                  border: `1px solid rgba(14,74,122,0.35)`,
                  background: "#ffffff", color: linkColor,
                  cursor: (state.loading || resending) ? "not-allowed" : "pointer",
                  fontWeight: 700,
                  opacity: (state.loading || resending) ? 0.6 : 1,
                }}
              >
                {resending ? "Reenviando..." : "Reenviar verificación al email"}
              </button>
            </form>

            {state.message ? (
              <p role="status" style={{
                marginTop: 14,
                wordBreak: "break-word",
                overflowWrap: "anywhere",
                whiteSpace: "pre-wrap",
                color: state.success ? '#059669' : '#dc2626'
              }}>
                {state.message}
              </p>
            ) : null}

            {resendStatus && (
              <p role="status" style={{
                marginTop: 14,
                wordBreak: "break-word",
                overflowWrap: "anywhere",
                whiteSpace: "pre-wrap",
                color: resendStatus.includes('✅') ? '#059669' : '#dc2626',
                fontSize: 14
              }}>
                {resendStatus}
              </p>
            )}
          </Card>

          <div style={{ textAlign: "center", marginTop: 16, color: "#666", fontSize: 12 }}>
            © {new Date().getFullYear()} {brandName}. Todos los derechos reservados.
            <div style={{ marginTop: 8 }}>
              <a href="/privacidad" style={{ color: "#0B71FE", textDecoration: "underline" }}>Aviso de Privacidad</a>
            </div>
          </div>
        </div>
        
        {/* Billy with Speech Bubble - RIGHT SIDE */}
        <div style={{ flex: "0 0 auto" }}>
          <BillyGreeting message={<>Hola, <span style={{ color: "#0B71FE", background: "linear-gradient(90deg, #0B71FE 0%, #4A9EFF 50%, #0B71FE 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer-text 3s ease-in-out infinite" }}>Dragón</span>. Aquí es donde tienes que registrarte con tu correo de Mondragón</>} />
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
          main > div > div:last-child {
            order: 2; /* Billy goes to bottom on mobile */
          }
        }
      `}</style>
    </main>
  )
}

"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options?: { action: string }) => Promise<string>
    }
  }
}

const brandName = "BIZEN"
const bgColor = "#FFFFFF"
const linkColor = "#0E4A7A"
const AUTH_CONTROL_HEIGHT = 48
const AUTH_FORM_MAX_WIDTH = 400

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
  return <label htmlFor={htmlFor} style={{ display: "block" as const, fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{children}</label>
}

function TextField(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="auth-input"
      style={{
        width: "100%",
        minWidth: 0,
        height: AUTH_CONTROL_HEIGHT,
        minHeight: AUTH_CONTROL_HEIGHT,
        borderRadius: 12,
        border: "1px solid rgba(11, 113, 254, 0.2)",
        padding: "0 16px",
        outline: "none",
        fontSize: 15,
        color: "#111",
        background: "#f5f9ff",
        transition: "box-shadow .2s ease, border-color .2s ease, background .2s ease",
        ...(props.style || {}),
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 3px rgba(11, 113, 254, 0.2)`
        e.currentTarget.style.background = "#fff"
        e.currentTarget.style.borderColor = "rgba(11, 113, 254, 0.4)"
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = "none"
        e.currentTarget.style.background = "#f5f9ff"
        e.currentTarget.style.borderColor = "rgba(11, 113, 254, 0.2)"
      }}
    />
  )
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  const { loading, ...rest } = props
  return (
    <button
      {...rest}
      style={{
        height: AUTH_CONTROL_HEIGHT,
        minHeight: AUTH_CONTROL_HEIGHT,
        borderRadius: 12,
        border: "none",
        width: "100%",
        minWidth: 0,
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

export default function BIZENSignupPage() {
  const [state, setState] = React.useState({
    success: false,
    message: null as string | null,
    errors: {} as Record<string, string[]>,
    loading: false
  })

  const [fullName, setFullName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [accepted, setAccepted] = React.useState(false)
  const [showPass, setShowPass] = React.useState(false)
  const [googleLoading, setGoogleLoading] = React.useState(false)
  const [recaptchaLoaded, setRecaptchaLoaded] = React.useState(false)
  const router = useRouter()
  const supabase = createClient()

  React.useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => setRecaptchaLoaded(true)
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [])

  React.useEffect(() => {
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState(prev => ({ ...prev, loading: true, message: null, errors: {} }))
    try {
      let recaptchaToken = ''
      if (recaptchaLoaded) {
        recaptchaToken = await new Promise<string>((resolve) => {
          window.grecaptcha?.ready(() => {
            window.grecaptcha!.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action: 'signup' })
              .then((token: string) => resolve(token))
              .catch(() => resolve(''))
          })
        })
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/bizen/auth/callback`,
          data: { app_source: 'bizen', recaptchaToken }
        }
      })
      if (error) {
        setState({ success: false, message: error.message, errors: {}, loading: false })
      } else {
        setState({ success: true, message: '✅ Cuenta creada. Verifica tu correo para continuar.', errors: {}, loading: false })
        setTimeout(() => window.open('/login', '_blank'), 2000)
      }
    } catch (err) {
      setState({ success: false, message: 'Error de autenticación. Intenta de nuevo', errors: {}, loading: false })
    }
  }

  async function handleGoogleSignUp() {
    setState(prev => ({ ...prev, message: null }))
    try {
      setGoogleLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
      // User will be redirected to Google, no need to navigate here
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error al registrarse con Google"
      setState(prev => ({ ...prev, message: errorMessage }))
      setGoogleLoading(false)
    }
  }

  return (
    <main className="auth-page" style={{ position: "relative" as const, overflow: "hidden" as const, background: "linear-gradient(180deg, #f0f7ff 0%, #e8f4ff 50%, #f0f7ff 100%)", height: "100dvh", minHeight: "100dvh", padding: "clamp(16px, 4vw, 24px)", display: "grid" as const, placeItems: "center", boxSizing: "border-box" as const }}>
      {/* Fixed brand name on the left */}
      <Link href="/" style={{ position: "fixed" as const, left: "clamp(16px, 4vw, 24px)", top: "clamp(16px, 4vw, 24px)", display: "flex" as const, alignItems: "center" as const, textDecoration: "none", color: "inherit", zIndex: 10 }}>
        <strong style={{ fontSize: "clamp(22px, 5vw, 28px)", color: "#0B71FE", fontFamily: "Montserrat, sans-serif" }}>{brandName}</strong>
      </Link>

      {/* Decorative blue elements - visible soft blobs */}
      <div aria-hidden style={{ position: "absolute" as const, top: "-10%", right: "-5%", width: "clamp(320px, 55vw, 560px)", height: "clamp(320px, 55vw, 560px)", background: "radial-gradient(circle, rgba(15, 98, 254, 0.22) 0%, rgba(15, 98, 254, 0.08) 50%, transparent 75%)", borderRadius: "50%", pointerEvents: "none" as const, zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute" as const, bottom: "-10%", left: "-5%", width: "clamp(280px, 50vw, 480px)", height: "clamp(280px, 50vw, 480px)", background: "radial-gradient(circle, rgba(74, 158, 255, 0.18) 0%, rgba(74, 158, 255, 0.06) 50%, transparent 75%)", borderRadius: "50%", pointerEvents: "none" as const, zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "clamp(240px, 40vw, 380px)", height: "clamp(240px, 40vw, 380px)", background: "radial-gradient(circle, rgba(11, 113, 254, 0.12) 0%, rgba(11, 113, 254, 0.04) 50%, transparent 75%)", borderRadius: "50%", pointerEvents: "none" as const, zIndex: 0 }} />

      <div className="auth-content" style={{
        position: "relative" as const,
        zIndex: 1,
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        paddingTop: 0,
        paddingBottom: "clamp(16px, 4vw, 24px)",
        display: "flex" as const,
        flexDirection: "row" as const,
        alignItems: "center" as const,
        justifyContent: "center" as const,
        gap: "clamp(24px, 6vw, 60px)",
        flexWrap: "wrap" as const,
        minHeight: 0,
        overflow: "auto" as const,
        maxHeight: "100dvh",
        boxSizing: "border-box" as const,
      }}>
        <div style={{ width: "100%", maxWidth: 480, flex: "1 1 480px", minWidth: 0 }}>
          <div>
            <div style={{ display: "grid" as const, gap: "clamp(6px, 1.5vw, 8px)", marginTop: "clamp(32px, 8vw, 64px)", marginBottom: "clamp(12px, 3vw, 16px)", textAlign: "center" }}>
              <div style={{ display: "flex" as const, flexDirection: "column" as const, alignItems: "center" as const, gap: 0 }}>
                <p style={{ margin: 0, marginBottom: -12, fontSize: "clamp(24px, 5.5vw, 32px)", color: "#525252", fontFamily: "Arial, sans-serif" }}>Bienvenido a</p>
                <div style={{ marginTop: -20 }}>
                  <Image src="/bizen_sign.png" alt="BIZEN" width={400} height={160} style={{ width: "auto", height: "clamp(110px, 24vw, 180px)", objectFit: "contain" }} />
                </div>
              </div>
              <p style={{ margin: 0, fontSize: "clamp(13px, 2.5vw, 15px)", color: "#525252" }}>Completa tus datos para empezar.</p>
            </div>

            <form onSubmit={onSubmit} className="auth-form" style={{ display: "grid" as const, gap: 18, width: "100%", maxWidth: AUTH_FORM_MAX_WIDTH, margin: "0 auto", minWidth: 0 }}>
              <div>
                <Label htmlFor="fullName">Nombre de usuario</Label>
                <TextField id="fullName" name="fullName" placeholder="nombre_de_usuario" required value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <TextField id="email" name="email" type="email" placeholder="tu@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
              <div>
                <div style={{ display: "flex" as const, justifyContent: "space-between" as const, alignItems: "end" }}>
                  <Label htmlFor="password">Contraseña</Label>
                  <button type="button" onClick={() => setShowPass((s) => !s)} style={{ background: "transparent", border: "none", color: linkColor, fontSize: 12, cursor: "pointer" }}>
                    {showPass ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                <TextField id="password" name="password" type={showPass ? "text" : "password"} placeholder="Mínimo 6 caracteres" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
              </div>
              <div style={{ display: "flex" as const, gap: 10, alignItems: "flex-start" }}>
                <input id="accepted" name="accepted" type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} style={{ marginTop: 2 }} />
                <label htmlFor="accepted" style={{ fontSize: 12, color: "#444" }}>Acepto los términos y condiciones</label>
              </div>
              <Button type="submit" disabled={state.loading || googleLoading} loading={state.loading}>{state.loading ? "Creando cuenta..." : "Registrarme"}</Button>

              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center", margin: "16px 0" }}>
                <div style={{ height: 1, background: "rgba(11, 113, 254, 0.2)" }} />
                <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>o continúa con</span>
                <div style={{ height: 1, background: "rgba(11, 113, 254, 0.2)" }} />
              </div>

              <button
                type="button"
                className="auth-google-btn"
                onClick={handleGoogleSignUp}
                disabled={state.loading || googleLoading}
                style={{
                  height: AUTH_CONTROL_HEIGHT,
                  minHeight: AUTH_CONTROL_HEIGHT,
                  borderRadius: 12,
                  border: "1px solid rgba(11, 113, 254, 0.25)",
                  width: "100%",
                  minWidth: 0,
                  background: "#fff",
                  color: "#333",
                  fontWeight: 600,
                  cursor: googleLoading ? "wait" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  transition: "all 0.2s ease",
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
                  <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
                  <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05" />
                  <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335" />
                </svg>
                {googleLoading ? "Redirigiendo..." : "Continuar con Google"}
              </button>

              <div style={{ textAlign: "center", fontSize: 14, marginTop: 8 }}>
                ¿Ya tienes cuenta? <a href="/login" target="_blank" rel="noopener noreferrer" className="auth-link" style={{ color: "#0B71FE", fontWeight: 700, textDecoration: "none", transition: "color 0.2s ease" }}>Inicia sesión</a>
              </div>
            </form>

            {state.message && (
              <div role="status" style={{ marginTop: 16, padding: "12px 16px", borderRadius: 12, background: state.success ? "rgba(5, 150, 105, 0.1)" : "rgba(220, 38, 38, 0.08)", border: state.success ? "1px solid rgba(5, 150, 105, 0.3)" : "1px solid rgba(220, 38, 38, 0.2)", color: state.success ? "#047857" : "#b91c1c", fontSize: 14, fontWeight: 500, wordBreak: "break-word", overflowWrap: "anywhere", whiteSpace: "pre-wrap" }}>
                {state.message}
              </div>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: 24, color: "#6b7280", fontSize: 13 }}>
            © {new Date().getFullYear()} {brandName}. Todos los derechos reservados.
            <div style={{ marginTop: 10 }}>
              <Link href="/bizen/terminos" className="auth-link" style={{ color: "#0B71FE", textDecoration: "none", marginRight: 20, fontWeight: 500, transition: "color 0.2s ease" }}>Términos</Link>
              <Link href="/bizen/privacidad" className="auth-link" style={{ color: "#0B71FE", textDecoration: "none", fontWeight: 500, transition: "color 0.2s ease" }}>Aviso de Privacidad</Link>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .auth-page .auth-form { box-sizing: border-box; }
        .auth-page .auth-form > * { min-width: 0; }
        .auth-page .auth-form .auth-input,
        .auth-page .auth-form button[type="submit"],
        .auth-page .auth-form .auth-google-btn,
        .auth-page .auth-form .auth-secondary-btn {
          width: 100% !important;
          min-width: 0 !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          margin: 0 !important;
        }
        .auth-page .auth-form button[type="submit"] { border: 1px solid transparent !important; }
        .auth-page .auth-link:hover { color: #1e40af !important; text-decoration: underline !important; }
        .auth-page .auth-input:hover { border-color: rgba(11, 113, 254, 0.4) !important; background: #eef6ff !important; }
        .auth-page .auth-google-btn:hover:not(:disabled) { background: #f5f9ff !important; border-color: rgba(11, 113, 254, 0.4) !important; box-shadow: 0 4px 12px rgba(11, 113, 254, 0.15) !important; }
        .auth-page .auth-form button[type="submit"]:hover:not(:disabled) { filter: brightness(1.05); box-shadow: 0 8px 20px rgba(11, 113, 254, 0.25) !important; }
        @keyframes shimmer-text { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes shimmer-button { 0% { background-position: 0% 0%; } 50% { background-position: 100% 0%; } 100% { background-position: 0% 0%; } }
        @media (max-width: 1024px) {
          .auth-page .auth-content {
            flex-direction: column !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </main>
  )
}



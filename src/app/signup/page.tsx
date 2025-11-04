"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClientMicrocred } from "@/lib/supabase/client-microcred"

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options?: { action: string }) => Promise<string>
    }
  }
}

const brandName = "BIZEN"
const logoSrc = "/bizen-logo.png"
const bgColor = "#FFFFFF"
const linkColor = "#0E4A7A"

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
  return <label htmlFor={htmlFor} style={{ display: "block" as const, fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 6 }}>{children}</label>
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

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
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
  const [recaptchaLoaded, setRecaptchaLoaded] = React.useState(false)
  const router = useRouter()
  const supabase = createClientMicrocred()

  React.useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => setRecaptchaLoaded(true)
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
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
        setTimeout(() => router.push('/login'), 2000)
      }
    } catch (err) {
      setState({ success: false, message: 'Error de autenticación. Intenta de nuevo', errors: {}, loading: false })
    }
  }

  return (
    <main style={{ background: bgColor, minHeight: "100dvh", padding: 24, display: "grid" as const, placeItems: "center" }}>
      <div style={{
        position: "fixed" as const, top: 0, left: 0, right: 0, height: 64,
        display: "flex" as const, alignItems: "center" as const, justifyContent: "flex-start" as const,
        background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.08)", color: "#111",
        paddingLeft: 24,
      }}>
        <Link href="/bizen" style={{ display: "flex" as const, alignItems: "center" as const, gap: 10, textDecoration: "none", color: "inherit" }}>
          <Image src={logoSrc} alt={`${brandName} logo`} width={40} height={40} priority />
          <strong style={{ fontSize: 20, color: "#0B71FE", fontFamily: 'Montserrat, sans-serif' }}>{brandName}</strong>
        </Link>
      </div>

      <div style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        paddingTop: 80,
        display: "flex" as const,
        flexDirection: "row" as const,
        alignItems: "center" as const,
        justifyContent: "center" as const,
        gap: 60,
      }}>
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
              fontWeight: 700
            }}>Crear cuenta</h1>
            <p style={{ margin: 0, fontSize: 16, color: "#525252" }}>
              Bienvenido a <strong>{brandName}</strong>. Completa tus datos para empezar.
            </p>
          </div>

          <form onSubmit={onSubmit} style={{ display: "grid" as const, gap: 14, maxWidth: 360, margin: "0 auto" }}>
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
            <Button type="submit" disabled={state.loading} loading={state.loading}>{state.loading ? "Creando cuenta..." : "Registrarme"}</Button>
            <div style={{ textAlign: "center", fontSize: 14, marginTop: 8 }}>
              ¿Ya tienes cuenta? <a href="/login" style={{ color: "#0B71FE", fontWeight: 700, textDecoration: "none" }}>Inicia sesión</a>
            </div>
          </form>

          {state.message && (
            <p role="status" style={{ marginTop: 14, wordBreak: "break-word", overflowWrap: "anywhere", whiteSpace: "pre-wrap", color: state.success ? '#059669' : '#dc2626' }}>
              {state.message}
            </p>
          )}
        </Card>

        <div style={{ textAlign: "center", marginTop: 16, color: "#666", fontSize: 12 }}>
          © {new Date().getFullYear()} {brandName}. Todos los derechos reservados.
          <div style={{ marginTop: 8 }}>
            <Link href="/bizen/terminos" style={{ color: "#0B71FE", textDecoration: "underline", marginRight: 16 }}>Términos</Link>
            <Link href="/bizen/privacidad" style={{ color: "#0B71FE", textDecoration: "underline" }}>Aviso de Privacidad</Link>
          </div>
        </div>
        </div>

        <div style={{ flex: "0 0 auto", width: "100%", maxWidth: "600px", display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", background: "white", borderRadius: "32px", padding: "50px", boxShadow: "0 24px 64px rgba(15, 98, 254, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08)" }}>
            <Image src="/Billy looking at the right.jpeg" alt="Billy" width={320} height={320} style={{ display: "block", borderRadius: "16px" }} priority />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer-text { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes shimmer-button { 0% { background-position: 0% 0%; } 50% { background-position: 100% 0%; } 100% { background-position: 0% 0%; } }
      `}</style>
    </main>
  )
}



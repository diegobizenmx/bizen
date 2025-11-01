// src/app/api/progress/reset/route.ts
import { NextResponse, type NextRequest } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import type { Database } from "../../../../types/supabase" // desde /api/progress/reset a /types: 4 niveles

type CookieOpts = Pick<
  CookieOptions,
  "domain" | "path" | "maxAge" | "expires" | "sameSite" | "secure" | "httpOnly"
>

export async function POST(request: NextRequest) {
  // Carrier donde Supabase escribirá Set-Cookie (evita usar cookies() de next/headers)
  const cookieCarrier = NextResponse.next()

  // Cliente de Supabase tipado (esquema "public") con lectura/escritura de cookies
  const supabase = createServerClient<Database, "public">(
    (process.env.NEXT_PUBLIC_SUPABASE_URL_BIZEN || process.env.NEXT_PUBLIC_SUPABASE_URL)!,
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_BIZEN || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieCarrier.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Autenticación
  const { data: { user }, error: userErr } = await supabase.auth.getUser()
  if (userErr) {
    return NextResponse.json(
      { error: "auth_error", details: userErr.message },
      { status: 401, headers: cookieCarrier.headers }
    )
  }
  if (!user) {
    return NextResponse.json(
      { error: "not_authenticated" },
      { status: 401, headers: cookieCarrier.headers }
    )
  }

  // Body & validación
  const body = (await request.json().catch(() => null)) as { moduleId?: number } | null
  const moduleId = Number(body?.moduleId)
  if (!Number.isFinite(moduleId)) {
    return NextResponse.json(
      { error: "bad_request" },
      { status: 400, headers: cookieCarrier.headers }
    )
  }

  // 1) Borra histórico del módulo
  {
    const { error } = await supabase
      .from("user_section_completion")
      .delete()
      .eq("user_id", user.id)
      .eq("module_id", moduleId)
    if (error) {
      return NextResponse.json(
        { error: "db_error_delete", details: error.message },
        { status: 500, headers: cookieCarrier.headers }
      )
    }
  }

  // 2) Vuelve a sección 1 y no-completado
  {
    const { error } = await supabase
      .from("user_module_progress")
      .upsert(
        {
          user_id: user.id,
          module_id: moduleId,
          unlocked_section: 1,
          completed: false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,module_id" }
      )
    if (error) {
      return NextResponse.json(
        { error: "db_error_upsert", details: error.message },
        { status: 500, headers: cookieCarrier.headers }
      )
    }
  }

  // Devuelve headers del carrier para propagar Set-Cookie
  return NextResponse.json(
    { moduleId, sectionMax: 1 },
    { headers: cookieCarrier.headers }
  )
}

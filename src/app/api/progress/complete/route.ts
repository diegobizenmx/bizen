import { NextResponse, type NextRequest } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import type { Database } from "../../../../types/supabase"
import { prisma } from "@/lib/prisma"

type CookieOpts = Pick<
  CookieOptions,
  "domain" | "path" | "maxAge" | "expires" | "sameSite" | "secure" | "httpOnly"
>

export async function POST(request: NextRequest) {
  // Carrier para las Set-Cookie que genere Supabase
  const cookieCarrier = NextResponse.next()

  // 👇 Fuerza el esquema "public" en el tipado del cliente
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

  // Usuario
  const { data: { user }, error: userErr } = await supabase.auth.getUser()
  if (userErr) {
    return NextResponse.json({ error: "auth_error", details: userErr.message }, { status: 401, headers: cookieCarrier.headers })
  }
  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401, headers: cookieCarrier.headers })
  }

  // Body + validación
  const body = (await request.json()) as { userId: string; sectionId: string; status: string; percent: number }
  const { userId, sectionId, status, percent } = body
  
  if (!userId || !sectionId || !status) {
    return NextResponse.json({ error: "bad_request" }, { status: 400, headers: cookieCarrier.headers })
  }

  try {
    // Upsert progress record using Prisma
    await prisma.progress.upsert({
      where: {
        userId_sectionId: {
          userId: userId,
          sectionId: sectionId
        }
      },
      update: {
        status: status,
        percent: percent,
        completedAt: status === 'completed' ? new Date() : null
      },
      create: {
        userId: userId,
        sectionId: sectionId,
        status: status,
        percent: percent,
        completedAt: status === 'completed' ? new Date() : null
      }
    })

    return NextResponse.json(
      { ok: true, message: "Progress updated successfully" },
      { status: 200, headers: cookieCarrier.headers }
    )
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: "db_error", details: "Failed to update progress" },
      { status: 500, headers: cookieCarrier.headers }
    )
  }
}

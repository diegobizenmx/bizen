import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Determine which Supabase instance to use based on route
  const isBIZENRoute = request.nextUrl.pathname.startsWith('/bizen') || 
                       request.nextUrl.pathname.startsWith('/apps/bizen')
  
  const supabaseUrl = isBIZENRoute 
    ? (process.env.NEXT_PUBLIC_SUPABASE_URL_BIZEN || process.env.NEXT_PUBLIC_SUPABASE_URL!)
    : process.env.NEXT_PUBLIC_SUPABASE_URL!
    
  const supabaseKey = isBIZENRoute
    ? (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_BIZEN || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired - this is critical for SSR
  const { data: { session } } = await supabase.auth.getSession()
  
  // Debug logging
  console.log('[MIDDLEWARE] Path:', request.nextUrl.pathname)
  console.log('[MIDDLEWARE] Has session:', !!session)
  console.log('[MIDDLEWARE] User:', session?.user?.email)

  // Protect Microcredential app routes from BIZEN users
  const isMicrocredentialRoute = request.nextUrl.pathname.startsWith('/module') || 
                                  request.nextUrl.pathname.startsWith('/dashboard') ||
                                  request.nextUrl.pathname.startsWith('/welcome')
  
  if (isMicrocredentialRoute && session?.user?.email) {
    const userEmail = session.user.email
    const isMondragonUser = userEmail.endsWith('@mondragonmexico.edu.mx') || 
                             userEmail.endsWith('@mondragon.edu.mx')
    
    // Check if user is from BIZEN app
    const appSource = session.user.user_metadata?.app_source
    
    if (appSource === 'bizen' || !isMondragonUser) {
      console.log('[MIDDLEWARE] Blocking non-Mondragon user from Microcredential:', userEmail)
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Protect BIZEN app routes from Microcredential users
  if (request.nextUrl.pathname.startsWith('/bizen') && session?.user?.email) {
    const userEmail = session.user.email
    const isMondragonUser = userEmail.endsWith('@mondragonmexico.edu.mx') || 
                             userEmail.endsWith('@mondragon.edu.mx')
    const appSource = session.user.user_metadata?.app_source
    
    if (appSource === 'microcredential' && isMondragonUser) {
      // Allow Mondragon users to access both apps
      // but track which app they're using
    } else if (isMondragonUser && !appSource) {
      // Default Mondragon users without app_source should go to Microcredential
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}


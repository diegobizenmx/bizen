import { createSupabaseServer } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createSupabaseServer()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('[BIZEN Callback] Auth error:', error)
      return NextResponse.redirect(`${origin}/login?error=auth_error`)
    }

    // Auto-create profile if doesn't exist
    if (data?.user) {
      try {
        const existingProfile = await prisma.profile.findUnique({
          where: { userId: data.user.id }
        })

        if (!existingProfile) {
          console.log('[BIZEN Callback] Creating profile for new user:', data.user.email)
          await prisma.profile.create({
            data: {
              userId: data.user.id,
              fullName: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Student',
              role: 'student', // Default role
              schoolId: null // Can be set later by admin
            }
          })
          console.log('[BIZEN Callback] ✅ Profile created')
        }
      } catch (profileError) {
        console.error('[BIZEN Callback] Profile creation error:', profileError)
        // Don't block login if profile creation fails
      }
    }

    return NextResponse.redirect(`${origin}/bizen/dashboard`)
  }

  return NextResponse.redirect(`${origin}/login`)
}


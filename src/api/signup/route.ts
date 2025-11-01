import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 API route signup called')
    
    const formData = await request.formData()
    const rawData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      accepted: formData.get('accepted') === 'on'
    }
    
    console.log('📝 Form data received:', { 
      fullName: rawData.fullName, 
      email: rawData.email, 
      passwordLength: rawData.password?.length,
      accepted: rawData.accepted 
    })

    // Basic validation
    if (!rawData.fullName || !rawData.email || !rawData.password || !rawData.accepted) {
      return NextResponse.json({
        success: false,
        message: 'Por favor completa todos los campos requeridos',
        errors: {}
      })
    }

    // Validate email domain - only allow Mondragón emails
    if (!rawData.email.endsWith('@mondragonmexico.edu.mx')) {
      return NextResponse.json({
        success: false,
        message: '🎓 Solo se permiten correos institucionales de Mondragón (@mondragonmexico.edu.mx)',
        errors: {
          email: ['Debes usar tu correo institucional de Mondragón']
        }
      })
    }

    console.log('🔧 Creating Supabase client...')
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL_BIZEN || process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_BIZEN || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    console.log('✅ Supabase client created')
    
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    console.log('🌐 Origin:', origin)
    
    console.log('📤 Calling Supabase signUp...')
    const { data, error } = await supabase.auth.signUp({
      email: rawData.email,
      password: rawData.password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: { full_name: rawData.fullName }
      }
    })
    
    console.log('📥 Supabase response:', { 
      hasData: !!data, 
      hasError: !!error,
      errorMessage: error?.message 
    })

    if (error) {
      console.error('Signup error:', error)
      
      // Handle specific error cases
      let errorMessage = 'Error de autenticación. Intenta de nuevo'
      
      if (error.message.includes('User already registered') || error.message.includes('user_already_exists')) {
        errorMessage = 'Este correo ya está registrado. Si ya tienes una cuenta, ve a la página de inicio de sesión.'
      } else if (error.message.includes('Invalid email')) {
        errorMessage = 'El formato del correo no es válido'
      } else if (error.message.includes('Password should be at least')) {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres'
      } else if (error.message.includes('Email rate limit exceeded')) {
        errorMessage = 'Demasiados intentos. Espera un momento antes de intentar de nuevo'
      }
      
      return NextResponse.json({
        success: false,
        message: errorMessage,
        errors: {}
      })
    }

    // Check if user was created and has a session
    if (data?.session && data?.user) {
      console.log('✅ User signed up and session created - auto-login successful')
      return NextResponse.json({
        success: true,
        message: '✅ ¡Cuenta creada exitosamente! Redirigiendo...',
        redirect: '/welcome'
      })
    }

    const needsConfirmation = data?.user && !data?.user?.email_confirmed_at && data?.user?.identities?.length === 0

    if (needsConfirmation) {
      return NextResponse.json({
        success: true,
        message: '✅ Cuenta creada. Te enviamos un correo de verificación.\n\n📧 Revisa tu bandeja de entrada y carpeta de spam.\n\n⚠️ Si no recibes el correo en 5 minutos, usa "Reenviar verificación".',
        errors: {}
      })
    } else if (data?.user?.email_confirmed_at) {
      return NextResponse.json({
        success: true,
        message: '✅ ¡Cuenta creada exitosamente! Puedes iniciar sesión ahora.',
        errors: {}
      })
    } else {
      return NextResponse.json({
        success: true,
        message: '✅ Cuenta creada. Verifica tu correo para continuar.',
        errors: {}
      })
    }
  } catch (err) {
    console.error('Signup exception:', err)
    return NextResponse.json({
      success: false,
      message: 'Error de autenticación. Intenta de nuevo',
      errors: {}
    })
  }
}

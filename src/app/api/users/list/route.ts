import { createSupabaseServer } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseServer()
    
    // Get current user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all users from auth.users table
    // Note: This requires admin privileges or a service role key
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers()
    
    if (usersError) {
      return NextResponse.json({ error: usersError.message }, { status: 500 })
    }

    // Separate users by app_source metadata
    const bizenUsers = users.filter(user => 
      user.user_metadata?.app_source === "bizen"
    )
    
    const microcredentialUsers = users.filter(user => 
      user.user_metadata?.app_source === "microcredential" || 
      (user.user_metadata?.app_source !== "bizen" && user.email?.endsWith("@mondragon.edu.mx"))
    )

    return NextResponse.json({
      bizen: bizenUsers,
      microcredential: microcredentialUsers,
      total: users.length
    })
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "An error occurred" 
    }, { status: 500 })
  }
}


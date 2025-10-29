import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"

export async function GET() {
  try {
    // Try to create Supabase client
    let supabase
    let user
    
    try {
      supabase = await createSupabaseServer()
      const result = await supabase.auth.getUser()
      user = result.data.user
    } catch (supabaseError) {
      console.error("Supabase error:", supabaseError)
      // Return default unlocked modules if Supabase fails
      return NextResponse.json({ 
        success: true,
        unlockedModules: [1, 2, 3, 4, 5, 6],
        warning: "Supabase unavailable - all modules unlocked by default"
      })
    }

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    try {
      // Import prisma dynamically to handle connection issues
      const prisma = (await import("@/lib/prisma")).default
      
      // Get all module progress for the user
      const moduleProgress = await prisma.userModuleProgress.findMany({
        where: {
          userId: user.id
        }
      })

      // Check which modules are unlocked and completed
      // Module 1 is always unlocked
      const unlockedModules = [1]
      const completedModules: number[] = []

      // Check which modules are completed
      for (const progress of moduleProgress) {
        if (progress.completed) {
          completedModules.push(progress.moduleId)
        }
      }

      // For modules 2-6, check if previous module is completed
      for (let moduleId = 2; moduleId <= 6; moduleId++) {
        const previousModuleId = moduleId - 1
        const previousModuleProgress = moduleProgress.find(p => p.moduleId === previousModuleId)
        
        // A module is unlocked if the previous module is marked as completed
        if (previousModuleProgress?.completed) {
          unlockedModules.push(moduleId)
        } else {
          // If previous module is not completed, stop checking
          break
        }
      }
      
      console.log("🔍 Unlocked modules:", unlockedModules)
      console.log("🔍 Completed modules:", completedModules)

      return NextResponse.json({ 
        success: true,
        unlockedModules,
        completedModules
      })
    } catch (dbError) {
      console.warn("⚠️ Database error checking modules, returning default (all unlocked):", dbError)
      // Return all modules as unlocked if database is unavailable
      return NextResponse.json({ 
        success: true,
        unlockedModules: [1, 2, 3, 4, 5, 6],
        warning: "Database unavailable - all modules unlocked by default"
      })
    }
  } catch (error) {
    console.error("Error checking unlocked modules:", error)
    // Return default unlocked modules on error
    return NextResponse.json({ 
      success: true,
      unlockedModules: [1, 2, 3, 4, 5, 6],
      error: "Error occurred, all modules unlocked by default"
    })
  }
}


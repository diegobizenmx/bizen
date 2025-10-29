// src/app/api/progress/route.ts
import { NextResponse, type NextRequest } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    console.log("📊 GET /api/progress called");
    
    const { searchParams } = new URL(request.url)
    const moduleId = Number(searchParams.get("moduleId"))

    console.log("  moduleId:", moduleId);

    if (!Number.isFinite(moduleId)) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 })
    }

    console.log("  Getting user...");
    
    const supabase = await createSupabaseServer()
    const { data: { user }, error: userErr } = await supabase.auth.getUser()
    
    if (userErr || !user) {
      console.error("  ❌ Auth error or no user");
      return NextResponse.json(
        { error: "not_authenticated" },
        { status: 401 }
      )
    }

    console.log("  ✅ User:", user.id);
    console.log("  Fetching section completions...");

    // Get all section completions for this module from Prisma
    const sectionCompletions = await prisma.sectionCompletion.findMany({
      where: {
        userId: user.id,
        moduleId: moduleId,
      },
      orderBy: {
        sectionId: 'asc',
      },
    });

    console.log("  Section completions:", sectionCompletions);

    // Calculate which sections are completed
    const completedSections = sectionCompletions
      .filter(sc => sc.isComplete)
      .map(sc => sc.sectionId);

    // Calculate max unlocked section
    // Section 1 is always unlocked
    // Section N+1 is unlocked if Section N is complete
    let sectionMax = 1;
    
    // Check each section in order
    for (let i = 1; i <= 3; i++) {
      const completion = sectionCompletions.find(sc => sc.sectionId === i);
      if (completion?.isComplete) {
        // This section is complete, so next section is unlocked
        sectionMax = Math.max(sectionMax, i + 1);
      }
    }

    // Cap at 3 sections max
    sectionMax = Math.min(sectionMax, 3);

    console.log("  📤 Returning: sectionMax=", sectionMax, "completedSections=", completedSections);

    return NextResponse.json({ 
      moduleId, 
      sectionMax, 
      completedSections 
    });
  } catch (error) {
    console.error("❌ /api/progress error:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack',
    });
    
    return NextResponse.json(
      { 
        error: "internal_error", 
        message: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    )
  }
}

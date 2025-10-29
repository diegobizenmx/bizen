import { createSupabaseServer } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 [check-access] API called");
    
    const supabase = await createSupabaseServer();
    console.log("✅ [check-access] Supabase client created");
    
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("👤 [check-access] User:", user?.id || "none");

    if (!user) {
      console.log("❌ [check-access] No user - returning 401");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("📦 [check-access] Request body:", body);
    
    const { moduleId, sectionId } = body;

    if (!moduleId || !sectionId) {
      console.log("❌ [check-access] Missing fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const moduleIdNum = parseInt(moduleId);
    const sectionIdNum = parseInt(sectionId);
    console.log(`🎯 [check-access] Checking M${moduleIdNum}S${sectionIdNum}`);

    // SIMPLIFIED: Check user_module_progress.unlockedSection instead of section_completions
    console.log(`🔎 [check-access] Checking M${moduleIdNum}S${sectionIdNum}`);
    
    // Get module progress
    const moduleProgress = await prisma.userModuleProgress.findUnique({
      where: {
        userId_moduleId: {
          userId: user.id,
          moduleId: moduleIdNum,
        },
      },
    });

    console.log(`📊 [check-access] Module ${moduleIdNum} progress:`, moduleProgress);

    // Default: only section 1 is unlocked if no progress found
    const unlockedSection = moduleProgress?.unlockedSection || 1;
    const hasAccess = sectionIdNum <= unlockedSection;

    console.log(`✨ [check-access] Section ${sectionIdNum} ${hasAccess ? 'UNLOCKED' : 'LOCKED'} (unlocked up to: ${unlockedSection})`);

    return NextResponse.json({
      success: true,
      hasAccess,
      unlockedSection,
      previousSection: {
        moduleId: moduleIdNum,
        sectionId: sectionIdNum - 1,
      },
      reason: hasAccess
        ? `Section ${sectionIdNum} is unlocked`
        : `Only sections 1-${unlockedSection} are unlocked`,
    });
  } catch (error: any) {
    console.error("❌ [check-access] Error:", error);
    console.error("❌ [check-access] Full error object:", JSON.stringify(error, null, 2));
    console.error("❌ [check-access] Error details:", {
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
      name: error?.name,
      stack: error?.stack,
    });
    return NextResponse.json(
      { 
        error: "Failed to check access",
        details: error?.message || String(error),
        code: error?.code,
        meta: error?.meta,
      },
      { status: 500 }
    );
  }
}


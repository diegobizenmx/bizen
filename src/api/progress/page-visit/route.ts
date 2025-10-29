import { createSupabaseServer } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("Page visit tracking: User not authenticated");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { moduleId, sectionId, pageNumber } = body;

    if (!moduleId || !sectionId || pageNumber === undefined) {
      console.error("Page visit tracking: Missing required fields", { body });
      return NextResponse.json(
        { error: "Missing required fields", received: body },
        { status: 400 }
      );
    }

    const parsedModuleId = Number(moduleId);
    const parsedSectionId = Number(sectionId);
    const parsedPageNumber = Number(pageNumber);

    if (isNaN(parsedModuleId) || isNaN(parsedSectionId) || isNaN(parsedPageNumber)) {
      console.error("Page visit tracking: Invalid number format", {
        moduleId,
        sectionId,
        pageNumber,
      });
      return NextResponse.json(
        { error: "Invalid number format" },
        { status: 400 }
      );
    }

    // Record the page visit
    await prisma.pageVisit.create({
      data: {
        userId: user.id,
        moduleId: parsedModuleId,
        sectionId: parsedSectionId,
        pageNumber: parsedPageNumber,
      },
    });

    // Update or create section completion tracking
    const sectionCompletion = await prisma.sectionCompletion.upsert({
      where: {
        userId_moduleId_sectionId: {
          userId: user.id,
          moduleId: parsedModuleId,
          sectionId: parsedSectionId,
        },
      },
      update: {
        pagesVisited: {
          increment: 1,
        },
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        moduleId: parsedModuleId,
        sectionId: parsedSectionId,
        totalPages: 0, // Will be updated by the client
        pagesVisited: 1,
        quizzesTotal: 0,
        quizzesCompleted: 0,
        isComplete: false,
      },
    });

    return NextResponse.json({
      success: true,
      sectionCompletion,
    });
  } catch (error: any) {
    console.error("Error tracking page visit:", {
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
      stack: error?.stack,
    });
    return NextResponse.json(
      { 
        error: "Failed to track page visit",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}


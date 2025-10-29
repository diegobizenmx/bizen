import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("✅ TEST ENDPOINT HIT!");
    
    const body = await request.json().catch(() => ({}))
    console.log("Body:", body);
    
    return NextResponse.json({
      success: true,
      message: "Test endpoint working!",
      received: body
    })
  } catch (error) {
    console.error("❌ Test endpoint error:", error);
    return NextResponse.json(
      { error: "Test failed", details: String(error) },
      { status: 500 }
    )
  }
}



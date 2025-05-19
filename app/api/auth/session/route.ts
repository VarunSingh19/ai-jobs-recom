import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ authenticated: false, session: null })
    }

    return NextResponse.json({
      authenticated: true,
      session,
    })
  } catch (error) {
    console.error("Session error:", error)
    return NextResponse.json(
      {
        error: "Failed to get session",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

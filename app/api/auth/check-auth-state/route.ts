import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { cookies } from "next/headers"
import { authOptions } from "@/lib/auth"

// This endpoint helps diagnose authentication state issues
export async function GET() {
  try {
    // Get the session
    const session = await getServerSession(authOptions)

    // Get all cookies
    const cookieStore = cookies()
    const allCookies = cookieStore.getAll()

    // Count auth-related cookies
    const authCookies = allCookies.filter(
      (cookie) => cookie.name.includes("next-auth") || cookie.name.includes("session"),
    )

    return NextResponse.json(
      {
        authenticated: !!session,
        sessionExists: !!session,
        cookieCount: allCookies.length,
        authCookieCount: authCookies.length,
        timestamp: new Date().toISOString(),
        // Don't include sensitive data
        sessionInfo: session
          ? {
              expires: session.expires,
              hasUser: !!session.user,
              userFields: session.user ? Object.keys(session.user) : [],
            }
          : null,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    )
  } catch (error) {
    console.error("Auth state check error:", error)
    return NextResponse.json(
      {
        error: "Failed to check auth state",
        errorMessage: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

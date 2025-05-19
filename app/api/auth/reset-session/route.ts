import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// This is a nuclear option to completely reset the session state
export async function POST() {
  try {
    // Get the cookie store
    const cookieStore = cookies()

    // Get all cookies
    const allCookies = cookieStore.getAll()
    console.log(`Reset session: Found ${allCookies.length} cookies`)

    // Delete all cookies with multiple combinations of options
    for (const cookie of allCookies) {
      // Try different combinations of path and secure flag
      const options = [
        { name: cookie.name },
        { name: cookie.name, path: "/" },
        { name: cookie.name, path: "/", secure: true },
        { name: cookie.name, path: "/api" },
        { name: cookie.name, path: "/api/auth" },
      ]

      for (const option of options) {
        cookieStore.delete(option)
      }

      console.log(`Reset session: Deleted cookie ${cookie.name} with multiple options`)
    }

    // Set cache control headers
    const headers = new Headers()
    headers.append("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0")
    headers.append("Pragma", "no-cache")
    headers.append("Expires", "0")

    return NextResponse.json(
      {
        success: true,
        message: "Session reset successful",
        cookiesCleared: allCookies.length,
        cookieNames: allCookies.map((c) => c.name),
        timestamp: new Date().toISOString(),
      },
      {
        headers,
        status: 200,
      },
    )
  } catch (error) {
    console.error("Session reset error:", error)
    return NextResponse.json(
      {
        error: "An error occurred during session reset",
        errorDetails: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

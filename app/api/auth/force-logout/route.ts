import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// This is a nuclear option to completely destroy all session data
export async function POST() {
  try {
    // Get the cookie store
    const cookieStore = cookies()

    // Get all cookies
    const allCookies = cookieStore.getAll()

    // Log what we're about to delete
    console.log(`Force logout: Clearing ${allCookies.length} cookies`)

    // Clear all cookies with multiple domain/path combinations
    for (const cookie of allCookies) {
      // Delete with default options
      cookieStore.delete(cookie.name)

      // Delete with explicit path
      cookieStore.delete({ name: cookie.name, path: "/" })

      // Delete with explicit path and domain options
      // Note: In server components we can't access the current domain,
      // so we're using common variations
      const cookieOptions = [
        { name: cookie.name, path: "/" },
        { name: cookie.name, path: "/api" },
        { name: cookie.name, path: "/api/auth" },
      ]

      for (const option of cookieOptions) {
        cookieStore.delete(option)
      }
    }

    // Set cache control headers to prevent caching
    const headers = new Headers()
    headers.append("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0")
    headers.append("Pragma", "no-cache")
    headers.append("Expires", "0")
    headers.append("Surrogate-Control", "no-store")

    return NextResponse.json(
      {
        success: true,
        message: "Force logout successful",
        cookiesCleared: allCookies.length,
        timestamp: new Date().toISOString(),
      },
      {
        headers,
        status: 200,
      },
    )
  } catch (error) {
    console.error("Force logout error:", error)
    return NextResponse.json({ error: "An error occurred during force logout" }, { status: 500 })
  }
}

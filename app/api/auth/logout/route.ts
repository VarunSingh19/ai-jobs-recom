import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Get the cookie store
    const cookieStore = cookies()

    // Get all cookies
    const allCookies = cookieStore.getAll()
    console.log(`Logout API: Clearing ${allCookies.length} cookies`)

    // Clear all cookies
    for (const cookie of allCookies) {
      console.log(`Logout API: Deleting cookie: ${cookie.name}`)

      // Delete with default options
      cookieStore.delete(cookie.name)

      // Delete with path
      cookieStore.delete({ name: cookie.name, path: "/" })

      // Try with secure flag
      cookieStore.delete({
        name: cookie.name,
        path: "/",
        secure: true,
      })
    }

    // Specifically target NextAuth cookies with different paths and domains
    const cookiesToClear = [
      "next-auth.session-token",
      "next-auth.callback-url",
      "next-auth.csrf-token",
      "__Secure-next-auth.session-token",
      "__Secure-next-auth.callback-url",
      "__Secure-next-auth.csrf-token",
      "__Host-next-auth.csrf-token",
      "next-auth.pkce.code_verifier",
    ]

    // Clear cookies with different path and domain combinations
    cookiesToClear.forEach((name) => {
      console.log(`Logout API: Specifically targeting cookie: ${name}`)
      cookieStore.delete(name)
      cookieStore.delete({ name, path: "/" })
      cookieStore.delete({ name, path: "/", secure: true })
    })

    // Set cache control headers to prevent caching
    const headers = new Headers()
    headers.append("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0")
    headers.append("Pragma", "no-cache")
    headers.append("Expires", "0")
    headers.append("Surrogate-Control", "no-store")

    return NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
        timestamp: new Date().toISOString(),
        clearedCookies: allCookies.map((c) => c.name),
      },
      {
        headers,
        status: 200,
      },
    )
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "An error occurred during logout" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  console.log(`Middleware: Processing request for path: ${path}`)

  // CRITICAL: Always allow access to login and register pages without any checks
  // This is the most important fix - these routes should NEVER be protected
  if (path === "/login" || path === "/register") {
    console.log(`Middleware: Allowing direct access to public auth page: ${path}`)
    return NextResponse.next()
  }

  // Allow access to public routes without token checks
  if (path === "/" || path.startsWith("/_next") || path.startsWith("/api/auth") || path.includes("favicon")) {
    console.log(`Middleware: Allowing access to public route: ${path}`)
    const response = NextResponse.next()
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
    response.headers.set("Pragma", "no-cache")
    response.headers.set("Expires", "0")
    return response
  }

  try {
    // Get the token with minimal validation to prevent errors
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    console.log(`Middleware: Path ${path}, Token exists: ${!!token}`)

    // If user is not authenticated and trying to access protected routes
    if (!token) {
      if (
        path.startsWith("/profile") ||
        path.startsWith("/jobs") ||
        path.startsWith("/recommendations") ||
        path.startsWith("/admin") ||
        path.startsWith("/applications")
      ) {
        console.log(`Middleware: Redirecting unauthenticated user from ${path} to /login`)
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate")
        return response
      }
      return NextResponse.next()
    }

    // If user is authenticated but trying to access admin pages without admin role
    if (token.role !== "admin" && path.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    const response = NextResponse.next()
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate")
    return response
  } catch (error) {
    console.error("Middleware error:", error)
    // If there's an error, allow access to login and register
    if (path === "/login" || path === "/register") {
      return NextResponse.next()
    }
    // Otherwise redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

// IMPORTANT: Update the matcher to EXCLUDE login and register
// This ensures they're never caught by the middleware protection logic
export const config = {
  matcher: ["/((?!login|register|_next/static|_next/image|favicon.ico).*)"],
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export default function Header() {
  const pathname = usePathname()
  const { user, status, logout } = useAuth()
  const { data: session, status: sessionStatus } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Force re-render on route change to update auth state
  useEffect(() => {
    if (!isClient) return // Skip server-side rendering

    // Check if we're on login or register page
    const isAuthPage = pathname === "/login" || pathname === "/register"

    // Only consider authenticated if:
    // 1. Status is authenticated AND
    // 2. Session exists AND
    // 3. User object exists with an ID
    const authenticated = status === "authenticated" && !!session && !!user?.id

    // If we're on an auth page, we should never show authenticated UI
    const effectiveAuthState = isAuthPage ? false : authenticated

    setIsAuthenticated(effectiveAuthState)

    if (authenticated && user?.role === "admin") {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }

    console.log("Header auth state:", {
      path: pathname,
      isAuthPage,
      status,
      sessionStatus,
      hasSession: !!session,
      hasUser: !!user,
      userId: user?.id,
      authenticated,
      effectiveAuthState,
      isAdmin: user?.role === "admin",
    })
  }, [user, status, session, sessionStatus, pathname, isClient])

  const isActive = (path: string) => pathname === path

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      console.log("Header: Starting logout")
      // Clear client-side storage first
      localStorage.clear()
      sessionStorage.clear()

      // Clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      })

      // Call our custom logout API
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      const data = await response.json()
      console.log("Header: Server logout response:", data)

      // Then use the context logout function
      await logout()

      // Wait a moment to ensure all logout processes complete
      await new Promise((resolve) => setTimeout(resolve, 100))

      console.log("Header: Logout complete, redirecting")
      // Force redirect to login page with logout parameter
      window.location.href = "/login?logout=true&time=" + new Date().getTime()
    } catch (error) {
      console.error("Logout failed:", error)
      // Force redirect to login page if logout fails
      window.location.href = "/login?error=true&time=" + new Date().getTime()
    }
  }

  // Don't render authenticated UI during server-side rendering
  // or when we're on login/register pages
  if (!isClient || pathname === "/login" || pathname === "/register") {
    return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            JobMatch AI
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/login"
              className={`text-sm font-medium ${
                isActive("/login") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Login
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </nav>

          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-600">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <Link
                href="/login"
                className={`text-sm font-medium ${
                  isActive("/login") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={toggleMobileMenu}
              >
                Login
              </Link>
              <Link href="/register" onClick={toggleMobileMenu}>
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    )
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          JobMatch AI
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link
                href="/jobs"
                className={`text-sm font-medium ${
                  isActive("/jobs") || pathname.startsWith("/jobs/")
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Jobs
              </Link>
              <Link
                href="/recommendations"
                className={`text-sm font-medium ${
                  isActive("/recommendations") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Recommendations
              </Link>
              <Link
                href="/applications"
                className={`text-sm font-medium ${
                  isActive("/applications") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                My Applications
              </Link>
              <Link
                href="/profile"
                className={`text-sm font-medium ${
                  isActive("/profile") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Profile
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`text-sm font-medium ${
                    pathname.startsWith("/admin") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Admin
                </Link>
              )}
              <Button variant="outline" onClick={handleLogout} disabled={isLoggingOut}>
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-sm font-medium ${
                  isActive("/login") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Login
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-600">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/jobs"
                  className={`text-sm font-medium ${
                    isActive("/jobs") || pathname.startsWith("/jobs/")
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Jobs
                </Link>
                <Link
                  href="/recommendations"
                  className={`text-sm font-medium ${
                    isActive("/recommendations") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Recommendations
                </Link>
                <Link
                  href="/applications"
                  className={`text-sm font-medium ${
                    isActive("/applications") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  My Applications
                </Link>
                <Link
                  href="/profile"
                  className={`text-sm font-medium ${
                    isActive("/profile") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className={`text-sm font-medium ${
                      pathname.startsWith("/admin") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    Admin
                  </Link>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    toggleMobileMenu()
                    handleLogout()
                  }}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`text-sm font-medium ${
                    isActive("/login") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link href="/register" onClick={toggleMobileMenu}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"
import ForceLogoutButton from "@/components/force-logout-button"
import AuthDebug from "@/components/auth-debug"
import ResetSessionButton from "@/components/reset-session-button"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered")
  const cleared = searchParams.get("cleared")
  const logout = searchParams.get("logout")
  const reset = searchParams.get("reset")
  const { login, status, user } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionDebug, setSessionDebug] = useState<any>(null)
  const [showDebug, setShowDebug] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true)

    // Clear client-side storage on login page load
    localStorage.clear()
    sessionStorage.clear()

    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })

    console.log("Login page: Cleared client-side storage and cookies")
  }, [])

  // Set success message based on URL parameters
  useEffect(() => {
    if (registered === "true") {
      setSuccess("Registration successful! You can now log in.")
    } else if (cleared) {
      setSuccess("Session cleared successfully. You can now log in.")
    } else if (logout) {
      setSuccess("You have been logged out successfully.")
    } else if (reset) {
      setSuccess("Session has been completely reset. You can now log in.")
    }
  }, [registered, cleared, logout, reset])

  // Only redirect if explicitly authenticated with a valid user
  useEffect(() => {
    if (!isClient) return // Skip during server-side rendering

    // Check if we're on the login page after a logout or reset
    const isAfterSessionChange = logout || cleared || reset

    if (isAfterSessionChange) {
      console.log("Login page: After session change, not redirecting")
      return
    }

    // Only redirect if authenticated AND not after logout/reset
    if (status === "authenticated" && user && user.id) {
      console.log("Login page: User is authenticated, redirecting", user)

      // If user is admin, redirect to admin page
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/jobs")
      }
    }
  }, [status, router, user, logout, cleared, reset, isClient])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(formData.email, formData.password)
      if (result.success) {
        setSuccess("Login successful! Redirecting...")

        // Wait a moment before redirecting to ensure session is established
        setTimeout(() => {
          // Force a hard refresh to ensure the session is properly loaded
          window.location.href = user?.role === "admin" ? "/admin" : "/jobs"
        }, 1000)
      } else {
        setError(result.error || "Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const checkSessionDebug = async () => {
    try {
      const response = await fetch("/api/auth/debug-session")
      const data = await response.json()
      setSessionDebug(data)
      setShowDebug(!showDebug)
    } catch (err) {
      console.error("Error checking session debug:", err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        {success && (
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <CheckCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Having trouble logging in?</p>
          <div className="flex flex-col space-y-2 items-center">
            <ForceLogoutButton />
            <ResetSessionButton />
          </div>

          <div className="mt-4">
            <button type="button" onClick={checkSessionDebug} className="text-xs text-gray-500 underline">
              {showDebug ? "Hide Debug Info" : "Show Debug Info"}
            </button>

            {showDebug && sessionDebug && (
              <div className="mt-2 p-3 bg-gray-100 rounded text-left text-xs overflow-auto max-h-40">
                <p>Has Session: {sessionDebug.hasSession ? "Yes" : "No"}</p>
                <p>Cookie Count: {sessionDebug.cookieCount}</p>
                <p>Timestamp: {sessionDebug.timestamp}</p>
                {sessionDebug.cookies && (
                  <div className="mt-1">
                    <p>Cookies:</p>
                    <ul className="list-disc pl-4">
                      {sessionDebug.cookies.map((cookie: any, i: number) => (
                        <li key={i}>
                          {cookie.name}: {cookie.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <AuthDebug />
        </div>
      </div>
    </div>
  )
}

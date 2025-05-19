"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useAuth } from "@/contexts/auth-context"

export default function AuthDebug() {
  const [authState, setAuthState] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const { data: session, status: sessionStatus } = useSession()
  const { user, status: authStatus } = useAuth()

  const checkAuthState = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/check-auth-state")
      const data = await response.json()
      setAuthState(data)
      setShowDebug(true)
    } catch (error) {
      console.error("Error checking auth state:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-4 text-center">
      <Button variant="outline" size="sm" onClick={checkAuthState} disabled={isLoading} className="text-xs">
        {isLoading ? "Checking..." : "Check Auth State"}
      </Button>

      {showDebug && authState && (
        <div className="mt-2 p-3 bg-gray-100 rounded text-left text-xs overflow-auto max-h-60">
          <h4 className="font-bold">Server-side Auth State:</h4>
          <p>Authenticated: {authState.authenticated ? "Yes" : "No"}</p>
          <p>Session Exists: {authState.sessionExists ? "Yes" : "No"}</p>
          <p>Cookie Count: {authState.cookieCount}</p>
          <p>Auth Cookie Count: {authState.authCookieCount}</p>
          <p>Timestamp: {authState.timestamp}</p>

          <h4 className="font-bold mt-2">Client-side Auth State:</h4>
          <p>NextAuth Status: {sessionStatus}</p>
          <p>Context Auth Status: {authStatus}</p>
          <p>Has Session: {session ? "Yes" : "No"}</p>
          <p>Has User in Context: {user ? "Yes" : "No"}</p>

          {authState.error && (
            <div className="mt-2 text-red-500">
              <p>Error: {authState.error}</p>
              <p>Message: {authState.errorMessage}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

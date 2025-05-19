"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ForceLogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleForceLogout = async () => {
    if (!confirm("This will completely clear all session data. Continue?")) {
      return
    }

    setIsLoading(true)
    try {
      // Clear client-side storage
      localStorage.clear()
      sessionStorage.clear()

      // Clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      })

      // Call our nuclear force-logout API
      await fetch("/api/auth/force-logout", {
        method: "POST",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      // Call the regular logout API as well
      await fetch("/api/auth/logout", { method: "POST" })

      // Force a hard refresh to clear any cached state
      window.location.href = "/login?forcecleared=" + new Date().getTime()
    } catch (error) {
      console.error("Force logout error:", error)
      alert("Error during force logout. Try clearing your browser cookies manually.")
      window.location.href = "/login"
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="destructive" onClick={handleForceLogout} disabled={isLoading} className="mt-4">
      {isLoading ? "Clearing Session..." : "Force Clear Session"}
    </Button>
  )
}

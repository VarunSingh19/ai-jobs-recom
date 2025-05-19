"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ResetSessionButton() {
  const [isResetting, setIsResetting] = useState(false)

  const handleResetSession = async () => {
    if (!confirm("This will completely reset your session. Continue?")) {
      return
    }

    setIsResetting(true)
    try {
      // Clear client-side storage
      localStorage.clear()
      sessionStorage.clear()

      // Clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      })

      // Call our reset session API
      const response = await fetch("/api/auth/reset-session", {
        method: "POST",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      const data = await response.json()
      console.log("Session reset response:", data)

      // Force a hard refresh to clear any cached state
      window.location.href = "/login?reset=true&time=" + new Date().getTime()
    } catch (error) {
      console.error("Session reset error:", error)
      alert("Error during session reset. Try clearing your browser cookies manually.")
      window.location.href = "/login"
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <Button
      variant="destructive"
      onClick={handleResetSession}
      disabled={isResetting}
      className="mt-4 bg-red-600 hover:bg-red-700"
    >
      {isResetting ? "Resetting Session..." : "Reset Session (Emergency)"}
    </Button>
  )
}

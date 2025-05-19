"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"

interface AuthContextType {
  user: any
  status: "loading" | "authenticated" | "unauthenticated"
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: any) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  status: "loading",
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => {},
  refreshUserData: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { data: session, status, update } = useSession()
  const [user, setUser] = useState<any>(null)

  // This effect runs whenever the session changes
  useEffect(() => {
    const updateUserData = async () => {
      if (session?.user) {
        try {
          // Fetch the complete user data from the API
          const response = await fetch("/api/user/me")
          if (response.ok) {
            const userData = await response.json()
            setUser({
              ...session.user,
              ...userData,
            })
            console.log("User data updated:", userData)
          } else {
            // If API call fails, just use session data
            setUser(session.user)
            console.log("Using session user data:", session.user)
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error)
          setUser(session.user)
        }
      } else {
        setUser(null)
        console.log("No session, user set to null")
      }
    }

    updateUserData()
  }, [session])

  // Function to manually refresh user data
  const refreshUserData = async () => {
    try {
      if (!session?.user?.id) {
        console.log("Cannot refresh user data: No user ID in session")
        return
      }

      const response = await fetch("/api/user/me")
      if (response.ok) {
        const userData = await response.json()
        setUser((prev: any) => ({
          ...prev,
          ...userData,
        }))
        console.log("User data refreshed:", userData)
      }
    } catch (error) {
      console.error("Failed to refresh user data:", error)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login for:", email)
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (!result) {
        console.error("Login failed: No result returned")
        return { success: false, error: "An unexpected error occurred" }
      }

      if (result.error) {
        console.error("Login failed:", result.error)
        return { success: false, error: result.error }
      }

      console.log("Login successful, updating session")
      // Force refresh the session
      await update()

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "An error occurred during login" }
    }
  }

  const register = async (userData: any) => {
    try {
      console.log("Registering new user:", userData.email)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("Registration failed:", data.error)
        return { success: false, error: data.error }
      }

      console.log("Registration successful")
      return { success: true }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: "An error occurred during registration" }
    }
  }

  // Update the logout function in the AuthProvider component
  const logout = async () => {
    try {
      console.log("Starting logout process")
      // Clear local state first
      setUser(null)

      // Clear all local storage and session storage
      localStorage.clear()
      sessionStorage.clear()

      // Clear all cookies by setting them to expire
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      })

      // Call our custom logout API endpoint to clear cookies server-side
      const logoutResponse = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      const logoutData = await logoutResponse.json()
      console.log("Server logout response:", logoutData)

      // Use NextAuth signOut as a fallback
      await signOut({
        redirect: false,
        callbackUrl: "/login?logout=true",
      })

      console.log("Logout complete, redirecting to login page")

      // Wait a moment to ensure all logout processes complete
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Force a hard refresh to clear any cached state
      window.location.href = "/login?logout=true&time=" + new Date().getTime()
    } catch (error) {
      console.error("Logout error:", error)
      // Force redirect even if there's an error
      window.location.href = "/login?error=true&time=" + new Date().getTime()
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        status: status as "loading" | "authenticated" | "unauthenticated",
        login,
        register,
        logout,
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function ProfileFixPage() {
  const [resumeUrl, setResumeUrl] = useState("")
  const [portfolioUrl, setPortfolioUrl] = useState("")
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setResult(null)
    setIsLoading(true)

    try {
      // Validate URLs if provided
      if (resumeUrl) {
        try {
          new URL(resumeUrl)
        } catch (e) {
          setError("Please enter a valid resume URL")
          setIsLoading(false)
          return
        }
      }

      if (portfolioUrl) {
        try {
          new URL(portfolioUrl)
        } catch (e) {
          setError("Please enter a valid portfolio URL")
          setIsLoading(false)
          return
        }
      }

      // First, check current profile data
      const checkResponse = await fetch("/api/debug/profile")
      const checkData = await checkResponse.json()

      // Update the profile URLs
      const response = await fetch("/api/user/profile-fix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeUrl,
          portfolioUrl,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Profile URLs updated successfully")
        setResult({
          before: checkData,
          after: data,
        })
      } else {
        setError(data.error || "Failed to update profile URLs")
      }
    } catch (err) {
      console.error("Error:", err)
      setError("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const checkProfile = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/debug/profile")
      const data = await response.json()
      setResult({ current: data })
    } catch (err) {
      console.error("Error checking profile:", err)
      setError("Failed to check profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile URL Fix Tool</h1>

        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md mb-6">
          <h2 className="font-semibold">This is a special tool to fix profile URLs</h2>
          <p className="mt-2">Use this if your resume and portfolio URLs aren't saving correctly.</p>
        </div>

        <div className="mb-6">
          <Button onClick={checkProfile} disabled={isLoading}>
            Check Current Profile Data
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700">
              Resume URL
            </label>
            <Input
              id="resumeUrl"
              type="url"
              placeholder="https://example.com/your-resume"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700">
              Portfolio URL
            </label>
            <Input
              id="portfolioUrl"
              type="url"
              placeholder="https://example.com/your-portfolio"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              className="mt-1"
            />
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <CheckCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile URLs"}
          </Button>
        </form>

        {result && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96 text-xs">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

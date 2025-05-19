"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DebugLinksPage() {
  const [linksData, setLinksData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [resumeUrl, setResumeUrl] = useState("")
  const [portfolioUrl, setPortfolioUrl] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const fetchLinksData = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch("/api/debug/links")
      const data = await response.json()

      if (response.ok) {
        setLinksData(data)

        // Set current values in the form
        if (data.dedicatedLinks?.resumeUrl) {
          setResumeUrl(data.dedicatedLinks.resumeUrl)
        } else if (data.userDocumentLinks?.resumeUrl) {
          setResumeUrl(data.userDocumentLinks.resumeUrl)
        }

        if (data.dedicatedLinks?.portfolioUrl) {
          setPortfolioUrl(data.dedicatedLinks.portfolioUrl)
        } else if (data.userDocumentLinks?.portfolioUrl) {
          setPortfolioUrl(data.userDocumentLinks.portfolioUrl)
        }
      } else {
        setError(data.error || "Failed to fetch links data")
      }
    } catch (err) {
      setError("An error occurred while fetching links data")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const updateLinks = async () => {
    setIsUpdating(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/user/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeUrl: resumeUrl || null,
          portfolioUrl: portfolioUrl || null,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Links updated successfully")
        // Refresh the data
        await fetchLinksData()
      } else {
        setError(data.error || "Failed to update links")
      }
    } catch (err) {
      setError("An error occurred while updating links")
      console.error(err)
    } finally {
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    fetchLinksData()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Debug Profile Links</h1>
          <div className="space-x-4">
            <Button onClick={fetchLinksData} disabled={isLoading} variant="outline">
              {isLoading ? "Loading..." : "Refresh Data"}
            </Button>
            <Link href="/profile">
              <Button>Go to Profile</Button>
            </Link>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700 mb-6">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200 text-green-800 mb-6">
            <CheckCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Update Links</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Resume URL
                </label>
                <Input
                  id="resumeUrl"
                  type="url"
                  placeholder="https://example.com/resume"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio URL
                </label>
                <Input
                  id="portfolioUrl"
                  type="url"
                  placeholder="https://example.com/portfolio"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                />
              </div>

              <Button onClick={updateLinks} disabled={isUpdating} className="w-full">
                {isUpdating ? "Updating..." : "Update Links"}
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            {linksData ? (
              <div className="space-y-2">
                <p>
                  <strong>User ID:</strong> {linksData.userId}
                </p>
                <p>
                  <strong>Email:</strong> {linksData.userEmail}
                </p>
                <p>
                  <strong>Name:</strong> {linksData.userName}
                </p>
                <p>
                  <strong>ProfileLinks Collection Exists:</strong> {linksData.collectionExists ? "Yes" : "No"}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">Loading user information...</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Links in ProfileLinks Collection</h2>
            {linksData ? (
              linksData.dedicatedLinks ? (
                <div className="space-y-2">
                  <p>
                    <strong>Resume URL:</strong> {linksData.dedicatedLinks.resumeUrl || "Not set"}
                  </p>
                  <p>
                    <strong>Portfolio URL:</strong> {linksData.dedicatedLinks.portfolioUrl || "Not set"}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {linksData.dedicatedLinks.createdAt
                      ? new Date(linksData.dedicatedLinks.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Updated At:</strong>{" "}
                    {linksData.dedicatedLinks.updatedAt
                      ? new Date(linksData.dedicatedLinks.updatedAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              ) : (
                <p className="text-yellow-600">No links found in ProfileLinks collection</p>
              )
            ) : (
              <p className="text-gray-500">Loading links data...</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Links in User Document</h2>
            {linksData ? (
              <div className="space-y-2">
                <p>
                  <strong>Resume URL:</strong> {linksData.userDocumentLinks.resumeUrl || "Not set"}
                </p>
                <p>
                  <strong>Portfolio URL:</strong> {linksData.userDocumentLinks.portfolioUrl || "Not set"}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">Loading user document links...</p>
            )}
          </div>
        </div>

        {linksData && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">All Collections in Database</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <ul className="list-disc pl-5 space-y-1">
                {linksData.allCollections.map((collection: string) => (
                  <li key={collection}>{collection}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {linksData && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Raw Debug Data</h2>
            <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
              <pre className="text-xs">{JSON.stringify(linksData, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

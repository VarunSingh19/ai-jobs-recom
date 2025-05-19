"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect } from "@/components/ui/multi-select"
import { jobTypes, skillsList } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, LinkIcon, ExternalLink } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user, status, refreshUserData } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    yearsOfExperience: "",
    skills: [] as string[],
    preferredJobType: "",
  })
  const [resumeUrl, setResumeUrl] = useState("")
  const [portfolioUrl, setPortfolioUrl] = useState("")
  const [currentResume, setCurrentResume] = useState<string | null>(null)
  const [currentPortfolio, setCurrentPortfolio] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdatingLinks, setIsUpdatingLinks] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      fetchProfile()
      fetchProfileLinks()
    }
  }, [status, router])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/user/profile")
      if (response.ok) {
        const data = await response.json()
        console.log("Fetched profile data:", data)

        setFormData({
          name: data.name || "",
          email: data.email || "",
          location: data.location || "",
          yearsOfExperience: data.yearsOfExperience?.toString() || "",
          skills: data.skills || [],
          preferredJobType: data.preferredJobType || "",
        })
      } else {
        setError("Failed to fetch profile")
      }
    } catch (err) {
      console.error("Error fetching profile:", err)
      setError("An error occurred while fetching profile")
    }
  }

  const fetchProfileLinks = async () => {
    try {
      const response = await fetch("/api/user/links")
      if (response.ok) {
        const data = await response.json()
        console.log("Fetched profile links:", data)

        if (data.resumeUrl) {
          setCurrentResume(data.resumeUrl)
          setResumeUrl(data.resumeUrl)
        }

        if (data.portfolioUrl) {
          setCurrentPortfolio(data.portfolioUrl)
          setPortfolioUrl(data.portfolioUrl)
        }
      }
    } catch (err) {
      console.error("Error fetching profile links:", err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (selected: string[]) => {
    setFormData((prev) => ({ ...prev, skills: selected }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      // Update profile information
      const profileResponse = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!profileResponse.ok) {
        const data = await profileResponse.json()
        throw new Error(data.error || "Failed to update profile")
      }

      // Update links separately
      await updateLinks()

      setSuccess("Profile updated successfully")
      await refreshUserData()
    } catch (err) {
      console.error("Error updating profile:", err)
      setError(err instanceof Error ? err.message : "An error occurred while updating profile")
    } finally {
      setIsLoading(false)
    }
  }

  const updateLinks = async () => {
    setIsUpdatingLinks(true)
    try {
      // Validate URLs if provided
      if (resumeUrl) {
        try {
          new URL(resumeUrl)
        } catch (e) {
          throw new Error("Please enter a valid resume URL")
        }
      }

      if (portfolioUrl) {
        try {
          new URL(portfolioUrl)
        } catch (e) {
          throw new Error("Please enter a valid portfolio URL")
        }
      }

      const response = await fetch("/api/user/links", {
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
      console.log("Links update response:", data)

      if (response.ok) {
        setCurrentResume(resumeUrl)
        setCurrentPortfolio(portfolioUrl)
      } else {
        throw new Error(data.error || "Failed to update links")
      }
    } catch (err) {
      console.error("Error updating links:", err)
      throw err
    } finally {
      setIsUpdatingLinks(false)
    }
  }

  const handleUpdateLinksOnly = async () => {
    setError("")
    setSuccess("")
    setIsUpdatingLinks(true)

    try {
      // Validate URLs if provided
      if (resumeUrl) {
        try {
          new URL(resumeUrl)
        } catch (e) {
          throw new Error("Please enter a valid resume URL")
        }
      }

      if (portfolioUrl) {
        try {
          new URL(portfolioUrl)
        } catch (e) {
          throw new Error("Please enter a valid portfolio URL")
        }
      }

      console.log("Sending links update:", { resumeUrl, portfolioUrl })

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
      console.log("Links update response:", data)

      if (response.ok) {
        setCurrentResume(resumeUrl || null)
        setCurrentPortfolio(portfolioUrl || null)
        setSuccess("Links updated successfully")

        // Refresh user data to ensure links are updated in the context
        await refreshUserData()
      } else {
        throw new Error(data.error || "Failed to update links")
      }
    } catch (err) {
      console.error("Error updating links:", err)
      setError(err instanceof Error ? err.message : "An error occurred while updating links")
    } finally {
      setIsUpdatingLinks(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        {/* Links Section - Separate from the form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Online Presence</h2>
            <Button variant="outline" size="sm" onClick={handleUpdateLinksOnly} disabled={isUpdatingLinks}>
              {isUpdatingLinks ? "Updating..." : "Update Links Only"}
            </Button>
          </div>

          {currentResume || currentPortfolio ? (
            <div className="space-y-4">
              {currentResume && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <LinkIcon className="h-6 w-6 text-blue-600 mr-2" />
                      <div>
                        <p className="font-medium text-lg">Resume Link</p>
                        <a
                          href={currentResume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          {currentResume.length > 40 ? currentResume.substring(0, 40) + "..." : currentResume}
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentPortfolio && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <LinkIcon className="h-6 w-6 text-blue-600 mr-2" />
                      <div>
                        <p className="font-medium text-lg">Portfolio Link</p>
                        <a
                          href={currentPortfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          {currentPortfolio.length > 40 ? currentPortfolio.substring(0, 40) + "..." : currentPortfolio}
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-md">
              <LinkIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-gray-600">No Links Added</h3>
              <p className="text-gray-500 mt-1 mb-4">
                Add your resume and portfolio links to improve your job applications
              </p>
            </div>
          )}

          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700">
                Resume URL (LinkedIn, Google Drive, etc.)
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
                Portfolio URL (Personal website, GitHub, etc.)
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
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <Input id="email" name="email" type="email" disabled value={formData.email} className="mt-1 bg-gray-100" />
            <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <Input
              id="location"
              name="location"
              type="text"
              required
              value={formData.location}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
              Years of Experience
            </label>
            <Input
              id="yearsOfExperience"
              name="yearsOfExperience"
              type="number"
              min="0"
              max="50"
              required
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <MultiSelect
              options={skillsList.map((skill) => ({ value: skill, label: skill }))}
              selected={formData.skills}
              onChange={handleSkillsChange}
              placeholder="Select skills"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="preferredJobType" className="block text-sm font-medium text-gray-700">
              Preferred Job Type
            </label>
            <Select
              value={formData.preferredJobType}
              onValueChange={(value) => handleSelectChange("preferredJobType", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </div>
    </div>
  )
}

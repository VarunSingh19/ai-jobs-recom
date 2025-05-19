"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect } from "@/components/ui/multi-select"
import { jobTypes, skillsList } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { register, status } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    yearsOfExperience: "",
    skills: [] as string[],
    preferredJobType: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true)

    // Clear client-side storage on register page load
    localStorage.clear()
    sessionStorage.clear()

    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })

    console.log("Register page: Cleared client-side storage and cookies")
  }, [])

  // Only redirect if explicitly authenticated with a valid user
  useEffect(() => {
    if (!isClient) return // Skip during server-side rendering

    if (status === "authenticated") {
      console.log("Register page: User is authenticated, redirecting")
      router.push("/jobs")
    }
  }, [status, router, isClient])

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
    setIsLoading(true)

    // Validate form
    if (formData.skills.length === 0) {
      setError("Please select at least one skill")
      setIsLoading(false)
      return
    }

    if (!formData.preferredJobType) {
      setError("Please select a preferred job type")
      setIsLoading(false)
      return
    }

    try {
      const result = await register(formData)
      if (result.success) {
        router.push("/login?registered=true")
      } else {
        setError(result.error || "Registration failed")
      }
    } catch (err) {
      setError("An error occurred during registration")
      console.error("Registration error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // If we're in the process of checking authentication, show loading
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
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
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1"
              />
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
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

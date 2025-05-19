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
import type { Job } from "@/lib/models"
import JobCard from "@/components/job-card"

export default function JobsPage() {
  const router = useRouter()
  const { status } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    skills: [] as string[],
    jobType: "",
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      fetchJobs()
    }
  }, [status, router])

  const fetchJobs = async () => {
    setIsLoading(true)
    try {
      let url = "/api/jobs"
      const params = new URLSearchParams()

      if (filters.title) params.append("title", filters.title)
      if (filters.location) params.append("location", filters.location)
      if (filters.skills.length > 0) params.append("skills", filters.skills.join(","))
      if (filters.jobType) params.append("jobType", filters.jobType)

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
      } else {
        setError("Failed to fetch jobs")
      }
    } catch (err) {
      setError("An error occurred while fetching jobs")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (selected: string[]) => {
    setFilters((prev) => ({ ...prev, skills: selected }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchJobs()
  }

  const handleClearFilters = () => {
    setFilters({
      title: "",
      location: "",
      skills: [],
      jobType: "",
    })
    fetchJobs()
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
      <h1 className="text-3xl font-bold mb-8">Job Listings</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter Jobs</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                value={filters.title}
                onChange={handleFilterChange}
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
                value={filters.location}
                onChange={handleFilterChange}
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <MultiSelect
                options={skillsList.map((skill) => ({ value: skill, label: skill }))}
                selected={filters.skills}
                onChange={handleSkillsChange}
                placeholder="Select skills"
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                Job Type
              </label>
              <Select value={filters.jobType} onValueChange={(value) => handleSelectChange("jobType", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {jobTypes.slice(0, 3).map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" className="flex-1">
              Search
            </Button>
            <Button type="button" variant="outline" onClick={handleClearFilters} className="flex-1">
              Clear Filters
            </Button>
          </div>
        </form>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

      {isLoading ? (
        <div className="text-center py-12">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600">No jobs found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or check back later</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id?.toString()} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}

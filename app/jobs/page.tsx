"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Search, MapPin, Briefcase, X, Filter, ChevronDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect } from "@/components/ui/multi-select"
import { jobTypes, skillsList } from "@/lib/utils"
import type { Job } from "@/lib/models"
import JobCard from "@/components/job-card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JobsPage() {
  const router = useRouter()
  const { status } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeFilters, setActiveFilters] = useState(0)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    skills: [] as string[],
    jobType: "",
  })
  const [viewMode, setViewMode] = useState("grid")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      fetchJobs()
    }
  }, [status, router])

  useEffect(() => {
    // Count active filters
    let count = 0
    if (filters.title) count++
    if (filters.location) count++
    if (filters.skills.length > 0) count++
    if (filters.jobType) count++
    setActiveFilters(count)
  }, [filters])

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
      setMobileFilterOpen(false) // Close mobile filter after search
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
    setTimeout(() => {
      fetchJobs()
    }, 0)
  }

  const removeFilter = (filterName: string, value?: string) => {
    if (filterName === "skills" && value) {
      setFilters(prev => ({
        ...prev,
        skills: prev.skills.filter(skill => skill !== value)
      }))
    } else {
      setFilters(prev => ({
        ...prev,
        [filterName]: filterName === "skills" ? [] : ""
      }))
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
          <p className="mt-4 text-lg font-medium text-gray-700">Loading your job opportunities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-16">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Find Your Perfect Job</h1>
          <p className="mt-4 text-lg md:text-xl opacity-90 max-w-2xl">
            Browse through thousands of opportunities that match your skills and career goals
          </p>

          {/* Desktop search bar */}
          <div className="hidden md:flex mt-8 bg-white rounded-lg shadow-lg p-1 max-w-4xl">
            <div className="flex-1 flex items-center px-4 border-r border-gray-200">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <Input
                type="text"
                placeholder="Job title or keywords"
                className="border-none shadow-none focus-visible:ring-0 placeholder:text-gray-400"
                value={filters.title}
                onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="flex-1 flex items-center px-4">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <Input
                type="text"
                placeholder="Location"
                className="border-none shadow-none focus-visible:ring-0 placeholder:text-gray-400"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <Button onClick={handleSearch} size="lg" className="m-1 px-8">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile search bar */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search job title or keywords"
              className="pl-10 pr-4 py-6 rounded-lg border-gray-200"
              value={filters.title}
              onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className="flex items-center space-x-3 mt-3">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center space-x-2 border-gray-200"
              onClick={() => setMobileFilterOpen(true)}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFilters > 0 && (
                <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700">
                  {activeFilters}
                </Badge>
              )}
            </Button>
            <Button onClick={handleSearch} className="flex-1">
              Search
            </Button>
          </div>
        </div>

        {/* Filter dialog for mobile */}
        <Dialog open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
          <DialogContent className="sm:max-w-md h-[80vh]">
            <DialogHeader>
              <DialogTitle>Filter Jobs</DialogTitle>
            </DialogHeader>
            <div className="space-y-5 overflow-y-auto px-1 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <Input
                  name="title"
                  type="text"
                  value={filters.title}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <Input
                  name="location"
                  type="text"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <MultiSelect
                  options={skillsList.map((skill) => ({ value: skill, label: skill }))}
                  selected={filters.skills}
                  onChange={handleSkillsChange}
                  placeholder="Select skills"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <Select value={filters.jobType} onValueChange={(value) => handleSelectChange("jobType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {jobTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <Button onClick={() => { fetchJobs(); }}>
                Apply Filters
              </Button>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear All
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Main Content Area */}
        <div className="md:grid md:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                {activeFilters > 0 && (
                  <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-blue-600 hover:text-blue-800">
                    Clear all
                  </Button>
                )}
              </div>

              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      value={filters.title}
                      onChange={handleFilterChange}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      value={filters.location}
                      onChange={handleFilterChange}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                    Skills
                  </label>
                  <MultiSelect
                    options={skillsList.map((skill) => ({ value: skill, label: skill }))}
                    selected={filters.skills}
                    onChange={handleSkillsChange}
                    placeholder="Select skills"
                  />
                </div>

                <div>
                  <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <Select value={filters.jobType} onValueChange={(value) => handleSelectChange("jobType", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {jobTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  Apply Filters
                </Button>
              </form>
            </div>
          </div>

          {/* Jobs Results Area */}
          <div className="md:col-span-3">
            {/* Active filters display */}
            {activeFilters > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.title && (
                  <Badge variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100">
                    <span>Title: {filters.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0 hover:bg-blue-100"
                      onClick={() => removeFilter("title")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}

                {filters.location && (
                  <Badge variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100">
                    <span>Location: {filters.location}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0 hover:bg-blue-100"
                      onClick={() => removeFilter("location")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}

                {filters.jobType && (
                  <Badge variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100">
                    <span>Job Type: {filters.jobType}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0 hover:bg-blue-100"
                      onClick={() => removeFilter("jobType")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}

                {filters.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100">
                    <span>Skill: {skill}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0 hover:bg-blue-100"
                      onClick={() => removeFilter("skills", skill)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            {/* View controls */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {isLoading ? "Finding jobs..." : `${jobs.length} Jobs Found`}
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <Tabs defaultValue="grid" value={viewMode} onValueChange={setViewMode} className="hidden sm:block">
                  <TabsList>
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Select value="newest" disabled>
                  <SelectTrigger className="hidden md:inline-flex w-40">
                    <SelectValue placeholder="Sort by: Newest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Sort by: Newest</SelectItem>
                    <SelectItem value="relevant">Sort by: Relevant</SelectItem>
                    <SelectItem value="salary">Sort by: Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-center">
                <X className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {isLoading ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Loader2 className="h-10 w-10 animate-spin mx-auto text-blue-600 mb-4" />
                <p className="text-lg font-medium text-gray-700">Finding the best matches for you...</p>
                <p className="text-gray-500 mt-2">This might take a moment</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="inline-flex items-center justify-center bg-blue-50 w-16 h-16 rounded-full mb-6">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  We couldn't find any jobs that match your criteria. Try adjusting your filters or check back later.
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {jobs.map((job) => (
                    <JobCard key={job._id?.toString()} job={job} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <JobCard key={job._id?.toString()} job={job} listView />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
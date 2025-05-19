"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import type { Job } from "@/lib/models"
import { Pencil, Trash2, Users } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const { user, status, refreshUserData } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is authenticated
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    // If still loading, wait
    if (status === "loading") {
      return
    }

    // If authenticated but not admin, redirect
    if (status === "authenticated") {
      if (!user) {
        // If user data is not available yet, refresh it
        refreshUserData()
        return
      }

      if (user.role !== "admin") {
        console.log("User is not admin:", user)
        router.push("/")
        return
      }

      // User is admin, fetch jobs
      fetchJobs()
    }
  }, [status, user, router, refreshUserData])

  const fetchJobs = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/jobs")
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

  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`/api/admin/jobs/${jobId}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setJobs(jobs.filter((job) => job._id?.toString() !== jobId))
        } else {
          setError("Failed to delete job")
        }
      } catch (err) {
        setError("An error occurred while deleting job")
      }
    }
  }

  // Show loading state
  if (status === "loading" || (status === "authenticated" && !user)) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  // If there's an error, show it
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>
        <Button onClick={() => router.push("/")} variant="outline">
          Return to Home
        </Button>
      </div>
    )
  }

  // If user is not admin, don't show anything (should be redirected anyway)
  if (user?.role !== "admin") {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="space-x-4">
          <Link href="/admin/applications">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Applications
            </Button>
          </Link>
          <Link href="/admin/jobs/new">
            <Button>Add New Job</Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Manage Jobs</h2>

          {isLoading ? (
            <div className="text-center py-12">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600">No jobs found</h3>
              <p className="text-gray-500 mt-2">Add your first job listing</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Company
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Job Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date Added
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job._id?.toString()}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{job.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{job.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/applications?jobId=${job._id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Users className="h-4 w-4 inline mr-1" />
                          Applications
                        </Link>
                        <Link href={`/admin/jobs/${job._id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                          <Pencil className="h-4 w-4 inline mr-1" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteJob(job._id?.toString() || "")}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4 inline mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

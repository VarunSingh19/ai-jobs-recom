"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Eye, LinkIcon, ExternalLink } from "lucide-react"

interface Application {
  _id: string
  status: "pending" | "reviewed" | "accepted" | "rejected"
  coverLetter: string
  createdAt: string
  job: {
    _id: string
    title: string
    company: string
  }
  user: {
    _id: string
    name: string
    email: string
    resumeUrl?: string
    portfolioUrl?: string
  }
  resumeUrl?: string
  portfolioUrl?: string
}

export default function AdminApplicationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get("jobId")
  const { user, status } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [updateLoading, setUpdateLoading] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      if (user?.role !== "admin") {
        router.push("/")
      } else {
        fetchApplications()
      }
    }
  }, [status, router, user, jobId])

  const fetchApplications = async () => {
    setIsLoading(true)
    try {
      let url = "/api/applications"
      if (jobId) {
        url += `?jobId=${jobId}`
      }

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()

        // Process applications to ensure links are properly set
        const processedApplications = data.map((app: Application) => {
          // If application has direct links, use those
          const resumeUrl = app.resumeUrl || app.user.resumeUrl || null
          const portfolioUrl = app.portfolioUrl || app.user.portfolioUrl || null

          return {
            ...app,
            user: {
              ...app.user,
              resumeUrl,
              portfolioUrl,
            },
          }
        })

        setApplications(processedApplications)
      } else {
        setError("Failed to fetch applications")
      }
    } catch (err) {
      setError("An error occurred while fetching applications")
    } finally {
      setIsLoading(false)
    }
  }

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    setUpdateLoading(applicationId)
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        // Update the application status in the local state
        setApplications(
          applications.map((app) => (app._id === applicationId ? { ...app, status: newStatus as any } : app)),
        )
      } else {
        setError("Failed to update application status")
      }
    } catch (err) {
      setError("An error occurred while updating application status")
    } finally {
      setUpdateLoading(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending
          </Badge>
        )
      case "reviewed":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Reviewed
          </Badge>
        )
      case "accepted":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Accepted
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderLinksIcon = (application: Application) => {
    const resumeUrl = application.resumeUrl || application.user.resumeUrl
    const portfolioUrl = application.portfolioUrl || application.user.portfolioUrl

    if (!resumeUrl && !portfolioUrl) return null

    return (
      <div className="flex space-x-2 ml-2">
        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
            title="View Resume"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        {portfolioUrl && (
          <a
            href={portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
            title="View Portfolio"
          >
            <LinkIcon className="h-4 w-4" />
          </a>
        )}
      </div>
    )
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (user?.role !== "admin") {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link href="/admin" className="mr-4">
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{jobId ? "Applications for Job" : "All Applications"}</h1>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

      {applications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600">No applications found</h3>
          <p className="text-gray-500 mt-2">
            {jobId ? "There are no applications for this job yet" : "There are no applications yet"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Applicant
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Job
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
                    Applied On
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
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
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{application.user.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            {application.user.email}
                            {renderLinksIcon(application)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{application.job.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{application.job.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select
                        value={application.status}
                        onValueChange={(value) => updateApplicationStatus(application._id, value)}
                        disabled={updateLoading === application._id}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Status">{getStatusBadge(application.status)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          router.push(`/admin/applications/${application._id}`)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

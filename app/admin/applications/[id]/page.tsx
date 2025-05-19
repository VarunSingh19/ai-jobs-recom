"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

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

export default function ApplicationDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const applicationId = params.id as string
  const { user, status } = useAuth()
  const [application, setApplication] = useState<Application | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [updateLoading, setUpdateLoading] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      if (user?.role !== "admin") {
        router.push("/")
      } else {
        fetchApplication()
      }
    }
  }, [status, router, user, applicationId])

  const fetchApplication = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`)
      if (response.ok) {
        const data = await response.json()

        // Process application to ensure links are properly set
        const resumeUrl = data.resumeUrl || data.user.resumeUrl || null
        const portfolioUrl = data.portfolioUrl || data.user.portfolioUrl || null

        setApplication({
          ...data,
          user: {
            ...data.user,
            resumeUrl,
            portfolioUrl,
          },
        })
      } else {
        setError("Failed to fetch application details")
      }
    } catch (err) {
      setError("An error occurred while fetching application details")
    } finally {
      setIsLoading(false)
    }
  }

  const updateApplicationStatus = async (newStatus: string) => {
    setUpdateLoading(true)
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setApplication((prev) => (prev ? { ...prev, status: newStatus as any } : null))
      } else {
        setError("Failed to update application status")
      }
    } catch (err) {
      setError("An error occurred while updating application status")
    } finally {
      setUpdateLoading(false)
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

  const renderLinksSection = () => {
    const resumeUrl = application?.resumeUrl || application?.user.resumeUrl
    const portfolioUrl = application?.portfolioUrl || application?.user.portfolioUrl

    if (!resumeUrl && !portfolioUrl) {
      return <p className="text-gray-500 italic">No links provided</p>
    }

    return (
      <div className="mt-2 space-y-2">
        {resumeUrl && (
          <div>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Resume
            </a>
          </div>
        )}

        {portfolioUrl && (
          <div>
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Portfolio
            </a>
          </div>
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

  if (!application) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/admin/applications">
            <Button variant="outline" className="mb-6 flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Applications
            </Button>
          </Link>
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-600">Application not found</h3>
            <p className="text-gray-500 mt-2">The application you're looking for doesn't exist or has been removed</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/applications">
          <Button variant="outline" className="mb-6 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Applications
          </Button>
        </Link>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Application Details</h1>
                <p className="text-gray-500">Submitted on {new Date(application.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">Status:</span>
                <Select value={application.status} onValueChange={updateApplicationStatus} disabled={updateLoading}>
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
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Applicant Information</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">{application.user.name}</p>
                  <p className="text-gray-600">{application.user.email}</p>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700">Links</h3>
                    {renderLinksSection()}
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Job Information</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">{application.job.title}</p>
                  <p className="text-gray-600">{application.job.company}</p>
                  <Link href={`/jobs/${application.job._id}`} className="text-blue-600 text-sm mt-2 inline-block">
                    View Job Details
                  </Link>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Cover Letter</h2>
              <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">{application.coverLetter}</div>
            </div>

            <div className="flex justify-between">
              <Link href={`/admin/applications?jobId=${application.job._id}`}>
                <Button variant="outline">View All Applications for This Job</Button>
              </Link>
              {application.status === "pending" && (
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    onClick={() => updateApplicationStatus("reviewed")}
                    disabled={updateLoading}
                  >
                    Mark as Reviewed
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                    onClick={() => updateApplicationStatus("accepted")}
                    disabled={updateLoading}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                    onClick={() => updateApplicationStatus("rejected")}
                    disabled={updateLoading}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

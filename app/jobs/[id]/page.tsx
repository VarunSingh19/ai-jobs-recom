"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, ArrowLeft, LinkIcon } from "lucide-react"
import JobCard from "@/components/job-card"
import type { Job } from "@/lib/models"
import Link from "next/link"

export default function JobDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const jobId = params.id as string
  const { user, status } = useAuth()
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [userLinks, setUserLinks] = useState<{ resumeUrl: string | null; portfolioUrl: string | null }>({
    resumeUrl: null,
    portfolioUrl: null,
  })

  // Application state
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applicationSuccess, setApplicationSuccess] = useState(false)
  const [applicationError, setApplicationError] = useState("")
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      fetchJob()
      fetchUserLinks()
      checkIfAlreadyApplied()
    }
  }, [status, router, jobId])

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`)
      if (response.ok) {
        const data = await response.json()
        setJob(data)
      } else {
        setError("Failed to fetch job details")
      }
    } catch (err) {
      setError("An error occurred while fetching job details")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserLinks = async () => {
    try {
      const response = await fetch("/api/user/links")
      if (response.ok) {
        const data = await response.json()
        console.log("Fetched user links:", data)
        setUserLinks({
          resumeUrl: data.resumeUrl,
          portfolioUrl: data.portfolioUrl,
        })
      }
    } catch (err) {
      console.error("Error fetching user links:", err)
    }
  }

  const handleApply = async () => {
    setIsSubmitting(true)
    setApplicationError("")

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          coverLetter,
        }),
      })

      if (response.ok) {
        setApplicationSuccess(true)
        setTimeout(() => {
          setIsApplyDialogOpen(false)
          setCoverLetter("")
        }, 2000)
      } else {
        const data = await response.json()
        setApplicationError(data.error || "Failed to submit application")
      }
    } catch (err) {
      setApplicationError("An error occurred while submitting your application")
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasLinks = !!(userLinks.resumeUrl || userLinks.portfolioUrl)

  const checkIfAlreadyApplied = async () => {
    try {
      const response = await fetch("/api/applications?jobId=" + jobId)
      if (response.ok) {
        const applications = await response.json()
        setHasApplied(applications.length > 0)
      }
    } catch (err) {
      console.error("Error checking application status:", err)
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>
          <Link href="/jobs">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-600">Job not found</h3>
            <p className="text-gray-500 mt-2">The job you're looking for doesn't exist or has been removed</p>
          </div>
          <div className="mt-6">
            <Link href="/jobs">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/jobs">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
            </Button>
          </Link>
        </div>

        <JobCard job={job} showDetails={true} />

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            className="flex-1"
            onClick={() => {
              if (hasApplied) return
              if (!hasLinks) {
                if (
                  confirm(
                    "You haven't added any resume or portfolio links to your profile. Would you like to add them now?",
                  )
                ) {
                  router.push("/profile")
                  return
                }
              }
              setIsApplyDialogOpen(true)
            }}
            disabled={hasApplied}
            variant={hasApplied ? "outline" : "default"}
          >
            {hasApplied ? (
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Already Applied
              </span>
            ) : (
              "Apply Now"
            )}
          </Button>
          <Button variant="outline" className="flex-1">
            Save Job
          </Button>
        </div>

        {/* Application Dialog */}
        <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Apply for {job.title}</DialogTitle>
              <DialogDescription>
                Submit your application for {job.title} at {job.company}
              </DialogDescription>
            </DialogHeader>

            {applicationSuccess ? (
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <CheckCircle className="h-4 w-4 mr-2" />
                <AlertDescription>Your application has been submitted successfully!</AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="grid gap-4 py-4">
                  {!hasLinks && (
                    <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <AlertDescription>
                        You haven't added any resume or portfolio links to your profile. While not required, they will
                        improve your chances.{" "}
                        <Link href="/profile" className="font-medium underline">
                          Add them now
                        </Link>
                      </AlertDescription>
                    </Alert>
                  )}

                  {hasLinks && (
                    <div className="bg-blue-50 p-4 rounded-md">
                      <h3 className="font-medium flex items-center text-blue-800">
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Your links will be included with your application:
                      </h3>
                      <ul className="mt-2 text-sm text-blue-700">
                        {userLinks.resumeUrl && <li>✓ Resume Link</li>}
                        {userLinks.portfolioUrl && <li>✓ Portfolio Link</li>}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="coverLetter" className="text-sm font-medium">
                      Cover Letter
                    </label>
                    <Textarea
                      id="coverLetter"
                      placeholder="Tell us why you're a good fit for this position..."
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={8}
                    />
                  </div>

                  {applicationError && (
                    <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <AlertDescription>{applicationError}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleApply} disabled={isSubmitting || !coverLetter.trim()}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

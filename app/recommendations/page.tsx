"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import type { JobRecommendation } from "@/lib/models"
import { MapPin, Briefcase } from "lucide-react"
import Link from "next/link"

export default function RecommendationsPage() {
  const router = useRouter()
  const { status } = useAuth()
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const fetchRecommendations = async () => {
    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await fetch("/api/jobs/recommendations")

      if (response.ok) {
        const data = await response.json()
        setRecommendations(data)
        setSuccess(true)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Failed to get recommendations")
      }
    } catch (err) {
      setError("An error occurred while getting recommendations")
    } finally {
      setIsLoading(false)
    }
  }

  // Filter recommendations to only those with matchScore > 80
  const highMatchRecommendations = recommendations.filter(
    (rec) => rec.matchScore >= 80
  )

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Job Recommendations</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Get Personalized Job Matches</h2>
          <p className="text-gray-600 mb-6">
            Our AI will analyze your profile and find the best job matches for you based on your skills, experience, and
            preferences.
          </p>
          <Button onClick={fetchRecommendations} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? "Finding matches..." : "Find My Matches"}
          </Button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

        {success && highMatchRecommendations.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-600">No high matches found</h3>
            <p className="text-gray-500 mt-2">Try updating your profile with more skills or different preferences</p>
          </div>
        )}

        {highMatchRecommendations.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Found A Perfect Match</h2>

            {highMatchRecommendations.map((recommendation, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 ${recommendation.matchScore >= 90 ? "ring-2 ring-green-400" : ""
                  }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-600">{recommendation.job.title}</h3>
                      <p className="text-gray-600">{recommendation.job.company}</p>
                    </div>
                    <div
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${recommendation.matchScore >= 90
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {recommendation.matchScore}% Match
                    </div>
                  </div>

                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    {recommendation.job.location}
                  </div>

                  <div className="flex items-center text-gray-500 mb-4">
                    <Briefcase className="h-5 w-5 mr-2" />
                    {recommendation.job.jobType.charAt(0).toUpperCase() + recommendation.job.jobType.slice(1)}
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-700">{recommendation.job.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {recommendation.job.skills.map((skill) => (
                      <span key={skill} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Why this is a good match:</h4>
                    <p className="text-gray-600">{recommendation.matchReason}</p>
                  </div>
                  <Link href={`/jobs/${recommendation.job._id}`} className="w-full block">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

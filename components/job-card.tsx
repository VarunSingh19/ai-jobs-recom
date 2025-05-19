import { Button } from "@/components/ui/button"
import { MapPin, Briefcase } from "lucide-react"
import type { Job } from "@/lib/models"
import Link from "next/link"

interface JobCardProps {
  job: Job
  showDetails?: boolean
}

export default function JobCard({ job, showDetails = false }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-600">{job.title}</h3>
        <p className="text-gray-600 mb-4">{job.company}</p>
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="h-5 w-5 mr-2" />
          {job.location}
        </div>
        <div className="flex items-center text-gray-500 mb-4">
          <Briefcase className="h-5 w-5 mr-2" />
          {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
        </div>
        <div className="mb-4">
          <p className={`text-sm text-gray-700 ${showDetails ? "" : "line-clamp-3"}`}>{job.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {(showDetails ? job.skills : job.skills.slice(0, 3)).map((skill) => (
            <span key={skill} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {skill}
            </span>
          ))}
          {!showDetails && job.skills.length > 3 && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">+{job.skills.length - 3} more</span>
          )}
        </div>
        {!showDetails && (
          <Link href={`/jobs/${job._id}`} className="w-full block">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  location: string
  yearsOfExperience: number
  skills: string[]
  preferredJobType: "remote" | "onsite" | "hybrid" | "any"
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}

export interface ProfileLinks {
  _id?: ObjectId
  userId: ObjectId | string
  resumeUrl: string | null
  portfolioUrl: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Job {
  _id?: ObjectId
  title: string
  company: string
  location: string
  description: string
  skills: string[]
  jobType: "remote" | "onsite" | "hybrid"
  createdAt: Date
  updatedAt: Date
}

export interface JobRecommendation {
  job: Job
  matchScore: number
  matchReason: string
}

export interface Application {
  _id?: ObjectId
  userId: ObjectId
  jobId: ObjectId
  coverLetter: string
  status: "pending" | "reviewed" | "accepted" | "rejected"
  createdAt: Date
  updatedAt: Date
}

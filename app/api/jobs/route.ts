import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title")
    const location = searchParams.get("location")
    const skills = searchParams.get("skills")
    const jobType = searchParams.get("jobType")

    const client = await clientPromise
    const db = client.db()

    const query: any = {}

    if (title) {
      query.title = { $regex: title, $options: "i" }
    }

    if (location) {
      query.location = { $regex: location, $options: "i" }
    }

    if (skills) {
      query.skills = { $in: skills.split(",") }
    }

    if (jobType) {
      query.jobType = jobType
    }

    const jobs = await db.collection("jobs").find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(jobs)
  } catch (error) {
    console.error("Jobs fetch error:", error)
    return NextResponse.json({ error: "An error occurred while fetching jobs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, company, location, description, skills, jobType } = await request.json()

    // Validate input
    if (!title || !company || !location || !description || !skills || !jobType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    const result = await db.collection("jobs").insertOne({
      title,
      company,
      location,
      description,
      skills,
      jobType,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({ message: "Job created successfully", jobId: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Job creation error:", error)
    return NextResponse.json({ error: "An error occurred while creating job" }, { status: 500 })
  }
}

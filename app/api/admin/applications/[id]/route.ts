import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()

    const application = await db
      .collection("applications")
      .aggregate([
        { $match: { _id: new ObjectId(params.id) } },
        {
          $lookup: {
            from: "jobs",
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$job" },
        { $unwind: "$user" },
        {
          $project: {
            _id: 1,
            status: 1,
            coverLetter: 1,
            resumeUrl: 1,
            portfolioUrl: 1,
            createdAt: 1,
            updatedAt: 1,
            "job._id": 1,
            "job.title": 1,
            "job.company": 1,
            "user._id": 1,
            "user.name": 1,
            "user.email": 1,
          },
        },
      ])
      .toArray()

    if (application.length === 0) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // If application doesn't have links, try to get them from the profileLinks collection
    if (!application[0].resumeUrl && !application[0].portfolioUrl) {
      const links = await db.collection("profileLinks").findOne({ userId: application[0].user._id })

      if (links) {
        application[0].user.resumeUrl = links.resumeUrl
        application[0].user.portfolioUrl = links.portfolioUrl
      }
    } else {
      // If application has links, add them to the user object
      application[0].user.resumeUrl = application[0].resumeUrl
      application[0].user.portfolioUrl = application[0].portfolioUrl
    }

    return NextResponse.json(application[0])
  } catch (error) {
    console.error("Application fetch error:", error)
    return NextResponse.json({ error: "An error occurred while fetching application" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status } = await request.json()

    // Validate status
    const validStatuses = ["pending", "reviewed", "accepted", "rejected"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    const result = await db.collection("applications").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Application status updated successfully" })
  } catch (error) {
    console.error("Application update error:", error)
    return NextResponse.json({ error: "An error occurred while updating application" }, { status: 500 })
  }
}

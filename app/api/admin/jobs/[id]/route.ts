import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { authOptions } from "@/lib/auth"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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

    await db.collection("jobs").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          title,
          company,
          location,
          description,
          skills,
          jobType,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ message: "Job updated successfully" })
  } catch (error) {
    console.error("Job update error:", error)
    return NextResponse.json({ error: "An error occurred while updating job" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()

    await db.collection("jobs").deleteOne({ _id: new ObjectId(params.id) })

    return NextResponse.json({ message: "Job deleted successfully" })
  } catch (error) {
    console.error("Job deletion error:", error)
    return NextResponse.json({ error: "An error occurred while deleting job" }, { status: 500 })
  }
}

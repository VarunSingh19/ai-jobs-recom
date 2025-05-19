import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db()

    const job = await db.collection("jobs").findOne({ _id: new ObjectId(params.id) })

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error("Job fetch error:", error)
    return NextResponse.json({ error: "An error occurred while fetching job" }, { status: 500 })
  }
}

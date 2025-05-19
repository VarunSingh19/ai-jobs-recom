import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { authOptions } from "@/lib/auth"

// Debug endpoint to check if resume data is being stored correctly
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(session.user.id) }, { projection: { resume: 1, email: 1 } })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return resume info without the actual file content to keep response size small
    const resumeInfo = user.resume
      ? {
          ...user.resume,
          fileContent: user.resume.fileContent ? `[Base64 string of length ${user.resume.fileContent.length}]` : null,
        }
      : null

    return NextResponse.json({
      email: user.email,
      hasResume: !!user.resume,
      resumeInfo,
    })
  } catch (error) {
    console.error("Debug resume error:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}

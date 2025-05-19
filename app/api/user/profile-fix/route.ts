import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { authOptions } from "@/lib/auth"

// This is a special endpoint to fix profile URLs if they're not saving correctly
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { resumeUrl, portfolioUrl } = await request.json()

    const client = await clientPromise
    const db = client.db()

    // Direct update of just the URL fields
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          resumeUrl: resumeUrl || null,
          portfolioUrl: portfolioUrl || null,
          updatedAt: new Date(),
        },
      },
    )

    // Verify the update
    const updatedUser = await db
      .collection("users")
      .findOne({ _id: new ObjectId(session.user.id) }, { projection: { resumeUrl: 1, portfolioUrl: 1 } })

    return NextResponse.json({
      success: true,
      message: "Profile URLs updated successfully",
      result: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      },
      verification: {
        resumeUrl: updatedUser?.resumeUrl || null,
        portfolioUrl: updatedUser?.portfolioUrl || null,
      },
    })
  } catch (error) {
    console.error("Profile URL fix error:", error)
    return NextResponse.json(
      {
        error: "An error occurred while updating profile URLs",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

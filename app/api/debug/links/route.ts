import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { authOptions } from "@/lib/auth"

// Debug endpoint to check profile links data
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized", authenticated: false }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()

    // Check if the profileLinks collection exists
    const collections = await db.listCollections({ name: "profileLinks" }).toArray()
    const collectionExists = collections.length > 0

    // Get links from the dedicated collection if it exists
    let links = null
    if (collectionExists) {
      links = await db.collection("profileLinks").findOne({ userId: new ObjectId(session.user.id) })
    }

    // Also get links from the user document for comparison
    const user = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(session.user.id) },
        { projection: { resumeUrl: 1, portfolioUrl: 1, email: 1, name: 1 } },
      )

    // Get all collections in the database
    const allCollections = await db.listCollections().toArray()
    const collectionNames = allCollections.map((c) => c.name)

    return NextResponse.json({
      success: true,
      userId: session.user.id,
      userEmail: user?.email,
      userName: user?.name,
      collectionExists,
      allCollections: collectionNames,
      dedicatedLinks: links,
      userDocumentLinks: {
        resumeUrl: user?.resumeUrl || null,
        portfolioUrl: user?.portfolioUrl || null,
      },
    })
  } catch (error) {
    console.error("Debug links error:", error)
    return NextResponse.json(
      {
        error: "An error occurred",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

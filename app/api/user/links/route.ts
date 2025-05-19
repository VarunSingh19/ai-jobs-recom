import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { authOptions } from "@/lib/auth"

// Get user's profile links
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()

    // Check if the profileLinks collection exists, create it if not
    const collections = await db.listCollections({ name: "profileLinks" }).toArray()
    if (collections.length === 0) {
      await db.createCollection("profileLinks")
      console.log("Created new collection: profileLinks")
    }

    // Find the user's links
    const links = await db.collection("profileLinks").findOne({ userId: new ObjectId(session.user.id) })

    console.log("Retrieved links:", links)

    // If no links found in profileLinks collection, check user document (backward compatibility)
    if (!links) {
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(session.user.id) }, { projection: { resumeUrl: 1, portfolioUrl: 1 } })

      if (user && (user.resumeUrl || user.portfolioUrl)) {
        console.log("Found links in user document:", { resumeUrl: user.resumeUrl, portfolioUrl: user.portfolioUrl })
        return NextResponse.json({
          resumeUrl: user.resumeUrl || null,
          portfolioUrl: user.portfolioUrl || null,
          source: "user_document",
        })
      }

      return NextResponse.json({ resumeUrl: null, portfolioUrl: null, source: "none" })
    }

    return NextResponse.json({
      resumeUrl: links.resumeUrl,
      portfolioUrl: links.portfolioUrl,
      source: "profile_links",
    })
  } catch (error) {
    console.error("Error fetching profile links:", error)
    return NextResponse.json({ error: "An error occurred while fetching profile links" }, { status: 500 })
  }
}

// Update user's profile links
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { resumeUrl, portfolioUrl } = await request.json()

    console.log("Received link update request:", { resumeUrl, portfolioUrl, userId: session.user.id })

    // Validate URLs if provided
    if (resumeUrl) {
      try {
        new URL(resumeUrl)
      } catch (e) {
        return NextResponse.json({ error: "Invalid resume URL" }, { status: 400 })
      }
    }

    if (portfolioUrl) {
      try {
        new URL(portfolioUrl)
      } catch (e) {
        return NextResponse.json({ error: "Invalid portfolio URL" }, { status: 400 })
      }
    }

    const client = await clientPromise
    const db = client.db()

    // Check if the profileLinks collection exists, create it if not
    const collections = await db.listCollections({ name: "profileLinks" }).toArray()
    if (collections.length === 0) {
      await db.createCollection("profileLinks")
      console.log("Created new collection: profileLinks")
    }

    // Check if the user already has links
    const existingLinks = await db.collection("profileLinks").findOne({ userId: new ObjectId(session.user.id) })

    let result
    const now = new Date()

    if (existingLinks) {
      // Update existing links
      result = await db.collection("profileLinks").updateOne(
        { userId: new ObjectId(session.user.id) },
        {
          $set: {
            resumeUrl: resumeUrl || null,
            portfolioUrl: portfolioUrl || null,
            updatedAt: now,
          },
        },
      )
      console.log("Updated existing links:", result)
    } else {
      // Create new links
      result = await db.collection("profileLinks").insertOne({
        userId: new ObjectId(session.user.id),
        resumeUrl: resumeUrl || null,
        portfolioUrl: portfolioUrl || null,
        createdAt: now,
        updatedAt: now,
      })
      console.log("Created new links:", result)
    }

    // Also update the links in the user document for backward compatibility
    await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          resumeUrl: resumeUrl || null,
          portfolioUrl: portfolioUrl || null,
          updatedAt: now,
        },
      },
    )
    console.log("Updated links in user document")

    // Verify the update
    const updatedLinks = await db.collection("profileLinks").findOne({ userId: new ObjectId(session.user.id) })
    console.log("Verification - Updated links:", updatedLinks)

    // Also verify user document update
    const updatedUser = await db
      .collection("users")
      .findOne({ _id: new ObjectId(session.user.id) }, { projection: { resumeUrl: 1, portfolioUrl: 1 } })
    console.log("Verification - Updated user document:", updatedUser)

    return NextResponse.json({
      success: true,
      message: "Profile links updated successfully",
      links: {
        resumeUrl: updatedLinks?.resumeUrl || null,
        portfolioUrl: updatedLinks?.portfolioUrl || null,
      },
      userDocument: {
        resumeUrl: updatedUser?.resumeUrl || null,
        portfolioUrl: updatedUser?.portfolioUrl || null,
      },
    })
  } catch (error) {
    console.error("Error updating profile links:", error)
    return NextResponse.json(
      {
        error: "An error occurred while updating profile links",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

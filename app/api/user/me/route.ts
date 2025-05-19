import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { authOptions } from "@/lib/auth"

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
      .findOne({ _id: new ObjectId(session.user.id) }, { projection: { password: 0 } })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return user data with properly formatted _id and role
    return NextResponse.json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      location: user.location,
      yearsOfExperience: user.yearsOfExperience,
      skills: user.skills,
      preferredJobType: user.preferredJobType,
      role: user.role || "user",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  } catch (error) {
    console.error("User data fetch error:", error)
    return NextResponse.json({ error: "An error occurred while fetching user data" }, { status: 500 })
  }
}

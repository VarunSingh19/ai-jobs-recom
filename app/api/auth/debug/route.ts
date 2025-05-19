import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { getUserById } from "@/lib/auth"

// This is a debug endpoint to check the session and user data
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    let userData = null
    if (session?.user?.id) {
      userData = await getUserById(session.user.id)
      if (userData) {
        // Remove sensitive data
        delete userData.password
        // Convert ObjectId to string
        userData._id = userData._id.toString()
      }
    }

    return NextResponse.json({
      authenticated: !!session,
      session,
      userData,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to get session",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

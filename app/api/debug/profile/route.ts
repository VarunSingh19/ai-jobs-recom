import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

// Debug endpoint to check profile data
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized", authenticated: false },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Log the user ID we're looking for
    console.log("Debug profile: Looking for user with ID:", session.user.id);

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(session.user.id) });

    if (!user) {
      return NextResponse.json(
        { error: "User not found", userId: session.user.id },
        { status: 404 }
      );
    }

    // Return all fields for debugging (except password)
    const userWithoutPassword: { _id: string | ObjectId } & Omit<
      typeof user,
      "_id"
    > = { ...user };
    delete userWithoutPassword.password;

    // Convert ObjectId to string
    userWithoutPassword._id = userWithoutPassword._id.toString();

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      links: {
        resumeUrl: user.resumeUrl || null,
        portfolioUrl: user.portfolioUrl || null,
        hasResumeUrl: !!user.resumeUrl,
        hasPortfolioUrl: !!user.portfolioUrl,
      },
    });
  } catch (error) {
    console.error("Debug profile error:", error);
    return NextResponse.json(
      {
        error: "An error occurred",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

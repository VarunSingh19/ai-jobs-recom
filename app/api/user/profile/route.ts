import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const user = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(session.user.id) },
        { projection: { password: 0 } }
      );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add this near the beginning of the GET function, after retrieving the user
    console.log("Retrieved user profile:", {
      id: user._id.toString(),
      hasResumeUrl: !!user.resumeUrl,
      hasPortfolioUrl: !!user.portfolioUrl,
      resumeUrl: user.resumeUrl,
      portfolioUrl: user.portfolioUrl,
    });

    // Ensure role is included in the response
    return NextResponse.json({
      ...user,
      _id: user._id.toString(), // Convert ObjectId to string
      role: user.role || "user", // Ensure role is always defined
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requestData = await request.json();
    console.log("Received profile update request:", requestData);

    const {
      name,
      location,
      yearsOfExperience,
      skills,
      preferredJobType,
      resumeUrl,
      portfolioUrl,
    } = requestData;

    // Validate input
    if (
      !name ||
      !location ||
      yearsOfExperience === undefined ||
      !skills ||
      !preferredJobType
    ) {
      return NextResponse.json(
        { error: "Missing required fields", received: requestData },
        { status: 400 }
      );
    }

    // Validate URLs if provided
    if (resumeUrl) {
      try {
        new URL(resumeUrl);
      } catch (e) {
        return NextResponse.json(
          { error: "Invalid resume URL" },
          { status: 400 }
        );
      }
    }

    if (portfolioUrl) {
      try {
        new URL(portfolioUrl);
      } catch (e) {
        return NextResponse.json(
          { error: "Invalid portfolio URL" },
          { status: 400 }
        );
      }
    }

    const client = await clientPromise;
    const db = client.db();

    // First, check if the user exists
    const existingUser = await db
      .collection("users")
      .findOne({ _id: new ObjectId(session.user.id) });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create update document
    const updateData = {
      name,
      location,
      yearsOfExperience: Number(yearsOfExperience),
      skills,
      preferredJobType,
      updatedAt: new Date(),
      // Explicitly set the URL fields
      resumeUrl: resumeUrl || null,
      portfolioUrl: portfolioUrl || null,
    };

    console.log("Updating user profile with data:", updateData);

    // Perform the update
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(session.user.id) }, { $set: updateData });

    console.log("Update result:", result);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (result.modifiedCount === 0) {
      console.log("No changes were made to the document");
    }

    // Verify the update by fetching the user again
    const updatedUser = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(session.user.id) },
        { projection: { resumeUrl: 1, portfolioUrl: 1 } }
      );

    console.log("Verification - Updated user:", updatedUser);

    return NextResponse.json({
      message: "Profile updated successfully",
      updated: {
        resumeUrl: updatedUser?.resumeUrl || null,
        portfolioUrl: updatedUser?.portfolioUrl || null,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      {
        error: "An error occurred while updating profile",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

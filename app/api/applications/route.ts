import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobId, coverLetter } = await request.json();

    // Validate input
    if (!jobId || !coverLetter) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if job exists
    const job = await db
      .collection("jobs")
      .findOne({ _id: new ObjectId(jobId) });
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Check if user has already applied for this job
    const existingApplication = await db.collection("applications").findOne({
      userId: new ObjectId(session.user.id),
      jobId: new ObjectId(jobId),
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 409 }
      );
    }

    // Get user's links if available
    let userLinks = null;
    try {
      // First try to get links from the dedicated collection
      userLinks = await db
        .collection("profileLinks")
        .findOne({ userId: new ObjectId(session.user.id) });

      // If not found, try to get from user document (backward compatibility)
      if (!userLinks) {
        const user = await db
          .collection("users")
          .findOne(
            { _id: new ObjectId(session.user.id) },
            { projection: { resumeUrl: 1, portfolioUrl: 1 } }
          );

        if (user && (user.resumeUrl || user.portfolioUrl)) {
          userLinks = {
            resumeUrl: user.resumeUrl,
            portfolioUrl: user.portfolioUrl,
          };
        }
      }
    } catch (error) {
      console.error("Error fetching user links:", error);
    }

    interface Application {
      userId: ObjectId;
      jobId: ObjectId;
      coverLetter: any;
      status: string;
      createdAt: Date;
      updatedAt: Date;
      resumeUrl?: string;
      portfolioUrl?: string;
    }

    // Create application
    const application: Application = {
      userId: new ObjectId(session.user.id),
      jobId: new ObjectId(jobId),
      coverLetter,
      status: "pending", // pending, reviewed, accepted, rejected
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add links if available
    if (userLinks) {
      if (userLinks.resumeUrl) {
        application.resumeUrl = userLinks.resumeUrl;
      }
      if (userLinks.portfolioUrl) {
        application.portfolioUrl = userLinks.portfolioUrl;
      }
    }

    const result = await db.collection("applications").insertOne(application);

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        applicationId: result.insertedId,
        includesLinks: !!userLinks,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "An error occurred while submitting application" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");

    const client = await clientPromise;
    const db = client.db();

    let query: any = { userId: new ObjectId(session.user.id) };

    // If jobId is provided, filter by job
    if (jobId) {
      query.jobId = new ObjectId(jobId);
    }

    // For admin users, allow fetching all applications
    if (session.user.role === "admin") {
      if (jobId) {
        query = { jobId: new ObjectId(jobId) };
      } else {
        query = {};
      }
    }

    const applications = await db
      .collection("applications")
      .aggregate([
        { $match: query },
        {
          $lookup: {
            from: "jobs",
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$job" },
        { $unwind: "$user" },
        {
          $project: {
            _id: 1,
            status: 1,
            coverLetter: 1,
            resumeUrl: 1,
            portfolioUrl: 1,
            createdAt: 1,
            updatedAt: 1,
            "job._id": 1,
            "job.title": 1,
            "job.company": 1,
            "user._id": 1,
            "user.name": 1,
            "user.email": 1,
          },
        },
      ])
      .toArray();

    // If user is not admin, also fetch links from the profileLinks collection
    if (session.user.role !== "admin") {
      // Get links from the dedicated collection
      const links = await db
        .collection("profileLinks")
        .findOne({ userId: new ObjectId(session.user.id) });

      // Add links to each application if they don't already have them
      if (links) {
        applications.forEach((app) => {
          if (!app.resumeUrl && links.resumeUrl) {
            app.resumeUrl = links.resumeUrl;
          }
          if (!app.portfolioUrl && links.portfolioUrl) {
            app.portfolioUrl = links.portfolioUrl;
          }
        });
      }
    }

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Applications fetch error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching applications" },
      { status: 500 }
    );
  }
}

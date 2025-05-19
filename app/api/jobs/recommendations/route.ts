import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import type { Job, User } from "@/lib/models";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Get user profile
    const user = (await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(session.user.id) },
        { projection: { password: 0 } }
      )) as User;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get all jobs
    const jobs = (await db.collection("jobs").find({}).toArray()) as Job[];

    if (jobs.length === 0) {
      return NextResponse.json({ error: "No jobs available" }, { status: 404 });
    }

    // Use Gemini API to get job recommendations
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    I need to match a job seeker with the most suitable jobs based on their profile and available job listings.

    Job Seeker Profile:
    - Name: ${user.name}
    - Location: ${user.location}
    - Years of Experience: ${user.yearsOfExperience}
    - Skills: ${user.skills.join(", ")}
    - Preferred Job Type: ${user.preferredJobType}

    Available Jobs:
    ${jobs
      .map(
        (job, index) => `
    Job ${index + 1}:
    - Title: ${job.title}
    - Company: ${job.company}
    - Location: ${job.location}
    - Job Type: ${job.jobType}
    - Skills Required: ${job.skills.join(", ")}
    - Description: ${job.description}
    `
      )
      .join("\n")}

    Please analyze the job seeker's profile and the available jobs, then recommend the top 3 most suitable jobs for this candidate.
    For each recommendation, provide:
    1. The job number (as listed above)
    2. A match score from 0-100
    3. A brief explanation of why this job is a good match

    Format your response as a JSON array with this structure:
    [
      {
        "jobIndex": 1,
        "matchScore": 85,
        "matchReason": "Strong skill match in JavaScript and React, preferred remote work available"
      },
      ...
    ]
    
    IMPORTANT: Return ONLY the raw JSON array without any markdown formatting, code blocks, or additional text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response, handling potential markdown formatting
    let recommendations;
    try {
      // First try direct parsing
      recommendations = JSON.parse(text);
    } catch (error) {
      console.error(
        "Error parsing direct JSON, attempting to clean response:",
        error
      );

      try {
        // Try to extract JSON from markdown code blocks if present
        const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
          recommendations = JSON.parse(jsonMatch[1].trim());
        } else {
          // If no code blocks, try to find array brackets and extract content
          const arrayMatch = text.match(/\[\s*{[\s\S]*}\s*\]/);
          if (arrayMatch) {
            recommendations = JSON.parse(arrayMatch[0]);
          } else {
            throw new Error("Could not extract valid JSON from response");
          }
        }
      } catch (extractError) {
        console.error("Failed to extract JSON:", extractError);
        console.error("Raw response:", text);
        return NextResponse.json(
          { error: "Failed to parse AI recommendations" },
          { status: 500 }
        );
      }
    }

    // Map the recommendations to include the full job details
    const fullRecommendations = recommendations.map((rec: any) => ({
      job: jobs[rec.jobIndex - 1],
      matchScore: rec.matchScore,
      matchReason: rec.matchReason,
    }));

    return NextResponse.json(fullRecommendations);
  } catch (error) {
    console.error("Recommendations error:", error);
    return NextResponse.json(
      { error: "An error occurred while getting recommendations" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// This is a debug endpoint to check the current session state
export async function GET() {
  try {
    // Get the session
    const session = await getServerSession(authOptions);

    // Get all cookies
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();

    // Filter out sensitive data from cookies
    const sanitizedCookies = allCookies.map((cookie) => ({
      name: cookie.name,
      value:
        cookie.name.includes("token") || cookie.name.includes("session")
          ? "[REDACTED]"
          : cookie.value.substring(0, 20) +
            (cookie.value.length > 20 ? "..." : ""),
    }));

    return NextResponse.json(
      {
        hasSession: !!session,
        sessionData: session
          ? {
              expires: session.expires,
              user: {
                name: session.user?.name,
                email: session.user?.email,
                role: session.user?.role,
                // Don't include sensitive data like ID
              },
            }
          : null,
        cookieCount: allCookies.length,
        cookies: sanitizedCookies,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Debug session error:", error);
    return NextResponse.json(
      {
        error: "An error occurred while debugging session",
        errorMessage: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

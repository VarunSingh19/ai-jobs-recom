import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextAuthProvider } from "@/components/providers/next-auth-provider"
import { AuthProvider } from "@/contexts/auth-context"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JobMatch AI - Find Your Perfect Job Match",
  description: "AI-powered job matching platform to help you find the perfect job based on your skills and experience.",
}

// Set cache control headers to prevent caching
export const headers = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
  "Surrogate-Control": "no-store",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let session
  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.error("Failed to get session:", error)
    session = null
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}

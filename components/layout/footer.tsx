"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Facebook, Twitter, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [email, setEmail] = useState("")
  const [subscribeStatus, setSubscribeStatus] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      setSubscribeStatus("Please enter a valid email address")
      return
    }

    try {
      // Here you would typically call your API endpoint
      // const response = await fetch("/api/subscribe", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      setSubscribeStatus("Thank you for subscribing!")
      setEmail("")
      setTimeout(() => setSubscribeStatus(""), 3000)
    } catch (error) {
      setSubscribeStatus("Something went wrong. Please try again.")
    }
  }

  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Top Section with Logo and Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text text-2xl font-bold">
                JobMatch AI
              </span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Connecting talent with opportunity through AI-powered job matching and career advancement tools.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook size={18} />} />
              <SocialLink href="#" icon={<Twitter size={18} />} />
              <SocialLink href="#" icon={<Linkedin size={18} />} />
              <SocialLink href="#" icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
              For Job Seekers
            </h3>
            <ul className="space-y-2">
              <FooterLink href="/jobs">Browse Jobs</FooterLink>
              <FooterLink href="/recommendations">Job Recommendations</FooterLink>
              <FooterLink href="/profile">Profile Builder</FooterLink>
              <FooterLink href="/resources">Career Resources</FooterLink>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for job tips and industry insights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex max-w-sm">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-r-none focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Subscribe
                </Button>
              </div>
              {subscribeStatus && (
                <p className={`text-sm ${subscribeStatus.includes("Thank you") ? "text-green-600" : "text-red-500"}`}>
                  {subscribeStatus}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Middle Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} JobMatch AI. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all duration-300 z-50"
          size="icon"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </Button>
      )}
    </footer>
  )
}

// Social Media Link Component
function SocialLink({ href, icon }) {
  return (
    <a
      href={href}
      className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  )
}

// Footer Link Component
function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-600 hover:text-blue-600 transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}
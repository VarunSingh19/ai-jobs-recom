// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { useAuth } from "@/contexts/auth-context"
// import { Button } from "@/components/ui/button"
// import { Menu, X } from "lucide-react"
// import { useState, useEffect } from "react"
// import { useSession } from "next-auth/react"

// export default function Header() {
//   const pathname = usePathname()
//   const { user, status, logout } = useAuth()
//   const { data: session, status: sessionStatus } = useSession()
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [isAdmin, setIsAdmin] = useState(false)
//   const [isLoggingOut, setIsLoggingOut] = useState(false)
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [isClient, setIsClient] = useState(false)

//   // Set isClient to true when component mounts (client-side only)
//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   // Force re-render on route change to update auth state
//   useEffect(() => {
//     if (!isClient) return // Skip server-side rendering

//     // Check if we're on login or register page
//     const isAuthPage = pathname === "/login" || pathname === "/register"

//     // Only consider authenticated if:
//     // 1. Status is authenticated AND
//     // 2. Session exists AND
//     // 3. User object exists with an ID
//     const authenticated = status === "authenticated" && !!session && !!user?.id

//     // If we're on an auth page, we should never show authenticated UI
//     const effectiveAuthState = isAuthPage ? false : authenticated

//     setIsAuthenticated(effectiveAuthState)

//     if (authenticated && user?.role === "admin") {
//       setIsAdmin(true)
//     } else {
//       setIsAdmin(false)
//     }

//     console.log("Header auth state:", {
//       path: pathname,
//       isAuthPage,
//       status,
//       sessionStatus,
//       hasSession: !!session,
//       hasUser: !!user,
//       userId: user?.id,
//       authenticated,
//       effectiveAuthState,
//       isAdmin: user?.role === "admin",
//     })
//   }, [user, status, session, sessionStatus, pathname, isClient])

//   const isActive = (path: string) => pathname === path

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen)
//   }

//   const handleLogout = async () => {
//     setIsLoggingOut(true)
//     try {
//       console.log("Header: Starting logout")
//       // Clear client-side storage first
//       localStorage.clear()
//       sessionStorage.clear()

//       // Clear all cookies
//       document.cookie.split(";").forEach((c) => {
//         document.cookie = c.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
//       })

//       // Call our custom logout API
//       const response = await fetch("/api/auth/logout", {
//         method: "POST",
//         headers: {
//           "Cache-Control": "no-cache, no-store, must-revalidate",
//           Pragma: "no-cache",
//           Expires: "0",
//         },
//       })

//       const data = await response.json()
//       console.log("Header: Server logout response:", data)

//       // Then use the context logout function
//       await logout()

//       // Wait a moment to ensure all logout processes complete
//       await new Promise((resolve) => setTimeout(resolve, 100))

//       console.log("Header: Logout complete, redirecting")
//       // Force redirect to login page with logout parameter
//       window.location.href = "/login?logout=true&time=" + new Date().getTime()
//     } catch (error) {
//       console.error("Logout failed:", error)
//       // Force redirect to login page if logout fails
//       window.location.href = "/login?error=true&time=" + new Date().getTime()
//     }
//   }

//   // Don't render authenticated UI during server-side rendering
//   // or when we're on login/register pages
//   if (!isClient || pathname === "/login" || pathname === "/register") {
//     return (
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <Link href="/" className="text-xl font-bold text-blue-600">
//             JobMatch AI
//           </Link>

//           <nav className="hidden md:flex items-center space-x-6">
//             <Link
//               href="/login"
//               className={`text-sm font-medium ${
//                 isActive("/login") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
//               }`}
//             >
//               Login
//             </Link>
//             <Link href="/register">
//               <Button>Sign Up</Button>
//             </Link>
//           </nav>

//           <div className="md:hidden">
//             <button onClick={toggleMobileMenu} className="text-gray-600">
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-white border-b border-gray-200 py-4">
//             <div className="container mx-auto px-4 flex flex-col space-y-4">
//               <Link
//                 href="/login"
//                 className={`text-sm font-medium ${
//                   isActive("/login") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
//                 }`}
//                 onClick={toggleMobileMenu}
//               >
//                 Login
//               </Link>
//               <Link href="/register" onClick={toggleMobileMenu}>
//                 <Button className="w-full">Sign Up</Button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </header>
//     )
//   }

//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <Link href="/" className="text-xl font-bold text-blue-600">
//           JobMatch AI
//         </Link>

//         <nav className="hidden md:flex items-center space-x-6">
//           {isAuthenticated ? (
//             <>
//               <Link
//                 href="/jobs"
//                 className={`text-sm font-medium ${
//                   isActive("/jobs") || pathname.startsWith("/jobs/")
//                     ? "text-blue-600"
//                     : "text-gray-600 hover:text-blue-600"
//                 }`}
//               >
//                 Jobs
//               </Link>
//               <Link
//                 href="/recommendations"
//                 className={`text-sm font-medium ${
//                   isActive("/recommendations") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
//                 }`}
//               >
//                 Recommendations
//               </Link>
//               <Link
//                 href="/applications"
//                 className={`text-sm font-medium ${
//                   isActive("/applications") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
//                 }`}
//               >
//                 My Applications
//               </Link>
//               <Link
//                 href="/profile"
//                 className={`text-sm font-medium ${
//                   isActive("/profile") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
//                 }`}
//               >
//                 Profile
//               </Link>
//               {isAdmin && (
//                 <Link
//                   href="/admin"
//                   className={`text-sm font-medium ${
//                     pathname.startsWith("/admin") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
//                   }`}
//                 >
//                   Admin
//                 </Link>
//               )}
//               <Button variant="outline" onClick={handleLogout} disabled={isLoggingOut}>
//                 {isLoggingOut ? "Logging out..." : "Logout"}
//               </Button>
//             </>
//           ) : (
//             <>
//               <Link
//                 href="/login"
//                 className={`text-sm font-medium ${
//                   isActive("/login") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
//                 }`}
//               >
//                 Login
//               </Link>
//               <Link href="/register">
//                 <Button>Sign Up</Button>
//               </Link>
//             </>
//           )}
//         </nav>

//         <div className="md:hidden">
//           <button onClick={toggleMobileMenu} className="text-gray-600">
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white border-b border-gray-200 py-4">
//           <div className="container mx-auto px-4 flex flex-col space-y-4">
//             {isAuthenticated ? (
//               <>
//                 <Link
//                   href="/jobs"
//                   className={`text-sm font-medium ${
//                     isActive("/jobs") || pathname.startsWith("/jobs/")
//                       ? "text-blue-600"
//                       : "text-gray-600 hover:text-blue-600"
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   Jobs
//                 </Link>
//                 <Link
//                   href="/recommendations"
//                   className={`text-sm font-medium ${
//                     isActive("/recommendations") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   Recommendations
//                 </Link>
//                 <Link
//                   href="/applications"
//                   className={`text-sm font-medium ${
//                     isActive("/applications") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   My Applications
//                 </Link>
//                 <Link
//                   href="/profile"
//                   className={`text-sm font-medium ${
//                     isActive("/profile") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   Profile
//                 </Link>
//                 {isAdmin && (
//                   <Link
//                     href="/admin"
//                     className={`text-sm font-medium ${
//                       pathname.startsWith("/admin") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
//                     }`}
//                     onClick={toggleMobileMenu}
//                   >
//                     Admin
//                   </Link>
//                 )}
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     toggleMobileMenu()
//                     handleLogout()
//                   }}
//                   disabled={isLoggingOut}
//                 >
//                   {isLoggingOut ? "Logging out..." : "Logout"}
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/login"
//                   className={`text-sm font-medium ${
//                     isActive("/login") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   Login
//                 </Link>
//                 <Link href="/register" onClick={toggleMobileMenu}>
//                   <Button className="w-full">Sign Up</Button>
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Briefcase, Star, ClipboardList, LogOut, Settings } from "lucide-react"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const pathname = usePathname()
  const { user, status, logout } = useAuth()
  const { data: session, status: sessionStatus } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true)

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Force re-render on route change to update auth state
  useEffect(() => {
    if (!isClient) return // Skip server-side rendering

    // Check if we're on login or register page
    const isAuthPage = pathname === "/login" || pathname === "/register"

    // Only consider authenticated if:
    // 1. Status is authenticated AND
    // 2. Session exists AND
    // 3. User object exists with an ID
    const authenticated = status === "authenticated" && !!session && !!user?.id

    // If we're on an auth page, we should never show authenticated UI
    const effectiveAuthState = isAuthPage ? false : authenticated

    setIsAuthenticated(effectiveAuthState)

    if (authenticated && user?.role === "admin") {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }

    console.log("Header auth state:", {
      path: pathname,
      isAuthPage,
      status,
      sessionStatus,
      hasSession: !!session,
      hasUser: !!user,
      userId: user?.id,
      authenticated,
      effectiveAuthState,
      isAdmin: user?.role === "admin",
    })
  }, [user, status, session, sessionStatus, pathname, isClient])

  const isActive = (path) => {
    if (path === "/jobs") {
      return pathname === "/jobs" || pathname.startsWith("/jobs/")
    }
    if (path === "/admin") {
      return pathname.startsWith("/admin")
    }
    return pathname === path
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      console.log("Header: Starting logout")
      // Clear client-side storage first
      localStorage.clear()
      sessionStorage.clear()

      // Clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      })

      // Call our custom logout API
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })

      const data = await response.json()
      console.log("Header: Server logout response:", data)

      // Then use the context logout function
      await logout()

      // Wait a moment to ensure all logout processes complete
      await new Promise((resolve) => setTimeout(resolve, 100))

      console.log("Header: Logout complete, redirecting")
      // Force redirect to login page with logout parameter
      window.location.href = "/login?logout=true&time=" + new Date().getTime()
    } catch (error) {
      console.error("Logout failed:", error)
      // Force redirect to login page if logout fails
      window.location.href = "/login?error=true&time=" + new Date().getTime()
    }
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "JM"

    const nameParts = user.name.split(" ")
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    }
    return nameParts[0].substring(0, 2).toUpperCase()
  }

  // Don't render authenticated UI during server-side rendering
  // or when we're on login/register pages
  if (!isClient || pathname === "/login" || pathname === "/register") {
    return (
      <header className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text text-2xl font-bold">
              JobMatch AI
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/login"
              className={`text-sm font-medium transition-colors ${isActive("/login")
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
                }`}
            >
              Login
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition-all hover:shadow-md">
                Sign Up
              </Button>
            </Link>
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-blue-600"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu with animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <Link
                  href="/login"
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-all ${isActive("/login")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link href="/register" onClick={toggleMobileMenu} className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    )
  }

  return (
    <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text text-2xl font-bold">
            JobMatch AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {isAuthenticated ? (
            <>
              <NavItem href="/jobs" isActive={isActive("/jobs")} icon={<Briefcase size={18} />}>
                Jobs
              </NavItem>
              <NavItem href="/recommendations" isActive={isActive("/recommendations")} icon={<Star size={18} />}>
                Recommendations
              </NavItem>
              <NavItem href="/applications" isActive={isActive("/applications")} icon={<ClipboardList size={18} />}>
                Applications
              </NavItem>
              {isAdmin && (
                <NavItem href="/admin" isActive={isActive("/admin")} icon={<Settings size={18} />}>
                  Admin
                </NavItem>
              )}

              <div className="ml-2 border-l border-gray-200 pl-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage src={user?.image || ""} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="font-normal">
                        <p className="text-sm font-medium">{user?.name || "User"}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center cursor-pointer">
                        <User size={16} className="mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex items-center text-red-600 focus:text-red-600 cursor-pointer"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      <LogOut size={16} className="mr-2" />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${isActive("/login")
                    ? "text-blue-700"
                    : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                Login
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition-all hover:shadow-md">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center">
          {isAuthenticated && (
            <Link href="/profile" className="mr-2">
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-blue-600"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <MobileNavItem
                    href="/jobs"
                    isActive={isActive("/jobs")}
                    icon={<Briefcase size={18} />}
                    onClick={toggleMobileMenu}
                  >
                    Jobs
                  </MobileNavItem>
                  <MobileNavItem
                    href="/recommendations"
                    isActive={isActive("/recommendations")}
                    icon={<Star size={18} />}
                    onClick={toggleMobileMenu}
                  >
                    Recommendations
                  </MobileNavItem>
                  <MobileNavItem
                    href="/applications"
                    isActive={isActive("/applications")}
                    icon={<ClipboardList size={18} />}
                    onClick={toggleMobileMenu}
                  >
                    My Applications
                  </MobileNavItem>
                  <MobileNavItem
                    href="/profile"
                    isActive={isActive("/profile")}
                    icon={<User size={18} />}
                    onClick={toggleMobileMenu}
                  >
                    Profile
                  </MobileNavItem>

                  {isAdmin && (
                    <MobileNavItem
                      href="/admin"
                      isActive={isActive("/admin")}
                      icon={<Settings size={18} />}
                      onClick={toggleMobileMenu}
                    >
                      Admin
                    </MobileNavItem>
                  )}

                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <Button
                      variant="outline"
                      onClick={() => {
                        toggleMobileMenu()
                        handleLogout()
                      }}
                      disabled={isLoggingOut}
                      className="w-full flex items-center justify-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`flex items-center text-sm font-medium px-4 py-3 rounded-lg transition-colors ${isActive("/login")
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                      }`}
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                  <Link href="/register" onClick={toggleMobileMenu} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// Desktop Navigation Item
function NavItem({ href, isActive, icon, children }) {
  return (
    <Link
      href={href}
      className={`relative flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-lg transition-all group ${isActive
          ? "text-blue-700 bg-blue-50"
          : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
        }`}
    >
      <span className={`${isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-500"}`}>
        {icon}
      </span>
      <span>{children}</span>
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  )
}

// Mobile Navigation Item
function MobileNavItem({ href, isActive, icon, onClick, children }) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${isActive
          ? "bg-blue-50 text-blue-700"
          : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
        }`}
      onClick={onClick}
    >
      <span className={`${isActive ? "text-blue-600" : "text-gray-500"}`}>
        {icon}
      </span>
      <span>{children}</span>
    </Link>
  )
}
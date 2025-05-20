"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, Variants } from "framer-motion"
import {
  ChevronRight,
  CheckCircle,
  BarChart,
  Users,
  Clock,
  Briefcase,
  Award,
  Zap,
  TrendingUp,
  Shield,
  Globe
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

// SVG Components
const WavyBackground = () => (
  <svg className="absolute w-full h-32 md:h-48 bottom-0 left-0" viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path
      fill="#f9fafb"
      fillOpacity="1"
      d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,224C840,224,960,192,1080,181.3C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
    </path>
  </svg>
)

const CircleGrid = () => (
  <svg className="absolute inset-0 opacity-10" width="100%" height="100%">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="3" fill="white" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
)

const BlobShape = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M47.5,-67.2C59.9,-56.1,67.8,-40.8,72.2,-24.9C76.7,-9,77.8,7.4,73.3,22.1C68.9,36.8,59,49.8,46.1,60C33.2,70.3,17.1,77.9,0.2,77.6C-16.7,77.4,-33.5,69.3,-45.9,58C-58.3,46.6,-66.4,32,-71.4,15.7C-76.4,-0.7,-78.3,-18.8,-71.8,-32.6C-65.2,-46.5,-50.3,-56.1,-35.5,-66.5C-20.7,-76.9,-6,-88,8.3,-98.9C22.6,-109.9,45.1,-120.5,57.9,-114.2C70.7,-107.8,73.9,-84.4,47.5,-67.2Z" transform="translate(100 100)" />
  </svg>
)

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const pulse = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const,
    }
  }
}

const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop", // ✅ valid literal
    },
  },
};
// Hero illustrations
const HeroIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div
      className="relative z-10 w-full max-w-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      <svg viewBox="0 0 500 400" className="w-full h-auto">
        <defs>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="15" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Background shapes */}
        <circle cx="380" cy="120" r="60" fill="#fef3c7" opacity="0.3" />
        <circle cx="120" cy="350" r="80" fill="#dbeafe" opacity="0.4" />

        {/* Main card */}
        <rect x="100" y="80" width="300" height="240" rx="20" fill="url(#cardGradient)" filter="url(#shadow)" />

        {/* Profile section */}
        <circle cx="150" cy="130" r="30" fill="white" />
        <rect x="200" y="110" width="120" height="12" rx="6" fill="white" opacity="0.8" />
        <rect x="200" y="130" width="80" height="10" rx="5" fill="white" opacity="0.6" />
        <rect x="200" y="150" width="150" height="10" rx="5" fill="white" opacity="0.4" />

        {/* Skills section */}
        <rect x="120" y="180" width="70" height="25" rx="12" fill="white" opacity="0.7" />
        <rect x="200" y="180" width="70" height="25" rx="12" fill="white" opacity="0.7" />
        <rect x="280" y="180" width="70" height="25" rx="12" fill="white" opacity="0.7" />

        {/* Job matches */}
        <rect x="120" y="220" width="260" height="40" rx="8" fill="white" opacity="0.9" />
        <circle cx="140" cy="240" r="12" fill="#10b981" />
        <rect x="160" y="230" width="100" height="10" rx="5" fill="#1e40af" />
        <rect x="160" y="245" width="60" height="8" rx="4" fill="#6b7280" />
        <rect x="350" y="230" width="15" height="15" rx="3" fill="#10b981" />

        {/* Match indicator tooltip */}
        <g transform="translate(320, 50)">
          <rect x="0" y="0" width="120" height="60" rx="10" fill="white" filter="url(#shadow)" />
          <circle cx="25" cy="30" r="15" fill="#ecfdf5" />
          <path d="M18,30 L22,34 L32,24" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="50" y="20" width="60" height="8" rx="4" fill="#1f2937" />
          <rect x="50" y="35" width="40" height="8" rx="4" fill="#6b7280" />
        </g>
      </svg>
    </motion.div>

    {/* Animated elements */}
    <motion.div
      className="absolute -right-5 bottom-20 bg-white p-4 rounded-lg shadow-xl z-20 max-w-xs"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      variants={float}
    >
      <div className="flex items-center">
        <div className="mr-3 bg-green-100 p-2 rounded-full">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <div className="text-sm font-medium">Perfect Match!</div>
          <div className="text-xs text-gray-500">Senior Developer at Google</div>
        </div>
      </div>
    </motion.div>

    <motion.div
      className="absolute -left-8 top-20 bg-white p-3 rounded-lg shadow-xl z-20"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      variants={float}
    >
      <div className="flex items-center">
        <div className="mr-3 bg-blue-100 p-2 rounded-full">
          <TrendingUp className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <div className="text-xs font-medium">95% Match Rate</div>
        </div>
      </div>
    </motion.div>
  </div>
)

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "93%", label: "Matching Accuracy", icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
    { value: "2,500+", label: "Active Jobs", icon: <Briefcase className="h-5 w-5 text-blue-500" /> },
    { value: "15K+", label: "Successful Matches", icon: <Users className="h-5 w-5 text-indigo-500" /> },
    { value: "48 hrs", label: "Average Hire Time", icon: <Clock className="h-5 w-5 text-purple-500" /> },
  ]

  const testimonials = [
    {
      quote:
        "JobMatch AI helped me find the perfect remote developer role in just 3 days. The AI recommendations were spot on!",
      name: "Sarah J.",
      position: "Full Stack Developer",
      company: "Netflix",
      avatar: "https://celebwell.com/wp-content/uploads/sites/2/2022/09/GettyImages-1397563558-crop.jpg?quality=82&strip=all",
    },
    {
      quote:
        "As a career switcher, I was struggling to find opportunities that matched my transferable skills. JobMatch AI understood my potential.",
      name: "Michael T.",
      position: "UX Designer",
      company: "Spotify",
      avatar: "https://flxt.tmsimg.com/assets/45794_v9_ba.jpg",
    },
    {
      quote:
        "The platform's AI algorithms understood my experience and skills better than any recruiter I've worked with.",
      name: "Priyanka C.",
      position: "Data Scientist",
      company: "Amazon",
      avatar: "https://www.sheknows.com/wp-content/uploads/2022/08/Priyanka-Chopra-at-arrivals-for-2019-Billboard-Music-Awards.jpg",
    },
    {
      quote:
        "After months of job searching, JobMatch AI connected me with three perfect opportunities in my first week!",
      name: "David L.",
      position: "Product Manager",
      company: "Airbnb",
      avatar: "https://th.bing.com/th/id/OIP.Yii_GuIV0d0HL1oWVrGZPQHaJ4?rs=1&pid=ImgDetMain",
    },
  ]

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "AI-Powered Matching",
      description: "Our proprietary algorithm analyzes over 50 data points to find your perfect job match"
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: "Privacy Protected",
      description: "Your data is encrypted and never shared without your explicit permission"
    },
    {
      icon: <Globe className="h-6 w-6 text-green-500" />,
      title: "Global Opportunities",
      description: "Access remote and international positions from over 100 countries"
    }
  ]

  const companies = [
    { name: "Google", image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Amazon", image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Apple", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Netflix", image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Spotify", image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg" },
    { name: "Airbnb", image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" },
  ];


  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 transform -skew-y-6 sm:-skew-y-3 -translate-y-40 sm:-translate-y-36"></div>
        <CircleGrid />
        <BlobShape className="absolute -top-24 -right-24 w-72 h-72 text-indigo-500 opacity-20" />
        <BlobShape className="absolute -bottom-24 -left-24 w-72 h-72 text-blue-400 opacity-20" />

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0 text-white"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span
                className="inline-block py-1 px-3 rounded-full bg-white bg-opacity-20 text-blue-100 text-sm font-medium mb-6"
                variants={fadeIn}
              >
                AI-Powered Job Matching
              </motion.span>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                variants={fadeIn}
              >
                Find Your{" "}
                <span className="relative inline-block">
                  Perfect Job
                  <motion.span
                    className="absolute bottom-1 left-0 w-full h-2 bg-yellow-400 opacity-70 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  ></motion.span>
                </span>
                <br />
                With AI
              </motion.h1>

              <motion.p className="text-xl text-blue-100 mb-8 max-w-lg" variants={fadeIn}>
                Our AI-powered platform analyzes your skills and experience to recommend the best job opportunities for
                you with 93% accuracy.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4" variants={fadeIn}>
                <Link href="/register">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 font-medium hover:scale-105 transition-transform"
                  >
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white text-white hover:bg-blue-700 hover:scale-105 transition-transform"
                  >
                    Login
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <div className="md:w-1/2 relative">
              <HeroIllustration />
            </div>
          </div>
        </div>

        <WavyBackground />
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-blue-200 transition-all"
                variants={cardVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
              >
                <motion.div
                  className="flex justify-center mb-4"
                  variants={pulse}
                  initial="initial"
                  animate="animate"
                >
                  <div className="p-3 rounded-full bg-gray-50">
                    {stat.icon}
                  </div>
                </motion.div>
                <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <BlobShape className="absolute top-0 right-0 w-64 h-64 text-blue-300 opacity-10 transform rotate-45" />

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Find Your Dream Job in 3 Simple Steps</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-6"></div>
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-10 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {/* Connection lines (visible on md screens and up) */}
              <div className="hidden md:block absolute top-1/3 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 z-0"></div>
              <div className="hidden md:block absolute top-1/3 left-1/2 w-1/4 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300 z-0"></div>

              <motion.div className="relative" variants={cardVariants} whileHover={{ y: -5 }}>
                <div className="bg-white p-8 rounded-xl shadow-lg relative z-10 border-b-4 border-blue-500">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <div className="text-blue-600 font-bold text-2xl">1</div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Create Your Profile</h3>
                  <p className="text-gray-600">
                    Sign up and build your profile with your skills, experience, and job preferences. Our AI analyzes your
                    strengths.
                  </p>

                  <div className="mt-6">
                    <svg className="w-full h-auto" viewBox="0 0 240 60">
                      <rect x="10" y="10" width="80" height="12" rx="6" fill="#e0e7ff" />
                      <rect x="10" y="30" width="120" height="8" rx="4" fill="#e0e7ff" />
                      <rect x="10" y="45" width="100" height="8" rx="4" fill="#e0e7ff" />
                      <circle cx="200" cy="30" r="20" fill="#c7d2fe" />
                      <path d="M190,30 L200,40 L210,20" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.div className="relative mt-10 md:mt-16" variants={cardVariants} whileHover={{ y: -5 }}>
                <div className="bg-white p-8 rounded-xl shadow-lg relative z-10 border-b-4 border-indigo-500">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                    <div className="text-indigo-600 font-bold text-2xl">2</div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Browse Job Listings</h3>
                  <p className="text-gray-600">
                    Explore our curated list of job opportunities from top companies matching your profile and
                    preferences.
                  </p>

                  <div className="mt-6">
                    <svg className="w-full h-auto" viewBox="0 0 240 60">
                      <rect x="10" y="10" width="220" height="15" rx="4" fill="#e0e7ff" />
                      <rect x="10" y="35" width="220" height="15" rx="4" fill="#e0e7ff" />
                      <circle cx="20" cy="17" r="5" fill="#818cf8" />
                      <circle cx="20" cy="42" r="5" fill="#818cf8" />
                      <rect x="180" y="13" width="40" height="8" rx="4" fill="#c7d2fe" />
                      <rect x="180" y="38" width="40" height="8" rx="4" fill="#c7d2fe" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.div className="relative mt-10 md:mt-32" variants={cardVariants} whileHover={{ y: -5 }}>
                <div className="bg-white p-8 rounded-xl shadow-lg relative z-10 border-b-4 border-purple-500">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <div className="text-purple-600 font-bold text-2xl">3</div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Get AI Recommendations</h3>
                  <p className="text-gray-600">
                    Our AI analyzes your profile and suggests the best job matches with personalized insights for each
                    opportunity.
                  </p>

                  <div className="mt-6">
                    <svg className="w-full h-auto" viewBox="0 0 240 60">
                      <rect x="30" y="10" width="180" height="40" rx="6" fill="#f3e8ff" />
                      <circle cx="15" cy="30" r="8" fill="#d8b4fe" />
                      <path d="M12,30 L15,33 L18,27" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <rect x="50" y="20" width="80" height="8" rx="4" fill="#d8b4fe" />
                      <rect x="50" y="35" width="120" height="6" rx="3" fill="#d8b4fe" />
                      <rect x="190" y="24" width="12" height="12" rx="6" fill="#9333ea" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Extra Features Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl"
                variants={cardVariants}
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="p-3 mb-4 rounded-full bg-gray-50 inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <BlobShape className="absolute -bottom-32 -left-32 w-64 h-64 text-green-300 opacity-20 transform -rotate-45" />

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Users Say</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mt-6"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 rounded-xl shadow-lg"
                  >
                    <div className="flex justify-center mb-6">
                      <svg className="h-12 w-auto text-green-500" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.582 7.552 1.5 13.648 1.5 20.087c0 5.465 3.312 9.413 8.088 9.413 4.048 0 6.573-2.978 6.573-6.589 0-3.734-2.5-6.462-5.76-6.462a5.72 5.72 0 0 0-1.5.191 10.11 10.11 0 0 1 4.191-6.589C11.503 7.983 9.57 5.5 9.352 4zm16.512 0c-4.77 3.552-7.852 9.648-7.852 16.087 0 5.465 3.312 9.413 8.088 9.413 4.048 0 6.573-2.978 6.573-6.589 0-3.734-2.5-6.462-5.76-6.462a5.72 5.72 0 0 0-1.5.191 10.11 10.11 0 0 1 4.191-6.589c-1.589-2.068-3.523-4.551-3.74-6.051z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-xl font-light mb-6 text-center">"{testimonials[activeTestimonial].quote}"</p>
                    <div className="flex items-center justify-center">
                      <Image
                        src={testimonials[activeTestimonial].avatar || "/placeholder.svg"}
                        alt={testimonials[activeTestimonial].name}
                        width={65}
                        height={65}
                        className="rounded-full border-4 border-gray-100 mr-4"
                      />
                      <div className="text-left">
                        <div className="font-bold text-gray-800">
                          {testimonials[activeTestimonial].name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonials[activeTestimonial].position} at{" "}
                          {testimonials[activeTestimonial].company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex justify-center mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 mx-1 rounded-full ${activeTestimonial === index ? "bg-green-500" : "bg-gray-300"}`}
                    onClick={() => setActiveTestimonial(index)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Companies Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Trusted By
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Companies Hiring Now</h2>
            <div className="w-20 h-1 bg-gray-600 mx-auto mt-6"></div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {companies.map((company, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                variants={cardVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-[120px] h-[60px] flex items-center justify-center">
                  <Image
                    src={company.image}
                    alt={company.name}
                    width={100}
                    height={60}
                    className="object-contain w-full h-full"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </section>
    </div>
  )
}

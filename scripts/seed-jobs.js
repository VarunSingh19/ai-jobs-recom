// This script can be run with: node scripts/seed-jobs.js
// Make sure to set the MONGODB_URI environment variable

const { MongoClient } = require("mongodb")
require("dotenv").config()

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error("Please set the MONGODB_URI environment variable")
  process.exit(1)
}

const client = new MongoClient(uri)

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    description:
      "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces using React and Next.js.",
    skills: ["JavaScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
    jobType: "remote",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Backend Developer",
    company: "DataSystems",
    location: "New York, NY",
    description:
      "Join our backend team to build scalable APIs and services. Experience with Node.js and MongoDB is required.",
    skills: ["JavaScript", "Node.js", "Express", "MongoDB", "REST API", "GraphQL"],
    jobType: "onsite",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Full Stack Developer",
    company: "WebSolutions",
    location: "Austin, TX",
    description:
      "Looking for a Full Stack Developer who can work on both frontend and backend technologies. Experience with React and Node.js is a must.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express", "HTML", "CSS"],
    jobType: "hybrid",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "UI/UX Designer",
    company: "CreativeMinds",
    location: "Seattle, WA",
    description:
      "We need a talented UI/UX Designer to create beautiful and functional user interfaces for our products.",
    skills: ["UI/UX Design", "Figma", "Adobe XD", "HTML", "CSS", "JavaScript"],
    jobType: "remote",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Chicago, IL",
    description:
      "Join our DevOps team to build and maintain our cloud infrastructure. Experience with AWS and Docker is required.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux", "Python"],
    jobType: "onsite",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Data Scientist",
    company: "AnalyticsPro",
    location: "Boston, MA",
    description: "We are looking for a Data Scientist to analyze large datasets and build machine learning models.",
    skills: ["Python", "Machine Learning", "Data Science", "SQL", "Statistics", "TensorFlow"],
    jobType: "hybrid",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Mobile Developer",
    company: "AppWorks",
    location: "Los Angeles, CA",
    description: "Join our mobile team to build cross-platform mobile applications using React Native.",
    skills: ["JavaScript", "React Native", "iOS", "Android", "Redux", "TypeScript"],
    jobType: "remote",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Product Manager",
    company: "ProductHub",
    location: "Denver, CO",
    description: "We need an experienced Product Manager to lead our product development process.",
    skills: ["Product Management", "Agile", "Scrum", "User Research", "Roadmapping", "Analytics"],
    jobType: "onsite",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "QA Engineer",
    company: "QualityTech",
    location: "Portland, OR",
    description:
      "Join our QA team to ensure the quality of our software products through manual and automated testing.",
    skills: ["Testing", "Selenium", "Jest", "Cypress", "JavaScript", "QA Automation"],
    jobType: "hybrid",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Technical Writer",
    company: "DocuTech",
    location: "Remote",
    description: "We are looking for a Technical Writer to create documentation for our software products.",
    skills: ["Technical Writing", "Markdown", "Documentation", "HTML", "CSS", "JavaScript"],
    jobType: "remote",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

async function seedJobs() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()
    const jobsCollection = db.collection("jobs")

    // Check if jobs already exist
    const existingJobs = await jobsCollection.countDocuments()
    if (existingJobs > 0) {
      console.log(`${existingJobs} jobs already exist in the database. Skipping seed.`)
      return
    }

    // Insert jobs
    const result = await jobsCollection.insertMany(jobs)
    console.log(`${result.insertedCount} jobs inserted successfully`)
  } catch (error) {
    console.error("Error seeding jobs:", error)
  } finally {
    await client.close()
    console.log("MongoDB connection closed")
  }
}

seedJobs()

// This script can be run with: node scripts/create-admin.js
// Make sure to set the MONGODB_URI environment variable

const { MongoClient } = require("mongodb")
const bcrypt = require("bcrypt")
require("dotenv").config()

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error("Please set the MONGODB_URI environment variable")
  process.exit(1)
}

const client = new MongoClient(uri)

async function createAdmin() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()
    const usersCollection = db.collection("users")

    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ email: "admin@example.com" })
    if (existingAdmin) {
      console.log("Admin user already exists")

      // Ensure the role is set to admin
      if (existingAdmin.role !== "admin") {
        await usersCollection.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
        console.log("Updated user role to admin")
      }

      return
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10)
    const admin = {
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      location: "Admin HQ",
      yearsOfExperience: 5,
      skills: ["Administration", "Management"],
      preferredJobType: "any",
      role: "admin", // Explicitly set role to admin
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await usersCollection.insertOne(admin)
    console.log(`Admin user created with ID: ${result.insertedId}`)
    console.log("Email: admin@example.com")
    console.log("Password: admin123")
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await client.close()
    console.log("MongoDB connection closed")
  }
}

createAdmin()

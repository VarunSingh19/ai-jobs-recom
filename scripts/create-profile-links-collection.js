// This script can be run with: node scripts/create-profile-links-collection.js
// Make sure to set the MONGODB_URI environment variable

const { MongoClient, ObjectId } = require("mongodb")
require("dotenv").config()

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error("Please set the MONGODB_URI environment variable")
  process.exit(1)
}

const client = new MongoClient(uri)

async function createProfileLinksCollection() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Check if the collection already exists
    const collections = await db.listCollections({ name: "profileLinks" }).toArray()
    if (collections.length > 0) {
      console.log("profileLinks collection already exists")
    } else {
      // Create the collection
      await db.createCollection("profileLinks")
      console.log("Created new collection: profileLinks")
    }

    // Get all users
    const users = await db.collection("users").find({}).toArray()
    console.log(`Found ${users.length} users`)

    // Migrate existing links from users to the new collection
    let migratedCount = 0
    for (const user of users) {
      // Check if user has resume or portfolio URL
      if (user.resumeUrl || user.portfolioUrl) {
        // Check if entry already exists in profileLinks
        const existingLinks = await db.collection("profileLinks").findOne({ userId: user._id })

        if (!existingLinks) {
          // Create new entry in profileLinks
          await db.collection("profileLinks").insertOne({
            userId: user._id,
            resumeUrl: user.resumeUrl || null,
            portfolioUrl: user.portfolioUrl || null,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          migratedCount++
          console.log(`Migrated links for user: ${user.email}`)
        } else {
          console.log(`Links already exist for user: ${user.email}`)
        }
      }
    }

    console.log(`Migration complete. Migrated links for ${migratedCount} users.`)
  } catch (error) {
    console.error("Error:", error)
  } finally {
    await client.close()
    console.log("MongoDB connection closed")
  }
}

createProfileLinksCollection()

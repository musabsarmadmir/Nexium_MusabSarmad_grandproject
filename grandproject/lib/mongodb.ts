import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI!
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

// Analytics helper functions
export async function saveEmotionAnalytics(userId: string, emotions: string[], moodScore: number) {
  try {
    const client = await clientPromise
    const db = client.db("socho_mental_health")

    await db.collection("emotion_analytics").insertOne({
      userId,
      emotions,
      moodScore,
      timestamp: new Date(),
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
    })
  } catch (error) {
    console.error("Error saving emotion analytics:", error)
  }
}

export async function getWeeklyEmotionTrends(userId: string) {
  try {
    const client = await clientPromise
    const db = client.db("socho_mental_health")

    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const trends = await db
      .collection("emotion_analytics")
      .find({
        userId,
        timestamp: { $gte: oneWeekAgo },
      })
      .sort({ timestamp: 1 })
      .toArray()

    return trends
  } catch (error) {
    console.error("Error getting weekly trends:", error)
    return []
  }
}

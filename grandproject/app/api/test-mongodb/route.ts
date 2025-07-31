import clientPromise from "@/lib/mongodb"

export async function POST() {
  try {
    const client = await clientPromise
    const db = client.db("socho_mental_health")

    // Test connection by inserting and then deleting a test document
    const testDoc = {
      test: true,
      timestamp: new Date(),
    }

    const result = await db.collection("test").insertOne(testDoc)
    await db.collection("test").deleteOne({ _id: result.insertedId })

    return Response.json({ success: true, message: "MongoDB connection successful" })
  } catch (error: any) {
    console.error("MongoDB test error:", error)
    return Response.json({ success: false, error: error.message })
  }
}

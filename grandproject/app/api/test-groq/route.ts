import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt: `Respond to this test message with a simple "Hello from Groq API!": ${message}`,
      maxTokens: 50,
    })

    return Response.json({ success: true, response: text })
  } catch (error: any) {
    console.error("Groq test error:", error)
    return Response.json({ success: false, error: error.message })
  }
}

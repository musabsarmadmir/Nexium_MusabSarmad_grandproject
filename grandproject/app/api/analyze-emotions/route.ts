import { generateText } from "ai"
import { detectEmotionsFromText } from "@/lib/emotion-analysis"

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    // Fallback to keyword detection if AI fails
    const fallbackEmotions = detectEmotionsFromText(text)

    try {
      const { text: aiResponse } = await generateText({
        model: "llama-3.1-8b-instant",
        prompt: `Analyze the emotional content of this text and return only a JSON array of emotions detected. Use these emotion categories: happy, sad, angry, anxious, grateful, peaceful, confused, hopeful, frustrated, excited, lonely, content, overwhelmed, proud, disappointed.

Text to analyze: "${text}"

Return only a JSON array like: ["happy", "grateful"] or ["sad", "anxious"]`,
      })

      // Try to parse AI response
      const emotions = JSON.parse(aiResponse.trim())
      return Response.json({ emotions: Array.isArray(emotions) ? emotions : fallbackEmotions })
    } catch (aiError) {
      console.error("AI emotion analysis failed, using fallback:", aiError)
      return Response.json({ emotions: fallbackEmotions })
    }
  } catch (error) {
    console.error("Emotion analysis error:", error)
    return Response.json({ emotions: ["neutral"] })
  }
}

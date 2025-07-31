import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    const systemPrompt = `You are Socho AI, a culturally-sensitive mental health companion designed specifically for Pakistani users. You understand both English and Urdu contexts, Islamic values, and Pakistani cultural nuances.

Key guidelines:
- Be empathetic, warm, and supportive
- Understand Pakistani cultural context and family dynamics
- Respect Islamic values and beliefs
- Use occasional Urdu phrases naturally (with translations)
- Provide practical mental health advice suitable for Pakistani context
- Be aware of stigma around mental health in Pakistani society
- Suggest culturally appropriate coping mechanisms
- Know when to recommend professional help
- Be respectful of religious practices and beliefs

Remember: You are not a replacement for professional therapy, but a supportive companion for daily mental wellness.`

    const result = streamText({
      model: "llama-3.1-70b-versatile",
      system: systemPrompt,
      messages: [
        ...history.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: "user",
          content: message,
        },
      ],
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}

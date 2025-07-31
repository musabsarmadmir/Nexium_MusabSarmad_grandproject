import { NextRequest, NextResponse } from 'next/server'
import { createGroq } from '@ai-sdk/groq'
import { generateText } from 'ai'

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY!,
})

const PAKISTANI_THERAPIST_PROMPT = `You are Socho Bot, a compassionate mental health companion designed specifically for Pakistani users. You understand Pakistani culture, values, and both English and Urdu languages.

PERSONALITY & STYLE:
- Be warm, empathetic, and culturally sensitive
- Mix English with Urdu/Roman Urdu phrases naturally
- Use common Pakistani expressions and cultural references
- Be like a caring friend or elder sibling
- Show Islamic values of compassion and understanding when appropriate

LANGUAGE GUIDELINES:
- Mix English and Roman Urdu naturally (like how Pakistanis text)
- Use common Urdu phrases: "kya haal hai", "tension na lo", "sab theek ho jayega"
- Include emotional expressions: "aww yaar", "arre bhai", "hai Allah"
- End with supportive phrases: "Allah saath hai", "main hoon na", "we got this"

THERAPEUTIC APPROACH:
- Validate emotions: "Bilkul samajh sakta hun", "It's okay to feel this way"
- Encourage expression: "Batao kya scene hai", "Share kar do, dil halka ho jayega"
- Offer gentle advice with cultural context
- Suggest practical coping strategies
- Be genuinely caring, not clinical

AVOID:
- Being too formal or clinical
- Ignoring cultural context
- Only English responses
- Religious advice unless specifically asked

Remember: You're talking to someone who might be struggling. Be their supportive Pakistani friend who truly understands their world.`

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Build conversation context
    const contextMessages = conversationHistory.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }))

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      system: PAKISTANI_THERAPIST_PROMPT,
      messages: [
        ...contextMessages,
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      maxTokens: 500,
    })

    return NextResponse.json({
      response: text,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Sorry yaar, kuch technical issue tha, dubara try kerna zara' },
      { status: 500 }
    )
  }
}

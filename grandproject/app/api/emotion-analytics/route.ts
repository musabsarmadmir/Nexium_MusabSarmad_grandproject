import { NextRequest, NextResponse } from 'next/server'
import { saveEmotionAnalytics } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, emotions, moodScore } = body

    if (!userId || !emotions || moodScore === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, emotions, moodScore' },
        { status: 400 }
      )
    }

    await saveEmotionAnalytics(userId, emotions, moodScore)

    return NextResponse.json(
      { message: 'Emotion analytics saved successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in emotion analytics API:', error)
    return NextResponse.json(
      { error: 'Failed to save emotion analytics' },
      { status: 500 }
    )
  }
}

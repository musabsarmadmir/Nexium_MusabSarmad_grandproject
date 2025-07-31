import { NextRequest, NextResponse } from 'next/server'
import { getWeeklyEmotionTrends } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required parameter: userId' },
        { status: 400 }
      )
    }

    const trends = await getWeeklyEmotionTrends(userId)

    return NextResponse.json(
      { trends },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in emotion trends API:', error)
    return NextResponse.json(
      { error: 'Failed to get emotion trends' },
      { status: 500 }
    )
  }
}

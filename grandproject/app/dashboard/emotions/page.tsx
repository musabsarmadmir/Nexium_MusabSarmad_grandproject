"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { Heart, Calendar, BarChart } from "lucide-react"

interface EmotionData {
  emotion: string
  count: number
  percentage: number
  trend: "up" | "down" | "stable"
}

export default function EmotionsPage() {
  const [emotionData, setEmotionData] = useState<EmotionData[]>([])
  const [weeklyTrends, setWeeklyTrends] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadEmotionData()
  }, [])

  const loadEmotionData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      // Get recent journal entries
      const { data: entries } = await supabase
        .from("journal_entries")
        .select("emotions, created_at, mood_score")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50)

      // Process emotion data
      const emotionCounts: Record<string, number> = {}
      let totalEmotions = 0

      entries?.forEach((entry) => {
        entry.emotions.forEach((emotion: string) => {
          emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1
          totalEmotions++
        })
      })

      const processedData: EmotionData[] = Object.entries(emotionCounts)
        .map(([emotion, count]) => ({
          emotion,
          count,
          percentage: Math.round((count / totalEmotions) * 100),
          trend: "stable" as const, // TODO: Calculate actual trend
        }))
        .sort((a, b) => b.count - a.count)

      setEmotionData(processedData)

      // Get weekly trends from MongoDB via API
      try {
        const trendsResponse = await fetch(`/api/emotion-trends?userId=${user.id}`)
        if (trendsResponse.ok) {
          const { trends } = await trendsResponse.json()
          setWeeklyTrends(trends)
        }
      } catch (trendsError) {
        console.error('Error fetching trends:', trendsError)
        setWeeklyTrends([])
      }
    } catch (error) {
      console.error("Error loading emotion data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getEmotionColor = (emotion: string): string => {
    const colors: Record<string, string> = {
      happy: "bg-yellow-400",
      sad: "bg-blue-400",
      angry: "bg-red-400",
      anxious: "bg-orange-400",
      grateful: "bg-green-400",
      peaceful: "bg-teal-400",
      confused: "bg-purple-400",
      hopeful: "bg-indigo-400",
      lonely: "bg-gray-400",
      proud: "bg-pink-400",
    }
    return colors[emotion] || "bg-gray-300"
  }

  const getEmotionEmoji = (emotion: string): string => {
    const emojis: Record<string, string> = {
      happy: "😊",
      sad: "😢",
      angry: "😠",
      anxious: "😰",
      grateful: "🙏",
      peaceful: "😌",
      confused: "😕",
      hopeful: "🌟",
      lonely: "😔",
      proud: "😤",
    }
    return emojis[emotion] || "😐"
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Emotion Tracking - جذبات کی نگرانی</h1>
        <p className="text-gray-600 mt-2">Understand your emotional patterns and trends over time.</p>
      </div>

      {/* Emotion Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Common Emotion</CardTitle>
            <Heart className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {emotionData[0]?.emotion || "N/A"} {getEmotionEmoji(emotionData[0]?.emotion || "")}
            </div>
            <p className="text-xs text-gray-600">{emotionData[0]?.percentage || 0}% of your emotions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emotional Diversity</CardTitle>
            <BarChart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emotionData.length}</div>
            <p className="text-xs text-gray-600">Different emotions tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Entries</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyTrends.length}</div>
            <p className="text-xs text-gray-600">Journal entries this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Emotion Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Emotion Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emotionData.map((emotion) => (
              <div key={emotion.emotion} className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 w-32">
                  <span className="text-lg">{getEmotionEmoji(emotion.emotion)}</span>
                  <span className="text-sm font-medium capitalize">{emotion.emotion}</span>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${getEmotionColor(emotion.emotion)}`}
                    style={{ width: `${emotion.percentage}%` }}
                  />
                </div>
                <div className="w-16 text-sm text-gray-600 text-right">
                  {emotion.count} ({emotion.percentage}%)
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Mood Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Mood Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end space-x-2">
            {weeklyTrends.slice(-7).map((trend, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-indigo-500 rounded-t"
                  style={{ height: `${(trend.moodScore / 10) * 100}%` }}
                />
                <div className="text-xs text-gray-600 mt-2">
                  {new Date(trend.timestamp).toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className="text-xs font-medium">{trend.moodScore}/10</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

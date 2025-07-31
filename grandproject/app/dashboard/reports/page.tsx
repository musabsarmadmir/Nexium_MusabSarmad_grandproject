"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Download, FileText, TrendingUp, Calendar } from "lucide-react"

interface WeeklyReport {
  weekStart: string
  weekEnd: string
  totalEntries: number
  averageMoodScore: number
  topEmotions: string[]
  insights: string[]
  recommendations: string[]
}

export default function ReportsPage() {
  const [weeklyReport, setWeeklyReport] = useState<WeeklyReport | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    generateWeeklyReport()
  }, [])

  const generateWeeklyReport = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      // Get last 7 days of entries
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

      const { data: entries } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", user.id)
        .gte("created_at", oneWeekAgo.toISOString())
        .order("created_at", { ascending: false })

      if (!entries || entries.length === 0) {
        setWeeklyReport(null)
        return
      }

      // Calculate statistics
      const totalEntries = entries.length
      const averageMoodScore = entries.reduce((sum, entry) => sum + entry.mood_score, 0) / totalEntries

      // Get top emotions
      const emotionCounts: Record<string, number> = {}
      entries.forEach((entry) => {
        entry.emotions.forEach((emotion: string) => {
          emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1
        })
      })

      const topEmotions = Object.entries(emotionCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([emotion]) => emotion)

      // Generate insights
      const insights = generateInsights(entries, averageMoodScore, topEmotions)
      const recommendations = generateRecommendations(averageMoodScore, topEmotions)

      const report: WeeklyReport = {
        weekStart: oneWeekAgo.toLocaleDateString(),
        weekEnd: new Date().toLocaleDateString(),
        totalEntries,
        averageMoodScore: Math.round(averageMoodScore * 10) / 10,
        topEmotions,
        insights,
        recommendations,
      }

      setWeeklyReport(report)
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateInsights = (entries: any[], avgMood: number, topEmotions: string[]): string[] => {
    const insights: string[] = []

    if (avgMood >= 7) {
      insights.push("You've had a particularly positive week! Your mood scores are above average.")
    } else if (avgMood <= 4) {
      insights.push("This week seems to have been challenging. Consider reaching out for support.")
    }

    if (entries.length >= 5) {
      insights.push("Great job maintaining a consistent journaling habit this week!")
    } else if (entries.length <= 2) {
      insights.push("Try to journal more regularly to better track your emotional patterns.")
    }

    if (topEmotions.includes("anxious") || topEmotions.includes("stressed")) {
      insights.push("You've experienced some anxiety this week. Consider practicing relaxation techniques.")
    }

    if (topEmotions.includes("grateful") || topEmotions.includes("happy")) {
      insights.push("You've shown gratitude and happiness this week - that's wonderful for mental health!")
    }

    return insights
  }

  const generateRecommendations = (avgMood: number, topEmotions: string[]): string[] => {
    const recommendations: string[] = []

    if (avgMood < 5) {
      recommendations.push("Consider speaking with a mental health professional")
      recommendations.push("Try incorporating daily meditation or mindfulness practices")
      recommendations.push("Engage in physical activities like walking or yoga")
    }

    if (topEmotions.includes("lonely")) {
      recommendations.push("Reach out to friends or family members")
      recommendations.push("Consider joining community groups or activities")
    }

    if (topEmotions.includes("anxious")) {
      recommendations.push("Practice deep breathing exercises")
      recommendations.push("Try progressive muscle relaxation")
      recommendations.push("Limit caffeine intake")
    }

    recommendations.push("Continue regular journaling to track your progress")
    recommendations.push("Maintain a consistent sleep schedule")
    recommendations.push("Practice gratitude by writing down 3 things you're thankful for daily")

    return recommendations
  }

  const downloadReport = () => {
    if (!weeklyReport) return

    const reportText = `
SOCHO WEEKLY MENTAL HEALTH REPORT
Week: ${weeklyReport.weekStart} - ${weeklyReport.weekEnd}

SUMMARY:
- Total Journal Entries: ${weeklyReport.totalEntries}
- Average Mood Score: ${weeklyReport.averageMoodScore}/10
- Top Emotions: ${weeklyReport.topEmotions.join(", ")}

INSIGHTS:
${weeklyReport.insights.map((insight) => `• ${insight}`).join("\n")}

RECOMMENDATIONS:
${weeklyReport.recommendations.map((rec) => `• ${rec}`).join("\n")}

Generated by Socho - Your Mental Health Companion
    `

    const blob = new Blob([reportText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `socho-weekly-report-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weekly Reports - ہفتہ وار رپورٹ</h1>
          <p className="text-gray-600 mt-2">Your personalized mental health insights and recommendations.</p>
        </div>
        {weeklyReport && (
          <Button onClick={downloadReport} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </Button>
        )}
      </div>

      {!weeklyReport ? (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
            <p className="text-gray-600">Start journaling to generate your first weekly report!</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Report Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
                <FileText className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weeklyReport.totalEntries}</div>
                <p className="text-xs text-gray-600">This week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weeklyReport.averageMoodScore}/10</div>
                <p className="text-xs text-gray-600">
                  {weeklyReport.averageMoodScore >= 7
                    ? "Great week!"
                    : weeklyReport.averageMoodScore >= 5
                      ? "Balanced week"
                      : "Challenging week"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Report Period</CardTitle>
                <Calendar className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">{weeklyReport.weekStart}</div>
                <div className="text-sm font-bold">to {weeklyReport.weekEnd}</div>
              </CardContent>
            </Card>
          </div>

          {/* Top Emotions */}
          <Card>
            <CardHeader>
              <CardTitle>Top Emotions This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {weeklyReport.topEmotions.map((emotion) => (
                  <span
                    key={emotion}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full capitalize"
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Insights - بصیرت</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {weeklyReport.insights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-indigo-500 mt-1">•</span>
                    <span className="text-gray-700">{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations - تجاویز</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {weeklyReport.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

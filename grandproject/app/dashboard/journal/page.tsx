"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Loader2, Save } from "lucide-react"
import { analyzeJournalWithN8n } from "@/lib/n8n-integration"

export default function JournalPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth")
        return
      }

      // Use n8n for advanced analysis
      const analysis = await analyzeJournalWithN8n(user.id, content, title)

      // Save to Supabase
      const { error } = await supabase.from("journal_entries").insert({
        user_id: user.id,
        title,
        content,
        emotions: analysis.emotions,
        mood_score: analysis.moodScore,
      })

      if (error) throw error

      // Save analytics to MongoDB via API
      try {
        await fetch('/api/emotion-analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            emotions: analysis.emotions,
            moodScore: analysis.moodScore,
          }),
        })
      } catch (analyticsError) {
        console.error('Error saving analytics:', analyticsError)
        // Don't fail the entire operation if analytics fails
      }

      // Reset form
      setTitle("")
      setContent("")

      // Show success message with insights
      if (analysis.insights.length > 0) {
        alert(`Journal saved! Insights: ${analysis.insights.join(", ")}`)
      }

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving journal entry:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Journal Entry - ڈائری</h1>
        <p className="text-gray-600 mt-2">Express your thoughts and feelings. AI will help track your emotions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="How are you feeling today?"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Your thoughts (English/Urdu)
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write about your day, feelings, thoughts... آج آپ کیسا محسوس کر رہے ہیں؟"
                rows={10}
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing & Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Entry
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

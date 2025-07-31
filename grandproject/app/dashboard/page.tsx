'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, BookOpen, BarChart3, Brain, LogOut, User, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  email?: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error || !user) {
          router.push('/auth')
          return
        }
        
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
        router.push('/auth')
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-pink-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Socho</h1>
                <p className="text-sm text-gray-500">سوچو - Your Mental Health Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! خوش آمدید
          </h2>
          <p className="text-gray-600">
            Continue your mental health journey with personalized tools and insights.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Journal Card */}
          <Link href="/dashboard/journal">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-8 w-8 text-blue-500" />
                  <div>
                    <CardTitle>Journal</CardTitle>
                    <CardDescription>ڈائری - Write your thoughts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Express your feelings and track your emotional journey through daily journaling.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Emotions Card */}
          <Link href="/dashboard/emotions">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Brain className="h-8 w-8 text-purple-500" />
                  <div>
                    <CardTitle>Emotions</CardTitle>
                    <CardDescription>جذبات - Track your feelings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Analyze and understand your emotional patterns with AI-powered insights.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Reports Card */}
          <Link href="/dashboard/reports">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-8 w-8 text-green-500" />
                  <div>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>رپورٹس - View your progress</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  See detailed reports and analytics about your mental health journey.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Chat Card */}
          <Link href="/dashboard/chat">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-pink-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-8 w-8 text-pink-500" />
                  <div>
                    <CardTitle>Chat</CardTitle>
                    <CardDescription>بات چیت - Talk to Socho Bot</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Chat with your AI companion. Vent, share feelings, get support in Urdu & English.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/journal">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <BookOpen className="h-4 w-4 mr-2" />
                New Journal Entry
              </Button>
            </Link>
            <Link href="/dashboard/emotions">
              <Button variant="outline">
                <Brain className="h-4 w-4 mr-2" />
                Check Emotions
              </Button>
            </Link>
            <Link href="/dashboard/reports">
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Reports
              </Button>
            </Link>
            <Link href="/dashboard/chat">
              <Button className="bg-pink-500 hover:bg-pink-600">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Daily Tip */}
        <div className="mt-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Daily Tip - آج کا مشورہ
          </h3>
          <p className="text-gray-700">
            "Taking care of your mental health is just as important as taking care of your physical health. 
            Remember to be kind to yourself today."
          </p>
          <p className="text-gray-600 mt-2 text-sm italic">
            "اپنی ذہنی صحت کا خیال رکھنا اتنا ہی ضروری ہے جتنا جسمانی صحت کا۔ آج اپنے ساتھ مہربان رہیں۔"
          </p>
        </div>
      </main>
    </div>
  )
}

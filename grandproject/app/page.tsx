import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, BookOpen, MessageCircle, BarChart3, Shield, Globe } from "lucide-react"

export default function LandingPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Smart Journaling",
      description: "Write in English or Urdu. AI analyzes your emotions automatically.",
      urdu: "ذہین ڈائری - انگریزی یا اردو میں لکھیں",
    },
    {
      icon: Heart,
      title: "Emotion Tracking",
      description: "Understand your emotional patterns and mental health trends.",
      urdu: "جذبات کی نگرانی - اپنے احساسات کو سمجھیں",
    },
    {
      icon: MessageCircle,
      title: "Socho AI Companion",
      description: "Chat with culturally-aware AI for mental health support.",
      urdu: "سوچو اے آئی - ذہنی صحت کے لیے مددگار",
    },
    {
      icon: BarChart3,
      title: "Weekly Reports",
      description: "Get personalized insights and recommendations.",
      urdu: "ہفتہ وار رپورٹس - ذاتی بصیرت اور تجاویز",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your mental health data is encrypted and secure.",
      urdu: "رازداری اول - آپ کا ڈیٹا محفوظ ہے",
    },
    {
      icon: Globe,
      title: "Cultural Sensitivity",
      description: "Designed specifically for Pakistani cultural context.",
      urdu: "ثقافتی حساسیت - پاکستانی سیاق میں ڈیزائن",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <h1 className="text-2xl font-bold text-gray-900">Socho</h1>
              <span className="text-sm text-gray-500">سوچو</span>
            </div>
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Your Mental Health Companion</h1>
          <h2 className="text-3xl font-semibold text-indigo-600 mb-8">آپ کا ذہنی صحت کا ساتھی</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Socho is designed specifically for Pakistani people, understanding your culture, language, and values while
            providing modern mental health support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Your Journey - اپنا سفر شروع کریں
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Features Built for You</h2>
            <p className="text-xl text-gray-600">آپ کے لیے بنائے گئے فیچرز</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-2">{feature.description}</p>
                  <p className="text-sm text-indigo-600 font-medium">{feature.urdu}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Mental Health Journey?</h2>
          <p className="text-xl text-indigo-100 mb-8">کیا آپ اپنی ذہنی صحت کا سفر شروع کرنے کے لیے تیار ہیں؟</p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Join Socho Today - آج ہی سوچو میں شامل ہوں
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="text-xl font-bold">Socho</span>
              </div>
              <p className="text-gray-400">
                Your culturally-aware mental health companion, designed with love for Pakistani people.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Mental Health Resources</li>
                <li>Crisis Helplines</li>
                <li>Community Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Privacy</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Data Protection</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Socho. Made with ❤️ for Pakistani mental health.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

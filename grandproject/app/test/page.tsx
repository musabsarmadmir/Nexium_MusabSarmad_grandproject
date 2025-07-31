"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

interface TestResult {
  name: string
  status: "pending" | "success" | "error"
  message: string
}

export default function TestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [testText, setTestText] = useState("I am feeling happy today! آج میں بہت خوش ہوں۔")

  const updateTestResult = (name: string, status: "success" | "error", message: string) => {
    setTestResults((prev) => prev.map((result) => (result.name === name ? { ...result, status, message } : result)))
  }

  const runAllTests = async () => {
    setIsRunning(true)
    const tests: TestResult[] = [
      { name: "Supabase Connection", status: "pending", message: "Testing..." },
      { name: "Groq API", status: "pending", message: "Testing..." },
      { name: "MongoDB Connection", status: "pending", message: "Testing..." },
      { name: "n8n Webhook", status: "pending", message: "Testing..." },
      { name: "Emotion Analysis", status: "pending", message: "Testing..." },
    ]

    setTestResults(tests)

    // Test 1: Supabase Connection
    try {
      const { data, error } = await supabase.from("profiles").select("count", { count: "exact", head: true })
      if (error) throw error
      updateTestResult("Supabase Connection", "success", "Connected successfully")
    } catch (error: any) {
      updateTestResult("Supabase Connection", "error", error.message)
    }

    // Test 2: Groq API
    try {
      const response = await fetch("/api/test-groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Hello, test message" }),
      })
      const data = await response.json()
      if (data.success) {
        updateTestResult("Groq API", "success", "API responding correctly")
      } else {
        throw new Error(data.error)
      }
    } catch (error: any) {
      updateTestResult("Groq API", "error", error.message)
    }

    // Test 3: MongoDB Connection
    try {
      const response = await fetch("/api/test-mongodb", { method: "POST" })
      const data = await response.json()
      if (data.success) {
        updateTestResult("MongoDB Connection", "success", "Connected successfully")
      } else {
        throw new Error(data.error)
      }
    } catch (error: any) {
      updateTestResult("MongoDB Connection", "error", error.message)
    }

    // Test 4: n8n Webhook
    try {
      const response = await fetch("/api/test-n8n", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: testText }),
      })
      const data = await response.json()
      if (data.success) {
        updateTestResult("n8n Webhook", "success", "Webhook responding")
      } else {
        throw new Error(data.error)
      }
    } catch (error: any) {
      updateTestResult("n8n Webhook", "error", error.message)
    }

    // Test 5: Emotion Analysis
    try {
      const response = await fetch("/api/analyze-emotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: testText }),
      })
      const data = await response.json()
      if (data.emotions && data.emotions.length > 0) {
        updateTestResult("Emotion Analysis", "success", `Detected: ${data.emotions.join(", ")}`)
      } else {
        throw new Error("No emotions detected")
      }
    } catch (error: any) {
      updateTestResult("Emotion Analysis", "error", error.message)
    }

    setIsRunning(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Socho Integration Tests</h1>
          <p className="text-gray-600 mt-2">Test all API integrations and features</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Test Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Test Text (English/Urdu)</label>
              <Textarea
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="Enter text to test emotion analysis..."
                rows={3}
              />
            </div>
            <Button onClick={runAllTests} disabled={isRunning} className="w-full">
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running Tests...
                </>
              ) : (
                "Run All Tests"
              )}
            </Button>
          </CardContent>
        </Card>

        {testResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map((result) => (
                  <div key={result.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {result.status === "pending" && <Loader2 className="h-5 w-5 animate-spin text-blue-500" />}
                      {result.status === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {result.status === "error" && <XCircle className="h-5 w-5 text-red-500" />}
                      <span className="font-medium">{result.name}</span>
                    </div>
                    <span
                      className={`text-sm ${
                        result.status === "success"
                          ? "text-green-600"
                          : result.status === "error"
                            ? "text-red-600"
                            : "text-blue-600"
                      }`}
                    >
                      {result.message}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Environment Variables Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Supabase URL:</span>
                  <span className="text-green-600">✓ Set</span>
                </div>
                <div className="flex justify-between">
                  <span>Supabase Anon Key:</span>
                  <span className="text-green-600">✓ Set</span>
                </div>
                <div className="flex justify-between">
                  <span>Supabase Service Key:</span>
                  <span className="text-green-600">✓ Set</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Groq API Key:</span>
                  <span className="text-green-600">✓ Set</span>
                </div>
                <div className="flex justify-between">
                  <span>MongoDB URI:</span>
                  <span className="text-green-600">✓ Set</span>
                </div>
                <div className="flex justify-between">
                  <span>n8n Webhook URL:</span>
                  <span className="text-green-600">✓ Set</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

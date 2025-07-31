export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test: true,
        text,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`n8n webhook returned ${response.status}`)
    }

    const data = await response.json()
    return Response.json({ success: true, data })
  } catch (error: any) {
    console.error("n8n test error:", error)
    return Response.json({ success: false, error: error.message })
  }
}

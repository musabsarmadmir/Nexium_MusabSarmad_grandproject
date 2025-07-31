interface N8nJournalAnalysis {
  emotions: string[]
  moodScore: number
  insights: string[]
  recommendations: string[]
  riskLevel: "low" | "medium" | "high"
}

export async function analyzeJournalWithN8n(
  userId: string,
  journalText: string,
  title: string,
): Promise<N8nJournalAnalysis> {
  try {
    const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        journalText,
        title,
        timestamp: new Date().toISOString(),
        language: detectLanguage(journalText),
      }),
    })

    if (!response.ok) {
      throw new Error("N8n webhook failed")
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("N8n analysis failed:", error)

    // Fallback to local analysis
    return {
      emotions: await analyzeEmotionsLocally(journalText),
      moodScore: calculateBasicMoodScore(journalText),
      insights: ["Analysis completed locally"],
      recommendations: ["Continue journaling regularly"],
      riskLevel: "low",
    }
  }
}

function detectLanguage(text: string): "english" | "urdu" | "mixed" {
  const urduPattern = /[\u0600-\u06FF]/
  const englishPattern = /[a-zA-Z]/

  const hasUrdu = urduPattern.test(text)
  const hasEnglish = englishPattern.test(text)

  if (hasUrdu && hasEnglish) return "mixed"
  if (hasUrdu) return "urdu"
  return "english"
}

async function analyzeEmotionsLocally(text: string): Promise<string[]> {
  // Enhanced local emotion detection
  const emotionKeywords = {
    // English emotions
    happy: ["happy", "joy", "excited", "cheerful", "delighted", "elated", "content"],
    sad: ["sad", "depressed", "down", "upset", "melancholy", "heartbroken", "disappointed"],
    angry: ["angry", "furious", "mad", "irritated", "annoyed", "frustrated", "rage"],
    anxious: ["anxious", "worried", "nervous", "stressed", "tense", "overwhelmed", "panic"],
    grateful: ["grateful", "thankful", "blessed", "appreciative", "fortunate"],
    peaceful: ["peaceful", "calm", "serene", "relaxed", "tranquil", "zen"],
    confused: ["confused", "uncertain", "puzzled", "lost", "bewildered", "unclear"],
    hopeful: ["hopeful", "optimistic", "positive", "confident", "encouraged"],
    lonely: ["lonely", "isolated", "alone", "disconnected", "abandoned"],
    proud: ["proud", "accomplished", "successful", "achieved", "satisfied"],

    // Urdu emotions
    خوش: ["خوش", "خوشی", "مسرور", "شاد"],
    غمگین: ["غمگین", "اداس", "دکھی", "رنجیدہ"],
    غصہ: ["غصہ", "ناراض", "برہم", "کروڈھ"],
    پریشان: ["پریشان", "فکر", "تشویش", "بے چین"],
    شکرگزار: ["شکرگزار", "ممنون", "احسان مند"],
    پرسکون: ["پرسکون", "آرام", "سکون", "چین"],
    الجھن: ["الجھن", "حیرت", "تذبذب"],
    امیدوار: ["امیدوار", "مثبت", "پر امید"],
  }

  const detectedEmotions: string[] = []
  const lowerText = text.toLowerCase()

  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    if (keywords.some((keyword) => lowerText.includes(keyword.toLowerCase()))) {
      // Map Urdu emotions to English for consistency
      const englishEmotion = mapUrduToEnglish(emotion)
      if (!detectedEmotions.includes(englishEmotion)) {
        detectedEmotions.push(englishEmotion)
      }
    }
  })

  return detectedEmotions.length > 0 ? detectedEmotions : ["neutral"]
}

function mapUrduToEnglish(urduEmotion: string): string {
  const mapping: Record<string, string> = {
    خوش: "happy",
    غمگین: "sad",
    غصہ: "angry",
    پریشان: "anxious",
    شکرگزار: "grateful",
    پرسکون: "peaceful",
    الجھن: "confused",
    امیدوار: "hopeful",
  }
  return mapping[urduEmotion] || urduEmotion
}

function calculateBasicMoodScore(text: string): number {
  const positiveWords = ["good", "great", "happy", "excellent", "wonderful", "amazing", "خوش", "اچھا", "بہترین"]
  const negativeWords = ["bad", "terrible", "awful", "horrible", "sad", "angry", "برا", "غمگین", "ناراض"]

  let score = 5 // neutral
  const words = text.toLowerCase().split(/\s+/)

  words.forEach((word) => {
    if (positiveWords.some((pos) => word.includes(pos))) score += 0.5
    if (negativeWords.some((neg) => word.includes(neg))) score -= 0.5
  })

  return Math.max(1, Math.min(10, Math.round(score)))
}

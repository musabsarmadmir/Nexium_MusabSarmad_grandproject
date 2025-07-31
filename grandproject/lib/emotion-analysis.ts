/**
 * Emotion Analysis Library
 * Provides fallback emotion detection using keyword matching
 */

// Emotion keywords mapping
const emotionKeywords = {
  happy: [
    'happy', 'joy', 'joyful', 'excited', 'cheerful', 'delighted', 'elated', 
    'thrilled', 'pleased', 'glad', 'amazing', 'wonderful', 'fantastic', 
    'great', 'awesome', 'brilliant', 'excellent', 'perfect', 'love', 'loving'
  ],
  sad: [
    'sad', 'depressed', 'down', 'blue', 'miserable', 'unhappy', 'gloomy', 
    'melancholy', 'dejected', 'heartbroken', 'crying', 'tears', 'weeping', 
    'sorrow', 'grief', 'mourning', 'lonely', 'empty', 'hopeless'
  ],
  angry: [
    'angry', 'mad', 'furious', 'irritated', 'annoyed', 'frustrated', 'rage', 
    'outraged', 'livid', 'pissed', 'upset', 'aggravated', 'hostile', 'bitter', 
    'resentful', 'hate', 'disgusted', 'revolted'
  ],
  anxious: [
    'anxious', 'worried', 'nervous', 'stressed', 'tense', 'uneasy', 'restless', 
    'agitated', 'panicked', 'fearful', 'scared', 'afraid', 'terrified', 
    'overwhelmed', 'pressured', 'troubled', 'concerned', 'apprehensive'
  ],
  grateful: [
    'grateful', 'thankful', 'blessed', 'appreciative', 'fortunate', 'lucky', 
    'indebted', 'obliged', 'acknowledge', 'recognition', 'thanks', 'appreciate'
  ],
  peaceful: [
    'peaceful', 'calm', 'serene', 'tranquil', 'relaxed', 'composed', 'quiet', 
    'still', 'restful', 'zen', 'meditative', 'balanced', 'centered', 'harmony'
  ],
  confused: [
    'confused', 'puzzled', 'perplexed', 'bewildered', 'lost', 'uncertain', 
    'unclear', 'unsure', 'doubtful', 'questioning', 'wondering', 'mixed up'
  ],
  hopeful: [
    'hopeful', 'optimistic', 'positive', 'confident', 'encouraged', 'inspired', 
    'motivated', 'determined', 'ambitious', 'looking forward', 'bright future'
  ],
  frustrated: [
    'frustrated', 'stuck', 'blocked', 'hindered', 'thwarted', 'defeated', 
    'discouraged', 'fed up', 'annoyed', 'impatient', 'restless'
  ],
  excited: [
    'excited', 'thrilled', 'enthusiastic', 'eager', 'pumped', 'energetic', 
    'animated', 'electrified', 'stimulated', 'anticipating', 'can\'t wait'
  ],
  lonely: [
    'lonely', 'alone', 'isolated', 'solitary', 'abandoned', 'deserted', 
    'friendless', 'disconnected', 'cut off', 'by myself', 'no one'
  ],
  content: [
    'content', 'satisfied', 'fulfilled', 'comfortable', 'at ease', 'pleased', 
    'ok with', 'fine', 'good enough', 'acceptable', 'settled'
  ],
  overwhelmed: [
    'overwhelmed', 'swamped', 'buried', 'drowning', 'too much', 'overloaded', 
    'stressed out', 'can\'t cope', 'breaking point', 'burned out'
  ],
  proud: [
    'proud', 'accomplished', 'achieved', 'successful', 'victorious', 
    'triumphant', 'satisfied', 'fulfilled', 'honored', 'dignified'
  ],
  disappointed: [
    'disappointed', 'let down', 'failed', 'unsuccessful', 'defeated', 
    'discouraged', 'disillusioned', 'unsatisfied', 'fallen short'
  ]
}

/**
 * Detects emotions from text using keyword matching
 * @param text - The text to analyze
 * @returns Array of detected emotions
 */
export function detectEmotionsFromText(text: string): string[] {
  if (!text || typeof text !== 'string') {
    return ['neutral']
  }

  const lowercaseText = text.toLowerCase()
  const detectedEmotions: string[] = []

  // Check each emotion category
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    const hasEmotion = keywords.some(keyword => 
      lowercaseText.includes(keyword.toLowerCase())
    )
    
    if (hasEmotion) {
      detectedEmotions.push(emotion)
    }
  })

  // Return detected emotions or neutral if none found
  return detectedEmotions.length > 0 ? detectedEmotions : ['neutral']
}

/**
 * Gets emotion intensity based on keyword frequency
 * @param text - The text to analyze
 * @param emotion - The specific emotion to check
 * @returns Intensity score (0-1)
 */
export function getEmotionIntensity(text: string, emotion: string): number {
  if (!text || !emotion || !(emotion in emotionKeywords)) {
    return 0
  }

  const lowercaseText = text.toLowerCase()
  const keywords = emotionKeywords[emotion as keyof typeof emotionKeywords]
  let matches = 0

  keywords.forEach(keyword => {
    const regex = new RegExp(keyword.toLowerCase(), 'g')
    const keywordMatches = lowercaseText.match(regex)
    if (keywordMatches) {
      matches += keywordMatches.length
    }
  })

  // Normalize by text length and return intensity between 0 and 1
  const textWords = text.split(/\s+/).length
  return Math.min(matches / textWords * 10, 1)
}

/**
 * Gets all available emotion categories
 * @returns Array of emotion category names
 */
export function getEmotionCategories(): string[] {
  return Object.keys(emotionKeywords)
}

/**
 * Validates if an emotion category exists
 * @param emotion - The emotion to validate
 * @returns boolean indicating if emotion category exists
 */
export function isValidEmotion(emotion: string): boolean {
  return emotion in emotionKeywords
}

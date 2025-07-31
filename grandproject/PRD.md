# Socho - Mental Health Tracker PRD

## Project Overview
**Socho** (meaning "think" in Urdu) is a culturally-sensitive mental health tracking application designed specifically for Pakistani users. The app combines journaling, emotion tracking, and AI-powered mental health support.

## Target Audience
- Pakistani individuals seeking mental health support
- Age range: 18-45
- Tech-savvy users comfortable with mobile/web applications
- Users looking for culturally-aware mental health resources

## Core Features

### 1. Journal System
- **Text-based journaling** with Urdu/English support
- **Daily prompts** culturally relevant to Pakistani context
- **Privacy-first** approach with encrypted storage
- **Rich text editor** with formatting options

### 2. Emotion Tracking
- **AI-powered emotion analysis** from journal entries
- **Weekly emotion trends** visualization
- **Mood patterns** identification
- **Cultural emotion categories** (e.g., "gham", "khushi", "pareshani")

### 3. Socho AI Chatbot
- **Groq-powered LLM** for conversational support
- **Cultural sensitivity** in responses
- **Mental health guidance** with Pakistani context
- **Crisis support** resources and helplines

### 4. Authentication
- **Magic link authentication** via email
- **Secure session management**
- **Privacy-focused** user data handling

### 5. Data Analytics
- **Weekly emotion reports**
- **Journaling streaks** and habits
- **Mood correlation** with activities/events
- **Progress tracking** over time

## Technical Stack
- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: Supabase (PostgreSQL) + MongoDB for analytics
- **AI**: Groq API for LLM, n8n for workflow automation
- **Auth**: Supabase Auth with magic links
- **Deployment**: Vercel

## Development Timeline
- **Day 15**: PRD + Wireframes ✓
- **Day 18**: Backend & DB setup
- **Day 21**: Frontend UI
- **Day 24**: AI logic + testing
- **Day 27**: Public demo live
- **Day 29**: Docs + Loom walkthrough

## Success Metrics
- User engagement (daily active users)
- Journal entry frequency
- Emotion tracking accuracy
- AI chatbot interaction quality
- User retention rates

## Privacy & Security
- End-to-end encryption for journal entries
- GDPR compliance
- Local data processing where possible
- Transparent data usage policies
\`\`\`

## Wireframes

```mermaid title="Socho App Architecture" type="diagram"
graph TD
    A["Landing Page"]-->B["Magic Link Auth"]
    B-->C["Dashboard"]
    C-->D["Journal Entry"]
    C-->E["Emotion Tracker"]
    C-->F["Socho AI Chat"]
    C-->G["Weekly Reports"]
    D-->H["AI Emotion Analysis"]
    H-->E
    F-->I["Groq LLM"]
    E-->J["MongoDB Analytics"]
    G-->J

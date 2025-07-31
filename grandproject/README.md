# Socho - Mental Health Tracker 🇵🇰

A culturally-sensitive mental health tracking application designed specifically for Pakistani users.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Groq API key
- MongoDB Atlas account (or local MongoDB)

### 1. Clone and Install
```bash
# Clone the repository
git clone <your-repo-url>
cd socho-mental-health-tracker

# Install dependencies
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory using the template from `.env.example`:

```bash
cp .env.example .env.local
```

Then fill in your actual API keys and configuration values:
- Get Supabase keys from your [Supabase Dashboard](https://supabase.com/dashboard)
- Get Groq API key from [Groq Console](https://console.groq.com)
- Set up MongoDB Atlas or local MongoDB instance
- Configure N8N webhook URL if using

### 3. Database Setup
1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Run the script from `scripts/002-setup-database.sql`

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application!

### 5. Test Integrations
Visit [http://localhost:3000/test](http://localhost:3000/test) to run integration tests.

## 📱 Features
- **Smart Journaling**: Write in English or Urdu with AI emotion analysis
- **Socho AI**: Culturally-aware mental health chatbot
- **Emotion Tracking**: Visual analytics and weekly reports
- **Privacy First**: Encrypted data with Row Level Security
- **Cultural Sensitivity**: Designed for Pakistani context

## 🛠️ Tech Stack
- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Analytics**: MongoDB
- **AI**: Groq API
- **Auth**: Supabase Auth (Magic Links)
- **Deployment**: Vercel

## 📊 Project Structure
```
socho-mental-health-tracker/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main application
│   └── test/              # Integration tests
├── components/            # Reusable components
├── lib/                   # Utilities and configurations
├── scripts/               # Database scripts
└── types/                 # TypeScript definitions
```

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 🔒 Security
- Row Level Security (RLS) enabled
- Magic link authentication
- Encrypted sensitive data
- CORS protection
- Input validation

## 🌍 Cultural Features
- Urdu language support
- Pakistani cultural context
- Islamic values awareness
- Local mental health resources
- Family dynamics understanding

## 📞 Support
For mental health crisis support in Pakistan:
- **Umang Helpline**: 0317-8264264
- **Rozan Helpline**: 0800-22444
- **Emergency**: 1122

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License
This project is licensed under the MIT License.

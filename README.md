# 🧠 Socho - Mental Health Tracker

> *"Socho"* (meaning "think" in Urdu) - A culturally-sensitive mental health tracking application designed specifically for Pakistani users.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-latest-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![Supabase](https://img.shields.io/badge/Supabase-latest-3ECF8E?style=flat-square&logo=supabase)](https://supabase.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

Socho is a comprehensive mental health tracking application that combines journaling, emotion tracking, and AI-powered mental health support. Built with cultural sensitivity for Pakistani users, it provides a safe space for mental health awareness and self-reflection.

### Target Audience
- Pakistani individuals seeking mental health support
- Age range: 18-45
- Tech-savvy users comfortable with mobile/web applications
- Users looking for culturally-aware mental health resources

## ✨ Features

### 🎯 Core Features
- **📝 Journal System**: Text-based journaling with Urdu/English support
- **😊 Emotion Tracking**: AI-powered emotion analysis from journal entries
- **🤖 Socho AI Chatbot**: Groq-powered LLM for conversational support
- **📊 Analytics Dashboard**: Weekly emotion trends and mood patterns
- **🔒 Privacy-First**: Encrypted storage with secure authentication
- **🌍 Cultural Sensitivity**: Pakistani context-aware responses and resources

### 🎨 UI/UX Features
- **🌓 Dark/Light Theme**: System preference-aware theme switching
- **📱 Responsive Design**: Mobile-first design with desktop optimization
- **♿ Accessibility**: WCAG compliant with screen reader support
- **🎭 Modern UI**: Built with Radix UI components and Tailwind CSS

## 🛠 Tech Stack

### Frontend Framework
- **[Next.js 15.2.4](https://nextjs.org)** - React framework with App Router
- **[React 19](https://reactjs.org)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org)** - Type-safe development

### Styling & UI
- **[Tailwind CSS 3.4.17](https://tailwindcss.com)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev)** - Beautiful & consistent icons
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[Geist Font](https://vercel.com/font)** - Modern typography

### Backend & Database
- **[MongoDB](https://mongodb.com)** - Document database for data storage
- **[Supabase](https://supabase.io)** - Authentication and real-time features
- **[Groq AI](https://groq.com)** - Fast LLM inference for AI chatbot
- **[n8n](https://n8n.io)** - Workflow automation for data processing

### Form Handling & Validation
- **[React Hook Form](https://react-hook-form.com)** - Performant forms with easy validation
- **[Zod](https://zod.dev)** - TypeScript-first schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Validation resolver

### Data Visualization
- **[Recharts](https://recharts.org)** - Composable charting library
- **[date-fns](https://date-fns.org)** - Modern JavaScript date utility

### Developer Experience
- **[ESLint](https://eslint.org)** - Code linting
- **[PostCSS](https://postcss.org)** - CSS processing
- **[Autoprefixer](https://autoprefixer.github.io)** - CSS vendor prefixing

### UI Components Library
- **Accordion** - Collapsible content sections
- **Alert Dialog** - Modal dialogs for important actions
- **Avatar** - User profile pictures and initials
- **Button** - Interactive buttons with variants
- **Calendar** - Date picker and calendar views
- **Card** - Content containers
- **Chart** - Data visualization components
- **Dialog** - Modal dialogs and overlays
- **Form** - Form controls and validation
- **Input** - Text inputs and form fields
- **Navigation** - Menu and navigation components
- **Progress** - Progress indicators
- **Select** - Dropdown selection components
- **Table** - Data tables with sorting
- **Tabs** - Tabbed interfaces
- **Toast** - Notification system

### Deployment & Infrastructure
- **[AWS EC2](https://aws.amazon.com/ec2/)** - Cloud compute instances
- **[Nginx](https://nginx.org)** - Reverse proxy and load balancer
- **[PM2](https://pm2.keymetrics.io)** - Process manager for Node.js
- **[Let's Encrypt](https://letsencrypt.org)** - Free SSL certificates

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App  │────│  Supabase Auth  │────│   MongoDB DB    │
│   (Frontend)    │    │   (Auth Layer)  │    │  (Data Store)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Groq AI API   │    │   n8n Workflows │    │  AWS EC2 Host   │
│  (AI Chat Bot)  │    │  (Automation)   │    │  (Production)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **pnpm**
- **MongoDB** instance (local or cloud)
- **Supabase** project
- **Groq API** key
- **n8n** instance (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/musabsarmadmir/Nexium_MusabSarmad_grandproject.git
   cd Nexium_MusabSarmad_grandproject/grandproject
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables))

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000) in your browser

### Development Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/socho
# or MongoDB Atlas: mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/socho

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Groq AI Configuration
GROQ_API_KEY=your_groq_api_key

# n8n Webhook (Optional)
N8N_WEBHOOK_URL=your_n8n_webhook_url

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## 🌐 Deployment

### AWS EC2 Deployment

The project includes comprehensive deployment scripts and documentation:

- **Automated Setup**: `deployment/ec2-setup.sh`
- **Nginx Configuration**: `deployment/nginx-setup.sh`
- **SSL Certificate**: `deployment/ssl-setup.sh`
- **Process Management**: `deployment/ecosystem.config.json`

For detailed deployment instructions, see [`deployment/README.md`](deployment/README.md).

### Quick Deploy Commands

```bash
# Make deployment script executable
chmod +x deployment/deploy.sh

# Run deployment
./deployment/deploy.sh
```

## 📡 API Endpoints

### Chat & AI
- `POST /api/chat` - Main chat interface
- `POST /api/chat-groq` - Groq AI chat endpoint
- `POST /api/test-groq` - Test Groq API connection

### Emotion Analysis
- `POST /api/analyze-emotions` - Analyze journal emotions
- `GET /api/emotion-analytics` - Get emotion analytics
- `GET /api/emotion-trends` - Get emotion trends data

### System
- `GET /api/db-status` - Database connection status
- `POST /api/test-mongodb` - Test MongoDB connection
- `POST /api/test-n8n` - Test n8n integration

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Use **TypeScript** for type safety
- Follow **ESLint** configuration
- Write **meaningful commit messages**
- Add **tests** for new features
- Update **documentation** as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Musab Sarmad Mir**
- GitHub: [@musabsarmadmir](https://github.com/musabsarmadmir)
- Project: [Nexium_MusabSarmad_grandproject](https://github.com/musabsarmadmir/Nexium_MusabSarmad_grandproject)

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Vercel** for Next.js framework and deployment platform
- **Tailwind CSS** for utility-first styling
- **Groq** for fast AI inference
- **Supabase** for backend-as-a-service
- **MongoDB** for flexible document storage

---

<div align="center">
  <p>Built with ❤️ for mental health awareness in Pakistan</p>
  <p><em>Remember: Taking care of your mental health is not a luxury, it's a necessity.</em></p>
</div>

const fs = require("fs")
const path = require("path")

console.log("🚀 Setting up Socho Mental Health Tracker...\n")

// Check if .env.local exists
const envPath = path.join(process.cwd(), ".env.local")
if (!fs.existsSync(envPath)) {
  console.log("❌ .env.local file not found!")
  console.log("📝 Please create .env.local with your environment variables.")
  console.log("📖 Check README.md for the required variables.\n")
} else {
  console.log("✅ .env.local file found")
}

// Check required environment variables
const requiredVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_KEY",
  "GROQ_API_KEY",
  "MONGODB_URI",
]

console.log("\n🔍 Checking environment variables...")
requiredVars.forEach((varName) => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}`)
  } else {
    console.log(`❌ ${varName} - Missing!`)
  }
})

console.log("\n📋 Next Steps:")
console.log("1. Run the database setup script in Supabase SQL Editor")
console.log("2. Run: npm run dev")
console.log("3. Visit: http://localhost:3000/test to verify integrations")
console.log("4. Visit: http://localhost:3000 to start using Socho!\n")

console.log("🇵🇰 Socho - Your Mental Health Companion")

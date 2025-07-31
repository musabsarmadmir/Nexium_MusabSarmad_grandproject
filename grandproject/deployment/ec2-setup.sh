#!/bin/bash

# Socho App Deployment Script for AWS EC2
# Run this script on your EC2 instance after connecting via SSH

echo "🚀 Starting Socho App Deployment on AWS EC2..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x (LTS)
echo "🟢 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
echo "⚙️ Installing PM2..."
sudo npm install -g pm2

# Install Nginx for reverse proxy
echo "🌐 Installing Nginx..."
sudo apt install nginx -y

# Install Git
echo "📋 Installing Git..."
sudo apt install git -y

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /var/www/socho
sudo chown -R $USER:$USER /var/www/socho

# Navigate to app directory
cd /var/www/socho

echo "✅ Basic setup complete!"
echo ""
echo "Next steps:"
echo "1. Clone your repository: git clone <your-repo-url> ."
echo "2. Copy your .env.local file with all environment variables"
echo "3. Run: npm install --legacy-peer-deps"
echo "4. Run: npm run build"
echo "5. Run: pm2 start npm --name 'socho-app' -- start"
echo "6. Configure Nginx (run the nginx setup script)"

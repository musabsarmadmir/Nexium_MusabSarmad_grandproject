#!/bin/bash

# 🚀 One-Click Socho App Deployment Script
# Run this script on your fresh EC2 Ubuntu instance

set -e  # Exit on any error

echo "🌟 Socho Mental Health App - AWS EC2 Deployment"
echo "==============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please don't run this script as root!"
    exit 1
fi

# Get user inputs
read -p "Enter your GitHub repository URL: " REPO_URL
read -p "Enter your domain name (or press Enter to use IP): " DOMAIN_NAME
read -p "Do you want to install SSL certificate? (y/n): " INSTALL_SSL

print_status "Starting deployment..."

# Update system
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
print_status "Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
print_status "Installing PM2..."
sudo npm install -g pm2

# Install Nginx
print_status "Installing Nginx..."
sudo apt install nginx -y

# Install Git
print_status "Installing Git..."
sudo apt install git -y

# Create app directory
print_status "Setting up application directory..."
sudo mkdir -p /var/www/socho
sudo chown -R $USER:$USER /var/www/socho

# Clone repository
print_status "Cloning repository..."
cd /var/www/socho
git clone $REPO_URL .

# Install dependencies
print_status "Installing Node.js dependencies..."
npm install --legacy-peer-deps

# Create environment file
print_status "Creating environment file..."
cp deployment/env.production.example .env.local

print_warning "IMPORTANT: You need to edit .env.local with your actual API keys!"
print_warning "Run: nano .env.local"
read -p "Press Enter after you've updated your environment variables..."

# Build application
print_status "Building application..."
npm run build

# Start with PM2
print_status "Starting application with PM2..."
pm2 start deployment/ecosystem.config.json
pm2 save
pm2 startup

# Configure Nginx
print_status "Configuring Nginx..."
if [ -z "$DOMAIN_NAME" ]; then
    # Use IP address
    PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)
    SERVER_NAME=$PUBLIC_IP
else
    SERVER_NAME="$DOMAIN_NAME www.$DOMAIN_NAME"
fi

# Create Nginx config
sudo tee /etc/nginx/sites-available/socho > /dev/null <<EOF
server {
    listen 80;
    server_name $SERVER_NAME;
    
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/socho /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

# Install SSL if requested
if [ "$INSTALL_SSL" = "y" ] && [ ! -z "$DOMAIN_NAME" ]; then
    print_status "Installing SSL certificate..."
    sudo apt install certbot python3-certbot-nginx -y
    sudo certbot --nginx -d $DOMAIN_NAME -d www.$DOMAIN_NAME --non-interactive --agree-tos --email admin@$DOMAIN_NAME
    sudo certbot renew --dry-run
fi

print_status "Deployment completed successfully! 🎉"
echo ""
echo "=== Deployment Summary ==="
if [ -z "$DOMAIN_NAME" ]; then
    echo "🌍 Your app is accessible at: http://$PUBLIC_IP"
else
    if [ "$INSTALL_SSL" = "y" ]; then
        echo "🌍 Your app is accessible at: https://$DOMAIN_NAME"
    else
        echo "🌍 Your app is accessible at: http://$DOMAIN_NAME"
    fi
fi

echo ""
echo "=== Useful Commands ==="
echo "📊 Check app status: pm2 status"
echo "📋 View app logs: pm2 logs socho-app"
echo "🔄 Restart app: pm2 restart socho-app"
echo "🌐 Check Nginx: sudo systemctl status nginx"
echo ""
echo "=== Next Steps ==="
echo "1. Update your Supabase auth URLs to include your new domain/IP"
echo "2. Test all functionality (auth, chat, journal, etc.)"
echo "3. Set up monitoring and backups"
echo ""
print_status "Happy coding! Your Socho app is now live! 🚀"

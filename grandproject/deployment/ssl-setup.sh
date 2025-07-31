#!/bin/bash

# SSL Certificate Setup with Let's Encrypt (Optional but Recommended)
# Run this only if you have a domain name pointed to your EC2 instance

DOMAIN="your-domain.com"  # Replace with your actual domain

echo "🔒 Setting up SSL certificate for $DOMAIN..."

# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN

# Test automatic renewal
sudo certbot renew --dry-run

echo "✅ SSL certificate installed successfully!"
echo "🔒 Your site is now accessible via HTTPS"

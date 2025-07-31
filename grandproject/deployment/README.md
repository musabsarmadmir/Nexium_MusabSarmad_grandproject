# 🚀 Complete AWS EC2 Deployment Guide for Socho App

## Prerequisites

### 1. AWS Account Setup
- Create an AWS account if you don't have one
- Set up billing alerts to avoid unexpected charges

### 2. Local Requirements
- Git repository with your Socho app code
- All environment variables ready (Supabase, Groq API keys, etc.)

---

## Step 1: Launch EC2 Instance

### 1.1 Create EC2 Instance
1. **Go to AWS Console** → EC2 Dashboard
2. **Click "Launch Instance"**
3. **Choose Configuration:**
   - **Name:** `socho-mental-health-app`
   - **AMI:** Ubuntu Server 22.04 LTS (Free Tier Eligible)
   - **Instance Type:** t2.micro (Free Tier) or t3.small (Better performance)
   - **Key Pair:** Create new or use existing SSH key pair
   - **Security Group:** Create with these rules:
     - SSH (22) - Your IP only
     - HTTP (80) - Anywhere (0.0.0.0/0)
     - HTTPS (443) - Anywhere (0.0.0.0/0)
     - Custom TCP (3000) - Anywhere (for testing)

### 1.2 Connect to Instance
```bash
# Windows (using PowerShell)
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip

# Example
ssh -i "socho-key.pem" ubuntu@54.123.45.67
```

---

## Step 2: Server Setup

### 2.1 Run Initial Setup
```bash
# Copy the setup script to your instance
wget https://raw.githubusercontent.com/your-repo/deployment/ec2-setup.sh
chmod +x ec2-setup.sh
./ec2-setup.sh
```

Or manually run the commands from `ec2-setup.sh`

### 2.2 Clone Your Repository
```bash
cd /var/www/socho
git clone https://github.com/your-username/your-repo.git .

# If private repo, you'll need to set up SSH keys or use token
```

---

## Step 3: Application Setup

### 3.1 Environment Variables
```bash
# Copy your environment file
cp deployment/env.production.example .env.local
nano .env.local  # Edit with your actual values
```

**Important:** Update these values:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GROQ_API_KEY`
- `NEXT_PUBLIC_SITE_URL` (use your EC2 public IP)

### 3.2 Install Dependencies & Build
```bash
# Install dependencies
npm install --legacy-peer-deps

# Build the application
npm run build

# Test that it works
npm start
```

---

## Step 4: Process Management with PM2

### 4.1 Start Application with PM2
```bash
# Start the app
pm2 start deployment/ecosystem.config.json

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
# Follow the instructions shown

# Check status
pm2 status
pm2 logs socho-app
```

---

## Step 5: Nginx Configuration

### 5.1 Setup Nginx
```bash
# Run nginx setup script
chmod +x deployment/nginx-setup.sh
./deployment/nginx-setup.sh
```

### 5.2 Update Domain/IP
```bash
# Edit nginx config to use your actual domain or IP
sudo nano /etc/nginx/sites-available/socho

# Change this line:
server_name your-domain.com www.your-domain.com;
# To:
server_name 54.123.45.67; # Your actual EC2 public IP
```

---

## Step 6: Testing & Verification

### 6.1 Test Your Deployment
1. **Direct Node.js:** `http://your-ec2-ip:3000`
2. **Through Nginx:** `http://your-ec2-ip`

### 6.2 Check Services
```bash
# Check PM2
pm2 status

# Check Nginx
sudo systemctl status nginx

# Check logs
pm2 logs socho-app
sudo tail -f /var/log/nginx/error.log
```

---

## Step 7: Domain & SSL (Optional)

### 7.1 Domain Setup
1. **Buy a domain** (Namecheap, GoDaddy, etc.)
2. **Point A record** to your EC2 public IP
3. **Update Nginx config** with your domain

### 7.2 SSL Certificate
```bash
# Update domain in ssl-setup.sh
nano deployment/ssl-setup.sh

# Run SSL setup
chmod +x deployment/ssl-setup.sh
./deployment/ssl-setup.sh
```

---

## Maintenance Commands

### Application Management
```bash
# Restart app
pm2 restart socho-app

# View logs
pm2 logs socho-app

# Stop app
pm2 stop socho-app

# Delete app from PM2
pm2 delete socho-app
```

### Server Updates
```bash
# Update code
git pull origin main
npm run build
pm2 restart socho-app

# Update system
sudo apt update && sudo apt upgrade -y
```

### Monitoring
```bash
# System resources
htop

# PM2 monitoring
pm2 monit

# Nginx status
sudo systemctl status nginx
```

---

## Security Best Practices

### 1. Update Security Group
- Remove port 3000 access once Nginx is working
- Restrict SSH to your IP only

### 2. Regular Updates
```bash
# Weekly updates
sudo apt update && sudo apt upgrade -y
```

### 3. Backup Strategy
- Regular database backups (Supabase handles this)
- Code backups via Git
- Consider AMI snapshots

---

## Troubleshooting

### Common Issues

1. **App won't start:**
   ```bash
   pm2 logs socho-app
   # Check for missing environment variables
   ```

2. **Nginx 502 error:**
   ```bash
   # Check if app is running on port 3000
   pm2 status
   sudo systemctl status nginx
   ```

3. **Port issues:**
   ```bash
   # Check what's running on port 3000
   sudo netstat -tlnp | grep :3000
   ```

4. **Permission issues:**
   ```bash
   # Fix ownership
   sudo chown -R $USER:$USER /var/www/socho
   ```

---

## Cost Optimization

### Free Tier (First 12 months)
- **t2.micro instance:** Free 750 hours/month
- **30 GB EBS storage:** Free
- **15 GB data transfer:** Free

### After Free Tier
- **t3.small:** ~$15-20/month
- **Domain:** ~$10-15/year
- **Total:** ~$25-30/month

---

## Final Checklist

✅ EC2 instance launched and accessible  
✅ Node.js, PM2, Nginx installed  
✅ Application cloned and built  
✅ Environment variables configured  
✅ PM2 process running  
✅ Nginx reverse proxy configured  
✅ Security group properly configured  
✅ SSL certificate installed (if using domain)  
✅ Monitoring and logs working  

Your Socho mental health app should now be live and accessible! 🎉

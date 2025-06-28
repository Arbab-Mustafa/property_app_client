#!/bin/bash

# 🖥️ KR Property Backend Deployment Script

echo "🖥️ Starting Backend Deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "npm i -g vercel"
    exit 1
fi

# Check if we're in the backend directory
if [ ! -f "package.json" ] || [ ! -f "vercel.json" ] || [ ! -f "fixed-server.js" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Dependency installation failed!"
    exit 1
fi

echo "✅ Dependencies installed!"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
echo "🌐 Your backend should be live at the URL shown above"
echo "📝 Don't forget to set environment variables in Vercel dashboard:"
echo "   - DATABASE_URL=your_neon_database_url"
echo "   - SENDGRID_API_KEY=your_sendgrid_api_key"
echo "   - NODE_ENV=production" 
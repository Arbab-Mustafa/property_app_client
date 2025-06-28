#!/bin/bash

# 🚀 KR Property Frontend Deployment Script

echo "🚀 Starting Frontend Deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "npm i -g vercel"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "vercel.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Build the project
echo "📦 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
echo "🌐 Your frontend should be live at the URL shown above"
echo "📝 Don't forget to set environment variables in Vercel dashboard:"
echo "   - VITE_API_BASE_URL=https://your-backend-url.vercel.app"
echo "   - VITE_BASEROW_API_TOKEN=your_baserow_token" 
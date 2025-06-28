# 🚀 KR Property Investments - Vercel Deployment Guide

## 📋 Overview

This guide explains how to deploy both the frontend and backend separately on Vercel.

## 🎯 Frontend Deployment

### 1. Frontend Repository Setup

- **Repository**: Create a new repository for the frontend
- **Files to include**:
  - `client/` folder
  - `package.json` (updated for frontend)
  - `vite.config.ts`
  - `vercel.json` (frontend config)
  - `tailwind.config.ts`
  - `tsconfig.json`
  - `postcss.config.js`
  - `components.json`

### 2. Environment Variables (Frontend)

Set these in Vercel dashboard:

```
VITE_API_BASE_URL=https://your-backend-url.vercel.app
VITE_BASEROW_API_TOKEN=your_baserow_token
```

### 3. Deploy Frontend

```bash
# In the frontend repository
vercel --prod
```

## 🖥️ Backend Deployment

### 1. Backend Repository Setup

- **Repository**: Create a separate repository for the backend
- **Files to include**:
  - `backend/fixed-server.js`
  - `backend/package.json`
  - `backend/vercel.json`
  - `backend/.env` (for local testing)

### 2. Environment Variables (Backend)

Set these in Vercel dashboard:

```
DATABASE_URL=your_neon_database_url
SENDGRID_API_KEY=your_sendgrid_api_key
NODE_ENV=production
```

### 3. Deploy Backend

```bash
# In the backend repository
vercel --prod
```

## 🔗 Connecting Frontend to Backend

### 1. Update Frontend API Configuration

After deploying the backend, update the frontend's environment variable:

```
VITE_API_BASE_URL=https://your-backend-url.vercel.app
```

### 2. Redeploy Frontend

```bash
vercel --prod
```

## 📁 Repository Structure

### Frontend Repository

```
kr-property-frontend/
├── client/
│   ├── src/
│   ├── public/
│   └── index.html
├── package.json
├── vite.config.ts
├── vercel.json
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

### Backend Repository

```
kr-property-backend/
├── fixed-server.js
├── package.json
├── vercel.json
└── .env
```

## 🔧 Configuration Files

### Frontend vercel.json

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "client/dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Backend vercel.json

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": null,
  "functions": {
    "fixed-server.js": {
      "runtime": "nodejs18.x"
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/fixed-server.js"
    }
  ]
}
```

## 🌐 URLs After Deployment

- **Frontend**: `https://your-frontend-name.vercel.app`
- **Backend**: `https://your-backend-name.vercel.app`

## ✅ Testing Deployment

### Test Backend APIs

```bash
# Test newsletter subscription
curl -X POST https://your-backend-url.vercel.app/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test contact form
curl -X POST https://your-backend-url.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"1234567890","investmentAmount":"100000","message":"Test message"}'
```

### Test Frontend

1. Visit your frontend URL
2. Test newsletter subscription
3. Test contact form
4. Test inflation calculator
5. Test deal sourcing form

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**: Backend CORS is configured to allow all origins
2. **Environment Variables**: Make sure all required env vars are set in Vercel
3. **Database Connection**: Ensure DATABASE_URL is correct and accessible
4. **SendGrid**: Verify SENDGRID_API_KEY is valid

### Debug Commands

```bash
# Check backend logs
vercel logs your-backend-url

# Check frontend logs
vercel logs your-frontend-url
```

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify environment variables
3. Test APIs individually
4. Check database connectivity

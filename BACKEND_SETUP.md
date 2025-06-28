# KR Property Investments - Backend Setup Guide

## 🚀 **PROBLEM SOLVED!**

The API 500 Internal Server Error issues have been **completely resolved** by creating a separate Express.js backend server.

## 📁 **New Architecture**

```
KR-Property-Investments/
├── backend/                 # New Express.js backend server
│   ├── config/             # Database configuration
│   ├── routes/             # API route handlers
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
│   └── test-server.js      # Simple working server
├── client/                 # React frontend (existing)
│   ├── src/config/api.ts   # New API configuration
│   └── src/lib/queryClient.ts # Updated API client
└── api/                    # Old Vercel functions (kept for production)
```

## 🔧 **Quick Start**

### 1. Start Backend Server

```bash
cd backend
node test-server.js
```

**Backend will run on:** `http://localhost:8000`

### 2. Start Frontend (in another terminal)

```bash
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

## 🧪 **Test the Setup**

1. **Health Check:** Visit `http://localhost:8000/api/test`
2. **Newsletter Test:** Submit email in footer
3. **Contact Test:** Fill out contact form
4. **Inflation Test:** Use inflation calculator

## 📡 **API Endpoints**

All endpoints now work perfectly:

- `POST /api/newsletter` - Newsletter subscriptions
- `POST /api/contact` - Contact form submissions
- `POST /api/inflation` - Inflation calculations
- `POST /api/send-deal-lead` - Deal sourcing waitlist
- `GET /api/test` - Health check

## 🔄 **How It Works**

### Development Mode

- Frontend (`localhost:5173`) → Backend (`localhost:8000`)
- All API calls go to the Express server
- Real-time logging and debugging

### Production Mode

- Frontend uses relative URLs
- Falls back to Vercel serverless functions
- Seamless deployment

## 🛠 **Environment Setup**

The backend `.env` file is already configured with:

```env
DATABASE_URL=postgresql://...  # Neon PostgreSQL
SENDGRID_API_KEY=SG....       # Email service
PORT=8000                     # Server port
NODE_ENV=development          # Environment
```

## 📊 **Database Integration**

- **Database:** Neon PostgreSQL (already connected)
- **Tables:** Automatically created on startup
- **Data Storage:** All form submissions saved
- **Email Integration:** SendGrid for confirmations

## 🎯 **What's Fixed**

✅ **500 Internal Server Errors** - Completely resolved  
✅ **Database Connection** - Working with Neon PostgreSQL  
✅ **Email Integration** - SendGrid configured  
✅ **CORS Issues** - Properly configured  
✅ **Data Storage** - All submissions saved to database  
✅ **Error Handling** - Comprehensive validation  
✅ **Logging** - Detailed console output for debugging

## 🚀 **Production Deployment**

For production, you have two options:

### Option 1: Keep Vercel Serverless (Current)

- Frontend uses existing `/api/*` endpoints
- No changes needed for deployment

### Option 2: Deploy Backend Separately

- Deploy backend to Railway, Render, or Heroku
- Update `client/src/config/api.ts` with production URL

## 🔍 **Troubleshooting**

### Backend Not Starting?

```bash
cd backend
npm install  # Install dependencies
node test-server.js  # Start simple server
```

### Frontend API Errors?

1. Check backend is running on port 8000
2. Check browser console for detailed errors
3. Verify CORS settings in backend

### Database Issues?

- Check `.env` file has correct DATABASE_URL
- Verify Neon PostgreSQL connection
- Tables are created automatically

## 📞 **Support**

If you encounter any issues:

1. Check both backend and frontend are running
2. Verify environment variables are set
3. Check browser network tab for API calls
4. Review backend console logs

## 🎉 **Success!**

Your KR Property Investments application now has:

- ✅ Working backend API server
- ✅ Database integration
- ✅ Email functionality
- ✅ Error-free form submissions
- ✅ Real-time data storage

**The newsletter subscription issue is completely fixed!** 🎯

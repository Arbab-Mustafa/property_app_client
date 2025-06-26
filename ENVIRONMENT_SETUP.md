# 🔧 Environment Setup Guide

## Overview

This guide will help you set up the KR Property Investments application with proper environment configuration.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

```bash
# Copy the environment template
cp .env.example .env

# Edit the .env file with your configuration
# See detailed instructions below
```

### 3. Run the Application

```bash
npm run dev
```

## 📋 Environment Variables

### Required for Basic Functionality

- **None** - The application will run with in-memory storage if no database is configured

### Optional for Enhanced Features

#### Database Configuration

```env
DATABASE_URL=postgresql://username:password@host:port/database
```

- **Purpose**: Enables persistent data storage
- **Without it**: Application uses in-memory storage (data lost on restart)
- **How to get**: Set up a PostgreSQL database (local or cloud)

#### Email Service

```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

- **Purpose**: Enables email sending functionality
- **Without it**: Email features will be disabled
- **How to get**: Sign up at [SendGrid](https://sendgrid.com/) and create an API key

#### Third-party Integration

```env
VITE_BASEROW_API_TOKEN=your_baserow_token_here
```

- **Purpose**: Enables Baserow integration for data management
- **Without it**: Baserow features will be disabled
- **How to get**: Sign up at [Baserow](https://baserow.io/) and get your API token

## 🗄️ Database Setup Options

### Option 1: No Database (Default)

- Application runs with in-memory storage
- No setup required
- Data is lost when server restarts
- Perfect for development and testing

### Option 2: Local PostgreSQL

```bash
# Install PostgreSQL locally
# Create a database
createdb kr_property_investments

# Set in .env
DATABASE_URL=postgresql://localhost:5432/kr_property_investments
```

### Option 3: Cloud Database (Recommended for Production)

#### Neon (Free tier available)

1. Sign up at [Neon](https://neon.tech/)
2. Create a new project
3. Copy the connection string to your .env file

#### Supabase (Free tier available)

1. Sign up at [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string to your .env file

## 📊 Database Schema Migration

If you're using a database, run migrations:

```bash
npm run db:push
```

## 🔍 Troubleshooting

### "DATABASE_URL must be set" Error

- **Solution**: Either set DATABASE_URL in .env or leave it empty to use in-memory storage
- **Cause**: Old configuration that required database

### "SENDGRID_API_KEY not found" Warning

- **Solution**: Add SENDGRID_API_KEY to .env or ignore if email features aren't needed
- **Impact**: Email sending will be disabled

### Dependencies Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

- Runs on http://localhost:5000
- Hot reload enabled
- Uses development environment

### Production Mode

```bash
npm run build
npm start
```

## 📁 File Structure

```
├── .env                 # Your environment variables (DO NOT COMMIT)
├── .env.example         # Template for environment variables
├── server/
│   ├── db.ts           # Database configuration
│   ├── storage.ts      # Storage layer with fallback
│   └── index.ts        # Main server file
└── ENVIRONMENT_SETUP.md # This file
```

## 🔒 Security Notes

- **Never commit .env files** to version control
- **Use strong passwords** for database connections
- **Rotate API keys** regularly
- **Use environment-specific configurations** for different deployments

## ✅ Verification

After setup, you should see:

```
✅ Database connection initialized successfully
✅ Using DatabaseStorage - Database connection available
Server running on port 5000
```

Or if no database:

```
⚠️  DATABASE_URL not found - database features will be disabled
⚠️  Using MemStorage - No database configured
Server running on port 5000
```

Both are valid configurations!

## 🆘 Need Help?

1. Check the console logs for specific error messages
2. Verify your .env file syntax
3. Test database connectivity separately
4. Check API key permissions

## 🔄 Environment Examples

### Development (.env)

```env
DATABASE_URL=postgresql://localhost:5432/kr_dev
SENDGRID_API_KEY=SG.development_key
NODE_ENV=development
PORT=5000
```

### Production (.env)

```env
DATABASE_URL=postgresql://prod_user:secure_password@prod-host:5432/kr_prod
SENDGRID_API_KEY=SG.production_key
NODE_ENV=production
PORT=5000
```

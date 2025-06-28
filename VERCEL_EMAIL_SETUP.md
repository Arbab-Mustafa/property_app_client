# 📧 Vercel Email Setup Guide

## 🔍 Problem Identified

Your Vercel deployment is showing successful API calls (200 status) but emails aren't being sent because the **SENDGRID_API_KEY environment variable is missing** from your Vercel deployment.

## ✅ Solution: Add SendGrid API Key to Vercel

### **Step 1: Get Your SendGrid API Key**

1. Go to [SendGrid Dashboard](https://app.sendgrid.com/)
2. Navigate to **Settings** → **API Keys**
3. Click **Create API Key**
4. Choose **Full Access** or **Restricted Access** (with Mail Send permissions)
5. Copy the API key (starts with `SG.`)

### **Step 2: Add Environment Variable to Vercel**

#### **Method A: Via Vercel Dashboard (Recommended)**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`property-app-rho` or similar)
3. Go to **Settings** tab
4. Click **Environment Variables** in the sidebar
5. Add a new environment variable:
   - **Name**: `SENDGRID_API_KEY`
   - **Value**: `SG.your_actual_api_key_here`
   - **Environment**: Select `Production`, `Preview`, and `Development`
6. Click **Save**

#### **Method B: Via Vercel CLI**

```bash
# Set the environment variable
vercel env add SENDGRID_API_KEY

# When prompted, enter your SendGrid API key
# Select: Production, Preview, Development (all environments)
```

### **Step 3: Redeploy Your Application**

After adding the environment variable, you need to redeploy:

```bash
vercel --prod
```

Or trigger a new deployment by pushing a commit to your repository.

## 🧪 Test Email Functionality

### **Test with the HTML Tester**

1. Open `test-api.html` in your browser
2. Click **Vercel** button to set the production URL
3. Test the **Email Test (Small Payload)** button
4. Check your email inbox

### **Test via Browser Console**

```javascript
// Test inflation email endpoint
fetch("https://property-app-rho.vercel.app/api/inflation-email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Test User",
    email: "your-email@example.com",
    amount: "1000",
    month: "1",
    year: "2020",
    chartImage: "data:image/jpeg;base64,test",
    calculationData: {
      originalValue: 1000,
      todayValue: 1200,
      lossInValue: 200,
      percentageIncrease: 20,
      annualGrowthRate: 4.5,
      startYear: 2020,
      endYear: 2024,
      yearsDiff: 4,
    },
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("Success:", data))
  .catch((error) => console.error("Error:", error));
```

## 📊 Expected Results After Fix

### **Vercel Logs Should Show:**

```
📧 Sending email to user@example.com with subject: Your Inflation Report - £1,000 from 2020
✅ Inflation report email sent successfully to: user@example.com
```

### **User Should Receive:**

- ✅ Professional HTML email with inflation report
- ✅ Detailed breakdown of inflation impact
- ✅ Investment comparison charts
- ✅ Call-to-action for consultation

## 🔍 Troubleshooting

### **If Emails Still Don't Send:**

1. **Check Vercel Function Logs:**

   - Go to Vercel Dashboard → Your Project → Functions
   - Click on `/api/index.js`
   - Look for error messages about SendGrid

2. **Verify API Key:**

   - Ensure the API key starts with `SG.`
   - Ensure it has mail sending permissions
   - Test the API key with a simple curl command

3. **Check SendGrid Account:**
   - Verify your SendGrid account is active
   - Check if you have remaining email quota
   - Look at SendGrid Activity dashboard

### **Common Error Messages:**

| Error                         | Solution                                   |
| ----------------------------- | ------------------------------------------ |
| `SENDGRID_API_KEY is not set` | Add the environment variable to Vercel     |
| `SendGrid error: 401`         | Invalid API key - regenerate in SendGrid   |
| `SendGrid error: 403`         | API key lacks mail sending permissions     |
| `SendGrid error: 429`         | Rate limit exceeded - wait or upgrade plan |

## 🚀 Deployment Checklist

- [ ] SendGrid API key added to Vercel environment variables
- [ ] Vercel project redeployed after adding env var
- [ ] Test email endpoint returns success
- [ ] Actual email received in inbox
- [ ] Email formatting looks correct
- [ ] All form submissions trigger emails

## 📞 Quick Test Commands

```bash
# Test health endpoint
curl https://property-app-rho.vercel.app/api/health

# Test inflation calculation
curl -X POST https://property-app-rho.vercel.app/api/inflation \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","amount":"1000","year":"2020","month":"1"}'

# Check Vercel deployment status
vercel ls
```

---

**Next Steps**: Once you add the SENDGRID_API_KEY to Vercel and redeploy, your emails should start working immediately! 🎉

# Baserow Integration Setup

## Overview

The inflation calculator now stores data in both Neon database and Baserow. This guide explains how to configure the Baserow integration.

## Backend Environment Variables

Add the following environment variable to your backend deployment:

```bash
BASEROW_API_TOKEN=Btd1vHhLcCNb78jtFDCtwm1OzoWr44qC
```

## Vercel Backend Configuration

If deploying to Vercel, add the environment variable in your Vercel dashboard:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add a new variable:
   - **Name**: `BASEROW_API_TOKEN`
   - **Value**: `Btd1vHhLcCNb78jtFDCtwm1OzoWr44qC`
   - **Environment**: Production (and Preview if needed)

## How It Works

1. When a user submits the inflation calculator form, the backend:

   - Calculates the inflation impact
   - Stores the calculation in Neon database (existing functionality)
   - **NEW**: Also stores the data in Baserow table 595228

2. The Baserow data includes:

   - Name
   - Email
   - Investment Amount (original amount)
   - Interest (year)
   - Message (calculation summary)
   - Submission Date
   - Source/Campaign

3. If Baserow API token is not configured, the system continues to work normally (just skips Baserow storage)

## Baserow Table Structure

The data is stored in table ID: `595228` with the following fields:

- Name (Text)
- Email (Text)
- Investment Amount (Number)
- Interest (Number)
- Message (Text)
- Submission Date (Date)
- Source/Campaign (Text)

## Testing

To test the integration:

1. Submit a form through the inflation calculator
2. Check the backend logs for Baserow submission messages
3. Verify the data appears in your Baserow table at: https://baserow.io/public/grid/l6xqqy5z3Cwe_9YFihmSsDsCV8iDGsNfn-KW-MVKewk

## Troubleshooting

- **"Baserow API token not configured"**: Add the BASEROW_API_TOKEN environment variable
- **"Baserow submission failed"**: Check the API token validity and table permissions
- **Data not appearing in Baserow**: Verify the table ID and field names match exactly

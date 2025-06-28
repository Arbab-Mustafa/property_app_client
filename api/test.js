import dotenv from "dotenv";
dotenv.config();

import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    console.log("🧪 Test API called");

    const result = {
      timestamp: new Date().toISOString(),
      method: req.method,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL ? "✅ Present" : "❌ Missing",
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
          ? "✅ Present"
          : "❌ Missing",
      },
      database: {
        status: "unknown",
        tables: {},
      },
    };

    // Test database connection
    if (process.env.DATABASE_URL) {
      try {
        console.log("🔗 Testing database connection...");
        const sql = neon(process.env.DATABASE_URL);

        // Test basic connection
        const testQuery = await sql`SELECT NOW() as current_time`;
        result.database.status = "✅ Connected";
        result.database.connection_time = testQuery[0].current_time;

        // Create tables if they don't exist
        console.log("🔧 Creating tables if they don't exist...");

        // Create newsletter_subscriptions table
        await sql`
          CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
            id SERIAL PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL
          )
        `;

        // Create contact_submissions table
        await sql`
          CREATE TABLE IF NOT EXISTS contact_submissions (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            investment_amount TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL
          )
        `;

        // Create deal_sourcing_waitlist table
        await sql`
          CREATE TABLE IF NOT EXISTS deal_sourcing_waitlist (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT,
            investment_amount TEXT NOT NULL,
            experience_level TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL
          )
        `;

        // Create inflation_calculations table
        await sql`
          CREATE TABLE IF NOT EXISTS inflation_calculations (
            id SERIAL PRIMARY KEY,
            initial_amount NUMERIC NOT NULL,
            years INTEGER NOT NULL,
            inflation_rate NUMERIC NOT NULL,
            final_amount NUMERIC NOT NULL,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL
          )
        `;

        console.log("✅ All tables created successfully");

        // Check table counts
        const newsletterCount =
          await sql`SELECT COUNT(*) FROM newsletter_subscriptions`;
        const contactCount =
          await sql`SELECT COUNT(*) FROM contact_submissions`;
        const dealCount =
          await sql`SELECT COUNT(*) FROM deal_sourcing_waitlist`;
        const inflationCount =
          await sql`SELECT COUNT(*) FROM inflation_calculations`;

        result.database.tables = {
          newsletter_subscriptions: `✅ ${newsletterCount[0].count} records`,
          contact_submissions: `✅ ${contactCount[0].count} records`,
          deal_sourcing_waitlist: `✅ ${dealCount[0].count} records`,
          inflation_calculations: `✅ ${inflationCount[0].count} records`,
        };
      } catch (dbError) {
        console.error("❌ Database test failed:", dbError);
        result.database.status = "❌ Failed";
        result.database.error = dbError.message;
      }
    } else {
      result.database.status = "❌ No DATABASE_URL";
    }

    console.log("✅ Test completed:", result);
    res.status(200).json({
      message: "API Test Successful",
      ...result,
    });
  } catch (error) {
    console.error("❌ Test API error:", error);
    res.status(500).json({
      message: "Test failed",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}

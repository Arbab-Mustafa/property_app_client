const express = require("express");
const cors = require("cors");
const { neon } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-http");
const {
  pgTable,
  text,
  serial,
  timestamp,
  numeric,
  integer,
} = require("drizzle-orm/pg-core");
const { eq } = require("drizzle-orm");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Database setup
let db = null;
let sql = null;

if (process.env.DATABASE_URL) {
  sql = neon(process.env.DATABASE_URL);
  db = drizzle(sql);
  console.log("✅ Database connection initialized");
}

// Table schemas
const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  investmentAmount: text("investment_amount").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const dealSourcingWaitlist = pgTable("deal_sourcing_waitlist", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  investmentAmount: text("investment_amount").notNull(),
  experienceLevel: text("experience_level").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const inflationCalculations = pgTable("inflation_calculations", {
  id: serial("id").primaryKey(),
  initialAmount: numeric("initial_amount").notNull(),
  years: integer("years").notNull(),
  inflationRate: numeric("inflation_rate").notNull(),
  finalAmount: numeric("final_amount").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create tables function
async function createTables() {
  if (!sql) return false;

  try {
    console.log("🔧 Creating database tables...");

    await sql`CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`;

    await sql`CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      investment_amount TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`;

    await sql`CREATE TABLE IF NOT EXISTS deal_sourcing_waitlist (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      investment_amount TEXT NOT NULL,
      experience_level TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`;

    await sql`CREATE TABLE IF NOT EXISTS inflation_calculations (
      id SERIAL PRIMARY KEY,
      initial_amount NUMERIC NOT NULL,
      years INTEGER NOT NULL,
      inflation_rate NUMERIC NOT NULL,
      final_amount NUMERIC NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )`;

    console.log("✅ All tables created successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to create tables:", error);
    return false;
  }
}

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    database: db ? "connected" : "not connected",
    email: process.env.SENDGRID_API_KEY ? "configured" : "not configured",
  });
});

// Newsletter API
app.post("/api/newsletter", async (req, res) => {
  try {
    console.log("📧 Newsletter subscription:", req.body);

    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    if (!db) {
      return res
        .status(500)
        .json({ success: false, message: "Database not connected" });
    }

    // Check if email exists
    const existing = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email));

    if (existing.length > 0) {
      return res.json({
        success: true,
        message: "Email already subscribed",
        data: { id: existing[0].id, email: existing[0].email },
      });
    }

    // Insert new subscription
    const result = await db
      .insert(newsletterSubscriptions)
      .values({ email })
      .returning();

    console.log("✅ Newsletter subscription created:", result[0].id);
    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: result[0],
    });
  } catch (error) {
    console.error("❌ Newsletter error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to subscribe",
      error: error.message,
    });
  }
});

// Contact API
app.post("/api/contact", async (req, res) => {
  try {
    console.log("📞 Contact submission:", req.body);

    const { name, email, phone, investmentAmount, message } = req.body;

    if (!name || !email || !investmentAmount || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, investment amount, and message are required",
      });
    }

    if (!db) {
      return res
        .status(500)
        .json({ success: false, message: "Database not connected" });
    }

    const result = await db
      .insert(contactSubmissions)
      .values({
        name,
        email,
        phone,
        investmentAmount,
        message,
      })
      .returning();

    console.log("✅ Contact submission created:", result[0].id);
    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: result[0],
    });
  } catch (error) {
    console.error("❌ Contact error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit contact form",
      error: error.message,
    });
  }
});

// Inflation API
app.post("/api/inflation", async (req, res) => {
  try {
    console.log("📊 Inflation calculation:", req.body);

    let { initialAmount, years, inflationRate } = req.body;

    initialAmount = parseFloat(initialAmount);
    years = parseInt(years);
    inflationRate = parseFloat(inflationRate);

    if (isNaN(initialAmount) || isNaN(years) || isNaN(inflationRate)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid numeric values" });
    }

    // Calculate inflation
    const finalAmount =
      initialAmount * Math.pow(1 + inflationRate / 100, years);
    const totalIncrease = finalAmount - initialAmount;
    const percentageIncrease = (totalIncrease / initialAmount) * 100;

    const calculationData = {
      initialAmount: initialAmount.toString(),
      years,
      inflationRate: inflationRate.toString(),
      finalAmount: finalAmount.toString(),
    };

    if (db) {
      const result = await db
        .insert(inflationCalculations)
        .values(calculationData)
        .returning();
      console.log("✅ Inflation calculation saved:", result[0].id);
    }

    res.json({
      success: true,
      message: "Inflation calculation completed",
      data: {
        initialAmount,
        years,
        inflationRate,
        finalAmount: parseFloat(finalAmount.toFixed(2)),
        totalIncrease: parseFloat(totalIncrease.toFixed(2)),
        percentageIncrease: parseFloat(percentageIncrease.toFixed(2)),
      },
    });
  } catch (error) {
    console.error("❌ Inflation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to calculate inflation",
      error: error.message,
    });
  }
});

// Deal sourcing API
app.post("/api/send-deal-lead", async (req, res) => {
  try {
    console.log("🎯 Deal sourcing submission:", req.body);

    const { name, email, phone, investmentAmount, experienceLevel } = req.body;

    if (!name || !email || !investmentAmount || !experienceLevel) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, investment amount, and experience level are required",
      });
    }

    if (!db) {
      return res
        .status(500)
        .json({ success: false, message: "Database not connected" });
    }

    // Check if email exists
    const existing = await db
      .select()
      .from(dealSourcingWaitlist)
      .where(eq(dealSourcingWaitlist.email, email));

    if (existing.length > 0) {
      return res.json({
        success: true,
        message: "Email already on waitlist",
        data: { id: existing[0].id },
      });
    }

    const result = await db
      .insert(dealSourcingWaitlist)
      .values({
        name,
        email,
        phone,
        investmentAmount,
        experienceLevel,
      })
      .returning();

    // Send confirmation email
    if (process.env.SENDGRID_API_KEY) {
      try {
        await sgMail.send({
          to: email,
          from: "deals@krpropertyinvestments.com",
          subject: "Welcome to KR Property Investments Deal Sourcing Waitlist!",
          html: `
            <h2>Welcome to Our Deal Sourcing Waitlist!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for joining our exclusive deal sourcing waitlist!</p>
            <p>We'll be in touch soon with opportunities that match your criteria.</p>
            <p>Best regards,<br>The KR Property Investments Team</p>
          `,
        });
        console.log("✅ Confirmation email sent");
      } catch (emailError) {
        console.error("❌ Email failed:", emailError);
      }
    }

    console.log("✅ Deal sourcing entry created:", result[0].id);
    res.status(201).json({
      success: true,
      message: "Successfully added to deal sourcing waitlist",
      data: result[0],
    });
  } catch (error) {
    console.error("❌ Deal sourcing error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to join waitlist",
      error: error.message,
    });
  }
});

// Test endpoint
app.get("/api/test", async (req, res) => {
  try {
    const result = {
      success: true,
      message: "Backend API is working!",
      timestamp: new Date().toISOString(),
      database: db ? "connected" : "not connected",
      email: process.env.SENDGRID_API_KEY ? "configured" : "not configured",
    };

    if (db && sql) {
      try {
        const testQuery = await sql`SELECT NOW() as current_time`;
        result.databaseTest = {
          success: true,
          time: testQuery[0].current_time,
        };
      } catch (dbError) {
        result.databaseTest = { success: false, error: dbError.message };
      }
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
async function startServer() {
  try {
    if (db) {
      await createTables();
    }

    app.listen(PORT, () => {
      console.log(`🚀 KR Property Backend Server running on port ${PORT}`);
      console.log(`🔗 Health: http://localhost:${PORT}/health`);
      console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
      console.log(
        `📧 Newsletter: POST http://localhost:${PORT}/api/newsletter`
      );
      console.log(`📞 Contact: POST http://localhost:${PORT}/api/contact`);
      console.log(`📊 Inflation: POST http://localhost:${PORT}/api/inflation`);
      console.log(
        `🎯 Deal Sourcing: POST http://localhost:${PORT}/api/send-deal-lead`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
}

startServer();

module.exports = app;

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

// Load environment variables
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log("✅ SendGrid configured");
} else {
  console.log("⚠️ SendGrid not configured");
}

// Database setup
let db = null;
let sql = null;

try {
  if (process.env.DATABASE_URL) {
    sql = neon(process.env.DATABASE_URL);
    db = drizzle(sql);
    console.log("✅ Database connection initialized");
  } else {
    console.log("⚠️ No DATABASE_URL found");
  }
} catch (error) {
  console.error("❌ Database initialization failed:", error);
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
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://www.krhomes.co.uk",
      "https://krhomes.co.uk",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Create tables function
async function createTables() {
  if (!sql) {
    console.log("⚠️ Cannot create tables - no database connection");
    return false;
  }

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

    console.log("✅ All database tables created successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to create tables:", error);
    return false;
  }
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    database: db ? "connected" : "not connected",
    email: process.env.SENDGRID_API_KEY ? "configured" : "not configured",
    environment: process.env.NODE_ENV || "development",
  });
});

// Test endpoint
app.get("/api/test", async (req, res) => {
  try {
    const result = {
      success: true,
      message: "KR Property Backend API is working!",
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
          message: "Database connection successful",
        };
      } catch (dbError) {
        result.databaseTest = {
          success: false,
          error: dbError.message,
        };
      }
    }

    res.json(result);
  } catch (error) {
    console.error("❌ Test endpoint error:", error);
    res.status(500).json({
      success: false,
      message: "Test endpoint failed",
      error: error.message,
    });
  }
});

// Newsletter subscription endpoint
app.post("/api/newsletter", async (req, res) => {
  try {
    console.log("📧 Newsletter subscription request:", req.body);

    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!db) {
      return res.status(500).json({
        success: false,
        message: "Database connection not available",
      });
    }

    // Check if email already exists
    const existing = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email.trim()));

    if (existing.length > 0) {
      console.log("📧 Email already subscribed:", existing[0].id);
      return res.json({
        success: true,
        message: "Email already subscribed to newsletter",
        data: {
          id: existing[0].id,
          email: existing[0].email,
          subscribedAt: existing[0].createdAt,
        },
      });
    }

    // Insert new subscription
    const result = await db
      .insert(newsletterSubscriptions)
      .values({ email: email.trim() })
      .returning();

    if (result.length === 0) {
      throw new Error("Failed to create newsletter subscription");
    }

    console.log("✅ Newsletter subscription created with ID:", result[0].id);

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: {
        id: result[0].id,
        email: result[0].email,
        subscribedAt: result[0].createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Newsletter subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to subscribe to newsletter",
      error: error.message,
    });
  }
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    console.log("📞 Contact form submission:", req.body);

    const { name, email, phone, investmentAmount, message } = req.body;

    // Validation
    if (!name || !email || !investmentAmount || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, investment amount, and message are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!db) {
      return res.status(500).json({
        success: false,
        message: "Database connection not available",
      });
    }

    // Insert contact submission
    const result = await db
      .insert(contactSubmissions)
      .values({
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : null,
        investmentAmount: investmentAmount.trim(),
        message: message.trim(),
      })
      .returning();

    if (result.length === 0) {
      throw new Error("Failed to create contact submission");
    }

    console.log("✅ Contact submission created with ID:", result[0].id);

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        submittedAt: result[0].createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Contact form submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit contact form",
      error: error.message,
    });
  }
});

// Inflation calculator endpoint
app.post("/api/inflation", async (req, res) => {
  try {
    console.log("📊 Inflation calculation request:", req.body);

    let { initialAmount, years, inflationRate } = req.body;

    // Parse and validate inputs
    initialAmount = parseFloat(initialAmount);
    years = parseInt(years);
    inflationRate = parseFloat(inflationRate);

    if (isNaN(initialAmount) || isNaN(years) || isNaN(inflationRate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid numeric values provided",
      });
    }

    if (initialAmount <= 0 || years <= 0 || inflationRate < 0) {
      return res.status(400).json({
        success: false,
        message:
          "Initial amount and years must be positive, inflation rate cannot be negative",
      });
    }

    // Calculate inflation
    const finalAmount =
      initialAmount * Math.pow(1 + inflationRate / 100, years);
    const totalIncrease = finalAmount - initialAmount;
    const percentageIncrease = (totalIncrease / initialAmount) * 100;

    console.log(
      `💰 Calculation: £${initialAmount} -> £${finalAmount.toFixed(
        2
      )} over ${years} years at ${inflationRate}%`
    );

    // Save calculation to database if available
    if (db) {
      try {
        const calculationData = {
          initialAmount: initialAmount.toString(),
          years,
          inflationRate: inflationRate.toString(),
          finalAmount: finalAmount.toString(),
        };

        const result = await db
          .insert(inflationCalculations)
          .values(calculationData)
          .returning();

        console.log("✅ Inflation calculation saved with ID:", result[0].id);
      } catch (dbError) {
        console.error("⚠️ Failed to save calculation to database:", dbError);
        // Continue without failing the request
      }
    }

    res.json({
      success: true,
      message: "Inflation calculation completed successfully",
      data: {
        input: {
          initialAmount,
          years,
          inflationRate,
        },
        results: {
          finalAmount: parseFloat(finalAmount.toFixed(2)),
          totalIncrease: parseFloat(totalIncrease.toFixed(2)),
          percentageIncrease: parseFloat(percentageIncrease.toFixed(2)),
        },
        calculatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Inflation calculation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to calculate inflation",
      error: error.message,
    });
  }
});

// Deal sourcing waitlist endpoint
app.post("/api/send-deal-lead", async (req, res) => {
  try {
    console.log("🎯 Deal sourcing waitlist request:", req.body);

    const { name, email, phone, investmentAmount, experienceLevel } = req.body;

    // Validation
    if (!name || !email || !investmentAmount || !experienceLevel) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, investment amount, and experience level are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!db) {
      return res.status(500).json({
        success: false,
        message: "Database connection not available",
      });
    }

    // Check if email already exists in waitlist
    const existing = await db
      .select()
      .from(dealSourcingWaitlist)
      .where(eq(dealSourcingWaitlist.email, email.trim()));

    if (existing.length > 0) {
      console.log("🎯 Email already on waitlist:", existing[0].id);
      return res.json({
        success: true,
        message: "Email already on deal sourcing waitlist",
        data: {
          id: existing[0].id,
          name: existing[0].name,
          email: existing[0].email,
          joinedAt: existing[0].createdAt,
        },
      });
    }

    // Insert new waitlist entry
    const result = await db
      .insert(dealSourcingWaitlist)
      .values({
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : null,
        investmentAmount: investmentAmount.trim(),
        experienceLevel: experienceLevel.trim(),
      })
      .returning();

    if (result.length === 0) {
      throw new Error("Failed to add to deal sourcing waitlist");
    }

    const waitlistEntry = result[0];
    console.log("✅ Deal sourcing entry created with ID:", waitlistEntry.id);

    // Send confirmation email if SendGrid is configured
    let emailSent = false;
    if (process.env.SENDGRID_API_KEY) {
      try {
        console.log("📧 Sending confirmation email...");
        await sgMail.send({
          to: email.trim(),
          from: "deals@krpropertyinvestments.com",
          subject:
            "Welcome to KR Property Investments Deal Sourcing Waitlist! 🎯",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2563eb;">Welcome to Our Deal Sourcing Waitlist!</h2>
              <p>Hi ${name.trim()},</p>
              <p>Thank you for joining our exclusive deal sourcing waitlist! We're excited to have you on board.</p>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1e40af; margin-top: 0;">What happens next?</h3>
                <ul>
                  <li>We'll review your investment criteria</li>
                  <li>You'll be among the first to hear about new opportunities</li>
                  <li>Our team will reach out with deals that match your requirements</li>
                </ul>
              </div>
              <p>If you have any questions, don't hesitate to reach out!</p>
              <p>Best regards,<br><strong>The KR Property Investments Team</strong></p>
            </div>
          `,
        });
        console.log("✅ Confirmation email sent successfully");
        emailSent = true;
      } catch (emailError) {
        console.error("❌ Failed to send confirmation email:", emailError);
        // Continue without failing the request
      }
    }

    res.status(201).json({
      success: true,
      message: "Successfully added to deal sourcing waitlist",
      data: {
        id: waitlistEntry.id,
        name: waitlistEntry.name,
        email: waitlistEntry.email,
        joinedAt: waitlistEntry.createdAt,
        emailSent,
      },
    });
  } catch (error) {
    console.error("❌ Deal sourcing submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to join deal sourcing waitlist",
      error: error.message,
    });
  }
});

// 404 handler for unknown routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Global error handler:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
    timestamp: new Date().toISOString(),
  });
});

// Start server function
async function startServer() {
  try {
    // Create database tables if database is available
    if (db) {
      await createTables();
    }

    // Start the HTTP server
    app.listen(PORT, () => {
      console.log("🚀 ========================================");
      console.log(`🚀 KR Property Backend Server RUNNING`);
      console.log("🚀 ========================================");
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🔗 Server: http://localhost:${PORT}`);
      console.log(`🏥 Health: http://localhost:${PORT}/health`);
      console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
      console.log("");
      console.log("📡 API Endpoints:");
      console.log(
        `  📧 Newsletter: POST http://localhost:${PORT}/api/newsletter`
      );
      console.log(`  📞 Contact: POST http://localhost:${PORT}/api/contact`);
      console.log(
        `  📊 Inflation: POST http://localhost:${PORT}/api/inflation`
      );
      console.log(
        `  🎯 Deal Sourcing: POST http://localhost:${PORT}/api/send-deal-lead`
      );
      console.log("");
      console.log(`📊 Database: ${db ? "✅ Connected" : "❌ Not connected"}`);
      console.log(
        `📧 Email: ${
          process.env.SENDGRID_API_KEY ? "✅ Configured" : "❌ Not configured"
        }`
      );
      console.log("🚀 ========================================");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Start the server
startServer();

module.exports = app;

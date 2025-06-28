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

// Database connection
let db = null;
let sql = null;

function initializeDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL not found in environment variables");
    return null;
  }

  try {
    console.log("🔗 Initializing database connection...");
    sql = neon(process.env.DATABASE_URL);
    db = drizzle(sql);
    console.log("✅ Database connection initialized successfully");
    return db;
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    return null;
  }
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

// Create tables function
async function createTables() {
  if (!sql) {
    console.error("❌ Database not initialized");
    return false;
  }

  try {
    console.log("🔧 Creating database tables...");

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

    console.log("✅ All database tables created successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to create tables:", error);
    return false;
  }
}

// Test database connection
async function testConnection() {
  if (!sql) {
    return { success: false, error: "Database not initialized" };
  }

  try {
    const result = await sql`SELECT NOW() as current_time`;
    return {
      success: true,
      timestamp: result[0].current_time,
      message: "Database connection successful",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Get database instance
function getDatabase() {
  if (!db) {
    return initializeDatabase();
  }
  return db;
}

module.exports = {
  initializeDatabase,
  getDatabase,
  createTables,
  testConnection,
  sql: () => sql,
  // Table exports
  newsletterSubscriptions,
  contactSubmissions,
  dealSourcingWaitlist,
  inflationCalculations,
};

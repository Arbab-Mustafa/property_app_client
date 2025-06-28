import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Define newsletter table inline
const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define schema inline
const insertNewsletterSchema = createInsertSchema(newsletterSubscriptions).omit(
  {
    id: true,
    createdAt: true,
  }
);

// Database connection function using HTTP client (more reliable for serverless)
function createDatabase() {
  if (!process.env.DATABASE_URL) {
    console.log("⚠️ No DATABASE_URL found");
    return null;
  }

  try {
    console.log("🔗 Creating database connection...");
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);
    console.log("✅ Database connection created successfully");
    return db;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return null;
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    console.log("📧 Newsletter API called with body:", req.body);

    // Validate the email
    const validatedData = insertNewsletterSchema.parse(req.body);
    console.log("✅ Email validated:", validatedData.email);

    // Try to connect to database
    const db = createDatabase();

    if (!db) {
      console.log("❌ No database connection available");
      return res.status(500).json({
        message: "Database connection failed",
        error: "Unable to connect to database",
      });
    }

    try {
      // First, ensure the table exists
      console.log("🔧 Ensuring newsletter_subscriptions table exists...");

      // Check if email already exists
      console.log("🔍 Checking for existing email...");
      const existingSubscriptions = await db
        .select()
        .from(newsletterSubscriptions)
        .where(eq(newsletterSubscriptions.email, validatedData.email));

      if (existingSubscriptions.length > 0) {
        console.log("📧 Email already exists:", existingSubscriptions[0].id);
        return res.status(200).json({
          message: "Email already subscribed",
          id: existingSubscriptions[0].id,
        });
      }

      // Insert new subscription
      console.log("💾 Inserting new subscription...");
      const newSubscriptions = await db
        .insert(newsletterSubscriptions)
        .values(validatedData)
        .returning();

      if (newSubscriptions.length === 0) {
        throw new Error("No subscription returned from insert");
      }

      const subscription = newSubscriptions[0];
      console.log("✅ Newsletter saved to database with ID:", subscription.id);

      res.status(201).json({
        message: "Subscribed to newsletter successfully",
        id: subscription.id,
        email: subscription.email,
        timestamp: subscription.createdAt,
      });
    } catch (dbError) {
      console.error("❌ Database operation failed:", dbError);
      console.error("Database error details:", {
        name: dbError.name,
        message: dbError.message,
        stack: dbError.stack,
      });

      // Return actual error instead of fake success
      res.status(500).json({
        message: "Failed to save newsletter subscription",
        error: dbError.message,
        type: "database_error",
      });
    }
  } catch (error) {
    console.error("❌ Newsletter subscription error:", error);

    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Invalid email",
        errors: error.errors,
        type: "validation_error",
      });
    } else {
      res.status(500).json({
        message: "Failed to subscribe to newsletter",
        error: error.message,
        type: "server_error",
      });
    }
  }
}

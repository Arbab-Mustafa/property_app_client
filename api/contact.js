import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Define contact table inline
const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  investmentAmount: text("investment_amount").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define schema inline
const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

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
    console.log("📞 Contact API called with body:", req.body);

    // Validate the form data
    const validatedData = insertContactSchema.parse(req.body);
    console.log("✅ Contact data validated:", validatedData);

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
      console.log("🔧 Ensuring contact_submissions table exists...");

      // Insert contact submission
      console.log("💾 Inserting contact submission...");
      const newContacts = await db
        .insert(contactSubmissions)
        .values(validatedData)
        .returning();

      if (newContacts.length === 0) {
        throw new Error("No contact returned from insert");
      }

      const contact = newContacts[0];
      console.log("✅ Contact saved to database with ID:", contact.id);

      res.status(201).json({
        message: "Contact form submitted successfully",
        id: contact.id,
        name: contact.name,
        email: contact.email,
        timestamp: contact.createdAt,
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
        message: "Failed to save contact submission",
        error: dbError.message,
        type: "database_error",
      });
    }
  } catch (error) {
    console.error("❌ Contact form submission error:", error);

    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Invalid form data",
        errors: error.errors,
        type: "validation_error",
      });
    } else {
      res.status(500).json({
        message: "Failed to submit contact form",
        error: error.message,
        type: "server_error",
      });
    }
  }
}

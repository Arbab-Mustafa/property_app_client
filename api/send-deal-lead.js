import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import sgMail from "@sendgrid/mail";

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Define deal sourcing waitlist table inline
const dealSourcingWaitlist = pgTable("deal_sourcing_waitlist", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  investmentAmount: text("investment_amount").notNull(),
  experienceLevel: text("experience_level").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define schema inline
const insertDealSourcingSchema = createInsertSchema(dealSourcingWaitlist).omit({
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

async function sendConfirmationEmail(email, name) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("⚠️ No SendGrid API key configured");
    return false;
  }

  try {
    const msg = {
      to: email,
      from: "deals@krpropertyinvestments.com",
      subject: "Welcome to KR Property Investments Deal Sourcing Waitlist!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to Our Deal Sourcing Waitlist!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for joining our exclusive deal sourcing waitlist! We're excited to have you on board.</p>
          
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>We'll review your investment criteria</li>
            <li>You'll be among the first to hear about new opportunities</li>
            <li>Our team will reach out with deals that match your requirements</li>
          </ul>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Explore our <a href="https://krpropertyinvestments.com/case-studies">case studies</a></li>
            <li>Read our latest <a href="https://krpropertyinvestments.com/updates">market updates</a></li>
            <li>Book a call with our team to discuss your investment goals</li>
          </ul>
          
          <p>If you have any questions, don't hesitate to reach out!</p>
          
          <p>Best regards,<br>
          The KR Property Investments Team</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            KR Property Investments<br>
            Email: deals@krpropertyinvestments.com<br>
            Website: krpropertyinvestments.com
          </p>
        </div>
      `,
    };

    await sgMail.send(msg);
    console.log("✅ Confirmation email sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
    return false;
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
    console.log("🎯 Deal sourcing API called with body:", req.body);

    // Validate the form data
    const validatedData = insertDealSourcingSchema.parse(req.body);
    console.log("✅ Deal sourcing data validated:", validatedData);

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
      // Check if email already exists
      console.log("🔍 Checking for existing email...");
      const existingEntries = await db
        .select()
        .from(dealSourcingWaitlist)
        .where(eq(dealSourcingWaitlist.email, validatedData.email));

      if (existingEntries.length > 0) {
        console.log("📧 Email already exists:", existingEntries[0].id);
        return res.status(200).json({
          message: "Email already on waitlist",
          id: existingEntries[0].id,
        });
      }

      // Insert new waitlist entry
      console.log("💾 Adding to deal sourcing waitlist...");
      const newEntries = await db
        .insert(dealSourcingWaitlist)
        .values(validatedData)
        .returning();

      if (newEntries.length === 0) {
        throw new Error("No waitlist entry returned from insert");
      }

      const waitlistEntry = newEntries[0];
      console.log(
        "✅ Deal sourcing entry saved to database with ID:",
        waitlistEntry.id
      );

      // Send confirmation email
      console.log("📧 Sending confirmation email...");
      const emailSent = await sendConfirmationEmail(
        validatedData.email,
        validatedData.name
      );

      res.status(201).json({
        message: "Successfully added to deal sourcing waitlist",
        id: waitlistEntry.id,
        name: waitlistEntry.name,
        email: waitlistEntry.email,
        emailSent: emailSent,
        timestamp: waitlistEntry.createdAt,
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
        message: "Failed to add to deal sourcing waitlist",
        error: dbError.message,
        type: "database_error",
      });
    }
  } catch (error) {
    console.error("❌ Deal sourcing submission error:", error);

    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Invalid form data",
        errors: error.errors,
        type: "validation_error",
      });
    } else {
      res.status(500).json({
        message: "Failed to submit deal sourcing request",
        error: error.message,
        type: "server_error",
      });
    }
  }
}

const express = require("express");
const { z } = require("zod");
const { eq } = require("drizzle-orm");
const { createInsertSchema } = require("drizzle-zod");
const { getDatabase, newsletterSubscriptions } = require("../config/database");

const router = express.Router();

// Validation schema
const insertNewsletterSchema = createInsertSchema(newsletterSubscriptions).omit(
  {
    id: true,
    createdAt: true,
  }
);

// POST /api/newsletter - Subscribe to newsletter
router.post("/", async (req, res) => {
  try {
    console.log("📧 Newsletter subscription request:", req.body);

    // Validate request body
    const validatedData = insertNewsletterSchema.parse(req.body);
    console.log("✅ Email validated:", validatedData.email);

    // Get database connection
    const db = getDatabase();
    if (!db) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: "Unable to connect to database",
      });
    }

    // Check if email already exists
    console.log("🔍 Checking for existing subscription...");
    const existingSubscriptions = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, validatedData.email));

    if (existingSubscriptions.length > 0) {
      console.log("📧 Email already subscribed:", existingSubscriptions[0].id);
      return res.status(200).json({
        success: true,
        message: "Email already subscribed to newsletter",
        data: {
          id: existingSubscriptions[0].id,
          email: existingSubscriptions[0].email,
          subscribedAt: existingSubscriptions[0].createdAt,
        },
      });
    }

    // Insert new subscription
    console.log("💾 Creating new newsletter subscription...");
    const newSubscriptions = await db
      .insert(newsletterSubscriptions)
      .values(validatedData)
      .returning();

    if (newSubscriptions.length === 0) {
      throw new Error("Failed to create newsletter subscription");
    }

    const subscription = newSubscriptions[0];
    console.log("✅ Newsletter subscription created with ID:", subscription.id);

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: {
        id: subscription.id,
        email: subscription.email,
        subscribedAt: subscription.createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Newsletter subscription error:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to subscribe to newsletter",
      error: error.message,
    });
  }
});

// GET /api/newsletter - Get all newsletter subscriptions (admin only)
router.get("/", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }

    const subscriptions = await db
      .select()
      .from(newsletterSubscriptions)
      .orderBy(newsletterSubscriptions.createdAt);

    res.json({
      success: true,
      message: "Newsletter subscriptions retrieved successfully",
      data: subscriptions,
      count: subscriptions.length,
    });
  } catch (error) {
    console.error("❌ Error fetching newsletter subscriptions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch newsletter subscriptions",
      error: error.message,
    });
  }
});

module.exports = router;

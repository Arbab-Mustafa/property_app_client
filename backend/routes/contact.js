const express = require("express");
const { z } = require("zod");
const { createInsertSchema } = require("drizzle-zod");
const { getDatabase, contactSubmissions } = require("../config/database");

const router = express.Router();

// Validation schema
const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

// POST /api/contact - Submit contact form
router.post("/", async (req, res) => {
  try {
    console.log("📞 Contact form submission:", req.body);

    // Validate request body
    const validatedData = insertContactSchema.parse(req.body);
    console.log("✅ Contact data validated:", {
      name: validatedData.name,
      email: validatedData.email,
      investmentAmount: validatedData.investmentAmount,
    });

    // Get database connection
    const db = getDatabase();
    if (!db) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: "Unable to connect to database",
      });
    }

    // Insert contact submission
    console.log("💾 Creating new contact submission...");
    const newContacts = await db
      .insert(contactSubmissions)
      .values(validatedData)
      .returning();

    if (newContacts.length === 0) {
      throw new Error("Failed to create contact submission");
    }

    const contact = newContacts[0];
    console.log("✅ Contact submission created with ID:", contact.id);

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        submittedAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Contact form submission error:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data",
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit contact form",
      error: error.message,
    });
  }
});

// GET /api/contact - Get all contact submissions (admin only)
router.get("/", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }

    const contacts = await db
      .select()
      .from(contactSubmissions)
      .orderBy(contactSubmissions.createdAt);

    res.json({
      success: true,
      message: "Contact submissions retrieved successfully",
      data: contacts,
      count: contacts.length,
    });
  } catch (error) {
    console.error("❌ Error fetching contact submissions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact submissions",
      error: error.message,
    });
  }
});

module.exports = router;

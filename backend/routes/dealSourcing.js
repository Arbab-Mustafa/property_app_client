const express = require("express");
const { z } = require("zod");
const { eq } = require("drizzle-orm");
const { createInsertSchema } = require("drizzle-zod");
const sgMail = require("@sendgrid/mail");
const { getDatabase, dealSourcingWaitlist } = require("../config/database");

const router = express.Router();

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Validation schema
const insertDealSourcingSchema = createInsertSchema(dealSourcingWaitlist).omit({
  id: true,
  createdAt: true,
});

// Send confirmation email
async function sendConfirmationEmail(email, name) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("⚠️ No SendGrid API key configured");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const msg = {
      to: email,
      from: "deals@krpropertyinvestments.com",
      subject: "Welcome to KR Property Investments Deal Sourcing Waitlist! 🎯",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">Welcome to Our Deal Sourcing Waitlist!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for joining our exclusive deal sourcing waitlist! We're excited to have you on board.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">What happens next?</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>We'll review your investment criteria</li>
              <li>You'll be among the first to hear about new opportunities</li>
              <li>Our team will reach out with deals that match your requirements</li>
            </ul>
          </div>
          
          <p><strong>In the meantime, feel free to:</strong></p>
          <ul>
            <li>📚 Explore our <a href="https://krpropertyinvestments.com/case-studies" style="color: #2563eb;">case studies</a></li>
            <li>📈 Read our latest <a href="https://krpropertyinvestments.com/updates" style="color: #2563eb;">market updates</a></li>
            <li>📞 Book a call with our team to discuss your investment goals</li>
          </ul>
          
          <p>If you have any questions, don't hesitate to reach out!</p>
          
          <p style="margin-top: 30px;">Best regards,<br>
          <strong>The KR Property Investments Team</strong></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <div style="font-size: 12px; color: #6b7280; text-align: center;">
            <p><strong>KR Property Investments</strong><br>
            Email: deals@krpropertyinvestments.com<br>
            Website: <a href="https://krpropertyinvestments.com" style="color: #2563eb;">krpropertyinvestments.com</a></p>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    console.log("✅ Confirmation email sent successfully to:", email);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
    return { success: false, error: error.message };
  }
}

// POST /api/deal-sourcing - Join deal sourcing waitlist
router.post("/", async (req, res) => {
  try {
    console.log("🎯 Deal sourcing waitlist request:", req.body);

    // Validate request body
    const validatedData = insertDealSourcingSchema.parse(req.body);
    console.log("✅ Deal sourcing data validated:", {
      name: validatedData.name,
      email: validatedData.email,
      investmentAmount: validatedData.investmentAmount,
      experienceLevel: validatedData.experienceLevel,
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

    // Check if email already exists
    console.log("🔍 Checking for existing waitlist entry...");
    const existingEntries = await db
      .select()
      .from(dealSourcingWaitlist)
      .where(eq(dealSourcingWaitlist.email, validatedData.email));

    if (existingEntries.length > 0) {
      console.log("📧 Email already on waitlist:", existingEntries[0].id);
      return res.status(200).json({
        success: true,
        message: "Email already on deal sourcing waitlist",
        data: {
          id: existingEntries[0].id,
          name: existingEntries[0].name,
          email: existingEntries[0].email,
          joinedAt: existingEntries[0].createdAt,
        },
      });
    }

    // Insert new waitlist entry
    console.log("💾 Adding to deal sourcing waitlist...");
    const newEntries = await db
      .insert(dealSourcingWaitlist)
      .values(validatedData)
      .returning();

    if (newEntries.length === 0) {
      throw new Error("Failed to add to waitlist");
    }

    const waitlistEntry = newEntries[0];
    console.log("✅ Deal sourcing entry created with ID:", waitlistEntry.id);

    // Send confirmation email
    console.log("📧 Sending confirmation email...");
    const emailResult = await sendConfirmationEmail(
      validatedData.email,
      validatedData.name
    );

    res.status(201).json({
      success: true,
      message: "Successfully added to deal sourcing waitlist",
      data: {
        id: waitlistEntry.id,
        name: waitlistEntry.name,
        email: waitlistEntry.email,
        joinedAt: waitlistEntry.createdAt,
        emailSent: emailResult.success,
      },
    });
  } catch (error) {
    console.error("❌ Deal sourcing submission error:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data",
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to join deal sourcing waitlist",
      error: error.message,
    });
  }
});

// GET /api/deal-sourcing - Get all waitlist entries (admin only)
router.get("/", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }

    const waitlistEntries = await db
      .select()
      .from(dealSourcingWaitlist)
      .orderBy(dealSourcingWaitlist.createdAt);

    res.json({
      success: true,
      message: "Deal sourcing waitlist retrieved successfully",
      data: waitlistEntries,
      count: waitlistEntries.length,
    });
  } catch (error) {
    console.error("❌ Error fetching deal sourcing waitlist:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch deal sourcing waitlist",
      error: error.message,
    });
  }
});

module.exports = router;

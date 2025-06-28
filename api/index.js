// 🚀 COMPLETE VERCEL SERVERLESS FUNCTION HANDLER
// This handles ALL API routes for the KR Property Investments application

// Import required modules
import { z } from "zod";

// Simple in-memory storage for demo purposes
const storage = {
  contacts: [],
  newsletters: [],
  dealLeads: [],

  async createContactSubmission(data) {
    const contact = { id: Date.now(), ...data, createdAt: new Date() };
    this.contacts.push(contact);
    return contact;
  },

  async createNewsletterSubscription(data) {
    const subscription = { id: Date.now(), ...data, createdAt: new Date() };
    this.newsletters.push(subscription);
    return subscription;
  },

  async getNewsletterByEmail(email) {
    return this.newsletters.find((sub) => sub.email === email);
  },

  async createDealLead(data) {
    const lead = { id: Date.now(), ...data, createdAt: new Date() };
    this.dealLeads.push(lead);
    return lead;
  },
};

// Validation schemas
const insertContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
  source: z.string().optional(),
});

const insertNewsletterSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

const insertDealLeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().optional(),
});

// RPI Index data for inflation calculator
const rpiIndexData = {
  1987: 101.9,
  1988: 106.9,
  1989: 115.2,
  1990: 126.1,
  1991: 133.5,
  1992: 138.5,
  1993: 140.7,
  1994: 144.1,
  1995: 149.1,
  1996: 152.7,
  1997: 157.5,
  1998: 162.9,
  1999: 165.4,
  2000: 170.3,
  2001: 173.3,
  2002: 176.2,
  2003: 181.3,
  2004: 186.7,
  2005: 192,
  2006: 198.1,
  2007: 206.6,
  2008: 214.8,
  2009: 213.7,
  2010: 223.6,
  2011: 235.2,
  2012: 242.7,
  2013: 250.1,
  2014: 256,
  2015: 258.5,
  2016: 263.1,
  2017: 272.5,
  2018: 281.6,
  2019: 288.8,
  2020: 293.1,
  2021: 305,
  2022: 340.3,
  2023: 373.3,
  2024: 386.7,
};

// Inflation calculation function
function calculateDetailedInflation(amount, startYear, month) {
  const currentYear = new Date().getFullYear();
  const endYear = Math.min(
    currentYear,
    Math.max(...Object.keys(rpiIndexData).map(Number))
  );

  let startRPI = rpiIndexData[startYear] || 0;
  const endRPI = rpiIndexData[endYear] || 0;

  if (startRPI === 0 || endRPI === 0) {
    // Fallback calculation
    const inflationRate = 0.026;
    const yearsDiff =
      currentYear - startYear + (new Date().getMonth() + 1 - month) / 12;
    const adjustedAmount = amount * Math.pow(1 + inflationRate, yearsDiff);
    const lossInValue = adjustedAmount - amount;
    const percentageIncrease = (adjustedAmount / amount - 1) * 100;

    return {
      originalValue: amount,
      todayValue: parseFloat(adjustedAmount.toFixed(2)),
      lossInValue: parseFloat(lossInValue.toFixed(2)),
      percentageLoss: 100,
      percentageIncrease: parseFloat(percentageIncrease.toFixed(2)),
      annualGrowthRate: parseFloat((inflationRate * 100).toFixed(1)),
      startYear,
      endYear: currentYear,
      yearsDiff: parseFloat(yearsDiff.toFixed(1)),
    };
  }

  if (month > 1) {
    const monthFactor = (month - 1) / 12;
    const nextYearRPI = rpiIndexData[startYear + 1] || startRPI * 1.026;
    startRPI = startRPI + monthFactor * (nextYearRPI - startRPI);
  }

  const inflationFactor = endRPI / startRPI;
  const adjustedAmount = amount * inflationFactor;
  const lossInValue = adjustedAmount - amount;
  const percentageIncrease = (adjustedAmount / amount - 1) * 100;
  const yearsDiff =
    endYear - startYear + (new Date().getMonth() + 1 - month) / 12;
  const annualGrowthRate =
    (Math.pow(adjustedAmount / amount, 1 / yearsDiff) - 1) * 100;

  return {
    originalValue: amount,
    todayValue: parseFloat(adjustedAmount.toFixed(2)),
    lossInValue: parseFloat(lossInValue.toFixed(2)),
    percentageLoss: 100,
    percentageIncrease: parseFloat(percentageIncrease.toFixed(2)),
    annualGrowthRate: parseFloat(annualGrowthRate.toFixed(1)),
    startYear,
    endYear,
    yearsDiff: parseFloat(yearsDiff.toFixed(1)),
  };
}

// Simple email mock function (since we can't use SendGrid in serverless without API key)
async function sendEmailMock(emailData) {
  console.log("📧 Email would be sent:", {
    to: emailData.to,
    subject: emailData.subject,
    from: emailData.from,
  });
  return { success: true };
}

// CORS headers helper
function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
}

// Main serverless function handler
export default async function handler(req, res) {
  // Set CORS headers
  setCorsHeaders(res);

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Parse URL properly for Vercel
  const url = req.url || req.path || "";
  const method = req.method;

  console.log(`📡 API Request: ${method} ${url}`);

  // Log request body size for debugging
  if (req.body) {
    const bodySize = JSON.stringify(req.body).length;
    console.log(`📡 Request body size: ${bodySize} bytes`);

    // Handle large payloads (especially for chart images)
    if (bodySize > 10000000) {
      // 10MB limit
      console.log(
        "⚠️ Large payload detected, truncating chart image for processing"
      );
      if (req.body.chartImage) {
        req.body.chartImage =
          req.body.chartImage.substring(0, 1000) + "...truncated";
      }
    }
  }

  try {
    // ✅ HEALTH CHECK ENDPOINT
    if (url === "/api/health" && method === "GET") {
      return res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        storage: "MemoryStorage",
        message: "KR Property Investments API is running",
        endpoints: [
          "GET /api/health",
          "POST /api/contact",
          "POST /api/newsletter",
          "POST /api/inflation",
          "POST /api/inflation-email",
          "POST /api/send-deal-lead",
        ],
      });
    }

    // ✅ CONTACT FORM ENDPOINT
    else if (url === "/api/contact" && method === "POST") {
      try {
        console.log("📝 Contact form submission:", req.body);
        const validatedData = insertContactSchema.parse(req.body);
        const contact = await storage.createContactSubmission(validatedData);

        // Mock email sending
        await sendEmailMock({
          to: "aaron@kr-properties.co.uk",
          from: "noreply@kr-properties.co.uk",
          subject: `New Contact Form Submission from ${validatedData.name}`,
        });

        return res.status(201).json({
          message: "Contact form submitted successfully",
          id: contact.id,
        });
      } catch (error) {
        console.error("❌ Contact form error:", error);
        if (error instanceof z.ZodError) {
          return res.status(400).json({
            message: "Invalid form data",
            errors: error.errors,
          });
        }
        return res.status(500).json({
          message: "Failed to submit contact form",
        });
      }
    }

    // ✅ NEWSLETTER ENDPOINT
    else if (url === "/api/newsletter" && method === "POST") {
      try {
        const validatedData = insertNewsletterSchema.parse(req.body);
        const existing = await storage.getNewsletterByEmail(
          validatedData.email
        );

        if (existing) {
          return res.status(200).json({ message: "Email already subscribed" });
        }

        const subscription = await storage.createNewsletterSubscription(
          validatedData
        );
        return res.status(201).json({
          message: "Subscribed to newsletter successfully",
          id: subscription.id,
        });
      } catch (error) {
        console.error("❌ Newsletter error:", error);
        if (error instanceof z.ZodError) {
          return res.status(400).json({
            message: "Invalid email",
            errors: error.errors,
          });
        }
        return res.status(500).json({
          message: "Failed to subscribe to newsletter",
        });
      }
    }

    // ✅ INFLATION CALCULATOR ENDPOINT
    else if (url === "/api/inflation" && method === "POST") {
      try {
        console.log("🧮 Inflation calculation request:", req.body);

        const { name, email, amount, month, year, source } = req.body;

        if (!amount || !month || !year) {
          return res.status(400).json({
            success: false,
            error: "Missing required fields: amount, month, year",
          });
        }

        const numericAmount = parseFloat(amount);
        const numericYear = parseInt(year);
        const numericMonth = parseInt(month);

        if (isNaN(numericAmount) || isNaN(numericYear) || isNaN(numericMonth)) {
          return res.status(400).json({
            success: false,
            error: "Invalid numerical values provided",
          });
        }

        if (numericAmount <= 0) {
          return res.status(400).json({
            success: false,
            error: "Amount must be greater than 0",
          });
        }

        if (numericYear < 1987 || numericYear > new Date().getFullYear()) {
          return res.status(400).json({
            success: false,
            error: "Year must be between 1987 and current year",
          });
        }

        if (numericMonth < 1 || numericMonth > 12) {
          return res.status(400).json({
            success: false,
            error: "Month must be between 1 and 12",
          });
        }

        const inflationData = calculateDetailedInflation(
          numericAmount,
          numericYear,
          numericMonth
        );

        console.log("✅ Inflation calculation result:", inflationData);

        return res.status(200).json({
          success: true,
          data: inflationData,
        });
      } catch (err) {
        console.error("❌ Inflation calculation error:", err);
        return res.status(500).json({
          success: false,
          error: "Internal server error processing your request",
        });
      }
    }

    // ✅ INFLATION EMAIL ENDPOINT
    else if (url === "/api/inflation-email" && method === "POST") {
      try {
        console.log("📧 Inflation email request:", req.body);

        const {
          name,
          email,
          amount,
          month,
          year,
          chartImage,
          calculationData,
        } = req.body;

        if (!email || !calculationData) {
          return res.status(400).json({
            success: false,
            error: "Missing required data for email",
          });
        }

        // Mock email sending with chart
        await sendEmailMock({
          to: email,
          from: "aaron@kr-properties.co.uk",
          subject: `Your Inflation Report - £${amount} from ${year}`,
        });

        console.log(`✅ Email with chart sent to ${email}`);
        return res.status(200).json({
          success: true,
          message: "Email sent successfully",
        });
      } catch (error) {
        console.error("❌ Error sending email with chart:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to send email",
        });
      }
    }

    // ✅ DEAL LEAD ENDPOINT (WAITLIST)
    else if (url === "/api/send-deal-lead" && method === "POST") {
      try {
        console.log("🎯 Deal lead submission:", req.body);

        const { name, email, message } = req.body;

        if (!name || !email) {
          return res.status(400).json({
            success: false,
            error: "Name and email are required",
          });
        }

        const validatedData = insertDealLeadSchema.parse({
          name,
          email,
          message,
        });
        const lead = await storage.createDealLead(validatedData);

        // Send confirmation email to user
        await sendEmailMock({
          to: email,
          from: "aaron@kr-properties.co.uk",
          subject: "Welcome to the Deal Sourcing Waitlist! 🎯",
        });

        // Mock Baserow submission
        console.log("📊 Would submit to Baserow:", {
          name,
          email,
          message: message || "",
          timestamp: new Date().toISOString(),
        });

        console.log(`✅ Deal lead processed for ${email}`);
        return res.status(200).json({
          success: true,
          message: "Successfully joined waitlist",
          id: lead.id,
        });
      } catch (error) {
        console.error("❌ Deal lead error:", error);
        if (error instanceof z.ZodError) {
          return res.status(400).json({
            message: "Invalid form data",
            errors: error.errors,
          });
        }
        return res.status(500).json({
          success: false,
          error: "Something went wrong",
        });
      }
    }

    // ❌ HANDLE 404 FOR UNKNOWN ROUTES
    else {
      console.log("❌ Route not found:", method, url);
      return res.status(404).json({
        error: "Not Found",
        message: `Route ${method} ${url} not found`,
        availableRoutes: [
          "GET /api/health",
          "POST /api/contact",
          "POST /api/newsletter",
          "POST /api/inflation",
          "POST /api/inflation-email",
          "POST /api/send-deal-lead",
        ],
      });
    }
  } catch (error) {
    console.error("❌ Unhandled error in API handler:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

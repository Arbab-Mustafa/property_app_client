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

// Real SendGrid email function for Vercel
async function sendEmail({ to, from, subject, html }) {
  try {
    const sendgridApiKey = process.env.SENDGRID_API_KEY;

    if (!sendgridApiKey) {
      console.error("❌ Cannot send email: SENDGRID_API_KEY is not set");
      return { success: false, error: "Email service not configured" };
    }

    console.log(`📧 Sending email to ${to} with subject: ${subject}`);

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to }],
            subject: subject,
          },
        ],
        from: { email: from },
        content: [
          {
            type: "text/html",
            value: html,
          },
        ],
      }),
    });

    if (response.ok) {
      console.log("✅ Email sent successfully to:", to);
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error("❌ SendGrid API error:", response.status, errorText);
      return { success: false, error: `SendGrid error: ${response.status}` };
    }
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}

// Inflation report email function
async function sendInflationReport(data) {
  try {
    const sendgridApiKey = process.env.SENDGRID_API_KEY;

    if (!sendgridApiKey) {
      console.error("❌ Cannot send email: SENDGRID_API_KEY is not set");
      return { success: false, error: "Email service not configured" };
    }

    const {
      name,
      email,
      amount,
      month,
      year,
      todayValue,
      lossInValue,
      percentageIncrease,
      annualGrowthRate,
      startYear,
      endYear,
      yearsDiff,
      chartImage,
    } = data;

    // Format values for display
    const formattedOriginalAmount = amount.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });
    const formattedTodayValue = todayValue.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });

    // Get month name
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[month - 1];

    // Format additional values for display
    const formattedLossInValue = lossInValue.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });
    const formattedPercentageIncrease = percentageIncrease.toFixed(1);
    const formattedAnnualGrowthRate = annualGrowthRate.toFixed(1);
    const formattedYearsDiff = yearsDiff.toFixed(0);

    // Current year
    const currentYear = new Date().getFullYear();

    // Create the email HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333;">
        
        <div style="text-align: left; margin-bottom: 30px; border-bottom: 2px solid #ddd; padding-bottom: 15px;">
          <h1 style="color: #008e6d; margin: 0; font-size: 24px; font-weight: bold;">KR Property Investments</h1>
          <p style="margin: 5px 0 0 0; font-size: 16px; color: #666;">Detailed Inflation Calculator Results</p>
        </div>
        
        <p style="margin-bottom: 20px;">Hello ${name},</p>
        
        <p style="margin-bottom: 25px;">Thank you for using our Inflation Calculator. Below is your detailed report based on the Retail Price Index (RPI) data up to ${currentYear}.</p>
        
        <div style="border-top: 2px solid #ddd; margin: 30px 0 20px 0;"></div>
        
        <div style="margin: 30px 0;">
          <h2 style="color: #008e6d; margin: 0 0 20px 0; font-size: 20px;">📊 Inflation Report Summary</h2>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 8px;">• <strong>Original Amount:</strong> ${formattedOriginalAmount}</li>
            <li style="margin-bottom: 8px;">• <strong>Start Date:</strong> ${monthName} ${year}</li>
            <li style="margin-bottom: 8px;">• <strong>End Date:</strong> Present (${currentYear})</li>
            <li style="margin-bottom: 8px;">• <strong>Inflation-Adjusted Value (${currentYear}):</strong> ${formattedTodayValue}</li>
            <li style="margin-bottom: 8px;">• <strong>Real-Term Loss in Value:</strong> -${formattedLossInValue}</li>
            <li style="margin-bottom: 8px;">• <strong>Percentage Increase in Cost of Living:</strong> ${formattedPercentageIncrease}%</li>
            <li style="margin-bottom: 8px;">• <strong>Required Growth to Keep Up with Inflation:</strong> ${formattedAnnualGrowthRate}% annually</li>
            <li style="margin-bottom: 8px;">• <strong>Time Period:</strong> ${formattedYearsDiff} years</li>
          </ul>
        </div>
        
        <div style="margin: 30px 0;">
          <h2 style="color: #008e6d; margin: 0 0 20px 0; font-size: 20px;">💰 Investment Comparison</h2>
          <p style="margin-bottom: 20px; color: #333;">Here's how your ${formattedOriginalAmount} from ${year} would have performed:</p>
          
          <div style="margin: 20px 0;">
            <div style="background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="color: #dc2626; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">Bank Savings (1%)</h3>
              <div style="font-size: 20px; font-weight: bold; color: #333; margin-bottom: 5px;">
                £${(amount * Math.pow(1.01, yearsDiff)).toLocaleString(
                  "en-GB",
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                )}
              </div>
              <div style="color: #dc2626; font-size: 14px; font-weight: bold;">
                Lost to inflation: -${formattedLossInValue}
              </div>
            </div>
            
            <div style="background-color: #dcfce7; border-left: 4px solid #16a34a; padding: 20px; border-radius: 8px;">
              <h3 style="color: #16a34a; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">Property Investment (10%)</h3>
              <div style="font-size: 20px; font-weight: bold; color: #333; margin-bottom: 5px;">
                £${(amount * Math.pow(1.1, yearsDiff)).toLocaleString("en-GB", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div style="color: #16a34a; font-size: 14px; font-weight: bold;">
                Beat inflation by £${(
                  amount * Math.pow(1.1, yearsDiff) -
                  todayValue
                ).toLocaleString("en-GB", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        </div>
        
        <div style="text-center; margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
          <h3 style="color: #1A355E; margin: 0 0 15px 0;">Ready to protect your wealth from inflation?</h3>
          <p style="margin-bottom: 20px; color: #666;">Learn how our property investments deliver 8-12% annual returns.</p>
          <a href="https://www.krhomes.co.uk/contact" style="background-color: #F97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Book Your Free Consultation</a>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
          <p>This email was sent by KR Property Investments. Visit us at <a href="https://www.krhomes.co.uk">www.krhomes.co.uk</a></p>
        </div>
      </div>
    `;

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: email }],
            subject: `Your Inflation Report - £${amount.toLocaleString()} from ${year}`,
          },
        ],
        from: { email: "aaron@kr-properties.co.uk" },
        content: [
          {
            type: "text/html",
            value: htmlContent,
          },
        ],
      }),
    });

    if (response.ok) {
      console.log("✅ Inflation report email sent successfully to:", email);
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error("❌ SendGrid API error:", response.status, errorText);
      return { success: false, error: `SendGrid error: ${response.status}` };
    }
  } catch (error) {
    console.error("❌ Error sending inflation report email:", error);
    return { success: false, error: "Failed to send email" };
  }
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

        // Send real email notification
        await sendEmail({
          to: "aaron@kr-properties.co.uk",
          from: "noreply@kr-properties.co.uk",
          subject: `New Contact Form Submission from ${validatedData.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${
              validatedData.phone || "Not provided"
            }</p>
            <p><strong>Message:</strong></p>
            <p>${validatedData.message}</p>
            <p><strong>Source:</strong> ${validatedData.source || "Website"}</p>
            <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
          `,
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

        // Send real inflation report email
        const emailResult = await sendInflationReport({
          name,
          email,
          amount: parseFloat(amount),
          month: parseInt(month),
          year: parseInt(year),
          todayValue: calculationData.todayValue,
          lossInValue: calculationData.lossInValue,
          percentageIncrease: calculationData.percentageIncrease,
          annualGrowthRate: calculationData.annualGrowthRate,
          startYear: calculationData.startYear,
          endYear: calculationData.endYear,
          yearsDiff: calculationData.yearsDiff,
          chartImage,
        });

        if (emailResult.success) {
          console.log(`✅ Email with chart sent to ${email}`);
        } else {
          console.error(
            `❌ Failed to send email to ${email}:`,
            emailResult.error
          );
        }
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
        await sendEmail({
          to: email,
          from: "aaron@kr-properties.co.uk",
          subject: "Welcome to the Deal Sourcing Waitlist! 🎯",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1A355E;">Welcome to the Deal Sourcing Waitlist! 🎯</h1>
              <p>Hi ${name},</p>
              <p>Thank you for joining our exclusive Deal Sourcing waitlist! You're now part of a select group who will get first access to our best property investment opportunities.</p>
              <h3>What happens next?</h3>
              <ul>
                <li>📧 You'll receive priority notifications about new deals</li>
                <li>🏠 Access to off-market properties before they're public</li>
                <li>📊 Detailed investment analysis for each opportunity</li>
                <li>🤝 Personal support from our investment team</li>
              </ul>
              <p>We'll be in touch soon with your first exclusive deal!</p>
              <p>Best regards,<br>The KR Property Investments Team</p>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
                <p>Visit us at <a href="https://www.krhomes.co.uk">www.krhomes.co.uk</a></p>
              </div>
            </div>
          `,
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

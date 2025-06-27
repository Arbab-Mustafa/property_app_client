import dotenv from "dotenv";
dotenv.config();

import express from "express";

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Import storage and dependencies
import { storage } from "../server/storage.js";
import { sendEmail } from "../server/email.js";
import {
  insertContactSchema,
  insertNewsletterSchema,
} from "../shared/schema.js";
import { z } from "zod";

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

// Define routes directly in the serverless function
// Contact form route
app.post("/api/contact", async (req, res) => {
  try {
    console.log("Contact form submission:", req.body);
    const validatedData = insertContactSchema.parse(req.body);
    const contact = await storage.createContactSubmission(validatedData);
    res
      .status(201)
      .json({ message: "Contact form submitted successfully", id: contact.id });
  } catch (error) {
    console.error("Contact form error:", error);
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Invalid form data", errors: error.errors });
    } else {
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  }
});

// Newsletter route
app.post("/api/newsletter", async (req, res) => {
  try {
    const validatedData = insertNewsletterSchema.parse(req.body);
    const existing = await storage.getNewsletterByEmail(validatedData.email);

    if (existing) {
      return res.status(200).json({ message: "Email already subscribed" });
    }

    const subscription = await storage.createNewsletterSubscription(
      validatedData
    );
    res.status(201).json({
      message: "Subscribed to newsletter successfully",
      id: subscription.id,
    });
  } catch (error) {
    console.error("Newsletter error:", error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid email", errors: error.errors });
    } else {
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  }
});

// Inflation calculator route
app.post("/api/inflation", async (req, res) => {
  try {
    console.log("Inflation calculation request:", req.body);

    const { name, email, amount, month, year, source } = req.body;

    if (!amount || !month || !year) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
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

    const inflationData = calculateDetailedInflation(
      numericAmount,
      numericYear,
      numericMonth
    );

    console.log("Inflation calculation result:", inflationData);

    return res.json({
      success: true,
      data: inflationData,
    });
  } catch (err) {
    console.error("Inflation calculation error:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error processing your request",
    });
  }
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    storage: storage.constructor.name,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Export the Express app as the default export for Vercel
export default app;

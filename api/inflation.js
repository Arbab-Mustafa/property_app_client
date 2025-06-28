import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  pgTable,
  serial,
  numeric,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Define inflation calculations table inline
const inflationCalculations = pgTable("inflation_calculations", {
  id: serial("id").primaryKey(),
  initialAmount: numeric("initial_amount").notNull(),
  years: integer("years").notNull(),
  inflationRate: numeric("inflation_rate").notNull(),
  finalAmount: numeric("final_amount").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define schema inline
const insertInflationSchema = createInsertSchema(inflationCalculations).omit({
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
    console.log("📊 Inflation API called with body:", req.body);

    // Validate the input data
    const { initialAmount, years, inflationRate } = req.body;

    // Basic validation
    if (!initialAmount || !years || !inflationRate) {
      return res.status(400).json({
        message: "Missing required fields: initialAmount, years, inflationRate",
        type: "validation_error",
      });
    }

    const initial = parseFloat(initialAmount);
    const yearsNum = parseInt(years);
    const rate = parseFloat(inflationRate);

    if (isNaN(initial) || isNaN(yearsNum) || isNaN(rate)) {
      return res.status(400).json({
        message: "Invalid numeric values provided",
        type: "validation_error",
      });
    }

    if (initial <= 0 || yearsNum <= 0 || rate < 0) {
      return res.status(400).json({
        message: "Values must be positive (rate can be zero)",
        type: "validation_error",
      });
    }

    // Calculate inflation
    const finalAmount = initial * Math.pow(1 + rate / 100, yearsNum);
    const totalIncrease = finalAmount - initial;
    const percentageIncrease = ((finalAmount - initial) / initial) * 100;

    console.log(
      `💰 Calculated: £${initial} -> £${finalAmount.toFixed(
        2
      )} over ${yearsNum} years at ${rate}%`
    );

    const calculationData = {
      initialAmount: initial.toString(),
      years: yearsNum,
      inflationRate: rate.toString(),
      finalAmount: finalAmount.toString(),
    };

    // Validate the calculation data
    const validatedData = insertInflationSchema.parse(calculationData);
    console.log("✅ Calculation data validated:", validatedData);

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
      // Insert calculation into database
      console.log("💾 Saving calculation to database...");
      const newCalculations = await db
        .insert(inflationCalculations)
        .values(validatedData)
        .returning();

      if (newCalculations.length === 0) {
        throw new Error("No calculation returned from insert");
      }

      const savedCalculation = newCalculations[0];
      console.log(
        "✅ Calculation saved to database with ID:",
        savedCalculation.id
      );

      res.status(201).json({
        message: "Inflation calculation completed successfully",
        id: savedCalculation.id,
        calculation: {
          initialAmount: initial,
          years: yearsNum,
          inflationRate: rate,
          finalAmount: parseFloat(finalAmount.toFixed(2)),
          totalIncrease: parseFloat(totalIncrease.toFixed(2)),
          percentageIncrease: parseFloat(percentageIncrease.toFixed(2)),
        },
        timestamp: savedCalculation.createdAt,
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
        message: "Failed to save inflation calculation",
        error: dbError.message,
        type: "database_error",
      });
    }
  } catch (error) {
    console.error("❌ Inflation calculation error:", error);

    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Invalid calculation data",
        errors: error.errors,
        type: "validation_error",
      });
    } else {
      res.status(500).json({
        message: "Failed to calculate inflation",
        error: error.message,
        type: "server_error",
      });
    }
  }
}

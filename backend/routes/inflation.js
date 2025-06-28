const express = require("express");
const { z } = require("zod");
const { createInsertSchema } = require("drizzle-zod");
const { getDatabase, inflationCalculations } = require("../config/database");

const router = express.Router();

// Validation schema for inflation calculation
const inflationInputSchema = z.object({
  initialAmount: z.number().positive("Initial amount must be positive"),
  years: z.number().int().positive("Years must be a positive integer"),
  inflationRate: z.number().min(0, "Inflation rate cannot be negative"),
});

// POST /api/inflation - Calculate inflation
router.post("/", async (req, res) => {
  try {
    console.log("📊 Inflation calculation request:", req.body);

    // Parse and validate input
    let { initialAmount, years, inflationRate } = req.body;

    // Convert string inputs to numbers if needed
    initialAmount = parseFloat(initialAmount);
    years = parseInt(years);
    inflationRate = parseFloat(inflationRate);

    // Validate the parsed data
    const validatedInput = inflationInputSchema.parse({
      initialAmount,
      years,
      inflationRate,
    });

    console.log("✅ Input validated:", validatedInput);

    // Calculate inflation
    const finalAmount =
      validatedInput.initialAmount *
      Math.pow(1 + validatedInput.inflationRate / 100, validatedInput.years);
    const totalIncrease = finalAmount - validatedInput.initialAmount;
    const percentageIncrease =
      (totalIncrease / validatedInput.initialAmount) * 100;

    console.log(
      `💰 Calculation: £${
        validatedInput.initialAmount
      } -> £${finalAmount.toFixed(2)} over ${validatedInput.years} years at ${
        validatedInput.inflationRate
      }%`
    );

    // Prepare data for database storage
    const calculationData = {
      initialAmount: validatedInput.initialAmount.toString(),
      years: validatedInput.years,
      inflationRate: validatedInput.inflationRate.toString(),
      finalAmount: finalAmount.toString(),
    };

    // Get database connection and save calculation
    const db = getDatabase();
    if (!db) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: "Unable to connect to database",
      });
    }

    console.log("💾 Saving calculation to database...");
    const newCalculations = await db
      .insert(inflationCalculations)
      .values(calculationData)
      .returning();

    if (newCalculations.length === 0) {
      throw new Error("Failed to save calculation");
    }

    const savedCalculation = newCalculations[0];
    console.log("✅ Calculation saved with ID:", savedCalculation.id);

    res.status(201).json({
      success: true,
      message: "Inflation calculation completed successfully",
      data: {
        id: savedCalculation.id,
        input: {
          initialAmount: validatedInput.initialAmount,
          years: validatedInput.years,
          inflationRate: validatedInput.inflationRate,
        },
        results: {
          finalAmount: parseFloat(finalAmount.toFixed(2)),
          totalIncrease: parseFloat(totalIncrease.toFixed(2)),
          percentageIncrease: parseFloat(percentageIncrease.toFixed(2)),
        },
        calculatedAt: savedCalculation.createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Inflation calculation error:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid calculation parameters",
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to calculate inflation",
      error: error.message,
    });
  }
});

// GET /api/inflation - Get all inflation calculations (admin only)
router.get("/", async (req, res) => {
  try {
    const db = getDatabase();
    if (!db) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }

    const calculations = await db
      .select()
      .from(inflationCalculations)
      .orderBy(inflationCalculations.createdAt);

    res.json({
      success: true,
      message: "Inflation calculations retrieved successfully",
      data: calculations,
      count: calculations.length,
    });
  } catch (error) {
    console.error("❌ Error fetching inflation calculations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch inflation calculations",
      error: error.message,
    });
  }
});

module.exports = router;

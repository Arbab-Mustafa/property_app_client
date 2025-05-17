// server.js

import express from "express";
import bodyParser from "body-parser";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Set your SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Example route from your React frontend to handle inflation calculations
app.post("/api/inflation", async (req, res) => {
  const { name, email, amount, year, month, source } = req.body;

  // Dummy inflation calculation for now
  const todayValue = parseFloat(amount) * 1.5; // 50% inflation as example
  const growthRate = 50; // 50% example

  // Send an email report via SendGrid
  const msg = {
    to: email,
    from: "info@kr-properties.co.uk", // MUST be a verified sender in SendGrid
    subject: "Your Inflation Calculation Report",
    text: `Hi ${name},\n\nHere is your inflation report:\n\nOriginal amount: £${amount}\nYear: ${year}, Month: ${month}\nToday's value: £${todayValue.toFixed(
      2
    )}\nGrowth rate needed: ${growthRate.toFixed(2)}%\n\nThank you!`,
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Email sent to", email);

    // Return data to the frontend
    res.status(200).json({
      success: true,
      data: {
        originalValue: parseFloat(amount),
        todayValue,
        growthRate,
      },
    });
  } catch (error) {
    console.error("❌ SendGrid error:", error.response?.body || error.message);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
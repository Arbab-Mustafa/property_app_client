const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple test endpoint
app.get("/api/test", (req, res) => {
  console.log("Test endpoint called");
  res.json({
    success: true,
    message: "Backend is working!",
    timestamp: new Date().toISOString(),
  });
});

// Newsletter endpoint
app.post("/api/newsletter", (req, res) => {
  console.log("Newsletter subscription:", req.body);
  res.json({
    success: true,
    message: "Newsletter subscription successful!",
    data: { email: req.body.email },
  });
});

// Contact endpoint
app.post("/api/contact", (req, res) => {
  console.log("Contact form:", req.body);
  res.json({
    success: true,
    message: "Contact form submitted successfully!",
    data: req.body,
  });
});

// Inflation endpoint
app.post("/api/inflation", (req, res) => {
  console.log("Inflation calculation:", req.body);
  const { initialAmount, years, inflationRate } = req.body;
  const final =
    parseFloat(initialAmount) *
    Math.pow(1 + parseFloat(inflationRate) / 100, parseInt(years));

  res.json({
    success: true,
    message: "Inflation calculation completed!",
    data: {
      initialAmount: parseFloat(initialAmount),
      years: parseInt(years),
      inflationRate: parseFloat(inflationRate),
      finalAmount: parseFloat(final.toFixed(2)),
    },
  });
});

// Deal sourcing endpoint
app.post("/api/send-deal-lead", (req, res) => {
  console.log("Deal sourcing:", req.body);
  res.json({
    success: true,
    message: "Successfully added to deal sourcing waitlist!",
    data: req.body,
  });
});

app.listen(PORT, () => {
  console.log("🚀 ========================================");
  console.log("🚀 KR PROPERTY BACKEND SERVER RUNNING!");
  console.log("🚀 ========================================");
  console.log(`🔗 Server: http://localhost:${PORT}`);
  console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
  console.log("🚀 ========================================");
});

module.exports = app;

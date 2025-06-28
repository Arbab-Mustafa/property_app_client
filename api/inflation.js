const dotenv = require("dotenv");
dotenv.config();

module.exports = async function handler(req, res) {
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
    const { amount, fromYear, toYear } = req.body;

    if (!amount || !fromYear || !toYear) {
      return res.status(400).json({
        error: "Missing required fields: amount, fromYear, toYear",
      });
    }

    // Simple inflation calculation (this could be enhanced with real data)
    const years = toYear - fromYear;
    const inflationRate = 0.025; // 2.5% average inflation
    const adjustedAmount = amount * Math.pow(1 + inflationRate, years);

    res.json({
      originalAmount: amount,
      fromYear,
      toYear,
      adjustedAmount: Math.round(adjustedAmount * 100) / 100,
      inflationRate: inflationRate * 100,
      totalInflation:
        Math.round(((adjustedAmount - amount) / amount) * 10000) / 100,
    });
  } catch (error) {
    console.error("Inflation calculation error:", error);
    res.status(500).json({ error: "Failed to calculate inflation" });
  }
};

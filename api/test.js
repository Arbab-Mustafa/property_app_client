export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  res.json({
    status: "API is working!",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    database: !!process.env.DATABASE_URL
      ? "Connected"
      : "No database configured",
    email: !!process.env.SENDGRID_API_KEY ? "Configured" : "Not configured",
  });
}

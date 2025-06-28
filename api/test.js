// Simple test endpoint for debugging Vercel deployment
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url || req.path || "";

    console.log(`🧪 Test endpoint called: ${method} ${url} at ${timestamp}`);

    // Test different scenarios
    if (method === "GET") {
      return res.status(200).json({
        status: "success",
        message: "Test endpoint working perfectly!",
        timestamp,
        method,
        url,
        vercelWorking: true,
        headers: req.headers,
        query: req.query || {},
      });
    }

    if (method === "POST") {
      const bodySize = req.body ? JSON.stringify(req.body).length : 0;

      return res.status(200).json({
        status: "success",
        message: "POST test successful",
        timestamp,
        method,
        url,
        bodySize: `${bodySize} bytes`,
        body: req.body || {},
        headers: req.headers,
      });
    }

    return res.status(405).json({
      error: "Method not allowed",
      allowedMethods: ["GET", "POST"],
    });
  } catch (error) {
    console.error("❌ Test endpoint error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}

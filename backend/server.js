const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://www.krhomes.co.uk",
      "https://krhomes.co.uk",
      "https://krpropertyinvestments.com",
      "https://www.krpropertyinvestments.com",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: process.env.DATABASE_URL ? "configured" : "not configured",
    email: process.env.SENDGRID_API_KEY ? "configured" : "not configured",
  });
});

// Initialize database
async function initializeDatabase() {
  try {
    const {
      initializeDatabase,
      createTables,
      testConnection,
    } = require("./config/database");

    console.log("🚀 Initializing database...");
    const db = initializeDatabase();

    if (db) {
      console.log("✅ Database initialized");

      const connectionTest = await testConnection();
      if (connectionTest.success) {
        console.log("✅ Database connection test passed");

        const tablesCreated = await createTables();
        if (tablesCreated) {
          console.log("✅ Database tables ready");
        }
      } else {
        console.error("❌ Database connection failed:", connectionTest.error);
      }
    }
  } catch (error) {
    console.error("❌ Database initialization error:", error);
  }
}

// API Routes - Load them after middleware
try {
  app.use("/api/newsletter", require("./routes/newsletter"));
  app.use("/api/contact", require("./routes/contact"));
  app.use("/api/inflation", require("./routes/inflation"));
  app.use("/api/deal-sourcing", require("./routes/dealSourcing"));
  app.use("/api/test", require("./routes/test"));
  console.log("✅ Routes loaded successfully");
} catch (error) {
  console.error("❌ Error loading routes:", error);
}

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
    timestamp: new Date().toISOString(),
  });
});

// Start server
async function startServer() {
  try {
    // Initialize database first
    await initializeDatabase();

    // Start HTTP server
    app.listen(PORT, () => {
      console.log(`🚀 KR Property Backend Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
      console.log(
        `📊 Database: ${
          process.env.DATABASE_URL ? "✅ Configured" : "❌ Not configured"
        }`
      );
      console.log(
        `📧 Email: ${
          process.env.SENDGRID_API_KEY ? "✅ Configured" : "❌ Not configured"
        }`
      );
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Start the server
startServer();

module.exports = app;

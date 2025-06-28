const express = require("express");
const {
  getDatabase,
  createTables,
  testConnection,
  sql,
} = require("../config/database");

const router = express.Router();

// GET /api/test - Health check and database test
router.get("/", async (req, res) => {
  try {
    console.log("🧪 Test endpoint called");

    const result = {
      timestamp: new Date().toISOString(),
      server: {
        status: "healthy",
        environment: process.env.NODE_ENV,
        port: process.env.PORT,
      },
      environment: {
        DATABASE_URL: process.env.DATABASE_URL ? "✅ Configured" : "❌ Missing",
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
          ? "✅ Configured"
          : "❌ Missing",
      },
      database: {
        status: "unknown",
        connection: null,
        tables: {},
      },
    };

    // Test database connection
    if (process.env.DATABASE_URL) {
      console.log("🔗 Testing database connection...");

      const connectionTest = await testConnection();
      result.database.connection = connectionTest;

      if (connectionTest.success) {
        result.database.status = "✅ Connected";

        // Create tables if they don't exist
        console.log("🔧 Ensuring tables exist...");
        const tablesCreated = await createTables();

        if (tablesCreated) {
          // Get table counts
          const sqlInstance = sql();

          try {
            const newsletterCount =
              await sqlInstance`SELECT COUNT(*) FROM newsletter_subscriptions`;
            const contactCount =
              await sqlInstance`SELECT COUNT(*) FROM contact_submissions`;
            const dealCount =
              await sqlInstance`SELECT COUNT(*) FROM deal_sourcing_waitlist`;
            const inflationCount =
              await sqlInstance`SELECT COUNT(*) FROM inflation_calculations`;

            result.database.tables = {
              newsletter_subscriptions: `✅ ${newsletterCount[0].count} records`,
              contact_submissions: `✅ ${contactCount[0].count} records`,
              deal_sourcing_waitlist: `✅ ${dealCount[0].count} records`,
              inflation_calculations: `✅ ${inflationCount[0].count} records`,
            };
          } catch (countError) {
            console.error("Error getting table counts:", countError);
            result.database.tables = {
              error: "Could not retrieve table counts",
            };
          }
        } else {
          result.database.status = "⚠️ Connected but table creation failed";
        }
      } else {
        result.database.status = "❌ Connection failed";
      }
    } else {
      result.database.status = "❌ No DATABASE_URL configured";
    }

    console.log("✅ Test completed successfully");
    res.json({
      success: true,
      message: "Backend server test completed",
      ...result,
    });
  } catch (error) {
    console.error("❌ Test endpoint error:", error);
    res.status(500).json({
      success: false,
      message: "Test failed",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// POST /api/test/create-tables - Force create tables
router.post("/create-tables", async (req, res) => {
  try {
    console.log("🔧 Force creating database tables...");

    const tablesCreated = await createTables();

    if (tablesCreated) {
      res.json({
        success: true,
        message: "Database tables created successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to create database tables",
      });
    }
  } catch (error) {
    console.error("❌ Create tables error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create tables",
      error: error.message,
    });
  }
});

module.exports = router;

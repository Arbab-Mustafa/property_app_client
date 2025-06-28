const {
  initializeDatabase,
  createTables,
  testConnection,
} = require("./config/database");

async function initializeApp() {
  console.log("🚀 Initializing KR Property Backend...");

  // Initialize database connection
  const db = initializeDatabase();

  if (db) {
    console.log("✅ Database initialized successfully");

    // Test connection
    const connectionTest = await testConnection();
    if (connectionTest.success) {
      console.log("✅ Database connection test passed");

      // Create tables
      const tablesCreated = await createTables();
      if (tablesCreated) {
        console.log("✅ Database tables ready");
      } else {
        console.log("⚠️ Warning: Some tables may not have been created");
      }
    } else {
      console.error(
        "❌ Database connection test failed:",
        connectionTest.error
      );
    }
  } else {
    console.error("❌ Failed to initialize database");
  }

  console.log("🎯 Backend initialization complete");
}

module.exports = { initializeApp };

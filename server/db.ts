import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Lazy initialization variables
let pool: Pool | null = null;
let db: any = null;
let initialized = false;

// Lazy initialization function
function initializeDatabase() {
  if (initialized) return;
  initialized = true;

  if (process.env.DATABASE_URL) {
    try {
      pool = new Pool({ connectionString: process.env.DATABASE_URL });
      db = drizzle({ client: pool, schema });
      console.log("✅ Database connection initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize database connection:", error);
      console.log("⚠️  Application will use in-memory storage instead");
    }
  } else {
    console.log(
      "⚠️  DATABASE_URL not found - database features will be disabled"
    );
    console.log(
      "💡 To enable database features, set DATABASE_URL in your .env file"
    );
  }
}

// Getter functions that initialize on first access
function getPool() {
  initializeDatabase();
  return pool;
}

function getDb() {
  initializeDatabase();
  return db;
}

export { getPool as pool, getDb as db };

import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Create database connection only if DATABASE_URL is available
let pool: Pool | null = null;
let db: any = null;

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

export { pool, db };

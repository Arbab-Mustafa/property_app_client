import { defineConfig } from "drizzle-kit";

// Only create config if DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.log(
    "⚠️  DATABASE_URL not found - Drizzle operations will be disabled"
  );
  console.log(
    "💡 To enable database features, set DATABASE_URL in your .env file"
  );

  // Export a minimal config to prevent errors
  export default defineConfig({
    out: "./migrations",
    schema: "./shared/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
      url: "postgresql://placeholder:placeholder@localhost:5432/placeholder",
    },
  });
} else {
  export default defineConfig({
    out: "./migrations",
    schema: "./shared/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
      url: process.env.DATABASE_URL,
    },
  });
}

import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { eq } from "drizzle-orm";
import {
  contactSubmissions,
  newsletterSubscriptions,
} from "../shared/schema.js";

// Configure Neon for serverless
neonConfig.webSocketConstructor =
  global.WebSocket ||
  (() => {
    const ws = require("ws");
    return ws;
  })();

// Memory storage for fallback
class MemStorage {
  constructor() {
    this.contacts = new Map();
    this.newsletters = new Map();
    this.contactId = 1;
    this.newsletterId = 1;
  }

  async createContactSubmission(data) {
    console.log("📝 Processing contact submission (MemStorage)...");
    const id = this.contactId++;
    const createdAt = new Date();
    const contact = {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      investmentAmount: data.investmentAmount || "",
      message: data.message,
      createdAt,
    };
    this.contacts.set(id, contact);
    console.log("💭 Contact saved to memory storage with ID:", id);
    return contact;
  }

  async getNewsletterByEmail(email) {
    console.log("🔍 Checking newsletter (MemStorage):", email);
    for (const newsletter of Array.from(this.newsletters.values())) {
      if (newsletter.email === email) {
        return newsletter;
      }
    }
    return undefined;
  }

  async createNewsletterSubscription(data) {
    console.log("📧 Processing newsletter subscription (MemStorage)...");
    const id = this.newsletterId++;
    const createdAt = new Date();
    const newsletter = { ...data, id, createdAt };
    this.newsletters.set(id, newsletter);
    console.log("💭 Newsletter saved to memory storage with ID:", id);
    return newsletter;
  }
}

// Database storage
class DatabaseStorage {
  constructor() {
    this.db = null;
    this.pool = null;
    this.initializeDatabase();
  }

  initializeDatabase() {
    if (process.env.DATABASE_URL) {
      try {
        this.pool = new Pool({ connectionString: process.env.DATABASE_URL });
        this.db = drizzle(this.pool);
        console.log("✅ Vercel: Database connection initialized");
      } catch (error) {
        console.error("❌ Vercel: Database initialization failed:", error);
      }
    }
  }

  async createContactSubmission(data) {
    console.log("📝 Processing contact submission (Database)...");
    try {
      const [contact] = await this.db
        .insert(contactSubmissions)
        .values(data)
        .returning();
      console.log("✅ Contact saved to database with ID:", contact.id);
      return contact;
    } catch (error) {
      console.error("❌ Database insert failed:", error);
      throw error;
    }
  }

  async getNewsletterByEmail(email) {
    console.log("🔍 Checking newsletter (Database):", email);
    try {
      const [newsletter] = await this.db
        .select()
        .from(newsletterSubscriptions)
        .where(eq(newsletterSubscriptions.email, email));
      return newsletter || undefined;
    } catch (error) {
      console.error("❌ Database query failed:", error);
      throw error;
    }
  }

  async createNewsletterSubscription(data) {
    console.log("📧 Processing newsletter subscription (Database)...");
    try {
      const [newsletter] = await this.db
        .insert(newsletterSubscriptions)
        .values(data)
        .returning();
      console.log("✅ Newsletter saved to database with ID:", newsletter.id);
      return newsletter;
    } catch (error) {
      console.error("❌ Database insert failed:", error);
      // Check if it's a unique constraint error
      if (error?.code === "23505" || error?.message?.includes("unique")) {
        console.log("ℹ️  Email already exists, fetching existing record");
        const existing = await this.getNewsletterByEmail(data.email);
        if (existing) return existing;
      }
      throw error;
    }
  }
}

export function createStorage() {
  console.log("🔍 Vercel: Checking environment variables...");
  console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

  try {
    if (process.env.DATABASE_URL) {
      console.log("✅ Vercel: Using DatabaseStorage");
      return new DatabaseStorage();
    } else {
      console.log("⚠️  Vercel: Using MemStorage - No database configured");
      return new MemStorage();
    }
  } catch (error) {
    console.error(
      "❌ Vercel: Database connection failed, using MemStorage:",
      error
    );
    return new MemStorage();
  }
}

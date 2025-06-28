import {
  users,
  contactSubmissions,
  newsletterSubscriptions,
  learningProgress,
  achievements,
  quizResults,
  type User,
  type InsertUser,
  type Contact,
  type InsertContact,
  type Newsletter,
  type InsertNewsletter,
  type LearningProgress,
  type InsertLearningProgress,
  type Achievement,
  type InsertAchievement,
  type QuizResult,
  type InsertQuizResult,
} from "@shared/schema";
import { db as getDb } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods (from original file)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Contact form methods
  getContactSubmission(id: number): Promise<Contact | undefined>;
  createContactSubmission(contact: InsertContact): Promise<Contact>;

  // Newsletter methods
  getNewsletterSubscription(id: number): Promise<Newsletter | undefined>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
  createNewsletterSubscription(
    newsletter: InsertNewsletter
  ): Promise<Newsletter>;

  // Learning progress methods
  getLearningProgress(userId: string): Promise<LearningProgress[]>;
  createLearningProgress(
    progress: InsertLearningProgress
  ): Promise<LearningProgress>;
  updateLearningProgress(
    userId: string,
    moduleId: string,
    progress: Partial<InsertLearningProgress>
  ): Promise<LearningProgress>;

  // Achievement methods
  getUserAchievements(userId: string): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;

  // Quiz result methods
  getQuizResults(userId: string): Promise<QuizResult[]>;
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
}

// Enhanced Memory Storage implementation with better logging
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private newsletters: Map<number, Newsletter>;
  private learningProgressMap: Map<string, LearningProgress>;
  private achievementsMap: Map<string, Achievement>;
  private quizResultsMap: Map<string, QuizResult>;

  private userId: number;
  private contactId: number;
  private newsletterId: number;
  private progressId: number;
  private achievementId: number;
  private quizResultId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.newsletters = new Map();
    this.learningProgressMap = new Map();
    this.achievementsMap = new Map();
    this.quizResultsMap = new Map();

    this.userId = 1;
    this.contactId = 1;
    this.newsletterId = 1;
    this.progressId = 1;
    this.achievementId = 1;
    this.quizResultId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of Array.from(this.users.values())) {
      if (user.username === username) return user;
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getContactSubmission(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContactSubmission(data: InsertContact): Promise<Contact> {
    console.log("📝 Processing contact submission...");
    console.log("📄 Contact data:", {
      name: data.name,
      email: data.email,
      hasMessage: !!data.message,
    });

    const id = this.contactId++;
    const createdAt = new Date();
    const contact: Contact = {
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
    console.log("📊 Memory storage now has", this.contacts.size, "contacts");
    return contact;
  }

  async getNewsletterSubscription(id: number): Promise<Newsletter | undefined> {
    return this.newsletters.get(id);
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    console.log("🔍 Checking for existing newsletter subscription:", email);
    console.log("💭 Checking memory storage for newsletter");

    for (const newsletter of Array.from(this.newsletters.values())) {
      if (newsletter.email === email) {
        console.log("📊 Memory check result: Found");
        return newsletter;
      }
    }
    console.log("📊 Memory check result: Not found");
    return undefined;
  }

  async createNewsletterSubscription(
    data: InsertNewsletter
  ): Promise<Newsletter> {
    console.log("📧 Processing newsletter subscription...");
    console.log("📄 Newsletter data:", { email: data.email });

    const id = this.newsletterId++;
    const createdAt = new Date();
    const newsletter: Newsletter = { ...data, id, createdAt };
    this.newsletters.set(id, newsletter);

    console.log(
      "💭 Newsletter subscription saved to memory storage with ID:",
      id
    );
    console.log(
      "📊 Memory storage now has",
      this.newsletters.size,
      "newsletter subscriptions"
    );
    return newsletter;
  }

  async getLearningProgress(userId: string): Promise<LearningProgress[]> {
    const results: LearningProgress[] = [];
    for (const progress of Array.from(this.learningProgressMap.values())) {
      if (progress.userId === userId) {
        results.push(progress);
      }
    }
    return results;
  }

  async createLearningProgress(
    data: InsertLearningProgress
  ): Promise<LearningProgress> {
    const id = this.progressId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const progress: LearningProgress = {
      ...data,
      id,
      createdAt,
      updatedAt,
      completed: data.completed || "false",
      score: data.score || null,
      timeSpent: data.timeSpent || null,
    };
    this.learningProgressMap.set(`${data.userId}-${data.moduleId}`, progress);
    return progress;
  }

  async updateLearningProgress(
    userId: string,
    moduleId: string,
    data: Partial<InsertLearningProgress>
  ): Promise<LearningProgress> {
    const key = `${userId}-${moduleId}`;
    const existing = this.learningProgressMap.get(key);
    if (!existing) {
      throw new Error("Learning progress not found");
    }
    const updated: LearningProgress = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    };
    this.learningProgressMap.set(key, updated);
    return updated;
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return Array.from(this.achievementsMap.values()).filter(
      (achievement) => achievement.userId === userId
    );
  }

  async createAchievement(data: InsertAchievement): Promise<Achievement> {
    const id = this.achievementId++;
    const earnedAt = new Date();
    const achievement: Achievement = { ...data, id, earnedAt };
    this.achievementsMap.set(`${data.userId}-${data.badgeId}`, achievement);
    return achievement;
  }

  async getQuizResults(userId: string): Promise<QuizResult[]> {
    return Array.from(this.quizResultsMap.values()).filter(
      (result) => result.userId === userId
    );
  }

  async createQuizResult(data: InsertQuizResult): Promise<QuizResult> {
    const id = this.quizResultId++;
    const completedAt = new Date();
    const result: QuizResult = { ...data, id, completedAt };
    this.quizResultsMap.set(`${data.userId}-${data.quizId}-${id}`, result);
    return result;
  }
}

// Enhanced Database Storage implementation with comprehensive logging
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const db = getDb();
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const db = getDb();
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const db = getDb();
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getContactSubmission(id: number): Promise<Contact | undefined> {
    const db = getDb();
    const [contact] = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, id));
    return contact || undefined;
  }

  async createContactSubmission(data: InsertContact): Promise<Contact> {
    console.log("📝 Processing contact submission...");
    console.log("📄 Contact data:", {
      name: data.name,
      email: data.email,
      hasMessage: !!data.message,
    });
    console.log("💾 Attempting to save contact to Neon database...");

    try {
      const db = getDb();
      const [contact] = await db
        .insert(contactSubmissions)
        .values(data)
        .returning();

      console.log("✅ Contact saved to database with ID:", contact.id);
      return contact;
    } catch (error: any) {
      console.error("❌ Database insert failed for contact:");
      console.error("📋 Error details:", error?.message || error);
      console.error("🔍 Error code:", error?.code);
      throw error;
    }
  }

  async getNewsletterSubscription(id: number): Promise<Newsletter | undefined> {
    const db = getDb();
    const [newsletter] = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.id, id));
    return newsletter || undefined;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    console.log("🔍 Checking for existing newsletter subscription:", email);
    console.log("🔍 Querying Neon database for existing subscription...");

    try {
      const db = getDb();
      const [newsletter] = await db
        .select()
        .from(newsletterSubscriptions)
        .where(eq(newsletterSubscriptions.email, email));

      if (newsletter) {
        console.log(
          "✅ Found existing subscription in database:",
          newsletter.id
        );
        return newsletter;
      }
      console.log("ℹ️  No existing subscription found in database");
      return undefined;
    } catch (error: any) {
      console.error("❌ Database query failed for newsletter:");
      console.error("📋 Error details:", error?.message || error);
      throw error;
    }
  }

  async createNewsletterSubscription(
    data: InsertNewsletter
  ): Promise<Newsletter> {
    console.log("📧 Processing newsletter subscription...");
    console.log("📄 Newsletter data:", { email: data.email });
    console.log(
      "💾 Attempting to save newsletter subscription to Neon database..."
    );

    try {
      const db = getDb();
      const [newsletter] = await db
        .insert(newsletterSubscriptions)
        .values(data)
        .returning();

      console.log(
        "✅ Newsletter subscription saved to database with ID:",
        newsletter.id
      );
      return newsletter;
    } catch (error: any) {
      console.error("❌ Database insert failed for newsletter:");
      console.error("📋 Error details:", error?.message || error);
      console.error("🔍 Error code:", error?.code);

      // Check if it's a unique constraint error
      if (error?.code === "23505" || error?.message?.includes("unique")) {
        console.log("ℹ️  Email already exists in database");
        // Return the existing record
        const existing = await this.getNewsletterByEmail(data.email);
        if (existing) return existing;
      }
      throw error;
    }
  }

  async getLearningProgress(userId: string): Promise<LearningProgress[]> {
    const db = getDb();
    return await db
      .select()
      .from(learningProgress)
      .where(eq(learningProgress.userId, userId));
  }

  async createLearningProgress(
    data: InsertLearningProgress
  ): Promise<LearningProgress> {
    const db = getDb();
    const [progress] = await db
      .insert(learningProgress)
      .values(data)
      .returning();
    return progress;
  }

  async updateLearningProgress(
    userId: string,
    moduleId: string,
    data: Partial<InsertLearningProgress>
  ): Promise<LearningProgress> {
    const db = getDb();
    const [progress] = await db
      .update(learningProgress)
      .set({ ...data, updatedAt: new Date() })
      .where(
        eq(learningProgress.userId, userId) &&
          eq(learningProgress.moduleId, moduleId)
      )
      .returning();
    return progress;
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    const db = getDb();
    return await db
      .select()
      .from(achievements)
      .where(eq(achievements.userId, userId));
  }

  async createAchievement(data: InsertAchievement): Promise<Achievement> {
    const db = getDb();
    const [achievement] = await db
      .insert(achievements)
      .values(data)
      .returning();
    return achievement;
  }

  async getQuizResults(userId: string): Promise<QuizResult[]> {
    const db = getDb();
    return await db
      .select()
      .from(quizResults)
      .where(eq(quizResults.userId, userId));
  }

  async createQuizResult(data: InsertQuizResult): Promise<QuizResult> {
    const db = getDb();
    const [result] = await db.insert(quizResults).values(data).returning();
    return result;
  }
}

// Enhanced smart storage selection with comprehensive logging
function createStorage(): IStorage {
  console.log("🔍 Checking environment variables...");
  console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
  console.log(
    "DATABASE_URL preview:",
    process.env.DATABASE_URL
      ? `${process.env.DATABASE_URL.substring(0, 20)}...`
      : "Not found"
  );

  try {
    if (process.env.DATABASE_URL) {
      console.log("✅ Using DatabaseStorage - Database connection available");
      return new DatabaseStorage();
    } else {
      console.log(
        "⚠️  Using MemStorage - No database configured (DATABASE_URL not set)"
      );
      console.log(
        "💡 To enable database features, set DATABASE_URL in your .env file"
      );
      return new MemStorage();
    }
  } catch (error) {
    console.error(
      "❌ Database connection failed, falling back to MemStorage:",
      error
    );
    return new MemStorage();
  }
}

// Lazy storage initialization
let storageInstance: IStorage | null = null;

function getStorage(): IStorage {
  if (!storageInstance) {
    storageInstance = createStorage();
  }
  return storageInstance;
}

export { getStorage as storage };

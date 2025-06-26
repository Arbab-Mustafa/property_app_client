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

  // User methods (from original file)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contact form methods
  async getContactSubmission(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContactSubmission(data: InsertContact): Promise<Contact> {
    const id = this.contactId++;
    const createdAt = new Date();
    const contact: Contact = {
      id,
      createdAt,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      investmentAmount: data.investmentAmount,
      message: data.message,
    };
    this.contacts.set(id, contact);
    return contact;
  }

  // Newsletter methods
  async getNewsletterSubscription(id: number): Promise<Newsletter | undefined> {
    return this.newsletters.get(id);
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email
    );
  }

  async createNewsletterSubscription(
    data: InsertNewsletter
  ): Promise<Newsletter> {
    const id = this.newsletterId++;
    const createdAt = new Date();
    const newsletter: Newsletter = { ...data, id, createdAt };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  // Learning progress methods
  async getLearningProgress(userId: string): Promise<LearningProgress[]> {
    return Array.from(this.learningProgressMap.values()).filter(
      (progress) => progress.userId === userId
    );
  }

  async createLearningProgress(
    data: InsertLearningProgress
  ): Promise<LearningProgress> {
    const id = this.progressId++;
    const now = new Date();
    const progress: LearningProgress = {
      id,
      createdAt: now,
      updatedAt: now,
      userId: data.userId,
      moduleId: data.moduleId,
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

  // Achievement methods
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

  // Quiz result methods
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

import { db } from "./db";
import { eq } from "drizzle-orm";

// Database Storage implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getContactSubmission(id: number): Promise<Contact | undefined> {
    const [contact] = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, id));
    return contact || undefined;
  }

  async createContactSubmission(data: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contactSubmissions)
      .values(data)
      .returning();
    return contact;
  }

  async getNewsletterSubscription(id: number): Promise<Newsletter | undefined> {
    const [newsletter] = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.id, id));
    return newsletter || undefined;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    const [newsletter] = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email));
    return newsletter || undefined;
  }

  async createNewsletterSubscription(
    data: InsertNewsletter
  ): Promise<Newsletter> {
    const [newsletter] = await db
      .insert(newsletterSubscriptions)
      .values(data)
      .returning();
    return newsletter;
  }

  // Learning progress methods
  async getLearningProgress(userId: string): Promise<LearningProgress[]> {
    return await db
      .select()
      .from(learningProgress)
      .where(eq(learningProgress.userId, userId));
  }

  async createLearningProgress(
    data: InsertLearningProgress
  ): Promise<LearningProgress> {
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

  // Achievement methods
  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return await db
      .select()
      .from(achievements)
      .where(eq(achievements.userId, userId));
  }

  async createAchievement(data: InsertAchievement): Promise<Achievement> {
    const [achievement] = await db
      .insert(achievements)
      .values(data)
      .returning();
    return achievement;
  }

  // Quiz result methods
  async getQuizResults(userId: string): Promise<QuizResult[]> {
    return await db
      .select()
      .from(quizResults)
      .where(eq(quizResults.userId, userId));
  }

  async createQuizResult(data: InsertQuizResult): Promise<QuizResult> {
    const [result] = await db.insert(quizResults).values(data).returning();
    return result;
  }
}

// Smart storage selection with fallback
function createStorage(): IStorage {
  try {
    // Check if DATABASE_URL is available
    if (process.env.DATABASE_URL) {
      console.log("✅ Using DatabaseStorage - Database connection available");
      return new DatabaseStorage();
    } else {
      console.log(
        "⚠️  Using MemStorage - No database configured (DATABASE_URL not set)"
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

export const storage = createStorage();

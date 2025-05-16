import { 
  users, 
  contactSubmissions, 
  newsletterSubscriptions, 
  type User, 
  type InsertUser, 
  type Contact,
  type InsertContact,
  type Newsletter,
  type InsertNewsletter
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
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<Newsletter>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private newsletters: Map<number, Newsletter>;
  
  private userId: number;
  private contactId: number;
  private newsletterId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.newsletters = new Map();
    
    this.userId = 1;
    this.contactId = 1;
    this.newsletterId = 1;
  }

  // User methods (from original file)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
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
    const contact: Contact = { ...data, id, createdAt };
    this.contacts.set(id, contact);
    return contact;
  }
  
  // Newsletter methods
  async getNewsletterSubscription(id: number): Promise<Newsletter | undefined> {
    return this.newsletters.get(id);
  }
  
  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email,
    );
  }

  async createNewsletterSubscription(data: InsertNewsletter): Promise<Newsletter> {
    const id = this.newsletterId++;
    const createdAt = new Date();
    const newsletter: Newsletter = { ...data, id, createdAt };
    this.newsletters.set(id, newsletter);
    return newsletter;
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
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getContactSubmission(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
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
    const [newsletter] = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.id, id));
    return newsletter || undefined;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    const [newsletter] = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.email, email));
    return newsletter || undefined;
  }

  async createNewsletterSubscription(data: InsertNewsletter): Promise<Newsletter> {
    const [newsletter] = await db
      .insert(newsletterSubscriptions)
      .values(data)
      .returning();
    return newsletter;
  }
}

export const storage = new DatabaseStorage();

const { pgTable, text, serial, timestamp } = require("drizzle-orm/pg-core");
const { createInsertSchema } = require("drizzle-zod");

// Contact submissions table
const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  investmentAmount: text("investment_amount").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

// Newsletter subscriptions table
const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const insertNewsletterSchema = createInsertSchema(newsletterSubscriptions).omit(
  {
    id: true,
    createdAt: true,
  }
);

// Deal sourcing waitlist table
const dealSourcingWaitlist = pgTable("deal_sourcing_waitlist", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const insertDealLeadSchema = createInsertSchema(dealSourcingWaitlist).omit({
  id: true,
  createdAt: true,
});

module.exports = {
  contactSubmissions,
  insertContactSchema,
  newsletterSubscriptions,
  insertNewsletterSchema,
  dealSourcingWaitlist,
  insertDealLeadSchema,
};

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./email";
import { insertContactSchema, insertNewsletterSchema, insertLearningProgressSchema, insertAchievementSchema, insertQuizResultSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);
      res.status(201).json({ message: "Contact form submitted successfully", id: contact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        console.error("Contact form submission error:", error);
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const existing = await storage.getNewsletterByEmail(validatedData.email);
      
      if (existing) {
        return res.status(200).json({ message: "Email already subscribed" });
      }
      
      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.status(201).json({ message: "Subscribed to newsletter successfully", id: subscription.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid email", errors: error.errors });
      } else {
        console.error("Newsletter subscription error:", error);
        res.status(500).json({ message: "Failed to subscribe to newsletter" });
      }
    }
  });

  // Learning Progress Routes
  app.get("/api/learning/progress/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const progress = await storage.getLearningProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Get learning progress error:", error);
      res.status(500).json({ message: "Failed to get learning progress" });
    }
  });

  app.post("/api/learning/progress", async (req, res) => {
    try {
      const validatedData = insertLearningProgressSchema.parse(req.body);
      const progress = await storage.createLearningProgress(validatedData);
      res.status(201).json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      } else {
        console.error("Create learning progress error:", error);
        res.status(500).json({ message: "Failed to create learning progress" });
      }
    }
  });

  app.put("/api/learning/progress/:userId/:moduleId", async (req, res) => {
    try {
      const { userId, moduleId } = req.params;
      const progress = await storage.updateLearningProgress(userId, moduleId, req.body);
      res.json(progress);
    } catch (error) {
      console.error("Update learning progress error:", error);
      res.status(500).json({ message: "Failed to update learning progress" });
    }
  });

  // Achievement Routes
  app.get("/api/learning/achievements/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      console.error("Get achievements error:", error);
      res.status(500).json({ message: "Failed to get achievements" });
    }
  });

  app.post("/api/learning/achievements", async (req, res) => {
    try {
      const validatedData = insertAchievementSchema.parse(req.body);
      const achievement = await storage.createAchievement(validatedData);
      res.status(201).json(achievement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid achievement data", errors: error.errors });
      } else {
        console.error("Create achievement error:", error);
        res.status(500).json({ message: "Failed to create achievement" });
      }
    }
  });

  // Quiz Result Routes
  app.get("/api/learning/quiz-results/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const results = await storage.getQuizResults(userId);
      res.json(results);
    } catch (error) {
      console.error("Get quiz results error:", error);
      res.status(500).json({ message: "Failed to get quiz results" });
    }
  });

  app.post("/api/learning/quiz-results", async (req, res) => {
    try {
      const validatedData = insertQuizResultSchema.parse(req.body);
      const result = await storage.createQuizResult(validatedData);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid quiz result data", errors: error.errors });
      } else {
        console.error("Create quiz result error:", error);
        res.status(500).json({ message: "Failed to create quiz result" });
      }
    }
  });

  // Deal lead endpoint for waitlist
  app.post("/api/send-deal-lead", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
      }

      // 1. Send Email via SendGrid
      try {
        await sendEmail({
          to: email,
          from: "aaron@kr-properties.co.uk",
          subject: "You're on the Waitlist! ✅",
          html: `
            <h3>Thanks for joining the KR Property Investments Waitlist</h3>
            <p>We'll let you know when deal sourcing opens again.</p>
            <p><strong>Bonus:</strong> Your free Deal Checklist will be available soon.</p>
            <p>— The KR Property Team</p>
          `
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Continue with storage even if email fails
      }

      // 2. Store lead in Baserow
      const BASEROW_API_TOKEN = process.env.BASEROW_API_TOKEN;
      const BASEROW_TABLE_ID = "577145";
      const BASEROW_URL = `https://api.baserow.io/api/database/rows/table/${BASEROW_TABLE_ID}/`;

      if (BASEROW_API_TOKEN) {
        try {
          await fetch(BASEROW_URL, {
            method: "POST",
            headers: {
              Authorization: `Token ${BASEROW_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Name: name,
              Email: email,
              Optional: message || "",
            }),
          });
        } catch (baserowError) {
          console.error("Baserow submission failed:", baserowError);
          // Continue with local storage even if Baserow fails
        }
      }

      // 3. Store locally as backup
      const contactData = {
        name,
        email,
        phone: null,
        investmentAmount: "Deal Sourcing Waitlist",
        message: message || "Interested in joining the deal sourcing waitlist"
      };

      await storage.createContactSubmission(contactData);
      
      res.status(200).json({ message: "Successfully joined waitlist" });
    } catch (error) {
      console.error("Deal lead submission error:", error);
      res.status(500).json({ message: "Failed to submit waitlist request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./email";
import {
  insertContactSchema,
  insertNewsletterSchema,
  insertLearningProgressSchema,
  insertAchievementSchema,
  insertQuizResultSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Contact form submission received:", req.body);
      const validatedData = insertContactSchema.parse(req.body);
      console.log("Contact form validation passed:", validatedData);
      const contact = await storage.createContactSubmission(validatedData);
      console.log("Contact form saved successfully:", contact.id);
      res
        .status(201)
        .json({
          message: "Contact form submitted successfully",
          id: contact.id,
        });
    } catch (error) {
      console.error("Contact form submission error:", error);
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.errors);
        res.status(400).json({
          message: "Invalid form data",
          errors: error.errors,
          received: req.body,
        });
      } else {
        console.error("Unexpected error:", error);
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

      const subscription = await storage.createNewsletterSubscription(
        validatedData
      );
      res
        .status(201)
        .json({
          message: "Subscribed to newsletter successfully",
          id: subscription.id,
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res
          .status(400)
          .json({ message: "Invalid email", errors: error.errors });
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
        res
          .status(400)
          .json({ message: "Invalid progress data", errors: error.errors });
      } else {
        console.error("Create learning progress error:", error);
        res.status(500).json({ message: "Failed to create learning progress" });
      }
    }
  });

  app.put("/api/learning/progress/:userId/:moduleId", async (req, res) => {
    try {
      const { userId, moduleId } = req.params;
      const progress = await storage.updateLearningProgress(
        userId,
        moduleId,
        req.body
      );
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
        res
          .status(400)
          .json({ message: "Invalid achievement data", errors: error.errors });
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
        res
          .status(400)
          .json({ message: "Invalid quiz result data", errors: error.errors });
      } else {
        console.error("Create quiz result error:", error);
        res.status(500).json({ message: "Failed to create quiz result" });
      }
    }
  });

  // Deal lead endpoint for waitlist
  app.post("/api/send-deal-lead", async (req, res) => {
    if (req.method !== "POST")
      return res.status(405).send("Method not allowed");

    const { name, email, message } = req.body;

    try {
      // ✅ 1. Send confirmation email to user
      try {
        await sendEmail({
          to: email,
          from: "aaron@kr-properties.co.uk",
          subject: "Welcome to the Deal Sourcing Waitlist! 🎯",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1A355E;">Thanks for joining our Deal Sourcing Waitlist, ${name}!</h2>
              
              <p>We're currently at full capacity, but you'll be the first to know when we reopen for new clients.</p>
              
              <p><strong>🎁 Your FREE Deal Checklist is ready!</strong></p>
              
              <p>As promised, here's your comprehensive Deal Checklist to help you prepare like a pro. You can download it <a href="https://drive.google.com/file/d/1P_hHhSY2RTOcDxpRuN3egPsff71S3Mtv/view?usp=sharing" style="color: #F97316; text-decoration: none; font-weight: bold;">here</a>.</p>
              
              <p>This checklist includes:</p>
              <ul>
                <li>✅ Key questions to ask before buying</li>
                <li>✅ How to spot hidden costs and deal-breakers</li>
                <li>✅ 10 due diligence checks most investors skip</li>
                <li>✅ Methods to instantly compare ROI across deals</li>
              </ul>
              
              <p>We'll be in touch as soon as we have availability.</p>
              
              <p style="margin-top: 30px;">Best regards,<br/>
              <strong>Aaron from KR Property Investments</strong></p>
              
              <hr style="border: none; border-top: 1px solid #C58B25; margin: 30px 0;">
              <p style="font-size: 12px; color: #6B7280;">Expected next intake: Autumn 2025</p>
            </div>
          `,
        });
        console.log("Confirmation email sent to:", email);
      } catch (emailError) {
        console.error("Email failed:", emailError);
      }

      // ✅ 2. Send to Baserow
      const baserowToken = process.env.VITE_BASEROW_API_TOKEN;
      console.log(
        "Using Baserow token:",
        baserowToken
          ? `Token exists (${baserowToken.substring(0, 8)}...)`
          : "No token found"
      );

      if (baserowToken) {
        // Create formatted timestamp: "17 June 2025 – 2:38PM"
        const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleString("en-US", { month: "long" });
        const year = now.getFullYear();
        const time = now.toLocaleString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        const timestamp = `${day} ${month} ${year} – ${time}`;

        const baserowData = {
          field_4646200: name,
          field_4646201: email,
          field_4646202: message || "",
          field_4648813: timestamp,
        };

        console.log("Sending to Baserow:", baserowData);

        const baserowRes = await fetch(
          "https://api.baserow.io/api/database/rows/table/577145/",
          {
            method: "POST",
            headers: {
              Authorization: `Token ${baserowToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(baserowData),
          }
        );

        if (!baserowRes.ok) {
          const errorText = await baserowRes.text();
          console.error("Baserow error:", errorText);
          console.error("Response status:", baserowRes.status);
        } else {
          const response = await baserowRes.json();
          console.log("Baserow submission successful:", response);
        }
      } else {
        console.error("No Baserow token available");
      }

      res.status(200).send("Success");
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Something went wrong");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

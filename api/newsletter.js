import dotenv from "dotenv";
dotenv.config();

import { insertNewsletterSchema } from "../shared/schema.js";
import { createStorage } from "../server/storage-vercel.js";
import { z } from "zod";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const validatedData = insertNewsletterSchema.parse(req.body);
    const storage = createStorage();
    const existing = await storage.getNewsletterByEmail(validatedData.email);

    if (existing) {
      return res.status(200).json({ message: "Email already subscribed" });
    }

    const subscription = await storage.createNewsletterSubscription(
      validatedData
    );
    res.status(201).json({
      message: "Subscribed to newsletter successfully",
      id: subscription.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid email", errors: error.errors });
    } else {
      console.error("Newsletter subscription error:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  }
}

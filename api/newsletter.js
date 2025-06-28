import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

// Define schema inline to avoid import issues
const insertNewsletterSchema = z.object({
  email: z.string().email(),
});

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
    console.log("Newsletter API called with body:", req.body);

    // Validate the email
    const validatedData = insertNewsletterSchema.parse(req.body);
    console.log("Email validated:", validatedData.email);

    // For now, just return success without database operations
    // This will help us isolate if the issue is with imports or database
    res.status(201).json({
      message: "Subscribed to newsletter successfully",
      id: Math.floor(Math.random() * 1000), // Random ID for testing
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid email", errors: error.errors });
    } else {
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  }
}

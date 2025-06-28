import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

// Define schema inline to avoid import issues
const insertContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  investmentAmount: z.string().min(1),
  message: z.string().min(1),
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
    console.log("Contact API called with body:", req.body);

    // Validate the form data
    const validatedData = insertContactSchema.parse(req.body);
    console.log("Contact data validated:", validatedData);

    // For now, just return success without database operations
    // This will help us isolate if the issue is with imports or database
    res.status(201).json({
      message: "Contact form submitted successfully",
      id: Math.floor(Math.random() * 1000), // Random ID for testing
    });
  } catch (error) {
    console.error("Contact form submission error:", error);

    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Invalid form data", errors: error.errors });
    } else {
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  }
}

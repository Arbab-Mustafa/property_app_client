import dotenv from "dotenv";
dotenv.config();

import sgMail from "@sendgrid/mail";

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

  const { name, email, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    // Send confirmation email to user
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      try {
        await sgMail.send({
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
              <p style="margin-top: 30px;">Best regards,<br/><strong>Aaron from KR Property Investments</strong></p>
              <hr style="border: none; border-top: 1px solid #C58B25; margin: 30px 0;">
              <p style="font-size: 12px; color: #6B7280;">Expected next intake: Autumn 2025</p>
            </div>
          `,
        });
        console.log("Confirmation email sent to:", email);
      } catch (emailError) {
        console.error("Email failed:", emailError);
      }
    }

    res.status(200).json({
      success: true,
      message:
        "Successfully joined the waitlist! Check your email for the free checklist.",
    });
  } catch (error) {
    console.error("Deal lead submission error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}

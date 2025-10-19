const express = require("express");
const path = require("path");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Google Sheets configuration
let sheets;
let auth;

// Initialize Google Sheets API
async function initGoogleSheets() {
  try {
    // Load credentials from environment variable or file
    let credentials;
    
    if (process.env.GOOGLE_CREDENTIALS) {
      // For Heroku - credentials from environment variable
      credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    } else {
      // For local development - credentials from file
      const fs = require("fs");
      if (fs.existsSync(path.join(__dirname, "google-credentials.json"))) {
        credentials = require("./google-credentials.json");
      } else {
        console.log("⚠️  Google Sheets not configured. Emails will be saved to local file.");
        return null;
      }
    }

    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    sheets = google.sheets({ version: "v4", auth });
    console.log("✅ Google Sheets API initialized successfully");
    return sheets;
  } catch (error) {
    console.error("❌ Error initializing Google Sheets:", error.message);
    return null;
  }
}

// Initialize on startup
initGoogleSheets();

// Serve static files
app.use(express.static(__dirname));

// Language routing - redirect to language-specific paths
const supportedLanguages = ['en', 'de', 'es', 'fr', 'it'];

// Root path - serve English version
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "landing-page.html"));
});

// Language-specific routes for landing page
app.get("/:lang", (req, res) => {
  const lang = req.params.lang;
  if (supportedLanguages.includes(lang)) {
    res.sendFile(path.join(__dirname, "landing-page.html"));
  } else {
    res.status(404).send("Page not found");
  }
});

// Pricing pages
app.get("/pricing", (req, res) => {
  res.sendFile(path.join(__dirname, "pricing.html"));
});

app.get("/:lang/pricing", (req, res) => {
  const lang = req.params.lang;
  if (supportedLanguages.includes(lang)) {
    res.sendFile(path.join(__dirname, "pricing.html"));
  } else {
    res.status(404).send("Page not found");
  }
});

// How it works pages
app.get("/how-it-works", (req, res) => {
  res.sendFile(path.join(__dirname, "how-it-works.html"));
});

app.get("/:lang/how-it-works", (req, res) => {
  const lang = req.params.lang;
  if (supportedLanguages.includes(lang)) {
    res.sendFile(path.join(__dirname, "how-it-works.html"));
  } else {
    res.status(404).send("Page not found");
  }
});

// Email subscription endpoint
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  
  const timestamp = new Date().toISOString();
  const formattedDate = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  try {
    // Try to save to Google Sheets
    if (sheets && process.env.SPREADSHEET_ID) {
      const spreadsheetId = process.env.SPREADSHEET_ID;
      
      // Get the first sheet name dynamically (works with any language)
      const sheetMetadata = await sheets.spreadsheets.get({
        spreadsheetId,
      });
      const firstSheetName = sheetMetadata.data.sheets[0].properties.title;
      console.log(`📋 Using sheet: ${firstSheetName}`);
      
      // Check if email already exists
      const checkResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${firstSheetName}!A:A`,
      });
      
      const existingEmails = checkResponse.data.values || [];
      const emailExists = existingEmails.some(row => row[0] === email);
      
      if (!emailExists) {
        // Append new email
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: `${firstSheetName}!A:B`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [[email, formattedDate]],
          },
        });
        console.log(`✅ Email saved to Google Sheets: ${email}`);
      } else {
        console.log(`ℹ️  Email already exists: ${email}`);
      }
    } else {
      // Fallback to local file storage
      const fs = require("fs");
      const filePath = path.join(__dirname, "emails.json");
      
      let emails = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        emails = JSON.parse(fileContent);
      }
      
      if (!emails.find(e => e.email === email)) {
        emails.push({ email, timestamp });
        fs.writeFileSync(filePath, JSON.stringify(emails, null, 2));
        console.log(`📝 Email saved to local file: ${email}`);
      }
    }
    
    res.json({ success: true, message: "Email saved successfully" });
  } catch (error) {
    console.error("Error saving email:", error);
    res.status(500).json({ error: "Failed to save email. Please try again." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

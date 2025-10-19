# Google Sheets Email Collection Setup Guide

## 📋 Step-by-Step Instructions

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "NEW PROJECT"
3. Name it "ShoplyAI Emails" (or any name you want)
4. Click "CREATE"
5. Wait for the project to be created, then select it

### Step 2: Enable Google Sheets API

1. In your project, go to "APIs & Services" → "Library" (from the left menu)
2. Search for "Google Sheets API"
3. Click on it and click "ENABLE"
4. Wait for it to enable (takes a few seconds)

### Step 3: Create Service Account Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "CREATE CREDENTIALS" → "Service account"
3. Fill in:
   - Service account name: `shoplyai-email-collector`
   - Service account ID: (auto-filled)
   - Click "CREATE AND CONTINUE"
4. For "Grant this service account access to project":
   - Role: Select "Editor" (or "Basic" → "Editor")
   - Click "CONTINUE"
5. Click "DONE" (skip optional steps)

### Step 4: Download Credentials File

1. On the Credentials page, find your newly created service account
2. Click on it (the email address)
3. Go to the "KEYS" tab
4. Click "ADD KEY" → "Create new key"
5. Select "JSON" format
6. Click "CREATE"
7. A file will download - **SAVE THIS FILE!**
8. Rename it to `google-credentials.json`
9. **IMPORTANT:** Move it to your project folder: `c:\Dokumente\test\shoply-landingpage\`

### Step 5: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "+ Blank" to create a new spreadsheet
3. Name it "ShoplyAI Email List" (top-left corner)
4. In the first row, add headers:
   - Cell A1: `Email`
   - Cell B1: `Date Submitted`
5. **Copy the Spreadsheet ID** from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/ABC123xyz456/edit`
   - The ID is: `ABC123xyz456`
   - Save this for the next step! 1EiF2AHhSVeC83QRqiPknPHEB8YulDoaDzqionvlsz64

### Step 6: Share Sheet with Service Account

1. In your Google Sheet, click the "Share" button (top-right)
2. Open the `google-credentials.json` file you downloaded
3. Find the line with `"client_email"` - it looks like:
   ```
   "client_email": "shoplyai-email-collector@project-name-123456.iam.gserviceaccount.com"
   ```
4. Copy that ENTIRE email address
5. Paste it in the "Share" dialog
6. Change permission to "Editor"
7. **UNCHECK** "Notify people"
8. Click "Share" or "Done"

### Step 7: Configure Local Environment

1. Create a file named `.env` in your project folder
2. Add this line (replace with YOUR spreadsheet ID):
   ```
   SPREADSHEET_ID=ABC123xyz456
   ```

### Step 8: Install Dependencies & Restart Server

1. Stop your current server (Ctrl+C in the terminal)
2. Run:
   ```powershell
   npm install
   npm start
   ```
3. You should see: `✅ Google Sheets API initialized successfully`

### Step 9: Test It!

1. Go to http://localhost:3000
2. Click any "Get Started" or "Download" button
3. Enter an email address
4. Click "Notify Me"
5. Check your Google Sheet - the email should appear!

---

## 🚀 For Heroku Deployment

### Step 1: Add Spreadsheet ID to Heroku

```bash
heroku config:set SPREADSHEET_ID=your_spreadsheet_id_here
```

### Step 2: Add Google Credentials to Heroku

1. Open `google-credentials.json` in a text editor
2. Copy the ENTIRE content (it should be one long line)
3. Remove all line breaks - make it a single line
4. Run this command (replace with your content):

```bash
heroku config:set GOOGLE_CREDENTIALS='{"type":"service_account","project_id":"...paste entire json here..."}'
```

**OR** use the Heroku Dashboard:
1. Go to your app → Settings → Config Vars
2. Click "Reveal Config Vars"
3. Add key: `GOOGLE_CREDENTIALS`
4. Value: Paste the entire JSON content (as one line)
5. Add key: `SPREADSHEET_ID`
6. Value: Your spreadsheet ID

---

## ⚠️ Important Notes

1. **DO NOT** commit `google-credentials.json` to GitHub
   - Add it to `.gitignore`
   - This file contains sensitive credentials

2. **DO NOT** share the credentials file with anyone
   - It gives full access to your Google Cloud project

3. **Keep the spreadsheet ID safe**
   - Anyone with the ID + credentials can access the sheet

4. **Fallback**: If Google Sheets isn't configured, emails save to `emails.json` locally

---

## 🔧 Troubleshooting

### "Google Sheets not configured" message
- Make sure `google-credentials.json` is in the project folder
- Check that the file is valid JSON
- Verify the service account has access to the sheet

### "Error saving email"
- Check the console for detailed error messages
- Verify the Spreadsheet ID is correct
- Make sure the service account email has Editor access to the sheet

### Emails not appearing in sheet
- Check that the sheet is named "Sheet1" (default name)
- Verify columns A and B exist
- Check the server console for error messages

---

## 📝 File Structure

```
shoply-landingpage/
├── google-credentials.json  ← Download from Google Cloud (DO NOT COMMIT)
├── .env                      ← Your local config (DO NOT COMMIT)
├── .env.example              ← Example config (safe to commit)
├── server.js                 ← Updated with Google Sheets integration
├── package.json              ← Updated with googleapis dependency
└── ...other files
```

Add to `.gitignore`:
```
google-credentials.json
.env
emails.json
node_modules/
```

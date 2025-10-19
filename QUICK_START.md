# Quick Start Guide 🚀

## What I Need To Do NOW:

### 1. Install New Dependencies
```powershell
npm install
```

### 2. Follow the Google Sheets Setup
Open and follow: `GOOGLE_SHEETS_SETUP.md`

**Quick Summary:**
1. Go to Google Cloud Console
2. Create a new project
3. Enable Google Sheets API
4. Create service account
5. Download credentials → save as `google-credentials.json` in project folder
6. Create a Google Sheet
7. Share the sheet with the service account email
8. Copy the spreadsheet ID
9. Create `.env` file with: `SPREADSHEET_ID=your_id_here`

### 3. Restart Server
```powershell
npm start
```

### 4. Test It!
- Go to http://localhost:3000
- Click any button to get the modal
- Enter an email
- Click "Notify Me"
- Check your Google Sheet!

---

## Files Created/Updated:

✅ `server.js` - Updated with Google Sheets integration
✅ `package.json` - Added googleapis and dotenv
✅ `.env.example` - Example environment variables
✅ `.gitignore` - Prevent committing sensitive files
✅ `GOOGLE_SHEETS_SETUP.md` - Detailed setup instructions
✅ `QUICK_START.md` - This file

---

## For Heroku Deployment Later:

1. Set config vars in Heroku dashboard:
   - `SPREADSHEET_ID`
   - `GOOGLE_CREDENTIALS` (entire JSON as one line)

2. Push to GitHub (credentials are gitignored)

3. Heroku auto-deploys

---

## Need Help?

Check `GOOGLE_SHEETS_SETUP.md` for:
- Step-by-step instructions with screenshots descriptions
- Troubleshooting guide
- Heroku deployment steps

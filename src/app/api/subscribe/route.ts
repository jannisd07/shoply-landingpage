import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Initialize Google Sheets
async function getSheets() {
  try {
    let credentials;

    if (process.env.GOOGLE_CREDENTIALS) {
      credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    } else {
      return null;
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    return null;
  }
}

// Save email to local file as fallback
function saveToLocalFile(email: string, date: string): boolean {
  try {
    const filePath = path.join(process.cwd(), 'waitlist.csv');

    // Check if email already exists
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content.split('\n').some(line => line.split(',')[0] === email)) {
        console.log(`ℹ️ Email already in local file: ${email}`);
        return true;
      }
    }

    // Append new entry
    fs.appendFileSync(filePath, `${email},${date}\n`);
    console.log(`✅ Email saved to local file: ${email}`);
    return true;
  } catch (error) {
    console.error('Error saving to local file:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const formattedDate = new Date().toLocaleString('de-DE', {
      timeZone: 'Europe/Berlin',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const sheets = await getSheets();
    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (sheets && spreadsheetId) {
      // Get the first sheet name
      const sheetMetadata = await sheets.spreadsheets.get({ spreadsheetId });
      const firstSheetName = sheetMetadata.data.sheets?.[0]?.properties?.title || 'Sheet1';

      // Check if email already exists
      const checkResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${firstSheetName}!A:A`,
      });

      const existingEmails = checkResponse.data.values || [];
      const emailExists = existingEmails.some((row) => row[0] === email);

      if (!emailExists) {
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: `${firstSheetName}!A:B`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[email, formattedDate]],
          },
        });
        console.log(`✅ Email saved to Google Sheets: ${email}`);
      } else {
        console.log(`ℹ️ Email already exists in Sheets: ${email}`);
      }
    } else {
      // Fallback: save to local file
      saveToLocalFile(email, formattedDate);
    }

    return NextResponse.json({ success: true, message: 'Email saved successfully' });
  } catch (error) {
    console.error('Error saving email:', error);
    return NextResponse.json(
      { error: 'Failed to save email. Please try again.' },
      { status: 500 }
    );
  }
}

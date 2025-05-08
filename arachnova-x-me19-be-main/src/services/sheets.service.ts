import { google } from "googleapis";
import { googleCredentials } from "./credentials.service";

const auth = new google.auth.GoogleAuth({
  credentials: googleCredentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = process.env.SPREADSHEET_ID!;

export const appendToSheet = async (values: any[], competitionName: string) => {
  const sheetName = competitionName;

  // Get existing sheets
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID
  });

  const sheetExists = spreadsheet.data.sheets?.some(
    (sheet) => sheet.properties?.title === sheetName
  );

  // If sheet doesn't exist, create it
  if (!sheetExists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName
              }
            }
          }
        ]
      }
    });
  }

  // Append data to the sheet
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values]
    }
  });
};

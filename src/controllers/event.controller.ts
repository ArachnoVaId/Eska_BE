import { Request, Response } from "express";
import {
  deleteFolderIfExists,
  findFolder,
  ROOT_FOLDER_ID,
  uploadToDrive
} from "../services/drive.service";
import { appendToSheet } from "../services/sheets.service";
import { Competition, competitionConfigs } from "../configs/competition.config";

export const registerAction = async (
  req: Request,
  res: Response
): Promise<void> => {
  let teamFolderId: string | null = null;

  try {
    const { competitionName } = req.query;
    if (!competitionName || typeof competitionName !== "string") {
      res.status(400).json({ message: "Missing or invalid competitionName." });
      return;
    }

    const competition = competitionName as Competition;
    const config = competitionConfigs[competition];
    if (!config) {
      res.status(400).json({ message: "Invalid event selected." });
      return;
    }

    // 🔹 Separate field types
    const requiredTextFields = config
      .filter((f) => f.type !== "file" && f.required)
      .map((f) => f.name);

    const requiredFileFields = config.filter(
      (f): f is { type: "file"; name: string; required: true; label: string } =>
        f.type === "file" && f.required
    );

    const sheetOrder = config.map((f) => f.name);

    // ✅ Validate required text fields
    const missingTextFields = requiredTextFields.filter(
      (field) => !req.body[field]
    );
    if (missingTextFields.length > 0) {
      res
        .status(400)
        .json({ message: `Missing fields: ${missingTextFields.join(", ")}` });
      return;
    }

    // ✅ Validate required file fields
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Check if the team name is already registered
    const teamName = req.body.name + " - " + req.body.phone;
    const existingCompetitionFolderId = await findFolder(
      competitionName,
      ROOT_FOLDER_ID
    );
    if (existingCompetitionFolderId) {
      const existingTeam = await findFolder(
        teamName,
        existingCompetitionFolderId
      );

      if (existingTeam) {
        res.status(400).json({
          message: `Team name ${teamName} already registered for event ${competition}.`
        });
        return;
      }
    }

    const uploadedFiles: { [key: string]: Express.Multer.File } = {};

    for (const fileField of requiredFileFields) {
      const file = files?.[fileField.name]?.[0];
      uploadedFiles[fileField.name] = file;
    }

    // ✅ Upload files to Google Drive
    let fileLinks = null;

    try {
      const result = await uploadToDrive(
        uploadedFiles,
        competition,
        teamName
      );
      fileLinks = result.fileLinks;
      teamFolderId = result.teamFolderId;
    } catch (error) {
      throw new Error("Failed to upload files. Error: " + error);
    }

    // ✅ Combine body + uploaded file links for sheet
    const allData = {
      ...req.body,
      ...Object.fromEntries(
        requiredFileFields.map((f) => [f.name, fileLinks?.[f.name] ?? ""])
      )
    };

    const sheetRow = [
      new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString(), // GMT+07
      ...sheetOrder.map((key) => allData[key] ?? ""),
    ];

    await appendToSheet(sheetRow, competition);

    res.status(200).json({ message: "Submitted!" });
  } catch (err) {
    if (teamFolderId) await deleteFolderIfExists(teamFolderId);
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please contact admin!" });
  }
};

export const getFormSchema = (req: Request, res: Response): void => {
  res.status(200).json(competitionConfigs);
};

export const getFormSchemaSingle = (req: Request, res: Response): void => {
  const { competitionName } = req.query;

  if (!competitionName || typeof competitionName !== "string") {
    res.status(400).json({ message: "Missing or invalid competitionName" });
    return;
  }

  const config = competitionConfigs[competitionName as Competition];
  if (!config) {
    res.status(404).json({ message: "event not found" });
    return;
  }

  res.status(200).json({ fields: config });
};

export const validateRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { competitionName, teamName, email } = req.body;

    if (!competitionName || !teamName || !email) {
      res.status(400).json({
        message: "Missing required fields: competitionName, teamName, email"
      });
      return;
    }
    if (typeof competitionName !== "string" || typeof teamName !== "string") {
      res.status(400).json({
        message: "Invalid data type for competitionName or teamName"
      });
      return;
    }
    if (typeof email !== "string" || !email.includes("@")) {
      res.status(400).json({ message: "Invalid email format" });
      return;
    }
    const competition = competitionName as Competition;
    const config = competitionConfigs[competition];
    if (!config) {
      res.status(400).json({ message: "Invalid event selected." });
      return;
    }

    // Send Validation Email
    // await sendGmbccValidationEmail({
    //   email: email,
    //   competition: competitionName,
    //   team: teamName
    // });

    res.status(200).json({
      message:
        "Registration validated successfully for " +
        competitionName +
        " with team name " +
        teamName +
        " to: " +
        email
    });
  } catch (error) {
    console.error("Error validating registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

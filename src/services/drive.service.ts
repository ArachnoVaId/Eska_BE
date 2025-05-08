import { google } from "googleapis";
import { Readable } from "stream";
import { googleCredentials } from "./credentials.service";

const auth = new google.auth.GoogleAuth({
  credentials: googleCredentials,
  scopes: ["https://www.googleapis.com/auth/drive"]
});

const drive = google.drive({ version: "v3", auth });
export const ROOT_FOLDER_ID = process.env.GDRIVE_FOLDER_ID!;
const folderCache = new Map<string, string>();

export const findFolder = async (
  folderName: string,
  parentId: string
): Promise<string | null> => {
  const list = await drive.files.list({
    q: `'${parentId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id)"
  });

  return list.data.files?.[0]?.id ?? null;
};

export const createFolder = async (
  folderName: string,
  parentId: string
): Promise<string> => {
  const res = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentId]
    },
    fields: "id"
  });

  return res.data.id!;
};

export const findOrCreateFolder = async (
  folderName: string,
  parentId: string
): Promise<string> => {
  const cacheKey = `${parentId}/${folderName}`;
  if (folderCache.has(cacheKey)) {
    return folderCache.get(cacheKey)!;
  }

  const existingId = await findFolder(folderName, parentId);
  if (existingId) {
    folderCache.set(cacheKey, existingId);
    return existingId;
  }

  const newId = await createFolder(folderName, parentId);
  folderCache.set(cacheKey, newId);
  return newId;
};

export const uploadToDrive = async (
  files: { [key: string]: Express.Multer.File },
  competitionName: string,
  teamName: string
): Promise<{ fileLinks: Record<string, string>; teamFolderId: string }> => {
  const competitionFolderId = await findOrCreateFolder(
    competitionName,
    ROOT_FOLDER_ID
  );

  const teamFolderId = await createFolder(teamName, competitionFolderId);

  const fileLinks: Record<string, string> = {};

  for (const [key, file] of Object.entries(files)) {
    const fileMetadata = {
      name: file.originalname,
      parents: [teamFolderId]
    };

    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer)
    };

    const uploaded = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id, webViewLink"
    });

    fileLinks[key] = uploaded.data.webViewLink!;
  }

  return { fileLinks, teamFolderId };
};

export const deleteFolderIfExists = async (folderId?: string) => {
  if (folderId) {
    try {
      const foundFolder = await drive.files.get({
        fileId: folderId,
        fields: "id"
      });
      if (!foundFolder) return;

      await drive.files.delete({ fileId: folderId });
    } catch {}
  }
};

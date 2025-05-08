import { Request, Response, NextFunction } from "express";
import multer, { StorageEngine } from "multer";
import {
  Competition,
  competitionConfigs,
  CompetitionField
} from "../configs/competition.config";

const storage: StorageEngine = multer.memoryStorage();

export function dynamicUploadMiddleware(competitionName: Competition) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!competitionName || !(competitionName in competitionConfigs)) {
      res.status(400).json({ message: "Invalid or missing competitionName" });
      return;
    }

    const config = competitionConfigs[competitionName];

    const fields = config
      .filter((f: CompetitionField) => f.type === "file")
      .map(({ name, maxCount }) => ({
        name,
        maxCount: maxCount ?? 1 // Default to 1 if not specified
      }));

    const upload = multer({ storage }).fields(fields);

    upload(req, res, (err: any) => {
      if (err) {
        res
          .status(400)
          .json({ message: "File upload error", error: err.message });
        return;
      }

      const files = req.files as Record<string, Express.Multer.File[]>;

      for (const [field, arr] of Object.entries(files)) {
        arr.forEach((file) => {
          const ext = file.originalname.split(".").pop();
          const base = file.originalname.replace(/\.[^/.]+$/, "");
          file.originalname = `${field}_${base}.${ext}`;
        });
      }

      next();
    });
  };
}

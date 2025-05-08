import { Request, Response, NextFunction } from "express";
import { validateFormData } from "../helpers/validation.helper";
import {
  Competition,
  competitionConfigs,
  CompetitionField
} from "../configs/competition.config";

export function formValidationMiddleware(competitionName: Competition) {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const fields: CompetitionField[] | undefined =
      competitionConfigs[competitionName];

    if (!fields) {
      return res.status(400).json({ error: "Unknown competition name." });
    }

    const body = req.body as Record<string, unknown>;
    const files = req.files as
      | Record<string, Express.Multer.File[]>
      | undefined;

    const errors = validateFormData(fields, body, files);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
}

// routes.ts
import { Router } from "express";
import {
  getFormSchema,
  registerAction,
  validateRegistration
} from "../controllers/event.controller";
import { dynamicUploadMiddleware } from "../middlewares/dynamicUpload.middleware";
import { formValidationMiddleware } from "../middlewares/validation.middleware";
import { Competition } from "../configs/competition.config";

const eventRoutes = Router();

eventRoutes
  // POST /api/event/register
  .post(
    "/register",
    (req, res, next) => {
      const competitionName = req.query.competitionName as Competition;
      dynamicUploadMiddleware(competitionName)(req, res, next);
    },
    (req, res, next) => {
      const competitionName = req.query.competitionName as Competition;
      formValidationMiddleware(competitionName)(req, res, next);
    },
    registerAction
  )

  // GET /api/event/schema
  .get("/schema", getFormSchema)

  // POST /api/event/validate-registration
  .post("/validate-registration", validateRegistration);

export default eventRoutes;

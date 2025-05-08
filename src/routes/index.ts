import { Router } from "express";
import eventRoutes from "./event.route";
const mainRoutes = Router();

// GET /api/health
mainRoutes
  .get("/health", (_, res) => {
    res.status(200).json({ message: "OK" });
  })

  // Payment
  .use("/event", eventRoutes)

export default mainRoutes;

import { Router } from "express";
import eventRoutes from "./event.route";
import midtransRoutes from "./midtrans.route";
const mainRoutes = Router();

// GET /api/health
mainRoutes
  .get("/health", (_, res) => {
    res.status(200).json({ message: "OK" });
  })

  // Payment
  .use("/event", eventRoutes)

  // Midtrans
  .use("/midtrans", midtransRoutes);

export default mainRoutes;

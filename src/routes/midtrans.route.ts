import { Router } from "express";
import {
  cancelPayment,
  getClientKey,
  getPendingTransactions,
  midtransCallback
} from "../controllers/midtrans.controller";

const midtransRoutes = Router();

midtransRoutes
  // GET /api/midtrans/client-key
  .get("/get-client", getClientKey)

  // GET /api/midtrans/pending
  .get("/pending", getPendingTransactions)

  // POST /api/midtrans/cancel
  .post("/cancel", cancelPayment)

  // POST /api/midtrans/callback
  .post("/callback", midtransCallback);

export default midtransRoutes;

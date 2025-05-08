import { Request, Response } from "express";
import { initSQLiteDB } from "../helpers/sqlite.helper";
import { getClientIp } from "../helpers/identifier.helper";
import {
  CancelPaymentBody,
  midtransBaseObjectKeys,
  MidtransLogEntry
} from "../types/midtrans.type";
import {
  MIDTRANS_CLIENT_KEY,
  updatePaymentStatus
} from "../helpers/midtrans.helper";
import { appendToSheet } from "../services/sheets.service";

// @route GET /api/midtrans/pending
// @access Public
// @body {}
// @desc Retrieve pending transactions by client IP
export const getPendingTransactions = async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  try {
    const db = await initSQLiteDB();
    const results = await db.all(
      `SELECT snap_token, order_id FROM order_cache WHERE ip = ? AND payment_status = ?`,
      [ip, "pending"]
    );
    res.json({ success: true, pendingTransactions: results });
  } catch (error) {
    res.status(500).json({ success: false, error: "Database error" });
  }
};

// @route GET /api/midtrans/submit
// @access Public
// @body {}
// @desc Retrieve client key for Midtrans Snap
export const getClientKey = async (req: Request, res: Response) => {
  res.json({ client_key: MIDTRANS_CLIENT_KEY });
};

// @route POST /api/midtrans/cancel
// @access Public
// @body { order_id: string }
// @desc Cancel the payment transaction locally
export const cancelPayment = async (
  req: Request<{}, {}, CancelPaymentBody>,
  res: Response
) => {
  const { order_id } = req.body;

  if (!order_id) {
    res.status(400).json({ success: false, message: "order_id is required" });
    return;
  }

  try {
    const db = await initSQLiteDB();
    await db.run(
      `UPDATE order_cache SET payment_status = ? WHERE order_id = ?`,
      ["cancelled", order_id]
    );

    res.json({
      success: true,
      message: "Transaction cancelled (local only)"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel locally."
    });
  }
};

// @route POST /api/midtrans/callback
// @access Public
// @body { order_id: string, gross_amount: number, transaction_status: string }
// @desc Handle Midtrans callback
export const midtransCallback = async (req: Request, res: Response) => {
  const data = req.body as MidtransLogEntry;

  try {
    const identifier = data.order_id ?? null;
    if (!identifier || !data.gross_amount || !data.transaction_status) {
      res.status(400).json({ error: "Invalid callback data" });
      return;
    }

    // Process the callback based on transaction status
    await updatePaymentStatus(identifier, data);

    // Log the transaction in Google Sheets
    const dataArray = midtransBaseObjectKeys.map((key) => data[key]);
    await appendToSheet(dataArray, "Midtrans Logs");

    res.json({ message: "Callback processed successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to process callback" });
    }
  }
};

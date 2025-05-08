import { Competition } from "../configs/competition.config";
import { deleteFolderIfExists } from "../services/drive.service";
import { FormDataFromConfig } from "../types/event.type";
import { OrderItem } from "../types/midtrans.type";
// import { sendGmbccOnSuccessEmail } from "./mail.helper";
import { initSQLiteDB } from "./sqlite.helper";
import { taxCounter } from "./tax.helper";
const midtransClient = require("midtrans-client");

// Midtrans Snap instance
const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";

const MIDTRANS_SERVER_KEY = isProduction
  ? process.env.MIDTRANS_SERVER_KEY
  : process.env.MIDTRANS_SERVER_KEY_SB;

export const MIDTRANS_CLIENT_KEY = isProduction
  ? process.env.MIDTRANS_CLIENT_KEY
  : process.env.MIDTRANS_CLIENT_KEY_SB;

const snap = new midtransClient.Snap({
  isProduction,
  serverKey: MIDTRANS_SERVER_KEY!,
  clientKey: MIDTRANS_CLIENT_KEY!
});

export const createPayment = async <T extends Competition>(
  competitionName: Competition,
  form: FormDataFromConfig<T>,
  ip: string,
  cloudStorageId: string
) => {
  const { name, email, phone, order_items } = form;

  const orderId = orderIdGenerator();
  const grossAmount = order_items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const taxProps = taxCounter(grossAmount);
  const order_items_with_tax: OrderItem[] = [
    ...order_items,
    ...taxProps.breakdown.map((item) => ({
      id: item.name,
      price: item.amount,
      quantity: 1,
      name: item.name
    }))
  ];
  const totalAmount = taxProps.total;

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: totalAmount
    },
    customer_details: {
      first_name: name,
      email,
      phone
    },
    item_details: order_items_with_tax,
    credit_card: {
      secure: true
    }
  };

  let snapRes = null;
  try {
    snapRes = await snap.createTransaction(parameter);
    if (!snapRes) {
      throw new Error("Failed to create transaction.");
    }
  } catch (error) {
    throw new Error("Failed to create transaction. Error: " + error);
  }

  const snapToken = snapRes.token;

  const db = await initSQLiteDB();
  await db.run(
    `INSERT INTO order_cache (ip, name, email, phone, competition, cloud_storage_id, order_id, snap_token, payment_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      ip,
      name,
      email,
      phone,
      competitionName,
      cloudStorageId,
      orderId,
      snapToken,
      "pending"
    ]
  );

  return { snapToken, orderId, totalAmount };
};

export const orderIdGenerator = (): string => {
  const eventCode = process.env.EVENT_CODE || "UNK";
  const date = new Date();

  const seed = date.getTime(); // Use timestamp as seed
  const randomAlphaNumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // Simple seeded random number generator (LCG)
  let seedValue = seed;
  const seededRandom = () => {
    seedValue = (seedValue * 9301 + 49297) % 233280;
    return seedValue / 233280;
  };

  const randomId = Array.from({ length: 12 }, () =>
    randomAlphaNumeric.charAt(
      Math.floor(seededRandom() * randomAlphaNumeric.length)
    )
  ).join("");

  const tempTitle = `${eventCode}${randomId}`;
  const sanitizedTitle = tempTitle.replace(/[^a-zA-Z0-9]/g, "");

  return sanitizedTitle;
};

export const updatePaymentStatus = async (
  orderCode: string,
  transactionData: any
) => {
  try {
    const db = await initSQLiteDB();
    const { transaction_status } = transactionData;

    // Get order id from transaction data
    const orderId = transactionData.order_id ?? null;
    if (!orderId) {
      throw new Error("Invalid order ID");
    }

    // When transaction status is "expire"
    if (transaction_status === "expire") {
      // Find in the database
      const registration = await db.get(
        `SELECT * FROM order_cache WHERE order_id = ?`,
        [orderId]
      );
      if (!registration) {
        throw new Error("Registration not found");
      }

      // Get competition storage
      const cloud_storage_id = registration.cloud_storage_id;

      // Delete folder if exist
      if (cloud_storage_id) await deleteFolderIfExists(cloud_storage_id);
    }

    if (
      transaction_status === "expire" ||
      transaction_status === "cancel" ||
      transaction_status === "settlement"
    ) {
      if (transaction_status === "settlement") {
        // Find in the database
        const registration = await db.get(
          `SELECT * FROM order_cache WHERE order_id = ?`,
          [orderId]
        );
        if (!registration) {
          throw new Error("Registration not found");
        }

        // Get competition
        const competition = registration.competition;

        // Get email registrant
        // const registrantEmail = registration.email;

        // if (
        //   competition === "GMBCC Individual National" ||
        //   competition === "GMBCC Team National"
        // ) {
        //   // await sendGmbccOnSuccessEmail(
        //   //   registrantEmail,
        //   //   "https://chat.whatsapp.com/HjXwKXa4v4sKtWdG8tC9kS",
        //   //   competition
        //   // );
        // }
      }

      // Delete record in sqlite
      await db.run(`DELETE FROM order_cache WHERE order_id = ?`, [orderId]);
      return;
    }

    // Update status
    await db.run(
      `UPDATE order_cache SET payment_status = ? WHERE order_id = ?`,
      [transaction_status, orderCode]
    );
  } catch (error) {
    throw new Error("Failed to update payment status: " + error);
  }
};

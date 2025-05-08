import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const initSQLiteDB = async () => {
  const db = await open({
    filename: "./data.sqlite",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS order_cache (
      ip TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      competition TEXT NOT NULL,
      cloud_storage_id TEXT,
      order_id TEXT NOT NULL,
      snap_token TEXT NOT NULL,
      payment_status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
};

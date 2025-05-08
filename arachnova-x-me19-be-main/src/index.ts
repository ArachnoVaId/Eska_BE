import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import mainRoutes from "./routes";

const app = express();

app.use(morgan("dev"));

const isDev = process.env.NODE_ENV === "development";

const allowedOrigins = [
  "https://meugm.com",
  "https://www.meugm.com",
  "https://me19-staging.arachnova.id",
  "http://localhost:3000",
];

app.use(
  cors(
    isDev
      ? {} // allow all
      : {
          origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
            } else {
              callback(new Error("Not allowed by CORS"));
            }
          },
          credentials: true
        }
  )
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", mainRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

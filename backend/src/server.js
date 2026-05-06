import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// ===== TRUST PROXY (IMPORTANT for Nginx/CloudFront) =====
app.set("trust proxy", 1);

// ===== MIDDLEWARE =====
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// ===== CORS CONFIG (STRICT + SAFE) =====
const allowedOrigins = process.env.CLIENT_URLS
  ? process.env.CLIENT_URLS.split(",")
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman/mobile

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

// ===== ROUTES =====
app.get("/", (req, res) => {
  res.send("API running...");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// ===== ERROR HANDLER (IMPROVED) =====
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);

  res.status(err.status || 500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
  });
});

// ===== DB + SERVER =====
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err.message);
    process.exit(1);
  });


  // test the branch
  // next commit 
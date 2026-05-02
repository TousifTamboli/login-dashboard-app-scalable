import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();

// ===== Middleware =====
app.use(helmet());
app.use(express.json());

// ===== CORS CONFIG =====
const allowedOrigins = process.env.CLIENT_URLS
  ? process.env.CLIENT_URLS.split(",")
  : [];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (process.env.NODE_ENV === "development") {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS not allowed"));
  },
  credentials: true,
}));

// app.options("/*", cors());

// ===== Routes =====
app.get("/", (req, res) => {
  res.send("API running...");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ===== Error Handler =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// ===== DB + SERVER START =====
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
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
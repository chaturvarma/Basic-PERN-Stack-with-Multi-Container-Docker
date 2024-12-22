import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import sequelize from "./app/config/sequelize.js";
import { prometheus, httpRequests, httpRequestDuration } from "./prometheus.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    end({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    });
    httpRequests.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    });
  });
  next();
});

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: process.env.CORS_CREDENTIALS === 'true',
  methods: process.env.CORS_METHODS.split(','),
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS.split(','),
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.get("/db-test", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ message: "Database connection established successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Failed to connect to the database.",
      error: error.message,
    });
  }
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is Running" });
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});
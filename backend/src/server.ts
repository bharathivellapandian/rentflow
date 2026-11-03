import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import propertyRoutes from "./routes/propertyRoutes";

import {
  testDatabaseConnection
} from "./config/database";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({
  limit: "1mb",
}));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "UP",
    service: "RentFlow API",
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/properties",
  propertyRoutes
);

const port = Number(process.env.PORT ?? 5000);

async function startServer() {
  await testDatabaseConnection();

  app.listen(port, () => {
    console.log(
      `RentFlow API running on port ${port}`
    );
  });
}

startServer().catch((error) => {
  console.error(
    "Failed to start RentFlow API:",
    error
  );

  process.exit(1);
});
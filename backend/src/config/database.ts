import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const requiredEnvironmentVariables = [
  "DB_HOST",
  "DB_PORT",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
];

for (const variable of requiredEnvironmentVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing environment variable: ${variable}`);
  }
}

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  max: 10,

  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL error:", error);
});

export async function testDatabaseConnection(): Promise<void> {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT NOW() AS database_time"
    );

    console.log(
      "PostgreSQL connected:",
      result.rows[0].database_time
    );
  } finally {
    client.release();
  }
}
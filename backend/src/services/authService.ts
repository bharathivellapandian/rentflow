import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/database";

export type UserRole = "ADMIN" | "OWNER" | "TENANT";

interface DatabaseUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  is_active: boolean;
}

export interface AuthenticatedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface LoginResult {
  token: string;
  user: AuthenticatedUser;
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResult | null> {

  const normalizedEmail = email.trim().toLowerCase();

  const result = await pool.query<DatabaseUser>(
    `
      SELECT
        id,
        first_name,
        last_name,
        email,
        password_hash,
        role,
        is_active
      FROM users
      WHERE LOWER(email) = $1
      LIMIT 1
    `,
    [normalizedEmail]
  );

  const user = result.rows[0];

  if (!user || !user.is_active) {
    return null;
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!validPassword) {
    return null;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    secret,
    {
      expiresIn: "1h",
      issuer: "rentflow-api",
      audience: "rentflow-web",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
    },
  };
}
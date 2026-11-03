import {
  NextFunction,
  Request,
  Response
} from "express";

import jwt from "jsonwebtoken";

export interface JwtPayload {
  sub: string;
  role: "ADMIN" | "OWNER" | "TENANT";
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {

  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Authentication required.",
    });

    return;
  }

  const token = authorization.substring(7);

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const decoded = jwt.verify(
      token,
      secret,
      {
        issuer: "rentflow-api",
        audience: "rentflow-web",
      }
    ) as JwtPayload;

    req.user = decoded;

    next();

  } catch {
    res.status(401).json({
      message: "Invalid or expired authentication token.",
    });
  }
}
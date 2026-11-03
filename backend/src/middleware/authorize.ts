import {
  NextFunction,
  Response
} from "express";

import {
  AuthenticatedRequest
} from "./authenticate";

import {
  UserRole
} from "../services/authService";

export function authorize(
  ...allowedRoles: UserRole[]
) {

  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {

    const role = req.user?.role;

    if (!role) {
      res.status(401).json({
        message: "Authentication required.",
      });

      return;
    }

    if (!allowedRoles.includes(role)) {
      res.status(403).json({
        message: "You are not authorized to access this resource.",
      });

      return;
    }

    next();
  };
}
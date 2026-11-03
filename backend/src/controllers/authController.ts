import { Request, Response } from "express";
import { z } from "zod";
import { loginUser } from "../services/authService";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .transform((value) => value.toLowerCase()),

  password: z
    .string()
    .min(8)
    .max(128),
});

export async function login(
  req: Request,
  res: Response
): Promise<void> {

  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      message: "Invalid login request.",
    });

    return;
  }

  try {
    const result = await loginUser(
      validation.data.email,
      validation.data.password
    );

    if (!result) {
      // Intentionally generic.
      res.status(401).json({
        message: "Invalid email or password.",
      });

      return;
    }

    res.status(200).json(result);

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Unable to process login.",
    });
  }
}
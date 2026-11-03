import type {
  LoginRequest,
  LoginResponse
} from "../types/auth";

import {
  apiRequest
} from "../api/apiClient";

export async function login(
  credentials: LoginRequest
): Promise<LoginResponse> {

  return apiRequest<LoginResponse>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(credentials),
    }
  );
}
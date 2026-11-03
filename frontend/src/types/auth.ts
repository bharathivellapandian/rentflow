export type UserRole =
  | "ADMIN"
  | "OWNER"
  | "TENANT";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
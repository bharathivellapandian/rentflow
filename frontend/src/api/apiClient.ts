const API_URL =
  import.meta.env.VITE_API_URL ??
  "http://localhost:5000/api";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  const token = sessionStorage.getItem(
    "rentflow_token"
  );

  const headers = new Headers(
    options.headers
  );

  headers.set(
    "Content-Type",
    "application/json"
  );

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  if (!response.ok) {

    const error = await response
      .json()
      .catch(() => ({
        message: "Request failed."
      }));

    throw new Error(
      error.message ?? "Request failed."
    );
  }

  return response.json() as Promise<T>;
}
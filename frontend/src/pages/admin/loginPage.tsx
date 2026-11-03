import {
  FormEvent,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  login
} from "../../services/authService";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent
  ) {

    event.preventDefault();

    setLoading(true);
    setError("");

    try {

      const response = await login({
        email,
        password,
      });

      sessionStorage.setItem(
        "rentflow_token",
        response.token
      );

      sessionStorage.setItem(
        "rentflow_user",
        JSON.stringify(response.user)
      );

      switch (response.user.role) {

        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "OWNER":
          navigate("/owner/dashboard");
          break;

        case "TENANT":
          navigate("/tenant/dashboard");
          break;

        default:
          throw new Error(
            "Unsupported user role."
          );
      }

    } catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Login failed."
      );

    } finally {

      setLoading(false);
    }
  }

  return (
    <main>
      <h1>RentFlow</h1>

      <h2>Sign in</h2>

      <form onSubmit={handleSubmit}>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
            autoComplete="email"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
            autoComplete="current-password"
          />
        </label>

        {error && (
          <p role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Signing in..."
            : "Sign in"}
        </button>

      </form>
    </main>
  );
}
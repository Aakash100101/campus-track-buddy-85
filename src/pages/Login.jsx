import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { login } from "../services/authService";

const inputClass =
  "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-ring";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await login({ email: email.trim(), password });
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            CT
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">CampusTrack</span>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your placement applications in one place.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="aakash@college.edu"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 6 characters"
                className={inputClass}
              />
            </div>

            {error ? (
              <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
            <Link
              to="/register"
              className="block w-full rounded-md border border-border bg-card px-3 py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Register
            </Link>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Demo sign-in: any email with a password of 6+ characters.
        </p>
      </div>
    </div>
  );
}

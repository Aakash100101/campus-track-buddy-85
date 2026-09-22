import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  login,
  googleLogin,
  completeOAuthFromUrl,
  onAuthStateChange,
} from "../services/authService";
import GoogleSignInButton from "../components/GoogleSignInButton";

const inputClass =
  "h-10 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none transition-colors duration-150 placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/20";

const labelClass = "mb-1.5 block text-xs font-medium text-muted-foreground";

function Divider() {
  return (
    <div className="relative my-5">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-card px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          OR
        </span>
      </div>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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

  async function handleGoogleSignIn() {
    setError("");
    setGoogleLoading(true);
    try {
      const result = await googleLogin();
      if (result?.redirected) return; // browser is navigating to Google
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err.message);
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-[380px]">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="grid size-6 place-items-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
            CT
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">CampusTrack</span>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your placement applications in one place.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className={labelClass}>
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
              <label htmlFor="password" className={labelClass}>
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
              <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="h-10 w-full rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <Divider />

          <GoogleSignInButton
            onClick={handleGoogleSignIn}
            loading={googleLoading}
            disabled={loading}
          />
        </div>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

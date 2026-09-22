import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  register,
  googleLogin,
  completeOAuthFromUrl,
  onAuthStateChange,
} from "../services/authService";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { getPasswordStrength, MIN_PASSWORD_LENGTH } from "../lib/password";

const strengthStyles = {
  weak: { bar: "bg-destructive", text: "text-destructive" },
  fair: { bar: "bg-amber-500", text: "text-amber-600" },
  good: { bar: "bg-primary/70", text: "text-primary" },
  strong: { bar: "bg-primary", text: "text-primary" },
  muted: { bar: "bg-border", text: "text-muted-foreground" },
};

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

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("All fields are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const result = await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      if (result?.needsConfirmation) {
        setError("Check your email to confirm your account, then sign in.");
        return;
      }
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err.message || "Could not create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setGoogleLoading(true);
    try {
      const result = await googleLogin();
      if (result?.redirected) return;
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
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Create account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Start tracking your placement applications.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className={labelClass}>
                Full name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Aakash Sharma"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
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
              {loading ? "Creating account..." : "Create account"}
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
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

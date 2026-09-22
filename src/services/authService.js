// Mock authentication kept in one place.
//
// PHASE 4 (later): login()/register() will POST to FastAPI (/auth/login,
// /auth/register), store the returned JWT and send it as an
// `Authorization: Bearer <token>` header from applicationService.js.
//
// PHASE 5 (later): googleLogin() will connect to the FastAPI backend's
// Google OAuth flow (e.g. redirect to /auth/google or exchange an
// authorization code). It currently only provides a clear hook for that
// future integration.

const STORAGE_KEY = "campustrack.user";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCurrentUser() {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function login({ email, password }) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  if (password.length < 6) {
    throw new Error("Invalid email or password. Please try again.");
  }
  const name = email.split("@")[0].replace(/[._]/g, " ");
  const user = { name: name.replace(/\b\w/g, (c) => c.toUpperCase()), email };
  if (isBrowser()) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export async function register({ name, email }) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const user = { name, email };
  if (isBrowser()) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export async function googleLogin() {
  // This is a frontend integration point only. The real Google sign-in flow
  // will be implemented on the FastAPI backend and connected here later.
  await new Promise((resolve) => setTimeout(resolve, 300));
  throw new Error(
    "Google sign-in is not configured yet. Connect this function to the FastAPI backend's Google OAuth flow."
  );
}

export function logout() {
  if (isBrowser()) window.localStorage.removeItem(STORAGE_KEY);
}

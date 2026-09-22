// Mock authentication kept in one place.
//
// PHASE 4 (later): login()/register() will POST to FastAPI (/auth/login,
// /auth/register), store the returned JWT and send it as an
// `Authorization: Bearer <token>` header from applicationService.js.

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

export function logout() {
  if (isBrowser()) window.localStorage.removeItem(STORAGE_KEY);
}

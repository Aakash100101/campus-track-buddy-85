// Real authentication backed by Lovable Cloud (email/password + Google).
// All auth logic lives here so pages stay unchanged.

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

function friendlyName(user) {
  if (!user) return "Student";
  const meta = user.user_metadata || {};
  return meta.name || meta.full_name || (user.email ? user.email.split("@")[0] : "Student");
}

// Returns the signed-in user (or null). Async because the session is verified
// against the auth server.
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;
  return {
    id: data.user.id,
    email: data.user.email || "",
    name: friendlyName(data.user),
  };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error(
      error.message === "Invalid login credentials"
        ? "Invalid email or password. Please try again."
        : error.message,
    );
  }
  return { id: data.user.id, email: data.user.email, name: friendlyName(data.user) };
}

function registerErrorMessage(message) {
  const text = message || "";
  if (/already registered|already exists|User already/i.test(text)) {
    return "An account with this email already exists. Please sign in.";
  }
  if (/pwned|known to be weak|easy to guess|compromised/i.test(text)) {
    return "This password has appeared in known data breaches. Please choose a different, stronger password.";
  }
  if (/at least|too short|length/i.test(text)) {
    return text;
  }
  if (/should contain|characters:/i.test(text)) {
    return `Password does not meet the security requirements: ${text}`;
  }
  return text || "Could not create your account. Please try again.";
}

export async function register({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
    },
  });
  if (error) {
    throw new Error(registerErrorMessage(error.message));
  }
  // Supabase returns a user with an empty identities array when the email is
  // already taken but confirmation is pending — surface that clearly.
  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    throw new Error("An account with this email already exists. Please sign in.");
  }
  return { needsConfirmation: !data.session };
}

// Real Google sign-in through the platform's secure OAuth flow.
// No Google client secret is ever present in frontend code.
export async function googleLogin() {
  const result = await lovable.auth.signInWithOAuth("google", {
    redirect_uri: typeof window !== "undefined" ? window.location.origin : undefined,
  });
  if (result.error) {
    throw new Error(result.error.message || "Google sign-in failed. Please try again.");
  }
  // result.redirected === true means the browser is navigating to Google.
  return result;
}

export async function logout() {
  await supabase.auth.signOut();
}

// Returns the active session (or null) without hitting the auth server.
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data?.session ?? null;
}

// Subscribe to auth state changes (INITIAL_SESSION, SIGNED_IN, SIGNED_OUT...).
export function onAuthStateChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  return () => data?.subscription?.unsubscribe();
}

// Some OAuth flows return the session in the URL hash. The Supabase client
// normally consumes it automatically; this is a safe fallback that also clears
// the tokens from the address bar once a session exists.
export async function completeOAuthFromUrl() {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash || "";
  if (!hash.includes("access_token") && !hash.includes("error_description")) {
    const { data } = await supabase.auth.getSession();
    return data?.session ?? null;
  }

  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  let session = null;
  const existing = await supabase.auth.getSession();
  session = existing.data?.session ?? null;

  if (!session && accessToken && refreshToken) {
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    if (error) throw new Error(error.message || "Google sign-in could not be completed.");
    session = data?.session ?? null;
  }

  if (session) {
    // Strip the tokens from the URL without adding a history entry.
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }
  return session;
}

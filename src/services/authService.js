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
    throw new Error(
      error.message.includes("already registered")
        ? "An account with this email already exists. Please sign in."
        : error.message,
    );
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

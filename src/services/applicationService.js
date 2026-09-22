// Service layer for application data — now backed by the Lovable Cloud database.
//
// Every query runs as the signed-in user, and row level security guarantees a
// user can only ever read or write their own applications. The page components
// were not changed: they still only call these functions.

import { supabase } from "@/integrations/supabase/client";

// DB row (snake_case) -> UI shape (camelCase)
function toApplication(row) {
  return {
    id: row.id,
    company: row.company,
    role: row.role,
    status: row.status,
    applicationDate: row.application_date,
    location: row.location || "",
    notes: row.notes || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// UI shape -> DB row, with basic validation.
function toRow(data) {
  const company = (data.company || "").trim();
  const role = (data.role || "").trim();
  if (!company) throw new Error("Company name is required.");
  if (!role) throw new Error("Job role is required.");
  return {
    company,
    role,
    status: data.status || "Applied",
    application_date: data.applicationDate || new Date().toISOString().slice(0, 10),
    location: (data.location || "").trim(),
    notes: (data.notes || "").trim(),
  };
}

async function requireUserId() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) throw new Error("You must be signed in to do that.");
  return data.user.id;
}

export async function getApplications() {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("application_date", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data || []).map(toApplication);
}

export async function getApplicationById(id) {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) {
    const notFound = new Error("Application not found");
    notFound.status = 404;
    throw notFound;
  }
  return toApplication(data);
}

export async function createApplication(values) {
  // user_id always comes from the authenticated session, never from the UI.
  const userId = await requireUserId();
  const { data, error } = await supabase
    .from("applications")
    .insert({ ...toRow(values), user_id: userId })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return toApplication(data);
}

export async function updateApplication(id, values) {
  const { data, error } = await supabase
    .from("applications")
    .update(toRow(values))
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) {
    const notFound = new Error("Application not found");
    notFound.status = 404;
    throw notFound;
  }
  return toApplication(data);
}

export async function deleteApplication(id) {
  const { data, error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) {
    const notFound = new Error("Application not found");
    notFound.status = 404;
    throw notFound;
  }
  return true;
}

// Small helper used by the dashboard so the stats logic lives outside the UI.
export function getStats(applications) {
  return {
    total: applications.length,
    assessments: applications.filter((app) => app.status === "Assessment").length,
    interviews: applications.filter((app) => app.status === "Interview").length,
    selected: applications.filter((app) => app.status === "Selected").length,
  };
}

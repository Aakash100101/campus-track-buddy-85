// Service layer for application data.
//
// PHASE 1 (current): the functions read and write a local copy of the mock data
// that is persisted in localStorage.
//
// PHASE 5 (later): each function body is replaced with a fetch() call to the
// FastAPI REST API, e.g.
//   const res = await fetch(`${API_URL}/applications`);
//   return res.json();
// The page components never change, because they only talk to these functions.

import { mockApplications } from "../data/applications";

const STORAGE_KEY = "campustrack.applications";
const DELAY = 250; // small delay so loading states are visible

function wait(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), DELAY));
}

function isBrowser() {
  return typeof window !== "undefined";
}

function readAll() {
  if (!isBrowser()) return mockApplications;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockApplications));
      return mockApplications;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : mockApplications;
  } catch {
    return mockApplications;
  }
}

function writeAll(applications) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

function nextId(applications) {
  return applications.reduce((max, app) => Math.max(max, Number(app.id)), 0) + 1;
}

export async function getApplications() {
  const applications = readAll();
  const sorted = [...applications].sort(
    (a, b) => new Date(b.applicationDate) - new Date(a.applicationDate),
  );
  return wait(sorted);
}

export async function getApplicationById(id) {
  const application = readAll().find((app) => String(app.id) === String(id));
  if (!application) {
    throw new Error("Application not found");
  }
  return wait(application);
}

export async function createApplication(data) {
  const applications = readAll();
  const application = { ...data, id: nextId(applications) };
  writeAll([...applications, application]);
  return wait(application);
}

export async function updateApplication(id, data) {
  const applications = readAll();
  const index = applications.findIndex((app) => String(app.id) === String(id));
  if (index === -1) {
    throw new Error("Application not found");
  }
  const updated = { ...applications[index], ...data, id: applications[index].id };
  const next = [...applications];
  next[index] = updated;
  writeAll(next);
  return wait(updated);
}

export async function deleteApplication(id) {
  const applications = readAll();
  writeAll(applications.filter((app) => String(app.id) !== String(id)));
  return wait(true);
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

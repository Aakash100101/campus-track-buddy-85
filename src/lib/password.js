// UI-only password strength helper. The real validation always comes from the
// authentication backend (Supabase Auth) — this just gives the user feedback.

export const MIN_PASSWORD_LENGTH = 8;

export function getPasswordStrength(password) {
  const value = typeof password === "string" ? password : "";
  if (!value) {
    return { score: 0, label: "", percent: 0, tone: "muted" };
  }

  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  // Obvious sequences / repeats should never read as strong.
  if (/^(.)\1+$/.test(value) || /^(?:password|123456|qwerty)/i.test(value)) {
    score = 1;
  }

  if (value.length < MIN_PASSWORD_LENGTH) {
    score = Math.min(score, 1);
  }

  if (score <= 1) return { score, label: "Weak", percent: 25, tone: "weak" };
  if (score === 2) return { score, label: "Fair", percent: 50, tone: "fair" };
  if (score === 3) return { score, label: "Good", percent: 75, tone: "good" };
  return { score, label: "Strong", percent: 100, tone: "strong" };
}

import { useState } from "react";
import { STATUSES } from "../data/applications";

const inputClass =
  "h-10 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none transition-colors duration-150 placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/20";

const labelClass = "mb-1.5 block text-xs font-medium text-muted-foreground";

const emptyForm = {
  company: "",
  role: "",
  status: "Applied",
  applicationDate: new Date().toISOString().slice(0, 10),
  location: "",
  notes: "",
};

// Used for both "Add application" and "Edit application".
export default function ApplicationForm({ open, initialValues, onCancel, onSubmit }) {
  const isEdit = Boolean(initialValues);
  const [values, setValues] = useState(initialValues ? { ...emptyForm, ...initialValues } : emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!values.company.trim() || !values.role.trim()) {
      setError("Company name and job role are required.");
      return;
    }
    if (!values.applicationDate) {
      setError("Please choose an application date.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await onSubmit({
        ...values,
        company: values.company.trim(),
        role: values.role.trim(),
        location: values.location.trim(),
      });
    } catch {
      setError("Something went wrong while saving. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/25 p-4 sm:items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-xl border border-border bg-card shadow-[0_16px_40px_rgba(16,24,40,0.14)]"
      >
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            {isEdit ? "Edit application" : "Add application"}
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {isEdit
              ? "Update the details of this placement application."
              : "Record a new placement application."}
          </p>
        </div>

        <div className="grid gap-4 px-5 py-5 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label htmlFor="company" className={labelClass}>
              Company name
            </label>
            <input
              id="company"
              name="company"
              value={values.company}
              onChange={handleChange}
              placeholder="Infosys"
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="role" className={labelClass}>
              Job role
            </label>
            <input
              id="role"
              name="role"
              value={values.role}
              onChange={handleChange}
              placeholder="Systems Engineer"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="status" className={labelClass}>
              Status
            </label>
            <select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              className={inputClass}
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="applicationDate" className={labelClass}>
              Application date
            </label>
            <input
              id="applicationDate"
              name="applicationDate"
              type="date"
              value={values.applicationDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="location" className={labelClass}>
              Location
            </label>
            <input
              id="location"
              name="location"
              value={values.location}
              onChange={handleChange}
              placeholder="Bengaluru, KA"
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="notes" className={labelClass}>
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={values.notes}
              onChange={handleChange}
              placeholder="Round details, contacts, next steps..."
              className={`${inputClass} h-auto py-2.5`}
            />
          </div>

          {error ? (
            <p className="sm:col-span-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-5 py-3.5">
          <button
            type="button"
            onClick={onCancel}
            className="h-9 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="h-9 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {saving ? "Saving..." : isEdit ? "Save changes" : "Add application"}
          </button>
        </div>
      </form>
    </div>
  );
}

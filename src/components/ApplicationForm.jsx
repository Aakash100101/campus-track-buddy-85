import { useState } from "react";
import { STATUSES } from "../data/applications";

const inputClass =
  "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-ring";

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
        className="w-full max-w-lg rounded-lg border border-border bg-card shadow-sm"
      >
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-foreground">
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
            <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-foreground">
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
            <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-foreground">
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
            <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-foreground">
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
            <label
              htmlFor="applicationDate"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
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
            <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-foreground">
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
            <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-foreground">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={values.notes}
              onChange={handleChange}
              placeholder="Round details, contacts, next steps..."
              className={inputClass}
            />
          </div>

          {error ? (
            <p className="sm:col-span-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {saving ? "Saving..." : isEdit ? "Save changes" : "Add application"}
          </button>
        </div>
      </form>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import AppLayout from "../components/AppLayout";
import StatusBadge from "../components/StatusBadge";
import ApplicationForm from "../components/ApplicationForm";
import ConfirmDialog from "../components/ConfirmDialog";
import { formatDate } from "../components/ApplicationTable";
import {
  deleteApplication,
  getApplicationById,
  updateApplication,
} from "../services/applicationService";

function Field({ label, children }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80">
        {label}
      </p>
      <p className="mt-1 text-sm text-foreground">{children || "—"}</p>
    </div>
  );
}

export default function ApplicationDetails({ id }) {
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getApplicationById(id)
      .then(setApplication)
      .catch(() => setError("This application could not be found."))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleUpdate(values) {
    const updated = await updateApplication(id, values);
    setApplication(updated);
    setFormOpen(false);
  }

  async function handleDelete() {
    setDeleteLoading(true);
    try {
      await deleteApplication(id);
      navigate({ to: "/applications" });
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <AppLayout
      title={application ? application.company : "Application"}
      subtitle={application ? application.role : "Application details"}
      action={
        <Link
          to="/applications"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-secondary"
        >
          <ArrowLeft className="size-4" />
          Back to Applications
        </Link>
      }
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading application...</p>
      ) : error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <div className="space-y-5">
          <section className="rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
              <h2 className="text-sm font-semibold text-foreground">Overview</h2>
              <StatusBadge status={application.status} />
            </div>
            <div className="grid gap-5 px-5 py-5 sm:grid-cols-2">
              <Field label="Company">{application.company}</Field>
              <Field label="Job role">{application.role}</Field>
              <Field label="Application date">{formatDate(application.applicationDate)}</Field>
              <Field label="Location">{application.location}</Field>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="border-b border-border px-5 py-3">
              <h2 className="text-sm font-semibold text-foreground">Notes</h2>
            </div>
            <div className="px-5 py-5">
              <p className="whitespace-pre-line text-sm text-foreground">
                {application.notes || "No notes added for this application."}
              </p>
            </div>
          </section>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="h-9 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
            >
              Edit Application
            </button>
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="h-9 rounded-lg border border-border bg-card px-3.5 text-sm font-medium text-destructive transition-colors duration-150 hover:bg-destructive/5"
            >
              Delete Application
            </button>
          </div>
        </div>
      )}

      {formOpen && application ? (
        <ApplicationForm
          open
          initialValues={application}
          onCancel={() => setFormOpen(false)}
          onSubmit={handleUpdate}
        />
      ) : null}

      <ConfirmDialog
        open={confirmOpen}
        loading={deleteLoading}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </AppLayout>
  );
}

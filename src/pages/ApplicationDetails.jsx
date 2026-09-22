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
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
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
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="size-4" />
          Back to Applications
        </Link>
      }
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading application...</p>
      ) : error ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <h2 className="text-sm font-semibold text-foreground">Application details</h2>
              <StatusBadge status={application.status} />
            </div>
            <div className="grid gap-5 px-5 py-5 sm:grid-cols-2">
              <Field label="Company">{application.company}</Field>
              <Field label="Job role">{application.role}</Field>
              <Field label="Application date">{formatDate(application.applicationDate)}</Field>
              <Field label="Location">{application.location}</Field>
              <div className="sm:col-span-2">
                <Field label="Notes">{application.notes}</Field>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Edit Application
            </button>
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/5"
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

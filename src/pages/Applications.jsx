import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import AppLayout from "../components/AppLayout";
import ApplicationTable from "../components/ApplicationTable";
import ApplicationForm from "../components/ApplicationForm";
import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState from "../components/EmptyState";
import { STATUSES } from "../data/applications";
import {
  createApplication,
  deleteApplication,
  getApplications,
  updateApplication,
} from "../services/applicationService";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  function loadApplications() {
    setLoading(true);
    getApplications()
      .then(setApplications)
      .catch(() => setError("Could not load your applications. Please refresh the page."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadApplications();
  }, []);

  async function handleSubmit(values) {
    if (editing) {
      await updateApplication(editing.id, values);
    } else {
      await createApplication(values);
    }
    setFormOpen(false);
    setEditing(null);
    loadApplications();
  }

  async function handleDelete() {
    setDeleteLoading(true);
    try {
      await deleteApplication(deleting.id);
      setDeleting(null);
      loadApplications();
    } catch {
      setDeleting(null);
      setError("Could not delete that application. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  }

  const visible = applications.filter((app) => {
    const matchesSearch = app.company.toLowerCase().includes(search.trim().toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout
      title="Applications"
      subtitle="Track and manage your placement applications."
      action={
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Add Application
        </button>
      }
    >
      <div className="rounded-lg border border-border bg-card">
        <div className="flex flex-col gap-3 border-b border-border p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search companies..."
              className="w-full rounded-md border border-input bg-card py-2 pl-8 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-ring"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-ring sm:w-44"
          >
            <option value="All">All</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            Loading applications...
          </p>
        ) : error ? (
          <p className="px-4 py-10 text-center text-sm text-destructive">{error}</p>
        ) : visible.length === 0 ? (
          <EmptyState
            title={applications.length === 0 ? "No applications yet" : "No matching applications"}
            message={
              applications.length === 0
                ? "Add your first placement application to start tracking your progress."
                : "Try a different company name or status filter."
            }
            actionLabel={applications.length === 0 ? "Add Application" : undefined}
            onAction={
              applications.length === 0
                ? () => {
                    setEditing(null);
                    setFormOpen(true);
                  }
                : undefined
            }
          />
        ) : (
          <ApplicationTable
            applications={visible}
            onEdit={(app) => {
              setEditing(app);
              setFormOpen(true);
            }}
            onDelete={(app) => setDeleting(app)}
          />
        )}
      </div>

      {formOpen ? (
        <ApplicationForm
          open
          key={editing ? editing.id : "new"}
          initialValues={editing}
          onCancel={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          onSubmit={handleSubmit}
        />
      ) : null}

      <ConfirmDialog
        open={Boolean(deleting)}
        loading={deleteLoading}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </AppLayout>
  );
}

import { Link } from "@tanstack/react-router";
import StatusBadge from "./StatusBadge";

export function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ApplicationTable({ applications, compact = false, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/60 text-left">
            <th className="px-4 py-2.5 font-medium text-muted-foreground">Company</th>
            <th className="px-4 py-2.5 font-medium text-muted-foreground">
              {compact ? "Role" : "Job Role"}
            </th>
            <th className="px-4 py-2.5 font-medium text-muted-foreground">Status</th>
            <th className="px-4 py-2.5 font-medium text-muted-foreground">Application Date</th>
            {!compact ? (
              <>
                <th className="px-4 py-2.5 font-medium text-muted-foreground">Location</th>
                <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Actions</th>
              </>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
              <td className="px-4 py-3 font-medium text-foreground">
                <Link
                  to="/applications/$id"
                  params={{ id: String(app.id) }}
                  className="transition-colors hover:text-primary"
                >
                  {app.company}
                </Link>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{app.role}</td>
              <td className="px-4 py-3">
                <StatusBadge status={app.status} />
              </td>
              <td className="px-4 py-3 tabular-nums text-muted-foreground">
                {formatDate(app.applicationDate)}
              </td>
              {!compact ? (
                <>
                  <td className="px-4 py-3 text-muted-foreground">{app.location || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3 text-sm">
                      <Link
                        to="/applications/$id"
                        params={{ id: String(app.id) }}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => onEdit(app)}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(app)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

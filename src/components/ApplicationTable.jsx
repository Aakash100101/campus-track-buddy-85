import { Link } from "@tanstack/react-router";
import StatusBadge from "./StatusBadge";

export function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

const th =
  "px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80";

export default function ApplicationTable({ applications, compact = false, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/50 text-left">
            <th className={th}>Company</th>
            <th className={th}>{compact ? "Role" : "Job Role"}</th>
            <th className={th}>Status</th>
            <th className={th}>Application Date</th>
            {!compact ? (
              <>
                <th className={th}>Location</th>
                <th className={`${th} text-right`}>Actions</th>
              </>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr
              key={app.id}
              className="border-b border-border/70 transition-colors duration-150 last:border-0 hover:bg-secondary/40"
            >
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
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to="/applications/$id"
                        params={{ id: String(app.id) }}
                        className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => onEdit(app)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(app)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive/5 hover:text-destructive"
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

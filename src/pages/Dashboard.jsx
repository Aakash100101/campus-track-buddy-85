import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, ClipboardList, CheckCircle2, Users } from "lucide-react";
import AppLayout from "../components/AppLayout";
import StatCard from "../components/StatCard";
import StatusChart from "../components/StatusChart";
import ApplicationTable from "../components/ApplicationTable";
import EmptyState from "../components/EmptyState";
import { getApplications, getStats } from "../services/applicationService";
import { getCurrentUser } from "../services/authService";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentName, setStudentName] = useState("Student");

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user?.name) setStudentName(user.name);
    });

    getApplications()
      .then(setApplications)
      .catch(() => setError("Could not load your applications. Please refresh the page."))
      .finally(() => setLoading(false));
  }, []);

  const stats = getStats(applications);
  const recent = applications.slice(0, 5);

  return (
    <AppLayout
      title={`${greeting()}, ${studentName}`}
      subtitle="Here's an overview of your placement applications."
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      ) : error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard label="Total Applications" value={stats.total} icon={Briefcase} />
            <StatCard label="Assessments" value={stats.assessments} icon={ClipboardList} />
            <StatCard label="Interviews" value={stats.interviews} icon={Users} />
            <StatCard label="Selected" value={stats.selected} icon={CheckCircle2} />
          </div>

          <StatusChart applications={applications} />

          <section className="rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-foreground">Recent Applications</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Your latest five entries</p>
              </div>
              <Link
                to="/applications"
                className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent"
              >
                View all
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
            {recent.length === 0 ? (
              <EmptyState
                title="No applications yet"
                message="Add your first placement application to see it here."
              />
            ) : (
              <ApplicationTable applications={recent} compact />
            )}
          </section>
        </div>
      )}
    </AppLayout>
  );
}

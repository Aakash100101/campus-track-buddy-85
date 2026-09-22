import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
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
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard label="Total Applications" value={stats.total} />
            <StatCard label="Assessments" value={stats.assessments} />
            <StatCard label="Interviews" value={stats.interviews} />
            <StatCard label="Selected" value={stats.selected} />
          </div>

          <StatusChart applications={applications} />

          <div className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold text-foreground">Recent Applications</h2>
              <Link
                to="/applications"
                className="text-sm font-medium text-primary transition-colors hover:underline"
              >
                View all
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
          </div>
        </div>
      )}
    </AppLayout>
  );
}

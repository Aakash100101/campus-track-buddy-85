import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { STATUSES } from "../data/applications";

export default function StatusChart({ applications }) {
  // The chart only renders after mount so the server and browser markup match.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const data = STATUSES.map((status) => ({
    status,
    count: applications.filter((app) => app.status === status).length,
  }));

  return (
    <section className="rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-foreground">Applications by Status</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Distribution across your placement pipeline
          </p>
        </div>
      </div>
      <div className="h-64 px-2 py-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="status"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                width={28}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "var(--secondary)" }}
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 12px rgba(16,24,40,0.06)",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="count"
                name="Applications"
                fill="var(--primary)"
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : null}
      </div>
    </section>
  );
}

export default function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors duration-150 hover:border-primary/25">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {Icon ? (
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-accent text-primary">
            <Icon className="size-3.5" />
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums leading-none tracking-tight text-foreground">
        {value}
      </p>
      {hint ? <p className="mt-2 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

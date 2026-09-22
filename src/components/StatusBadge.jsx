const styles = {
  Applied: "border-border bg-secondary text-muted-foreground",
  Assessment: "border-amber-200 bg-amber-50 text-amber-700",
  Interview: "border-sky-200 bg-sky-50 text-sky-700",
  Selected: "border-primary/25 bg-accent text-primary",
  Rejected: "border-red-200 bg-red-50 text-red-700",
};

const dots = {
  Applied: "bg-muted-foreground/60",
  Assessment: "bg-amber-500",
  Interview: "bg-sky-500",
  Selected: "bg-primary",
  Rejected: "bg-red-500",
};

export default function StatusBadge({ status }) {
  const style = styles[status] || styles.Applied;
  const dot = dots[status] || dots.Applied;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${style}`}
    >
      <span className={`size-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

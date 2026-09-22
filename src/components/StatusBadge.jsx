const styles = {
  Applied: "border-border bg-secondary text-muted-foreground",
  Assessment: "border-amber-200 bg-amber-50 text-amber-700",
  Interview: "border-sky-200 bg-sky-50 text-sky-700",
  Selected: "border-primary/25 bg-accent text-accent-foreground",
  Rejected: "border-red-200 bg-red-50 text-red-700",
};

export default function StatusBadge({ status }) {
  const style = styles[status] || styles.Applied;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${style}`}
    >
      {status}
    </span>
  );
}

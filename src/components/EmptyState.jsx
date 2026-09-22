export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center border-t border-border px-6 py-14 text-center">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{message}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

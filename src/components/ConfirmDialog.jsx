export default function ConfirmDialog({
  open,
  title = "Delete this application?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  onCancel,
  onConfirm,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/25 p-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card shadow-[0_12px_32px_rgba(16,24,40,0.12)]">
        <div className="px-5 py-4">
          <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
        </div>
        <div className="flex justify-end gap-2 border-t border-border px-5 py-3.5">
          <button
            type="button"
            onClick={onCancel}
            className="h-9 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="h-9 rounded-lg bg-destructive px-3 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 disabled:opacity-60"
          >
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

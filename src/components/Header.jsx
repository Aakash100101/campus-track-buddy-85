import { Menu } from "lucide-react";

export default function Header({ title, subtitle, action, onOpenMenu }) {
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="mt-0.5 rounded-md border border-border bg-card p-1.5 text-muted-foreground transition-colors hover:bg-secondary md:hidden"
        >
          <Menu className="size-4" />
        </button>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

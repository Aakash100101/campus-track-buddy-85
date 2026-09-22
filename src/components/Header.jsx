import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { getCurrentUser } from "../services/authService";

function initials(name) {
  if (!name) return "S";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

// Compact top bar: page title on the left, user avatar on the right.
export default function Header({ title, onOpenMenu }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="rounded-lg border border-border bg-card p-1.5 text-muted-foreground transition-colors hover:bg-secondary md:hidden"
        >
          <Menu className="size-4" />
        </button>
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{title}</p>
        <span
          title={user?.email || ""}
          className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-secondary text-[11px] font-semibold text-foreground"
        >
          {initials(user?.name)}
        </span>
      </div>
    </header>
  );
}

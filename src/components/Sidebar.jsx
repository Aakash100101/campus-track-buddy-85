import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Briefcase, LogOut, X } from "lucide-react";
import { getCurrentUser, logout } from "../services/authService";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/applications", label: "Applications", icon: Briefcase },
];

function initials(name) {
  if (!name) return "S";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function NavLinks({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-0.5">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground"
            activeProps={{
              className: "bg-accent text-primary hover:bg-accent hover:text-primary",
            }}
            activeOptions={{ exact: false }}
          >
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onNavigate, onClose }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  async function handleLogout() {
    await logout();
    navigate({ to: "/login", replace: true });
  }

  return (
    <div className="flex h-full flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-14 items-center justify-between gap-2 border-b border-sidebar-border px-4">
        <Link to="/dashboard" onClick={onNavigate} className="flex min-w-0 items-center gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
            CT
          </span>
          <span className="truncate text-sm font-semibold tracking-tight text-foreground">
            CampusTrack
          </span>
        </Link>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      <div className="flex-1 overflow-y-auto px-2.5 py-4">
        <p className="mb-2 px-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
          Workspace
        </p>
        <NavLinks onNavigate={onNavigate} />
      </div>

      <div className="border-t border-sidebar-border p-2.5">
        <div className="flex items-center gap-2.5 rounded-lg px-1.5 py-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-secondary text-[11px] font-semibold text-foreground">
            {initials(user?.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{user?.name || "Student"}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email || "not signed in"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* Desktop: compact fixed sidebar */}
      <aside className="hidden w-60 shrink-0 md:block">
        <div className="fixed inset-y-0 left-0 w-60">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile: slide-over drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-foreground/20"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-64 shadow-lg">
            <SidebarContent onNavigate={onClose} onClose={onClose} />
          </div>
        </div>
      ) : null}
    </>
  );
}

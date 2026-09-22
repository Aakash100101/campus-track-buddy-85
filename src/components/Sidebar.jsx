import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Briefcase, LogOut, X } from "lucide-react";
import { getCurrentUser, logout } from "../services/authService";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/applications", label: "Applications", icon: Briefcase },
];

function NavLinks({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "bg-accent text-accent-foreground hover:bg-accent" }}
            activeOptions={{ exact: false }}
          >
            <Icon className="size-4" />
            {item.label}
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
      <div className="flex items-center justify-between px-4 py-4">
        <Link to="/dashboard" onClick={onNavigate} className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            CT
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">CampusTrack</span>
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

      <div className="flex-1 px-2.5">
        <NavLinks onNavigate={onNavigate} />
      </div>

      <div className="border-t border-sidebar-border p-3">
        <p className="truncate px-1 text-sm font-medium text-foreground">{user?.name || "Student"}</p>
        <p className="truncate px-1 text-xs text-muted-foreground">{user?.email || "not signed in"}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 flex w-full items-center gap-2 rounded-md px-1.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
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
      <aside className="hidden w-56 shrink-0 md:block">
        <div className="fixed inset-y-0 left-0 w-56">
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
          <div className="absolute inset-y-0 left-0 w-64">
            <SidebarContent onNavigate={onClose} onClose={onClose} />
          </div>
        </div>
      ) : null}
    </>
  );
}

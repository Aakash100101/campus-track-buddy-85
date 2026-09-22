import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ title, subtitle, action, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main className="min-w-0 flex-1">
        <Header title={title} onOpenMenu={() => setMobileOpen(true)} />
        <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-[22px] font-semibold leading-tight tracking-tight text-foreground">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              ) : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
          <div className="pt-6">{children}</div>
        </div>
      </main>
    </div>
  );
}

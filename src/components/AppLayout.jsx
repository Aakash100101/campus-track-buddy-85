import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ title, subtitle, action, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <Header
            title={title}
            subtitle={subtitle}
            action={action}
            onOpenMenu={() => setMobileOpen(true)}
          />
          <div className="pt-6">{children}</div>
        </div>
      </main>
    </div>
  );
}

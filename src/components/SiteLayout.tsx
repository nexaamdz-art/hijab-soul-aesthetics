import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { VintageSidebar } from "@/components/VintageSidebar";
import { SiteFooter } from "@/components/SiteFooter";

export function SiteLayout({ children }: { children?: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader onMenuClick={() => setDrawerOpen(true)} />

      <div className="flex min-h-0 flex-1">
        {/* main content (right in RTL) */}
        <main className="paper-cream flex min-w-0 flex-1 flex-col">
          {children}
          <SiteFooter />
        </main>

        {/* permanent vintage sidebar on the LEFT (desktop only) */}
        <aside className="hidden w-[280px] shrink-0 border-r border-ink/10 lg:block xl:w-[320px]">
          <div className="sticky top-0 h-screen">
            <VintageSidebar />
          </div>
        </aside>
      </div>

      {/* Mobile drawer — slides in from the right */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="إغلاق القائمة"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/50 animate-in fade-in"
          />
          <div className="absolute inset-y-0 right-0 h-[100dvh] max-h-[100dvh] w-fit max-w-[92vw] overflow-y-auto bg-paper shadow-2xl animate-in slide-in-from-right duration-300">
            <button
              aria-label="إغلاق"
              onClick={() => setDrawerOpen(false)}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-header/80 text-header-foreground"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <VintageSidebar fillHeight onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

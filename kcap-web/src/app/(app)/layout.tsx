import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { ModeToggle } from "@/components/theme-toggle";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] overflow-hidden">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <main className="flex-1 flex flex-col h-[100dvh] overflow-y-auto pb-16 md:pb-0 relative">
        <header className="flex h-14 shrink-0 items-center justify-end border-b px-4 md:px-6 bg-background/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-3 md:gap-4">
            <ModeToggle />
            <div className="text-sm font-medium hidden sm:block">Kreds: <span className="text-primary">150</span></div>
            <div className="text-sm font-medium sm:hidden"><span className="text-primary font-bold">150</span> K</div>
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold shrink-0">U</div>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}

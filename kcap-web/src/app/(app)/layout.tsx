import { Sidebar } from "@/components/layout/Sidebar";
import { ModeToggle } from "@/components/theme-toggle";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto h-screen">
        <header className="flex h-14 items-center justify-end border-b px-6 bg-background">
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="text-sm font-medium">Kreds: <span className="text-primary">150</span></div>
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold">U</div>
          </div>
        </header>
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

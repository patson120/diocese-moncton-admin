// import { UserNav } from '@/components/user-nav';
// import { MainNav } from '@/components/main-nav';
// import { ModeToggle } from '@/components/mode-toggle';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/** 
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <MainNav />
          <div className="ml-auto flex items-center gap-4">
            <ModeToggle />
            <UserNav />
          </div>
        </header>
       */}
      <main className="flex-1">
        <div className="w-[calc(94%)] mx-auto max-w-7xls">
          {children}
        </div>
      </main>
    </div>
  );
}
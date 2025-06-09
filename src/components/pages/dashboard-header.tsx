interface DashboardHeaderProps {
  heading: string;
  description?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  description,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-2 p-6 pb-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="mt-4 flex items-center gap-2 md:mt-0">{children}</div>}
    </div>
  );
}
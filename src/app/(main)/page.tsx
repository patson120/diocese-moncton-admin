import { DashboardSection } from "@/components/sections/DashboardSection/DashboardSection";
import QuickActionsSection from "@/components/sections/QuickActionsSection/QuickActionsSection";

export default function Home() {
  return (
    <main className="p-6">
      <div className="flex-1">
        <DashboardSection />
      </div>
      <div className="flex-1 mt-4">
        <QuickActionsSection />
      </div>
    </main>
  );
}

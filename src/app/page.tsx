import { DashboardSection } from "@/components/sections/DashboardSection/DashboardSection";
import QuickActionsSection from "@/components/sections/QuickActionsSection/QuickActionsSection";

export default function Home() {
  return (
    <main className="px-6 py-4">
      <div className="flex-1 mt-4">
        <DashboardSection />
      </div>
      <div className="flex-1 mt-4">
        <QuickActionsSection />
      </div>
    </main>
  );
}

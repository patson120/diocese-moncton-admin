import { DashboardSection } from "@/components/sections/DashboardSection/DashboardSection";
import MapView from "@/components/sections/MapSection/map-view";
import QuickActionsSection from "@/components/sections/QuickActionsSection/QuickActionsSection";

export default function Home() {
  return (
    <main className="p-6">
      <div className="flex-1 bg-white p-6 rounded-xl">
        <DashboardSection />
      </div>
      <div className="flex-1 mt-4 ">
        <QuickActionsSection />
      </div>
      {/** Map view */}
      <MapView />
    </main>
  );
}

// 
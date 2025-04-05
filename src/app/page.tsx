import { DashboardSection } from "@/components/sections/DashboardSection/DashboardSection";

export default function Home() {
  return (
    <main className="flex h-[calc(100%-80px)] overflow-y-scroll px-6 py-4 ">
      <div className="flex-1 mt-4">
        <DashboardSection />
      </div>
    </main>
  );
}

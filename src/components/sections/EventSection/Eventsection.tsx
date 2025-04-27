'use client'

import { CalendarGrid } from "@/app/components/calendar/calendar-grid";
import { CalendarHeader } from "@/app/components/calendar/calendar-header";
import { useEvents } from "@/app/hooks/use-events";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/axios";
import { JSX, useEffect, useState } from "react";
import { Event } from "../../../../types";
import { AddEventFormSection } from "../AddEventFormSection ";

export default function EventSection(): JSX.Element {

  // Media tabs data
  const mediaTabs = [
    { value: "evenements", label: "Évènements", active: true },
  ];

  const [selectedItem, setSelectedItem] = useState(mediaTabs[0])
  const [evenements, setEvenements] = useState<Event[]>([])

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("month");
  const { events, addEvent } = useEvents();

  const getEvents = async () => {
    const response: any = await apiClient.get("/api/evenements?paginate=200")
    // console.log("Events",response.data);
    setEvenements(response.data)
  }

  useEffect(() => {
    getEvents()
  }, [])
  
    
  return (
    <Tabs defaultValue="evenements" className="w-full bg-[#f0f0f4]">
      {/* Tab navigation */}
      <div className="bg-white px-9 pt-6 flex items-center justify-between">
        <div className="flex flex-col space-y-4">
          <h3 className="font-legend text-xs text-gray tracking-[0] leading-normal ml-2.5 uppercase">
          Gestion des évènements
          </h3>
          <div className="w-full">
            <TabsList className="bg-transparent p-0 h-auto gap-0">
              {
               mediaTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  onClick={() => setSelectedItem(tab)}
                  className="p-2.5 rounded-none font-body-3 text-sm data-[state=active]:border-b-[3px] data-[state=active]:border-blue data-[state=active]:text-blue data-[state=active]:shadow-none data-[state=inactive]:text-gray data-[state=inactive]:bg-transparent">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
        {selectedItem.value === 'evenements' &&  <AddEventFormSection /> }
      </div>

      <div className="p-6">
        <section className="bg-white rounded-2xl p-7 space-y-6">
          <TabsContent
            value="evenements"
            className="border-none space-y-6">
            <div>
              <CalendarHeader
                currentDate={currentDate}
                view={view}
                onDateChange={setCurrentDate}
                onViewChange={setView}
              />
              <div className="mt-6">
                <CalendarGrid currentDate={currentDate} events={evenements} view={view} />
              </div>
            </div>
          </TabsContent>
        </section>
      </div>
    </Tabs>
  );
};

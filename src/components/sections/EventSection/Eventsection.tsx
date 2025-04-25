'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGridIcon, ListFilter, SearchIcon } from "lucide-react";
import { JSX, useState } from "react";
import ActualiteContent from "../ActualiteContent/ActualiteContent";
import { AddEventFormSection } from "../AddEventFormSection ";
import { CalendarHeader } from "@/app/components/calendar/calendar-header";
import { CalendarGrid } from "@/app/components/calendar/calendar-grid";
import { useEvents } from "@/app/hooks/use-events";

export default function EventSection(): JSX.Element {

  // Media tabs data
  const mediaTabs = [
    { value: "evenements", label: "Évènements", active: true },
  ];

  const [selectedItem, setSelectedItem] = useState(mediaTabs[0])

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("month");
  const { events, addEvent } = useEvents();
    

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
              {mediaTabs.map((tab) => (
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
            className="border-none">
            <Tabs defaultValue="published" className="w-full">
              <div className="flex justify-between items-center">
                <TabsList className="justify-start h-12 p-0 bg-[#F1F3F6] rounded-md px-3 py-2">
                  <TabsTrigger
                    value="published"
                    className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                    <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      Publiés
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray"
                  >
                    <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      En attente
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="disabled"
                    className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray"
                  >
                    <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      Désactivés
                    </span>
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-start gap-2.5">
                  <div className="flex items-center gap-2">
                    <div className="relative w-[256px]">
                      <Input
                        className="h-10 bg-neutral-100 border-none pl-9"
                        placeholder="Rechercher une actualité"
                      />
                      <SearchIcon className="absolute w-4 h-4 top-3 left-3 text-gray" />
                    </div>
                    <Button
                      variant="outline"
                      className="h-11 flex items-center gap-2.5 border border-[#d9d9d9] rounded-lg">
                      <ListFilter className="w-5 h-5" />
                      <span className="font-body-3 text-noir-dashboard">
                        Trier par...
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg"
                    >
                      <LayoutGridIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
              <TabsContent value="published" className="mt-6 space-y-6">
                <div>
                  <CalendarHeader
                    currentDate={currentDate}
                    view={view}
                    onDateChange={setCurrentDate}
                    onViewChange={setView}
                  />
                  <div className="mt-6">
                    <CalendarGrid currentDate={currentDate} events={events} view={view} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-6 space-y-6">
                {/* Content for pending tab */}
              </TabsContent>

              <TabsContent value="disabled" className="mt-6 space-y-6">
                {/* Content for disabled tab */}
              </TabsContent>
            </Tabs>
          </TabsContent>
        </section>
      </div>
    </Tabs>
  );
};

"use client";

import { useState } from "react";
import { CalendarGrid } from "@/app/components/calendar/calendar-grid";
import { EventForm } from "@/app/components/event-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useLoadScript } from "@react-google-maps/api";
import { useEvents } from "@/app/hooks/use-events";
import { Event } from "@/app/types/event";
import { CalendarHeader } from "@/app/components/calendar/calendar-header";

const libraries = ["places"];
export default function EventContent() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<"day" | "week" | "month">("month");
    const { events, addEvent } = useEvents();
  
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      libraries: libraries as any,
    });
  
    const handleEventSubmit = (data: any) => {
      const newEvent: Event = {
        ...data,
        id: Date.now().toString(),
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      };
      addEvent(newEvent);
    };
  
    if (!isLoaded) return <div>Chargement...</div>;
  
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Gestionnaire d'événements</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nouvel événement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Créer un nouvel événement</DialogTitle>
                </DialogHeader>
                <EventForm onSubmit={handleEventSubmit} />
              </DialogContent>
            </Dialog>
          </div>
        </header>
  
        <main className="container mx-auto px-4 py-8">
          <CalendarHeader
            currentDate={currentDate}
            view={view}
            onDateChange={setCurrentDate}
            onViewChange={setView}
          />
          <div className="mt-6">
            <CalendarGrid currentDate={currentDate} events={events} view={view} />
          </div>
        </main>
      </div>
    );
}

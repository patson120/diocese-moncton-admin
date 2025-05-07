"use client";

import { useState, useEffect } from "react";
import { mockEvents } from "../lib/mock-data";

export function useEvents() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Charger les événements depuis le localStorage ou utiliser les données mock
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(mockEvents);
      localStorage.setItem("events", JSON.stringify(mockEvents));
    }
  }, []);

  const addEvent = (event: Event) => {
    const newEvents = [...events, event];
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
  };

  const deleteEvent = (eventId: string) => {
    const newEvents = events.filter((event: any) => event.id !== eventId);
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
  };

  return { events, addEvent, deleteEvent };
}
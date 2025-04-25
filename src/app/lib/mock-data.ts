import { Event } from "../types/event";
import { addDays, subDays, setHours, setMinutes } from "date-fns";

const today = new Date();

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Réunion d'équipe",
    description: "Réunion hebdomadaire de l'équipe de développement",
    startDate: setHours(setMinutes(subDays(today, 1), 30), 14),
    endDate: setHours(setMinutes(subDays(today, 1), 30), 16),
    type: "meeting",
    location: {
      address: "Paris, France",
      lat: 48.8566,
      lng: 2.3522
    }
  },
  {
    id: "2",
    title: "Conférence Tech",
    description: "Conférence sur les nouvelles technologies web",
    startDate: setHours(setMinutes(today, 0), 10),
    endDate: setHours(setMinutes(today, 0), 18),
    type: "conference",
    location: {
      address: "Lyon, France",
      lat: 45.7578,
      lng: 4.8320
    }
  },
  {
    id: "3",
    title: "Workshop Design",
    description: "Atelier sur les principes du design moderne",
    startDate: setHours(setMinutes(addDays(today, 2), 0), 9),
    endDate: setHours(setMinutes(addDays(today, 3), 0), 17),
    type: "workshop",
    location: {
      address: "Bordeaux, France",
      lat: 44.8378,
      lng: -0.5792
    }
  },
  {
    id: "4",
    title: "Présentation Client",
    description: "Présentation du nouveau projet au client",
    startDate: setHours(setMinutes(today, 0), 15),
    endDate: setHours(setMinutes(today, 0), 16),
    type: "meeting",
    location: {
      address: "Nantes, France",
      lat: 47.2184,
      lng: -1.5536
    }
  }
];
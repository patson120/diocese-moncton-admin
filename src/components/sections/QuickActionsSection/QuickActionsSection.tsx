"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchEvenements } from "@/lib/data";
import { BookOpenText, Calendar1, CalendarPlus, Layers, MapPin } from "lucide-react";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { Event } from "../../../../types";
import Text from "@/components/shared/Text";
import { formatDateToLocal } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { AddEventFormSection } from "../AddEventFormSection ";

const QuickActionsSection = (): JSX.Element => {

  const router = useRouter()

  const [calendarEvents, setCalendarEvents] = useState<Event[]>([])

  useEffect(() => {
    const getEvenements = async () => {
      const response = await fetchEvenements(`?paginate=5`)
      setCalendarEvents(response.data)
    }
    getEvenements()
  }, [])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        <Link href={'/message'} >
          <Card
            className="bg-white rounded-xl shadow-none p-0">
            <CardContent className="flex px-4 py-4 justify-stretch items-center">
              <div className="flex items-center gap-3">
                {/* Icon placeholder */}
                <div className="w-12 h-12 shrink-0 bg-yellow-light rounded-xl flex justify-center items-center" >
                  <BookOpenText className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <p className="font-semibold text-noir-dashboard leading-[25px] line-clamp-1">
                    Créer message de l'archevêque
                  </p>
                  <p className="font-legend -mt-1 font-[number:var(--legend-font-weight)] text-gray text-xs tracking-[var(--legend-letter-spacing)] leading-[var(--legend-line-height)] [font-style:var(--legend-font-style)] line-clamp-1">
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Card
          className="bg-white rounded-xl shadow-none p-0">
          <CardContent className="flex px-4 py-4 justify-stretch items-center">
            <div className="flex items-center gap-3">
              {/* Icon placeholder */}
              <div className="w-12 h-12 shrink-0 bg-red-light rounded-xl flex justify-center items-center">
                <CalendarPlus className="h-6 w-6" />
              </div>
              <div className="relative flex flex-col items-start gap-1">
                <p className="font-semibold text-noir-dashboard leading-[25px] line-clamp-1">
                  Créer un évènement
                </p>
                <p className="font-legend -mt-1 font-[number:var(--legend-font-weight)] text-gray text-xs tracking-[var(--legend-letter-spacing)] leading-[var(--legend-line-height)] [font-style:var(--legend-font-style)] line-clamp-1">
                  Lorem ipsum dolor sit amet
                </p>
                <div className="w-full h-full absolute opacity-0">
                  <AddEventFormSection />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="bg-white rounded-xl shadow-none p-0">
          <CardContent className="flex px-4 py-4 justify-stretch items-center">
            <div className="flex items-center gap-3">
              {/* Icon placeholder */}
              <div className="w-12 h-12 shrink-0 bg-green-light rounded-xl flex justify-center items-center">
                <Layers className="h-6 w-6" />
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-noir-dashboard leading-[25px] line-clamp-1">
                  Créer une page
                </p>
                <p className="font-legend -mt-1 font-[number:var(--legend-font-weight)] text-gray text-xs tracking-[var(--legend-letter-spacing)] leading-[var(--legend-line-height)] [font-style:var(--legend-font-style)] line-clamp-1">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full rounded-2xl bg-white shadow-none">
        <CardContent className="p-4 lg:p-7 flex flex-col gap-4">

          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="font-heading-5 font-[number:var(--heading-5-font-weight)] text-blue text-[length:var(--heading-5-font-size)] tracking-[var(--heading-5-letter-spacing)] leading-[var(--heading-5-line-height)]">
                Evènements
              </h2>
              <p className="text-gray font-normal text-sm">Les 5 évènements iminents</p>
            </div>
            <Button
              onClick={() => router.push("/events")}
              variant="link"
              className="p-0 h-auto font-body-3 font-semibold text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]"
            >
              Voir plus
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {
              calendarEvents.map((event, index) => (
                <div key={index} className="bg-[#F1F3F64D]/30 p-4 rounded-lg border border-gray/20 flex flex-col justify-evenly">
                  <div className="h-8 w-8 rounded-xl flex justify-center items-center mb-3">
                    <Calendar1 className="h-5 w-5 text-blue" />
                  </div>
                  <div>
                    <h1 className="font-bold">{formatDateToLocal(new Date(event.created_at!).toISOString())} - {event.heure_event.toString().slice(0, 5)} </h1>
                    <div className="my-3 py-2 border-y border-dashed border-y-gray/20">
                      <Text className="text-gray line-clamp-2" labelEn={event.titre_en} labelFr={event.titre_fr} />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <MapPin className="h-5 w-5 text-gray" />
                    <p className="text-gray line-clamp-1">{event.lieu}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionsSection;
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar1, MapPin } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

const QuickActionsSection = (): JSX.Element => {
  // Quick action data
  const quickActions = [
    {
      title: "Créer message de l'archevêque",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      title: "Créer un évènement",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      title: "Créer une page",
      description: "Lorem ipsum dolor sit amet",
    },
  ];

  // Calendar events data
  const calendarEvents = [
    {
      date: "Lun 10 Avril - 18h30",
      title: "Cheminer ensemble durant le carême 2025",
      lieu: "Église Notre-Dame ..."
    },
    {
      date: "Dim 12 avril - 14h00",
      title: "Prière d'espérance pour la paix.",
      lieu: "Église Notre-Dame ..."
    },
    {
      date: "Jeu 14 avril - 10h30",
      title: "Seniors Connect",
      lieu: "Église Notre-Dame ..."
    },
    {
      date: "17 Avril à 18h30",
      title: "Cheminer ensemble durant le carême 2025",
      lieu: "Église Notre-Dame ..."
    },
    {
      date: "22 Avril à 18h30",
      title: "Cheminer ensemble durant le carême 2025",
      lieu: "Église Notre-Dame ..."
    },

  ];

  // Parishes data
  const parishesVisited = [
    {
      name: "Saint-anne",
      visits: "98 visites",
    },
    {
      name: "Saint-anne",
      visits: "98 visites",
    },
    {
      name: "Saint-anne",
      visits: "98 visites",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        <Link href={'/message'} >
          <Card
            className="bg-white rounded-xl shadow-none p-0">
            <CardContent className="flex px-4 py-4 justify-stretch items-center">
              <div className="flex items-center gap-3">
                {/* Icon placeholder */}
                <div className="w-12 h-12 shrink-0 bg-[#E6EAEF] rounded-xl" />
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
              <div className="w-12 h-12 shrink-0 bg-[#E6EAEF] rounded-xl" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-noir-dashboard leading-[25px] line-clamp-1">
                  Créer un évènement
                </p>
                <p className="font-legend -mt-1 font-[number:var(--legend-font-weight)] text-gray text-xs tracking-[var(--legend-letter-spacing)] leading-[var(--legend-line-height)] [font-style:var(--legend-font-style)] line-clamp-1">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="bg-white rounded-xl shadow-none p-0">
          <CardContent className="flex px-4 py-4 justify-stretch items-center">
            <div className="flex items-center gap-3">
              {/* Icon placeholder */}
              <div className="w-12 h-12 shrink-0 bg-[#E6EAEF] rounded-xl" />
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
              <p className="text-gray font-normal text-sm">Les 7 évènements iminents</p>
            </div>
            <Button
              variant="link"
              className="p-0 h-auto font-body-3 font-semibold text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]"
            >
              Voir plus
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {
              calendarEvents.map((event, index) => (
                <div key={index} className="bg-[#F1F3F64D]/30 p-4 rounded-lg border border-gray/20 flex flex-col justify-evenly">
                  <div className="h-10 w-10 rounded-xl flex justify-center items-center mb-3">
                    <Calendar1 className="h-6 w-6 text-blue" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold">{event.date}</h1>
                    <p className="text-gray line-clamp-2 my-3 py-2 border-y border-dashed border-y-gray/20">{event.title}</p>
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
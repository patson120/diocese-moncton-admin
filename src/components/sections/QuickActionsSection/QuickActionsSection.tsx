import { ChevronRightIcon } from "lucide-react";
import React, { JSX } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const QuickActionsSection = (): JSX.Element => {
  // Quick action data
  const quickActions = [
    {
      title: "Message de l'archevêque",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      title: "Créer un évènement",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      title: "Ajouter un utilisateur",
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
      title: "Soupé au homard à pointe Sapin",
      details: "08 sept | 08h00 | Au diocèse de moncton",
    },
    {
      title: "Soupé au homard à pointe Sapin",
      details: "08 sept | 08h00 | Au diocèse de moncton",
    },
    {
      title: "Soupé au homard à pointe Sapin",
      details: "08 sept | 08h00 | Au diocèse de moncton",
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
    <Card className="w-full rounded-2xl bg-white shadow-none">
      <CardContent className="p-4 lg:p-7 flex flex-col gap-4">
        <h2 className="font-heading-5 font-[number:var(--heading-5-font-weight)] text-noir-dashboard text-[length:var(--heading-5-font-size)] tracking-[var(--heading-5-letter-spacing)] leading-[var(--heading-5-line-height)]">
          Actions rapides
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="bg-[#f0f0f4] rounded-xl shadow-none">
              <CardContent className="px-3 py-2 flex flex-1 justify-center items-center">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col items-start gap-1">
                      <p className="font-semibold text-noir-dashboard leading-[25px] line-clamp-1">
                        {action.title}
                      </p>
                      <p className="font-legend font-[number:var(--legend-font-weight)] text-gray text-[length:var(--legend-font-size)] tracking-[var(--legend-letter-spacing)] leading-[var(--legend-line-height)] [font-style:var(--legend-font-style)] line-clamp-1">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 relative">
          <Separator className="w-full" />
          <Separator
            orientation="vertical"
            className="absolute h-[302px] left-1/2 top-0 hidden lg:block"
          />

          <div className="flex flex-col lg:flex-row mt-6 gap-6 lg:gap-0">
            {/* Calendar section */}
            <div className="w-full lg:w-1/2 lg:pr-10 flex flex-col gap-4">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-heading-5 font-[number:var(--heading-5-font-weight)] text-noir-dashboard text-[length:var(--heading-5-font-size)] tracking-[var(--heading-5-letter-spacing)] leading-[var(--heading-5-line-height)]">
                  Calendrier
                </h3>
                <Button
                  variant="link"
                  className="p-0 h-auto font-body-3 font-semibold text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]"
                >
                  Voir plus
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                {calendarEvents.map((event, index) => (
                  <Card
                    key={index}
                    className="bg-[#f2f2f6] rounded-xl shadow-none"
                  >
                    <CardContent className="p-3 flex justify-between items-center">
                      <div className="flex flex-1 justify-start items-center gap-3">
                        <div className="w-10 h-10 bg-[#dbdbe5] rounded-lg" />
                        <div className="flex flex-col">
                          <p className="font-body-3 font-semibold text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                            {event.title}
                          </p>
                          <div className="font-body-3 text-noir-dashboard text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                            {event.details}
                          </div>
                        </div>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 top-5 right-5" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Parishes section */}
            <div className="w-full lg:w-1/2 lg:pl-10 flex flex-col gap-4">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-heading-5 font-[number:var(--heading-5-font-weight)] text-noir-dashboard text-[length:var(--heading-5-font-size)] tracking-[var(--heading-5-letter-spacing)] leading-[var(--heading-5-line-height)]">
                  Paroisses visitées ce mois
                </h3>
                <Button
                  variant="link"
                  className="p-0 h-auto font-body-3 font-semibold text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]"
                >
                  Voir plus
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                {parishesVisited.map((parish, index) => (
                  <Card
                    key={index}
                    className="bg-[#f2f2f6] rounded-xl shadow-none"
                  >
                    <CardContent className="p-3 flex justify-between items-center">
                      <div className="flex flex-1 justify-start items-center gap-3">
                        <div className="w-10 h-10 bg-[#dbdbe5] rounded-lg" />
                        <div className="flex flex-col">
                          <p className="font-body-3 font-semibold text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                            {parish.name}
                          </p>
                          <div className="font-body-3 text-noir-dashboard text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                            {parish.visits}
                          </div>
                        </div>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 top-5 right-5" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsSection;
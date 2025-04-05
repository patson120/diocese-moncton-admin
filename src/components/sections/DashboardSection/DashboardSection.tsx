import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React, { JSX } from "react";

export const DashboardSection = (): JSX.Element => {
  // Dashboard card data for mapping
  const dashboardCards = [
    {
      id: 1,
      title: "Événements à venir",
      value: "12 évènements",
    },
    {
      id: 2,
      title: "Nombre visite sur le site",
      value: "345 visites",
    },
    {
      id: 3,
      title: "Dons collectés",
      value: "873$",
    },
    {
      id: 4,
      title: "Page la plus consultée",
      value: "Page d'accueil",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dashboardCards.map((card) => (
        <Card key={card.id} className="h-[200px] rounded-2xl overflow-hidden bg-white relative">
          <CardContent className="p-0">
            {/* Icon placeholder */}
            <div className="w-11 h-11 mt-5 ml-5 bg-neutral-100 rounded-xl" />

            {/* Card content */}
            <div className="flex flex-col items-start gap-0.5 mt-9 ml-5">
              <div className="text-gray text-xs">{card.title}</div>
              <div className="font-heading-5 font-bold text-noir-dashboard text-xl leading-[28.6px]">
                {card.value}
              </div>
            </div>
          </CardContent>

          {/* Card footer */}
          <CardFooter className="absolute bottom-0 w-full p-0">
            <div className="w-full h-[38px] bg-[#f8f8f8] flex justify-between items-center px-5">
              <div className="font-normal text-gray text-xs">
                Durant février
              </div>
              <div className="font-normal text-noir-dashboard text-xs text-right cursor-pointer">
                <span className="font-bold">Voir plus</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
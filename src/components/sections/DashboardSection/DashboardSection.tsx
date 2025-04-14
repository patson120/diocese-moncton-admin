import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { JSX } from "react";

export const DashboardSection = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="h-[200px] rounded-2xl overflow-hidden bg-yellow-light relative">
        <CardContent className="p-0">
          {/* Icon placeholder */}
          <div className="w-11 h-11 mt-5 ml-5 bg-[#F4F4E6] rounded-xl">
          </div>

          {/* Card content */}
          <div className="flex flex-col items-start gap-0.5 mt-9 ml-5">
            <div className="text-gray text-xs">Événements à venir</div>
            <div className="font-heading-5 font-bold text-noir-dashboard text-xl leading-[28.6px]">
              12 évènements
            </div>
          </div>
        </CardContent>

        {/* Card footer */}
        <CardFooter className="absolute bottom-0 w-full p-0">
          <div className="w-full h-[38px] bg-[#F9F9F0] flex justify-between items-center px-5">
            <div className="font-normal text-gray text-xs">
              Durant février
            </div>
            <div className="font-normal text-noir-dashboard text-xs text-right cursor-pointer">
              <span className="font-bold">Voir plus</span>
            </div>
          </div>
        </CardFooter>
      </Card>
      <Card className="h-[200px] rounded-2xl overflow-hidden bg-red-light relative">
        <CardContent className="p-0">
          {/* Icon placeholder */}
          <div className="w-11 h-11 mt-5 ml-5 bg-[#F4E6E8] rounded-xl" />

          {/* Card content */}
          <div className="flex flex-col items-start gap-0.5 mt-9 ml-5">
            <div className="text-gray text-xs">Dons collectés</div>
            <div className="font-heading-5 font-bold text-noir-dashboard text-xl leading-[28.6px]">
              873$
            </div>
          </div>
        </CardContent>

        {/* Card footer */}
        <CardFooter className="absolute bottom-0 w-full p-0">
          <div className="w-full h-[38px] bg-[#F8F2F3] flex justify-between items-center px-5">
            <div className="font-normal text-gray text-xs">
              Durant février
            </div>
            <div className="font-normal text-noir-dashboard text-xs text-right cursor-pointer">
              <span className="font-bold">Voir plus</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <Card className="h-[200px] rounded-2xl overflow-hidden bg-green-light relative">
        <CardContent className="p-0">
          {/* Icon placeholder */}
          <div className="w-11 h-11 mt-5 ml-5 bg-[#E6EAEF] rounded-xl" />

          {/* Card content */}
          <div className="flex flex-col items-start gap-0.5 mt-9 ml-5">
            <div className="text-gray text-xs">Nombre de visite sur le site</div>
            <div className="font-heading-5 font-bold text-noir-dashboard text-xl leading-[28.6px]">
              345 visites
            </div>
          </div>
        </CardContent>

        {/* Card footer */}
        <CardFooter className="absolute bottom-0 w-full p-0">
          <div className="w-full h-[38px] bg-[#F3F4F7] flex justify-between items-center px-5">
            <div className="font-normal text-gray text-xs">
              Durant février
            </div>
            <div className="font-normal text-noir-dashboard text-xs text-right cursor-pointer">
              <span className="font-bold">Voir plus</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
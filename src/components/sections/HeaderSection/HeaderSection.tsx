import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BellIcon } from "lucide-react";
import React, { JSX } from "react";

 const HeaderSection = (): JSX.Element => {
  return (
    <header className="w-full h-20 bg-white flex items-center justify-between px-9">
      <div className="flex items-center gap-2">
        <Avatar className="w-10 h-10 rounded-full overflow-hidden">
          <AvatarImage src="/assets/img/image.png" alt="Profile" />
          <AvatarFallback>HG</AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-center items-start gap-0.5">
          <div className="font-body-3 text-start font-normal text-noir-dashboard text-sm leading-[14px]">
            Hadrien Gayap
          </div>
          <div className="font-legend text-gray text-xs">
            Super administrateur
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Button
          variant="outline"
          className="h-10 text-noir-dashboard font-body-3 font-normal"
        >
          Voir le site internet
        </Button>
        <BellIcon className="w-6 h-6 text-noir-dashboard" />
      </div>
    </header>
  );
};

export default HeaderSection;

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import React, { JSX } from "react";

export const NavigationMenuSection = (): JSX.Element => {
  // Navigation menu items data
  const navItems = [
    { id: "actualites", label: "Actualités", active: true },
    { id: "messages", label: "Messages évêques", active: false },
    { id: "communautes", label: "Communautés", active: false },
    { id: "mouvements", label: "Mouvements", active: false },
  ];

  return (
    <header className="w-full bg-white pt-6 px-9">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="font-legend text-xs text-gray tracking-[0] leading-normal ml-2.5">
            GESTION DES PAGES
          </div>

          <Tabs defaultValue="actualites" className="w-fit">
            <TabsList className="bg-transparent p-0 h-auto">
              {navItems.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className={`p-2.5 rounded-none font-body-3 text-sm data-[state=active]:border-b-2 data-[state=active]:border-[#11112e] data-[state=active]:text-noir-dashboard data-[state=active]:shadow-none data-[state=inactive]:text-gray data-[state=inactive]:bg-transparent`}
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <Button className="h-10 gap-2 px-3.5 py-0 bg-blue rounded-[7px] text-white">
          <PlusIcon className="w-5 h-5" />
          <span className="font-body-3 text-sm">Ajouter une actualité</span>
        </Button>
      </div>
    </header>
  );
};

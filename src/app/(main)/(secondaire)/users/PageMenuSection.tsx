import { PlusIcon } from "lucide-react";
import React, { JSX } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddUserFormSection } from "@/components/sections/AddUserFormSection";

export const PageMenuSection = (): JSX.Element => {
  // Data for tabs
  const tabItems = [
    { id: "utilisateurs", label: "Utilisateurs" },
    { id: "roles", label: "Rôles et permissions" },
  ];

  return (
    <header className="w-full bg-white pt-6 px-9">
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <h3 className="font-legend text-xs text-gray tracking-[0] leading-normal ml-2.5">
            GESTION DES UTILISATEURS
          </h3>

          <Tabs defaultValue="utilisateurs">
            <TabsList className="bg-transparent p-0 h-auto">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-[#f2f2f9] data-[state=active]:border-b-2 data-[state=active]:border-blue data-[state=active]:text-blue data-[state=inactive]:text-gray p-2.5 rounded-none"
                >
                  <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                    {tab.label}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <AddUserFormSection />
      </div>
    </header>
  );
};

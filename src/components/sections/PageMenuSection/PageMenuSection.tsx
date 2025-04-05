import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import React, { JSX } from "react";

export const PageMenuSection = (): JSX.Element => {
  // Define tab items for better maintainability
  const tabItems = [
    { id: "active", label: "Pages actives" },
    { id: "inactive", label: "Pages desactivées" },
    { id: "components", label: "Composants" },
    { id: "links", label: "Gestion des liens" },
  ];

  return (
    <section className="w-full h-m bg-white pt-6 px-9">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xs text-gray mb-3 ml-2.5">
            GESTION DES PAGES
          </h3>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="bg-transparent p-0 h-auto gap-0">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="p-2.5 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#11112e] data-[state=active]:shadow-none data-[state=active]:text-noir-dashboard data-[state=inactive]:text-gray h-auto">
                  <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                    {tab.label}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <Button className="bg-blue rounded-[7px] h-10 gap-2 px-3.5 py-0">
          <PlusIcon className="w-5 h-5" />
          <span className="font-body-3 font-[number:var(--body-3-font-weight)] text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
            Créer une page
          </span>
        </Button>
      </div>
    </section>
  );
};

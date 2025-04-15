import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDownIcon,
  PlusIcon,
  SearchIcon
} from "lucide-react";
import Image from "next/image";
import { JSX } from "react";

export const ClergPretres = (): JSX.Element => {


  // Clergy tabs data
  const clergyTabs = [
    { value: "archeveque", label: "Archevêque", active: false },
    { value: "diacres", label: "Diacres", active: false },
    { value: "pretres-diocesains", label: "Prêtres diocésains", active: false },
    {
      value: "pretres-redemptoristes",
      label: "Prêtres rédemptoristes",
      active: true,
    },
    { value: "options", label: "Options", active: false },
  ];

  // Priest data
  const priestsData = [
    {
      name: "ùBELISLE, P. Jean, C.Ss.R.",
      parish: "Unité pastorale Providence",
    },
    {
      name: "GAUTHIER, P. Bernard,C.Ss.R.",
      parish: "Sixième archevêque de Moncton (2012-2023)",
    },
    {
      name: "BERNARD, P. Bill,C.Ss.R.",
      parish: "Unité pastorale Sainte-Famille",
    },
    {
      name: "MAHN THUONG NGUYEN, P. Joseph, C.Ss.R.",
      parish: "Unité pastorale Saint-Jean-Paul II",
    },
    {
      name: "P. Jean Bourque",
      parish: "Unité pastorale Saint-Jean XXIII",
    },
  ];

  return (
    <main>
      <header className="w-full bg-white pt-6 px-9">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <h3 className="font-legend text-xs text-gray tracking-[0] leading-normal ml-2.5">
              GESTION DU CLERGÉ
            </h3>
            <Tabs defaultValue="pretres-redemptoristes" className="w-fit">
              <TabsList className="bg-transparent p-0 h-auto">
                {clergyTabs.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className="p-2.5 rounded-none font-body-3 text-sm data-[state=active]:border-b-[3px] data-[state=active]:border-blue data-[state=active]:text-blue data-[state=active]:shadow-none data-[state=inactive]:text-gray data-[state=inactive]:bg-transparent">
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <Button className="h-10 gap-2 px-3.5 py-0 bg-blue rounded-[7px] text-white">
            <PlusIcon className="w-5 h-5" />
            <span className="font-body-3 text-sm">Ajouter un membre</span>
          </Button>
        </div>
      </header>

      <div className="p-6">
        <section className="bg-white rounded-2xl p-7 space-y-6">
          <Tabs defaultValue="actif">
            <TabsList className="w-full justify-start h-10 p-0 bg-transparent border-b border-[#d9d9d9]">
              <TabsTrigger
                value="actif"
                className="px-2.5 py-2.5 rounded-none data-[state=active]:border-b data-[state=active]:border-[#11112e] data-[state=active]:shadow-none data-[state=active]:text-noir-dashboard data-[state=inactive]:text-gray">
                <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                  Actif
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="en-retraite"
                className="px-2.5 py-2.5 rounded-none data-[state=active]:border-b data-[state=active]:border-[#11112e] data-[state=active]:shadow-none data-[state=active]:text-noir-dashboard data-[state=inactive]:text-gray"
              >
                <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                  En retraite
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="decedes"
                className="px-2.5 py-2.5 rounded-none data-[state=active]:border-b data-[state=active]:border-[#11112e] data-[state=active]:shadow-none data-[state=active]:text-noir-dashboard data-[state=inactive]:text-gray"
              >
                <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                  Décédés
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="actif" className="mt-6 space-y-6">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <div className="relative w-[256px]">
                    <Input
                      className="h-9 bg-neutral-100 border-none pl-9"
                      placeholder="Rechercher une actualité"
                    />
                    <SearchIcon className="absolute w-4 h-4 top-3 left-3 text-gray" />
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-noir-dashboard">
                      Trier par ordre{" "} <span className="font-semibold">alphabétique</span>
                    </div>
                    <ChevronDownIcon className="w-[16px] h-[16px]" />
                  </div>
                </div>

                {/* <div className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-noir-dashboard whitespace-nowrap">
                Affichage en liste
              </div> */}
              </div>

              {/* Priests grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                {priestsData.map((priest, index) => (
                  <Card
                    key={index}
                    className="w-full border-none shadow-none"
                  >
                    <CardContent className="p-0 space-y-3">
                      <div className="relative self-stretch w-full h-[150px] bg-[#f0f0f0] rounded-xl flex items-center justify-center">
                        <Image
                          width={60}
                          height={60}
                          alt="Vector"
                          src="/vector.svg"
                        />
                      </div>

                      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mt-3">
                        <div className="relative self-stretch mt-[-1.00px] text-black text-base tracking-[0] leading-4">
                          <span className="font-bold text-sm">
                            {priest.name}
                          </span>
                        </div>
                        <p className="relative self-stretch font-body-3 text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
                          {priest.parish}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="en-retraite"
              className="mt-6 p-0 border-none">
              <div className="flex items-center justify-center h-[400px]">
                <p className="text-gray">Aucun prêtre en retraite</p>
              </div>
            </TabsContent>

            <TabsContent value="decedes" className="mt-6 p-0 border-none">
              <div className="flex items-center justify-center h-[400px]">
                <p className="text-gray">Aucun prêtre décédé</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
};

'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutGridIcon,
  ListFilter,
  SearchIcon
} from "lucide-react";
import Image from "next/image";
import { JSX, useState } from "react";
import { AddMemberFormSection } from "../AddMemberFormSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const ClergPretres = (): JSX.Element => {

  const [openModal, setOpenModal] = useState(false)

  // Clergy tabs data
  const clergyTabs = [
    { value: "archeveque", label: "Archevêque", active: false },
    { value: "diacres", label: "Diacres", active: false },
    { value: "pretres", label: "Prêtres", active: false },
    { value: "religieux", label: "Religieux", active: true, },
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
      <Tabs defaultValue="archeveque" className="w-full">
        <header className="w-full bg-white pt-6 px-9">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <h3 className="font-legend text-xs text-gray tracking-[0] leading-normal ml-2.5">
                GESTION DU CLERGÉ
              </h3>
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
            </div>
            <AddMemberFormSection />
          </div>
        </header>

        <div className="p-6">
          <section className="bg-white rounded-2xl p-7 space-y-6">
            {/* Archevêques */}
            <TabsContent
              value="archeveque"
              className="border-none">
              <div className="flex justify-between items-center">
                <div className="relative w-[256px]">
                  <Input
                    className="h-10 bg-neutral-100 border-none pl-9"
                    placeholder="Rechercher un archevêque"
                  />
                  <SearchIcon className="absolute w-4 h-4 top-3 left-3 text-gray" />
                </div>
              </div>
              <ScrollArea className="w-full h-[500px] mt-6">
                {/* Archevêque grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                  {priestsData.map((priest, index) => (
                    <Card
                      onClick={() => setOpenModal(true)}
                      key={index}
                      className="w-full border-none shadow-none cursor-pointer"
                    >
                      <CardContent className="p-0 space-y-3">
                        <div className="relative w-full h-[150px] bg-[#f0f0f0] overflow-hidden rounded-xl flex items-center justify-center">
                          <Image
                            fill
                            priority
                            className="object-cover"
                            alt="Vector"
                            src="/clerge-1.png"
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
              </ScrollArea>
            </TabsContent>

            {/* Réligieux */}
            <TabsContent
              value="religieux"
              className="border-none">
              <Tabs defaultValue="pretres-redemptoristes" className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList className="justify-start h-12 p-0 bg-[#F1F3F6] rounded-md px-3 py-2">
                    <TabsTrigger
                      value="pretres-redemptoristes"
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Prêtres rédemptoristes
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="autres-groupes"
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray"
                    >
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Autres groupes
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="decedes"
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Décédés
                      </span>
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-start gap-2.5">
                    <div className="flex items-center gap-2">
                      <div className="relative w-[256px]">
                        <Input
                          className="h-10 bg-neutral-100 border-none pl-9"
                          placeholder="Rechercher un prêtre"
                        />
                        <SearchIcon className="absolute w-4 h-4 top-3 left-3 text-gray" />
                      </div>
                      <Button
                        variant="outline"
                        className="h-11 flex items-center gap-2.5 border border-[#d9d9d9] rounded-lg">
                        <ListFilter className="w-5 h-5" />
                        <span className="font-body-3 text-noir-dashboard">
                          Trier par...
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg">
                        <LayoutGridIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="pretres-redemptoristes" className="mt-6 space-y-6">
                  <ScrollArea className="w-full h-[500px]">
                    {/* Priests grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                      {priestsData.map((priest, index) => (
                        <Card
                          onClick={() => setOpenModal(true)}
                          key={index}
                          className="w-full border-none shadow-none cursor-pointer"
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
                  </ScrollArea>
                </TabsContent>

                <TabsContent
                  value="autres-groupes"
                  className="mt-6 p-0 border-none">
                  <div className="flex items-center justify-center h-[400px]">
                    <p className="text-gray">Aucun autre groupe</p>
                  </div>
                </TabsContent>

                <TabsContent value="decedes" className="mt-6 p-0 border-none">
                  <div className="flex items-center justify-center h-[400px]">
                    <p className="text-gray">Aucun prêtre décédé</p>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Diacres */}
            <TabsContent
              value="diacres"
              className="border-none">
              <Tabs defaultValue="actif" className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList className="justify-start h-12 p-0 bg-[#F1F3F6] rounded-md px-3 py-2">
                    <TabsTrigger
                      value="actif"
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Actif
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="en-retraite"
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray"
                    >
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        En retraite
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="decedes"
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Décédés
                      </span>
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-start gap-2.5">
                    <div className="flex items-center gap-2">
                      <div className="relative w-[256px]">
                        <Input
                          className="h-10 bg-neutral-100 border-none pl-9"
                          placeholder="Rechercher un diacre"
                        />
                        <SearchIcon className="absolute w-4 h-4 top-3 left-3 text-gray" />
                      </div>
                      <Button
                        variant="outline"
                        className="h-11 flex items-center gap-2.5 border border-[#d9d9d9] rounded-lg">
                        <ListFilter className="w-5 h-5" />
                        <span className="font-body-3 text-noir-dashboard">
                          Trier par...
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg">
                        <LayoutGridIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="actif" className="mt-6 space-y-6">
                  <ScrollArea className="w-full h-[500px] mt-6">
                    {/* Archevêque grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                      {priestsData.map((priest, index) => (
                        <Card
                        onClick={() => setOpenModal(true)}
                          key={index}
                          className="w-full border-none shadow-none cursor-pointer"
                        >
                          <CardContent className="p-0 space-y-3">
                            <div className="relative w-full h-[150px] bg-[#f0f0f0] overflow-hidden rounded-xl flex items-center justify-center">
                              <Image
                                fill
                                priority
                                className="object-cover"
                                alt="Vector"
                                src="/clerge-1.png"
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
                  </ScrollArea>
                </TabsContent>

                <TabsContent
                  value="en-retraite"
                  className="mt-6 p-0 border-none">
                  <div className="flex items-center justify-center h-[400px]">
                    <p className="text-gray">Aucun Diacre</p>
                  </div>
                </TabsContent>

                <TabsContent value="decedes" className="mt-6 p-0 border-none">
                  <div className="flex items-center justify-center h-[400px]">
                    <p className="text-gray">Aucun Diacre décédé</p>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Prêtres */}
            <TabsContent
              value="pretres"
              className="border-none">
              <Tabs defaultValue="actif" className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList className="justify-start h-12 p-0 bg-[#F1F3F6] rounded-md px-3 py-2">
                    <TabsTrigger
                      value="actif"
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Actif
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="en-retraite"
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray"
                    >
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        En retraite
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="decedes"
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Décédés
                      </span>
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-start gap-2.5">
                    <div className="flex items-center gap-2">
                      <div className="relative w-[256px]">
                        <Input
                          className="h-10 bg-neutral-100 border-none pl-9"
                          placeholder="Rechercher un prêtre"
                        />
                        <SearchIcon className="absolute w-4 h-4 top-3 left-3 text-gray" />
                      </div>
                      <Button
                        variant="outline"
                        className="h-11 flex items-center gap-2.5 border border-[#d9d9d9] rounded-lg">
                        <ListFilter className="w-5 h-5" />
                        <span className="font-body-3 text-noir-dashboard">
                          Trier par...
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg">
                        <LayoutGridIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="actif" className="mt-6 space-y-6">
                  <ScrollArea className="w-full h-[500px] mt-6">
                    {/* Prêtres grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                      {[...priestsData, ...priestsData].map((priest, index) => (
                        <Card
                        onClick={() => setOpenModal(true)}
                          key={index}
                          className="w-full border-none shadow-none cursor-pointer"
                        >
                          <CardContent className="p-0 space-y-3">
                            <div className="relative w-full h-[150px] bg-[#f0f0f0] overflow-hidden rounded-xl flex items-center justify-center">
                              <Image
                                fill
                                priority
                                className="object-cover"
                                alt="Vector"
                                src="/clerge-1.png"
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
                  </ScrollArea>
                </TabsContent>

                <TabsContent
                  value="en-retraite"
                  className="mt-6 p-0 border-none">
                  <div className="flex items-center justify-center h-[400px]">
                    <p className="text-gray">Aucun Diacre</p>
                  </div>
                </TabsContent>

                <TabsContent value="decedes" className="mt-6 p-0 border-none">
                  <div className="flex items-center justify-center h-[400px]">
                    <p className="text-gray">Aucun Diacre décédé</p>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Options */}
            <TabsContent
              value="options"
              className="mt-6 p-0 border-none">
              <div className="flex items-center justify-center h-[400px]">
                <p className="text-gray">Aucune option</p>
              </div>
            </TabsContent>
          </section>
        </div>
      </Tabs>

      {/* Sheet */}
      <Sheet open={openModal} >
        {/* <SheetTrigger asChild>
                            <Button variant="outline">Ouvrir le panneau</Button>
                        </SheetTrigger> */}
        <SheetContent className="max-w-2xl min-w-2xl">
          <SheetHeader className='relative'>
            <SheetTitle hidden>Détails du membre</SheetTitle>
          </SheetHeader>
          <div className='absolute top-0 left-0 right-0 z-[1] bg-white'>
            {/* Header with action buttons */}
            <header className="w-full h-20 border-b border-[#d9d9d9] flex items-center justify-between px-12">
              <Button variant="outline" className="h-10"
                onClick={() => setOpenModal(false)}
              >
                Fermer
              </Button>
              <div className="flex gap-4">
                <Button variant="outline" className="h-10">
                  Désactiver
                </Button>
                <Button className="h-10 bg-blue text-white hover:bg-blue/90">
                  Modifier
                </Button>
              </div>
            </header>
          </div>

          {/* Scrollable content area */}
          <ScrollArea className="w-full h-[calc(100%-80px)] mt-24 px-7">
            <div className='flex flex-col gap-6'>
              <div className="flex gap-4">
                <div className="h-48  w-48 relative self-stretch rounded-xl borderborder-gray bg-[#f0f0f0] flex items-center justify-center">
                  <Image
                    fill
                    priority
                    className="object-cover"
                    alt="Vector"
                    src="/clerge-1.png"
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <div>
                    <h4 className="text-lg font-bold">P. Denis Belliveau</h4>
                    <p className="text-gray">En activité</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Coordonnées</h4>
                    <p className="text-gray">-</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Fonctions</h4>
                    <p className="text-gray">-</p>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-blue text-lg font-bold">Biographie</h1>
                <p className="text-gray mt-2">Né le 12 avril 1966 à Moncton ; fils d’Ernest Belliveau et Louina LeBlanc.
                  Études : Collège Dominicain, Ottawa, Bruxelles.
                  Ordination : le 13 octobre 1992 à Memramcook par Mgr Donat Chiasson.  Ministère : vicaire : Shédiac (1992) ; curé : Pointe-Sapin (1994-1998), Ste-Marie et St-Norbert (1998-2000), Rogersville (2000-2004), Études à Bruxelles (2004-2005), Aumônier assistant aux hôpitaux de Moncton et prêtre assistant aux paroisses St. Bernard et St. Augustin (2006-2007), Aumônier des hôpitaux de Moncton et du Foyer pour les vétérans (2007-).</p>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </main>
  );
};

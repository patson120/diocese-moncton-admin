
'use client'

import { Page } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/axios";
import {
  FileTextIcon,
  LayoutGridIcon,
  ListFilter,
  MoreVerticalIcon,
  SearchIcon
} from "lucide-react";
import { JSX, useEffect, useState } from "react";

export const ContentSection = (): JSX.Element => {
  // Page data for mapping
  const pagess = [
    { title: "Page d'accueil", description: "Archidiocèse de Mo..." },
    { title: "Mouvements", description: "Lorem ipsum dolor si..." },
    { title: "À propos", description: "Lorem ipsum dolor si..." },
  ];

  const [pages, setPages] = useState<Page[]>([])



  useEffect(() => {
    const fetchPages = async () => {
      const response: Page[] = await apiClient.get("/api/pages")
      setPages(response);
    }
    fetchPages()
  }, [])
  

  return (
    <section className="w-full mx-auto">
      <Card className="bg-white w-full rounded-2xl">
        <CardContent className="p-4 lg:p-7">
          <Tabs defaultValue="actives" className="w-full">
            <div className="flex justify-between items-center">
              <TabsList className="justify-start h-12 p-0 bg-[#F1F3F6] rounded-md px-3 py-2">
                <TabsTrigger
                  value="actives"
                  className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                  <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                    Pages actives
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="inactives"
                  className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                  <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                    Pages inactives
                  </span>
                </TabsTrigger>
              </TabsList>
              <div className="flex items-start gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="relative w-[256px]">
                    <Input
                      className="h-10 bg-neutral-100 border-none pl-9"
                      placeholder="Rechercher une page"
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
                    className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg"
                  >
                    <LayoutGridIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
            <TabsContent value="actives" className="mt-6 space-y-6">
              <ScrollArea className="w-full h-[calc(63vh)]">
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {pages.map((page, index) => (
                    <Card
                      key={index}
                      className="bg-[#F9F9F0] rounded-xl border-none"
                    >
                      <CardContent className="p-2 flex justify-start items-center">

                        <FileTextIcon className="w-5 h-5 mx-1" />

                        <div className="flex flex-1 flex-col ml-2 gap-0.5">
                          <h3 className="font-body-3 font-semibold text-noir-dashboard text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)] line-clamp-1">
                            {page.titre}
                          </h3>
                          <p className="font-body-3 text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)] line-clamp-1">
                            {/* page.description */}
                            Lorem ipsum dolor si...
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon">
                          <MoreVerticalIcon className="w-[16px] h-[16px]" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="inactives" className="mt-6 space-y-6">
              <ScrollArea className="w-full h-[calc(63vh)]">
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {pages.slice(7, 13).map((page, index) => (
                    <Card
                      key={index}
                      className="bg-[#F9F9F0] rounded-xl border-none"
                    >
                      <CardContent className="p-2 flex justify-start items-center">

                        <FileTextIcon className="w-5 h-5 mx-1" />

                        <div className="flex flex-1 flex-col ml-2 gap-0.5">
                          <h3 className="font-body-3 font-semibold text-noir-dashboard text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)] line-clamp-1">
                            {page.titre}
                          </h3>
                          <p className="font-body-3 text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)] line-clamp-1">
                            {/* page.description */}
                            Lorem ipsum dolor si...
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon">
                          <MoreVerticalIcon className="w-[16px] h-[16px]" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

        </CardContent>
      </Card>
    </section>
  );
};

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import React, { JSX } from "react";

export const ContentDisplaySection = (): JSX.Element => {
  // Data for news articles
  const newsArticles = [
    {
      id: 1,
      image: "/image-6.png",
      category: "Diocèse",
      title: "Quel est le problème avec l'aide...",
      description: "Lorem ipsum dolor sit amet, conse...",
    },
    {
      id: 2,
      image: "/image-1.png",
      category: "Diocèse",
      title: "Lorem ipsum dolor sit amet, co...",
      description: "Lorem ipsum dolor sit amet, conse...",
    },
    {
      id: 3,
      image: "/image-2.png",
      category: "Diocèse",
      title: "Lorem ipsum dolor sit amet, co...",
      description: "Lorem ipsum dolor sit amet, conse...",
    },
    {
      id: 4,
      image: "/image-3.png",
      category: "Diocèse",
      title: "Lorem ipsum dolor sit amet, co...",
      description: "Lorem ipsum dolor sit amet, conse...",
    },
    {
      id: 5,
      image: "/image-4.png",
      category: "Diocèse",
      title: "Lorem ipsum dolor sit amet, co...",
      description: "Lorem ipsum dolor sit amet, conse...",
    },
    {
      id: 6,
      image: "/image-5.png",
      category: "Diocèse",
      title: "Lorem ipsum dolor sit amet, co...",
      description: "Lorem ipsum dolor sit amet, conse...",
    },
    {
      id: 7,
      image: "/image-6.png",
      category: "Diocèse",
      title: "Lorem ipsum dolor sit amet, co...",
      description: "Lorem ipsum dolor sit amet, conse...",
    },
    {
      id: 8,
      image: "/image-7.png",
      category: "Diocèse",
      title: "Lorem ipsum dolor sit amet, co...",
      description: "Lorem ipsum dolor sit amet, conse...",
    },
    {
      id: 9,
      image: "",
      category: "",
      title: "Lorem ipsum dolor sit amet, co...",
      description: "ArchidiocLorem ipsum dolor sito...",
    },
    {
      id: 10,
      image: "",
      category: "",
      title: "Lorem ipsum dolor sit amet, co...",
      description: "ArchidiocLorem ipsum dolor sito...",
    },
  ];

  return (
    <section className="bg-white rounded-2xl p-7 space-y-6">
        <Tabs defaultValue="published" className="w-full">
          <TabsList className="w-full justify-start h-10 p-0 bg-transparent border-b border-[#d9d9d9]">
            <TabsTrigger
              value="published"
              className="px-2.5 py-2.5 rounded-none data-[state=active]:border-b data-[state=active]:border-[#11112e] data-[state=active]:shadow-none data-[state=active]:text-noir-dashboard data-[state=inactive]:text-gray">
              <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                Publiés
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="px-2.5 py-2.5 rounded-none data-[state=active]:border-b data-[state=active]:border-[#11112e] data-[state=active]:shadow-none data-[state=active]:text-noir-dashboard data-[state=inactive]:text-gray"
            >
              <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                En attente
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="disabled"
              className="px-2.5 py-2.5 rounded-none data-[state=active]:border-b data-[state=active]:border-[#11112e] data-[state=active]:shadow-none data-[state=active]:text-noir-dashboard data-[state=inactive]:text-gray"
            >
              <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                Désactivés
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="published" className="mt-6 space-y-6">
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
                    Trier par ordre <span className="font-semibold">alphabétique</span>
                  </div>
                  <ChevronDownIcon className="w-[16px] h-[16px]" />
                </div>
              </div>

              <div className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-noir-dashboard whitespace-nowrap">
                Affichage en liste
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
              {newsArticles.map((article) => (
                <Card
                  key={article.id}
                  className="w-full border-none shadow-none"
                >
                  <CardContent className="p-0 space-y-3">
                    {article.image ? (
                      <div
                        className="w-full h-[150px] rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${article.image})` }}
                      />
                    ) : (
                      <div className="w-full h-[150px] bg-[#f8f8f8] rounded-[11px]" />
                    )}

                    <div className="flex flex-col gap-2">
                      {article.category && (
                        <p className="font-legend text-[length:var(--legend-font-size)] tracking-[var(--legend-letter-spacing)] leading-[var(--legend-line-height)] text-gray">
                          {article.category}
                        </p>
                      )}

                      <div className="flex flex-col">
                        <p className="font-body-3 font-bold text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-noir-dashboard line-clamp-1">
                          {article.title}
                        </p>
                        <p className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-gray line-clamp-1">
                          {article.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending">
            {/* Content for pending tab */}
          </TabsContent>

          <TabsContent value="disabled">
            {/* Content for disabled tab */}
          </TabsContent>
        </Tabs>
    </section>
  );
};

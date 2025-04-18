import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutGridIcon,
  ListFilter,
  MoreHorizontalIcon,
  SearchIcon
} from "lucide-react";
import { JSX } from "react";

export const DocumentContentSection = (): JSX.Element => {

  // Document data for mapping
  const documents = [
    {
      id: 1,
      type: "PDF",
      title: "Bulletin diocésain mensuel",
    },
    {
      id: 2,
      type: "EXCEL",
      title: "Calendrier des pèlerinages organisés",
    },
    {
      id: 3,
      type: "PDF",
      title: "Lettre pastorale de l'évêque",
    },
    {
      id: 4,
      type: "WORD",
      title: "Fiches de catéchèse pour jeunes et adultes",
    },
    {
      id: 5,
      type: "PDF",
      title: "Catalogue des formations diocésaines",
    },
    {
      id: 6,
      type: "PDF",
      title: "Guide de la vie paroissiale",
    },
    {
      id: 7,
      type: "PDF",
      title: "Document de réflexion synodale",
    },
    {
      id: 8,
      type: "WORD",
      title: "Charte de bénévolat dans le diocèse",
    },
    {
      id: 9,
      type: "PDF",
      title: "Vademecum pour la catéchèse en paroisse",
    },
  ];

  return (
    <section className="w-full flex-1 p-6">
      <div className="flex flex-col bg-white w-full items-start gap-6 rounded-2xl p-6">
        <div className="flex w-full items-start gap-2.5">
          <div className="flex items-center gap-2">
            <div className="relative w-[256px]">
              <Input
                className="h-9 bg-neutral-100 border-none pl-9"
                placeholder="Rechercher un document"
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

        <ScrollArea className="w-full h-[500px]">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3">
            {videoCards.map((card, index) => (
              <Card
                key={index}
                className="h-[170px] bg-[#f9f9f0] rounded-2xl relative border-none"
              >
                <CardContent className="p-3 h-full flex flex-col justify-between">

                  <div className="flex justify-between">
                    <TvMinimalPlay className="w-6 h-6 " />
                    <Button
                      variant="ghost"
                      className="w-[18px] h-[18px] top-2 right-2 p-0">
                      <MoreHorizontalIcon className="w-[18px] h-[18px]" />
                    </Button>
                  </div>
                  <p className="font-body-3 font-semibold text-noir-dashboard text-sm leading-[20px] line-clamp-2">
                    {card.title}
                  </p>

                  <div className="w-full h-10">
                    <div className="h-10 w-full px-2 bg-white rounded-lg border-[0.5px] border-[#d9d9d9] flex justify-between items-center">
                      <span className="left-2 font-body-3 text-noir-dashboard truncate">
                        {card.url}
                      </span>
                      <Button
                        variant="ghost"
                        className="w-[30px] h-[30px] p-0 bg-[#f3f3e1] rounded-md"
                      >
                        <CopyIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div> */}

          {/* Document cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3">
            {documents.map((doc) => (
              <Card
                key={doc.id}
                className="bg-[#f9f9f0] rounded-2xl"
              >
                <CardContent className="p-0">
                  <div className="mt-2 mx-auto">
                    <div className="flex flex-row justify-end items-center px-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild >
                          <Button
                            variant="ghost"
                            className="w-[18px] h-[18px] p-0"
                          >
                            <MoreHorizontalIcon className="w-[18px] h-[18px]" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {/* Dropdown menu items would go here */}
                          <DropdownMenuItem className="text-gray">Consulter</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex flex-col items-center gap-3 my-4">
                      <div className="w-[100px] h-20 bg-white rounded-2xl border border-solid border-[#d9d9d9] flex items-center justify-center">
                        <span className="font-body-3 text-[length:var(--body-3-font-size)] text-gray text-center">
                          {doc.type}
                        </span>
                      </div>
                      <p className="font-body-3 text-[length:var(--body-3-font-size)] text-noir-dashboard text-center">
                        {doc.title}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
};

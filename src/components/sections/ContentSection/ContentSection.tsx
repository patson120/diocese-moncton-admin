import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChevronDownIcon,
  FileTextIcon,
  LayoutGridIcon,
  ListFilter,
  MoreVerticalIcon,
  SearchIcon,
} from "lucide-react";
import { JSX } from "react";

export const ContentSection = (): JSX.Element => {
  // Page data for mapping
  const pages = [
    { title: "Page d'accueil", description: "Archidiocèse de Mo..." },
    { title: "Mouvements", description: "Lorem ipsum dolor si..." },
    { title: "À propos", description: "Lorem ipsum dolor si..." },
    { title: "Sacrements", description: "Lorem ipsum dolor si..." },
    { title: "Contact", description: "Lorem ipsum dolor si..." },
    { title: "Évêques", description: "Archidiocèse de Mo..." },
    { title: "Message de l'évêque", description: "Lorem ipsum dolor si..." },
    { title: "Sacrements Mariages", description: "Lorem ipsum dolor si..." },
    { title: "Clergé", description: "Lorem ipsum dolor si..." },
    { title: "Évènements", description: "Lorem ipsum dolor si..." },
    { title: "Page d'accueil", description: "Archidiocèse de Mo..." },
    { title: "Sacrements baptême", description: "Lorem ipsum dolor si..." },
    { title: "À propos", description: "Lorem ipsum dolor si..." },
    { title: "Évènements", description: "Lorem ipsum dolor si..." },
    { title: "Évènements", description: "Lorem ipsum dolor si..." },
    { title: "Page d'accueil", description: "Archidiocèse de Mo..." },
    { title: "Sacrements baptême", description: "Lorem ipsum dolor si..." },
    { title: "À propos", description: "Lorem ipsum dolor si..." },
    { title: "Évènements", description: "Lorem ipsum dolor si..." },
    { title: "Évènements", description: "Lorem ipsum dolor si..." },
  ];

  return (
    <section className="w-full mx-auto">
      <Card className="bg-white w-full rounded-2xl">
        <CardContent className="p-4 lg:p-7">
          <div className="flex justify-between items-center">
            <div></div>
            <div className="flex items-start gap-2.5">
              <div className="flex items-center gap-2">
                <div className="relative w-[256px]">
                  <Input
                    className="h-10 bg-neutral-100 border-none pl-9"
                    placeholder="Rechercher une actualité"
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
                      {page.title}
                    </h3>
                    <p className="font-body-3 text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)] line-clamp-1">
                      {page.description}
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
        </CardContent>
      </Card>
    </section>
  );
};

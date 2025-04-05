import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChevronDownIcon,
  FileTextIcon,
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
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="relative w-[256px]">
                <Input
                  className="pl-9 h-9 bg-neutral-100 rounded-lg"
                  placeholder="Rechercher une page"
                />
                <SearchIcon className="absolute w-4 h-4 top-3 left-3 text-gray" />
              </div>

              <Button
                variant="ghost"
                className="flex items-center gap-1 text-noir-dashboard"
              >
                <span className="text-sm">
                  <span className="leading-[19.6px] font-normal">Trier par ordre </span>
                  <span className="font-semibold leading-[var(--body-3-line-height)] font-body-3 [font-style:var(--body-3-font-style)] tracking-[var(--body-3-letter-spacing)] text-[length:var(--body-3-font-size)]">
                    alphabétique
                  </span>
                </span>
                <ChevronDownIcon className="w-[16px] h-[16px]" />
              </Button>
            </div>

            <div className="font-body-3 font-[number:var(--body-3-font-weight)] text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
              Affichage en liste
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pages.map((page, index) => (
              <Card
                key={index}
                className="bg-[#f0f0f4] rounded-xl border-none"
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

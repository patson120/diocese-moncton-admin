import { Ressource } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiClient } from "@/lib/axios";
import {
  CopyIcon,
  LayoutGridIcon,
  ListFilter,
  MoreHorizontalIcon,
  SearchIcon,
  TvMinimalPlay
} from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { toast } from "sonner";

export const VideoContentSection = (): JSX.Element => {

  const [ressources, setRessources] = useState<Ressource[]>([]) 

  const fetchRessources = async () => {
    const response: Ressource[] = await apiClient.get('/api/ressources?type=video')
    setRessources(response)
  }
  
  const deleteRessources = async (idRessource: number) => {
    try {
      await apiClient.delete(`/api/ressources/${idRessource}`)
      setRessources(prev  => prev.filter( doc  => doc.id != idRessource))
      toast.success("Ressource supprimée avec succès")
    } catch (error: any) {
      toast.error(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Une erreur est survenue. Erreur:  {JSON.stringify(error.message)}
        </div>
      )
    }
  }

  useEffect(() => {
    fetchRessources()
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.info("Texte copié dans le presse-papier !");
    }).catch((error) => {
      toast.error("Erreur lors de la copie dans le presse-papier :", error);
    });
  };


  return (
    <section className="w-full flex-1 p-6">
      <div className="flex flex-col bg-white w-full items-start gap-6 rounded-2xl p-6">
        <div className="flex w-full items-start gap-2.5">
          <div className="flex items-center gap-2">
            <div className="relative w-[256px]">
              <Input
                className="h-9 bg-neutral-100 border-none pl-9"
                placeholder="Rechercher une vidéo"
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

        <ScrollArea className="w-full h-[calc(80vh)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3">
            {ressources.map((card, index) => (
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
                  <p className="font-body-3 font-semibold text-noir-dashboard text-sm leading-[20px] line-clamp-2">{card.titre_fr}</p>

                  <div className="w-full h-10">
                    <div className="h-10 w-full px-2 bg-white rounded-lg border-[0.5px] border-[#d9d9d9] flex justify-between items-center">
                      <span className="left-2 font-body-3 text-noir-dashboard truncate">
                        {card.media}
                      </span>
                      <Button
                        variant="ghost"
                        className="w-[30px] h-[30px] p-0 bg-[#f3f3e1] rounded-md"
                        onClick={()=> copyToClipboard(card.media)}>
                        <CopyIcon className="w-5 h-5 shrink-0" />
                      </Button>
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

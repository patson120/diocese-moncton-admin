'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGridIcon, ListFilter, ListOrdered, PlusIcon, SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import ActualiteContent from "../ActualiteContent/ActualiteContent";
import MessageContent from "../MessageContent/MessageContent";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ContentDisplaySection() {
  const [displayMode, setDisplayMode] = useState<'list' | 'grid'>('grid')

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()
  
  // Navigation menu items data
  const navItems = [
    { id: "actualites", label: "Actualités", route: "actualite", labelRouter: "une actualité", active: true },
    { id: "messages", label: "Messages évêques", route: "/message", labelRouter: "un message", active: false },
    { id: "communautes", label: "Communautés", route: "#", labelRouter: "un ...", active: false },
    { id: "mouvements", label: "Mouvements", route: "#", labelRouter: "un mouvement", active: false },
  ];
  const [selectedItem, setSelectedItem] = useState(navItems[0])
  const [query, setQuery] = useState(params.get('query')?.toString() || '')

  const handleSearch = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // params.set('page', '1');

    setQuery(value)
    // If the value is empty, remove the query parameter
    if (value) {
        params.set('query', value)
    }
    else {
        params.delete('query')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 800)

  const toggleDisplayMode = () => {
    if (displayMode === 'list') {setDisplayMode("grid") }
    else {setDisplayMode("list")}
  }

  return (
    <Tabs defaultValue="actualites" className="w-full">
      <header className="w-full bg-white pt-6 px-9">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <h3 className="font-legend text-xs text-gray tracking-[0] leading-normal ml-2.5">
              GESTION DES CONTENUS
            </h3>
            <div className="w-fit">
              <TabsList className="bg-transparent p-0 h-auto">
                {navItems.map((item) => (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-2.5 rounded-none font-body-3 text-sm data-[state=active]:border-b-[3px] data-[state=active]:border-blue data-[state=active]:text-blue data-[state=active]:shadow-none data-[state=inactive]:text-gray data-[state=inactive]:bg-transparent`}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
          {(selectedItem) &&
            <Button onClick={() => router.push(selectedItem.route)} className="h-10 gap-2 px-3.5 py-0 bg-blue rounded-[7px] text-white">
              <PlusIcon className="w-5 h-5" />
              <span className="font-body-3 text-sm">Ajouter {selectedItem.labelRouter}</span>
            </Button>
          }
        </div>
      </header>

      <div className="p-6">
        <section className="bg-white rounded-2xl p-7 space-y-6">
          <TabsContent
            value="actualites"
            className="border-none">
            <Tabs defaultValue="published" className="w-full">
              <div className="flex justify-between items-center">
                <TabsList className="justify-start h-12 p-0 bg-[#F1F3F6] rounded-md px-3 py-2">
                  <TabsTrigger
                    value="published"
                    className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                    <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      Publiés
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray"
                  >
                    <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      En attente
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="disabled"
                    className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray"
                  >
                    <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      Désactivés
                    </span>
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-start gap-2.5">
                  <div className="flex items-center gap-2">
                    <div className="relative w-[256px]">
                      <Input
                        className="h-10 bg-neutral-100 border-none pl-9"
                        placeholder="Rechercher une actualité..."
                        onChange={handleSearch}
                        defaultValue={searchParams.get('query')?.toString()}
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
                      onClick={() => toggleDisplayMode()}
                      className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg"
                    >
                      {
                        ( displayMode === 'list') ?
                        <LayoutGridIcon className="w-5 h-5" /> :
                        <ListOrdered className="w-5 h-5" />
                      }
                    </Button>
                  </div>
                </div>
              </div>
              <ScrollArea className="w-full h-[calc(80vh)] mt-6">
                <TabsContent value="published" className="mt-6 space-y-6">
                  <ActualiteContent is_actif={1} query={query} displayMode={displayMode} />
                </TabsContent>

                <TabsContent value="pending" className="mt-6 space-y-6">
                  {/* Content for pending tab */}
                  <ActualiteContent is_actif={0} query={query} displayMode={displayMode} />
                </TabsContent>

                <TabsContent value="disabled" className="mt-6 space-y-6">
                  {/* Content for disabled tab */}
                  <ActualiteContent is_actif={-1} query={query} displayMode={displayMode} />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </TabsContent>

          <TabsContent value="messages" className="p-0 border-none">
            <Tabs defaultValue="published" className="w-full">
              <div className="flex justify-between items-center">
                <TabsList className="justify-start h-12 p-0 bg-[#F1F3F6] rounded-md px-3 py-2">
                  <TabsTrigger
                    value="published"
                    className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                    <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      Publiés
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray"
                  >
                    <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      En attente
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="disabled"
                    className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray"
                  >
                    <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      Désactivés
                    </span>
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-start gap-2.5">
                  <div className="flex items-center gap-2">
                    <div className="relative w-[256px]">
                      <Input
                        className="h-10 bg-neutral-100 border-none pl-9"
                        placeholder="Rechercher un message"
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

              <TabsContent value="published" className="mt-6 space-y-6">
                {/* Content for published tab */}
                <MessageContent etat={1} />
              </TabsContent>

              <TabsContent value="pending" className="mt-6 space-y-6">
                {/* Content for pending tab */}
                <MessageContent etat={0} />
              </TabsContent>

              <TabsContent value="disabled" className="mt-6 space-y-6">
                {/* Content for disabled tab */}
                <MessageContent etat={-1} />
              </TabsContent>

            </Tabs>

            {/* <div className="flex items-center justify-center h-[400px]">
              <p className="text-gray">Aucun messages</p>
            </div> */}
          </TabsContent>

          <TabsContent value="communautes" className="mt-6 p-0 border-none">
            <div className="flex items-center justify-center h-[400px]">
              <p className="text-gray">Aucune communauté</p>
            </div>
          </TabsContent>

          <TabsContent value="mouvements" className="mt-6 p-0 border-none">
            <div className="flex items-center justify-center h-[400px]">
              <p className="text-gray">Aucun mouvement</p>
            </div>
          </TabsContent>
        </section>
      </div>
    </Tabs>
  );
};
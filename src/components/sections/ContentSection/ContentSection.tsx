
'use client'

import { Page } from "@/app/types";
import { componentRegistry, getComponentIcon } from "@/components/pages/lib/components/registry";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useRole from "@/hooks/use-role";
import { apiClient } from "@/lib/axios";
import {
  FileTextIcon,
  LayoutGridIcon,
  ListFilter,
  MoreVerticalIcon,
  PlusIcon,
  SearchIcon
} from "lucide-react";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { toast } from "sonner";

export const ContentSection = (): JSX.Element => {

  const { canDeletePage, canAddPage} = useRole()

  // Define tab items for better maintainability
  const tabItems = [
    { id: "pages", label: "Pages" },
    { id: "components", label: "Composants" },
    // { id: "links", label: "Gestion des liens" },
  ];

  const [pages, setPages] = useState<Page[]>([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDuplicating, setIsDuplicating] = useState(false)

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = ['all', 'layout', 'content', 'media', 'advanced'];  
  
  const filteredComponents = searchTerm
  ? componentRegistry.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type.toLowerCase().includes(searchTerm.toLowerCase())
  )
  : componentRegistry

  useEffect(() => {
    const fetchPages = async () => {
      const response: Page[] = await apiClient.get("/api/pages")
      setPages(response);
    }
    fetchPages()
  }, [])

  const handleDeletePage = async (page: Page) => {
    if(isDeleting) return
    if (window.confirm(`Voulez-vous vraiment supprimer la page "${page.titre}" ? \nCette action est irreversible ! `)){
      setIsDeleting(true)
      try {
        await apiClient.delete(`/api/pages/${page.id}`)
        toast.success(`La page ${page.titre} a été supprimée avec succès !`)
        setPages(prev => (prev.filter(p => p.id !== page.id)) )
      } catch (error) {
        console.log("Erreur", error)
      }
      finally{ setIsDeleting(false)}
    }
  }

  const handleDuplicatePage = async (page: Page) => {
    if (isDuplicating) return
    if (window.confirm(`Voulez-vous vraiment créer une nouvelle page à partir de celle-ci ?`)){
      setIsDuplicating(true)
      try {
        return await apiClient.post("/api/pages", {
          is_publier: 1,
          is_planifier: 0,
          titre: page.titre,
          description: page.description,
          contenu_html: page.contenu_html,
          contenu_json: page.contenu_json
        })
      } catch (error) {
        toast.success(`Une erreur est survenue lors de cette opération !\n Veuillez réessayer plus tard.`)
        console.log(error);
      }
      finally{ setIsDuplicating(false) }
    }
  }

  return (
    <div className="flex flex-col flex-1" >
      <Tabs defaultValue="pages" className="w-full">
        <section className="w-full bg-white pt-6 px-9">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <h3 className="font-legend text-xs text-gray tracking-[0] leading-normal ml-2.5">
                  GESTION DES PAGES
                </h3>
                <div className="w-full">
                  <TabsList className="bg-transparent p-0 h-auto gap-0">
                    {tabItems.map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="p-2.5 rounded-none font-body-3 text-sm data-[state=active]:border-b-[3px] data-[state=active]:border-blue data-[state=active]:text-blue data-[state=active]:shadow-none data-[state=inactive]:text-gray data-[state=inactive]:bg-transparent">
                        <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                          {tab.label} 
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              {
                canAddPage() &&
                <Link href={`/create-page/new`} className="bg-blue rounded-[7px] flex justify-center items-center h-10 gap-2 px-3.5 py-0">
                  <PlusIcon className="w-5 h-5 text-white" />
                  <span className="font-body-3 text-white font-[number:var(--body-3-font-weight)] text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                    Créer une page
                  </span>
                </Link>
              }

            </div>
        </section> 

        <div className="w-full p-6 mx-auto">
          <div className="bg-white w-full rounded-2xl">
            <TabsContent
              value="pages"
              className="border-none">
                <Card className="">
                  <CardContent className="p-4 lg:p-7">
                    <Tabs defaultValue="actives" className="w-full">
                      <div className="flex justify-between items-center">
                        <TabsList className="justify-start h-12 p-0 bg-[#F1F3F6] rounded-md px-3 py-2">
                          <TabsTrigger
                            value="actives"
                            defaultValue={"actives"}
                            className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                            <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                              Assignées
                            </span>
                          </TabsTrigger>
                          <TabsTrigger
                            value="inactives"
                            className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                            <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                              Non assignées
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                                    <p className="font-body-3 truncate overflow-hidden text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)] line-clamp-1">
                                      { page.description ?? 'Lorem ipsum dolor si...' }
                                    </p>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild >
                                    <Button
                                      variant="ghost"
                                      size="icon">
                                      <MoreVerticalIcon className="w-[16px] h-[16px]" />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {/* Dropdown menu items would go here */}
                                        <DropdownMenuItem className="text-gray">
                                            <Link href={`/render/${page.id}`} target="_blank">Consulter</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-gray">
                                            <Link href={`/create-page/${page.id}`} target="_blank">Editer</Link>
                                        </DropdownMenuItem>
                                        {
                                          canAddPage() &&
                                          <DropdownMenuItem className="text-gray" onClick={() => handleDuplicatePage(page)}>
                                            Dupliquer
                                          </DropdownMenuItem>
                                        }
                                        {
                                          canDeletePage() &&
                                          <DropdownMenuItem onClick={() => handleDeletePage(page)}
                                            className="text-red-500">
                                            { (isDeleting ) &&
                                                <Loader className="w-4 h-4 mr-2" />
                                            }
                                            Supprimer
                                          </DropdownMenuItem>
                                        }
                                    </DropdownMenuContent>
                                  </DropdownMenu>
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
            </TabsContent> 
            <TabsContent value="components" className="p-0 border-none">
              <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className='max-w-full p-6'>
                <TabsList className="flex justify-start gap-3 h-auto overflow-x-scroll h-scroll [&::-webkit-scrollbar]:h-0">
                  {
                    categories.map(category => (
                      <TabsTrigger 
                        key={category} 
                        value={category}
                        style={{ backgroundColor: 'white' }}
                        className={`py-1 capitalize ${activeCategory === category ? 'bg-white text-secondary-foreground' : 'bg-transparent text-muted-foreground'}`}>
                        {category}
                      </TabsTrigger>  
                    ))
                  }
                </TabsList>
              </Tabs>
              {
                <ScrollArea className="h-[calc(100vh-80px)]">
                  <div className="space-y-2 px-6">
                    {filteredComponents.length === 0 ? (
                      <div className="flex items-center justify-center h-[76vh]">
                        <p className="text-gray">Aucun composant</p>
                      </div>
                    ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                      {
                        filteredComponents
                        .filter(c => activeCategory === 'all' || c.category === activeCategory.toLowerCase())
                        .map(component => {
                          const ComponentIcon = getComponentIcon(component.type);
                          return (
                            <Button
                              key={`${component.type}`}
                              variant="outline"
                              className="h-auto py-4 flex flex-col items-center justify-center gap-2 text-xs cursor-text"
                              onClick={() => {}}>
                              <ComponentIcon className="h-5 w-5" />
                              {component.name}
                            </Button>
                          );
                        })
                      }
                    </div>
                  )}
                  </div>
                </ScrollArea>
              }
            </TabsContent>

            <TabsContent value="links" className="p-0 border-none">
              <div className="flex items-center justify-center h-[76vh]">
                <p className="text-gray">Aucun lien</p>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

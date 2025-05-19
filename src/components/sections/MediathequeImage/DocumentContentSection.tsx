'use client'

import { Ressource } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { apiClient } from "@/lib/axios";
import { formatDateToLocal } from "@/lib/utils";
import {
  EyeIcon,
  LayoutGridIcon,
  ListFilter,
  ListOrdered,
  MoreHorizontalIcon,
  SearchIcon,
  Trash2Icon
} from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { toast } from "sonner";

export const DocumentContentSection = (): JSX.Element => {

  const [dislayMode, setDislayMode] = useState<'list' | 'grid'>('grid')

  const [ressources, setRessources] = useState<Ressource[]>([])

  const toggleDisplayMode = () => {
    if (dislayMode === 'list') setDislayMode("grid") 
    else setDislayMode("list")
  }

  const fetchRessources = async () => {
    const response: Ressource[] = await apiClient.get('/api/ressources')
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
            onClick={toggleDisplayMode}
              variant="outline"
              className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg transition-all"
            >
              {
                (dislayMode === 'list') ?
                <LayoutGridIcon className="w-5 h-5" /> :
                <ListOrdered className="w-5 h-5" />
              }
            </Button>
          </div>
        </div>

        <ScrollArea className="w-full h-[calc(80vh)]">
          {
             ( dislayMode === 'list') ?
              <Card className="w-full rounded-2xl bg-white">
                <CardContent className="p-0">
                  <div className="flex flex-col w-full items-start gap-4">
                    <Table>
                      <TableHeader className="bg-[#f9f9f0] rounded-lg">
                        <TableRow className="border-none">
                          <TableHead className="font-body-3 text-noir-dashboard text-sm">
                            Nom document
                          </TableHead>
                          <TableHead className="font-body-3 text-noir-dashboard text-sm">
                            Format
                          </TableHead>
                          <TableHead className="font-body-3 text-noir-dashboard text-sm">
                            Ajouté le
                          </TableHead>
                          <TableHead className="font-body-3 text-noir-dashboard text-sm">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ressources.map((doc, index) => (
                          <TableRow key={index} className="border-b border-[#d9d9d9]">
                            <TableCell className="font-body-3 text-noir-dashboard py-3.5">
                              {doc.titre_fr}
                            </TableCell>
                            <TableCell className="font-body-3 text-gray py-3.5 uppercase">
                              {doc.type}
                            </TableCell>
                            <TableCell className="font-body-3 text-noir-dashboard py-3.5">
                              {formatDateToLocal((new Date(doc.created_at)).toISOString())}
                            </TableCell>
                            <TableCell className="py-3.5">
                              <div className="flex items-center gap-[17px]">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-0 flex items-center gap-1">
                                  <EyeIcon className="w-[18px] h-[18px]" />
                                  <span className="font-body-3 text-noir-dashboard">
                                    Voir
                                  </span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-0 flex items-center gap-1">
                                  <Trash2Icon className="w-4 h-4" />
                                  <span className="font-body-3 text-noir-dashboard">
                                    Supprimer
                                  </span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card> :
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3">
                {/* Document cards grid */}
                {ressources.map((doc, index) => (
                  <Card
                    key={index}
                    className="bg-[#f9f9f0] rounded-2xl">
                    <CardContent className="p-0">
                      <div className="mt-2 mx-auto">
                        <div className="flex flex-row justify-end items-center px-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild >
                              <Button
                                variant="ghost"
                                className="w-[18px] h-[18px] p-0">
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
                            <span className="font-body-3 text-[length:var(--body-3-font-size)] uppercase text-gray text-center">
                              {doc.type}
                            </span>
                          </div>
                          <p className="font-body-3 text-[length:var(--body-3-font-size)] text-noir-dashboard text-center">
                            {doc.titre_fr}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
          }
        </ScrollArea>
      </div>
    </section>
  );
};

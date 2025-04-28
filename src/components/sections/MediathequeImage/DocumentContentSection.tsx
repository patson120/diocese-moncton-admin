'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  EyeIcon,
  LayoutGridIcon,
  ListFilter,
  ListMinusIcon,
  ListOrdered,
  MoreHorizontalIcon,
  SearchIcon,
  Trash2Icon
} from "lucide-react";
import { JSX, useState } from "react";

export const DocumentContentSection = (): JSX.Element => {

  const [dislayMode, setDislayMode] = useState<'list' | 'grid'>('grid')

  // Document data for mapping
  const documents = [
    {
      name: "Bulletin diocésain mensuel",
      format: "PDF",
      date: "12/03/2025",
    },
    {
      name: "Calendrier des pèlerinages organisés",
      format: "EXCEL",
      date: "12/03/2025",
    },
    {
      name: "Lettre pastorale de l'évêque",
      format: "PDF",
      date: "12/03/2025",
    },
    {
      name: "Fiches de catéchèse pour jeunes et adultes",
      format: "WORD",
      date: "12/03/2025",
    },
    {
      name: "Catalogue des formations diocésaines",
      format: "PDF",
      date: "12/03/2025",
    },
    {
      name: "Guide de la vie paroissiale",
      format: "PDF",
      date: "12/03/2025",
    },
    {
      name: "Document de réflexion synodale",
      format: "PDF",
      date: "12/03/2025",
    },
    {
      name: "Charte de bénévolat dans le diocèse",
      format: "WORD",
      date: "12/03/2025",
    },
  ];

  const toggleDisplayMode = () => {
    if (dislayMode === 'list') setDislayMode("grid") 
    else setDislayMode("list")
  }

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
                        {documents.map((document, index) => (
                          <TableRow key={index} className="border-b border-[#d9d9d9]">
                            <TableCell className="font-body-3 text-noir-dashboard py-3.5">
                              {document.name}
                            </TableCell>
                            <TableCell className="font-body-3 text-gray py-3.5">
                              {document.format}
                            </TableCell>
                            <TableCell className="font-body-3 text-noir-dashboard py-3.5">
                              {document.date}
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
                {documents.map((doc, index) => (
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
                              {doc.format}
                            </span>
                          </div>
                          <p className="font-body-3 text-[length:var(--body-3-font-size)] text-noir-dashboard text-center">
                            {doc.name}
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

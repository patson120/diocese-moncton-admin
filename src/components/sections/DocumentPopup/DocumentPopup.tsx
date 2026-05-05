
'use client'

import { Dossier, Ressource } from '@/app/types';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader } from "@/components/ui/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiClient } from "@/lib/axios";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { JSX, useEffect, useState } from "react";


export const DocumentPopup = ({ children, setSelectedDocument }: {
  children: any, setSelectedDocument: (file: Ressource | undefined) => void
}): JSX.Element => {

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [documents, setDocuments] = useState<Ressource[]>([])

  const [folders, setFolders] = useState<Dossier[]>([]);
  const [folderId, setFolderId] = useState("0");

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const response: Ressource[] = await apiClient.get(folderId == "0" ? `/api/ressources?type=document` : `/api/ressources?type=document&dossier_id=${folderId}`);
      setDocuments(response)
      setTimeout(() => {
        setIsLoading(false)
      }, 2000);
    })()
  }, [folderId])

  useEffect(() => {
    (async () => {
      const response: Dossier[] = await apiClient.get("/api/dossiers")
      setFolders(response)
    })()
  }, [])

  const handleSelectedImage = (doc: Ressource) => {
    setSelectedDocument({
      ...doc,
     /*  ...img,
      path: `${process.env.NEXT_PUBLIC_API_URL}/${img.path}` */
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-1/2  p-0 rounded-2xl">
        <DialogHeader className="border-b border-neutral-200 p-4 rounded-t-2xl">
          <DialogTitle className="text-xl px-5 font-bold leading-7">
            Mediathèque
          </DialogTitle>
        </DialogHeader>

        <section className="flex flex-col w-full p-8 pt-2 space-y-4">
          <div className="flex flex-col bg-white w-full items-start gap-4 rounded-2xl">
            <div className="flex flex-col w-full space-y-2 z-50 mx-1 mb-3">
              <Label className="mb-1">Choisir un repertoire...</Label>
              <Select
                onValueChange={setFolderId}
                defaultValue={folderId}>
                <SelectTrigger className="h-11 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                  <SelectValue placeholder="Sélectionnez un dossier" />
                </SelectTrigger>
                <SelectContent className="bg-white h-[180px] overflow-y-scroll v-scroll border border-neutral-200 rounded-md cursor-pointer">
                  <SelectItem className="w-full px-6" value="0">Tous</SelectItem>
                  {
                    folders && folders.map(f => (
                      <SelectItem className="w-full text-black px-6 cursor-pointer" key={f.id} value={`${f.id}`}>{f.titre_fr}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            <p className="text-gray mb-3">Liste des fichiers ({documents.length} fichiers ) </p>
            <ScrollArea className="w-full h-[calc(50vh)]">
              <>
                {
                  isLoading ?
                    <div className="h-[calc(50vh)] w-full flex flex-col justify-center items-center">
                      <Loader className="w-10 h-10" />
                      <p className="text-center text-muted-foreground mt-2">Loading...</p>
                    </div> :
                    /* Document grid  */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {
                        documents.map((doc, index) => (
                          <Card
                            key={index}
                            onClick={() => handleSelectedImage(doc)}
                            className="bg-[#f9f9f0] rounded-2xl cursor-pointer">
                            <CardContent className="p-0">
                              <div className="mt-2 mx-auto">
                                <div className="flex flex-col items-center gap-3 my-4">
                                  <div className="w-[100px] h-20 bg-white rounded-2xl border border-solid border-[#d9d9d9] flex items-center justify-center">
                                    <span className="font-body-3 text-[length:var(--body-3-font-size)] uppercase text-gray text-center">
                                      {doc.media.split(".")[1]}
                                    </span>
                                  </div>
                                  <p className="font-body-3 text-[length:var(--body-3-font-size)] text-noir-dashboard text-center">
                                    {doc.titre_fr}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      }
                    </div>
                }
              </>
            </ScrollArea>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

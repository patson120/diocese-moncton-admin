
'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { apiClient } from "@/lib/axios";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { JSX, useEffect, useState } from "react";
import { Dossier, Image as ImageType } from '@/app/types';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Loader } from "@/components/ui/loader";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";


export const GaleryPopup = ({ children, setSelectedImage }: {
  children: any, setSelectedImage: (img: ImageType) => void
}): JSX.Element => {

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<ImageType[]>([])

  const [folders, setFolders] = useState<Dossier[]>([]);
  const [folderId, setFolderId] = useState("0");

  useEffect(() => {
    ( async () => {
      setIsLoading(true)
      const response: ImageType[] = await apiClient.get( folderId =="0" ?  `/api/galeries` : `/api/galeries?dossier_id=${folderId}`);
      setImages(response)
      setIsLoading(false)
    }) ()
  }, [folderId])

  useEffect(() => {
    (async () => {
      const response: Dossier[] = await apiClient.get("/api/dossiers")
      setFolders(response)
    })()
  }, [])

  const handleSelectedImage = (img: ImageType) => {
    setSelectedImage({
      ...img,
      path: `${process.env.NEXT_PUBLIC_API_URL}/${img.path}`
    } as ImageType)
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
                    <SelectContent className="bg-white h-[180px] overflow-y-scroll v-scroll border border-neutral-200 rounded-md">
                      <SelectItem className="w-full px-6" value="0">Tous</SelectItem>
                      {
                        folders && folders.map(f => (
                          <SelectItem className="w-full text-black px-6" key={f.id} value={`${f.id}`}>{f.titre_fr}</SelectItem>
                        ))
                      }
                    </SelectContent>
                </Select>
              </div>
              
              <p className="text-gray mb-3">Choisir une image ({images.length} fichiers ) </p>
              <ScrollArea className="w-full h-[calc(50vh)]">
                  <>
                      {
                        isLoading ? 
                        <div className="h-[calc(70vh)] w-full flex flex-col justify-center items-center">
                          <Loader className="w-10 h-10" />
                          <p className="text-center text-muted-foreground mt-2">Loading...</p>
                        </div> :
                        // {/* Image grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {
                            images.map((image, index) => (
                              <Card
                                  key={index}
                                  onClick={() => handleSelectedImage(image) }
                                  className="overflow-hidden rounded-lg border-none relative shrink-0 min-h-[150px] max-h-[200px] cursor-pointer">
                                  <Image
                                      alt={`Image ${index + 1}`}
                                      src={`${process.env.NEXT_PUBLIC_API_URL}/${image.path!}`}
                                      style={{ objectFit: 'cover' }}
                                      fill
                                      priority
                                  />
                                  
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

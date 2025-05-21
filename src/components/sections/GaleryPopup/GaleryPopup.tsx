
'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { apiClient } from "@/lib/axios";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { JSX, useEffect, useState } from "react";
import { Image as ImageType } from '@/app/types';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Loader } from "@/components/ui/loader";


export const GaleryPopup = ({ children, setSelectedImage }: {
  children: any, setSelectedImage: (img: ImageType) => void
}): JSX.Element => {

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<ImageType[]>([])

  useEffect(() => {
    ( async () => {
      setIsLoading(true)
      const response: ImageType[] = await apiClient.get('/api/galeries');
      setImages(response)
      setIsLoading(false)
    }) ()
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
          <p className="text-gray">Choisir une image</p>
          <div className="flex flex-col bg-white w-full items-start gap-6 rounded-2xl">
              <ScrollArea className="w-full h-[calc(70vh)]">
                  <>
                      {
                        isLoading ? 
                        <div className="h-[calc(70vh)] w-full flex flex-col justify-center items-center">
                          <Loader className="w-10 h-10" />
                          <p className="text-center text-muted-foreground mt-2">Loading...</p>
                        </div> :
                        // {/* Image grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {images.map((image, index) => (
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
                          ))}
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

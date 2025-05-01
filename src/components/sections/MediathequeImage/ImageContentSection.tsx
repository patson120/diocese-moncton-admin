'use client'

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { apiClient } from '@/lib/axios';
import Image from 'next/image';
import { Image as ImageType } from '../../../../types';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Eye, InfoIcon, Trash2Icon } from 'lucide-react';
import { Loader } from '@/components/ui/loader';

export default function ImageContentSection() {
    
   const [images, setImages] = useState<ImageType[]>([])
   const [selectedImage, setSelectedImage] = useState<ImageType | undefined>()
   const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
     ( async () => {
        const response: ImageType[] = await apiClient.get('/api/galeries');
        setImages(response)
     }) ()
    }, [])

    const handleDeleteImage = async (img?: ImageType) => {
      if (isDeleting) return;
      if (img) {
        setIsDeleting(true);
        try {
          await apiClient.delete(`/api/galeries/${ img.id}`);
          setImages(images.filter(image => image.id !== img.id));
          setSelectedImage(undefined);
        } catch (error) {
          console.error('Error deleting image:', error);
        }
        finally {
          setIsDeleting(false);
        }
      }
    };
    
    return (
        <section className="w-full flex-1 p-6">
            <div className="flex flex-col bg-white w-full items-start gap-6 rounded-2xl p-6">
                <ScrollArea className="w-full h-[calc(80vh)]">
                    {/* Image grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                        {images.map((image, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden rounded-lg border-none relative shrink-0 min-h-[150px] max-h-[200px]">
                                <Image
                                    alt={`Image ${index + 1}`}
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${image.path!}`}
                                    style={{ objectFit: 'cover' }}
                                    fill
                                    priority
                                />
                                <div className='absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out'>
                                    <div className='flex items-center gap-2'>
                                      <button onClick={() => {setSelectedImage(image)}} className='h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center'>
                                        <Eye className='w-5 h-5'/>
                                      </button>
                                      <button onClick={() => handleDeleteImage(image)} className='h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center'>
                                        { isDeleting ? <Loader className="h-5 w-5" /> : <Trash2Icon className='w-5 h-5'/>}
                                      </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            <Dialog open={selectedImage != undefined} onOpenChange={() => setSelectedImage(undefined)}>
                <DialogContent aria-describedby={undefined} className="max-w-4xl p-3 rounded-2xl">
                  <DialogClose onClick={() => setSelectedImage(undefined)} className="absolute border-none w-5 h-5 top-[14px] right-[14px]">
                  </DialogClose>
                  <DialogHeader className='hidden'>
                      <DialogTitle></DialogTitle>
                  </DialogHeader>
                  <div className='w-full h-[calc(70vh)] relative rounded-xl overflow-hidden'>
                    <Image
                      alt={`Image details`}
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${selectedImage?.path!}`}
                      style={{ objectFit: 'cover' }}
                      fill
                      priority
                    />
                  </div>
                  <div className='flex justify-between items-center gap-3'>
                    <div className='flex gap-3'>
                      <Button onClick={() => setSelectedImage(undefined)} className="px-3.5 py-0 bg-blue text-white rounded-[7px]">
                        <span className="font-body-3 whitespace-nowrap">
                          Fermer
                        </span>
                      </Button>
                      <Button
                        onClick={() => handleDeleteImage(selectedImage)}
                        variant="outline"
                        className=" p-3.5 bg-white rounded-lg border border-solid border-[#d9d9d9]">
                        { isDeleting && <Loader className="h-5 w-5 mr-2" />}
                        <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
                            Supprimer
                        </span>
                      </Button>
                    </div>
                    <div className='flex items-center gap-1'>
                      <InfoIcon className='h-5 w-5' />
                      <p className='text-gray'>{selectedImage?.path.split('/')[selectedImage?.path.split('/').length - 1]}</p>
                    </div>
                  </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}

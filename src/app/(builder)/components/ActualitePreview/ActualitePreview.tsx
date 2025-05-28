
'use client'

import { Actualite } from '@/app/types';
import { ActualiteSkeleton } from "@/components/shared/skeletons";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { JSX, useState } from "react";
import ActualiteDetail from '../ActualiteDetail';
import Footer from "../footer";
import Header from "../header";
import Newsletter from "../newsletter";


export const ActualitePreview = ({ children, actualite }: {
  children: any, actualite: Actualite
}): JSX.Element => {

  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="w-full h-full p-0 border-none">
      <DialogTitle  hidden>Prévisualisation</DialogTitle>
      

        {/** Header */}
        <div className='mb-[108px]'>
          <Header />
        </div>

        {/** Main content */}
        <div className='absolute bottom-20 left-0 right-0 z-30 '>
          <div className='w-[500px] p-4 mx-auto rounded-xl bg-white shadow-lg shadow-black/10'>
            <div className='flex items-center justify-between'>
              <h1 className='heading-3'>Aperçu de l'article</h1>
              <Button
                variant="outline"
                size="sm"
                className="text-white w-min bg-blue hover:bg-primary hover:text-white"
                onClick={() => setOpen(false)}>
                  Retourner sur le site
              </Button>
            </div>
          </div>
        </div>


        <ScrollArea className="w-full h-[calc(100vh)]">
          <section>
            <div className='flex justify-between items-center border-b border-b-gray-100 '>
              <div className="container max-margin py-3 flex justify-between items-center ">
                <Breadcrumbs
                  breadcrumbs={[
                    { label: 'Accueil', href: '' },
                    {
                      label: 'Actualités',
                      href: '',
                    },
                    {
                      label: "Titre de l'actualité" ,
                      href: '',
                      active: true,
                    },
                  ]}
                />
              <div className='space-x-2'>
                <Button
                    size={'sm'}
                    variant="outline"
                    className={`border-gray-100 text-gray w-min bg-transparent hover:bg-transparent`}>
                    Article précédent
                </Button>
                <Button
                    size={'sm'}
                    variant="outline"
                    className={`border-gray-100 text-gray w-min bg-transparent hover:bg-transparent`}>
                    Article suivant
                </Button>
            </div>
              </div>
            </div>

            <div className='md:container md:max-margin py-0' >
              <div className='grid grid-cols-1 lg:grid-cols-6 md:gap-6 lg:gap-14 py-4 lg:py-8'>
                <ActualiteDetail actualite={actualite} />
                <div className='container max-margin py-0 md:px-0 md:mx-0 col-span-full lg:col-span-2 flex flex-col space-y-4 mb-10'>
                    <h1 className='heading-3 text-xl font-extrabold'>Articles relatifs</h1>
                    <div className="flex md:flex-col gap-4 overflow-x-scroll md:overflow-x-hidden pb-6 md:pb-0 ">
                        {
                            [1, 2, 3, 4].map((item) => (
                                <ActualiteSkeleton key={item} />
                            ))
                        }
                    </div>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <Newsletter />

          {/* Footer */}
          <Footer />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

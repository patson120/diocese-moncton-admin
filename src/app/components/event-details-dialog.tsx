

import { Event } from '@/app/types/event';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { formatDateToLocal } from '@/lib/utils'
import React from 'react'

interface EventDetailsDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EventDetailsDialog({ event, open, onOpenChange }: EventDetailsDialogProps) {
  if (!event) return null;
  const categories = [
    "Fomation",
    "Célébration",
    "Communautaire"
  ]
  return (
    <Sheet open={open} onOpenChange={onOpenChange} >
      <SheetContent className="max-w-3xl min-w-3xl">
        <SheetHeader>
          <SheetTitle hidden>Détails de l'évènement</SheetTitle>
        </SheetHeader>
        <div className='absolute top-0 left-0 right-0 z-[1] bg-white'>
          {/* Header with action buttons */}
          <header className="w-full h-20 border-b border-[#d9d9d9] flex items-center justify-between px-12">
            <Button onClick={() => onOpenChange(false)} variant="outline" className="h-10">
              Fermer
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" className="h-10">
                Désactiver
              </Button>
              <Button className="h-10 bg-blue text-white hover:bg-blue/90">
                Modifier
              </Button>
            </div>
          </header>
        </div>

        {/* Scrollable content area */}
        <div className="h-[calc(100%-80px)] mt-24 px-6 v-scroll overflow-y-scroll">
          <div className="flex flex-col gap-6">
            {/* Event header with image and basic info */}
            <section
              className="w-full h-[260px] aspect-auto rounded-2xl bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url("/image-5.png")` }}
            />
            {/* Content section */}
              <section className="flex flex-col gap-2 ">
                <div className='flex justify-between items-center'>
                    <p className='text-gray font-medium'>
                      {formatDateToLocal((new Date()).toISOString())}
                    </p>
                </div>
                <div className='flex flex-col space-y-7'>
                  <div className='flex flex-col space-y-3'>
                    <h3 className='text-3xl font-bold'>Cheminer ensemble durant le carême 2025</h3>
                    <p className='text-gray'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                  </div>
                  <div className='flex justify-start items-center gap-3'>
                    <h3 className='font-bold'>Type évènement</h3>
                    {
                      categories.map((cat, index) =>(
                        <span key={index} className='px-4 py-2 border border-black/20 rounded-xl text-gray'>{cat}</span>
                      ))
                    }
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <h3 className='font-bold text-2xl'>Lieu</h3>
                    <p className='text-gray'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                  <div className='flex flex-col space-y-3'>
                    <h3 className='font-bold text-2xl'>Sur la carte</h3>
                    <p className='bg-[#F1F3F6] h-96 rounded-lg'></p>
                  </div>
                </div>
              </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

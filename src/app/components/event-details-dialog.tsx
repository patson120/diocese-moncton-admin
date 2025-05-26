'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { formatDateToLocal } from '@/lib/utils';
import { Event } from '../types';
import { useState } from 'react';
import { apiClient } from '@/lib/axios';
import { toast } from 'sonner';
import { Loader } from '@/components/ui/loader';
import { EditEventFormSection } from '@/components/sections/EventSection/EditEventFormSection';
import { MapContainer } from '@/components/sections/MapSection/map-container';

interface EventDetailsDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EventDetailsDialog({ event, open, onOpenChange }: EventDetailsDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isStatusChanging, setIsStatusChanging] = useState(false)
  if (!event) return null;

  // Function to handle event deletion
  const handleDeleteEvent = async () => {
    setIsDeleting(true);
    try {
      await apiClient.delete(`/api/evenements/${event.id}`);
      window.location.reload(); // Reload the page to reflect changes      
    } catch (error) {
      toast.warning(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Error deleting event: {JSON.stringify(error)}
        </div>
      )
    } finally {
      setIsDeleting(false);
      onOpenChange(false); // Close the dialog after deletion
    }
  }

  const handleUpdatedStatut = async () => {
    if(isStatusChanging) return
    setIsStatusChanging(true);
    try {
      await apiClient.put(`/api/evenements/${event.id}`, {
        ...event,
        etat:  event.etat === 1 ? -1 : 1
      });
      window.location.reload(); // Reload the page to reflect changes      
    } catch (error) {
      toast.warning(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Error updating event: {JSON.stringify(error)}
        </div>
      )
    } finally {
      setIsStatusChanging(false);
      onOpenChange(false); // Close the dialog after deletion
    }
  }
  return (
    <Sheet open={open} onOpenChange={onOpenChange} >
      <SheetContent aria-describedby={undefined} className="max-w-3xl min-w-[620px]">
        <SheetHeader>
          <SheetTitle hidden>Détails de l'évènement - {event.titre_fr} </SheetTitle>
        </SheetHeader>
        <div className='absolute top-0 left-0 right-0 z-[1] bg-white'>
          {/* Header with action buttons */}
          <header className="w-full h-20 border-b border-[#d9d9d9] flex items-center justify-between px-12">
            <Button onClick={() => onOpenChange(false)} variant="outline" className="h-10">
              Fermer
            </Button>
            <div className="flex gap-2">
              <EditEventFormSection eventData={event}/>
              <Button onClick={handleDeleteEvent} className="h-10 bg-red-500 text-white hover:bg-blue/90">
                { isDeleting && <Loader className='h-5 w-5, mr-2' /> }
                Supprimer
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
              style={{ backgroundImage: `url(${event.galerie.length ? `${process.env.NEXT_PUBLIC_API_URL}/${event?.galerie[0].path}` : "/assets/img/event-details.png"})` }}
            />
            {/* Content section */}
            <section className="flex flex-col gap-2 ">
              <div className='flex justify-between items-center'>
                  <p className='text-gray font-medium'>
                    {formatDateToLocal((new Date(event.date_event)).toISOString())} | <span>{event.heure_event}</span>
                  </p>
              </div>
              <div className='flex flex-col space-y-7'>
                <div className='flex flex-col space-y-3'>
                  <h3 className='text-3xl font-bold'>{event.titre_fr}</h3>
                  <p className='text-gray'>{event.description_fr}</p>
                </div>
                <div className='flex justify-start items-center gap-3'>
                  <h3 className='font-bold'>Type évènement</h3>
                  <span className='px-4 py-2 border border-black/20 rounded-xl text-gray'>{event.categorie.intitule_fr}</span>
                </div>
                <div className='flex flex-col space-y-2'>
                  <h3 className='font-bold text-2xl'>Lieu</h3>
                  <p className='text-gray'>{event.lieu}</p>
                </div>
                <div className='flex flex-col space-y-3'>
                  <h3 className='font-bold text-2xl'>Sur la carte</h3>
                  <div className='bg-[#F1F3F6] h-96 rounded-lg overflow-hidden'>
                    {/** Map view */}
                    <MapContainer 
                      showSearchBar={false}
                      location={{
                        address: `${event?.lieu.split(";")[1]}`,
                        name: `${event?.lieu.split(";")[0]}`,
                        lat: event?.gps ? Number(event?.gps.split(";")[0]) : 46.091091,
                        lng: event?.gps ? Number(event?.gps.split(";")[1]) : -64.781880,
                        placeId: (new Date()).getTime().toString()
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

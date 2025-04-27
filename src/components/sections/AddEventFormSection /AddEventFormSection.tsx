
'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { Textarea } from "@/components/ui/textarea";
import { apiClient } from "@/lib/axios";
import { cn, handleImageUpload } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import { toast } from "sonner";
import { Category } from "../../../../types";

export const AddEventFormSection = (): JSX.Element => {
 
  const [isLoading, setIsloading] = useState(false)
  const [step, setStep] = useState(1)
  const [coverImage, setCoverImage] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category>()

  const [event, setEvent] = useState({
    paroisse_id: 1,
    categorie_id: 1,
    titre_fr: '',
    titre_en: '',
    heure_event: '',
    date_event: '',
    lieu: 'Moncton',
    gps: '48.8566;2.3522',
    contact: '670000065',
    is_planifier: 0,
    date_planification: '',
    description_fr: '',
    description_en: '',
  })

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await handleImageUpload(file);
      // setFileImage(file)
      setCoverImage(imageUrl);
    }
  };

  const getCategories = async () => {
    const response: Category[] = await apiClient.get(`/api/categories?menu=event`)
    setSelectedCategory(response[0])
    setCategories(response)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleCreateEvent = async () => {
    if (isLoading) return
    setIsloading(true)

    const response: any = await apiClient.post('/api/evenements', {...event, categorie_id: selectedCategory?.id})
    if (response.id) {
      toast.success("Evènement enregistré avec succès !")
    }
    else {
      toast.warning(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          {JSON.stringify(response)}
        </div>
      )
    }

    setIsloading(false)
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 gap-2 px-3.5 py-0 bg-blue rounded-[7px] text-white">
          <PlusIcon className="w-5 h-5" />
          <span className="font-body-3 text-sm">Ajouter évènement</span>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="w-[500px] p-0 gap-0 rounded-2xl overflow-hidden">
        <DialogHeader className="border-b border-neutral-200 p-4 rounded-t-2xl">
          <DialogTitle className="text-lg font-bold leading-7">
            Créer un évènement
          </DialogTitle>
        </DialogHeader>
        {
          ( step === 1 || step == 2) && 
          <div className="grid grid-cols-2 items-center gap-0">
            <div className={cn('h-12 flex justify-center items-center', 
              step === 1 ? 'bg-[#E1E7EF]' : 'bg-[#F5F7FA]'
            )}>
              <p className={cn('font-bold', 
                step === 1  ?'text-blue'  : 'text-noir-dashboard'
              )}>Français</p>
            </div>
            <div className={cn('h-12 flex justify-center items-center', 
              step === 2 ? 'bg-[#E1E7EF]' : 'bg-[#F5F7FA]'
            )}>
              <p className={cn('font-bold', 
                step === 2  ?'text-blue'  : 'text-noir-dashboard'
              )}>Anglais</p>
            </div>
            
          </div>
        }

        {
          step === 1 &&
          <div className="flex flex-col w-full p-10 pt-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="titre_fr">Titre évènement</Label>
              <Input
                value={event.titre_fr}
                onChange={(e) => setEvent(prev => ({ ...prev, titre_fr: e.target.value })) }
                className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Entrez le nom de la paroisse"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description_fr">Description de l'évènement</Label>
              <Textarea 
                rows={5}
                value={event.description_fr}
                onChange={(e) => setEvent(prev => ({ ...prev, description_fr: e.target.value })) }
                className="px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Parlez du but de l'évènement"
               />
            </div>
            <div>
              <Button onClick={() => setStep(2)} className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                Suivant
              </Button>
            </div>
          </div>
        }
        {
          step === 2 &&
          <div className="flex flex-col w-full p-10 pt-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="titre_en">Event title</Label>
              <Input
                value={event.titre_en}
                onChange={(e) => setEvent(prev => ({ ...prev, titre_en: e.target.value })) }
                className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Enter the title of event"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description_en">Event description</Label>
              <Textarea 
                rows={5}
                value={event.description_en}
                onChange={(e) => setEvent(prev => ({ ...prev, description_en: e.target.value })) }
                className="px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Talk about the goal of event..."
               />
            </div>

            <div className="flex flex-row gap-4">
              <Button variant={'outline'} onClick={() => setStep(1)} className="w-min px-8 mt-8 h-12 rounded-lg">
                Retour
              </Button>
              <Button onClick={() => setStep(3)} className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                Suivant
              </Button>
            </div>
          </div>
        }
        {
          step === 3 &&
          <div className="flex flex-col w-full p-10 px-6 pt-6 space-y-6">
            <div className='grid grid-cols-2 gap-3 w-full'>
                <div className="gap-2 self-stretch !w-full">
                    <Label htmlFor="role">Jour</Label>
                    <Input
                      value={event.date_event}
                      onChange={(e) => setEvent(prev => ({ ...prev, date_event: e.target.value }))}
                      className="h-11 inline-block bg-white rounded-xl border border-solid border-[#d9d9d9]"
                      type='date'
                    />
                </div>
                <div className="gap-2 self-stretch !w-full">
                    <Label htmlFor="role">Heure</Label>
                    <Input
                      value={event.heure_event}
                      onChange={(e) => setEvent(prev => ({ ...prev, heure_event: e.target.value }))}
                      className="inline-block h-11 bg-white rounded-xl border border-solid border-[#d9d9d9]"
                      type='time'
                    />
                </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="categorie" className="mb-2">Sélectionnez une catégorie</Label>
              <div className="flex flex-wrap gap-3">
                {
                  categories.map( item => (
                    <div 
                      onClick={() => setSelectedCategory(item)}
                      key={item.id} 
                      className={cn(
                        'px-5 py-2 border border-gray/10 rounded-full cursor-pointer',
                        item.id === selectedCategory?.id && 'bg-blue text-white border-none'
                      )}>{item.intitule_fr}</div>
                  ))
                }
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="categorie" className="mb-2">Image de couverture évènement</Label>
              <div className="h-44 w-full bg-[#f0f0f0] rounded-md relative flex justify-center items-center">
                <Image
                  width={40}
                  height={40}
                  alt="Vector"
                  src="/vector.svg"
                />
                <Input
                  accept="image/png,jpg,jpeg"
                  type="file"
                  onChange={handleCoverImageChange}
                  className="h-full w-full absolute cursor-pointer inset-0 opacity-0 z-[3]"
                />
              </div>
            </div>

            


            <div className="flex flex-row gap-4">
              <Button variant={'outline'} onClick={() => setStep(2)} className="w-min px-8 mt-8 h-12 rounded-lg">
                Retour
              </Button>
              <Button onClick={() => setStep(4)} className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                Suivant
              </Button>
            </div>
          </div>
        }

        {
          step === 4 &&
          <div className="flex flex-col w-full p-10 pt-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="contact_evenement">Contact</Label>
              <Input
                value={event.contact}
                onChange={(e) => setEvent(prev => ({ ...prev, contact: e.target.value })) }
                className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Entrez un contact"
              />
            </div>
            <h1 className="font-bold">Emplacement sur la map</h1>
            <div className="h-80 w-full bg-black/5 rounded-lg"></div>
            <div className="flex flex-col space-y-2">
              <h1 className="font-bold">Localisation</h1>
              <p className=" text-black">Entrez une adresse pour voir les informations s'afficher</p>
            </div>
            
            <div className="flex flex-row gap-4">
              <Button variant={'outline'} onClick={() => setStep(3)} className="w-min px-8 mt-8 h-12 rounded-lg">
                Retour
              </Button>
              <Button onClick={handleCreateEvent} className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                { isLoading && <Loader className='text-white mr-2' /> }
                Ajouter l'évènement
              </Button>
            </div>
          </div>
        }
      </DialogContent>
    </Dialog>
  );


};

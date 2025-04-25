
'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn, handleImageUpload } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { JSX, useState } from "react";

export const AddEventFormSection = (): JSX.Element => {
 
  const [step, setStep] = useState(1)
  const [coverImage, setCoverImage] = useState('')
  const [categories, setCategories] = useState([
    {
      id: '1',
      title: 'Formation'
    },
    {
      id: '2',
      title: 'Communautaire'
    },
    {
      id: '3',
      title: 'Célébration'
    },
    {
      id: '4',
      title: 'Information'
    },
    {
      id: '5',
      title: 'Pastorale'
    },
    {
      id: '6',
      title: 'Concert'
    },
    {
      id: '7',
      title: 'Ressourcement'
    },
    {
      id: '8',
      title: 'Centre diocésain'
    },
  ])

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await handleImageUpload(file);
      // setFileImage(file)
      setCoverImage(imageUrl);
    }
  };


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
                className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Entrez le nom de la paroisse"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description_fr">Description de l'évènement</Label>
              <Textarea 
                rows={5}
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
                className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Enter the title of event"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description_en">Event description</Label>
              <Textarea 
                rows={5}
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
                      // value={''}
                      // onChange={handleSelectedDate}
                      className="h-11 inline-block bg-white rounded-xl border border-solid border-[#d9d9d9]"
                      type='date'
                    />
                </div>
                <div className="gap-2 self-stretch !w-full">
                    <Label htmlFor="role">Heure</Label>
                    <Input
                      // value={''}
                      // onChange={handleSelectedHour}
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
                    <div key={item.id} className="px-5 py-2 border border-gray/10 rounded-full">{item.title}</div>
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
              <Button onClick={() => {setStep(1)
              }} className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                Ajouter l'évènement
              </Button>
            </div>
          </div>
        }
      </DialogContent>
    </Dialog>
  );


};


'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { JSX, useState } from "react";

export const AddParishFormSection = (): JSX.Element => {
  const [step, setStep] = useState(1)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 gap-2 px-3.5 py-0 bg-blue rounded-[7px] text-white">
          <PlusIcon className="w-5 h-5" />
          <span className="font-body-3 text-sm">Ajouter une paroisse</span>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="w-[500px] p-0 gap-0 rounded-2xl overflow-hidden">
        <DialogHeader className="border-b border-neutral-200 p-4 rounded-t-2xl">
          <DialogTitle className="text-lg font-bold leading-7">
            Créer une paroisse
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
              <Label htmlFor="nom_fr">Nom</Label>
              <Input
                className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Entrez le nom de la paroisse"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="histoire_fr">Histoire de la paroisse...</Label>
              <Textarea 
                rows={5}
                className="px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Parlez de l'histoire de la paroisse"
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
              <Label htmlFor="nom_en">Parish name</Label>
              <Input
                className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Enter parish name"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="histoire_en">Parish history</Label>
              <Textarea 
                rows={5}
                className="px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Talk about parish history..."
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
          <div className="flex flex-col w-full p-10 pt-6 space-y-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="unite_pastorale">Unité pastorale</Label>
              <Select value={''} onValueChange={() => {}}>
                <SelectTrigger className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                  <SelectValue placeholder="Sélectionnez une unité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unite1">Unité 1</SelectItem>
                  <SelectItem value="unite2">Unité 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='grid grid-cols-2 gap-3 w-full'>
              <div className="gap-2 self-stretch w-full">
                <Label htmlFor="etabli_en">Etabli en</Label>
                <Input
                    // value={''}
                    // onChange={handleSelectedDate}
                    className="h-11 inline-block bg-white rounded-xl border border-solid border-[#d9d9d9]"
                    type='date'
                />
              </div>
              <div className="gap-2 self-stretch !w-full">
                <Label htmlFor="role">Date ordination</Label>
                <Input
                    // value={''}
                    // onChange={()=)> {}}
                    className="inline-block h-11 bg-white rounded-xl border border-solid border-[#d9d9d9]"
                    type='date'
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="premier_cure">Date premier curé</Label>
              <Input
                className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Entrez la date du premier curé"
              />
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
          <div className="flex flex-col w-full p-10 pt-6 space-y-6">
            
            <div className="flex flex-col space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                type="tel"
                className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Entrez le numéro de contact de la paroisse"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="tel"
                className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Entrez l'adresse email de contact de la paroisse"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="site_web">Site internet paroisse</Label>
              <Input
                type="tel"
                className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Entrez l'adresse email de contact de la paroisse"
              />
            </div>
            <div className="flex flex-row gap-4">
              <Button variant={'outline'} onClick={() => setStep(3)} className="w-min px-8 mt-8 h-12 rounded-lg">
                Retour
              </Button>
              <Button onClick={() => setStep(5)} className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                Suivant
              </Button>
            </div>
          </div>
        }
        {
          step === 5 &&
          <div className="flex flex-col w-full p-10 pt-6 space-y-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="jour_messe">Jour de messe</Label>
              <Select value={''} onValueChange={() => {}}>
                <SelectTrigger className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                  <SelectValue placeholder="Sélectionnez un jour de messe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lundi">Lundi</SelectItem>
                  <SelectItem value="mardi">Mardi</SelectItem>
                  <SelectItem value="mercredi">Mercredi</SelectItem>
                  <SelectItem value="jeudi">Jeudi</SelectItem>
                  <SelectItem value="vendredi">Vendredi</SelectItem>
                  <SelectItem value="samedi">Samedi</SelectItem>
                  <SelectItem value="dimanche">Dimanche</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="heure">Sélectionnez l'heure</Label>
              <Select value={''} onValueChange={() => {}}>
                <SelectTrigger className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                  <SelectValue placeholder="Choisir heure(s)" />
                </SelectTrigger>
                <SelectContent>
                  
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="font-bold">Aperçu</h1>
              <div className=" flex flex-wrap gap-2">
                <p className="text-gray">Lundi: 
                  <span className="font-semibold text-black ml-2">6h30,</span>
                  <span className="font-semibold text-black ml-1">14h30,</span>
                  <span className="font-semibold text-black ml-1">17h30</span>
                </p>
                <p className="text-gray">Jeudi: 
                  <span className="font-semibold text-black ml-2">9h00</span>
                </p>
                <p className="text-gray">Dimanche: 
                  <span className="font-semibold text-black ml-2">9h00,</span>
                  <span className="font-semibold text-black ml-1">12h00,</span>
                  <span className="font-semibold text-black ml-1">17h00</span>
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Button variant={'outline'} onClick={() => setStep(4)} className="w-min px-8 mt-8 h-12 rounded-lg">
                Retour
              </Button>
              <Button onClick={() => setStep(6)} className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                Suivant
              </Button>
            </div>
          </div>
        }

        {
          step === 6 &&
          <div className="flex flex-col w-full p-10 pt-6 space-y-6">
            <h1 className="font-bold">Emplacement sur la map</h1>
            <div className="h-80 w-full bg-black/5 rounded-lg"></div>
            <div className="flex flex-col space-y-2">
              <h1 className="font-bold">Localisation</h1>
              <p className=" text-black">Entrez une adresse pour voir les informations s'afficher</p>
            </div>
            
            <div className="flex flex-row gap-4">
              <Button variant={'outline'} onClick={() => setStep(5)} className="w-min px-8 mt-8 h-12 rounded-lg">
                Retour
              </Button>
              <Button onClick={() => {
                
                setStep(1)
              }} className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                Ajouter la paroisse
              </Button>
            </div>
          </div>
        }

      </DialogContent>
    </Dialog>
  );
};

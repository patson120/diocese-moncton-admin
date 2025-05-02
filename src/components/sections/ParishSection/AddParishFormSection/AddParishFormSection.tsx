
'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect, Option } from "@/components/ui/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";


// Generate hours from 00:00 to 23:59 in 30-minute intervals
const generateHourOptions = (): Option[] => {
  const options: Option[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourFormatted = hour.toString().padStart(2, "0");
      const minuteFormatted = minute.toString().padStart(2, "0");
      const timeString = `${hourFormatted}:${minuteFormatted}`;
      options.push({
        value: timeString,
        label: timeString,
      });
    }
  }
  return options;
};

const hourOptions = generateHourOptions();


const defaultParish = {
  type_paroisse_id: '',
  nom_fr: '',
  nom_en: '',
  adresse: '',
  telephone: '',
  email: '',
  site_web: '',
  code_postal: '',
  lien_youtube: '',
  pretre_responsable: '',
  etabli_le: '',
  ordonne_le: '',
  premier_cure: '',
  histoire_fr: '',
  histoire_en: '',
  gps: '48.8566;2.3522',
  statut: '1',
}

const formSchemaOne = z.object({
  nom_fr: z.string().min(1, { message: "Nom de la paroisse requis" }),
  histoire_fr: z.string().min(1, { message: "Histoire de la paroisse requise" }),
})
const formSchemaTwo = z.object({
  nom_en: z.string().min(1, { message: "Parish name required" }),
  histoire_en: z.string().min(1, { message: "Parish history required" }),
})
const formSchemaThree = z.object({

})
const formSchemaFour = z.object({
  telephone: z.string().min(1, { message: "Téléphone requis" }),
  email: z.string().email({ message: "Email requis"}),
  site_web: z.string().min(1, { message: "Site internet requis" }),
})

const formSchemaFive = z.object({
  selectedHours: z.array(z.string()), // Make this required
});

export const AddParishFormSection = (): JSX.Element => {
  const [step, setStep] = useState(1)

  // Forms
  const formOne = useForm<z.infer<typeof formSchemaOne>>({
    resolver: zodResolver(formSchemaOne),
    defaultValues: {
      nom_fr: "",
      histoire_fr: "",
    },
  });

  const formTwo = useForm<z.infer<typeof formSchemaTwo>>({
    resolver: zodResolver(formSchemaTwo),
    defaultValues: {
      nom_en: "",
      histoire_en: "",
    },
  });

  const formThree = useForm<z.infer<typeof formSchemaThree>>({
    resolver: zodResolver(formSchemaThree),
    defaultValues: {
      unite_pastorale: "",
      etabli_le: "",
      ordonne_le: "",
      premier_cure: "",
    },
  });

  const formFour = useForm<z.infer<typeof formSchemaFour>>({
    resolver: zodResolver(formSchemaFour),
    defaultValues: {
      telephone: "",
      email: "",
      site_web: "",
    },
  });

  const formFive = useForm<z.infer<typeof formSchemaFive>>({
    resolver: zodResolver(formSchemaFive),
    defaultValues: {
      selectedHours: [], // Ensure this is initialized as an empty array
    },
  });

  const onSubmitFirst = async (values: z.infer<typeof formSchemaOne>) => {
    console.log(values);
    setStep(2)
  }

  const onSubmitSecond = async (values: z.infer<typeof formSchemaTwo>) => {
    console.log(values);
    setStep(3)
  }

  const onSubmitFour = async (values: z.infer<typeof formSchemaFour>) => {
    console.log(values);
    setStep(5)
  }

  const onSubmitFive = async (values: z.infer<typeof formSchemaFive>) => {
    console.log(values);
    setStep(6)
  }

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
            <Form {...formOne}>
              <form onSubmit={formOne.handleSubmit(onSubmitFirst)} className="space-y-4">
                <FormField
                  control={formOne.control}
                  name="nom_fr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Entrez le nom de la paroisse" {...field}
                          className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formOne.control}
                  name="histoire_fr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Histoire de la paroisse</FormLabel>
                      <FormControl>
                        {/* Textarea */}
                        <Textarea
                          {...field}
                          rows={5}
                          placeholder="Parlez de l'histoire de la paroisse"
                          className="min-h-20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button type="submit" className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                    Suivant
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        }
        {
          step === 2 &&
          <div className="flex flex-col w-full p-10 pt-6 space-y-4">
            <Form {...formTwo}>
              <form onSubmit={formTwo.handleSubmit(onSubmitSecond)} className="space-y-4">
                <FormField
                  control={formTwo.control}
                  name="nom_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parish name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter parish name" {...field}
                          className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formTwo.control}
                  name="histoire_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parish history</FormLabel>
                      <FormControl>
                        {/* Textarea */}
                        <Textarea
                          {...field}
                          rows={5}
                          placeholder="Talk about parish history..."
                          className="min-h-20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-4">
                  <Button variant={'outline'} onClick={() => setStep(1)} className="w-min px-8 mt-8 h-12 rounded-lg">
                    Retour
                  </Button>
                  <Button type="submit" className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                    Suivant
                  </Button>
                </div>
              </form>
            </Form>
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
            <Form {...formFour}>
              <form onSubmit={formFour.handleSubmit(onSubmitFour)} className="space-y-4">
                <FormField
                  control={formFour.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Entrez le numéro de contact de la paroisse" {...field}
                          className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formFour.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Entrez l'adresse email de la paroisse" {...field}
                          className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formFour.control}
                  name="site_web"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site internet paroisse</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="Entrez l'adresse du site" {...field}
                          className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-4">
                  <Button variant={'outline'} onClick={() => setStep(3)} className="w-min px-8 mt-8 h-12 rounded-lg">
                    Retour
                  </Button>
                  <Button type="submit" className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                    Suivant
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        }
        {
          step === 5 &&
          <div className="flex flex-col w-full p-10 pt-6 space-y-6">
            <Form {...formFive}>
              <form onSubmit={formFive.handleSubmit(onSubmitFive)} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="jour_messe">Jour de messe</Label>
                  <Select value={''} onValueChange={(e) => { console.log(e) }} >
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

                <FormField
                  control={formFive.control}
                  name="selectedHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sélectionnez heure(s)</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={hourOptions || []}
                          selected={field.value || []}
                          onChange={(value) => field.onChange(value || [])}
                          placeholder="Sélectionnez heure(s)"
                          className="border-input h-12 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 transition-all duration-300"
                          badgeClassName="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        />
                      </FormControl>
                      {/* 
                        <FormDescription>
                          You can select multiple time slots.
                        </FormDescription>
                      */} 
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant={'outline'} className="w-min px-4 mt-3 h-12 rounded-full">
                  <PlusIcon className="h-5 w-5 mr-2" />
                    Valider
                  </Button>
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
                  <Button type="submit" className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                    Suivant
                  </Button>
                </div>
              </form>
            </Form>
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
              <Button onClick={() => {}} className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                Ajouter la paroisse
              </Button>
            </div>
          </div>
        }
      </DialogContent>
    </Dialog>
  );
};


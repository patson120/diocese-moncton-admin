
'use client'

import { Image as ImageType, Location, Member, Paroisse, TypeParoisse } from "@/app/types";
import { Editor } from "@/components/Editor/Editor";
import { MapContainer } from "@/components/sections/MapSection/map-container";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { MultiSelect, Option } from "@/components/ui/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { apiClient } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Pen, PlusIcon } from "lucide-react";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { GaleryPopup } from "../../GaleryPopup";
import useRecaptcha from "@/hooks/useRecaptcha";
import ReCAPTCHA from "react-google-recaptcha";


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

const formSchemaOne = z.object({
  nom_fr: z.string().min(1, { message: "Nom de la paroisse requis" }),
  histoire_fr: z.string().min(1, { message: "Histoire de la paroisse requise" }),
})
const formSchemaTwo = z.object({
  nom_en: z.string().min(1, { message: "Parish name required" }),
  histoire_en: z.string().min(1, { message: "Parish history required" }),
})
const formSchemaThree = z.object({
  unite_pastorale: z.string().min(1, { message: "Unité pastorale requise" }),
  pretre_responsable: z.string().optional(),
  horaire_bureau: z.string().min(1, { message: "Veuillez renseigner les horaires de bureau" }),
  langue: z.string().min(1, { message: "La langue principale est requise" }),
})

const formSchemaFour = z.object({
  telephone: z.string().min(1, { message: "Téléphone requis" }),
  email: z.string().email({ message: "Email requis"}),
})

const formSchemaFive = z.object({
  jour: z.string().optional(), // .min(1, { message: "Jour de messe requis" }),
  selectedHours: z.array(z.any()) // z.array(z.string()), // Make this required
});

const formSchemaSix= z.object({
  site_web: z.string().optional(), // z.string().min(1, { message: "Site internet requis" }),
  lien_youtube: z.string().optional(),
});

export const EditParishFormSection = ({ parish }: { parish: Paroisse }): JSX.Element => {

  const [openModal, setOpenModal] = useState(false)

  const { captchaToken, handleRecaptchaChange, verifyRecaptchaToken } = useRecaptcha();
  
  const [step, setStep] = useState(1)
  const [horaires, setHoraires] = useState<{[key: string]: any}[]>(
    parish.horaireparoisses?.map(horaire =>  ({ jour: horaire.jour, heures: horaire.heure.split(",")}))
  )
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageType | undefined>(
    parish?.galerie.length ? {
      ...parish?.galerie[0]!,
      path:`${process.env.NEXT_PUBLIC_API_URL}/${parish?.galerie[0].path}`,
      path_en:`${process.env.NEXT_PUBLIC_API_URL}/${parish?.galerie[0].path}`,
    }
    : undefined
  )

  const [horairesBureau, setHorairesBureau] = useState(parish.horaire_bureau!)

  const [location, setLocation] = useState<Location | null>({
    address: `${parish?.adresse.split(";")[1]}`,
    name: `${parish?.adresse.split(";")[0]}`,
    lat: Number(parish?.gps.split(";")[0]),
    lng: Number(parish?.gps.split(";")[1]),
    placeId: (new Date()).getTime().toString()
  });

  const [unitePastorales, setUnitePastorales] = useState<TypeParoisse[]>([])
  const [priests, setPriests] = useState<Member[]>([])

  const jours = [
    { value: 'lundi', label: 'Lundi' },
    { value: 'mardi', label: 'Mardi' },
    { value: 'mercredi', label: 'Mercredi' },
    { value: 'jeudi', label: 'Jeudi' },
    { value: 'vendredi', label: 'Vendredi' },
    { value: 'samedi', label: 'Samedi' },
    { value: 'dimanche', label: 'Dimanche' }
  ]

  // Forms
  const formOne = useForm<z.infer<typeof formSchemaOne>>({
    resolver: zodResolver(formSchemaOne),
    defaultValues: {
      nom_fr: parish.nom || '',
      histoire_fr: parish.histoire || '',
    },
  });

  const formTwo = useForm<z.infer<typeof formSchemaTwo>>({
    resolver: zodResolver(formSchemaTwo),
    defaultValues: {
      nom_en: parish.nom_en || '',
      histoire_en: parish.histoire_en || '',
    },
  });

  const formThree = useForm<z.infer<typeof formSchemaThree>>({
    resolver: zodResolver(formSchemaThree),
    defaultValues: {
      unite_pastorale: `${parish.type_paroisse_id}`,
      pretre_responsable: parish.pretre_responsable ,
      horaire_bureau: `${parish.horaire_bureau}`,
      langue: `${parish.langue}`,
    },
  });

  const formFour = useForm<z.infer<typeof formSchemaFour>>({
    resolver: zodResolver(formSchemaFour),
    defaultValues: {
      telephone: `${parish.telephone}`,
      email: `${parish.email}`,
    },
  });

  const formFive = useForm<z.infer<typeof formSchemaFive>>({
    resolver: zodResolver(formSchemaFive),
    defaultValues: {
      jour: "",
      selectedHours: [], // Ensure this is initialized as an empty array
    },
  });

  const formSix = useForm<z.infer<typeof formSchemaSix>>({
    resolver: zodResolver(formSchemaSix),
    defaultValues: {
      site_web: parish.site_web ?? '',
      lien_youtube: parish.lien_youtube,
    },
  });

  const onSubmitFirst = async (values: z.infer<typeof formSchemaOne>) => {
    setStep(2)
  }

  const onSubmitSecond = async (values: z.infer<typeof formSchemaTwo>) => {
    setStep(3)
  }

  const onSubmitThree = async (values: z.infer<typeof formSchemaThree>) => {
    // console.log(values);
    if (!horairesBureau.trim()){
      formThree.setError("horaire_bureau", { message: "Veuillez renseigner les horaires de bureau"})
    }
    else {setStep(4)}
  }

  const onSubmitFour = async (values: z.infer<typeof formSchemaFour>) => {
    setStep(5)
  }

  const onSubmitFive = async (values: z.infer<typeof formSchemaFive>) => {
    if (formFive.getValues("jour") && formFive.getValues("selectedHours").length  ){
      handleValidateHours()
    }
    setStep(6)
  }

  const onSubmitSix = async (values: z.infer<typeof formSchemaSix>) => {
    setStep(7)
  }

  const handleValidateHours = () => {
    const selectedHours = formFive.getValues("selectedHours");
    const selectedDay = formFive.getValues("jour");

    if (!selectedDay) {
      formFive.setError("jour", { message: "Veuillez sélectionner un jour."})
      return;
    }
    if (selectedHours.length === 0) {
      formFive.setError("selectedHours", { message: "Veuillez sélectionner au moins une heure."})
      return;
    }
    
    else {
      const found = horaires.find(horaire => horaire.jour === selectedDay);
      if (found) {
        const updatedHoraires = horaires.map(horaire => 
          horaire.jour === selectedDay ? { ...horaire, heures: selectedHours.sort((a, b) => a.localeCompare(b)) } : horaire
        );
        setHoraires(updatedHoraires);
      } else {
        setHoraires(prev => ([...prev, { jour: selectedDay, heures: selectedHours.sort((a, b) => a.localeCompare(b)) }]))
      }
      formFive.setValue("selectedHours", [])
    }
  }

  const handleSubmitForm = async () => { 
    // Vérifier si les coordonnées de la paroisse sont fournies
    if (!location){
      toast.error(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Veuillez indiquer la location de la paroisse "{formOne.getValues("nom_fr")}"
        </div>
      )
      return
    }   
    if (isLoading) return
    setIsLoading(true)
    const formdata = new FormData()
    formdata.append("type_paroisse_id", formThree.getValues("unite_pastorale"))
    formdata.append("nom", formOne.getValues("nom_fr"))
    formdata.append("nom_en", formTwo.getValues("nom_en"))
    formdata.append("histoire", formOne.getValues("histoire_fr"))
    formdata.append("histoire_en", formTwo.getValues("histoire_en"))
    formdata.append("telephone", formFour.getValues("telephone"))
    formdata.append("email", formFour.getValues("email"))
    formdata.append("site_web", formSix.getValues("site_web") ?? "")
    formdata.append("lien_youtube", formSix.getValues("lien_youtube") ?? "")
    formdata.append("horaires", horaires.map(item => `${item.jour}=${item.heures.join(";")}`).join(","))
    formdata.append("horaire_bureau", horairesBureau)
    formdata.append("langue", formThree.getValues("langue"))
    formdata.append("pretre_responsable", formThree.getValues("pretre_responsable") ?? "")
    formdata.append("gps", `${location?.lat};${location?.lng}`)
    formdata.append("statut", `${parish.statut}`)
    if (selectedImage?.id){formdata.append("galerie_id", `${selectedImage?.id}`)}
    formdata.append("adresse", `${location?.name};${location?.address}`)
  
    try {
      const recaptchaReponse = await verifyRecaptchaToken();
      const recaptchaData = await recaptchaReponse.json();

      if (!recaptchaData.success) {
        toast.error(recaptchaData.message || 'Erreur de vérification reCAPTCHA');
        setIsLoading(false);
        return;
      }

      const response: any = await apiClient.post(`/api/paroisses/${parish.id}?_method=PUT`, formdata, {
        'Content-Type': 'multipart/form-data'
      });
      if (response.id) {
        toast.success('Paroisse mise à jour avec succès');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      else {
        toast.error(
          <div className='p-3 bg-red-500 text-white rounded-md'>
            Erreur lors de l'ajout de la paroisse
          </div>
        )
      }
    } catch (error: any) {
      toast.error(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Erreur lors de l'ajout de la paroisse {JSON.stringify(error.message)}
        </div>
      )
    }finally {
      setIsLoading(false)
    }
  }

  const editHoraire = (index: number) => {
    formFive.setValue("jour", horaires[index].jour);
    formFive.setValue("selectedHours", [ ...horaires[index].heures[0].split(";") ])
  }

  useEffect(() => {
      formThree.setValue("horaire_bureau", horairesBureau)
  }, [horairesBureau])

  const fetchPriests = async () => {
    // Récupération de la liste des prêtres enregistrés
    const response: Member[] = await apiClient.get("/api/membres?categorie_id=20")
    setPriests(response)
  }

  useEffect(() => {
    if (openModal){
      // Récupérer les unités paroitiales depuis l'api
      ( async () => {
          const response: TypeParoisse[] = await apiClient.get(`/api/type_paroisses`)
          setUnitePastorales(response)
      })()
      fetchPriests()
    }
  }, [openModal])

  return (
    <Dialog onOpenChange={(val :boolean) => { setOpenModal(val) }}>
      <DialogTrigger asChild>
        <Button className="h-10 bg-blue text-white hover:bg-blue/90">
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="min-w-[500px] w-min max-h-[80vh] overflow-y-scroll p-0 gap-0 rounded-2xl">
        <DialogHeader className="border-b border-neutral-200 p-4 rounded-t-2xl">
          <DialogTitle className="text-lg font-bold leading-7">
            Mettre à jour la paroisse
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
            <Form {...formThree}>
              <form onSubmit={formThree.handleSubmit(onSubmitThree)} className="space-y-4">
              
                <FormField
                  control={formThree.control}
                  name="unite_pastorale"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col space-y-2">
                        <FormLabel>Unité pastorale</FormLabel>
                        <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                          <SelectTrigger className="h-11 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                            <SelectValue placeholder="Sélectionnez une unité" />
                          </SelectTrigger>
                          <SelectContent>
                            { 
                              unitePastorales.map(unite => (
                                <SelectItem key={unite.id} value={`${unite.id}`}>{unite.intitule_fr}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formThree.control}
                  name="pretre_responsable"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col space-y-2">
                        <FormLabel>Prêtre responsable</FormLabel>
                        <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                          <SelectTrigger className="h-11 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                            <SelectValue placeholder="Sélectionnez un prêtre" />
                          </SelectTrigger>
                          <SelectContent>
                            { 
                              priests.map(priest => (
                                <SelectItem key={priest.id} value={`${priest.id}`}>{priest.nom}{" "}{priest.prenom}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formThree.control}
                  name="langue"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col space-y-2">
                        <FormLabel>Langue principale</FormLabel>
                        <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                          <SelectTrigger className="h-11 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                            <SelectValue placeholder="Sélectionnez une langue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='fr'>Français</SelectItem> 
                            <SelectItem value='en'>Anglais</SelectItem> 
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='w-min relative'>
                  <FormField
                    control={formThree.control}
                    name="horaire_bureau"
                    render={({ field }) => (
                      <FormItem>
                        <label htmlFor="titre" className='mb-2'>Heure de bureau</label>
                        <Editor
                          {...field}
                          value={horairesBureau}
                          onChange={(text: string) => setHorairesBureau(text)}
                          className='h-52'
                        />
                        <FormMessage />
                      </FormItem>
                    )} />
                </div> 
                <div className="flex flex-row gap-4">
                  <Button variant={'outline'} onClick={() => setStep(2)} className="w-min px-8 mt-8 h-12 rounded-lg">
                    Retour
                  </Button>
                  <Button disabled={!horairesBureau} type="submit" className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                    Suivant
                  </Button>
                </div>
              </form>
            </Form>
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
                
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="categorie" className="mb-2">Image de la paroisse</Label>
                  <GaleryPopup setSelectedImage={setSelectedImage} >
                    <div className="h-44 w-full bg-[#f0f0f0] rounded-md overflow-hidden relative flex justify-center items-center cursor-pointer">
                      {
                        selectedImage ?
                          <Image
                            fill
                            priority
                            className="object-cover"
                            alt="Église Immaculée-Conception"
                            src={selectedImage ? `${selectedImage.path}`: `/rectangle-2492.svg`}
                          /> :
                          <Image
                            width={40}
                            height={40}
                            alt="Vector"
                            src="/vector.svg"
                          />
                      }
                    </div>
                  </GaleryPopup>
                </div>
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
                <FormField
                  control={formFive.control}
                  name="jour"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col space-y-2">
                        <FormLabel>Jour de messe </FormLabel>
                        <select defaultValue="" name="jour" id="jour" onChange={field.onChange} className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                          <option value="" disabled >Sélectionnez un jour de messe</option>
                          {
                            jours.map((jour) => (
                              <option selected={field.value===jour.value} key={jour.value} value={jour.value}>{jour.label}</option>
                            ))
                          }
                        </select>
                        {/** 
                          <Select 
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                            <SelectTrigger className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                              <SelectValue placeholder="Sélectionnez un jour de messe" />
                            </SelectTrigger>
                            <SelectContent>
                              {
                                jours.map((jour) => (
                                  <SelectItem key={jour.value} value={jour.value}>{jour.label}</SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>
                         */}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
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
                <Button type="button" onClick={handleValidateHours} variant={'outline'} className="w-min px-4 mt-3 h-12 rounded-full">
                  <PlusIcon className="h-5 w-5 mr-2" />
                    Valider
                </Button>
                {
                  horaires.length > 0 &&
                  <div className="flex flex-col space-y-2">
                    <h1 className="font-bold">Aperçu</h1>
                    <div className=" flex flex-wrap gap-2">
                      {
                        horaires.map((horaire, index) => (
                          <p key={index} className="flex text-blue-800 px-2 py-1 rounded-full">
                            <span className="capitalize">{horaire.jour}</span>: <span className="font-semibold text-black ml-2">{horaire.heures.join(', ')}</span>
                            <button onClick={() => editHoraire(index)} type="button" className="bg-black/5 rounded-full p-1 ml-2"><Pen className="w-4 h-4" /> </button>
                          </p>
                        ))
                      }
                    </div>
                  </div>
                }
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
            <Form {...formSix}>
              <form onSubmit={formSix.handleSubmit(onSubmitSix)} className="space-y-4">
                
                <FormField
                  control={formSix.control}
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

                <FormField
                  control={formSix.control}
                  name="lien_youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lien de la vidéo</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="Entrez le lien d'une vidéo" {...field}
                          className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                { 
                  (formSix.getValues("lien_youtube")) &&
                  <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      src={formSix.getValues("lien_youtube")!.replace("watch?v=", "embed/")}
                      title="Titre de la vidéo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                }
                
                <div className="flex flex-row gap-4">
                  <Button variant={'outline'} onClick={() => setStep(5)} className="w-min px-8 mt-8 h-12 rounded-lg">
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
          step === 7 &&
          <div className="flex flex-col w-full p-10 pt-6 space-y-6">
            <h1 className="font-bold">Emplacement sur la map</h1>
            <div className="h-80 w-full bg-black/5 rounded-lg overflow-hidden">
              {/** Map view */}
              <MapContainer 
                showSearchBar={true}
                location={location}
                setLocation={setLocation}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="font-bold">Localisation</h1>
              <div className=" text-black">
                {
                  location ?
                  <div className="">
                    <p>{location?.name} {location?.address}</p>
                    <div className="flex flex-row gap-2">
                      <span>lat: {location?.lat.toFixed(6)};</span>
                      <span>lng: {location?.lng.toFixed(6)}</span>
                    </div>
                  </div> :
                  <span className="w-full">Entrez une adresse pour voir les informations s'afficher</span>
                }
              </div>
            </div>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
              onChange={handleRecaptchaChange}
            />
            <div className="flex flex-row gap-4">
              <Button variant={'outline'} onClick={() => setStep(6)} className="w-min px-8 mt-8 h-12 rounded-lg">
                Retour
              </Button>
              <Button disabled={ isLoading || !captchaToken } onClick={handleSubmitForm} className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                { isLoading && <Loader className='h-5 w-5, mr-2' /> }
                Modifier la paroisse
              </Button>
            </div>
          </div>
        }
      </DialogContent>
    </Dialog>
  );
};


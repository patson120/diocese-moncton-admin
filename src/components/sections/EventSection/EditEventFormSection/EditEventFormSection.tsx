
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { Textarea } from "@/components/ui/textarea";
import { apiClient } from "@/lib/axios";
import { cn, handleImageUpload } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Category, Event } from "../../../../app/types";

interface EditEventDialogProps {
  eventData: Event;
}

const defaultEvent = {
  paroisse_id: 1,
  categorie_id: 1,
  titre_fr: '',
  description_fr: '',
  titre_en: '',
  description_en: '',
  heure_event: '',
  date_event: '',
  lieu: 'Moncton',
  gps: '48.8566;2.3522',
  contact: '',
  is_planifier: 0,
  date_planification: '',
}

const formSchemaOne = z.object({
  titre_fr: z.string().min(1, { message: "Titre est requis" }),
  description_fr: z.string().min(1, { message: "Description française est requise" }),
})

const formSchemaTwo = z.object({
  titre_en: z.string().min(1, { message: "Titre est requis" }),
  description_en: z.string().min(1, { message: "Description anglaise est requise" }),
})

const formSchemaThree = z.object({
  heure_event: z.string().min(1, {message: "L'heure est requise"}),
  date_event: z.string().min(1, { message: "La date est requise" }),
  image: z.instanceof(File).optional(),
})

const formSchemaFour = z.object({
  contact: z.string().min(1, {message: "Un contact est requis"}),
  // gps: z.string().min(1, {message: "Un GPS est requis"}),
  // lieu: z.string().min(1, {message: "Un lieu est requis"}),
  // is_planifier: z.number().min(0, {message: "Un plan est requis"}),
  // date_planification: z.string().optional(),
})

export const EditEventFormSection = ({ eventData} : EditEventDialogProps): JSX.Element => {

  const [isLoading, setIsloading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [step, setStep] = useState(1)
  const [coverImage, setCoverImage] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category>()

  const [event, setEvent] = useState(defaultEvent)

  // Forms 
  const formOne = useForm<z.infer<typeof formSchemaOne>>({
    resolver: zodResolver(formSchemaOne),
    defaultValues: {
      titre_fr: eventData.titre_fr,
      description_fr: eventData.description_fr,
    },
  });

  const formTwo = useForm<z.infer<typeof formSchemaTwo>>({
    resolver: zodResolver(formSchemaTwo),
    defaultValues: {
      titre_en: eventData.titre_en,
      description_en: eventData.description_en,
    },
  });

  const formThree = useForm<z.infer<typeof formSchemaThree>>({
    resolver: zodResolver(formSchemaThree),
    defaultValues: {
      heure_event: eventData.heure_event,
      date_event: eventData.date_event,
    },
  });

  const formFour = useForm<z.infer<typeof formSchemaFour>>({
    resolver: zodResolver(formSchemaFour),
    defaultValues: {
      contact: eventData.contact,
    },
  });

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
    setCategories(response)
    const foundCategory = response.find(item => item.id === eventData.categorie_id)
    setSelectedCategory(foundCategory)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleUpdateEvent = async () => {
    if (isLoading) return
    setIsloading(true)
    try {
      const response: any = await apiClient.put(`/api/evenements/${eventData.id}`, {
        ...event,
        categorie_id: selectedCategory?.id,
        contact: formFour.getValues('contact')
      })
      if (response.id) {
        toast.success("Evènement modifié avec succès !")
        formOne.reset()
        formTwo.reset()
        formThree.reset()
        formFour.reset()
        setStep(1)
        setCoverImage('')
        setOpenModal(false)
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }
      else {
        toast.warning(
          <div className='p-3 bg-red-500 text-white rounded-md'>
            {JSON.stringify(response)}
          </div>
        )
      }
      setIsloading(false)
    } catch (error: any) {
      toast.warning(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          {JSON.stringify(error)}
        </div>
      )
      setIsloading(false)
    }
  }

  const onSubmitFirst = async (values: z.infer<typeof formSchemaOne>) => {
    setEvent(prev => (
      { ...prev,
        titre_fr: values.titre_fr,
        description_fr: values.description_fr,
      }
    ))
    setStep(2)
  }

  const onSubmitSecond = async (values: z.infer<typeof formSchemaTwo>) => {
    setEvent(prev => (
      { ...prev,
        titre_en: values.titre_en,
        description_en: values.description_en,
      }
    ))
    setStep(3)
  }

  const onSubmitThree = async (values: z.infer<typeof formSchemaThree>) => {
    setEvent(prev => (
      { ...prev,
        date_event: values.date_event,
        heure_event: values.heure_event,
      }
    ))
    setStep(4)
  }

  const onSubmitForth= async (values: z.infer<typeof formSchemaFour>) => {
    setEvent(prev => (
      { ...prev,
        contact: values.contact,
      }
    ))
    await handleUpdateEvent()
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpenModal(true)} className="h-10 bg-blue text-white hover:bg-blue/90">
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="w-[500px] p-0 gap-0 rounded-2xl overflow-hidden">
        <DialogHeader className="border-b border-neutral-200 p-4 rounded-t-2xl">
          <DialogTitle className="text-lg font-bold leading-7">
            Editer l'évènement
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
                  name="titre_fr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre évènement</FormLabel>
                      <FormControl>
                        <Input placeholder="Entrez le nom complet" {...field}
                          className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formOne.control}
                  name="description_fr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description de l'évènement</FormLabel>
                      <FormControl>
                        {/* Textarea */}
                        <Textarea
                          {...field}
                          rows={5}
                          placeholder="Parlez du but de l'évènement"
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
                  name="titre_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the title of event" {...field}
                          className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formTwo.control}
                  name="description_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event description</FormLabel>
                      <FormControl>
                        {/* Textarea */}
                        <Textarea
                          {...field}
                          rows={5}
                          placeholder="Talk about the goal of event..."
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
          <div className="flex flex-col w-full p-10 px-6 pt-6 ">
            <Form {...formThree}>
              <form onSubmit={formThree.handleSubmit(onSubmitThree)} className="space-y-6">
                <div className='grid grid-cols-2 gap-3 w-full'>
                  <FormField
                    control={formThree.control}
                    name="date_event"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jour</FormLabel>
                        <FormControl>
                          <Input {...field}
                            className="h-11 inline-block bg-white rounded-xl border border-solid border-[#d9d9d9]"
                            type='date'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formThree.control}
                    name="heure_event"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure</FormLabel>
                        <FormControl>
                          <Input {...field}
                            className="h-11 inline-block bg-white rounded-xl border border-solid border-[#d9d9d9]"
                            type='time'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />                  
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
                  <Button type="submit" className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                    Suivant
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        }

        {
          step === 4 &&
          <div className="flex flex-col w-full p-10 pt-6 space-y-4">
            <Form {...formFour}>
              <form onSubmit={formFour.handleSubmit(onSubmitForth)} className="space-y-4">
                <FormField
                  control={formFour.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="Entrez un contact" {...field}
                          className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  <Button type="submit" className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                    { isLoading && <Loader className='text-white mr-2' /> }
                    Mettre à jour l'évènement
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        }
      </DialogContent>
    </Dialog>
  );
};

'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { apiClient } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { MapContainer } from "../../MapSection/map-container";
import { Location } from "@/app/types";
import useRecaptcha from "@/hooks/useRecaptcha";
import ReCAPTCHA from "react-google-recaptcha";


const formSchemaOne = z.object({
  nom_fr: z.string().min(1, { message: "Nom requis" }),
})
const formSchemaTwo = z.object({
  nom_en: z.string().min(1, { message: "Name required" }),
})
const formSchemaThree = z.object({
  gps: z.string().optional(),
})

export const AddUnitePastoraleFormSection = (): JSX.Element => {

  const { captchaToken, handleRecaptchaChange, verifyRecaptchaToken } = useRecaptcha()


  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation] = useState<Location | null>(null);

  // Forms
  const formOne = useForm<z.infer<typeof formSchemaOne>>({
    resolver: zodResolver(formSchemaOne),
    defaultValues: {
      nom_fr: "",
    },
  });

  const formTwo = useForm<z.infer<typeof formSchemaTwo>>({
    resolver: zodResolver(formSchemaTwo),
    defaultValues: {
      nom_en: "",
    },
  });

  const formThree = useForm<z.infer<typeof formSchemaThree>>({
    resolver: zodResolver(formSchemaThree),
    defaultValues: {},
  });

  const onSubmitFirst = async (values: z.infer<typeof formSchemaOne>) => {
    console.log(values);
    setStep(2)
  }

  const onSubmitSecond = async (values: z.infer<typeof formSchemaTwo>) => {
    console.log(values);
    setStep(3)
  }

  const onSubmitThree = async (values: z.infer<typeof formSchemaThree>) => {
    console.log(values);
    setStep(4)
  }


  const handleSubmitForm = async () => {
    if (isLoading) return
    setIsLoading(true)
    const formData = new FormData();
    formData.append('intitule_fr', formOne.getValues("nom_fr"));
    formData.append('intitule_en', formTwo.getValues("nom_en"));
    formData.append('couleur', "#fff");
    formData.append('gps', `${location?.lat};${location?.lng}`);
    
    try {
      const recaptchaReponse = await verifyRecaptchaToken();
      const recaptchaData = await recaptchaReponse.json();

      if (!recaptchaData.success) {
        toast.error(recaptchaData.message || 'Erreur de vérification reCAPTCHA');
        setIsLoading(false);
        return;
      }

      const response: any = await apiClient.post('/api/type_paroisses', formData, {
        'Content-Type': 'multipart/form-data'
      });
      if (response.id) {
        toast.success("Unité pastorale ajoutée avec succès");
        setTimeout(() => {
          window.location.reload()
        }, 1500);
      }else {
        toast.error(
          <div className='p-3 bg-red-500 text-white rounded-md'>
            Une erreur s'est produite lors de l'ajout de l'unité pastorale
          </div>
        )
      }
    } catch (error) {
      toast.warning(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Une erreur s'est produite lors de l'ajout de l'unité pastorale {JSON.stringify(error)}
        </div>
      )
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 gap-2 px-3.5 py-0 bg-blue rounded-[7px] text-white">
          <PlusIcon className="w-5 h-5" />
          <span className="font-body-3 text-sm">Ajouter une unité</span>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="w-[500px] p-0 gap-0 rounded-2xl overflow-hidden">
        <DialogHeader className="border-b border-neutral-200 p-4 rounded-t-2xl">
          <DialogTitle className="text-lg font-bold leading-7">
            Créer une unité pastorale
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
                        <Input placeholder="Entrez le nom de l'unité pastorale" {...field}
                          className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="h-40"></div>
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
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter parish name" {...field}
                          className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="h-40"></div>
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
              <p className=" text-black">
                {
                  location ?
                  <span>
                    {location?.name} {location?.address}<br /> 
                    lat: {location?.lat.toFixed(6)} <br /> 
                    lng: {location?.lng.toFixed(6)}
                  </span> :
                  <span>Entrez une adresse pour voir les informations s'afficher</span>
                }
              </p>
            </div>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
              onChange={handleRecaptchaChange}
            />
            <div className="flex flex-row gap-4">
              <Button variant={'outline'} onClick={() => setStep(2)} className="w-min px-8 mt-8 h-12 rounded-lg">
                Retour
              </Button>
              <Button disabled={ isLoading || !captchaToken } onClick={handleSubmitForm} className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                {  isLoading && <Loader className=" w-5 h-5 mr-2" />}
                Ajouter l'unite pastorale
              </Button>
            </div>
          </div>
        }
      </DialogContent>
    </Dialog>
  );
};


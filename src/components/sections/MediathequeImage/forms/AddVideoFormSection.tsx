
'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import useRole from "@/hooks/use-role";
import useRecaptcha from "@/hooks/useRecaptcha";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";


const formSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  lien: z.string().min(1, "Le lien de la vidéo est requis"),
});


export default function AddVideoFormSection(){
  const { captchaToken, handleRecaptchaChange, verifyRecaptchaToken } = useRecaptcha()

  const { canAddVideo } = useRole()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      lien: "",
    },
  });

  const [isLoading, setIsloading] = useState(false)

  const handleSubmitForm =  async (values: z.infer<typeof formSchema>) => {
    if (isLoading) return
    setIsloading(true)

    const formdata = new FormData();
    formdata.append("titre_fr", `${values.nom}`);
    formdata.append("titre_en", `${values.nom}`);
    formdata.append("type", "video");
    formdata.append("media", `${values.lien}`);

    try {

      const recaptchaReponse = await verifyRecaptchaToken();
      const recaptchaData = await recaptchaReponse.json();

      if (!recaptchaData.success) {
        toast.error(recaptchaData.message || 'Erreur de vérification reCAPTCHA');
        setIsloading(false);
        return;
      }

      const response: any = await apiClient.post('/api/ressources', formdata, {
        'Content-Type': 'multipart/form-data'
      });
  
      if (response.id ) {
        toast.success('Vidéo ajoutée avec succès');
        setTimeout(() => {
          window.location.reload()
        }, 1500);
      }
      else  {
        toast.error('Une erreur est survenue lors de l\'ajout de la vidéo');
      }
    } catch (error: any) {
      toast.error(`Une erreur est survenue lors de l\'ajout de la vidéo, ${error.message}`);
    }
    finally {
      setIsloading(false)
    }
  }

  if (!canAddVideo()) return <></>

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 gap-2 px-3.5 py-0 bg-blue rounded-[7px] text-white">
          <PlusIcon className="w-5 h-5" />
          <span className="font-body-3 text-sm">Ajouter une vidéo</span>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="w-[500px] p-0 rounded-2xl">
        <DialogHeader className="border-b border-neutral-200 p-4 rounded-t-2xl">
          <DialogTitle className="text-lg font-bold leading-7">
            Ajouter une vidéo
          </DialogTitle>
        </DialogHeader> 
        <div className="flex flex-col w-full p-10 pt-6 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-4">
              <FormField
                control={form.control}
                name="lien"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lien du fichier</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez l'url d'accès à la vidéo" {...field}
                        className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du fichier</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez le nom du fichier" {...field}
                        className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={handleRecaptchaChange}
              />
              <Button disabled={ isLoading || !captchaToken } type="submit" className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                { isLoading && <Loader className='text-white mr-2' /> }
                Ajouter la vidéo
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

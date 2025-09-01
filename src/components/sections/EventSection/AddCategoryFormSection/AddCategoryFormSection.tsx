
'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import useRecaptcha from "@/hooks/useRecaptcha";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { JSX, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";


const formSchema = z.object({
  intitule_fr: z.string().min(1, "Le nom est requis"),
  intitule_en: z.string().optional()
});

export const AddCategoryFormSection = ({parent_id=0, menu, setCategories}: { parent_id?: number, menu: string, setCategories: (data: any) => void}): JSX.Element => {
  
  const { captchaToken, handleRecaptchaChange, verifyRecaptchaToken } = useRecaptcha()

  const [isLoading, setIsLoading] = useState(false)
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      intitule_fr: "",
      intitule_en: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isLoading) return 
    setIsLoading(true)
    const data = {
      parent_id: parent_id,
      intitule_fr: values.intitule_fr,
      intitule_en: values.intitule_en,
      menu: menu,
    };
    try {

      const recaptchaReponse = await verifyRecaptchaToken();
      const recaptchaData = await recaptchaReponse.json();

      if (!recaptchaData.success) {
        toast.error(recaptchaData.message || 'Erreur de vérification reCAPTCHA');
        setIsLoading(false);
        return;
      }

      const response: any = await apiClient.post("/api/categories", data);
      if (response.id ) {
        toast.success('Catégorie ajoutée avec succès');
        setCategories((prev: any) => ([...prev, response]))
        form.reset();
      }
      else  {
        toast.error(
          <div className='p-3 bg-red-500 text-white rounded-md'>
            Une erreur est survenue lors de l\'ajout de la catégorie
          </div>
        )
      }
    }
    catch (error: any) {
      toast.error(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Error adding category: {JSON.stringify(error)}
        </div>
      )
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue rounded-[7px] h-10 w-min gap-2 px-3.5 py-0">
          <PlusIcon className="w-5 h-5" />
          <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
            Ajouter
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px] p-0 rounded-2xl">
        <DialogHeader className="border-b border-neutral-200 p-4 rounded-t-2xl">
          <DialogTitle className="text-lg font-bold leading-7">
            Ajouter une catégorie
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col w-full p-10 pt-6 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="intitule_fr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom en français</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez le nom en français" {...field}
                        className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="intitule_en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom en anglais</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez le nom en français" {...field}
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

              <DialogFooter>
                <Button disabled={ isLoading || !captchaToken } type="submit" className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                  {isLoading && <Loader className="h-5 w-5 mr-2" />}
                  Ajouter la catégorie
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

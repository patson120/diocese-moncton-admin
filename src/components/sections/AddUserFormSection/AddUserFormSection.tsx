
'use client'

import { Paroisse, TypeParoisse } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useRole from "@/hooks/use-role";
import useRecaptcha from "@/hooks/useRecaptcha";
import { apiClient } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";


const formSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("L'adresse email n'est pas valide"),
  role: z.enum(["admin", "bulletin", "moderateur", "editeur", "lecteur"]),
  statut: z.enum(["actif", "inactif"]),
  paroisse_id: z.string().optional(),
  unite_id: z.string().optional(),
});

export const AddUserFormSection = (): JSX.Element => {

  const { captchaToken, handleRecaptchaChange, verifyRecaptchaToken } = useRecaptcha();

  const { canAddUser } = useRole()

  const [isLoading, setIsLoading] = useState(false)
 
  const [roles, setRoles] = useState<any>()
  const [parishes, setParishes] = useState<Paroisse[]>([])
  const [unitePastorles, setUnitePastorles] = useState<TypeParoisse[]>([])
  
  const [selectedCategory, setSelectedCategory] = useState('paroisse')

  const getRoles = async () => {
    const response = await apiClient.get("/api/roles")
    setRoles(response)    
  }

  const getParishes = async () => {
    const response: Paroisse[] = await apiClient.get("/api/paroisses")
    setParishes(response)    
  }

  const getUnitePastorales = async () => {
    const response: TypeParoisse[] = await apiClient.get("/api/type_paroisses")
    setUnitePastorles(response)    
  }

  useEffect(() => {
    getRoles()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      email: "",
      role: "lecteur",
      statut: 'actif',
      paroisse_id: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (form.watch("role") === "bulletin" ){
      if (!form.watch("paroisse_id") && !form.watch("unite_id")){
        toast.error(
          <div className='p-3 bg-red-500 text-white rounded-md'>
            Veuillez sélectionner une paroisse ou une unité rattaché à rôle
          </div>
        )
        return
      }
    }

    if (isLoading) return 
    setIsLoading(true)
    
    const data = {
      nom: values.nom,
      email: values.email,
      role_id: roles.find((role: any) => role.sigle === values.role)?.id,
      paroisse_id: values.paroisse_id ?? null,
      unite_id: values.unite_id ?? null,
      password: '1234',
      statut: values.statut === 'actif' ? 1 : 0,
    };
    try {
      const recaptchaReponse = await verifyRecaptchaToken();
      const recaptchaData = await recaptchaReponse.json();

      if (!recaptchaData.success) {
        toast.error(recaptchaData.message || 'Erreur de vérification reCAPTCHA');
        setIsLoading(false);
        return;
      }

      const response: any = await apiClient.post("/api/administrateurs", data);
      if (response.infos.id ) {
        toast.success('Utilisateur ajouté avec succès');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      else  {
        toast.error(
          <div className='p-3 bg-red-500 text-white rounded-md'>
            Une erreur est survenue lors de l\'ajout du membre
          </div>
        )
      }
      setIsLoading(false)
    }
    catch (error: any) {
      setIsLoading(false)
      toast.error(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Erreur lors de l'ajout de l'utilisateur {JSON.stringify(error.message)}
        </div>
      )
    }
    form.reset();
  }

  if (!canAddUser()){
    return <></>
  }

  const onOpenChange = async (val:boolean)  => {
    if (val){
      await getParishes()
      await getUnitePastorales()
    }
  }

  useEffect(() => {
    const role = form.getValues("role"); 
    if (role !== "bulletin") {
      setSelectedCategory("");
    }
  }, [form, form.getValues("role")]);

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue rounded-[7px] h-10 gap-2 px-3.5 py-0">
          <PlusIcon className="w-5 h-5" />
          <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
            Ajouter un utilisateur
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px] md:w-[620px] max-h-[80vh] overflow-y-scroll p-0 rounded-2xl">
        <DialogHeader className="border-b border-neutral-200 p-4 rounded-t-2xl">
          <DialogTitle className="text-lg font-bold leading-7">
            Ajouter un utilisateur
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col w-full p-10 pt-6 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
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
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Entrez l'adresse email" {...field}
                        className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rôle</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez son rôle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          roles && roles.map((role: any) => (
                            <SelectItem key={role.id} value={role.sigle}>
                              {role.intitule}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {
                form.getValues("role") === "bulletin" &&
                <div className="flex flex-col space-y-2 mt-10">
                  <Label htmlFor="categorie" className="mb-2">Rattaché l'utilisateur à:</Label>
                  <div className="flex flex-wrap gap-3">
                    <div onClick={() => setSelectedCategory('paroisse')}
                      className={cn(
                        'px-5 py-2 border border-gray/10 rounded-full cursor-pointer',
                        selectedCategory === 'paroisse' && 'bg-blue text-white border-none'
                      )}>une paroisse</div>
                      <div onClick={() => setSelectedCategory("unite_pastorale")}
                        className={cn(
                          'px-5 py-2 border border-gray/10 rounded-full cursor-pointer',
                          selectedCategory === 'unite_pastorale' && 'bg-blue text-white border-none'
                        )}>une unite pastorale</div>
                  </div>
                </div>
              }
              {
                selectedCategory === "paroisse" &&
                <FormField
                  control={form.control}
                  name="paroisse_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paroisse</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une paroisse" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            parishes && parishes.map((parish) => (
                              <SelectItem key={parish.id} value={`${parish.id}`}>
                                {parish.nom}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              }
              {
                selectedCategory === "unite_pastorale" &&
                <FormField
                  control={form.control}
                  name="unite_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unité pastorale</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une unité" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            unitePastorles && unitePastorles.map((unite) => (
                              <SelectItem key={unite.id} value={`${unite.id}`}>
                                {unite.intitule_fr}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              }

              <FormField
                control={form.control}
                name="statut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectItem value="inactif">Inactif</SelectItem>
                      <SelectItem value="actif">Actif</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={handleRecaptchaChange}
              />

              <DialogFooter>
                <Button disabled={isLoading || !captchaToken} type="submit" className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                  {isLoading && <Loader className="h-5 w-5 mr-2" />}
                  Ajouter l’utilisateur
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

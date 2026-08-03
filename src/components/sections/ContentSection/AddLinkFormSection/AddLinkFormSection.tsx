
'use client'

import { Lien, Menu, Page } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useRole from "@/hooks/use-role";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Pencil, PlusIcon } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";


const formSchema = z.object({
  intitule_fr: z.string().min(1, {message:"L'intitulé du lien français est requis"}),
  intitule_en: z.string().min(1, {message:"L'intitulé du lien anglais est requis"}),
  description_fr: z.string().min(1, {message:"Une petite description française est requis"}),
  description_en: z.string().min(1, {message:"Une petite description anglaise est requis"}),
  page: z.string().min(1, { message: "La page est requise"}),
  menu: z.string().min(1, {message: "Le menu associé requis"}),
  statut: z.enum(["actif", "inactif"]),
});

export const AddLinkFormSection = ({lien}: {lien?: Lien}): JSX.Element => {

  const { canAddLink } = useRole()

  const [isLoading, setIsLoading] = useState(false)
 
  const [pages, setPages] = useState<Page[]>([])
  const [menus, setMenus] = useState<Menu[]>([])

  const getPages = async () => {
    const response: Page[] = await apiClient.get("/api/pages?is_select=oui&is_publier=1")
    setPages(response)    
  }
  const getMenus = async () => {
    const response: Menu[] = await apiClient.get("/api/menus")
    setMenus(response)    
  }
  useEffect(() => {
    getPages()
    getMenus()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      intitule_fr: lien?.intitule_fr || "",
      intitule_en: lien?.intitule_en || "",
      description_fr: lien?.description_fr || "",
      description_en: lien?.description_en || "",
      page: `${lien?.pages_id}` ||  "",
      menu: `${lien?.menu_id}` || "",
      statut: lien?.statut ? (lien?.statut === 1 ? 'actif' : 'inactif') : 'actif',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isLoading) return 
    setIsLoading(true)
    const data = {
      intitule_fr: values.intitule_fr,
      intitule_en: values.intitule_en,
      description_fr: values.description_fr,
      description_en: values.description_en,
      pages_id: values.page,
      menu_id: values.menu,
      statut: values.statut === 'actif' ? 1 : 0,
    }
    
    try {
      const response: any = lien?.id ? await apiClient.put(`/api/liens/${lien?.id}`, data) : await apiClient.post("/api/liens", data);
      if (response.id ) {
        toast.success(lien ? 'Lien mis à jour avec succès': 'Lien crée avec succès');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      else {
        toast.error(
          <div className='p-3 bg-red-500 text-white rounded-md'>
            Une erreur est survenue lors de la { lien ? "modification" : "création"} du lien
          </div>
        )
      }
      setIsLoading(false)
    }
    catch (error: any) {
      setIsLoading(false)
      toast.error(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Erreur lors de la création du lien {JSON.stringify(error.message)}
        </div>
      )
    }
  }

  if (!canAddLink()){
    return <></>
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {
          lien ? 
          <Button
            variant="ghost"
            className="h-auto p-0 flex items-center gap-1">
            <Pencil className="w-4 h-4 mr-1" />
            <span className="font-body-3 font-[number:var(--body-3-font-weight)] text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
              Modifier
            </span>
          </Button> :
          <Button className="bg-blue rounded-[7px] h-10 gap-2 px-3.5 py-0">
            <PlusIcon className="w-5 h-5" />
            <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
              Créer un lien
            </span>
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="w-[600px] max-w-[95vw] max-h-[80vh] p-0 rounded-2xl flex flex-col gap-0">
        <DialogHeader className="border-b border-neutral-200 p-4 rounded-t-2xl flex-shrink-0">
          <DialogTitle className="text-lg font-bold leading-7">
          { lien ? 'Modifier le lien': 'Créer un lien' }
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col w-full p-10 pt-6 space-y-4 overflow-y-auto flex-1">
          <Form {...form}>
            <form id="link-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="intitule_fr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intitulé du lien (français) </FormLabel>
                      <FormControl>
                        <Input placeholder="Entrez l'intitulé du lien" {...field}
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
                      <FormLabel>Intitulé du lien (anglais) </FormLabel>
                      <FormControl>
                        <Input placeholder="Entrez l'intitulé du lien" {...field}
                          className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="description_fr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description du lien (français) </FormLabel>
                      <FormControl>
                        <Textarea placeholder="Entrez la description du lien" {...field}
                          className="min-h-24 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description du lien (anglais) </FormLabel>
                      <FormControl>
                        <Textarea placeholder="Entrez la description du lien" {...field}
                          className="min-h-24 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="page"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page liée</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <SelectTrigger className="h-11 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                            <SelectValue placeholder="Sélectionnez une page" />
                          </SelectTrigger>
                          <SelectContent>
                            {
                              pages.map(page => (
                                <SelectItem key={page.id} value={`${page.id}`} className="truncate">{page.titre_fr}/{page.titre_en}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="menu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Menu lié</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <SelectTrigger className="h-11 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                            <SelectValue placeholder="Sélectionnez un menu" />
                          </SelectTrigger>
                          <SelectContent>
                            {
                              menus.map(menu => (
                                <SelectItem key={menu.id} value={`${menu.id}`}>{menu.intitule_fr}/{menu.intitule_en}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="statut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut du lien</FormLabel>
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

            </form>
          </Form>
        </div>
        <DialogFooter className="p-4 border-t border-neutral-200 flex-shrink-0 rounded-b-2xl">
          <Button type="submit" form="link-form" className="w-full h-12 bg-blue text-white rounded-lg">
            {isLoading && <Loader className="h-5 w-5 mr-2" />}
            { lien ? 'Mettre à jour le lien': 'Créer un lien' }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

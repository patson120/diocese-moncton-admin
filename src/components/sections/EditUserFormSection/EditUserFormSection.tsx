
'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { User } from "../../../app/types";
import useRole from "@/hooks/use-role";


const formSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("L'adresse email n'est pas valide"),
  role: z.enum(["admin", "moderateur", "editeur", "lecteur"]),
  statut: z.enum(["actif", "inactif"]),
});

export const EditUserFormSection = ({user}: { user: User}): JSX.Element => {

  const { canUpdateUser, isCurrentUser } = useRole()

  const [isLoading, setIsLoading] = useState(false)
 
  const [roles, setRoles] = useState<any>()

  const getRoles = async () => {
    const response = await apiClient.get("/api/roles")
    setRoles(response)    
  }

  useEffect(() => {
    getRoles()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: user.nom,
      email: user.email,
      role: user.role.sigle as "admin" | "moderateur" | "editeur" | "lecteur",
      statut: user.statut === 1 ? 'actif' : 'inactif',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!canUpdateUser()){ 
      return toast.success("Vous n'avez pas le droit d'effectuer cette opération !")
    }
    if (isLoading) return 
    setIsLoading(true)
    const data = {
      nom: values.nom,
      email: values.email,
      role_id: roles.find((role: any) => role.sigle === values.role)?.id,
      // password: '0000',
      statut: values.statut === 'actif' ? 1 : 0,
    }
    try {
      const response: any = await apiClient.put(`/api/administrateurs/${user.id}`, data);
      if (response.id ) {
        toast.success('Utilisateur modifié avec succès');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      else  {
        toast.error(
          <div className='p-3 bg-red-500 text-white rounded-md'>
            Une erreur est survenue lors de la mise à jour de l'utilisateur
          </div>
        )
      }
      setIsLoading(false)
    }
    catch (error: any) {
      setIsLoading(false)
      toast.error(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Erreur lors de la mise à jour de l'utilisateur {JSON.stringify(error.message)}
        </div>
      )
    }
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-0 flex items-center gap-1">
          <Pencil className="w-4 h-4 mr-1" />
          <span className="font-body-3 font-[number:var(--body-3-font-weight)] text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
            Modifier
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px] p-0 rounded-2xl">
        <DialogHeader className="border-b border-neutral-200 p-4 rounded-t-2xl">
          <DialogTitle className="text-lg font-bold leading-7">
            Modifier un utilisateur
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
                    <FormLabel>Nom complet {user.role.sigle} </FormLabel>
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
              {
                !isCurrentUser(user.id) &&
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

              <DialogFooter>
                <Button type="submit" className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                  {isLoading && <Loader className="h-5 w-5 mr-2" />}
                  Mettre à jour l’utilisateur
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

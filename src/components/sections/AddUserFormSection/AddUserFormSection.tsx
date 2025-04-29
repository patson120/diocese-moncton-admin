
'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";


const formSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  role: z.enum(["administrateur", "moderateur", "editeur", "viewer"]),
  statut: z.enum(["actif", "inactif"]),
});

export const AddUserFormSection = (): JSX.Element => {
 
  const [role, setRole] = useState("")

  const getRoles = async () => {
    const response = await apiClient.get("/api/roles")
    console.log("Rôles",response);
  }

  useEffect(() => {
    getRoles()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      role: "viewer",
      statut: 'actif',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      nom: values.nom,
      role: values.role,
      statut: values.statut,
    };


    try {
      const response: any = await apiClient.post("/api/administrateurs", data);
      console.log("Utilisateur ajouté avec succès", response.data);
    }
    catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur", error);
    }
    console.log(values);
    // onOpenChange(false);
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue rounded-[7px] h-10 gap-2 px-3.5 py-0">
          <PlusIcon className="w-5 h-5" />
          <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
            Ajouter un utilisateur
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px] p-0 rounded-2xl">
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
                        <SelectItem value="administrateur">Administrateur</SelectItem>
                        <SelectItem value="moderateur">Modérateur</SelectItem>
                        <SelectItem value="editeur">Éditeur</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

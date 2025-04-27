
'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiClient } from "@/lib/axios";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { JSX, useEffect, useState } from "react";

export const AddUserFormSection = (): JSX.Element => {
 
  const [role, setRole] = useState("")

    const getRoles = async () => {
      const response = await apiClient.get("/api/roles")
      console.log("Rôles",response);
    }
  
    useEffect(() => {
      getRoles()
    }, [])

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
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-body-3 leading-[var(--body-3-line-height)] tracking-[var(--body-3-letter-spacing)]">
              Nom complet
            </label>
            <Input
              className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
              placeholder="Entrez le nom complet"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="role">Rôle</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                <SelectValue placeholder="Sélectionnez son role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administrateur">Administrateur</SelectItem>
                <SelectItem value="moderateur">Modérateur</SelectItem>
                <SelectItem value="editeur">Éditeur</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez le statut" />
              </SelectTrigger>
              <SelectContent>
                {/* Establishment options would go here */}
                <SelectItem value="inactif">Inactif</SelectItem>
                <SelectItem value="actif">Actif</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
              Ajouter l’utilisateur
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

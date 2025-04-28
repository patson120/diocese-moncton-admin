
'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { apiClient } from "@/lib/axios";
import { cn, handleImageUpload } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { JSX, useState } from "react";
import { toast } from "sonner";

const defaultMember = {
  nom: '',
  poste: '',
  coordonnees: '',
  fonction: '',
  etablissement: '',
  description_en: '',
  description_fr: '',
}

export const AddMemberFormSection = (): JSX.Element => {
  // Status options data
  const statusOptions = [
    { value: "1", label: "Actif" },
    { value: "0", label: "En retraite" },
    { value: "-1", label: "Décédé" },
  ];

  const [fileImage, setFileImage] = useState<File | undefined>();
  const [coverImage, setCoverImage] = useState('')
  const [isLoading, setIsloading] = useState(false)
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState("1")

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await handleImageUpload(file);
      setFileImage(file)
      setCoverImage(imageUrl);
    }
  };

  const [member, setMember] = useState(defaultMember);

  const handleSubmitForm =  async () => {
    if (isLoading) return
    setIsloading(true)

    // const formdata = new FormData();
    // formdata.append("categorie_id", '1');
    // formdata.append("nom", `${member.nom}`);
    // formdata.append("prenom", ``);
    // formdata.append("poste", `${member.fonction}`);
    // formdata.append("coordonnees", `${member.etablissement}`);
    // formdata.append("etat", `${status}`);
    // formdata.append("image", fileImage!);

    // // Champs absents pour le requête
    // formdata.append("description_fr", `${member.description_fr}`);
    // formdata.append("description_en", `${member.description_en}`);

    // // champs supplémentaires à revoir
    // formdata.append("fichier", fileImage!);
    // formdata.append("label", 'membre');
    // formdata.append("value", '2');

    // const response: any = await apiClient.post('/api/membres', formdata, {
    //   'Content-Type': 'multipart/form-data'
    // });

    const body = {
      categorie_id: 1,
      nom: member.nom,
      prenom: 'prenom',
      poste: member.fonction,
      coordonnees: member.etablissement,
      etat: status,
      // Champs absents pour le requête
      description_fr: member.description_fr,
      description_en: member.description_en,
    }

    const response: any = await apiClient.post('/api/membres', body);
    if (response.id ) {
      setIsloading(false)
      setStep(1)
      setMember(defaultMember)
      setCoverImage('')
      toast.success('Membre ajouté avec succès');
    }
    else  {
      setIsloading(false)
      toast.error('Une erreur est survenue lors de l\'ajout du membre');
    }
  }

  // comment: ""
  // created_at: "2025-04-28T04:03:00.000000Z"
  // id: 31
  // label: "membre"
  // path : "images/membre/membre1745812980.png"
  // updated_at: "2025-04-28T04:03:00.000000Z"
  // value: "2"

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 gap-2 px-3.5 py-0 bg-blue rounded-[7px] text-white">
          <PlusIcon className="w-5 h-5" />
          <span className="font-body-3 text-sm">Ajouter un membre</span>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="w-[500px] p-0 rounded-2xl">
        <DialogHeader className="border-b border-neutral-200 p-4 rounded-t-2xl">
          <DialogTitle className="text-lg font-bold leading-7">
            Ajouter un membre
          </DialogTitle>
        </DialogHeader>

        {
          step === 1 &&
          <div className="flex flex-col w-full p-10 pt-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-body-3 leading-[var(--body-3-line-height)] tracking-[var(--body-3-letter-spacing)]">
                Nom complets
              </label>
              <Input
                value={member.nom}
                onChange={(e) => setMember(prev => ({...prev, nom: e.target.value }))}
                className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Entrez le nom complet"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="category">Fonction</Label>
              <Select value={member.fonction} onValueChange={(text) =>setMember(prev => ({...prev, fonction: text}))}>
                <SelectTrigger className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                  <SelectValue placeholder="Sélectionnez sa/ses fonction(s)" />
                </SelectTrigger>
                <SelectContent>
                  {/* Function options would go here */}
                  <SelectItem value="archeveque">Archevêque</SelectItem>
                  <SelectItem value="pretre">Prêtre</SelectItem>
                  <SelectItem value="diacre">Diacre</SelectItem>
                  <SelectItem value="religieux">Réligieux</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-body-3 leading-[var(--body-3-line-height)] tracking-[var(--body-3-letter-spacing)]">
                Établissement lié
              </label>
              <Select value={member.etablissement} onValueChange={(text) => setMember(prev => ({ ...prev, etablissement: text}))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez un établissement" />
                </SelectTrigger>
                <SelectContent>
                  {/* Establishment options would go here */}
                  <SelectItem value="paroisse">Paroisse</SelectItem>
                  <SelectItem value="diocese">Diocèse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-body-3 leading-[var(--body-3-line-height)] tracking-[var(--body-3-letter-spacing)]">
                Statut
              </label>
              <div className="flex gap-2">
                {statusOptions.map((opt) => (
                  <Button
                    onClick={() => setStatus(opt.value)}
                    key={opt.value}
                    variant="outline"
                    className={
                      cn("rounded-[20px] hover:bg-blue hover:text-white px-3 py-2 h-auto  font-body-3 font-[number:var(--body-3-font-weight)] text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]",
                        status === opt.value ? 'text-white bg-blue' : 'text-[#454545]'
                      )
                    }
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Button onClick={() => setStep(2)} className="w-full h-12 mt-8 bg-blue text-white rounded-lg">
                Suivant
              </Button>
            </div>
          </div>
        }
        {
          step === 2 &&
          <div className="flex flex-col w-full p-10 pt-6 space-y-6">
            <div className="relative flex justify-start items-center gap-4">
              <Input accept="image/*" onChange={handleCoverImageChange} type="file" className="absolute opacity-0 h-full z-[2] cursor-pointer" />
              <div className="h-24 w-24 relative self-stretch overflow-hidden rounded-xl bg-[#f0f0f0] flex items-center justify-center">
                {
                  coverImage ?
                    <Image
                      fill
                      priority
                      className="object-cover"
                      alt="Vector"
                      src={coverImage}
                    /> :
                    <Image
                      width={40}
                      height={40}
                      alt="Vector"
                      src="/vector.svg"
                    />
                }
              </div>

              <div className="">
                <h3 className="font-bold">Insérer la photo du membre</h3>
                <p className="text-gray text-sm">cliquez dans la zone pour ajouter une photo</p>
              </div>

            </div>

            {/* Textarea */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description">Description(français)</Label>
              <Textarea
                value={member.description_fr}
                onChange={(e) => setMember(prev => ({...prev, description_fr: e.target.value }))}
                placeholder="Une description du membre..."
                className="min-h-20"
              />
            </div>

            {/* Textarea */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description">Description(anglais)</Label>
              <Textarea
                value={member.description_en}
                onChange={(e) => setMember(prev => ({...prev, description_en: e.target.value }))}
                placeholder="Une description du membre..."
                className="min-h-20"
              />
            </div>

            <div className="flex flex-row gap-4">
              <Button variant={'outline'} onClick={() => setStep(1)} className="w-1/3 mt-8 h-12 rounded-lg">
                Retour
              </Button>
              <Button onClick={handleSubmitForm} className="w-2/3 h-12 mt-8 bg-blue text-white rounded-lg">
                { isLoading && <Loader className='text-white mr-2' /> }
                Ajouter ce membre
              </Button>
            </div>
          </div>
        }


      </DialogContent>
    </Dialog>
  );
};

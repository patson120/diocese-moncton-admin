
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
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const formSchemaOne = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  fonction: z.string().min(1, "La fonction est requise"),
  etablissement: z.enum(["paroisse", "diocese"]),
  statut: z.enum(["actif", "inactif"]),
  coordonnees: z.string().optional(), // z.string().min(1, "Les coordonnées sont requises"),
});

const formSchemaTwo = z.object({
  description_en: z.string().min(1, "La description en anglais est requise"),
  description_fr: z.string().min(1, "La description en français est requise"),
  image: z.instanceof(File).optional(),
});


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

  const [fileImage, setFileImage] = useState<File | undefined>();

  const formOne = useForm<z.infer<typeof formSchemaOne>>({
    resolver: zodResolver(formSchemaOne),
    defaultValues: {
      nom: "",
      coordonnees: "Moncton",
      fonction: "archeveque",
      etablissement: "paroisse",
      statut: 'actif',
    },
  });

  const formTwo = useForm<z.infer<typeof formSchemaTwo>>({
    resolver: zodResolver(formSchemaTwo),
    defaultValues: {
      description_en: "",
      description_fr: "",
      image: fileImage!,
    },
  });


  // Status options data
  const statusOptions = [
    { value: "1", label: "Actif" },
    { value: "0", label: "En retraite" },
    { value: "-1", label: "Décédé" },
  ];


  const [coverImage, setCoverImage] = useState('')
  const [isLoading, setIsloading] = useState(false)
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState('1')

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

  

  const onSubmitFirst = async (values: z.infer<typeof formSchemaOne>) => {
    setMember(prev => ({
      ...prev,
      nom: values.nom,
      // poste: values.poste,
      fonction: values.fonction,
      etablissement: values.etablissement,
      // description_fr: values.description_fr,
      // description_en: values.description_en,
    }))
    setStep(2)
    setStatus(values.statut)

    // Log data
    console.log(member);
    
  }

  const onSubmitSecond = async (values: z.infer<typeof formSchemaTwo>) => {
    setMember(prev => ({
      ...prev,
      // poste: values.poste,
      description_fr: values.description_fr,
      description_en: values.description_en,
      image: values.image,
    }))
    // Log data
    console.log(member);
    
  }

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
            <Form {...formOne}>
              <form onSubmit={formOne.handleSubmit(onSubmitFirst)} className="space-y-4">
                <FormField
                  control={formOne.control}
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
                  control={formOne.control}
                  name="fonction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fonction</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200">
                          <SelectTrigger className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                            <SelectValue placeholder="Sélectionnez sa/ses fonction(s)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* Function options would go here */}
                          <SelectItem value="archeveque">Archevêque</SelectItem>
                          <SelectItem value="pretre">Prêtre</SelectItem>
                          <SelectItem value="diacre">Diacre</SelectItem>
                          <SelectItem value="religieux">Réligieux</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formOne.control}
                  name="etablissement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Établissement lié</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200">
                          <SelectTrigger className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                            <SelectValue placeholder="Sélectionnez un établissement" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* Establishment options would go here */}
                          <SelectItem value="paroisse">Paroisse</SelectItem>
                          <SelectItem value="diocese">Diocèse</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                        }>
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </div>

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
          <div className="flex flex-col w-full p-10 pt-6 space-y-6">
            <Form {...formTwo}>
              <form onSubmit={formTwo.handleSubmit(onSubmitSecond)} className="space-y-4">
                <FormField
                  control={formTwo.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file); // Update the form state with the selected file
                          }}
                          className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

                <FormField
                  control={formTwo.control}
                  name="description_fr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description(français)</FormLabel>
                      <FormControl>
                        {/* Textarea */}
                        <Textarea
                          {...field}
                          placeholder="Une description du membre..."
                          className="min-h-20"
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
                      <FormLabel>Description(anglais)</FormLabel>
                      <FormControl>
                        {/* Textarea */}
                        <Textarea
                          {...field}
                          placeholder="Une description du membre..."
                          className="min-h-20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-4">
                  <Button variant={'outline'} onClick={() => setStep(1)} className="w-1/3 mt-8 h-12 rounded-lg">
                    Retour
                  </Button>
                  <Button type="submit" className="w-2/3 h-12 mt-8 bg-blue text-white rounded-lg">
                    { isLoading && <Loader className='text-white mr-2' /> }
                    Ajouter ce membre
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

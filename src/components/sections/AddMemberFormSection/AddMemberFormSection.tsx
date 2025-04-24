
'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn, handleImageUpload } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { JSX, useState } from "react";

export const AddMemberFormSection = (): JSX.Element => {
  // Status options data
  const statusOptions = [
    { value: "active", label: "Actif" },
    { value: "retired", label: "En retraite" },
    { value: "deceased", label: "Décédé" },
  ];

  const [coverImage, setCoverImage] = useState('')
  const [fonction, setFonction] = useState("")
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState("active")

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);

      const imageUrl = await handleImageUpload(file);
      // setFileImage(file)
      setCoverImage(imageUrl);
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 gap-2 px-3.5 py-0 bg-blue rounded-[7px] text-white">
          <PlusIcon className="w-5 h-5" />
          <span className="font-body-3 text-sm">Ajouter un membre</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px] p-0 rounded-2xl">
        <DialogHeader className="border-b border-neutral-200 p-4 rounded-t-2xl">
          <DialogTitle className="text-lg font-bold leading-7">
            Ajouter un membre
          </DialogTitle>
          {/* <XIcon className="h-5 w-5 absolute right-4 top-4 cursor-pointer" /> */}
        </DialogHeader>

        {
          step === 1 &&
          <div className="flex flex-col w-full p-10 pt-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-body-3 leading-[var(--body-3-line-height)] tracking-[var(--body-3-letter-spacing)]">
                Nom complets
              </label>
              <Input
                className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200"
                placeholder="Entrez le nom complet"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="category">Fonction</Label>
              <Select value={fonction} onValueChange={setFonction}>
                <SelectTrigger className="h-12 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                  <SelectValue placeholder="Sélectionnez sa/ses fonction(s)" />
                </SelectTrigger>
                <SelectContent>
                  {/* Function options would go here */}
                  <SelectItem value="archeveque">Archevêque</SelectItem>
                  <SelectItem value="pretre">Prêtre</SelectItem>
                  <SelectItem value="diacre">Diacre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-body-3 leading-[var(--body-3-line-height)] tracking-[var(--body-3-letter-spacing)]">
                Établissement lié
              </label>
              <Select>
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
              <div className="h-24 w-24 relative self-stretch rounded-xl bg-[#f0f0f0] flex items-center justify-center">
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
                placeholder="Une description du membre..."
                className="min-h-20"
              />
            </div>

            {/* Textarea */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description">Description(anglais)</Label>
              <Textarea
                placeholder="Une description du membre..."
                className="min-h-20"
              />
            </div>

            <div className="flex flex-row gap-4">
              <Button variant={'outline'} onClick={() => setStep(1)} className="w-1/3 mt-8 h-12 rounded-lg">
                Retour
              </Button>
              <Button onClick={() => setStep(2)} className="w-2/3 h-12 mt-8 bg-blue text-white rounded-lg">
                Ajouter ce membre
              </Button>
            </div>
          </div>
        }


      </DialogContent>
    </Dialog>
  );
};

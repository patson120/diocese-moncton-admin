
'use client'

import { Dossier } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useRole from "@/hooks/use-role";
import useRecaptcha from "@/hooks/useRecaptcha";
import { apiClient } from "@/lib/axios";
import { handleImageUpload } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { SelectContent } from "@radix-ui/react-select";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";

export const AddImageFormSection = ({dossier_id}: {dossier_id?: string}): JSX.Element => {

  const { captchaToken, handleRecaptchaChange, verifyRecaptchaToken } = useRecaptcha()

  const { canAddImage} = useRole()
 
  const [fileName, setFileName] = useState("")
  const [coverImage, setCoverImage] = useState('')
  const [fileImage, setFileImage] = useState<File | undefined>();
  const [files, setFiles] = useState<File[]>([]);
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [folders, setFolders] = useState<Dossier[]>([]);
  const [folderId, setFolderId] = useState(dossier_id ?? "0");

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFiles(Array.from(e.target.files!))
    
    if (file) {
      setFileName(file.name)
      const imageUrl = await handleImageUpload(file)
      
      setFileImage(file)
      setCoverImage(imageUrl);
    }
  };

  const handleAddImage = async () => {
    if (isLoading) return
    if (!fileImage) {
      toast.warning(
        <p className='p-3 bg-red-500 text-white rounded-md'>
          Veuillez choisir une image avant de continuer !
        </p>
      )
      return
    }

    setIsLoading(true)
    // Creer l'image de couverture
    try {
      const recaptchaReponse = await verifyRecaptchaToken();
      const recaptchaData = await recaptchaReponse.json();

      if (!recaptchaData.success) {
        toast.error(recaptchaData.message || 'Erreur de vérification reCAPTCHA');
        setIsLoading(false);
        return;
      }
      let result: any;
      for (let index = 0; index < files.length; index++) {
        result = await handleAddSingleFile(files[index])
      }
      
      if (result.id){
        toast.success("Image enregistrée avec succès !")
        setFileImage(undefined)
        setCoverImage('');
        setTimeout(() => {  
          window.location.reload()
        }, 1500);
        setOpenModal(false)
      }
     
    } 
    catch (error: any) {
      toast.error(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Une erreur est survenue. Erreur:  {JSON.stringify(error.message)}
        </div>
      )
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleAddSingleFile = async (file: File) => {
    const formdata = new FormData();
    formdata.append("titre", file.name);
    formdata.append("fichier", file);
    if (folderId !== "0"){
      formdata.append("dossier_id", folderId );
    }
    return await apiClient.post('/api/galeries', formdata, {
      'Content-Type': 'multipart/form-data'
    })
  }

  useEffect(() => {
    (async () => {
      const response: Dossier[] = await apiClient.get("/api/dossiers")
      setFolders(response)
    })()
  }, [])

  if (!canAddImage()) return <></>
  

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button onClick={( ) => setOpenModal(true)} className="bg-blue hover:bg-blue/90 text-white gap-2">
          <PlusIcon className="w-5 h-5" />
          Ajouter une image
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="max-w-4xl p-3 rounded-2xl">
        <DialogClose className="absolute border-none w-5 h-5 top-[14px] right-[14px]">
        </DialogClose>
        <DialogHeader className='hidden'>
            <DialogTitle></DialogTitle>
        </DialogHeader>
        
        <div className='w-full h-[calc(60vh)] z-[5] bg-[#f0f0f0] self-stretch relative rounded-xl overflow-hidden'>
          <Button 
            onClick={( ) => setOpenModal(false)}
            variant={'outline'} 
            className="bg-white p-0 absolute z-10 top-2 right-2 h-10 w-10 justify-center items-center rounded-full">
            <PlusIcon className="w-5 h-5 rotate-45" />  
          </Button>
          
          { 
            (coverImage) ?
              <Image
                alt={`Image details`}
                src={`${coverImage}`}
                style={{ objectFit: 'cover' }}
                fill
                priority
              /> :
              <div className="h-full w-full flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-5">
                  <Image
                    width={80}
                    height={80}
                    alt="Vector"
                    src="/vector.svg"
                  />
                  <div className="text-center">
                    <h4 className="font-bold">Ajouter une image</h4>
                    <p className="text-gray">png, jpg, jpeg, svg, gif, webp. ajoutez des images optimisées</p>
                  </div>
                </div>        
              </div>
          }
          <div className="absolute z-[5] bottom-5 left-0 right-0 flex justify-center items-center">
            <div className="w-1/2">
              <Input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="h-10 bg-white border-none"
                placeholder="Nom du fichier image"
              />
            </div>
          </div>
          <Input
            accept="image/png,image/jpg,image/jpeg,image/svg,image/gif,image/webp"
            type="file"
            multiple={true}
            onChange={handleCoverImageChange}
            className="h-full w-full absolute cursor-pointer inset-0 opacity-0 z-[3]"
          />
        </div>

        <div className="flex flex-col space-y-2 z-[10]">
          <Label className="text-right text-gray">Fichiers ({files.length}) </Label>
          <Label className="mb-1">Mettre l'image dans... </Label>
          <Select 
              onValueChange={setFolderId}
              defaultValue={folderId}>
              <SelectTrigger className="h-11 px-3 py-3.5 rounded-lg border border-neutral-200 text-[#454545]">
                <SelectValue placeholder="Sélectionnez un dossier" />
              </SelectTrigger>
              <SelectContent className="bg-white h-[180px] overflow-y-scroll v-scroll border border-neutral-200 rounded-md">
                <SelectItem disabled value="0">Aucun</SelectItem>
                {
                  folders && folders.map(f => (
                    <SelectItem className="w-full px-6" key={f.id} value={`${f.id}`}>{f.titre_fr}</SelectItem>
                  ))
                }
              </SelectContent>
          </Select>
        </div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          onChange={handleRecaptchaChange}
        />
        <div className='flex justify-center items-center  my-4 gap-3'>
          <Button disabled={ isLoading || !captchaToken } onClick={handleAddImage} className="px-3.5 py-0 bg-blue text-white rounded-[7px]">
            { isLoading && <Loader className="h-5 w-5 mr-2" /> }
            <span className="font-body-3 font-bold whitespace-nowrap">{ files.length > 1 ? `Ajouter les images (${files.length})` : "Ajouter l'image" }</span>
          </Button>         
        </div>
      </DialogContent>
    </Dialog>
  );
};

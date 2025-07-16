
'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import useRole from "@/hooks/use-role";
import { apiClient } from "@/lib/axios";
import { handleImageUpload } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { JSX, useState } from "react";
import { toast } from "sonner";

export const AddImageFormSection = (): JSX.Element => {

  const { canAddImage} = useRole()
 
  const [fileName, setFileName] = useState("")
  const [coverImage, setCoverImage] = useState('')
  const [fileImage, setFileImage] = useState<File | undefined>();
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await handleImageUpload(file);
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
    const formdata = new FormData();
    formdata.append("titre", fileName);
    formdata.append("fichier", fileImage!);
    try {
      const result: any = await apiClient.post('/api/galeries', formdata, {
        'Content-Type': 'multipart/form-data'
      });
  
      if (result.id) {
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
        
        <div className='w-full h-[calc(70vh)] z-[5] bg-[#f0f0f0] self-stretch relative rounded-xl overflow-hidden'>
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
            onChange={handleCoverImageChange}
            className="h-full w-full absolute cursor-pointer inset-0 opacity-0 z-[3]"
          />
        </div>
        
        <div className='flex justify-center items-center  my-4 gap-3'>
          <Button onClick={handleAddImage} className="px-3.5 py-0 bg-blue text-white rounded-[7px]">
            { isLoading && <Loader className="h-5 w-5 mr-2" /> }
            <span className="font-body-3 font-bold whitespace-nowrap">
                Ajouter l'image
            </span>
          </Button>  
                    
        </div>
      </DialogContent>
    </Dialog>
  );
};

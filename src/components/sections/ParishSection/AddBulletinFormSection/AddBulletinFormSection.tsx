
'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import useRole from "@/hooks/use-role";
import useRecaptcha from "@/hooks/useRecaptcha";
import { apiClient } from "@/lib/axios";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { getMonth } from "date-fns";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { JSX, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";

export const AddBulletinFormSection = ( {paroisse_id}: { paroisse_id: number}): JSX.Element => {

  const { captchaToken, handleRecaptchaChange, verifyRecaptchaToken } = useRecaptcha()

  const { canAddBulletin } = useRole()
 
  const [fileName, setFileName] = useState("")
  const [file, setFile] = useState<File | undefined>();
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDocumentChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileTarget = e.target.files?.[0];
    if (fileTarget) {
      setFile(fileTarget)
      setFileName(fileTarget.name)
    } 
  };

  const handleAddRessource = async () => {

    if (!canAddBulletin()){ 
      return toast.success("Vous n'avez pas le droit d'effectuer cette opération !")
  }
    if (isLoading) return
    if (!file) {
      toast.warning(
        <p className='p-3 bg-red-500 text-white rounded-md'>
          Veuillez choisir un ducment avant de continuer !
        </p>
      )
      return
    }

    setIsLoading(true)
    // Ajouter un bulletin
    const formdata = new FormData();
    formdata.append("paroisse_id", `${paroisse_id}`);
    formdata.append("titre_fr", fileName);
    formdata.append("titre_en", fileName);
    formdata.append("mois", `${getMonth(new Date()) + 1}`);
    formdata.append("document", file!);

    try {
      const recaptchaReponse = await verifyRecaptchaToken();
      const recaptchaData = await recaptchaReponse.json();

      if (!recaptchaData.success) {
        toast.error(recaptchaData.message || 'Erreur de vérification reCAPTCHA');
        setIsLoading(false);
        return;
      }
    
      const result: any = await apiClient.post('/api/bulletin_paroissial', formdata, {
        'Content-Type': 'multipart/form-data'
      });
      if (result.id) {
        toast.success("Bulletin enregistré avec succès !")
        setFile(undefined)
        setTimeout(() => {
          window.location.reload()
        }, 1500);
        setOpenModal(false)
      }
    } catch (error: any) {
      toast.warning(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Une erreur est survenue. Erreur:  {JSON.stringify(error.message)}
        </div>
      )
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button disabled={!canAddBulletin()} onClick={( ) => setOpenModal(true) } className="bg-blue hover:bg-blue/90 text-white gap-2">
          <PlusIcon className="w-5 h-5" />
          Ajouter un bulletin
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
            onClick={() => setOpenModal(false)}
            variant={'outline'} 
            className="bg-white p-0 absolute z-10 top-2 right-2 h-10 w-10 justify-center items-center rounded-full">
            <PlusIcon className="w-5 h-5 rotate-45" />  
          </Button>
          { 
            (file) ?
              <div className="h-full w-full flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-5">
                  <div className="w-[100px] h-20 bg-white rounded-2xl border border-solid border-[#d9d9d9] flex items-center justify-center">
                    <span className="font-body-3 text-[length:var(--body-3-font-size)] text-gray uppercase text-center">
                      {file.type.split("/")[1]}
                    </span>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold">{file.name}</h4>
                    <p className="text-gray">Nom actuel du document</p>
                  </div>
                </div>        
              </div> :
              <div className="h-full w-full flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-5">
                  <Image
                    width={80}
                    height={80}
                    alt="Vector"
                    src="/vector-file.png"
                  />
                  <div className="text-center">
                    <h4 className="font-bold">Ajouter un document</h4>
                    <p className="text-gray">docx, pdf, xslx... ajoutez des documents optimisés</p>
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
                placeholder="Modifier le nom du document"
              />
            </div>
          </div>
          <Input
            accept=".doc,.docx,.pdf,.xlx,xslx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            type="file"
            onChange={handleDocumentChange}
            className="h-full w-full absolute cursor-pointer inset-0 opacity-0 z-[3]"
          />
        </div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          onChange={handleRecaptchaChange}
        />
        
        <div className='flex justify-center items-center  my-4 gap-3'>
          <Button disabled={ isLoading || !captchaToken } onClick={handleAddRessource} className="px-3.5 py-0 bg-blue text-white rounded-[7px]">
            { isLoading && <Loader className="h-5 w-5 mr-2" /> }
            <span className="font-body-3 font-bold whitespace-nowrap">
                Ajouter le bulletin
            </span>
          </Button>  
        </div>
      </DialogContent>
    </Dialog>
  );
};

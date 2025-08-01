import { Ressource } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader } from "@/components/ui/loader";
import useRole from "@/hooks/use-role";
import { apiClient } from "@/lib/axios";
import { InfoIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface AudioPlayerProps {
  audio: Ressource,
  setRessources: (ressources: any) => void
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audio, setRessources }) => {

  const { canDeleteAudio } = useRole()
  
  const [openModal, setOpenModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // const embedUrl = audio.media.replace("watch?v=", "embed/"); // Convertir l'URL en URL d'intégration
  // const embedUrl = video.media.replace("watch?v=", "v/");

  const deleteRessources = async (idRessource: number) => {
    if (!canDeleteAudio()){ 
      return toast.success("Vous n'avez pas le droit d'effectuer cette opération !")
    }
    if (isDeleting) return
    setIsDeleting(true)
    try {
      await apiClient.delete(`/api/ressources/${idRessource}`)
      setRessources((prev: Ressource[]) => prev.filter((doc: Ressource) => doc.id !== idRessource))
      toast.success("Ressource supprimée avec succès")
    } catch (error: any) {
      toast.error(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          Une erreur est survenue. Erreur:  {JSON.stringify(error.message)}
        </div>
      )
    }
    finally{
      setIsDeleting(false)
    }
  }
  
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
    <DialogTrigger asChild>
      <Button
        onClick={( ) => setOpenModal(true)}
        variant="ghost"
        className="w-[18px] h-[18px] top-2 right-2 p-0">
        <MoreHorizontalIcon className="w-[18px] h-[18px]" />
      </Button>
    </DialogTrigger>
    <DialogContent aria-describedby={undefined} className="max-w-4xl p-3 rounded-2xl">
      <DialogClose className="absolute border-none w-5 h-5 top-[14px] right-[14px]">
      </DialogClose>
      <DialogHeader className='hidden'>
          <DialogTitle></DialogTitle>
      </DialogHeader>
      
      <div className='w-full max-h-[calc(70vh)] z-[5] bg-[#f0f0f0] self-stretch relative rounded-xl overflow-hidden'>
        <Button 
          onClick={() => setOpenModal(false)}
          variant={'outline'} 
          className="bg-white p-0 absolute z-10 top-2 right-2 h-10 w-10 justify-center items-center rounded-full">
          <PlusIcon className="w-5 h-5 rotate-45" />  
        </Button>

        <div className="w-full bg-gray-100 p-4 rounded-lg flex items-center gap-4">
          <audio controls className="w-full" title={`${audio?.titre_fr || audio?.titre_en}`}>
            <source src={audio.media} type="audio/*" />
            Votre navigateur ne supporte pas la lecture audio.
          </audio>
        </div>
      </div>
      <div className='flex justify-between items-center gap-3'>
        <div className='flex gap-3'>
          <Button onClick={() => setOpenModal(false)} className="px-3.5 py-0 bg-blue text-white rounded-[7px]">
            <span className="font-body-3 whitespace-nowrap">
              Fermer
            </span>
          </Button>
          <Button
            onClick={() => deleteRessources(audio.id)}
            variant="outline"
            className=" p-3.5 bg-white rounded-lg border border-solid border-[#d9d9d9]">
            { isDeleting && <Loader className="h-5 w-5 mr-2" />}
            <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
                Supprimer
            </span>
          </Button>
        </div>
        <div className='flex items-center gap-1'>
          <InfoIcon className='h-5 w-5' />
          <p className='text-gray'>{audio?.titre_fr || audio?.titre_en}</p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  );
};
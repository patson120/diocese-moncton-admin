
"use client"

import { Editor } from '@/components/Editor/Editor'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { apiClient } from '@/lib/axios'
import { TabsContent } from '@radix-ui/react-tabs'
import { ArrowLeft, CopyIcon, ExternalLinkIcon, } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Actualite, Image } from '@/app/types'
import EditActuDialog from './EditActuDialog'
import { cn, copyToClipboard } from '@/lib/utils'
import { GaleryPopup } from '@/components/sections/GaleryPopup'

export default function EditActualiteForm({actualite}: { actualite: Actualite }) {
  const router = useRouter()
  const [isSave, setIsSave] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [alertModal, setAlertModal] = useState("");
  const [isEnglishVersion, setIsEnglishVersion] = useState(false);
  const [isEmptyActu, setIsEmptyActu] = useState(false);
  const [openPublishModal, setOpenPublishModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | undefined>( actualite.galerie.length > 0 ? 
    { ...actualite.galerie[0], path: `${process.env.NEXT_PUBLIC_API_URL}/${actualite.galerie[0].path}`} 
    : undefined
  );
  const [section, setSection] = useState<'french' | 'english'>('french');
  const [title, setTitle] = useState({
    french: actualite.titre_fr,
    english: actualite.titre_en,
  })
  const [content, setContent] = useState({
    french: actualite.description_fr,
    english: actualite.description_en,
  })

  const handlePublish = async (data: any) => {
    if (isLoading) return
    setIsLoading(true)
    const response: any = await apiClient.put(`/api/actualites/${actualite.id}`, {
      ...data,
      is_actif: actualite.is_actif,
      titre_fr: title.french,
      titre_en: title.english,
      description_fr: content.french,
      description_en: content.english,
      is_brouillon: actualite.is_brouillon,
      galerie_id: selectedImage?.id,
    })    

    if (response.id) {
      setTitle({french: '', english: '',})
      setContent({french: '', english: '',})
      setOpenPublishModal(false)
      setIsSave(1)
      setAlertModal("")
      toast.success("Actualité modifée avec succès !")
      setTimeout(() => {
        router.back() 
      }, 1500);
    }
    else {
      toast.warning(
        <div className='p-3 bg-red-500 text-white rounded-md'>
          {JSON.stringify(response)}
        </div>
      )
    }
    setIsLoading(false)
  }

  const verifyEnglishContent = () => {
    if (title.french.trim() == '' || content.french.trim() == '') {
      return setIsEmptyActu(prev => !prev)
    }
    if (title.english.trim() == '' || content.english.trim() == '') {
      return setIsEnglishVersion(prev => !prev)
    }
    else {
      return setOpenPublishModal(prev => !prev)
    }
  }

  const goback = () => {
    if (isSave != 0) {
      setAlertModal("goback")
    }
    else {
      router.back()
    }
  }

  return (
    <div className="relative w-full h-screen bg-[#f0f0f4] overflow-x-hidden">
      {/* Secondary navigation bar */}
      <div className="fixed w-full h-[70px] z-10 top-0 left-0 bg-white flex items-center justify-between px-[50px]">
        {/* Back to home button */}
        <Button
          onClick={goback}
          variant="ghost"
          className="h-10 gap-2 px-3.5 py-0 bg-white rounded-[7px]">
          <ArrowLeft className='w-[18px] h-[18px]' />
          <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
            Retour à l&apos;accueil
          </span>
        </Button>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="h-10 px-3.5 py-0">
            <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
              Sauvegarder brouillon
            </span>
          </Button>
          <Separator orientation="vertical" className="h-[34px]" />
          <Button
            variant="outline"
            className="h-10 px-3.5 py-0 border-[#d9d9d9] rounded-[7px]">
            <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
              Prévisualiser
            </span>
          </Button>
          <Button onClick={verifyEnglishContent} className="h-10 px-3.5 py-0 bg-blue text-white rounded-[7px]">
            {isLoading && <Loader className='text-white mr-2' />}
            <span className="font-body-3 whitespace-nowrap">
              Publier actualité
            </span>
          </Button>
        </div>
      </div>
      <div className='mt-[90px] bg-black'></div>

      {/* Main content area */}
      <div className="max-w-4xl  mx-auto bg-transparent">
        <div className="w-full bg-transparent">
          {/* Language tabs */}
          <div className="my-4 rounded-lg overflow-hidden bg-white">
            <Tabs defaultValue="french" className="w-full">
              <TabsList className="flex justify-start w-full h-auto bg-[#f8f8f8] rounded-[0px_12px_0px_0px] p-0">
                <TabsTrigger
                  value="french"
                  onClick={() => setSection('french')}
                  className="flex items-center gap-2 p-3 data-[state=active]:bg-noir-dashboard data-[state=active]:text-white data-[state=inactive]:bg-white rounded-[12px_12px_0px_0px]">
                  <div className="relative w-3.5 h-3.5 rounded-[7px] border border-solid border-current">
                    {/* Filled circle for active tab */}
                    <div className="data-[state=active]:block hidden relative w-2.5 h-2.5 top-px left-px bg-current rounded-[4.9px]" />
                  </div>
                  <span className="font-body-3 text-sm">Version française</span>
                </TabsTrigger>

                <TabsTrigger
                  value="english"
                  onClick={() => setSection('english')}
                  className="flex items-center gap-2 p-3 data-[state=active]:bg-noir-dashboard data-[state=active]:text-white data-[state=inactive]:bg-white rounded-[12px_12px_0px_0px]">
                  <div className="relative w-3.5 h-3.5 rounded-[7px] border border-solid border-current" />
                  <span className="font-body-3 text-sm">Version anglaise</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="french" className="w-full mt-6 p-0 border-none">
                <div className="flex flex-col p-10 items-start gap-6 ">
                  <Card className="relative w-full bg-white rounded">
                    <CardContent className="w-full p-0">
                      {/* Image upload area */}
                      <div className="h-[250px] w-full relative bg-[#f8f8f8] rounded-xl overflow-hidden border border-solid border-[#d9d9d9]"
                        style={{
                          backgroundImage: selectedImage ? `url(${selectedImage.path})` : 'none',
                          backgroundPosition: "center center",
                          backgroundRepeat: "no-repeat",
                        }}>
                        <div className='absolute inset-0 w-full h-full bg-black/30 flex justify-center items-center'>
                          <div className='w-auto h-min flex flex-col'>
                            <GaleryPopup setSelectedImage={setSelectedImage} >
                              <Button
                                variant="ghost"
                                className={cn('rounded-xl py-1 border',
                                  selectedImage ? 'border-white' : 'border-gray'
                                )}>
                                <p className={cn(selectedImage ? 'text-white' : 'text-gray'
                                )}>Insérer une image de couverture</p>
                              </Button>
                            </GaleryPopup>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className='w-full z-0'>
                    <label htmlFor="titre" className='text-lg text-gray font-semibold mb-2'>Titre</label>
                    <Editor
                      value={title.french}
                      onChange={(text: string) => setTitle(prev => ({ ...prev, french: text }))}
                      className='h-48'
                    />
                  </div>
                  <div className='w-full z-[5]'>
                    <label htmlFor="contenu" className='text-lg text-gray font-semibold mb-2'>Contenu</label>
                    <Editor
                      value={content.french}
                      onChange={(text: string) => setContent(prev => ({ ...prev, french: text }))}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="english"
                id='english'
                className="w-full mt-6 p-0 border-none">
                <div className="flex flex-col p-10 items-start gap-6 ">
                  <Card className="relative w-full bg-white rounded">
                    <CardContent className="w-full p-0">
                      {/* Image upload area */}
                      <div className="h-[250px] w-full relative bg-[#f8f8f8] rounded-xl overflow-hidden border border-solid border-[#d9d9d9]"
                        style={{
                          backgroundImage: selectedImage ? `url(${selectedImage.path})` : 'none',
                          backgroundPosition: "center center",
                          backgroundRepeat: "no-repeat",
                        }}>
                        <div className='absolute inset-0 w-full h-full bg-black/30 flex justify-center items-center'>
                          <div className='w-auto h-min flex flex-col'>
                            <GaleryPopup setSelectedImage={setSelectedImage} >
                              <Button
                                variant="ghost"
                                className={cn('rounded-xl py-1 border',
                                  selectedImage ? 'border-white' : 'border-gray'
                                )}>
                                <p className={cn(selectedImage ? 'text-white' : 'text-gray'
                                )}>Insérer une image de couverture</p>
                              </Button>
                            </GaleryPopup>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className='w-full z-0 '>
                    <label htmlFor="title" className='text-lg text-gray font-semibold mb-2'>Title</label>
                    <Editor
                      value={title.english}
                      onChange={(text: string) => setTitle(prev => ({ ...prev, english: text }))}
                      className='h-48'
                    />
                  </div>
                  <div className='w-full z-[5]'>
                    <label htmlFor="content" className='text-lg text-gray font-semibold mb-2'>Content</label>
                    <Editor
                      value={content.english}
                      onChange={(text: string) => setContent(prev => ({ ...prev, english: text }))}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      {/* Floating action buttons */}
      <div className="flex flex-col w-[244px] items-start gap-2 fixed bottom-[62px] right-[38px]">
        <Card onClick={() => copyToClipboard(section == 'french' ? title.french : title.english)} className="shadow-[0px_4px_12px_#0000001a] rounded-lg cursor-pointer">
          <CardContent className="flex items-start gap-1 p-3">
            <CopyIcon className="w-5 h-5" />
            <span className="font-body-3 text-noir-dashboard text-sm">
              Copier le titre
            </span>
          </CardContent>
        </Card>
        <Card onClick={() => copyToClipboard(section == 'french' ? content.french : content.english)} className="shadow-[0px_4px_12px_#0000001a] rounded-lg cursor-pointer">
          <CardContent className="flex items-start gap-1 p-3">
            <CopyIcon className="w-5 h-5" />
            <span className="font-body-3 text-noir-dashboard text-sm">
              Copier le contenu
            </span>
          </CardContent>
        </Card>
        <Card className="shadow-[0px_4px_12px_#0000001a] rounded-lg w-full">
          <CardContent className="flex items-start gap-1 p-3">
            <ExternalLinkIcon className="w-5 h-5" />
            <a className='no-underline' href='https://www.deepl.com/fr/translator' target='_blank' >
              <span className="font-body-3 text-noir-dashboard text-sm">
                Traduire le texte sur Deepl
              </span>
            </a>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isEnglishVersion} onOpenChange={setIsEnglishVersion}>
        <DialogContent aria-describedby={undefined} className="max-w-sm p-10 text-center rounded-2xl">
          <DialogClose onClick={() => setIsEnglishVersion(false)} className="absolute border-none w-5 h-5 top-[14px] right-[14px]">
          </DialogClose>
          <DialogHeader className='hidden'>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <h1 className='text-xl font-bold'>Traduction anglaise manquante</h1>
          <p className='text-gray text-sm'>Veuillez ajouter la version anglaise de cette actualité</p>
          <Button onClick={() => setIsEnglishVersion(prev => !prev)} className="px-3.5 py-0 bg-blue text-white rounded-[7px]">
            <span className="font-body-3 whitespace-nowrap">
              Completer la version anglaise
            </span>
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isEmptyActu}onOpenChange={setIsEmptyActu}>
        <DialogContent aria-describedby={undefined} className="max-w-sm p-10 text-center rounded-2xl">
          <DialogClose onClick={() => setIsEmptyActu(false)} className="absolute border-none w-5 h-5 top-[14px] right-[14px]">
          </DialogClose>
          <DialogHeader className='hidden'>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <h1 className='text-xl font-bold'>L’actualité est vide</h1>
          <p className='text-gray text-sm'>Veuillez ajoutez du texte à votre actualité avant de le publier</p>
          <Button onClick={() => setIsEmptyActu(prev => !prev)} className="px-3.5 py-0 bg-blue text-white rounded-[7px]">
            <span className="font-body-3 whitespace-nowrap">
              Compléter l’actualité
            </span>
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={alertModal === 'goback'} onOpenChange={(val) => setAlertModal('')}>
        <DialogContent aria-describedby={undefined} className="max-w-sm p-10 text-center rounded-2xl">
          <DialogClose onClick={() => setAlertModal('')} className="absolute border-none w-5 h-5 top-[14px] right-[14px]">
          </DialogClose>
          <DialogHeader className='hidden'>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <h1 className='text-xl font-bold'>Attention, votre travail n’est pas enregistré !</h1>
          <p className='text-gray text-sm'>Vous risquez de perdre votre travail. Enregistrez le comme brouillon ou publier.</p>
          <div className='flex gap-3'>
            <Button
              onClick={() => {
                setAlertModal('goback')
                router.back()
              }}
              variant="outline"
              className=" p-3.5 bg-white rounded-lg border border-solid border-[#d9d9d9]">
              <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
                Partir quand même
              </span>
            </Button>
            <Button onClick={() => setAlertModal("")} className="px-3.5 py-0 bg-blue text-white rounded-[7px]">
              <span className="font-body-3 whitespace-nowrap">
                Annuler
              </span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <EditActuDialog
        imageUrl={selectedImage?.path!}
        actualite={actualite}
        isLoading={isLoading}
        handlePublish={handlePublish}
        open={openPublishModal}
        onOpenChange={setOpenPublishModal}
      />
    </div>
  )
}

"use client"

import Text from '@/components/shared/Text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useRole from '@/hooks/use-role';
import { apiClient } from '@/lib/axios';
import { formatDateToLocal } from '@/lib/utils';
import { Church, LayoutGridIcon, ListFilter, MailIcon, MapPinIcon, MoreHorizontalIcon, PhoneIcon, PlusIcon, SaveAll, SearchIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import { Image as ImageType, Paroisse, TypeParoisse } from '../../../app/types';
import { GaleryPopup } from '../GaleryPopup';
import { MapContainer } from '../MapSection/map-container';
import { AddBulletinFormSection } from './AddBulletinFormSection';
import { AddParishFormSection } from './AddParishFormSection';
import { AddUnitePastoraleFormSection } from './AddUnitePastoraleFormSection';
import { EditParishFormSection } from './EditParishFormSection';

export default function ParishSection() {
    const router = useRouter()

    const { canUpdateParish, canDeleteImage, canDeleteParish, canUpdateParishUnit, canDeleteBulletin, canDeleteParishUnit } = useRole()

    const [isStatutLoading, setIsStatutLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openModalUnite, setOpenModalUnite] = useState(false)
    const [selecteParish, setSelectedParish] = useState<Paroisse | undefined>()
    const [parishes, setParishes] = useState<Paroisse[]>([])
    const [unitePastorales, setUnitePastorales] = useState<TypeParoisse[]>([])
    const [unitePastorale, setUnitePastorale] = useState<TypeParoisse>()
    const [statut, setStatut] = useState(1)
    const [selectedItem, setSelectedItem] = useState<any>('paroisses')

    const [query, setQuery] = useState('')
    const [selectedImage, setSelectedImage] = useState<ImageType | undefined>();
    const [images, setImages] = useState<ImageType[]>([]);
    const [newImages, setNewImages] = useState<ImageType[]>([]);


    const [isLoading, setIsLoading] = useState(false)

    
    const searchParams = useSearchParams()
    const pathname = usePathname()

    // parish tabs data
    const parishTabs = [
        { value: "paroisses", label: "Paroisses", active: true },
        { value: "unites-paroissiales", label: "Unités pastorales", active: false },
    ];

    useEffect(() => {
        // Récupérer les unités paroitiales depuis l'api
        (async () => {
            const response: TypeParoisse[] = await apiClient.get(`/api/type_paroisses`)
            setUnitePastorales(response)
        })()
    }, [])

    const fetchUnitePastorale = async (id: number) => {
        // setIsStatutLoading(true)
        const response: TypeParoisse = await apiClient.get(`/api/type_paroisses/${id}`)
        setUnitePastorale(response)
        if (response.id){
            setOpenModalUnite(true)
        }
        // setIsStatutLoading(false)
    }

    useEffect(() => {
        const getParishes = async () => {
            const response: any = await apiClient.get(`/api/paroisses?paginate=20000&statut=${statut}&nom=${query}`)
            setParishes(response.data)
        }
        getParishes()
    }, [statut, query])

    const handleSearch = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const params = new URLSearchParams(searchParams)
        // params.set('page', '1');
    
        setQuery(value)
        // If the value is empty, remove the query parameter
        if (value) {
            params.set('query', value)
        }
        else {
            params.delete('query')
        }
        router.replace(`${pathname}?${params.toString()}`)
    }, 800)

    const handleDeleteParish = async () => {
        if (!canDeleteParish()){ 
            return toast.success("Vous n'avez pas le droit d'effectuer cette opération !")
        }
        if (isDeleting) return
        setIsDeleting(true)
        try {
            await apiClient.delete(`/api/paroisses/${selecteParish?.id}`);
            setOpenModal(false)
            setParishes(prev => (prev.filter(parish => parish.id !== selecteParish?.id)))
            
        } catch (error) {
            toast.error(
                <div className='p-3 bg-red-500 text-white rounded-md'>
                    Error deleting parish: {JSON.stringify(error)}
                </div>
            )
        } finally {
            setIsDeleting(false)
        }
    }

    const handleChangeStatus =  async () => {

        if (isStatutLoading) return
        setIsStatutLoading(true)        
        const formdata = new FormData()
        formdata.append("id", `${selecteParish?.id!}`)
        formdata.append("type_paroisse_id", `${selecteParish?.type_paroisse_id!}`)
        formdata.append("nom", `${selecteParish?.nom!}`)
        formdata.append("nom_en", selecteParish?.nom_en!)
        formdata.append("histoire", selecteParish?.histoire!)
        formdata.append("histoire_en", selecteParish?.histoire_en!)
        formdata.append("telephone", selecteParish?.telephone!)
        formdata.append("email", selecteParish?.email!)
        formdata.append("site_web", selecteParish?.site_web!)
        formdata.append("horaires", `${selecteParish?.horaireparoisses.map(item => `${item.jour}=${item.heure}`).join(",")}`)
        formdata.append("langue", `${selecteParish?.langue}`)
        formdata.append("horaire_bureau", `${selecteParish?.horaire_bureau}`)
        formdata.append("gps", selecteParish?.gps!)
        formdata.append("statut", `${ selecteParish?.statut === 1 ? '0': '1' }`)
        formdata.append("adresse", selecteParish?.adresse!)

        try {
            const response: any = await apiClient.post(`/api/paroisses/${selecteParish?.id}?_method=PUT`, formdata, {
                'Content-Type': 'multipart/form-data'
            });
            
            if (response.id) {
                toast.success('Paroisse modifié avec succès');
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            }
            else {
                toast.error(
                    <div className='p-3 bg-red-500 text-white rounded-md'>
                    Erreur lors de la modification de la paroisse
                    </div>
                )
            }
        } catch (error) {
            toast.error(
            <div className='p-3 bg-red-500 text-white rounded-md'>
                Erreur lors de la modification de la paroisse {JSON.stringify(error)}
            </div>
            )
        }finally {
            setIsStatutLoading(false)
        }
    }

    const handleDeleteUnitePastorale = async () => {
        if (isDeleting) return
        if ( unitePastorale?.paroisses?.length ) {
            toast.error(
                <div className='p-3 bg-red-500 text-white rounded-md'>
                    Cette unité pastorale ne peut être supprimer car des paroisses y sont liées
                </div>
            )
            return
        }
        setIsDeleting(true)
        try {
            await apiClient.delete(`/api/type_paroisses/${unitePastorale?.id}`);
            setOpenModalUnite(false)
            setUnitePastorales(prev => (prev.filter(unite => unite.id !== unitePastorale?.id)))
            
        } catch (error) {
            toast.error(
                <div className='p-3 bg-red-500 text-white rounded-md'>
                    Erreur de suppression de l'unité pastorale: {JSON.stringify(error)}
                </div>
            )
        } finally {
            setIsDeleting(false)
        }
    }

    const handleDeleteRessource = async (id: number) => {
        if (!canDeleteBulletin(id)){ 
            return toast.success("Vous n'avez pas le droit d'effectuer cette opération !")
        }
        try {
            await apiClient.delete(`/api/bulletin_paroissial/${id}`);
            setSelectedParish((prev) => {
                if (!prev) return undefined; // Handle the case where `prev` is undefined
                return {
                  ...prev,
                  bulletins: prev.bulletins?.filter((b) => b.id !== id), // Ensure `bulletins` is updated correctly
                };
              });
            toast.success("Bulletin supprimé avec succès !")
        } catch (error: any) {
            toast.warning(
                <div className='p-3 bg-red-500 text-white rounded-md'>
                Une erreur est survenue. Erreur:  {JSON.stringify(error.message)}
                </div>
            )
        }
    }
    const handleAddImage = async (galerie_id: number) => {
        return await apiClient.post(`/api/add_media`, {
            galerie_id: galerie_id,
            paroisse_id: selecteParish?.id
        })
    }

    useEffect(() => {
      if(selectedImage && !images.find(img => img.id === selectedImage.id) ){
        setImages(prev =>([...prev, selectedImage]))
        setNewImages(prev =>([...prev, selectedImage]))
      }
    }, [selectedImage])

    useEffect(() => {
        const imgs: ImageType[] = (selecteParish?.media ?? []).map(img => (
        { 
            ...img, 
            path: `${process.env.NEXT_PUBLIC_API_URL}/${img.path}`
        }))
        setImages(imgs)
    }, [selecteParish])
    

    const handleSaveImages = () => {
        if (isLoading) return
        setIsLoading(true)
        try {
            newImages.forEach( async img => {
                await handleAddImage(img.id)
            })
            setNewImages([])
            toast.success("Images(s) ajoutée(s) avec succès !")
        }
        catch (error) {
            toast.error(
                <div className='p-3 bg-red-500 text-white rounded-md'>
                    Error adding image: {JSON.stringify(error)}
                </div>
            )
        } 
        finally { setIsLoading(false) }
    }

    const handleDeleteImage = async (img?: ImageType) => {
        if (!canDeleteImage()){ 
          return toast.success("Vous n'avez pas le droit d'effectuer cette opération !")
        }
        if (isDeleting) return;
        if (img) {
            setIsDeleting(true);
            try {
                const formdata = new FormData();
                formdata.append("id", `${img.id}`);
                await apiClient.post(`/api/delete_media`, formdata, { 'Content-Type': 'multipart/form-data' });

                setImages(images.filter(image => image.id !== img.id));
                setNewImages(newImages.filter(image => image.id !== img.id));
                toast.success("Image rétirée avec succès !")
            } catch (error) {
                toast.error(
                    <div className='p-3 bg-red-500 text-white rounded-md'>
                        Error deleting image: {JSON.stringify(error)}
                    </div>
                )
            }
            finally {
                setIsDeleting(false);
            }
        }
    }
    
    return (
        <main>
            <Tabs defaultValue="paroisses" >
                <header className="w-full bg-white pt-6 px-9">
                    <div className="flex items-start justify-between">
                        <div className="space-y-4">
                            <h3 className="font-legend text-xs text-gray tracking-[0] leading-normal ml-2.5">
                                GESTION DES PAROISSES
                            </h3>
                            <TabsList className="bg-transparent p-0 h-auto">
                                {parishTabs.map((item) => (
                                    <TabsTrigger
                                        key={item.value}
                                        value={item.value}
                                        onClick={() => setSelectedItem(item.value)}
                                        className="p-2.5 rounded-none font-body-3 text-sm data-[state=active]:border-b-[3px] data-[state=active]:border-blue data-[state=active]:text-blue data-[state=active]:shadow-none data-[state=inactive]:text-gray data-[state=inactive]:bg-transparent">
                                        {item.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                        <div>
                            {
                                selectedItem === 'paroisses' ?
                                <AddParishFormSection /> :
                                <AddUnitePastoraleFormSection />
                            }
                        </div>

                    </div>
                </header>

                <div className="p-6">
                    <section className="bg-white rounded-2xl p-7 space-y-6">
                        <ScrollArea className="w-full h-[calc(80vh)] mt-6">
                            <TabsContent
                                value="paroisses"
                                className="border-none">
                                <Tabs defaultValue="paroisses-actives">
                                    <div className="flex justify-between items-center">
                                        <TabsList className="justify-start h-12 p-0 bg-[#F1F3F6] rounded-md px-3 py-2">
                                            <TabsTrigger
                                                onClick={() => setStatut(1)}
                                                value="paroisses-actives"
                                                className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                                                <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                                                    Paroisses actives
                                                </span>
                                            </TabsTrigger>
                                            <TabsTrigger
                                                onClick={() => setStatut(0)}
                                                value="paroisses-fermees"
                                                className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                                                <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                                                    Paroisses fermées
                                                </span>
                                            </TabsTrigger>
                                        </TabsList>
                                        <div className="flex items-start gap-2.5">
                                            <div className="flex items-center gap-2">
                                                <div className="relative w-[256px]">
                                                    <Input
                                                        className="h-10 bg-neutral-100 border-none pl-9"
                                                        placeholder="Rechercher une paroisse"
                                                        onChange={handleSearch}
                                                        defaultValue={searchParams.get('query')?.toString()}
                                                    />
                                                    <SearchIcon className="absolute w-4 h-4 top-3 left-3 text-gray" />
                                                </div>
                                               {/*  <Button
                                                    variant="outline"
                                                    className="h-11 flex items-center gap-2.5 border border-[#d9d9d9] rounded-lg">
                                                    <ListFilter className="w-5 h-5" />
                                                    <span className="font-body-3 text-noir-dashboard">
                                                        Trier par...
                                                    </span>
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg">
                                                    <LayoutGridIcon className="w-5 h-5" />
                                                </Button> */}
                                            </div>
                                        </div>
                                    </div>

                                    <TabsContent value="paroisses-actives" className="mt-6">
                                        {/* Parish grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {parishes.map((parish, index) => (
                                                <Card
                                                    key={index}
                                                    className="w-full border-none shadow-none cursor-pointer"
                                                    onClick={() => {
                                                        setOpenModal(true)
                                                        setImages(parish.media!)
                                                        setSelectedParish(parish)
                                                    }}>
                                                    <CardContent className="p-0 w-full h-full space-y-2 bg-[#F9F9F0] rounded-xl flex flex-col justify-between gap-[10px] px-5 py-6">
                                                        <div className="">
                                                            <div className='h-6 w-6 mb-2'>
                                                                <Church className='h-5 w-5' />
                                                            </div>
                                                            <div className='body-1 font-bold text-black line-clamp-2'>
                                                                <Text className='text-sm font-bold' labelFr={parish.nom} labelEn={parish.nom_en} />
                                                                {/* <h1 className='text-lg font-bold'>{parish.nom}</h1> */}
                                                            </div>
                                                            <div className='body-2 mt-2 line-clamp-2 text-[#575757]'>
                                                                <p className='text-sm'>{parish.adresse}</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="paroisses-fermees" className="mt-6">
                                        {/* Priests grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {parishes.map((parish, index) => (
                                                <Card
                                                    key={index}
                                                    className="w-full border-none shadow-none cursor-pointer"
                                                    onClick={() => {
                                                        setOpenModal(true)
                                                        setSelectedParish(parish)
                                                    }}>
                                                    <CardContent className="bg-[#F9F9F0] rounded-xl px-5 py-6">
                                                        <div className='body-1 font-bold text-black line-clamp-2'>
                                                            <Text className='text-sm font-bold' labelFr={parish.nom} labelEn={parish.nom_en} />
                                                        </div>
                                                        <div className='body-2 line-clamp-2 text-[#575757]'>
                                                            <p className='text-gray'>Paroisse fermée</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </TabsContent>
                            <TabsContent
                                value="unites-paroissiales"
                                className="border-none">
                                    <div>
                                        <div className="flex items-start gap-2.5">
                                            <div className="flex items-center gap-2">
                                                <div className="relative w-[256px]">
                                                    <Input
                                                        className="h-10 bg-neutral-100 border-none pl-9"
                                                        placeholder="Rechercher une unité..."
                                                    />
                                                    <SearchIcon className="absolute w-4 h-4 top-3 left-3 text-gray" />
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    className="h-11 flex items-center gap-2.5 border border-[#d9d9d9] rounded-lg">
                                                    <ListFilter className="w-5 h-5" />
                                                    <span className="font-body-3 text-noir-dashboard">
                                                        Trier par...
                                                    </span>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg">
                                                    <LayoutGridIcon className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </div>
                                        {/* Priests grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                                            {unitePastorales.map((unite, index) => (
                                                <Card
                                                    key={index}
                                                    className="w-full border-none shadow-none cursor-pointer"
                                                    onClick={() => fetchUnitePastorale(unite.id)}>
                                                    <CardContent className="bg-[#F9F9F0] rounded-xl px-5 py-6">
                                                        <div className='body-1 font-bold text-black line-clamp-2'>
                                                            <Text className='text-base font-bold' labelFr={unite.intitule_fr} labelEn={unite.intitule_en} />
                                                        </div>
                                                        <div className='body-2 line-clamp-2 text-[#575757]'>
                                                            <p className='text-muted-foreground mt-2 text-sm'>Publiée le {formatDateToLocal((new Date(unite.created_at)).toISOString())} </p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                            </TabsContent>
                        </ScrollArea>
                    </section>
                </div>
            </Tabs>

            {/* Sheet */}
            <Sheet open={openModal} onOpenChange={setOpenModal} >
                <SheetContent aria-describedby={undefined} className="max-w-3xl min-w-3xl">
                    <SheetHeader >
                        <SheetTitle hidden>Détails de la paroissse</SheetTitle>
                    </SheetHeader>
                    <div className='absolute top-0 left-0 right-0 z-[1] bg-white'>
                        {/* Header with action buttons */}
                        <header className="w-full h-20 border-b border-[#d9d9d9] flex items-center justify-between px-12">
                            <Button variant="outline" className="h-10" onClick={() => setOpenModal(false)}>
                                Fermer
                            </Button>
                            <div className="flex gap-2">
                                {
                                    canUpdateParish() &&
                                    <Button onClick={handleChangeStatus} variant="outline" className="h-10">
                                        { isStatutLoading && <Loader className='h-5 w-5, mr-2' /> }
                                        {selecteParish?.statut === 1 ? 'Désactiver': 'Activer'}
                                    </Button>
                                }
                                {
                                    canUpdateParish() &&
                                    <EditParishFormSection parish={selecteParish!}  />
                                }
                                {
                                    canDeleteParish() &&
                                    <Button onClick={handleDeleteParish} className="h-10 bg-red-500 text-white hover:bg-blue/90">
                                        { isDeleting && <Loader className='h-5 w-5, mr-2' /> }
                                        Supprimer
                                    </Button>
                                }
                            </div>
                        </header>
                    </div>

                    {/* Scrollable content area */}
                    <div className="h-[calc(100%-80px)] mt-24 px-7 v-scroll overflow-y-scroll">
                        <div className="flex flex-col gap-[34px]">
                            {/* Parish header with image and basic info */}
                            <section className="w-full flex items-center gap-6">
                                <div className='relative shrink-0 w-[250px] h-[200px] rounded-lg overflow-hidden'>
                                    <Image
                                        fill
                                        priority
                                        alt="Église Immaculée-Conception"
                                        src={(selecteParish?.galerie && selecteParish?.galerie.length) ? `${process.env.NEXT_PUBLIC_API_URL}/${selecteParish?.galerie[0].path}`: `/assets/img/paroisse.jpeg`}
                                    />
                                </div>

                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-1">
                                        <div className="font-body-2 text-noir-dashboard text-base leading-4">
                                            <Text className='text-sm font-bold' labelFr={selecteParish?.nom} labelEn={selecteParish?.nom_en} />
                                        </div>
                                        <Text className='text-sm text-gray' labelFr={selecteParish?.type?.intitule_fr} labelEn={selecteParish?.type?.intitule_en} />
                                    </div>
                                    <div className="w-auto border-t border-b border-neutral-200 py-3.5">
                                        <div className="flex flex-wrap gap-[16px_35px]">
                                            <p className="font-body-3 whitespace-nowrap">
                                                <span className="text-[#575757] whitespace-nowrap">Langue</span>
                                                <span className="text-[#1c0004]">
                                                    &nbsp;<span className='font-bold'>{selecteParish?.langue == 'fr' ? 'Français': 'Anglais'}</span>
                                                </span>
                                            </p>
                                            {/* 
                                                <p className="font-body-3 whitespace-nowrap">
                                                    <span className="text-[#575757] whitespace-nowrap">Établi en</span>
                                                    <span className="text-[#1c0004]">
                                                        &nbsp;<span className='font-bold'>{selecteParish?.etabli_le}</span>
                                                    </span>
                                                </p>
                                                <p className="font-body-3 whitespace-nowrap">
                                                    <span className="text-[#575757] whitespace-nowrap">Ordonné en</span>
                                                    <span className="text-[#1c0004]">
                                                        &nbsp;<span className='font-bold'>{selecteParish?.ordonne_le}</span>
                                                    </span>
                                                </p>
                                                <p className="font-body-3 whitespace-nowrap">
                                                    <span className="text-[#575757] whitespace-nowrap">Premier curé</span>
                                                    <span className="text-[#1c0004]">
                                                        &nbsp;<span className='font-bold'>{selecteParish?.premier_cure}</span>
                                                    </span>
                                                </p>
                                            */}
                                        </div>
                                        <div className="font-body-3 whitespace-nowrap mt-5">
                                            <span className="text[#575757] whitespace-nowrap font-bold my-2">Horaires de bureau</span>
                                            <Text className='text-sm text-gray' labelFr={selecteParish?.horaire_bureau!} labelEn={selecteParish?.horaire_bureau!} />  
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* History section */}
                            <section className="flex flex-col gap-2 ">
                                <h2 className="font-heading-5 text-2xl text-[#1c0004] mb-3 font-bold">Histoire</h2>
                                <p className="text-gray leading-[26px]">
                                    {selecteParish?.histoire}{" "}
                                    {/*
                                        <span className="font-body-3 text-[#11112e] cursor-pointer">
                                            voir plus
                                        </span> 
                                    */}
                                </p>
                            </section>

                            {/* Video section */}
                            {
                                selecteParish?.lien_youtube &&
                                <section className="flex flex-col gap-2 ">
                                    <h2 className="font-heading-5 text-2xl text-[#1c0004] mb-3 font-bold">Vidéo de la paroisse</h2>
                                    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                                        <iframe
                                            src={selecteParish?.lien_youtube.replace("watch?v=", "embed/")}
                                            title="Titre de la vidéo"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full">
                                        </iframe>
                                    </div>
                                </section>
                            }

                            {/* Mass schedule section */}
                            <section className="flex flex-col gap-2 w-full">
                                <h2 className="font-heading-5 text-2xl text-[#1c0004] mb-3 font-bold">
                                    Heure des messes
                                </h2>
                                <div className="flex flex-wrap gap-[12px_16px]">
                                    {selecteParish?.horaireparoisses?.map((schedule, index) => (
                                        <Card
                                            key={index}
                                            className="border border-[#e5e5e580] rounded-xl"
                                        >
                                            <CardContent className="flex items-center gap-3 p-1.5 px-2">
                                                <span className="font-normal text-[#1c0004] text-base leading-4 capitalize">
                                                    {schedule.jour}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    {schedule.heure.split(";").map((time, timeIndex) => (
                                                        <Badge
                                                            key={timeIndex}
                                                            variant="secondary"
                                                            className="bg-[#f9f4f5] text-gray font-body-3 rounded-lg"
                                                        >
                                                            {time}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>

                            {/* Parish office contact info */}
                            <section className="flex flex-col gap-4">
                                <h2 className="font-heading-5 text-2xl text-[#1c0004] mb-3 font-bold">
                                    Secrétariat paroissial
                                </h2>
                                <div className="flex flex-col gap-1.5 w-full">
                                    <div className="flex items-start gap-2.5 w-full">
                                        <MapPinIcon className="w-5 h-5" />
                                        <p className="flex-1 font-body-2 text-gray">
                                            {selecteParish?.adresse}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2.5 w-full">
                                        <PhoneIcon className="w-5 h-5" />
                                        <p className="flex-1 font-body-2 text-gray">
                                            {selecteParish?.telephone}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2.5 w-full">
                                        <MailIcon className="w-5 h-5" />
                                        <p className="flex-1 font-body-2 text-gray">
                                            {selecteParish?.email}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                {
                                    selecteParish?.bulletins.length! > 0 &&
                                    <h2 className="font-heading-5 text-2xl text-[#1c0004] mb-3 font-bold">
                                        Bulletins paroissiaux
                                    </h2>
                                }
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {/* Document cards grid */}
                                    {selecteParish?.bulletins.map((doc, index) => (
                                    <Card
                                        key={index}
                                        className="bg-[#f9f9f0] rounded-2xl">
                                        <CardContent className="p-0">
                                        <div className="mt-2 mx-auto">
                                            <div className="flex flex-row justify-end items-center px-3">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild >
                                                <Button
                                                    variant="ghost"
                                                    className="w-[18px] h-[18px] p-0">
                                                    <MoreHorizontalIcon className="w-[18px] h-[18px]" />
                                                </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    {/* Dropdown menu items would go here */}
                                                    <DropdownMenuItem className="text-gray">
                                                        <a href={ doc.lien_externe ?? `${process.env.NEXT_PUBLIC_API_URL}/${doc.document}`} target="_blank" >Consulter</a>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDeleteRessource(doc.id)}
                                                    className="text-red-500">
                                                    { (isDeleting ) &&
                                                        <Loader className="w-4 h-4 mr-2" />
                                                    }
                                                    Supprimer</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            </div>

                                            <div className="flex flex-col items-center gap-3 my-4">
                                            <div className="w-[100px] truncate h-20 bg-white rounded-2xl border border-solid border-[#d9d9d9] flex items-center justify-center">
                                                <span className="font-body-3 text-[length:var(--body-3-font-size)] uppercase text-gray text-center">
                                                { doc.lien_externe ? "Lien" : doc.document.split(".")[1]}
                                                </span>
                                            </div>
                                            <p className="font-body-3 text-[length:var(--body-3-font-size)] text-noir-dashboard text-center">
                                                { doc.lien_externe ? doc.lien_externe.split("/")[doc.lien_externe.split("/").length - 1].split('.')[0] : doc.titre_fr} 
                                            </p>
                                            </div>
                                        </div>
                                        </CardContent>
                                    </Card>
                                    ))}
                                </div>
                            </section>
                            <AddBulletinFormSection paroisse_id={selecteParish?.id!} />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                { 
                                    images.map((image, index) => (
                                    <Card
                                        key={index}
                                        onClick={() => {}}
                                        className="overflow-hidden rounded-lg border-none relative shrink-0 h-[140px] cursor-pointer">
                                        <Image
                                            alt={`Image ${index + 1}`}
                                            src={`${image.path!}`}
                                            style={{ objectFit: 'cover' }}
                                            fill
                                            priority
                                        />
                                        <div className='absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out'>
                                            <div className='flex items-center gap-2'>
                                                <button onClick={() => handleDeleteImage(image)} className='h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center'>
                                                { isDeleting ? <Loader className="h-5 w-5" /> : <Trash2Icon className='w-5 h-5'/>}
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                                }
                            </div>

                            <div className='flex gap-4'>
                                <GaleryPopup setSelectedImage={setSelectedImage} >
                                    <Button className="h-10 w-min bg-primary text-white hover:bg-blue/90  gap-2">
                                        <PlusIcon className="w-5 h-5" />
                                        Ajouter une photo
                                    </Button>
                                </GaleryPopup>
                                { 
                                    (newImages.length > 0 ) &&
                                    <Button onClick={handleSaveImages} className="h-10 bg-blue text-white hover:bg-blue/90  gap-2">
                                        {
                                            isLoading ? 
                                            <Loader className="w-5 h-5" /> :
                                            <SaveAll className="w-5 h-5" />
                                        }
                                        Enregistrer
                                    </Button>
                                }
                            </div>


                            {/* Map section */}
                            <section className="w-full">
                                <h2 className="font-heading-5 text-2xl text-[#1c0004] mb-4 font-bold">
                                    Sur la carte
                                </h2>
                                <div className="w-full h-[350px] bg-neutral-100 rounded-3xl overflow-hidden">
                                    <div className="h-[350px] rounded-[18px] overflow-hidden">
                                        {/** Map view */}
                                        <MapContainer 
                                            showSearchBar={false}
                                            location={{
                                                address: `${selecteParish?.adresse.split(";")[1]}`,
                                                name: `${selecteParish?.adresse.split(";")[0]}`,
                                                lat: Number(selecteParish?.gps.split(";")[0]),
                                                lng: Number(selecteParish?.gps.split(";")[1]),
                                                placeId: (new Date()).getTime().toString()
                                            }}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Sheet */}
            <Sheet open={openModalUnite} onOpenChange={setOpenModalUnite} >
                <SheetContent aria-describedby={undefined}  className="max-w-[calc(100vw/2)] min-w-[680px]">
                    <SheetHeader >
                        <SheetTitle hidden>Détails de l'unité pastorale </SheetTitle>
                    </SheetHeader>
                    <div className='absolute top-0 left-0 right-0 z-[1] bg-white'>
                        {/* Header with action buttons */}
                        <header className="w-full h-20 border-b border-[#d9d9d9] flex items-center justify-between px-12">
                            <Button variant="outline" className="h-10"
                                onClick={() => setOpenModalUnite(false)}>
                                Fermer
                            </Button>
                            <div className="flex gap-2">
                                {/**
                                    <Button variant="outline" className="h-10">Désactiver</Button>
                                */}
                                {/**
                                    <EditParishFormSection parish={selecteParish!} />
                                */}
                                {
                                    canUpdateParishUnit() &&
                                    <AddUnitePastoraleFormSection unite={{ ...unitePastorale, paroisses: []} as TypeParoisse} />
                                }
                                {
                                    canDeleteParishUnit() &&
                                    <Button onClick={handleDeleteUnitePastorale} className="h-10 bg-red-500 text-white hover:bg-blue/90">
                                        { isDeleting && <Loader className='h-5 w-5, mr-2' /> }
                                        Supprimer
                                    </Button>
                                }
                            </div>
                        </header>
                    </div>

                    {/* Scrollable content area */}
                    <div className="h-[calc(100%-80px)] mt-24 px-7 v-scroll overflow-y-scroll">
                        <div className="flex flex-col gap-[34px] w-full">
                            <div>
                                <div className='body-1 font-bold text-black mb-6'>
                                    <Text className='text-2xl font-bold' labelFr={unitePastorale?.intitule_fr} labelEn={unitePastorale?.intitule_en} />
                                </div>
                                <h2 className="font-heading-5 text-2xl text-[#1c0004] mb-4 font-bold">
                                    Paroisses
                                </h2>
                                {/* Parish grid */}
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    { unitePastorale?.paroisses?.map((parish, index) => (
                                        <Card
                                            key={index}
                                            className="w-full border-none shadow-none "
                                            onClick={() => {
                                                // // setOpenModalUnite(false)
                                                // setSelectedParish(parish)
                                                // setOpenModal(true)
                                            }}>
                                            <CardContent className="p-0 w-full h-full space-y-2 bg-[#F9F9F0] rounded-xl flex flex-col justify-between gap-[10px] px-5 py-6">
                                                <div className="">
                                                    <div className='h-6 w-6 mb-2'>
                                                        <Church className='h-5 w-5' />
                                                    </div>
                                                    <div className='body-1 font-bold text-black line-clamp-2'>
                                                        <Text className='text-sm font-bold' labelFr={parish.nom} labelEn={parish.nom_en} />
                                                    </div>
                                                    <div className='body-2 mt-2 line-clamp-2 text-[#575757]'>
                                                        <p className='text-sm'>{parish.adresse}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Map section */}
                            {<section className="w-full">
                                <h2 className="font-heading-5 text-2xl text-[#1c0004] mb-4 font-bold">
                                    Sur la carte
                                </h2>
                                <div className='bg-[#F1F3F6] h-96 rounded-lg overflow-hidden'>
                                    <MapContainer 
                                        showSearchBar={false}
                                        location={{
                                            address: `${unitePastorale?.intitule_fr}`,
                                            name: `${unitePastorale?.intitule_en}`,
                                            lat: unitePastorale?.gps ? Number(unitePastorale?.gps.split(";")[0]) : 46.091091,
                                            lng: unitePastorale?.gps ? Number(unitePastorale?.gps.split(";")[1]) : -64.781880,
                                            placeId: (new Date()).getTime().toString()
                                        }}
                                    />
                                </div>
                            </section>}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </main>
    )
}

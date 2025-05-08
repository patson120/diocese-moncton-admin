"use client"

import Text from '@/components/shared/Text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiClient } from '@/lib/axios';
import { fetchParoisses } from '@/lib/data';
import { formatDateToLocal } from '@/lib/utils';
import { Church, LayoutGridIcon, ListFilter, MailIcon, MapPinIcon, PhoneIcon, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import { Paroisse, TypeParoisse } from '../../../app/types';
import { AddParishFormSection } from './AddParishFormSection';
import { AddUnitePastoraleFormSection } from './AddUnitePastoraleFormSection';
import { EditParishFormSection } from './EditParishFormSection';

export default function ParishSection() {
    const router = useRouter()

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
    
    const searchParams = useSearchParams()
    const pathname = usePathname()

    // parish tabs data
    const clergyTabs = [
        { value: "paroisses", label: "Paroisses", active: true },
        { value: "unites-paroissiales", label: "Unités paroissiales", active: false },
    ];

    // Parish data
    const parishData = {
        name: "Immaculée-Conception",
        unit: "Unité pastorale Saint-Benoît",
        established: "1871",
        ordained: "1871",
        firstPriest: "1871",
        history:
            "L'histoire d'Acadieville est étroitement liée à celle de Rogersville. Les premiers colons (vers 1871) étaient pour la plupart des constructeurs du chemin de fer « Intercolonial ». Ces premiers déchifreurs avaient obtenu des lots de terre du gouvernement par l'entremise du député de Kent, M. Urbain Johnson.",
        address: "4049, Route 480 Acadieville NB E4Y 1Z3",
        phone: "(506) 775-2421",
        email: "paracadi@live.ca",
        massSchedule: [
            { day: "Mardi", times: ["12h:00", "12h:00"] },
            { day: "Mercredi", times: ["12h:00"] },
            { day: "Dimanche", times: ["08h:00", "12h:00", "17h:00"] },
        ],
    };

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
        // setIsStatutLoading(false)
    }

    useEffect(() => {
        const getActualites = async () => {
            const response = await fetchParoisses(`?paginate=200&statut=${statut}&nom=${query}`)
            setParishes(response.data)
        }
        getActualites()
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
        formdata.append("horaireparoisses", `${selecteParish?.horaireparoisses}`)
        formdata.append("etabli_le", `${selecteParish?.etabli_le!}`)
        formdata.append("ordonne_le", `${selecteParish?.ordonne_le!}`)
        formdata.append("premier_cure", `${selecteParish?.premier_cure!}`)
        formdata.append("gps", selecteParish?.gps!)
        formdata.append("statut", `${ selecteParish?.statut === 1 ? '0': '1' }`)
        formdata.append("adresse", selecteParish?.adresse!)

        try {
            const response: any = await apiClient.post(`/api/paroisses/${selecteParish?.id}?_method=PUT`, formdata, {
                'Content-Type': 'multipart/form-data'
            });
            console.log(response);
            
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
                                {clergyTabs.map((item) => (
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

                        {
                            selectedItem === 'paroisses' ?
                            <AddParishFormSection /> :
                            <AddUnitePastoraleFormSection />
                        }

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
                                                    className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg"
                                                >
                                                    <LayoutGridIcon className="w-5 h-5" />
                                                </Button>
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
                                                    className="w-full border-none shadow-none"
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
                                                    onClick={() => {
                                                        fetchUnitePastorale(unite.id)
                                                        setOpenModalUnite(true)
                                                    }}>
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
                            <Button variant="outline" className="h-10"
                                onClick={() => setOpenModal(false)}>
                                Fermer
                            </Button>
                            <div className="flex gap-2">
                                <Button onClick={handleChangeStatus} variant="outline" className="h-10">
                                    { isStatutLoading && <Loader className='h-5 w-5, mr-2' /> }
                                    {selecteParish?.statut === 1 ? 'Désactiver': 'Activer'}
                                </Button>
                                <EditParishFormSection parish={selecteParish!} />
                                <Button onClick={handleDeleteParish} className="h-10 bg-red-500 text-white hover:bg-blue/90">
                                    { isDeleting && <Loader className='h-5 w-5, mr-2' /> }
                                    Supprimer
                                </Button>
                            </div>
                        </header>
                    </div>

                    {/* Scrollable content area */}
                    <div className="h-[calc(100%-80px)] mt-24 px-7 v-scroll overflow-y-scroll">
                        <div className="flex flex-col gap-[34px]">
                            {/* Parish header with image and basic info */}
                            <section className="w-full flex items-center gap-6">
                                <div className='relative shrink-0 w-[250px] h-[200px] overflow-hidden'>
                                    <Image
                                        fill
                                        priority
                                        className="object-cover"
                                        alt="Église Immaculée-Conception"
                                        src="/rectangle-2492.svg"
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
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* History section */}
                            <section className="flex flex-col gap-2 ">
                                <h2 className="font-heading-5 text-noir-dashboard">Histoire</h2>
                                <p className="text-gray leading-[26px]">
                                    {selecteParish?.histoire}{" "}
                                    {/* <span className="font-body-3 text-[#11112e] cursor-pointer">
                                        voir plus
                                    </span> */}
                                </p>
                            </section>

                            {/* Mass schedule section */}
                            <section className="flex flex-col gap-2 w-full">
                                <h2 className="font-heading-5 text-[#1c0004]">
                                    Heure des messes
                                </h2>
                                <div className="flex flex-wrap gap-[12px_16px]">
                                    {selecteParish?.horaireparoisses?.map((schedule, index) => (
                                        <Card
                                            key={index}
                                            className="border border-[#e5e5e580] rounded-xl"
                                        >
                                            <CardContent className="flex items-center gap-3 p-1.5 px-2">
                                                <span className="font-normal text-[#1c0004] text-base leading-4">
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
                                <h2 className="font-heading-5 text-[#1c0004]">
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

                            {/* Map section */}
                            <section className="w-full">
                                <h2 className="font-heading-5 text-2xl text-[#1c0004] mb-4 font-bold">
                                    Sur la carte
                                </h2>
                                <div className="w-full h-[350px] bg-neutral-100 rounded-3xl overflow-hidden">
                                    <div className="h-[350px] rounded-[18px] overflow-scroll v-scroll relative">
                                        <div className="relative w-[2100px] h-[1200px] top-[-520px] left-[-473px]">
                                            <img
                                                className="absolute w-[700px] h-[400px] top-[520px] left-[473px] object-cover"
                                                alt="Map detail view"
                                                src="/rectangle-42-1.svg"
                                            />
                                            <img
                                                className="absolute w-[2100px] h-[1200px] top-0 left-0 object-cover"
                                                alt="Map overview"
                                                src="/rectangle-42.png"
                                            />
                                            <div className="absolute w-[74px] h-[74px] top-[633px] left-[741px] bg-[#8b22361a] rounded-[37px] flex items-center justify-center">
                                                <img
                                                    className="w-8 h-8"
                                                    alt="Location marker"
                                                    src="/frame-2.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Sheet */}
            <Sheet open={openModalUnite} onOpenChange={setOpenModalUnite} >
                <SheetContent aria-describedby={undefined}  className="max-w-3xl min-w-3xl">
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
                                <Button variant="outline" className="h-10">Désactiver</Button>
                                {/** 
                                    <EditParishFormSection parish={selecteParish!} />
                                 */}
                                <Button className="h-10 bg-blue text-white hover:bg-blue/90">
                                    Modifier
                                </Button>
                                <Button onClick={handleDeleteUnitePastorale} className="h-10 bg-red-500 text-white hover:bg-blue/90">
                                    Supprimer
                                </Button>
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
                                            className="w-full border-none shadow-none cursor-pointer"
                                            onClick={() => {
                                                setOpenModal(true)
                                                setSelectedParish(parish)
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
                            <section className="w-full">
                                <h2 className="font-heading-5 text-2xl text-[#1c0004] mb-4 font-bold">
                                    Sur la carte
                                </h2>
                                <div className="w-full h-[350px] bg-neutral-100 rounded-3xl overflow-hidden">
                                    <div className="h-[350px] rounded-[18px] overflow-scroll v-scroll relative">
                                        <div className="relative w-[2100px] h-[1200px] top-[-520px] left-[-473px]">
                                            <img
                                                className="absolute w-[700px] h-[400px] top-[520px] left-[473px] object-cover"
                                                alt="Map detail view"
                                                src="/rectangle-42-1.svg"
                                            />
                                            <img
                                                className="absolute w-[2100px] h-[1200px] top-0 left-0 object-cover"
                                                alt="Map overview"
                                                src="/rectangle-42.png"
                                            />
                                            <div className="absolute w-[74px] h-[74px] top-[633px] left-[741px] bg-[#8b22361a] rounded-[37px] flex items-center justify-center">
                                                <img
                                                    className="w-8 h-8"
                                                    alt="Location marker"
                                                    src="/frame-2.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </main>
    );

}

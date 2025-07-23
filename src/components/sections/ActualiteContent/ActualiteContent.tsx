import Text from '@/components/shared/Text';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { apiClient } from '@/lib/axios';
import { formatDateToLocal } from '@/lib/utils';
import { EyeIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Actualite } from '../../../app/types';
import useRole from '@/hooks/use-role';

export default function ActualiteContent(
    { is_actif, query, ordre , displayMode}: 
    { is_actif: number, query: string, ordre: string, displayMode: 'list' | 'grid' }) {

    const [actualites, setActualites] = useState<Actualite[]>([])
    const [selectedActualite, setSelectedActualite] = useState<Actualite>()
    const [openModal, setOpenModal] = useState(false) 
    const [isDeleting, setIsDeleting] = useState(false)
    const [isUpdateStatus, setIsUpdateStatus] = useState(false)

    const { canUpdateNews, canDeleteNews} = useRole()

    useEffect(() => {
        const getActualites = async () => {
            let params = `?paginate=20000&is_actif=${is_actif}`
            if (query) { params += `&intitule=${query}` }
            if (ordre) { params += `&ordre=${ordre}` }
            const response: any = await apiClient.get(`/api/actualites${params}`)
            setActualites(response.data)
        }
        getActualites()
    }, [is_actif, query, ordre])

    const handelOpenDetailsSheet = (actualite: Actualite) => {
        setSelectedActualite(actualite)
        setOpenModal(true)
    }

    const handleDeleteActualite = async () => {
        if (isDeleting) return
        setIsDeleting(true)
        try {
            await apiClient.delete(`/api/actualites/${selectedActualite?.id}`)
            setActualites(actualites.filter((actualite) => actualite.id !== selectedActualite?.id))
            setOpenModal(false)
        } catch (error) {
            console.error('Error deleting actualité:', error)
        } finally {
            setIsDeleting(false)
        }
    }
    const handleUpdateStatus = async () => {
        if (isUpdateStatus) return
        setIsUpdateStatus(true)
        try {
            is_actif = selectedActualite?.is_actif === 1 ? -1 : 1
            const newActualite = { ...selectedActualite, is_actif: is_actif } as Actualite
            await apiClient.put(`/api/actualites/${selectedActualite?.id}`, newActualite)
            const findIndex = actualites.findIndex(actu =>  actu.id === selectedActualite?.id)
            const data= actualites
            data[findIndex] = newActualite
            setActualites(data)
            toast.success("Le statut a été mis à jour")
            setOpenModal(false)
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        } catch (error) {
            console.error('Error updating message:', error)
        } finally {
            setIsUpdateStatus(isUpdateStatus)
        }
    }

    const handleEditActualite = () => {
        if (!selectedActualite) return
        window.location.href = `/actualite/${selectedActualite.id}`
    }

    return (
        <>  
            {
                ( displayMode === 'list') ?
                <Card className="w-full rounded-2xl bg-white">
                    <CardContent aria-describedby={undefined} className="p-0">
                        <div className="flex flex-col w-full items-start gap-4">
                        <Table>
                            <TableHeader className="bg-[#f9f9f0] rounded-lg">
                            <TableRow className="border-none">
                                <TableHead className="font-body-3 text-noir-dashboard text-sm">
                                Titre
                                </TableHead>
                                <TableHead className="font-body-3 text-noir-dashboard text-sm">
                                Catégorie
                                </TableHead>
                                <TableHead className="font-body-3 text-noir-dashboard text-sm">
                                Ajouté le
                                </TableHead>
                                <TableHead className="font-body-3 text-noir-dashboard text-sm">
                                Actions
                                </TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            { actualites.map((article, index) => (
                                <TableRow key={index} className="border-b border-[#d9d9d9]">
                                <TableCell className="font-body-3 text-noir-dashboard py-3.5 max-w-2xl">
                                    <Text className='font-bold line-clamp-2' labelEn={article?.titre_en} labelFr={article?.titre_fr} />
                                </TableCell>
                                <TableCell className="font-body-3 text-gray py-3.5">
                                    {article?.categorie?.intitule_fr}
                                </TableCell>
                                <TableCell className="font-body-3 text-noir-dashboard py-3.5">
                                    { formatDateToLocal((new Date(article?.date_publication ? article?.date_publication : article?.created_at)).toISOString()) }
                                </TableCell>
                                <TableCell className="py-3.5">
                                    <div className="flex items-center gap-[17px]">
                                    <Button
                                        onClick={() => handelOpenDetailsSheet(article)}
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto p-0 flex items-center gap-1">
                                        <EyeIcon className="w-[18px] h-[18px]" />
                                        <span className="font-body-3 text-noir-dashboard">
                                        Voir
                                        </span>
                                    </Button>
                                    {/* Alert Dialog */}
                                    <Card>
                                        <CardContent aria-describedby={undefined} className='p-0'>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                <Button
                                                    onClick={() => setSelectedActualite(article)}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-auto p-0 flex items-center gap-1">
                                                        {
                                                            (isDeleting && selectedActualite?.id === article.id )? 
                                                            <Loader className='h-4 w-4 mr-2' /> :
                                                            <Trash2Icon className="w-4 h-4 mr-2" />
                                                        }
                                                    <span className="font-body-3 text-noir-dashboard">
                                                        Supprimer
                                                    </span>
                                                    
                                                </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                        Cette action est irréversible et supprimera définitivement votre article.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                        <AlertDialogAction className='bg-blue text-white' onClick={handleDeleteActualite} >
                                                        {
                                                            (isDeleting && selectedActualite?.id === article.id )? 
                                                            <Loader className='h-4 w-4 mr-2' /> :
                                                            <Trash2Icon className="w-4 h-4 mr-2" />
                                                        }
                                                            Continuer
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </CardContent>
                                    </Card>
                                    </div>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </div>
                    </CardContent>
                </Card> :
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                    {
                        actualites.map((article) => (
                            <Card
                                key={article.id}
                                onClick={() => handelOpenDetailsSheet(article)}
                                className="w-full border-none shadow-none cursor-pointer">
                                <CardContent className="p-0 space-y-3">
                                     {article.galerie.length === 0 ? ( 
                                        <div
                                            className="w-full h-[150px] rounded-xl bg-cover bg-center"
                                            style={{ backgroundImage: `url("/assets/img/actualite.png")` }}
                                        />
                                     ) : (
                                        <div
                                            className="w-full h-[150px] rounded-xl bg-cover bg-center"
                                            style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/${article.galerie[0].path})` }}
                                        />
                                    )}

                                    <div className="flex flex-col gap-2">
                                        <div className='flex flex-row justify-between items-center'>
                                            {article.categorie && (
                                                <p className="font-legend text-[length:var(--legend-font-size)] tracking-[var(--legend-letter-spacing)] leading-[var(--legend-line-height)] text-gray">
                                                    {article.categorie.intitule_fr}
                                                </p>
                                            )}
                                            {
                                                is_actif === 0 &&
                                                <p className='text-xs text-yellow-400 font-medium'>
                                                    En attente; {formatDateToLocal((new Date(article.created_at)).toISOString())}
                                                </p>
                                            }
                                            {
                                                is_actif === 1 &&
                                                <p className='text-xs text-gray font-medium'>
                                                    {formatDateToLocal((new Date(article.created_at)).toISOString())}
                                                </p>
                                            }
                                            {
                                                is_actif === -1 &&
                                                <p className='text-xs text-red-600 font-medium'>
                                                    Désactivé
                                                </p>
                                            }
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="font-body-3 font-bold text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-noir-dashboard line-clamp-1">
                                                <Text labelFr={article.titre_fr} labelEn={article.titre_en} />
                                            </div>
                                            <div className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-gray line-clamp-1">
                                                <Text labelFr={article.description_fr} labelEn={article.description_en} />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            }

            {/* Sheet */}
            <Sheet open={openModal} onOpenChange={setOpenModal} >
                <SheetContent aria-describedby={undefined} className="max-w-3xl min-w-[600px]">
                    <SheetHeader>
                        <SheetTitle hidden>Détails de l'actualité</SheetTitle>
                    </SheetHeader>
                    <div className='absolute top-0 left-0 right-0 z-[1] bg-white'>
                        {/* Header with action buttons */}
                        <header className="w-full h-20 border-b border-[#d9d9d9] flex items-center justify-between px-12">
                            <Button variant="outline" className="h-10"
                                onClick={() => setOpenModal(false)}>
                                Fermer
                            </Button>
                            <div className="flex gap-2">
                                {
                                    canUpdateNews() &&
                                    <Button onClick={handleUpdateStatus} variant="outline" className="h-10">
                                        { isUpdateStatus && <Loader className='h-5 w-5, mr-2' /> }
                                        { selectedActualite?.is_actif === 1 ? 'Désactiver' : 'Activer' }
                                    </Button>
                                }
                                {
                                    canUpdateNews() &&
                                    <Button onClick={handleEditActualite} className="h-10 bg-blue text-white hover:bg-blue/90">
                                        Modifier
                                    </Button>
                                }
                                {
                                    canDeleteNews() &&
                                    <Button onClick={handleDeleteActualite} className="h-10 bg-red-500 text-white hover:bg-blue/90">
                                        { isDeleting && <Loader className='h-5 w-5, mr-2' /> }
                                        Supprimer
                                    </Button>
                                }
                            </div>
                        </header>
                    </div>

                    {/* Scrollable content area */}
                    <div className="h-[calc(100%-80px)] mt-24 px-6 v-scroll overflow-y-scroll">
                        <div className="flex flex-col gap-6">
                            {/* Article header with image and basic info */}
                            {
                                selectedActualite?.galerie.length === 0 ?
                                <section
                                    className="w-full h-[260px] aspect-auto rounded-2xl bg-cover bg-center bg-no-repeat"
                                    style={{ backgroundImage: `url("/assets/img/actualite.png")` }}
                                /> :
                                <section
                                    className="w-full h-[260px] aspect-auto rounded-2xl bg-cover bg-center bg-no-repeat"
                                    style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/${selectedActualite?.galerie[0].path})` }}
                                />
                            }

                            {/* Content section */}
                            <section className="flex flex-col gap-2 ">
                                <div className='flex justify-between items-center'>
                                    <span className="text-gray">{selectedActualite?.categorie?.intitule_fr}</span>
                                    {
                                        selectedActualite?.created_at && (
                                            <div>
                                                {/* <span className="text-gray">{formatDateToLocal((new Date(selectedActualite?.date_publication!)).toISOString())}</span> */}
                                                {
                                                    is_actif === 0 &&
                                                    <p className='text-xs text-yellow-400 font-medium'>
                                                        En attente; {formatDateToLocal((new Date(selectedActualite.created_at)).toISOString())}
                                                    </p>
                                                }
                                                {
                                                    is_actif === 1 &&
                                                    <p className='text-xs text-gray font-medium'>
                                                        {formatDateToLocal((new Date(selectedActualite?.date_publication ? selectedActualite?.date_publication : selectedActualite?.created_at)).toISOString())}
                                                    </p>
                                                }
                                                {
                                                    is_actif === -1 &&
                                                    <p className='text-xs text-red-600 font-medium'>
                                                        Désactivé
                                                    </p>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                                <Text className='font-bold text-2xl' labelFr={selectedActualite?.titre_fr} labelEn={selectedActualite?.titre_en} />
                                <Text className='text-lg' labelFr={selectedActualite?.description_fr} labelEn={selectedActualite?.description_en} />
                            </section>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

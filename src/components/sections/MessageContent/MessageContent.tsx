import MessageComp from '@/components/shared/MessageComp';
import Text from '@/components/shared/Text';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { apiClient } from '@/lib/axios';
import { formatDateToLocal } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Message } from '../../../app/types';
import { Loader } from '@/components/ui/loader';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { EyeIcon, Trash2Icon } from 'lucide-react';
import useRole from '@/hooks/use-role';

export default function MessageContent(
    { 
        etat,
        displayMode, 
        query, 
        ordre 
    }: 
    {   etat: number,
        query: string,
        ordre: string,
        displayMode: 'list' | 'grid'
    }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [selectedMessage, setSelectedMessage] = useState<Message | undefined>()
    const [openModal, setOpenModal] = useState(false)

    const { canUpdateMessage, canDeleteMessage } = useRole()

    const [isDeleting, setIsDeleting] = useState(false)
    const [isStatusChanging, setIsStatusChanging] = useState(false)

    useEffect(() => {
        const getMessages = async () => {
            let params = `?paginate=200&etat=${etat}`
            if (query) { params += `&titre=${query}` }
            if (ordre) { params += `&ordre=${ordre}` }
            const response: any = await apiClient.get(`/api/mot_archeve${params}`)
            setMessages(response.data)
        }
        getMessages()
    }, [etat, query, ordre])

    const handleDeleteMessage = async () => {
        if (isDeleting) return
        setIsDeleting(true)
        try {
            await apiClient.delete(`/api/mot_archeve/${selectedMessage?.id}`)
            setMessages(messages.filter((message) => message.id !== selectedMessage?.id))
            setOpenModal(false)
        } catch (error) {
            console.error('Error deleting message:', error)
        } finally {
            setIsDeleting(false)
        }
    }
    const handleChangeStatus = async () => {
        if (isStatusChanging) return
        setIsStatusChanging(true)
        try {
            await apiClient.put(`/api/mot_archeve/${selectedMessage?.id}`, {
                ...selectedMessage,
                etat: selectedMessage?.etat === 1 ? -1 : 1
            })
            setMessages(messages.filter((message) => message.id !== selectedMessage?.id))
            setOpenModal(false)
            toast.success(`Message mise à jour avec succès`)
        } catch (error: any) {
            toast.error(`Error deleting message: ${error.message}`)
        } finally {
            setIsStatusChanging(false)
        }
    }

    const handleEditMessage = () => {
        if (!selectedMessage) return
        window.location.href = `/message/${selectedMessage.id}`
    }

    return (
        <div>
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
                                        Description
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
                                { messages.map((message, index) => (
                                    <TableRow key={index} className="border-b border-[#d9d9d9]">
                                    <TableCell className="font-body-3 text-noir-dashboard py-3.5 max-w-2xl">
                                        <Text className='font-bold line-clamp-2' labelEn={message?.titre_en} labelFr={message?.titre_fr} />
                                    </TableCell>
                                    <TableCell className="font-body-3 text-noir-dashboard py-3.5 max-w-xl">
                                        <Text className='line-clamp-2' labelEn={message?.message_en} labelFr={message?.message_fr} />
                                    </TableCell>
                                    <TableCell className="font-body-3 text-noir-dashboard py-3.5">
                                        { formatDateToLocal((new Date(message?.created_at)).toISOString()) }
                                    </TableCell>
                                    <TableCell className="py-3.5">
                                        <div className="flex items-center gap-[17px]">
                                        <Button
                                            onClick={() => {
                                                setOpenModal(true)
                                                setSelectedMessage(message)
                                            }}
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
                                                        // onClick={() => setSelectedActualite(article)}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-auto p-0 flex items-center gap-1">
                                                            {
                                                                (isDeleting && selectedMessage?.id === message.id )? 
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
                                                            Cette action est irréversible et supprimera définitivement ce message.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                            <AlertDialogAction className='bg-blue text-white' onClick={handleDeleteMessage} >
                                                            {
                                                                (isDeleting && selectedMessage?.id === message.id )? 
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            messages.map((message, index) => (
                                <MessageComp
                                    key={index}
                                    message={message}
                                    onClick={() => {
                                        setOpenModal(true)
                                        setSelectedMessage(message)
                                    }}
                                />
                            ))
                        }
                    </div>    
            }
            
            {/* Sheet */}
            <Sheet open={openModal} onOpenChange={setOpenModal} >
                <SheetContent aria-describedby={undefined} className="max-w-3xl min-w-[650px]">
                    <SheetHeader className='relative'>
                        <SheetTitle hidden>Détails du message de l'archevêque</SheetTitle>
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
                                    canUpdateMessage() &&
                                    <Button
                                        onClick={handleChangeStatus}
                                        variant="outline" className="h-10">
                                        { isStatusChanging && <Loader className='w-5 h-5 mr-2' /> }
                                        {
                                            selectedMessage?.etat === 1 ? 'Désactiver' : 'Activer'
                                        }
                                    </Button>
                                }
                                {
                                    canUpdateMessage() &&
                                    <Button onClick={handleEditMessage} className="h-10 bg-blue text-white hover:bg-blue/90">
                                        Modifier
                                    </Button>
                                }
                                {
                                    canDeleteMessage() &&
                                    <Button onClick={handleDeleteMessage} className="h-10 bg-red-500 text-white hover:bg-blue/90">
                                        { isDeleting && <Loader className='h-5 w-5, mr-2' /> }
                                        Supprimer
                                    </Button>
                                }
                            </div>
                        </header>
                    </div>

                    {/* Scrollable content area */}
                    <ScrollArea className="w-full h-[calc(100%-80px)] mt-24 px-7">
                        <div className='flex flex-col gap-4 '>
                            {
                                selectedMessage?.image === null ?
                                <section
                                    className="w-full h-[260px] aspect-auto rounded-2xl bg-cover bg-center bg-no-repeat"
                                    style={{ backgroundImage: `url("/vector.svg")` }}
                                /> :
                                <section
                                    className="w-full h-[260px] aspect-auto rounded-2xl bg-cover bg-center bg-no-repeat"
                                    style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/${selectedMessage?.image})` }}
                                />
                            }
                            {selectedMessage?.created_at &&
                                <p className='body-3 whitespace-nowrap text-gray text-sm'>
                                    Publié le
                                    <span className="ml-2">{formatDateToLocal((new Date(selectedMessage?.created_at!)).toISOString())}</span>
                                </p>}
                            <Text className='font-bold text-2xl' labelFr={selectedMessage?.titre_fr} labelEn={selectedMessage?.titre_en} />
                            <Text labelFr={selectedMessage?.message_fr} labelEn={selectedMessage?.message_en} />
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
    )
}

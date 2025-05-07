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

export default function MessageContent({ etat }: { etat: number }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [selectedMessage, setSelectedMessage] = useState<Message | undefined>()
    const [openModal, setOpenModal] = useState(false)

    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const getMessages = async () => {
            const response: any = await apiClient.get(`/api/mot_archeve?paginate=200&etat=${etat}`)
            setMessages(response.data)
        }
        getMessages()
    }, [etat])

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

    const handleEditMessage = () => {
        if (!selectedMessage) return
        window.location.href = `/message/${selectedMessage.id}`
    }

    return (
        <div>
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
            {/* Sheet */}
            <Sheet open={openModal} onOpenChange={setOpenModal} >
                <SheetContent className="max-w-3xl">
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
                                <Button variant="outline" className="h-10">
                                    Désactiver
                                </Button>
                                <Button onClick={handleEditMessage} className="h-10 bg-blue text-white hover:bg-blue/90">
                                    Modifier
                                </Button>
                                <Button onClick={handleDeleteMessage} className="h-10 bg-red-500 text-white hover:bg-blue/90">
                                    { isDeleting && <Loader className='h-5 w-5, mr-2' /> }
                                    Supprimer
                                </Button>
                            </div>
                        </header>
                    </div>

                    {/* Scrollable content area */}
                    <ScrollArea className="w-full h-[calc(100%-80px)] mt-24 px-7">
                        <div className='flex flex-col gap-4 '>
                            {selectedMessage?.created_at &&
                                <p className='body-3 whitespace-nowrap text-gray text-sm'>
                                    Publié le
                                    <span className="ml-2">{formatDateToLocal((new Date(selectedMessage?.created_at!)).toISOString())}</span>
                                </p>}
                            <Text className='font-bold text-2xl' labelFr={selectedMessage?.titre_fr} labelEn={selectedMessage?.titre_en} />
                            <Text labelFr={selectedMessage?.message_fr} labelEn={selectedMessage?.message_en} />
                        </div>
                    </ScrollArea>

                    {/* <SheetFooter className='px-7'>
                        <Button onClick={() => setOpenModal(false)}>Fermer</Button>
                    </SheetFooter> */}
                </SheetContent>
            </Sheet>
        </div>
    )
}

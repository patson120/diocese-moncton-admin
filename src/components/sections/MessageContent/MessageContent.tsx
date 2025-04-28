import MessageComp from '@/components/shared/MessageComp';
import Text from '@/components/shared/Text';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { apiClient } from '@/lib/axios';
import { formatDateToLocal } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Message } from '../../../../types';

export default function MessageContent({ etat }: { etat: number }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [selectedMessage, setSelectedMessage] = useState<Message | undefined>()
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        const getMessages = async () => {
            const response: any = await apiClient.get(`/api/mot_archeve?paginate=200&etat=${etat}`)
            setMessages(response.data)
        }
        getMessages()
    }, [etat])

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
            <Sheet open={openModal} >
                {/* <SheetTrigger asChild>
                            <Button variant="outline">Ouvrir le panneau</Button>
                        </SheetTrigger> */}
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
                            <div className="flex gap-4">
                                <Button variant="outline" className="h-10">
                                    Désactiver
                                </Button>
                                <Button className="h-10 bg-blue text-white hover:bg-blue/90">
                                    Modifier
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

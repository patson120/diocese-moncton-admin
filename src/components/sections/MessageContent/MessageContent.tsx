import MessageComp from '@/components/shared/MessageComp';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { fetchMessages } from '@/lib/data';
import { useEffect, useState } from 'react';
import { Message } from '../../../../types';
import Text from '@/components/shared/Text';
import { formatDateToLocal } from '@/lib/utils';

export default function MessageContent({ etat }: { etat: number }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [selectedMessage, setSelectedMessage] = useState<Message | undefined>()
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        const getMessages = async () => {
            const response = await fetchMessages(`?paginate=20&etat=${etat}`)
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
                <SheetContent className="max-w-xl ">
                    <SheetHeader>
                        <SheetTitle>Éditer le profil</SheetTitle>
                    </SheetHeader>
                    <div className='flex flex-col gap-4'>
                        <Text labelFr={selectedMessage?.titre_fr} labelEn={selectedMessage?.titre_en} />
                        <Text labelFr={selectedMessage?.message_fr} labelEn={selectedMessage?.message_en} />
                        {selectedMessage?.created_at &&
                            <p className='body-3 whitespace-nowrap text-gray text-sm'>
                                Publié le
                                <span className="ml-2">{formatDateToLocal((new Date(selectedMessage?.created_at!)).toISOString())}</span>
                            </p>}
                    </div>

                    <SheetFooter>
                        <Button onClick={() => setOpenModal(false)}>Fermer</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}

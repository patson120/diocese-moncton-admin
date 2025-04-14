import { fetchMessages } from '@/lib/data'
import React, { useEffect, useState } from 'react'
import { Message } from '../../../../types';
import MessageComp from '@/components/shared/MessageComp';

export default function MessageContent({ etat }: { etat: number }) {
    const [messages, setMessages] = useState<Message[]>([])
    useEffect(() => {
        const getMessages = async () => {
            const response = await fetchMessages(`?paginate=20&etat=${etat}`)
            setMessages(response.data)
        }
        getMessages()
    }, [etat])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {
                messages.map((message, index) => (
                    <MessageComp key={index} message={message} />
                ))
            }
        </div>
    )
}

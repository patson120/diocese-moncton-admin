import { apiClient } from '@/lib/axios';
import React from 'react'
import { Message } from '../../../types';
import EditMessageForm from './EditMessageForm';

export default async function page(props: {
    params: Promise<{ messageId: string }>,
}) {

    const { messageId } = await props.params;
    const message: Message = await apiClient.get(`/api/mot_archeve/${messageId}`);
    
    return (
        <div>
           <EditMessageForm message={message} /> 
        </div>
    )
}

import React from 'react'
import { Actualite } from '../../../../../types';
import { apiClient } from '@/lib/axios';
import EditActualiteForm from './EditActualiteForm';

export default async function page(props: {
    params: Promise<{ actualiteId: string }>,
}) {

    const { actualiteId } = await props.params;
    const actualite: Actualite = await apiClient.get(`/api/actualites/${actualiteId}`);
    
    return (
        <div>
           <EditActualiteForm actualite={actualite} /> 
        </div>
    )
}
"use client"

import { Page } from '@/app/types'
import { LoadingSpinner } from '@/components/sections/MapSection/loading-spinner'
import { HTMLContent } from '@/components/shared/html-content'
import { apiClient } from '@/lib/axios'
import React, { useEffect, useState } from 'react'

export default function RenderPage({pageId}: { pageId: string }) {
    const [page, setPage] = useState<Page | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        ( async () =>{
            setIsLoading(true)
            try {
                const response: Page = await apiClient.get(`/api/pages/${pageId}`)
                setPage(response)
            } catch (error) {
                console.log("Erreur", error)
            }
            finally { setIsLoading(false) }
        })()
    }, [pageId])
    
    return (
        <>
            {
                isLoading ?
                <div className='h-screen w-screen flex justify-center items-center'>
                    <div className='w-min flex flex-col gap-3'>
                        <div className='mx-auto'><LoadingSpinner /></div>
                        <p className='text-center text-gray'>Chargement...</p>
                    </div>
                </div> :
                <HTMLContent html={page?.contenu_html!} className={`w-full`} />
            }
        </>
    )
}

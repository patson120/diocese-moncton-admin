"use client"

import { Page } from '@/app/types'
import { LoadingSpinner } from '@/components/sections/MapSection/loading-spinner'
import { HTMLContent } from '@/components/shared/html-content'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/axios'
import { Globe } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function RenderPage({pageId}: { pageId: string }) {
    const [page, setPage] = useState<Page | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [activeLangTab, setActiveLangTab] = useState("fr")

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
                <div className='relative w-full'>
                    <HTMLContent html={ activeLangTab === "fr" ? page?.contenu_html_fr! : page?.contenu_html_en! } className={`w-full`} />
                    <Button
                        variant="outline"
                        className='bg-blue text-white fixed top-10 right-10 z-50'
                        onClick={() => {
                        setActiveLangTab(activeLangTab === 'fr' ? 'en' : 'fr')}
                        }>
                        <Globe className="mr-2 h-4 w-4" />
                        { activeLangTab === 'fr' ? "Anglais" : "Français" }
                    </Button>
                </div>
            }
        </>
    )
}

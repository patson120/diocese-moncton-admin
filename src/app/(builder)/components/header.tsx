'use client'

import { Heart } from "lucide-react"
import Image from 'next/image'
import React, { useState } from 'react'


import { Button } from '@/components/ui/button'
import Link from "next/link"

const sections = [
    {
        title: "Accueil",
        items: [],
        page: '/'
    },
    {
        title: "Archidiocèse",
        items: []
    },
    {
        title: "Sacrements",
        items: []
    },
    {
        title: "Evènements",
        items: [],
        page: '/evenements'
    },
    {
        title: "Mouvements",
        items: []
    },
    {
        title: "Ressources",
        items: []
    },
]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <header className='flex-1 flex-col fixed top-0 left-0 right-0 z-50 shadow-sm bg-white'>
                <div className='relative'>
                    <div className='bg-[#F9F4F5] info-sections'>
                        <nav className='container max-margin py-3 overflow-x-hidden'>
                            <div className='hidden md:flex justify-between'>
                                <ul className='flex justify-center items-center space-x-3 text-xs md:text-sm lg:text-sm text-gray-500'>
                                    <li>
                                        <Link href="https://www.google.com/maps/place/224+Rue+St.+George,+Moncton,+NB+E1C+5J4,+Canada/@46.090801,-64.781807,17z/data=!3m1!4b1!4m6!3m5!1s0x4ca0b93b01f859a1:0xd74f8270dc13186e!8m2!3d46.090801!4d-64.781807!16s%2Fg%2F11c3q4b2z7?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D">Adresse: 224 St-George, Moncton, NB. E1C 0V1</Link>
                                    </li>
                                    <li className='info-section'>
                                        <Link href="tel:+(506)857-9531">Tél: (506) 857-9531</Link>
                                    </li>
                                    <li className='info-section'>
                                        <Link href="mailto:webmestre@diocesemoncton.ca">Email: webmestre@diocesemoncton.ca</Link>
                                    </li>
                                </ul>
                                {/**
                                 <LanguageSelector />
                                 */}
                            </div>
                            <div className='md:hidden h-[50px] flex justify-center items-center'>
                                <Link target='_blank' href="https://www.google.com/maps/place/224+Rue+St.+George,+Moncton,+NB+E1C+5J4,+Canada/@46.090801,-64.781807,17z/data=!3m1!4b1!4m6!3m5!1s0x4ca0b93b01f859a1:0xd74f8270dc13186e!8m2!3d46.090801!4d-64.781807!16s%2Fg%2F11c3q4b2z7?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D">Adresse: 224 St-George, Moncton, NB. E1C 0V1</Link>
                            </div>
                        </nav>
                    </div>
                    <nav className='container max-margin py-3 relative'>
                        <div className='justify-between items-center hidden btn-menu'>
                            <div className='relative shrink-0 w-20 h-14 xl:h-14'>
                                <Image
                                    alt="Logo diocèse de Moncton"
                                    src="/photo-2024-12-08-19-09-08-1.png"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            {/* Mobile menu button */}
                            <div className='flex flex-col justify-center items-center'>
                                <button
                                    onClick={() => { setIsOpen(prev => !prev) }}
                                    type="button"
                                    className="relative inline-flex items-center justify-center rounded-md p-2 pr-3 pb-0 focus:outline-none" aria-controls="mobile-menu" aria-expanded="false">
                                    <span className="absolute -inset-0.5"></span>
                                    <span className="sr-only">Open main menu</span>

                                    {/* Icon when menu is closed. */}

                                    {/* Menu open: "hidden", Menu closed: "block" */}

                                    <div className={`${isOpen ? 'hidden' : 'block'} justify-center items-center`}>
                                        <svg className="h-8 w-8 ml-1" fill="none" viewBox="0 0 20 20" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                        <p className='font-bold text-center'>Menu</p>
                                    </div>
                                </button>
                            </div>

                        </div>
                        {/*  */}

                        <div className='flex justify-between items-center h-menu'>
                            <div className='relative shrink-0 w-20 h-10 xl:h-14 cursor-pointer'>
                                <Image
                                    alt="Logo diocèse de Moncton"
                                    src="/photo-2024-12-08-19-09-08-1.png"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>

                            <ul className='flex justify-center items-center space-x-4 body-3 text-gray-500'>
                                <li className='px-2 py-1'>Accueil</li>
                                <li className='px-2 py-1'>Archidiocèse</li>
                                <li className='px-2 py-1'>Sacréments</li>
                                <li className='px-2 py-1'>Évènements</li>
                                <li className='px-2 py-1'>Mouvements</li>
                                <li className='px-2 py-1'>Ressources</li>
                            </ul>
                            <div className='flex'>
                                <Button onClick={() => {}}
                                    variant="outline" className='border border-primary hover:text-primary text-primary hover:bg-transparent bg-transparent body-3 font-extrabold py-2'>
                                    <Heart className="mr-2 h-4 w-4 xl:h-5 xl:w-5 text-primary" />
                                    Faire un don
                                </Button>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}

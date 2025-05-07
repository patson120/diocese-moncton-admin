

'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { formatDateToLocal } from '@/lib/utils'
import { BellIcon } from 'lucide-react';
import React, { useState } from 'react'

interface EventDetailsDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NotificationsDialog() {

    let notifications = Array.from({length: 24}).map((_, i) => (
        {
            id: i,
            message: 'Lorem ipsum dolor sit amet, consectetur',
            date: new Date(),
            active: false
        }
    ))

    notifications = [
        {
            id: -1,
            message: 'Lorem ipsum dolor sit amet, consectetur',
            date: new Date(),
            active: true
        },
        ...notifications
    ]

  const [open, setOpen] = useState(false)

  const onChange = (val: boolean) => {
    setOpen(val)
  }

  return (
    <Sheet open={open} onOpenChange={onChange} >
        <SheetTrigger asChild className='cursor-pointer'>
            <BellIcon className="w-6 h-6 text-noir-dashboard" />
        </SheetTrigger>
        <SheetContent className="max-w-3xl min-w-3xl">
        <SheetHeader>
          <SheetTitle hidden>Détails des notifications</SheetTitle>
        </SheetHeader>
        <div className='absolute top-0 left-0 right-0 z-[1] bg-white'>
          {/* Header with action buttons */}
          <header className="w-full py-2 flex items-center justify-between px-7">
            <h1 className='text-xl font-bold'>Notifications</h1>
            <Button onClick={() => onChange(false)} size={'sm'} variant="ghost" className='border-none focus:border-none hover:border-none' >
              Fermer
            </Button>
          </header>
        </div>

        {/* Scrollable content area */}
        <div className="h-screen w-[350px] mt-12 v-scroll overflow-y-scroll">
            <div className="flex flex-col gap-6">
            {/* Content section */}
            <section className="flex flex-col justify-start gap-2 ">
                {
                    notifications.map((notif, index) => (
                        <div key={index} className='relative items-center pb-3 border-b'>
                            <h3 className='font-medium'>{notif.message}</h3>
                            <p className='text-gray text-sm mt-2'>
                                {formatDateToLocal((notif.date).toISOString())}
                            </p>
                            {
                                notif.active &&
                                <div className='absolute top-0 right-0 h-3 w-3 bg-[#548EFA80] rounded-full'></div>
                            }
                        </div>
                    ))
                }
                
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

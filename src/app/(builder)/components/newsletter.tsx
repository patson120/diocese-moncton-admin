'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

export default function Newsletter() {

  return (
    <section className='vertical-margin w-full bg-white'>
      <div className='container max-margin py-0 flex flex-col md:flex-row justify-between gap-3'>
        <div className='text-black'>
          <h3 className='body-1 font-bold'>Newsletter</h3>
          <p className='text-[#575757] body-2'>Abonnez-vous à notre newsletter pour obtenir les <br className='hidden lg:block' />nouveautés sur l&lsquo;église.</p>
        </div>
        <div className='flex flex-col md:flex-row items-end md:items-center space-y-3 md:space-y-0 md:space-x-2'>
          <input disabled type="email" placeholder="Adresse email" className="border-2 border-gray-200 p-2 rounded-[12px] w-full" />

          <Button  className="w-full md:w-auto px-3 md:px-6 py-2 body-3">
            Je m&lsquo;abonne
          </Button>
        </div>
      </div>
    </section>
  )
}

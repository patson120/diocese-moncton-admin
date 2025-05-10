import { ClergPretres } from '@/components/sections/ClergPretres/ClergPretres'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={ <div className='h-[90vh] w-full flex justify-center items-center'><p className='text-center text-muted-foreground'>Loading</p> </div> }>
      <ClergPretres />
    </Suspense>
  )
}

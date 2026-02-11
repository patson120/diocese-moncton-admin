import { ContentSection } from '@/components/sections/ContentSection/ContentSection'
import { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={ <div className='h-[90vh] w-full flex justify-center items-center'><p className='text-center text-muted-foreground'>Loading</p> </div> }>
      <ContentSection />
    </Suspense>
  )
}

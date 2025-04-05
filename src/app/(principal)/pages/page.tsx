import { ContentSection } from '@/components/sections/ContentSection/ContentSection'
import { PageMenuSection } from '@/components/sections/PageMenuSection/PageMenuSection'
import React from 'react'

export default function page() {
  return (
    < div className="flex flex-col flex-1" >
      <PageMenuSection />
      <div className='px-6 py-6'>
        <ContentSection />
      </div>
    </div >
  )
}

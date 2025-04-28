
import ContentDisplaySection from '@/components/sections/ContentDisplaySection/ContentDisplaySection'
import React, { Suspense } from 'react'

export default function page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: number;
    categorie_id?: string;
  }>
})  {
  return (
    <div className="flex-1 flex flex-col">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <ContentDisplaySection />
      </Suspense>
    </div>
  )
}

import ParishSection from '@/components/sections/ParishSection/ParishSection'
import React, { Suspense } from 'react'

export default function page(props: {
    searchParams?: Promise<{
      query?: string;
      page?: number;
      categorie_id?: string;
    }>
  }) {
  return (
    <div>
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <ParishSection />
      </Suspense>
    </div>
  )
}

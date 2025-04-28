
import ContentDisplaySection from '@/components/sections/ContentDisplaySection/ContentDisplaySection'
import React from 'react'

export default function page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: number;
    categorie_id?: string;
  }>
})  {
  return (
    <div className="flex-1 flex flex-col">
      <ContentDisplaySection />
    </div>
  )
}

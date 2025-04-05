import { ContentDisplaySection } from '@/components/sections/ContentDisplaySection'
import { NavigationMenuSection } from '@/components/sections/NavigationMenuSection/NavigationMenuSection'
import React from 'react'

export default function page() {
  return (
    <div className="flex-1 flex flex-col">
      <NavigationMenuSection />
      <div className='p-6'>
        <ContentDisplaySection />
      </div>
    </div>
  )
}

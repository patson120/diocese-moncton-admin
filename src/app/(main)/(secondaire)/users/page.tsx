import React from 'react'
import { PageMenuSection } from './PageMenuSection'
import { UserListSection } from '@/components/sections/UserListSection/UserListSection'

export default function page() {
  return (
    <main>
      {/* Page menu section */}
      <div className="w-full">
        <PageMenuSection />
      </div>

      {/* User list section - main content */}
      <div className="flex-1 p-6 bg-[#f1f3f6]">
        <UserListSection />
      </div>
    </main >
  )
}

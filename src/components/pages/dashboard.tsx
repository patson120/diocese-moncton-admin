"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/pages/dashboard-shell';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { DashboardHeader } from '@/components/pages/dashboard-header';
import { usePagesStore } from '@/components/pages/stores/pages-store';
import { PagesList } from '@/components/pages/pages-list';

export default function Dashboard() {
  const router = useRouter();
  const { pages } = usePagesStore();
  const [isCreating, setIsCreating] = useState(false);
  
  const handleCreatePage = () => {
    router.push('/builder/new');
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Pages"
        description="Create and manage pages for your website."
      >
        <Button onClick={handleCreatePage} disabled={isCreating}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Page
        </Button>
      </DashboardHeader>
      <div className="p-6">
        <PagesList pages={pages} />
      </div>
    </DashboardShell>
  );
}
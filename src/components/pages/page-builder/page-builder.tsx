"use client";

import { DashboardShell } from '@/components/pages/dashboard-shell';
import { Component, Page } from '@/components/pages/lib/types';
import { BuilderCanvas } from '@/components/pages/page-builder/builder-canvas';
import { ComponentEditor } from '@/components/pages/page-builder/component-editor';
import { ComponentLibrary } from '@/components/pages/page-builder/component-library';
import { PreviewPanel } from '@/components/pages/page-builder/preview-panel';
import { usePagesStore } from '@/components/pages/stores/pages-store';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Code, Eye, Globe, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { slugGenerator } from '../lib/utils/slug-generator';

interface PageBuilderProps {
  pageId: string;
}

export function PageBuilder({ pageId }: PageBuilderProps) {
  const router = useRouter();
  const { getPage, addPage, updatePage, updatePageStatus } = usePagesStore();
  const [page, setPage] = useState<Page | null>(null);
  const [title, setTitle] = useState('');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('builder');
  const [isSaving, setIsSaving] = useState(false);
  const [showPublishAlert, setShowPublishAlert] = useState(false);
  const [showExitAlert, setShowExitAlert] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Initialize page data
  useEffect( () => {
    if (pageId === 'new') {
      // Start with a new page
      setTitle('New Page');
      setPage({
        id: 'temp',
        title: 'New Page',
        slug: 'new-page',
        status: 'draft',
        components: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      // Load existing page
      getPage(pageId).then(existingPage => {
        if (existingPage) {
          const page: Page = {...existingPage!,id: pageId};
          setPage(page!);
          setTitle(page!.title);
        } else {
          // Handle invalid page ID
          router.push('/create-page/new');
        }
      });
    }
  }, [pageId, getPage, router]);

  // Track changes
  useEffect(() => {
    if (page && (page.title !== title || page.id === 'temp')) {
      setHasUnsavedChanges(true);
    }
  }, [page, title]);

  const handleSave = async () => {
    if (!page) return;
    
    setIsSaving(true);
    
    try {
      if (page.id === 'temp') {
        // Create new page
        const slug = slugGenerator(title) // title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const newPageId = await addPage({
          title,
          slug,
          status: 'draft',
          components: page.components,
          description: '',
        });
      
        toast.success('Page created successfully');
        router.push(`/create-page/${newPageId}`);
      } else {
        // Update existing page
        updatePage(page.id, {
          title,
          slug: slugGenerator(title),
          components: page.components,
          updatedAt: new Date().toISOString(),
        });
        
        setHasUnsavedChanges(false);
        toast.success('Page saved successfully');
      }
    } catch (error) {
      toast.error('Failed to save page');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = () => {
    if (!page || page.id === 'temp') return;
    
    updatePageStatus(page.id, 'published');
    setShowPublishAlert(false);
    toast.success('Page published successfully');
  };

  const handleComponentSelect = (componentId: string | null) => {
    setSelectedComponentId(componentId);
  };

  const handleComponentAdd = (component: Component) => {
    if (!page) return;
    
    setPage({
      ...page,
      components: [...page.components, component],
    });
    
    setHasUnsavedChanges(true);
  };

  const handleComponentUpdate = (componentId: string, data: Partial<Component>) => {
    if (!page) return;
    
    setPage({
      ...page,
      components: page.components.map((c) =>
        c.id === componentId ? { ...c, ...data } : c
      ),
    });
    
    setHasUnsavedChanges(true);
  };

  const handleComponentDelete = (componentId: string) => {
    if (!page) return;
    
    setPage({
      ...page,
      components: page.components.filter((c) => c.id !== componentId),
    });
    
    setSelectedComponentId(null);
    setHasUnsavedChanges(true);
  };

  const handleComponentReorder = (startIndex: number, endIndex: number) => {
    if (!page) return;
    
    const orderedComponents = [...page.components].sort((a, b) => a.order - b.order);
    const [removed] = orderedComponents.splice(startIndex, 1);
    orderedComponents.splice(endIndex, 0, removed);
    
    // Reassign orders
    const updatedComponents = orderedComponents.map((component, index) => ({
      ...component,
      order: index,
    }));
    
    setPage({
      ...page,
      components: updatedComponents,
    });
    
    setHasUnsavedChanges(true);
  };

  const handleExit = () => {
    if (hasUnsavedChanges) {
      setShowExitAlert(true);
    } else {
      router.push('/');
    }
  };

  const confirmExit = () => {
    router.push('/create-page/new');
  };

  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardShell>
      <div className="flex flex-col h-[calc(100vh)]">
        <div className="border-b">
          <div className="flex items-center gap-4 py-4">
            <Button variant="ghost" size="icon" onClick={handleExit}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold h-10 border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                placeholder="Page Title"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setActiveTab(activeTab === 'preview' ? 'builder' : 'preview')}>
                {activeTab === 'preview' ? (
                  <>
                    <Code className="mr-2 h-4 w-4" />
                    Builder
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowPublishAlert(true)}
                disabled={page.id === 'temp' || page.components.length === 0}
              >
                <Globe className="mr-2 h-4 w-4" />
                Publish
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={isSaving || (!hasUnsavedChanges && page.id !== 'temp')}
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeTab === 'builder' ? (
            <div className="grid grid-cols-12 h-full">
              <div className="col-span-2 border-r">
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <h3 className="text-sm font-medium mb-4">Components</h3>
                    <ComponentLibrary onAdd={handleComponentAdd} />
                  </div>
                </ScrollArea>
              </div>
              
              <div className="col-span-7 bg-secondary/20">
                <ScrollArea className="h-[calc(100vh-80px)]">
                  <div className="p-4">
                    <BuilderCanvas
                      components={page.components}
                      selectedComponentId={selectedComponentId}
                      onSelect={handleComponentSelect}
                      onUpdate={handleComponentUpdate}
                      onDelete={handleComponentDelete}
                      onReorder={handleComponentReorder}
                    />
                  </div>
                </ScrollArea>
              </div>
              
              <div className="col-span-3 border-l">
                <ScrollArea className="h-[calc(100vh-80px)]">
                  {selectedComponentId ? (
                    <div className="p-4">
                      <ComponentEditor
                        component={page.components.find(c => c.id === selectedComponentId)!}
                        onUpdate={(data) => handleComponentUpdate(selectedComponentId, data)}
                        onClose={() => setSelectedComponentId(null)}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[calc(100vh-80px)] text-muted-foreground p-4 text-center">
                      <div>
                        <p>Select a component to edit its properties</p>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          ) : (
            <PreviewPanel page={page} />
          )}
        </div>
      </div>
      
      <AlertDialog open={showPublishAlert} onOpenChange={setShowPublishAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publish Page</AlertDialogTitle>
            <AlertDialogDescription>
              This will make the page visible on your website. Are you sure you want to publish this page?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePublish}>Publish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={showExitAlert} onOpenChange={setShowExitAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave this page? Your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmExit}>Leave</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardShell>
  );
}
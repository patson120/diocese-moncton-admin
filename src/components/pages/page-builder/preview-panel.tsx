"use client";

import { useState } from 'react';
import { Page, Component, DeviceType } from '@/components/pages/lib/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Tablet, Monitor, Code } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HeroComponent } from '@/components/pages/page-components/hero-component';
import { FeatureComponent } from '@/components/pages/page-components/feature-component';
import { TextComponent } from '@/components/pages/page-components/text-component';
import { ImageComponent } from '@/components/pages/page-components/image-component';
import { generatePageHtml } from '../lib/utils/html-generator';
import ColumnsComponent from '../page-components/columns-component';
import TextImageComponent from '../page-components/text-image-component';
import { GalleryComponent } from '../page-components/gallery-component';

interface PreviewPanelProps {
  page: Page;
}

export function PreviewPanel({ page }: PreviewPanelProps) {
  const [deviceView, setDeviceView] = useState<DeviceType>('desktop');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  
  // Sort components by order
  const sortedComponents = [...page.components].sort((a, b) => a.order - b.order);
  
  const renderComponent = (component: Component) => {
    const props = { ...component.props, deviceView: deviceView  }
    switch (component.type) {
      case 'hero':
        return <HeroComponent title='' subtitle='' {...props} />;
      case 'feature':
        return <FeatureComponent title='' description='' features={[]} {...props} />;
      case 'text':
        return <TextComponent title='' content='' {...props} />;
      case 'text-image':
        return <TextImageComponent title="" content='' {...props} />;
      case 'image':
        return <ImageComponent alt='' src='' {...props} />;
      case 'gallery':
        return <GalleryComponent title="" features={[]} {...props} />;
      case 'columns':
        return <ColumnsComponent title="" description="" features={[]} {...props} />;
        
      default:
        return (
          <div className="p-4 text-center bg-muted">
            <h3 className="text-lg font-medium">{component.type}</h3>
            <p className="text-sm text-muted-foreground">
              Component preview not available
            </p>
          </div>
        );
    }
  };
  
  const getPageHtml = () => {
    // This would be more comprehensive in a real implementation
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${page.title}</title>
        ${page.metaData?.description ? `<meta name="description" content="${page.metaData.description}">` : ''}
        ${page.metaData?.keywords ? `<meta name="keywords" content="${page.metaData.keywords}">` : ''}
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body>
        <!-- Generated Page Content -->
        ${sortedComponents.map(component => {
          return `<section data-component-type="${component.type}" data-component-id="${component.id}">
          ${JSON.stringify(component.props)}
          <!-- Component content would be rendered here -->
        </section>`;
        }).join('\n  ')}
      </body>
    </html>`;
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="border-b bg-card">
        <div className="flex items-center justify-between py-2">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">HTML Output</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {activeTab === 'preview' && (
            <div className="flex items-center gap-2">
              <Button
                variant={deviceView === 'mobile' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setDeviceView('mobile')}>
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button
                variant={deviceView === 'tablet' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setDeviceView('tablet')}>
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={deviceView === 'desktop' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setDeviceView('desktop')}>
                <Monitor className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {activeTab === 'preview' ? (
          <div className="h-full bg-secondary/20 p-4 px-0 overflow-y-auto v-scroll">
            <div className={`device-frame device-frame-${deviceView} bg-white`}>
              <ScrollArea className={`h-full`}>
                {sortedComponents.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>No components added yet. Add components to see the preview.</p>
                  </div>
                ) : (
                  <div className="space-y-4 min-h-full">
                    {sortedComponents.map((component) => (
                      <div key={component.id}>
                        {renderComponent(component)}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="p-4">
              <pre className="bg-card p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                {/**
                  {getPageHtml()}
                */}
                {generatePageHtml(page)}
              </pre>
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
"use client";

import { Component } from '@/components/pages/lib/types';
import { FeatureComponent } from '@/components/pages/page-components/feature-component';
import { HeroComponent } from '@/components/pages/page-components/hero-component';
import { ImageComponent } from '@/components/pages/page-components/image-component';
import { TextComponent } from '@/components/pages/page-components/text-component';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Check, CopySlash, GripVertical, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { getComponentDefinitionByType } from '../lib/components/registry';
import { GalleryComponent } from '../page-components/gallery-component';
import TextImageComponent from '../page-components/text-image-component';
import TwoColumnsComponent from '../page-components/two-columns-component';
import TextLeftComponent from '../page-components/text-left-component';

interface BuilderCanvasProps {
  components: Component[];
  selectedComponentId: string | null;
  onSelect: (componentId: string | null) => void;
  onUpdate: (componentId: string, data: Partial<Component>) => void;
  onDelete: (componentId: string) => void;
  onDuplicate: (componentId: string) => void;
  onMove: (componentId: string, direction: "up" | "down") => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export function BuilderCanvas({
  components,
  selectedComponentId,
  onSelect,
  onUpdate,
  onDelete,
  onReorder,
  onDuplicate,
  onMove,
}: BuilderCanvasProps) {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  
  // Sort components by order
  const sortedComponents = [...components].sort((a, b) => a.order - b.order);
  
  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };
  
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null) return;
    if (draggedItem === index) return;
    
    // Reorder the components
    onReorder(draggedItem, index);
    setDraggedItem(index);
  };
  
  const handleDragEnd = () => {
    setDraggedItem(null);
  };
  
  const renderComponent = (component: Component) => {
      const props = {...component.props, deviceView: 'desktop' as const}
      switch (component.type) {
        case 'hero':
          return <HeroComponent title="" subtitle="" {...props} />;
        case 'feature':
          return <FeatureComponent title="" description="" features={[]} {...props} />;
        case 'columns':
            return <TwoColumnsComponent title="" description="" features={[]} {...props} />;
        case 'text-image':
          return <TextImageComponent title="" content='' {...props} />;
        case 'text':
          return <TextComponent title="" content="" {...props} />;
        case 'text-left':
            return <TextLeftComponent title="" content="" {...props} />;
        case 'image':
          return <ImageComponent src="" alt="" {...props} />;
        case 'gallery':
          return <GalleryComponent title="" features={[]} {...props} />;
      default:
        const definition = getComponentDefinitionByType(component.type);
        return (
          <div className="p-4 text-center bg-muted">
            <h3 className="text-lg font-medium">{definition?.name || component.type}</h3>
            <p className="text-sm text-muted-foreground">
              {definition?.description || 'Component preview not available'}
            </p>
          </div>
        );
    }
  };
  
  if (sortedComponents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-primary/20 rounded-lg bg-secondary/10 text-center space-y-4">
        <h3 className="text-xl font-semibold">Start Building Your Page</h3>
        <p className="text-muted-foreground max-w-md">
          Your page is currently empty. Drag components from the library on the left to start building your page.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 min-h-[calc(100vh-80px)]">
      {sortedComponents.map((component, index) => (
        <div
          key={component.id}
          className={`builder-component ${selectedComponentId === component.id ? 'builder-component-selected' : ''}`}
          onClick={() => onSelect(component.id)}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}>
          <div className="builder-component-controls z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 drag-handle"
              onClick={(e) => e.stopPropagation()}>
              <GripVertical className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                if (selectedComponentId){ 
                  onUpdate(selectedComponentId, { props: component.props }) 
                  onSelect(null)
                }
                else { onSelect(component.id) }
              }}>
              {
                selectedComponentId === component.id ?
                ( <Check className="h-4 w-4" /> ) :
                ( <Pencil className="h-4 w-4" /> ) 
              }
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate(component.id);
              }}>
              <CopySlash className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                onMove(component.id, 'down');
              }}>
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                onMove(component.id, 'up');
              }}>
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(component.id);
              }}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          { renderComponent(component) }
        </div>
      ))}
    </div>
  );
}
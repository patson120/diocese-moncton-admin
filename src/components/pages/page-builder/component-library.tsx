"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Component, ComponentType } from '@/components/pages/lib/types';
import { v4 as uuidv4 } from '@/components/pages/lib/uuid';
import { Search, Layout, Type, Image as ImageIcon, Grid, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { componentRegistry, getComponentIcon } from '../lib/components/registry';

interface ComponentLibraryProps {
  onAdd: (component: Component) => void;
}

export function ComponentLibrary({ onAdd }: ComponentLibraryProps) {

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = ['all', 'layout', 'content', 'media', 'advanced'];  
  
  const filteredComponents = searchTerm
  ? componentRegistry.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type.toLowerCase().includes(searchTerm.toLowerCase())
  )
  : componentRegistry;
  
  // const componentDefinitions = getComponentDefinitions();

  // const filteredComponents = componentDefinitions.filter(component => {
  //   const matchesSearch = searchTerm === '' || 
  //     component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     component.description.toLowerCase().includes(searchTerm.toLowerCase());
  //     
  //   const matchesCategory = activeCategory === 'all' || 
  //     (activeCategory === 'layout' && ['hero', 'header', 'footer'].includes(component.type)) ||
  //     (activeCategory === 'content' && ['text', 'image', 'gallery'].includes(component.type)) ||
  //     (activeCategory === 'sections' && ['feature', 'testimonial', 'pricing', 'cta', 'team', 'contact'].includes(component.type));
  //     
  //   return matchesSearch && matchesCategory;
  // });
  
  const handleAddComponent = (type: ComponentType, defaultProps: Record<string, any>) => {
    const newComponent: Component = {
      id: uuidv4(),
      type,
      props: { ...defaultProps },
      order: 9999, // Will be re-ordered when added
      children: [],
    };
  
    onAdd(newComponent);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search components..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
              onClick={handleClearSearch}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
      </div>
      
      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className='max-w-[270px]'>
        <TabsList className="flex justify-start gap-3 h-auto overflow-x-scroll h-scroll [&::-webkit-scrollbar]:h-0">
          {
            categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                style={{ backgroundColor: 'white' }}
                className={`py-1 capitalize ${activeCategory === category ? 'bg-white text-secondary-foreground' : 'bg-transparent text-muted-foreground'}`}>
                {category}
              </TabsTrigger>  
            ))
          }
        </TabsList>
      </Tabs>
      
      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="space-y-2">
          {filteredComponents.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground p-4">
              No components found. Try a different search.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {filteredComponents
                .filter(c => activeCategory === 'all' || c.category === activeCategory.toLowerCase())
                .map(component => {
                  const ComponentIcon = getComponentIcon(component.type);
                  return (
                    <Button
                      key={`${component.type}`}
                      variant="outline"
                      className="h-auto py-4 flex flex-col items-center justify-center gap-2 text-xs"
                      onClick={() => handleAddComponent(component.type, component.defaultProps)}>
                      <ComponentIcon className="h-5 w-5" />
                      {component.name}
                    </Button>
                  );
                })
              }
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
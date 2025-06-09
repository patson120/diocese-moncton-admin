"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Component } from '@/components/pages/lib/types';
import { X } from 'lucide-react';
import { getComponentDefinitionByType } from '../lib/components/registry';

interface ComponentEditorProps {
  component: Component;
  onUpdate: (data: Partial<Component>) => void;
  onClose: () => void;
}

export function ComponentEditor({ component, onUpdate, onClose }: ComponentEditorProps) {
  const definition = getComponentDefinitionByType(component.type);
  
  if (!definition) {
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Component Editor</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground">Component type not found: {component.type}</p>
      </div>
    );
  }
  
  const updateProps = (key: string, value: any) => {
    // console.info(`Updating component prop: ${key} = ${value}`)
    
    onUpdate({
      props: {
        ...component.props,
        [key]: value,
      },
    });
  };
  
  const renderEditor = () => {
    switch (component.type) {
      case 'hero':
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={component.props.title || ''}
                  onChange={(e) => updateProps('title', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Textarea
                  id="subtitle"
                  value={component.props.subtitle || ''}
                  onChange={(e) => updateProps('subtitle', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={component.props.buttonText || ''}
                  onChange={(e) => updateProps('buttonText', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="buttonLink">Button Link</Label>
                <Input
                  id="buttonLink"
                  value={component.props.buttonLink || ''}
                  onChange={(e) => updateProps('buttonLink', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backgroundImage">Background Image URL</Label>
                <Input
                  id="backgroundImage"
                  value={component.props.backgroundImage || ''}
                  onChange={(e) => updateProps('backgroundImage', e.target.value)}
                />
                {component.props.backgroundImage && (
                  <div className="mt-2 rounded overflow-hidden h-20 bg-muted">
                    <img 
                      src={component.props.backgroundImage}
                      alt="Background preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        );
        
      case 'text':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={component.props.content || ''}
                onChange={(e) => updateProps('content', e.target.value)}
                rows={8}
              />
              <p className="text-xs text-muted-foreground">
                You can use HTML tags like &lt;h1&gt;, &lt;p&gt;, &lt;strong&gt;, etc.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Alignment</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={component.props.alignment === 'left' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateProps('alignment', 'left')}
                >
                  Left
                </Button>
                <Button
                  type="button"
                  variant={component.props.alignment === 'center' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateProps('alignment', 'center')}
                >
                  Center
                </Button>
                <Button
                  type="button"
                  variant={component.props.alignment === 'right' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateProps('alignment', 'right')}
                >
                  Right
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 'image':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="src">Image URL</Label>
              <Input
                id="src"
                value={component.props.src || ''}
                onChange={(e) => updateProps('src', e.target.value)}
              />
              {component.props.src && (
                <div className="mt-2 rounded overflow-hidden h-40 bg-muted">
                  <img 
                    src={component.props.src}
                    alt="Image preview"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={component.props.alt || ''}
                onChange={(e) => updateProps('alt', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                value={component.props.caption || ''}
                onChange={(e) => updateProps('caption', e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'feature':
        return (
          <ColumnComponent 
            keyString='feature'
            component={component} 
            updateProps={updateProps} 
          />
        );
      
      case 'columns':
        return (
          <ColumnComponent 
            keyString='column'
            component={component} 
            updateProps={updateProps} 
          />
        );
        
      default:
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This component type ({component.type}) does not have a dedicated editor yet.
              Basic properties are shown below.
            </p>
            
            {Object.entries(component.props).map(([key, value]) => {
              if (typeof value === 'string') {
                return (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                    <Input
                      id={key}
                      value={value}
                      onChange={(e) => updateProps(key, e.target.value)}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        );
    }
  };

  
  
  return (
    <div className="component-editor">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{definition.name}</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="content">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="mt-4">
          {renderEditor()}
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Component Type</Label>
              <div className="p-2 bg-muted rounded text-sm">
                {definition.name} ({component.type})
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Spacing</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="marginTop" className="text-xs">Margin Top</Label>
                  <Input
                    id="marginTop"
                    type="number"
                    value={component.props.marginTop || 0}
                    onChange={(e) => updateProps('marginTop', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label htmlFor="marginBottom" className="text-xs">Margin Bottom</Label>
                  <Input
                    id="marginBottom"
                    type="number"
                    value={component.props.marginBottom || 0}
                    onChange={(e) => updateProps('marginBottom', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Background</Label>
              <Input
                type="color"
                value={component.props.backgroundColor || '#ffffff'}
                onChange={(e) => updateProps('backgroundColor', e.target.value)}
                className="h-10 w-full p-1"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const ColumnComponent = ({keyString, component, updateProps}: {
  keyString: string;
  component: Component;
  updateProps: (key: string, value: any) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={component.props.title || ''}
          onChange={(e) => updateProps('title', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Section Description</Label>
        <Textarea
          id="description"
          value={component.props.description || ''}
          onChange={(e) => updateProps('description', e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor='columns'>Columns</Label>
        <Input
          id='columns'
          type="number"
          value={component.props.columns || '1'}
          onChange={(e) => updateProps('columns', parseInt(e.target.value) || 1)}
          max={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Features</Label>
        <div className="space-y-4">
          {component.props.features?.map((feature: any, index: number) => (
            <div key={index} className="border rounded-md p-3">
              <div className="space-y-2">
                <Label htmlFor={`${keyString}-${index}-title`}>Title</Label>
                <Input
                  id={`${keyString}-${index}-title`}
                  value={feature.title || ''}
                  onChange={(e) => {
                    const updatedFeatures = [...component.props.features];
                    updatedFeatures[index] = {
                      ...updatedFeatures[index],
                      title: e.target.value,
                    };
                    updateProps(`features`, updatedFeatures);
                  }}
                />
              </div>
              
              <div className="space-y-2 mt-2">
                <Label htmlFor={`${keyString}-${index}-description`}>Description</Label>
                <Textarea
                  id={`${keyString}-${index}-description`}
                  value={feature.description || ''}
                  onChange={(e) => {
                    const updatedFeatures = [...component.props.features];
                    updatedFeatures[index] = {
                      ...updatedFeatures[index],
                      description: e.target.value,
                    };
                    console.log(e.target.value);
                    
                    updateProps(`features`, updatedFeatures);
                  }}
                  rows={2}
                />
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const updatedFeatures = [...(component.props.features || [])];
              updatedFeatures.push({
                title: `New ${keyString}`,
                description: 'Description goes here',
                icon: 'star',
              });
              updateProps(`features`, updatedFeatures);
            }}
          >
            Add {keyString}
          </Button>
        </div>
      </div>
    </div>
  )
}
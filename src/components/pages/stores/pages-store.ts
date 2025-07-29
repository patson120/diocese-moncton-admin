"use client";

import { Component, Page, PageStatus } from '@/components/pages/lib/types';
import { v4 as uuidv4 } from '@/components/pages/lib/uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { handleCreatePage, handleReadPage, handleUpdatePage } from '../lib/utils';

interface PagesState {
  pages: Page[];
  addPage: (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updatePage: (id: string, data: Partial<Page>) => void;
  deletePage: (id: string) => void;
  getPage: (id: string) => Promise<Page | undefined>;
  duplicatePage: (id: string) => string;
  addComponent: (pageId: string, component: Omit<Component, 'id' | 'order'>) => void;
  updateComponent: (pageId: string, componentId: string, data: Partial<Component>) => void;
  deleteComponent: (pageId: string, componentId: string) => void;
  reorderComponents: (pageId: string, startIndex: number, endIndex: number) => void;
  updatePageStatus: (pageId: string, status: PageStatus) => void;
  exportPageHtml: (pageId: string) => string;
}


export const usePagesStore = create<PagesState>()(
  persist(
    (set, get) => ({
      pages: [],
      
      addPage: async (pageData) => {
        const id = "1"; //uuidv4();
        const now = new Date().toISOString();
        
        let page: Page = {
          id,
          title: pageData.title,
          description: pageData.description,
          slug: pageData.slug,
          status: pageData.status || 'draft',
          components: pageData.components || [],
          createdAt: now,
          updatedAt: now,
          preview: pageData.preview,
          publishedVersions: pageData.publishedVersions || [],
          metaData: pageData.metaData || {},
        }
        const response: any = await handleCreatePage(page)
        
         set((state) => ({
           pages: [...state.pages, {...page, id: response.id }],
         }))
        
        return response.id;
      },
      
      updatePage: (id, data) => {
        handleUpdatePage({...data, id: id} as Page);
        // set((state) => ({
        //   pages: state.pages.map((page) => 
        //   { 
        //     console.log("Updating page:", page, id);
        //     
        //     if (page.id === id){
        //       handleUpdatePage(page)
        //       return { ...page, ...data, updatedAt: new Date().toISOString() }
        //     }
        //     else {
        //       return page
        //     }
        //   }),
        // }));
      },
      
      deletePage: (id) => {
        set((state) => ({
          pages: state.pages.filter((page) => page.id !== id),
        }));
      },
      
      getPage: async (id) => {
        return await handleReadPage(id)
      },
      
      duplicatePage: (id) => {
        const page = get().pages.find((page) => page.id === id);
        if (!page) return '';
        
        const newId = uuidv4();
        const now = new Date().toISOString();
        
        const duplicatedPage: Page = {
          ...page,
          id: newId,
          title: `${page.title} (Copy)`,
          slug: `${page.slug}-copy`,
          status: 'draft',
          createdAt: now,
          updatedAt: now,
          publishedVersions: [],
          components: page.components.map(component => ({
            ...component,
            id: uuidv4(),
          })),
        };
        
        set((state) => ({
          pages: [...state.pages, duplicatedPage],
        }));
        
        return newId;
      },
      
      addComponent: (pageId, componentData) => {
        set((state) => {
          const page = state.pages.find((p) => p.id === pageId);
          if (!page) return state;
          
          const components = [...page.components];
          const order = components.length > 0 
            ? Math.max(...components.map(c => c.order)) + 1 
            : 0;
          
          const newComponent: Component = {
            id: uuidv4(),
            type: componentData.type,
            props: componentData.props,
            order,
          };
          
          return {
            pages: state.pages.map((p) =>
              p.id === pageId
                ? {
                    ...p,
                    components: [...p.components, newComponent],
                    updatedAt: new Date().toISOString(),
                  }
                : p
            ),
          };
        });
      },
      
      updateComponent: (pageId, componentId, data) => {
        set((state) => {
          const page = state.pages.find((p) => p.id === pageId);
          if (!page) return state;
          
          return {
            pages: state.pages.map((p) =>
              p.id === pageId
                ? {
                    ...p,
                    components: p.components.map((c) =>
                      c.id === componentId ? { ...c, ...data } : c
                    ),
                    updatedAt: new Date().toISOString(),
                  }
                : p
            ),
          };
        });
      },
      
      deleteComponent: (pageId, componentId) => {
        set((state) => {
          const page = state.pages.find((p) => p.id === pageId);
          if (!page) return state;
          
          return {
            pages: state.pages.map((p) =>
              p.id === pageId
                ? {
                    ...p,
                    components: p.components.filter((c) => c.id !== componentId),
                    updatedAt: new Date().toISOString(),
                  }
                : p
            ),
          };
        });
      },
      
      reorderComponents: (pageId, startIndex, endIndex) => {
        set((state) => {
          const page = state.pages.find((p) => p.id === pageId);
          if (!page) return state;
          
          const components = [...page.components].sort((a, b) => a.order - b.order);
          const [removed] = components.splice(startIndex, 1);
          components.splice(endIndex, 0, removed);
          
          // Reassign orders
          const updatedComponents = components.map((component, index) => ({
            ...component,
            order: index,
          }));
          
          return {
            pages: state.pages.map((p) =>
              p.id === pageId
                ? {
                    ...p,
                    components: updatedComponents,
                    updatedAt: new Date().toISOString(),
                  }
                : p
            ),
          };
        });
      },
      
      updatePageStatus: (pageId, status) => {
        set((state) => {
          const now = new Date().toISOString();
          
          return {
            pages: state.pages.map((page) =>
              page.id === pageId
                ? {
                    ...page,
                    status,
                    updatedAt: now,
                    publishedVersions: status === 'published'
                      ? [...(page.publishedVersions || []), now]
                      : page.publishedVersions,
                  }
                : page
            ),
          };
        });
      },
      
      exportPageHtml: (pageId) => {
        const page = get().pages.find((p) => p.id === pageId);
        if (!page) return '';
        
        // In a real app, this would generate HTML from components
        // For now, we'll return a placeholder
        return `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${page.title}</title>
            ${page.metaData?.description ? `<meta name="description" content="${page.metaData.description}">` : ''}
            ${page.metaData?.keywords ? `<meta name="keywords" content="${page.metaData.keywords}">` : ''}
          </head>
          <body>
            <!-- Generated Page Content -->
            <h1>${page.title}</h1>
            ${page.components.map(component => {
              // In a real implementation, this would render the component based on its type and props
              return `<section data-component-type="${component.type}" data-component-id="${component.id}">
                <!-- Component content would be rendered here based on the component type and props -->
              </section>`;
            }).join('\n  ')}
          </body>
        </html>`;
      },
    }),
    {
      name: 'pages-storage',
    }
  )
);
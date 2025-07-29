export type ComponentType = 
  | 'hero'
  | 'feature'
  | 'testimonial'
  | 'pricing'
  | 'cta'
  | 'gallery'
  | 'team'
  | 'contact'
  | 'footer'
  | 'header'
  | 'text'
  | 'image'

  //
  | 'contactForm'
  | 'features'
  | 'columns'
  | 'two-columns'
  | 'text-image'
  | 'text-left'

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export interface ComponentDefinition {
  type: ComponentType;
  name: string;
  icon: string;
  description?: string;
  category: 'layout' | 'content' | 'media' | 'form' | 'advanced';
  defaultProps: Record<string, any>;
  propDefinitions: PropDefinition[];
  template?: string; // Optional HTML template for the component
}

export interface PropDefinition {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'color' | 'select' | 'boolean';
  defaultValue: any;
  options?: { label: string; value: string }[];
}

export interface Component {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  order: number;
  children?: Component[];
}

export type PageStatus = 'draft' | 'published';

export interface Page {
  id: string;
  title: string;
  description?: string;
  slug: string;
  status: PageStatus;
  components: Component[];
  createdAt: string;
  updatedAt: string;
  preview?: string;
  publishedVersions?: string[];
  metaData?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
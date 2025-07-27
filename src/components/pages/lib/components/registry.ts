
import { ComponentDefinition, ComponentType } from '../types';
import { 
  LayoutIcon, 
  Type, 
  ImageIcon, 
  FormInput, 
  Rows3, 
  Columns, 
  FileText, 
  Boxes, 
  Contact, 
  ImageDown, 
  Laptop, 
  SlidersHorizontal,
  Quote
} from 'lucide-react';

export const componentRegistry: ComponentDefinition[] = [
  {
    type: 'hero',
    name: 'Hero Section',
    icon: 'LayoutIcon',
    category: 'layout',
    defaultProps: {
      title: 'Welcome to our website',
      subtitle: 'Discover our amazing products and services',
      backgroundImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      textColor: '#000000', //  '#ffffff',
      backgroundColor: '#ffffff',
      alignment: 'center',
      buttonText: 'Learn More',
      buttonUrl: '#',
    },
    propDefinitions: [
      { name: 'title', label: 'Title', type: 'text', defaultValue: 'Welcome to our website' },
      { name: 'subtitle', label: 'Subtitle', type: 'textarea', defaultValue: 'Discover our amazing products and services' },
      { name: 'backgroundImage', label: 'Background Image URL', type: 'text', defaultValue: '' },
      { name: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#ffffff' },
      { name: 'backgroundColor', label: 'Background Color', type: 'color', defaultValue: '#4f46e5' },
      { name: 'alignment', label: 'Alignment', type: 'select', defaultValue: 'center', options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' }
      ]},
      { name: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Learn More' },
      { name: 'buttonUrl', label: 'Button URL', type: 'text', defaultValue: '#' },
    ]
  },
  {
    type: 'text',
    name: 'Text Block',
    icon: 'Type',
    category: 'content',
    defaultProps: {
      title: 'Title',
      content: '<p>This is a paragraph of text. You can edit this text to add your own content.</p>',
      textAlign: 'center',
      padding: '16px',
    },
    propDefinitions: [
      { name: 'content', label: 'Content', type: 'textarea', defaultValue: '<p>This is a paragraph of text. You can edit this text to add your own content.</p>' },
      { name: 'textAlign', label: 'Text Alignment', type: 'select', defaultValue: 'left', options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Justify', value: 'justify' }
      ]},
      { name: 'padding', label: 'Padding', type: 'text', defaultValue: '16px' },
    ]
  },
  {
    type: 'image',
    name: 'Image',
    icon: 'ImageIcon',
    category: 'media',
    defaultProps: {
      src: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Image description',
      width: '100%',
      height: 'auto',
      rounded: false,
    },
    propDefinitions: [
      { name: 'src', label: 'Image URL', type: 'text', defaultValue: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
      { name: 'alt', label: 'Alt Text', type: 'text', defaultValue: 'Image description' },
      { name: 'width', label: 'Width', type: 'text', defaultValue: '100%' },
      { name: 'height', label: 'Height', type: 'text', defaultValue: 'auto' },
      { name: 'rounded', label: 'Rounded Corners', type: 'boolean', defaultValue: false },
    ]
  },
  // {
  //   type: 'contactForm',
  //   name: 'Contact Form',
  //   icon: 'FormInput',
  //   category: 'form',
  //   defaultProps: {
  //     title: 'Contact Us',
  //     description: 'Fill out the form below to get in touch with us.',
  //     submitButtonText: 'Send Message',
  //     backgroundColor: '#f9fafb',
  //     textColor: '#111827',
  //   },
  //   propDefinitions: [
  //     { name: 'title', label: 'Form Title', type: 'text', defaultValue: 'Contact Us' },
  //     { name: 'description', label: 'Description', type: 'textarea', defaultValue: 'Fill out the form below to get in touch with us.' },
  //     { name: 'submitButtonText', label: 'Submit Button Text', type: 'text', defaultValue: 'Send Message' },
  //     { name: 'backgroundColor', label: 'Background Color', type: 'color', defaultValue: '#f9fafb' },
  //     { name: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#111827' },
  //   ]
  // },
  {
    type: 'columns',
    name: 'Two Columns',
    icon: 'Columns',
    category: 'layout',
    defaultProps: {      
      title: 'Two columns',
      description: 'Discover how to create columns',
      features: [
        { title: 'Feature 1', description: 'Description of feature 1', icon: 'star' },
        { title: 'Feature 2', description: 'Description of feature 2', icon: 'shield' },
      ],
      columns: 2,
    },
    propDefinitions: [
      { name: 'title', label: 'Section Title', type: 'text', defaultValue: 'Our Features' },
      { name: 'description', label: 'Section Description', type: 'textarea', defaultValue: 'Discover what makes our product special' },
      { name: 'features', label: 'Features', type: 'text', defaultValue: '' },
      { name: 'columns', label: 'Columns', type: 'number', defaultValue: 2 },
    ]
  },
  {
    type: 'gallery',
    name: 'Image Gallery',
    icon: 'ImageDown',
    category: 'media',
    defaultProps: {
      images: [
        { src: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Gallery image 1' },
        { src: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Gallery image 2' },
        { src: 'https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Gallery image 3' },
      ],
      columns: 3,
      gap: '8px',
    },
    propDefinitions: [
      { name: 'images', label: 'Images', type: 'text', defaultValue: '[{"src":"https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","alt":"Gallery image 1"},{"src":"https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","alt":"Gallery image 2"},{"src":"https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","alt":"Gallery image 3"}]' },
      { name: 'columns', label: 'Columns', type: 'number', defaultValue: 3 },
      { name: 'gap', label: 'Gap Between Images', type: 'text', defaultValue: '8px' },
    ]
  },
  {
    type: 'testimonial',
    name: 'Testimonial',
    icon: 'Quote',
    category: 'content',
    defaultProps: {
      quote: 'This product has completely transformed how we work. Highly recommended!',
      author: 'Jane Smith',
      company: 'Acme Inc.',
      avatarUrl: '',
    },
    propDefinitions: [
      { name: 'quote', label: 'Quote', type: 'textarea', defaultValue: 'This product has completely transformed how we work. Highly recommended!' },
      { name: 'author', label: 'Author Name', type: 'text', defaultValue: 'Jane Smith' },
      { name: 'company', label: 'Company', type: 'text', defaultValue: 'Acme Inc.' },
      { name: 'avatarUrl', label: 'Avatar URL', type: 'text', defaultValue: '' },
    ]
  },
  {
    type: 'feature',
    name: 'Feature Grid',
    description: 'Display features or services in a grid layout',
    icon: 'Boxes',
    category: 'content',
    defaultProps: {
      title: 'Our Features',
      description: 'Discover what makes our product special',
      features: [
        { title: 'Feature 1', description: 'Description of feature 1', icon: 'star' },
        { title: 'Feature 2', description: 'Description of feature 2', icon: 'shield' },
        { title: 'Feature 3', description: 'Description of feature 3', icon: 'zap' },
      ],
      columns: 3,
    },
    propDefinitions: [
      { name: 'title', label: 'Section Title', type: 'text', defaultValue: 'Our Features' },
      { name: 'description', label: 'Section Description', type: 'textarea', defaultValue: 'Discover what makes our product special' },
      { name: 'features', label: 'Features', type: 'text', defaultValue: '' },
      { name: 'columns', label: 'Columns', type: 'number', defaultValue: 3 },
    ]
  },
  {
    type: 'cta',
    name: 'Call to Action',
    icon: 'FileText',
    category: 'content',
    defaultProps: {
      title: 'Ready to get started?',
      description: 'Join thousands of satisfied customers today.',
      buttonText: 'Sign Up Now',
      buttonUrl: '#',
      backgroundColor: '#4f46e5',
      textColor: '#ffffff',
    },
    propDefinitions: [
      { name: 'title', label: 'Title', type: 'text', defaultValue: 'Ready to get started?' },
      { name: 'description', label: 'Description', type: 'textarea', defaultValue: 'Join thousands of satisfied customers today.' },
      { name: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Sign Up Now' },
      { name: 'buttonUrl', label: 'Button URL', type: 'text', defaultValue: '#' },
      { name: 'backgroundColor', label: 'Background Color', type: 'color', defaultValue: '#4f46e5' },
      { name: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#ffffff' },
    ]
  },
  {
    type: 'text-image',
    name: 'Text Image Left',
    icon: 'Columns',
    category: 'advanced',
    defaultProps: {      
      description: 'Discover how to create text with image at left',
      backgroundImage: 'https://images.pexels.com/photos/208277/pexels-photo-208277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Image description',
      imageAlignment: 'left',
      width: '100%',
      height: 'auto',
      rounded: false,

      title: 'L\'Eucharistie, troisième sacrement de l\'initiation chrétienne',
      content: '<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>',
      textAlign: 'center',
      padding: '16px',
    },
    propDefinitions: []
  },
]

export const getComponentDefinitionByType = (type: string): ComponentDefinition | undefined => {
  return componentRegistry.find(component => component.type === type);
}

export const getComponentIcon = (type: ComponentType) => {
  switch(type) {
    case 'hero': return LayoutIcon;
    case 'text': return Type;
    case 'image': return ImageIcon;
    case 'contactForm': return FormInput;
    case 'columns': return Columns;
    case 'gallery': return ImageDown;
    case 'testimonial': return Quote;
    case 'features': return Boxes;
    case 'cta': return FileText;
    default: return Boxes;
  }
}
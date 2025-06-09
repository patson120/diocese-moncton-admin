import { ComponentDefinition } from './types';

export function getComponentDefinitions(): ComponentDefinition[] {
  return [
    {
      type: 'hero',
      name: 'Hero Section',
      description: 'A large banner section typically used at the top of a page',
      icon: 'layout',
      category: 'layout',
      defaultProps: {
        title: 'Welcome to our website',
        subtitle: 'Discover amazing features and services',
        buttonText: 'Get Started',
        buttonLink: '#',
        backgroundImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alignment: 'center',
      },
      propDefinitions: [],
      template: '<div class="hero">...</div>',
    },
    {
      type: 'feature',
      name: 'Feature Grid',
      description: 'Display features or services in a grid layout',
      icon: 'grid',
      category: 'content',
      defaultProps: {
        title: 'Our Features',
        description: 'Discover what makes us special',
        features: [
          {
            title: 'Feature 1',
            description: 'Description of feature 1',
            icon: 'star',
          },
          {
            title: 'Feature 2',
            description: 'Description of feature 2',
            icon: 'shield',
          },
          {
            title: 'Feature 3',
            description: 'Description of feature 3',
            icon: 'zap',
          },
        ],
      },
      propDefinitions: [],
      template: '<div class="features">...</div>',
    },
    {
      type: 'testimonial',
      name: 'Testimonial Grid',
      description: 'Display customer testimonials in a grid layout',
      icon: 'quote',
      category: 'content',
      defaultProps: {
        title: 'What Our Customers Say',
        testimonials: [
          {
            name: 'John Doe',
            position: 'CEO at Company',
            content: 'This product has transformed our business operations completely.',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            name: 'Sarah Wilson',
            position: 'Marketing Director',
            content: 'The best solution we have found for our needs. Highly recommended!',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            name: 'Michael Brown',
            position: 'Tech Lead',
            content: 'Incredibly easy to use and has all the features we need.',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
        ]
      },
      propDefinitions: [],
      template: '<div class="testimonials">...</div>',
    },
    {
      type: 'gallery',
      name: 'Image Gallery',
      description: 'Display a collection of images in a grid',
      icon: 'image',
      category: 'media',
      defaultProps: {
        title: 'Our Gallery',
        description: 'A collection of our best work',
        columns: 3,
        images: [
          {
            src: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            alt: 'Gallery image 1',
            caption: 'Project 1'
          },
          {
            src: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            alt: 'Gallery image 2',
            caption: 'Project 2'
          },
          {
            src: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            alt: 'Gallery image 3',
            caption: 'Project 3'
          }
        ]
      },
      propDefinitions: [],
      template: '<div class="gallery">...</div>',
    },
    {
      type: 'cta',
      name: 'Call to Action',
      description: 'A section to prompt users to take action',
      icon: 'bell',
      category: 'content',
      defaultProps: {
        title: 'Ready to get started?',
        subtitle: 'Join thousands of satisfied customers today',
        buttonText: 'Get Started',
        buttonLink: '#',
        backgroundColor: 'hsl(var(--primary) / 0.1)'
      },
      propDefinitions: [],
      template: '<div class="cta">...</div>',
    }
  ];
}

export function getComponentDefinitionByType(type: string): ComponentDefinition | undefined {
  return getComponentDefinitions().find(component => component.type === type);
}
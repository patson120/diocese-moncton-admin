import { getComponentDefinitionByType } from "../components/registry";
import { Component, Page } from "../types";



function generateComponentHtml(component: Component): string {
  const definition = getComponentDefinitionByType(component.type);
  if (!definition) return '';

  const alignmentClasses: Record<string, string> = {
    left: 'text-left items-start',
    center: 'text-center items-center justify-center',
    right: 'text-right items-end',
  };
  const marginClasses = `background-color: ${component.props.backgroundColor || '#ffffff'}; margin-bottom: ${component.props.marginBottom || 0}px; margin-top: ${component.props.marginTop || 0}px`
  
  switch (component.type) {
    case 'hero':
      return `
        <div style="${marginClasses}" className="h-[35vh] md:h-[50vh] w-full overflow-hidden relative bg-gray-200">
          ${ component.props.backgroundImage &&
            `<div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-70"
              style="background-image: url(${component.props.backgroundImage})"></div>
          `}
          
          <div className="absolute inset-0 flex justify-center items-start bg-black bg-opacity-40 ${alignmentClasses[component.props.alignment]}">
            <div className='container max-margin py-0 w-full h-full flex flex-col justify-center items-center'>
              <h1 style="color: ${component.props.textColor}" className="heading-2 text-center text-white font-extrabold tracking-tight">${component.props.title}</h1>
              <p style="color: ${component.props.textColor}" className="body-2 text-center text-white mt-3 max-w-3xl">${component.props.subtitle}</p>
              ${(component.props.buttonText && component.props. buttonLink) ? (
                `<div>
                  <a href=${component.props.buttonLink}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 mt-5 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    ${component.props.buttonText}
                  </a>
                </div>`
              ): ''}
            </div>
          </div>
        </div>`;

    case 'image':
      return `
        <figure style="${marginClasses}" className="py-4 px-6 rounded-lg ">
          <div className="overflow-hidden rounded-md">
            <img
              src=${component.props.src || ''}
              alt=${component.props.alt || "Image"}
              style="
                width: ${component.props.width || '100%'};
                height: ${component.props.height || 'auto'};
              "
              className="object-cover ${component.props.rounded ? 'rounded-[8px]' : ''}"
            />
          </div>
          ${component.props.caption ? (
            `<figcaption className="mt-2 text-center text-sm text-muted-foreground">
              ${component.props.caption}
            </figcaption>`
          ):''}
        </figure>
        `;

    case 'text':
      return `
        <div style="padding: ${component.props.padding*8 || '16px'}; ${marginClasses}" className="rounded-lg">
          <h1 style="color: ${component.props.textColor}" className="${alignmentClasses[component.props.alignment]} text-4xl font-bold pb-3">${component.props.title}</h1>
          <div style="${marginClasses}" className="flex flex-col ${alignmentClasses[component.props.alignment]}">
            ${component.props.content || `<p className="text-${component.props.textAlign || 'left'}">This is a paragraph of text. You can edit this text to add your own content.</p>`}
          </div>
        </div>`;
            
    case 'text-left':
      return `
        <section style="${marginClasses}" className="container max-margin py-0">
          <div className='w-full lg:w-1/2'>
            <h2 style="color: ${component.props.textColor}" className='heading-3 text-gray-900 mb-4'>${component.props.title}</h2>
            <div
              className="body-2 text-gray"
              style="color: ${component.props.textColor}">
              ${component.props.content || `<p className="text-${component.props.textAlign || 'left'}">This is a paragraph of text. You can edit this text to add your own content.</p>`}
            </div>
          </div>
        </section>`;

    case 'text-image':
      const leftOrder = component.props.imageAlignment == 'left' ? 'order-2 lg:order-1': 'order-1'
      const rightOrder = component.props.imageAlignment == 'left' ? 'order-1 lg:order-2' : ''
      return `
          <section style="${marginClasses}" className="container max-margin py-0">
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-7 md:gap-6 lg:gap-12 md:py-4 lg:py-8'>
              <div className="${leftOrder} col-span-full lg:col-span-2">
                  <div className='h-72 xl:h-80 relative rounded-xl md:rounded-[18px] overflow-hidden bg-gray-100'>
                    ${
                      component.props.backgroundImage && `
                      <div 
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style="background-image: url(${component.props.backgroundImage})"
                      />`
                    }
                  </div>
                </div>
              </div>
              <div className="${rightOrder} col-span-full lg:col-span-3 flex flex-col justify-center items-start" >
                <div>
                  <h1 style="color: ${component.props.textColor}" className="${alignmentClasses[component.props.alignment]} heading-4 font-extrabold mb-5">${component.props.title}</h1>
                  <div className="${alignmentClasses[component.props.alignment]} md:mt-4">
                    ${component.props.content || `<p className="text-${component.props.textAlign || 'left'}">This is a paragraph of text. You can edit this text to add your own content.</p>`}
                  </div>
                </div>
              </div>
            </div>
        </section>
      `;

    case 'contactForm':
      return `
        <section style="
          background-color: ${component.props.backgroundColor || '#f9fafb'};
          color: ${component.props.textColor || '#111827'};
          padding: 48px 16px;">
          <div style="max-width: 600px; margin: 0 auto;">
            <h2 style="font-size: 30px; margin-bottom: 16px; text-align: center;">${component.props.title || 'Contact Us'}</h2>
            <p style="margin-bottom: 32px; text-align: center;">${component.props.description || 'Fill out the form below to get in touch with us.'}</p>
            <form style="display: grid; gap: 16px;">
              <div>
                <label style="display: block; margin-bottom: 8px; font-weight: 500;">Name</label>
                <input type="text" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;" />
              </div>
              <div>
                <label style="display: block; margin-bottom: 8px; font-weight: 500;">Email</label>
                <input type="email" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;" />
              </div>
              <div>
                <label style="display: block; margin-bottom: 8px; font-weight: 500;">Message</label>
                <textarea rows="4" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;"></textarea>
              </div>
              <button type="submit" style="
                background-color: #4f46e5;
                color: white;
                padding: 12px;
                border: none;
                border-radius: 4px;
                font-weight: 500;
                cursor: pointer;
              ">${component.props.submitButtonText || 'Send Message'}</button>
            </form>
          </div>
        </section>`;

    case 'columns':
      try {
        const features = typeof component.props.features === 'string' 
          ? JSON.parse(component.props.features) 
          : component.props.features || [];
          
        return `
          <section style="${marginClasses}" className='container max-margin py-10 md:py-20'>
            <div className="space-y-4">
                <div>
                  ${ component.props.title && `<h2 className='heading-3 text-gray-900 my-2'>${ component.props.title }</h2>` }
                  ${ component.props.description && `<p className="text-lg text-gray-600">${ component.props.description }</p>` }
                </div>
                <div className='flex flex-row overflow-x-scroll v-scroll lg:overflow-x-hidden pb-8 lg:pb-0 space-x-4 lg:grid lg:gap-6 lg:grid-cols-2'>
                  ${features.map((feature: { title: string, description: string, src: string }) => `
                    <div style="min-width: 260px" className='space-y-3'>
                      ${ feature.src && 
                        `<div className='relative md:w-[416px] lg:w-full h-[280px] md:h-[400px] rounded-xl lg:rounded-3xl overflow-hidden'>
                          <div 
                            className="absolute inset-0 z-0 bg-cover bg-center"
                            style="background-image: url(${feature.src})"
                          ></div>
                        </div>`
                      }
                      <h1 className='heading-4'>${feature.title}</h1>
                      <p className='body-2 text-gray'>${feature.description}</p>
                    </div>`
                  ).join('')}
                </div>
            </div>
          </section>`;
      } catch (e) {
        return '<div>Error rendering features</div>';
      }

    case 'gallery':
      try {
        const features = typeof component.props.features === 'string' 
          ? JSON.parse(component.props.features) 
          : component.props.features || [];

        return `
          <section style="${marginClasses}" className="container max-margin py-10 md:py-20">
            <div>
              ${ component.props.title && `<h2 className='heading-3 text-gray-900 my-2'>${ component.props.title }</h2>` }
              ${ component.props.description && `<p className="text-lg text-gray-600 mb-5">${ component.props.description }</p>` }
            </div>
            <div className="flex flex-row items-start overflow-x-scroll v-scroll lg:overflow-x-hidden pb-8 lg:pb-0 space-x-4 lg:grid lg:gap-6 lg:grid-cols-3"> 
              ${features.map((feature: { title: string, description: string, src: string }) => `
                <div style="min-width: 260px" className='space-y-3'>
                ${ feature.src &&
                 `<div className='relative md:w-[416px] lg:w-full h-[280px] md:h-[400px] rounded-xl lg:rounded-3xl overflow-hidden'>
                    <div 
                      className="absolute inset-0 z-0 bg-cover bg-center"
                      style="background-image: url(${feature.src})">
                    </div>
                  </div>`}
                  <h1 className='heading-4'>${feature.title}</h1>
                  <p className='body-2 text-gray'>${feature.description}</p>
                </div>`
              ).join('')}
            </div>
          </section>`;
      } catch (e) {
        return '<div>Error rendering gallery</div>';
      }

    case 'testimonial':
      return `
        <div style="
          padding: 32px;
          background-color: #f9fafb;
          border-radius: 8px;
          margin: 16px 0;
          text-align: center;
        ">
          <div style="font-size: 24px; margin-bottom: 16px; color: #6b7280;">"${component.props.quote || 'This product has completely transformed how we work. Highly recommended!'}"</div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
            ${component.props.avatarUrl ? `
              <img 
                src="${component.props.avatarUrl}" 
                alt="${component.props.author}" 
                style="width: 48px; height: 48px; border-radius: 9999px; object-fit: cover;"
              />
            ` : ''}
            <div>
              <div style="font-weight: bold;">${component.props.author || 'Jane Smith'}</div>
              <div style="color: #6b7280;">${component.props.company || 'Acme Inc.'}</div>
            </div>
          </div>
        </div>`;

    case 'feature':
      try {
        const features = typeof component.props.features === 'string' 
          ? JSON.parse(component.props.features) 
          : component.props.features || [];
          
        return `
          <section className="py-16 px-6 rounded-lg" 
            style="text-align: center; ${marginClasses}">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                ${component.props.title || 'Our Features'}
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                ${component.props.description || 'Discover what makes our product special'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto"> 
              ${features.map((feature: { title: string, description: string, icon: string }) => `
                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <!-- Icon representation -->
                  <div style="background-color: #f0fdfa;" className="mx-auto mb-4 h-12 w-12 rounded-full border border-[#0d9488-] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style="color: #0d9488;"
                      className="h-6 w-6">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">${feature.title}</h3>
                  <p className="text-muted-foreground">${feature.description}</p>
                </div>`
              ).join('')}
            </div>
          </section>`;
      } catch (e) {
        return '<div>Error rendering features</div>';
      }

    case 'cta':
      return `
        <section style="
          background-color: ${component.props.backgroundColor || '#4f46e5'};
          color: ${component.props.textColor || '#ffffff'};
          padding: 64px 16px;
          text-align: center;
        ">
          <div style="max-width: 800px; margin: 0 auto;">
            <h2 style="font-size: 36px; margin-bottom: 16px;">${component.props.title || 'Ready to get started?'}</h2>
            <p style="font-size: 18px; margin-bottom: 32px;">${component.props.description || 'Join thousands of satisfied customers today.'}</p>
            <a href="${component.props.buttonUrl || '#'}" style="
              display: inline-block;
              background-color: white;
              color: ${component.props.backgroundColor || '#4f46e5'};
              padding: 12px 24px;
              border-radius: 4px;
              text-decoration: none;
              font-weight: bold;
            ">${component.props.buttonText || 'Sign Up Now'}</a>
          </div>
        </section>`;

    default:
      return ''
      return `<div>Unknown component type: ${component.type}</div>`;
  }
}

export function generatePageHtml(page: Page, language: "fr" | "en"): string {
  const componentsHtml = page[`components_${language}`].map(generateComponentHtml).join('');
  
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${page.metaData?.description ? `<meta name="description" content="${page.metaData.description}">` : ''}
      ${page.metaData?.keywords ? `<meta name="keywords" content="${page.metaData.keywords}">` : ''}
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <title>${page[`title_${language}`]}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.5;
          color: #111827;
        }
        .bg-card {
          background: hsl(0 0% 100%);
          color: hsl(0 0% 3.9%);
        }
      </style>
    </head>
    <body class="overflow-hidden">
      ${componentsHtml.replaceAll('className', 'class')}
    </body>
    </html>`;
}
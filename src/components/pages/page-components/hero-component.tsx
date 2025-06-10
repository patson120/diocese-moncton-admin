import { DeviceType } from "../lib/types";

interface HeroComponentProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  alignment?: 'left' | 'center' | 'right';
  marginTop?: number;
  marginBottom?: number;
  backgroundColor?: string;
  deviceView?: DeviceType;
}

export function HeroComponent({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
  alignment = 'center',
  marginTop = 0,
  marginBottom = 0,
  backgroundColor,
  deviceView
}: HeroComponentProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };
  
  const style = {
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    backgroundColor,
  };

  console.log(deviceView);
  
  return (
    <div className="relative py-20 px-6 overflow-hidden rounded-lg" style={style}>
      {backgroundImage && (
        <div 
          className={`absolute inset-0 z-0 bg-cover bg-center opacity-70`}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      <div className={`relative z-10 flex flex-col ${alignmentClasses[alignment]} gap-6 max-w-4xl mx-auto`}>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl">{subtitle}</p>
        {buttonText && buttonLink && (
          <div>
            <a href={buttonLink}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {buttonText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
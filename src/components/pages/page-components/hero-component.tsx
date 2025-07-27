import Image from "next/image";
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
  textColor?: string;
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
  textColor,
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
    textColor,
    backgroundColor,
  };
  
  return (
    <section className='h-[25vh] md:h-[40vh] w-full overflow-hidden relative bg-gray-200' style={style}>
      {/* Hero image */}
      {backgroundImage && (
        <div 
          className={`absolute inset-0 z-0 bg-cover bg-center opacity-70`}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className='absolute inset-0 flex justify-center items-start bg-black bg-opacity-40'>
        <div className='container max-margin py-0 w-full h-full flex flex-col justify-center items-center'>
          <h1 style={{ color: textColor }} className='heading-2 text-center text-white font-extrabold'>{title}</h1>
          <p style={{ color: textColor }} className='body-2 text-center text-white mt-3'>{subtitle}</p>
          {
            (buttonText && buttonLink) && (
              <div>
                <a href={buttonLink}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 mt-5 md:mt-10 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {buttonText}
                </a>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
}
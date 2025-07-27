import { DeviceType } from "../lib/types";

interface Image {
  title: string,
  description: string;
  src: string;
}

interface GalleryComponentProps {
  title: string;
  description?: string;
  features: Image[];
  columns?: 2 | 3 | 4;
  backgroundColor?: string;
  marginTop?: number;
  marginBottom?: number,
  deviceView?: DeviceType
}

export function GalleryComponent({
  title,
  features,
  backgroundColor,
  marginTop = 0,
  marginBottom = 0,
  columns = 3,
  deviceView
}: GalleryComponentProps) {
  const style = {
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    backgroundColor,
  };

  return (
    <section style={style} className="container max-margin py-10 md:py-20">
      <h2 className='heading-3 text-gray-900 mb-4'>{title}</h2>
      <div className='flex flex-row overflow-x-scroll lg:overflow-x-hidden pb-8 lg:pb-0 space-x-4 lg:grid lg:gap-6 lg:grid-cols-3'>
        {
          features.map((feature, index) => 
          <div key={index} className='space-y-3'>
            <div className='!w-[260px] md:w-[416px] lg:w-full h-[280px] md:h-[400px] relative rounded-xl lg:rounded-3xl overflow-hidden'>
              {
                feature.src && (
                <div 
                    className={`absolute inset-0 z-0 bg-cover bg-center`}
                    style={{ backgroundImage: `url(${feature.src})` }}
                />
              )}
            </div>
            <h1 className='heading-4'>{feature.title}</h1>
            <p className='body-2 text-gray'>{feature.description}</p>
          </div>)
        }
      </div>
    </section>
  );
}
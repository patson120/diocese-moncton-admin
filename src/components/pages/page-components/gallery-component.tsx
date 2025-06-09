interface Image {
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryComponentProps {
  title: string;
  description?: string;
  images: Image[];
  columns?: 2 | 3 | 4;
  backgroundColor?: string;
  marginTop?: number;
  marginBottom?: number;
}

export function GalleryComponent({
  title,
  description,
  images,
  columns = 3,
  backgroundColor,
  marginTop = 0,
  marginBottom = 0,
}: GalleryComponentProps) {
  const style = {
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    backgroundColor,
  };

  return (
    <div className="py-16 px-6 rounded-lg" style={style}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
          {images.map((image, index) => (
            <div key={index} className="group relative">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              {image.caption && (
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
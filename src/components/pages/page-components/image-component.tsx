interface ImageComponentProps {
  src: string;
  alt: string;
  caption?: string;
  width?: string;
  height?: string;
  marginTop?: number;
  marginBottom?: number;
  backgroundColor?: string;
}

export function ImageComponent({
  src,
  alt,
  caption,
  width = '100%',
  height = 'auto',
  marginTop = 0,
  marginBottom = 0,
  backgroundColor,
}: ImageComponentProps) {
  const style = {
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    backgroundColor,
  };
  
  return (
    <figure className="py-4 px-6 rounded-lg" style={style}>
      <div className="overflow-hidden rounded-md">
        <img
          src={src}
          alt={alt}
          style={{ width, height }}
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
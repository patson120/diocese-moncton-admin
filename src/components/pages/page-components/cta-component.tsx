interface CTAComponentProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor?: string;
  marginTop?: number;
  marginBottom?: number;
}

export function CTAComponent({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundColor,
  marginTop = 0,
  marginBottom = 0,
}: CTAComponentProps) {
  const style = {
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    backgroundColor,
  };

  return (
    <div className="py-16 px-6 rounded-lg" style={style}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          {title}
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          {subtitle}
        </p>
        <a
          href={buttonLink}
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}
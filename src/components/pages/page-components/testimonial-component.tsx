interface Testimonial {
  name: string;
  position: string;
  content: string;
  avatar?: string;
}

interface TestimonialComponentProps {
  title: string;
  testimonials: Testimonial[];
  backgroundColor?: string;
  marginTop?: number;
  marginBottom?: number;
}

export function TestimonialComponent({
  title,
  testimonials,
  backgroundColor,
  marginTop = 0,
  marginBottom = 0,
}: TestimonialComponentProps) {
  const style = {
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    backgroundColor,
  };

  return (
    <div className="py-16 px-6 rounded-lg" style={style}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
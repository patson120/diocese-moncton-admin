import { cn } from "@/lib/utils";
import { DeviceType } from "../lib/types";

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface FeatureComponentProps {
  title: string;
  description: string;
  features: Feature[];
  marginTop?: number;
  marginBottom?: number;
  columns?: number;
  backgroundColor?: string;
  deviceView?: DeviceType;
}

export function FeatureComponent({
  title,
  description,
  features,
  marginTop = 0,
  marginBottom = 0,
  columns = 3,
  backgroundColor,
  deviceView = 'desktop',
}: FeatureComponentProps) {
  const style = {
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    backgroundColor,
  };
  
  return (
    <div className="py-16 px-6 rounded-lg" style={style}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>      
      <div className={ cn("grid gap-8 max-w-6xl mx-auto",
          deviceView === 'mobile' ? 'grid-cols-1' : deviceView === 'tablet' ? 'grid-cols-2' : `md:grid-cols-${columns > 2 ? columns-1 : columns} lg:grid-cols-${columns}`
        )}> 
        {features.map((feature, index) => (
          <div key={index} className="bg-card rounded-lg p-6 shadow-sm">
            <div className="mb-4 h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-teal-600">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
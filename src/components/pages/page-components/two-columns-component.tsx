import { DeviceType } from "../lib/types";


interface Column {
    title: string;
    description: string;
    src: string;
}
  
interface ColumnsComponentProps {
    title: string;
    description: string;
    features: Column[];
    columns?: number;
    marginTop?: number;
    marginBottom?: number;
    backgroundColor?: string;
    textColor?: string;
    deviceView?: DeviceType;
}

export default function TwoColumnsComponent({
    title,
    description,
    features,
    marginTop = 0,
    marginBottom = 0,
    backgroundColor,
    textColor,
    deviceView = 'desktop',
    }: ColumnsComponentProps) {
    const style = {
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        backgroundColor,
        color: textColor,
    }
    
    return (
        <section style={style} className='container max-margin py-0'>
            <div className="space-y-4">
                <div>
                    { title && <h2  className='heading-3 text-gray-900 my-2'>{title}</h2> }
                    { description && <p className="text-lg text-gray-600">{description}</p> }
                </div>
                <div className='flex flex-row overflow-x-scroll lg:overflow-x-hidden pb-8 lg:pb-0 space-x-4 lg:grid lg:gap-6 lg:grid-cols-2'>
                    {   
                        features.map((feature, index) => (
                        <div key={index} className='space-y-3'>
                            {
                                feature.src && 
                                <div className='w-[260px] md:w-[416px] lg:w-full h-[280px] md:h-[400px] relative rounded-xl lg:rounded-3xl overflow-hidden'>
                                    <div 
                                        className={`absolute inset-0 z-0 bg-cover bg-center`}
                                        style={{ backgroundImage: `url(${feature.src})` }}
                                    ></div>
                                </div>
                            }
                            <h1 className='heading-4'>{feature.title}</h1>
                            <p className='body-2 text-gray'>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

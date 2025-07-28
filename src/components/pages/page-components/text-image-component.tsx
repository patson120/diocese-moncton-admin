import React from 'react'
import { DeviceType } from '../lib/types';

interface TextImageComponentProps {
    backgroundImage?: string;
    content: string;
    title: string;
    alignment?: 'left' | 'center' | 'right';
    imageAlignment?: 'left' | 'right';
    marginTop?: number;
    marginBottom?: number;
    textColor?: string;
    backgroundColor?: string;
    deviceView?: DeviceType;
    
}

export default function TextImageComponent({
    backgroundImage,
    content,
    title,
    alignment = 'left',
    marginTop = 0,
    marginBottom = 0,
    textColor,
    backgroundColor,
    imageAlignment,
    deviceView

}: TextImageComponentProps) {
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }
      
    const style = {
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        backgroundColor,
        color: textColor,
    }

    const leftOrder = imageAlignment == 'left' ? 'order-2 lg:order-1': 'order-1'
    const rightOrder = imageAlignment == 'left' ? 'order-1 lg:order-2' : ''

    const gridVal = deviceView === 'desktop' ? 
        'grid-cols-1 lg:grid-cols-5 gap-x-7 md:gap-x-6 lg:gap-x-12' :
        "grid-cols-1 gap-y-7"
      
    return (
        <section style={style} className="container max-margin py-0">
            <div className={`grid ${gridVal} md:py-4 lg:py-8`}>
                <div className={`${leftOrder} col-span-full lg:col-span-2 mt-5 lg:mt-0`}>
                    <div className='h-72 xl:h-80 relative rounded-xl md:rounded-[18px] overflow-hidden'>
                        {
                            backgroundImage && (
                            <div 
                                className={`absolute inset-0 z-0 bg-cover bg-center`}
                                style={{ backgroundImage: `url(${backgroundImage})` }}
                            />
                        )}
                    </div>
                </div>
                <div className={`${rightOrder} col-span-full lg:col-span-3 flex flex-col justify-center items-center`}>
                    <div>
                        <h1 style={{ color: textColor}} className={`${alignmentClasses[alignment]} heading-4 font-extrabold mb-4`}>{title}  </h1>
                        <div
                            className={`${alignmentClasses[alignment]} lg:mt-4`}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

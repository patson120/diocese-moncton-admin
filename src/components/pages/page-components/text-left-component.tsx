import React from 'react'

interface TextLeftComponentProps {
    title: string;
    content: string;
    marginTop?: number;
    marginBottom?: number;
    textColor?: string;
    backgroundColor?: string;
}

export default function TextLeftComponent({
    title,
    content,
    marginTop = 0,
    marginBottom = 0,
    textColor,
    backgroundColor,
}: TextLeftComponentProps) {
    const style = {
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    backgroundColor,
    };
  return (
    <section style={style} className='container max-margin py-0'>
        <div className='w-full lg:w-1/2'>
            <h2 style={{ color: textColor }}  className='heading-3 text-gray-900 mb-4'>{title}</h2>
            {/* <p className='body-2 text-gray'>{content}</p> */}
            <div
                className="body-2 text-gray"
                style={{ color: textColor }}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    </section>
  )
}

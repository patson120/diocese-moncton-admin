import { DeviceType } from "../lib/types";

interface TextComponentProps {
  content: string;
  alignment?: 'left' | 'center' | 'right';
  marginTop?: number;
  marginBottom?: number;
  backgroundColor?: string;
  deviceView?: DeviceType;
}

export function TextComponent({
  content,
  alignment = 'left',
  marginTop = 0,
  marginBottom = 0,
  backgroundColor,
  deviceView
}: TextComponentProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  const style = {
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    backgroundColor,
  };
  
  return (
    <>
      {/*
        <div
          className={`py-8 px-6 ${alignmentClasses[alignment]} rounded-lg`}
          style={style}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      */}
      <div className={`py-8 px-6 ${alignmentClasses[alignment]} rounded-lg`}>
        {content}
      </div>
    </>

  );
}
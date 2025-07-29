import { DeviceType } from "../lib/types";

interface TextComponentProps {
  content: string;
  title: string;
  alignment?: 'left' | 'center' | 'right';
  marginTop?: number;
  marginBottom?: number;
  textColor?: string;
  backgroundColor?: string;
  deviceView?: DeviceType;
}

export function TextComponent({
  content,
  title,
  alignment = 'left',
  marginTop = 0,
  marginBottom = 0,
  textColor,
  backgroundColor,
  deviceView
}: TextComponentProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }
  
  const style = {
    marginTop: `${marginTop}px`,
    marginBottom: `${marginBottom}px`,
    backgroundColor,
  };
  
  return (
    <div className="py-10 px-10 md:px-20 rounded-lg">
      <h1 style={{ color: textColor }} className={`${alignmentClasses[alignment]} text-4xl font-bold pb-3`}>{title}</h1>
      <div
        className={`${alignmentClasses[alignment]}`}
        style={style}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>

  );
}
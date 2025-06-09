interface TextComponentProps {
  content: string;
  alignment?: 'left' | 'center' | 'right';
  marginTop?: number;
  marginBottom?: number;
  backgroundColor?: string;
}

export function TextComponent({
  content,
  alignment = 'left',
  marginTop = 0,
  marginBottom = 0,
  backgroundColor,
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
    <div
      className={`py-8 px-6 ${alignmentClasses[alignment]} rounded-lg`}
      style={style}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
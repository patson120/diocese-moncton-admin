import React from 'react';
import DOMPurify from 'dompurify';

interface HTMLContentProps {
  html: string;
  className?: string;
}

export function HTMLContent({ html, className = '' }: HTMLContentProps) {
  // Sanitize HTML content
  const sanitizedHtml = DOMPurify.sanitize(html);
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }} 
    />
  );
}
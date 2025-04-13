"use client";

import * as React from 'react';
import { HTMLContent } from './html-content';

interface TextProps {
  labelFr?: string;
  labelEn?: string;
  keyString?: string;
}

export default function Text<T extends HTMLElement>({ labelFr, labelEn, keyString, className, ...props }:  TextProps & React.HTMLAttributes<T> ) {
  // const t = useTranslations("app");
  // const localActive = useLocale();

  if (keyString) {
    // return <span {...props} className={`w-auto ${className}`}>{t(keyString)}</span>;
  }
  const label = labelFr // localActive === "fr" ? labelFr : labelEn;
  if (label?.startsWith("\u003C")) {
     return <HTMLContent html={label} className={`prose max-w-none ${className}`} />
  }
  return <span {...props} className={`w-auto ${className}`}>{label}</span>;
}
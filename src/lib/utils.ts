import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'fr-FR',
  pattern: "numeric" | "2-digit" | "long" | "short" | "narrow" = "short",
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: pattern,
      year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};
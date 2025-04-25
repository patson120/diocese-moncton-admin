export type EventType = 'meeting' | 'conference' | 'workshop' | 'holiday' | 'other';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: EventType;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
}

export const eventTypeColors = {
  meeting: {
    light: 'from-blue-100 to-blue-50',
    dark: 'dark:from-blue-900 dark:to-blue-900/50',
    hover: 'hover:from-blue-200 hover:to-blue-100',
    darkHover: 'dark:hover:from-blue-800 dark:hover:to-blue-800/50',
  },
  conference: {
    light: 'from-purple-100 to-purple-50',
    dark: 'dark:from-purple-900 dark:to-purple-900/50',
    hover: 'hover:from-purple-200 hover:to-purple-100',
    darkHover: 'dark:hover:from-purple-800 dark:hover:to-purple-800/50',
  },
  workshop: {
    light: 'from-green-100 to-green-50',
    dark: 'dark:from-green-900 dark:to-green-900/50',
    hover: 'hover:from-green-200 hover:to-green-100',
    darkHover: 'dark:hover:from-green-800 dark:hover:to-green-800/50',
  },
  holiday: {
    light: 'from-red-100 to-red-50',
    dark: 'dark:from-red-900 dark:to-red-900/50',
    hover: 'hover:from-red-200 hover:to-red-100',
    darkHover: 'dark:hover:from-red-800 dark:hover:to-red-800/50',
  },
  other: {
    light: 'from-orange-100 to-orange-50',
    dark: 'dark:from-orange-900 dark:to-orange-900/50',
    hover: 'hover:from-orange-200 hover:to-orange-100',
    darkHover: 'dark:hover:from-orange-800 dark:hover:to-orange-800/50',
  },
};
'use client';

import { cn } from '@/lib/utils';
import {
  BadgeHelp,
  BookCopy,
  CalendarDays,
  ChevronRight,
  Church,
  Images,
  LayoutDashboard,
  LogOut,
  LucideSettings,
  Menu,
  Puzzle,
  ReceiptText,
  Users,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './button';
import { ScrollArea } from './scroll-area';
import Image from 'next/image';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Navigation menu data structure for better maintainability
  const [navigationSections, setNavigationSections] = useState([
    {
      title: "PRINCIPAL",
      items: [
        {
          icon: LayoutDashboard,
          label: "Tableau de bord",
          active: true,
          href: "/",
        },
        {
          icon: ReceiptText,
          label: "Gestion de contenus",
          active: false,
          href: "/contents",
        },
        {
          icon: BookCopy,
          label: "Gestion des pages",
          active: false,
          href: "/pages",
        },
        {
          icon: Images,
          label: "Gestion des média",
          active: false,
          href: "/mediatheque",
        },
        {
          icon: Puzzle,
          label: "Gestion du clergé",
          active: false,
          href: "/clergy",
        },
      ],
    },
    {
      title: "SECONDAIRE",
      items: [
        {
          icon: CalendarDays,
          label: "Evènements",
          active: false,
          href: "/events",
        },
        {
          icon: Church,
          label: "Gestion des paroisses",
          active: false,
          href: "/parishes",
        },
        {
          icon: Users,
          label: "Utilisateurs",
          active: false,
          href: "/users",
        },
      ],
    },
    {
      title: "AUTRES",
      items: [
        {
          icon: LucideSettings,
          label: "Paramètres",
          active: false,
          href: "#" // "/settings",
        },
        {
          icon: BadgeHelp,
          label: "Aide",
          active: false,
          href: "#" // "/help",
        },
      ],
    },
  ]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsCollapsed(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [isMobile]);

  const changeStatut = (sectionIndex: number, itemIndex: number): void => {
    const updatedSections = [...navigationSections];
    updatedSections.forEach((section, i) => {
      section.items.forEach((item, index) => {
        item.active = sectionIndex === i && itemIndex === index;
      });
    });

    setNavigationSections(updatedSections);
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <Menu /> : <X />}
      </Button>

      <div
        className={cn(
          'fixed top-0 left-0 h-full bg-background border-r border-neutral-200 transition-all duration-300 z-40',
          isCollapsed ? '-translate-x-full md:translate-x-0 md:w-16' : 'w-64',
          className
        )}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200">
            <h1
              className={cn(
                'font-bold transition-all duration-300',
                isCollapsed && 'md:hidden'
              )}
            >
              {/* Header with logo and collapse button */}
              <div className='relative shrink-0 w-[79px] h-12'>
                <Image
                  alt="Photo"
                  src="/photo-2024-12-08-19-09-08-1.png"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ChevronRight
                className={cn(
                  'h-4 w-4 transition-all duration-300',
                  !isCollapsed && 'rotate-180'
                )}
              />
            </Button>
          </div>

          {/* Navigation menu */}
          <ScrollArea className="h-[calc(100%-80px)]">
            <div className="flex flex-col px-2.5 py-6 gap-6">
              {/* Navigation sections */}
              {navigationSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="w-full cursor-pointer">
                  <div className={cn(
                    'px-[18px] mb-3',
                    isCollapsed && 'md:hidden')} >
                    <span className="font-legend text-xs text-gray">
                      {section.title}
                    </span>
                  </div>
                  <ul className="flex flex-col w-full gap-0 space-y-[5px]">
                    {section.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      return (
                        (
                          <li key={itemIndex} className={cn('w-full h-10 rounded-lg list-none',
                            item.active ? "bg-[#f2f2f9]" : "bg-white")}>
                            <Link href={item.href} onClick={() => changeStatut(sectionIndex, itemIndex)}
                              className={cn(
                                'flex items-center gap-2 h-full px-4 space-x-2 rounded-lg transition-all duration-200 hover:bg-muted',
                                item.active ? 'font-semibold' : '',
                                isCollapsed && 'md:justify-center md:px-2'
                              )}>
                              <Icon className={cn("h-5 w-5 shrink-0", item.active && "text-blue")} />
                              <span
                                className={cn(
                                  'transition-all duration-300',
                                  isCollapsed && 'md:hidden',
                                  item.active && "text-blue"
                                )}>
                                {item.label}
                              </span>
                            </Link>
                          </li>
                        )
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className='h-10'></div>
          </ScrollArea>
          {/* Logout button */}
          <div className={cn("absolute h-10 bottom-[16px] left-2.5 bg-white",
            isCollapsed ? '-translate-x-full md:translate-x-0 md:w-12' : 'w-[230px]',)}>
            <div className={cn(
              'w-full h-10 cursor-pointer flex items-center gap-2 px-4 space-x-2 rounded-lg transition-all duration-200 hover:bg-muted',
              isCollapsed && 'md:justify-center md:px-2')}>
              <LogOut className="h-5 w-5 shrink-0" />
              <span
                className={cn(
                  'font-body-3 text-noir-dashboard transition-all duration-300',
                  isCollapsed && 'md:hidden',
                )}>
                Déconnexion
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* White space */}
      <div className={cn('h-screen',
        isCollapsed ? '-translate-x-full md:translate-x-0 md:w-16' : 'w-64',
        className
      )}></div>
    </>
  );
}
// 
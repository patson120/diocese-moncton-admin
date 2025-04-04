'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Settings, FileText, Menu, X, ChevronRight, FolderOpen, Component as Components, ChevronLeftIcon } from 'lucide-react';
import { Button } from './button';
import { ScrollArea } from './scroll-area';

interface SidebarProps {
  className?: string;
}

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Utilisateurs',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    title: 'Articles',
    href: '/dashboard/posts',
    icon: FileText,
  },
  {
    title: 'Médiathèque',
    href: '/dashboard/media',
    icon: FolderOpen,
  },
  {
    title: 'Composants',
    href: '/dashboard/components',
    icon: Components,
  },
  {
    title: 'Paramètres',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

// Navigation menu data structure for better maintainability
const navigationSections = [
  {
    title: "PRINCIPAL",
    items: [
      {
        icon: "/frame-41.svg",
        label: "Tableau de bord",
        active: true,
      },
      {
        icon: "/frame-47.svg",
        label: "Gestion de contenus",
        active: false,
      },
      {
        icon: "/frame-2.svg",
        label: "Gestion des pages",
        active: true,
      },
      {
        icon: "/frame-40.svg",
        label: "Médiathèques",
        active: false,
      },
      {
        icon: "/frame-54.svg",
        label: "Gestion du clergé",
        active: false,
      },
    ],
  },
  {
    title: "SECONDAIRE",
    items: [
      {
        icon: "/frame-42.svg",
        label: "Calendrier",
        active: false,
      },
      {
        icon: "/frame-43.svg",
        label: "Gestion des paroisses",
        active: false,
      },
      {
        icon: "/frame-46.svg",
        label: "Utilisateurs",
        active: false,
      },
    ],
  },
  {
    title: "AUTRES",
    items: [
      {
        icon: "/frame-52.svg",
        label: "Paramètres",
        active: false,
      },
      {
        icon: "/frame-48.svg",
        label: "Aide",
        active: false,
      },
    ],
  },
];

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

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
  }, []);

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
              <img
                className="w-[79px] h-12 object-cover"
                alt="Photo"
                src="/photo-2024-12-08-19-09-08-1.png"
              />
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

          {/* <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200',
                        pathname === item.href
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted',
                        isCollapsed && 'md:justify-center md:px-2'
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span
                        className={cn(
                          'transition-all duration-300',
                          isCollapsed && 'md:hidden'
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav> */}


          {/* Navigation menu */}
          <ScrollArea className="h-[calc(100%-80px)]">
            <div className="flex flex-col px-2.5 py-6 gap-6">
              {/* Navigation sections */}
              {navigationSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="w-full cursor-pointer">
                  <div className="px-[18px] mb-[21px]">
                    <span className="font-legend text-xs text-blue">
                      {section.title}
                    </span>
                  </div>
                  <div className="flex flex-col w-full gap-0">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className={`w-[230px] h-11 rounded-lg ${item.active ? "bg-[#f2f2f9]" : "bg-white"
                          }`}
                      >
                        <div className="flex items-center gap-2 h-full px-4">
                          <img
                            className="w-[18px] h-[18px]"
                            alt="Icon"
                            src={item.icon}
                          />
                          <div
                            className={`font-body-3 text-sm ${item.active ? "text-blue" : "text-noir-dashboard"
                              }`}
                          >
                            {item.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          {/* Logout button */}
          <div className="absolute w-[230px] h-11 bottom-[16px] left-2.5 bg-white">
            <div className="flex items-center gap-2 h-full px-4">
              <img
                className="w-[18px] h-[18px]"
                alt="Logout Icon"
                src="/frame-49.svg"
              />
              <div className="font-body-3 text-noir-dashboard">Déconnexion</div>
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
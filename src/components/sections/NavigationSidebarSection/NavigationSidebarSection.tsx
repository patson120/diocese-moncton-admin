import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChevronLeftIcon } from "lucide-react";
import React, { JSX } from "react";

export const NavigationSidebarSection = (): JSX.Element => {
  // Navigation menu data structure for better maintainability
  const navigationSections = [
    {
      title: "PRINCIPAL",
      items: [
        {
          icon: "/frame-41.svg",
          label: "Tableau de bord",
          active: false,
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

  return (
    <div className="w-[250px] h-full bg-white border-r border-neutral-200">
      {/* Header with logo and collapse button */}
      <div className="h-20 w-full bg-white border-b-[0.5px] border-neutral-200 flex items-center justify-between px-6">
        <img
          className="w-[79px] h-12 object-cover"
          alt="Photo"
          src="/photo-2024-12-08-19-09-08-1.png"
        />
        <ChevronLeftIcon className="w-[18px] h-[18px] text-gray" />
      </div>

      {/* Navigation menu */}
      <ScrollArea className="h-[calc(100%-80px)]">
        <div className="flex flex-col px-2.5 py-6 gap-6">
          {/* Navigation sections */}
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="w-full">
              <div className="px-[18px] mb-[21px]">
                <span className="font-legend text-xs text-blue">
                  {section.title}
                </span>
              </div>
              <div className="flex flex-col w-full gap-0">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`w-[230px] h-11 rounded-lg ${
                      item.active ? "bg-[#f2f2f9]" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 h-full px-4">
                      <img
                        className="w-[18px] h-[18px]"
                        alt="Icon"
                        src={item.icon}
                      />
                      <div
                        className={`font-body-3 text-sm ${
                          item.active ? "text-blue" : "text-noir-dashboard"
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
  );
};

import React from 'react'
import { UserListSection } from '@/components/sections/UserListSection/UserListSection'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AddUserFormSection } from '@/components/sections/AddUserFormSection'
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function page() {
  // Data for tabs
  const tabItems = [
    { id: "utilisateurs", label: "Utilisateurs" },
    { id: "roles", label: "Rôles et permissions" },
  ];

  // Define role data for better maintainability
  const roles = [
    {
      title: "Administrateur",
      description: [
        "Gestion des contenus (articles, produits, pages…)",
        "Supervision des utilisateurs standards",
        "Configuration de modules/fonctionnalités",
        "Peut gérer certaines permissions",
      ],
    },
    {
      title: "Modérateur",
      description: [
        "Validation/modération des contenus générés par les éditeurs",
        "Support utilisateur de premier niveau",
      ],
    },
    {
      title: "Éditeur",
      description: [
        "Création ou modification de contenu limité",
        "Soumission à validation/modération selon la plateforme",
      ],
    },
    {
      title: "Viewer",
      description: [
        "Consulter les rapports, statistiques, logs",
        "Aucun pouvoir d'édition ou d'action sur le contenu",
      ],
    },
  ];


  return (
    <Tabs defaultValue="utilisateurs">
      <header className="w-full bg-white pt-6 px-9">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <h3 className="font-legend text-xs text-gray tracking-[0] leading-normal ml-2.5">
              GESTION DES UTILISATEURS
            </h3>
            <TabsList className="bg-transparent p-0 h-auto">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-[#f2f2f9] data-[state=active]:border-b-2 data-[state=active]:border-blue data-[state=active]:text-blue data-[state=inactive]:text-gray p-2.5 rounded-none"
                >
                  <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                    {tab.label}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <AddUserFormSection />
        </div>
      </header>

      <TabsContent value="utilisateurs" className="flex-1 p-6 bg-[#f1f3f6] space-y-6">
        {/* User list section - main content */}
        <UserListSection />
      </TabsContent>
      <TabsContent value="roles" className="flex-1 h-full p-6 bg-[#f1f3f6] space-y-6">
        {/* Role list section - main content */}
        <Card className="w-full min-h-[400px] rounded-2xl bg-white ">
          <CardContent className="p-10">
            <Table>
              <TableHeader className='border-b border-[#dbdbdb]'>
                <TableRow className="border-none">
                  {roles.map((role, index) => (
                    <TableHead
                      key={index}
                      className="font-bold text-noir-dashboard text-lg"
                    >
                      {role.title}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-t border-[#d9d9d9]">
                  {roles.map((role, index) => (
                    <TableCell key={index} className="align-top py-3 mb-5">
                      <ul className="w-full font-body-2 text-gray text-base px-4">
                        {role.description.map((line, lineIndex) => (
                          <li key={lineIndex} className='list-disc mb-3'>
                            {line}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs >
  )
}

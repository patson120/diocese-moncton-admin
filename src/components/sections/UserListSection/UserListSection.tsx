"use client"

import React, { JSX, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Pencil, Trash2, XIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


export const UserListSection = (): JSX.Element => {
  // State to track the selected role filter
  const [selectedRole, setSelectedRole] = useState('all');
  const [openModal, setOpenModal] = useState(false);

  // User data array for mapping
  const users = [
    {
      id: 1,
      name: "Hadrien GAYAP",
      role: "Administrateur",
      createdAt: "12/03/2025",
      status: "Actif",
    },
    {
      id: 2,
      name: "Gabin NANA",
      role: "Modérateur",
      createdAt: "12/03/2025",
      status: "Actif",
    },
    {
      id: 3,
      name: "Patrick Kenne",
      role: "Éditeur",
      createdAt: "12/03/2025",
      status: "Actif",
    },
    {
      id: 4,
      name: "Flavie",
      role: "Éditeur",
      createdAt: "12/03/2025",
      status: "Actif",
    },
    {
      id: 5,
      name: "Wilfried ASSOMO",
      role: "Éditeur",
      createdAt: "12/03/2025",
      status: "Actif",
    },
    {
      id: 6,
      name: "Karl LAUNDRY",
      role: "Viewer",
      createdAt: "12/03/2025",
      status: "Inactif",
    },
  ];

  // Role filter options
  const roleFilters = [
    { value: "all", label: "Tout" },
    { value: "admin", label: "Administrateur" },
    { value: "moderator", label: "Modérateur" },
    { value: "editor", label: "Éditeur" },
    { value: "viewer", label: "Viewer" },
  ];

  return (
    <>
      <Card className="w-full bg-white">
        <CardContent className="p-10">
          <div className="flex flex-col w-full items-start gap-4">
            {/* Filter section */}
            <div className="flex items-center gap-4">
              <span className="font-body-3 font-[number:var(--body-3-font-weight)] text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                Afficher uniquement
              </span>

              <ToggleGroup
                type="single"
                value={selectedRole}
                onValueChange={(value: any) => value && setSelectedRole(value)}
              >
                {roleFilters.map((filter) => (
                  <ToggleGroupItem
                    key={filter.value}
                    value={filter.value}
                    className={`px-3 py-2 rounded-lg ${filter.value === selectedRole
                      ? "!bg-noir-dashboard !text-white !font-bold"
                      : "bg-white text-gray border border-solid border-[#d9d9d9]"
                      }`}
                  >
                    <span className="font-body-3 font-[number:var(--body-3-font-weight)] text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      {filter.label}
                    </span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Users table */}
            <Table>
              <TableHeader className="bg-[#f2f2f9]">
                <TableRow>
                  <TableHead className="pl-2.5 font-body-3 font-bold text-[#11112e] text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                    Nom utilisateur
                  </TableHead>
                  <TableHead className="font-body-3 font-bold text-[#11112e] text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                    Role
                  </TableHead>
                  <TableHead className="font-body-3 font-bold text-[#11112e] text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                    Créé le
                  </TableHead>
                  <TableHead className="font-body-3 font-bold text-[#11112e] text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                    Statut
                  </TableHead>
                  <TableHead className="font-body-3 font-bold text-[#11112e] text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-b border-[#d9d9d9]">
                    <TableCell className="py-3.5 font-body-3 font-[number:var(--body-3-font-weight)] text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      {user.name}
                    </TableCell>
                    <TableCell className="py-3.5 font-body-3 font-[number:var(--body-3-font-weight)] text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      {user.role}
                    </TableCell>
                    <TableCell className="py-3.5 font-body-3 font-[number:var(--body-3-font-weight)] text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      {user.createdAt}
                    </TableCell>
                    <TableCell className="py-3.5">
                      {user.status === "Actif" ? (
                        <span className="font-body-3 font-[number:var(--body-3-font-weight)] text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                          Actif
                        </span>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-[#eb5e601a] text-[#eb5e60] rounded-[80px] px-3 py-1.5 font-body-3 font-[number:var(--body-3-font-weight)] text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]"
                        >
                          Inactif
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-[17px]">
                        <Button
                          variant="ghost"
                          className="h-auto p-0 flex items-center gap-1"
                        >
                          <Pencil className="w-4 h-4 mr-1" />
                          <span className="font-body-3 font-[number:var(--body-3-font-weight)] text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                            Modifier
                          </span>
                        </Button>
                        <Button
                          onClick={() => setOpenModal(true)}
                          variant="ghost"
                          className="h-auto p-0 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          <span className="font-body-3 font-[number:var(--body-3-font-weight)] text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                            Supprimer
                          </span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={openModal}>
        <DialogContent aria-describedby={undefined} className="max-w-sm p-10 text-center rounded-2xl">
          <DialogClose className="z-[5] absolute w-5 h-5 top-[14px] right-[14px]">
            <XIcon onClick={() => { setOpenModal(false) }} className="h-5 w-5" />
          </DialogClose>
          <DialogHeader className='hidden'>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center">
            <div className="h-20 w-20 rounded-full bg-[#EB5E6030] flex justify-center items-center">
              <Trash2 className="h-8 w-8 text-[#EB5E60]" />
            </div>
          </div>
          <h1 className='text-xl font-bold'>Supprimer cet utilisateur ?</h1>
          <p className='text-gray text-sm'>Cet action entrainera la suppression définitive de cet utilisateur.</p>
          <div className='flex justify-center items-center gap-3 mt-3'>
            <Button
              onClick={() => setOpenModal(false)}
              variant="outline"
              className=" p-3.5 bg-white rounded-lg border border-solid border-[#d9d9d9]">
              <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
                Annuler
              </span>
            </Button>
            <Button onClick={() => setOpenModal(false)} className="px-3.5 py-0 bg-[#EB5E60] text-white rounded-[7px]">
              <Trash2 className="h-5 w-5 mr-2 text-white" />
              <span className="font-body-3 whitespace-nowrap text-white">
                Supprimer
              </span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

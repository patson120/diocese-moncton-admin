"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { apiClient } from "@/lib/axios";
import { formatDateToLocal } from "@/lib/utils";
import { Pencil, Trash2, XIcon } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { Role } from "../../../../types";
import { Loader } from "@/components/ui/loader";
import { toast } from "sonner";


export const UserListSection = (): JSX.Element => {

  // Role filter options
  const roleFilters = [
    {
      "id": -1,
      "intitule": "Tout",
      "sigle": "all",
      "created_at": "2025-04-29T03:45:01.000000Z",
      "updated_at": "2025-04-29T03:45:01.000000Z"
    }
  ];

  // State to track the selected role filter
  const [selectedRole, setSelectedRole] = useState(roleFilters[0]);
  const [roles, setRoles] = useState<Role[]>(roleFilters);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersCopy, setUserscopy] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>();

  const getUsers = async () => {
    const response: any = await apiClient.get("/api/administrateurs")
    setUsers(response);
    setUserscopy(response);
  }

  const getRoles = async () => {
    const response: any = await apiClient.get("/api/roles")
    setRoles(prev => ([...prev, ...response]));
  }

  useEffect(() => {
    getUsers()
    getRoles()
  }, [])

  useEffect(() => {
    if (selectedRole.sigle === "all") {
      setUsers(usersCopy);
    } else {
      const filteredUsers = usersCopy.filter((user: any) => user.role.sigle === selectedRole.sigle);
      setUsers(filteredUsers);
    }
  }, [selectedRole.sigle])

  const handleDeletUser = async (user: any) => {
    setSelectedUser(user)
    setOpenModal(true)
  }

  const handleDelete = async () => {
    if (isDeleting) return
    setIsDeleting(true)
    try {
      await apiClient.delete(`/api/administrateurs/${selectedUser.id}`);
      setUsers(users.filter((user: any) => user.id !== selectedUser.id));
      setOpenModal(false);
      toast.success("L'utilisateur a été supprimé avec succès.");
      
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la suppression de l'utilisateur.");
    }
    finally {
      setIsDeleting(false);
    }
  }

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
                value={selectedRole.sigle}
                onValueChange={(value: any) => value && setSelectedRole(roles.find((role) => role.sigle === `${value}`)!)}
              >
                {roles.map((filter) => (
                  <ToggleGroupItem
                    key={filter.sigle}
                    value={filter.sigle}
                    className={`px-3 py-2 rounded-lg ${filter.sigle === selectedRole.sigle
                      ? "!bg-noir-dashboard !text-white !font-bold"
                      : "bg-white text-gray border border-solid border-[#d9d9d9]"
                      }`}
                  >
                    <span className="font-body-3 font-[number:var(--body-3-font-weight)] text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      {filter.intitule}
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
                {users.map((user: any) => (
                  <TableRow key={user.id} className="border-b border-[#d9d9d9]">
                    <TableCell className="py-3.5 font-body-3 font-[number:var(--body-3-font-weight)] text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      {user.nom}
                    </TableCell>
                    <TableCell className="py-3.5 font-body-3 font-[number:var(--body-3-font-weight)] text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      {user.role.intitule}
                    </TableCell>
                    <TableCell className="py-3.5 font-body-3 font-[number:var(--body-3-font-weight)] text-noir-dashboard text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                      { formatDateToLocal((new Date(user.created_at)).toISOString()) }
                    </TableCell>
                    <TableCell className="py-3.5">
                      {user.status !== "Actif" ? (
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
                          onClick={() => handleDeletUser(user)}
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

      <Dialog open={openModal} onOpenChange={setOpenModal}>
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
            <Button onClick={handleDelete} className="px-3.5 py-0 bg-[#EB5E60] text-white rounded-[7px]">
              {
                isDeleting ? 
                <Loader className="w-5 h-5 mr-2" /> : 
                <Trash2 className="h-5 w-5 mr-2 text-white" />
              }
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

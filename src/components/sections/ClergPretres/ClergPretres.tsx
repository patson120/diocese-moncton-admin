'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/axios";
import {
  LayoutGridIcon,
  ListFilter
} from "lucide-react";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import { toast } from "sonner";
import { Member } from "../../../app/types";
import AddMemberFormSection from "./AddMemberFormSection";
import EditMemberFormSection from "./EditMemberFormSection";
import SearchInput from "./SearchInput";

export const ClergPretres = (): JSX.Element => {

  const [openModal, setOpenModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [members, setMembers] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState<Member>()
  const [categoryId, setCategoryId] = useState('21')
  const [query, setQuery] = useState('')
  const [etat, setEtat] = useState('')

  // Clergy tabs data
  const clergyTabs = [
    { value: "archeveque", label: "Archevêque", active: false, id: '21' },
    { value: "diacres", label: "Diacres", active: false, id: '19'  },
    { value: "pretres", label: "Prêtres", active: false, id: '20'  },
    { value: "religieux", label: "Religieux", active: true, id: '22' },
    { value: "options", label: "Options", active: false, id: '23' },
  ];

  useEffect(() => {
      ( async () => {
        let params = `?categorie_id=${categoryId}`
        if (query) params += `&nom=${query}`
        if (etat) params += `&etat=${etat}`
        const response: Member[] = await apiClient.get(`/api/membres${params}`)
        // const response: Member[] = await apiClient.get(`/api/membres`)
        setMembers(response)
      })()
  }, [categoryId, query, etat])

  const handleDeleteMember = async () => {
    setIsDeleting(true)
    try {
      await apiClient.delete(`/api/membres/${selectedMember?.id}`);
      setOpenModal(false);
      setMembers(members.filter((member) => member.id !== selectedMember?.id));
      toast.success("Membre supprimé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la suppression du membre");
    }
    finally {
      setIsDeleting(false);
    }
  }
  
  return (
    <main>
      <Tabs defaultValue="archeveque" className="w-full">
        <header className="w-full bg-white pt-6 px-9">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <h3 className="font-legend text-xs text-gray tracking-[0] leading-normal ml-2.5">
                GESTION DU CLERGÉ
              </h3>
              <TabsList className="bg-transparent p-0 h-auto">
                {clergyTabs.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    onClick={() => {setCategoryId(item.id); setEtat('')}}
                    className="p-2.5 rounded-none font-body-3 text-sm data-[state=active]:border-b-[3px] data-[state=active]:border-blue data-[state=active]:text-blue data-[state=active]:shadow-none data-[state=inactive]:text-gray data-[state=inactive]:bg-transparent">
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <AddMemberFormSection />
          </div>
        </header>

        <div className="p-6">
          <section className="bg-white rounded-2xl p-7 space-y-6">
            {/* Archevêques */}
            <TabsContent
              value="archeveque"
              className="border-none">
              <div className="flex justify-between items-center">
                <SearchInput
                  placeholder="Rechercher un archevêque"
                  setQuery={setQuery}
                />
              </div>
              <ScrollArea className="w-full h-[calc(100vh-345px)] mt-6">
                {/* Archevêque grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                  {members.map((member, index) => (
                    <Card
                      onClick={() => {
                        setOpenModal(true)
                        setSelectedMember(member)
                      }}
                      key={index}
                      className="w-full border-none shadow-none cursor-pointer">
                      <CardContent className="p-0 space-y-3">
                        <div className="relative w-full h-[250px] shrink-0 bg-[#f0f0f0] overflow-hidden rounded-xl flex items-center justify-center">
                          <Image
                            fill
                            priority
                            className="object-cover"
                            alt="Vector"
                            src="/clerge-1.png"
                          />
                        </div>

                        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mt-3">
                          <div className="relative self-stretch mt-[-1.00px] text-black text-base tracking-[0] leading-4">
                            <span className="font-bold text-lg">
                              {member.nom} {member.prenom}
                            </span>
                          </div>
                          <p className="relative self-stretch font-body-3 text-gray text-sm tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
                            {member.poste}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Diacres */}
            <TabsContent
              value="diacres"
              className="border-none">
              <Tabs defaultValue="actif" className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList className="justify-start h-12 p-0 bg-[#F1F3F6] rounded-md px-3 py-2">
                    <TabsTrigger
                      value="actif"
                      onClick={() =>  setEtat('1')}
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Actif
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="en-retraite"
                      onClick={() =>  setEtat('0')}
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray"
                    >
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        En retraite
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="decedes"
                      onClick={() =>  setEtat('-1')}
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Décédés
                      </span>
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-start gap-2.5">
                    <div className="flex items-center gap-2">
                      <SearchInput
                        placeholder="Rechercher un diacre"
                        setQuery={setQuery}
                      />
                      <Button
                        variant="outline"
                        className="h-11 flex items-center gap-2.5 border border-[#d9d9d9] rounded-lg">
                        <ListFilter className="w-5 h-5" />
                        <span className="font-body-3 text-noir-dashboard">
                          Trier par...
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg">
                        <LayoutGridIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="actif" className="mt-6 space-y-6">
                  <ScrollArea className="w-full h-[calc(100vh-345px)] mt-6">
                    {/* Diacres grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                      {members.map((member, index) => (
                        <Card
                          onClick={() => {
                            setOpenModal(true)
                            setSelectedMember(member)
                          }}
                          key={index}
                          className="w-full border-none shadow-none cursor-pointer"
                        >
                          <CardContent className="p-0 space-y-3">
                            <div className="relative w-full h-[250px] bg-[#f0f0f0] overflow-hidden rounded-xl flex items-center justify-center">
                              <Image
                                fill
                                priority
                                className="object-cover"
                                alt="Vector"
                                src="/clerge-1.png"
                              />
                            </div>

                            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mt-3">
                              <div className="relative self-stretch mt-[-1.00px] text-black text-base tracking-[0] leading-4">
                                <span className="font-bold text-sm">
                                  {member.nom} {member.prenom}
                                </span>
                              </div>
                              <p className="relative self-stretch font-body-3 text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
                                {member.poste}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent
                  value="en-retraite"
                  className="mt-6 p-0 border-none">
                  <ScrollArea className="w-full h-[calc(100vh-345px)] mt-6">
                    {/* Diacres grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                      {members.map((member, index) => (
                        <Card
                          onClick={() => {
                            setOpenModal(true)
                            setSelectedMember(member)
                          }}
                          key={index}
                          className="w-full border-none shadow-none cursor-pointer"
                        >
                          <CardContent className="p-0 space-y-3">
                            <div className="relative w-full h-[250px] bg-[#f0f0f0] overflow-hidden rounded-xl flex items-center justify-center">
                              <Image
                                fill
                                priority
                                className="object-cover"
                                alt="Vector"
                                src="/clerge-1.png"
                              />
                            </div>

                            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mt-3">
                              <div className="relative self-stretch mt-[-1.00px] text-black text-base tracking-[0] leading-4">
                                <span className="font-bold text-sm">
                                  {member.nom} {member.prenom}
                                </span>
                              </div>
                              <p className="relative self-stretch font-body-3 text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
                                {member.poste}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="decedes" className="mt-6 p-0 border-none">
                  <ScrollArea className="w-full h-[calc(100vh-345px)] mt-6">
                    {/* Diacres grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                      {members.map((member, index) => (
                        <Card
                          onClick={() => {
                            setOpenModal(true)
                            setSelectedMember(member)
                          }}
                          key={index}
                          className="w-full border-none shadow-none cursor-pointer"
                        >
                          <CardContent className="p-0 space-y-3">
                            <div className="relative w-full h-[250px] bg-[#f0f0f0] overflow-hidden rounded-xl flex items-center justify-center">
                              <Image
                                fill
                                priority
                                className="object-cover"
                                alt="Vector"
                                src="/clerge-1.png"
                              />
                            </div>

                            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mt-3">
                              <div className="relative self-stretch mt-[-1.00px] text-black text-base tracking-[0] leading-4">
                                <span className="font-bold text-sm">
                                  {member.nom} {member.prenom}
                                </span>
                              </div>
                              <p className="relative self-stretch font-body-3 text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
                                {member.poste}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Réligieux */}
            <TabsContent
              value="religieux"
              className="border-none">
              <Tabs defaultValue="pretres-redemptoristes" className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList className="justify-start h-12 p-0 bg-[#F1F3F6] rounded-md px-3 py-2">
                    <TabsTrigger
                      onClick={() =>  setEtat('')}
                      value="pretres-redemptoristes"
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Prêtres rédemptoristes
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="autres-groupes"
                      onClick={() =>  setEtat('')}
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray"
                    >
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Autres groupes
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="decedes"
                      onClick={() =>  setEtat('-1')}
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Décédés
                      </span>
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-start gap-2.5">
                    <div className="flex items-center gap-2">
                      <SearchInput
                        placeholder="Rechercher un réligieux"
                        setQuery={setQuery}
                      />
                      <Button
                        variant="outline"
                        className="h-11 flex items-center gap-2.5 border border-[#d9d9d9] rounded-lg">
                        <ListFilter className="w-5 h-5" />
                        <span className="font-body-3 text-noir-dashboard">
                          Trier par...
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg">
                        <LayoutGridIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="pretres-redemptoristes" className="mt-6 space-y-6">
                  <ScrollArea className="w-full h-[calc(100vh-345px)] ">
                    {/* Priests grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                    {members.map((member, index) => (
                        <Card
                          onClick={() => {
                            setOpenModal(true)
                            setSelectedMember(member)
                          }}
                          key={index}
                          className="w-full border-none shadow-none cursor-pointer">
                          <CardContent className="p-0 space-y-3">
                            <div className="relative self-stretch w-full h-[250px] bg-[#f0f0f0] rounded-xl flex items-center justify-center">
                              <Image
                                width={60}
                                height={60}
                                alt="Vector"
                                src="/vector.svg"
                              />
                            </div>

                            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mt-3">
                              <div className="relative self-stretch mt-[-1.00px] text-black text-base tracking-[0] leading-4">
                                <span className="font-bold text-sm">
                                {member.nom} {member.prenom}
                                </span>
                              </div>
                              <p className="relative self-stretch font-body-3 text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
                              {member.poste}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent
                  value="autres-groupes"
                  className="mt-6 p-0 border-none">
                  <ScrollArea className="w-full h-[calc(100vh-345px)] ">
                    {/* Priests grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                    {members.map((member, index) => (
                        <Card
                          onClick={() => {
                            setOpenModal(true)
                            setSelectedMember(member)
                          }}
                          key={index}
                          className="w-full border-none shadow-none cursor-pointer">
                          <CardContent className="p-0 space-y-3">
                            <div className="relative self-stretch w-full h-[250px] bg-[#f0f0f0] rounded-xl flex items-center justify-center">
                              <Image
                                width={60}
                                height={60}
                                alt="Vector"
                                src="/vector.svg"
                              />
                            </div>

                            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mt-3">
                              <div className="relative self-stretch mt-[-1.00px] text-black text-base tracking-[0] leading-4">
                                <span className="font-bold text-sm">
                                {member.nom} {member.prenom}
                                </span>
                              </div>
                              <p className="relative self-stretch font-body-3 text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
                              {member.poste}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="decedes" className="mt-6 p-0 border-none">
                  <ScrollArea className="w-full h-[calc(100vh-345px)] ">
                    {/* Priests grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                    {members.map((member, index) => (
                        <Card
                          onClick={() => {
                            setOpenModal(true)
                            setSelectedMember(member)
                          }}
                          key={index}
                          className="w-full border-none shadow-none cursor-pointer">
                          <CardContent className="p-0 space-y-3">
                            <div className="relative self-stretch w-full h-[250px] bg-[#f0f0f0] rounded-xl flex items-center justify-center">
                              <Image
                                width={60}
                                height={60}
                                alt="Vector"
                                src="/vector.svg"
                              />
                            </div>

                            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mt-3">
                              <div className="relative self-stretch mt-[-1.00px] text-black text-base tracking-[0] leading-4">
                                <span className="font-bold text-sm">
                                {member.nom} {member.prenom}
                                </span>
                              </div>
                              <p className="relative self-stretch font-body-3 text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
                              {member.poste}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Prêtres */}
            <TabsContent
              value="pretres"
              className="border-none">
              <Tabs defaultValue="actif" className="w-full">
                <div className="flex justify-between items-center">
                  <TabsList className="justify-start h-12 p-0 bg-[#F1F3F6] rounded-md px-3 py-2">
                    <TabsTrigger
                      onClick={() =>  setEtat('1')}
                      value="actif"
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Actif
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="en-retraite"
                      onClick={() =>  setEtat('0')}
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray"
                    >
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        En retraite
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="decedes"
                      onClick={() =>  setEtat('-1')}
                      className="h-8 px-2.5 py-2.5 rounded-none data-[state=active]:bg-white data-[state=active]:rounded-md data-[state=active]:shadow-none data-[state=active]:text-blue data-[state=active]:font-bold data-[state=inactive]:text-gray">
                      <span className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)]">
                        Décédés
                      </span>
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-start gap-2.5">
                    <div className="flex items-center gap-2">
                      <SearchInput
                        placeholder="Rechercher un prêtre"
                        setQuery={setQuery}
                      />
                      <Button
                        variant="outline"
                        className="h-11 flex items-center gap-2.5 border border-[#d9d9d9] rounded-lg">
                        <ListFilter className="w-5 h-5" />
                        <span className="font-body-3 text-noir-dashboard">
                          Trier par...
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-11 h-11 p-0 flex items-center justify-center border border-[#d9d9d9] rounded-lg">
                        <LayoutGridIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="actif" className="mt-6 space-y-6">
                  <ScrollArea className="w-full h-[calc(100vh-345px)] mt-6">
                    {/* Prêtres grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                    {members.map((member, index) => (
                        <Card
                          onClick={() => {
                            setOpenModal(true)
                            setSelectedMember(member)
                          }}
                          key={index}
                          className="w-full border-none shadow-none cursor-pointer"
                        >
                          <CardContent className="p-0 space-y-3">
                            <div className="relative w-full h-[250px] bg-[#f0f0f0] overflow-hidden rounded-xl flex items-center justify-center">
                              <Image
                                fill
                                priority
                                className="object-cover"
                                alt="Vector"
                                src="/clerge-1.png"
                              />
                            </div>

                            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mt-3">
                              <div className="relative self-stretch mt-[-1.00px] text-black text-base tracking-[0] leading-4">
                                <span className="font-bold text-sm">
                                  {member.nom} {member.prenom}
                                </span>
                              </div>
                              <p className="relative self-stretch font-body-3 text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
                                {member.poste}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent
                  value="en-retraite"
                  className="mt-6 p-0 border-none">
                  <ScrollArea className="w-full h-[calc(100vh-345px)] mt-6">
                    {/* Prêtres grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                    {members.map((member, index) => (
                        <Card
                          onClick={() => {
                            setOpenModal(true)
                            setSelectedMember(member)
                          }}
                          key={index}
                          className="w-full border-none shadow-none cursor-pointer"
                        >
                          <CardContent className="p-0 space-y-3">
                            <div className="relative w-full h-[250px] bg-[#f0f0f0] overflow-hidden rounded-xl flex items-center justify-center">
                              <Image
                                fill
                                priority
                                className="object-cover"
                                alt="Vector"
                                src="/clerge-1.png"
                              />
                            </div>

                            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mt-3">
                              <div className="relative self-stretch mt-[-1.00px] text-black text-base tracking-[0] leading-4">
                                <span className="font-bold text-sm">
                                  {member.nom} {member.prenom}
                                </span>
                              </div>
                              <p className="relative self-stretch font-body-3 text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
                                {member.poste}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="decedes" className="mt-6 p-0 border-none">
                  <ScrollArea className="w-full h-[calc(100vh-345px)] mt-6">
                    {/* Prêtres grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                    {members.map((member, index) => (
                        <Card
                          onClick={() => {
                            setOpenModal(true)
                            setSelectedMember(member)
                          }}
                          key={index}
                          className="w-full border-none shadow-none cursor-pointer"
                        >
                          <CardContent className="p-0 space-y-3">
                            <div className="relative w-full h-[250px] bg-[#f0f0f0] overflow-hidden rounded-xl flex items-center justify-center">
                              <Image
                                fill
                                priority
                                className="object-cover"
                                alt="Vector"
                                src="/clerge-1.png"
                              />
                            </div>

                            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mt-3">
                              <div className="relative self-stretch mt-[-1.00px] text-black text-base tracking-[0] leading-4">
                                <span className="font-bold text-sm">
                                  {member.nom} {member.prenom}
                                </span>
                              </div>
                              <p className="relative self-stretch font-body-3 text-gray text-xs tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
                                {member.poste}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Options */}
            <TabsContent
              value="options"
              className="border-none">
              <div className="flex justify-between items-center">
                <SearchInput
                  placeholder="Rechercher..."
                  setQuery={setQuery}
                />
              </div>
              <ScrollArea className="w-full h-[calc(100vh-345px)] mt-6">
                {/* Options grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8">
                  {members.map((member, index) => (
                    <Card
                      onClick={() => {
                        setOpenModal(true)
                        setSelectedMember(member)
                      }}
                      key={index}
                      className="w-full border-none shadow-none cursor-pointer">
                      <CardContent className="p-0 space-y-3">
                        <div className="relative self-stretch w-full h-[250px] bg-[#f0f0f0] rounded-xl flex items-center justify-center">
                          <Image
                            width={60}
                            height={60}
                            alt="Vector"
                            src="/vector.svg"
                          />
                        </div>

                        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] mt-3">
                          <div className="relative self-stretch mt-[-1.00px] text-black text-base tracking-[0] leading-4">
                            <span className="font-bold text-lg">
                              {member.nom} {member.prenom}
                            </span>
                          </div>
                          <p className="relative self-stretch font-body-3 text-gray text-sm tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
                            {member.poste}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </section>
        </div>
      </Tabs>

      {/* Sheet */}
      <Sheet open={openModal} onOpenChange={setOpenModal}>
        <SheetContent className="max-w-2xl min-w-[600px]">
          <SheetHeader className='relative'>
            <SheetTitle hidden>Détails du membre</SheetTitle>
          </SheetHeader>
          <div className='absolute top-0 left-0 right-0 z-[1] bg-white'>
            {/* Header with action buttons */}
            <header className="w-full h-20 border-b border-[#d9d9d9] flex items-center justify-between px-12">
              <Button variant="outline" className="h-10"
                onClick={() => setOpenModal(false)}>
                Fermer
              </Button>
              <div className="flex gap-2">
                {/** 
                  <Button variant="outline" className="h-10">
                    Désactiver
                  </Button>
                 */}
                <EditMemberFormSection memberData={selectedMember!} />
                <Button onClick={handleDeleteMember} className="h-10 bg-red-500 text-white hover:bg-blue/90">
                { isDeleting && <Loader className='h-5 w-5, mr-2' /> }
                  Supprimer
                </Button>
              </div>
            </header>
          </div>

          {/* Scrollable content area */}
          <ScrollArea className="w-full h-[calc(100%-80px)] mt-24 px-7">
            <div className='flex flex-col gap-6'>
              <div className="flex gap-4">
                <div className="h-48  w-48 shrink-0 relative self-stretch rounded-xl borderborder-gray bg-[#f0f0f0] flex items-center justify-center">
                  <Image
                    fill
                    priority
                    className="object-cover"
                    alt="Vector"
                    src="/clerge-1.png"
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <div>
                    <h4 className="text-lg font-bold">{selectedMember?.nom}</h4>
                    <p className="text-gray">
                      { selectedMember?.etat === 1 && "En activité" }
                      { selectedMember?.etat === 0 && "En retraite" }
                      { selectedMember?.etat === -1 && "Décédé" }
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Coordonnées</h4>
                    <p className="text-gray">{selectedMember?.coordonnees}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Fonctions</h4>
                    <p className="text-gray">{selectedMember?.poste}</p>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-blue text-lg font-bold">Biographie</h1>
                <p className="text-gray mt-2">
                  {selectedMember?.description_fr}
                </p>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </main>
  );
};

'use client'

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import NotificationsDialog from "./NotificationsDialog";
import { User } from "@/app/types";
import Cookies from 'js-cookie';

export default function HeaderSection (): JSX.Element  {
  const [user, setUser] = useState<User | null>(null)
  
  useEffect(() => {
    const currentUser = Cookies.get('user');
    setUser(currentUser ? JSON.parse(currentUser!) : null)
  }, [])

  return (
    <header className="w-full h-16 bg-white flex items-center justify-between px-9">
      <div className="flex items-center gap-2">
        <Avatar className="w-10 h-10 rounded-full flex justify-center items-center overflow-hidden">
          <AvatarImage src="/assets/img/image.png" alt="Profile" />
          <AvatarFallback className="text-lg font-bold border border-gray-600 rounded-full uppercase">{user?.nom?.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center items-start gap-0.5">
          <h3 className="font-body-3 text-start font-bold text-noir-dashboard text-sm leading-[14px] capitalize">
            {user?.nom!}
          </h3>
          <p className="font-legend text-gray text-xs">
            {user?.email}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Link href={"https://diocese-de-moncton.vercel.app/"} target="_blank" >
          <Button
            variant="outline"
            className="h-10 text-noir-dashboard font-body-3 font-normal">
            Voir le site internet
          </Button>
        </Link>
        <NotificationsDialog />
      </div>
    </header>
  );
};


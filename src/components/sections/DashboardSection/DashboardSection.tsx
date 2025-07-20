'use client';
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/axios";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarDays, Church, Coins, File, Notebook, Users } from "lucide-react";
import { JSX } from "react";
import Link from "next/link";

export const DashboardSection = (): JSX.Element => {

  const [totalEvent, setTotalEvent] = useState(0)
  const [totalNews, setTotalNews] = useState(0)
  const [totalParishes, setTotalParishes] = useState(0)

  const getEvents = async () => {
    const response: any = await apiClient.get('/api/evenements?paginate=1')
    setTotalEvent(response.total);
  }
  const getNews = async () => {
    const response: any = await apiClient.get('/api/actualites?paginate=1')
    setTotalNews(response.total);
  }

  const getParishes = async () => {
    const response: any = await apiClient.get('/api/paroisses?paginate=1')
    setTotalParishes(response.total);
  }

  useEffect(() => {
    getEvents()
    getNews()
    getParishes()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="h-[200px] rounded-2xl overflow-hidden bg-yellow-light relative">
        <CardContent className="p-0">
          {/* Icon placeholder */}
          <div className="w-11 h-11 mt-5 ml-5 bg-[#F4F4E6] rounded-xl flex justify-center items-center">
            <CalendarDays className="h-6 w-6" />
          </div>

          {/* Card content */}
          <div className="flex flex-col items-start gap-0.5 mt-9 ml-5">
            <div className="text-gray text-xs">Événements à venir</div>
            <div className="font-heading-5 font-bold text-noir-dashboard text-xl leading-[28.6px]">
              {totalEvent} évènements
            </div>
          </div>
        </CardContent>

        {/* Card footer */}
        <CardFooter className="absolute bottom-0 w-full p-0">
          <div className="w-full h-[38px] bg-[#F9F9F0] flex justify-between items-center px-5">
            <div className="font-normal text-gray text-xs">
              Durant février
            </div>
            <Link href={"/events"}>
              <div className="font-normal text-noir-dashboard text-xs text-right cursor-pointer">
                <span className="font-bold">Voir plus</span>
              </div>
            </Link>
          </div>
        </CardFooter>
      </Card>
      <Card className="h-[200px] rounded-2xl overflow-hidden bg-red-light relative">
        <CardContent className="p-0">
          {/* Icon placeholder */}
          <div className="w-11 h-11 mt-5 ml-5 bg-[#F4E6E8] rounded-xl flex justify-center items-center">
            <Notebook className="h-6 w-6" />
          </div>

          {/* Card content */}
          <div className="flex flex-col items-start gap-0.5 mt-9 ml-5">
            <div className="text-gray text-xs">Actualités</div>
            <div className="font-heading-5 font-bold text-noir-dashboard text-xl leading-[28.6px]">
              {totalNews}
            </div>
          </div>
        </CardContent>

        {/* Card footer */}
        <CardFooter className="absolute bottom-0 w-full p-0">
          <div className="w-full h-[38px] bg-[#F8F2F3] flex justify-between items-center px-5">
            <div className="font-normal text-gray text-xs">
              Durant février
            </div>
            <Link href={"/contents"}>
              <div className="font-normal text-noir-dashboard text-xs text-right cursor-pointer">
                <span className="font-bold">Voir plus</span>
              </div>
            </Link>
          </div>
        </CardFooter>
      </Card>
      

      <Card className="h-[200px] rounded-2xl overflow-hidden bg-green-light relative">
        <CardContent className="p-0">
          {/* Icon placeholder */}
          <div className="w-11 h-11 mt-5 ml-5 bg-[#E6EAEF] rounded-xl flex justify-center items-center" >
            <Church className="h-6 w-6" />
          </div>

          {/* Card content */}
          <div className="flex flex-col items-start gap-0.5 mt-9 ml-5">
            <div className="text-gray text-xs">Paroisses de l'archidiocèse</div>
            <div className="font-heading-5 font-bold text-noir-dashboard text-xl leading-[28.6px]">
              {totalParishes}
            </div>
          </div>
        </CardContent>

        {/* Card footer */}
        <CardFooter className="absolute bottom-0 w-full p-0">
          <div className="w-full h-[38px] bg-[#F3F4F7] flex justify-between items-center px-5">
            <div className="font-normal text-gray text-xs">
              Durant février
            </div>
            <Link href={"/parishes"}>
              <div className="font-normal text-noir-dashboard text-xs text-right cursor-pointer">
                <span className="font-bold">Voir plus</span>
              </div>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
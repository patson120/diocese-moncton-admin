
'use client'
import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { ArrowDownWideNarrow, ArrowUpAZ, ArrowUpWideNarrow, ArrowUpZA, ListFilter } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function MenuCard({ordre,setOrdre}: {ordre: string, setOrdre(val: string): void }) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const params = new URLSearchParams(searchParams)
    const router = useRouter()

    const handleFilter = (value: string) => {
        // params.set('page', '1');

        setOrdre(value)
        // If the value is empty, remove the query parameter
        if (value) {
            params.set('ordre', value)
        }
        else {
            params.delete('ordre')
        }
        router.replace(`${pathname}?${params.toString()}`)
      }

    {/* Menus */}
  return (
    <Card>
    <CardContent className="space-y-4 p-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-11 flex items-center gap-2.5 border border-[#d9d9d9] rounded-lg">
            <ListFilter className="w-5 h-5" />
            <span className="font-body-3 text-noir-dashboard">
              Trier par...
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/**
            <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
           */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleFilter('a_z')} className={cn(ordre === 'a_z' && 'text-blue font-bold')}>
            <ArrowUpAZ className="mr-2 h-4 w-4" />
            Ordre de A à Z
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilter('z_a')} className={cn(ordre === 'z_a' && 'text-blue font-bold')}>
            <ArrowUpZA className="mr-2 h-4 w-4" />
            Ordre de Z à A
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilter('asc')} className={cn(ordre === 'asc' && 'text-blue font-bold')}>
            <ArrowUpWideNarrow className="mr-2 h-4 w-4" />
            Date ajout croissante
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilter('desc')} className={cn(ordre === 'desc' && 'text-blue font-bold')}>
            <ArrowDownWideNarrow className="mr-2 h-4 w-4" />
            Date ajout décroissante
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardContent>
  </Card>
  )
}

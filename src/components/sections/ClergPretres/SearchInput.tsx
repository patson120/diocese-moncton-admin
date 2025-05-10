'use client'

import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEvent } from 'react'
import { useDebouncedCallback } from 'use-debounce'

type SearchInputProps = {
    placeholder: string;
    setQuery: (text: string) => void
}

export default function SearchInput({
    placeholder,
    setQuery
}: SearchInputProps) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const params = new URLSearchParams(searchParams)
    const router = useRouter()  

    const handleSearch = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        // params.set('page', '1');

        setQuery(value)
        // If the value is empty, remove the query parameter
        if (value) {
            params.set('query', value)
        }
        else {
            params.delete('query')
        }
        router.replace(`${pathname}?${params.toString()}`)
    }, 800)
    return (
        <div className="relative w-[256px]">
            <Input
                className="h-10 bg-neutral-100 border-none pl-9"
                placeholder={placeholder}
                onChange={handleSearch}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <SearchIcon className="absolute w-4 h-4 top-3 left-3 text-gray" />
        </div>
    )
}

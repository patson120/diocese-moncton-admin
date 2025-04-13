"use client";
import { HTMLContent } from '@/components/shared/html-content';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchCategories } from '@/lib/data';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { Category } from '../../../../types';

export default function ActuDialog(
    {
        imageUrl,
        title,
        content,
        isLoading,
        handlePublish,
        open,
    }:
        {
            imageUrl: string;
            title: any;
            content: any;
            isLoading: boolean;
            handlePublish: (data: any) => void;
            open: boolean;
        }
) {

    const [categorie, setCategorie] = useState<Category>()
    const [categories, setCategories] = useState<Category[]>([])
    const [motcles, setMotcles] = useState('')

    const handlePublishActualite = async () => {
        handlePublish({
            categorie_id: categorie?.id!,
            motcles: motcles ? motcles.split(',') : []
        })
    }

    const handleSelectedDate = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    }


    useEffect(() => {
        const getCategories = async () => {
            const result: Category[] = await fetchCategories(
                // `?menu=actualite`
            )
            if (result.length > 0) {
                setCategorie(result[0]);
                setCategories(result)
            }
        }
        getCategories()
    }, [])


    const handlePlan = () => {
        console.log("dguidgzuhzuh");

        const input = document.querySelector("#planDate") as HTMLInputElement
        input.addEventListener('click', () => {
            console.log(input);
        })
        input.click()

    }

    return (
        <Dialog open={open}>
            {/* <DialogTrigger asChild>
                <Button className="h-10 px-3.5 py-0 bg-blue text-white rounded-[7px]">
                    {isLoading && <Loader className='text-white mr-2' />}
                    <span className="font-body-3 whitespace-nowrap">
                        Publier actualité
                    </span>
                </Button>
            </DialogTrigger> */}

            <DialogContent aria-describedby={undefined} className="w-min h-[550px] p-0 rounded-2xl">
                <DialogClose className="absolute border-none w-5 h-5 top-[14px] right-[14px]">
                    {/* <XIcon className="w-5 h-5" /> */}
                </DialogClose>
                <DialogHeader className='hidden'>
                    <DialogTitle></DialogTitle>
                </DialogHeader>

                <div className="flex h-full">
                    {/* Left preview panel */}
                    <div className="w-[394px] h-full bg-[#f2f2f9] flex items-center justify-center">
                        <Card className="w-[270px] bg-white rounded-xl">
                            <CardContent className="p-2.5">
                                <div className='relative h-40 rounded-lg overflow-hidden'>
                                    <Image
                                        fill
                                        style={{
                                            objectFit: 'cover'
                                        }}
                                        className=""
                                        alt="Image"
                                        src={imageUrl}
                                    />
                                </div>
                                <div className="flex flex-col items-start gap-1 mt-4">
                                    <p className="self-stretch font-legend text-gray text-xs">
                                        {categorie?.intitule_fr}
                                    </p>
                                    <div className="flex flex-col items-start gap-[4px] self-stretch w-full">
                                        <HTMLContent html={title.french} className='line-clamp-2 font-bold text-xl' />
                                        <HTMLContent html={content.french} className='line-clamp-2' />

                                        <p className="font-legend text-gray text-sm mt-2">
                                            Date de publication
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right configuration panel */}
                    <div className="flex-1 p-[60px]">
                        <div className="flex flex-col w-[350px] items-start gap-4">
                            <div className="flex flex-col items-start gap-2 self-stretch w-full">
                                <label className="self-stretch mt-[-1.00px] font-body-3 text-noir-dashboard">
                                    Catégorie
                                </label>
                                <Select
                                    value={`${categorie?.id!}`}
                                    onValueChange={(value: string) => {
                                        const item = categories.find(cat => `${cat.id}` === value)
                                        setCategorie(item)
                                    }}
                                >
                                    <SelectTrigger className="w-[350px] h-11 bg-white rounded-xl border border-solid border-[#d9d9d9]">
                                        <SelectValue placeholder="Sélectionnez la catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            categories.map((cat) => (
                                                <SelectItem key={cat.id} value={`${cat.id}`}>{cat.intitule_fr}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col items-start gap-2 self-stretch w-full">
                                <label className="self-stretch mt-[-1.00px] font-body-3 text-noir-dashboard">
                                    Entrez les mots clés
                                </label>
                                <Input
                                    value={motcles}
                                    onChange={(e) => setMotcles(e.target.value.trim())}
                                    className="w-[350px] h-11 bg-white rounded-xl border border-solid border-[#d9d9d9]"
                                    placeholder="séparez les mots par une virgule (,)"
                                />
                            </div>

                            {/* <div>
                                <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 animate-spin">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div> */}

                            <div className="flex w-[350px] items-center gap-2 mt-[200px]">
                                <Button onClick={handlePublishActualite} className="flex-1 gap-2.5 p-3.5 bg-blue rounded-lg">
                                    {/* <img className="w-5 h-5" alt="Frame" src="/frame-5.svg" /> */}
                                    {isLoading && <Loader className='text-white mr-2' />}
                                    <span className="font-body-3 text-white">
                                        Publier l&apos;actualité
                                    </span>
                                </Button>
                                <Button
                                    onClick={handlePlan}
                                    variant="outline"
                                    className="w-[145px] p-3.5 relative overflow-hidden bg-white rounded-lg border border-solid border-[#d9d9d9]">
                                    <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
                                        Planifier
                                    </span>
                                    <input id='planDate' className='absolute transform -translate-x-16 opacity-0 cursor-pointer'
                                        onChange={handleSelectedDate} type="date" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
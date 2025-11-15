"use client";
import { HTMLContent } from '@/components/shared/html-content';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { apiClient } from '@/lib/axios';
import { MonitorUp, Timer } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { Category } from '../../types';
import { AddCategoryFormSection } from '@/components/sections/EventSection/AddCategoryFormSection';

export default function ActuDialog(
    {
        imageUrl,
        title,
        content,
        isLoading,
        handlePublish,
        open,
        onOpenChange,
        onDataChange
    }:
        {
            imageUrl: string;
            title: any;
            content: any;
            isLoading: boolean;
            handlePublish: (data: any) => void;
            open: boolean;
            onOpenChange: (val: boolean) => void;
            onDataChange: (data: any) => void;
        }
) {

    const [categorie, setCategorie] = useState<Category>()
    const [categories, setCategories] = useState<Category[]>([])
    const [motcles, setMotcles] = useState('')
    const [date, setDate] = useState('')
    const [hour, setHour] = useState('')
    const [isPlan, setIsPlan] = useState(false)
    const [publishDate, setPublishDate] = useState('')

    const handlePublishActualite = async () => {
        const data = {
            categorie_id: categorie?.id!,
            motcles: motcles ? motcles.split(',') : [],
            is_planifier: isPlan ? 1 : 0,
            is_actif: isPlan ? 0 : 1,
            date_planification: date ? `${date}T${hour}:00` : null,
            date_publication: isPlan ? null : `${publishDate}`
        }
        handlePublish(data)
    }

    const handleSelectedDate = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
    }

    const handleSelectedPublishDate = (e: ChangeEvent<HTMLInputElement>) => {
        setPublishDate(e.target.value)
    }

    const handleSelectedHour = (e: ChangeEvent<HTMLInputElement>) => {
        setHour(e.target.value)
    }


    useEffect(() => {
        const getCategories = async () => {
            const result: Category[] = await apiClient.get(`/api/categories`)
            if (result.length > 0) {
                setCategorie(result[0]);
                setCategories(result)
            }
        }
        getCategories()
    }, [])

    useEffect(() => {
        onDataChange({
            categorie_id: categorie?.id!,
            motcles: motcles ? motcles.split(',') : [],
            is_planifier: isPlan ? 1 : 0,
            date_planification: date ? `${date}T${hour}:00`: null,
            date_publication:  publishDate ?? null
        })
    }, [ categorie?.id!, motcles, isPlan, date, publishDate ])


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent aria-describedby={undefined} className="w-min h-[550px] p-0 rounded-2xl">
                <DialogClose className="absolute border-none w-5 h-5 top-[14px] right-[14px]">
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
                                        style={{objectFit: 'cover'}}
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
                        <div className="flex flex-col justify-between w-[350px] h-full items-start gap-4">
                            <div className='flex flex-col items-start gap-4 '>
                                <div className="flex flex-col items-start gap-2 self-stretch w-full">
                                    <div className='w-full flex justify-between items-center'>
                                        <label className="self-stretch mt-[-1.00px] font-body-3 text-noir-dashboard">
                                            Catégorie
                                        </label>
                                        {/* Ajouter une nouvelle catégorie */}
                                        <AddCategoryFormSection menu='actualite' setCategories={setCategories} />
                                    </div>
                                    <Select
                                        value={`${categorie?.id!}`}
                                        onValueChange={(value: string) => {
                                            const item = categories.find(cat => `${cat.id}` === value)
                                            setCategorie(item)
                                        }}>
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
                                {
                                    (isPlan) ?
                                    <div className='grid grid-cols-2 gap-3 w-full'>
                                        <div className="gap-2 self-stretch !w-full">
                                            <Label htmlFor="role">Jour</Label>
                                            <Input
                                                // value={''}
                                                onChange={handleSelectedDate}
                                                className="h-11 inline-block bg-white rounded-xl border border-solid border-[#d9d9d9]"
                                                type='date'
                                            />
                                        </div>
                                        <div className="gap-2 self-stretch !w-full">
                                            <Label htmlFor="role">Heure</Label>
                                            <Input
                                                // value={''}
                                                onChange={handleSelectedHour}
                                                className="inline-block h-11 bg-white rounded-xl border border-solid border-[#d9d9d9]"
                                                type='time'
                                            />
                                        </div>
                                    </div> :
                                    <div className="gap-2 self-stretch !w-full">
                                        <Label htmlFor="role">Date de publication</Label>
                                        <Input
                                            onChange={handleSelectedPublishDate}
                                            className="h-11 inline-block bg-white rounded-xl border border-solid border-[#d9d9d9]"
                                            type='date'
                                        />
                                    </div>
                                }
                            </div>

                            <div className="flex w-[350px] items-center gap-2">
                                {
                                    (isPlan) ?
                                        <>
                                            <Button
                                                onClick={() => setIsPlan(false)}
                                                variant="outline"
                                                className="w-[145px] p-3.5 relative overflow-hidden bg-white rounded-lg border border-solid border-[#d9d9d9]">
                                                <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
                                                    Retour
                                                </span>

                                            </Button>

                                            <Button onClick={handlePublishActualite} className="flex-1 gap-2.5 p-3.5 bg-blue rounded-lg">
                                                {isLoading && <Loader className='text-white mr-2' />}
                                                {!isLoading && <Timer className='h-5 w-5 text-white mr-2' />}
                                                <span className="font-body-3 text-white">
                                                    Planifier
                                                </span>
                                            </Button>
                                        </> :
                                        <>
                                            <Button onClick={handlePublishActualite} className="flex-1 gap-2.5 p-3.5 bg-blue rounded-lg">
                                                {isLoading && <Loader className='text-white mr-2' />}
                                                {!isLoading && <MonitorUp className='h-5 w-5 text-white mr-2' />}
                                                <span className="font-body-3 text-white">
                                                    Publier l&apos;actualité
                                                </span>
                                            </Button>
                                            <Button
                                                onClick={() => setIsPlan(true)}
                                                variant="outline"
                                                className="w-[145px] p-3.5 relative overflow-hidden bg-white rounded-lg border border-solid border-[#d9d9d9]">
                                                <span className="font-body-3 text-noir-dashboard whitespace-nowrap">
                                                    Planifier
                                                </span>

                                            </Button>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
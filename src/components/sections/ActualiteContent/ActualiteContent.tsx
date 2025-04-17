import Text from '@/components/shared/Text';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { fetchActualites } from '@/lib/data';
import { formatDateToLocal } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Actualite } from '../../../../types';

export default function ActualiteContent({ is_brouillon }: { is_brouillon: number }) {

    const [actualites, setActualites] = useState<Actualite[]>([])
    const [selectedActualite, setSelectedActualite] = useState<Actualite>()
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const getActualites = async () => {
            const response = await fetchActualites(`?paginate=20&is_brouillon=${is_brouillon}`)
            setActualites(response.data)
        }
        getActualites()
    }, [is_brouillon])

    const handelOpenDetailsSheet = (actualite: Actualite) => {
        setSelectedActualite(actualite)
        setOpenModal(true)
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {
                    actualites.map((article) => (
                        <Card
                            key={article.id}
                            onClick={() => handelOpenDetailsSheet(article)}
                            className="w-full border-none shadow-none cursor-pointer">
                            <CardContent className="p-0 space-y-3">
                                {/* {article.image ? ( */}
                                <div
                                    className="w-full h-[150px] rounded-xl bg-cover bg-center"
                                    style={{ backgroundImage: `url("/image-5.png")` }}
                                />
                                {/* ) : (
                                <div className="w-full h-[150px] bg-[#f8f8f8] rounded-[11px]" />
                            )} */}

                                <div className="flex flex-col gap-2">
                                    <div className='flex flex-row justify-between items-center'>
                                        {article.categorie && (
                                            <p className="font-legend text-[length:var(--legend-font-size)] tracking-[var(--legend-letter-spacing)] leading-[var(--legend-line-height)] text-gray">
                                                {article.categorie.intitule_fr}
                                            </p>
                                        )}
                                        {
                                            is_brouillon === 0 &&
                                            <p className='text-xs text-yellow-400 font-medium'>
                                                En attente; {formatDateToLocal((new Date(article.created_at)).toISOString())}
                                            </p>
                                        }
                                        {
                                            is_brouillon === 1 &&
                                            <p className='text-xs text-gray font-medium'>
                                                {formatDateToLocal((new Date(article.created_at)).toISOString())}
                                            </p>
                                        }
                                        {
                                            is_brouillon === -1 &&
                                            <p className='text-xs text-red-600 font-medium'>
                                                Désactivé
                                            </p>
                                        }
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-body-3 font-bold text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-noir-dashboard line-clamp-1">
                                            <Text labelFr={article.titre_fr} labelEn={article.titre_en} />
                                        </div>
                                        <div className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-gray line-clamp-1">
                                            <Text labelFr={article.description_fr} labelEn={article.description_en} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
            </div>

            {/* Sheet */}
            <Sheet open={openModal} >
                <SheetContent className="max-w-3xl min-w-3xl">
                    <SheetHeader>
                        <SheetTitle hidden>Détails de l'actualité</SheetTitle>
                    </SheetHeader>
                    <div className='absolute top-0 left-0 right-0 z-[1] bg-white'>
                        {/* Header with action buttons */}
                        <header className="w-full h-20 border-b border-[#d9d9d9] flex items-center justify-between px-12">
                            <Button variant="outline" className="h-10"
                                onClick={() => setOpenModal(false)}>
                                Fermer
                            </Button>
                            <div className="flex gap-4">
                                <Button variant="outline" className="h-10">
                                    Désactiver
                                </Button>
                                <Button className="h-10 bg-blue text-white hover:bg-blue/90">
                                    Modifier
                                </Button>
                            </div>
                        </header>
                    </div>

                    {/* Scrollable content area */}
                    <div className="h-[calc(100%-80px)] mt-24 px-6 v-scroll overflow-y-scroll">
                        <div className="flex flex-col gap-6">
                            {/* Article header with image and basic info */}
                            <section
                                className="w-full h-[260px] aspect-auto rounded-2xl bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url("/image-5.png")` }}
                            />

                            {/* Content section */}
                            <section className="flex flex-col gap-2 ">
                                <div className='flex justify-between items-center'>
                                    <span className="text-gray">{selectedActualite?.categorie.intitule_fr}</span>
                                    {
                                        selectedActualite?.date_publication && (
                                            <div>
                                                {/* <span className="text-gray">{formatDateToLocal((new Date(selectedActualite?.date_publication!)).toISOString())}</span> */}
                                                {
                                                    is_brouillon === 0 &&
                                                    <p className='text-xs text-yellow-400 font-medium'>
                                                        En attente; {formatDateToLocal((new Date(selectedActualite.created_at)).toISOString())}
                                                    </p>
                                                }
                                                {
                                                    is_brouillon === 1 &&
                                                    <p className='text-xs text-gray font-medium'>
                                                        {formatDateToLocal((new Date(selectedActualite.date_publication)).toISOString())}
                                                    </p>
                                                }
                                                {
                                                    is_brouillon === -1 &&
                                                    <p className='text-xs text-red-600 font-medium'>
                                                        Désactivé
                                                    </p>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                                <Text className='font-bold text-2xl' labelFr={selectedActualite?.titre_fr} labelEn={selectedActualite?.titre_en} />
                                <Text className='text-lg' labelFr={selectedActualite?.description_fr} labelEn={selectedActualite?.description_en} />
                            </section>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

import Text from '@/components/shared/Text';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { apiClient } from '@/lib/axios';
import { formatDateToLocal } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Actualite } from '../../../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EyeIcon, Trash2Icon } from 'lucide-react';

export default function ActualiteContent(
    { is_actif, query , displayMode}: 
    { is_actif: number, query: string, displayMode: 'list' | 'grid' }) {

    const [actualites, setActualites] = useState<Actualite[]>([])
    const [selectedActualite, setSelectedActualite] = useState<Actualite>()
    const [openModal, setOpenModal] = useState(false) 

    useEffect(() => {
        const getActualites = async () => {
            const response: any = await apiClient.get(`/api/actualites?paginate=200&is_actif=${is_actif}&intitule=${query}`)
            setActualites(response.data)
        }
        getActualites()
    }, [is_actif, query])

    const handelOpenDetailsSheet = (actualite: Actualite) => {
        setSelectedActualite(actualite)
        setOpenModal(true)
    }

    // Document data for mapping
    const documents = [
        {
        name: "Bulletin diocésain mensuel",
        format: "PDF",
        date: "12/03/2025",
        },
        {
        name: "Calendrier des pèlerinages organisés",
        format: "EXCEL",
        date: "12/03/2025",
        },
        {
        name: "Lettre pastorale de l'évêque",
        format: "PDF",
        date: "12/03/2025",
        },
        {
        name: "Fiches de catéchèse pour jeunes et adultes",
        format: "WORD",
        date: "12/03/2025",
        },
        {
        name: "Catalogue des formations diocésaines",
        format: "PDF",
        date: "12/03/2025",
        },
        {
        name: "Guide de la vie paroissiale",
        format: "PDF",
        date: "12/03/2025",
        },
        {
        name: "Document de réflexion synodale",
        format: "PDF",
        date: "12/03/2025",
        },
        {
        name: "Charte de bénévolat dans le diocèse",
        format: "WORD",
        date: "12/03/2025",
        },
    ];

    return (
        <>
        {
            ( displayMode === 'list') ?
            <Card className="w-full rounded-2xl bg-white">
              <CardContent className="p-0">
                <div className="flex flex-col w-full items-start gap-4">
                  <Table>
                    <TableHeader className="bg-[#f9f9f0] rounded-lg">
                      <TableRow className="border-none">
                        <TableHead className="font-body-3 text-noir-dashboard text-sm">
                          Titre
                        </TableHead>
                        <TableHead className="font-body-3 text-noir-dashboard text-sm">
                          Catégorie
                        </TableHead>
                        <TableHead className="font-body-3 text-noir-dashboard text-sm">
                          Ajouté le
                        </TableHead>
                        <TableHead className="font-body-3 text-noir-dashboard text-sm">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      { actualites.map((article, index) => (
                        <TableRow key={index} className="border-b border-[#d9d9d9]">
                          <TableCell className="font-body-3 text-noir-dashboard py-3.5">
                            {article?.titre_fr}
                          </TableCell>
                          <TableCell className="font-body-3 text-gray py-3.5">
                            {article?.categorie?.intitule_fr}
                          </TableCell>
                          <TableCell className="font-body-3 text-noir-dashboard py-3.5">
                            { formatDateToLocal((new Date(article?.date_publication)).toISOString()) }
                          </TableCell>
                          <TableCell className="py-3.5">
                            <div className="flex items-center gap-[17px]">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 flex items-center gap-1">
                                <EyeIcon className="w-[18px] h-[18px]" />
                                <span className="font-body-3 text-noir-dashboard">
                                  Voir
                                </span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 flex items-center gap-1">
                                <Trash2Icon className="w-4 h-4" />
                                <span className="font-body-3 text-noir-dashboard">
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
            </Card> :
        
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
                                            is_actif === 0 &&
                                            <p className='text-xs text-yellow-400 font-medium'>
                                                En attente; {formatDateToLocal((new Date(article.created_at)).toISOString())}
                                            </p>
                                        }
                                        {
                                            is_actif === 1 &&
                                            <p className='text-xs text-gray font-medium'>
                                                {formatDateToLocal((new Date(article.created_at)).toISOString())}
                                            </p>
                                        }
                                        {
                                            is_actif === -1 &&
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
            }

            {/* Sheet */}
            <Sheet open={openModal} onOpenChange={setOpenModal} >
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
                                                    is_actif === 0 &&
                                                    <p className='text-xs text-yellow-400 font-medium'>
                                                        En attente; {formatDateToLocal((new Date(selectedActualite.created_at)).toISOString())}
                                                    </p>
                                                }
                                                {
                                                    is_actif === 1 &&
                                                    <p className='text-xs text-gray font-medium'>
                                                        {formatDateToLocal((new Date(selectedActualite.date_publication)).toISOString())}
                                                    </p>
                                                }
                                                {
                                                    is_actif === -1 &&
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

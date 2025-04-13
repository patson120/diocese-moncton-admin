import { Card, CardContent } from '@/components/ui/card';
import { fetchActualites } from '@/lib/data';
import { useEffect, useState } from 'react';
import { Actualite } from '../../../../types';

export default function ActualiteContent({ is_brouillon }: { is_brouillon: number }) {
    const [actualites, setActualites] = useState<Actualite[]>([])

    console.log("test");
    
    useEffect(() => {
        const getActualites = async () => {
            const response = await fetchActualites(`?paginate=20&is_brouillon=${is_brouillon}`)
            setActualites(response.data)            
        }
        getActualites()
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {
                actualites.map((article) => (
                    <Card
                        key={article.id}
                        className="w-full border-none shadow-none">
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
                                {article.categorie && (
                                    <p className="font-legend text-[length:var(--legend-font-size)] tracking-[var(--legend-letter-spacing)] leading-[var(--legend-line-height)] text-gray">
                                        {article.categorie.intitule_fr}
                                    </p>
                                )}

                                <div className="flex flex-col">
                                    <p className="font-body-3 font-bold text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-noir-dashboard line-clamp-1">
                                        {article.titre_fr}
                                    </p>
                                    <p className="font-body-3 text-[length:var(--body-3-font-size)] tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] text-gray line-clamp-1">
                                        {article.description_en}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
        </div>
    )
}

import { Actualite } from '@/app/types'
import Text from '@/components/shared/Text'
import { formatDateToLocal } from '@/lib/utils'
import Image from 'next/image'

export default function ActualiteDetail({ actualite }: { actualite: Actualite }) {
    return (
        <div className='col-span-full lg:col-span-4'>
            <div className='h-72 lg:h-96 xl:h-[560px] relative md:rounded-[18px] overflow-hidden bg-gray-100'>
                <Image
                    alt='image'
                    src={`${actualite.galerie[0].path}`}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className='container max-margin pt-4 md:pt-0 md:px-0 md:mx-0 flex flex-col space-y-3'>
                <div className='flex justify-between pt-4'>
                    <span className='body-3 font-semibold text-primary'><Text labelEn={actualite?.categorie?.intitule_en} labelFr={actualite?.categorie?.intitule_fr} /></span>
                    <p className='text-gray-400 body-3'>Publié le {formatDateToLocal(actualite?.date_publication ? actualite?.date_publication : actualite?.created_at)}</p>
                </div>
                <h1 className='heading-3 font-bold text-4xl'><Text labelEn={actualite.titre_en} labelFr={actualite.titre_fr} /></h1>
                <p className='body-2 text-gray-600'><Text labelEn={actualite.description_en} labelFr={actualite.description_fr} /></p>
            </div>
        </div>
    )
}

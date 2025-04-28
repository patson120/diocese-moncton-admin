
import ContentDisplaySection from '@/components/sections/ContentDisplaySection/ContentDisplaySection';
import { Suspense } from 'react';

export default  async function page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: number;
    categorie_id?: string;
  }>
})  {

  const searchParams = await props.searchParams;
  // const query = searchParams?.query || '';
  // const categorie_id = searchParams?.categorie_id || '';
  // const currentPage = searchParams?.page || 1;

  return (
    <div className="flex-1 flex flex-col">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <ContentDisplaySection />
      </Suspense>
    </div>
  )
}

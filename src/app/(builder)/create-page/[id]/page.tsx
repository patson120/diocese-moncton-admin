import { PageBuilder } from '@/components/pages/page-builder/page-builder';

export default function BuilderPage({ params }: { params: { id: string } }) {
  const id = params?.id! === 'new' ? 'new' : params.id;
  
  return <PageBuilder pageId={id} />;
}

// This function is required for static site generation
export async function generateStaticParams() {
  return [{ id: 'new' }];
}

// export default function page() {
//   return (
//     <div>page</div>
//   )
// }

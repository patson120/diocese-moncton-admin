import { PageBuilder } from '@/components/pages/page-builder/page-builder';

export default async function BuilderPage(props: {
  params: Promise<{ id: string }>,
}) {
  const { id } = await props.params;
  return <PageBuilder pageId={id} />;
}

// This function is required for static site generation
export async function generateStaticParams() {
  return [{ id: 'new' }];
}
import { Page } from '@/app/types';
import { apiClient } from '@/lib/axios';
import RenderPage from './RenderPage';

export default async function page(props: {
    params: Promise<{ pageId: string }>,
  }) {
    const { pageId } = await props.params
    return (
        <RenderPage pageId={pageId} />
    )
}

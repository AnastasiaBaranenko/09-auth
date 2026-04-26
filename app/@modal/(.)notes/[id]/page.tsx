import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotePreviewClient from '../../(.)notes/[id]/NotePreview.client'
import { fetchNoteById } from '@/lib/api/serverApi';

export type NotePreviewProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({params}: NotePreviewProps) {
  const queryClient = new QueryClient();
  const {id} = await params;
await queryClient.prefetchQuery({
  queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
});

return(
    <HydrationBoundary state={dehydrate(queryClient)}>
    <NotePreviewClient id={id}/>
    </HydrationBoundary>
)
}
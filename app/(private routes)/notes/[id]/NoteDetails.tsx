import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { NoteDetailsClient } from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api/clientApi';

export interface NotesDetailsProps{
id: string;
}

export default async function NotesDetails({id}: NotesDetailsProps){
const queryClient = new QueryClient();

await queryClient.prefetchQuery({
  queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
});

    return(
      <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient id={id}/>
      </HydrationBoundary>
      </>
    )
}
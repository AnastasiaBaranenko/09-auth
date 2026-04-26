import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import {NoteDetailsClient} from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api/serverApi';
import { Metadata } from 'next';


export type NotesProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: NotesProps): Promise<Metadata>{
const {id} = await params;
const note = await fetchNoteById(id);

return{
  title: `Note: ${note.title}`,
  description:`Note detail: ${note.content}`,

  openGraph:{
   title: `Note ${note.title}`,
   description:`Note detail: ${note.content}`,
      url: `https://08-zustand-steel-chi.vercel.app/${id}`,

    images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${note.title}`,
        },
      ],
  }
} 
}

export default async function Notes({ params }: NotesProps){
  const queryClient = new QueryClient();
const {id} = await params;
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
};
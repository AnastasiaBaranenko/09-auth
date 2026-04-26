import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api/serverApi';
import { Metadata } from 'next';

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }:NotesPageProps):Promise<Metadata>{
  const {slug} = await params;
  const tag = slug?.[0] || 'all';
  const formattedTag = tag === 'all' ? 'all' : tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();

  return{
  title: `Note: ${formattedTag}`,
  description: `Tag note: ${formattedTag}`,

  openGraph:{
    title: `Note: ${formattedTag}`,
    description: `Tag note: ${formattedTag}`,
    url: `https://08-zustand-steel-chi.vercel.app/${formattedTag}`,
    images: [
      {
           url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${tag}}`,
      }
    ],
  },
  }
}

export default async function NotesPages({ params }: NotesPageProps){
const {slug} = await params;
const queryClient = new QueryClient();

const tag = (slug?.[0] && slug[0].toLowerCase() !== 'all') ? slug[0] : undefined;

const search="";
const page=1;  
  await queryClient.prefetchQuery({
    queryKey: ['notes', search, tag],
      queryFn: () => fetchNotes(search, page, tag)     
  });
  
    return(
      <section>
        <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient 
         tag={tag} >
         </NotesClient>
         </HydrationBoundary>
        </section>
    )
      
}
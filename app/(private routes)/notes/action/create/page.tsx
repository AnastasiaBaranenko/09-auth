import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from "next";

export const metadata: Metadata = {
  title:"Create new note",
  description: "Write your note and save",

openGraph: {
    title: "Create new note",
    description: "Write your note and save",
    url: 'https://08-zustand-steel-chi.vercel.app/action/create',
     images: [
        {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404-Not Found',
        },
      ],
}
}

export default async function CreateNote(){
return(
<main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   {/* NoteForm component */}
       <NoteForm />
  </div>
</main>
)
}
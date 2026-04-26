'use client'

import {useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import css from './NotePreview.module.css';

export default function NotePreviewClient({ id }: { id: string }){
const router = useRouter();

  const {data: note, isLoading, error} = useQuery({
    queryKey: ['notes',id],
    queryFn: () => fetchNoteById(id, ),
    enabled: true,
    refetchOnMount: false,
  })

  const handleClose = () => {router.back();};

  if(isLoading){
    return <p>Loading, please wait...</p>;
  }

  if(error || !note){
    return <p>Something went wrong.</p>;
  }

    return(
    <div className={css.container}>
      <Modal isOpen={true} onClose={handleClose}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{note.title}</h2>
	  </div>
      <p className={css.tag}>{note.tag}</p>
	  <p className={css.content}>{note.content}</p>
	  <p className={css.date}>{note.createdAt}</p>
	</div>
  </Modal>
</div>
    )
}
'use client';

import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';
import * as Yup from "yup";
import { useId } from "react";
import { useMutation } from '@tanstack/react-query';
import {useQueryClient} from '@tanstack/react-query';
import type { Note } from '@/types/note';
import { createNote } from '@/lib/api/clientApi';
import { useState } from 'react';
import {useNoteStore} from '@/lib/store/noteStore';

export interface NoteValues {
  title: string;
  content: string;
  tag: string;
}

const Shema = Yup.object().shape({
  title: Yup.string()
  .min(3, "Title must be at least 3 characters")
  .max(50, "Title is too long")
  .required("Title is required"),
  content: Yup.string()
  .max(500, 'Content is too long'),
  tag: Yup.string()
  .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
  .required("Tag is required"),
});

export default function NoteForm(){

    const [errors, setErrors] = useState<Record<string, string>>({});
 const router = useRouter();
  const fieldId = useId();
  const queryClient = useQueryClient();
    const { draft, setDraft, clearDraft } = useNoteStore();
    
  const mutation =  useMutation<Note, Error, NoteValues>({
  mutationFn: (noteData) => createNote(noteData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
    clearDraft();
     router.push('/notes/filter/all');
  },
})

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
setDraft({
      ...draft,
      [name]: value,
    });
  };

  const handleAction = async(FormData : FormData) => {
  const clearData = {
      title: FormData.get('title') as string,
      content: FormData.get('content') as string,
      tag: FormData.get('tag') as string,
    };

    try{
      setErrors({});
    await Shema.validate(clearData, { abortEarly: false })
  
  mutation.mutate(clearData);
    } catch(error){
      if (error instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((e) => {
          if (e.path) newErrors[e.path] = e.message; 
    });
    setErrors(newErrors);
  }
}
}

const handleCancel = () => router.push('/notes/filter/all');
    return(
       <form action={handleAction} >
        <div className={css.formGroup}>
    <label  htmlFor={`${fieldId}-title`}>Title</label>
  
    <input id={`${fieldId}-title`} 
    type="text" 
    name="title" 
    className={css.input} 
    value={draft.title}
    onChange={handleChange}/>
     {errors.title && <span className={css.error}>{errors.title}</span>}
  </div>
  <div className={css.formGroup}>
    <label  htmlFor={`${fieldId}-content`}>Content</label>
                          <textarea 
      id={`${fieldId}-content`}
      name="content"
      rows={8}
      className={css.textarea}
      value={draft.content}
    onChange={handleChange}
    />
     { errors.content && <span className={css.error}>{errors.content}</span>}
  </div>

  <div className={css.formGroup}>
    <label htmlFor={`${fieldId}-tag`}>Tag</label>
    <select id={`${fieldId}-tag`} name="tag" className={css.select}
    value={draft.tag}
    onChange={handleChange}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
     { errors.tag && <span className={css.error}>{errors.tag}</span>}
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={handleCancel}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={ mutation.isPending}
    >
      Create note
    </button>
  </div>
</form>
    );
};
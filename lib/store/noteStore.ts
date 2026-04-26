import { create } from 'zustand';
import { persist } from 'zustand/middleware';

 interface NewNoteData{
   title: string,
   content: string,
   tag: string,
}

interface NoteStore{
   draft: NewNoteData;
   setDraft: (note: NewNoteData) => void;
   clearDraft: () => void;
}

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
draft: initialDraft,
setDraft: (note) => set({ draft: note }),
  clearDraft: () => set({ draft: initialDraft}),
}),
{
  name: 'note-store',
   partialize: (state) => ({ draft: state.draft }),
}));


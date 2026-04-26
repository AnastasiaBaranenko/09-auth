import { cookies } from 'next/headers';
import {nextServer} from './api';
import { User } from '@/types/user';
import {Notes} from './clientApi';
import type {Note} from '@/types/note';
import type {CheckSessionRequest} from '../api/clientApi';

export async function fetchNotes(search: string, page: number, tag?: string): Promise<Notes> {
  const cookieStore = await cookies();
  const queryParams: Record<string, string | number> = {
    search,
    page,
  };
  if (tag !== undefined) {
    queryParams.tag = tag;
  }

  const response = await nextServer.get<Notes>('/notes', {
    params: queryParams,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string):Promise<Note>{
  const cookieStore = await cookies();
      const response = await nextServer.get<Note>(`/notes/${id}`, {
        headers: {
      Cookie: cookieStore.toString(),}}
      );
   return response.data;

}

export async function getMe(){
  const cookieStore = await cookies();
  
  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),

    },
  });
  return data;
}

export async function checkSession(){
     const cookieStore = await cookies();
  const response = await nextServer.get<CheckSessionRequest>('/auth/session',  {
    headers: {  Cookie: cookieStore.toString(),
    },
  });
   return response;
}



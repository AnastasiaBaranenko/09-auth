
import {nextServer} from '../api/api';
import type {User} from '@/types/users';

export interface Note {
id: string;
title: string;
content: string;
createdAt: string;
updatedAt: string; 
tag: string;
}

export interface NoteValues{
    title: string,
   content: string,
   tag: string,
}

export interface Notes{
notes: Note[];
totalPages: number;
}

 export async function fetchNotes(search: string, page: number, tag?: string): Promise<Notes>{
const queryParams: Record<string, string | number> = {
    search: search,
    page: page,
    };
    if(tag !== undefined){
  queryParams.tag = tag;
}

const response = await nextServer.get<Notes>('/notes', {
    params: queryParams,
});
   return response.data;
}

   export async function createNote(newNote:NoteValues):Promise<Note>{
    const results = await nextServer.post<Note>(`/notes`, newNote);
      return results.data;
      };
      
     export async function deleteNote(id:string):Promise<Note>{
      const response = await nextServer.delete<Note>(`/notes/${id}`);
   return response.data;
     }
      
     export async function fetchNoteById (id: string):Promise<Note>{
      const response = await nextServer.get<Note>(`/notes/${id}`);
   return response.data;
     }

     export type RegisterRequest = {
    username: string,
    email: string,
    avatar: string,
}

export async function register(data: RegisterRequest){
const response = await nextServer.post<User>('/auth/register', data);
  return response.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export async function login(data: LoginRequest){
const response = await nextServer.post<User>('/auth/login', data );
  return response.data;
}

export async function logout(){
const response = await nextServer.post<User>('/auth/logout' );
  return response.data;
}

type CheckSessionRequest = {
  success: boolean;
};

export async function checkSession() {
  const response = await nextServer.get<CheckSessionRequest>('/auth/session');
  return response.data.success;
};

export async function getMe(){
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export type UpdateUserRequest = {
  username: string,
  email?: string,
  avatar?: string,
}

export async function updateMe(update: UpdateUserRequest){
  const response =  await nextServer.patch<User>('/users/me',update);
 return response.data;
}
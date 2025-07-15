import { User } from "@/types/user";
import { nextServer } from "./api";
import { NewNote, Note } from "@/types/note";

export type RegisterRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  email: string;
  username: string;
};

export interface NotesResponse {
    notes: Note[],
    totalPages: number,
}


export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};  

export const login = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};  

export const getMe = async () => {
  const res = await nextServer.get<User>("/users/me", {
  })  
  return res.data;
}  

export async function checkSession(): Promise<boolean> {
  try {
    await nextServer.get('/auth/session');
    return true;
  } catch {
    return false;
  }
}

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};  

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};  

export const fetchNotes = async (query: string, page: number, tag: string): Promise<NotesResponse> => {
    const res = await nextServer.get<NotesResponse>("/notes", {
        params: {
            ...(tag !== "All" ? {tag: tag} : {}),
            ...(query !== "" ? {search: query} : {}),
            page,
            perPage: 12,
        }
    })
    return res.data;
}

export const createNote = async (postNote: NewNote): Promise<Note> => {
    const res = await nextServer.post<Note>("/notes", postNote)
    return res.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await nextServer.delete<Note>(`/notes/${id}`)
    return res.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await nextServer.get<Note>(`/notes/${id}`);
    return res.data;
}
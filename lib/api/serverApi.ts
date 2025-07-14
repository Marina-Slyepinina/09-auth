import { nextServer } from "./api";
import { type Note } from "../../types/note";
import { cookies } from "next/headers";
import { User } from "@/types/user";

export interface NotesResponse {
    notes: Note[],
    totalPages: number,
}

type CheckSessionRequest = {
    success: boolean;
};

export type UpdateUserRequest = {
  userName?: string;
};

const perPage = 12;

export const fetchServerNotes = async (query: string, page: number, tag: string): Promise<NotesResponse> => {
    const cookieData = await cookies();
    const res = await nextServer.get<NotesResponse>("/notes", {
        params: {
            ...(tag !== "All" ? {tag: tag} : {}),
            ...(query !== "" ? {search: query} : {}),
            page,
            perPage
        },
        headers: {
            Cookie: cookieData.toString(),
        }
    })
    return res.data;
}

export const checkServerSession = async () => {
    const cookieData = await cookies();
    const res = await nextServer.get<CheckSessionRequest>('/auth/session', {
        headers: {
            Cookie: cookieData.toString(),
        }
    });
    return res;
};

export const getServerMe = async () => {
    const cookieData = await cookies();
    const res = await nextServer.get<User>("/users/me", {
        headers: {
            Cookie: cookieData.toString(),
        }
    })
    return res.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const cookieData = await cookies();
    const res = await nextServer.get<Note>(`/notes/${id}`, {
        headers: {
            Cookie: cookieData.toString(),
        }
    });
    return res.data;
}

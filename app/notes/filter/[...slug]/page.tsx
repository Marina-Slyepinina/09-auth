import { fetchNotes, NotesResponse } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
type Props = {
    params: Promise<{slug: string[]}>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { slug } = await params;
    const tag = slug[0];
    return {
        title: `NoteHab | ${tag}`,
        description: `Notes of the ${tag} category`,
        openGraph: {
            title: `NoteHab | ${tag} category`,
            description: `Notes of the ${tag} category`,
            url: `https://08-zustand-blush.vercel.app/notes/filter/${tag}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: `NoteHub | ${tag} category`,
                },
            ],
        }
    }
}


export default async function Notes({params}: Props) {  
    const { slug } = await params;
    const tag = slug?.[0] ?? "";

    const initialSearch = "";
    const initialPage = 1;

    const initialData: NotesResponse = await fetchNotes(initialSearch, initialPage, tag);
    
    return <>
        <NotesClient tag={tag} initialData={initialData} initialPage={initialPage} initialSearch={initialSearch} />
    </>
}
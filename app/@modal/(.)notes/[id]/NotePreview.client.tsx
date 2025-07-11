"use client"
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

const NotePreview = () => {
    const { id } = useParams();
    const router = useRouter();

    const { data: note } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(Number(id)),
        refetchOnMount: false,
    });

    if (!note) return <p>Something went wrong.</p>;

    return (
        <Modal onClose={() => router.back()}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                        <button className={css.editBtn}>Edit note</button>
                    </div>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.info}>
                        <span className={css.tag}>{note.tag}</span>
                        <p className={css.date}>{note.createdAt}</p>
                    </div>
                </div> 
        </Modal>
    );
}

export default NotePreview;

'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteDraft } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api/clientApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NewNote, Tag} from "../../types/note";
import css from "./NoteForm.module.css";


export default function NoteForm() {
    
    const router = useRouter();
    const queryClient = useQueryClient();
    const { draft, setDraft, clearDraft } = useNoteDraft();
    const [changed, setChanged] = useState(false);
    
    const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health", "Important"];

    const createNoteMutation = useMutation({
        mutationFn: (noteData: NewNote) => createNote(noteData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"]});
            clearDraft();
            router.back();
        }
    })

    const handleSubmit = (formData: FormData) => {
        const newNote = {
            title: (formData.get("title") as string).trim(),
            content: (formData.get("content") as string).trim(),
            tag: formData.get("tag") as Tag,
        }
        setChanged(false);
        createNoteMutation.mutate(newNote);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDraft({
            ...draft, [event.target.name]: event.target.value,
        })
        if (event.target.name === "title" && event.target.value !== "") {
            setChanged(true);
        }        
    }

return <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" className={css.input} defaultValue={draft.title} onChange={handleChange} minLength={3} maxLength={50} required />
        {changed && draft.title.length < 3 && <span className={css.error}>Title must be at least 3 characters</span>}
        </div>
    
        <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
                id="content"
                name="content"
                defaultValue={draft.content}
                onChange={handleChange}
                rows={8}
                className={css.textarea}
                maxLength={500}
            />
            {draft.content.length > 500 && <span className={css.error}>Content is too long</span>}
        </div>
    
        <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select id="tag" name="tag" className={css.select} defaultValue={draft.tag} onChange={handleChange}
            required>
                {tags.map((tag) => {
                    return <option key={tag} value={tag}>{tag}</option>;
                })}
            </select>
        </div>
    
        <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
            Cancel
        </button>
        <button
            type="submit"
            className={css.submitButton}
            disabled={createNoteMutation.isPending}
        >
            Create note
        </button>
        </div>
    </form>
}
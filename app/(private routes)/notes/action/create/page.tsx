import NoteForm from "@/components/NoteForm/NoteForm";
import  css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Note",
  description:
    "Quickly capture notes, plans, and ideas with NoteHab.",
  openGraph: {
    title: "Create New Note",
    description:
      "Quickly capture notes, plans, and ideas with NoteHab — your personal space to store, structure, and revisit what matters.",
    url: "https://09-auth-kappa-seven.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create New Note",
      },
    ],
  },
};

const CreateNote = () => {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>
    )
}

export default CreateNote;

import { Metadata } from "next";
import css from "./not-found.module.css";

export const metadata: Metadata = {
    title: "404 – Page Not Found | NoteHub",
    description: "This page doesn’t exist. It might have been moved or deleted.",
    openGraph: {
        title: "404 – Page Not Found | NoteHub",
        description: "This page doesn’t exist. It might have been moved or deleted.",
        url: "",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "Page Not Found",
            },
        ],
    }
    
}

const NotFound = () => {
    return <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
}

export default NotFound;
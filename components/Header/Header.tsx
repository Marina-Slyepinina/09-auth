import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {

return (
    <header className={css.header}>
        <Link className={css.headerLink} href="/" aria-label="Home">
        NoteHub
        </Link>
        <nav className={css.navigation} aria-label="Main Navigation">
        <ul className={css.navigation}>
            <li className={css.navigationItem}>
            <Link className={css.headerLink} href="/">Home</Link>
            </li>
            <li className={css.navigationItem}>
            <TagsMenu />
            </li>
            <AuthNavigation />
        </ul>
        </nav>
    </header>
    )
}






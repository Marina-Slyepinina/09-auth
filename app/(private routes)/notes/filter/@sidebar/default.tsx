import Link from "next/link";
import css from "./SidebarPage.module.css";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health", "Important"];

const SidebarPage = () => {

return <div className={css.menuContainer}>
    <ul className={css.menuList}>
        <li className={css.menuItem}>
        <Link href="/notes/filter/All" className={css.menuLink}>
            All notes
        </Link>
        </li>

        {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
            </Link>
        </li>
        ))}
    </ul>
</div>   
}

export default SidebarPage;
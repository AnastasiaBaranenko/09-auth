import css from './SidebarNotes.module.css';
import Link from 'next/link';

export default async function SidebarNotes(){
const tags = ["all", "Work", "Personal", "Meeting", "Shopping", "Todo"]

  return(
    <ul className={css.menuList}>
      <li className={css.menuItem}>
    <Link href={`/notes/filter/all`} className={css.menuLink}>All notes</Link>
      </li>
      {tags.map(tag =>{
        if (tag === 'all') return null;
       return(
      <li key={tag} className={css.menuItem}>
        <Link href={`/notes/filter/${tag}`} className={css.menuLink}>{tag}</Link>
      </li>
      );
     })}
    </ul>
);
}
import css from './Header.module.css'
import Link from 'next/link';

export default function Header(){

    return(
        <header className={css.header}>
<Link href="/" aria-label="Home">
    NoteHub
  </Link>
  <nav aria-label="Main Navigation">
    <ul className={css.navigation}>
      <li>
        <Link href="/notes/filter/all">Home</Link>
      </li>
      <li>
        <Link href="/profile">Notes</Link>
      </li> 
      {/* <li>
        <Link href="/logout">Notes</Link>
      </li> */}
       <li>
        <Link href="/sign-in">Notes</Link>
      </li>
      <li> 
        <Link href="/sign-up">Home</Link>
      </li>
    </ul>
  </nav>
</header>
    );
}
import css from './ProfilePage.module.css';
import Image from 'next/image';

import Link from 'next/link';
import { getMe } from '@/lib/api/serverApi';

const urlAvatar = 'https://ac.goit.global/fullstack/react/default-avatar.jpg' 
export const metadata = {
  title: 'Edit Profile',
  description: 'Update your user profile',

  openGraph: {
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
         width: 1200,
        height: 630,
        alt: 'NoteHub',
        },
      ],
    }
}


export default async function Profile(){

  const data = await getMe();
  
return(
<main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src={urlAvatar}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: your_username{data.username}
      </p>
      <p>
        Email: your_email@example.com{data.email}
      </p>
    </div>
  </div>
</main>
)}
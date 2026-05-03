import css from './ProfilePage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getMe } from '@/lib/api/serverApi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your user profile',
 

  openGraph: {
     title: 'Profile',
  description: 'Your user profile',
  url: "https://09-auth-eight-murex.vercel.app/",

    images: [
      {
        url:'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
         width: 1200,
        height: 630,
        alt: 'Edit Profile',
        },
      ],
    }
}


export default async function Profile(){
  const data = await getMe();
  
const urlAvatar = 'https://ac.goit.global/fullstack/react/default-avatar.jpg'

const avatarUrl = data?.avatar || urlAvatar;
  
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
        src={avatarUrl}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {data.username}
      </p>
      <p>
        Email: {data.email}
      </p>
    </div>
  </div>
</main>
)}
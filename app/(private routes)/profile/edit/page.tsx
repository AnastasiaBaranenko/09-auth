'use client'

import css from './EditProfilePage.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import {getMe} from '@/lib/api/clientApi';
import {updateMe} from '@/lib/api/clientApi';
 const urlAvatar = 'https://ac.goit.global/fullstack/react/default-avatar.jpg';

export default function EditeProfile(
  ) {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    getMe().then((user) => {
      if(user){
      setUserName(user.username || '');
      setEmail(user.email || '');
      }
    });
  }, []);
  

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username.trim()) return;

    try {

        await updateMe({
          username,
  
        });
        router.push('/profile');
        }
    catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleCancel = () => {
    router.back();
  }
return(

<main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src={urlAvatar}
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form onSubmit={handleSaveUser} className={css.profileInfo}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:{username}</label>
        <input id="username"
          type="text"
          className={css.input}
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          
        />
      </div>

      <p>Email: user_email@example.com</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
          
        <button type="button" onClick={handleCancel} className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>
)}
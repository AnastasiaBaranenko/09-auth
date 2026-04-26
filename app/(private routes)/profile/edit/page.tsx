'use client'

import css from './EditProfilePage.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {useAuthStore} from '@/lib/store/authStore';
import {getMe} from '@/lib/api/clientApi';
import {updateMe} from '@/lib/api/clientApi';

 const urlAvatar = 'https://ac.goit.global/fullstack/react/default-avatar.jpg';


export default function EditeProfile() {
  const { user, setUser } = useAuthStore();
  const [username, setUserName] = useState('');

  const router = useRouter();
  
  const avatarSrc = user?.avatar || urlAvatar;

  useEffect(() => {
   const fetchData = async () => {
      if(user){
      setUserName(user.username || '');
      }else {
  
    try {
     const userData = await getMe()
     if (userData) {
            setUser(userData);
            setUserName(userData.username || '');
          }
        } catch (error) {
          console.error("Service error", error);
        }
      }
    };
fetchData();
  }, [user, setUser]);

    const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username.trim()) return;

    try {
      const updatedUser = await updateMe({ username });
      setUser(updatedUser);
      router.push('/profile');
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };
  
return(

<main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src={avatarSrc}
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

      <p>Email: {user?.email}</p>

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
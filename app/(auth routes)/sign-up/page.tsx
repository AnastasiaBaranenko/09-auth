'use client';

import css from './SignUpPage.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import { isAxiosError } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignUp(){
     const router = useRouter();
  const [error, setError] = useState('');

   const setUser = useAuthStore((state) => state.setUser)
 const handleSubmit = async (formData: FormData) => {
setError('');
  try{
      const formValues = Object.fromEntries(formData) as RegisterRequest;
         const response = await register(formValues);
        if (response) {
             setUser(response)
        router.push('/profile');
      } else {
       setError('Invalid email or password');
      }
    } catch (error) {
      if (isAxiosError(error)){
        const data = error.response?.data;
        const message = data?.response?.message || data?.error || 'Server error';
        setError(message);
      }
  };}
  
    return(
<main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form action={handleSubmit} className={css.form}>
    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Register
      </button>
    </div>

     {error && <p className={css.error}>{error}</p>}
  </form>
</main>
    )
}
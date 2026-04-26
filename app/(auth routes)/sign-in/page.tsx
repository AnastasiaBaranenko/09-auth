'use client';

import css from './SignInPage.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '@/lib/api/clientApi';
import { isAxiosError } from 'axios';

export default function SignIn(){
   const router = useRouter();
  const [error, setError] = useState('');
 const handleSubmit = async (formData: FormData) => {
setError('');
try{

      const formValues = Object.fromEntries(formData) as LoginRequest;
      const response = await login(formValues)
       if (response) {
        router.push('/profile');
        router.refresh();
      } else {setError('Invalid email or password');
      }
    } catch (error) {
      if (isAxiosError(error)){
        console.log("Full error data:", error.response?.data);
        const data = error.response?.data;
        const message = data?.response?.message || data?.error || 'Server error';
        setError(message);
      }
  };
    }
    return(
        <main className={css.mainContent}>
 <form action={handleSubmit} className={css.form}>
    <h1 className={css.formTitle}>Sign in</h1>

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
        Log in
      </button>
    </div>

    {error && <p className={css.error}>{error}</p>}
  </form>
</main>
    )
}
import React from 'react';
import styles from './Login.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
export default function Login() {

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('https://https://food99api.onrender.com/api/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      alert('Logged in!');
    } else {
      alert('Login failed: ' + JSON.stringify(data));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={`${styles.logo} df aic jcc font900 font-lg`} style={{color:'white'}}>Food99</div>
        <div className={styles.subtitle}>Now Think To Eat Not Budget!</div>
        <h2 className={styles.heading}>Sign in to Food99</h2>
        <input type="email" placeholder="Email address" className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className={styles.input} value={password} onChange={e => setPassword(e.target.value)} />
        <button className={styles.buttonPrimary} onClick={handleLogin} >Continue</button>

        <div className={styles.divider}>
          <span></span>
          <span className={styles.dividerText}>or</span>
          <span></span>
        </div>

        <button className={`${styles.buttonSecondary} ${styles.googleButton}`}>
          Continue with Google
        </button>
        <button className={`${styles.buttonSecondary} ${styles.facebookButton}`}>
          Continue with Facebook
        </button>

        <p className={styles.signupText}>
          Don’t have an account?
          <Link href="/signup" className={styles.signupLink}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

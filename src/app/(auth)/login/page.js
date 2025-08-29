'use client';
import React from 'react';
import styles from './Login.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export default function Login() {
  const router = useRouter();
  const [username, set_username] = useState('');
  const [password, setPassword] = useState('');
  const [Done, setDone] = useState(false);
  const [DoneStatus, setDoneStatus] = useState(null);

  const handleLogin = async () => {
    const res = await fetch('https://food99api.onrender.com/api/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      alert('Logged in!');
      setDone(true)
      // setTimeout(()=>window.location.href="/",2000)
      // router.push('/')
    } else {
      alert('Login failed: ' + JSON.stringify(data));
    }
  };

  return (
    <>
      {Done ?
        <>
        <style>{`body{background:repeating-linear-gradient(45deg, #ffffff, #fafafaff 100px)}`}</style>
        <div className="fd-c pdb10" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <div style={{height:'500px', width:'500px'}}>

          <DotLottieReact
            src="https://lottie.host/d1f8286c-6132-48a0-a1cd-41ef5c1ae36c/VcMQsjt6yH.lottie"
            loop={false}
            autoplay={true}
            dotLottieRefCallback={(instance) => {
              if (instance) {
                instance.addEventListener("play", () => {
                  // redirect when animation completes
                  setDoneStatus('Login Sucessful!');
                });
                instance.addEventListener("complete", () => {
                  // redirect when animation completes
                  // router.push("/");
                });
              }
            }}

          />
            </div>
          <div className='pR font600' style={{top:'-115px', fontSize:'x-large'}}>{DoneStatus}</div>
        </div> 
        </>
        :
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={`${styles.logo} df aic jcc font900 font-lg`} style={{ color: 'white' }}>Food99</div>
            <div className={styles.subtitle}>Now Think To Eat Not Budget!</div>
            <h2 className={styles.heading}>Sign in to Food99</h2>
            <input type="name" placeholder="Username" className={styles.input} value={username} onChange={e => set_username(e.target.value)} />
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

      }
    </>
  );
}

'use client';
import React from 'react';
import styles from './Login.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Icon } from '@/components/lib/icons';
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
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      setDone(true)
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
            <div style={{ height: '500px', width: '500px' }}>

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
                      router.push("/");
                    });
                  }
                }}

              />
            </div>
            <div className='pR font600' style={{ top: '-115px', fontSize: 'x-large' }}>{DoneStatus}</div>
          </div>
        </>
        :
        <div className="df fd-c hfp">
          <div
            className="fx1 df fd-c jcsb"
            style={{
              background: 'url(https://res.cloudinary.com/dbe8vybbp/image/upload/v1756398282/samples/people/kitchen-bar.jpg)',
              backgroundSize: 'cover',
              boxShadow: 'inset 0px -50px 60px 1px black'
            }}
          >
            <div className="pd1">
              <span
                className="font900"
                style={{
                  color: 'white',
                  fontSize: 'x-large'
                }}
              >
                Food99
              </span>
            </div>

            <div>
              <div
                className="df aic pd1 bdTrds"
                style={{
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: '#00000075',
                  backdropFilter: 'blur(5px)',
                  borderColor: 'black'
                }}
              >
                <div
                  className="df fd-c aic"
                  style={{
                    color: 'yellow'
                  }}
                >
                  <span
                    className="font-lg font800"
                    style={{}}
                  >
                    108+
                  </span>
                  <span
                    className="font-sm font600"
                    style={{}}
                  >
                    Happy customers
                  </span>
                </div>

                <div
                  className="df fd-c aic"
                  style={{
                    color: 'cyan'
                  }}
                >
                  <span className="font-lg font800">85%</span>
                  <span className="font-sm font600">Reduced cost</span>
                </div>

                <div
                  className="df fd-c aic"
                  style={{
                    color: '#00ff0a'
                  }}
                >
                  <span className="font-lg font800">800+</span>
                  <span className="font-sm font600">Orders delivered</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.container} fx1`}>
            <div className="df" style={{ background: '#7f5bd5', color: 'white' }}><span className={styles.heading}>Sign in to Food99</span></div>
            <div className="df fd-c"><div className={styles.card}>
              <input type="name" placeholder="Username" className={styles.input} value={username} onChange={e => set_username(e.target.value)} />
              <input type="password" placeholder="Password" className={styles.input} value={password} onChange={e => setPassword(e.target.value)} />
              <button className={styles.buttonPrimary} onClick={handleLogin} >Continue</button>

              <div className={styles.divider}>
                <span></span>
                <h3 className={styles.dividerText}>or</h3>
                <span></span>
              </div>

              <button className={`${styles.buttonSecondary} ${styles.googleButton}`}>
                <Icon.google /> <span className='mgl05'>Continue with Google</span>
              </button>
              <button className={`${styles.buttonSecondary} ${styles.facebookButton}`}>
                <Icon.facebook /> <span className='mgl05'>Continue with Facebook</span>
              </button>

              <p className={styles.signupText}>
                Don’t have an account?
                <Link href="/signup" className={styles.signupLink}>
                  Sign up
                </Link>
              </p>
            </div>
            </div>
            </div>
        </div>
      }
    </>
  );
}

'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Signup.module.css'
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const handleSignup = async (e) => {
    let a = e.target.textContent;
    e.target.textContent = 'loading.. '+a;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone_number', phone);
    if (profileImage) formData.append('profile_image', profileImage);

    const res = await fetch('https://food99api.onrender.com/api/api/signup/', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (res.ok) {
      alert('User created successfully!');
      router.push('/login')
    } else {
      alert('Signup failed: ' + JSON.stringify(data));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={`${styles.logo} df aic jcc font900 font-lg`} style={{ color: 'white' }}>Food99</div>
        <div className={styles.subtitle}>Now Think To Eat Not Budget!</div>
        <h2 className={styles.heading}>Sign up to Food99</h2>
        <input type="name" placeholder="Username" className={styles.input} value={username} onChange={e => setUsername(e.target.value)} />
        <input type="name" placeholder="email" className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className={styles.input} value={password} onChange={e => setPassword(e.target.value)} />
        <input type="tel" placeholder="phone no." className={styles.input} value={phone} onChange={e => setPhone(e.target.value)} />
        <input type="file" onChange={e => setProfileImage(e.target.files[0])} />
        <button className={styles.buttonPrimary} onClick={(e)=>handleSignup(e)} >Continue</button>

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
          Already have an account?
          <Link href="/login" className={styles.signupLink}>
            Sign up
          </Link>
        </p>
      </div>
    </div>

    // <div>
    //   <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
    //   <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
    //   <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
    //   <input type="text" placeholder="Phone Number" onChange={e => setPhone(e.target.value)} />
    //   <input type="file" onChange={e => setProfileImage(e.target.files[0])} />
    //   <button onClick={handleSignup}>Sign Up</button>
    // </div>
  );
}




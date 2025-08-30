'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Signup.module.css'
import { useRouter } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import imageCompression from 'browser-image-compression';

export default function Signup() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [Done, setDone] = useState(false);
  const [DoneStatus, setDoneStatus] = useState(null);

  // 🔹 Compress image when selected
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 1,          // target max size (1 MB)
        maxWidthOrHeight: 800, // resize to 800px max
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      console.log("Original size:", (file.size / 1024 / 1024).toFixed(2), "MB");
      console.log("Compressed size:", (compressedFile.size / 1024 / 1024).toFixed(2), "MB");

      setProfileImage(compressedFile); // store compressed version
    } catch (error) {
      console.error("Image compression error:", error);
      setProfileImage(file); // fallback to original
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    let button = e.target;
    let originalText = button.textContent;
    button.textContent = 'Loading...';

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone_number', phone);
      if (profileImage) {
        formData.append('profile_image', profileImage);
      }

      const res = await fetch('https://food99api.onrender.com/api/api/signup/', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        setDone(true);
      } else {
        alert('Signup failed: ' + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong', err);
    } finally {
      button.textContent = originalText;
    }
  };

  return (
    <>
      {Done ? (
        // ✅ success animation
        <div>...</div>
      ) : (
        <div className={styles.container}>
          <div className={styles.card}>
            <h2 className={styles.heading}>Sign up to Food99</h2>
            <input type="text" placeholder="Username" className={styles.input} value={username} onChange={e => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className={styles.input} value={password} onChange={e => setPassword(e.target.value)} />
            <input type="tel" placeholder="Phone number" className={styles.input} value={phone} onChange={e => setPhone(e.target.value)} />
            
            {/* 🔹 compress on change */}
            <input type="file" accept="image/*" onChange={handleImageChange} />

            <button className={styles.buttonPrimary} onClick={handleSignup}>Continue</button>
          </div>
        </div>
      )}
    </>
  );
}

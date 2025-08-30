'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Signup.module.css'
import { useRouter } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function Signup() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [Done, setDone] = useState(false);
  const [DoneStatus, setDoneStatus] = useState(null);



  async function handleSignup(e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("username", e.target.username.value);
  formData.append("email", e.target.email.value);
  formData.append("password", e.target.password.value);

  // ✅ Add image only if selected
  if (e.target.image.files[0]) {
    formData.append("image", e.target.image.files[0]);
  }

  try {
    const res = await fetch("http://your-django-server.com/api/api/signup/", {
      method: "POST",
      body: formData, // ✅ No JSON.stringify here
      // ❌ Do not set Content-Type → fetch will auto set it to multipart/form-data
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Signup error:", errorData);
      alert("Something went wrong: " + JSON.stringify(errorData));
      return;
    }

    const data = await res.json();
    console.log("Signup success:", data);
    alert("Signup successful!");
  } catch (error) {
    console.error("Network error:", error);
    alert("Something went wrong. Please try again.");
  }
}

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
                      setDoneStatus('Signup done!');
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
            <button className={styles.buttonPrimary} onClick={(e) => handleSignup(e)} >Continue</button>

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
        </div>}
    </>

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




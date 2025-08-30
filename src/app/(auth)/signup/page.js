"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Signup.module.css";
import { useRouter } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import imageCompression from "browser-image-compression";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [Done, setDone] = useState(false);
  const [DoneStatus, setDoneStatus] = useState(null);
  const [loading, setloading] = useState(false);
const [progress, setProgress] = useState(0);


  // 🔹 compress image when selected
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 1, // max 1MB
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      console.log("Original:", file.size / 1024, "KB");
      console.log("Compressed:", compressedFile.size / 1024, "KB");

      setProfileImage(compressedFile);
    } catch (err) {
      console.error("Compression error:", err);
      setProfileImage(file); // fallback
    }
  };

  // 🔹 handle form submit

const handleSignup = async (e) => {
  e.preventDefault();
  setloading(true);
  setProgress(0);

  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("phone_number", phone);
  if (profileImage) {
    formData.append("profile_image", profileImage);
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://food99api.onrender.com/api/api/signup/");

  // track upload progress
  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const percent = Math.round((event.loaded / event.total) * 100);
      setProgress(percent);
    }
  };

  xhr.onload = () => {
    setloading(false);
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      setDone(true);
    } else {
      alert("Signup failed: " + xhr.responseText);
    }
  };

  xhr.onerror = () => {
    setloading(false);
    alert("Network error while uploading");
  };

  xhr.send(formData);
};


  return (
    <>
      {loading ?
      <>
      <p>Uploading... {progress}%</p>
    <progress value={progress} max="100"></progress>
      </>
        // <div className="fd-c pdb10" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        //   <div style={{ height: '500px', width: '500px' }}>
        //     <DotLottieReact
        //       src="https://lottie.host/15693c09-7a07-44d0-8459-975870f8db5d/hWy9tPQUfe.lottie"
        //       loop
        //       autoplay
        //     />
        //   </div>
        // </div>
        : <>{Done ? (
          // ✅ success animation
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
        ) : (
          <div className={styles.container}>
            <div className={styles.card}>
              <h2 className={styles.heading}>Sign up to Food99</h2>

              {/* 🔹 use form + onSubmit */}
              <form onSubmit={handleSignup} encType="multipart/form-data">
                <input
                  type="text"
                  placeholder="Username"
                  className={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className={styles.input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <input type="file" accept="image/*" onChange={handleImageChange} />

                <button type="submit" className={styles.buttonPrimary}>
                  Continue
                </button>
              </form>
            </div>
          </div>
        )}</>}
    </>
  );
}

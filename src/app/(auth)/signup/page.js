"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Signup.module.css";
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

  // 🔹 Convert file → Base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // 🔹 Compress image then convert
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      console.log("Original:", file.size / 1024, "KB");
      console.log("Compressed:", compressedFile.size / 1024, "KB");

      const base64 = await fileToBase64(compressedFile);
      setProfileImage(base64);
    } catch (err) {
      console.error("Compression error:", err);
      const base64 = await fileToBase64(file);
      setProfileImage(base64);
    }
  };

  // 🔹 handle form submit
  const handleSignup = async (e) => {
    e.preventDefault();
    setloading(true);
    setProgress(0);

    const payload = {
      username,
      email,
      password,
      phone_number: phone,
      profile_image: profileImage, // base64 string
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://food99api.onrender.com/api/api/signup/");
    xhr.setRequestHeader("Content-Type", "application/json");

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

    xhr.send(JSON.stringify(payload));
  };

  return (
    <>
      {loading ? (
        <>
          <p>Uploading... {progress}%</p>
          <progress value={progress} max="100"></progress>
        </>
      ) : Done ? (
        <>
          <style>{`body{background:repeating-linear-gradient(45deg,#ffffff,#fafafa 100px)}`}</style>
          <div
            style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
          >
            <div style={{ height: "500px", width: "500px" }}>
              <DotLottieReact
                src="https://lottie.host/d1f8286c-6132-48a0-a1cd-41ef5c1ae36c/VcMQsjt6yH.lottie"
                loop={false}
                autoplay={true}
                dotLottieRefCallback={(instance) => {
                  if (instance) {
                    instance.addEventListener("play", () => {
                      setDoneStatus("Signup done!");
                    });
                    instance.addEventListener("complete", () => {
                      router.push("/");
                    });
                  }
                }}
              />
            </div>
            <div style={{ top: "-115px", fontSize: "x-large" }}>{DoneStatus}</div>
          </div>
        </>
      ) : (
        <div className={styles.container}>
          <div className={styles.card}>
            <h2 className={styles.heading}>Sign up to Food99</h2>
            <form onSubmit={handleSignup}>
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
      )}
    </>
  );
}

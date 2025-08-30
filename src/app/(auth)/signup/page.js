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

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone_number", phone);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    try {
      const res = await fetch("https://food99api.onrender.com/api/api/signup/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setDone(true);
      } else {
        alert("Signup failed: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      {Done ? (
        // ✅ success animation
        <div className="flex items-center justify-center h-screen">
          <DotLottieReact
            src="https://lottie.host/d1f8286c-6132-48a0-a1cd-41ef5c1ae36c/VcMQsjt6yH.lottie"
            loop={false}
            autoplay
            dotLottieRefCallback={(instance) => {
              if (instance) {
                instance.addEventListener("complete", () => {
                  router.push("/");
                });
              }
            }}
          />
          <p className="text-xl font-semibold mt-4">{DoneStatus || "Signup done!"}</p>
        </div>
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
      )}
    </>
  );
}

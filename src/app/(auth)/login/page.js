"use client";
import { useState } from "react";
import { fetchAPI } from "@/app/(api)/api";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetchAPI("token", "POST", form);
    localStorage.setItem("token", res.access);
    router.push("/dashboard");
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["username", "password"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full p-2 border rounded"
          />
        ))}
        <button className="bg-blue-600 text-white w-full py-2 rounded">Login</button>
      </form>
    </div>
  );
}

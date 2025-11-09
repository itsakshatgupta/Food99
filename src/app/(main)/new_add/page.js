"use client";
import { useState } from "react";
import { fetchAPI } from "@/app/(api)/api";

import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetchAPI("products", "POST", form, token);
    router.push("/dashboard");
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "description", "price"].map((field) => (
          <input
            key={field}
            placeholder={field}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full p-2 border rounded"
          />
        ))}
        <button className="bg-blue-600 text-white w-full py-2 rounded">Save</button>
      </form>
    </div>
  );
}
